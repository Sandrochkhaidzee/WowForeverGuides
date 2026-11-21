"""Save the zone maps the guides use into assets/maps/, so the site doesn't
depend on Wowhead's image server.

    python tools/get-maps.py                       # classic zone maps from Wowhead
    python tools/get-maps.py "E:/World of Warcraft/_forever_"   # also maps only the game has

It reads every ZONES table in <Character>/data/guide.js:
  - a numeric id (e.g. 10 = Duskwood) is downloaded once from Wowhead's classic
    map server as assets/maps/<id>.jpg (1022x668, fully explored);
  - an id that is a word (e.g. "hyjal") names a map that's only in the game files.
    With the game folder given, it's read from Interface/WorldMap/<Name>/ in your
    own install (nothing in the game folder is changed) and saved the same size.

Maps already there are skipped unless you add --all. Needs Pillow for game maps.
"""
import io
import os
import re
import sys
import urllib.request

SITE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(SITE, "assets", "maps")
WOWHEAD = "https://wow.zamimg.com/images/wow/classic/maps/enus/original/{}.jpg"
GAME_NAMES = {"hyjal": "Hyjal"}          # site id -> folder name in Interface/WorldMap
ID = re.compile(r'name:\s*"[^"]+",\s*id:\s*(\d+|"[a-z]+")')   # ZONES entries only


def wanted():
    ids = set()
    for name in os.listdir(SITE):
        p = os.path.join(SITE, name, "data", "guide.js")
        if os.path.isfile(p):
            ids |= {m.strip('"') for m in ID.findall(open(p, encoding="utf-8").read())}
    return sorted(ids)


def from_game(casc, folder):
    from PIL import Image
    full = Image.new("RGB", (1024, 768))
    for k in range(12):                               # 4 x 3 tiles of 256 px
        blp = casc.read_path("Interface\\WorldMap\\%s\\%s%d.blp" % (folder, folder, k + 1))
        if not blp:
            return None
        full.paste(Image.open(io.BytesIO(blp)).convert("RGB"), ((k % 4) * 256, (k // 4) * 256))
    return full.crop((0, 0, 1002, 668)).resize((1022, 668), Image.LANCZOS)   # same frame as Wowhead's


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    os.makedirs(OUT, exist_ok=True)
    ids = wanted()
    todo = ids if "--all" in sys.argv else [i for i in ids if not os.path.exists(os.path.join(OUT, i + ".jpg"))]
    print(f"{len(ids)} maps in the guides, {len(todo)} to get")
    casc = None
    for i in todo:
        dest = os.path.join(OUT, i + ".jpg")
        if i.isdigit():
            req = urllib.request.Request(WOWHEAD.format(i), headers={"User-Agent": "Mozilla/5.0 (map copy for a fan guide)"})
            with urllib.request.urlopen(req, timeout=30) as r:
                open(dest, "wb").write(r.read())
            print("  saved", i)
        elif i in GAME_NAMES:
            if not args:
                print("  skipped", i, "(needs the game folder)")
                continue
            if casc is None:
                sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
                from casc import Casc
                casc = Casc(args[0])
            img = from_game(casc, GAME_NAMES[i])
            if img is None:
                print("  not in this install:", i)
                continue
            img.save(dest, quality=88, optimize=True)
            print("  saved", i, "(from the game)")


if __name__ == "__main__":
    main()
