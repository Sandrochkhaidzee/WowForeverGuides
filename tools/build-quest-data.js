#!/usr/bin/env node
/* Builds <character>/data/quests.js: for every quest a guide step names (quests:{} and pickup:{}),
   who gives it, where you hand it in, where its objectives are, and its objective text.

   The data comes from the QuestieDB addon that ships with Questie for WoW: Forever. It keeps every quest,
   NPC, object and item as base64 CBOR in the metadata of QuestieDB_Forever.toc ("## X-Quest-267-S: ...").

   usage: node tools/build-quest-data.js ["E:/World of Warcraft/_forever_/Interface/AddOns/QuestieDB"]

   Run it again after changing which quests a step names. */

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const DB = process.argv[2] || "E:/World of Warcraft/_forever_/Interface/AddOns/QuestieDB";
const TOC = path.join(DB, "QuestieDB_Forever.toc");
const SUBZONES = path.join(DB, "support/Forever/Zones/subZoneToParentZone.lua");

/* outdoor zones of Kalimdor and the Eastern Kingdoms (AreaTable ids, the same ids as the site's maps) */
const ZONE_NAMES = {
  1: "Dun Morogh", 3: "Badlands", 4: "Blasted Lands", 8: "Swamp of Sorrows", 10: "Duskwood", 11: "Wetlands",
  12: "Elwynn Forest", 14: "Durotar", 15: "Dustwallow Marsh", 16: "Azshara", 17: "The Barrens",
  28: "Western Plaguelands", 33: "Stranglethorn Vale", 36: "Alterac Mountains", 38: "Loch Modan", 40: "Westfall",
  41: "Deadwind Pass", 44: "Redridge Mountains", 45: "Arathi Highlands", 46: "Burning Steppes",
  47: "The Hinterlands", 51: "Searing Gorge", 85: "Tirisfal Glades", 130: "Silverpine Forest",
  139: "Eastern Plaguelands", 141: "Teldrassil", 148: "Darkshore", 215: "Mulgore", 267: "Hillsbrad Foothills",
  331: "Ashenvale", 357: "Feralas", 361: "Felwood", 400: "Thousand Needles", 405: "Desolace",
  406: "Stonetalon Mountains", 440: "Tanaris", 490: "Un'Goro Crater", 493: "Moonglade", 618: "Winterspring",
  1377: "Silithus", 1497: "Undercity", 1519: "Stormwind", 1537: "Ironforge", 1637: "Orgrimmar",
  1638: "Thunder Bluff", 1657: "Darnassus", 16591: "Riverglades",
};

/* ---------- CBOR ---------- */

function cbor(buf) {
  let p = 0;
  const len = (ai) => {
    if (ai < 24) return ai;
    if (ai === 24) return buf[p++];
    if (ai === 25) { const v = buf.readUInt16BE(p); p += 2; return v; }
    if (ai === 26) { const v = buf.readUInt32BE(p); p += 4; return v; }
    if (ai === 27) { const v = Number(buf.readBigUInt64BE(p)); p += 8; return v; }
    throw new Error("indefinite length");
  };
  const item = () => {
    const b = buf[p++], mt = b >> 5, ai = b & 31;
    switch (mt) {
      case 0: return len(ai);
      case 1: return -1 - len(ai);
      case 2: { const n = len(ai); const v = buf.toString("utf8", p, p + n); p += n; return v; }
      case 3: { const n = len(ai); const v = buf.toString("utf8", p, p + n); p += n; return v; }
      case 4: { const n = len(ai); const a = []; for (let i = 0; i < n; i++) a.push(item()); return a; }
      case 5: { const n = len(ai); const o = {}; for (let i = 0; i < n; i++) { const k = item(); o[k] = item(); } return o; }
      case 6: len(ai); return item();
      default:
        if (ai === 22 || ai === 23 || ai === 20) return null;
        if (ai === 21) return true;
        if (ai === 25) { p += 2; return 0; }
        if (ai === 26) { const v = buf.readFloatBE(p); p += 4; return v; }
        if (ai === 27) { const v = buf.readDoubleBE(p); p += 8; return v; }
        return null;
    }
  };
  return item();
}

