/* Settings the shared guide engine (assets/js/guide.js) reads for this character. */
const GUIDE_PAGE = {
  character: "nightelf-druid",
  saveKey: "nightElfDruidBeginner.v1",
  addonsHref: "../addons.html?c=nightelf-druid",
  abilityWord: "Spell",
  abilitiesWord: "spells",
  itemNote: { test: /^(food|water)/, text: "Food and water are items: buy them from a food or drink vendor (ask a guard), and they show up in your bags. Drag them from your bag (<kbd>B</kbd>) onto the key shown. In WoW: Forever you can eat and drink in any form. When a better one replaces an old one, drop the new one on the same key and use up the old ones." }
};

/* =========================================================
   Night Elf Druid — beginner guide
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

/* Training: from level 10 a druid can teleport to Moonglade any time, train with Loganaar there,
   and use the Hearthstone to get back. The class quests start in Darnassus with Mathrengyl Bearwalker. */
const MOONGLADE_TRAINER = ["moonglade",[52.5,40.6,"Loganaar (druid trainer)"],[56.2,30.6,"Dendrite Starblaze"],[44.1,45.2,"Silva Fil'naveth (flies to Darnassus)"],[48.1,67.3,"Sindrayl (flight master)"]];

const STEPS = [

/* ---------- Shadowglen, levels 1–6 ---------- */
{ chapter:"Shadowglen", lv:"1", place:"Shadowglen", title:"Before you do anything", map:[["teldrassil",[58.7,44.3,"You start here, under Aldrassil"]]], learn:["wrath","healingtouch","shadowmeld","eluneslight","hearth","food1","water1"],
  done:"every spell in the <b>Action bar</b> box below is on its key.",
  todo:[
    "Press <kbd>P</kbd> to open your spellbook.",
    "Drag each spell from your spellbook to the key shown in the <b>Action bar</b> box below. If the extra bars aren't showing yet, see <b>How to set this up in game</b> on the Action Bars tab.",
    "Your blue bar is <b>mana</b>. Every spell costs some. It fills up slowly by itself, much faster if you sit and drink water (<kbd>Alt</kbd> + <kbd>1</kbd>)."
  ],
  tip:"For now you're a little spellcaster. Your whole fight: <b>Wrath</b> (key <kbd>1</kbd>) from a distance, then hit with your staff when the enemy reaches you. Low on health? <b>Healing Touch</b> (key <kbd>5</kbd>). At level 10 you learn to turn into a bear, and at 20 into a cat." },

{ lv:"1", place:"Shadowglen", title:"Your first quest", quests:{456:"The Balance of Nature"}, pickup:{3120:"Verdant Sigil"}, map:[["teldrassil",[58.7,44.3,"Conservator Ilthalaine"],[60.5,48.5,"Young nightsabers and thistle boars"]]],
  done:"you've handed in <b>The Balance of Nature</b>, and its second part and <b>Verdant Sigil</b> are in your quest log.",
  todo:[
    "Talk to <b>Conservator Ilthalaine</b>, the night elf right in front of you. He has a yellow <b>!</b> over his head. Accept <b>The Balance of Nature</b>.",
    "Walk out into the glade and kill <b>7 young nightsabers</b> and <b>4 young thistle boars</b>.",
    "Go back to Ilthalaine. He now has a yellow <b>?</b>. Talk to him to turn in the quest. Then take <b>The Balance of Nature</b> part 2 and your druid quest, <b>Verdant Sigil</b>."
  ],
  tip:"How to fight: click a nightsaber to target it and press <kbd>1</kbd> to cast Wrath while it's still far away. Cast again until it reaches you, then just stand there: your character hits with the staff by itself. Don't move while casting, or the spell stops." },

{ lv:"1–2", place:"Shadowglen", title:"Meet your trainer", quests:{3120:"Verdant Sigil"}, map:[["teldrassil",[58.6,40.3,"Mardant Strongoak (inside Aldrassil)"],[58.7,44.3,"Ilthalaine"]]], learn:["motw"],
  done:"you've handed in <b>Verdant Sigil</b> and Mark of the Wild is on you and on your right bar.",
  todo:[
    "<b>Verdant Sigil</b> sends you to <b>Mardant Strongoak</b>, the druid trainer inside the big tree, Aldrassil. Walk up the ramp into the tree to find him.",
    "Turn it in and learn <b>Mark of the Wild</b>. Put it on the right bar and cast it on yourself (it lasts 30 minutes). It gives you more armor and a little of every stat.",
    "Cast it on other players you meet, too. They'll be happy."
  ],
  tip:"After every fight, if your health or mana is low, sit and eat or drink (<kbd>Alt</kbd> + <kbd>2</kbd> for food, <kbd>Alt</kbd> + <kbd>1</kbd> for water). It saves you from dying." },

{ lv:"2–4", place:"Shadowglen", title:"Grells, boars and a friend in need", quests:{458:"The Woodland Protector", 459:"The Woodland Protector", 457:"The Balance of Nature", 3519:"A Friend in Need"}, pickup:{916:"Webwood Venom", 4495:"A Good Friend", 3521:"Iverron's Antidote"}, map:[["teldrassil",[59.9,42.5,"Melithar Staghelm"],[57.8,45.2,"Tarindrella"],[55,42,"Grells"],[60.9,42,"Dirania Silvershine"],[54.6,33,"Iverron"]]],
  done:"you've handed in both parts of <b>The Woodland Protector</b> and <b>The Balance of Nature</b> part 2, and Dirania has given you <b>Iverron's Antidote</b>.", stuck:"Fight grells and thistle boars near Aldrassil until you're level 4.",
  todo:[
    "Take <b>The Woodland Protector</b> from <b>Melithar Staghelm</b> at the foot of Aldrassil and talk to <b>Tarindrella</b>, the dryad just south of the tree. She gives part 2: kill grells and grellkin west of the tree for <b>Fel Moss</b>, then hand it back to her.",
    "On the way, finish <b>The Balance of Nature</b> part 2: kill <b>7 mangy nightsabers</b> and <b>7 thistle boars</b>. Hand it in to Ilthalaine.",
    "Take <b>Webwood Venom</b> from <b>Gilshalan Windwalker</b> at the bottom of the ramp into Aldrassil. You do it in the next step.",
    "<b>Dirania Silvershine</b>, by the tree, gives <b>A Good Friend</b>. Walk north-west to <b>Iverron</b> at the mouth of Shadowthread Cave. He gives <b>A Friend in Need</b>: go back to Dirania and hand it in. She gives <b>Iverron's Antidote</b>."
  ],
  tip:"Grells stand in small groups. Cast Wrath at the one at the edge so its friends don't join in." },

{ lv:"4", place:"Mardant Strongoak (trainer)", title:"Level 4: Moonfire and Rejuvenation", map:[["teldrassil",[58.6,40.3,"Mardant Strongoak (druid trainer)"]]], learn:["moonfire","rejuv"],
  done:"Moonfire is on key <kbd>2</kbd> and Rejuvenation on key <kbd>3</kbd>.",
  todo:[
    "Go back to Mardant and learn <b>Moonfire</b> and <b>Rejuvenation</b>.",
    "<b>Moonfire</b> (key <kbd>2</kbd>) is instant: a quick hit plus a burn that keeps hurting the enemy. Cast it while you run, or right after your first Wrath.",
    "<b>Rejuvenation</b> (key <kbd>3</kbd>) is an instant heal that works slowly over 12 seconds. Put it on yourself when a fight starts to go badly."
  ],
  tip:"New fight: Wrath → Moonfire → Wrath until the enemy reaches you → finish it with your staff. Healing Touch or Rejuvenation if your health gets low." },

{ lv:"4–5", place:"Shadowglen", title:"Spiders, the antidote and the egg", quests:{3521:"Iverron's Antidote", 916:"Webwood Venom", 917:"Webwood Egg"}, map:[["teldrassil",[57,32.5,"Shadowthread Cave (webwood spiders)"],[54.6,33,"Iverron"],[56.5,37.5,"Ponds north-west of the tree (Moonpetal Lilies)"],[60.9,42,"Dirania Silvershine"],[59.6,38.6,"Gilshalan (foot of the ramp)"]]],
  done:"you've handed in <b>Iverron's Antidote</b> to Iverron, and <b>Webwood Venom</b> and <b>Webwood Egg</b> to Gilshalan.", stuck:"Fight the webwood spiders outside the cave until you're level 5.",
  todo:[
    "Gather the things for <b>Iverron's Antidote</b>: <b>7 Hyacinth Mushrooms</b> (they grow on the ground around the grell camps, and grells can drop them), <b>4 Moonpetal Lilies</b> (white flowers around the ponds north-west of Aldrassil) and <b>1 Webwood Ichor</b> (from a webwood spider).",
    "Kill webwood spiders outside <b>Shadowthread Cave</b> for <b>10 Webwood Venom Sacs</b> (Webwood Venom).",
    "Bring the ingredients to Dirania. She gives you the antidote: take it to Iverron at the cave mouth <b>before the timer runs out</b>. If time runs out, abandon the quest (quest log <kbd>L</kbd>, <b>Abandon</b>) and take it again from Dirania.",
    "Hand in Webwood Venom to Gilshalan and take <b>Webwood Egg</b>. In the cave, take the middle path at the first split, go straight, then follow the path up and round to the right. Pick up an egg and bring it back to Gilshalan."
  ],
  tip:"In caves, enemies stand close together. Pull them one at a time with Wrath and step back, so you don't pull their friends." },

{ lv:"5–6", place:"Shadowglen", title:"Leave Shadowglen", quests:{920:"Tenaron's Summons", 921:"Crown of the Earth"}, pickup:{2159:"Dolanaar Delivery"}, map:[["teldrassil",[59.6,38.6,"Tenaron Stormgrip (top of Aldrassil)"],[62.5,32.5,"Moonwell"],[61.2,47.6,"Porthannius"],[55.6,59.8,"Dolanaar"]]],
  done:"you've reached Dolanaar with <b>Dolanaar Delivery</b> and <b>Crown of the Earth</b> in your quest log.", stuck:"Fight nightsabers and boars along the road until you're level 6.",
  todo:[
    "Gilshalan gives <b>Tenaron's Summons</b>. Walk all the way up Aldrassil to <b>Tenaron Stormgrip</b> at the top and hand it in.",
    "Tenaron gives <b>Crown of the Earth</b>. Go to the <b>moonwell</b> north of the tree, use the empty phial from your bag while you stand at the well, and bring the full phial back to him. Take the next part: it goes to Corithras Moonrage in Dolanaar.",
    "Take <b>Dolanaar Delivery</b> from <b>Porthannius</b>, on the path out of the glade.",
    "Follow the road south out of the glade to the town of <b>Dolanaar</b>."
  ] },

/* ---------- Dolanaar, levels 6–12 ---------- */
{ chapter:"Dolanaar", lv:"6", place:"Dolanaar", title:"Make Dolanaar your home", quests:{2159:"Dolanaar Delivery", 928:"Crown of the Earth"}, map:[["teldrassil",[55.6,59.8,"Innkeeper Keldamyr"],[56.1,61.7,"Corithras Moonrage"]]], learn:["food2","water2"],
  done:"your Hearthstone says <b>Dolanaar</b> when you hover over it, and you've handed in <b>Dolanaar Delivery</b> and <b>Crown of the Earth</b>.",
  todo:[
    "Find <b>Innkeeper Keldamyr</b> and choose <b>Make this inn your home</b>. Hand <b>Dolanaar Delivery</b> to him too.",
    "Your <b>Hearthstone</b> (in your bag) now teleports you back here. It has a 1 hour cooldown.",
    "Hand <b>Crown of the Earth</b> to <b>Corithras Moonrage</b> and take the next part: fill a phial at the moonwell in <b>Starbreeze Village</b>.",
    "Better supplies: from level 5, buy <b>Tel'Abim Bananas</b> (food, <kbd>Alt</kbd> + <kbd>2</kbd>) and <b>Ice Cold Milk</b> (water, <kbd>Alt</kbd> + <kbd>1</kbd>) from the innkeeper.",
    "Your professions: druids pick <b>Herbalism + Alchemy</b>, and both trainers are in Dolanaar. Learn <b>Herbalism</b> from <b>Malorne Bladeleaf</b> and <b>Alchemy</b> from <b>Cyndra Kindwhisper</b>, next to the inn. From now on, pick every herb you pass. The <a href=\"../professions.html?c=nightelf-druid\">Professions page</a> has both routes, 1 to 300, step by step."
  ],
  tip:"Always log out inside an inn. You'll get bonus XP (called rested XP) when you come back." },

{ lv:"6", place:"Kal (trainer, Dolanaar)", title:"Level 6: Thorns", map:[["teldrassil",[56,61.6,"Kal (druid trainer)"]]], learn:["thorns"],
  done:"Thorns is on you and on your right bar.",
  todo:[
    "Dolanaar has its own druid trainer, <b>Kal</b>. Learn <b>Thorns</b> and the new rank of Healing Touch.",
    "Put Thorns on the right bar and cast it on yourself. It lasts 10 minutes: every enemy that hits you takes damage back. Keep it up all the time."
  ],
  tip:"Your buffs show as little icons at the top right of your screen. When Thorns or Mark of the Wild is gone, cast it again." },

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
    "Tallonkai gives <b>Ferocitas the Dream Eater</b>. The furbolg camp is just north of Starbreeze: kill the Gnarlpine Mystics your quest log asks for and <b>Ferocitas</b>. Right-click the necklace Ferocitas drops to get <b>Tallonkai's Jewel</b>, then bring it to Tallonkai. (Ferocitas comes back faster since a November hotfix, so you won't wait long.)",
    "Tallonkai then gives <b>Twisted Hatred</b>: kill the satyr <b>Lord Melenas</b> at the back of the <b>Fel Rock</b> cave, in the hills just north-west of Dolanaar, and bring his head back.",
    "<b>Syral Bladeleaf</b> in Dolanaar now gives <b>Seek Redemption!</b>: pick up <b>3 Fel Cones</b> (they lie on the ground under the big trees around Dolanaar) and give them to Zenn Foulhoof. Also take <b>Denalan's Earth</b> from Syral for the next step."
  ],
  tip:"Furbolgs come in groups. Pull one with Wrath from as far away as you can, and fight it where its friends can't see." },

