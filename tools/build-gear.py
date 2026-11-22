"""Build <character>/data/gear.js: the gear the Gear tab shows at each guide step.

    python tools/build-gear.py              all characters
    python tools/build-gear.py gnome-mage   one character (its id in assets/js/characters.js)

Where the items come from, for each character's guide (<folder>/data/guide.js):
  1. Every quest a step names in <b>bold</b> (looked up on classicdb.ch by name).
     You get its reward at the last step that names it.
  2. The follow-up quests of those (classicdb's "Open Quests"), up to 5 deep: the guide
     often names only the first quest of a chain, and the reward comes at the end.
  3. The other quests in the zones each step sends you to (a step's first map zone),
     at the levels the guide has you there. Cities, reputation turn-ins and raid/dungeon
     quests are left out.
  4. tools/gear-extra.json: items the guide names that classicdb gets wrong or doesn't
     have (bought wands, WoW: Forever changes), and quests whose classicdb reward to skip.
Item stats and icons come from Wowhead's classic tooltips.

Then it walks the steps in order, "equipping" each reward that beats what's worn, for the
class's stats (CLASSES below). A reward with a choice takes the single best option.

Downloads are cached in tools/.gear-cache (delete it to fetch everything again; the first
run takes about 30 minutes because the sites are slow and rate-limited). Needs Node.js
(to read the guide data) and curl. Steps are saved by title, so adding steps to a guide
doesn't break gear.js, but run this again after changing which quests or zones a guide uses.
Afterwards run tools/extract-icons.py so the new item icons are stored with the site.
"""
import html
import json
import os
import re
import subprocess
import sys
import time
from concurrent.futures import ThreadPoolExecutor
from urllib.parse import quote
import urllib.request

SITE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE = os.path.join(SITE, "tools", ".gear-cache")
EXTRA = json.load(open(os.path.join(SITE, "tools", "gear-extra.json"), encoding="utf-8"))
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"

# What each class wants. w = value of one point of a stat; wdps = value of one point of weapon DPS.
CLASSES = {
    "Mage": dict(armor={"Cloth", ""}, weap1={"Dagger", "Sword"}, weap2={"Staff"}, ranged={"Wand"}, held=True, dual=False,
                 w=dict(Intellect=1.0, Stamina=.65, Spirit=.55, sp=1.1, sp_Frost=.9, crit=8, hit=6, Armor=.015, Agility=.05, Strength=0),
                 wdps=dict(melee=.15, ranged=1.6), word="cloth",
                 stats=["Intellect", "Stamina", "Spirit", "Agility", "Strength"]),
    "Rogue": dict(armor={"Leather", "Cloth", ""}, weap1={"Dagger", "Sword", "Mace", "Fist Weapon"}, weap2=set(),
                  ranged={"Bow", "Gun", "Crossbow", "Thrown"}, held=False, dual=True,
                  w=dict(Agility=1.0, Stamina=.6, Strength=.5, ap=.5, crit=14, hit=12, Armor=.02, Spirit=.05, Intellect=0),
                  wdps=dict(melee=2.4, ranged=.5), word="leather",
                  stats=["Agility", "Stamina", "Strength", "Spirit", "Intellect"]),
}
SKIP_ZONES = {"Stormwind", "Ironforge", "Darnassus", "Orgrimmar", "Thunder Bluff", "Undercity"}
SKIP_QUESTS = re.compile(r"Armaments of|The Argent Hold|Reputation")


# ---------------------------------------------------------------- downloads (cached)

def get(url, key):
    path = os.path.join(CACHE, re.sub(r"[^A-Za-z0-9_.-]", "_", key))
    if os.path.exists(path):
        return open(path, encoding="utf-8").read()
    for attempt in range(4):
        # classicdb answers most requests in half a second but sometimes hangs: give up fast and try again.
        # Wowhead refuses Python's own client, so it goes through curl.
        try:
            if "wowhead" in url:
                text = subprocess.run(["curl", "-sL", "-m", "25", "-A", UA, url], capture_output=True).stdout.decode("utf-8", "replace")
            else:
                text = urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA}), timeout=8).read().decode("utf-8", "replace")
        except Exception:
            text = ""
        if text and "Request blocked" not in text and "403 ERROR" not in text:
            open(path, "w", encoding="utf-8").write(text)
            return text
        time.sleep(1 + attempt * 2)
    print("  could not download", url)
    return ""


