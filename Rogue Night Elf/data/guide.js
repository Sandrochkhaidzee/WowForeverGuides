/* Settings the shared guide engine (assets/js/guide.js) reads for this character. */
const GUIDE_PAGE = {
  character: "nightelf-rogue",
  saveKey: "nelfRogueBeginner.v1",
  addonsHref: "NightElf-Rogue-Addons.html",
  abilityWord: "Ability",
  abilitiesWord: "abilities",
  itemNote: { test: /^(food|bandage|ipois|opois|stone)/, text: "Food, bandages, poisons and sharpening stones are items: buy them, make them, or find them, and they show up in your bags. Drag them from your bag (<kbd>B</kbd>) onto the key shown. When a better one replaces an old one, drop the new one on the same key and sell or use up the old ones." }
};

/* =========================================================
   Night Elf Rogue — beginner guide
   Part 1: content (steps, talents, words)
   Part 2: page behaviour
   ========================================================= */

/* ---------------------------------------------------------
   PART 1 — CONTENT
   Each step: lv = your level, place = where, title,
   todo = list of things to do, tip = optional extra help.
   chapter = optional: this step starts a new chapter (shown in the
   journey strip above the step and in the "All steps" list).
   --------------------------------------------------------- */

const STEPS = [

/* ---------- Shadowglen, levels 1–6 ---------- */
{ chapter:"Shadowglen", lv:"1", place:"Shadowglen", title:"Before you do anything", map:[["teldrassil",[58.7,44.3,"You start here, under Aldrassil"]]], learn:["sinister","eviscerate","throw","shadowmeld","eluneslight","hearth","food1"],
  done:"every ability in the <b>Action bar</b> box below is on its key.",
  todo:[
    "Press <kbd>P</kbd> to open your spellbook.",
    "Drag each ability from your spellbook to the key shown in the <b>Action bar</b> box below. If the extra bars aren't showing yet, see <b>How to set this up in game</b> on the Action Bars tab.",
    "Rogues don't use mana. Your yellow bar is <b>energy</b>: every attack costs some, and it fills up again by itself in a few seconds."
  ],
  tip:"Sinister Strike is already on key <kbd>1</kbd> and Eviscerate on <kbd>2</kbd>. Strike three times, then Eviscerate. That's your whole fight for now." },

{ lv:"1", place:"Shadowglen", title:"Your first quest", map:[["teldrassil",[58.7,44.3,"Conservator Ilthalaine"],[60.5,48.5,"Young nightsabers and thistle boars"]]],
  done:"you've handed in <b>The Balance of Nature</b> to Ilthalaine and taken the next part.",
  todo:[
    "Talk to <b>Conservator Ilthalaine</b>, the night elf right in front of you. He has a yellow <b>!</b> over his head. Accept <b>The Balance of Nature</b>.",
    "Walk out into the glade and kill young nightsabers and young thistle boars.",
    "Go back to Ilthalaine. He now has a yellow <b>?</b>. Talk to him to turn in the quest, then take the next part."
  ],
  tip:"How to fight: click a nightsaber to target it, walk up to it and press <kbd>1</kbd>. Your character also hits by itself while you stand next to the enemy." },

{ lv:"1–2", place:"Shadowglen", title:"Meet your trainer", map:[["teldrassil",[59.6,38.6,"Frahun Shadewhisper (inside Aldrassil)"],[58.7,44.3,"Ilthalaine"]]], learn:["stealth"],
  done:"Stealth is on key <kbd>=</kbd>.",
  todo:[
    "Ilthalaine also gives you a rogue quest. It sends you to <b>Frahun Shadewhisper</b>, the rogue trainer inside the big tree, Aldrassil. Walk up the ramp inside the tree.",
    "Turn it in and learn <b>Stealth</b>. Put it on key <kbd>=</kbd>.",
    "Stealth makes you almost invisible. You walk slower, and enemies only see you when you're very close. Any attack breaks it."
  ],
  tip:"After every fight, if your health is low, sit and eat (<kbd>Alt</kbd> + <kbd>2</kbd>) before the next one. It saves you from dying." },

{ lv:"2–4", place:"Shadowglen", title:"Grells and a friend in need", map:[["teldrassil",[59.9,42.5,"Melithar Staghelm"],[57.8,45.2,"Tarindrella"],[55,42,"Grells"],[60.9,42,"Dirania Silvershine"],[54.6,33,"Iverron"]]],
  done:"you've handed in <b>The Woodland Protector</b> and talked to Iverron.", stuck:"Fight grells near Aldrassil until you're level 4.",
  todo:[
    "Take <b>The Woodland Protector</b> from Melithar Staghelm and bring it to <b>Tarindrella</b>. Kill grells and grellkin for Fel Moss.",
    "Inside Aldrassil, take <b>Webwood Venom</b> from Gilshalan Windwalker.",
    "From <b>Dirania Silvershine</b>, take <b>A Good Friend</b>. It sends you north to <b>Iverron</b>, who needs help: <b>A Friend in Need</b>."
  ],
  tip:"Grells stand in small groups. Attack the one at the edge so its friends don't join in." },

{ lv:"4", place:"Frahun Shadewhisper (trainer)", title:"Level 4: Backstab", map:[["teldrassil",[59.6,38.6,"Frahun Shadewhisper (rogue trainer)"]]], learn:["backstab","pickpocket"],
  done:"Backstab is on <kbd>Shift</kbd> + <kbd>2</kbd> and Pick Pocket is on your right bar.",
  todo:[
    "Go back to Frahun and learn <b>Backstab</b> and <b>Pick Pocket</b>.",
    "Put Backstab on <kbd>Shift</kbd> + <kbd>2</kbd>. It only works <b>from behind</b> the enemy, and only with a dagger. You start with a dagger, so: Stealth, sneak behind an enemy, Backstab.",
    "Pick Pocket steals a little money from humanoids while you're in Stealth. Put it on the right bar and use it on every humanoid before you attack."
  ] },

{ lv:"4–5", place:"Shadowglen", title:"Spiders and the antidote", map:[["teldrassil",[57,32.5,"Shadowthread Cave"],[54.6,33,"Iverron"],[59.6,38.6,"Gilshalan (inside Aldrassil)"]]],
  done:"Iverron has his antidote and you've handed in <b>Webwood Venom</b>.", stuck:"Fight Webwood spiders outside the cave until you're level 5.",
  todo:[
    "Kill the Webwood spiders outside <b>Shadowthread Cave</b> for venom sacs (Webwood Venom and Iverron's Antidote).",
    "Bring the antidote to Iverron quickly. The quest has a timer.",
    "Optional: <b>Webwood Egg</b> from inside the cave. Stay near the entrance."
  ],
  tip:"In caves, enemies stand close together. Fight them one at a time and step back so you don't pull their friends." },

{ lv:"5–6", place:"Shadowglen", title:"Leave Shadowglen", map:[["teldrassil",[62.5,32.5,"Moonwell"],[61.2,47.6,"Porthannius"],[55.6,59.8,"Dolanaar"]]],
  done:"you've reached Dolanaar with <b>Dolanaar Delivery</b> in your quest log.", stuck:"Fight nightsabers and boars along the road until you're level 6.",
  todo:[
    "Gilshalan sends you to the moonwell with <b>Tenaron's Summons</b> and <b>Crown of the Earth</b>. Fill the phial at the moonwell and bring it back.",
    "Take <b>Dolanaar Delivery</b> from Porthannius at the edge of the glade.",
    "Follow the road south out of the glade to the town of <b>Dolanaar</b>."
  ] },

/* ---------- Dolanaar, levels 6–11 ---------- */
{ chapter:"Dolanaar", lv:"6", place:"Dolanaar", title:"Make Dolanaar your home", map:[["teldrassil",[55.6,59.8,"Innkeeper Keldamyr"],[56.1,61.7,"Corithras Moonrage"]]],
  done:"your Hearthstone says <b>Dolanaar</b> when you hover over it.",
  todo:[
    "Find <b>Innkeeper Keldamyr</b> and choose <b>Make this inn your home</b>.",
    "Your <b>Hearthstone</b> (in your bag) now teleports you back here. It has a 1 hour cooldown.",
    "Turn in <b>Dolanaar Delivery</b> and <b>Crown of the Earth</b>."
  ],
  tip:"Always log out inside an inn. You'll get bonus XP (called rested XP) when you come back." },

{ lv:"6", place:"Jannok Breezesong (trainer, Dolanaar)", title:"Level 6: Gouge", map:[["teldrassil",[56.4,60.1,"Jannok Breezesong (rogue trainer)"]]], learn:["gouge"],
  done:"Gouge is on key <kbd>4</kbd>.",
  todo:[
    "Dolanaar has its own rogue trainer, <b>Jannok Breezesong</b>. Learn <b>Gouge</b> and put it on key <kbd>4</kbd>.",
    "Gouge stuns the enemy for a few seconds. Any hit wakes it up again, so use the time to get behind it, or to run away."
  ],
  tip:"Trick to learn now: Gouge, walk behind the enemy, Backstab. It only works while you have a dagger in your main hand." },

{ lv:"6–7", place:"Dolanaar", title:"Grab every quest in town", map:[["teldrassil",[55.6,59.8,"Dolanaar"],[60.5,56.3,"Zenn Foulhoof"]]],
  done:"your quest log (<kbd>L</kbd>) has all five quests above.",
  todo:[
    "Walk around Dolanaar and take every yellow <b>!</b> you see: <b>A Troubling Breeze</b>, <b>The Emerald Dreamcatcher</b>, <b>Twisted Hatred</b> and <b>Denalan's Earth</b>.",
    "<b>Zenn Foulhoof</b>, the satyr just east of town, offers <b>Zenn's Bidding</b>. Kill a few nightsabers, owls and webwood spiders for him.",
    "Press <kbd>L</kbd> to open your quest log. Each quest tells you where to go."
  ] },

{ lv:"7–8", place:"East of Dolanaar", title:"Starbreeze and the dreamcatcher", map:[["teldrassil",[66.3,58.5,"Starbreeze Village"],[69.4,53.4,"Ferocitas the Dream Eater"],[51.2,50.8,"Fel Rock"]]],
  done:"you've handed in <b>The Emerald Dreamcatcher</b>, <b>Gnarlpine Corruption</b> and <b>Twisted Hatred</b>, and you're level 8.", stuck:"Fight Gnarlpine furbolgs east of Dolanaar until you are.",
  todo:[
    "Go east to <b>Starbreeze Village</b>. Talk to Gaerolas Talvethren and find the <b>Emerald Dreamcatcher</b> in one of the houses.",
    "Kill Gnarlpine furbolgs for <b>Gnarlpine Corruption</b>, then <b>Ferocitas the Dream Eater</b> at their camp.",
    "<b>Twisted Hatred</b>: Lord Melenas sits at the back of the <b>Fel Rock</b> cave, north of Dolanaar."
  ],
  tip:"Furbolgs come in groups. Use Stealth to sneak past the ones you don't need." },

{ lv:"8", place:"Jannok Breezesong (trainer, Dolanaar)", title:"Level 8: Evasion", map:[["teldrassil",[56.4,60.1,"Jannok Breezesong (rogue trainer)"]]], learn:["evasion"],
  done:"Evasion is on key <kbd>8</kbd>.",
  todo:[
    "Learn <b>Evasion</b> and put it on key <kbd>8</kbd>.",
    "Evasion makes you dodge most attacks for a while. Press it when two or more enemies attack you at once, or when your health drops fast."
  ] },

{ lv:"8–9", place:"Lake Al'Ameth", title:"Denalan's seeds", map:[["teldrassil",[60.9,68.5,"Denalan"],[56,72,"Timberlings"],[53.8,75.1,"Oakenscowl's cave (elite)"]]],
  done:"you've handed in <b>Timberling Seeds</b> and <b>Timberling Sprouts</b> and you're level 10.", stuck:"Fight timberlings around the lake until you are.",
  todo:[
    "Go south to <b>Denalan</b> by the lake. Do <b>Timberling Seeds</b> and <b>Timberling Sprouts</b>: kill timberlings by the water.",
    "Skip <b>Oakenscowl</b> unless you have a group. He's an <b>elite</b>.",
    "Bring back what you finished to Dolanaar."
  ] },

{ lv:"10", place:"Jannok Breezesong (trainer, Dolanaar)", title:"Level 10: Slice and Dice and your first talent", map:[["teldrassil",[56.4,60.1,"Jannok Breezesong (rogue trainer)"]]], learn:["slicedice","sprint","sap"],
  done:"Slice and Dice is on <kbd>3</kbd>, Sprint on <kbd>7</kbd>, Sap on <kbd>Shift</kbd> + <kbd>=</kbd>, and your talent point is spent.",
  todo:[
    "Learn <b>Slice and Dice</b>, <b>Sprint</b>, <b>Sap</b> and <b>Dual Wield</b>. Dual Wield lets you hold a weapon in each hand. It works by itself, no button.",
    "Put Slice and Dice on key <kbd>3</kbd> and Sprint on key <kbd>7</kbd>. Sap goes on <kbd>Shift</kbd> + <kbd>=</kbd>.",
    "Press <kbd>N</kbd> to open talents. Click the <b>Combat</b> tab and put your point into <b>Improved Eviscerate</b>."
  ],
  tip:"New fight: Sinister Strike twice, Slice and Dice (you attack faster), then Sinister Strike until you have 3 to 5 combo points, then Eviscerate. Keep Slice and Dice running." },

/* ---------- Darnassus ---------- */
{ chapter:"Darnassus", lv:"10", place:"Darnassus", title:"Visit Darnassus", map:[["teldrassil",[39,49,"The road west to Darnassus"]],["darnassus",[63,61,"You come in here"],[37,22,"Rogue trainers (Cenarion Enclave)"],[57.6,46.7,"Ilyenia Moonfire (weapon trainer)"]]], learn:["firstaid","bandage1"],
  done:"you've learned First Aid and Cooking and you know where the rogue trainers are.",
  todo:[
    "Follow the road west from Dolanaar to the city of <b>Darnassus</b>.",
    "Find the rogue trainers. Ask any guard: click them and they'll mark the place on your map.",
    "Learn <b>First Aid</b> and <b>Cooking</b>. Rogues can't heal themselves, so bandages made from cloth are your best friend. Skinning and Leatherworking are good main professions for a rogue: see the <a href=\"NightElf-Rogue-Professions.html\">Professions page</a>."
  ],
  tip:"Bandages: open First Aid (spellbook, <kbd>P</kbd>), make <b>Linen Bandages</b> from the Linen Cloth that humanoids drop, and put them on <kbd>Alt</kbd> + <kbd>1</kbd>. Bandage after a fight while you eat." },

{ lv:"10", place:"Darnassus", title:"Rogue quest: a free dagger", map:[["darnassus",[37,22,"Syurna (rogue trainer)"]],["teldrassil",[44.5,59.5,"Ban'ethil Barrow Den"]]],
  done:"the <b>Blade of Cunning</b> is in your main hand.",
  todo:[
    "Your trainer gives you <b>The Apple Falls</b>. It leads to <b>Destiny Calls</b> from <b>Syurna</b> in Darnassus.",
    "Do what she asks. The reward is the <b>Blade of Cunning</b>, a dagger much better than the one you started with.",
    "Equip it (right-click it in your bags)."
  ],
  tip:"Your talents are for Combat, which likes swords, maces, axes and fist weapons. Until you find a good one, a strong dagger is fine." },

{ lv:"10–11", place:"Western Teldrassil", title:"The western glades", map:[["teldrassil",[44.9,61.6,"Oben Rageclaw"],[44.5,59.5,"Ban'ethil Barrow Den"],[42,67,"Pools of Arlithrien"],[38.3,34.4,"Sentinel Arynia Cloudsbreak"],[31.5,31.6,"Mist (nightsaber cub)"]]],
  done:"you've handed in <b>The Relics of Wakening</b>, the Crown of the Earth phial and Mist, and you're level 11.", stuck:"Fight the furbolgs around Ban'ethil Barrow until you are.",
  todo:[
    "<b>The Relics of Wakening</b> and <b>The Sleeping Druid</b>: the furbolg den at Ban'ethil Barrow.",
    "Fill the next phial at the moonwell by the <b>Pools of Arlithrien</b> (<b>Crown of the Earth</b>).",
    "In the north, the <b>Oracle Glade</b>: Sentinel Arynia Cloudsbreak and the lost nightsaber cub <b>Mist</b>. Lead the cub home."
  ],
  tip:"Skip <b>Ursal the Mauler</b> until you're 11 or more. He hits hard." },

{ lv:"12", place:"Trainer (Dolanaar or Darnassus)", title:"Level 12: Kick", map:[["teldrassil",[56.4,60.1,"Jannok Breezesong (Dolanaar)"]],["darnassus",[37,22,"Rogue trainers (Cenarion Enclave)"]]], learn:["kick"],
  done:"Kick is on key <kbd>5</kbd> and your talent points are spent.",
  todo:[
    "Learn <b>Kick</b> and <b>Parry</b>. Parry works by itself.",
    "Put Kick on key <kbd>5</kbd>. When an enemy is casting a spell (you'll see a cast bar under its name), press it to stop the spell.",
    "Spend your talent points (<kbd>N</kbd>). The Talents tab of this guide tells you which one."
  ],
  tip:"From now on, train every even level and spend a talent point every level." },

{ lv:"11–12", place:"Rut'theran Village", title:"Fly to Darkshore", map:[["teldrassil",[56.3,92.4,"Nessa Shadowsong"],[58.4,94,"Vesprystus (flight master)"]],["darkshore",[36.3,45.6,"Auberdine: you land here"]]],
  done:"you've landed in Auberdine.",
  todo:[
    "In Darnassus, take <b>Nessa Shadowsong</b> and <b>The Bounty of Teldrassil</b> from the quest givers. Step into the pink portal to <b>Rut'theran Village</b> at the bottom of the tree.",
    "Turn in to Nessa, then take <b>Flight to Auberdine</b>. Talk to <b>Vesprystus</b>, the hippogryph master. Your first flight is free.",
    "Fly to <b>Auberdine</b> in Darkshore."
  ] },

/* ---------- Darkshore, levels 12–19 ---------- */
{ chapter:"Darkshore", lv:"12", place:"Auberdine", title:"Your new home: Auberdine", map:[["darkshore",[37,44.1,"Innkeeper Shaussiy"],[36.3,45.6,"Flight master"]]],
  done:"Auberdine is your home and the quests above are in your log.",
  todo:[
    "Make the inn your home. Talk to the flight master so you can fly here later.",
    "Take every quest in town: <b>Buzzbox 827</b>, <b>Washed Ashore</b>, <b>Plagued Lands</b>, <b>How Big a Threat?</b>, <b>Tools of the Highborne</b>, <b>The Red Crystal</b> and <b>Cave Mushrooms</b>.",
    "Your quest log (<kbd>L</kbd>) says how many of each thing you need. Check it before you leave town."
  ],
  tip:"There's no rogue trainer here. Every two levels, fly back to Rut'theran and take the portal up to Darnassus to train." },

{ lv:"12–13", place:"Darkshore beach", title:"The beach south of town", map:[["darkshore",[36.7,46.3,"Buzzbox 827"],[36.5,51,"Beached Sea Creature"],[39,52,"Furbolg camp"]]],
  done:"you've handed in <b>Buzzbox 827</b>, <b>Washed Ashore</b> and <b>How Big a Threat?</b>", stuck:"Fight crawlers on the beach until you're level 13.",
  todo:[
    "Kill crawlers on the beach for <b>Buzzbox 827</b>. The Buzzbox is the little machine just south of town. Take <b>Buzzbox 411</b> from it.",
    "<b>Washed Ashore</b>: search the big skeleton on the beach to the south.",
    "<b>How Big a Threat?</b>: look at the furbolg camp east of the road and report back."
  ] },

{ lv:"13–15", place:"Northern Darkshore", title:"The northern loop", map:[["darkshore",[38,29,"Shipwreck"],[44.2,36.3,"Asterion (Bashal'Aran)"],[47,49,"The Red Crystal"],[42.5,62,"Ameth'Aran"]]],
  done:"you've handed in <b>Buzzbox 411</b>, <b>Deep Ocean, Vast Sea</b> and <b>The Red Crystal</b>, and you're level 15.", stuck:"Fight the moonstalkers and furbolgs north of Auberdine until you are.",
  todo:[
    "Follow the coast north. Kill threshers for <b>Buzzbox 411</b> and loot the sunken lockboxes at the wreck for <b>Deep Ocean, Vast Sea</b>.",
    "<b>Bashal'Aran</b>: talk to Asterion at the ruins and follow the chain.",
    "Find <b>The Red Crystal</b> in the hills and do <b>The Fall of Ameth'Aran</b> at the ruins to the south."
  ] },

{ lv:"14", place:"Darnassus (fly)", title:"Level 14: Garrote and Expose Armor", map:[["darnassus",[37,22,"Rogue trainers (Cenarion Enclave)"]]], learn:["garrote","exposearmor"],
  done:"Garrote is on <kbd>Shift</kbd> + <kbd>3</kbd> and Expose Armor on <kbd>Shift</kbd> + <kbd>9</kbd>.",
  todo:[
    "Fly to Rut'theran, take the portal up to Darnassus, and learn everything you can afford.",
    "<b>Garrote</b> (<kbd>Shift</kbd> + <kbd>3</kbd>) is an opener: from Stealth, behind the enemy. It makes it bleed for a while.",
    "<b>Expose Armor</b> (<kbd>Shift</kbd> + <kbd>9</kbd>) makes an enemy take more damage. Only worth it on enemies that live a long time, like bosses."
  ] },

{ lv:"15–16", place:"Northern Darkshore", title:"Blackwood camps and the tower", map:[["darkshore",[51,35,"Blackwood camp"],[51.5,38.3,"Den Mother"],[54.4,31.8,"Cliffspring Falls"],[55,25,"Tower of Althalaxx"]]],
  done:"you've handed in <b>The Blackwood Corrupted</b>, <b>Cave Mushrooms</b> and <b>The Tower of Althalaxx</b>, and you're level 16.", stuck:"Fight the Blackwood furbolgs at their camps until you are.",
  todo:[
    "Clear the <b>Blackwood</b> furbolg camps for <b>The Blackwood Corrupted</b>.",
    "<b>Cave Mushrooms</b>: the cave behind <b>Cliffspring Falls</b>.",
    "<b>The Tower of Althalaxx</b>: kill the Dark Strand cultists around the tower in the north."
  ],
  tip:"Darkshore has a free bag: finish the <b>Buzzbox</b> chain (827, 411, 323, 525) and take <b>Wizbang's Gunnysack</b> as the reward." },

{ lv:"16", place:"Darnassus (fly)", title:"Level 16: Feint and Pick Lock", map:[["darnassus",[37,22,"Rogue trainers (Cenarion Enclave)"]]], learn:["feint","picklock"],
  done:"Feint is on <kbd>Shift</kbd> + <kbd>8</kbd> and Pick Lock is on your right bar.",
  todo:[
    "Learn <b>Feint</b> and <b>Pick Lock</b>, plus any new ranks.",
    "Feint (<kbd>Shift</kbd> + <kbd>8</kbd>) makes enemies less angry at you. In WoW Forever it works twice as well. Use it in dungeons so they keep attacking the tank.",
    "Pick Lock opens locked boxes. Lockboxes from enemies often hold money and green items."
  ] },

{ lv:"17–19", place:"Southern Darkshore", title:"The southern loop", map:[["darkshore",[36,76,"Murkdeep's camp"],[35.7,83.7,"Prospector Remtravel"],[43.6,76.3,"Onu"],[45,85.3,"Volcor"]]],
  done:"Murkdeep is dead, Remtravel and Volcor are safe, Kerlonian is on his way, and you're level 19.", stuck:"Fight the murlocs and bears in southern Darkshore until you are.",
  todo:[
    "<b>WANTED: Murkdeep!</b> (poster by the inn), <b>The Absent Minded Prospector</b> (an escort), and <b>The Master's Glaive</b> from Onu.",
    "Free <b>Volcor</b> in the south. Pick <b>Escape Through Stealth</b>: it's made for rogues. Stay in Stealth and walk him out.",
    "<b>The Sleeper Has Awakened</b>: wake Kerlonian Evershade and lead him to Maestra's Post in Ashenvale."
  ] },

{ lv:"18", place:"Darnassus (fly)", title:"Level 18: Ambush", map:[["darnassus",[37,22,"Rogue trainers (Cenarion Enclave)"]]],
  done:"you've learned Ambush and the new ranks.",
  todo:[
    "Learn <b>Ambush</b>, <b>Poised</b> and new ranks of your attacks.",
    "Ambush is a big hit from Stealth, but it needs a <b>dagger</b>. You're Combat, so leave it in the spellbook unless you're still using the Blade of Cunning."
  ] },

{ lv:"19–20", place:"Darkshore → Ashenvale", title:"Into Ashenvale", map:[["darkshore",[44,92,"Road south to Ashenvale"]],["ashenvale",[26.2,38.7,"Maestra's Post"],[36.5,49.5,"Astranaar"]]],
  done:"Astranaar is your home and you've unlocked its flight path.",
  todo:[
    "Follow the road south out of Darkshore into <b>Ashenvale</b>.",
    "Stop at <b>Maestra's Post</b> to turn in Kerlonian and the Tower of Althalaxx quests.",
    "Follow the road east to <b>Astranaar</b>. Make the inn your home and unlock the flight path."
  ] },

/* ---------- Level 20 ---------- */
{ chapter:"Poisons quest", lv:"20", place:"Darnassus", title:"Level 20: poisons", map:[["darnassus",[37,22,"Rogue trainers (Cenarion Enclave)"]]],
  done:"you've learned Rupture and the new ranks, and you know about the poisons quest.",
  todo:[
    "Learn <b>Rupture</b> and new ranks. Rupture is a bleeding finisher. Slice and Dice and Eviscerate are better while questing, so you can leave it in the spellbook.",
    "Ask your trainer about <b>poisons</b>. Rogues learn them from a quest at this level: see the next step."
  ] },

{ lv:"20–24", place:"Stormwind and Westfall", title:"Rogue quest: poisons", map:[["darkshore",[32.4,43.8,"Auberdine docks"]],["stormwind",[75.8,59.8,"Master Mathias Shaw (SI:7, Old Town)"],[66.3,62.1,"Flight master"]],["westfall",[56.4,47.5,"Sentinel Hill"]]], learn:["poisons","ipois1","opois1"],
  done:"you've learned Poisons and Instant Poison, and both weapons have poison on them.",
  todo:[
    "Go to <b>Stormwind</b>. From Auberdine, take the ship to Stormwind (new in WoW Forever). If you can't find it, take the boat to Menethil Harbor and travel through Ironforge and the Deeprun Tram.",
    "In <b>Old Town</b>, find <b>Master Mathias Shaw</b> at SI:7 and take <b>Mathias and the Defias</b>. It leads to <b>Klaven's Tower</b> in Westfall and then <b>The Touch of Zanzil</b>.",
    "At the end you learn <b>Poisons</b> and <b>Instant Poison</b>. Unlock the Stormwind and Westfall flight paths while you're there."
  ],
  tip:"How poisons work: open Poisons from your spellbook (<kbd>P</kbd>) and make them (the ingredients are sold by poison vendors). Click the poison on your right bar, then click your weapon on the character window (<kbd>C</kbd>). In WoW Forever, poisons have more charges and work together with sharpening stones." },

{ lv:"21", place:"Talents (N)", title:"Level 21: Riposte", learn:["riposte"],
  done:"Riposte is on key <kbd>-</kbd>.",
  todo:[
    "Put this level's talent point into <b>Riposte</b>.",
    "Open your spellbook (<kbd>P</kbd>) and put Riposte on key <kbd>-</kbd>."
  ],
  tip:"Riposte only lights up right after you parry an attack. When it lights up, press it." },

/* ---------- Ashenvale, levels 20–25 ---------- */
{ chapter:"Ashenvale & Wetlands", lv:"20–24", place:"Ashenvale", title:"Quest Ashenvale", map:[["ashenvale",[36.5,49.5,"Astranaar"],[20.3,42.4,"Raene's Cleansing (Raene Wolfrunner)"],[14.5,26,"Zoram Strand"],[30.5,31,"Bathran's Haunt"],[33,67,"Ruins of Stardust"]]],
  done:"you're level 22 and have handed in <b>The Zoram Strand</b>, <b>Bathran's Hair</b> and <b>The Ruins of Stardust</b>.", stuck:"Fight the Foulweald furbolgs or the bears near Astranaar until you are.",
  todo:[
    "Take the quests in Astranaar. <b>The Zoram Strand</b>: Wrathtail naga on the far west coast. <b>Bathran's Hair</b>: search the ruins of Bathran's Haunt, north of the road. <b>The Ruins of Stardust</b>: collect stardust at the ruins south-west of town.",
    "<b>Raene Wolfrunner</b> at the inn starts <b>Raene's Cleansing</b>, a chain about the corrupted forest. Follow it as far as you can.",
    "Your quest log (<kbd>L</kbd>) says how many of each thing you need. Hand each quest back to whoever gave it to you: they have a yellow <b>?</b>.",
    "Ashenvale has the Horde nearby. On PvP servers, stay in Stealth while you travel."
  ] },

{ lv:"22", place:"Darnassus (fly)", title:"Level 22: Vanish", map:[["darnassus",[37,22,"Rogue trainers (Cenarion Enclave)"]]], learn:["vanish"],
  done:"Vanish is on key <kbd>9</kbd> and you have Flash Powder in your bags.",
  todo:[
    "Learn <b>Vanish</b> and <b>Distract</b>. Vanish needs <b>Flash Powder</b>: buy it from a poison vendor.",
    "Put Vanish on key <kbd>9</kbd>. When a fight goes wrong, press it: you disappear into Stealth and the enemies forget you. Then walk away.",
    "Distract makes enemies look the other way. You'll rarely need it, so leave it in the spellbook."
  ] },

{ lv:"24", place:"Darnassus (fly)", title:"Level 24: Shank", map:[["darnassus",[37,22,"Rogue trainers (Cenarion Enclave)"]]], learn:["shank","detecttraps"],
  done:"Shank is on <kbd>Shift</kbd> + <kbd>-</kbd>.",
  todo:[
    "Learn <b>Shank</b> (new in WoW Forever), <b>Detect Traps</b> and <b>Mind-numbing Poison</b>.",
    "Put Shank on <kbd>Shift</kbd> + <kbd>-</kbd>. Use it between your Sinister Strikes when it's ready."
  ] },

{ lv:"22–27", place:"Ashenvale", title:"Dungeon: Blackfathom Deeps", map:[["ashenvale",[14.5,14.2,"Blackfathom Deeps entrance"],[36.5,49.5,"Astranaar"]]],
  done:"your group has beaten the last boss, Aku'mai, or you've decided to skip it.",
  todo:[
    "A dungeon is a private area for a group of 5 players. Blackfathom Deeps is in the far northwest of Ashenvale, on the coast.",
    "Collect its quests first in Astranaar, Auberdine and Darnassus. Your quest log shows which ones start inside.",
    "Find a group: open the Looking For Group tool or ask in chat (\"LFG BFD\").",
    "Inside, stay behind the tank (the player the enemies attack), hit the same enemy as the tank, and don't attack before the tank does."
  ],
  tip:"Most dungeon XP in Forever comes from quests, not kills. Use Feint when an enemy starts attacking you instead of the tank." },

{ lv:"25", place:"Talents (N)", title:"Level 25: Flawless Execution and Legacy", learn:[],
  done:"your talent point and your Legacy point are spent.",
  todo:[
    "Talent: <b>Flawless Execution</b>. Eviscerate now costs 10 less energy.",
    "Around now you get your first <b>Legacy</b> point. Press <kbd>Y</kbd> and put it in <b>Thrill of Adventure</b>: every kill gives back some health."
  ] },

{ lv:"26", place:"Darnassus (fly)", title:"Level 26: Cheap Shot", map:[["darnassus",[37,22,"Rogue trainers (Cenarion Enclave)"]]], learn:["cheapshot"],
  done:"Cheap Shot is on <kbd>Shift</kbd> + <kbd>1</kbd>.",
  todo:[
    "Learn <b>Cheap Shot</b> and put it on <kbd>Shift</kbd> + <kbd>1</kbd>.",
    "Cheap Shot is an opener: from Stealth it stuns the enemy for a few seconds and gives you 2 combo points."
  ],
  tip:"New fight: Stealth → walk up → Cheap Shot → Slice and Dice → Sinister Strike until 5 combo points → Eviscerate." },

{ lv:"24–28", place:"Wetlands", title:"The Wetlands", map:[["darkshore",[32.4,43.8,"Auberdine docks: boat to Menethil"]],["wetlands",[10.5,60,"Menethil Harbor"],[34,42,"Whelgar's Excavation Site"],[56.4,40.4,"The Greenwarden"],[48,15,"Dun Modr"],[44,25,"Ironbeard's Tomb"]]],
  done:"you're level 28 and the Menethil Harbor quests are handed in.", stuck:"Fight the murlocs or crocolisks along the Wetlands coast until you are.",
  todo:[
    "Take the boat from Auberdine to <b>Menethil Harbor</b>. Make the inn your home and unlock the flight path.",
    "Take every quest in town: <b>Claws from the Deep</b> (murlocs along the coast), <b>Young Crocolisk Skins</b> (young crocolisks in the marsh) and <b>Digging Through the Ooze</b> (oozes in the hills). Do these first.",
    "Then move inland. <b>The Greenwarden</b> leads to <b>Tramping Paws</b> (gnolls). In the north are the dwarf ruins: <b>Fall of Dun Modr</b> and <b>Ironbeard's Tomb</b>. The Wetlands also got 20+ new quests in Forever: take any you find.",
    "New dungeon: <b>Excavation Site</b>, best at levels 26–29. Collect its quests from Caitlin Grassman in Menethil first."
  ] },

{ lv:"28", place:"Darnassus or Stormwind", title:"Level 28: stronger poison", map:[["stormwind",[75.8,59.8,"SI:7 (rogue trainers)"]]],
  done:"Instant Poison II is on your main hand.",
  todo:[
    "Learn <b>Instant Poison II</b> and new ranks.",
    "Stormwind's rogue trainers are at SI:7 in Old Town. Train wherever is closest."
  ] },

/* ---------- 28–34: Duskwood, Arathi, Southshore ---------- */
{ chapter:"Duskwood to Arathi", lv:"28–30", place:"Darkshire, Duskwood", title:"Duskwood", map:[["duskwood",[73.5,46,"Darkshire"],[64,36,"Brightwood Grove (worgen)"],[20,45,"Raven Hill Cemetery (skeletons)"],[80,70,"Tranquil Gardens Cemetery"]]],
  done:"you're level 30 and have handed in <b>Worgen in the Woods</b> and <b>The Night Watch</b>.", stuck:"Fight the worgen in Brightwood Grove until you are.",
  todo:[
    "Go to Stormwind (from Menethil Harbor: fly to Ironforge and take the Deeprun Tram), then follow the road south-east through Elwynn Forest into <b>Duskwood</b>, a dark forest. The town is <b>Darkshire</b>, on the east side. Make the inn your home and unlock the flight path.",
    "Take every quest in Darkshire. Start with <b>Worgen in the Woods</b> from Calor (wolf-men in Brightwood Grove, north-west of town) and <b>The Night Watch</b> from Commander Althea Ebonlock (skeletons in Raven Hill Cemetery, far west).",
    "Many Duskwood quests lead into one story about <b>Morbent Fel</b>, a necromancer at the Tranquil Gardens Cemetery. Keep following it: it's one of the best stories in the game.",
    "Skip quests marked <b>Elite</b>, like <b>Mor'Ladim</b>, unless you have a group. Move on at level 30."
  ],
  tip:"Worgen walk in pairs. They're humanoids, so Sap works on them: Sap one, kill the other, then fight the one that wakes up." },

{ lv:"30", place:"Stormwind trainer", title:"Level 30: Kidney Shot and Deadly Poison", map:[["stormwind",[75.8,59.8,"SI:7 (rogue trainers, Old Town)"]]], learn:["kidney","opois2","disarmtrap"],
  done:"Kidney Shot is on <kbd>Shift</kbd> + <kbd>4</kbd> and Deadly Poison is on your off hand.",
  todo:[
    "Fly to Stormwind and visit the rogue trainers at <b>SI:7</b> in Old Town. Learn <b>Kidney Shot</b>, <b>Deadly Poison</b> and <b>Disarm Trap</b>.",
    "Kidney Shot (<kbd>Shift</kbd> + <kbd>4</kbd>) is a finisher that stuns. Use it on enemies that cast spells, or when you need a break.",
    "Put <b>Deadly Poison</b> on your off-hand weapon and keep Instant Poison on your main hand."
  ],
  tip:"From now on you need a trainer every 2 levels. Rogue trainers: SI:7 in Stormwind, the Forlorn Cavern in Ironforge, and the Cenarion Enclave in Darnassus. Use whichever is closest." },

{ lv:"30–32", place:"Arathi Highlands", title:"Arathi Highlands", map:[["arathi",[44,89,"Thandol Span (from the Wetlands)"],[45.8,47.6,"Refuge Pointe"],[32,28,"Northfold Manor (Syndicate)"],[66,68,"Witherbark Village (trolls)"],[25,30,"Stromgarde Keep (elites)"],[73,33,"Hammerfall (Horde town)"]]],
  done:"you're level 32 and have handed in <b>Northfold Manor</b>.", stuck:"Fight the Syndicate around Northfold Manor until you are.",
  todo:[
    "Fly to <b>Menethil Harbor</b> and ride north over the big bridge (Thandol Span) into <b>Arathi Highlands</b>, a wide open grassland.",
    "In the middle is <b>Refuge Pointe</b>, the Alliance camp. Unlock the flight path and make it your home.",
    "Take every quest. Captain Nials's <b>Northfold Manor</b> sends you to the Syndicate in the north-west. Sentinel Glynda Nal'Shea sends you after the Witherbark trolls in the south-east.",
    "Stay out of <b>Stromgarde Keep</b> (west) unless you're in a group: it's full of elite enemies. <b>Hammerfall</b> (east) is a Horde town. Move on at level 32."
  ],
  tip:"The Syndicate are humanoids: Pick Pocket each one from Stealth before you attack." },

{ lv:"31", place:"Talents (N)", title:"Level 31: Blade Flurry", learn:["bladeflurry"],
  done:"Blade Flurry is on <kbd>Shift</kbd> + <kbd>5</kbd>.",
  todo:[
    "Talent: <b>Blade Flurry</b>. Put it on <kbd>Shift</kbd> + <kbd>5</kbd>.",
    "When two enemies fight you, press it: every hit also hits a second enemy."
  ] },

{ lv:"32", place:"Southshore, Hillsbrad", title:"Southshore", map:[["arathi",[20,30,"Gate in Thoradin's Wall (west)"]],["hillsbrad",[50,55,"Southshore"],[40,74,"Murloc beach"]]],
  done:"you're level 33 and have handed in <b>Down the Coast</b> and <b>Syndicate Assassins</b>.", stuck:"Fight the murlocs on the beach south of Southshore until you are.",
  todo:[
    "From Refuge Pointe, ride west through the gate in the huge wall (Thoradin's Wall) into Hillsbrad Foothills. Follow the road south to <b>Southshore</b>. Unlock the flight path.",
    "Take the town's quests. <b>Down the Coast</b> from Lieutenant Farren Orinelle (murlocs on the beach) and <b>Syndicate Assassins</b> from Marshal Redpath (in the Alterac Mountains, north) are quick XP.",
    "Talk to <b>Emissary Jacques</b> to start the new <b>City of Dalaran</b> dungeon (levels 28–35). Optional.",
    "Southshore also has a boat to Auberdine. Move on at about level 33."
  ],
  tip:"From here on, on PvP servers, Horde players can attack you. Stealth, Sprint and Vanish are your escape." },

/* ---------- 33–37: Stranglethorn Vale ---------- */
{ chapter:"Stranglethorn Vale", lv:"33–35", place:"Stranglethorn Vale (north)", title:"Stranglethorn: Rebel Camp and the hunters", map:[["stranglethorn",[38,3.5,"Rebel Camp"],[35.6,10.6,"Nesingwary's Expedition"],[44,10,"Kurzen's Compound"],[32,28,"Grom'gol (Horde camp)"]]],
  done:"you're level 35 and have handed in the first parts of <b>Tiger Mastery</b>, <b>Panther Mastery</b> and <b>Raptor Mastery</b>.", stuck:"Fight the tigers and panthers around Nesingwary's camp until you are.",
  todo:[
    "Fly to <b>Darkshire</b> and follow the road south out of Duskwood into <b>Stranglethorn Vale</b>, a big jungle. Right at the zone edge, turn west to the <b>Rebel Camp</b>.",
    "Lieutenant Doren's quests at the Rebel Camp send you against the Kurzen soldiers at their compound, east of the camp.",
    "Just south is <b>Nesingwary's Expedition</b>, a hunting camp. Take <b>Tiger Mastery</b>, <b>Panther Mastery</b> and <b>Raptor Mastery</b>: each sends you to hunt one kind of animal, and later parts send you after bigger ones.",
    "Pages of <b>The Green Hills of Stranglethorn</b> drop from almost everything here. Keep them: when you have a full chapter, hand it to Barnil Stonepot at Nesingwary's camp for XP."
  ],
  tip:"Grom'gol, on the west coast, is a Horde camp. Stay away from it." },

{ lv:"34", place:"Nearest rogue trainer", title:"Level 34: Blind", learn:["blind"],
  done:"Blind is on <kbd>Shift</kbd> + <kbd>0</kbd> and you have Blinding Powder.",
  todo:[
    "Learn <b>Blind</b> and put it on <kbd>Shift</kbd> + <kbd>0</kbd>. It needs <b>Blinding Powder</b>: learn it in Poisons and make some.",
    "Blind takes one enemy out of the fight for a while. Use it when a second enemy joins: Blind it, kill the first one, then deal with the blinded one."
  ] },

{ lv:"35–37", place:"Booty Bay, Stranglethorn", title:"Stranglethorn: Booty Bay", map:[["stranglethorn",[27,77,"Booty Bay"],[38,3.5,"Rebel Camp"],[35.6,10.6,"Nesingwary's Expedition"]]], learn:["stone4","food5"],
  done:"you're level 37 and have handed in <b>Singing Blue Shards</b>.", stuck:"Fight the pirates or raptors along the coast near Booty Bay until you are.",
  todo:[
    "Follow the main road all the way south to <b>Booty Bay</b>, a goblin port built into a cliff. Unlock the flight path and make the inn your home.",
    "Booty Bay is neutral: Horde players use it too, and the goblin guards attack anyone who starts a fight in town.",
    "Take <b>Singing Blue Shards</b> from Crank Fizzlebub (crystal-backed basilisks in the middle of the zone) and the pirate quests that start with <b>The Bloodsail Buccaneers</b> from First Mate Crazz.",
    "Keep doing the Nesingwary hunting quests as new parts open. Move on at level 37."
  ],
  tip:"Upgrade your supplies: <b>Solid Sharpening Stones</b> (auction house) and <b>Moon Harvest Pumpkins</b> (food vendors). Booty Bay also has a boat to Ratchet in Kalimdor." },

{ lv:"35–40", place:"Tirisfal Glades", title:"Dungeon: Scarlet Monastery (optional)", map:[["tirisfal",[83,33,"Scarlet Monastery"]]],
  done:"your group has finished the wings you wanted, or you've decided to skip it.",
  todo:[
    "Four short dungeon wings, run by crazed crusaders: <b>Graveyard</b> (around level 30), <b>Library</b> (around 33), <b>Armory</b> (around 36) and <b>Cathedral</b> (around 38).",
    "It's deep in Horde land, so don't walk there. Find a group with the Looking For Group tool and let the group summon you at the meeting stone outside.",
    "Collect the Alliance quests first: <b>Mythology of the Titans</b> (Librarian Mae Paledust, Hall of Explorers in Ironforge) and <b>In the Name of the Light</b> (Raleigh the Devout, Southshore inn).",
    "Skip it if you'd rather keep questing."
  ],
  tip:"Inside, stay behind the tank and hit the same enemy. Feint when an enemy turns to you." },

{ lv:"36", place:"Nearest rogue trainer", title:"Level 36: Instant Poison III", map:[["stormwind",[75.8,59.8,"SI:7 (rogue trainers)"]]], learn:["ipois3"],
  done:"Instant Poison III is on your main hand.",
  todo:[
    "Fly to a rogue trainer and learn new ranks and <b>Instant Poison III</b>.",
    "Make Instant Poison III in the Poisons window and put it on your main-hand weapon.",
    "Use your Hearthstone to get back to Booty Bay."
  ] },

/* ---------- 37–44: Riverglades ---------- */
{ chapter:"Riverglades", lv:"37", place:"Redridge → Riverglades", title:"Travel to the Riverglades", map:[["redridge",[30.6,59.4,"Lakeshire flight path"]],["riverglades"]],
  done:"Farholde Keep is your home (hover over your Hearthstone to check) and you've unlocked its flight path.",
  todo:[
    "Fly to <b>Lakeshire</b> in Redridge Mountains. No flight path there yet? Fly to Darkshire and ride north-east into Redridge.",
    "From Lakeshire, follow the road north toward the Burning Steppes. Near the edge of the map, a signpost at a crossroads points to the Riverglades: take the right-hand path into the hills.",
    "Follow that road south to <b>Farholde Keep</b>, the Alliance town in the Riverglades (a new zone in WoW Forever).",
    "Unlock the flight path (Gretchen Mayberry) and make the inn your home. From now on you can fly straight between Farholde Keep and Lakeshire."
  ] },

{ lv:"37–40", place:"Farholde Keep, Riverglades", title:"Riverglades: around Farholde Keep", map:[["riverglades"]],
  done:"you're level 40.", stuck:"Fight the enemies near your current quests in the south of the zone until you are.",
  todo:[
    "Take every quest in Farholde Keep. Many come from <b>Demar Brant</b>, the knight in charge, and the people around him. There are over 70 Alliance quests in this zone.",
    "Riverglades quests come in waves: when you finish a batch, new ones usually appear back in Farholde Keep. Check the town after every few turn-ins.",
    "Start with the farms and lookouts close to the keep. The enemies get tougher the further north you go.",
    "The Horde quests here too (their town is Rog'mar). On PvP servers, keep your escape buttons ready. Move on at level 40."
  ],
  tip:"There's no Riverglades map on this site yet. Use your in-game map (<kbd>M</kbd>): Farholde Keep is in the south of the zone." },

{ lv:"38", place:"Nearest rogue trainer", title:"Level 38: Deadly Poison II", map:[["stormwind",[75.8,59.8,"SI:7 (rogue trainers)"]]], learn:["opois3"],
  done:"Deadly Poison II is on your off hand.",
  todo:[
    "Fly to a rogue trainer (Lakeshire flies to Stormwind) and learn new ranks and <b>Deadly Poison II</b>.",
    "Make it and put it on your off-hand weapon.",
    "Start saving gold now: your mount costs a lot at level 40."
  ] },

{ lv:"40", place:"Trainer + Darnassus", title:"Level 40: your mount!", map:[["darnassus",[38.5,16.7,"Lelanai (nightsaber vendor)"]]], learn:["mount","adrenaline"],
  done:"you're riding your nightsaber and Adrenaline Rush is on <kbd>Shift</kbd> + <kbd>6</kbd>.",
  todo:[
    "Learn riding and buy a <b>nightsaber</b> (night elf mount) in Darnassus. Darnassus reputation makes it cheaper.",
    "Learn <b>Safe Fall</b> and new ranks at the trainer.",
    "Talent: <b>Adrenaline Rush</b>. Put it on <kbd>Shift</kbd> + <kbd>6</kbd>. Your energy fills twice as fast for a short time. Use it for hard fights."
  ],
  tip:"At level 40 you can also unlock a second talent setup (Dual Specialization) at a trainer in a big city." },

{ lv:"40–43", place:"Riverglades (north)", title:"Riverglades: Sunnyglade and the north", map:[["riverglades"]],
  done:"you're level 43 and have handed in <b>Saving Sunnyglade</b>.", stuck:"Fight the enemies around Sunnyglade until you are.",
  todo:[
    "Fly back to Farholde Keep. Demar Brant's <b>Saving Sunnyglade</b> sends you north to the village of <b>Sunnyglade</b>.",
    "Keep turning in and picking up: the later quests send you further north, toward <b>Twilight's Shroud</b>.",
    "Pick up the quests for the dungeon <b>Krol'dok Stronghold</b> (next step) as they appear.",
    "<b>Powderfuse Port</b>, a neutral goblin port on the east coast, has a bank, an auction house and the boat to Tanaris. Move on at about level 43."
  ] },

{ lv:"41–45", place:"Riverglades", title:"Dungeon: Krol'dok Stronghold (optional)", map:[["riverglades"]],
  done:"your group has beaten the last boss, or you've decided to skip it.",
  todo:[
    "A new 5-player dungeon for levels 40–45, with six bosses. The entrance is in the hills north of Sunnyglade (with TomTom: <kbd>/way 37.5 37.5</kbd>).",
    "Its quests are a chain of about ten that starts in Farholde Keep. Do the parts you can do alone first.",
    "Find a group with the Looking For Group tool or ask in chat (\"LFG Krol'dok\")."
  ],
  tip:"Most dungeon XP in Forever comes from quests, so collect them before you go in." },

/* ---------- 43–50: Tanaris, Feralas, Hinterlands ---------- */
{ chapter:"Tanaris & Feralas", lv:"43", place:"Riverglades → Tanaris", title:"Travel to Tanaris", map:[["tanaris",[67.5,23,"Steamwheedle Port (boat)"],[51,28,"Gadgetzan"]]],
  done:"Gadgetzan is your home and you've unlocked its flight path.",
  todo:[
    "Ride to <b>Powderfuse Port</b> on the Riverglades' east coast and take the boat to <b>Steamwheedle Port</b> in Tanaris, a desert in Kalimdor.",
    "Follow the road west to <b>Gadgetzan</b>, the goblin town. Unlock the flight path and make the inn your home.",
    "Gadgetzan is neutral: its guards attack anyone who starts a fight in town."
  ] },

{ lv:"43–46", place:"Gadgetzan, Tanaris", title:"Tanaris", map:[["tanaris",[51,28,"Gadgetzan"],[63,30,"Wastewander bandit camps"],[35,45,"Noxious Lair (giant insects)"],[72,46,"Lost Rigger Cove (pirates)"],[39,20,"Zul'Farrak"]]],
  done:"you're level 46 and have handed in <b>Wastewander Justice</b> and <b>Water Pouch Bounty</b>.", stuck:"Fight the Wastewander bandits east of Gadgetzan until you are.",
  todo:[
    "Take every quest in Gadgetzan. <b>Wastewander Justice</b> and <b>Water Pouch Bounty</b> send you to the bandit camps east of town.",
    "<b>Noxious Lair Investigation</b> from Alchemist Pestlezugg: giant insects at the Noxious Lair, south-west of town.",
    "Steamwheedle Port has pirate quests (<b>Southsea Shakedown</b>, <b>Pirate Hats Ahoy!</b>) for the pirates at <b>Lost Rigger Cove</b> on the east coast.",
    "Gadgetzan also has quests for <b>Zul'Farrak</b>, the dungeon in the north-west. Move on at about level 46."
  ],
  tip:"Bandits and pirates are humanoids: Pick Pocket them for extra gold. Bandits run away at low health, so finish them with Kidney Shot or Throw." },

{ lv:"44", place:"Nearest rogue trainer", title:"Level 44: Instant Poison IV", map:[["darnassus",[37,22,"Rogue trainers (Cenarion Enclave)"]],["stormwind",[75.8,59.8,"SI:7 (rogue trainers)"]]], learn:["ipois4"],
  done:"Instant Poison IV is on your main hand.",
  todo:[
    "Learn new ranks and <b>Instant Poison IV</b>. While you're in Kalimdor, Darnassus is the closest trainer.",
    "Make it and put it on your main-hand weapon. Hearth back to Gadgetzan."
  ] },

{ lv:"44–48", place:"Tanaris", title:"Dungeon: Zul'Farrak (optional)", map:[["tanaris",[39,20,"Zul'Farrak"],[51,28,"Gadgetzan"]]],
  done:"your group has finished, or you've decided to skip it.",
  todo:[
    "A troll city in the north-west of Tanaris, for levels 44–48. Lots of quests from Gadgetzan.",
    "Good ones: <b>Divino-matic Rod</b> (Chief Engineer Bilgewhizzle) and <b>Troll Temper</b> (Trenton Lighthammer).",
    "Find a group with the Looking For Group tool or ask in chat (\"LFG ZF\")."
  ] },

{ lv:"46", place:"Tanaris → Feralas", title:"Travel to Feralas", map:[["needles",[78,77,"Shimmering Flats"]],["feralas",[89.5,46,"Thalanaar"],[43.5,43,"Ferry dock to Feathermoon"],[30.5,43.5,"Feathermoon Stronghold"]]],
  done:"Feathermoon Stronghold is your home and you've unlocked the Thalanaar and Feathermoon flight paths.",
  todo:[
    "From Gadgetzan, ride north into <b>Thousand Needles</b>. Cross the white salt flats and keep heading west along the canyon road. (Freewind Post, up on the cliffs, is Horde.)",
    "The road leads to <b>Thalanaar</b>, a night elf outpost at the east edge of Feralas. Unlock its flight path.",
    "Ride west through the jungle to the coast. <b>Feathermoon Stronghold</b> is on an island: take the ferry from the small dock on the shore.",
    "Unlock the Feathermoon flight path and make the inn your home."
  ] },

{ lv:"46", place:"Nearest rogue trainer", title:"Level 46: Deadly Poison III", map:[["darnassus",[37,22,"Rogue trainers (Cenarion Enclave)"]]], learn:["opois4","stone5","food6"],
  done:"Deadly Poison III is on your off hand.",
  todo:[
    "Feathermoon flies to Rut'theran Village, next to Darnassus. Learn new ranks and <b>Deadly Poison III</b>.",
    "Upgrade your supplies: <b>Dense Sharpening Stones</b> (auction house) and <b>Deep Fried Plantains</b> (food vendors)."
  ] },

{ lv:"46–48", place:"Feathermoon, Feralas", title:"Feralas", map:[["feralas",[30.5,43.5,"Feathermoon Stronghold"],[43.5,43,"Ferry dock"],[59,44,"Dire Maul (for later)"]]],
  done:"you're level 48 and have handed in <b>Zapped Giants</b> and <b>The Mark of Quality</b>.", stuck:"Fight the yetis in the hills or the giants on the coast until you are.",
  todo:[
    "Take every quest in Feathermoon Stronghold, like <b>The Mark of Quality</b> from Pratt McGrubben (yeti hides) and the <b>Rise of the Silithid</b> chain.",
    "Near the ferry dock, <b>Zorbin Fandazzle</b> gives <b>Zapped Giants</b>: use his gadget on the giants that walk along the coast.",
    "<b>Dire Maul</b>, the ruined city in the middle of Feralas, is a dungeon for levels 55–60. Come back much later.",
    "Move on at about level 48."
  ] },

{ lv:"47–50", place:"Aerie Peak, Hinterlands", title:"The Hinterlands", map:[["hinterlands",[14,46,"Aerie Peak"],[55,42,"Skulk Rock (oozes)"],[63,73,"Jintha'Alor (trolls)"]]],
  done:"you're level 50 and have handed in <b>Skulk Rock Clean-up</b> and <b>Troll Necklace Bounty</b>.", stuck:"Fight Witherbark trolls (their necklaces count for the bounty) until you are.",
  todo:[
    "Back to the Eastern Kingdoms: take the boat from Auberdine or Rut'theran, fly to <b>Southshore</b>, then ride north-east into <b>The Hinterlands</b>. <b>Aerie Peak</b>, the Wildhammer dwarf town, is right at the entrance.",
    "Unlock the flight path and make the inn your home.",
    "Take every quest: <b>Skulk Rock Clean-up</b> (oozes at Skulk Rock), <b>Troll Necklace Bounty</b> (necklaces from any Witherbark troll) and Gryphon Master Talonaxe's chain, starting with <b>Witherbark Cages</b>.",
    "Run out of quests? <b>Searing Gorge</b> (town: Thorium Point) is another zone for this level. Move on at level 50."
  ],
  tip:"WoW Forever adds a new dungeon for these levels: <b>Alcaz Prison</b> (about 48–53). Look for it in the Looking For Group tool." },

/* ---------- 49–60 ---------- */
{ chapter:"Un'Goro to 60", lv:"49–52", place:"Marshal's Refuge, Un'Goro", title:"Un'Goro Crater", map:[["ungoro",[43.5,8.5,"Marshal's Refuge"],[50,48,"Fire Plume Ridge (volcano)"],[70,75,"Entrance from Tanaris"]]],
  done:"you're level 52 and have handed in <b>Crystals of Power</b> and <b>Chasing A-Me 01</b>.", stuck:"Fight the raptors and stegodons near Marshal's Refuge until you are.",
  todo:[
    "Fly to Gadgetzan and ride west out of Tanaris. The road goes down a long ramp into <b>Un'Goro Crater</b>, a jungle full of dinosaurs.",
    "Follow the crater's edge north to <b>Marshal's Refuge</b>, a camp under the northern cliffs. Unlock the flight path.",
    "Take every quest. <b>Crystals of Power</b> from J.D. Collie: grab the red, green, blue and yellow crystals lying around the whole crater. Karna Remtravel's <b>Chasing A-Me 01</b> sends you to walk a lost robot home.",
    "Watch out for <b>Devilsaurs</b>: huge dinosaurs that walk around and hit very hard. Stay out of their way. Move on at level 52."
  ],
  tip:"Devilsaurs can't see you in Stealth. If one comes your way, Stealth and step aside." },

{ lv:"50", place:"Talents (N)", title:"Level 50: Assassination talents",
  done:"your new point is in <b>Malice</b>.",
  todo:[
    "From now on your talent points go into the <b>Assassination</b> tab, starting with <b>Malice</b> (more critical hits).",
    "The Talents tab shows the order to the end. At 60 you've spent all 51 points."
  ] },

{ lv:"52", place:"Nearest rogue trainer", title:"Level 52: Instant Poison V", map:[["darnassus",[37,22,"Rogue trainers (Cenarion Enclave)"]]], learn:["ipois5"],
  done:"Instant Poison V is on your main hand.",
  todo:[
    "Learn new ranks and <b>Instant Poison V</b>. Put it on your main-hand weapon."
  ] },

{ lv:"52–54", place:"Felwood", title:"Felwood", map:[["felwood",[51,82,"Emerald Sanctuary"],[37,60,"Jaedenar (Shadow Council)"],[62.5,24.5,"Talonbranch Glade"],[64.5,8,"Timbermaw Hold (tunnel to Winterspring)"]]],
  done:"you're level 54 and have handed in <b>Forces of Jaedenar</b> and <b>Deadwood of the North</b>.", stuck:"Fight Deadwood furbolgs in northern Felwood until you are. It also makes the Timbermaw like you.",
  todo:[
    "Fly to <b>Astranaar</b> in Ashenvale and follow the road north into <b>Felwood</b>, a forest poisoned by demons.",
    "In the south, stop at the <b>Emerald Sanctuary</b> camp. <b>Forces of Jaedenar</b> from Greta Mosshoof sends you after the demon worshippers at Jaedenar, west of the road.",
    "Follow the road north to <b>Talonbranch Glade</b>. Unlock the flight path and take its quests.",
    "Near the north end, Nafien gives <b>Deadwood of the North</b>: killing the Deadwood furbolgs makes the Timbermaw furbolgs like you, so they let you walk through their tunnel to Winterspring later. Move on at level 54."
  ] },

{ lv:"54", place:"Nearest rogue trainer", title:"Level 54: Deadly Poison IV", map:[["darnassus",[37,22,"Rogue trainers (Cenarion Enclave)"]]], learn:["opois5"],
  done:"Deadly Poison IV is on your off hand.",
  todo:[
    "Learn new ranks and <b>Deadly Poison IV</b>. Put it on your off-hand weapon."
  ] },

{ lv:"54–56", place:"Morgan's Vigil, Burning Steppes", title:"Burning Steppes", map:[["burning",[84,68,"Morgan's Vigil"],[65,24,"Flame Crest (black dragons)"],[28,36,"Blackrock Mountain"]]],
  done:"you're level 56 and have handed in <b>Dragonkin Menace</b>.", stuck:"Fight the Blackrock orcs around the zone until you are.",
  todo:[
    "Fly to Lakeshire and ride north into <b>Burning Steppes</b>, a scorched land of orcs and dragons. <b>Morgan's Vigil</b>, the Alliance camp, is just over the border. Unlock the flight path.",
    "Take every quest. <b>Dragonkin Menace</b> from Helendis Riverhorn (black dragonkin in the north) starts a very long chain that matters much later at 60.",
    "The Blackrock orcs all over the zone are targets for several quests.",
    "<b>Blackrock Depths</b>, a huge dungeon inside Blackrock Mountain (west), is great from 52 to 60. Go with a group. Move on at level 56."
  ],
  tip:"WoW Forever adds new dungeons for these levels too: <b>Blackmaw Hold</b> (55–60) and <b>Shaper's Terrace</b> (58–60). Look for them in the Looking For Group tool." },

{ lv:"55–57", place:"Chillwind Camp, Western Plaguelands", title:"Western Plaguelands", map:[["wpl",[43,84,"Chillwind Camp"],[37,57,"Felstone Field"],[46,52,"Dalson's Tears"],[53,66,"Writhing Haunt"],[62,58,"Gahrron's Withering"],[43,70,"Andorhal"]]],
  done:"you're level 57 and all four cauldrons are done.", stuck:"Fight the undead around Andorhal until you are.",
  todo:[
    "Fly to Southshore and ride north through the Alterac Mountains into <b>Western Plaguelands</b>. <b>Chillwind Camp</b> is just inside, in the south. Unlock the flight path.",
    "<b>The Scourge Cauldrons</b> chain: undead lords guard four cauldrons that poison the land, at Felstone Field, Dalson's Tears, the Writhing Haunt and Gahrron's Withering. Kill each lord and use his key on his cauldron.",
    "<b>Andorhal</b>, the ruined city in the middle, has more undead quests.",
    "Move on at level 57."
  ],
  tip:"Undead can't be Sapped or Pick Pocketed. Use Gouge or Blind on a second enemy instead." },

{ lv:"56–58", place:"Light's Hope, Eastern Plaguelands", title:"Eastern Plaguelands", map:[["epl",[81.5,59,"Light's Hope Chapel"],[36,90,"Darrowshire"],[7,43,"Tirion Fordring's house"],[27,11,"Stratholme"]]],
  done:"you're level 58.", stuck:"Fight the undead near Light's Hope Chapel until you are.",
  todo:[
    "Ride east into <b>Eastern Plaguelands</b> and follow the road to <b>Light's Hope Chapel</b> on the far east side. Unlock the flight path.",
    "The <b>Argent Dawn</b> at Light's Hope fight the undead. Their quests give good XP and reputation.",
    "In the ruined village of <b>Darrowshire</b> (south-west), talk to the little ghost girl <b>Pamela Redpath</b>. Her quests tell one of the saddest stories in WoW.",
    "In a small house by the river in the far west, <b>Tirion Fordring</b> starts the famous <b>Redemption</b> chain. Move on at level 58."
  ] },

{ lv:"58–60", place:"Everlook, Winterspring", title:"Winterspring", map:[["felwood",[64.5,8,"Timbermaw Hold (tunnel)"]],["winterspring",[61,38.5,"Everlook"],[31,45,"Donova Snowden (hot springs)"],[67,36,"Winterfall Village (furbolgs)"]]],
  done:"you're level 60!", stuck:"Fight Winterfall furbolgs, or run Blackrock Depths with a group, until you are.",
  todo:[
    "Fly to Talonbranch Glade in Felwood and walk north through the <b>Timbermaw Hold</b> tunnel. It comes out in <b>Winterspring</b>, a snowy valley.",
    "At the hot springs, talk to <b>Donova Snowden</b>: her quests are about the Winterfall furbolgs.",
    "Follow the road east to <b>Everlook</b>, a goblin town. Unlock the flight path, make it your home and take every quest, like <b>Are We There, Yeti?</b> from Legacki.",
    "For the last bars of XP, run end-game dungeons with groups: Blackrock Depths, Lower Blackrock Spire, Dire Maul, Stratholme and Scholomance."
  ] },

{ lv:"60", place:"Nearest rogue trainer", title:"Level 60: Instant Poison VI", map:[["darnassus",[37,22,"Rogue trainers (Cenarion Enclave)"]]], learn:["ipois6"],
  done:"Instant Poison VI is on your main hand and all 51 talent points are spent.",
  todo:[
    "Learn the last ranks and <b>Instant Poison VI</b>.",
    "Spend your last talent point. That's all 51."
  ] },

{ lv:"60", place:"Mount Hyjal", title:"You made it to 60!", map:[["hyjal"]],
  todo:[
    "Visit <b>Mount Hyjal</b>, a new level 60 zone reached through Winterspring.",
    "From here on, it's about gear, dungeons and raids. Congratulations!"
  ] }
];

