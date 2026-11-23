/* Settings the shared professions engine (assets/js/professions.js) reads.
   One page for every character. oldSaveKeys: progress saved by the old per-character
   pages, copied over on the first visit. changedRoutes: routes whose rows moved when the
   pages were merged, so their old ticks are left behind. */
const PROF_PAGE = {
  saveKey: "wfProfessions.v1",
  oldSaveKeys: { "gnome-mage": "mageProfessions.v1", "nightelf-rogue": "nelfRogueProfessions.v1" },
  changedRoutes: ["skinning"],
  city: "Ironforge for Gnomes, Darnassus for Night Elves, Stormwind for Humans",
  /* The pair shown at the top of Basics for the character whose guide linked here (?c=).
     go = the route tabs to offer; a character without an entry sees no box. */
  forChar: {
    "gnome-mage": { pair: "Tailoring + Enchanting", go: ["tailoring", "enchanting"],
      why: "Mages wear cloth, so Tailoring makes your own gear from the cloth humanoids drop, and Enchanting breaks your spare Tailoring items into enchanting materials." },
    "nightelf-rogue": { pair: "Skinning + Leatherworking", go: ["skinning", "leatherworking"],
      why: "Rogues wear leather. Skinning gets the leather for free while you quest, and Leatherworking turns it into your armor and armor kits." },
    "nightelf-druid": { pair: "Herbalism + Alchemy", go: ["herbalism", "alchemy"],
      why: "No class gathers herbs faster: you pick them without leaving Travel Form (level 30) and Prowl past the enemies guarding them. Alchemy turns them into mana potions and elixirs, which a druid can now drink in any form. Learn both in Dolanaar (Malorne Bladeleaf and Cyndra Kindwhisper) as soon as you arrive. Rather make your own leather armor? Take Skinning + Leatherworking instead." },
    "human-paladin": { pair: "Mining + Blacksmithing", go: ["mining", "blacksmithing"],
      why: "Paladins wear mail (plate from 40) and swing two-handed weapons, and Blacksmithing makes both. In WoW: Forever it also has much of the only mail and plate with spell power, and its camp buff (Strength) is the best leveling camp buff for a Retribution paladin. Mining digs up the ore for free while you quest. Learn both in Stormwind as soon as you get there. Engineering instead of Blacksmithing is the other strong choice, especially at level 60. This site has no Mining or Blacksmithing route yet: ask a Stormwind guard for the trainers." }
  }
};

/* Each profession: plaque title, intro, column headers, steps, and a shopping list or tips.
   Step fields: s = skill range, c = craft or zone, t = tag (known / vendor / alliance / horde / alt),
   w = where to buy (or extra line), n = count, e = materials or mobs, note = red hint,
   race = this row is only for that race's route (Skinning), the others skip it.
   Rows with only m are trainer stops.
   Ticks are saved by row position, so add new rows only at the end of a list. */
