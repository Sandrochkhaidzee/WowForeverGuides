# Adding a new character

Everything shared (look, behaviour, help, effects) lives in `assets/`. A character is just
one guide page plus one data file. The Professions page (`professions.html`), the Addons page
(`addons.html`) and the common game words (`data/words.js`) are shared by everyone.
Example: adding a **Dwarf Hunter**.

## 1. Copy a folder

Copy the character folder closest to the new one (a ranged class → `Mage Gnome`, melee → `Rogue Night Elf`)
and rename it and its page:

```
Hunter Dwarf/
  Dwarf-Hunter-WoW-Guide.html
  data/guide.js
```

## 2. Edit the page

In the `.html` file:

- `<title>`, the `<h1>` name, and the class icon URL in the portrait (`classicon_hunter.jpg`).
- `data-character="dwarf-hunter"` on `<body>`. It must match the registry `id` in step 4.
- The Professions and Addons links: `../professions.html?c=dwarf-hunter` and `../addons.html?c=dwarf-hunter`.
  The `?c=` makes the shared page's "‹ Guide" tab and Switch menu point back to this character.
- The written text: *How to Play*, *Action Bars → How to set this up*.

Don't change the `<link>` / `<script>` tags at the bottom; they load the shared engines.

## 3. Edit the data files

`data/guide.js` starts with a `GUIDE_PAGE` block. **Give it a new `saveKey`** so progress
doesn't mix with another character:

```js
const GUIDE_PAGE = {
  character: "dwarf-hunter",
  saveKey: "dwarfHunterBeginner.v1",
  addonsHref: "../addons.html?c=dwarf-hunter",
  abilityWord: "Ability",          // tooltip label: "Spell" for casters
  abilitiesWord: "abilities",
  itemNote: { test: /^(food|arrow)/, text: "Food and arrows are items: …" }
};
```

Then rewrite `STEPS`, `TALENTS`, `WORDS`, `ZONES`, `SPELLBOOK`, `ICONS` and `BARS`.
`TALENTS` names one talent per row, exactly as the game spells it; the Talents tab draws the trees
from `data/talents/<class>.js`. For a class that has no file there yet, run
`python tools/extract-talents.py "E:/World of Warcraft/_forever_"` and add
`<script src="../data/talents/<class>.js"></script>` before `assets/js/talents.js` in the page.
Each section has a comment explaining its fields. `WORDS` only needs the class's own words
(energy, combo points, …): words every player meets come from `data/words.js`. A word in
`WORDS` replaces the shared one, for a class-flavored version.

Two more data files are made by tools, not by hand (the copied folder has the old character's; replace them):

- `data/quests.js` (the quests each step names, with givers, hand-ins and objectives):
  `node tools/build-quest-data.js "E:/World of Warcraft/_forever_/Interface/AddOns/QuestieDB"`.
- `data/gear.js` (the Gear tab): first add the class to `CLASSES` at the top of `tools/build-gear.py`
  (armour type, weapons, stat weights) and to `POOL_LISTS` (which item lists to read), then run
  `python tools/build-gear.py dwarf-hunter`. Items the guide names that the item sites get wrong go in
  `tools/gear-extra.json` under the character's id. Then run `tools/extract-icons.py` for the item icons.

Shared pages, in the site root:

- **Professions** (`data/professions.js`): add the class to the "Pairs that work well" list in
  `professions.html` if it has a best pair. For a new race, add its starting zone to the Skinning
  1–75 row, its capital to `PROF_PAGE.city`, and its own early Skinning rows with `race: "Dwarf"`.
- **Addons** (`data/addons.js`): if an addon needs a line for the new class, add it to that addon's
  `tips` (`tips: { Hunter: "…" }`), or `only: ["Hunter"]` for a class-only addon.

Spell icons that don't exist yet in the shared `GLYPH` list (`assets/js/action-bars.js`) can be
added there; they're only shown when the real Wowhead icon can't load.

## 4. Register it

Add one entry to `assets/js/characters.js`:

```js
{
  id: "dwarf-hunter",
  name: "Dwarf Hunter",
  cls: "Hunter", race: "Dwarf", faction: "Alliance",
  color: "#abd473",                       // class colour
  glow: "rgba(171, 212, 115, .2)",
  orb: "radial-gradient(circle at 40% 35%, #8aa86a, #3a5a22 60%, #12200a)",
  icon: "classicon_hunter",
  folder: "Hunter Dwarf",
  style: "ranged",                        // ranged | melee, for "Help me choose"
  difficulty: 1,                          // 1 easy · 2 medium · 3 harder
  role: "Ranged hunter with a pet",
  blurb: "Tame a beast, let it hold the enemy, and shoot from a distance.",
  perks: ["Has a pet that fights for you", "Fights from far away", "Very forgiving"],
  pages: { guide: "Dwarf-Hunter-WoW-Guide.html" },
  saveKeys: { guide: "dwarfHunterBeginner.v1" },
},
```

That's it. The landing page card, "Continue your journey", the "Switch" menu on every page
and the class chooser all read this list.

## 5. Check it

Run `python -m http.server` in the site folder, open http://localhost:8000 and go through:
landing card → guide (Next/Back, map, action bar) → Professions → Addons. Open the browser
console (F12): it should show no errors.

## Rules that keep old visitors' progress safe

- Never rename an existing character's `saveKey`, or everyone's progress for it resets.
- Never rename existing page files. People bookmark them.
- If a step list changes a lot, it's fine. Progress is stored as a step number.