/* ---------- the database ---------- */

const raw = new Map();
for (const line of fs.readFileSync(TOC, "utf8").split(/\r?\n/)) {
  const m = /^## X-(Quest|Npc|Object|Item)-(\d+)-(\w+): (.*)$/.exec(line);
  if (m) raw.set(`${m[1]}-${m[2]}-${m[3]}`, m[4]);
}
const field = (kind, id, f) => {
  const b = raw.get(`${kind}-${id}-${f}`);
  if (b === undefined) return undefined;
  try { return cbor(Buffer.from(b, "base64")); } catch (e) { return undefined; }
};
const row = (kind, id) => field(kind, id, "S") || {};
const name = (kind, id) => row(kind, id)[1];

const parent = {};
for (const m of fs.readFileSync(SUBZONES, "utf8").matchAll(/\[(\d+)\]\s*=\s*(\d+)/g)) parent[+m[1]] = +m[2];
const topZone = (z) => { for (let n = 0; n < 5 && parent[z] && parent[z] !== z; n++) z = parent[z]; return z; };

/* every spawn of an NPC or object, grouped by outdoor zone: { zone: [[x, y], ...] } */
function spawns(kind, id) {
  const s = field(kind, id, kind === "Npc" ? 7 : 4);
  const out = {};
  if (!s || typeof s !== "object") return out;
  for (const [z, pts] of Object.entries(s)) {
    const zone = topZone(+z);
    if (!ZONE_NAMES[zone] || !Array.isArray(pts)) continue;
    for (const p of pts) if (Array.isArray(p) && p[0] > 0 && p[1] > 0) (out[zone] ||= []).push([p[0], p[1]]);
  }
  return out;
}

function merge(into, add) { for (const [z, pts] of Object.entries(add)) (into[z] ||= []).push(...pts); return into; }

/* one spot that stands for a group of spawns: the quest's own zone if it has any, else the busiest zone,
   then the spawn with the most other spawns near it, so a camp beats a lone stray */
function spot(all, preferZone) {
  const zones = Object.entries(all).sort((a, b) => (+b[0] === preferZone) - (+a[0] === preferZone) || b[1].length - a[1].length);
  if (!zones.length) return null;
  const [z, pts] = zones[0];
  const sample = pts.length > 400 ? pts.filter((_, k) => k % Math.ceil(pts.length / 400) === 0) : pts;
  let best = sample[0], score = -1;
  for (const a of sample) {
    const n = sample.reduce((c, b) => c + (Math.hypot(a[0] - b[0], a[1] - b[1]) < 6 ? 1 : 0), 0);
    if (n > score) { score = n; best = a; }
  }
  return [+z, +best[0].toFixed(1), +best[1].toFixed(1)];
}

/* where an item comes from: the creatures that drop it and the objects that hold it */
function itemSpawns(id) {
  const all = {};
  for (const npc of field("Item", id, 2) || []) merge(all, spawns("Npc", npc));
  for (const obj of field("Item", id, 3) || []) merge(all, spawns("Object", obj));
  return all;
}

/* quest giver or turn-in: [zone, x, y, who] */
function giver(list, preferZone) {
  if (!Array.isArray(list)) return null;
  const [npcs, objects, items] = list;
  for (const id of npcs || []) { const s = spot(spawns("Npc", id), preferZone); if (s) return [...s, name("Npc", id)]; }
  for (const id of objects || []) { const s = spot(spawns("Object", id), preferZone); if (s) return [...s, name("Object", id)]; }
  for (const id of items || []) { const s = spot(itemSpawns(id), preferZone); if (s) return [...s, `${name("Item", id)} (starts the quest)`]; }
  return null;
}

