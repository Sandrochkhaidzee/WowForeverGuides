/* =========================================================
   Character registry — the one list every page reads.

   The landing page builds its cards from it, the "switch
   character" menu on every guide uses it, and the progress
   shown on the landing page comes from each entry's save key.

   Adding a character (see docs/ADDING-A-CHARACTER.md):
     1. Copy a character folder, rename the pages, edit its data/*.js.
     2. Add one entry below. That's it — every menu picks it up.
   ========================================================= */

window.WF = window.WF || {};

WF.characters = [
  {
    id: "gnome-mage",
    name: "Gnome Mage",
    cls: "Mage",
    race: "Gnome",
    faction: "Alliance",
    color: "#69ccf0",
    glow: "rgba(105, 204, 240, .22)",
    orb: "radial-gradient(circle at 40% 35%, #6aa6d8, #234a7a 60%, #0d1b33)",
    icon: "classicon_mage",
    folder: "Mage Gnome",
    style: "ranged",            // ranged | melee — used by the "which class?" helper
    difficulty: 1,              // 1 easy · 2 medium · 3 harder (for beginners)
    role: "Ranged caster",
    blurb: "Freeze enemies, blast them from afar, and conjure your own food and water.",
    perks: ["Fights from far away", "Makes free food & water", "Can teleport to cities"],
    pages: {
      guide: "Gnome-Mage-WoW-Guide.html",
      professions: "Gnome-Mage-Professions.html",
      addons: "Gnome-Mage-Addons.html",
    },
    saveKeys: { guide: "gnomeMageBeginner.v1", professions: "mageProfessions.v1", addons: "gnomeMageAddons.scan.v1" },
  },
  {
    id: "nightelf-rogue",
    name: "Night Elf Rogue",
    cls: "Rogue",
    race: "Night Elf",
    faction: "Alliance",
    color: "#fff569",
    glow: "rgba(255, 245, 105, .18)",
    orb: "radial-gradient(circle at 40% 35%, #7a6a8a, #2f2440 60%, #120c1a)",
    icon: "classicon_rogue",
    folder: "Rogue Night Elf",
    style: "melee",
    difficulty: 2,
    role: "Melee assassin",
    blurb: "Sneak in stealth, open with a big hit, and finish with combo points.",
    perks: ["Sneaks past enemies", "Never needs to drink", "Hits hard up close"],
    pages: {
      guide: "NightElf-Rogue-WoW-Guide.html",
      professions: "NightElf-Rogue-Professions.html",
      addons: "NightElf-Rogue-Addons.html",
    },
    saveKeys: { guide: "nelfRogueBeginner.v1", professions: "nelfRogueProfessions.v1", addons: "nelfRogueAddons.scan.v1" },
  },
];

/* Game icons are stored with the site in assets/icons/<name>.jpg, copied from the
   game's own files by tools/extract-icons.py. An icon that isn't there yet is
   loaded from Wowhead instead, and hidden if that fails too. */
WF.ICON_URL = document.currentScript ? new URL("../icons/", document.currentScript.src).href : "assets/icons/";
WF.ICON_CDN = "https://wow.zamimg.com/images/wow/icons/large/";
WF.iconErr = (img) => {
  if (img.dataset.cdn) { img.remove(); return; }
  img.dataset.cdn = "1";
  img.src = WF.ICON_CDN + img.src.split("/").pop();
};
/* <img> for a game icon by name, e.g. WF.icon("inv_misc_note_01", "gi") */
WF.icon = (name, cls) => `<img${cls ? ` class="${cls}"` : ""} src="${WF.ICON_URL}${name}.jpg" alt="" draggable="false" onerror="WF.iconErr(this)">`;

/* Page link for a character, relative to the site root. */
WF.href = (c, page) => encodeURI(`${c.folder}/${c.pages[page || "guide"]}`);
WF.byId = (id) => WF.characters.find((c) => c.id === id);

/* Did this visitor use this character's pages before? Checked here, before the
   page engines run, because the guide engine saves its state as soon as it starts. */
WF.returning = (() => {
  try {
    const c = WF.byId(document.body && document.body.dataset.character);
    return !!c && Object.values(c.saveKeys).some((k) => localStorage.getItem(k) !== null);
  } catch (e) { return false; }
})();