{ lv:"8", place:"Kal (trainer, Dolanaar)", title:"Level 8: Entangling Roots", map:[["teldrassil",[56,61.6,"Kal (druid trainer)"]]], learn:["roots"],
  done:"Entangling Roots is on key <kbd>6</kbd>.",
  todo:[
    "Learn <b>Entangling Roots</b> and the new ranks of Wrath and Rejuvenation. Put Entangling Roots on key <kbd>6</kbd>.",
    "Roots hold an enemy in place for a while. It can still hit you if you stand next to it, so root it, step back and cast Wrath. Any damage can break the roots early.",
    "Roots are also your escape: root the enemy and walk away."
  ] },

{ lv:"8–10", place:"Lake Al'Ameth", title:"Denalan's seeds", quests:{997:"Denalan's Earth", 918:"Timberling Seeds", 919:"Timberling Sprouts"}, pickup:{922:"Rellian Greenspyre"}, map:[["teldrassil",[60.9,68.5,"Denalan"],[56,72,"Timberlings"],[53.8,75.1,"Oakenscowl's cave (elite)"]]],
  done:"you've handed in <b>Denalan's Earth</b>, <b>Timberling Seeds</b> and <b>Timberling Sprouts</b> to Denalan, and you're level 10.", stuck:"Fight timberlings around the lake until you are.",
  todo:[
    "Go south to <b>Denalan</b>, who camps on the north-east shore of <b>Lake Al'Ameth</b>. Hand in <b>Denalan's Earth</b>.",
    "<b>Timberling Seeds</b>: kill timberlings along the lake shore for their seeds. <b>Timberling Sprouts</b>: pick up the little sprouts growing on the ground in the same area. Hand both back to Denalan.",
    "Denalan then gives <b>Rellian Greenspyre</b>. Keep it: you hand it in in Darnassus.",
    "Skip <b>Oakenscowl</b> unless you have a group. He's an <b>elite</b>."
  ],
  tip:"Timberlings are nature creatures, so Wrath doesn't hurt them much. Moonfire and your staff work better on them." },

{ lv:"10", place:"Kal (trainer, Dolanaar)", title:"Level 10: Nature's Grasp and your first talent", pickup:{5925:"Heeding the Call"}, map:[["teldrassil",[56,61.6,"Kal (druid trainer)"]]], learn:["naturesgrasp"],
  done:"Nature's Grasp is on key <kbd>7</kbd>, your talent point is spent, and <b>Heeding the Call</b> is in your quest log.",
  todo:[
    "Learn <b>Nature's Grasp</b> (a spell every druid gets in WoW: Forever) and the new ranks. Put it on key <kbd>7</kbd>. Press it before a fight: the next enemy that hits you is rooted in place. Great for running away.",
    "Press <kbd>N</kbd> to open talents. Click the <b>Feral Combat</b> tab and put your point into <b>Ferocity</b>. Your build is <b>Feral</b>: you'll fight as a bear now and as a cat from level 20.",
    "Kal also gives your druid quest, <b>Heeding the Call</b>. It sends you to Mathrengyl Bearwalker in Darnassus, and it's how you learn <b>Bear Form</b>."
  ],
  tip:"The Talents tab of this guide shows which talent to click at every level." },

/* ---------- Darnassus, Moonglade and western Teldrassil ---------- */
{ chapter:"Darnassus & Bear Form", lv:"10", place:"Darnassus", title:"Visit Darnassus", quests:{922:"Rellian Greenspyre", 5925:"Heeding the Call"}, pickup:{487:"The Road to Darnassus", 5921:"Moonglade"}, map:[["teldrassil",[39,49,"The road west to Darnassus"]],["darnassus",[63,61,"You come in here"],[35.4,8.4,"Mathrengyl Bearwalker (Cenarion Enclave)"],[34.8,7.7,"Druid trainers"]]], learn:["teleport"],
  done:"you've handed in <b>Heeding the Call</b> and <b>Rellian Greenspyre</b>, learned Cooking, and Teleport: Moonglade is on your right bar.",
  todo:[
    "Follow the road west from Dolanaar to the city of <b>Darnassus</b>. On the road, <b>Moon Priestess Amara</b> gives <b>The Road to Darnassus</b>: kill the Gnarlpine Ambushers that jump out along the road. Hand it back to her.",
    "In Darnassus, go to the <b>Cenarion Enclave</b> in the north (click any guard and they mark it on your map). Hand <b>Heeding the Call</b> to <b>Mathrengyl Bearwalker</b>. He teaches you <b>Teleport: Moonglade</b> and gives the next part, <b>Moonglade</b>.",
    "Hand in <b>Rellian Greenspyre</b> to Rellian (ask a guard where he is).",
    "Learn <b>Cooking</b> in town: cooked food gives you bonus XP for a while in WoW: Forever, and you need Cooking to set up your own camp. Your Herbalism and Alchemy can go up to 150 here: Darnassus's alchemy trainers are in the Craftsmen's Terrace, and Firodren Mooncaller teaches Herbalism in the Temple Gardens. See the <a href=\"../professions.html?c=nightelf-druid\">Professions page</a>."
  ],
  tip:"Teleport: Moonglade takes you to Moonglade, a peaceful valley in the north of Kalimdor with its own druid trainer. From now on that's how you train: teleport, train, then use your Hearthstone to get back." },

{ lv:"10", place:"Moonglade", title:"Moonglade: the Great Bear Spirit", quests:{5921:"Moonglade", 5929:"Great Bear Spirit", 5931:"Back to Darnassus"}, pickup:{6001:"Body and Heart"}, map:[["moonglade",[56.2,30.6,"Dendrite Starblaze (Nighthaven)"],[39.1,27.5,"Great Bear Spirit"],[44.1,45.2,"Silva Fil'naveth (flight to Darnassus)"]],["darnassus",[35.4,8.4,"Mathrengyl Bearwalker"]]],
  done:"you've handed in <b>Back to Darnassus</b> and <b>Body and Heart</b> is in your quest log.",
  todo:[
    "Cast <b>Teleport: Moonglade</b> (right bar). In Nighthaven, go into the building right in front of you and up the stairs: hand <b>Moonglade</b> to <b>Dendrite Starblaze</b> and take <b>Great Bear Spirit</b>.",
    "Walk north-west out of the village to the <b>Great Bear Spirit</b>, a big glowing bear. Talk to it until it has nothing more to say, then go back to Dendrite. He gives <b>Back to Darnassus</b>.",
    "Talk to <b>Silva Fil'naveth</b>, the druid flight master in the middle of Nighthaven. She flies you to Rut'theran Village, at the foot of Teldrassil, even if you've never been there. Step into the pink portal to go up to Darnassus.",
    "Hand <b>Back to Darnassus</b> to Mathrengyl and take <b>Body and Heart</b>. You do it in Darkshore at level 12 (it's on the way)."
  ],
  tip:"Moonglade is safe: nobody attacks you there. Have a look around, it's beautiful." },

{ lv:"10–11", place:"Western Teldrassil", title:"Ban'ethil Barrow Den", quests:{2541:"The Sleeping Druid", 2561:"Druid of the Claw"}, pickup:{483:"The Relics of Wakening", 486:"Ursal the Mauler", 933:"Crown of the Earth"}, map:[["teldrassil",[44.9,61.6,"Oben Rageclaw (inside the den)"],[44.5,59.5,"Ban'ethil Barrow Den"],[42,67,"Pools of Arlithrien (moonwell, Ursal)"],[55.6,59.8,"Dolanaar"]]],
  done:"you've finished <b>The Relics of Wakening</b> and <b>Druid of the Claw</b>, and the Pools of Arlithrien phial is full.", stuck:"Fight the furbolgs around Ban'ethil Barrow until you're level 11.",
  todo:[
    "Back in Dolanaar (use your Hearthstone), take <b>The Relics of Wakening</b> and <b>Ursal the Mauler</b> from Athridas and the next <b>Crown of the Earth</b> phial from Corithras.",
    "<b>Ban'ethil Barrow Den</b> is the furbolg cave west of Dolanaar. <b>The Relics of Wakening</b>: open the chests inside for the <b>Raven Claw Talisman</b>, <b>Black Feather Quill</b>, <b>Sapphire of Sky</b> and <b>Rune of Nesting</b>.",
    "Inside the den, the ghost <b>Oben Rageclaw</b> gives <b>The Sleeping Druid</b>: kill Gnarlpine shamans until one drops a <b>Shaman Voodoo Charm</b> (it can take a while). Then <b>Druid of the Claw</b>: use the charm on the bear at the bottom of the den, kill it, and go back to Oben.",
    "Fill the phial at the moonwell by the <b>Pools of Arlithrien</b>, south-west of the den (Crown of the Earth). <b>Ursal the Mauler</b> is the furbolg leader in the camps there: leave him until you're level 11, he hits hard."
  ],
  tip:"Inside the den, root one furbolg with Entangling Roots and fight the other, so you never fight two at once." },

{ lv:"11–12", place:"Oracle Glade", title:"Oracle Glade and the lost cub", quests:{483:"The Relics of Wakening", 486:"Ursal the Mauler", 938:"Mist", 7383:"Crown of the Earth"}, pickup:{935:"Crown of the Earth"}, map:[["teldrassil",[38.3,34.4,"Sentinel Arynia Cloudsbreak (Oracle Glade)"],[38.4,34.1,"Moonwell"],[31.5,31.6,"Mist (nightsaber cub)"],[55.6,59.8,"Dolanaar"]]],
  done:"Mist is home, you've handed in your Dolanaar quests, and you're level 12.", stuck:"Fight the furbolgs at the Pools of Arlithrien until you are.",
  todo:[
    "Go north past Darnassus to the <b>Oracle Glade</b>. Fill the next phial at the moonwell there (Crown of the Earth).",
    "Find <b>Mist</b>, the lost nightsaber cub, at the far north-west point of the island. Talk to her and lead her back to <b>Sentinel Arynia Cloudsbreak</b> at the Oracle Glade.",
    "Back in Dolanaar: hand in <b>The Relics of Wakening</b> and <b>Ursal the Mauler</b> to Athridas and the phial to Corithras. Take the last part of <b>Crown of the Earth</b>: it goes to Arch Druid Fandral Staghelm in Darnassus."
  ] },

{ lv:"12", place:"Kal (trainer, Dolanaar)", title:"Level 12: Regrowth and Revive", map:[["teldrassil",[56,61.6,"Kal (druid trainer)"]]], learn:["regrowth","revive"],
  done:"Regrowth is on key <kbd>4</kbd>, Revive is on your right bar and your talent points are spent.",
  todo:[
    "Learn <b>Regrowth</b>, <b>Revive</b> and the new ranks.",
    "<b>Regrowth</b> (key <kbd>4</kbd>) is a quick heal plus a slow one afterwards. Good after a fight, or in the middle of one.",
    "<b>Revive</b> brings a dead player back to life when you're out of combat. Only druids in WoW: Forever have it from level 12.",
    "Spend your talent points (<kbd>N</kbd>). The Talents tab of this guide tells you which one."
  ],
  tip:"From now on, train every even level and spend a talent point every level." },

{ lv:"12", place:"Darnassus → Rut'theran Village", title:"Crown of the Earth, then fly to Darkshore", quests:{935:"Crown of the Earth", 98046:"Crown of the Earth", 98065:"Crown of the Earth", 6344:"Nessa Shadowsong", 6341:"The Bounty of Teldrassil"}, pickup:{952:"Grove of the Ancients", 6342:"Flight to Auberdine"}, map:[["darnassus",[34.8,9.3,"Arch Druid Fandral Staghelm (Cenarion Enclave)"],[40.4,88.7,"Lariia (Temple of the Moon)"],[39.1,81.6,"Tyrande Whisperwind"],[70.7,45.4,"Mydrannul (Nessa Shadowsong)"]],["teldrassil",[56.3,92.4,"Nessa Shadowsong"],[58.4,94,"Vesprystus (flight master)"]],["darkshore",[36.3,45.6,"Auberdine: you land here"]]],
  done:"you've finished <b>Crown of the Earth</b> with Tyrande and landed in Auberdine.",
  todo:[
    "In Darnassus, hand <b>Crown of the Earth</b> to <b>Arch Druid Fandral Staghelm</b> at the top of the Cenarion Enclave's main building. Take <b>Grove of the Ancients</b> from him too: you hand it in to Onu in Darkshore.",
    "WoW: Forever adds two more parts: Fandral sends you to <b>Lariia</b> in the <b>Temple of the Moon</b> (the big temple in the south of the city), and Lariia sends you to <b>Tyrande Whisperwind</b>, the high priestess, in the same temple.",
    "Take the quest <b>Nessa Shadowsong</b> from Mydrannul near the Darnassus entrance and step into the pink portal to <b>Rut'theran Village</b> at the bottom of the tree.",
    "Turn in to Nessa and take <b>The Bounty of Teldrassil</b>. Talk to <b>Vesprystus</b>, the hippogryph master, and take <b>Flight to Auberdine</b>. Fly to <b>Auberdine</b> in Darkshore."
  ] },

/* ---------- Darkshore, levels 12–19 ---------- */
{ chapter:"Darkshore", lv:"12", place:"Auberdine", title:"Your new home: Auberdine", quests:{6342:"Flight to Auberdine"}, pickup:{983:"Buzzbox 827", 3524:"Washed Ashore", 2118:"Plagued Lands", 984:"How Big a Threat?", 954:"Bashal'Aran", 958:"Tools of the Highborne", 953:"The Fall of Ameth'Aran", 4811:"The Red Crystal", 947:"Cave Mushrooms"}, map:[["darkshore",[37,44.1,"Innkeeper Shaussiy"],[36.3,45.6,"Flight master"]]],
  done:"Auberdine is your home and the quests above are in your log.",
  todo:[
    "Hand in <b>Flight to Auberdine</b> to Laird. Make the inn your home and talk to the flight master so you can fly here later.",
    "Take every quest in town: <b>Buzzbox 827</b> (Wizbang Cranktoggle, the gnome), <b>Washed Ashore</b> (Gwennyth Bly'Leggonde), <b>Plagued Lands</b> (Tharnariun Treetender), <b>How Big a Threat?</b>, <b>Bashal'Aran</b> and <b>Tools of the Highborne</b> (Thundris Windweaver), <b>The Fall of Ameth'Aran</b> (Sentinel Tysha Moonblade), <b>The Red Crystal</b> and <b>Cave Mushrooms</b>.",
    "Your quest log (<kbd>L</kbd>) says how many of each thing you need. Check it before you leave town."
  ] },

