/* Builds the in-game addon's guide data from the website, so the addon shows the same
   guide as the site: every step, objective, map pin, action bar change, talent, word
   explanation and the How to Play / Action Bars / Talents / Words tabs.

   node tools/export-addon-guide.js            every character in assets/js/characters.js
   node tools/export-addon-guide.js --zip      the same, then also makes dist/WowForeverGuide.zip

   Writes addon/WowForeverGuide/Guides/<character>.lua and the addon's .toc.
   Never edit the Guides files by hand: change the website and run this again.
   GitHub runs it on every push (.github/workflows/addon-release.yml) and publishes a release. */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
const ADDON = path.join(ROOT, "addon", "WowForeverGuide");
const BASE_VERSION = "1.0";

/* ---------- read `const NAME = ...;` blocks without running the page code ---------- */

function grabFrom(src, file, decl, open, close) {
  const start = src.indexOf(`${decl} = ${open}`);
  if (start < 0) throw new Error(`${decl} not found in ${file}`);
  const end = src.indexOf(`\n${close};`, start);
  return eval("(" + src.slice(start + `${decl} = `.length, end + 2) + ")");
}
const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");

const CHARACTERS = grabFrom(read("assets/js/characters.js"), "characters.js", "WF.characters", "[", "]");
const COMMON_WORDS = grabFrom(read("data/words.js"), "words.js", "const COMMON_WORDS", "{", "}");

/* The step kinds from assets/js/guide.js, with the same icons */
const KINDS = {
  quest:   ["Questing", "Take the quests, do them, hand them in.", "inv_misc_note_01"],
  train:   ["Trainer visit", "Learn new abilities, then put them on your bar.", "inv_misc_book_09"],
  talent:  ["Talent point", "Press N and click the talent named below.", "spell_holy_powerinfusion"],
  travel:  ["Travel", "Head to a new place.", "inv_misc_map_01"],
  home:    ["New home", "Set your Hearthstone at the inn here.", "inv_misc_rune_01"],
  dungeon: ["Group dungeon", "Find 4 other players first.", "achievement_dungeon_classicdungeonmaster"],
  start:   ["Getting ready", "Set up before you fight anything.", "inv_misc_gear_01"],
  done:    ["Level 60", "You made it.", "achievement_level_60"],
};

/* ---------- website HTML -> WoW text ---------- */

const C = {
  gold: "|cffffd200", key: "|cff7fd4ff", grey: "|cff9a9a9a", green: "|cff80e080", word: "|cffe2c6ff",
  "c-grey": "|cff9d9d9d", "q-poor": "|cff9d9d9d", "q-common": "|cffffffff", "c-green": "|cff1eff00",
  "q-uncommon": "|cff1eff00", "q-rare": "|cff0070dd", "q-epic": "|cffa335ee", "c-yellow": "|cffffff00",
  yel: "|cffffff00", "c-orange": "|cffff8000", "c-red": "|cffff2020", up: "|cff1eff00",
};
const END = "|r";
const WORD_MARK = /\u0001(\d+)\u0002([^\u0003]*)\u0003/g;

function text(html) {
  if (html == null || html === "") return undefined;
  return String(html)
    .replace(/\|/g, "||")
    .replace(/<b class="([\w-]+)">(.*?)<\/b>/g, (m, cls, t) => (C[cls] || C.gold) + t + END)
    .replace(/<span class="(up)">(.*?)<\/span>/g, (m, cls, t) => C[cls] + t + END)
    .replace(/<b>(.*?)<\/b>/g, `${C.gold}$1${END}`)
    .replace(/<kbd>(.*?)<\/kbd>/g, `${C.key}$1${END}`)
    .replace(/<small>(.*?)<\/small>/g, `${C.grey}$1${END}`)
    .replace(/<a [^>]*data-goto="[^"]*"[^>]*>(.*?)<\/a>/g, `${C.gold}$1${END}`)          // a tab: the addon has the same tabs
    .replace(/<a [^>]*href="#[^"]*"[^>]*>(.*?)<\/a>/g, `${C.gold}$1${END}`)
    .replace(/<a [^>]*>(.*?)<\/a>/g, `${C.gold}$1${END} (on the website)`)
    .replace(/<[^>]+>/g, "")
    .replace(WORD_MARK, (m, i, shown) => `${C.word}|Hwfw:${i}|h${shown}|h${END}`)
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&mdash;/g, "—")
    .replace(/→/g, ">").replace(/−/g, "-")
    .trim();
}

