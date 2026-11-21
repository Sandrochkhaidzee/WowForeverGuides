/* Settings the shared addons engine (assets/js/addons.js) reads for this character. */
const ADDONS_PAGE = { character: "nightelf-rogue", scanKey: "nelfRogueAddons.scan.v1", dbName: "nelfRogueAddons" };

/* =========================================================
   Addon list. tier: must / rec / opt / skip
   needs: other addons it requires ([slug, name]).
   pick: addons in the same pick group do the same job; install one.
   ========================================================= */

const CF = "https://www.curseforge.com/wow/addons/";
const ICON = (path) => `https://media.forgecdn.net/avatars/thumbnails/${path}`;

const TIERS = [
  { id: "must", title: "Must-have", quality: "legendary", note: "Install these first. Together they show you where to go, what to train and what to wear." },
  { id: "rec", title: "Recommended", quality: "rare", note: "Very useful, especially once you start doing dungeons (from about level 13)." },
  { id: "opt", title: "Optional", quality: "uncommon", note: "Nice to have. Add them when you want them." },
  { id: "skip", title: "Don't install", quality: "poor", note: "No WoW Forever version, or you don't need it." }
];

const ADDONS = [
  /* ---------- must-have ---------- */
  { slug: "questie", name: "Questie", tier: "must", tag: "Quests", dl: "228M", icon: "351/162/256/256/637505206198965674.png",
    what: "Shows quests on your map and minimap: where quests start, where to hand them in, and the area for each objective.",
    why: "This guide tells you which quests to do. Questie shows exactly where they are.",
    needs: [["questiedb", "QuestieDB"]],
    warn: "WoW Forever's brand-new quests may be missing or slightly off for a while. If a marker looks wrong, trust the game's own objective markers." },
  { slug: "tomtom", name: "TomTom", tag: "Map", dl: "93M", tier: "must", icon: "1495/687/256/256/638971692093458734.png",
    what: "A floating arrow that points to any spot and counts down the distance.",
    why: "Every pin on this guide's maps has a Copy /way button. Paste it in chat and follow the arrow." },
  { slug: "leatrix-plus", name: "Leatrix Plus", tag: "Quality of life", dl: "80M", tier: "must", icon: "483/32/256/256/637782408501667202.png",
    what: "Lots of small time savers in one addon. Turn on the ones you like in its settings.",
    why: "Good ones to switch on: sell junk automatically, repair automatically and faster looting.",
    warn: "Install the one by Leatrix called \"Leatrix Plus (USE THIS ONE)\". The button below goes to the right page." },
  { slug: "whats-training", name: "What's Training?", tag: "Class", dl: "16M", tier: "must", icon: "2111/909/256/256/639273738232522114.png",
    what: "Adds a list to your spellbook of the spells your class trainer can teach you.",
    why: "You train every 2 levels. This shows what's waiting, so you know when the trip is worth it." },
  { slug: "pawn", name: "Pawn", tag: "Gear", dl: "133M", tier: "must", icon: "320/97/256/256/637427080899696008.jpeg",
    what: "Marks items that are an upgrade for you, so you know what to wear.",
    why: "Rogue gear mixes Agility, Strength, Attack Power and weapon speed. Pawn does the maths for you." },

  /* ---------- recommended ---------- */
  { slug: "leatrix-maps", name: "Leatrix Maps", tag: "Map", dl: "46M", tier: "rec", icon: "483/28/256/256/637782408015473073.png",
    what: "Improves the world map, for example by showing areas you haven't explored yet and coordinates.",
    why: "Handy next to this guide's map coordinates.",
    warn: "Like Leatrix Plus, pick the one called \"(USE THIS ONE)\"." },
  { slug: "auctionator", name: "Auctionator", tag: "Gold", dl: "216M", tier: "rec", icon: "1403/232/256/256/638909541952729618.png",
    what: "Makes the auction house easy: a simple search, quick selling and price history.",
    why: "Buy better weapons and sharpening stones there, and sell the leather and lockbox loot you collect." },
  { slug: "threatclassic2", name: "ThreatClassic2", tag: "Dungeons", dl: "14M", tier: "rec", icon: "2075/356/256/256/639261378617413269.png",
    what: "A small meter that shows how close you are to pulling an enemy off the tank.",
    why: "Rogues hit hard and easily steal enemies from the tank in dungeons. When you're near the top, press Feint or slow down for a moment." },
  { slug: "dungeonjournal", name: "DungeonJournal", tag: "Dungeons", dl: "19M", tier: "rec", icon: "2218/764/256/256/639306029966247610.png",
    what: "Lists every dungeon's quests, where they start, and what the bosses drop. Made for WoW Forever.",
    why: "Collect all the quests before Hall of Thanes and the Excavation Site. Most dungeon XP comes from quests." },
  { slug: "deadly-boss-mods", name: "Deadly Boss Mods (DBM)", tag: "Dungeons", dl: "644M", tier: "rec", pick: "Boss warnings: pick DBM or BigWigs", icon: "199/661/256/256/636908483866103322.png",
    what: "Warns you before a boss does something dangerous, with timers and big text on your screen.",
    why: "Fewer surprise deaths in dungeons.",
    plugins: [["deadly-boss-mods-dbm-dungeons", "DBM - Dungeons"], ["dbm-vanilla", "DBM - Forever and Vanilla (raids, for later)"]] },
  { slug: "bigwigs", name: "BigWigs", tag: "Dungeons", dl: "210M", tier: "rec", pick: "Boss warnings: pick DBM or BigWigs", icon: "854/443/256/256/638258509870810560.jpeg",
    what: "Boss warnings and timers, like DBM, but smaller and lighter.",
    why: "Same job as DBM. Install only one of the two.",
    plugins: [["littlewigs", "LittleWigs (dungeons)"]] },
  { slug: "baganator", name: "Baganator", tag: "Bags", dl: "46M", tier: "rec", pick: "Bags: pick Baganator or Bagnon", icon: "956/327/256/256/638449029664561508.png",
    what: "All your bags in one window, with a search box and optional sorting into groups.",
    why: "Poisons, poison ingredients, bandages, food, stones and lockboxes add up fast. Easier to find things." },
  { slug: "bagnon", name: "Bagnon", tag: "Bags", dl: "174M", tier: "rec", pick: "Bags: pick Baganator or Bagnon", icon: "647/705/256/256/638048338012580367.png",
    what: "All your bags in one window, and you can look at your bank from anywhere.",
    why: "Same job as Baganator. Install only one of the two.",
    needs: [["bagbrother", "BagBrother"]] },
  { slug: "details", name: "Details! Damage Meter", tag: "Combat", dl: "377M", tier: "rec", icon: "109/996/256/256/636383851490858804.png",
    what: "Shows how much damage you and your group do in each fight.",
    why: "A quick way to check that your Slice and Dice and poisons are working, and to compare after you change talents or weapons." },

  /* ---------- optional ---------- */
  { slug: "gtfo", name: "GTFO", tag: "Dungeons", dl: "101M", tier: "opt", icon: "1807/708/256/256/639143702054586117.png",
    what: "Plays a warning sound when you stand in fire or other bad stuff.",
    why: "Rogues fight up close, right where the bad stuff lands. Move when you hear it." },
  { slug: "atlasloot-forever", name: "AtlasLoot Classic Forever", tag: "Loot", dl: "12M", tier: "opt", icon: "2052/544/256/256/639252407863198425.png",
    what: "Loot tables for every boss, plus best-gear lists for each class.",
    why: "See which dungeon drops the rogue weapons and leather gear you want before you go." },
  { slug: "decursive", name: "Decursive", tag: "Not needed", dl: "34M", tier: "skip", icon: "62/280/256/256/636142135345575340.jpg",
    what: "Shows when someone in your group has a curse, so you can remove it with one click.",
    why: "Rogues can't remove curses, poisons or diseases from others, so you don't need it." },
  { slug: "restedxp-guide", name: "RestedXP Guide", tag: "Leveling", dl: "31M", tier: "opt", icon: "2066/254/256/256/639257936596340972.png",
    what: "A step-by-step leveling guide inside the game, with arrows.",
    why: "Does the same job as this guide, but in game. Use one or the other so they don't send you two ways." },
  { slug: "rarescanner", name: "RareScanner", tag: "Map", dl: "147M", tier: "opt", icon: "58/841/256/256/636141449063964125.PNG",
    what: "Alerts you when a rare enemy, event or treasure shows up near you.",
    why: "Rares often drop nice gear for your level." },
  { slug: "openmap", name: "OpenMap", tag: "Map", dl: "6M", tier: "opt", icon: "2166/401/256/256/639291472015127682.png",
    what: "A seamless world map you can zoom and drag, in the original Vanilla art style. Made for WoW Forever.",
    why: "Like the big map (press M) in this guide, but in game." },
  { slug: "handynotes", name: "HandyNotes", tag: "Map", dl: "62M", tier: "opt", icon: "63/413/256/256/636142354843381360.jpg",
    what: "Lets you put your own notes on the map. Other addons can add notes through it too.",
    why: "Mark trainers, vendors or that quest giver you keep forgetting." },
  { slug: "mastercraft-forever", name: "Mastercraft Forever", tag: "Professions", dl: "1M", tier: "opt", icon: "2107/109/256/256/639272417824694735.png",
    what: "Profession leveling guide from 1 to 300 inside the game, with recipe picks and a shopping list. Made for WoW Forever.",
    why: "Goes well with this guide's Professions page for Leatherworking and Skinning." },
  { slug: "spoken", name: "Spoken", tag: "Fun", dl: "4M", tier: "opt", icon: "2123/272/256/256/639277523184843230.png",
    what: "Reads quest text and NPC dialogue aloud with AI voices.",
    why: "Enjoy the story without reading every quest window." },
  { slug: "minimapbuttonbutton", name: "MinimapButtonButton", tag: "Interface", dl: "19M", tier: "opt", icon: "374/842/256/256/637549050606191177.png",
    what: "Collects all the addon buttons around your minimap into a single button.",
    why: "Once you have several addons, the minimap gets crowded." },
  { slug: "bartender4", name: "Bartender4", tag: "Action bars", dl: "83M", tier: "opt", icon: "64/267/256/256/636151513516385958.png",
    what: "Lets you move, resize and change all your action bars.",
    why: "Only if you know what you're doing. This guide's Action Bars tab uses the normal game bars." },
  { slug: "gathermate2", name: "GatherMate2", tag: "Professions", dl: "37M", tier: "opt", icon: "2204/622/256/256/639302390070923019.png",
    what: "Remembers where you found herbs, ore and fishing spots and shows them on your map.",
    why: "Only useful with Herbalism, Mining or Fishing. Skinning doesn't need it, because beasts walk around." },
  { slug: "foreverauras", name: "ForeverAuras", tag: "Advanced", dl: "1M", tier: "opt", icon: "2094/896/256/256/639268148488579112.png",
    what: "Custom on-screen alerts for buffs, cooldowns and procs. A WeakAuras copy made for WoW Forever.",
    why: "For later, once you know your spells well. Use this one instead of WeakAuras." },
  { slug: "tradeskill-master", name: "TradeSkillMaster", tag: "Gold", dl: "65M", tier: "opt", icon: "298/657/256/256/637350051034612516.png",
    what: "A big, powerful tool for making gold with crafting and the auction house.",
    why: "Too much for a beginner. Auctionator is enough until level 60." },

  /* ---------- don't install ---------- */
  { slug: "weakauras-2", name: "WeakAuras", tag: "No Forever version", dl: "256M", tier: "skip", icon: "62/782/256/256/636142194921799650.png",
    what: "Very popular custom alerts addon, but it has no WoW Forever version.",
    why: "Use ForeverAuras (Optional list) instead." },
  { slug: "omni-cc", name: "OmniCC", tag: "No Forever version", dl: "66M", tier: "skip", icon: "137/516/256/256/636515481273843403.jpeg",
    what: "Puts cooldown numbers on buttons. No WoW Forever version, and not updated in 11 months.",
    why: "Skip it. The game's own cooldown sweep works fine." },
  { slug: "postal", name: "Postal", tag: "No Forever version", dl: "36M", tier: "skip", icon: "62/440/256/256/636142158871422044.jpg",
    what: "Mailbox helper. No WoW Forever version.",
    why: "Skip it for now." },
  { slug: "scrap", name: "Scrap", tag: "Not needed", dl: "34M", tier: "skip", icon: "",
    what: "Sells your junk at vendors. It does have a WoW Forever version.",
    why: "Leatrix Plus can already sell junk for you. No need for both." }
];
