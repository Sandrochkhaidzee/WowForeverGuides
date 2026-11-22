/* Settings the shared guide engine (assets/js/guide.js) reads for this character. */
const GUIDE_PAGE = {
  character: "nightelf-rogue",
  saveKey: "nelfRogueBeginner.v1",
  addonsHref: "../addons.html?c=nightelf-rogue",
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
   chapter = optional: this step starts a new chapter (shown as a
   heading in the "All steps" list).
   quests = optional: the quests handed in on this step, as {id:"name"}.
   "Find my step from the game" uses them to work out where you are.
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

{ lv:"1", place:"Shadowglen", title:"Your first quest", quests:{456:"The Balance of Nature"}, pickup:{3118:"Encrypted Sigil"}, map:[["teldrassil",[58.7,44.3,"Conservator Ilthalaine"],[60.5,48.5,"Young nightsabers and thistle boars"]]],
  done:"you've handed in <b>The Balance of Nature</b>, and its second part and <b>Encrypted Sigil</b> are in your quest log.",
  todo:[
    "Talk to <b>Conservator Ilthalaine</b>, the night elf right in front of you. He has a yellow <b>!</b> over his head. Accept <b>The Balance of Nature</b>.",
    "Walk out into the glade and kill <b>7 young nightsabers</b> and <b>4 young thistle boars</b>.",
    "Go back to Ilthalaine. He now has a yellow <b>?</b>. Talk to him to turn in the quest. Then take <b>The Balance of Nature</b> part 2 and your rogue quest, <b>Encrypted Sigil</b>."
  ],
  tip:"How to fight: click a nightsaber to target it, walk up to it and press <kbd>1</kbd>. Your character also hits by itself while you stand next to the enemy." },

{ lv:"1–2", place:"Shadowglen", title:"Meet your trainer", quests:{3118:"Encrypted Sigil"}, map:[["teldrassil",[59.6,38.6,"Frahun Shadewhisper (inside Aldrassil)"],[58.7,44.3,"Ilthalaine"]]], learn:["stealth"],
  done:"you've handed in <b>Encrypted Sigil</b> and Stealth is on key <kbd>=</kbd>.",
  todo:[
    "<b>Encrypted Sigil</b> sends you to <b>Frahun Shadewhisper</b>, the rogue trainer inside the big tree, Aldrassil. Walk up the ramp into the tree to find him.",
    "Turn it in and learn <b>Stealth</b>. Put it on key <kbd>=</kbd>.",
    "Stealth makes you almost invisible. You walk slower, and enemies only see you when you're very close. Any attack breaks it."
  ],
  tip:"After every fight, if your health is low, sit and eat (<kbd>Alt</kbd> + <kbd>2</kbd>) before the next one. It saves you from dying." },

{ lv:"2–4", place:"Shadowglen", title:"Grells, boars and a friend in need", quests:{458:"The Woodland Protector", 459:"The Woodland Protector", 457:"The Balance of Nature", 3519:"A Friend in Need"}, pickup:{916:"Webwood Venom", 4495:"A Good Friend", 3521:"Iverron's Antidote"}, map:[["teldrassil",[59.9,42.5,"Melithar Staghelm"],[57.8,45.2,"Tarindrella"],[55,42,"Grells"],[60.9,42,"Dirania Silvershine"],[54.6,33,"Iverron"]]],
  done:"you've handed in both parts of <b>The Woodland Protector</b> and <b>The Balance of Nature</b> part 2, and Dirania has given you <b>Iverron's Antidote</b>.", stuck:"Fight grells and thistle boars near Aldrassil until you're level 4.",
  todo:[
    "Take <b>The Woodland Protector</b> from <b>Melithar Staghelm</b> at the foot of Aldrassil and talk to <b>Tarindrella</b>, the dryad just south of the tree. She gives part 2: kill grells and grellkin west of the tree for <b>Fel Moss</b>, then hand it back to her.",
    "On the way, finish <b>The Balance of Nature</b> part 2: kill <b>7 mangy nightsabers</b> and <b>7 thistle boars</b>. Hand it in to Ilthalaine.",
    "Take <b>Webwood Venom</b> from <b>Gilshalan Windwalker</b> at the bottom of the ramp into Aldrassil. You do it in the next step.",
    "<b>Dirania Silvershine</b>, by the tree, gives <b>A Good Friend</b>. Walk north-west to <b>Iverron</b> at the mouth of Shadowthread Cave. He gives <b>A Friend in Need</b>: go back to Dirania and hand it in. She gives <b>Iverron's Antidote</b>."
  ],
  tip:"Grells stand in small groups. Attack the one at the edge so its friends don't join in." },

{ lv:"4", place:"Frahun Shadewhisper (trainer)", title:"Level 4: Backstab", map:[["teldrassil",[59.6,38.6,"Frahun Shadewhisper (rogue trainer)"]]], learn:["backstab","pickpocket"],
  done:"Backstab is on <kbd>Shift</kbd> + <kbd>2</kbd> and Pick Pocket is on your right bar.",
  todo:[
    "Go back to Frahun and learn <b>Backstab</b> and <b>Pick Pocket</b>.",
    "Put Backstab on <kbd>Shift</kbd> + <kbd>2</kbd>. It only works <b>from behind</b> the enemy, and only with a dagger. You start with a dagger, so: Stealth, sneak behind an enemy, Backstab.",
    "Pick Pocket steals a little money from humanoids while you're in Stealth. Put it on the right bar and use it on every humanoid before you attack."
  ] },

{ lv:"4–5", place:"Shadowglen", title:"Spiders, the antidote and the egg", quests:{3521:"Iverron's Antidote", 916:"Webwood Venom", 917:"Webwood Egg"}, map:[["teldrassil",[57,32.5,"Shadowthread Cave (webwood spiders)"],[54.6,33,"Iverron"],[56.5,37.5,"Ponds north-west of the tree (Moonpetal Lilies)"],[60.9,42,"Dirania Silvershine"],[59.6,38.6,"Gilshalan (foot of the ramp)"]]],
  done:"you've handed in <b>Iverron's Antidote</b> to Iverron, and <b>Webwood Venom</b> and <b>Webwood Egg</b> to Gilshalan.", stuck:"Fight the webwood spiders outside the cave until you're level 5.",
  todo:[
    "Gather the things for <b>Iverron's Antidote</b>: <b>7 Hyacinth Mushrooms</b> (they grow on the ground around the grell camps, and grells can drop them), <b>4 Moonpetal Lilies</b> (white flowers around the ponds north-west of Aldrassil) and <b>1 Webwood Ichor</b> (from a webwood spider).",
    "Kill webwood spiders outside <b>Shadowthread Cave</b> for <b>10 Webwood Venom Sacs</b> (Webwood Venom).",
    "Bring the ingredients to Dirania. She gives you the antidote: take it to Iverron at the cave mouth <b>before the timer runs out</b>. If time runs out, abandon the quest (quest log <kbd>L</kbd>, <b>Abandon</b>) and take it again from Dirania.",
    "Hand in Webwood Venom to Gilshalan and take <b>Webwood Egg</b>. In the cave, take the middle path at the first split, go straight, then follow the path up and round to the right. Pick up an egg and bring it back to Gilshalan."
  ],
  tip:"In caves, enemies stand close together. Fight them one at a time and step back so you don't pull their friends." },

{ lv:"5–6", place:"Shadowglen", title:"Leave Shadowglen", quests:{920:"Tenaron's Summons", 921:"Crown of the Earth"}, pickup:{2159:"Dolanaar Delivery"}, map:[["teldrassil",[59.6,38.6,"Tenaron Stormgrip (top of Aldrassil)"],[62.5,32.5,"Moonwell"],[61.2,47.6,"Porthannius"],[55.6,59.8,"Dolanaar"]]],
  done:"you've reached Dolanaar with <b>Dolanaar Delivery</b> and <b>Crown of the Earth</b> in your quest log.", stuck:"Fight nightsabers and boars along the road until you're level 6.",
  todo:[
    "Gilshalan gives <b>Tenaron's Summons</b>. Walk all the way up Aldrassil to <b>Tenaron Stormgrip</b> at the top and hand it in.",
    "Tenaron gives <b>Crown of the Earth</b>. Go to the <b>moonwell</b> north of the tree, use the empty phial from your bag while you stand at the well, and bring the full phial back to him. Take the next part: it goes to Corithras Moonrage in Dolanaar.",
    "Take <b>Dolanaar Delivery</b> from <b>Porthannius</b>, on the path out of the glade.",
    "Follow the road south out of the glade to the town of <b>Dolanaar</b>."
  ] },

/* ---------- Dolanaar, levels 6–12 ---------- */
{ chapter:"Dolanaar", lv:"6", place:"Dolanaar", title:"Make Dolanaar your home", quests:{2159:"Dolanaar Delivery", 928:"Crown of the Earth"}, map:[["teldrassil",[55.6,59.8,"Innkeeper Keldamyr"],[56.1,61.7,"Corithras Moonrage"]]], learn:["food2"],
  done:"your Hearthstone says <b>Dolanaar</b> when you hover over it, and you've handed in <b>Dolanaar Delivery</b> and <b>Crown of the Earth</b>.",
  todo:[
    "Find <b>Innkeeper Keldamyr</b> and choose <b>Make this inn your home</b>. Hand <b>Dolanaar Delivery</b> to him too.",
    "Your <b>Hearthstone</b> (in your bag) now teleports you back here. It has a 1 hour cooldown.",
    "Hand <b>Crown of the Earth</b> to <b>Corithras Moonrage</b> and take the next part: fill a phial at the moonwell in <b>Starbreeze Village</b>.",
    "Better food: from level 5, buy <b>Tel'Abim Bananas</b> from a food vendor (ask a guard) and put them on <kbd>Alt</kbd> + <kbd>2</kbd>."
  ],
  tip:"Always log out inside an inn. You'll get bonus XP (called rested XP) when you come back." },

{ lv:"6", place:"Jannok Breezesong (trainer, Dolanaar)", title:"Level 6: Gouge", map:[["teldrassil",[56.4,60.1,"Jannok Breezesong (rogue trainer)"]]], learn:["gouge"],
  done:"Gouge is on key <kbd>4</kbd>.",
  todo:[
    "Dolanaar has its own rogue trainer, <b>Jannok Breezesong</b>. Learn <b>Gouge</b> and put it on key <kbd>4</kbd>.",
    "Gouge stuns the enemy for a few seconds. Any hit wakes it up again, so use the time to get behind it, or to run away."
  ],
  tip:"Trick to learn now: Gouge, walk behind the enemy, Backstab. It only works while you have a dagger in your main hand." },

{ lv:"6–7", place:"Dolanaar", title:"Grab every quest in town", pickup:{475:"A Troubling Breeze", 2438:"The Emerald Dreamcatcher", 488:"Zenn's Bidding", 929:"Crown of the Earth"}, map:[["teldrassil",[55.6,59.8,"Dolanaar"],[60.5,56.3,"Zenn Foulhoof"]]],
  done:"your quest log (<kbd>L</kbd>) has <b>A Troubling Breeze</b>, <b>The Emerald Dreamcatcher</b>, <b>Crown of the Earth</b> and <b>Zenn's Bidding</b>.",
  todo:[
    "<b>Athridas Bearmantle</b>: <b>A Troubling Breeze</b>. Talk to Gaerolas in Starbreeze Village.",
    "<b>Tallonkai Swiftroot</b>: <b>The Emerald Dreamcatcher</b>. Find it in Starbreeze Village.",
    "<b>Zenn Foulhoof</b>, the satyr on the road just east of town: <b>Zenn's Bidding</b>. He wants nightsaber pelts, owl feathers and spider silk, so kill nightsabers, strigid owls and webwood spiders as you go.",
    "Press <kbd>L</kbd> to open your quest log. Each quest says how many you need and where to go. More quests open in town once you finish these."
  ] },

{ lv:"7", place:"Starbreeze Village", title:"Starbreeze Village", quests:{475:"A Troubling Breeze", 476:"Gnarlpine Corruption", 2438:"The Emerald Dreamcatcher", 929:"Crown of the Earth", 488:"Zenn's Bidding"}, map:[["teldrassil",[66.3,58.5,"Starbreeze Village"],[60.5,56.3,"Zenn Foulhoof"],[55.6,59.8,"Dolanaar"]]],
  done:"you've handed in <b>A Troubling Breeze</b>, <b>Gnarlpine Corruption</b>, <b>The Emerald Dreamcatcher</b>, the Starbreeze phial and <b>Zenn's Bidding</b>.", stuck:"Fight nightsabers and owls between Dolanaar and Starbreeze until you're level 7.",
  todo:[
    "Go east to <b>Starbreeze Village</b>. <b>Gaerolas Talvethren</b> is on the top floor of the biggest house: hand in <b>A Troubling Breeze</b> and take <b>Gnarlpine Corruption</b>. You only need to take his message back to Athridas.",
    "<b>The Emerald Dreamcatcher</b> is in the dresser of the smaller house.",
    "Fill the phial at the <b>Starbreeze moonwell</b> (Crown of the Earth).",
    "Back in Dolanaar, hand it all in: Gnarlpine Corruption to Athridas, the Dreamcatcher to Tallonkai and the phial to Corithras. Give the pelts, feathers and silk to Zenn on the road. Take every new quest they offer."
  ] },

{ lv:"7–8", place:"Around Dolanaar", title:"Ferocitas, Lord Melenas and the fel cones", quests:{2459:"Ferocitas the Dream Eater", 932:"Twisted Hatred", 489:"Seek Redemption!"}, pickup:{997:"Denalan's Earth"}, map:[["teldrassil",[69.4,53.4,"Ferocitas the Dream Eater (furbolg camp)"],[51.2,50.8,"Fel Rock (Lord Melenas)"],[55.6,59.8,"Dolanaar"],[60.5,56.3,"Zenn Foulhoof"]]],
  done:"you've handed in <b>Ferocitas the Dream Eater</b>, <b>Twisted Hatred</b> and <b>Seek Redemption!</b>, and you're level 8.", stuck:"Fight the Gnarlpine furbolgs north of Starbreeze until you are.",
  todo:[
    "Tallonkai gives <b>Ferocitas the Dream Eater</b>. The furbolg camp is just north of Starbreeze: kill the Gnarlpine Mystics your quest log asks for and <b>Ferocitas</b>. Right-click the necklace Ferocitas drops to get <b>Tallonkai's Jewel</b>, then bring it to Tallonkai.",
    "Tallonkai then gives <b>Twisted Hatred</b>: kill the satyr <b>Lord Melenas</b> at the back of the <b>Fel Rock</b> cave, in the hills just north-west of Dolanaar, and bring his head back.",
    "<b>Syral Bladeleaf</b> in Dolanaar now gives <b>Seek Redemption!</b>: pick up <b>3 Fel Cones</b> (they lie on the ground under the big trees around Dolanaar) and give them to Zenn Foulhoof. Also take <b>Denalan's Earth</b> from Syral for the next step."
  ],
  tip:"Furbolgs come in groups. Use Stealth to sneak past the ones you don't need." },

{ lv:"8", place:"Jannok Breezesong (trainer, Dolanaar)", title:"Level 8: Evasion", map:[["teldrassil",[56.4,60.1,"Jannok Breezesong (rogue trainer)"]]], learn:["evasion"],
  done:"Evasion is on key <kbd>8</kbd>.",
  todo:[
    "Learn <b>Evasion</b> and put it on key <kbd>8</kbd>.",
    "Evasion makes you dodge most attacks for a while. Press it when two or more enemies attack you at once, or when your health drops fast."
  ] },

{ lv:"8–10", place:"Lake Al'Ameth", title:"Denalan's seeds", quests:{997:"Denalan's Earth", 918:"Timberling Seeds", 919:"Timberling Sprouts"}, pickup:{922:"Rellian Greenspyre"}, map:[["teldrassil",[60.9,68.5,"Denalan"],[56,72,"Timberlings"],[53.8,75.1,"Oakenscowl's cave (elite)"]]],
  done:"you've handed in <b>Denalan's Earth</b>, <b>Timberling Seeds</b> and <b>Timberling Sprouts</b> to Denalan, and you're level 10.", stuck:"Fight timberlings around the lake until you are.",
  todo:[
    "Go south to <b>Denalan</b>, who camps on the north-east shore of <b>Lake Al'Ameth</b>. Hand in <b>Denalan's Earth</b>.",
    "<b>Timberling Seeds</b>: kill timberlings along the lake shore for their seeds. <b>Timberling Sprouts</b>: pick up the little sprouts growing on the ground in the same area. Hand both back to Denalan.",
    "Denalan then gives <b>Rellian Greenspyre</b>. Keep it: you hand it in in Darnassus.",
    "Skip <b>Oakenscowl</b> unless you have a group. He's an <b>elite</b>."
  ] },

{ lv:"10", place:"Jannok Breezesong (trainer, Dolanaar)", title:"Level 10: Slice and Dice and your first talent", pickup:{2241:"The Apple Falls"}, map:[["teldrassil",[56.4,60.1,"Jannok Breezesong (rogue trainer)"]]], learn:["slicedice","sprint","sap"],
  done:"Slice and Dice is on <kbd>3</kbd>, Sprint on <kbd>7</kbd>, Sap on <kbd>Shift</kbd> + <kbd>=</kbd>, your talent point is spent, and <b>The Apple Falls</b> is in your quest log.",
  todo:[
    "Learn <b>Slice and Dice</b>, <b>Sprint</b>, <b>Sap</b> and <b>Dual Wield</b>. Dual Wield lets you hold a weapon in each hand. It works by itself, no button.",
    "Put Slice and Dice on key <kbd>3</kbd> and Sprint on key <kbd>7</kbd>. Sap goes on <kbd>Shift</kbd> + <kbd>=</kbd>.",
    "Press <kbd>N</kbd> to open talents. Click the <b>Combat</b> tab and put your point into <b>Efficient Strikes</b>: Sinister Strike costs less energy.",
    "Jannok also gives your rogue quest, <b>The Apple Falls</b>. It sends you to Syurna in Darnassus."
  ],
  tip:"New fight: Sinister Strike twice, Slice and Dice (you attack faster), then Sinister Strike until you have 3 to 5 combo points, then Eviscerate. Keep Slice and Dice running." },

/* ---------- Darnassus and western Teldrassil ---------- */
{ chapter:"Darnassus", lv:"10", place:"Darnassus", title:"Visit Darnassus", quests:{2241:"The Apple Falls", 922:"Rellian Greenspyre"}, pickup:{487:"The Road to Darnassus", 2242:"Destiny Calls"}, map:[["teldrassil",[39,49,"The road west to Darnassus"]],["darnassus",[63,61,"You come in here"],[37,22,"Rogue trainers and Syurna (Cenarion Enclave)"],[57.6,46.7,"Ilyenia Moonfire (weapon trainer)"]]], learn:["firstaid","bandage1","stone1"],
  done:"you've learned First Aid and Cooking, handed in <b>The Apple Falls</b> and <b>Rellian Greenspyre</b>, and <b>Destiny Calls</b> is in your quest log.",
  todo:[
    "Follow the road west from Dolanaar to the city of <b>Darnassus</b>. On the road, <b>Moon Priestess Amara</b> gives <b>The Road to Darnassus</b>: kill the Gnarlpine Ambushers that jump out along the road. Hand it back to her.",
    "Find the rogue trainers in the <b>Cenarion Enclave</b> (click any guard and they mark it on your map). Hand <b>The Apple Falls</b> to <b>Syurna</b> and take <b>Destiny Calls</b>. You do it at level 11–12.",
    "Hand in <b>Rellian Greenspyre</b> to Rellian (ask a guard where he is).",
    "Learn <b>First Aid</b> and <b>Cooking</b>. Rogues can't heal themselves, so bandages made from cloth are your best friend. Skinning and Leatherworking are good main professions for a rogue: see the <a href=\"../professions.html?c=nightelf-rogue\">Professions page</a>.",
    "Buy <b>Rough Sharpening Stones</b> at the auction house. Rub one on each weapon (click the stone, then the weapon) for extra damage."
  ],
  tip:"Bandages: open First Aid (spellbook, <kbd>P</kbd>), make <b>Linen Bandages</b> from the Linen Cloth that humanoids drop, and put them on <kbd>Alt</kbd> + <kbd>1</kbd>. Bandage after a fight while you eat." },

{ lv:"10–11", place:"Western Teldrassil", title:"Ban'ethil Barrow Den", quests:{2541:"The Sleeping Druid", 2561:"Druid of the Claw"}, pickup:{483:"The Relics of Wakening", 486:"Ursal the Mauler", 933:"Crown of the Earth"}, map:[["teldrassil",[44.9,61.6,"Oben Rageclaw (inside the den)"],[44.5,59.5,"Ban'ethil Barrow Den"],[42,67,"Pools of Arlithrien (moonwell, Ursal)"],[55.6,59.8,"Dolanaar"]]],
  done:"you've finished <b>The Relics of Wakening</b> and <b>Druid of the Claw</b>, and the Pools of Arlithrien phial is full.", stuck:"Fight the furbolgs around Ban'ethil Barrow until you're level 11.",
  todo:[
    "Back in Dolanaar, take <b>The Relics of Wakening</b> and <b>Ursal the Mauler</b> from Athridas and the next <b>Crown of the Earth</b> phial from Corithras.",
    "<b>Ban'ethil Barrow Den</b> is the furbolg cave west of Dolanaar. <b>The Relics of Wakening</b>: open the chests inside for the <b>Raven Claw Talisman</b>, <b>Black Feather Quill</b>, <b>Sapphire of Sky</b> and <b>Rune of Nesting</b>.",
    "Inside the den, the ghost <b>Oben Rageclaw</b> gives <b>The Sleeping Druid</b>: kill Gnarlpine shamans until one drops a <b>Shaman Voodoo Charm</b> (it can take a while). Then <b>Druid of the Claw</b>: use the charm on the bear at the bottom of the den, kill it, and go back to Oben.",
    "Fill the phial at the moonwell by the <b>Pools of Arlithrien</b>, south-west of the den (Crown of the Earth). <b>Ursal the Mauler</b> is the furbolg leader in the camps there: leave him until you're level 11, he hits hard."
  ] },

{ lv:"11–12", place:"Oracle Glade", title:"Rogue quest: Sethir's journal", quests:{483:"The Relics of Wakening", 486:"Ursal the Mauler", 938:"Mist", 933:"Crown of the Earth"}, pickup:{2242:"Destiny Calls"}, map:[["teldrassil",[38.3,34.4,"Sentinel Arynia Cloudsbreak (Oracle Glade)"],[37,22,"Sethir the Ancient (on a branch)"],[31.5,31.6,"Mist (nightsaber cub)"],[55.6,59.8,"Dolanaar"]]],
  done:"<b>Sethir's Journal</b> is in your bags, Mist is home, you've handed in your Dolanaar quests, and you're level 12.", stuck:"Fight the furbolgs at the Pools of Arlithrien until you are.",
  todo:[
    "Ride north past Darnassus to the <b>Oracle Glade</b>. On the way, fill the next phial at the moonwell on the road north of Darnassus (Crown of the Earth).",
    "<b>Destiny Calls</b>: <b>Sethir the Ancient</b>, a level 12 satyr, stands on a branch north of the Oracle Glade. Go north of the glade and follow the wooden wall west. In Stealth, walk up behind him, use <b>Pick Pocket</b> to steal <b>Sethir's Journal</b>, and walk away. Don't fight him: he has helpers.",
    "Find <b>Mist</b>, the lost nightsaber cub, at the far north-west point of the island. Talk to her and lead her back to <b>Sentinel Arynia Cloudsbreak</b> at the Oracle Glade.",
    "Back in Dolanaar: hand in <b>The Relics of Wakening</b> and <b>Ursal the Mauler</b> to Athridas and the phial to Corithras. Take the last part of <b>Crown of the Earth</b>: it goes to Arch Druid Fandral Staghelm in Darnassus."
  ],
  tip:"If Sethir sees you, run and come back when you're level 12. The higher your level, the closer you can sneak." },

{ lv:"12", place:"Jannok Breezesong (trainer, Dolanaar)", title:"Level 12: Kick", map:[["teldrassil",[56.4,60.1,"Jannok Breezesong (Dolanaar)"]],["darnassus",[37,22,"Rogue trainers (Cenarion Enclave)"]]], learn:["kick"],
  done:"Kick is on key <kbd>5</kbd> and your talent points are spent.",
  todo:[
    "Learn <b>Kick</b> and <b>Parry</b>. Parry works by itself.",
    "Put Kick on key <kbd>5</kbd>. When an enemy is casting a spell (you'll see a cast bar under its name), press it to stop the spell.",
    "Spend your talent points (<kbd>N</kbd>). The Talents tab of this guide tells you which one."
  ],
  tip:"From now on, train every even level and spend a talent point every level." },

{ lv:"12", place:"Darnassus → Rut'theran Village", title:"Your dagger, then fly to Darkshore", quests:{2242:"Destiny Calls", 6344:"Nessa Shadowsong", 6341:"The Bounty of Teldrassil"}, pickup:{952:"Grove of the Ancients", 6342:"Flight to Auberdine"}, map:[["darnassus",[37,22,"Syurna and Fandral Staghelm (Cenarion Enclave)"]],["teldrassil",[56.3,92.4,"Nessa Shadowsong"],[58.4,94,"Vesprystus (flight master)"]],["darkshore",[36.3,45.6,"Auberdine: you land here"]]],
  done:"the <b>Blade of Cunning</b> is in your main hand and you've landed in Auberdine.",
  todo:[
    "In Darnassus, hand in <b>Destiny Calls</b> to Syurna. Equip the <b>Blade of Cunning</b> (right-click it in your bags): a much better dagger than the one you started with.",
    "Hand in <b>Crown of the Earth</b> to <b>Arch Druid Fandral Staghelm</b> at the top of the Cenarion Enclave's main building. Take <b>Grove of the Ancients</b> from him: you hand it in to Onu in Darkshore.",
    "Take the quest <b>Nessa Shadowsong</b> near the Darnassus entrance and step into the pink portal to <b>Rut'theran Village</b> at the bottom of the tree.",
    "Turn in to Nessa and take <b>The Bounty of Teldrassil</b>. Talk to <b>Vesprystus</b>, the hippogryph master, and take <b>Flight to Auberdine</b>. Your first flight is free: fly to <b>Auberdine</b> in Darkshore."
  ],
  tip:"Your talents are for Combat, which likes swords, maces, axes and fist weapons. Until you find a good one, a strong dagger is fine." },

/* ---------- Darkshore, levels 12–19 ---------- */
{ chapter:"Darkshore", lv:"12", place:"Auberdine", title:"Your new home: Auberdine", quests:{6342:"Flight to Auberdine"}, pickup:{983:"Buzzbox 827", 3524:"Washed Ashore", 2118:"Plagued Lands", 984:"How Big a Threat?", 954:"Bashal'Aran", 958:"Tools of the Highborne", 953:"The Fall of Ameth'Aran", 4811:"The Red Crystal", 947:"Cave Mushrooms"}, map:[["darkshore",[37,44.1,"Innkeeper Shaussiy"],[36.3,45.6,"Flight master"]]],
  done:"Auberdine is your home and the quests above are in your log.",
  todo:[
    "Hand in <b>Flight to Auberdine</b> to Laird. Make the inn your home and talk to the flight master so you can fly here later.",
    "Take every quest in town: <b>Buzzbox 827</b> (Wizbang Cranktoggle, the gnome), <b>Washed Ashore</b> (Gwennyth Bly'Leggonde), <b>Plagued Lands</b> (Tharnariun Treetender), <b>How Big a Threat?</b>, <b>Bashal'Aran</b> and <b>Tools of the Highborne</b> (Thundris Windweaver), <b>The Fall of Ameth'Aran</b> (Sentinel Tysha Moonblade), <b>The Red Crystal</b> and <b>Cave Mushrooms</b>.",
    "Your quest log (<kbd>L</kbd>) says how many of each thing you need. Check it before you leave town."
  ],
  tip:"There's no rogue trainer here. Every two levels, fly back to Rut'theran and take the portal up to Darnassus to train." },

{ lv:"12–13", place:"Darkshore beach", title:"The beach and the hills by town", quests:{983:"Buzzbox 827", 3524:"Washed Ashore", 984:"How Big a Threat?", 2118:"Plagued Lands"}, pickup:{1001:"Buzzbox 411", 2138:"Cleansing of the Infected"}, map:[["darkshore",[36.7,46.3,"Buzzbox 827"],[36.5,51,"Beached Sea Creature"],[39,52,"Furbolg camp"]]],
  done:"you've handed in <b>Buzzbox 827</b>, <b>Washed Ashore</b>, <b>How Big a Threat?</b> and <b>Plagued Lands</b>.", stuck:"Fight crawlers on the beach until you're level 13.",
  todo:[
    "<b>Buzzbox 827</b>: kill crawlers (crabs) on the beach just south of town for their legs. Hand them in at the <b>Buzzbox 827</b> machine on the beach and take <b>Buzzbox 411</b>.",
    "<b>Washed Ashore</b>: search the big sea creature skeleton on the beach to the south. Hand it in to Gwennyth and take part 2. Your quest log says where to look next.",
    "<b>How Big a Threat?</b>: find the furbolg camp east of the road, look at it, and report back. Take part 2: it asks you to kill those furbolgs (next steps).",
    "<b>Plagued Lands</b>: Tharnariun gives you a trap item. Find a <b>rabid thistle bear</b> in the hills east of town, use the item to put the trap down, and pull the bear onto it. Hand it in and take <b>Cleansing of the Infected</b>."
  ] },

{ lv:"13–14", place:"Bashal'Aran and Ameth'Aran", title:"The two ruins", quests:{954:"Bashal'Aran", 955:"Bashal'Aran", 956:"Bashal'Aran", 957:"Bashal'Aran", 958:"Tools of the Highborne", 953:"The Fall of Ameth'Aran", 4811:"The Red Crystal", 4812:"As Water Cascades", 4813:"The Fragments Within"}, map:[["darkshore",[44.2,36.3,"Asterion (Bashal'Aran)"],[42.5,62,"Ameth'Aran (blue flame, spirits, tablets)"],[47,49,"The Red Crystal"]]],
  done:"you've finished the <b>Bashal'Aran</b> chain, <b>Tools of the Highborne</b>, <b>The Fall of Ameth'Aran</b> and <b>The Red Crystal</b> chain, and you're level 14.", stuck:"Fight the grells and satyrs at Bashal'Aran until you are.",
  todo:[
    "<b>Bashal'Aran</b>: follow the road north-east to the ruins and talk to the ghost <b>Asterion</b> on the hill. He wants <b>8 Grell Earrings</b> (kill the wild grells around the ruins), then the <b>Ancient Moonstone Seal</b>: kill the satyrs there until one drops it.",
    "Take the seal to the blue flame in <b>Ameth'Aran</b>, the ruins south-east of town, to destroy it. Then go back to Asterion.",
    "While you're in Ameth'Aran: <b>Tools of the Highborne</b> (kill the Highborne spirits for 7 Highborne Relics) and <b>The Fall of Ameth'Aran</b> (find and read the stone tablets in the ruins). Hand both in in Auberdine.",
    "<b>The Red Crystal</b>: find the big red crystal in the hills east of town. It leads to <b>As Water Cascades</b> (fill the bottle at the Auberdine moonwell and bring it to the crystal) and then <b>The Fragments Within</b>."
  ],
  tip:"Skip <b>For Love Eternal</b> (Cerellean Whiteclaw) for now. Its target is too strong at this level." },

{ lv:"14", place:"Darnassus (fly)", title:"Level 14: Garrote and Expose Armor", map:[["darnassus",[37,22,"Rogue trainers (Cenarion Enclave)"]]], learn:["garrote","exposearmor"],
  done:"Garrote is on <kbd>Shift</kbd> + <kbd>3</kbd> and Expose Armor on <kbd>Shift</kbd> + <kbd>9</kbd>.",
  todo:[
    "Fly to Rut'theran, take the portal up to Darnassus, and learn everything you can afford.",
    "<b>Garrote</b> (<kbd>Shift</kbd> + <kbd>3</kbd>) is an opener: from Stealth, behind the enemy. It makes it bleed for a while.",
    "<b>Expose Armor</b> (<kbd>Shift</kbd> + <kbd>9</kbd>) makes an enemy take more damage. Only worth it on enemies that live a long time, like bosses."
  ] },

{ lv:"14–16", place:"Northern Darkshore", title:"The north: Buzzboxes, Blackwood camps and the tower", quests:{1001:"Buzzbox 411", 985:"How Big a Threat?", 2138:"Cleansing of the Infected", 4763:"The Blackwood Corrupted", 965:"The Tower of Althalaxx", 966:"The Tower of Althalaxx"}, pickup:{1002:"Buzzbox 323", 947:"Cave Mushrooms"}, map:[["darkshore",[51,35,"Blackwood camps"],[54.4,31.8,"Cliffspring Falls (cave)"],[55,25,"Tower of Althalaxx"],[38,29,"Northern beach (threshers, Buzzbox 411)"]]],
  done:"you've handed in <b>Buzzbox 411</b>, <b>How Big a Threat?</b> part 2, <b>Cleansing of the Infected</b>, <b>The Blackwood Corrupted</b> and the first <b>Tower of Althalaxx</b> quests, and you're level 16.", stuck:"Fight the Blackwood furbolgs at their camps until you are.",
  todo:[
    "Follow the coast north. Kill <b>threshers</b> in the water for <b>3 Thresher Eyes</b> and hand them in at the <b>Buzzbox 411</b> machine on the northern beach. It gives <b>Buzzbox 323</b>: kill moonstalkers for it as you go.",
    "<b>The Blackwood Corrupted</b>: fill the empty bowl at the Auberdine moonwell. Take a grain, a nut and a fruit sample from the three Blackwood furbolg camps, put the bowl by the bonfire at the last camp, and kill the demon that appears. Finish <b>How Big a Threat?</b> part 2 and <b>Cleansing of the Infected</b> around the same camps.",
    "<b>Cave Mushrooms</b>: they grow in the cave behind <b>Cliffspring Falls</b>.",
    "<b>The Tower of Althalaxx</b>: at the tower in the far north, talk to <b>Balthule Shadowstrike</b> and kill the Dark Strand cultists his quests ask for. The last Darkshore part sends you to Delgren the Purifier at Maestra's Post in Ashenvale."
  ],
  tip:"Darkshore has a free bag: finish the <b>Buzzbox</b> chain (827, 411, 323, 525) and take <b>Wizbang's Gunnysack</b> as the reward. Buzzbox 525 wants scalps from the grizzled thistle bears." },

{ lv:"16", place:"Darnassus (fly)", title:"Level 16: Feint and Pick Lock", map:[["darnassus",[37,22,"Rogue trainers (Cenarion Enclave)"]]], learn:["feint","picklock","food3","stone2"],
  done:"Feint is on <kbd>Shift</kbd> + <kbd>8</kbd> and Pick Lock is on your right bar.",
  todo:[
    "Learn <b>Feint</b> and <b>Pick Lock</b>, plus any new ranks.",
    "Feint (<kbd>Shift</kbd> + <kbd>8</kbd>) makes enemies less angry at you. In WoW Forever it works twice as well. Use it in dungeons so they keep attacking the tank.",
    "Pick Lock opens locked boxes, but in WoW Forever it only works with <b>Thieves' Tools</b> in your bags. You get them from a quest in Stormwind at level 20. Keep any lockboxes you find until then.",
    "Upgrade your supplies: <b>Snapvine Watermelons</b> from a food vendor and <b>Coarse Sharpening Stones</b> from the auction house."
  ] },

{ lv:"17–19", place:"Southern Darkshore", title:"The southern loop", quests:{982:"Deep Ocean, Vast Sea", 4740:"WANTED: Murkdeep!", 948:"Onu", 944:"The Master's Glaive", 949:"The Twilight Camp", 950:"Return to Onu"}, pickup:{947:"Cave Mushrooms", 952:"Grove of the Ancients", 986:"A Lost Master", 995:"Escape Through Stealth", 5321:"The Sleeper Has Awakened"}, map:[["darkshore",[36,76,"Murkdeep's camp"],[43.6,76.3,"Onu (Grove of the Ancients)"],[45,85.3,"Volcor"],[35.7,83.7,"Prospector Remtravel (group quest)"]]],
  done:"Murkdeep is dead, you've handed in <b>Deep Ocean, Vast Sea</b> and Onu's quests, Volcor is free, Kerlonian is following you, and you're level 19.", stuck:"Fight the murlocs and bears in southern Darkshore until you are.",
  todo:[
    "<b>Deep Ocean, Vast Sea</b> (Gorbold Steelhand, Auberdine): swim out to the two sunken ships off the coast and loot the lockboxes in the wrecks. Watch your breath bar and the murlocs.",
    "<b>WANTED: Murkdeep!</b> (the poster in Auberdine): at the murloc camp on the southern coast, kill the murlocs that come out until Murkdeep himself shows up.",
    "Hand in <b>Cave Mushrooms</b>. It leads to <b>Onu</b> at the Grove of the Ancients: give him <b>Grove of the Ancients</b> too. Do his <b>The Master's Glaive</b> and <b>The Twilight Camp</b>, then <b>Return to Onu</b>.",
    "Free <b>Volcor</b> in the south (the <b>A Lost Master</b> quests lead to him). Pick <b>Escape Through Stealth</b>: it's made for rogues. Stay in Stealth and walk him out.",
    "<b>The Sleeper Has Awakened</b>: wake Kerlonian Evershade and walk him south to Maestra's Post in Ashenvale. When he falls asleep on the way, use the <b>Horn of Awakening</b> on him.",
    "Skip <b>The Absent Minded Prospector</b> unless you have a group: one part is a group quest."
  ] },

{ lv:"18", place:"Darnassus (fly)", title:"Level 18: Ambush and Poised", map:[["darnassus",[37,22,"Rogue trainers (Cenarion Enclave)"]]],
  done:"you've learned Ambush, Poised and the new ranks.",
  todo:[
    "Learn <b>Ambush</b>, <b>Poised</b> and new ranks of your attacks.",
    "<b>Poised</b> works by itself: when you're out of combat with a full energy bar, your next ability costs 10 less energy. So wait for full energy before you start a fight.",
    "Ambush is a big hit from Stealth, but it needs a <b>dagger</b>. You're Combat, so leave it in the spellbook unless you're still using the Blade of Cunning."
  ] },

{ lv:"19–20", place:"Darkshore → Ashenvale", title:"Into Ashenvale", quests:{5321:"The Sleeper Has Awakened", 967:"The Tower of Althalaxx"}, map:[["darkshore",[44,92,"Road south to Ashenvale"]],["ashenvale",[26.2,38.7,"Maestra's Post"],[36.5,49.5,"Astranaar"]]],
  done:"you've handed in <b>The Sleeper Has Awakened</b>, Astranaar is your home and you've unlocked its flight path.",
  todo:[
    "Follow the road south out of Darkshore into <b>Ashenvale</b>, with Kerlonian behind you.",
    "Stop at <b>Maestra's Post</b>. Hand in <b>The Sleeper Has Awakened</b> to Liladris Moonriver and your <b>Tower of Althalaxx</b> quest to <b>Delgren the Purifier</b>.",
    "Follow the road east to <b>Astranaar</b>. Make the inn your home and unlock the flight path."
  ] },

/* ---------- Level 20 ---------- */
{ chapter:"Poisons quest", lv:"20", place:"Darnassus", title:"Level 20: Rupture and Riposte", map:[["darnassus",[37,22,"Rogue trainers (Cenarion Enclave)"]]], learn:["riposte"],
  done:"you've learned Rupture and the new ranks, and Riposte is on key <kbd>-</kbd>.",
  todo:[
    "Learn <b>Rupture</b> and new ranks. Rupture is a bleeding finisher. Slice and Dice and Eviscerate are better while questing, so you can leave it in the spellbook.",
    "Talent: put this level's point into <b>Riposte</b> (Combat tab). Open your spellbook (<kbd>P</kbd>) and put Riposte on key <kbd>-</kbd>.",
    "Rogues learn <b>poisons</b> from a quest in Stormwind: see the next two steps."
  ],
  tip:"Riposte only lights up right after you parry an attack. When it lights up, press it." },

{ lv:"20", place:"Stormwind and Redridge", title:"Thieves' Tools for Pick Lock", quests:{2281:"Redridge Rendezvous"}, pickup:{2282:"Alther's Mill"}, map:[["darkshore",[32.4,43.8,"Auberdine docks"]],["stormwind",[75.8,59.8,"Old Town: Renzik the Shiv and SI:7"],[66.3,62.1,"Flight master"]],["redridge",[30.6,59.4,"Lakeshire (Lucius on the pier)"]]],
  done:"<b>Thieves' Tools</b> are in your bags and your Pick Lock skill is at least 80.",
  todo:[
    "Go to <b>Stormwind</b>. From Auberdine, take the ship to Stormwind (new in WoW Forever). If you can't find it, take the boat to Menethil Harbor and travel through Ironforge and the Deeprun Tram. Unlock the Stormwind flight path.",
    "In <b>Old Town</b>, take <b>Redridge Rendezvous</b> from <b>Renzik the Shiv</b>.",
    "Follow the road east through Elwynn Forest to <b>Lakeshire</b> in Redridge Mountains and unlock the flight path. Find <b>Lucius</b> on the pier and take <b>Alther's Mill</b>: he gives you the <b>Thieves' Tools</b>.",
    "Follow the road east to <b>Alther's Mill</b>. Use Pick Lock on the <b>Practice Lockboxes</b> inside until your skill is 80. Then open <b>Lucius's Lockbox</b> and take it back to him."
  ],
  tip:"The poisons quest needs Pick Lock 75, so do this first. Your Pick Lock skill can go up to 5 times your level. Now open the lockboxes you've been saving." },

{ lv:"20", place:"Stormwind and Westfall", title:"Rogue quest: poisons", quests:{2360:"Mathias and the Defias", 2359:"Klaven's Tower"}, map:[["stormwind",[75.8,59.8,"Master Mathias Shaw (SI:7, Old Town)"]],["westfall",[56.4,47.5,"Sentinel Hill (inn and flight path)"]]], learn:["poisons","ipois1","opois1"],
  done:"you've learned Poisons, made Instant Poison, and both weapons have poison on them.",
  todo:[
    "In <b>Old Town</b>, take <b>Mathias and the Defias</b> from <b>Master Mathias Shaw</b> at SI:7. Go to <b>Sentinel Hill</b> in Westfall, unlock the flight path, and make the inn your home for now.",
    "Find <b>Agent Kearnen</b>. She's in Stealth next to a big tree in the south-east corner of Westfall, just south of the road to Duskwood. She gives <b>Klaven's Tower</b>.",
    "Use <b>Pick Pocket</b> on a <b>Malformed Defias Drone</b> to steal the <b>Defias Tower Key</b>. In Stealth, climb to the top of the nearby tower. <b>Klaven Mortwake</b> (level 23) waits there: <b>Sap</b> him, then open the small box beside him (Pick Lock 75) for <b>Klaven Mortwake's Journal</b>.",
    "Use your Hearthstone while Klaven is still asleep. Fly to Stormwind and hand in to Mathias: you learn <b>Poisons</b> and how to make <b>Thistle Tea</b>.",
    "Buy the ingredients from a poison vendor, make <b>Instant Poison</b> in the Poisons window, and put poison on both weapons."
  ],
  tip:"Opening the box gives you a poison called <b>Touch of Zanzil</b>. To cure it, do Mathias's next quest, <b>The Touch of Zanzil</b>: Doc Mixilpixil in the cellar of the Stormwind Barracks wants Simple Wildflowers (from Bernard Gump), a Spool of Light Chartreuse Silk Thread (on the floor of the Finest Thread shop), a Bronze Tube and a Leaded Vial. How poisons work: open Poisons from your spellbook (<kbd>P</kbd>) and make them. Click the poison on your right bar, then click your weapon on the character window (<kbd>C</kbd>). In WoW Forever, poisons have more charges and work together with sharpening stones." },

/* ---------- Ashenvale, levels 20–25 ---------- */
{ chapter:"Ashenvale & Wetlands", lv:"20–24", place:"Ashenvale", title:"Quest Ashenvale", quests:{1008:"The Zoram Strand", 1010:"Bathran's Hair", 1034:"The Ruins of Stardust", 1025:"An Aggressive Defense"}, pickup:{1020:"Orendil's Cure", 1033:"Elune's Tear", 1023:"Raene's Cleansing"}, map:[["ashenvale",[36.5,49.5,"Astranaar"],[14.5,26,"Zoram Strand (naga)"],[30.5,31,"Bathran's Haunt"],[33,67,"Ruins of Stardust"],[20.3,42.4,"Raene's Cleansing (first part)"]]],
  done:"you're level 24 and have handed in <b>The Zoram Strand</b>, <b>Bathran's Hair</b>, <b>The Ruins of Stardust</b> and <b>An Aggressive Defense</b>.", stuck:"Fight the Foulweald furbolgs or the bears near Astranaar until you are.",
  todo:[
    "Take the ship back to Auberdine and fly to <b>Astranaar</b>. Make Astranaar your home again.",
    "<b>The Zoram Strand</b> (Shindrell Swiftfire): 20 Wrathtail Heads from the naga on the far west coast.",
    "<b>Bathran's Hair</b>: pick the plants at the ruins of Bathran's Haunt, north-west of town. Its follow-ups, <b>Orendil's Cure</b> and <b>Elune's Tear</b>, come next: your quest log says where. After Elune's Tear, <b>Pelturas Whitemoon</b> gives <b>The Ruins of Stardust</b>: 5 Handfuls of Stardust from the sparkling bushes in the ruins south-west of town. Elementals can pop out.",
    "<b>Raene Wolfrunner</b> at the inn gives <b>Raene's Cleansing</b> (a long chain: follow it as far as you can) and <b>An Aggressive Defense</b>: kill Foulweald furbolgs at the camps south of the road east of town, before the river. Your quest log lists how many of each.",
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

{ lv:"22–27", place:"Ashenvale", title:"Dungeon: Blackfathom Deeps (optional)", quests:{1275:"Researching the Corruption", 1198:"In Search of Thaelrid", 1199:"Twilight Falls", 971:"Knowledge in the Deeps"}, map:[["ashenvale",[14.5,14.2,"Blackfathom Deeps entrance"],[36.5,49.5,"Astranaar"]]],
  done:"your group has beaten the last boss, Aku'mai, or you've decided to skip it.",
  todo:[
    "A dungeon is a private area for a group of 5 players. Blackfathom Deeps is in the far north-west of Ashenvale, on the coast.",
    "Collect its quests first: <b>Researching the Corruption</b> (Gershala Nightwhisper, Auberdine), <b>In Search of Thaelrid</b> (Dawnwatcher Shaedlass, Darnassus), <b>Twilight Falls</b> (Argent Guard Manados, Darnassus) and <b>Knowledge in the Deeps</b> (Gerrig Bonegrip, Ironforge). Some more start inside.",
    "Find a group: open the Looking For Group tool or ask in chat (\"LFG BFD\").",
    "Inside, stay behind the tank (the player the enemies attack), hit the same enemy as the tank, and don't attack before the tank does."
  ],
  tip:"Most dungeon XP in Forever comes from quests, not kills. Use Feint when an enemy starts attacking you instead of the tank." },

{ lv:"25", place:"Talents (N)", title:"Level 25: Flawless Execution and Legacy", learn:[],
  done:"your talent point and your Legacy point are spent.",
  todo:[
    "Talent: <b>Flawless Execution</b>. Eviscerate now costs 15 less energy.",
    "Around now you get your first <b>Legacy</b> point. Press <kbd>Y</kbd> and put it in <b>Thrill of Adventure</b>: every kill gives back some health."
  ] },

{ lv:"26", place:"Darnassus (fly)", title:"Level 26: Cheap Shot", map:[["darnassus",[37,22,"Rogue trainers (Cenarion Enclave)"]]], learn:["cheapshot","food4","stone3"],
  done:"Cheap Shot is on <kbd>Shift</kbd> + <kbd>1</kbd>.",
  todo:[
    "Learn <b>Cheap Shot</b> and put it on <kbd>Shift</kbd> + <kbd>1</kbd>.",
    "Cheap Shot is an opener: from Stealth it stuns the enemy for a few seconds and gives you 2 combo points.",
    "Upgrade your supplies: <b>Goldenbark Apples</b> from a food vendor and <b>Heavy Sharpening Stones</b> from the auction house."
  ],
  tip:"New fight: Stealth → walk up → Cheap Shot → Slice and Dice → Sinister Strike until 5 combo points → Eviscerate." },

{ lv:"24–28", place:"Wetlands", title:"The Wetlands", quests:{279:"Claws from the Deep", 484:"Young Crocolisk Skins", 276:"Tramping Paws"}, pickup:{470:"Digging Through the Ooze", 463:"The Greenwarden", 472:"Fall of Dun Modr"}, map:[["darkshore",[32.4,43.8,"Auberdine docks: boat to Menethil"]],["wetlands",[10.5,60,"Menethil Harbor"],[34,42,"Whelgar's Excavation Site"],[56.4,40.4,"The Greenwarden"],[48,15,"Dun Modr"],[44,25,"Ironbeard's Tomb"]]],
  done:"you're level 28 and the Menethil Harbor quests are handed in.", stuck:"Fight the murlocs or crocolisks along the Wetlands coast until you are.",
  todo:[
    "Take the boat from Auberdine to <b>Menethil Harbor</b>. Make the inn your home and unlock the flight path.",
    "Take every quest in town: <b>Claws from the Deep</b> (Karl Boran: kill 12 Bluegill murlocs and <b>Gobbler</b>, north of town, for his head), <b>Young Crocolisk Skins</b> (James Halloran: young crocolisks in the marsh) and <b>Digging Through the Ooze</b> (Sida: kill the black oozes at <b>Ironbeard's Tomb</b>, in the north past Dun Modr, until one drops <b>Sida's Bag</b>). Do the coast ones first.",
    "Then move inland. <b>The Greenwarden</b> (First Mate Fitzsimmons) sends you to Rethiel the Greenwarden, who gives <b>Tramping Paws</b> (gnolls to the south-east) and more. From level 25, Harlo Barnaby's <b>Fall of Dun Modr</b> sends you to Longbraid the Grim at the dwarf ruins in the north. The Wetlands also got 20+ new quests in Forever: take any you find.",
    "New dungeon: <b>Excavation Site</b>, best at levels 26–29. Collect its quests from Caitlin Grassman in Menethil first."
  ],
  tip:"Pick Lock practice: once your skill is 110, the murloc camps north-east of Menethil Harbor have <b>Battered Footlockers</b> you can open." },

{ lv:"28", place:"Ironforge, Stormwind or Darnassus", title:"Level 28: stronger poison", map:[["stormwind",[75.8,59.8,"SI:7 (rogue trainers)"]]], learn:["ipois2"],
  done:"Instant Poison II is on your main hand.",
  todo:[
    "Learn <b>Instant Poison II</b> and new ranks. From Menethil Harbor, the closest trainers are in <b>Ironforge</b> (the Forlorn Cavern): fly there. Stormwind's are at SI:7 in Old Town.",
    "Make Instant Poison II in the Poisons window and put it on your main-hand weapon.",
    "If the new poison is grey in the Poisons window, your Poisons skill is too low. Make a few of your old poisons first: each one raises the skill."
  ] },

/* ---------- 28–34: Duskwood, Arathi, Southshore ---------- */
{ chapter:"Duskwood to Arathi", lv:"28–30", place:"Darkshire, Duskwood", title:"Duskwood", quests:{173:"Worgen in the Woods", 56:"The Night Watch"}, pickup:{55:"Morbent Fel", 228:"Mor'Ladim"}, map:[["duskwood",[73.5,46,"Darkshire"],[64,36,"Brightwood Grove (worgen)"],[20,45,"Raven Hill Cemetery (skeletons)"],[80,70,"Tranquil Gardens Cemetery"]]],
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
  tip:"From now on you need a trainer every 2 levels. Rogue trainers: SI:7 in Stormwind, the Forlorn Cavern in Ironforge, and the Cenarion Enclave in Darnassus. Use whichever is closest. Optional: your trainer also offers <b>The Manor, Ravenholdt</b> (needs Detect Traps). It sends you to Ravenholdt Manor in the Alterac Mountains; walk past the trapped chest in the cave." },

{ lv:"30", place:"Talents (N)", title:"Level 30: Blade Flurry", learn:["bladeflurry"],
  done:"Blade Flurry is on <kbd>Shift</kbd> + <kbd>5</kbd>.",
  todo:[
    "Talent: <b>Blade Flurry</b>. Put it on <kbd>Shift</kbd> + <kbd>5</kbd>.",
    "When two enemies fight you, press it: for 15 seconds you attack faster and every hit also hits a second enemy."
  ] },

{ lv:"30–32", place:"Arathi Highlands", title:"Arathi Highlands", quests:{681:"Northfold Manor"}, map:[["arathi",[44,89,"Thandol Span (from the Wetlands)"],[45.8,47.6,"Refuge Pointe"],[32,28,"Northfold Manor (Syndicate)"],[66,68,"Witherbark Village (trolls)"],[25,30,"Stromgarde Keep (elites)"],[73,33,"Hammerfall (Horde town)"]]],
  done:"you're level 32 and have handed in <b>Northfold Manor</b>.", stuck:"Fight the Syndicate around Northfold Manor until you are.",
  todo:[
    "Fly to <b>Menethil Harbor</b> and ride north over the big bridge (Thandol Span) into <b>Arathi Highlands</b>, a wide open grassland.",
    "In the middle is <b>Refuge Pointe</b>, the Alliance camp. Unlock the flight path and make it your home.",
    "Take every quest. Captain Nials's <b>Northfold Manor</b> sends you to the Syndicate in the north-west. Sentinel Glynda Nal'Shea sends you after the Witherbark trolls in the south-east.",
    "Stay out of <b>Stromgarde Keep</b> (west) unless you're in a group: it's full of elite enemies. <b>Hammerfall</b> (east) is a Horde town. Move on at level 32."
  ],
  tip:"The Syndicate are humanoids: Pick Pocket each one from Stealth before you attack. First Aid stuck at 150? <b>Deneb Walker</b> in Stromgarde sells the <b>Expert First Aid</b> book that lets you go higher." },

{ lv:"32", place:"Ironforge (fly from Refuge Pointe)", title:"Level 32: new ranks", map:[["stormwind",[75.8,59.8,"SI:7 (rogue trainers)"]]],
  done:"you've learned every new rank your trainer offers.",
  todo:[
    "Fly to the nearest rogue trainer (from Refuge Pointe, Ironforge is closest) and learn every new rank. New ranks replace the old ones on your bars by themselves.",
    "You can also learn <b>Wound Poison</b>. You don't need it while questing: Instant Poison is better."
  ] },

{ lv:"32", place:"Southshore, Hillsbrad", title:"Southshore", quests:{536:"Down the Coast", 505:"Syndicate Assassins"}, map:[["arathi",[20,30,"Gate in Thoradin's Wall (west)"]],["hillsbrad",[50,55,"Southshore"],[40,74,"Murloc beach"]]],
  done:"you're level 33 and have handed in <b>Down the Coast</b> and <b>Syndicate Assassins</b>.", stuck:"Fight the murlocs on the beach south of Southshore until you are.",
  todo:[
    "From Refuge Pointe, ride west through the gate in the huge wall (Thoradin's Wall) into Hillsbrad Foothills. Follow the road south to <b>Southshore</b>. Unlock the flight path.",
    "Take the town's quests. <b>Down the Coast</b> from Lieutenant Farren Orinelle (murlocs on the beach) and <b>Syndicate Assassins</b> from Marshal Redpath (in the Alterac Mountains, north) are quick XP.",
    "Talk to <b>Emissary Jacques</b> to start the new <b>City of Dalaran</b> dungeon (levels 28–35). Optional.",
    "Southshore also has a boat to Auberdine. Move on at about level 33."
  ],
  tip:"From here on, on PvP servers, Horde players can attack you. Stealth, Sprint and Vanish are your escape." },

/* ---------- 33–37: Stranglethorn Vale ---------- */
{ chapter:"Stranglethorn Vale", lv:"33–35", place:"Stranglethorn Vale (north)", title:"Stranglethorn: Rebel Camp and the hunters", quests:{185:"Tiger Mastery", 190:"Panther Mastery", 194:"Raptor Mastery"}, pickup:{338:"The Green Hills of Stranglethorn"}, map:[["stranglethorn",[38,3.5,"Rebel Camp"],[35.6,10.6,"Nesingwary's Expedition"],[44,10,"Kurzen's Compound"],[32,28,"Grom'gol (Horde camp)"]]],
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
    "Learn <b>Blind</b> and put it on <kbd>Shift</kbd> + <kbd>0</kbd>. It needs <b>Blinding Powder</b>: make it in the Poisons window. Each one needs a <b>Fadeleaf</b> herb: buy them at the auction house.",
    "Blind takes one enemy out of the fight for a while. Use it when a second enemy joins: Blind it, kill the first one, then deal with the blinded one."
  ] },

{ lv:"35–37", place:"Booty Bay, Stranglethorn", title:"Stranglethorn: Booty Bay", quests:{605:"Singing Blue Shards"}, pickup:{595:"The Bloodsail Buccaneers"}, map:[["stranglethorn",[27,77,"Booty Bay"],[38,3.5,"Rebel Camp"],[35.6,10.6,"Nesingwary's Expedition"]]], learn:["stone4","food5"],
  done:"you're level 37 and have handed in <b>Singing Blue Shards</b>.", stuck:"Fight the pirates or raptors along the coast near Booty Bay until you are.",
  todo:[
    "Follow the main road all the way south to <b>Booty Bay</b>, a goblin port built into a cliff. Unlock the flight path and make the inn your home.",
    "Booty Bay is neutral: Horde players use it too, and the goblin guards attack anyone who starts a fight in town.",
    "Take <b>Singing Blue Shards</b> from Crank Fizzlebub (crystal-backed basilisks in the middle of the zone) and the pirate quests that start with <b>The Bloodsail Buccaneers</b> from First Mate Crazz.",
    "Keep doing the Nesingwary hunting quests as new parts open. Move on at level 37."
  ],
  tip:"Upgrade your supplies: <b>Solid Sharpening Stones</b> (auction house) and <b>Moon Harvest Pumpkins</b> (food vendors). Booty Bay also has a boat to Ratchet in Kalimdor." },

{ lv:"35–40", place:"Tirisfal Glades", title:"Dungeon: Scarlet Monastery (optional)", quests:{1050:"Mythology of the Titans", 1053:"In the Name of the Light"}, map:[["tirisfal",[83,33,"Scarlet Monastery"]]],
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
    "In Darnassus, learn riding from <b>Jartsam</b> and buy a <b>nightsaber</b> from <b>Lelanai</b> next to him. Darnassus reputation makes it cheaper. Right-click the mount item to learn it, then drag it from your spellbook to the right bar.",
    "Learn <b>Safe Fall</b> and new ranks at the trainer.",
    "Talent: <b>Adrenaline Rush</b>. Put it on <kbd>Shift</kbd> + <kbd>6</kbd>. Your energy fills twice as fast for a short time. Use it for hard fights."
  ],
  tip:"At level 40 you can also unlock a second talent setup (Dual Specialization) at a trainer in a big city." },

{ lv:"40–43", place:"Riverglades (north)", title:"Riverglades: Sunnyglade and the north", quests:{94877:"Saving Sunnyglade"}, map:[["riverglades"]],
  done:"you're level 43 and have handed in <b>Saving Sunnyglade</b>.", stuck:"Fight the enemies around Sunnyglade until you are.",
  todo:[
    "Fly back to Farholde Keep. Demar Brant's <b>Saving Sunnyglade</b> sends you north to the village of <b>Sunnyglade</b>.",
    "Keep turning in and picking up: the later quests send you further north, toward <b>Twilight's Shroud</b>.",
    "Pick up the quests for the dungeon <b>Krol'dok Stronghold</b> (next step) as they appear.",
    "<b>Powderfuse Port</b>, a neutral goblin port on the east coast, has a bank, an auction house and the boat to Tanaris. Move on at about level 43."
  ] },

{ lv:"42", place:"Stormwind (fly from Farholde Keep)", title:"Level 42: new ranks", map:[["stormwind",[75.8,59.8,"SI:7 (rogue trainers)"]]],
  done:"you've learned every new rank your trainer offers.",
  todo:[
    "Fly from Farholde Keep to Lakeshire, then on to Stormwind. Learn every new rank at SI:7.",
    "Hearth back to Farholde Keep and carry on."
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

{ lv:"43–46", place:"Gadgetzan, Tanaris", title:"Tanaris", quests:{1690:"Wastewander Justice", 1707:"Water Pouch Bounty"}, pickup:{82:"Noxious Lair Investigation", 8366:"Southsea Shakedown", 8365:"Pirate Hats Ahoy!"}, map:[["tanaris",[51,28,"Gadgetzan"],[63,30,"Wastewander bandit camps"],[35,45,"Noxious Lair (giant insects)"],[72,46,"Lost Rigger Cove (pirates)"],[39,20,"Zul'Farrak"]]],
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
    "Learn new ranks and <b>Instant Poison IV</b>. While you're in Kalimdor, Darnassus is the closest trainer (fly to Rut'theran Village, then take the portal up).",
    "Make it and put it on your main-hand weapon. Hearth back to Gadgetzan."
  ] },

{ lv:"44–48", place:"Tanaris", title:"Dungeon: Zul'Farrak (optional)", quests:{2768:"Divino-matic Rod", 3042:"Troll Temper"}, map:[["tanaris",[39,20,"Zul'Farrak"],[51,28,"Gadgetzan"]]],
  done:"your group has finished, or you've decided to skip it.",
  todo:[
    "A troll city in the north-west of Tanaris, for levels 44–48. Lots of quests from Gadgetzan.",
    "Good ones: <b>Divino-matic Rod</b> (Chief Engineer Bilgewhizzle) and <b>Troll Temper</b> (Trenton Lighthammer).",
    "Find a group with the Looking For Group tool or ask in chat (\"LFG ZF\")."
  ] },

{ lv:"45", place:"Talents (N)", title:"Level 45: Assassination talents",
  done:"your new point is in <b>Remorseless Attacks</b>.",
  todo:[
    "Combat is done: from now on your talent points go into the <b>Assassination</b> tab, starting with <b>Remorseless Attacks</b>. After a kill, your next Sinister Strike is much more likely to crit.",
    "The Talents tab shows the order to the end. At 60 you've spent all 51 points."
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

{ lv:"46–48", place:"Feathermoon, Feralas", title:"Feralas", quests:{2821:"The Mark of Quality", 7003:"Zapped Giants"}, pickup:{4267:"Rise of the Silithid"}, map:[["feralas",[30.5,43.5,"Feathermoon Stronghold"],[43.5,43,"Ferry dock"],[59,44,"Dire Maul (for later)"]]],
  done:"you're level 48 and have handed in <b>Zapped Giants</b> and <b>The Mark of Quality</b>.", stuck:"Fight the yetis in the hills or the giants on the coast until you are.",
  todo:[
    "Take every quest in Feathermoon Stronghold, like <b>The Mark of Quality</b> from Pratt McGrubben (yeti hides) and the <b>Rise of the Silithid</b> chain.",
    "Near the ferry dock, <b>Zorbin Fandazzle</b> gives <b>Zapped Giants</b>: use his gadget on the giants that walk along the coast.",
    "<b>Dire Maul</b>, the ruined city in the middle of Feralas, is a dungeon for levels 55–60. Come back much later.",
    "Move on at about level 48."
  ] },

{ lv:"48", place:"Darnassus (fly from Feathermoon)", title:"Level 48: new ranks", map:[["darnassus",[37,22,"Rogue trainers (Cenarion Enclave)"]]],
  done:"you've learned every new rank your trainer offers.",
  todo:[
    "Fly from Feathermoon to Rut'theran Village, take the portal up to Darnassus and learn every new rank.",
    "You're now in Rut'theran, close to the boat at Auberdine: go straight on to the Hinterlands (next step)."
  ] },

{ lv:"47–50", place:"Aerie Peak, Hinterlands", title:"The Hinterlands", quests:{2877:"Skulk Rock Clean-up", 2880:"Troll Necklace Bounty"}, pickup:{2988:"Witherbark Cages"}, map:[["hinterlands",[14,46,"Aerie Peak"],[55,42,"Skulk Rock (oozes)"],[63,73,"Jintha'Alor (trolls)"]]],
  done:"you're level 50 and have handed in <b>Skulk Rock Clean-up</b> and <b>Troll Necklace Bounty</b>.", stuck:"Fight Witherbark trolls (their necklaces count for the bounty) until you are.",
  todo:[
    "Back to the Eastern Kingdoms: fly to Auberdine and take the boat to <b>Southshore</b> (or the boat to Menethil Harbor, then fly to Southshore). From Southshore, ride north-east into <b>The Hinterlands</b>. <b>Aerie Peak</b>, the Wildhammer dwarf town, is right at the entrance.",
    "Unlock the flight path and make the inn your home.",
    "Take every quest: <b>Skulk Rock Clean-up</b> (oozes at Skulk Rock), <b>Troll Necklace Bounty</b> (necklaces from any Witherbark troll) and Gryphon Master Talonaxe's chain, starting with <b>Witherbark Cages</b>.",
    "Run out of quests? <b>Searing Gorge</b> (town: Thorium Point) is another zone for this level. Move on at level 50."
  ],
  tip:"WoW Forever adds a new dungeon for these levels: <b>Alcaz Prison</b> (about 48–53). Look for it in the Looking For Group tool." },

/* ---------- 49–60 ---------- */
{ chapter:"Un'Goro to 60", lv:"49–52", place:"Marshal's Refuge, Un'Goro", title:"Un'Goro Crater", quests:{4284:"Crystals of Power", 4243:"Chasing A-Me 01"}, map:[["ungoro",[43.5,8.5,"Marshal's Refuge"],[50,48,"Fire Plume Ridge (volcano)"],[70,75,"Entrance from Tanaris"]]],
  done:"you're level 52 and have handed in <b>Crystals of Power</b> and <b>Chasing A-Me 01</b>.", stuck:"Fight the raptors and stegodons near Marshal's Refuge until you are.",
  todo:[
    "Fly to Gadgetzan (from the Hinterlands: fly to Menethil Harbor, take the boat to Auberdine, then fly to Gadgetzan) and ride west out of Tanaris. The road goes down a long ramp into <b>Un'Goro Crater</b>, a jungle full of dinosaurs.",
    "Follow the crater's edge north to <b>Marshal's Refuge</b>, a camp under the northern cliffs. Unlock the flight path.",
    "Take every quest. <b>Crystals of Power</b> from J.D. Collie: pick up the coloured crystals that lie on the ground all over the crater (your quest log says which colours and how many). Karna Remtravel's <b>Chasing A-Me 01</b> sends you to walk a lost robot home.",
    "Watch out for <b>Devilsaurs</b>: huge dinosaurs that walk around and hit very hard. Stay out of their way. Move on at level 52."
  ],
  tip:"Devilsaurs can't see you in Stealth. If one comes your way, Stealth and step aside." },

{ lv:"50", place:"Darnassus (fly from Marshal's Refuge)", title:"Level 50: new ranks", pickup:{8233:"A Simple Request"}, map:[["darnassus",[37,22,"Rogue trainers (Cenarion Enclave)"]]],
  done:"you've learned every new rank your trainer offers and your talent point is spent.",
  todo:[
    "Fly to Rut'theran Village, take the portal up to Darnassus and learn every new rank.",
    "Talent: <b>Ruthlessness</b> (Assassination tab).",
    "Optional: your trainer offers <b>A Simple Request</b>, a long rogue chain (Ravenholdt Manor, Azshara, then Sunken Temple with a group). Its rewards are very good, but it takes time."
  ] },

{ lv:"52", place:"Nearest rogue trainer", title:"Level 52: Instant Poison V", map:[["darnassus",[37,22,"Rogue trainers (Cenarion Enclave)"]]], learn:["ipois5"],
  done:"Instant Poison V is on your main hand.",
  todo:[
    "Learn new ranks and <b>Instant Poison V</b>. Put it on your main-hand weapon."
  ] },

{ lv:"52–54", place:"Felwood", title:"Felwood", quests:{5155:"Forces of Jaedenar", 8461:"Deadwood of the North"}, map:[["felwood",[51,82,"Emerald Sanctuary"],[37,60,"Jaedenar (Shadow Council)"],[62.5,24.5,"Talonbranch Glade"],[64.5,8,"Timbermaw Hold (tunnel to Winterspring)"]]],
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

{ lv:"54–56", place:"Morgan's Vigil, Burning Steppes", title:"Burning Steppes", quests:{4182:"Dragonkin Menace"}, map:[["burning",[84,68,"Morgan's Vigil"],[65,24,"Flame Crest (black dragons)"],[28,36,"Blackrock Mountain"]]],
  done:"you're level 56 and have handed in <b>Dragonkin Menace</b>.", stuck:"Fight the Blackrock orcs around the zone until you are.",
  todo:[
    "Fly to Lakeshire and ride north into <b>Burning Steppes</b>, a scorched land of orcs and dragons. <b>Morgan's Vigil</b>, the Alliance camp, is just over the border. Unlock the flight path.",
    "Take every quest. <b>Dragonkin Menace</b> from Helendis Riverhorn (black dragonkin in the north) starts a very long chain that matters much later at 60.",
    "The Blackrock orcs all over the zone are targets for several quests.",
    "<b>Blackrock Depths</b>, a huge dungeon inside Blackrock Mountain (west), is great from 52 to 60. Go with a group. Move on at level 56."
  ],
  tip:"WoW Forever adds new dungeons for these levels too: <b>Blackmaw Hold</b> (55–60) and <b>Shaper's Terrace</b> (58–60). Look for them in the Looking For Group tool." },

{ lv:"55–57", place:"Chillwind Camp, Western Plaguelands", title:"Western Plaguelands", quests:{5215:"The Scourge Cauldrons"}, map:[["wpl",[43,84,"Chillwind Camp"],[37,57,"Felstone Field"],[46,52,"Dalson's Tears"],[53,66,"Writhing Haunt"],[62,58,"Gahrron's Withering"],[43,70,"Andorhal"]]],
  done:"you're level 57 and all four cauldrons are done.", stuck:"Fight the undead around Andorhal until you are.",
  todo:[
    "Fly to Southshore and ride north through the Alterac Mountains into <b>Western Plaguelands</b>. <b>Chillwind Camp</b> is just inside, in the south. Unlock the flight path.",
    "<b>The Scourge Cauldrons</b> chain: undead lords guard four cauldrons that poison the land, at Felstone Field, Dalson's Tears, the Writhing Haunt and Gahrron's Withering. Kill each lord and use his key on his cauldron.",
    "<b>Andorhal</b>, the ruined city in the middle, has more undead quests.",
    "Move on at level 57."
  ],
  tip:"Undead can't be Sapped or Pick Pocketed. Use Gouge or Blind on a second enemy instead." },

{ lv:"56", place:"Ironforge (fly from Chillwind Camp)", title:"Level 56: new ranks", map:[["stormwind",[75.8,59.8,"SI:7 (rogue trainers)"]]], learn:["food7"],
  done:"you've learned every new rank your trainer offers.",
  todo:[
    "Fly to Ironforge (the Forlorn Cavern) or Stormwind (SI:7) and learn every new rank.",
    "Better food: <b>Homemade Cherry Pie</b> from a baker. Put it on <kbd>Alt</kbd> + <kbd>2</kbd>.",
    "Fly back to Chillwind Camp and carry on."
  ] },

{ lv:"56–58", place:"Light's Hope, Eastern Plaguelands", title:"Eastern Plaguelands", map:[["epl",[81.5,59,"Light's Hope Chapel"],[36,90,"Darrowshire"],[7,43,"Tirion Fordring's house"],[27,11,"Stratholme"]]],
  done:"you're level 58.", stuck:"Fight the undead near Light's Hope Chapel until you are.",
  todo:[
    "Ride east into <b>Eastern Plaguelands</b> and follow the road to <b>Light's Hope Chapel</b> on the far east side. Unlock the flight path.",
    "The <b>Argent Dawn</b> at Light's Hope fight the undead. Their quests give good XP and reputation.",
    "In the ruined village of <b>Darrowshire</b> (south-west), talk to the little ghost girl <b>Pamela Redpath</b>. Her quests tell one of the saddest stories in WoW.",
    "In a small house by the river in the far west, <b>Tirion Fordring</b> starts the famous <b>Redemption</b> chain. Move on at level 58."
  ] },

{ lv:"58", place:"Ironforge or Stormwind", title:"Level 58: new ranks", map:[["stormwind",[75.8,59.8,"SI:7 (rogue trainers)"]]],
  done:"you've learned every new rank your trainer offers.",
  todo:[
    "Fly from Light's Hope Chapel to Ironforge or Stormwind and learn every new rank.",
    "Then head for Winterspring (next step): take the boat to Auberdine and fly to Talonbranch Glade in Felwood."
  ] },

{ lv:"58–60", place:"Everlook, Winterspring", title:"Winterspring", quests:{3783:"Are We There, Yeti?"}, map:[["felwood",[64.5,8,"Timbermaw Hold (tunnel)"]],["winterspring",[61,38.5,"Everlook"],[31,45,"Donova Snowden (hot springs)"],[67,36,"Winterfall Village (furbolgs)"]]],
  done:"you're level 60!", stuck:"Fight Winterfall furbolgs, or run Blackrock Depths with a group, until you are.",
  todo:[
    "Fly to Talonbranch Glade in Felwood and walk north through the <b>Timbermaw Hold</b> tunnel. It comes out in <b>Winterspring</b>, a snowy valley.",
    "At the hot springs, talk to <b>Donova Snowden</b>: her quests are about the Winterfall furbolgs.",
    "Follow the road east to <b>Everlook</b>, a goblin town. Unlock the flight path, make it your home and take every quest, like <b>Are We There, Yeti?</b> from Legacki.",
    "For the last bars of XP, run end-game dungeons with groups: Blackrock Depths, Lower Blackrock Spire, Dire Maul, Stratholme and Scholomance."
  ] },

{ lv:"60", place:"Nearest rogue trainer", title:"Level 60: Instant Poison VI", map:[["darnassus",[37,22,"Rogue trainers (Cenarion Enclave)"]]], learn:["ipois6","coldblood"],
  done:"Instant Poison VI is on your main hand, Cold Blood is on your right bar, and all 51 talent points are spent.",
  todo:[
    "Learn the last ranks and <b>Instant Poison VI</b>.",
    "Spend your last talent point on <b>Cold Blood</b>. That's all 51. Cold Blood is a button: put it on the right bar and press it before a big Eviscerate, which then always crits."
  ] },

{ lv:"60", place:"Mount Hyjal", title:"You made it to 60!", map:[["hyjal"]],
  todo:[
    "Visit <b>Mount Hyjal</b>, a new level 60 zone reached through Winterspring.",
    "From here on, it's about gear, dungeons and raids. Congratulations!"
  ] }
];

/* Talent points: which talent to click at each level. */
const TALENTS = [
  ["10–11", "Efficient Strikes (Combat tab)", "Click it 2 times (once per level)", "Sinister Strike costs less energy."],
  ["12–14", "Coup de Grace", "3 times", "Eviscerate hits harder."],
  ["15–16", "Precision", "2 times", "You miss less often."],
  ["17–19", "Deflection", "3 times", "You parry more attacks. Riposte needs all 3."],
  ["20", "Riposte", "Once", "A free counter-attack after you parry. Press it when it lights up."],
  ["21", "Precision", "Once more (3 of 3)", ""],
  ["22–23", "Composure", "2 times", "Poised saves you even more energy at the start of a fight."],
  ["24", "Endurance", "Once", "Sprint and Evasion come back sooner."],
  ["25", "Flawless Execution", "Once", "Eviscerate costs 15 less energy."],
  ["26–27", "Weapon Expertise", "2 times", "Enemies dodge and parry you less often."],
  ["28–29", "Aggression", "2 times", "Sinister Strike and Eviscerate hit harder."],
  ["30", "Blade Flurry", "Once", "For 15 seconds you attack faster and every hit also hits a second enemy."],
  ["31–34", "Hack and Slash", "4 times", "A bonus for whatever weapon you hold: swords, axes, maces, fists or daggers."],
  ["35–39", "Flash of Steel", "5 times", "Shank gives you more energy and is ready sooner."],
  ["40", "Adrenaline Rush", "Once", "Energy fills twice as fast for 15 seconds. Your big button."],
  ["41", "Hack and Slash", "Once more (5 of 5)", ""],
  ["42", "Aggression", "Once more (3 of 3)", ""],
  ["43–44", "Dual Wield Specialization", "2 times", "Your off-hand weapon hits harder."],
  ["45–46", "Remorseless Attacks (Assassination tab)", "2 times", "Switch to the Assassination tab now. After a kill, your next Sinister Strike is more likely to crit."],
  ["47–49", "Malice", "3 times", "More critical hits."],
  ["50–52", "Ruthlessness", "3 times", "Finishers sometimes give a free combo point."],
  ["53–54", "Malice", "2 more times (5 of 5)", ""],
  ["55", "Blood Splatter", "Once", "Rupture and Garrote last longer."],
  ["56–57", "Improved Slice and Dice", "2 times", "Slice and Dice lasts longer."],
  ["58–59", "Lethality", "2 times", "Your critical hits do more damage."],
  ["60", "Cold Blood", "Once", "A button: your next attack always crits. Use it before Eviscerate. That's all 51 points."]
];

/* Words a new player won't know. Matching is case-insensitive. */
const WORDS = {
  "buff": "A good effect on you, like Slice and Dice. Its icon shows at the top right of your screen.",
  "flight path": "Talk to a flight master (the person with a hippogryph or gryphon) once to unlock that place. Then you can fly between any places you've unlocked.",
  "trainer": "An NPC who teaches you new abilities for gold. Rogues need one every 2 levels.",
  "energy": "The yellow bar under your health. Rogue attacks cost energy instead of mana. It fills up by itself in a few seconds.",
  "combo points": "Small dots on the enemy's portrait. Sinister Strike and other attacks add them, up to 5. Finishers like Eviscerate use them all: more points, bigger effect.",
  "finisher": "An attack that uses up your combo points, like Eviscerate, Slice and Dice or Kidney Shot.",
  "opener": "An attack you can only use from Stealth, like Cheap Shot or Garrote. It starts the fight on your terms.",
  "stealth": "Makes you almost invisible. Enemies only notice you when you get very close. Attacking breaks it.",
  "poison": "Rogue-only. You make poisons and put them on your weapons, so your hits do extra damage.",
  "stun": "The enemy can't move or attack for a few seconds. Gouge, Cheap Shot and Kidney Shot stun.",
  "pull": "Starting a fight with an enemy, for example by hitting it or throwing a knife at it.",
  "auction house": "Where players buy and sell items. Every big city has one."
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
  riposte:      { name:"Riposte", lv:20, school:"phys", icon:"blade", talent:true, text:"Lights up after you parry. Press it for a free hit that disarms the enemy." },
  stealth:      { name:"Stealth", lv:1, school:"shadow", icon:"eye", text:"Makes you almost invisible. You move slower. Any attack breaks it. Start most fights from it." },

  cheapshot:    { name:"Cheap Shot", lv:26, school:"phys", icon:"burst", text:"Opener from Stealth. Stuns the enemy for a few seconds and gives 2 combo points." },
  backstab:     { name:"Backstab", lv:4, school:"phys", icon:"blade", text:"Big hit from behind. Needs a dagger in your main hand. Great from Stealth, or after Gouge." },
  garrote:      { name:"Garrote", lv:14, school:"phys", icon:"chain", text:"Opener from Stealth, behind the enemy. Makes it bleed for a while." },
  kidney:       { name:"Kidney Shot", lv:30, school:"phys", icon:"burst", text:"Finisher that stuns. More combo points, longer stun." },
  bladeflurry:  { name:"Blade Flurry", lv:30, school:"phys", icon:"blade", talent:true, text:"For 15 seconds you attack faster and every hit also hits a second enemy. For fights against two." },
  coldblood:    { name:"Cold Blood", lv:60, school:"phys", icon:"burst", talent:true, text:"Your next Sinister Strike, Backstab, Ambush or Eviscerate always crits. Press it right before a 5-point Eviscerate." },
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
  bladeflurry:"ability_warrior_punishingblow", coldblood:"spell_ice_lament", adrenaline:"spell_shadow_shadowworddominate", shadowmeld:"ability_ambush",
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
      ["-", [[20,"riposte"]]],
      ["=", [[1,"stealth"]]]
    ]},
  { id:"shift", title:"Bottom left bar", how:"Shift + 1 to =. Openers, stuns, emergencies and rarer abilities.",
    slots:[
      ["S1", [[26,"cheapshot"]]],
      ["S2", [[4,"backstab"]]],
      ["S3", [[14,"garrote"]]],
      ["S4", [[30,"kidney"]]],
      ["S5", [[30,"bladeflurry"]]],
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
      ["", [[60,"coldblood"]]]
    ]},
  { id:"alt", title:"Bottom right bar", how:"Alt + 1 and Alt + 2. Bandages and food. Use them after fights.",
    slots:[
      ["A1", [[10,"bandage1"],[14,"bandage2"],[20,"bandage3"],[24,"bandage4"],[28,"bandage5"],[32,"bandage6"],[36,"bandage7"],[40,"bandage8"],[46,"bandage9"],[52,"bandage10"]]],
      ["A2", [[1,"food1"],[5,"food2"],[15,"food3"],[25,"food4"],[35,"food5"],[45,"food6"],[55,"food7"]]]
    ]}
];

/* what's in a slot at a level */