/* the page's longer text blocks (How to Play, set-up steps) as lines */
function prose(html) {
  let n = 0;
  return text(String(html)
    .replace(/\s+/g, " ")                                   // the page's own line breaks mean nothing
    .replace(/<p[^>]*data-web-only[^>]*>.*?<\/p>/g, "")      // website-only bits, like the addon's own download button
    .replace(/<svg[\s\S]*?<\/svg>/g, "").replace(/<img[^>]*>/g, "")
    .replace(/<span class="up">/g, ", <span class=\"up\">")
    .replace(/<ol>([\s\S]*?)<\/ol>/g, (m, inner) => { n = 0; return inner.replace(/<li>/g, () => `\n${++n}.  `); })
    .replace(/<li[^>]*>/g, "\n•  ")
    .replace(/<h3>([\s\S]*?)<\/h3>/g, "\n\n<b>$1</b>\n")
    .replace(/<h4>([\s\S]*?)<\/h4>/g, "\n\n<b>$1</b>\n")
    .replace(/<p[^>]*>/g, "\n\n")
    .replace(/<tr>/g, "\n")
    .replace(/<td>(<kbd>.*?<\/kbd>)<\/td><td>(.*?)<\/td>/g, "$1  $2      ")
    .replace(/<span role="listitem" class="([\w-]+)"><b>(.*?)<\/b>/g, '\n<b class="$1">$2</b>')
    .replace(/<div class="itip[^"]*"><span class="itip-tag">(.*?)<\/span>/g, "\n<small>$1:</small> ")
    .replace(/<span class="gc-vs"[^>]*>vs<\/span>/g, "\n<small>vs</small>")
    .replace(/<b class="iname">(.*?)<\/b>/g, "<b>$1</b>")
    .replace(/<span>(.*?)<\/span>/g, ", $1"))
    .split("\n").map((l) => l.trim()).join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

const q = (s) => '"' + String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\r?\n/g, "\\n") + '"';
function lua(v) {
  if (v === undefined || v === null) return "nil";
  if (typeof v === "string") return q(v);
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  if (Array.isArray(v)) return "{" + v.map(lua).join(",") + "}";
  return "{" + Object.entries(v).filter(([, x]) => x !== undefined && x !== null && x !== "" && !(Array.isArray(x) && !x.length))
    .map(([k, x]) => `${/^[A-Za-z_]\w*$/.test(k) ? k : "[" + q(k) + "]"}=${lua(x)}`).join(",") + "}";
}

const lvNums = (lv) => String(lv).split(/[–-]/).map((n) => parseInt(n, 10)).filter((n) => !isNaN(n));
const plain = (html) => String(html || "").replace(/<[^>]+>/g, "");

/* ---------- one character ---------- */