/* Talent points: which talent to click at each level. */
const TALENTS = [
  ["10–12", "Improved Eviscerate", "Click it 3 times (once per level)", "Eviscerate hits harder."],
  ["13–14", "Lightning Reflexes", "2 times", "You dodge more attacks."],
  ["15–17", "Precision", "3 times", "You miss less often, with poisons too."],
  ["18–20", "Deflection", "3 times", "You parry more attacks."],
  ["21", "Riposte", "Once", "A free counter-attack after you parry. Press it when it lights up."],
  ["22–23", "Endurance", "2 times", "Sprint and Evasion come back sooner."],
  ["24", "Improved Sprint", "Once", ""],
  ["25", "Flawless Execution", "Once", "Eviscerate costs 10 less energy."],
  ["26–27", "Weapon Expertise", "2 times", "Enemies dodge and parry you less often."],
  ["28–30", "Aggression", "3 times", "Sinister Strike and Eviscerate hit harder."],
  ["31", "Blade Flurry", "Once", "Your hits also hit a second enemy for a while."],
  ["32–36", "Hack and Slash", "5 times", "A bonus for whatever weapon you hold: swords, axes, maces, fists or daggers."],
  ["37–38", "Dual Wield Specialization", "2 times", "Your off-hand weapon hits harder."],
  ["39", "Composure", "Once", ""],
  ["40", "Adrenaline Rush", "Once", "Energy fills twice as fast for a short time. Your big button."],
  ["41", "Composure", "Once more (2 of 2)", ""],
  ["42–46", "Flash of Steel", "5 times", ""],
  ["47–49", "Lightning Reflexes", "3 more times (5 of 5)", ""],
  ["50–54", "Malice (Assassination tab)", "5 times", "Switch to the Assassination tab now. More critical hits."],
  ["55–57", "Ruthlessness", "3 times", "Finishers sometimes give a free combo point."],
  ["58–60", "Improved Slice and Dice", "3 times", "Slice and Dice lasts longer. That's all 51 points."]
];

