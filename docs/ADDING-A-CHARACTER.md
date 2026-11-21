# Adding a new character

Everything shared (look, behaviour, help, effects) lives in `assets/`. A character is just
three pages of text plus three data files. Example: adding a **Dwarf Hunter**.

## 1. Copy a folder

Copy the character folder closest to the new one (a ranged class → `Mage Gnome`, melee → `Rogue Night Elf`)
and rename it and its pages:

```
Hunter Dwarf/
  Dwarf-Hunter-WoW-Guide.html
  Dwarf-Hunter-Professions.html
  Dwarf-Hunter-Addons.html
  data/guide.js
  data/professions.js
  data/addons.js
```

## 2. Edit the pages

In each `.html` file:

- `<title>`, the `<h1>` name, and the class icon URL in the portrait (`classicon_hunter.jpg`).
- `data-character="dwarf-hunter"` on `<body>`. It must match the registry `id` in step 4.
- Links between the three pages (`Dwarf-Hunter-Addons.html`, etc.).
- The written text: *How to Play*, *Action Bars → How to set this up*, profession basics, addon notes.

Don't change the `<link>` / `<script>` tags at the bottom; they load the shared engines.

## 3. Edit the data files

`data/guide.js` starts with a `GUIDE_PAGE` block. **Give it a new `saveKey`** so progress
doesn't mix with another character:

```js
const GUIDE_PAGE = {
  character: "dwarf-hunter",
  saveKey: "dwarfHunterBeginner.v1",
  addonsHref: "Dwarf-Hunter-Addons.html",
  abilityWord: "Ability",          // tooltip label: "Spell" for casters
  abilitiesWord: "abilities",
  itemNote: { test: /^(food|arrow)/, text: "Food and arrows are items: …" }
};
```

Then rewrite `STEPS`, `TALENTS`, `WORDS`, `ZONES`, `SPELLBOOK`, `ICONS` and `BARS`.
Each section has a comment explaining its fields.

`data/professions.js` and `data/addons.js` have the same kind of settings block at the top
(`PROF_PAGE`, `ADDONS_PAGE`). Give them new keys too.

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
  pages: {
    guide: "Dwarf-Hunter-WoW-Guide.html",
    professions: "Dwarf-Hunter-Professions.html",
    addons: "Dwarf-Hunter-Addons.html",
  },
  saveKeys: { guide: "dwarfHunterBeginner.v1", professions: "dwarfHunterProfessions.v1", addons: "dwarfHunterAddons.scan.v1" },
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