def pmap(fn, xs, threads=3):
    with ThreadPoolExecutor(threads) as ex:
        return list(ex.map(fn, xs))


def search_quest(name):
    """classicdb quest ids with exactly this name"""
    t = get("https://classicdb.ch/opensearch.php?search=" + quote(name), "s_" + name).strip().lstrip("\ufeff")
    if not t.startswith("["):
        t = "[" + t          # classicdb drops the opening bracket
    try:
        res = json.loads(t)
    except ValueError:
        return []
    if len(res) < 8:
        return []
    return [meta[1] for label, meta in zip(res[1], res[7]) if meta[0] == 5 and label.lower() == (name + " (quest)").lower()]


def quest_page(qid):
    return get(f"https://classicdb.ch/?quest={qid}", f"q_{qid}")


def quest(qid):
    """rewards, level and side of a quest, from its classicdb page"""
    t = quest_page(qid)
    i = t.find("<h3>Reward")
    j = t.find("<h3", i + 10)
    sec = t[i:j if j > 0 else i + 20000] if i >= 0 else ""
    low = sec.lower()
    ch = low.find("choose one of")
    rc = max(low.find("you will also receive"), low.find("you will receive"))
    items = []
    for m in re.finditer(r"\?item=(\d+)", sec):
        p = m.start()
        kind = "choice" if ch >= 0 and p > ch and (rc < 0 or p < rc or rc < ch) else "given"
        if ch >= 0 and rc > ch and p > rc:
            kind = "given"
        items.append([int(m.group(1)), kind])
    side = re.search(r'Side:\s*<span class="(\w+)-icon">', t)
    lvl = re.search(r"Level: (\d+)", t)
    title = re.search(r"<h1>([^<]+)</h1>", t)
    return dict(items=items, level=int(lvl.group(1)) if lvl else None, side=side.group(1) if side else None,
                title=re.sub(r" - Quest$", "", html.unescape(title.group(1).strip())) if title else str(qid))


def follow_ups(qid):
    t = quest_page(qid)
    i = t.find("Open Quests")
    return [int(x) for x in re.findall(r"\?quest=(\d+)", t[i:t.find("</ul>", i)])] if i >= 0 else []


ZONE_JS = r"""
const fs = require('fs'), out = {};
for (const f of process.argv.slice(1)) {
  const t = fs.readFileSync(f, 'utf8'), i = t.indexOf("template:'quest'");
  if (i < 0) { out[f] = []; continue; }
  const j = t.indexOf('data:[', i);
  let d = 0, k = j + 5;
  for (; k < t.length; k++) { if (t[k] === '[') d++; else if (t[k] === ']') { d--; if (!d) break; } }
  out[f] = Function('Array', 'return ' + t.slice(j + 5, k + 1) + ';')(Array);
}
console.log(JSON.stringify(out));
"""


def zone_quests(zone_ids):
    """every quest classicdb lists for each zone: id, name, level, side, itemrewards, itemchoices"""
    for z in zone_ids:
        get(f"https://classicdb.ch/?zone={z}", f"z_{z}")
    paths = [os.path.join(CACHE, f"z_{z}") for z in zone_ids]
    out = json.loads(subprocess.run(["node", "-e", ZONE_JS, *paths], capture_output=True, text=True, encoding="utf-8").stdout)
    return {z: out[p] for z, p in zip(zone_ids, paths)}


def item_tooltip(iid):
    t = get(f"https://nether.wowhead.com/classic/tooltip/item/{iid}?dataEnv=4&locale=0", f"i_{iid}")
    try:
        return json.loads(t)
    except ValueError:
        return None


# ---------------------------------------------------------------- the guides

GUIDE_JS = r"""
const fs = require('fs');
global.window = {}; global.document = { currentScript: null };
eval(fs.readFileSync(process.argv[1], 'utf8') + "\n;globalThis.__S = STEPS; globalThis.__Z = typeof ZONES !== 'undefined' ? ZONES : {};");
console.log(JSON.stringify({
  steps: __S.map((s, i) => {
    const txt = [s.title, ...(s.todo || []), s.tip || '', s.done || ''].join(' ');
    return { i, lv: s.lv, title: s.title, zones: (s.map || []).map((m) => m[0]),
             names: [...new Set([...txt.matchAll(/<b>([^<]+)<\/b>/g)].map((m) => m[1].trim()))] };
  }),
  zones: __Z,
}));
"""
CHARS_JS = r"""
global.window = globalThis; global.document = { currentScript: null };
eval(require('fs').readFileSync(process.argv[1], 'utf8'));
console.log(JSON.stringify(window.WF.characters));
"""