/* Words a new player won't know. Matching is case-insensitive. */
const WORDS = {
  "buff": "A good effect on you, like Slice and Dice. Its icon shows at the top right of your screen.",
  "elite": "A much stronger enemy. Its portrait has a golden dragon border. Skip these alone.",
  "dungeon": "A private area for a group of 5 players, with bosses and better loot.",
  "flight path": "Talk to a flight master (the person with a hippogryph or gryphon) once to unlock that place. Then you can fly between any places you've unlocked.",
  "hearthstone": "A stone in your bag that teleports you to the inn you set as home. Usable once an hour.",
  "rested xp": "Bonus XP you build up while logged out in an inn or city. Your XP bar turns blue while you have it.",
  "talent": "One point per level from 10. You spend it in the talent window (N) to make yourself stronger.",
  "trainer": "An NPC who teaches you new abilities for gold. Rogues need one every 2 levels.",
  "tank": "The group member (often a warrior) whose job is to make enemies attack them, not you.",
  "energy": "The yellow bar under your health. Rogue attacks cost energy instead of mana. It fills up by itself in a few seconds.",
  "combo points": "Small dots on the enemy's portrait. Sinister Strike and other attacks add them, up to 5. Finishers like Eviscerate use them all: more points, bigger effect.",
  "finisher": "An attack that uses up your combo points, like Eviscerate, Slice and Dice or Kidney Shot.",
  "opener": "An attack you can only use from Stealth, like Cheap Shot or Garrote. It starts the fight on your terms.",
  "stealth": "Makes you almost invisible. Enemies only notice you when you get very close. Attacking breaks it.",
  "poison": "Rogue-only. You make poisons and put them on your weapons, so your hits do extra damage.",
  "stun": "The enemy can't move or attack for a few seconds. Gouge, Cheap Shot and Kidney Shot stun.",
  "pull": "Starting a fight with an enemy, for example by hitting it or throwing a knife at it.",
  "cooldown": "Waiting time before you can use an ability again. The button shows a clock-style sweep.",
  "elites": "Much stronger enemies with a golden dragon border on their portrait. Skip them alone.",
  "legacy": "A Forever system: you earn points across your whole account and spend them on bonuses. Press Y.",
  "auction house": "Where players buy and sell items. Every big city has one.",
  "pvp": "Fighting other players. On PvP servers, the other faction can attack you in some zones."
};

