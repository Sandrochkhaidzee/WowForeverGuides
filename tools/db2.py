"""Minimal read-only reader for the game's data tables (.db2, WDC3/WDC4/WDC5)
and for the hotfixes the server sends (Cache/ADB/<locale>/DBCache.bin).

    layout = parse_dbd(dbd_text, "1.60.1.71037")
    rows = read_table(casc.read_fdid(fdid, zero_encrypted=True), layout)
    apply_hotfixes(rows, hotfix_entries, table_hash, layout)

The column layout for each table comes from WoWDBDefs
(https://github.com/wowdev/WoWDBDefs), matched to the installed build.
Encrypted sections are skipped. Format notes: https://wowdev.wiki/DB2 and
https://wowdev.wiki/DBCache.bin
"""
import re
import struct

ZERO = bytes(1)


# ---------- layouts from WoWDBDefs ----------

def parse_dbd(text, build):
    """Return the column list for `build`: dicts with name, kind (int/float/str),
    bits, signed, count, inline (stored in the record), id, relation."""
    types = {}
    blocks = text.replace("\r", "").split("\n\n")
    for line in blocks[0].splitlines()[1:]:
        m = re.match(r"(\w+)(?:<[^>]*>)?\s+(\w+)", line)
        if m:
            types[m.group(2)] = m.group(1)
    block = next((b for b in blocks if re.search(r"^BUILD .*\b%s\b" % re.escape(build), b, re.M)), None)
    if block is None:
        raise KeyError("no layout for build " + build)
    cols = []
    for line in block.splitlines():
        if line.startswith(("LAYOUT", "BUILD", "COMMENT")) or not line.strip():
            continue
        m = re.match(r"(?:\$([\w,]+)\$)?(\w+)(?:<(u?)(\d+)>)?(?:\[(\d+)\])?", line.strip())
        opts, name, uns, bits, count = m.groups()
        opts = (opts or "").split(",")
        t = types.get(name, "int")
        kind = "str" if t in ("string", "locstring") else "float" if t == "float" else "int"
        cols.append(dict(name=name, kind=kind, bits=int(bits or 32), signed=not uns,
                         count=int(count or 1), inline="noninline" not in opts,
                         id="id" in opts, relation="relation" in opts))
    return cols


def _int(raw, bits, signed):
    raw &= (1 << bits) - 1
    return raw - (1 << bits) if signed and raw >> (bits - 1) else raw