/* objectives: [zone, x, y, what] for each creature, object, item and kill credit */
function goals(id, preferZone) {
  let o = field("Quest", id, 10);
  if (!o || typeof o !== "object") return [];
  /* a Lua list comes out of CBOR as an array (first group at [0]) or, when it has gaps, as a 1-based map */
  if (Array.isArray(o)) o = Object.fromEntries(o.map((v, k) => [k + 1, v]));
  const out = [];
  const add = (all, label) => { const s = spot(all, preferZone); if (s && label) out.push([...s, label]); };
  for (const [npc, text] of o[1] || []) add(spawns("Npc", npc), text || name("Npc", npc));
  for (const [obj, text] of o[2] || []) add(spawns("Object", obj), text || name("Object", obj));
  for (const [item, text] of o[3] || []) add(itemSpawns(item), text || name("Item", item));
  for (const [ids, base, text] of o[5] || []) {
    const all = {};
    for (const npc of ids || []) merge(all, spawns("Npc", npc));
    add(all, text || name("Npc", base));
  }
  return out;
}

/* one quest's record: lv, text, from, to, goals */
function questRecord(id) {
  const q = row("Quest", id);
  if (!q[1]) return null;
  const zone = q[17] > 0 ? topZone(q[17]) : 0;
  const rec = { lv: q[5], text: (field("Quest", id, 8) || []).filter(Boolean).join(" ") };
  const from = giver(field("Quest", id, 2), zone), to = giver(field("Quest", id, 3), zone), g = goals(id, zone);
  if (from) rec.from = from;
  if (to) rec.to = to;
  if (g.length) rec.goals = g;
  return rec;
}

/* `node tools/build-quest-data.js --show 161 274` prints quests instead of writing files (for writing steps) */
const showAt = process.argv.indexOf("--show");
if (showAt > 0) {
  for (const id of process.argv.slice(showAt + 1)) {
    const r = questRecord(+id);
    const place = (p) => p ? `${ZONE_NAMES[p[0]]} ${p[1]}, ${p[2]} ${p[3]}` : "-";
    console.log(r ? `${id} ${name("Quest", +id)} (L${r.lv}) | from ${place(r.from)} | to ${place(r.to)}\n   ${r.text}\n   goals: ${(r.goals || []).map(place).join(" ; ")}` : `${id}: not found`);
  }
  process.exit(0);
}

/* ---------- per guide ---------- */

for (const dir of fs.readdirSync(ROOT)) {
  const guideFile = path.join(ROOT, dir, "data", "guide.js");
  if (!fs.existsSync(guideFile)) continue;
  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(guideFile, "utf8") + "\n;this.STEPS = STEPS;", ctx);
  const ids = new Set();
  for (const s of ctx.STEPS) for (const k of [...Object.keys(s.quests || {}), ...Object.keys(s.pickup || {})]) ids.add(+k);

  const data = {}, zonesUsed = new Set();
  for (const id of [...ids].sort((a, b) => a - b)) {
    const q = row("Quest", id);
    if (!q[1]) { console.warn(`${dir}: quest ${id} is not in QuestieDB`); continue; }
    const zone = q[17] > 0 ? topZone(q[17]) : 0;
    const text = (field("Quest", id, 8) || []).filter(Boolean).join(" ");
    const rec = { lv: q[5], text };
    const from = giver(field("Quest", id, 2), zone), to = giver(field("Quest", id, 3), zone), g = goals(id, zone);
    if (from) rec.from = from;
    if (to) rec.to = to;
    if (g.length) rec.goals = g;
    [from, to, ...g].forEach((p) => p && zonesUsed.add(p[0]));
    data[id] = rec;
  }
  const zones = Object.fromEntries([...zonesUsed].sort((a, b) => a - b).map((z) => [z, ZONE_NAMES[z]]));
  const out = `/* Made by tools/build-quest-data.js from the QuestieDB addon. Don't edit by hand: run the tool again.
   QUEST_DATA[id]: lv = quest level, text = what the quest log says, from = quest giver, to = where you hand it
   in, goals = objectives. Places are [zone id, x, y, label]; zone ids are the ones in QUEST_ZONES. */
const QUEST_ZONES = ${JSON.stringify(zones)};
const QUEST_DATA = {
${Object.entries(data).map(([id, r]) => `${id}:${JSON.stringify(r)}`).join(",\n")}
};
`;
  fs.writeFileSync(path.join(ROOT, dir, "data", "quests.js"), out);
  console.log(`${dir}: ${Object.keys(data).length} quests, ${zonesUsed.size} zones`);
}