/* ---------------------------------------------------------
   PART 2 — PAGE BEHAVIOUR
   --------------------------------------------------------- */

const ZONES = {
  teldrassil: { name: "Teldrassil", id: 141 },    darnassus: { name: "Darnassus", id: 1657 },
  darkshore: { name: "Darkshore", id: 148 },      ashenvale: { name: "Ashenvale", id: 331 },
  stormwind: { name: "Stormwind", id: 1519 },     westfall: { name: "Westfall", id: 40 },
  wetlands: { name: "Wetlands", id: 11 },         redridge: { name: "Redridge Mountains", id: 44 },
  duskwood: { name: "Duskwood", id: 10 },         hillsbrad: { name: "Hillsbrad Foothills", id: 267 },
  arathi: { name: "Arathi Highlands", id: 45 },   stranglethorn: { name: "Stranglethorn Vale", id: 33 },
  tirisfal: { name: "Tirisfal Glades", id: 85 },    needles: { name: "Thousand Needles", id: 400 },
  tanaris: { name: "Tanaris", id: 440 },
  feralas: { name: "Feralas", id: 357 },          hinterlands: { name: "The Hinterlands", id: 47 },
  searing: { name: "Searing Gorge", id: 51 },     ungoro: { name: "Un'Goro Crater", id: 490 },
  felwood: { name: "Felwood", id: 361 },          burning: { name: "Burning Steppes", id: 46 },
  wpl: { name: "Western Plaguelands", id: 28 },   epl: { name: "Eastern Plaguelands", id: 139 },
  winterspring: { name: "Winterspring", id: 618 },
  riverglades: { name: "Riverglades", id: null, none: "Riverglades is new in WoW: Forever, so there's no map of it here yet. Follow the directions above." },
  hyjal: { name: "Mount Hyjal", id: "hyjal" }
};

