# WoW: Forever — Beginner Guides

Step-by-step beginner guides for WoW: Forever, styled like the in-game UI.

| Character | Leveling | Professions | Addons |
|---|---|---|---|
| Gnome Mage | [Guide](Mage%20Gnome/Gnome-Mage-WoW-Guide.html) | [Professions](Mage%20Gnome/Gnome-Mage-Professions.html) | [Addons](Mage%20Gnome/Gnome-Mage-Addons.html) |
| Night Elf Rogue | [Guide](Rogue%20Night%20Elf/NightElf-Rogue-WoW-Guide.html) | [Professions](Rogue%20Night%20Elf/NightElf-Rogue-Professions.html) | [Addons](Rogue%20Night%20Elf/NightElf-Rogue-Addons.html) |

`index.html` at the root is the landing page.

## What visitors get

- **Leveling guide**: one quest step at a time, zone maps with pins, the action bar for your level, talents and a searchable word list.
  - A **journey strip** shows every chapter (Shadowglen, Dolanaar, …) and where you are; click one to jump there.
  - Each step has a **badge** saying what kind it is (questing, trainer visit, talent point, travel, dungeon…).
  - **Tick off objectives** as you do them; the Next button turns green when all are done. Back / Next and
    "Up next" also sit under the step, so there's no scrolling back up.
  - Every step ends with a **Done when** line (how to tell it's finished) and, for quest steps, a
    **Still short of the level?** fallback saying where to fight for the last bit of XP.
  - **Simple view** (switch at the top of the Quest Guide, or in Settings) shows only the step:
    what to do, when it's done, Back / Next. The chapter strip, map and action bar are hidden.
  - The **Talents** tab highlights the talent for the level you're at.
- **How to Play** has a **Gear** card: item colours, the stats each class wants, a side-by-side
  "is this better?" example, and how to compare items in game.
- **How to Play** and **Profession Basics** are picture cards with a "jump to" row, an enemy level-colour scale,
  the class combo as real ability icons, and a skill-up chance bar for recipe colours.
- **Professions** and **Addons** pages for each character.
- **Help button (?)** on every page: how the page works, keyboard keys, and answers for when you're stuck.
- **First-visit welcome and a short guided tour** that points at each part of the page.
- **Settings (gear button)**: bigger text, high contrast, an easy-read font, animations on/off, floating embers on/off.
- **Progress is saved** in the browser; the landing page shows "Continue your journey" with where you stopped.
- Effects are **calm by default** (gentle fades only, nothing pulsing or sparkling). Settings → Animations →
  **Full** turns on glows, sparks, sliding pages and scroll-in animations. Floating embers have their own switch.
  There are no pop-up messages (no level-up banner or "step complete" notes).

## How the files are organised

```
index.html                 landing page (cards are built from the character registry)
404.html                   "page not found" for GitHub Pages
site.webmanifest           app name/icon when saved to a phone home screen
assets/
  css/core.css             shared look: colours, frames, tabs, buttons, tooltips
  css/guide.css            leveling-guide page (quest paper, map, action bars)
  css/professions.css      professions page
  css/addons.css           addons page
  css/home.css             landing page
  css/fx.css               animations + comfort settings (loaded last on every page)
  js/characters.js         THE CHARACTER REGISTRY: one entry per character
  js/guide.js              leveling-guide engine (steps, map, word popups, tabs)
  js/action-bars.js        action-bar engine (HUD, Action Bars tab, per-step bar box)
  js/professions.js        professions engine
  js/addons.js             addons engine (list, filters, folder scan)
  js/home.js               landing page: cards, "continue", class chooser
  js/site.js               shared layer: help, settings, tour, switcher, effects
  img/favicon.svg
<Character folder>/
  <Name>-WoW-Guide.html    page text (How to Play, etc.) + links to the shared files
  <Name>-Professions.html
  <Name>-Addons.html
  data/guide.js            steps, talents, words, zones, spells, action bars
  data/professions.js      profession routes
  data/addons.js           addon list with "why you want it" text
```

The **engines are shared**: fixing a bug in `assets/js/guide.js` fixes it for every character.
The **content lives in each character's `data/` folder**: editing a step never touches code.

Engines tell the shared layer what happened with DOM events (`wf:step`, `wf:tab`, `wf:progress`), so new
effects can be added in `site.js` without touching the engines.

## Adding a character

See [docs/ADDING-A-CHARACTER.md](docs/ADDING-A-CHARACTER.md). In short: copy a character folder,
edit its `data/*.js` and page text, and add one entry to `assets/js/characters.js`. The landing page,
the "Switch" menu and the class chooser pick it up automatically.

## Game icons

Every icon on the site (abilities, items, step badges, section cards) is a real game icon stored in
`assets/icons/<name>.jpg`, copied from the game's own files. After adding a character or using a new
icon name anywhere in the site's `.js` / `.html`, run:

```
python tools/extract-icons.py "E:/World of Warcraft/_forever_"
```

It reads the WoW: Forever install (nothing there is changed), finds every icon name the site uses
(`inv_…`, `ability_…`, `spell_…`, `trade_…`, `achievement_…`, `classicon_…`) and saves the ones that
are missing. Needs Python with Pillow (`pip install pillow`). An icon that isn't in `assets/icons` yet
loads from Wowhead instead, so nothing breaks in the meantime.

## Zone maps

The "Where to go" maps are stored with the site in `assets/maps/<id>.jpg`. After adding a zone to a
character's `ZONES` table, run:

```
python tools/get-maps.py "E:/World of Warcraft/_forever_"
```

Numeric ids (e.g. `10` = Duskwood) are copied from Wowhead's classic map server. A word id (e.g.
`"hyjal"`) is a map only the game has; it's read from your install. A map that isn't saved yet loads
from Wowhead instead. Riverglades has no map yet (`id: null`).

## Hosting on GitHub Pages

1. Push this folder to a GitHub repository.
2. Repository **Settings → Pages → Build and deployment**: Source = *Deploy from a branch*, Branch = `main`, folder = `/ (root)`.
3. The site appears at `https://<your-username>.github.io/<repo-name>/`.

Static HTML, CSS and JavaScript only. No build step and no dependencies. To preview locally, run
`python -m http.server` in this folder and open http://localhost:8000.

Fan-made; not affiliated with Blizzard Entertainment.