{ lv:"12", place:"Moonkin Stone, Darkshore", title:"Level 12: Bear Form!", quests:{6001:"Body and Heart"}, map:[["darkshore",[43.5,46,"Moonkin Stone"],[36.3,45.6,"Auberdine flight master"]],["darnassus",[35.4,8.4,"Mathrengyl Bearwalker"]]], learn:["bearform","maul","growl","demoroar","enrage"],
  done:"you're a bear: Bear Form is on <kbd>Shift</kbd> + <kbd>1</kbd>, and Maul, Growl, Demoralizing Roar and Enrage are on your bear bar.",
  todo:[
    "<b>Body and Heart</b>: walk east out of Auberdine, across the road, to the <b>Moonkin Stone</b> in the moonkin camp. Use the <b>Cenarion Moondust</b> from your bags next to the stone. <b>Lunaclaw</b>, a big spirit bear, appears and attacks.",
    "Fight Lunaclaw with Moonfire, Wrath, Roots and your heals (put Rejuvenation on yourself before you start). When he's beaten, talk to his spirit: it gives you the strength of the bear.",
    "Fly from Auberdine to Rut'theran Village, take the portal up, and hand in <b>Body and Heart</b> to Mathrengyl. You learn <b>Bear Form</b>, <b>Growl</b> and <b>Maul</b>. Learn <b>Demoralizing Roar</b> and <b>Enrage</b> from the druid trainers next to him.",
    "Put Bear Form on <kbd>Shift</kbd> + <kbd>1</kbd> and press it. Your main bar changes: this is your <b>bear bar</b>. Drag Maul to <kbd>1</kbd>, Demoralizing Roar to <kbd>3</kbd>, Growl to <kbd>6</kbd> and Enrage to <kbd>8</kbd> while you're a bear. Fly back to Auberdine."
  ],
  tip:"Bear Form is your new way to fight until level 20: pull with Moonfire, press <kbd>Shift</kbd> + <kbd>1</kbd>, then Maul (key <kbd>1</kbd>) whenever you have rage. Bears are tough, so you rarely need to heal during a fight. Press <kbd>Shift</kbd> + <kbd>1</kbd> again to turn back into a night elf." },

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

{ lv:"14", place:"Darnassus, then Moonglade", title:"Level 14: Bash and the poison lesson", quests:{6121:"Lessons Anew"}, pickup:{6122:"The Principal Source"}, map:[["darnassus",[35.4,8.4,"Mathrengyl Bearwalker"],[34.8,7.7,"Druid trainers"]],MOONGLADE_TRAINER], learn:["bash"],
  done:"Bash is on key <kbd>7</kbd> of your bear bar and <b>The Principal Source</b> is in your quest log.",
  todo:[
    "Fly from Auberdine to Rut'theran Village and take the portal up to Darnassus. Learn <b>Bash</b> and the new ranks from the druid trainers.",
    "Mathrengyl gives <b>Lessons Anew</b>, the first quest for <b>Cure Poison</b>. Cast <b>Teleport: Moonglade</b> and hand it to Dendrite Starblaze. He gives <b>The Principal Source</b>.",
    "Walk south out of Nighthaven to <b>Sindrayl</b>, the hippogryph master at the south end of Moonglade, and talk to her: from now on she can fly you to any Kalimdor flight path you know. Fly to Auberdine.",
    "<b>Bash</b> (bear bar, key <kbd>7</kbd>) knocks the enemy out for a few seconds. Use it to stop a spell, or when you need a quick break to heal."
  ],
  tip:"Your mana is hidden while you're in a form. To always see it: <kbd>Esc</kbd> → <b>Options</b> → <b>Combat</b> → turn on <b>Personal Resource Display</b>. You need mana to change form and to heal." },

{ lv:"14–16", place:"Northern Darkshore", title:"The north: Buzzboxes, Blackwood camps and the tower", quests:{1001:"Buzzbox 411", 985:"How Big a Threat?", 2138:"Cleansing of the Infected", 4763:"The Blackwood Corrupted", 965:"The Tower of Althalaxx", 966:"The Tower of Althalaxx"}, pickup:{1002:"Buzzbox 323", 947:"Cave Mushrooms"}, map:[["darkshore",[51,35,"Blackwood camps"],[54.9,33.3,"Cliffspring Falls (cave mouth)"],[55,25,"Tower of Althalaxx"],[38,29,"Northern beach (threshers, Buzzbox 411)"]]],
  done:"you've handed in <b>Buzzbox 411</b>, <b>How Big a Threat?</b> part 2, <b>Cleansing of the Infected</b>, <b>The Blackwood Corrupted</b> and the first <b>Tower of Althalaxx</b> quests, you've filled the Cliffspring Falls Sampler, and you're level 16.", stuck:"Fight the Blackwood furbolgs at their camps until you are.",
  todo:[
    "Follow the coast north. Kill <b>threshers</b> in the water for <b>3 Thresher Eyes</b> and hand them in at the <b>Buzzbox 411</b> machine on the northern beach. It gives <b>Buzzbox 323</b>: kill moonstalkers for it as you go.",
    "<b>The Blackwood Corrupted</b>: fill the empty bowl at the Auberdine moonwell. Take a grain, a nut and a fruit sample from the three Blackwood furbolg camps, put the bowl by the bonfire at the last camp, and kill the demon that appears. Finish <b>How Big a Threat?</b> part 2 and <b>Cleansing of the Infected</b> around the same camps.",
    "<b>Cave Mushrooms</b>: they grow in the cave behind <b>Cliffspring Falls</b>. <b>The Principal Source</b>: stand in the water at the mouth of that cave and use the <b>Empty Cliffspring Falls Sampler</b> from your bags.",
    "<b>The Tower of Althalaxx</b>: at the tower in the far north, talk to <b>Balthule Shadowstrike</b> and kill the Dark Strand cultists his quests ask for. The last Darkshore part sends you to Delgren the Purifier at Maestra's Post in Ashenvale."
  ],
  tip:"Darkshore has a free bag: finish the <b>Buzzbox</b> chain (827, 411, 323, 525) and take <b>Wizbang's Gunnysack</b> as the reward. Buzzbox 525 wants scalps from the grizzled thistle bears." },

{ lv:"15–16", place:"Auberdine and the moonkin caves", title:"Druid quest: the cure for the deer", quests:{6122:"The Principal Source", 6123:"Gathering the Cure"}, pickup:{6124:"Curing the Sick"}, map:[["darkshore",[37.7,40.7,"Alanndarian Nightsong (Auberdine)"],[45.9,50.2,"Lunar Fungus (moonkin caves)"],[43.5,46,"Moonkin camp"]]],
  done:"you've handed in <b>Gathering the Cure</b> and cured 10 Sickly Deer.", stuck:"Fight the moonkin around the caves until you're level 16.",
  todo:[
    "Hand the <b>Filled Cliffspring Falls Sampler</b> to <b>Alanndarian Nightsong</b> in Auberdine. She gives <b>Gathering the Cure</b>: <b>5 Earthroot</b> and <b>12 Lunar Fungus</b>.",
    "Earthroot is a herb. With Herbalism, pick it in Darkshore. Without it, buy 5 at the Darnassus auction house the next time you're there.",
    "<b>Lunar Fungus</b>: cross the road east of Auberdine to the moonkin camp. The glowing <b>Lunar Fungal Bloom</b> mushrooms grow on the ground around and inside the little caves. Fight the moonkin as a bear.",
    "Hand both to Alanndarian. She gives <b>Curing the Sick</b> and a <b>Curative Animal Salve</b>: click a <b>Sickly Deer</b> (they wander all over Darkshore, with a green glow) and use the salve on it. Cure 10. Keep the quest: you hand it in in Moonglade at level 16."
  ] },

{ lv:"16", place:"Moonglade, then Darnassus", title:"Level 16: Swipe and Cure Poison", quests:{6124:"Curing the Sick", 6125:"Power over Poison"}, pickup:{26:"A Lesson to Learn"}, map:[MOONGLADE_TRAINER,["darnassus",[35.4,8.4,"Mathrengyl Bearwalker"]]], learn:["swipe","curepoison"],
  done:"Swipe is on key <kbd>2</kbd> of your bear bar, Cure Poison is on key <kbd>8</kbd>, and <b>A Lesson to Learn</b> is in your quest log.",
  todo:[
    "Cast <b>Teleport: Moonglade</b>. Hand <b>Curing the Sick</b> to Dendrite Starblaze and take <b>Power over Poison</b>. Learn <b>Swipe</b> and the new ranks from <b>Loganaar</b>, the druid trainer in Nighthaven.",
    "Fly with Silva Fil'naveth to Darnassus and hand <b>Power over Poison</b> to Mathrengyl. You learn <b>Cure Poison</b>: put it on key <kbd>8</kbd>. When a spider or a snake poisons you, cure it.",
    "Mathrengyl also gives <b>A Lesson to Learn</b>, the quest for <b>Aquatic Form</b>. Teleport to Moonglade again for it (next step).",
    "<b>Swipe</b> (bear bar, key <kbd>2</kbd>) hits every enemy in front of you. Use it when two or more fight you."
  ] },

{ lv:"16", place:"Moonglade", title:"Moonglade: Trial of the Lake", quests:{26:"A Lesson to Learn", 29:"Trial of the Lake"}, pickup:{272:"Trial of the Sea Lion"}, map:[["moonglade",[56.2,30.6,"Dendrite Starblaze"],[48,47.1,"Lake Elune'ara (Shrine Bauble on the bottom)"],[36,41.4,"Shrine of Remulos"],[36.5,40.1,"Tajarri"],[48.1,67.3,"Sindrayl (flight master)"]]],
  done:"you've handed in <b>Trial of the Lake</b> to Tajarri and <b>Trial of the Sea Lion</b> is in your quest log.",
  todo:[
    "Cast <b>Teleport: Moonglade</b> and hand <b>A Lesson to Learn</b> to Dendrite. He gives <b>Trial of the Lake</b>.",
    "Swim down to the bottom of <b>Lake Elune'ara</b>, the big lake in the middle of the valley, and look for a <b>Shrine Bauble</b> (a small glowing object). It can be in different places. The bubbles rising from the lake floor give you air.",
    "The bauble only lasts 5 minutes. Run straight to the <b>Shrine of Remulos</b> in the north-west of the valley and use it from your bags there. Then talk to <b>Tajarri</b> next to the shrine to finish the trial.",
    "Tajarri gives <b>Trial of the Sea Lion</b>: find two halves of a pendant, one in Darkshore and one in Westfall. Fly from Sindrayl back to Auberdine."
  ] },

{ lv:"16–17", place:"Northern Darkshore coast", title:"The first pendant half", map:[["darkshore",[48.9,11.3,"Strange Lockbox (under water)"],[55,25,"Tower of Althalaxx"]]],
  done:"the <b>Half Pendant of Aquatic Agility</b> is in your bags.",
  todo:[
    "Ride north to the top of Darkshore. From the beach, swim out to sea, to the north of the coast (the pin on the map). On the sea floor there's a <b>Strange Lockbox</b>. Open it for the <b>Half Pendant of Aquatic Agility</b>.",
    "Watch your breath bar (it appears when you're under water) and come up for air before it runs out.",
    "The other half is in a lockbox off the coast of Westfall, far away in the Eastern Kingdoms. You get it at level 20, when you sail there (a later step)."
  ] },

{ lv:"17–19", place:"Southern Darkshore", title:"The southern loop", quests:{982:"Deep Ocean, Vast Sea", 4740:"WANTED: Murkdeep!", 948:"Onu", 944:"The Master's Glaive", 949:"The Twilight Camp", 950:"Return to Onu"}, pickup:{947:"Cave Mushrooms", 952:"Grove of the Ancients", 5321:"The Sleeper Has Awakened"}, map:[["darkshore",[36,76,"Murkdeep's camp"],[43.6,76.3,"Onu (Grove of the Ancients)"],[35.7,83.7,"Prospector Remtravel (group quest)"]]],
  done:"Murkdeep is dead, you've handed in <b>Deep Ocean, Vast Sea</b> and Onu's quests, Kerlonian is following you, and you're level 19.", stuck:"Fight the murlocs and bears in southern Darkshore until you are.",
  todo:[
    "<b>Deep Ocean, Vast Sea</b> (Gorbold Steelhand, Auberdine): swim out to the two sunken ships off the coast and loot the lockboxes in the wrecks. Watch your breath bar and the murlocs.",
    "<b>WANTED: Murkdeep!</b> (the poster in Auberdine): at the murloc camp on the southern coast, kill the murlocs that come out until Murkdeep himself shows up. Bear Form and Swipe make the murloc waves easy.",
    "Hand in <b>Cave Mushrooms</b>. It leads to <b>Onu</b> at the Grove of the Ancients: give him <b>Grove of the Ancients</b> too. Do his <b>The Master's Glaive</b> and <b>The Twilight Camp</b>, then <b>Return to Onu</b>.",
    "<b>The Sleeper Has Awakened</b>: wake Kerlonian Evershade and walk him south to Maestra's Post in Ashenvale. You start the quest with the <b>Horn of Awakening</b>: when he falls asleep on the way, use it on him.",
    "Skip <b>The Absent Minded Prospector</b> unless you have a group: one part is a group quest."
  ] },

{ lv:"18", place:"Moonglade (teleport)", title:"Level 18: Faerie Fire and Hibernate", map:[MOONGLADE_TRAINER], learn:["faeriefire","hibernate"],
  done:"Faerie Fire is on <kbd>Shift</kbd> + <kbd>5</kbd> and Hibernate on key <kbd>0</kbd>.",
  todo:[
    "Cast <b>Teleport: Moonglade</b> and learn <b>Faerie Fire</b>, <b>Hibernate</b> and the new ranks from Loganaar. Then use your Hearthstone to go back to Auberdine.",
    "<b>Faerie Fire</b> (<kbd>Shift</kbd> + <kbd>5</kbd>) works in every form. It lowers the enemy's armor, and it's a great way to pull one enemy from a distance without leaving Bear Form.",
    "<b>Hibernate</b> (key <kbd>0</kbd>) puts a beast or a dragon to sleep. It doesn't work on humanoids. Any damage wakes it up."
  ],
  tip:"This is how a druid trains from now on: Teleport: Moonglade → Loganaar → Hearthstone home. It takes two minutes, wherever you are." },