/* ---------- abilities ---------- */
/* school: phys / poison / shadow / racial / item  */
const SPELLBOOK = {
  sinister:     { name:"Sinister Strike", lv:1, school:"phys", icon:"blade", text:"Your main attack all the way to 60. Adds 1 combo point." },
  eviscerate:   { name:"Eviscerate", lv:1, school:"phys", icon:"burst", text:"Finisher. Uses all your combo points for one big hit. Best at 3 to 5 points." },
  slicedice:    { name:"Slice and Dice", lv:10, school:"phys", icon:"clock", text:"Finisher. You attack faster for a while. Keep it running all fight." },
  gouge:        { name:"Gouge", lv:6, school:"phys", icon:"slash", text:"Stuns the enemy for a few seconds. Any hit wakes it up. Use it to get behind it, or to get away." },
  kick:         { name:"Kick", lv:12, school:"phys", icon:"slash", text:"Stops an enemy's spell while they're casting it." },
  throw:        { name:"Throw", lv:1, school:"phys", icon:"arrow", text:"Throws your throwing weapon. Use it to pull one enemy from a group, or to hit a runner." },
  sprint:       { name:"Sprint", lv:10, school:"phys", icon:"feather", text:"Run much faster for a few seconds. Your escape button, together with Vanish." },
  evasion:      { name:"Evasion", lv:8, school:"phys", icon:"shield", text:"You dodge most attacks for a while. Press it when two enemies attack you." },
  vanish:       { name:"Vanish", lv:22, school:"shadow", icon:"swirl", text:"You disappear into Stealth and enemies forget you. Uses a Flash Powder. Press it when a fight goes wrong." },
  eluneslight:  { name:"Elune's Light", lv:1, school:"racial", icon:"star", text:"Night elf racial, new in WoW Forever. For a short time you get more critical strikes. Use it for hard fights." },
  riposte:      { name:"Riposte", lv:21, school:"phys", icon:"blade", talent:true, text:"Lights up after you parry. Press it for a free hit that disarms the enemy." },
  stealth:      { name:"Stealth", lv:1, school:"shadow", icon:"eye", text:"Makes you almost invisible. You move slower. Any attack breaks it. Start most fights from it." },

  cheapshot:    { name:"Cheap Shot", lv:26, school:"phys", icon:"burst", text:"Opener from Stealth. Stuns the enemy for a few seconds and gives 2 combo points." },
  backstab:     { name:"Backstab", lv:4, school:"phys", icon:"blade", text:"Big hit from behind. Needs a dagger in your main hand. Great from Stealth, or after Gouge." },
  garrote:      { name:"Garrote", lv:14, school:"phys", icon:"chain", text:"Opener from Stealth, behind the enemy. Makes it bleed for a while." },
  kidney:       { name:"Kidney Shot", lv:30, school:"phys", icon:"burst", text:"Finisher that stuns. More combo points, longer stun." },
  bladeflurry:  { name:"Blade Flurry", lv:31, school:"phys", icon:"blade", talent:true, text:"For a while every hit also hits a second enemy. For fights against two." },
  adrenaline:   { name:"Adrenaline Rush", lv:40, school:"phys", icon:"bulb", talent:true, text:"Energy fills twice as fast for a short time. Your big button for hard fights." },
  shadowmeld:   { name:"Shadowmeld", lv:1, school:"racial", icon:"eye", text:"Night elf racial. Hide in the shadows as long as you stand still. Works even in a fight to drop out of it." },
  feint:        { name:"Feint", lv:16, school:"phys", icon:"arrow", text:"Makes enemies less angry at you. Twice as strong in WoW Forever. For dungeons." },
  exposearmor:  { name:"Expose Armor", lv:14, school:"phys", icon:"shield", text:"Finisher. The enemy takes more physical damage. Only worth it on bosses." },
  blind:        { name:"Blind", lv:34, school:"shadow", icon:"eye", text:"Takes one enemy out of the fight for a while. Uses a Blinding Powder." },
  shank:        { name:"Shank", lv:24, school:"phys", icon:"blade", text:"New rogue attack in WoW Forever. Use it between Sinister Strikes when it's ready." },
  sap:          { name:"Sap", lv:10, school:"phys", icon:"chain", text:"From Stealth, puts a humanoid to sleep for a while. In WoW Forever it doesn't break your Stealth." },

  ipois1: { name:"Instant Poison", lv:20, school:"poison", icon:"drop", text:"Main-hand poison. Extra Nature damage on some hits. Made with Poisons." },
  ipois2: { name:"Instant Poison II", lv:28, school:"poison", icon:"drop", text:"Better Instant Poison for your main hand." },
  ipois3: { name:"Instant Poison III", lv:36, school:"poison", icon:"drop", text:"Better Instant Poison for your main hand." },
  ipois4: { name:"Instant Poison IV", lv:44, school:"poison", icon:"drop", text:"Better Instant Poison for your main hand." },
  ipois5: { name:"Instant Poison V", lv:52, school:"poison", icon:"drop", text:"Better Instant Poison for your main hand." },
  ipois6: { name:"Instant Poison VI", lv:60, school:"poison", icon:"drop", text:"Best Instant Poison for your main hand." },
  opois1: { name:"Crippling Poison", lv:20, school:"poison", icon:"drop", text:"Off-hand poison until 30. Slows the enemy, so it can't run away." },
  opois2: { name:"Deadly Poison", lv:30, school:"poison", icon:"drop", text:"Off-hand poison from 30. Extra damage over time that stacks." },
  opois3: { name:"Deadly Poison II", lv:38, school:"poison", icon:"drop", text:"Better Deadly Poison for your off hand." },
  opois4: { name:"Deadly Poison III", lv:46, school:"poison", icon:"drop", text:"Better Deadly Poison for your off hand." },
  opois5: { name:"Deadly Poison IV", lv:54, school:"poison", icon:"drop", text:"Best Deadly Poison for your off hand." },
  poisons:      { name:"Poisons", lv:20, school:"poison", icon:"scroll", text:"Opens the Poisons window, where you make your poisons. Learned from the level 20 rogue quest." },
  stone1: { name:"Rough Sharpening Stone", lv:10, school:"item", icon:"gem", text:"Rub it on a sword, axe or dagger for extra damage. Works together with poisons in WoW Forever. Made by blacksmiths: auction house." },
  stone2: { name:"Coarse Sharpening Stone", lv:15, school:"item", icon:"gem", text:"Better sharpening stone." },
  stone3: { name:"Heavy Sharpening Stone", lv:25, school:"item", icon:"gem", text:"Better sharpening stone." },
  stone4: { name:"Solid Sharpening Stone", lv:35, school:"item", icon:"gem", text:"Better sharpening stone." },
  stone5: { name:"Dense Sharpening Stone", lv:45, school:"item", icon:"gem", text:"Best sharpening stone." },
  pickpocket:   { name:"Pick Pocket", lv:4, school:"shadow", icon:"cube", text:"From Stealth, steals money and small items from a humanoid. Do it before every humanoid fight." },
  picklock:     { name:"Pick Lock", lv:16, school:"phys", icon:"gear", text:"Opens locked boxes and some locked doors. Click it, then the box in your bags." },
  detecttraps:  { name:"Detect Traps", lv:24, school:"phys", icon:"eye", text:"Shows traps near you." },
  disarmtrap:   { name:"Disarm Trap", lv:30, school:"phys", icon:"gear", text:"Removes a trap so nobody steps on it." },
  firstaid:     { name:"First Aid", lv:10, school:"item", icon:"cross", text:"Opens First Aid, where you make bandages from cloth. Learn it in Darnassus." },
  hearth:       { name:"Hearthstone", lv:1, school:"item", icon:"house", text:"Takes you to the inn you set as home. 1 hour cooldown." },
  mount:        { name:"Striped Nightsaber", lv:40, school:"item", icon:"horse", text:"Your night elf mount. Buy it from Lelanai in Darnassus." },

  bandage1: { name:"Linen Bandage", lv:10, school:"item", icon:"cross", text:"Heals you over a few seconds. Made with First Aid from Linen Cloth. Needs First Aid 1." },
  bandage2: { name:"Heavy Linen Bandage", lv:14, school:"item", icon:"cross", text:"Better bandage. Needs First Aid 40." },
  bandage3: { name:"Wool Bandage", lv:20, school:"item", icon:"cross", text:"Better bandage, from Wool Cloth. Needs First Aid 80." },
  bandage4: { name:"Heavy Wool Bandage", lv:24, school:"item", icon:"cross", text:"Better bandage. Needs First Aid 115." },
  bandage5: { name:"Silk Bandage", lv:28, school:"item", icon:"cross", text:"Better bandage, from Silk Cloth. Needs First Aid 150." },
  bandage6: { name:"Heavy Silk Bandage", lv:32, school:"item", icon:"cross", text:"Better bandage. Needs First Aid 180." },
  bandage7: { name:"Mageweave Bandage", lv:36, school:"item", icon:"cross", text:"Better bandage, from Mageweave Cloth. Needs First Aid 210." },
  bandage8: { name:"Heavy Mageweave Bandage", lv:40, school:"item", icon:"cross", text:"Better bandage. Needs First Aid 240." },
  bandage9: { name:"Runecloth Bandage", lv:46, school:"item", icon:"cross", text:"Better bandage, from Runecloth. Needs First Aid 260." },
  bandage10:{ name:"Heavy Runecloth Bandage", lv:52, school:"item", icon:"cross", text:"Best bandage. Needs First Aid 290." },
  food1: { name:"Shiny Red Apple", lv:1, school:"item", icon:"bread", text:"Eat it after a fight to refill health. Sold by food vendors." },
  food2: { name:"Tel'Abim Banana", lv:5, school:"item", icon:"bread", text:"Better food from a food vendor." },
  food3: { name:"Snapvine Watermelon", lv:15, school:"item", icon:"bread", text:"Better food from a food vendor." },
  food4: { name:"Goldenbark Apple", lv:25, school:"item", icon:"bread", text:"Better food from a food vendor." },
  food5: { name:"Moon Harvest Pumpkin", lv:35, school:"item", icon:"bread", text:"Better food from a food vendor." },
  food6: { name:"Deep Fried Plantains", lv:45, school:"item", icon:"bread", text:"Better food from a food vendor." },
  food7: { name:"Homemade Cherry Pie", lv:55, school:"item", icon:"bread", text:"Best vendor food. Sold by bakers." }
};


