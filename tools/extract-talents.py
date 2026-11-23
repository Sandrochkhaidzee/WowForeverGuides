"""Build data/talents/<class>.js: the talent trees of WoW: Forever, read from your own install.

    python tools/extract-talents.py "E:/World of Warcraft/_forever_"

WoW: Forever keeps its talents in the game's "trait" tables (the same system as the
talent window with Apply Changes). For every class that has a guide on this site
(assets/js/characters.js) it writes:
  - data/talents/<class>.js   each tree's talents: grid position, ranks, arrows,
                              icon and what every rank does
  - assets/icons/<icon>.jpg   the talent icons (64x64), if they aren't there yet
  - assets/img/talents/<tree>.jpg   the tree's background art

The server's newest changes (Cache/ADB/enUS/DBCache.bin) are applied on top, so
log in once before running it. Nothing in the game folder is changed.

Column layouts come from WoWDBDefs and file names from the community listfile
(both on GitHub; downloaded each run). Needs Pillow:  pip install pillow
"""
import csv
import glob
import io
import json
import math
import os
import re
import sys
import urllib.request
from collections import defaultdict

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from casc import Casc  # noqa: E402
from db2 import apply_hotfixes, parse_dbd, read_hotfix_file, read_table  # noqa: E402

SITE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DBD = "https://raw.githubusercontent.com/wowdev/WoWDBDefs/master/definitions/{}.dbd"
MANIFEST = "https://raw.githubusercontent.com/wowdev/WoWDBDefs/master/manifest.json"
LISTFILE = "https://raw.githubusercontent.com/wowdev/wow-listfile/master/parts/interface.csv"
CLASS_BIT = {"Warrior": 1, "Paladin": 2, "Hunter": 4, "Rogue": 8, "Priest": 16,
             "Shaman": 64, "Mage": 128, "Warlock": 256, "Druid": 1024}
GRID = 600                              # trait node spacing in the tree, in game units


def fetch(url):
    with urllib.request.urlopen(url, timeout=60) as r:
        return r.read()


# ---------- spell description text ----------

def fmt(v, decimals=None):
    if decimals is not None:
        return ("%." + str(decimals) + "f") % v
    if abs(v - round(v)) < 1e-6:
        return str(int(round(v)))
    return ("%.2f" % v).rstrip("0").rstrip(".")