{ lv:"19–20", place:"Darkshore → Ashenvale", title:"Into Ashenvale", quests:{5321:"The Sleeper Has Awakened", 967:"The Tower of Althalaxx"}, map:[["darkshore",[44,92,"Road south to Ashenvale"]],["ashenvale",[26.2,38.7,"Maestra's Post"],[36.5,49.5,"Astranaar"]]],
  done:"you've handed in <b>The Sleeper Has Awakened</b>, Astranaar is your home and you've unlocked its flight path.",
  todo:[
    "Follow the road south out of Darkshore into <b>Ashenvale</b>, with Kerlonian behind you.",
    "Stop at <b>Maestra's Post</b>. Hand in <b>The Sleeper Has Awakened</b> to Liladris Moonriver and your <b>Tower of Althalaxx</b> quest to <b>Delgren the Purifier</b>.",
    "Follow the road east to <b>Astranaar</b>. Make the inn your home and unlock the flight path."
  ] },

/* ---------- Level 20: Cat Form ---------- */
{ chapter:"Cat Form", lv:"20", place:"Darnassus, then Moonglade", title:"Level 20: The Great Cat Spirit", quests:{98393:"The Great Cat Spirit", 98394:"The Great Cat Spirit", 98396:"The Great Cat Spirit", 98731:"Blessings of the Great Cat Spirit"}, pickup:{98397:"To Darnassus"}, map:[["darnassus",[35.4,8.4,"Mathrengyl Bearwalker"]],["moonglade",[56.2,30.6,"Dendrite Starblaze"],[58.4,73.5,"Great Cat Spirit"],[72.4,66,"Relic of the Fang"],[75.2,67.2,"Relic of the Claw"],[74.4,65.4,"Relic of the Silent Shadow"]]],
  done:"you've handed <b>Blessings of the Great Cat Spirit</b> to Dendrite and <b>To Darnassus</b> is in your quest log.",
  todo:[
    "In WoW: Forever, Cat Form comes from a quest. Fly from Astranaar to Rut'theran Village and go up to Darnassus. Mathrengyl gives <b>The Great Cat Spirit</b>.",
    "Cast <b>Teleport: Moonglade</b> and hand it to Dendrite. He sends you to the <b>Great Cat Spirit</b> in the south of Moonglade.",
    "The spirit asks for three relics from the <b>Stormrage Barrow Den</b>, the barrow east of it: the <b>Relic of the Fang</b>, the <b>Relic of the Claw</b> and the <b>Relic of the Silent Shadow</b>. Bring them back to the spirit.",
    "Take <b>Blessings of the Great Cat Spirit</b> back to Dendrite in Nighthaven. He gives <b>To Darnassus</b>."
  ] },

{ lv:"20", place:"Darnassus", title:"Level 20: Cat Form!", quests:{98397:"To Darnassus"}, map:[["darnassus",[35.4,8.4,"Mathrengyl Bearwalker"],[34.8,7.7,"Druid trainers"]],["moonglade",[44.1,45.2,"Silva Fil'naveth (flight to Darnassus)"]]], learn:["catform","claw","rip","prowl","shred","rebirth","feralchargecat","feralcharge"],
  done:"Cat Form is on <kbd>Shift</kbd> + <kbd>2</kbd>, your cat bar is set up, and Feral Charge is on both form bars.",
  todo:[
    "Fly with Silva Fil'naveth to Darnassus and hand <b>To Darnassus</b> to Mathrengyl. You learn <b>Cat Form</b>, <b>Claw</b>, <b>Prowl</b> and <b>Rip</b>. Learn <b>Shred</b>, <b>Rebirth</b> and the new ranks from the trainers.",
    "Put Cat Form on <kbd>Shift</kbd> + <kbd>2</kbd> and press it. Your main bar changes again: this is your <b>cat bar</b>. Drag Claw to <kbd>1</kbd>, Rip to <kbd>2</kbd>, Shred to <kbd>5</kbd> and Prowl to <kbd>=</kbd> while you're a cat.",
    "Talent: <b>Feral Charge</b>. In WoW: Forever it works as a cat too: put <b>Feral Charge (Cat)</b> on key <kbd>-</kbd> of the cat bar and <b>Feral Charge</b> on key <kbd>9</kbd> of the bear bar. It jumps you to the enemy.",
    "From now on you fight as a cat. Bear Form is for when a fight goes wrong, or for tanking a dungeon."
  ],
  tip:"How a cat fights: <b>Prowl</b> (you sneak, almost invisible) → walk behind the enemy → <b>Shred</b> → <b>Claw</b> until you have 4 or 5 combo points (dots on the enemy's portrait) → <b>Rip</b> (a big bleed). Energy refills by itself. Omen of Clarity, now a free passive for every druid, sometimes makes your next attack free." },

{ lv:"20–21", place:"Stormwind and Westfall", title:"Polearms and the second pendant half", quests:{272:"Trial of the Sea Lion", 5061:"Aquatic Form"}, map:[["darkshore",[32.4,43.8,"Auberdine docks: ship to Stormwind"]],["stormwind",[57.1,57.7,"Woo Ping (weapon master, Trade District)"],[66.3,62.1,"Flight master"]],["westfall",[17.9,33.2,"Strange Lockbox (far out at sea)"],[56.4,47.5,"Sentinel Hill"]],["moonglade",[36,41.4,"Shrine of Remulos"],[56.2,30.6,"Dendrite Starblaze"]],["darnassus",[35.4,8.4,"Mathrengyl Bearwalker"]]], learn:["aquatic"],
  done:"Aquatic Form is on <kbd>Shift</kbd> + <kbd>4</kbd>, you can use polearms, and you've unlocked the Stormwind flight path.",
  todo:[
    "From Auberdine, take the <b>ship to Stormwind</b> (new in WoW: Forever). In Stormwind, unlock the flight path and visit <b>Woo Ping</b>, the weapon master in the Trade District: learn <b>Polearms</b>. In WoW: Forever your cat and bear attacks get stronger with a better weapon, and polearms are big two-handed weapons.",
    "Follow the road west through Elwynn Forest into <b>Westfall</b>. Go to the west coast and swim far out to sea (the pin on the map). On the sea floor is the second <b>Strange Lockbox</b>: open it for the <b>Half Pendant of Aquatic Endurance</b>.",
    "Cast <b>Teleport: Moonglade</b>. At the <b>Shrine of Remulos</b>, use the Half Pendant of Aquatic Agility from your bags to join the two halves into the <b>Pendant of the Sea Lion</b>. Hand <b>Trial of the Sea Lion</b> to Dendrite.",
    "Fly with Silva Fil'naveth to Darnassus and give <b>Aquatic Form</b> to Mathrengyl. You learn <b>Aquatic Form</b>: put it on <kbd>Shift</kbd> + <kbd>4</kbd>. Under water you swim fast and never run out of breath. Hearth back to Astranaar."
  ],
  tip:"This trip is optional but worth it. Stormwind's flight path, the ship and polearms are all useful later. The quest also gives the <b>Idol of Shifting Tides</b>: changing form costs less mana." },

/* ---------- Ashenvale, levels 20–25 ---------- */
{ chapter:"Ashenvale & Wetlands", lv:"20–24", place:"Ashenvale", title:"Quest Ashenvale", quests:{1008:"The Zoram Strand", 1010:"Bathran's Hair", 1034:"The Ruins of Stardust", 1025:"An Aggressive Defense"}, pickup:{1020:"Orendil's Cure", 1033:"Elune's Tear", 1023:"Raene's Cleansing"}, map:[["ashenvale",[36.5,49.5,"Astranaar"],[14.5,26,"Zoram Strand (naga)"],[30.5,31,"Bathran's Haunt"],[33,67,"Ruins of Stardust"],[20.3,42.4,"Raene's Cleansing (first part)"]]],
  done:"you're level 24 and have handed in <b>The Zoram Strand</b>, <b>Bathran's Hair</b>, <b>The Ruins of Stardust</b> and <b>An Aggressive Defense</b>.", stuck:"Fight the Foulweald furbolgs or the bears near Astranaar until you are.",
  todo:[
    "Make sure <b>Astranaar</b> is your home.",
    "<b>The Zoram Strand</b> (Shindrell Swiftfire): 20 Wrathtail Heads from the naga on the far west coast. Aquatic Form makes the swimming easy.",
    "<b>Bathran's Hair</b>: pick the plants at the ruins of Bathran's Haunt, north-west of town. Its follow-ups, <b>Orendil's Cure</b> and <b>Elune's Tear</b>, come next: your quest log says where. After Elune's Tear, <b>Pelturas Whitemoon</b> gives <b>The Ruins of Stardust</b>: 5 Handfuls of Stardust from the sparkling bushes in the ruins south-west of town. Elementals can pop out.",
    "<b>Raene Wolfrunner</b> at the inn gives <b>Raene's Cleansing</b> (a long chain: follow it as far as you can) and <b>An Aggressive Defense</b>: kill Foulweald furbolgs at the camps south of the road east of town, before the river. Your quest log lists how many of each.",
    "Ashenvale has the Horde nearby. On PvP servers, travel in <b>Prowl</b> and let them pass."
  ],
  tip:"Prowl lets you sneak past enemies you don't need, and walk right up to an enemy for a Shred from behind. A cat almost never needs to rest: heal up with Regrowth and Rejuvenation after a fight, then shift back." },

{ lv:"22", place:"Moonglade (teleport)", title:"Level 22: new ranks", map:[MOONGLADE_TRAINER], learn:["soothe"],
  done:"you've learned the new ranks your trainer offers.",
  todo:[
    "Cast <b>Teleport: Moonglade</b>, learn the new ranks from Loganaar (Shred and Claw first), then hearth back.",
    "<b>Soothe Animal</b> makes a beast less likely to notice you. You'll hardly need it with Prowl: leave it on the right bar."
  ] },

{ lv:"24", place:"Moonglade (teleport)", title:"Level 24: Rake, Ferocious Bite and Remove Curse", map:[MOONGLADE_TRAINER], learn:["rake","bite","removecurse"],
  done:"Rake is on key <kbd>3</kbd> and Ferocious Bite on key <kbd>4</kbd> of your cat bar, and Remove Curse is on key <kbd>9</kbd>.",
  todo:[
    "Teleport to Moonglade and learn <b>Rake</b>, <b>Ferocious Bite</b>, <b>Remove Curse</b> and the new ranks.",
    "<b>Rake</b> (cat bar, <kbd>3</kbd>) bites and makes the enemy bleed. It also gives a combo point. Use it first on enemies that live a while.",
    "<b>Ferocious Bite</b> (cat bar, <kbd>4</kbd>) is a finisher: one big hit with your combo points. Rip is better on strong enemies, Bite finishes weak ones fast.",
    "<b>Remove Curse</b> (key <kbd>9</kbd>) takes a curse off you or a friend."
  ],
  tip:"New cat fight: Prowl → Rake → Claw (or Shred from behind) to 4–5 combo points → Rip on a strong enemy, Ferocious Bite on a weak one." },

{ lv:"22–27", place:"Ashenvale", title:"Dungeon: Blackfathom Deeps (optional)", quests:{1275:"Researching the Corruption", 1198:"In Search of Thaelrid", 1199:"Twilight Falls", 971:"Knowledge in the Deeps"}, map:[["ashenvale",[14.5,14.2,"Blackfathom Deeps entrance"],[36.5,49.5,"Astranaar"]]],
  done:"your group has beaten the last boss, Aku'mai, or you've decided to skip it.",
  todo:[
    "A dungeon is a private area for a group of 5 players. Blackfathom Deeps is in the far north-west of Ashenvale, on the coast.",
    "Collect its quests first: <b>Researching the Corruption</b> (Gershala Nightwhisper, Auberdine), <b>In Search of Thaelrid</b> (Dawnwatcher Shaedlass, Darnassus), <b>Twilight Falls</b> (Argent Guard Manados, Darnassus) and <b>Knowledge in the Deeps</b> (Gerrig Bonegrip, Ironforge). Some more start inside.",
    "Find a group: open the Looking For Group tool or ask in chat (\"LFG BFD\"). A druid can join as <b>damage</b> (Cat), as <b>tank</b> (Bear: you keep the enemies on you with Growl, Maul and Swipe) or as <b>healer</b> (night elf form: Rejuvenation, Regrowth, Healing Touch). Your Feral talents are fine for Cat and Bear. To heal, say so: early dungeons are easy enough.",
    "As damage: stay behind the tank, hit the same enemy as the tank, and don't attack before the tank does."
  ],
  tip:"Most dungeon XP in Forever comes from quests, so collect them before you go in. Since a November hotfix, enemies in a dungeon give no XP at all if someone in the group is more than 12 levels above them, so don't let a high-level friend carry you through." },

{ lv:"25", place:"Talents (N)", title:"Level 25: Predatory Discipline and Legacy",
  done:"your talent point and your Legacy point are spent.",
  todo:[
    "Talent: <b>Predatory Discipline</b>. Ferocious Bite no longer eats all your leftover energy.",
    "Around now you get your first <b>Legacy</b> point. Press <kbd>Y</kbd> and put it in <b>Thrill of Adventure</b>: every kill gives back some health."
  ] },

{ lv:"26", place:"Moonglade (teleport)", title:"Level 26: Dash, Abolish Poison and Lacerate", map:[MOONGLADE_TRAINER], learn:["dash","abolish","lacerate"],
  done:"Dash is on key <kbd>7</kbd> of your cat bar, Lacerate on key <kbd>4</kbd> of your bear bar, and Abolish Poison has replaced Cure Poison on key <kbd>8</kbd>.",
  todo:[
    "Teleport to Moonglade and learn <b>Dash</b>, <b>Abolish Poison</b> and the new ranks.",
    "<b>Dash</b> (cat bar, <kbd>7</kbd>) makes you run very fast for a few seconds. Your escape button.",
    "<b>Abolish Poison</b> cures a poison and keeps curing new ones for a few seconds. It goes where Cure Poison was.",
    "Talent: <b>Lacerate</b>. A bear attack that makes the enemy bleed, up to 5 times. Put it on key <kbd>4</kbd> of your bear bar. For tanking: it makes enemies very angry at you."
  ] },