def node(js, *args):
    r = subprocess.run(["node", "-e", js, *args], capture_output=True, text=True, encoding="utf-8")
    if r.returncode:
        sys.exit(r.stderr)
    return json.loads(r.stdout)


# ---------------------------------------------------------------- items

def parse_item(iid, d):
    t = d["tooltip"]
    t = re.sub(r'<div class="whtt-sellprice">.*?</div>', "", t)
    t = re.sub(r"<!--.*?-->", "", t)
    t = re.sub(r"</td>\s*<th>", " | ", t)
    t = re.sub(r"<br\s*/?>|</tr>|</table>|<table[^>]*>", "\n", t)
    t = html.unescape(re.sub(r"<[^>]+>", "", t))
    lines = [re.sub(r"\s+", " ", l).strip() for l in t.split("\n")]
    lines = [re.sub(r" \|$", "", l) for l in lines if l]
    slot = kind = None
    for l in lines:
        m = re.match(r"^(Head|Neck|Shoulder|Back|Chest|Shirt|Tabard|Wrist|Hands|Waist|Legs|Feet|Finger|Trinket|One-Hand|"
                     r"Main Hand|Off Hand|Two-Hand|Held In Off-hand|Ranged|Thrown)(?: \| (.+))?$", l)
        if m:
            slot, kind = m.group(1), m.group(2) or ""
            break
    stats = {}
    for l in lines:
        for pat, key in ((r"^\+(\d+) (\w+)$", None), (r"^(\d+) Armor$", "Armor"), (r"^\(([\d.]+) damage per second\)$", "dps"),
                         (r"Increases damage and healing done by magical spells and effects by up to (\d+)", "sp"),
                         (r"\+(\d+) Attack Power", "ap"), (r"critical strike by (\d+)%", "crit"), (r"chance to hit by (\d+)%", "hit")):
            m = re.search(pat, l)
            if m:
                if key is None:
                    stats[m.group(2)] = int(m.group(1))
                else:
                    stats[key] = float(m.group(1)) if key == "dps" else int(m.group(1))
        m = re.search(r"Increases damage done by (Frost|Fire|Arcane) spells and effects by up to (\d+)", l)
        if m:
            stats["sp_" + m.group(1)] = int(m.group(2))
    req = next((int(m.group(1)) for l in lines for m in [re.match(r"^Requires Level (\d+)$", l)] if m), 1)
    classes = next((l[len("Classes: "):] for l in lines if l.startswith("Classes: ")), None)
    keep = [l.replace(" | ", " · ") for l in lines[1:] if not re.match(r"^(Item Level|Durability|Binds|Unique|Sell Price|Max Stack)", l)]
    return dict(id=iid, name=d["name"], icon=d["icon"], q=d["quality"], slot=slot, kind=kind, stats=stats, req=req, classes=classes, lines=keep)


ARMOR_SLOTS = {"Head": "head", "Shoulder": "shoulder", "Chest": "chest", "Wrist": "wrist", "Hands": "hands", "Waist": "waist",
               "Legs": "legs", "Feet": "feet", "Back": "back", "Shirt": "shirt", "Tabard": "tabard", "Neck": "neck"}


def fits(it, cls, p):
    """which kind of slot this item takes for this class, or None if it can't wear it"""
    if it["classes"] and cls not in it["classes"]:
        return None
    if any(re.match(r"^Requires (?!Level)", l) for l in it["lines"]):
        return None   # needs a profession, reputation or riding skill
    s, k = it["slot"], it["kind"]
    if not s:
        return None
    if s in ARMOR_SLOTS:
        return ARMOR_SLOTS[s] if s in ("Back", "Neck", "Shirt", "Tabard") or k in p["armor"] else None
    if s in ("Finger", "Trinket"):
        return s.lower()
    if s in ("One-Hand", "Main Hand"):
        return "1h" if k in p["weap1"] else None
    if s == "Off Hand":
        return "oh" if p["dual"] and k in p["weap1"] else None
    if s == "Two-Hand":
        return "2h" if k in p["weap2"] else None
    if s == "Held In Off-hand":
        return "held" if p["held"] else None
    if s in ("Ranged", "Thrown"):
        return "ranged" if k in p["ranged"] or (s == "Thrown" and "Thrown" in p["ranged"]) else None
    return None


