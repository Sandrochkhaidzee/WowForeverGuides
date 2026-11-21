"""Copy the game icons this site uses out of your own WoW: Forever install.

    python tools/extract-icons.py "E:/World of Warcraft/_forever_"

It looks through the site's .js and .html files for icon names
(inv_..., ability_..., spell_..., trade_..., achievement_..., classicon_...)
and saves each one as assets/icons/<name>.jpg (64x64). Run it again after
adding a character or a new icon name; icons already there are skipped
unless you add --all.

Nothing in the game folder is changed. Needs Pillow:  pip install pillow
"""
import io
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from casc import Casc  # noqa: E402

SITE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(SITE, "assets", "icons")
NAME = re.compile(r"\b((?:inv|ability|spell|trade|achievement|classicon)_[a-z0-9_]+)\b")


def wanted():
    names = set()
    for folder, dirs, files in os.walk(SITE):
        dirs[:] = [d for d in dirs if not d.startswith(".") and d not in ("tools", "icons", "fonts")]
        for f in files:
            if f.endswith((".js", ".html")):
                text = open(os.path.join(folder, f), encoding="utf-8").read()
                names |= set(n.lower() for n in NAME.findall(text))
    return sorted(names)


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    if not args:
        sys.exit(__doc__)
    from PIL import Image

    os.makedirs(OUT, exist_ok=True)
    names = wanted()
    todo = names if "--all" in sys.argv else [n for n in names if not os.path.exists(os.path.join(OUT, n + ".jpg"))]
    print(f"{len(names)} icon names in the site, {len(todo)} to extract")
    if not todo:
        return
    casc = Casc(args[0])
    missing = []
    for n in todo:
        try:
            blp = casc.read_path("Interface\\Icons\\" + n + ".blp")
        except Exception as ex:  # damaged or encrypted entry
            print("  error", n, ex)
            blp = None
        if not blp:
            missing.append(n)
            continue
        Image.open(io.BytesIO(blp)).convert("RGB").save(os.path.join(OUT, n + ".jpg"), quality=92, optimize=True)
        print("  saved", n)
    if missing:
        print("Not in this install (the site falls back to Wowhead for these):", ", ".join(missing))


if __name__ == "__main__":
    main()
