"""Minimal read-only CASC reader for a local WoW install.

Reads the game's own archives (nothing is downloaded or changed) and pulls
files out by path, e.g. Interface\\Icons\\INV_Misc_Note_01.blp.

Used by tools/extract-icons.py. Format notes: https://wowdev.wiki/CASC
"""
import os, sys, struct, zlib, glob

# ---------- Jenkins lookup3 hashlittle2 (CASC root name hashes) ----------
M = 0xFFFFFFFF
def rot(x, k): return ((x << k) | (x >> (32 - k))) & M
def hashlittle2(data, pc=0, pb=0):
    length = len(data)
    a = b = c = (0xdeadbeef + length + pc) & M
    c = (c + pb) & M
    i = 0
    while length > 12:
        a = (a + struct.unpack_from("<I", data, i)[0]) & M
        b = (b + struct.unpack_from("<I", data, i + 4)[0]) & M
        c = (c + struct.unpack_from("<I", data, i + 8)[0]) & M
        a = (a - c) & M; a ^= rot(c, 4);  c = (c + b) & M
        b = (b - a) & M; b ^= rot(a, 6);  a = (a + c) & M
        c = (c - b) & M; c ^= rot(b, 8);  b = (b + a) & M
        a = (a - c) & M; a ^= rot(c, 16); c = (c + b) & M
        b = (b - a) & M; b ^= rot(a, 19); a = (a + c) & M
        c = (c - b) & M; c ^= rot(b, 4);  b = (b + a) & M
        length -= 12; i += 12
    if length == 0:
        return c, b
    tail = data[i:] + b"\0" * (12 - length)
    a = (a + struct.unpack_from("<I", tail, 0)[0]) & M
    b = (b + struct.unpack_from("<I", tail, 4)[0]) & M
    c = (c + struct.unpack_from("<I", tail, 8)[0]) & M
    c ^= b; c = (c - rot(b, 14)) & M
    a ^= c; a = (a - rot(c, 11)) & M
    b ^= a; b = (b - rot(a, 25)) & M
    c ^= b; c = (c - rot(b, 16)) & M
    a ^= c; a = (a - rot(c, 4)) & M
    b ^= a; b = (b - rot(a, 14)) & M
    c ^= b; c = (c - rot(b, 24)) & M
    return c, b

def name_hash(path):
    p = path.replace("/", "\\").upper().encode()
    c, b = hashlittle2(p)
    return (c << 32) | b

# ---------- BLTE ----------
def blte(buf, zero_encrypted=False):
    """zero_encrypted: fill encrypted chunks with zeros (DB2 tables mark those
    sections as encrypted and readers skip them) instead of failing."""
    assert buf[:4] == b"BLTE", "not BLTE"
    hsize = struct.unpack_from(">I", buf, 4)[0]
    if hsize == 0:
        chunks = [(len(buf) - 8, None)]
        pos = 8
    else:
        count = int.from_bytes(buf[9:12], "big")
        chunks = []
        for k in range(count):
            csize, dsize = struct.unpack_from(">II", buf, 12 + k * 24)
            chunks.append((csize, dsize))
        pos = hsize
    out = bytearray()
    for csize, dsize in chunks:
        chunk = buf[pos:pos + csize]
        pos += csize
        mode = chunk[:1]
        if mode == b"N": out += chunk[1:]
        elif mode == b"Z": out += zlib.decompress(chunk[1:])
        elif mode == b"F": out += blte(chunk[1:], zero_encrypted)
        elif mode == b"E" and zero_encrypted and dsize: out += bytes(dsize)
        elif mode == b"E": raise ValueError("encrypted chunk")
        else: raise ValueError("unknown BLTE mode %r" % mode)
    return bytes(out)