{ lv:"24–28", place:"Wetlands", title:"The Wetlands", quests:{279:"Claws from the Deep", 484:"Young Crocolisk Skins", 276:"Tramping Paws"}, pickup:{470:"Digging Through the Ooze", 463:"The Greenwarden", 472:"Fall of Dun Modr"}, map:[["darkshore",[32.4,43.8,"Auberdine docks: boat to Menethil"]],["wetlands",[10.5,60,"Menethil Harbor"],[34,42,"Whelgar's Excavation Site"],[56.4,40.4,"The Greenwarden"],[48,15,"Dun Modr"],[44,25,"Ironbeard's Tomb"]]],
  done:"you're level 28 and the Menethil Harbor quests are handed in.", stuck:"Fight the murlocs or crocolisks along the Wetlands coast until you are.",
  todo:[
    "Fly to Auberdine and take the boat to <b>Menethil Harbor</b>. Make the inn your home and unlock the flight path.",
    "Take every quest in town: <b>Claws from the Deep</b> (Karl Boran: kill 12 Bluegill murlocs and <b>Gobbler</b>, north of town, for his head), <b>Young Crocolisk Skins</b> (James Halloran: young crocolisks in the marsh) and <b>Digging Through the Ooze</b> (Sida: kill the black oozes at <b>Ironbeard's Tomb</b>, in the north past Dun Modr, until one drops <b>Sida's Bag</b>). Do the coast ones first.",
    "Then move inland. <b>The Greenwarden</b> (First Mate Fitzsimmons) sends you to Rethiel the Greenwarden, who gives <b>Tramping Paws</b> (gnolls to the south-east) and more. From level 25, Harlo Barnaby's <b>Fall of Dun Modr</b> sends you to Longbraid the Grim at the dwarf ruins in the north. The Wetlands also got 20+ new quests in Forever: take any you find.",
    "New dungeon: <b>Excavation Site</b>, best at levels 26–29. Collect its quests from Caitlin Grassman in Menethil first."
  ],
  tip:"You're far from Kalimdor now, but Teleport: Moonglade works from anywhere: teleport, train, hearth back to Menethil." },

