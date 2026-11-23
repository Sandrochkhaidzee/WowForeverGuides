# WoW: Forever — Beginner Guides

Step-by-step beginner guides for WoW: Forever, styled like the in-game UI.

| Character | Leveling | Professions | Addons |
|---|---|---|---|
| Gnome Mage | [Guide](Mage%20Gnome/Gnome-Mage-WoW-Guide.html) | [Professions](professions.html?c=gnome-mage) | [Addons](addons.html?c=gnome-mage) |
| Night Elf Rogue | [Guide](Rogue%20Night%20Elf/NightElf-Rogue-WoW-Guide.html) | [Professions](professions.html?c=nightelf-rogue) | [Addons](addons.html?c=nightelf-rogue) |

`index.html` at the root is the landing page.

## What visitors get

- **Leveling guide**: one quest step at a time, zone maps with pins, the action bar for your level, talents and a searchable word list.
  - A **journey strip** shows every chapter (Shadowglen, Dolanaar, …) and where you are; click one to jump there.
  - Each step has a **badge** saying what kind it is (questing, trainer visit, talent point, travel, dungeon…).
  - **Tick off objectives** as you do them; the Next button turns green when all are done. Back / Next and
    "Up next" also sit under the step, so there's no scrolling back up.
  - Every step ends with a **Done when** line (how to tell it's finished) and, for quest steps, a
    **Still short of the level?** fallback saying where to fight for the last bit of XP.
  - Each step lists its **quests** (! to pick up, ? to hand in) to tick off, and the map shows quest givers,
    hand-ins and objective areas as pins. On screens 1600px and wider the map sits in a frame beside the step.
  - **Find my step from the game**: paste one `/run` command into the game's chat, copy back what it prints,
    and the guide jumps to your step and ticks off the quests you've already done.
  - The **Action Bars** tab shows which ability goes on which key at any level; like Talents and Gear, it
    follows your Quest Guide step, and its level slider looks ahead or back.
  - The **Talents** tab is the game's talent window, one point at a time: the three trees with the real
    layout, icons and arrows, the point to click at your level glowing, and Back / Next to step through the build.
  - The **Gear** tab is the in-game character window (<kbd>C</kbd>) filled with the quest rewards you should be
    wearing at your step; slots no quest fills show the best item to buy or craft (marked AH, Craft or Vendor).
    Hover over a slot for the item, its icon, stats and where it comes from. Click a slot for every other way to
    fill it (other quests, dungeon drops, crafting, vendors, the Auction House), and see "Worth buying now" upgrades.
- **How to Play** has a **Gear** card: item colours, the stats each class wants, a side-by-side
  "is this better?" example, and how to compare items in game.
- **How to Play** and **Profession Basics** are picture cards with a "jump to" row, an enemy level-colour scale,
  the class combo as real ability icons, and a skill-up chance bar for recipe colours.
- One shared **Professions** page (Tailoring, Enchanting, Leatherworking, Skinning, with a Skinning route per race) and one shared **Addons** page (tips for each class, and a Dungeons list).
- **Help button (?)** on every page: how the page works, keyboard keys, and answers for when you're stuck.
- **First-visit welcome and a short guided tour** that points at each part of the page.
- **Settings (gear button)**: bigger text, an easy-read font, and calm or full animations.
- **Progress is saved** in the browser; the landing page shows "Continue your journey" with where you stopped.
- Effects are **calm by default** (gentle fades only, nothing pulsing or sparkling). Settings → Animations →
  **Full** turns on glows, sparks, sliding pages and scroll-in animations.
  There are no pop-up messages (no level-up banner or "step complete" notes).

## How the files are organised

```
index.html                 landing page (cards are built from the character registry)
professions.html           professions page, shared by every character
addons.html                addons page, shared by every character
                           (?c=<id> on both says whose guide linked there, for the back link)
data/professions.js        profession routes
data/addons.js             addon list with "why you want it" text and class tips
404.html                   "page not found" for GitHub Pages
site.webmanifest           app name/icon when saved to a phone home screen
assets/
  css/core.css             shared look: colours, frames, tabs, buttons, tooltips
  css/guide.css            leveling-guide page (quest paper, map, action bars)
  css/professions.css      professions page
  css/addons.css           addons page
  css/home.css             landing page
  css/gear.css             Gear tab (character window)
  css/talents.css          Talents tab (talent window)
  css/fx.css               animations + comfort settings (loaded last on every page)
  js/characters.js         THE CHARACTER REGISTRY: one entry per character
  js/guide.js              leveling-guide engine (steps, map, word popups, tabs)
  js/action-bars.js        action-bar engine (Action Bars tab, per-step bar box, level on the portrait)
  js/gear.js               Gear tab engine (character window, item tooltips)
  js/talents.js            Talents tab engine (talent trees, one point per level, tooltips)
  js/professions.js        professions engine
  js/addons.js             addons engine (list, filters, folder scan)
  js/home.js               landing page: cards, "continue", class chooser
  js/site.js               shared layer: help, settings, tour, switcher, effects
  img/favicon.svg
  img/slots/               empty equipment-slot pictures from the game's character window
  img/talents/             talent tree backgrounds from the game (tools/extract-talents.py)
data/talents/<class>.js    each class's talent trees, made from the game files (tools/extract-talents.py)
<Character folder>/
  <Name>-WoW-Guide.html    page text (How to Play, etc.) + links to the shared files
  data/guide.js            steps, talents, words, zones, spells, action bars
  data/quests.js           the steps' quests: givers, hand-ins, objectives (tools/build-quest-data.js)
  data/gear.js             gear for each guide step, and other items per slot (tools/build-gear.py)
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

## Quest data

Each character's `data/quests.js` (who gives each quest a step names, where you hand it in, where its
objectives are) is made from the QuestieDB addon that comes with Questie for WoW: Forever. After changing
which quests a step names (its `quests:` and `pickup:` fields), run:

```
node tools/build-quest-data.js "E:/World of Warcraft/_forever_/Interface/AddOns/QuestieDB"
```

## Talent trees

The Talents tab draws each class's trees from `data/talents/<class>.js`, read from the game's own
talent tables (WoW: Forever's newest changes included, from the game's cache: log in once first).
After a game patch, or after adding a class, run:

```
python tools/extract-talents.py "E:/World of Warcraft/_forever_"
```

It writes the tree files, the talent icons and the tree backgrounds. The build itself (which talent
at which level) stays in each character's `TALENTS` list in `data/guide.js`; talent names there
must match the game's.

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

## Gear tab

Each character's `data/gear.js` is made by a tool, not by hand. Run it again after changing which quests
or zones a guide uses (adding or moving steps is fine: items are tied to a step by its title):

```
python tools/build-gear.py              (all characters, or add an id like gnome-mage)
python tools/extract-icons.py "E:/World of Warcraft/_forever_"
```

Quests, their levels and their rewards come from WoW: Forever itself: the QuestieDB addon in your install
(Forever's own quests included), and item level requirements from the game's item table. A quest the guide
hands in on a step (its `quests:` list) gives its reward on that step; any other quest you can do there
(named, picked up, or in the step's zone) gives it at the first step in its zone where you've reached the
quest's level and minimum level, and an item that needs a higher level waits until you have it. Then the
tool walks the steps in order and puts on each reward that's an upgrade for the class (the stat weights are
in `CLASSES` at the top of the tool). On the page, the window shows what you have when you *start* your
step; the step's own rewards are listed under "This step gives you".

It also saves a pool of every other green and blue item the class can use, levels 1–60, with where each
comes from (another quest, a dungeon boss, a profession recipe, a vendor, or the Auction House for items
that bind when equipped; from classicdb.ch, with stats and icons from Wowhead's classic tooltips). The Gear
tab fills empty slots with the best one you can buy or craft, lists "Worth buying now" upgrades, and shows
all the options for a slot when you click it. Items you buy rather than earn from a quest (the magic wands)
go in `tools/gear-extra.json`. Downloads are cached in `tools/.gear-cache` (not in git); the first run
without it takes about half an hour. Needs Node.js, curl and the game install (`--game "<folder>"` if it
isn't at `E:/World of Warcraft/_forever_`). A new class needs an entry in `CLASSES` first.

## Hosting on GitHub Pages

1. Push this folder to a GitHub repository.
2. Repository **Settings → Pages → Build and deployment**: Source = *Deploy from a branch*, Branch = `main`, folder = `/ (root)`.
3. The site appears at `https://<your-username>.github.io/<repo-name>/`.

Static HTML, CSS and JavaScript only. No build step and no dependencies. To preview locally, run
`python -m http.server` in this folder and open http://localhost:8000.

Fan-made; not affiliated with Blizzard Entertainment.