def fmt_time(ms):
    s = ms / 1000
    if s >= 3600 and s % 3600 == 0: return "%d hrs" % (s // 3600) if s > 3600 else "1 hour"
    if s >= 60 and s % 60 == 0: return "%d min" % (s // 60)
    return fmt(s) + " sec"


class Spells:
    def __init__(self, t):
        self.name = t["SpellName"]
        self.text = t["Spell"]
        self.misc = {m["SpellID"]: m for m in t["SpellMisc"].values() if m.get("DifficultyID", 0) == 0}
        self.dur = t["SpellDuration"]
        self.effects = defaultdict(dict)
        for e in t["SpellEffect"].values():
            if e.get("DifficultyID", 0) == 0:
                self.effects[e["SpellID"]][e["EffectIndex"]] = e
        self.aura = {a["SpellID"]: a for a in t["SpellAuraOptions"].values() if a.get("DifficultyID", 0) == 0}

    def icon_fdid(self, spell):
        m = self.misc.get(spell)
        return m["SpellIconFileDataID"] if m else 0

    def duration(self, spell):
        m = self.misc.get(spell)
        d = self.dur.get(m["DurationIndex"]) if m else None
        return d["Duration"] if d else 0

    def describe(self, spell, points=None, text=None):
        """The spell's tooltip text with its numbers filled in. points: {effect index: value}
        overrides (a talent rank's values)."""
        points = points or {}
        text = text if text is not None else (self.text.get(spell) or {}).get("Description_lang", "")
        last = [1.0]

        def val(sid, letter, idx):
            own = sid == spell
            eff = self.effects.get(sid, {})
            i = (idx or 1) - 1
            if letter in "smMwfSW":
                if own and i in points: return points[i]
                e = eff.get(i)
                return e["EffectBasePointsF"] if e else 0
            if letter in "dD":
                return None if not self.duration(sid) else ("time", self.duration(sid))
            if letter in "tT":
                e = eff.get(i)
                return (e["EffectAuraPeriod"] / 1000) if e else 0
            if letter in "oO":
                e = eff.get(i)
                if not e or not e["EffectAuraPeriod"]: return 0
                bp = points.get(i, e["EffectBasePointsF"]) if own else e["EffectBasePointsF"]
                return bp * (self.duration(sid) / e["EffectAuraPeriod"])
            if letter in "hH":
                a = self.aura.get(sid)
                return a["ProcChance"] if a else 0
            if letter in "nN":
                a = self.aura.get(sid)
                return a["ProcCharges"] if a else 0
            if letter in "uU":
                a = self.aura.get(sid)
                return a["CumulativeAura"] if a else 0
            if letter in "xX":
                e = eff.get(i)
                return e["EffectChainTargets"] if e else 0
            if letter in "aA":
                return 0
            return 0

        def number(x):
            if isinstance(x, tuple):
                last[0] = x[1] / 1000
                return fmt_time(x[1])
            if x is None:
                return ""
            last[0] = abs(x)
            return fmt(abs(x))

        TOKEN = re.compile(r"(\d*)([a-zA-Z])(\d?)")

        def expr_value(m_expr):
            """${...}: arithmetic with $tokens inside."""
            body = m_expr
            body = re.sub(r"\$<[^>]+>", "0", body)
            body = re.sub(r"\$([A-Z]{2,}\w*)", "0", body)            # $SP, $AP, $SPFR ... (character stats)

            def rep(m):
                v = val(int(m.group(1)) if m.group(1) else spell, m.group(2), int(m.group(3) or 1))
                if isinstance(v, tuple): v = v[1] / 1000
                return repr(float(v or 0))
            body = re.sub(r"\$(\d*)([a-zA-Z])(\d?)", rep, body)
            if not re.fullmatch(r"[\d\s.+\-*/()e,a-z]*", body):
                return 0.0
            try:
                return float(eval(body, {"__builtins__": {}}, {"max": max, "min": min, "floor": math.floor, "ceil": math.ceil, "abs": abs}))
            except Exception:
                return 0.0

        out, i, n = [], 0, len(text)
        while i < n:
            ch = text[i]
            if ch == "|":                                              # |cFFxxxxxx ... |r colour codes
                m = re.match(r"\|c[0-9A-Fa-f]{8}|\|r|\|n", text[i:], re.I)
                if m:
                    if m.group(0).lower() == "|n": out.append("\n")
                    i += len(m.group(0)); continue
            if ch != "$" or i + 1 >= n:
                out.append(ch); i += 1; continue
            rest = text[i + 1:]
            if rest.startswith("?"):                                   # $?s123[yes][no], $?a1[x]?a2[y][z]
                j, last_group = i + 1, ""                              # we can't know: keep the last branch
                while j < n and text[j] == "?":
                    while j < n and text[j] != "[": j += 1
                    while j < n and text[j] == "[":
                        depth, k = 1, j + 1
                        while k < n and depth:
                            depth += {"[": 1, "]": -1}.get(text[k], 0); k += 1
                        last_group, j = text[j + 1:k - 1], k
                out.append(self.describe(spell, points, last_group))
                i = j; continue
            if rest.startswith("{"):                                   # ${expression}.decimals
                depth, k = 1, i + 2
                while k < n and depth:
                    depth += {"{": 1, "}": -1}.get(text[k], 0); k += 1
                v = expr_value(text[i + 2:k - 1])
                m = re.match(r"\.(\d)", text[k:])
                if m: k += 2
                last[0] = abs(v)
                out.append(fmt(abs(v), int(m.group(1)) if m else None)); i = k; continue
            m = re.match(r"([/*])(\d+);", rest)                         # $/1000;S1, $*2;s1
            if m:
                t = TOKEN.match(rest[m.end():])
                if t:
                    v = val(int(t.group(1)) if t.group(1) else spell, t.group(2), int(t.group(3) or 1))
                    v = v[1] if isinstance(v, tuple) else (v or 0)
                    v = v / int(m.group(2)) if m.group(1) == "/" else v * int(m.group(2))
                    out.append(number(v)); i += 1 + m.end() + t.end(); continue
            m = re.match(r"[lL]([^:;]*):([^;]*);", rest)                # $lpoint:points;
            if m:
                out.append(m.group(1) if last[0] == 1 else m.group(2)); i += 1 + m.end(); continue
            m = re.match(r"@spell(desc|name|aura)(\d+)", rest)
            if m:
                sid = int(m.group(2))
                if m.group(1) == "name": out.append((self.name.get(sid) or {}).get("Name_lang", ""))
                elif m.group(1) == "desc": out.append(self.describe(sid))
                i += 1 + m.end(); continue
            m = re.match(r"<[^>]+>", rest)
            if m:
                i += 1 + m.end(); continue
            t = TOKEN.match(rest)
            if t:
                out.append(number(val(int(t.group(1)) if t.group(1) else spell, t.group(2), int(t.group(3) or 1))))
                i += 1 + t.end(); continue
            out.append(ch); i += 1
        s = "".join(out).replace("\r", "")
        s = re.sub(r"(?<!\n)\n(?!\n)", " ", s)          # hard line breaks inside a sentence
        s = re.sub(r"[ \t]+", " ", s)
        s = re.sub(r" *\n+ *", "\n", s).strip()          # a blank line between parts becomes one break
        return s


# ---------- main ----------

def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    if not args:
        sys.exit(__doc__)
    from PIL import Image

    game = args[0]
    casc = Casc(game)
    build = casc_build(game)
    print("game build", build)
    manifest = {e["tableName"]: e for e in json.loads(fetch(MANIFEST))}

    hot = []
    cache = os.path.join(game, "Cache", "ADB", "enUS")
    files = sorted(glob.glob(os.path.join(cache, "DBCache.bin*")), key=os.path.getmtime)
    for f in files:
        try:
            hot += read_hotfix_file(f)
        except (OSError, AssertionError) as ex:   # the game keeps the newest one open while it runs
            print("  skipped", os.path.basename(f), "-", ex.__class__.__name__)
    print(len(hot), "hotfix entries")

    names = ["TraitTree", "TraitNode", "TraitNodeEntry", "TraitNodeXTraitNodeEntry", "TraitDefinition",
             "TraitDefinitionEffectPoints", "TraitEdge", "TraitNodeGroupXTraitNode", "TraitNodeGroupXTraitCond",
             "TraitCond", "CurvePoint", "TalentTab", "Talent", "SpellName", "Spell", "SpellMisc",
             "SpellEffect", "SpellDuration", "SpellAuraOptions"]
    t = {}
    for name in names:
        e = manifest[name]
        layout = parse_dbd(fetch(DBD.format(name)).decode("utf-8"), build)
        data = casc.read_fdid(e["db2FileDataID"], zero_encrypted=True)
        rows = read_table(data, layout) if data else {}
        apply_hotfixes(rows, hot, int(e["tableHash"], 16), layout)
        t[name] = rows
        print("  %-28s %d rows" % (name, len(rows)))
    spells = Spells(t)

    print("reading the listfile for icon names")
    files_by_id, id_by_file = {}, {}
    for row in csv.reader(io.StringIO(fetch(LISTFILE).decode("utf-8")), delimiter=";"):
        if len(row) == 2:
            files_by_id[int(row[0])] = row[1]
            id_by_file[row[1].lower()] = int(row[0])

    def read_file(path):
        fd = id_by_file.get(path.lower())
        return casc.read_fdid(fd) if fd else None

    def icon_name(fdid):
        p = files_by_id.get(fdid, "")
        if not p.lower().startswith("interface/icons/"):
            return "inv_misc_questionmark"
        return os.path.splitext(os.path.basename(p))[0].lower()

    curve = defaultdict(dict)
    for p in t["CurvePoint"].values():
        curve[p["CurveID"]][p["Pos"][0]] = p["Pos"][1]
    eff_points = defaultdict(dict)
    for p in t["TraitDefinitionEffectPoints"].values():
        eff_points[p["TraitDefinitionID"]][p["EffectIndex"]] = p["CurveID"]
    rank_spells = {tl["SpellRank"][0]: [s for s in tl["SpellRank"] if s] for tl in t["Talent"].values()}

    entries_of = defaultdict(list)
    for x in t["TraitNodeXTraitNodeEntry"].values():
        entries_of[x["TraitNodeID"]].append((x["Index"], t["TraitNodeEntry"].get(x["TraitNodeEntryID"])))
    groups_of = defaultdict(list)
    for x in t["TraitNodeGroupXTraitNode"].values():
        groups_of[x["TraitNodeID"]].append(x["TraitNodeGroupID"])
    gate = defaultdict(int)                  # node group -> points needed in the tree
    for x in t["TraitNodeGroupXTraitCond"].values():
        c = t["TraitCond"].get(x["TraitCondID"])
        if c and c["SpentAmountRequired"]:
            gate[x["TraitNodeGroupID"]] = max(gate[x["TraitNodeGroupID"]], c["SpentAmountRequired"])

    chars = open(os.path.join(SITE, "assets", "js", "characters.js"), encoding="utf-8").read()
    classes = sorted(set(re.findall(r'cls:\s*"(\w+)"', chars)))
    only = [a.split("=", 1)[1] for a in sys.argv if a.startswith("--class=")]   # --class=Druid: just that class's file
    if only:
        classes = [c for c in classes if c in only]
    icons, backgrounds = set(), set()
    out_dir = os.path.join(SITE, "data", "talents")
    os.makedirs(out_dir, exist_ok=True)

    for cls in classes:
        bit = CLASS_BIT[cls]
        tabs = sorted((x for x in t["TalentTab"].values() if x["ClassMask"] == bit), key=lambda x: x["OrderIndex"])
        class_spells = {s for tl in t["Talent"].values() if tl["TabID"] in {x["ID"] for x in tabs}
                        for s in tl["SpellRank"] if s}

        # the class's trait tree: the one whose talents are this class's talent spells
        def spells_in(tree_id):
            return {t["TraitDefinition"][e["TraitDefinitionID"]]["SpellID"]
                    for n in t["TraitNode"].values() if n["TraitTreeID"] == tree_id
                    for _i, e in entries_of[n["ID"]] if e and e["TraitDefinitionID"] in t["TraitDefinition"]}
        tree = max((x["ID"] for x in t["TraitTree"].values()), key=lambda tid: len(spells_in(tid) & class_spells))
        nodes = [n for n in t["TraitNode"].values() if n["TraitTreeID"] == tree and entries_of[n["ID"]]]
        print("%s: tree %d, %d talents" % (cls, tree, len(nodes)))

        # the three trees sit side by side: split the nodes where there's a wide gap
        xs = sorted({n["PosX"] for n in nodes})
        bands, cur = [], [xs[0]]
        for x in xs[1:]:
            if x - cur[-1] > GRID * 2:
                bands.append(cur); cur = [x]
            else:
                cur.append(x)
        bands.append(cur)
        assert len(bands) == len(tabs), "expected %d trees, found %d" % (len(tabs), len(bands))
        top = min(n["PosY"] for n in nodes)
        prereq = {e["RightTraitNodeID"]: e["LeftTraitNodeID"] for e in t["TraitEdge"].values()
                  if e["LeftTraitNodeID"] in {n["ID"] for n in nodes}}

        out_tabs, where = [], {}
        for k, (tab, band) in enumerate(zip(tabs, bands)):
            bg = tab["BackgroundFile"]
            backgrounds.add(bg)
            icon = icon_name(tab["SpellIconID"])
            icons.add(icon)
            talents = []
            for n in sorted((n for n in nodes if band[0] <= n["PosX"] <= band[-1]), key=lambda n: (n["PosY"], n["PosX"])):
                entry = sorted(entries_of[n["ID"]], key=lambda p: p[0])[0][1]
                d = t["TraitDefinition"][entry["TraitDefinitionID"]]
                sid = d["SpellID"]
                name = d["OverrideName_lang"] or (spells.name.get(sid) or {}).get("Name_lang", "?")
                ic = icon_name(d["OverrideIcon"] or spells.icon_fdid(sid))
                icons.add(ic)
                ranks = []
                for r in range(1, entry["MaxRanks"] + 1):
                    pts = {}
                    for ei, cid in eff_points[d["ID"]].items():
                        if r in curve[cid]: pts[ei] = curve[cid][r]
                    rs = rank_spells.get(sid, [])
                    if len(rs) >= r:
                        for ei, e in spells.effects.get(rs[r - 1], {}).items():
                            pts.setdefault(ei, e["EffectBasePointsF"])
                    ranks.append(spells.describe(sid, pts, d["OverrideDescription_lang"] or None))
                row = round((n["PosY"] - top) / GRID)
                need = max([gate[g] for g in groups_of[n["ID"]]] + [0])
                tl = {"id": n["ID"], "n": name, "r": row, "c": round((n["PosX"] - band[0]) / GRID),
                      "max": entry["MaxRanks"], "i": ic, "d": ranks}
                if need != row * 5:
                    tl["need"] = need
                talents.append(tl)
                where[n["ID"]] = tl
            out_tabs.append({"name": tab["Name_lang"], "bg": bg.lower(), "i": icon, "talents": talents})
        for right, left in prereq.items():
            if right in where and left in where:
                where[right]["req"] = left

        js = ("/* %s talent trees in WoW: Forever (game build %s).\n"
              "   Made by tools/extract-talents.py from the game's own files: don't edit by hand.\n"
              "   r/c = row and column in the tree, max = ranks, i = icon, d = what each rank does,\n"
              "   req = id of the talent that must be full first (the arrow). */\n"
              "const TALENT_TREE = %s;\n") % (cls, build, json.dumps(
                  {"cls": cls, "build": build, "tabs": out_tabs}, ensure_ascii=False, indent=1))
        path = os.path.join(out_dir, cls.lower() + ".js")
        open(path, "w", encoding="utf-8", newline="\n").write(js)
        print("  wrote", os.path.relpath(path, SITE))

    # icons
    icon_dir = os.path.join(SITE, "assets", "icons")
    for name in sorted(icons):
        p = os.path.join(icon_dir, name + ".jpg")
        if os.path.exists(p) and "--all" not in sys.argv:
            continue
        try:
            blp = read_file("interface/icons/" + name + ".blp")
        except Exception:
            blp = None
        if blp:
            Image.open(io.BytesIO(blp)).convert("RGB").save(p, quality=92, optimize=True)
            print("  icon", name)
        else:
            print("  icon not in this install (the site falls back to Wowhead):", name)

    # tree backgrounds: the game keeps each in four pieces
    bg_dir = os.path.join(SITE, "assets", "img", "talents")
    os.makedirs(bg_dir, exist_ok=True)
    for bg in sorted(backgrounds):
        p = os.path.join(bg_dir, bg.lower() + ".jpg")
        if os.path.exists(p) and "--all" not in sys.argv:
            continue
        parts = {}
        for piece in ("TopLeft", "TopRight", "BottomLeft", "BottomRight"):
            blp = read_file("interface/talentframe/%s-%s.blp" % (bg, piece))
            if blp:
                parts[piece] = Image.open(io.BytesIO(blp)).convert("RGB")
        if len(parts) < 4:
            print("  background not found:", bg)
            continue
        tl, tr, bl = parts["TopLeft"], parts["TopRight"], parts["BottomLeft"]
        full = Image.new("RGB", (tl.width + tr.width, tl.height + bl.height))
        full.paste(tl, (0, 0)); full.paste(tr, (tl.width, 0))
        full.paste(bl, (0, tl.height)); full.paste(parts["BottomRight"], (tl.width, tl.height))
        # the game shows the left 298 x 380 of it; the rest is padding
        full = full.crop((0, 0, min(full.width, 298), min(full.height, 380)))
        box = full.convert("L").point(lambda v: 255 if v > 10 else 0).getbbox()   # drop the black edge
        if box:
            full = full.crop((0, 0, box[2], box[3]))
        full.save(p, quality=88, optimize=True)
        print("  background", bg)


def casc_build(game):
    root = os.path.dirname(os.path.abspath(game))
    info = open(os.path.join(root, ".build.info"), encoding="utf-8").read().splitlines()
    cols = [c.split("!")[0] for c in info[0].split("|")]
    rows = [dict(zip(cols, r.split("|"))) for r in info[1:] if r.strip()]
    row = next((r for r in rows if r.get("Active") == "1"), rows[0])
    return row["Version"]


if __name__ == "__main__":
    main()