/* ---------- real WoW icons (loaded from Wowhead's icon server) ----------
   If you're offline the simple drawings above are shown instead. */
const ICONS = {
  sinister:"spell_shadow_ritualofsacrifice", eviscerate:"ability_rogue_eviscerate", slicedice:"ability_rogue_slicedice",
  gouge:"ability_gouge", kick:"ability_kick", throw:"ability_throw", sprint:"ability_rogue_sprint",
  evasion:"spell_shadow_shadowward", vanish:"ability_vanish", eluneslight:"spell_holy_elunesgrace",
  riposte:"ability_warrior_challange", stealth:"ability_stealth", cheapshot:"ability_cheapshot",
  backstab:"ability_backstab", garrote:"ability_rogue_garrote", kidney:"ability_rogue_kidneyshot",
  bladeflurry:"ability_warrior_punishingblow", adrenaline:"spell_shadow_shadowworddominate", shadowmeld:"ability_ambush",
  feint:"ability_rogue_feint", exposearmor:"ability_warrior_riposte", blind:"spell_shadow_mindsteal",
  shank:"ability_rogue_shadowstrikes", sap:"ability_sap",
  ipois1:"ability_poisons", ipois2:"ability_poisons", ipois3:"ability_poisons", ipois4:"ability_poisons", ipois5:"ability_poisons", ipois6:"ability_poisons",
  opois1:"ability_poisonsting", opois2:"ability_rogue_dualweild", opois3:"ability_rogue_dualweild", opois4:"ability_rogue_dualweild", opois5:"ability_rogue_dualweild",
  poisons:"trade_brewpoison",
  stone1:"inv_stone_sharpeningstone_01", stone2:"inv_stone_sharpeningstone_02", stone3:"inv_stone_sharpeningstone_03",
  stone4:"inv_stone_sharpeningstone_04", stone5:"inv_stone_sharpeningstone_05",
  pickpocket:"inv_misc_bag_11", picklock:"spell_nature_moonkey", detecttraps:"ability_spy", disarmtrap:"spell_shadow_grimward",
  firstaid:"spell_holy_sealofsacrifice", hearth:"inv_misc_rune_01", mount:"ability_mount_blackpanther",
  bandage1:"inv_misc_bandage_15", bandage2:"inv_misc_bandage_18", bandage3:"inv_misc_bandage_14", bandage4:"inv_misc_bandage_17",
  bandage5:"inv_misc_bandage_01", bandage6:"inv_misc_bandage_02", bandage7:"inv_misc_bandage_19", bandage8:"inv_misc_bandage_20",
  bandage9:"inv_misc_bandage_11", bandage10:"inv_misc_bandage_12",
  food1:"inv_misc_food_19", food2:"inv_misc_food_24", food3:"inv_misc_food_22", food4:"inv_misc_food_20",
  food5:"inv_misc_food_29", food6:"inv_misc_food_55", food7:"inv_misc_food_10"
};