def score(it, p, group):
    st = it["stats"]
    v = sum(p["w"].get(k, 0) * n for k, n in st.items() if k != "dps")
    if "dps" in st:
        v += st["dps"] * (p["wdps"]["ranged"] if group == "ranged" else p["wdps"]["melee"])
    return v + it["q"] * .3


# ---------------------------------------------------------------- the item pool (alternatives, auction house, crafting)

# classicdb item lists per class: (class.subclass, slot or None). Green and blue items, levels 1-60.
POOL_LISTS = {
    "Mage": [("4.1", None), ("4.0", 2), ("4.0", 11), ("4.0", 12), ("4.0", 23), ("2.10", None), ("2.15", None), ("2.7", None), ("2.19", None)],
    "Rogue": [("4.2", None), ("4.1", 16), ("4.0", 2), ("4.0", 11), ("4.0", 12), ("2.15", None), ("2.7", None), ("2.4", None),
              ("2.13", None), ("2.2", None), ("2.3", None), ("2.18", None), ("2.16", None)],
}
BANDS = [(1, 9)] + [(a, a + 4) for a in range(10, 60, 5)]
DUNGEONS = {2437: "Ragefire Chasm", 1581: "The Deadmines", 718: "Wailing Caverns", 209: "Shadowfang Keep", 717: "The Stockade",
            719: "Blackfathom Deeps", 721: "Gnomeregan", 796: "Scarlet Monastery", 491: "Razorfen Kraul", 722: "Razorfen Downs",
            1337: "Uldaman", 1176: "Zul'Farrak", 2100: "Maraudon", 1477: "Sunken Temple", 1584: "Blackrock Depths",
            1583: "Blackrock Spire", 2557: "Dire Maul", 2017: "Stratholme", 2057: "Scholomance"}
SKILLS = {197: "Tailoring", 165: "Leatherworking", 164: "Blacksmithing", 202: "Engineering", 333: "Enchanting", 171: "Alchemy"}

LISTVIEW_JS = r"""
// every Listview on each classicdb page given: {file: {listview id: data}}
const fs = require('fs'), out = {};
for (const f of process.argv.slice(1)) {
  const t = fs.readFileSync(f, 'utf8'), lv = {};
  const re = /new Listview\(\{template:\s*'(\w+)',\s*id:\s*'([\w-]+)'/g;
  let m;
  while ((m = re.exec(t))) {
    const j = t.indexOf('data:', m.index);
    if (t[j + 5] !== '[') continue;
    let d = 0, k = j + 5;
    for (; k < t.length; k++) { if (t[k] === '[') d++; else if (t[k] === ']') { d--; if (!d) break; } }
    try { lv[m[2]] = Function('Array', 'LANG', 'return ' + t.slice(j + 5, k + 1))(Array, {}); } catch (e) { /* skip */ }
  }
  out[f] = lv;
}
console.log(JSON.stringify(out));
"""


def listviews(paths):
    out = {}
    for n in range(0, len(paths), 150):          # keep the command line short
        r = subprocess.run(["node", "-e", LISTVIEW_JS, *paths[n:n + 150]], capture_output=True, text=True, encoding="utf-8")
        out.update(json.loads(r.stdout))
    return out


def pool_ids(cls):
    urls = []
    for c, sl in POOL_LISTS[cls]:
        for a, b in BANDS:
            f = f"qu=2:3;minrl={a};maxrl={b}" + (f";sl={sl}" if sl else "")
            urls.append((f"https://classicdb.ch/?items={c}&filter={f}", f"l_{c}_{sl}_{a}"))
    pmap(lambda u: get(*u), urls, 16)
    lv = listviews([os.path.join(CACHE, re.sub(r"[^A-Za-z0-9_.-]", "_", k)) for _, k in urls])
    return sorted({int(x["id"]) for v in lv.values() for x in v.get("items", [])})


def item_page(iid):
    return get(f"https://classicdb.ch/?item={iid}", f"ip_{iid}")


