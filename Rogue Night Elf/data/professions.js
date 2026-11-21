/* Settings the shared professions engine (assets/js/professions.js) reads for this character. */
const PROF_PAGE = { character: "nightelf-rogue", saveKey: "nelfRogueProfessions.v1", city: "Darnassus for Night Elves" };

/* Each profession: plaque title, intro, column headers, steps, and a shopping list or tips.
   Step fields: s = skill range, c = craft or zone, t = tag (known / vendor / alliance / horde / alt),
   w = where to buy (or extra line), n = count, e = materials or mobs, note = red hint.
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
      { s: "1–75",    c: "Teldrassil", w: "Shadowglen and the woods around Dolanaar (Night Elf start) · Northshire Valley or Durotar for other races", n: "1–11", e: "Any beast: Young Nightsabers, Young Thistle Boars, Strigid Owls, Nightsabers, Mangy Nightsabers", note: "At 50, train Journeyman at a city trainer (level 10)." },
      { s: "75–115",  c: "Darkshore", t: "alliance", w: "The beaches and hills around Auberdine", n: "12–19", e: "Moonstalkers, Thistle Bears, Rabid Thistle Bears, Foreststriders" },
      { s: "75–150",  c: "The Barrens", t: "horde", w: "Small raptor camp west of Northwatch Hold", n: "16–18", e: "Sunscale Scytheclaws, Zhevra Chargers, Ornery Plainstriders", note: "At 125, train Expert (level 20)." },
      { s: "115–150", c: "Ashenvale", t: "alliance", w: "The forest around Astranaar", n: "20–25", e: "Ashenvale Bears, Elder Ashenvale Bears, Ghostpaw Runners, Shadowhorn Stags", note: "At 125, train Expert (level 20)." },
      { s: "130–150", c: "Wetlands", t: "alt", w: "Other option: Whelgar's Excavation Site", n: "25–27", e: "Mottled Scytheclaws, Mottled Razormaws", note: "At 125, train Expert (level 20)." },
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
  }
};