/* ---------- which key holds what, from which level ---------- */
/* each slot: [key label, [[fromLevel, spellId], ...]] */
const BARS = [
  { id:"main", title:"Main bar", how:"Keys 1 to =. Everything you press in a normal fight.",
    slots:[
      ["1", [[1,"sinister"]]],
      ["2", [[1,"eviscerate"]]],
      ["3", [[10,"slicedice"]]],
      ["4", [[6,"gouge"]]],
      ["5", [[12,"kick"]]],
      ["6", [[1,"throw"]]],
      ["7", [[10,"sprint"]]],
      ["8", [[8,"evasion"]]],
      ["9", [[22,"vanish"]]],
      ["0", [[1,"eluneslight"]]],
      ["-", [[21,"riposte"]]],
      ["=", [[1,"stealth"]]]
    ]},
  { id:"shift", title:"Bottom left bar", how:"Shift + 1 to =. Openers, stuns, emergencies and rarer abilities.",
    slots:[
      ["S1", [[26,"cheapshot"]]],
      ["S2", [[4,"backstab"]]],
      ["S3", [[14,"garrote"]]],
      ["S4", [[30,"kidney"]]],
      ["S5", [[31,"bladeflurry"]]],
      ["S6", [[40,"adrenaline"]]],
      ["S7", [[1,"shadowmeld"]]],
      ["S8", [[16,"feint"]]],
      ["S9", [[14,"exposearmor"]]],
      ["S0", [[34,"blind"]]],
      ["S-", [[24,"shank"]]],
      ["S=", [[10,"sap"]]]
    ]},
  { id:"side", title:"Right bar", how:"Click these with the mouse between fights. No key needed.",
    slots:[
      ["", [[20,"ipois1"],[28,"ipois2"],[36,"ipois3"],[44,"ipois4"],[52,"ipois5"],[60,"ipois6"]]],
      ["", [[20,"opois1"],[30,"opois2"],[38,"opois3"],[46,"opois4"],[54,"opois5"]]],
      ["", [[20,"poisons"]]],
      ["", [[10,"stone1"],[15,"stone2"],[25,"stone3"],[35,"stone4"],[45,"stone5"]]],
      ["", [[4,"pickpocket"]]],
      ["", [[16,"picklock"]]],
      ["", [[24,"detecttraps"]]],
      ["", [[30,"disarmtrap"]]],
      ["", [[10,"firstaid"]]],
      ["", [[1,"hearth"]]],
      ["", [[40,"mount"]]],
      ["", []]
    ]},
  { id:"alt", title:"Bottom right bar", how:"Alt + 1 and Alt + 2. Bandages and food. Use them after fights.",
    slots:[
      ["A1", [[10,"bandage1"],[14,"bandage2"],[20,"bandage3"],[24,"bandage4"],[28,"bandage5"],[32,"bandage6"],[36,"bandage7"],[40,"bandage8"],[46,"bandage9"],[52,"bandage10"]]],
      ["A2", [[1,"food1"],[5,"food2"],[15,"food3"],[25,"food4"],[35,"food5"],[45,"food6"],[55,"food7"]]]
    ]}
];

/* what's in a slot at a level */