def pool_item(iid, page, lv):
    """tooltip data (same shape as Wowhead's) and where the item comes from, from its classicdb page"""
    m = re.search(r'<div id="tooltip\d+-generic" class="tooltip"[^>]*>(.*?)</div>', page, re.S)
    icon = re.search(r"ShowIconName\('([^']+)'\)", page)
    q = re.search(r'<b class="q(\d)">', page)
    if not (m and icon and q):
        return None
    tip = re.sub(r"<!--en:\d+-->", "", m.group(1))
    name = html.unescape(re.search(r'<b class="q\d">([^<]+)</b>', tip).group(1))
    d = dict(name=name, quality=int(q.group(1)), icon=icon.group(1).lower(), tooltip=tip)
    boe = "Binds when equipped" in tip
    src = None
    for qd in lv.get("reward-of", []):
        if qd.get("side") in ("1", "3", 1, 3):
            dung = DUNGEONS.get(qd.get("category")) if qd.get("type") == 81 else None
            src = ["quest", f"Quest: {qd['name']} (level {qd['level']}" + (f", {dung} dungeon quest)" if dung else ")")]
            break
    if not src and lv.get("dropped-by"):
        drops = lv["dropped-by"]
        locs = [(n.get("location") or [0]) for n in drops]
        locs = [x for l in locs for x in (l if isinstance(l, list) else [l])]
        dung = [DUNGEONS[x] for x in locs if x in DUNGEONS]
        if dung and len(drops) <= 4:
            boss = max(drops, key=lambda n: n.get("percent", 0))
            src = ["dungeon", f"Dungeon: {dung[0]} ({boss['name']}, {round(boss.get('percent', 0))}% drop)"]
        elif boe and len(drops) > 4:
            src = ["ah", "Auction House (a world drop: other players sell it)"]
    if not src and lv.get("created-by"):
        sp = lv["created-by"][0]
        skill = SKILLS.get((sp.get("skill") or [0])[0])
        lvl = (sp.get("colors") or [None, None])[1]
        if skill:
            src = ["craft", f"Crafted: {skill}{f' {lvl}' if lvl else ''}" + (" · or buy it at the Auction House" if boe else "")]
    # vendors the Alliance can use, but not PvP or reputation quartermasters (those need ranks or standing)
    friendly = [v for v in lv.get("sold-by", []) if (v.get("react") or [0])[0] == 1
                and not re.search(r"Supply Officer|Quartermaster|Requisition|Officer|Legate|Commander", v.get("tag", ""))]
    if not src and friendly:
        v = friendly[0]
        src = ["vendor", f"Sold by {v['name']}" + (f" ({v['tag']})" if v.get("tag") else "")]
    if not src and boe and lv.get("dropped-by"):
        src = ["ah", "Auction House (a rare drop: other players sell it)"]
    return (d, src) if src else None


def build_pool(cls, p, db):
    """the items worth listing as alternatives for this class: per slot group and level, the best few of each source"""
    cand = []
    # quest rewards from the zones the guides visit (their items have no level of their own: the quest's counts)
    every = dict(db["pool"])
    for iid, (name, zone, qlv, req) in db["questrewards"].items():
        if iid not in every and db["items"].get(iid):
            every[iid] = (dict(db["items"][iid], _req=req), ["quest", f"Quest: {name} ({zone}, level {qlv})"])
    for iid, (d, src) in every.items():
        it = parse_item(int(iid), d)
        it["req"] = max(it["req"], d.get("_req", 1))
        g = fits(it, cls, p)
        if not g:
            continue
        st = {k: v for k, v in it["stats"].items() if k not in ("Armor", "dps")}
        if g in ("finger", "trinket", "neck") and not st:
            continue
        if st and sum(p["w"].get(k, 0) * v for k, v in st.items()) <= .2 * sum(st.values()):
            continue
        cand.append((it, g, src, round(score(it, p, g), 1)))
    keep = set()
    for g in {c[1] for c in cand}:
        for L in range(1, 61):
            near = [c for c in cand if c[1] == g and L - 8 <= c[0]["req"] <= L]
            for kind in ("quest", "dungeon", "craft", "vendor", "ah"):
                for c in sorted((c for c in near if c[2][0] == kind), key=lambda c: -c[3])[:3]:
                    keep.add(c[0]["id"])
    return [{"id": it["id"], "n": it["name"], "i": it["icon"], "q": it["q"], "g": g, "req": it["req"], "sc": sc,
             "lines": it["lines"], "src": src} for it, g, src, sc in sorted(cand, key=lambda c: (c[1], c[0]["req"])) if it["id"] in keep]