function exportCharacter(ch) {
  const file = `${ch.folder}/data/guide.js`;
  const src = read(file);
  const page = read(`${ch.folder}/${ch.pages.guide}`);
  const grab = (n, o, c) => grabFrom(src, file, `const ${n}`, o, c);
  const PAGE = grab("GUIDE_PAGE", "{", "}");
  const STEPS = grab("STEPS", "[", "]");
  const TALENTS = grab("TALENTS", "[", "]");
  const WORDS = grab("WORDS", "{", "}");
  const ZONES = grab("ZONES", "{", "}");
  const SPELLBOOK = grab("SPELLBOOK", "{", "}");
  const ICONS = grab("ICONS", "{", "}");
  const BARS = grab("BARS", "[", "]");
  for (const k in COMMON_WORDS) if (!(k in WORDS)) WORDS[k] = COMMON_WORDS[k];

  /* words: same rules as explainWords() in assets/js/guide.js */
  const wordKeys = Object.keys(WORDS).sort();
  const wordIndex = Object.fromEntries(wordKeys.map((w, i) => [w, i + 1]));
  const terms = Object.keys(WORDS).sort((a, b) => b.length - a.length);
  function explainWords(html) {
    if (!html) return html;
    const used = new Set();
    return html.replace(/(^|>)([^<]+)/g, (m, open, t) => {
      const parts = [t];
      terms.forEach((term) => {
        if (used.has(term)) return;
        const re = new RegExp(`\\b(${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/ /g, "\\s")})\\b`, "i");
        for (let k = 0; k < parts.length; k++) {
          const p = parts[k];
          if (typeof p !== "string") continue;
          const hit = re.exec(p);
          if (!hit) continue;
          used.add(term);
          parts.splice(k, 1, p.slice(0, hit.index), { key: term, shown: hit[1] }, p.slice(hit.index + hit[1].length));
          break;
        }
      });
      return open + parts.map((p) => (typeof p === "string" ? p : `\u0001${wordIndex[p.key]}\u0002${p.shown}\u0003`)).join("");
    });
  }
  const say = (html) => text(explainWords(html));

  /* step kinds and chapters, as on the site */
  function stepKind(i) {
    const s = STEPS[i];
    if (s.kind && KINDS[s.kind]) return s.kind;
    if (i === 0) return "start";
    if (i === STEPS.length - 1) return "done";
    if (/dungeon/i.test(s.title)) return "dungeon";
    if (/^Talents/i.test(s.place)) return "talent";
    if (/^Level \d+:|trainer/i.test(s.title) || /trainer|\((fly|teleport)\)/i.test(s.place)) return "train";
    if (/\bhome\b|^Settle/i.test(s.title)) return "home";
    if (/^(Visit|Fly|Move|Travel|Leave|Into)\b|→/.test(s.title + " " + s.place)) return "travel";
    return "quest";
  }
  const CHAPTERS = [];
  STEPS.forEach((s, i) => {
    if (s.chapter || !CHAPTERS.length) CHAPTERS.push({ name: s.chapter || s.place, from: i, to: i, lo: 99, hi: 0 });
    const c = CHAPTERS[CHAPTERS.length - 1];
    c.to = i;
    lvNums(s.lv).forEach((n) => { c.lo = Math.min(c.lo, n); c.hi = Math.max(c.hi, n); });
  });

  /* the step's "Action bar" box: same as drawStepBars() in assets/js/action-bars.js */
  const spellIn = (slot, level) => { let id = null; slot[1].forEach(([from, sp]) => { if (level >= from) id = sp; }); return id; };
  function findPlace(id, level) {
    for (const bar of BARS) for (let n = 0; n < bar.slots.length; n++) {
      const slot = bar.slots[n];
      if (spellIn(slot, level) !== id) continue;
      const k = slot[1].findIndex(([, sp]) => sp === id);
      return { bar, slot, n, replaced: k > 0 ? slot[1][k - 1][1] : null };
    }
    return null;
  }
  function whereText(p) {
    const key = p.slot[0];
    if (p.bar.id === "main") return `Key <kbd>${key}</kbd> <small>main bar</small>`;
    if (p.bar.id === "shift") return `<kbd>Shift</kbd> + <kbd>${key.slice(1)}</kbd> <small>bottom left bar</small>`;
    if (p.bar.id === "alt") return `<kbd>Alt</kbd> + <kbd>${key.slice(1)}</kbd> <small>bottom right bar</small>`;
    return `Right bar, button <b>${p.n + 1}</b> <small>counting from the top</small>`;
  }
  const stepRange = (s) => { const m = String(s.lv).match(/\d+/g) || ["1"]; return [+m[0], +m[m.length - 1]]; };
  const AUTO = STEPS.map(() => []);
  const named = new Set();
  STEPS.forEach((s) => (s.learn || []).forEach((id) => named.add(id)));
  BARS.forEach((bar) => bar.slots.forEach((slot) => slot[1].forEach(([from, id]) => {
    if (named.has(id)) return;
    let at = STEPS.findIndex((s) => stepRange(s)[0] === from && /^Level \d+/.test(s.title));
    if (at < 0) at = STEPS.findIndex((s) => stepRange(s)[0] === from);
    if (at < 0) at = STEPS.findIndex((s) => { const [lo, hi] = stepRange(s); return lo <= from && from <= hi; });
    if (at < 0) at = STEPS.findIndex((s) => stepRange(s)[0] >= from);
    if (at < 0) at = STEPS.length - 1;
    AUTO[at].push(id);
  })));
  function stepBars(i) {
    const step = STEPS[i];
    const level = parseInt(step.lv, 10) || 1;
    const learn = (step.learn || []).concat(AUTO[i]);
    if (!(learn.length || /^Level \d+/.test(step.title))) return undefined;
    const rows = learn.map((id) => {
      const p = findPlace(id, Math.max(level, SPELLBOOK[id].lv));
      if (!p) return null;
      return {
        id, where: text(whereText(p)),
        at: SPELLBOOK[id].lv > level ? SPELLBOOK[id].lv : undefined,
        replaces: p.replaced && p.replaced !== id ? SPELLBOOK[p.replaced].name : undefined,
      };
    }).filter(Boolean);
    const notes = [];
    if (PAGE.itemNote && learn.some((id) => PAGE.itemNote.test.test(id))) notes.push(PAGE.itemNote.text);
    if (i === 0) notes.push(`First time? Turn on the extra bars first: <a href="#" data-goto="bars">Action Bars tab</a> → <i>How to set this up in game</i>.`);
    notes.push(learn.length
      ? `New ranks of ${PAGE.abilitiesWord || "spells"} you already have stay on the same key. If a button still shows the old rank, drag the new one from your spellbook (<kbd>P</kbd>) onto it.`
      : "Nothing new to place this time. New ranks stay on the same keys. If a button still shows the old rank, drag the new one from your spellbook (<kbd>P</kbd>) onto it.");
    const head = /^Level \d+/.test(step.title) || i === 0 ? "Action bar" : "Action bar · when you next visit the trainer";
    return { head, rows, notes: notes.map(text) };
  }

  /* steps */
  const steps = STEPS.map((s, i) => {
    const [lo, hi] = stepRange(s);
    const pins = [];
    const mapNotes = [];
    for (const [zone, ...points] of s.map || []) {
      const z = ZONES[zone] || {};
      if (z.none) mapNotes.push(text(z.none));
      for (const [x, y, label] of points) pins.push({ zone: z.name || zone, x, y, label: text(label) });
    }
    const talents = TALENTS.filter(([lv]) => { const [a, b = a] = lvNums(lv); return a <= hi && b >= lo; })
      .map(([lv, name, times, why]) => text(`Level ${lv}: <b>${name}</b>, ${times.charAt(0).toLowerCase() + times.slice(1)}.${why ? " " + why : ""}`));
    // bold names in the objectives: the addon checks these against your quest log
    const quests = [...new Set(s.todo.flatMap((t) => [...t.matchAll(/<b>(.*?)<\/b>/g)].map((m) => plain(m[1]).trim())))]
      .filter((n) => n.length > 2 && !/^\d/.test(n));
    return {
      kind: stepKind(i), chapter: CHAPTERS.findIndex((c) => i >= c.from && i <= c.to) + 1,
      lv: s.lv, lo, hi, place: text(s.place), title: text(s.title),
      todo: s.todo.map(say), done: say(s.done), stuck: say(s.stuck), tip: say(s.tip),
      bars: stepBars(i), talents, pins, mapNotes, quests,
    };
  });

  /* spells, bars and talents for the Action Bars and Talents tabs */
  const spells = {};
  for (const [id, sp] of Object.entries(SPELLBOOK)) {
    spells[id] = {
      name: sp.name, lv: sp.lv, icon: ICONS[id], text: text(sp.text),
      type: sp.talent ? "Talent" : sp.school === "racial" ? "Racial" : sp.school === "item" ? "Item" : (PAGE.abilityWord || "Spell"),
    };
  }
  const bars = BARS.map((b) => ({ id: b.id, title: b.title, how: text(b.how), slots: b.slots.map(([key, uses]) => ({ key, uses })) }));
  const talents = TALENTS.map(([lv, name, how, why]) => { const [lo, hi = lo] = lvNums(lv); return { lv, lo, hi, name: text(name), how: text(how), why: text(why) }; });

  /* the page's own text: Action Bars intro and set-up, How to Play, Talents intro */
  const panel = (id) => {
    const m = page.match(new RegExp(`<section class="panel[^"]*" id="panel-${id}">([\\s\\S]*?)</section>`));
    if (!m) throw new Error(`panel-${id} not found in ${ch.pages.guide}`);
    return m[1].replace(/<div class="frame-title">[\s\S]*?<\/div>/, "");
  };
  const barsHtml = panel("bars");
  const talentsHtml = panel("talents");
  const labels = { pvp: "PvP", "rested xp": "Rested XP", xp: "XP", npc: "NPC" };

  return {
    id: ch.id, name: ch.name, class: ch.cls.toUpperCase().replace(/\s/g, ""), race: ch.race.replace(/\s/g, ""),
    abilityWord: PAGE.abilityWord || "Spell", abilitiesWord: PAGE.abilitiesWord || "spells",
    chapters: CHAPTERS.map((c) => ({ name: text(c.name), first: c.from + 1, last: c.to + 1, lo: c.lo, hi: c.hi })),
    steps, spells, bars, talents,
    words: wordKeys.map((w) => ({ label: labels[w] || w.charAt(0).toUpperCase() + w.slice(1), text: text(WORDS[w]), hide: w === "elites" || undefined })),
    pages: {
      barsIntro: prose((barsHtml.match(/<p>[\s\S]*?<\/p>/) || [""])[0]),
      barsSetup: prose(barsHtml.slice(barsHtml.indexOf("<h3>How to set this up"))),
      play: prose(panel("basics")),
      talentsIntro: prose((talentsHtml.match(/<p>[\s\S]*?<\/p>/) || [""])[0]),
      talentsHint: prose((talentsHtml.match(/<p class="hint">[\s\S]*?<\/p>/) || [""])[0]),
    },
  };
}