class Casc:
    def __init__(self, product_dir):
        self.root_dir = os.path.dirname(os.path.abspath(product_dir))
        data = os.path.join(self.root_dir, "Data")
        self.data_dir = os.path.join(data, "data")
        info = open(os.path.join(self.root_dir, ".build.info"), encoding="utf-8").read().splitlines()
        cols = [c.split("!")[0] for c in info[0].split("|")]
        rows = [dict(zip(cols, r.split("|"))) for r in info[1:] if r.strip()]
        row = next((r for r in rows if r.get("Active") == "1"), rows[0])
        bk = row["Build Key"]
        cfg = open(os.path.join(data, "config", bk[:2], bk[2:4], bk), encoding="utf-8").read().splitlines()
        self.cfg = {l.split(" = ")[0]: l.split(" = ")[1].split() for l in cfg if " = " in l}
        self._load_idx()
        enc_ekey = bytes.fromhex(self.cfg["encoding"][1])
        self.encoding = blte(self.read_ekey(enc_ekey))
        root_ckey = bytes.fromhex(self.cfg["root"][0])
        self.root = blte(self.read_ekey(self.ckeys_to_ekeys({root_ckey})[root_ckey]))
        self._parse_root()

    def _load_idx(self):
        latest = {}
        for f in glob.glob(os.path.join(self.data_dir, "*.idx")):
            n = os.path.basename(f)
            bucket, ver = int(n[:2], 16), int(n[2:10], 16)
            if bucket not in latest or ver > latest[bucket][0]:
                latest[bucket] = (ver, f)
        self.idx = {}
        for _, f in latest.values():
            b = open(f, "rb").read()
            hhs = struct.unpack_from("<I", b, 0)[0]
            pos = (8 + hhs + 15) & ~15
            esize = struct.unpack_from("<I", b, pos)[0]
            pos += 8
            for k in range(esize // 18):
                e = b[pos + k * 18: pos + k * 18 + 18]
                key = e[:9]
                packed = int.from_bytes(e[9:14], "big")
                size = struct.unpack_from("<I", e, 14)[0]
                if key not in self.idx:
                    self.idx[key] = (packed >> 30, packed & 0x3FFFFFFF, size)

    def read_ekey(self, ekey):
        arc, off, size = self.idx[ekey[:9]]
        with open(os.path.join(self.data_dir, "data.%03d" % arc), "rb") as fh:
            fh.seek(off + 30)                  # skip the 30-byte local header
            return fh.read(size - 30)

    def ckeys_to_ekeys(self, want):
        e = self.encoding
        assert e[:2] == b"EN"
        ckl, ekl = e[3], e[4]
        cps = struct.unpack_from(">H", e, 5)[0] * 1024
        cpc = struct.unpack_from(">I", e, 9)[0]
        espec = struct.unpack_from(">I", e, 18)[0]
        pos = 22 + espec + cpc * (ckl + 16)
        found = {}
        for p in range(cpc):
            q, end = pos + p * cps, pos + (p + 1) * cps
            while q < end:
                n = e[q]
                if n == 0: break
                ck = e[q + 6:q + 6 + ckl]
                if ck in want:
                    found[ck] = e[q + 6 + ckl:q + 6 + ckl + ekl]
                q += 6 + ckl + n * ekl
            if len(found) == len(want): break
        return found

    def _parse_root(self):
        r = self.root
        self.by_hash, self.by_fdid = {}, {}
        pos, version = 0, 1
        if r[:4] == b"TSFM":
            a, b = struct.unpack_from("<II", r, 4)
            if a < 100:                       # 10.1.7+: header size, version
                version = b
                pos = a
            else:
                pos = 12
        while pos < len(r):
            n = struct.unpack_from("<I", r, pos)[0]
            if version >= 2:
                locale, f1, f2, f3 = struct.unpack_from("<IIIB", r, pos + 4)
                content = f1 | f2 | (f3 << 17)
                pos += 17
            else:
                content, locale = struct.unpack_from("<II", r, pos + 4)
                pos += 12
            fdids, fd = [], -1
            for k in range(n):
                fd += 1 + struct.unpack_from("<I", r, pos + 4 * k)[0]
                fdids.append(fd)
            pos += 4 * n
            ckeys = [r[pos + 16 * k: pos + 16 * k + 16] for k in range(n)]
            pos += 16 * n
            hashes = None
            if not (content & 0x10000000):
                hashes = struct.unpack_from("<%dQ" % n, r, pos)
                pos += 8 * n
            good = locale & 0x2 or locale == 0xFFFFFFFF or locale & 0x1F7FE == 0x1F7FE
            for k in range(n):
                if hashes and (hashes[k] not in self.by_hash or good):
                    self.by_hash[hashes[k]] = ckeys[k]
                if fdids[k] not in self.by_fdid or good:
                    self.by_fdid[fdids[k]] = ckeys[k]

    def read_path(self, path):
        ck = self.by_hash.get(name_hash(path))
        if ck is None: return None
        ek = self.ckeys_to_ekeys({ck}).get(ck)
        return blte(self.read_ekey(ek)) if ek else None

    def read_fdid(self, fdid, zero_encrypted=False):
        ck = self.by_fdid.get(fdid)
        if ck is None: return None
        ek = self.ckeys_to_ekeys({ck}).get(ck)
        return blte(self.read_ekey(ek), zero_encrypted) if ek else None