# ---------------------------------------------------------------- one character

def build(char, guide, db):
    cls = char["cls"]
    p = CLASSES[cls]
    steps = guide["steps"]
    items = db["items"]
    step_lv = {r["i"]: int(re.match(r"\d+", r["lv"]).group()) for r in steps}
    last = {}
    for r in steps:
        for n in r["names"]:
            last[html.unescape(n)] = r["i"]

    events = []   # (step, where from, [(item id, "given" | "choice")])
    roots = {}    # quest id the guide names -> its step
    for name, ids in db["names"].items():
        if name not in last or name in EXTRA.get("skip", []):
            continue
        s = last[name]
        best = None
        for q in ids:
            qd = db["quests"].get(str(q))
            if not qd or qd.get("side") == "horde":
                continue
            d = abs((qd.get("level") or step_lv[s]) - step_lv[s])
            if best is None or d < best[0]:
                best = (d, q)
        if not best or best[0] > 12:
            continue
        roots[best[1]] = s
        events.append((s, f"Quest: {name}", db["quests"][str(best[1])]["items"]))
    for q, v in db["chain"].items():
        if v["root"] in roots:
            events.append((roots[v["root"]], f"Quest: {v['title']}", v["items"]))

    zid_of = {k: z["id"] for k, z in guide["zones"].items() if isinstance(z.get("id"), int)}
    known = set(roots) | {int(q) for q in db["chain"]}
    span = lambda lv: [int(n) for n in re.findall(r"\d+", lv)]
    for k, zid in zid_of.items():
        zname = guide["zones"][k]["name"]
        st = [(r["i"], min(span(r["lv"])), max(span(r["lv"]))) for r in steps if r["zones"] and r["zones"][0] == k]
        if not st or zname in SKIP_ZONES:
            continue
        for q in db["zones"].get(str(zid), []):
            L = int(q.get("level") or 0)
            if (SKIP_QUESTS.search(q["name"]) or q.get("side") not in ("1", "3") or int(q["id"]) in known or L <= 0
                    or q.get("type", 0) not in (0, 1) or L > max(h for _, _, h in st) + 2 or L < min(l for _, l, _ in st) - 4):
                continue
            s = next((i for i, lo, hi in st if hi >= L), st[-1][0])   # first step there you're high enough for
            rw = [[i, "given"] for i, _ in q.get("itemrewards") or []] + [[i, "choice"] for i, _ in q.get("itemchoices") or []]
            events.append((s, f"Quest: {q['name']} ({zname})", rw))

    idx = {r["title"]: r["i"] for r in steps}
    for e in EXTRA.get(char["id"], []):
        ids = e.get("ids") or [e["id"]]
        events.append((idx[e["step"]], e["from"], [[i, "choice" if len(ids) > 1 else "given"] for i in ids]))
    events.sort(key=lambda e: e[0])

    worn, out, src_of = {}, [], {}

    def put(slot, it, s, src):
        worn[slot] = it
        src_of.setdefault(it["id"], src)
        out.append(dict(s=s, slot=slot, it=it, src=src_of[it["id"]]))

    for s, src, rw in events:
        lv = step_lv[s]
        options = []
        for iid, kind in rw:
            if not items.get(str(iid)):
                continue
            it = parse_item(iid, items[str(iid)])
            g = fits(it, cls, p)
            if not g or it["req"] > lv + 2:
                continue
            st = {k: v for k, v in it["stats"].items() if k not in ("Armor", "dps")}
            if g in ("finger", "trinket", "neck") and not st:
                continue   # a ring, necklace or trinket with nothing useful on it
            if st and sum(p["w"].get(k, 0) * v for k, v in st.items()) <= .2 * sum(st.values()):
                continue   # stats for another class (e.g. Intellect on a rogue)
            options.append((it, g, kind))

        def gain(it, g):
            sc = score(it, p, g)
            if g in ("finger", "trinket"):
                a, b = worn.get(g + "1"), worn.get(g + "2")
                if (a and a["id"] == it["id"]) or (b and b["id"] == it["id"]):
                    return 0, None
                low = min((score(x, p, g) if x else 0) for x in (a, b))
                return sc - low, g + "1" if not a else g + "2" if not b else (g + "1" if score(a, p, g) <= score(b, p, g) else g + "2")
            if g == "2h":
                return sc - sum(score(worn[k], p, "x") for k in ("main", "off") if worn.get(k)), "2h"
            if g == "1h":
                m, o = worn.get("main"), worn.get("off")
                if p["dual"] and lv >= 10:                 # dual wield: replace the weaker hand
                    sm = score(m, p, "1h") if m else 0
                    so = score(o, p, "1h") if o else 0
                    if it["slot"] == "Main Hand":          # can't go in the off hand
                        return (sc - sm, "main") if sc > sm else (0, None)
                    if sc - min(sm, so) <= 0:
                        return 0, None
                    return (sc - min(sm, so), "main") if sc > sm else (sc - so, "off")
                cur = score(m, p, "1h") if m else 0
                if m and fits(m, cls, p) == "2h":
                    return sc + (score(o, p, "held") if o else 0) - cur, "main"
                return sc - cur, "main"
            if g == "oh":
                o = worn.get("off")
                return sc - (score(o, p, "1h") if o else 0), "off"
            if g == "held":
                m, o = worn.get("main"), worn.get("off")
                if m and fits(m, cls, p) == "2h":
                    return -1, None                        # needs a one-hander first
                return sc - (score(o, p, "held") if o else 0), "off"
            cur = worn.get(g)
            return sc - (score(cur, p, g) if cur else 0), g

        took_choice = False
        for (gv, tgt), it, g, kind in sorted(((gain(it, g), it, g, kind) for it, g, kind in options), key=lambda x: -x[0][0]):
            if gv <= .05 or not tgt or (kind == "choice" and took_choice):
                continue
            took_choice |= kind == "choice"
            if tgt == "2h":
                put("main", it, s, src)
                if worn.pop("off", None):
                    out.append(dict(s=s, slot="off", clear=True))
            elif tgt == "main" and p["dual"] and lv >= 10 and worn.get("main"):
                old, o = worn["main"], worn.get("off")       # the old main hand moves to the off hand if it's better there
                put("main", it, s, src)
                if old["slot"] != "Main Hand" and (not o or score(old, p, "1h") > score(o, p, "1h")):
                    put("off", old, s, src_of[old["id"]])
            else:
                put(tgt, it, s, src)

    title = {r["i"]: r["title"] for r in steps}
    rows = []
    for o in out:
        if o.get("clear"):
            rows.append(dict(step=title[o["s"]], slot=o["slot"], clear=True))
        else:
            it = o["it"]
            g = fits(it, cls, p)
            rows.append({"step": title[o["s"]], "slot": o["slot"], "id": it["id"], "n": it["name"], "i": it["icon"],
                         "q": it["q"], "g": g, "sc": round(score(it, p, g), 1), "lines": it["lines"], "from": o["src"]})
    pool = build_pool(cls, p, db)
    head = f"""/* {char['name']}: the gear this guide's quests give you, for the Gear tab (assets/js/gear.js).
   Made by tools/build-gear.py: for each quest you hand in, its reward is checked against what
   you're wearing, and the best upgrade for a {cls.lower()} is put on. Don't edit by hand; change
   tools/gear-extra.json and run the tool again.
   step = title of the guide step where you get it. Item data: classicdb.ch and Wowhead classic.
   An item with clear:true empties that slot from that step (a staff takes both hands).
   g = slot group, sc = how good it is for this class (higher is better), req = level needed.
   pool = other items for each slot (alternatives, and what to buy or craft for empty slots),
   src = [quest | dungeon | craft | vendor | ah, where it comes from]. */
const GEAR = {{
  stats: {json.dumps(p["stats"])},
  armor: "{p["word"]}",
  items: [
"""
    body = "\n".join("  " + json.dumps(r, ensure_ascii=False) + "," for r in rows)
    path = os.path.join(SITE, char["folder"], "data", "gear.js")
    pbody = "\n".join("  " + json.dumps(r, ensure_ascii=False) + "," for r in pool)
    open(path, "w", encoding="utf-8", newline="\n").write(head + body + "\n  ],\n  pool: [\n" + pbody + "\n  ],\n};\n")
    print(f"{char['name']}: {len(rows)} gear changes, {len(pool)} other items -> {os.path.relpath(path, SITE)}")