def _bits(buf, bit_off, nbits):
    byte = bit_off >> 3
    chunk = int.from_bytes(buf[byte:byte + ((bit_off & 7) + nbits + 7) // 8], "little")
    return (chunk >> (bit_off & 7)) & ((1 << nbits) - 1)


# ---------- .db2 files ----------

def read_table(data, layout):
    magic = data[:4]
    assert magic in (b"WDC3", b"WDC4", b"WDC5"), magic
    pos = 4 + (4 + 128 if magic == b"WDC5" else 0)          # WDC5: version, schema string
    (_rc, field_count, rec_size, _ss, _th, _lh, _min, _max, _loc,
     flags, id_index, _total, _bp, _lookup, fsi_size, common_size, pallet_size,
     section_count) = struct.unpack_from("<9IHH7I", data, pos)
    pos += struct.calcsize("<9IHH7I")
    sections = []
    for _ in range(section_count):
        s = struct.unpack_from("<Q8I", data, pos)
        sections.append(dict(key=s[0], off=s[1], count=s[2], strsize=s[3], end=s[4],
                             idsize=s[5], relsize=s[6], omcount=s[7], copycount=s[8]))
        pos += 40
    pos += 4 * field_count
    info = [struct.unpack_from("<HHIIIII", data, pos + 24 * j) for j in range(fsi_size // 24)]
    pos += fsi_size
    pallet = data[pos:pos + pallet_size]; pos += pallet_size
    common = data[pos:pos + common_size]

    fields = [c for c in layout if c["inline"]]
    if not info and not _rc:
        return {}                                       # empty table
    assert len(fields) == len(info), "layout has %d fields, file has %d" % (len(fields), len(info))
    noninline_rel = next((c["name"] for c in layout if c["relation"] and not c["inline"]), None)
    id_name = next((c["name"] for c in layout if c["id"]), "ID")

    pal_off, com_off, commons, p, q = [], [], [], 0, 0
    for (_o, _s, add, st, *_r) in info:
        pal_off.append(p); com_off.append(q)
        d = {}
        if st == 2:
            for k in range(add // 8):
                rid, val = struct.unpack_from("<II", common, q + 8 * k)
                d[rid] = val
        commons.append(d)
        if st in (3, 4): p += add
        if st == 2: q += add

    if flags & 1:
        return _read_sparse(data, sections, fields, noninline_rel, id_name)

    # a string offset counts from the field, as if every section's records came
    # first and every section's string table followed, back to back
    first_rec, str_base, n, sb = [], [], 0, 0
    for s in sections:
        first_rec.append(n); str_base.append(sb)
        n += s["count"]; sb += s["strsize"]
    total = n

    def string_at(virt):
        for k, s in enumerate(sections):
            if str_base[k] <= virt < str_base[k] + s["strsize"]:
                fo = s["off"] + s["count"] * rec_size + virt - str_base[k]
                return data[fo:data.index(ZERO, fo)].decode("utf-8", "replace")
        return ""

    def as_float(v):
        return struct.unpack("<f", struct.pack("<I", v & 0xFFFFFFFF))[0]

    rows = {}
    for k, s in enumerate(sections):
        if s["key"] and not any(data[s["off"]:s["off"] + min(64, s["count"] * rec_size)]):
            continue                                    # encrypted, key unknown
        p = s["off"] + s["count"] * rec_size + s["strsize"]
        ids = struct.unpack_from("<%dI" % (s["idsize"] // 4), data, p)
        p += s["idsize"]
        copies = [struct.unpack_from("<II", data, p + 8 * j) for j in range(s["copycount"])]
        p += 8 * s["copycount"] + 6 * s["omcount"]
        rel = {}
        if s["relsize"]:
            cnt = struct.unpack_from("<I", data, p)[0]
            for j in range(cnt):
                fid, idx = struct.unpack_from("<II", data, p + 12 + 8 * j)
                rel[idx] = fid
        for r in range(s["count"]):
            ro = s["off"] + r * rec_size
            rec = data[ro:ro + rec_size]
            row, pending = {}, []
            for fi, (col, (bit_off, nbits, add, st, v1, v2, v3)) in enumerate(zip(fields, info)):
                cnt = col["count"]
                if st == 0:
                    esz = nbits // 8 // cnt
                    vals = []
                    for e in range(cnt):
                        o = bit_off // 8 + e * esz
                        if col["kind"] == "str":
                            v = struct.unpack_from("<I", rec, o)[0]
                            vals.append(string_at((first_rec[k] + r - total) * rec_size + o + v) if v else "")
                        elif col["kind"] == "float":
                            vals.append(struct.unpack_from("<f", rec, o)[0])
                        else:
                            vals.append(_int(int.from_bytes(rec[o:o + esz], "little"), esz * 8, col["signed"]))
                elif st in (1, 5):
                    vals = [_int(_bits(rec, bit_off, nbits), nbits, st == 5)]
                elif st == 2:
                    vals = [v1]; pending.append(fi)
                elif st == 3:
                    vals = [struct.unpack_from("<I", pallet, pal_off[fi] + 4 * _bits(rec, bit_off, nbits))[0]]
                else:
                    vals = list(struct.unpack_from("<%dI" % v3, pallet, pal_off[fi] + 4 * v3 * _bits(rec, bit_off, nbits)))
                if st in (2, 3, 4):
                    vals = [as_float(v) if col["kind"] == "float" else _int(v, 32, col["signed"]) for v in vals]
                row[col["name"]] = vals[0] if cnt == 1 else vals
            rid = ids[r] if flags & 4 else row[fields[id_index]["name"]]
            for fi in pending:
                col = fields[fi]
                v = commons[fi].get(rid)
                if v is not None:
                    row[col["name"]] = as_float(v) if col["kind"] == "float" else _int(v, 32, col["signed"])
            if noninline_rel and r in rel:
                row[noninline_rel] = rel[r]
            row[id_name] = rid
            rows[rid] = row
        for new, old in copies:
            if old in rows:
                rows[new] = dict(rows[old], **{id_name: new})
    return rows


def _read_sparse(data, sections, fields, noninline_rel, id_name):
    """Sparse tables keep each record whole, strings inline, found through an offset map."""
    rows = {}
    for s in sections:
        if s["key"] and not any(data[s["off"]:s["off"] + 64]):
            continue
        p = s["end"]
        ids = struct.unpack_from("<%dI" % (s["idsize"] // 4), data, p)
        p += s["idsize"]
        copies = [struct.unpack_from("<II", data, p + 8 * j) for j in range(s["copycount"])]
        p += 8 * s["copycount"]
        omap = [struct.unpack_from("<IH", data, p + 6 * j) for j in range(s["omcount"])]
        p += 6 * s["omcount"] + s["relsize"]
        om_ids = struct.unpack_from("<%dI" % s["omcount"], data, p)
        for j, (off, size) in enumerate(omap):
            if size:
                row, _ = _unpack(data, off, fields)
                row[id_name] = ids[j] if ids else om_ids[j]
                rows[row[id_name]] = row
        for new, old in copies:
            if old in rows:
                rows[new] = dict(rows[old], **{id_name: new})
    return rows


def _unpack(buf, q, cols):
    """Read whole (unpacked) values one after another: sparse records and hotfixes."""
    row = {}
    for col in cols:
        vals = []
        for _ in range(col["count"]):
            if col["kind"] == "str":
                e = buf.index(ZERO, q)
                vals.append(buf[q:e].decode("utf-8", "replace")); q = e + 1
            elif col["kind"] == "float":
                vals.append(struct.unpack_from("<f", buf, q)[0]); q += 4
            else:
                w = col["bits"] // 8
                vals.append(_int(int.from_bytes(buf[q:q + w], "little"), col["bits"], col["signed"])); q += w
        row[col["name"]] = vals[0] if col["count"] == 1 else vals
    return row, q


# ---------- hotfixes (Cache/ADB/<locale>/DBCache.bin) ----------

def read_hotfix_file(path):
    """All entries in one DBCache.bin, in file order: (table_hash, record_id, status, data).
    status 1 = new/changed record, 2 = record removed."""
    b = open(path, "rb").read()
    assert b[:4] == b"XFTH", "not a DBCache.bin"
    version = struct.unpack_from("<I", b, 4)[0]
    pos = 12 + (32 if version >= 9 else 0)
    out = []
    while pos + 32 <= len(b) and b[pos:pos + 4] == b"XFTH":
        table, rid, size, status = struct.unpack_from("<IIIB", b, pos + 16)
        out.append((table, rid, status, b[pos + 32:pos + 32 + size]))
        pos += 32 + size
    return out


def apply_hotfixes(rows, entries, table_hash, layout):
    """Apply the hotfixes for one table onto rows read from its .db2."""
    id_col = next((c for c in layout if c["id"]), None)
    cols = [c for c in layout if c["inline"]] + [c for c in layout if not c["inline"] and not c["id"]]
    id_name = id_col["name"] if id_col else "ID"
    for table, rid, status, data in entries:
        if table != table_hash:
            continue
        if status == 1:
            try:
                row, _ = _unpack(data, 0, cols)
            except (ValueError, struct.error):
                continue
            row[id_name] = rid
            rows[rid] = row
        elif status == 2:
            rows.pop(rid, None)
    return rows