/* ---------- write the addon ---------- */

function version() {
  if (process.env.ADDON_VERSION) return process.env.ADDON_VERSION;
  try { return `${BASE_VERSION}.${execSync("git rev-list --count HEAD", { cwd: ROOT }).toString().trim()}`; }
  catch (e) { return `${BASE_VERSION}.0`; }
}

const VERSION = version();
fs.rmSync(path.join(ADDON, "Guides"), { recursive: true, force: true });
fs.mkdirSync(path.join(ADDON, "Guides"), { recursive: true });
const files = [];
for (const ch of CHARACTERS) {
  const g = exportCharacter(ch);
  const { steps, ...rest } = g;
  const out = [
    `-- Made by tools/export-addon-guide.js from the website (${ch.folder}). Don't edit: change the website and run the script again.`,
    `WowForeverGuide_Guides = WowForeverGuide_Guides or {}`,
    `local g = ${lua(rest)}`,
    `g.steps = {`,
    ...steps.map((s) => `  ${lua(s)},`),
    `}`,
    `WowForeverGuide_Guides[${q(g.id)}] = g`,
  ];
  const f = `Guides/${g.id}.lua`;
  fs.writeFileSync(path.join(ADDON, f), out.join("\n") + "\n");
  files.push(f.replace(/\//g, "\\"));
  console.log(`${g.name}: ${steps.length} steps, ${g.talents.length} talents, ${g.words.length} words -> addon/WowForeverGuide/${f}`);
}

const KINDS_LUA = `-- Made by tools/export-addon-guide.js: the step kinds from the website.\nWowForeverGuide_Kinds = ${lua(Object.fromEntries(Object.entries(KINDS).map(([k, [label, hint, icon]]) => [k, { label, hint, icon }])))}\nWowForeverGuide_Version = ${q(VERSION)}\n`;
fs.writeFileSync(path.join(ADDON, "Guides", "Kinds.lua"), KINDS_LUA);

fs.writeFileSync(path.join(ADDON, "WowForeverGuide.toc"), [
  "## Interface: 16001",
  "## Title: WoW Forever Guide",
  "## Notes: The WoW Forever leveling guide from the website, step by step in game. Click the book on your minimap.",
  `## Version: ${VERSION}`,
  "## IconTexture: Interface\\Icons\\INV_Misc_Book_09",
  "## OptionalDeps: TomTom",
  "## SavedVariablesPerCharacter: WowForeverGuideCharDB",
  "",
  "Guides\\Kinds.lua",
  ...files,
  "Core.lua",
  "",
].join("\n"));
console.log(`version ${VERSION}`);

/* ---------- --zip: dist/WowForeverGuide.zip with the WowForeverGuide folder inside ---------- */

if (process.argv.includes("--zip")) {
  const dist = path.join(ROOT, "dist");
  fs.mkdirSync(dist, { recursive: true });
  const zip = path.join(dist, "WowForeverGuide.zip");
  fs.rmSync(zip, { force: true });
  if (process.platform === "win32") {
    execSync(`powershell -NoProfile -Command "Compress-Archive -Path '${ADDON}' -DestinationPath '${zip}'"`);
  } else {
    execSync(`zip -rq "${zip}" WowForeverGuide`, { cwd: path.dirname(ADDON) });
  }
  fs.writeFileSync(path.join(dist, "version.txt"), VERSION);
  console.log(`zip -> dist/WowForeverGuide.zip`);
}