# ---------------------------------------------------------------- main

def main():
    os.makedirs(CACHE, exist_ok=True)
    chars = node(CHARS_JS, os.path.join(SITE, "assets", "js", "characters.js"))
    if len(sys.argv) > 1:
        chars = [c for c in chars if c["id"] in sys.argv[1:]]
    chars = [c for c in chars if c["cls"] in CLASSES or print(f"skipping {c['name']}: add {c['cls']} to CLASSES first")]
    guides = {c["id"]: node(GUIDE_JS, os.path.join(SITE, c["folder"], "data", "guide.js")) for c in chars}

    names = sorted({html.unescape(n) for g in guides.values() for r in g["steps"] for n in r["names"]})
    names = [n for n in names if 3 < len(n) < 60 and not re.match(r"^[\d\s/.+-]+$", n)]
    print(f"looking up {len(names)} bold names as quests…")
    found = dict(zip(names, pmap(search_quest, names)))
    db = {"names": {n: ids for n, ids in found.items() if ids}}
    qids = sorted({i for ids in db["names"].values() for i in ids})
    print(f"{len(qids)} quests; reading their pages…")
    db["quests"] = {str(q): v for q, v in zip(qids, pmap(quest, qids))}

    print("following quest chains…")
    chain, seen = {}, set(qids)
    frontier = [(q, q, 0) for q in qids]
    while frontier:
        nxt = []
        for (q, root, d), ups in zip(frontier, pmap(lambda f: follow_ups(f[0]), frontier)):
            for n in ups:
                if n not in seen and d < 5:
                    seen.add(n)
                    chain[n] = root
                    nxt.append((n, root, d + 1))
        frontier = nxt
    db["chain"] = {}
    for q, v in zip(sorted(chain), pmap(quest, sorted(chain))):
        root = db["quests"][str(chain[q])]
        if v["side"] != "horde" and not (v["level"] and root.get("level") and v["level"] > root["level"] + 8):
            db["chain"][str(q)] = dict(v, root=chain[q])

    zone_ids = sorted({z["id"] for g in guides.values() for z in g["zones"].values() if isinstance(z.get("id"), int)})
    print(f"reading the quest lists of {len(zone_ids)} zones…")
    db["zones"] = {str(k): v for k, v in zone_quests(zone_ids).items()}
    zone_name = {str(z["id"]): z["name"] for g in guides.values() for z in g["zones"].values() if isinstance(z.get("id"), int)}
    db["questrewards"] = {}      # item id -> (quest, zone, quest level, level needed): alternatives for the Gear tab
    for zid, qs in db["zones"].items():
        if zone_name.get(zid) in SKIP_ZONES:
            continue
        for q in qs:
            if q.get("side") in ("1", "3") and not SKIP_QUESTS.search(q["name"]) and q.get("type", 0) in (0, 1):
                L = int(q.get("level") or 0)
                for i, _ in (q.get("itemrewards") or []) + (q.get("itemchoices") or []):
                    db["questrewards"].setdefault(str(i), (q["name"], zone_name.get(zid, ""), L, int(q.get("reqlevel") or max(1, L - 5))))

    iids = {i for q in list(db["quests"].values()) + list(db["chain"].values()) for i, _ in q["items"]}
    iids |= {i for qs in db["zones"].values() for q in qs if q.get("side") in ("1", "3")
             for i, _ in (q.get("itemrewards") or []) + (q.get("itemchoices") or [])}
    iids |= {i for c in chars for e in EXTRA.get(c["id"], []) for i in e.get("ids") or [e["id"]]}
    iids = sorted(iids)
    print(f"reading {len(iids)} item tooltips…")
    db["items"] = {str(i): v for i, v in zip(iids, pmap(item_tooltip, iids, 2))}

    pids = sorted({i for c in chars for i in pool_ids(c["cls"])})
    print(f"reading {len(pids)} item pages for alternatives, auction house and crafting…")
    pages = pmap(item_page, pids, 12)
    lvs = listviews([os.path.join(CACHE, f"ip_{i}") for i in pids])
    db["pool"] = {}
    for i, page in zip(pids, pages):
        r = pool_item(i, page, lvs.get(os.path.join(CACHE, f"ip_{i}"), {}))
        if r:
            db["pool"][str(i)] = r

    for c in chars:
        build(c, guides[c["id"]], db)
    print("Now run: python tools/extract-icons.py \"E:/World of Warcraft/_forever_\"")


if __name__ == "__main__":
    main()