{ lv:"28", place:"Moonglade (teleport)", title:"Level 28: Cower and Challenging Roar", map:[MOONGLADE_TRAINER], learn:["cower","challengingroar"],
  done:"Cower is on key <kbd>8</kbd> of your cat bar and Challenging Roar on key <kbd>-</kbd> of your bear bar.",
  todo:[
    "Teleport to Moonglade, learn <b>Cower</b>, <b>Challenging Roar</b> and the new ranks, then hearth back.",
    "<b>Cower</b> (cat bar) makes an enemy less angry at you. In a dungeon, press it when an enemy turns from the tank to you.",
    "<b>Challenging Roar</b> (bear bar) makes every enemy near you attack you for a few seconds. For tanking, when several enemies run at your healer."
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
  tip:"Worgen walk in pairs. Root one with Entangling Roots (before you shift), then kill the other as a cat. If both reach you, switch to Bear Form: bears take hits much better." },

{ lv:"30", place:"Moonglade (teleport)", title:"Level 30: Travel Form and Leader of the Pack", map:[MOONGLADE_TRAINER], learn:["travelform","tranquility"],
  done:"Travel Form is on <kbd>Shift</kbd> + <kbd>3</kbd> and your talent point is in Leader of the Pack.",
  todo:[
    "Teleport to Moonglade and learn <b>Travel Form</b>, <b>Tranquility</b> and the new ranks.",
    "<b>Travel Form</b> (<kbd>Shift</kbd> + <kbd>3</kbd>) turns you into a fast running cheetah, outdoors only. It's 10 levels before anyone else gets a mount. You can pick herbs and talk to people without leaving it.",
    "Talent: <b>Leader of the Pack</b>. It works by itself: in Cat or Bear Form, you and your group get more critical hits.",
    "<b>Tranquility</b> (key <kbd>=</kbd>) heals your whole group for a while. Only for dungeons."
  ],
  tip:"Get used to switching: Travel Form between quests, Prowl near enemies, Cat Form to fight, Bear Form when it goes wrong, night elf form to heal." },

{ lv:"30–32", place:"Arathi Highlands", title:"Arathi Highlands", quests:{681:"Northfold Manor"}, map:[["arathi",[44,89,"Thandol Span (from the Wetlands)"],[45.8,47.6,"Refuge Pointe"],[32,28,"Northfold Manor (Syndicate)"],[66,68,"Witherbark Village (trolls)"],[25,30,"Stromgarde Keep (elites)"],[73,33,"Hammerfall (Horde town)"]]],
  done:"you're level 32 and have handed in <b>Northfold Manor</b>.", stuck:"Fight the Syndicate around Northfold Manor until you are.",
  todo:[
    "Fly to <b>Menethil Harbor</b> and ride north over the big bridge (Thandol Span) into <b>Arathi Highlands</b>, a wide open grassland.",
    "In the middle is <b>Refuge Pointe</b>, the Alliance camp. Unlock the flight path and make it your home.",
    "Take every quest. Captain Nials's <b>Northfold Manor</b> sends you to the Syndicate in the north-west. Sentinel Glynda Nal'Shea sends you after the Witherbark trolls in the south-east.",
    "Stay out of <b>Stromgarde Keep</b> (west) unless you're in a group: it's full of elite enemies. <b>Hammerfall</b> (east) is a Horde town. Move on at level 32."
  ],
  tip:"The Syndicate are humanoids that come in pairs. Pull one with Faerie Fire from a distance so the other doesn't notice." },

{ lv:"32", place:"Moonglade (teleport)", title:"Level 32: Ravage and Track Humanoids", map:[MOONGLADE_TRAINER], learn:["ravage","tracking"],
  done:"Ravage is on key <kbd>0</kbd> of your cat bar and Track Humanoids is on your right bar.",
  todo:[
    "Teleport to Moonglade and learn <b>Ravage</b>, <b>Track Humanoids</b> and the new ranks. You also get <b>Poised</b>, which works by itself: start a fight with full energy and your first attack costs less.",
    "<b>Ravage</b> (cat bar, <kbd>0</kbd>) is a huge opening hit from Prowl, from behind the enemy.",
    "<b>Track Humanoids</b> (right bar, in Cat Form) shows people and humanoid enemies on your mini-map. Handy when a quest asks you to find someone."
  ],
  tip:"New cat opener: Prowl → sneak behind → Ravage → Claw/Shred → Rip or Ferocious Bite." },

{ lv:"32", place:"Southshore, Hillsbrad", title:"Southshore", quests:{536:"Down the Coast", 505:"Syndicate Assassins"}, map:[["arathi",[20,30,"Gate in Thoradin's Wall (west)"]],["hillsbrad",[50,55,"Southshore"],[40,74,"Murloc beach"]]],
  done:"you're level 33 and have handed in <b>Down the Coast</b> and <b>Syndicate Assassins</b>.", stuck:"Fight the murlocs on the beach south of Southshore until you are.",
  todo:[
    "From Refuge Pointe, ride west through the gate in the huge wall (Thoradin's Wall) into Hillsbrad Foothills. Follow the road south to <b>Southshore</b>. Unlock the flight path.",
    "Take the town's quests. <b>Down the Coast</b> from Lieutenant Farren Orinelle (murlocs on the beach) and <b>Syndicate Assassins</b> from Marshal Redpath (in the Alterac Mountains, north) are quick XP.",
    "Talk to <b>Emissary Jacques</b> to start the new <b>City of Dalaran</b> dungeon (levels 28–35). Optional. Dalaran also has a druid trainer, <b>Alfina Nightgaze</b>.",
    "Southshore also has a boat to Auberdine. Move on at about level 33."
  ],
  tip:"From here on, on PvP servers, Horde players can attack you. Prowl, Dash and Travel Form are your escape." },

/* ---------- 33–37: Stranglethorn Vale ---------- */
{ chapter:"Stranglethorn Vale", lv:"33–35", place:"Stranglethorn Vale (north)", title:"Stranglethorn: Rebel Camp and the hunters", quests:{185:"Tiger Mastery", 190:"Panther Mastery", 194:"Raptor Mastery"}, pickup:{338:"The Green Hills of Stranglethorn"}, map:[["stranglethorn",[38,3.5,"Rebel Camp"],[35.6,10.6,"Nesingwary's Expedition"],[44,10,"Kurzen's Compound"],[32,28,"Grom'gol (Horde camp)"]]],
  done:"you're level 35 and have handed in the first parts of <b>Tiger Mastery</b>, <b>Panther Mastery</b> and <b>Raptor Mastery</b>.", stuck:"Fight the tigers and panthers around Nesingwary's camp until you are.",
  todo:[
    "Fly to <b>Darkshire</b> and follow the road south out of Duskwood into <b>Stranglethorn Vale</b>, a big jungle. Right at the zone edge, turn west to the <b>Rebel Camp</b>.",
    "Lieutenant Doren's quests at the Rebel Camp send you against the Kurzen soldiers at their compound, east of the camp.",
    "Just south is <b>Nesingwary's Expedition</b>, a hunting camp. Take <b>Tiger Mastery</b>, <b>Panther Mastery</b> and <b>Raptor Mastery</b>: each sends you to hunt one kind of animal, and later parts send you after bigger ones.",
    "Pages of <b>The Green Hills of Stranglethorn</b> drop from almost everything here. Keep them: when you have a full chapter, hand it to Barnil Stonepot at Nesingwary's camp for XP."
  ],
  tip:"Tigers, panthers and raptors are beasts: Hibernate puts a second one to sleep while you fight the first. Grom'gol, on the west coast, is a Horde camp. Stay away from it." },

{ lv:"34", place:"Moonglade (teleport)", title:"Level 34: new ranks", map:[MOONGLADE_TRAINER],
  done:"you've learned every new rank your trainer offers.",
  todo:[
    "Teleport to Moonglade and learn the new ranks: Rake, Swipe and Claw first if you're short on gold. Hearth back to Stranglethorn."
  ] },

{ lv:"35–37", place:"Booty Bay, Stranglethorn", title:"Stranglethorn: Booty Bay", quests:{605:"Singing Blue Shards"}, pickup:{595:"The Bloodsail Buccaneers"}, map:[["stranglethorn",[27,77,"Booty Bay"],[38,3.5,"Rebel Camp"],[35.6,10.6,"Nesingwary's Expedition"]]], learn:["food5","water5"],
  done:"you're level 37 and have handed in <b>Singing Blue Shards</b>.", stuck:"Fight the pirates or raptors along the coast near Booty Bay until you are.",
  todo:[
    "Follow the main road all the way south to <b>Booty Bay</b>, a goblin port built into a cliff. Unlock the flight path and make the inn your home.",
    "Booty Bay is neutral: Horde players use it too, and the goblin guards attack anyone who starts a fight in town.",
    "Take <b>Singing Blue Shards</b> from Crank Fizzlebub (crystal-backed basilisks in the middle of the zone) and the pirate quests that start with <b>The Bloodsail Buccaneers</b> from First Mate Crazz.",
    "Keep doing the Nesingwary hunting quests as new parts open. Move on at level 37."
  ],
  tip:"Upgrade your supplies at the inn: <b>Moon Harvest Pumpkins</b> and <b>Moonberry Juice</b>. Booty Bay also has a boat to Ratchet in Kalimdor." },

{ lv:"35–40", place:"Tirisfal Glades", title:"Dungeon: Scarlet Monastery (optional)", quests:{1050:"Mythology of the Titans", 1053:"In the Name of the Light"}, map:[["tirisfal",[83,33,"Scarlet Monastery"]]],
  done:"your group has finished the wings you wanted, or you've decided to skip it.",
  todo:[
    "Four short dungeon wings, run by crazed crusaders: <b>Graveyard</b> (around level 30), <b>Library</b> (around 33), <b>Armory</b> (around 36) and <b>Cathedral</b> (around 38).",
    "It's deep in Horde land, so don't walk there. Find a group with the Looking For Group tool and let the group summon you at the meeting stone outside.",
    "Collect the Alliance quests first: <b>Mythology of the Titans</b> (Librarian Mae Paledust, Hall of Explorers in Ironforge) and <b>In the Name of the Light</b> (Raleigh the Devout, Southshore inn).",
    "Druids are welcome in any role. Groups look for tanks the most: as a bear, Swipe for groups, Maul and Lacerate for one enemy, Growl to grab an enemy that runs off."
  ],
  tip:"Inside, as a cat, stay behind the tank and hit the same enemy. Cower when an enemy turns to you." },

{ lv:"36", place:"Moonglade (teleport)", title:"Level 36: Pounce and Frenzied Regeneration", map:[MOONGLADE_TRAINER], learn:["pounce","frenzied"],
  done:"Pounce is on key <kbd>9</kbd> of your cat bar and Frenzied Regeneration on key <kbd>0</kbd> of your bear bar.",
  todo:[
    "Teleport to Moonglade and learn <b>Pounce</b>, <b>Frenzied Regeneration</b> and the new ranks.",
    "<b>Pounce</b> (cat bar, <kbd>9</kbd>) is an opener from Prowl: it stuns the enemy and makes it bleed. Use it on enemies that cast spells.",
    "<b>Frenzied Regeneration</b> (bear bar, <kbd>0</kbd>) turns your rage into health. An emergency button when a bear fight goes badly."
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
    "The Horde quests here too (their town is Rog'mar). On PvP servers, keep your escape buttons ready. Start saving gold now for level 40. Move on at level 40."
  ],
  tip:"There's no Riverglades map on this site yet. Use your in-game map (<kbd>M</kbd>): Farholde Keep is in the south of the zone." },

{ lv:"38", place:"Moonglade (teleport)", title:"Level 38: new ranks", map:[MOONGLADE_TRAINER],
  done:"you've learned every new rank your trainer offers.",
  todo:[
    "Teleport to Moonglade and learn the new ranks (Claw and Rip come first). Hearth back to Farholde Keep.",
    "Keep saving gold: level 40 brings riding, Dire Bear Form and your second talents."
  ] },

{ lv:"40", place:"Moonglade + Darnassus", title:"Level 40: Dire Bear Form, Shifting Power and your mount", map:[MOONGLADE_TRAINER,["darnassus",[38.6,16,"Jartsam (riding trainer)"],[38.6,15.6,"Lelanai (nightsaber vendor)"]]], learn:["direbear","innervate","shiftingpower","mount"],
  done:"Dire Bear Form has replaced Bear Form on <kbd>Shift</kbd> + <kbd>1</kbd>, Shifting Power is on key <kbd>6</kbd> of your cat bar, and your nightsaber is on the right bar.",
  todo:[
    "Teleport to Moonglade and learn <b>Dire Bear Form</b>, <b>Innervate</b>, <b>Feline Grace</b> and the new ranks. Dire Bear Form goes where Bear Form was. Innervate (key <kbd>-</kbd>) refills your mana quickly.",
    "Talent: <b>Shifting Power</b>. Put it on key <kbd>6</kbd> of your cat bar. When your energy runs low, press it: it turns some of your mana into energy.",
    "Fly with Silva Fil'naveth to Darnassus. Learn <b>Apprentice Riding</b> from <b>Jartsam</b> (about 100 gold) and talk to <b>Lelanai</b> next to him: your first nightsaber is free in WoW: Forever. Right-click the reins to learn the mount, then put it on the right bar.",
    "A mount (60% faster) beats Travel Form (40% faster) on long roads. Travel Form is still great for short hops: it's instant, and you can pick herbs in it."
  ],
  tip:"Not enough gold? Skip the mount for now. Travel Form carries you fine, and you can come back later." },

{ lv:"40", place:"Any druid trainer", title:"Level 40: your second talents (Dual Specialization)", map:[MOONGLADE_TRAINER],
  done:"you've decided on a second talent setup, or to skip it for now.",
  todo:[
    "At level 40 a druid trainer can teach you <b>Dual Talent Specialization</b>: two talent setups, and you switch between them for free (out of combat). Keep the Feral one from this guide for questing.",
    "For dungeons, set up the second one as <b>Restoration</b>, the healer: groups always need healers, and with Restoration talents your heals are much stronger. In WoW: Forever druid HoTs (heals over time, like Rejuvenation) stack with other druids' and can crit, and you get <b>Wild Growth</b>, which heals the whole group.",
    "Want to tank instead? Your Feral talents already work for Bear Form. For a stronger tank, take the bear talents (Thick Hide, Natural Reaction, Brutal Impact) in the second setup.",
    "WoW: Forever also has an <b>Equipment Manager</b>: save your cat gear and your healer gear as two sets and swap both together. The game asks you to set the second action bars up after the first switch."
  ],
  tip:"As a healer: Rejuvenation on the tank before the fight, Regrowth when they drop to half, Healing Touch for big hits, Swiftmend when it's urgent. Watch your mana, and drink between fights." },

{ lv:"40–43", place:"Riverglades (north)", title:"Riverglades: Sunnyglade and the north", quests:{94877:"Saving Sunnyglade"}, map:[["riverglades"]],
  done:"you're level 43 and have handed in <b>Saving Sunnyglade</b>.", stuck:"Fight the enemies around Sunnyglade until you are.",
  todo:[
    "Back in Farholde Keep, Demar Brant's <b>Saving Sunnyglade</b> sends you north to the village of <b>Sunnyglade</b>.",
    "Keep turning in and picking up: the later quests send you further north, toward <b>Twilight's Shroud</b>.",
    "Pick up the quests for the dungeon <b>Krol'dok Stronghold</b> (next step) as they appear.",
    "<b>Powderfuse Port</b>, a neutral goblin port on the east coast, has a bank, an auction house and the boat to Tanaris. Move on at about level 43."
  ] },

{ lv:"42", place:"Moonglade (teleport)", title:"Level 42: Primal Bite and Restoration talents", map:[MOONGLADE_TRAINER], learn:["primalbite"],
  done:"Primal Bite is on key <kbd>5</kbd> of your bear bar, you've learned every new rank, and your talent point is in Heart of the Wild.",
  todo:[
    "Teleport to Moonglade, learn every new rank, and hearth back to Farholde Keep.",
    "Your level 41 talent was <b>Primal Bite</b>: put it on key <kbd>5</kbd> of your bear bar. In Bear Form, use it whenever it's ready.",
    "Talent: the Feral tree is nearly done. From now until 46, your points go into <b>Heart of the Wild</b> in the <b>Restoration</b> tab: more Intellect, more Stamina as a bear and more Strength as a cat.",
    "The Talents tab shows the order to the end. At 60 you've spent all 51 points."
  ] },

{ lv:"41–45", place:"Riverglades", title:"Dungeon: Krol'dok Stronghold (optional)", map:[["riverglades"]],
  done:"your group has beaten the last boss, or you've decided to skip it.",
  todo:[
    "A new 5-player dungeon for levels 40–45, with six bosses. The entrance is in the hills north of Sunnyglade (with TomTom: <kbd>/way 37.5 37.5</kbd>).",
    "Its quests are a chain of about ten that starts in Farholde Keep. Do the parts you can do alone first.",
    "Find a group with the Looking For Group tool or ask in chat (\"LFG Krol'dok\"). With two talent setups you can join as a healer or a tank, whichever the group is missing."
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

{ lv:"43–46", place:"Gadgetzan, Tanaris", title:"Tanaris", quests:{1690:"Wastewander Justice"}, pickup:{82:"Noxious Lair Investigation", 8366:"Southsea Shakedown", 8365:"Pirate Hats Ahoy!"}, map:[["tanaris",[51,28,"Gadgetzan"],[63,30,"Wastewander bandit camps"],[35,45,"Noxious Lair (giant insects)"],[72,46,"Lost Rigger Cove (pirates)"],[39,20,"Zul'Farrak"]]],
  done:"you're level 46 and have handed in <b>Wastewander Justice</b>.", stuck:"Fight the Wastewander bandits east of Gadgetzan until you are.",
  todo:[
    "Take every quest in Gadgetzan. <b>Wastewander Justice</b> sends you to the bandit camps east of town. (Skip <b>Water Pouch Bounty</b>: since a November hotfix it gives no XP.)",
    "<b>Noxious Lair Investigation</b> from Alchemist Pestlezugg: giant insects at the Noxious Lair, south-west of town.",
    "Steamwheedle Port has pirate quests (<b>Southsea Shakedown</b>, <b>Pirate Hats Ahoy!</b>) for the pirates at <b>Lost Rigger Cove</b> on the east coast.",
    "Gadgetzan also has quests for <b>Zul'Farrak</b>, the dungeon in the north-west. Move on at about level 46."
  ],
  tip:"Bandits run away at low health. Feral Charge after them, or root them before they get far." },

{ lv:"44", place:"Moonglade (teleport)", title:"Level 44: Barkskin", map:[MOONGLADE_TRAINER], learn:["barkskin"],
  done:"Barkskin is on <kbd>Shift</kbd> + <kbd>6</kbd>.",
  todo:[
    "Teleport to Moonglade and learn <b>Barkskin</b> and the new ranks. Hearth back to Gadgetzan.",
    "<b>Barkskin</b> (<kbd>Shift</kbd> + <kbd>6</kbd>) works in every form: you take less damage for a while. Use it whenever a fight looks dangerous. It comes back quickly, so don't save it."
  ] },

{ lv:"44–48", place:"Tanaris", title:"Dungeon: Zul'Farrak (optional)", quests:{2768:"Divino-matic Rod", 3042:"Troll Temper"}, map:[["tanaris",[39,20,"Zul'Farrak"],[51,28,"Gadgetzan"]]],
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
    "Ride west through the jungle to the coast. <b>Feathermoon Stronghold</b> is on an island: take the ferry from the small dock on the shore, or just swim over in Aquatic Form.",
    "Unlock the Feathermoon flight path and make the inn your home."
  ] },

{ lv:"46", place:"Moonglade (teleport)", title:"Level 46: new ranks", map:[MOONGLADE_TRAINER], learn:["food6","water6"],
  done:"you've learned every new rank your trainer offers.",
  todo:[
    "Teleport to Moonglade, learn the new ranks and hearth back to Feathermoon.",
    "Upgrade your supplies at the Feathermoon inn: <b>Deep Fried Plantains</b> and <b>Morning Glory Dew</b>."
  ] },

{ lv:"46–48", place:"Feathermoon, Feralas", title:"Feralas", quests:{2821:"The Mark of Quality", 7003:"Zapped Giants"}, pickup:{4267:"Rise of the Silithid"}, map:[["feralas",[30.5,43.5,"Feathermoon Stronghold"],[43.5,43,"Ferry dock"],[59,44,"Dire Maul (for later)"]]],
  done:"you're level 48 and have handed in <b>Zapped Giants</b> and <b>The Mark of Quality</b>.", stuck:"Fight the yetis in the hills or the giants on the coast until you are.",
  todo:[
    "Take every quest in Feathermoon Stronghold, like <b>The Mark of Quality</b> from Pratt McGrubben (yeti hides) and the <b>Rise of the Silithid</b> chain.",
    "Near the ferry dock, <b>Zorbin Fandazzle</b> gives <b>Zapped Giants</b>: use his gadget on the giants that walk along the coast.",
    "<b>Dire Maul</b>, the ruined city in the middle of Feralas, is a dungeon for levels 55–60. Come back much later.",
    "Move on at about level 48. From level 48, most quests also give gold in WoW: Forever."
  ] },

{ lv:"48", place:"Moonglade (teleport)", title:"Level 48: new ranks", map:[MOONGLADE_TRAINER],
  done:"you've learned every new rank your trainer offers.",
  todo:[
    "Teleport to Moonglade and learn every new rank.",
    "Don't hearth: from Moonglade, fly with Sindrayl to Auberdine and go straight on to the Hinterlands (next step)."
  ] },

{ lv:"47–50", place:"Aerie Peak, Hinterlands", title:"The Hinterlands", quests:{2877:"Skulk Rock Clean-up", 2880:"Troll Necklace Bounty"}, pickup:{2988:"Witherbark Cages"}, map:[["hinterlands",[14,46,"Aerie Peak"],[55,42,"Skulk Rock (oozes)"],[63,73,"Jintha'Alor (trolls)"]]],
  done:"you're level 50 and have handed in <b>Skulk Rock Clean-up</b> and <b>Troll Necklace Bounty</b>.", stuck:"Fight Witherbark trolls (their necklaces count for the bounty) until you are.",
  todo:[
    "Back to the Eastern Kingdoms: from Auberdine take the boat to <b>Southshore</b> (or the boat to Menethil Harbor, then fly to Southshore). From Southshore, ride north-east into <b>The Hinterlands</b>. <b>Aerie Peak</b>, the Wildhammer dwarf town, is right at the entrance.",
    "Unlock the flight path and make the inn your home.",
    "Take every quest: <b>Skulk Rock Clean-up</b> (oozes at Skulk Rock), <b>Troll Necklace Bounty</b> (necklaces from any Witherbark troll) and Gryphon Master Talonaxe's chain, starting with <b>Witherbark Cages</b>.",
    "Run out of quests? <b>Searing Gorge</b> (town: Thorium Point) is another zone for this level. Move on at level 50."
  ],
  tip:"WoW Forever adds a new dungeon for these levels: <b>Alcaz Prison</b> (about 48–53). Look for it in the Looking For Group tool." },

/* ---------- 49–60 ---------- */
{ chapter:"Un'Goro to 60", lv:"49–52", place:"Marshal's Refuge, Un'Goro", title:"Un'Goro Crater", quests:{4284:"Crystals of Power", 4243:"Chasing A-Me 01"}, map:[["ungoro",[43.5,8.5,"Marshal's Refuge"],[50,48,"Fire Plume Ridge (volcano)"],[70,75,"Entrance from Tanaris"]]],
  done:"you're level 52 and have handed in <b>Crystals of Power</b> and <b>Chasing A-Me 01</b>.", stuck:"Fight the raptors and stegodons near Marshal's Refuge until you are.",
  todo:[
    "Back to Kalimdor the druid way: <b>Teleport: Moonglade</b>, fly with Sindrayl to Gadgetzan, and ride west out of Tanaris. The road goes down a long ramp into <b>Un'Goro Crater</b>, a jungle full of dinosaurs.",
    "Follow the crater's edge north to <b>Marshal's Refuge</b>, a camp under the northern cliffs. Unlock the flight path and make it your home.",
    "Take every quest. <b>Crystals of Power</b> from J.D. Collie: pick up the coloured crystals that lie on the ground all over the crater (your quest log says which colours and how many). Karna Remtravel's <b>Chasing A-Me 01</b> sends you to walk a lost robot home.",
    "Watch out for <b>Devilsaurs</b>: huge dinosaurs that walk around and hit very hard. Stay out of their way. Move on at level 52."
  ],
  tip:"Devilsaurs can't see you in Prowl. If one comes your way, Prowl and step aside. The crater's herbs sell well if you took Herbalism." },

{ lv:"50", place:"Moonglade (teleport)", title:"Level 50: new ranks", map:[MOONGLADE_TRAINER],
  done:"you've learned every new rank your trainer offers and your talent point is spent.",
  todo:[
    "Teleport to Moonglade and learn every new rank. Hearth back to Marshal's Refuge.",
    "Talent: your points now go into <b>Genesis</b> in the <b>Balance</b> tab: your bleeds (Rake, Rip, Lacerate, Pounce) hit harder."
  ] },

{ lv:"52", place:"Moonglade (teleport)", title:"Level 52: new ranks", map:[MOONGLADE_TRAINER],
  done:"you've learned every new rank your trainer offers.",
  todo:[
    "Teleport to Moonglade and learn every new rank.",
    "From Moonglade, fly with Sindrayl to <b>Astranaar</b> for the next zone, Felwood."
  ] },

{ lv:"52–54", place:"Felwood", title:"Felwood", quests:{5155:"Forces of Jaedenar", 8461:"Deadwood of the North"}, map:[["felwood",[51,82,"Emerald Sanctuary"],[37,60,"Jaedenar (Shadow Council)"],[62.5,24.5,"Talonbranch Glade"],[62,24.4,"Golhine the Hooded (druid trainer)"],[64.5,8,"Timbermaw Hold (tunnel to Winterspring)"]]],
  done:"you're level 54 and have handed in <b>Forces of Jaedenar</b> and <b>Deadwood of the North</b>.", stuck:"Fight Deadwood furbolgs in northern Felwood until you are. It also makes the Timbermaw like you.",
  todo:[
    "From <b>Astranaar</b>, follow the road north into <b>Felwood</b>, a forest poisoned by demons.",
    "In the south, stop at the <b>Emerald Sanctuary</b> camp. <b>Forces of Jaedenar</b> from Greta Mosshoof sends you after the demon worshippers at Jaedenar, west of the road.",
    "Follow the road north to <b>Talonbranch Glade</b>. Unlock the flight path and take its quests. It has a druid trainer too, <b>Golhine the Hooded</b>.",
    "Near the north end, Nafien gives <b>Deadwood of the North</b>: killing the Deadwood furbolgs makes the Timbermaw furbolgs like you, so they let you walk through their tunnel to Winterspring later. Move on at level 54."
  ] },

{ lv:"54", place:"Moonglade or Talonbranch Glade", title:"Level 54: new ranks", map:[["felwood",[62,24.4,"Golhine the Hooded (druid trainer)"]],MOONGLADE_TRAINER],
  done:"you've learned every new rank your trainer offers.",
  todo:[
    "Learn the new ranks from Golhine the Hooded in Talonbranch Glade, or teleport to Moonglade."
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
  tip:"Undead don't bleed less, but they come in groups. Pull one at a time with Faerie Fire, and switch to Dire Bear Form and Swipe if two or three arrive." },

{ lv:"56", place:"Moonglade (teleport)", title:"Level 56: new ranks", map:[MOONGLADE_TRAINER], learn:["food7"],
  done:"you've learned every new rank your trainer offers.",
  todo:[
    "Teleport to Moonglade, learn every new rank and hearth back to Chillwind Camp.",
    "Talent: from now to 60, your points go into <b>Furor</b>: you get 10 rage each time you turn into a bear, and keep your energy when you switch back to Cat Form.",
    "Better food: <b>Homemade Cherry Pie</b> from a baker. Put it on <kbd>Alt</kbd> + <kbd>2</kbd>."
  ] },

{ lv:"56–58", place:"Light's Hope, Eastern Plaguelands", title:"Eastern Plaguelands", map:[["epl",[81.5,59,"Light's Hope Chapel"],[36,90,"Darrowshire"],[7,43,"Tirion Fordring's house"],[27,11,"Stratholme"]]],
  done:"you're level 58.", stuck:"Fight the undead near Light's Hope Chapel until you are.",
  todo:[
    "Ride east into <b>Eastern Plaguelands</b> and follow the road to <b>Light's Hope Chapel</b> on the far east side. Unlock the flight path.",
    "The <b>Argent Dawn</b> at Light's Hope fight the undead. Their quests give good XP and reputation.",
    "In the ruined village of <b>Darrowshire</b> (south-west), talk to the little ghost girl <b>Pamela Redpath</b>. Her quests tell one of the saddest stories in WoW.",
    "In a small house by the river in the far west, <b>Tirion Fordring</b> starts the famous <b>Redemption</b> chain. Move on at level 58."
  ] },

{ lv:"58", place:"Moonglade (teleport)", title:"Level 58: new ranks", map:[MOONGLADE_TRAINER],
  done:"you've learned every new rank your trainer offers.",
  todo:[
    "Teleport to Moonglade and learn every new rank.",
    "Then head for Winterspring (next step): from Moonglade, fly with Sindrayl to Talonbranch Glade in Felwood."
  ] },

{ lv:"58–60", place:"Everlook, Winterspring", title:"Winterspring", quests:{3783:"Are We There, Yeti?"}, map:[["felwood",[64.5,8,"Timbermaw Hold (tunnel)"]],["winterspring",[61,38.5,"Everlook"],[31,45,"Donova Snowden (hot springs)"],[67,36,"Winterfall Village (furbolgs)"]]],
  done:"you're level 60!", stuck:"Fight Winterfall furbolgs, or run Blackrock Depths with a group, until you are.",
  todo:[
    "From Talonbranch Glade, walk north through the <b>Timbermaw Hold</b> tunnel. It comes out in <b>Winterspring</b>, a snowy valley.",
    "At the hot springs, talk to <b>Donova Snowden</b>: her quests are about the Winterfall furbolgs.",
    "Follow the road east to <b>Everlook</b>, a goblin town. Unlock the flight path, make it your home and take every quest, like <b>Are We There, Yeti?</b> from Legacki.",
    "For the last bars of XP, run end-game dungeons with groups: Blackrock Depths, Lower Blackrock Spire, Dire Maul, Stratholme and Scholomance. A druid tank or healer finds a group fast."
  ] },

{ lv:"60", place:"Moonglade (teleport)", title:"Level 60: the last ranks", map:[MOONGLADE_TRAINER],
  done:"you've learned the last ranks and all 51 talent points are spent.",
  todo:[
    "Teleport to Moonglade and learn the last ranks.",
    "Spend your last talent point: that's all 51.",
    "Look at your second talent setup again: with Dual Specialization you can heal or tank for dungeon groups and raids, and still quest as a cat."
  ] },

{ lv:"60", place:"Mount Hyjal", title:"You made it to 60!", map:[["hyjal"]],
  todo:[
    "Visit <b>Mount Hyjal</b>, a new level 60 zone reached through Winterspring.",
    "Riding faster: <b>Journeyman Riding</b> at 60 (about 1,000 gold) gives a 100% speed mount, and the first one from Lelanai is free.",
    "From here on, it's about gear, dungeons and raids. Congratulations!"
  ] }
];

/* Talent points: which talent to click at each level.
   The order follows Warcraft Tavern's WoW: Forever Feral leveling build (November 2026). */
const TALENTS = [
  ["10–14", "Ferocity (Feral Combat tab)", "Click it 5 times (once per level)", "Maul, Swipe, Claw and Rake cost less rage or energy."],
  ["15–16", "Feral Swiftness", "2 times", "You run 30% faster in Cat Form and dodge more often."],
  ["17–19", "Feral Instinct", "3 times", "Swipe hits harder, and enemies spot you less when you Prowl."],
  ["20", "Feral Charge", "Once", "Leap at an enemy and stop its spell. In WoW: Forever it works in Cat Form as well as Bear Form."],
  ["21–22", "Savage Fury", "2 times", "Claw, Rake, Shred, Maul and Swipe hit 10% harder."],
  ["23–24", "Sharpened Claws", "2 times", "More critical hits as a cat or a bear."],
  ["25", "Predatory Discipline", "Once", "Ferocious Bite no longer uses up all your leftover energy."],
  ["26", "Lacerate", "Once", "A bear bleed that stacks 5 times and makes enemies very angry at you. Put it on the bear bar."],
  ["27–28", "Blood Frenzy", "2 times", "Critical hits give a bear extra rage and a cat an extra combo point."],
  ["29", "Predatory Strikes", "Once", "More attack power as a cat or a bear."],
  ["30", "Leader of the Pack", "Once", "Works by itself: in Cat or Bear Form, you and your group crit more often."],
  ["31–32", "Predatory Strikes", "2 more times (3 of 3)", ""],
  ["33–34", "Natural Instinct", "2 times", "Your critical hits do more damage, and your heals are a little stronger."],
  ["35–39", "Rend and Tear", "5 times", "Your attacks hit 15% harder on bleeding enemies. Keep Rake and Rip on them."],
  ["40", "Shifting Power", "Once", "A button for your cat bar: turn mana into energy when you run low."],
  ["41", "Primal Bite", "Once", "A strong bear bite that makes enemies very angry at you. Put it on the bear bar."],
  ["42–46", "Heart of the Wild (Restoration tab)", "5 times", "Switch to the Restoration tab: more Intellect, more Stamina as a bear and more Strength as a cat."],
  ["47–51", "Genesis (Balance tab)", "5 times", "Switch to the Balance tab: your bleeds and heals over time do 10% more."],
  ["52–53", "Nature's Reach", "2 times", "You miss less often."],
  ["54–55", "Nature's Majesty", "2 times", "More critical hits."],
  ["56–60", "Furor (Feral Combat tab)", "5 times", "Back to Feral: 10 free rage when you turn into a bear, and you keep your energy when you switch back to Cat Form. That's all 51 points."]
];

/* Words a new player won't know. Matching is case-insensitive. */
const WORDS = {
  "buff": "A good effect on you, like Mark of the Wild or Thorns. Its icon shows at the top right of your screen.",
  "flight path": "Talk to a flight master (the person with a hippogryph or gryphon) once to unlock that place. Then you can fly between any places you've unlocked.",
  "trainer": "An NPC who teaches you new spells for gold. Druids need one every 2 levels. Loganaar in Moonglade is always one teleport away.",
  "mana": "The blue bar under your health. Spells and changing form cost mana. It refills slowly by itself and fast when you drink. It's hidden while you're in a form unless you turn on the Personal Resource Display.",
  "energy": "The yellow bar you have in Cat Form. Cat attacks cost energy, and it fills up again by itself in a few seconds.",
  "rage": "The red bar you have in Bear Form. It starts empty and fills when you hit or get hit. Bear attacks spend it.",
  "combo points": "Small dots on the enemy's portrait, in Cat Form. Claw, Shred and Rake add them, up to 5. Finishers like Rip and Ferocious Bite use them all: more points, bigger effect.",
  "finisher": "A cat attack that uses up your combo points, like Rip or Ferocious Bite.",
  "form": "A shape a druid turns into: Bear, Cat, Travel or Aquatic Form. Each form has its own main bar, and the game swaps the bar for you. Press the same form button again to turn back into a night elf.",
  "shapeshift": "Turning into a form. It costs mana, frees you from slows and roots, and swaps your main action bar.",
  "prowl": "The cat's stealth: you sneak, almost invisible. Enemies only notice you when you get very close. Attacking breaks it.",
  "HoT": "Heal over time: a heal that works slowly over several seconds, like Rejuvenation. In WoW: Forever druid HoTs stack and can crit.",
  "bleed": "Damage over time from a wound, like Rake, Rip or Lacerate. Bleeds ignore armor.",
  "stun": "The enemy can't move or attack for a few seconds. Bash and Pounce stun.",
  "pull": "Starting a fight with an enemy, for example by hitting it with Faerie Fire or Moonfire from a distance.",
  "tank": "The player in a group whose job is to make the enemies attack them, not the others. A druid tanks in Bear Form.",
  "auction house": "Where players buy and sell items. Every big city has one."
};

/* ---------------------------------------------------------
   PART 2 — PAGE BEHAVIOUR
   --------------------------------------------------------- */

const ZONES = {
  teldrassil: { name: "Teldrassil", id: 141 },    darnassus: { name: "Darnassus", id: 1657 },
  moonglade: { name: "Moonglade", id: 493 },
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

/* ---------- spells ---------- */
/* school: phys (cat and bear) / poison (nature, green) / arcane / racial / item  */
const SPELLBOOK = {
  /* night elf form */
  wrath:        { name:"Wrath", lv:1, school:"poison", icon:"star", text:"Your first attack: a bolt of nature from a distance. Cast it to pull an enemy." },
  moonfire:     { name:"Moonfire", lv:4, school:"arcane", icon:"burst", text:"Instant. A quick hit and a burn that keeps hurting the enemy. Good for pulling without moving." },
  rejuv:        { name:"Rejuvenation", lv:4, school:"poison", icon:"drop", text:"Instant heal over 12 seconds. In WoW: Forever it can crit and stacks with other druids' Rejuvenation." },
  regrowth:     { name:"Regrowth", lv:12, school:"poison", icon:"drop", text:"A quick heal, then more healing over time. Your best heal after a fight." },
  healingtouch: { name:"Healing Touch", lv:1, school:"poison", icon:"cross", text:"A big, slow heal. Use it when you have time, or out of combat." },
  roots:        { name:"Entangling Roots", lv:8, school:"poison", icon:"chain", text:"Holds an enemy in place. Damage can break it. Works indoors in WoW: Forever." },
  naturesgrasp: { name:"Nature's Grasp", lv:10, school:"poison", icon:"chain", text:"Press before a fight: the next enemy that hits you is rooted. Every druid has it in WoW: Forever. Your escape button." },
  curepoison:   { name:"Cure Poison", lv:14, school:"poison", icon:"drop", text:"Removes a poison from you or a friend. From the druid quest Power over Poison." },
  abolish:      { name:"Abolish Poison", lv:26, school:"poison", icon:"drop", text:"Removes a poison and keeps removing new ones for a few seconds. Replaces Cure Poison." },
  removecurse:  { name:"Remove Curse", lv:24, school:"arcane", icon:"slash", text:"Removes a curse from you or a friend." },
  hibernate:    { name:"Hibernate", lv:18, school:"poison", icon:"swirl", text:"Puts a beast or a dragon to sleep. Not humanoids. Any damage wakes it." },
  innervate:    { name:"Innervate", lv:40, school:"poison", icon:"bulb", text:"Refills a lot of mana quickly. Use it on yourself, or give it to a healer in a dungeon." },
  tranquility:  { name:"Tranquility", lv:30, school:"poison", icon:"swirl", text:"Heals your whole group while you channel it. For dungeons. Long cooldown." },
  motw:         { name:"Mark of the Wild", lv:1, school:"poison", icon:"star", text:"A buff for 30 minutes: more armor and a little of every stat. Keep it on yourself and your friends." },
  thorns:       { name:"Thorns", lv:6, school:"poison", icon:"shield", text:"A buff for 10 minutes: enemies that hit you take damage. Keep it up while questing." },
  teleport:     { name:"Teleport: Moonglade", lv:10, school:"arcane", icon:"swirl", text:"Teleports you to Moonglade, where Loganaar trains druids. Then use your Hearthstone to get back." },
  revive:       { name:"Revive", lv:12, school:"poison", icon:"cross", text:"Brings a dead player back to life, out of combat. New for druids in WoW: Forever." },
  rebirth:      { name:"Rebirth", lv:20, school:"poison", icon:"cross", text:"Brings a dead player back to life even during a fight. The only spell like it. Long cooldown, needs a reagent." },
  soothe:       { name:"Soothe Animal", lv:22, school:"poison", icon:"eye", text:"Makes a beast less likely to notice you. Rarely needed." },
  tracking:     { name:"Track Humanoids", lv:32, school:"phys", icon:"eye", text:"In Cat Form: shows humanoids on your mini-map." },

  /* forms (bottom left bar, they work from any form) */
  bearform:     { name:"Bear Form", lv:10, school:"phys", icon:"shield", text:"Turn into a bear: much more armor and health, and a rage bar. For tough fights and for tanking. From the druid quest Body and Heart." },
  direbear:     { name:"Dire Bear Form", lv:40, school:"phys", icon:"shield", text:"The stronger bear. Replaces Bear Form." },
  catform:      { name:"Cat Form", lv:20, school:"phys", icon:"blade", text:"Turn into a cat: fast attacks, energy and combo points, and Prowl. Your main form from 20. From the druid quest The Great Cat Spirit." },
  travelform:   { name:"Travel Form", lv:30, school:"phys", icon:"feather", text:"Run 40% faster outdoors. Instant, and you can pick herbs and talk to people without leaving it." },
  aquatic:      { name:"Aquatic Form", lv:16, school:"poison", icon:"drop", text:"Swim fast and breathe under water. From the druid quest Trial of the Sea Lion." },
  faeriefire:   { name:"Faerie Fire", lv:18, school:"arcane", icon:"star", text:"Lowers an enemy's armor. Works in every form, so it's the easy way to pull from a distance as a cat or a bear." },
  barkskin:     { name:"Barkskin", lv:44, school:"poison", icon:"shield", text:"You take less damage for a while. Works in every form. Use it often." },
  shadowmeld:   { name:"Shadowmeld", lv:1, school:"racial", icon:"eye", text:"Night elf racial. Hide while you stand still. In WoW: Forever it works in a fight too: enemies lose you as a target." },
  eluneslight:  { name:"Elune's Light", lv:1, school:"racial", icon:"star", text:"Night elf racial, new in WoW: Forever. For a short time you get more critical hits. Use it for hard fights." },

  /* cat bar */
  claw:         { name:"Claw", lv:20, school:"phys", icon:"slash", text:"Your main cat attack. Adds 1 combo point." },
  shred:        { name:"Shred", lv:20, school:"phys", icon:"blade", text:"A bigger hit, but only from behind the enemy. Adds 1 combo point. Use it after Prowl or Pounce." },
  rip:          { name:"Rip", lv:20, school:"phys", icon:"drop", text:"Finisher: a long bleed. Best with 4–5 combo points on enemies that live a while." },
  rake:         { name:"Rake", lv:24, school:"phys", icon:"slash", text:"A bite plus a bleed. Adds 1 combo point." },
  bite:         { name:"Ferocious Bite", lv:24, school:"phys", icon:"burst", text:"Finisher: one big hit. Best with 4–5 combo points to finish an enemy fast." },
  prowl:        { name:"Prowl", lv:20, school:"phys", icon:"eye", text:"The cat's stealth: sneak almost invisibly. Start fights from it with Ravage or Pounce." },
  dash:         { name:"Dash", lv:26, school:"phys", icon:"feather", text:"Run very fast for a few seconds in Cat Form. Your escape button." },
  cower:        { name:"Cower", lv:28, school:"phys", icon:"arrow", text:"Makes an enemy less angry at you. For dungeons." },
  ravage:       { name:"Ravage", lv:32, school:"phys", icon:"burst", text:"Opener from Prowl, behind the enemy: a huge hit." },
  pounce:       { name:"Pounce", lv:36, school:"phys", icon:"burst", text:"Opener from Prowl: stuns the enemy and makes it bleed." },
  feralchargecat:{ name:"Feral Charge (Cat)", lv:20, school:"phys", icon:"arrow", talent:true, text:"Leap at an enemy from a distance. In WoW: Forever the Feral Charge talent works in Cat Form too." },
  shiftingpower:{ name:"Shifting Power", lv:40, school:"phys", icon:"bulb", talent:true, text:"Turns mana into energy. Press it when your energy is low." },

  /* bear bar */
  maul:         { name:"Maul", lv:10, school:"phys", icon:"slash", text:"Your main bear attack. Costs rage." },
  swipe:        { name:"Swipe", lv:16, school:"phys", icon:"blade", text:"Hits every enemy in front of you. For two or more enemies." },
  demoroar:     { name:"Demoralizing Roar", lv:10, school:"phys", icon:"burst", text:"Enemies near you hit softer for a while." },
  growl:        { name:"Growl", lv:10, school:"phys", icon:"arrow", text:"Makes an enemy attack you. For tanking: grab an enemy that runs to your friends." },
  bash:         { name:"Bash", lv:14, school:"phys", icon:"burst", text:"Stuns the enemy for a few seconds and stops its spell." },
  enrage:       { name:"Enrage", lv:12, school:"phys", icon:"flame", text:"Gives you rage over a few seconds, but lowers your armor. Use it at the start of a fight." },
  lacerate:     { name:"Lacerate", lv:26, school:"phys", icon:"drop", talent:true, text:"A bleed that stacks up to 5 times and makes enemies very angry at you. New for bears in WoW: Forever." },
  primalbite:   { name:"Primal Bite", lv:41, school:"phys", icon:"slash", talent:true, text:"A strong bite that makes enemies very angry at you. Use it whenever it's ready. New for bears in WoW: Forever." },
  feralcharge:  { name:"Feral Charge", lv:20, school:"phys", icon:"arrow", talent:true, text:"Charge an enemy, hold it in place and stop its spell." },
  frenzied:     { name:"Frenzied Regeneration", lv:36, school:"phys", icon:"cross", text:"Turns your rage into health. An emergency button." },
  challengingroar:{ name:"Challenging Roar", lv:28, school:"phys", icon:"burst", text:"Every enemy near you attacks you for a few seconds. For tanking." },

  /* items */
  hearth:       { name:"Hearthstone", lv:1, school:"item", icon:"house", text:"Takes you to the inn you set as home. 1 hour cooldown." },
  mount:        { name:"Striped Nightsaber", lv:40, school:"item", icon:"horse", text:"Your night elf mount. Learn riding from Jartsam in Darnassus; Lelanai gives your first mount free in WoW: Forever." },
  water1: { name:"Refreshing Spring Water", lv:1, school:"item", icon:"drop", text:"Drink it after a fight to refill mana. Sold by innkeepers and drink vendors." },
  water2: { name:"Ice Cold Milk", lv:5, school:"item", icon:"drop", text:"Better water." },
  water3: { name:"Melon Juice", lv:15, school:"item", icon:"drop", text:"Better water." },
  water4: { name:"Sweet Nectar", lv:25, school:"item", icon:"drop", text:"Better water." },
  water5: { name:"Moonberry Juice", lv:35, school:"item", icon:"drop", text:"Better water." },
  water6: { name:"Morning Glory Dew", lv:45, school:"item", icon:"drop", text:"Best vendor water." },
  food1: { name:"Shiny Red Apple", lv:1, school:"item", icon:"bread", text:"Eat it after a fight to refill health. Sold by food vendors." },
  food2: { name:"Tel'Abim Banana", lv:5, school:"item", icon:"bread", text:"Better food from a food vendor." },
  food3: { name:"Snapvine Watermelon", lv:15, school:"item", icon:"bread", text:"Better food from a food vendor." },
  food4: { name:"Goldenbark Apple", lv:25, school:"item", icon:"bread", text:"Better food from a food vendor." },
  food5: { name:"Moon Harvest Pumpkin", lv:35, school:"item", icon:"bread", text:"Better food from a food vendor." },
  food6: { name:"Deep Fried Plantains", lv:45, school:"item", icon:"bread", text:"Better food from a food vendor." },
  food7: { name:"Homemade Cherry Pie", lv:55, school:"item", icon:"bread", text:"Best vendor food. Sold by bakers." }
};


/* ---------- real WoW icons (from assets/icons, copied from the game) ----------
   If one can't load, the simple drawings above are shown instead. */
const ICONS = {
  wrath:"spell_nature_abolishmagic", moonfire:"spell_nature_starfall", rejuv:"spell_nature_rejuvenation",
  regrowth:"spell_nature_resistnature", healingtouch:"spell_nature_healingtouch", roots:"spell_nature_stranglevines",
  naturesgrasp:"spell_nature_natureswrath", curepoison:"spell_nature_nullifypoison", abolish:"spell_nature_nullifypoison_02",
  removecurse:"spell_holy_removecurse", hibernate:"spell_nature_sleep", innervate:"spell_nature_lightning",
  tranquility:"spell_nature_tranquility", motw:"spell_nature_regeneration", thorns:"spell_nature_thorns",
  teleport:"spell_arcane_teleportmoonglade", revive:"ability_druid_lunarguidance", rebirth:"spell_nature_reincarnation",
  soothe:"ability_hunter_beastsoothe", tracking:"ability_tracking",
  bearform:"ability_racial_bearform", direbear:"ability_racial_bearform", catform:"ability_druid_catform",
  travelform:"ability_druid_travelform", aquatic:"ability_druid_aquaticform", faeriefire:"spell_nature_faeriefire",
  barkskin:"spell_nature_stoneclawtotem", shadowmeld:"ability_ambush", eluneslight:"spell_nature_moonglow",
  claw:"ability_druid_rake", shred:"spell_shadow_vampiricaura", rip:"ability_ghoulfrenzy", rake:"ability_druid_disembowel",
  bite:"ability_druid_ferociousbite", prowl:"ability_ambush", dash:"ability_druid_dash", cower:"ability_druid_cower",
  ravage:"ability_druid_ravage", pounce:"ability_druid_supriseattack", feralchargecat:"ability_hunter_pet_bear",
  shiftingpower:"spell_druid_displacement",
  maul:"ability_druid_maul", swipe:"inv_misc_monsterclaw_03", demoroar:"ability_druid_demoralizingroar",
  growl:"ability_physical_taunt", bash:"ability_druid_bash", enrage:"ability_druid_enrage", lacerate:"ability_druid_lacerate",
  primalbite:"ability_racial_cannibalize", feralcharge:"ability_hunter_pet_bear", frenzied:"ability_bullrush",
  challengingroar:"ability_druid_challangingroar",
  hearth:"inv_misc_rune_01", mount:"ability_mount_blackpanther",
  water1:"inv_drink_07", water2:"inv_drink_milk_01", water3:"inv_drink_09", water4:"inv_drink_12", water5:"inv_drink_02", water6:"inv_potion_01",
  food1:"inv_misc_food_19", food2:"inv_misc_food_24", food3:"inv_misc_food_22", food4:"inv_misc_food_20",
  food5:"inv_misc_food_25", food6:"inv_misc_food_23", food7:"inv_misc_food_10"
};

/* ---------- which key holds what, from which level ---------- */
/* each slot: [key label, [[fromLevel, spellId], ...]]
   A druid's main bar (keys 1 to =) changes by itself with the form: one set in night elf form,
   one in Cat Form and one in Bear Form. The bottom left, right and bottom right bars never change,
   so the forms and the spells you need in every form live there. */
const BARS = [
  { id:"main", title:"Main bar: night elf form", how:"Keys 1 to =, when you're not in a form. Spells and heals.",
    slots:[
      ["1", [[1,"wrath"]]],
      ["2", [[4,"moonfire"]]],
      ["3", [[4,"rejuv"]]],
      ["4", [[12,"regrowth"]]],
      ["5", [[1,"healingtouch"]]],
      ["6", [[8,"roots"]]],
      ["7", [[10,"naturesgrasp"]]],
      ["8", [[16,"curepoison"],[26,"abolish"]]],
      ["9", [[24,"removecurse"]]],
      ["0", [[18,"hibernate"]]],
      ["-", [[40,"innervate"]]],
      ["=", [[30,"tranquility"]]]
    ]},
  { id:"cat", frame:true, where:"Key {key} <small>cat bar (in Cat Form)</small>", title:"Main bar in Cat Form", how:"The same keys 1 to =. The game shows this set by itself while you're a cat: put the spells on it while you're in Cat Form.",
    slots:[
      ["1", [[20,"claw"]]],
      ["2", [[20,"rip"]]],
      ["3", [[24,"rake"]]],
      ["4", [[24,"bite"]]],
      ["5", [[20,"shred"]]],
      ["6", [[40,"shiftingpower"]]],
      ["7", [[26,"dash"]]],
      ["8", [[28,"cower"]]],
      ["9", [[36,"pounce"]]],
      ["0", [[32,"ravage"]]],
      ["-", [[20,"feralchargecat"]]],
      ["=", [[20,"prowl"]]]
    ]},
  { id:"bear", frame:true, where:"Key {key} <small>bear bar (in Bear Form)</small>", title:"Main bar in Bear Form", how:"The same keys 1 to =. The game shows this set by itself while you're a bear: put the spells on it while you're in Bear Form.",
    slots:[
      ["1", [[10,"maul"]]],
      ["2", [[16,"swipe"]]],
      ["3", [[10,"demoroar"]]],
      ["4", [[26,"lacerate"]]],
      ["5", [[41,"primalbite"]]],
      ["6", [[10,"growl"]]],
      ["7", [[14,"bash"]]],
      ["8", [[12,"enrage"]]],
      ["9", [[20,"feralcharge"]]],
      ["0", [[36,"frenzied"]]],
      ["-", [[28,"challengingroar"]]],
      ["=", []]
    ]},
  { id:"shift", title:"Bottom left bar", how:"Shift + 1 to =. This bar never changes, so it holds your forms and the buttons you need in every form.",
    slots:[
      ["S1", [[10,"bearform"],[40,"direbear"]]],
      ["S2", [[20,"catform"]]],
      ["S3", [[30,"travelform"]]],
      ["S4", [[20,"aquatic"]]],
      ["S5", [[18,"faeriefire"]]],
      ["S6", [[44,"barkskin"]]],
      ["S7", [[1,"shadowmeld"]]],
      ["S8", [[1,"eluneslight"]]],
      ["S9", []],
      ["S0", []],
      ["S-", []],
      ["S=", []]
    ]},
  { id:"side", title:"Right bar", how:"Click these with the mouse between fights. No key needed.",
    slots:[
      ["", [[1,"motw"]]],
      ["", [[6,"thorns"]]],
      ["", [[10,"teleport"]]],
      ["", [[12,"revive"]]],
      ["", [[20,"rebirth"]]],
      ["", [[22,"soothe"]]],
      ["", [[32,"tracking"]]],
      ["", [[1,"hearth"]]],
      ["", [[40,"mount"]]]
    ]},
  { id:"alt", title:"Bottom right bar", how:"Alt + 1 and Alt + 2. Water and food. In WoW: Forever you can use them in any form.",
    slots:[
      ["A1", [[1,"water1"],[5,"water2"],[15,"water3"],[25,"water4"],[35,"water5"],[45,"water6"]]],
      ["A2", [[1,"food1"],[5,"food2"],[15,"food3"],[25,"food4"],[35,"food5"],[45,"food6"],[55,"food7"]]]
    ]}
];