const PROFS = {
  tailoring: {
    title: "Tailoring 1–300",
    intro: "Cloth drops from humanoid enemies, so you don't need a gathering profession. Makes cloth armor and bags.",
    cols: ["Skill", "Craft", "#", "Materials each"],
    numLabel: "Craft about ", eachLabel: "Each: ",
    matsIntro: "Raw cloth includes the cloth you turn into bolts. Keep all the cloth you loot. Runecloth is the big one.",
    steps: [
      { m: "Apprentice (skill 1–75): learn the profession at a trainer" },
      { s: "1–43",    c: "Bolt of Linen Cloth", t: "known", n: 54, e: "2 Linen Cloth" },
      { s: "43–45",   c: "Brown Linen Vest", n: 2, e: "1 Bolt of Linen, 1 Coarse Thread" },
      { s: "45–70",   c: "Linen Belt", n: 33, e: "1 Bolt of Linen, 1 Coarse Thread" },
      { s: "70–75",   c: "Reinforced Linen Cape", n: 7, e: "2 Bolt of Linen, 3 Coarse Thread" },
      { m: "Skill stopped at 75? Go to the trainer and learn Journeyman (you must be level 10)" },
      { s: "75–81",   c: "Bolt of Woolen Cloth", n: 12, e: "3 Wool Cloth", note: "Keep making bolts after this. You need about 84 in total." },
      { s: "81–100",  c: "Woolen Cape", n: 27, e: "1 Bolt of Woolen Cloth, 1 Fine Thread" },
      { s: "100–110", c: "Bolt of Silk Cloth", n: 10, e: "4 Silk Cloth", note: "You need about 66 Silk bolts in total." },
      { s: "110–125", c: "Double-stitched Woolen Shoulders", n: 19, e: "3 Bolt of Woolen Cloth, 2 Fine Thread" },
      { s: "125–132", c: "Azure Silk Hood", n: 7, e: "2 Bolt of Silk, 2 Blue Dye, 1 Fine Thread" },
      { s: "132–139", c: "Lesser Wizard's Robe", n: 8, e: "2 Bolt of Silk, 2 Fine Thread, 2 Spider's Silk" },
      { s: "139–140", c: "Formal White Shirt", n: 1, e: "3 Bolt of Silk, 2 Bleach, 1 Fine Thread" },
      { s: "140–149", c: "Bolt of Mageweave", n: 11, e: "5 Mageweave Cloth", note: "You need about 85 Mageweave bolts in total." },
      { s: "149–150", c: "Earthen Vest", n: 1, e: "3 Bolt of Silk, 1 Elemental Earth, 2 Fine Thread", note: "Craft until 150, then go train Expert." },
      { m: "Skill stopped at 150? Go to the trainer and learn Expert (you must be level 20)" },
      { s: "150–160", c: "Earthen Vest", n: 10, e: "3 Bolt of Silk, 1 Elemental Earth, 2 Fine Thread" },
      { s: "160–170", c: "Robe of Power", n: 10, e: "2 Bolt of Mageweave, 2 each Elemental Earth / Water / Fire / Air, 2 Silken Thread", note: "Expensive step: the elementals." },
      { s: "170–180", c: "Black Mageweave Vest", n: 10, e: "2 Bolt of Mageweave, 3 Silken Thread" },
      { s: "180–190", c: "Orange Mageweave Shirt", n: 11, e: "1 Bolt of Mageweave, 1 Orange Dye, 1 Heavy Silken Thread" },
      { s: "190–205", c: "Black Mageweave Gloves", n: 17, e: "2 Bolt of Mageweave, 2 Heavy Silken Thread" },
      { s: "205–214", c: "Bolt of Runecloth", n: 11, e: "5 Runecloth", note: "You need about 474 Runecloth bolts in total." },
      { s: "214–225", c: "Runecloth Belt", n: 11, e: "3 Bolt of Runecloth, 1 Rune Thread", note: "Craft until 225, then go train Artisan." },
      { m: "Skill stopped at 225? Go to the trainer and learn Artisan (you must be level 35)" },
      { s: "225–234", c: "Runecloth Belt", n: 10, e: "3 Bolt of Runecloth, 1 Rune Thread" },
      { s: "234–250", c: "Runecloth Cloak", t: "vendor", w: "Darnall, Moonglade (Nighthaven)", n: 18, e: "4 Bolt of Runecloth, 1 Ironweb Spider Silk, 1 Rune Thread" },
      { s: "250–260", c: "Runecloth Boots", t: "vendor", w: "Darnall, Moonglade (Nighthaven)", n: 12, e: "4 Bolt of Runecloth, 2 Ironweb Spider Silk, 4 Rugged Leather, 1 Rune Thread" },
      { s: "260–280", c: "Runecloth Cuffs", t: "vendor", w: "Pexmit (new in WoW Forever, location not confirmed)", n: 25, e: "5 Bolt of Runecloth, 1 Ironweb Spider Silk, 1 Rune Thread" },
      { s: "280–285", c: "Wisdom of the Timbermaw", t: "vendor", w: "Meilosh, Timbermaw Hold, Felwood (Timbermaw Friendly)", n: 8, e: "8 Bolt of Runecloth, 3 Essence of Earth, 3 Living Essence, 2 Ironweb Spider Silk" },
      { s: "285–292", c: "Venomspew Gloves", t: "vendor", w: "Mishta, Cenarion Hold, Silithus", n: 7, e: "4 Bolt of Runecloth, 1 Small Brilliant Shard, 3 Essence of Air, 6 Rune Thread" },
      { s: "292–299", c: "Venomspew Cord", t: "vendor", w: "Mishta, Cenarion Hold, Silithus", n: 9, e: "6 Bolt of Runecloth, 1 Small Brilliant Shard, 3 Essence of Air, 6 Rune Thread" },
      { s: "299–300", c: "Venomspew Footpads", t: "vendor", w: "Mishta, Cenarion Hold, Silithus", n: 4, e: "5 Bolt of Runecloth, 1 Small Brilliant Shard, 3 Essence of Air, 6 Rune Thread" }
    ],
    mats: [
      ["Linen Cloth", 110], ["Wool Cloth", 252], ["Silk Cloth", 264], ["Mageweave Cloth", 425], ["Runecloth", 2370],
      ["Coarse Thread", 56], ["Fine Thread", 111], ["Silken Thread", 50], ["Heavy Silken Thread", 45], ["Rune Thread", 196],
      ["Blue Dye", 14], ["Orange Dye", 11], ["Bleach", 2], ["Spider's Silk", 16], ["Ironweb Spider Silk", 83],
      ["Elemental Earth", 31], ["Elemental Water", 20], ["Elemental Fire", 20], ["Elemental Air", 20],
      ["Essence of Earth", 24], ["Living Essence", 24], ["Essence of Air", 60], ["Small Brilliant Shard", 20], ["Rugged Leather", 48]
    ]
  },

  leatherworking: {
    title: "Leatherworking 1–300",
    intro: "Makes leather armor and armor kits. It needs a lot of leather, so pair it with Skinning.",
    cols: ["Skill", "Craft", "#", "Materials each"],
    numLabel: "Craft about ", eachLabel: "Each: ",
    matsIntro: "Light, Medium, Heavy, Thick and Rugged leather all come from Skinning. Without it, you buy them at the auction house.",
    steps: [
      { m: "Apprentice (skill 1–75): learn the profession at a trainer" },
      { s: "1–30",    c: "Light Leather", t: "known", n: 32, e: "3 Ruined Leather Scraps" },
      { s: "30–45",   c: "Light Armor Kit", t: "known", n: 20, e: "1 Light Leather" },
      { s: "45–55",   c: "Cured Light Hide", n: 10, e: "1 Light Hide, 1 Salt" },
      { s: "55–75",   c: "Embossed Leather Gloves", n: 23, e: "3 Light Leather, 2 Coarse Thread", note: "Craft until 75, then go train Journeyman." },
      { m: "Skill stopped at 75? Go to the trainer and learn Journeyman (you must be level 10)" },
      { s: "75–85",   c: "Embossed Leather Gloves", n: 12, e: "3 Light Leather, 2 Coarse Thread" },
      { s: "85–100",  c: "Fine Leather Belt", n: 25, e: "6 Light Leather, 2 Coarse Thread", note: "Make 25, not 20. The Dark Leather Belt steps use 25 of them." },
      { s: "100–115", c: "Dark Leather Pants", n: 15, e: "12 Medium Leather, 1 Gray Dye, 1 Fine Thread", note: "Also make about 75 Cured Medium Hide (Medium Hide + Salt, from the trainer) for the next steps." },
      { s: "115–118", c: "Gray Leather Boots", n: 7, e: "4 Medium Leather, 2 Fine Thread, 1 Gray Dye" },
      { s: "118–125", c: "Dark Leather Belt", n: 7, e: "1 Fine Leather Belt, 1 Cured Medium Hide, 2 Fine Thread, 1 Gray Dye" },
      { s: "125–135", c: "Cured Heavy Hide", n: 10, e: "1 Heavy Hide, 3 Salt" },
      { s: "135–143", c: "Dark Leather Belt", n: 18, e: "1 Fine Leather Belt, 1 Cured Medium Hide, 2 Fine Thread, 1 Gray Dye" },
      { s: "143–145", c: "Cured Heavy Hide", n: 12, e: "1 Heavy Hide, 3 Salt" },
      { s: "145–150", c: "Toughened Leather Gloves", n: 12, e: "4 Medium Leather, 2 Cured Medium Hide, 2 Elixir of Lesser Defense, 2 Spider's Silk, 2 Fine Thread", note: "Craft until 150, then go train Expert. The elixirs come from Alchemy." },
      { m: "Skill stopped at 150? Go to the trainer and learn Expert (you must be level 20)" },
      { s: "150–155", c: "Toughened Leather Gloves", n: 13, e: "4 Medium Leather, 2 Cured Medium Hide, 2 Elixir of Lesser Defense, 2 Spider's Silk, 2 Fine Thread" },
      { s: "155–160", c: "Barbaric Shoulders", n: 5, e: "8 Heavy Leather, 1 Cured Heavy Hide, 2 Fine Thread" },
      { s: "160–180", c: "Gem-studded Leather Belt", t: "vendor", w: "Rikqiz, Stranglethorn Vale", n: 20, e: "4 Cured Heavy Hide, 2 Iridescent Pearl, 2 Jade, 1 Citrine, 1 Fine Thread" },
      { s: "180–185", c: "Barbaric Shoulders", n: 12, e: "8 Heavy Leather, 1 Cured Heavy Hide, 2 Fine Thread" },
      { s: "185–190", c: "Gem-studded Leather Belt", t: "vendor", w: "Rikqiz, Stranglethorn Vale", n: 7, e: "4 Cured Heavy Hide, 2 Iridescent Pearl, 2 Jade, 1 Citrine, 1 Fine Thread" },
      { s: "190–200", c: "Guardian Gloves", n: 20, e: "4 Heavy Leather, 1 Cured Heavy Hide, 1 Silken Thread" },
      { s: "200–210", c: "Thick Armor Kit", n: 20, e: "5 Thick Leather, 1 Silken Thread" },
      { s: "210–225", c: "Nightscape Pants", n: 15, e: "14 Thick Leather, 4 Silken Thread", note: "Craft until 225, then go train Artisan." },
      { m: "Skill stopped at 225? Go to the trainer and learn Artisan (you must be level 35)" },
      { s: "225–230", c: "Cured Rugged Hide", n: 6, e: "1 Rugged Hide, 1 Refined Deeprock Salt" },
      { s: "230–240", c: "Nightscape Pants", n: 20, e: "14 Thick Leather, 4 Silken Thread" },
      { s: "240–255", c: "Wicked Leather Gauntlets", t: "vendor", w: "Leonard Porter, Chillwind Camp, Western Plaguelands (Alliance) · Werg Thickblade, The Bulwark, Tirisfal Glades (Horde)", n: 15, e: "8 Rugged Leather, 1 Black Dye, 1 Rune Thread" },
      { s: "255–260", c: "Heavy Scorpid Bracers", t: "vendor", w: "Zannok Hidepiercer, Cenarion Hold, Silithus", n: 6, e: "4 Rugged Leather, 4 Heavy Scorpid Scale, 1 Rune Thread" },
      { s: "260–270", c: "Wicked Leather Gauntlets", t: "vendor", w: "Same pattern as 240–255", n: 20, e: "8 Rugged Leather, 1 Black Dye, 1 Rune Thread" },
      { s: "270–300", c: "Heavy Scorpid Helm", t: "vendor", w: "Zannok Hidepiercer, Cenarion Hold, Silithus", n: 33, e: "8 Rugged Leather, 12 Heavy Scorpid Scale, 1 Cured Rugged Hide, 1 Rune Thread", note: "Make 33 more Cured Rugged Hide for this step." }
    ],
    mats: [
      ["Ruined Leather Scraps", 96], ["Light Leather", 275], ["Light Hide", 10], ["Medium Leather", 308], ["Medium Hide", 75],
      ["Heavy Leather", 216], ["Heavy Hide", 22], ["Thick Leather", 590], ["Rugged Leather", 568], ["Rugged Hide", 39],
      ["Heavy Scorpid Scale", 420], ["Salt", 151], ["Refined Deeprock Salt", 39], ["Coarse Thread", 120], ["Fine Thread", 190],
      ["Silken Thread", 180], ["Rune Thread", 74], ["Gray Dye", 47], ["Black Dye", 35], ["Elixir of Lesser Defense", 50],
      ["Spider's Silk", 50], ["Iridescent Pearl", 54], ["Jade", 54], ["Citrine", 27]
    ]
  },

  enchanting: {
    title: "Enchanting 1–300",
    intro: "Disenchant green (or better) items into dust and essences, then use them to enchant gear and make wands. Pairs well with Tailoring, which gives you lots of green items to break down.",
    cols: ["Skill", "Craft", "#", "Materials each"],
    numLabel: "Craft about ", eachLabel: "Each: ",
    matsIntro: "Most of these come from disenchanting green items. Dust and essences from disenchanting aren't counted in the 2–20 step. The rods (Copper, Silver, Golden, Truesilver, Arcanite) are made by Blacksmiths, so buy them or ask one.",
    steps: [
      { m: "Apprentice (skill 1–75): learn the profession at a trainer" },
      { s: "1–2",     c: "Runed Copper Rod", t: "known", n: 1, e: "1 Copper Rod, 1 Mote of Magic", note: "You need this rod to enchant until 155." },
      { s: "2–20",    c: "Disenchant green items", n: "—", e: "Any green or better item", note: "Each disenchant can give a skill point. It slows down after 20 and stops at 60." },
      { s: "20–75",   c: "Lesser Magic Wand", n: 55, e: "1 Simple Wood, 1 Lesser Magic Essence", note: "Craft until 75, then go train Journeyman." },
      { m: "Skill stopped at 75? Go to the trainer and learn Journeyman (you must be level 10)" },
      { s: "75–79",   c: "Lesser Magic Wand", n: 4, e: "1 Simple Wood, 1 Lesser Magic Essence" },
      { s: "79–90",   c: "Enchant Chest - Minor Absorption", n: 11, e: "1 Lesser Magic Essence" },
      { s: "90–100",  c: "Enchant Bracer - Minor Stamina", n: 10, e: "2 Strange Dust" },
      { s: "100–101", c: "Runed Silver Rod", n: 1, e: "1 Silver Rod, 3 Strange Dust, 4 Lesser Magic Essence, 1 Shadowgem" },
      { s: "101–110", c: "Greater Magic Wand", n: 9, e: "1 Simple Wood, 2 Lesser Magic Essence" },
      { s: "110–135", c: "Enchant Cloak - Minor Agility", t: "vendor", w: "Dalria, Astranaar, Ashenvale (Alliance) · Kulwia, Sun Rock Retreat, Stonetalon Mountains (Horde)", n: 25, e: "1 Lesser Astral Essence" },
      { s: "135–150", c: "Enchant Bracer - Lesser Stamina", n: 15, e: "1 Soul Dust", note: "Craft until 150, then go train Expert." },
      { m: "Skill stopped at 150? Go to the trainer and learn Expert (you must be level 20)" },
      { s: "150–155", c: "Enchant Bracer - Lesser Stamina", n: 5, e: "1 Soul Dust" },
      { s: "155–156", c: "Runed Golden Rod", n: 1, e: "1 Golden Rod, 1 Iridescent Pearl, 1 Greater Astral Essence, 1 Soul Dust", note: "You need this rod to enchant until 200." },
      { s: "156–185", c: "Enchant Bracer - Lesser Strength", t: "vendor", w: "Dalria, Astranaar, Ashenvale (Alliance) · Kulwia, Sun Rock Retreat, Stonetalon Mountains (Horde)", n: 36, e: "1 Soul Dust" },
      { s: "185–200", c: "Enchant Bracer - Strength", n: 15, e: "1 Vision Dust" },
      { s: "200–201", c: "Runed Truesilver Rod", n: 1, e: "1 Truesilver Rod, 1 Black Pearl, 1 Greater Mystic Essence, 1 Vision Dust", note: "You need this rod to enchant until 290." },
      { s: "201–220", c: "Enchant Bracer - Strength", n: 26, e: "1 Vision Dust" },
      { s: "220–225", c: "Enchant Cloak - Greater Defense", n: 5, e: "1 Vision Dust", note: "Craft until 225, then go train Artisan." },
      { m: "Skill stopped at 225? Go to the trainer and learn Artisan (you must be level 35)" },
      { s: "225–230", c: "Enchant Gloves - Agility", n: 5, e: "1 Vision Dust" },
      { s: "230–235", c: "Enchant Boots - Stamina", n: 5, e: "2 Vision Dust" },
      { s: "235–250", c: "Enchant Chest - Superior Stamina", n: 16, e: "3 Vision Dust" },
      { s: "250–265", c: "Lesser Mana Oil", t: "vendor", w: "Lokhtos Darkbargainer, Blackrock Depths (Thorium Brotherhood reputation)", n: 15, e: "1 Dream Dust, 1 Purple Lotus, 1 Crystal Vial" },
      { s: "265–294", c: "Enchant Shield - Greater Stamina", t: "vendor", w: "Mythrin'dir, Darnassus (Alliance) · Daniel Bartlett, Undercity (Horde)", n: 30, e: "6 Dream Dust" },
      { s: "294–295", c: "Runed Arcanite Rod", t: "vendor", w: "Lorelae Wintersong, Moonglade", n: 1, e: "1 Arcanite Rod, 1 Golden Pearl, 10 Illusion Dust, 4 Greater Eternal Essence, 4 Small Brilliant Shard, 2 Large Brilliant Shard" },
      { s: "295–300", c: "Enchant Cloak - Superior Defense", t: "vendor", w: "Lorelae Wintersong, Moonglade", n: 5, e: "8 Illusion Dust" }
    ],
    mats: [
      ["Lesser Magic Essence", 92], ["Strange Dust", 23], ["Lesser Astral Essence", 25], ["Soul Dust", 57], ["Vision Dust", 110],
      ["Dream Dust", 195], ["Illusion Dust", 50], ["Greater Astral Essence", 1], ["Greater Mystic Essence", 1], ["Greater Eternal Essence", 4],
      ["Small Brilliant Shard", 4], ["Large Brilliant Shard", 2], ["Simple Wood", 68], ["Mote of Magic", 1], ["Purple Lotus", 15], ["Crystal Vial", 15],
      ["Shadowgem", 1], ["Iridescent Pearl", 1], ["Black Pearl", 1], ["Golden Pearl", 1],
      ["Copper Rod", 1], ["Silver Rod", 1], ["Golden Rod", 1], ["Truesilver Rod", 1], ["Arcanite Rod", 1]
    ]
  },

  skinning: {
    title: "Skinning 1–300",
    intro: "Kill beasts and skin them for leather and hides. Easy to level while questing. Sell the leather, or use it for Leatherworking.",
    cols: ["Skill", "Where", "Mob level", "What to skin"],
    numLabel: "Mob level ", eachLabel: "Skin: ",
    steps: [
      { m: "Apprentice (skill 1–75): learn the profession at a trainer" },
      { s: "1–75",    c: "your starting zone", w: "Night Elves: Shadowglen and the woods around Dolanaar, Teldrassil · Gnomes: Coldridge Valley and Dun Morogh · Humans: Northshire and Elwynn Forest · Horde: Durotar", n: "1–11", e: "Any beast: nightsabers, owls and boars in Teldrassil, wolves and boars in Dun Morogh and Elwynn", note: "At 50, train Journeyman at a city trainer (level 10)." },
      { s: "75–115",  c: "Darkshore", race: "Night Elf", w: "The beaches and hills around Auberdine", n: "12–19", e: "Moonstalkers, Thistle Bears, Rabid Thistle Bears, Foreststriders" },
      { s: "115–150", c: "Ashenvale", race: "Night Elf", w: "The forest around Astranaar", n: "20–25", e: "Ashenvale Bears, Elder Ashenvale Bears, Ghostpaw Runners, Shadowhorn Stags", note: "At 125, train Expert (level 20)." },
      { s: "75–130",  c: "Loch Modan", race: "Gnome", n: "16–17", e: "Elder Mountain Boars, Black Bear Patriarchs, Loch Crocolisks along the shore" },
      { s: "130–150", c: "Wetlands", race: "Gnome", w: "Whelgar's Excavation Site", n: "25–27", e: "Mottled Scytheclaws, Mottled Razormaws", note: "At 125, train Expert (level 20)." },
      { s: "75–115",  c: "Westfall and Redridge", race: "Human", w: "Goretusks and coyotes all over Westfall, then the hills around Lakeshire", n: "11–20", e: "Goretusks, Coyote Packleaders, Great Goretusks, Black Dragon Whelps" },
      { s: "115–150", c: "Duskwood and Wetlands", race: "Human", w: "Dire wolves in western Duskwood, then Whelgar's Excavation Site in the Wetlands", n: "21–27", e: "Starving and Rabid Dire Wolves, Mottled Scytheclaws, Mottled Razormaws", note: "At 125, train Expert (level 20)." },
      { s: "75–150",  c: "The Barrens", t: "horde", w: "Small raptor camp west of Northwatch Hold", n: "16–18", e: "Sunscale Scytheclaws, Zhevra Chargers, Ornery Plainstriders", note: "At 125, train Expert (level 20)." },
      { s: "150–160", c: "Hillsbrad Foothills", w: "Outside Foothill Caverns (from Southshore or Tarren Mill)", n: "22–24", e: "Vicious Gray Bears, Starving Mountain Lions" },
      { s: "160–225", c: "Hillsbrad Foothills", w: "Inside Foothill Caverns, the yeti cave near Alterac", n: "30–32", e: "Cave Yetis, Ferocious Yetis (they respawn fast)", note: "At 200, train Artisan (level 35)." },
      { s: "150–225", c: "Duskwood", t: "alt", w: "Other option: Rotting Orchard and Roland's Doom", n: "26–29", e: "Nightbane Worgen, Shadow Weavers, Dark Runners" },
      { s: "225–280", c: "Feralas", w: "Feral Scar Vale yeti cave (from Feathermoon Stronghold or Camp Mojache)", n: "43–46", e: "Feral Scar Yetis, Enraged and Hulking Feral Scars" },
      { s: "280–300", c: "Un'Goro Crater", w: "West side, fly to Marshal's Refuge", n: "50–55", e: "Diemetradons, Pterrordaxes" }
    ],
    tips: `
      <h3>What you need</h3>
      <ul>
        <li>A <b>Skinning Knife</b> in your bags. You don't need to equip it. General Goods and Leatherworking Supplies vendors sell it.</li>
        <li><b>Which mobs you can skin:</b> mobs up to level 10 need skill 1. From level 20 up, you need 5 × the mob's level (a level 30 mob needs 150). Between 11 and 19 it's 10 skill per level above 10 (level 15 needs 50).</li>
        <li>The glove enchant <b>Enchant Gloves - Skinning</b> lets you skin mobs 1 level higher.</li>
      </ul>
      <h3>Trainers</h3>
      <ul>
        <li><b>Alliance:</b> Balthus Stoneflayer (Ironforge), Maris Granger (Stormwind), Eladriel (Darnassus)</li>
        <li><b>Horde:</b> Thuwd (Orgrimmar), Killian Hagey (Undercity), Mooranta (Thunder Bluff)</li>
        <li>Starting-zone trainers teach only up to 75.</li>
      </ul>
      <h3>What leather you get</h3>
      <ul>
        <li><b>Light Leather</b> and Ruined Leather Scraps: mobs up to about level 20</li>
        <li><b>Medium Leather</b>: about level 20–30</li>
        <li><b>Heavy Leather</b>: about level 30–40</li>
        <li><b>Thick Leather</b>: about level 40–50</li>
        <li><b>Rugged Leather</b>: about level 50–60</li>
      </ul>
      <p class="hint">Leather levels are general Classic ranges, not from the WoW Forever guide.</p>`
  },

  herbalism: {
    title: "Herbalism 1–300",
    intro: "Pick herbs from the plants you see on your mini-map. No tool needed, it's easy to level while questing, and herbs always sell. Alchemy turns them into potions and elixirs. Druids can pick herbs without leaving Travel Form.",
    cols: ["Skill", "Where", "Your level", "Herbs to pick"],
    numLabel: "Your level ", eachLabel: "Pick: ",
    steps: [
      { m: "Apprentice (skill 1–75): learn the profession at a trainer" },
      { s: "1–70",    c: "your starting zone", w: "Night Elves: Shadowglen, Dolanaar and Lake Al'Ameth, Teldrassil · Gnomes: Coldridge Valley and Dun Morogh · Humans: Northshire and Elwynn Forest · Horde: Durotar, Mulgore or Tirisfal Glades", n: "1–12", e: "Peacebloom, Silverleaf, and Earthroot from skill 15", note: "At 50, train Journeyman (level 10). Night Elves: Malorne Bladeleaf in Dolanaar." },
      { s: "70–115",  c: "Darkshore", race: "Night Elf", w: "All over the zone. Stranglekelp grows under water along the coast", n: "12–19", e: "Mageroyal, Briarthorn, Stranglekelp from 85, Bruiseweed from 100" },
      { s: "70–115",  c: "Loch Modan", race: "Gnome", w: "Around Thelsamar and the lake", n: "12–18", e: "Mageroyal, Briarthorn, Bruiseweed from 100" },
      { s: "70–115",  c: "Westfall and Redridge", race: "Human", w: "Westfall's fields and coast, then the hills around Lakeshire", n: "11–20", e: "Mageroyal, Briarthorn, Stranglekelp along the Westfall coast, Bruiseweed from 100" },
      { s: "115–170", c: "Ashenvale, Wetlands or Hillsbrad Foothills", w: "Night Elves: Ashenvale around Astranaar. Others: the Wetlands or Hillsbrad", n: "20–30", e: "Bruiseweed, Wild Steelbloom, Kingsblood from 125, Liferoot from 150 (near water)", note: "At 125, train Expert (level 20)." },
      { s: "170–205", c: "Stranglethorn Vale or Arathi Highlands", w: "Anywhere in the zone, away from the roads", n: "30–37", e: "Kingsblood, Liferoot, Fadeleaf, Goldthorn from 170, Khadgar's Whisker from 185", note: "At 200, train Artisan (level 35)." },
      { s: "205–225", c: "Tanaris or the Alterac Mountains", w: "Tanaris: the ruins and hills. Alterac: the snowy slopes (Wintersbite only grows there)", n: "40–46", e: "Firebloom, Purple Lotus from 210, Khadgar's Whisker, Wintersbite" },
      { s: "225–250", c: "Feralas or The Hinterlands", w: "Ruins and hills all over both zones", n: "46–50", e: "Purple Lotus, Khadgar's Whisker, Goldthorn, Sungrass from 230" },
      { s: "250–270", c: "Felwood", w: "Along the road from the Emerald Sanctuary to Talonbranch Glade", n: "50–54", e: "Sungrass, Gromsblood from 250, Arthas' Tears, Golden Sansam from 260" },
      { s: "270–285", c: "Un'Goro Crater", w: "All over the crater. Blindweed grows by the water", n: "49–54", e: "Golden Sansam, Dreamfoil from 270, Blindweed, Mountain Silversage from 280 (on the cliffs)" },
      { s: "285–300", c: "Western and Eastern Plaguelands, or Winterspring", w: "Plaguelands: open fields. Winterspring: hills and cliffs", n: "55–60", e: "Plaguebloom from 285, Mountain Silversage, Dreamfoil, Icecap from 290 (Winterspring), and a rare Black Lotus at 300" }
    ],
    tips: `
      <h3>What you need</h3>
      <ul>
        <li><b>No tool.</b> Open your spellbook (<kbd>P</kbd>) and click <b>Find Herbs</b>: herbs now show as yellow dots on your mini-map. Point at a dot to see its name.</li>
        <li><b>Which herbs you can pick:</b> each herb needs a skill (Peacebloom 1, Earthroot 15, Mageroyal 50, Briarthorn 70, Stranglekelp 85, Bruiseweed 100, Wild Steelbloom 115, Kingsblood 125, Liferoot 150, Fadeleaf 160, Goldthorn 170, Khadgar's Whisker 185, Firebloom 205, Purple Lotus 210, Arthas' Tears 220, Sungrass 230, Blindweed 235, Gromsblood 250, Golden Sansam 260, Dreamfoil 270, Mountain Silversage 280, Plaguebloom 285, Icecap 290, Black Lotus 300). In WoW: Forever an herb stays worth a skill point a bit longer than in Classic.</li>
        <li><b>Druids:</b> pick herbs in <b>Travel Form</b> (level 30) without leaving it, and Prowl past the enemies that stand on them.</li>
        <li><b>Earthroot for the druid quest:</b> the level 14 druid quest <i>Gathering the Cure</i> asks for 5 Earthroot. With Herbalism you just pick them in Teldrassil or Darkshore.</li>
      </ul>
      <h3>Trainers</h3>
      <ul>
        <li><b>Night Elves:</b> Eleyna Duskbreeze in Shadowglen (Apprentice only), Malorne Bladeleaf in Dolanaar, Firodren Mooncaller in the Temple Gardens, Darnassus.</li>
        <li><b>Others (Alliance):</b> Reyna Stonebranch (Ironforge), Shylamiir and Tannysa (Stormwind), Kali Healtouch (Thelsamar), Alma Jainrose (Lakeshire), Telurinon Moonshadow (Menethil Harbor), Cylania Rootstalker (Silverwind Refuge, Ashenvale).</li>
        <li>New in WoW: Forever: an early starting-zone quest can give <b>Wild Harvest</b> as a reward, which teaches Apprentice Herbalism.</li>
      </ul>
      <h3>Camping (new in WoW: Forever)</h3>
      <ul>
        <li>Herbalists make camp objects. At skill 20 the trainer teaches the <b>Incense Candle</b>: everyone at your campfire gets more Intellect. Night Elves: <b>Lyreena Duskblade</b> in Dolanaar gives <i>Camping 101: Herbalism</i>, which sends you to Malorne Bladeleaf.</li>
        <li>Later camp recipes: <b>Greenhouse</b> (skill 140, drops from Shadetooth in the Excavation Site dungeon) and <b>Seed Hybridizer</b> (skill 300, Dire Maul).</li>
        <li>Picking herbs sometimes gives <b>herb seeds</b> and rare extras (Frilled Lichen and others) used by the new recipes.</li>
      </ul>
      <p class="hint">The herb skill levels and zones come from Wowhead's WoW Forever Herbalism guide. Its route stops at 225; the steps from 225 to 300 follow its list of where each herb grows.</p>`
  },

  alchemy: {
    title: "Alchemy 1–300",
    intro: "Turn herbs into potions and elixirs. Pair it with Herbalism and you gather almost everything yourself. In WoW: Forever you can drink potions in any druid form, and Alchemists no longer make Healing Potions: those moved to First Aid.",
    cols: ["Skill", "Craft", "#", "Materials each"],
    numLabel: "Craft about ", eachLabel: "Each: ",
    matsIntro: "Herbs come from Herbalism (or the auction house). Vials are sold by Alchemy and Trade Supplies vendors. The counts include the Odd Child's two quests at 270.",
    steps: [
      { m: "Apprentice (skill 1–75): learn the profession at a trainer" },
      { s: "1–12",    c: "Elixir of Minor Force", t: "known", n: 11, e: "1 Silverleaf, 1 Empty Vial" },
      { s: "12–55",   c: "Elixir of Minor Defense", t: "known", n: 43, e: "1 Silverleaf, 1 Peacebloom, 1 Empty Vial" },
      { s: "55–65",   c: "Minor Mana Potion", n: 10, e: "1 Mageroyal, 1 Peacebloom, 1 Empty Vial" },
      { s: "65–75",   c: "Elixir of Minor Fortitude", n: 10, e: "2 Earthroot, 1 Peacebloom, 1 Empty Vial", note: "Craft until 75, then go train Journeyman." },
      { m: "Skill stopped at 75? Go to the trainer and learn Journeyman (you must be level 10)" },
      { s: "75–90",   c: "Elixir of Minor Fortitude", n: 16, e: "2 Earthroot, 1 Peacebloom, 1 Empty Vial" },
      { s: "90–120",  c: "Elixir of Wisdom", n: 30, e: "1 Mageroyal, 2 Briarthorn, 1 Empty Vial" },
      { s: "120–150", c: "Lesser Mana Potion", n: 32, e: "1 Mageroyal, 1 Stranglekelp, 1 Empty Vial", note: "Craft until 150, then go train Expert." },
      { m: "Skill stopped at 150? Go to the trainer and learn Expert (you must be level 20)" },
      { s: "150–160", c: "Lesser Mana Potion", n: 11, e: "1 Mageroyal, 1 Stranglekelp, 1 Empty Vial" },
      { s: "160–195", c: "Mana Potion", n: 38, e: "1 Stranglekelp, 1 Kingsblood, 1 Leaded Vial" },
      { s: "195–205", c: "Elixir of Agility", n: 10, e: "1 Stranglekelp, 1 Goldthorn, 1 Leaded Vial", note: "Keep these: Agility is great for a cat druid." },
      { s: "205–225", c: "Greater Mana Potion", n: 20, e: "1 Khadgar's Whisker, 1 Goldthorn, 1 Leaded Vial", note: "Craft until 225, then go train Artisan." },
      { m: "Skill stopped at 225? Go to the trainer and learn Artisan (you must be level 35)" },
      { s: "225–226", c: "Philosopher's Stone", t: "vendor", w: "Alchemist Pestlezugg, Gadgetzan, Tanaris", n: 1, e: "4 Iron Bar, 1 Black Vitriol, 4 Purple Lotus, 4 Firebloom", note: "Keep the stone: transmutes need it." },
      { s: "226–240", c: "Greater Mana Potion", n: 20, e: "1 Khadgar's Whisker, 1 Goldthorn, 1 Leaded Vial" },
      { s: "240–260", c: "Draught of Detect Undead", n: 23, e: "1 Arthas' Tears, 1 Crystal Vial" },
      { s: "260–270", c: "Superior Mana Potion", t: "vendor", w: "Ulthir, Craftsmen's Terrace, Darnassus (Alliance) · Algernon, Undercity (Horde)", n: 10, e: "2 Sungrass, 2 Blindweed, 1 Crystal Vial" },
      { s: "270–300", c: "Major Discolored Healing Potion", t: "quest", w: "the Odd Child in the barn at Moonbrook, Westfall (Alliance) · Apothecary Renferrel, the Sepulcher, Silverpine Forest (Horde)", how: "This recipe comes from a special trainer, new in WoW: Forever. Alliance: find the <b>Odd Child</b> in the barn at Moonbrook, Westfall. Do two short quests for them, <i>My First Alchemy Set</i> (5 Empty Vials, 5 Silverleaf, 5 Peacebloom) and <i>My First Real Potion</i> (3 Murloc Eyes from the murlocs on the Westfall coast), and they teach it to you. Horde: Apothecary Renferrel at the Sepulcher.", n: 31, e: "1 Plaguebloom, 1 Murloc Eye, 1 Crystal Vial" }
    ],
    mats: [
      ["Peacebloom", 84], ["Silverleaf", 59], ["Earthroot", 52], ["Mageroyal", 83], ["Briarthorn", 60], ["Stranglekelp", 91],
      ["Kingsblood", 38], ["Goldthorn", 50], ["Khadgar's Whisker", 40], ["Purple Lotus", 4], ["Firebloom", 4], ["Arthas' Tears", 23],
      ["Sungrass", 20], ["Blindweed", 20], ["Plaguebloom", 31], ["Murloc Eye", 34], ["Iron Bar", 4], ["Black Vitriol", 1],
      ["Empty Vial", 168], ["Leaded Vial", 88], ["Crystal Vial", 64]
    ],
    tips: `
      <h3>Trainers</h3>
      <ul>
        <li><b>Night Elves:</b> Cyndra Kindwhisper in Dolanaar (up to Journeyman), and in Darnassus's Craftsmen's Terrace: Milla Fairancora (Journeyman), Sylvanna Forestmoon (Expert) and Ainethil (Artisan). <b>Ulthir</b> next to them sells vials and recipes.</li>
        <li><b>Others (Alliance):</b> Vosur Brakthel (Ironforge), Lilyssia Nightbreeze (Stormwind).</li>
      </ul>
      <h3>Good to know in WoW: Forever</h3>
      <ul>
        <li><b>Healing Potions moved to First Aid</b>, so anyone can make them. Alchemy keeps mana potions, elixirs, flasks and transmutes.</li>
        <li><b>For a druid:</b> potions now work in Cat and Bear Form, and the <b>Rage Potion</b> can be used by druids too. Elixir of Agility (from 195) and the new <b>Elixir of the Grizzly</b> (Strength and crit) suit a Feral druid.</li>
        <li><b>Camping:</b> Alchemists make the <b>Mana Well</b>, a camp object that helps everyone's mana. Night Elves: <b>Lyreena Duskblade</b> in Dolanaar gives <i>Camping 101: Alchemy</i>, which sends you to Cyndra Kindwhisper. You can also make a portable <b>Alchemy Laboratory</b> for flasks.</li>
      </ul>
      <p class="hint">The route is Wowhead's WoW Forever Alchemy guide (updated November 3, 2026), split at 75, 150 and 225 for the trainer visits.</p>`
  }
};
