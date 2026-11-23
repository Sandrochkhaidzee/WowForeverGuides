/* Settings the shared guide engine (assets/js/guide.js) reads for this character. */
const GUIDE_PAGE = {
  character: "gnome-mage",
  saveKey: "gnomeMageBeginner.v1",
  addonsHref: "../addons.html?c=gnome-mage",
  abilityWord: "Spell",
  abilitiesWord: "spells",
  itemNote: { test: /^(water|food|managem)/, text: "Water, food and gems are items: they show up in your bags after you cast the Conjure spell. Drag them from your bag (<kbd>B</kbd>) onto the key shown. When a better one replaces an old one, drop the new one on the same key and sell or eat up the old ones." }
};

/* =========================================================
   Gnome Mage — beginner guide
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

/* ---------- Coldridge Valley, levels 1–6 ---------- */
{ chapter:"Coldridge Valley", lv:"1", place:"Coldridge Valley", title:"Before you do anything", map:[["dunmorogh",[29.9,71.2,"You start here, outside Anvilmar"]]], learn:["fireball","frostarmor","arcaneint","eureka","escape","hearth"],
  done:"every spell in the <b>Action bar</b> box below is on its key and your buffs are on.",
  todo:[
    "Press <kbd>P</kbd> to open your spellbook.",
    "Drag each spell from your spellbook to the key shown in the <b>Action bar</b> box below. If the extra bars aren't showing yet, see <b>How to set this up in game</b> on the Action Bars tab.",
    "Click each one to cast it on yourself. These are your buffs. Recast them whenever their icons disappear from the top right of your screen."
  ],
  tip:"Fireball is already on key <kbd>1</kbd>. That's your attack for now." },

{ lv:"1", place:"Coldridge Valley", title:"Your first quest", quests:{179:"Dwarven Outfitters"}, pickup:{3114:"Glyphic Memorandum"}, map:[["dunmorogh",[29.9,71.2,"Sten Stoutarm"],[26.5,75.5,"Wolves"]]],
  done:"you've handed in <b>Dwarven Outfitters</b> and have <b>Glyphic Memorandum</b> in your quest log.",
  todo:[
    "Talk to <b>Sten Stoutarm</b>, the dwarf right in front of you. He has a yellow <b>!</b> over his head. Accept <b>Dwarven Outfitters</b>.",
    "Walk south-west and kill ragged wolves until you have <b>8 Tough Wolf Meat</b>.",
    "Go back to Sten. He now has a yellow <b>?</b>. Talk to him to turn in the quest, then take your mage quest, <b>Glyphic Memorandum</b>."
  ],
  tip:"How to fight: click a wolf to target it, then press <kbd>1</kbd> while standing still. Start casting before it reaches you." },

{ lv:"1–3", place:"Coldridge Valley", title:"Meet your trainer and the troggs", quests:{3114:"Glyphic Memorandum", 170:"A New Threat"}, pickup:{233:"Coldridge Valley Mail Delivery", 3361:"A Refugee's Quandary"}, map:[["dunmorogh",[28.7,66.4,"Marryk Nurribit (inside Anvilmar)"],[29.9,71.2,"Sten and Balir"],[28,79,"Troggs"]]],
  done:"Marryk has the <b>Glyphic Memorandum</b> and you've handed in <b>A New Threat</b>.", stuck:"Fight the troggs south of Anvilmar until you're level 3.",
  todo:[
    "Take <b>Glyphic Memorandum</b> to <b>Marryk Nurribit</b>, the mage trainer inside Anvilmar, the building behind Sten.",
    "Take <b>A New Threat</b> from <b>Balir Frosthammer</b> next to Sten: kill <b>6 Rockjaw Troggs</b> and <b>6 Burly Rockjaw Troggs</b> in the hills south of the wolves. Hand it back to Balir.",
    "Take <b>Coldridge Valley Mail Delivery</b> from Sten for the next step. In Anvilmar, the gnome <b>Felix Whindlebolt</b> gives <b>A Refugee's Quandary</b>: his lost box, chest and bucket are in the troll camps in the south-west."
  ],
  tip:"After every fight, if your health or mana is low, sit and eat or drink before the next one. It saves you from dying." },

{ lv:"3–5", place:"Coldridge Valley", title:"Deliver the mail", quests:{233:"Coldridge Valley Mail Delivery", 234:"Coldridge Valley Mail Delivery", 182:"The Troll Cave", 218:"The Stolen Journal"}, pickup:{183:"The Boar Hunter", 3364:"Scalding Mornbrew Delivery", 282:"Senir's Observations"}, map:[["dunmorogh",[22.6,71.4,"Talin Keeneye"],[25.1,75.7,"Grelin Whitebeard's camp"],[26.8,79.2,"Troll cave"],[22.8,79.9,"Felix's things (troll camps)"]]],
  done:"Grik'nir is dead, <b>The Stolen Journal</b> is handed in, and <b>Scalding Mornbrew Delivery</b> is in your quest log.", stuck:"Fight the young trolls in the cave until you're level 5.",
  todo:[
    "Walk west from Anvilmar to <b>Talin Keeneye</b> and give him the mail. Take <b>The Boar Hunter</b> (kill small crag boars around his camp) and the next mail delivery.",
    "Take the mail to <b>Grelin Whitebeard</b>'s camp to the south. Take <b>The Troll Cave</b>: kill <b>14 Frostmane troll whelps</b> in and around the cave.",
    "Then <b>The Stolen Journal</b>: go into the cave, keep to the left, kill <b>Grik'nir the Cold</b> and loot the journal. Hand both to Grelin.",
    "Pick up Felix's <b>box</b>, <b>chest</b> and <b>bucket of bolts</b> in the troll camps here. At Grelin's camp, <b>Nori Pridedrift</b> gives <b>Scalding Mornbrew Delivery</b>, and Grelin gives <b>Senir's Observations</b>."
  ],
  tip:"In caves, enemies stand close together. Fight them one at a time: target the closest one and step back so you don't pull its friends." },

{ lv:"4", place:"Marryk Nurribit (trainer)", title:"Level 4: your main spell", map:[["dunmorogh",[28.7,66.4,"Marryk Nurribit (mage trainer)"]]], learn:["frostbolt","fireball","conjurewater","water1"],
  done:"Frostbolt is on <kbd>1</kbd>, Fireball on <kbd>Shift</kbd> + <kbd>-</kbd>, and your water is on <kbd>Alt</kbd> + <kbd>1</kbd>.",
  todo:[
    "Go back to Marryk and learn <b>Frostbolt</b> and <b>Conjure Water</b>.",
    "Put Frostbolt on key <kbd>1</kbd> and move Fireball to <kbd>Shift</kbd> + <kbd>-</kbd>. Frostbolt slows the enemy, so it takes longer to reach you.",
    "Cast Conjure Water a few times. It makes <b>Conjured Water</b> in your bags. Drag that water onto <kbd>Alt</kbd> + <kbd>1</kbd> and drink it (press <kbd>Alt</kbd> + <kbd>1</kbd>) whenever your mana is low."
  ] },

{ lv:"5", place:"Anvilmar", title:"Hot mornbrew and Felix's things", quests:{3364:"Scalding Mornbrew Delivery", 3365:"Bring Back the Mug", 3361:"A Refugee's Quandary"}, pickup:{97277:"Grund and Gozwin"}, map:[["dunmorogh",[28.7,66.4,"Anvilmar"],[25.1,75.7,"Nori Pridedrift (Grelin's camp)"]]],
  done:"you've handed in <b>Scalding Mornbrew Delivery</b>, <b>Bring Back the Mug</b> and <b>A Refugee's Quandary</b>.",
  todo:[
    "<b>Scalding Mornbrew Delivery</b>: run the hot mornbrew straight to <b>Durnan Furcutter</b> in Anvilmar before it goes cold. Don't stop to fight on the way.",
    "Durnan gives <b>Bring Back the Mug</b>: take the empty mug back to Nori at Grelin's camp.",
    "Give Felix his three things in Anvilmar. If <b>Grund Drokda</b> at Anvilmar offers <b>Grund and Gozwin</b>, do it too: the reward is a 6-slot bag. Right-click a new bag to put it in a free bag slot."
  ] },

{ lv:"6", place:"Marryk Nurribit (trainer)", title:"Level 6: train again", map:[["dunmorogh",[28.7,66.4,"Marryk Nurribit (mage trainer)"]]], learn:["fireblast","conjurefood","comprehend","food1"],
  done:"Fire Blast is on <kbd>2</kbd> and your muffins are on <kbd>Alt</kbd> + <kbd>2</kbd>.",
  todo:[
    "Learn <b>Fire Blast</b>, <b>Conjure Food</b> and <b>Comprehend Scroll</b>.",
    "Cast Conjure Food. It makes <b>Conjured Muffins</b> in your bags. Drag them onto <kbd>Alt</kbd> + <kbd>2</kbd> and eat (press <kbd>Alt</kbd> + <kbd>2</kbd>) whenever your health is low.",
    "Put Fire Blast on key <kbd>2</kbd>. It hits instantly. Use it whenever it's ready.",
    "Visit the junior gathering trainers nearby and take the free gathering book."
  ],
  tip:"Comprehend Scroll is a mage-only skill in Forever. Monsters sometimes drop odd scrolls; use it on them to get free buffs and small spells." },

{ lv:"6", place:"Coldridge Pass", title:"Leave the valley", quests:{282:"Senir's Observations"}, pickup:{2160:"Supplies to Tannok"}, map:[["dunmorogh",[33.9,72.2,"Coldridge Pass: Thalos and Hands Springsprocket"],[46.7,53,"Kharanos"]]],
  done:"you're in Kharanos with <b>Supplies to Tannok</b> in your quest log.",
  todo:[
    "At the tunnel out of the valley (Coldridge Pass), hand <b>Senir's Observations</b> to <b>Mountaineer Thalos</b> and do the second part he gives you.",
    "Take <b>Supplies to Tannok</b> from <b>Hands Springsprocket</b>.",
    "Walk through the tunnel to the town of <b>Kharanos</b>."
  ] },

/* ---------- Kharanos, levels 6–11 ---------- */
{ chapter:"Kharanos", lv:"6", place:"Kharanos", title:"Make Kharanos your home", quests:{2160:"Supplies to Tannok"}, map:[["dunmorogh",[47.3,52.4,"Thunderbrew Distillery (inn)"]]],
  done:"your Hearthstone says <b>Kharanos</b> when you hover over it, and <b>Supplies to Tannok</b> is handed in.",
  todo:[
    "Find the innkeeper in the Thunderbrew Distillery (the big inn) and choose <b>Make this inn your home</b>.",
    "Your <b>Hearthstone</b> (in your bag) now teleports you back here. It has a 1 hour cooldown.",
    "Hand <b>Supplies to Tannok</b> to <b>Tannok Frosthammer</b> in the inn."
  ],
  tip:"Always log out inside an inn. You'll get bonus XP (called rested XP) when you come back." },

{ lv:"6", place:"Kharanos", title:"Learn Cooking", quests:{384:"Beer Basted Boar Ribs"}, map:[["dunmorogh",[47.3,52.4,"Thunderbrew Distillery"]]],
  done:"you've learned Cooking and handed in <b>Beer Basted Boar Ribs</b>.",
  todo:[
    "Find the cooking trainer in Kharanos and learn Cooking.",
    "Do <b>Beer Basted Boar Ribs</b> from <b>Ragnar Thunderbrew</b> by the inn door: kill crag boars on the roads for <b>Crag Boar Ribs</b>, buy the <b>Rhapsody Malt</b> in the inn, and cook. It teaches you a recipe.",
    "Cooked food gives the <b>Well Fed</b> buff: 5% more XP from kills."
  ] },

{ lv:"6–7", place:"Kharanos", title:"Grab every quest in town", quests:{420:"Senir's Observations", 317:"Stocking Jetsteam", 313:"The Grizzled Den", 5541:"Ammo for Rumbleshot"}, pickup:{287:"Frostmane Hold", 412:"Operation Recombobulation"}, map:[["dunmorogh",[46.7,53,"Kharanos"],[49.4,48.4,"Steelgrill's Depot"],[42.5,53,"The Grizzled Den"],[44,56,"Wrecked camp (ammo crate)"],[40.6,65.1,"Hegnar Rumbleshot"]]],
  done:"you've handed in <b>Stocking Jetsteam</b>, <b>The Grizzled Den</b> and <b>Ammo for Rumbleshot</b>.", stuck:"Fight the boars, bears and wendigos near Kharanos until you're level 7.",
  todo:[
    "At <b>Steelgrill's Depot</b>, the gnome hangar just north-east of town, take <b>Stocking Jetsteam</b> (Pilot Bellowfiz: <b>4 Chunks of Boar Meat</b> and <b>2 Thick Bear Furs</b>), <b>The Grizzled Den</b> (Pilot Stonegear: <b>Wendigo Manes</b> from the wendigos in the cave west of town) and <b>Ammo for Rumbleshot</b> (Loslor Rudge).",
    "<b>Ammo for Rumbleshot</b>: pick up the ammo crate at the wrecked camp just south of Kharanos and take it to <b>Hegnar Rumbleshot</b>, further south along the road.",
    "In town, also take <b>Frostmane Hold</b> from <b>Senir Whitebeard</b> and <b>Operation Recombobulation</b> from <b>Razzle Sprysprocket</b>.",
    "Hand the Depot quests back at the Depot. Press <kbd>L</kbd> to open your quest log: each quest says how many you need."
  ] },

{ lv:"7–9", place:"West of Kharanos", title:"Gnome quest: fix the machines", quests:{412:"Operation Recombobulation"}, map:[["dunmorogh",[45.9,49.4,"Razzle Sprysprocket"],[25.5,41.5,"Leper Gnomes"]]],
  done:"Razzle has his gears and cogs.", stuck:"Fight the Leper Gnomes west of Kharanos until you're level 8.",
  todo:[
    "For <b>Operation Recombobulation</b>, go west toward Gnomeregan and kill the Leper Gnomes outside it for <b>Gyromechanic Gears</b> and <b>Restabilization Cogs</b>. Don't go into Gnomeregan itself.",
    "Bring them back to Razzle Sprysprocket in Kharanos."
  ] },

{ lv:"8", place:"Magis Sparkmantle (trainer, Kharanos)", title:"Level 8: Polymorph", map:[["dunmorogh",[47.3,52.4,"Magis Sparkmantle (Kharanos)"]]], learn:["polymorph","arcanemissiles"],
  done:"Polymorph is on <kbd>5</kbd> and Arcane Missiles on <kbd>=</kbd>.",
  todo:[
    "Kharanos has its own mage trainer, <b>Magis Sparkmantle</b>. Learn <b>Polymorph</b> and <b>Arcane Missiles</b>.",
    "Put Polymorph on key <kbd>5</kbd> and Arcane Missiles on key <kbd>=</kbd>."
  ],
  tip:"If two enemies attack you, cast Polymorph on one of them. It turns into a sheep and can't fight for a while. Kill the other one, then deal with the sheep. Don't hit the sheep, or it wakes up." },

{ lv:"8–10", place:"Brewnall Village and the troll camps", title:"Trolls, stout and the beer feud", quests:{287:"Frostmane Hold", 315:"The Perfect Stout", 413:"Shimmer Stout", 319:"A Favor for Evershine", 310:"Bitter Rivals", 308:"Distracting Jarven", 311:"Return to Marleth"}, map:[["dunmorogh",[30.5,45.5,"Brewnall Village (Rejold and Marleth)"],[37,42,"Shimmer Ridge (path up at the camp)"],[25,51,"Frostmane Hold"],[47.3,52.4,"Kharanos inn (Jarven)"]]],
  done:"you've handed in <b>Frostmane Hold</b>, <b>Shimmer Stout</b>, <b>Return to Marleth</b> and <b>A Favor for Evershine</b>, and you're level 10.", stuck:"Fight the Frostmane trolls at Shimmer Ridge until you are.",
  todo:[
    "<b>Frostmane Hold</b>: go to the troll cave in the south-west, walk in far enough to get the <b>Explore</b> message, and kill <b>5 Frostmane Headhunters</b>. Hand it back to Senir in Kharanos.",
    "At <b>Brewnall Village</b> by the frozen lake, <b>Rejold Barleybrew</b> gives the stout quests: <b>The Perfect Stout</b> and then <b>Shimmer Stout</b>. Climb the path up to <b>Shimmer Ridge</b>, kill the trolls and loot the baskets for <b>Shimmerweed</b>. He also gives <b>A Favor for Evershine</b> (bears, boars and leopards).",
    "<b>Marleth Barleybrew</b>, also in Brewnall, gives <b>Bitter Rivals</b>. In the Kharanos inn, buy a <b>Thunder Ale</b> from the innkeeper and give it to <b>Jarven Thunderbrew</b> (<b>Distracting Jarven</b>), then click the unguarded barrel behind him and take <b>Return to Marleth</b> back to Brewnall.",
    "If you see a new quest about <b>snow leopards</b> or <b>wendigos</b>, take it too. Forever added a new chain around this level."
  ],
  tip:"Trolls come in groups. Pull one at a time with Frostbolt from far away." },

{ lv:"10", place:"Magis Sparkmantle (trainer, Kharanos)", title:"Level 10: Frost Nova and your first talent", pickup:{1879:"Speak with Bink"}, map:[["dunmorogh",[47.3,52.4,"Magis Sparkmantle (Kharanos)"]]], learn:["frostnova","water2"],
  done:"Frost Nova is on <kbd>3</kbd>, your new water is on <kbd>Alt</kbd> + <kbd>1</kbd>, and your talent point is in Precision.",
  todo:[
    "Learn <b>Frost Nova</b> and the new rank of <b>Conjure Water</b>. Put Frost Nova on key <kbd>3</kbd> and the new water on <kbd>Alt</kbd> + <kbd>1</kbd>.",
    "Press <kbd>N</kbd> to open talents. Click the <b>Frost</b> tab and put your point into <b>Precision</b>: your spells miss less often.",
    "Magis also gives you <b>Speak with Bink</b>, a mage quest in Ironforge. Keep it for later."
  ],
  tip:"The combo to learn now: Frostbolt the enemy. When it reaches you, press Frost Nova. It freezes in place. Walk a few steps away and keep casting Frostbolt." },

{ lv:"10", place:"Gol'Bolar Quarry (east)", title:"The quarry", quests:{432:"Those Blasted Troggs!", 433:"The Public Servant", 96390:"Nip 'Em in the Bud", 96391:"Underground Map"}, pickup:{96393:"Old Ironforge Incursion"}, map:[["dunmorogh",[68.9,56,"Gol'Bolar Quarry"],[74,53,"Dark Iron Spies"]]],
  done:"you've handed in <b>Those Blasted Troggs!</b>, <b>The Public Servant</b> and <b>Nip 'Em in the Bud</b>.", stuck:"Fight the troggs at the quarry until you're level 11.",
  todo:[
    "Follow the road east to Gol'Bolar Quarry.",
    "Take <b>Those Blasted Troggs!</b> from Foreman Stonebrow (Rockjaw Skullthumpers in the quarry) and <b>The Public Servant</b> from Senator Mehr Stonehallow (Rockjaw Bonesnappers in the mine). Your quest log says how many.",
    "Talk to <b>Earthseer Farsen</b> and take <b>Nip 'Em in the Bud</b>: kill 10 Dark Iron Spies east of the quarry. Your quest log calls it a level 13 quest, but the spies are only level 9–11.",
    "One spy drops a <b>Dark Iron Map</b>. Right-click it, bring it to Farsen and take <b>Old Ironforge Incursion</b>. That's a dungeon quest for later."
  ] },

{ lv:"10–11", place:"Dun Morogh", title:"Wrap up Dun Morogh", pickup:{414:"Stout to Kadrell"}, map:[["dunmorogh",[46.7,53,"Kharanos"],[86,48,"South Gate Outpost (Mountaineer Barleybrew)"]]],
  done:"Kharanos and Brewnall have nothing left for you and <b>Stout to Kadrell</b> is in your log.",
  todo:[
    "Turn in everything in Kharanos and Brewnall.",
    "Skip <b>Protecting the Herd</b>. Its boss, Vagash, is an <b>elite</b>, too strong to fight alone.",
    "On the road east, at the <b>South Gate Outpost</b>, <b>Mountaineer Barleybrew</b> gives <b>Stout to Kadrell</b>: carry the cask to Mountaineer Kadrell in Thelsamar, Loch Modan."
  ] },

/* ---------- Ironforge ---------- */
{ chapter:"Ironforge", lv:"10–11", place:"Ironforge", title:"Visit Ironforge", map:[["dunmorogh",[53.5,34.9,"Gates of Ironforge"]],["ironforge",[15,85,"You come in here"],[55.5,47.7,"Gryphon master"]]],
  done:"you've unlocked the Ironforge flight path and learned Tailoring and Enchanting.",
  todo:[
    "Follow the road north from Kharanos to the big gate of <b>Ironforge</b>.",
    "Inside, find the gryphon master and talk to him to unlock the <b>flight path</b>.",
    "Find the Tailoring and Enchanting trainers and learn both. Tailoring lets you make your own clothes from the cloth enemies drop. Step-by-step leveling routes are on the <a href=\"../professions.html?c=gnome-mage\">Professions page</a>."
  ],
  tip:"Lost in Ironforge? Ask any guard. Click them and they'll mark the place on your map." },

{ lv:"10–11", place:"Ironforge, Mystic Ward", title:"Mage quest: Bink", quests:{1879:"Speak with Bink", 1880:"Mage-tastic Gizmonitor"}, map:[["ironforge",[26.5,8.5,"Bink (Hall of Mysteries)"]],["dunmorogh",[27,36,"Hut north of Gnomeregan (chest)"]]],
  done:"you've handed in <b>Mage-tastic Gizmonitor</b> to Bink and picked the Arcane Staff or Arcane Orb.",
  todo:[
    "Go to the Mystic Ward and find <b>Bink</b> in the Hall of Mysteries. Turn in <b>Speak with Bink</b>.",
    "She gives <b>Mage-tastic Gizmonitor</b>. Go west in Dun Morogh to the huts just north of Gnomeregan: the gizmonitor is in a small chest inside the hut on the right.",
    "Lots of Leper Gnomes walk around there. Polymorph one if two come at you. <b>Don't go inside Gnomeregan</b>: everything there is much too strong for you.",
    "Bring it back to Bink and choose your reward: the <b>Arcane Staff</b> (a two-handed staff, the better pick) or the <b>Arcane Orb</b> (an off-hand item)."
  ] },

{ lv:"10–13", place:"Ironforge", title:"Get a wand and a dungeon quest", pickup:{96403:"Important Heirlooms"}, map:[["ironforge",[25,74,"Auction house"],[32.2,44.5,"Thom Filch (hall north-west of the High Seat)"]]], learn:["shoot"],
  done:"a wand is equipped, Shoot is on <kbd>6</kbd>, and <b>Important Heirlooms</b> is in your log.",
  todo:[
    "Buy a <b>Lesser Magic Wand</b> from the auction house, or ask an enchanter to make you one. At level 13, upgrade to a <b>Greater Magic Wand</b>.",
    "Put your wand's <b>Shoot</b> on key <kbd>6</kbd>. Use it to finish enemies that are almost dead. It costs no mana.",
    "Find <b>Thom Filch</b> in the hall just north-west of the king's throne room (the High Seat) and take <b>Important Heirlooms</b>. It's for the Hall of Thanes dungeon later."
  ] },

/* ---------- Loch Modan, levels 11–19 ---------- */
{ chapter:"Loch Modan", lv:"11", place:"Road to Loch Modan", title:"Move to Loch Modan", pickup:{267:"The Trogg Threat", 224:"In Defense of the King's Lands"}, map:[["dunmorogh",[46.7,53,"Kharanos"],[87.5,50,"Tunnel to Loch Modan"]],["lochmodan",[23.3,74,"Southern guard tower"]]],
  done:"you have <b>The Trogg Threat</b> and <b>In Defense of the King's Lands</b>.",
  todo:[
    "From Kharanos, follow the road east through the mountain tunnel into <b>Loch Modan</b>.",
    "At the southern guard tower, take <b>The Trogg Threat</b> from <b>Captain Rugelfuss</b> (8 Trogg Stone Teeth) and <b>In Defense of the King's Lands</b> from <b>Mountaineer Cobbleflint</b> (10 Stonesplinter Troggs and 10 Stonesplinter Scouts).",
    "Both are done in <b>Stonesplinter Valley</b>, south of Thelsamar: the troggs drop the teeth."
  ] },

{ lv:"12", place:"Thelsamar", title:"Your new home: Thelsamar", quests:{414:"Stout to Kadrell"}, pickup:{416:"Rat Catching", 1339:"Mountaineer Stormpike's Task", 418:"Thelsamar Blood Sausages", 436:"Ironband's Excavation"}, map:[["lochmodan",[35,47,"Thelsamar"]]],
  done:"Thelsamar is your home, the flight path is unlocked and the quests above are in your log.",
  todo:[
    "Follow the road to the town of <b>Thelsamar</b>.",
    "Make the inn your home. Unlock the flight path. Hand <b>Stout to Kadrell</b> to <b>Mountaineer Kadrell</b>.",
    "Take every quest in town: <b>Rat Catching</b> and <b>Mountaineer Stormpike's Task</b> (Kadrell), <b>Thelsamar Blood Sausages</b> (Vidra Hearthstove) and <b>Ironband's Excavation</b> (Jern Hornhelm)."
  ],
  tip:"There's no mage trainer here. Every two levels, fly to Ironforge to train. It's a short flight." },

{ lv:"12", place:"Ironforge (fly)", title:"Level 12: train", map:[["ironforge",[26.5,8.5,"Mage trainers (Hall of Mysteries)"],[55.5,47.7,"Gryphon master: you land here"]]], learn:["slowfall","food2"],
  done:"you've learned the new ranks, your new food is on <kbd>Alt</kbd> + <kbd>2</kbd>, and you've spent your talent point.",
  todo:[
    "Fly to Ironforge, open the mage trainer, and learn everything you can afford, including the new rank of <b>Conjure Food</b> (Conjured Bread).",
    "Spend your talent point (<kbd>N</kbd>): <b>Improved Frostbolt</b>."
  ],
  tip:"From now on, train every even level and spend a talent point every level. The Talents tab of this guide tells you which one." },

{ lv:"12–14", place:"Loch Modan", title:"Troggs, rats and the mine", quests:{267:"The Trogg Threat", 224:"In Defense of the King's Lands", 416:"Rat Catching", 1339:"Mountaineer Stormpike's Task", 307:"Filthy Paws"}, pickup:{1338:"Stormpike's Order"}, map:[["lochmodan",[24.8,18.4,"Mountaineer Stormpike (Algaz Station)"],[35,19,"Silver Stream Mine"],[30,70,"Stonesplinter Valley (troggs)"],[30,40,"Tunnel rat kobolds (hills west of town)"]]],
  done:"you've handed in <b>The Trogg Threat</b>, <b>In Defense of the King's Lands</b>, <b>Rat Catching</b> and <b>Filthy Paws</b>, and you're level 14.", stuck:"Fight the troggs in Stonesplinter Valley until you are.",
  todo:[
    "<b>Rat Catching</b>: kill the tunnel rat kobolds on the mountainside west of Thelsamar for <b>12 Tunnel Rat Ears</b>.",
    "Finish <b>The Trogg Threat</b> and <b>In Defense of the King's Lands</b> in Stonesplinter Valley and hand them in at the southern tower. Take the next parts if they're offered.",
    "<b>Mountaineer Stormpike's Task</b>: ride north to <b>Mountaineer Stormpike</b> at Algaz Station. He gives <b>Filthy Paws</b>: open the <b>Miners' League Crates</b> in the <b>Silver Stream Mine</b> for <b>4 Miners' Gear</b>. Then he gives <b>Stormpike's Order</b>, a letter for Stormwind (you go there at level 15).",
    "Take any new quests you see. Loch Modan has 11 new ones in Forever."
  ] },

{ lv:"13–18", place:"Under Ironforge", title:"Your first dungeon: Hall of Thanes", quests:{96403:"Important Heirlooms", 96393:"Old Ironforge Incursion", 96394:"The Restless Dead", 96395:"An Ancient Grudge"}, map:[["ironforge"]],
  done:"your group has beaten the last boss, or you've decided to skip it.",
  todo:[
    "A dungeon is a private area for a group of 5 players. Hall of Thanes is new in Forever and sits under Ironforge.",
    "Before going, have these quests: <b>Important Heirlooms</b> (Thom Filch) and <b>Old Ironforge Incursion</b> (from the quarry). Two more start inside.",
    "Find a group: open the Looking For Group tool or ask in chat (\"LFG Hall of Thanes\").",
    "Inside, stay behind the tank (the player the enemies attack), use Frostbolt, and don't attack before the tank does."
  ],
  tip:"The 5 quests here give about one whole level of XP. Most dungeon XP in Forever comes from quests, not kills." },

{ lv:"14", place:"Ironforge (fly)", title:"Level 14: your first area spell", map:[["ironforge",[26.5,8.5,"Mage trainers (Hall of Mysteries)"],[55.5,47.7,"Gryphon master: you land here"]]], learn:["arcaneexplosion"],
  done:"you've learned Arcane Explosion and it's on <kbd>Shift</kbd> + <kbd>1</kbd>.",
  todo:[
    "Learn <b>Arcane Explosion</b>. It hits every enemy around you, but costs a lot of mana.",
    "You don't need it much while questing alone. It's for later, when you fight groups."
  ] },

{ lv:"15", place:"Stormwind", title:"Mage quest: a free robe", quests:{1338:"Stormpike's Order", 1920:"Investigate the Blue Recluse", 1921:"Gathering Materials", 1941:"Manaweave Robe"}, pickup:{1919:"Report to Jennea"}, map:[["ironforge",[76.5,51,"Deeprun Tram"]],["stormwind",[69.2,30.6,"The tram arrives here"],[49,86,"Jennea Cannon (Mage Quarter)"],[51.8,83.5,"Wynne Larson (Larson Clothiers)"],[71.3,72.2,"Flight master"]],["lochmodan",[35,19,"Silver Stream Mine (Charged Rift Gems)"]]],
  done:"you're wearing the <b>Manaweave Robe</b>, <b>Stormpike's Order</b> is handed in, and Stormwind's flight path is unlocked.",
  todo:[
    "Magis Sparkmantle in Kharanos gives <b>Report to Jennea</b> (optional). In Ironforge, go to Tinker Town and take the <b>Deeprun Tram</b> to Stormwind. Unlock the flight path, and hand <b>Stormpike's Order</b> to <b>Furen Longbeard</b> in the Dwarven District.",
    "In the Mage Quarter, <b>Jennea Cannon</b> gives <b>Investigate the Blue Recluse</b>. Take the items from the table behind her, go to the <b>Blue Recluse</b> tavern, read the Cantation to make the creatures appear, beat them, and use a coffer on each while it's stunned. You need 3.",
    "Next, <b>Gathering Materials</b>: <b>10 Linen Cloth</b> and <b>6 Charged Rift Gems</b>. The gems are in the Miners' League crates in the Silver Stream Mine in Loch Modan.",
    "Give it all to <b>Wynne Larson</b> at Larson Clothiers in the Mage Quarter, then talk to her again for the <b>Manaweave Robe</b>."
  ] },

{ lv:"15–18", place:"Loch Modan", title:"Finish Loch Modan", quests:{418:"Thelsamar Blood Sausages", 436:"Ironband's Excavation"}, map:[["lochmodan",[35,47,"Thelsamar"],[65,65,"Ironband's Excavation"]]],
  done:"you're level 18 and the Thelsamar quests are handed in.", stuck:"Fight the troggs and bears around Thelsamar until you are.",
  todo:[
    "<b>Thelsamar Blood Sausages</b>: bear meat, boar intestines and spider ichor from the bears, boars and spiders around town. Hand it to Vidra.",
    "<b>Ironband's Excavation</b>: ride to Prospector Ironband's dig site in the south-east and follow his quests.",
    "Take the next parts of <b>In Defense of the King's Lands</b> from the dwarves at the southern tower and the dam if they're offered.",
    "Your quest log (<kbd>L</kbd>) says how many of each thing you need. Skip <b>WANTED: Chok'sul</b>: it's an elite."
  ],
  tip:"Running out of quests? Westfall (south of Stormwind) and Redridge Mountains also fit this level." },

{ lv:"16", place:"Ironforge (fly)", title:"Level 16: Flamestrike", map:[["ironforge",[26.5,8.5,"Mage trainers (Hall of Mysteries)"],[55.5,47.7,"Gryphon master: you land here"]]], learn:["flamestrike"],
  done:"Flamestrike is on <kbd>Shift</kbd> + <kbd>3</kbd>.",
  todo:[
    "Fly to Ironforge and learn <b>Flamestrike</b> plus any new ranks.",
    "Flamestrike burns an area on the ground. Cast it right after Frost Nova when several enemies are frozen together."
  ] },

{ lv:"18–19", place:"Loch Modan", title:"Last of Loch Modan: ogres and Ol' Sooty", quests:{255:"Mercenaries", 271:"Vyrin's Revenge", 531:"Vyrin's Revenge", 86614:"Silver of the Waves"}, pickup:{161:"A Dark Threat Looms"}, map:[["lochmodan",[34.6,44.5,"Magistrate Bluntnose (Thelsamar)"],[71,24,"Mo'grosh Stronghold (ogres)"],[37.9,63.4,"Ol' Sooty"],[82.5,64.5,"Farstrider Lodge (Vyrin and Daryl)"],[45.7,43.3,"Discarded Fishing Toolbox"],[40.3,39.3,"Khara Deepwater"],[46,13.6,"Chief Engineer Hinderweir (the dam)"]]],
  done:"you've handed in <b>Mercenaries</b> and both parts of <b>Vyrin's Revenge</b>.", stuck:"Fight the ogres at Mo'grosh Stronghold until you're level 19.",
  todo:[
    "In Thelsamar, <b>Magistrate Bluntnose</b> gives <b>Mercenaries</b>: kill 4 Mo'grosh Ogres, 4 Mo'grosh Brutes and 4 Mo'grosh Enforcers at <b>Mo'grosh Stronghold</b> in the north-east. Ogres hit hard, so pull one at a time with Frostbolt and use Frost Nova when it reaches you.",
    "At the <b>Farstrider Lodge</b> in the east, <b>Vyrin Swiftwind</b> now gives <b>Vyrin's Revenge</b>, because you did Daryl's hunting quests. Kill the bear <b>Ol' Sooty</b> in the hills south of Thelsamar, show its head to <b>Daryl the Youngling</b>, then take it back to Vyrin. Ol' Sooty is level 20: fight it with full mana.",
    "On the lake shore just east of Thelsamar, click the <b>Discarded Fishing Toolbox</b> for <b>Silver of the Waves</b>, and bring the hair clip inside to <b>Khara Deepwater</b>, north of town.",
    "<b>Chief Engineer Hinderweir</b> at the dam has the next part of <b>A Dark Threat Looms</b>. It sends you to Dun Modr in the north of the Wetlands, which is too dangerous now. Keep it in your quest log: the guide takes you there later."
  ],
  tip:"Running low on quests? Every kill here still gives XP. The ogres give the most." },

{ lv:"18", place:"Ironforge (fly)", title:"Level 18: Remove Lesser Curse", map:[["ironforge",[26.5,8.5,"Mage trainers (Hall of Mysteries)"],[55.5,47.7,"Gryphon master: you land here"]]], learn:["removecurse"],
  done:"Remove Lesser Curse is on <kbd>Shift</kbd> + <kbd>9</kbd>.",
  todo:[
    "Learn <b>Remove Lesser Curse</b> and new ranks.",
    "In dungeons, when a party member has a curse on them, click them and cast it. Groups love mages who do this."
  ] },

{ lv:"18–19", place:"Ironforge → Redridge Mountains", title:"Travel to Redridge Mountains", pickup:{244:"Encroaching Gnolls"}, map:[["ironforge",[76.5,51,"Deeprun Tram"]],["stormwind",[69.2,30.6,"The tram arrives here"],[71.3,72.2,"Flight master"]],["elwynn",[42,65,"Goldshire"],[84,69,"Eastvale: the road east to Redridge"]],["redridge",[10.4,71.3,"Guard Parker (where you come in)"],[26.5,46.5,"Lakeshire"],[25.5,59.4,"Lakeshire flight path"]]],
  done:"you're in Lakeshire, you've unlocked its flight path, and <b>Encroaching Gnolls</b> is in your quest log.",
  todo:[
    "From Ironforge, take the <b>Deeprun Tram</b> in Tinker Town to Stormwind.",
    "Leave Stormwind by the main gate and follow the road east through Elwynn Forest, past Goldshire, until it climbs into <b>Redridge Mountains</b>. It's a long walk the first time.",
    "Where the road enters Redridge, <b>Guard Parker</b> gives <b>Encroaching Gnolls</b>.",
    "Follow the road east to the town of <b>Lakeshire</b> by the lake, and talk to the gryphon master to unlock the flight path. From now on you can fly here from Stormwind."
  ],
  tip:"Leave your Hearthstone set to Thelsamar. You go back that way to reach the Wetlands at level 20." },

{ lv:"19–20", place:"Lakeshire, Redridge Mountains", title:"Redridge: the Lakeshire quests", quests:{244:"Encroaching Gnolls", 246:"Assessing the Threat", 98407:"Show of Force", 129:"A Free Lunch", 130:"Visit the Herbalist", 131:"Delivering Daffodils", 125:"The Lost Tools", 92:"Redridge Goulash", 122:"Underbelly Scales"}, map:[["redridge",[25.6,60,"Deputy Feldon"],[27.1,48.6,"Foreman Oslow (broken bridge)"],[17.6,43.8,"Chef Breanna (inn)"],[25.9,47.3,"Verner Osgood"],[36.4,54.7,"Oslow's Toolbox (lake bottom)"],[24,84,"Gnolls south of town"],[10.6,49.3,"Goretusks"],[47.5,38.4,"Tarantulas"],[54.7,76.1,"Condors"],[29.8,68.4,"Black dragon whelps"]]],
  done:"you've handed in <b>Assessing the Threat</b>, <b>Show of Force</b>, <b>The Lost Tools</b>, <b>Redridge Goulash</b> and <b>Underbelly Scales</b>, and you're level 20.", stuck:"Fight the gnolls south of Lakeshire until you are.",
  todo:[
    "Hand <b>Encroaching Gnolls</b> to <b>Deputy Feldon</b> at the south end of town. He gives <b>Assessing the Threat</b> (10 Redridge Mongrels and 6 Redridge Poachers, the gnolls south of town) and <b>Show of Force</b> (5 Spiked Collars from the Redridge Thrashers).",
    "<b>Foreman Oslow</b> by the broken bridge gives <b>The Lost Tools</b>: his toolbox is at the bottom of the lake, east of the bridge. The breath bar at the top of your screen shows how long you can stay under.",
    "<b>Chef Breanna</b> in the inn gives <b>Redridge Goulash</b>: goretusk snouts from the boars west of town, spider meat from the tarantulas in the north-east, and condor meat from the condors in the south.",
    "<b>Verner Osgood</b> gives <b>Underbelly Scales</b>: the black dragon whelps south of town drop them.",
    "In the inn, <b>Darcy</b> gives <b>A Free Lunch</b>: take it to Guard Parker on the west road, then <b>Visit the Herbalist</b> and bring <b>Delivering Daffodils</b> back to Darcy. Easy XP on your way past."
  ],
  tip:"At level 20, Verner gives <b>A Baying of Gnolls</b> and Dockmaster Baren gives <b>Murloc Poachers</b>. Take them if you have time. Then fly to Stormwind and take the tram to Ironforge to train." },

/* ---------- Level 20 ---------- */
{ chapter:"Level 20 training", lv:"20", place:"Ironforge", title:"Level 20: the big one", map:[["ironforge",[26.5,8.5,"Mage trainers (Hall of Mysteries)"],[55.5,47.7,"Gryphon master: you land here"]]], learn:["blink","blizzard","evocation","manashield","tp_if","tp_sw","water3"],
  done:"Blink is on <kbd>7</kbd>, you know both teleports, you have Runes of Teleportation, and your new water is on <kbd>Alt</kbd> + <kbd>1</kbd>.",
  todo:[
    "Learn everything: <b>Blink</b>, <b>Blizzard</b>, <b>Evocation</b>, <b>Mana Shield</b>, <b>Teleport: Ironforge</b>, <b>Teleport: Stormwind</b> and new ranks, including a new <b>Conjure Water</b>.",
    "Buy a few <b>Runes of Teleportation</b> from the reagent vendor. Teleports use them up.",
    "Put Blink on key <kbd>7</kbd>. It jumps you forward a short distance. Use it to get away."
  ],
  tip:"Teleports mean you can leave your Hearthstone set to wherever you're questing and still reach the city whenever you like." },

{ lv:"20", place:"Talents (N)", title:"Level 20: Ice Lance", learn:["icelance"],
  done:"Ice Lance is on <kbd>4</kbd>.",
  todo:[
    "Put this level's talent point into <b>Ice Lance</b>.",
    "Open your spellbook (<kbd>P</kbd>) and put Ice Lance on key <kbd>4</kbd>."
  ],
  tip:"Ice Lance does triple damage to a frozen enemy. New combo: Frostbolt → enemy reaches you → Frost Nova → step back → Ice Lance → Frostbolt." },

{ lv:"20", place:"Loch Modan → Wetlands", title:"Travel to the Wetlands", pickup:{469:"Daily Delivery"}, map:[["lochmodan",[24.8,18.4,"Algaz Station: road north"]],["wetlands",[53,72,"Dun Algaz: you come in here"],[49.8,39.4,"Einar Stonegrip (crossroads)"],[10.5,60,"Menethil Harbor"]]],
  done:"you've reached Menethil Harbor with <b>Daily Delivery</b> in your quest log.",
  todo:[
    "Fly from Ironforge to Thelsamar (or use your Hearthstone), then take the road north from Loch Modan through the pass (Dun Algaz) into the <b>Wetlands</b>.",
    "Stay on the road. Some enemies along it are stronger than you.",
    "At the crossroads, <b>Einar Stonegrip</b> gives <b>Daily Delivery</b>: a bundle of skins for the tanner in Menethil.",
    "Follow the road west to <b>Menethil Harbor</b> on the coast."
  ] },

/* ---------- Wetlands, levels 20–28 ---------- */
{ chapter:"Wetlands", lv:"20–22", place:"Menethil Harbor", title:"Settle in Menethil", pickup:{469:"Daily Delivery", 484:"Young Crocolisk Skins", 279:"Claws from the Deep", 463:"The Greenwarden", 470:"Digging Through the Ooze", 305:"In Search of The Excavation Team"}, map:[["wetlands",[10.5,60,"Menethil Harbor"]]],
  done:"Menethil Harbor is your home, the flight path is unlocked and the town's quests are in your log.",
  todo:[
    "Make the inn your home. Unlock the flight path.",
    "Hand <b>Daily Delivery</b> to <b>James Halloran</b>, the tanner, and take <b>Young Crocolisk Skins</b> from him.",
    "Take every quest in town: <b>Claws from the Deep</b> (Karl Boran), <b>The Greenwarden</b> (First Mate Fitzsimmons), <b>Digging Through the Ooze</b> (Sida), <b>In Search of The Excavation Team</b> (Tarrel Rockweaver) and more."
  ] },

{ lv:"22", place:"Ironforge (teleport)", title:"Level 22: new ranks", map:[["ironforge",[26.5,8.5,"Mage trainers (Hall of Mysteries)"]]], learn:["food3"],
  done:"you've learned the new ranks and your new food is on <kbd>Alt</kbd> + <kbd>2</kbd>.",
  todo:[
    "Teleport to Ironforge and learn every new rank, including a new <b>Conjure Food</b> (Conjured Rye). Put it on <kbd>Alt</kbd> + <kbd>2</kbd>.",
    "Hearth back to Menethil Harbor."
  ] },

{ lv:"21–24", place:"Wetlands", title:"Quest the Wetlands", quests:{279:"Claws from the Deep", 484:"Young Crocolisk Skins", 276:"Tramping Paws"}, pickup:{463:"The Greenwarden", 277:"Fire Taboo", 275:"Blisters on The Land", 305:"In Search of The Excavation Team", 470:"Digging Through the Ooze"}, map:[["wetlands",[17,39,"Gobbler and the murloc coast"],[56.4,40.4,"Rethiel the Greenwarden"],[44,24,"Ironbeard's Tomb (oozes)"],[34,42,"Whelgar's Excavation Site"]]],
  done:"you're level 24 and have handed in <b>Claws from the Deep</b>, <b>Young Crocolisk Skins</b> and <b>Tramping Paws</b>.", stuck:"Fight the murlocs along the coast until you are.",
  todo:[
    "Coast first: <b>Claws from the Deep</b>: kill <b>12 Bluegill murlocs</b> and <b>Gobbler</b>, north of Menethil, for his head. Kill young crocolisks in the marsh for <b>Young Crocolisk Skins</b>.",
    "Then inland: give <b>The Greenwarden</b> to <b>Rethiel the Greenwarden</b>. He gives <b>Tramping Paws</b> (gnolls to the south-east), then <b>Fire Taboo</b> and <b>Blisters on The Land</b>.",
    "<b>In Search of The Excavation Team</b>: talk to Merrin Rockweaver at Whelgar's Excavation Site and follow his quests.",
    "<b>Digging Through the Ooze</b>: kill the black oozes at <b>Ironbeard's Tomb</b> (north, past Dun Modr) until one drops <b>Sida's Bag</b>. The Wetlands got 20+ new quests in Forever: take everything you find."
  ] },

{ lv:"24", place:"Ironforge (teleport)", title:"Level 24: Counterspell", map:[["ironforge",[26.5,8.5,"Mage trainers (Hall of Mysteries)"],[55.5,47.7,"Gryphon master: you land here"]]], learn:["counterspell"],
  done:"Counterspell is on <kbd>-</kbd>.",
  todo:[
    "Learn <b>Counterspell</b> and new ranks. When an enemy is casting a spell (you'll see a cast bar under its name), press Counterspell to stop it."
  ] },

{ lv:"25", place:"Talents (N)", title:"Level 25: Shatter and Legacy", learn:[],
  done:"your talent point is in Shatter and your Legacy point is spent.",
  todo:[
    "Talent: <b>Shatter</b>. Your spells crit much more often on frozen enemies, so Frost Nova + Ice Lance hits even harder.",
    "Around now you get your first <b>Legacy</b> point. Press <kbd>Y</kbd> and put it in <b>Thrill of Adventure</b>: every kill gives back some health and mana."
  ] },

{ lv:"24–29", place:"Wetlands", title:"Dungeon: Excavation Site (optional)", map:[["wetlands",[10.5,60,"Caitlin Grassman (Menethil)"],[34,42,"Whelgar's Excavation Site"]],["redridge",[26,46,"Dorin Songblade (Lakeshire)"]]],
  done:"your group has beaten the last boss, or you've decided to skip it.",
  todo:[
    "Another new dungeon, in the Wetlands. Best at levels 26–29.",
    "Collect its quests first: <b>Caitlin Grassman</b> in Menethil and <b>Dorin Songblade</b> in Lakeshire (Redridge). Others come from the Wetlands quest chains.",
    "Find a group the same way as Hall of Thanes."
  ] },

{ lv:"26", place:"Stormwind (teleport)", title:"Level 26: Cone of Cold and another mage quest", quests:{1939:"High Sorcerer Andromath", 1940:"Pristine Spider Silk"}, pickup:{1938:"Ur's Treatise on Shadow Magic"}, map:[["stormwind",[49,86,"Jennea Cannon and Andromath (Mage Quarter)"],[51.8,83.5,"Wynne Larson"]],["redridge",[73.9,49,"Tower of Ilgalar (the book)"]],["duskwood",[20,45,"Raven Hill Cemetery (spiders)"]]], learn:["coneofcold"],
  done:"Cone of Cold is on <kbd>8</kbd> and you're wearing the <b>Astral Knot Robe</b> or <b>Blouse</b>.",
  todo:[
    "Learn <b>Cone of Cold</b> and put it on key <kbd>8</kbd>. It hits and slows everything in front of you.",
    "Mage quest: <b>Jennea Cannon</b> sends you to <b>High Sorcerer Andromath</b> at the top of the Wizard's Sanctum. <b>Ur's Treatise on Shadow Magic</b>: climb the <b>Tower of Ilgalar</b> in eastern Redridge and take the book. You don't have to fight the elite at the top. Polymorph the gnolls, kill their dogs first and Counterspell the dogs' Mana Burn.",
    "<b>Pristine Spider Silk</b>: 8 silk from the spiders in and just east of Raven Hill Cemetery, Duskwood. Flying to Sentinel Hill in Westfall and walking east is quickest.",
    "Give the silk to <b>Wynne Larson</b> and talk to her again to pick the <b>Astral Knot Robe</b> or <b>Astral Knot Blouse</b>."
  ],
  tip:"The tower is dangerous alone at this level. If you die inside, you can come back to life anywhere in the tower: next to the book, then grab it and leave." },

{ lv:"27–28", place:"Wetlands", title:"Finish the Wetlands", quests:{472:"Fall of Dun Modr", 161:"A Dark Threat Looms"}, map:[["wetlands",[10.5,60,"Menethil Harbor"],[48,15,"Dun Modr"]]],
  done:"you're level 28 and your Wetlands quests are handed in.", stuck:"Fight the crocolisks or gnolls in the Wetlands until you are.",
  todo:[
    "Finish your Wetlands quests: the Greenwarden chain, the excavation team and Sida's bag.",
    "At level 25 Harlo Barnaby in Menethil gives <b>Fall of Dun Modr</b>: find <b>Longbraid the Grim</b> near the ruins of Dun Modr in the north. His next quest is for a group.",
    "Still have <b>A Dark Threat Looms</b> from Loch Modan? Hand the powder to <b>Ashlan Stonesmirk</b> in Dun Modr while you're there.",
    "If the north part feels too hard, go to <b>Redridge Mountains</b> or <b>Duskwood</b> (both near Stormwind) for a few levels."
  ] },

{ lv:"28", place:"Ironforge (teleport)", title:"Level 28: mana gems", map:[["ironforge",[26.5,8.5,"Mage trainers (Hall of Mysteries)"]]], learn:["conjuregem","managem"],
  done:"your Mana Agate is on <kbd>Shift</kbd> + <kbd>5</kbd>.",
  todo:[
    "Learn new ranks, including <b>Conjure Mana Agate</b>.",
    "Cast it and put the <b>Mana Agate</b> on <kbd>Shift</kbd> + <kbd>5</kbd>. In a hard fight, press it for instant mana. Conjure a new one after each use."
  ] },

{ lv:"29", place:"Talents (N)", title:"Level 29: Ice Block", learn:["iceblock"],
  done:"Ice Block is on key <kbd>9</kbd>.",
  todo:[
    "Talent: <b>Ice Block</b>. Put it on key <kbd>9</kbd>.",
    "When you're about to die, press it: you're frozen in a block of ice and nothing can hurt you for 10 seconds. Press it again to come out early."
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
  tip:"Worgen walk in pairs. They're humanoids, so Polymorph works on them: turn one into a sheep, kill the other, then fight the sheep." },

{ lv:"30", place:"Ironforge (teleport)", title:"Level 30: Ice Armor and the wand quest", pickup:{1947:"Journey to the Marsh"}, map:[["ironforge",[26.5,8.5,"Mage trainers (Hall of Mysteries)"],[55.5,47.7,"Gryphon master: you land here"]]], learn:["icearmor","water4"],
  done:"Ice Armor is on, your new water is on <kbd>Alt</kbd> + <kbd>1</kbd>, your talent point is in Fingers of Frost, and <b>Journey to the Marsh</b> is in your log.",
  todo:[
    "Learn <b>Ice Armor</b> (it replaces Frost Armor and is stronger), <b>Teleport: Darnassus</b> and new ranks, including a new <b>Conjure Water</b>.",
    "Talent: <b>Fingers of Frost</b>. Sometimes your next spell treats the enemy as frozen: when that happens, cast Ice Lance for triple damage.",
    "Take <b>Journey to the Marsh</b> from the mage trainer. This starts the quest for the <b>Icefury Wand</b> (see the later step)."
  ] },

{ lv:"30–32", place:"Arathi Highlands", title:"Arathi Highlands", quests:{681:"Northfold Manor"}, pickup:{1948:"Items of Power"}, map:[["arathi",[44,89,"Thandol Span (from the Wetlands)"],[45.8,47.6,"Refuge Pointe"],[32,28,"Northfold Manor (Syndicate)"],[66,68,"Witherbark Village (trolls)"],[52,50,"Circle of Outer Binding (wand quest)"],[25,30,"Stromgarde Keep (elites)"],[73,33,"Hammerfall (Horde town)"]]],
  done:"you're level 32 and have handed in <b>Northfold Manor</b>.", stuck:"Fight the Syndicate around Northfold Manor until you are.",
  todo:[
    "Fly to <b>Menethil Harbor</b> and ride north over the big bridge (Thandol Span) into <b>Arathi Highlands</b>, a wide open grassland.",
    "In the middle is <b>Refuge Pointe</b>, the Alliance camp. Unlock the flight path and make it your home.",
    "Take every quest. Captain Nials's <b>Northfold Manor</b> sends you to the Syndicate in the north-west. Sentinel Glynda Nal'Shea sends you after the Witherbark trolls in the south-east.",
    "Wand quest (<b>Items of Power</b>): kill Witherbark trolls at Witherbark Village for <b>10 Witherbark Totem Sticks</b>. At the <b>Circle of Outer Binding</b> in the middle of the zone, stand on the stone in the centre and use the sticks. After about 10 seconds lightning strikes: loot the <b>Bolt Charged Bramble</b> from the stone. Three elementals guard the circle: pull them one at a time.",
    "Stay out of <b>Stromgarde Keep</b> (west) unless you're in a group: it's full of elite enemies. <b>Hammerfall</b> (east) is a Horde town. Move on at level 32."
  ],
  tip:"The Syndicate are humanoids: when two come at you, Polymorph the second one." },

{ lv:"32", place:"Ironforge (teleport)", title:"Level 32: Cold Snap", map:[["ironforge",[26.5,8.5,"Mage trainers (Hall of Mysteries)"]]], learn:["coldsnap","food4"],
  done:"Cold Snap is on <kbd>Shift</kbd> + <kbd>8</kbd> and your new food is on <kbd>Alt</kbd> + <kbd>2</kbd>.",
  todo:[
    "Teleport to Ironforge and learn every new rank, including a new <b>Conjure Food</b> (Conjured Pumpernickel).",
    "Talent: <b>Cold Snap</b>. Put it on <kbd>Shift</kbd> + <kbd>8</kbd>. It resets your Frost cooldowns, so you get a second Ice Block or Frost Nova.",
    "Hearth back to Refuge Pointe and carry on."
  ] },

{ lv:"32", place:"Southshore, Hillsbrad", title:"Southshore", quests:{536:"Down the Coast", 505:"Syndicate Assassins"}, map:[["arathi",[20,30,"Gate in Thoradin's Wall (west)"]],["hillsbrad",[50,55,"Southshore"],[40,74,"Murloc beach"]]],
  done:"you're level 33 and have handed in <b>Down the Coast</b> and <b>Syndicate Assassins</b>.", stuck:"Fight the murlocs on the beach south of Southshore until you are.",
  todo:[
    "From Refuge Pointe, ride west through the gate in the huge wall (Thoradin's Wall) into Hillsbrad Foothills. Follow the road south to <b>Southshore</b>. Unlock the flight path.",
    "Take the town's quests. <b>Down the Coast</b> from Lieutenant Farren Orinelle (murlocs on the beach) and <b>Syndicate Assassins</b> from Marshal Redpath (in the Alterac Mountains, north) are quick XP.",
    "Talk to <b>Emissary Jacques</b> to start the new <b>City of Dalaran</b> dungeon (levels 28–35). Optional.",
    "Southshore also has a boat to Auberdine. Move on at about level 33."
  ],
  tip:"From here on, on PvP servers, Horde players can attack you. Frost Nova and Blink are your escape." },

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

{ lv:"33–35", place:"Several places", title:"Start the wand quest", quests:{1947:"Journey to the Marsh", 1949:"Hidden Secrets", 1950:"Get the Scoop"}, pickup:{1948:"Items of Power", 1951:"Rituals of Power"}, map:[["dustwallow",[46,57,"Tabetha's hut"]],["needles",[78.3,75.7,"Magus Tirth (Mirage Raceway)"]]],
  done:"<b>Items of Power</b> and <b>Rituals of Power</b> are in your quest log, or you've decided to skip the wand quest.",
  todo:[
    "Take <b>Journey to the Marsh</b> to <b>Tabetha</b>, whose hut is in the middle of Dustwallow Marsh (fly to Theramore, follow the road south and cut east into the marsh: the east side has stronger enemies). She gives <b>Hidden Secrets</b> and <b>Items of Power</b>.",
    "<b>Hidden Secrets</b>: talk to <b>Magus Tirth</b> at the Mirage Raceway in Thousand Needles. <b>Get the Scoop</b>: cross the racetrack to the tower, type <kbd>/target \"Plucky\" Johnson</kbd> to target the little grey chicken, type <kbd>/beckon</kbd>, then talk to him and go back to Tirth. He gives <b>Rituals of Power</b>.",
    "<b>Rituals of Power</b>: the book is in the <b>Scarlet Monastery Library</b>, a dungeon you can do a little later (see the Scarlet Monastery step).",
    "<b>Items of Power</b>: buy a <b>Jade</b> at the auction house and get the <b>Bolt Charged Bramble</b> in Arathi (see the Arathi step). Keep both: you finish the quest around level 39."
  ],
  tip:"This quest sends you around the world. Journey to the Marsh and Hidden Secrets show as level 38 in your log, but they're only conversations; the last part, Mage's Wand, is a level 40 quest you finish later. It's optional. If it feels like too much, skip it." },

{ lv:"34", place:"Ironforge (teleport)", title:"Level 34: Mage Armor", map:[["ironforge",[26.5,8.5,"Mage trainers (Hall of Mysteries)"]]], learn:["magearmor"],
  done:"Mage Armor is on your right bar.",
  todo:[
    "Learn <b>Mage Armor</b> and new ranks at the trainer. Keep Ice Armor on while questing; swap to Mage Armor for long dungeon fights."
  ] },

{ lv:"35–37", place:"Booty Bay, Stranglethorn", title:"Stranglethorn: Booty Bay", quests:{605:"Singing Blue Shards"}, pickup:{595:"The Bloodsail Buccaneers"}, map:[["stranglethorn",[27,77,"Booty Bay"],[38,3.5,"Rebel Camp"],[35.6,10.6,"Nesingwary's Expedition"]]],
  done:"you're level 37 and have handed in <b>Singing Blue Shards</b>.", stuck:"Fight the pirates or raptors along the coast near Booty Bay until you are.",
  todo:[
    "Follow the main road all the way south to <b>Booty Bay</b>, a goblin port built into a cliff. Unlock the flight path and make the inn your home.",
    "Booty Bay is neutral: Horde players use it too, and the goblin guards attack anyone who starts a fight in town.",
    "Take <b>Singing Blue Shards</b> from Crank Fizzlebub (crystal-backed basilisks in the middle of the zone) and the pirate quests that start with <b>The Bloodsail Buccaneers</b> from First Mate Crazz.",
    "Keep doing the Nesingwary hunting quests as new parts open. Move on at level 37."
  ],
  tip:"Booty Bay has a boat to Ratchet in Kalimdor. That helps with the wand quest in Dustwallow Marsh." },

{ lv:"35–40", place:"Tirisfal Glades", title:"Dungeon: Scarlet Monastery (optional)", quests:{1050:"Mythology of the Titans", 1053:"In the Name of the Light"}, pickup:{1951:"Rituals of Power"}, map:[["tirisfal",[83,33,"Scarlet Monastery"]]],
  done:"your group has finished the wings you wanted, or you've decided to skip it.",
  todo:[
    "Four short dungeon wings, run by crazed crusaders: <b>Graveyard</b> (around level 30), <b>Library</b> (around 33), <b>Armory</b> (around 36) and <b>Cathedral</b> (around 38).",
    "It's deep in Horde land, so don't walk there. Find a group with the Looking For Group tool and let the group summon you at the meeting stone outside.",
    "Collect the Alliance quests first: <b>Mythology of the Titans</b> (Librarian Mae Paledust, Hall of Explorers in Ironforge) and <b>In the Name of the Light</b> (Raleigh the Devout, Southshore inn).",
    "Wand quest: the <b>Rituals of Power</b> book is on a side table in the Library.",
    "Skip it if you'd rather keep questing."
  ],
  tip:"Save Blizzard and Arcane Explosion until the tank has every enemy's attention, or they all run at you." },

{ lv:"36", place:"Ironforge (teleport)", title:"Level 36: new ranks", map:[["ironforge",[26.5,8.5,"Mage trainers (Hall of Mysteries)"]]],
  done:"you've learned every new rank your trainer offers.",
  todo:[
    "Teleport to Ironforge and learn every new rank. New ranks replace the old ones on your bars by themselves.",
    "Hearth back to Booty Bay."
  ] },

/* ---------- 37–44: Riverglades ---------- */
{ chapter:"Riverglades", lv:"37", place:"Redridge → Riverglades", title:"Travel to the Riverglades", map:[["redridge",[25.5,59.4,"Lakeshire flight path"]],["riverglades",[66.7,81,"Farholde Keep"],[60.6,81.5,"Gretchen Mayberry (flight master)"]]],
  done:"Farholde Keep is your home (hover over your Hearthstone to check) and you've unlocked its flight path.",
  todo:[
    "Fly to <b>Lakeshire</b> in Redridge Mountains. No flight path there yet? Fly to Darkshire and ride north-east into Redridge.",
    "From Lakeshire, follow the road north toward the Burning Steppes. Near the edge of the map, a signpost at a crossroads points to the Riverglades: take the right-hand path into the hills.",
    "Follow that road south to <b>Farholde Keep</b>, the Alliance town in the Riverglades (a new zone in WoW Forever).",
    "Unlock the flight path (Gretchen Mayberry) and make the inn your home. From now on you can fly straight between Farholde Keep and Lakeshire."
  ] },

{ lv:"37–40", place:"Farholde Keep, Riverglades", title:"Riverglades: around Farholde Keep", map:[["riverglades",[66.7,81,"Demar Brant (Farholde Keep)"],[60.6,81.5,"Flight master"]]],
  done:"you're level 40.", stuck:"Fight the enemies near your current quests in the south of the zone until you are.",
  todo:[
    "Take every quest in Farholde Keep. Many come from <b>Demar Brant</b>, the knight in charge, and the people around him. There are over 70 Alliance quests in this zone.",
    "Riverglades quests come in waves: when you finish a batch, new ones usually appear back in Farholde Keep. Check the town after every few turn-ins.",
    "Start with the farms and lookouts close to the keep. The enemies get tougher the further north you go.",
    "The Horde quests here too (their town is Rog'mar). On PvP servers, keep your escape buttons ready. Move on at level 40."
  ],
  tip:"Farholde Keep is in the south-east corner of the zone. The Horde town, Rog'mar, is in the middle of the map: give it a wide berth." },

{ lv:"38", place:"Ironforge (teleport)", title:"Level 38: Mana Jade", map:[["ironforge",[26.5,8.5,"Mage trainers (Hall of Mysteries)"],[55.5,47.7,"Gryphon master: you land here"]]], learn:["conjuregem2","managem2"],
  done:"your Mana Jade is on <kbd>Shift</kbd> + <kbd>5</kbd>.",
  todo:[
    "Teleport to Ironforge and learn new ranks, including <b>Conjure Mana Jade</b>.",
    "Cast it and put the <b>Mana Jade</b> on <kbd>Shift</kbd> + <kbd>5</kbd> in place of the Mana Agate.",
    "Use your Hearthstone to get straight back to Farholde Keep. Start saving gold: your mount costs a lot at level 40."
  ] },

{ lv:"39–40", place:"Dustwallow Marsh", title:"Finish the wand quest", quests:{1948:"Items of Power", 1951:"Rituals of Power", 1952:"Mage's Wand"}, pickup:{1953:"Return to the Marsh"}, map:[["dustwallow",[46,57,"Tabetha's hut"],[66.5,49,"Theramore (flight path)"]]],
  done:"the <b>Icefury Wand</b> is equipped, or you've decided to skip the wand quest.",
  todo:[
    "You need the <b>Rituals of Power</b> book from the Scarlet Monastery Library, a <b>Jade</b> and the <b>Bolt Charged Bramble</b>.",
    "Fly to Theramore and go to <b>Tabetha</b>'s hut in the middle of Dustwallow Marsh. Hand in <b>Items of Power</b> and <b>Rituals of Power</b>.",
    "Take <b>Mage's Wand</b>, wait for her ritual to finish, talk to her again and pick the <b>Icefury Wand</b>. Put its <b>Shoot</b> on the same key as your old wand.",
    "Optional: Tabetha also offers <b>Return to the Marsh</b>, a hard chain (an elite demon and an Uldaman boss) that ends with the <b>Celestial Orb</b>. Do it with friends or later."
  ],
  tip:"Mage's Wand is a level 40 quest: Tabetha's hut is safe, but the east side of the marsh has stronger enemies. If you skipped the earlier parts, skip this step too." },

{ lv:"40", place:"Trainer + Dun Morogh", title:"Level 40: your mount!", map:[["dunmorogh",[49.4,48.4,"Steelgrill's Depot (mount vendor)"]]], learn:["mount","frostfire","icebarrier","water5"],
  done:"you're riding your mechanostrider, Ice Barrier is on <kbd>Shift</kbd> + <kbd>4</kbd> and your new water is on <kbd>Alt</kbd> + <kbd>1</kbd>.",
  todo:[
    "Learn riding and buy a <b>mechanostrider</b> (gnome mount) at <b>Steelgrill's Depot</b> in Dun Morogh. Right-click the mount item to learn it, then drag it from your spellbook to the right bar.",
    "At the trainer, learn <b>Frostfire Bolt</b>, the <b>Portals</b> to Stormwind and Ironforge, and a new <b>Conjure Water</b> (Mineral Water).",
    "Talent: <b>Ice Barrier</b>, a shield that absorbs damage. Use it before every fight."
  ] },

{ lv:"40–43", place:"Riverglades (north)", title:"Riverglades: Sunnyglade and the north", quests:{94877:"Saving Sunnyglade"}, map:[["riverglades",[66.7,81,"Demar Brant (Farholde Keep)"],[45,53,"Sunnyglade"],[27,44,"Twilight's Shroud"],[77,49,"Powderfuse Port"]]],
  done:"you're level 43 and have handed in <b>Saving Sunnyglade</b>.", stuck:"Fight the enemies around Sunnyglade until you are.",
  todo:[
    "Fly back to Farholde Keep. Demar Brant's <b>Saving Sunnyglade</b> sends you north to the village of <b>Sunnyglade</b>.",
    "Keep turning in and picking up: the later quests send you further north, toward <b>Twilight's Shroud</b>.",
    "Pick up the quests for the dungeon <b>Krol'dok Stronghold</b> (next step) as they appear.",
    "<b>Powderfuse Port</b>, a neutral goblin port on the east coast, has a bank, an auction house and the boat to Tanaris. Move on at about level 43."
  ] },

{ lv:"41–45", place:"Riverglades", title:"Dungeon: Krol'dok Stronghold (optional)", map:[["riverglades",[37.5,37.5,"Krol'dok Stronghold entrance"],[66.7,81,"Farholde Keep (the dungeon quests)"]]],
  done:"your group has beaten the last boss, or you've decided to skip it.",
  todo:[
    "A new 5-player dungeon for levels 40–45, with six bosses. The entrance is in the hills north of Sunnyglade (with TomTom: <kbd>/way 37.5 37.5</kbd>).",
    "Its quests are a chain of about ten that starts in Farholde Keep. Do the parts you can do alone first.",
    "Find a group with the Looking For Group tool or ask in chat (\"LFG Krol'dok\")."
  ],
  tip:"Most dungeon XP in Forever comes from quests, so collect them before you go in." },

{ lv:"42", place:"Ironforge (teleport)", title:"Level 42: better food and Arcane talents", pickup:{82084:"A Lesson in Literacy"}, map:[["ironforge",[26.5,8.5,"Mage trainers (Hall of Mysteries)"],[55.5,47.7,"Gryphon master: you land here"]]], learn:["food5"],
  done:"the new food is on <kbd>Alt</kbd> + <kbd>2</kbd>.",
  todo:[
    "Learn new ranks, including a new rank of <b>Conjure Food</b> (Conjured Sourdough). Put it on <kbd>Alt</kbd> + <kbd>2</kbd>.",
    "Talent: <b>Winter's Chill</b> (Frost tab). The Talents tab shows which one to pick each level.",
    "Optional mage quest: <b>Garion Wendell</b> in the Stormwind Mage Quarter gives <b>A Lesson in Literacy</b> for the <b>Personal Spellbook</b>. You need a Pristine Owlbeast Quill (owlbeasts in the Hinterlands), 5 Zukk'ash Resin (Feralas) and 8 Farraki Papyrus (zombies inside Zul'Farrak)."
  ] },

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
  tip:"Bandits run away at low health and come back with friends. Frost Nova them before they get away." },

{ lv:"44", place:"Ironforge (teleport)", title:"Level 44: new ranks", map:[["ironforge",[26.5,8.5,"Mage trainers (Hall of Mysteries)"]]],
  done:"you've learned every new rank your trainer offers.",
  todo:[
    "Teleport to Ironforge and learn every new rank.",
    "Hearth back to Gadgetzan."
  ] },

{ lv:"46", place:"Ironforge (teleport)", title:"Level 46: new ranks", map:[["ironforge",[26.5,8.5,"Mage trainers (Hall of Mysteries)"]]],
  done:"you've learned every new rank your trainer offers.",
  todo:[
    "Teleport to Ironforge and learn every new rank.",
    "Then travel on to Feralas (next step). Teleport: Darnassus and the flight to Feathermoon is a quick way there once you've been to Feathermoon."
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
    "Ride west through the jungle to the coast. <b>Feathermoon Stronghold</b> is on an island: take the ferry from the small dock on the shore.",
    "Unlock the Feathermoon flight path and make the inn your home."
  ] },

{ lv:"46–48", place:"Feathermoon, Feralas", title:"Feralas", quests:{2821:"The Mark of Quality", 7003:"Zapped Giants"}, pickup:{4267:"Rise of the Silithid"}, map:[["feralas",[30.5,43.5,"Feathermoon Stronghold"],[43.5,43,"Ferry dock"],[59,44,"Dire Maul (for later)"]]],
  done:"you're level 48 and have handed in <b>Zapped Giants</b> and <b>The Mark of Quality</b>.", stuck:"Fight the yetis in the hills or the giants on the coast until you are.",
  todo:[
    "Take every quest in Feathermoon Stronghold, like <b>The Mark of Quality</b> from Pratt McGrubben (yeti hides) and the <b>Rise of the Silithid</b> chain.",
    "Near the ferry dock, <b>Zorbin Fandazzle</b> gives <b>Zapped Giants</b>: use his gadget on the giants that walk along the coast.",
    "<b>Dire Maul</b>, the ruined city in the middle of Feralas, is a dungeon for levels 55–60. Come back much later.",
    "Move on at about level 48."
  ] },

{ lv:"47–50", place:"Aerie Peak, Hinterlands", title:"The Hinterlands", quests:{2877:"Skulk Rock Clean-up", 2880:"Troll Necklace Bounty"}, pickup:{2988:"Witherbark Cages"}, map:[["hinterlands",[14,46,"Aerie Peak"],[55,42,"Skulk Rock (oozes)"],[63,73,"Jintha'Alor (trolls)"]]],
  done:"you're level 50 and have handed in <b>Skulk Rock Clean-up</b> and <b>Troll Necklace Bounty</b>.", stuck:"Fight Witherbark trolls (their necklaces count for the bounty) until you are.",
  todo:[
    "Teleport to Ironforge, fly to <b>Southshore</b>, then ride north-east into <b>The Hinterlands</b>. <b>Aerie Peak</b>, the Wildhammer dwarf town, is right at the entrance.",
    "Unlock the flight path and make the inn your home.",
    "Take every quest: <b>Skulk Rock Clean-up</b> (oozes at Skulk Rock), <b>Troll Necklace Bounty</b> (necklaces from any Witherbark troll) and Gryphon Master Talonaxe's chain, starting with <b>Witherbark Cages</b>.",
    "Run out of quests? <b>Searing Gorge</b> (town: Thorium Point) is another zone for this level. Move on at level 50."
  ],
  tip:"WoW Forever adds a new dungeon for these levels: <b>Alcaz Prison</b> (about 48–53). Look for it in the Looking For Group tool." },

{ lv:"48", place:"Ironforge (teleport)", title:"Level 48: Mana Citrine", map:[["ironforge",[26.5,8.5,"Mage trainers (Hall of Mysteries)"],[55.5,47.7,"Gryphon master: you land here"]]], learn:["conjuregem3","managem3"],
  done:"your Mana Citrine is on <kbd>Shift</kbd> + <kbd>5</kbd>.",
  todo:[
    "Learn new ranks, including <b>Conjure Mana Citrine</b>.",
    "Put the new gem on <kbd>Shift</kbd> + <kbd>5</kbd>. Hearth back to Aerie Peak."
  ] },

/* ---------- 49–60 ---------- */
{ chapter:"Un'Goro to 60", lv:"49–52", place:"Marshal's Refuge, Un'Goro", title:"Un'Goro Crater", quests:{4284:"Crystals of Power", 4243:"Chasing A-Me 01"}, map:[["ungoro",[43.5,8.5,"Marshal's Refuge"],[50,48,"Fire Plume Ridge (volcano)"],[70,75,"Entrance from Tanaris"]]],
  done:"you're level 52 and have handed in <b>Crystals of Power</b> and <b>Chasing A-Me 01</b>.", stuck:"Fight the raptors and stegodons near Marshal's Refuge until you are.",
  todo:[
    "Fly to Gadgetzan and ride west out of Tanaris. The road goes down a long ramp into <b>Un'Goro Crater</b>, a jungle full of dinosaurs.",
    "Follow the crater's edge north to <b>Marshal's Refuge</b>, a camp under the northern cliffs. Unlock the flight path.",
    "Take every quest. <b>Crystals of Power</b> from J.D. Collie: grab the red, green, blue and yellow crystals lying around the whole crater. Karna Remtravel's <b>Chasing A-Me 01</b> sends you to walk a lost robot home.",
    "Watch out for <b>Devilsaurs</b>: huge dinosaurs that walk around and hit very hard. Stay out of their way. Move on at level 52."
  ],
  tip:"Devilsaurs walk the open ground and see you from far away. If one comes your way, get out of its path; if it reaches you, Frost Nova, Blink away and run." },

{ lv:"50", place:"Ironforge (teleport)", title:"Level 50: Sparkling Water", pickup:{8250:"Magecraft"}, map:[["ironforge",[26.5,8.5,"Mage trainers (Hall of Mysteries)"],[55.5,47.7,"Gryphon master: you land here"]]], learn:["water6"],
  done:"the new water is on <kbd>Alt</kbd> + <kbd>1</kbd>.",
  todo:[
    "Learn new ranks, including a new rank of <b>Conjure Water</b> (Conjured Sparkling Water). Put it on <kbd>Alt</kbd> + <kbd>1</kbd>.",
    "Learn <b>Portal: Darnassus</b> too. Other players often pay a little gold for a portal.",
    "Optional mage chain: the trainer gives <b>Magecraft</b>. It sends you to Archmage Xylem in Azshara and ends in the Sunken Temple dungeon (group needed). Rewards: Glacial Spike, Arcane Crystal Pendant and Fire Ruby."
  ] },

{ lv:"52", place:"Ironforge (teleport)", title:"Level 52: Sweet Rolls", map:[["ironforge",[26.5,8.5,"Mage trainers (Hall of Mysteries)"],[55.5,47.7,"Gryphon master: you land here"]]], learn:["food6"],
  done:"the new food is on <kbd>Alt</kbd> + <kbd>2</kbd>.",
  todo:[
    "Learn new ranks, including a new rank of <b>Conjure Food</b> (Conjured Sweet Roll). Put it on <kbd>Alt</kbd> + <kbd>2</kbd>."
  ] },

{ lv:"52–54", place:"Felwood", title:"Felwood", quests:{5155:"Forces of Jaedenar", 8461:"Deadwood of the North"}, map:[["felwood",[51,82,"Emerald Sanctuary"],[37,60,"Jaedenar (Shadow Council)"],[62.5,24.5,"Talonbranch Glade"],[64.5,8,"Timbermaw Hold (tunnel to Winterspring)"]]],
  done:"you're level 54 and have handed in <b>Forces of Jaedenar</b> and <b>Deadwood of the North</b>.", stuck:"Fight Deadwood furbolgs in northern Felwood until you are. It also makes the Timbermaw like you.",
  todo:[
    "Get to <b>Astranaar</b> in Ashenvale (no flight path there? Take the boat to Auberdine and ride south through Darkshore into Ashenvale), then follow the road north into <b>Felwood</b>, a forest poisoned by demons.",
    "In the south, stop at the <b>Emerald Sanctuary</b> camp. <b>Forces of Jaedenar</b> from Greta Mosshoof sends you after the demon worshippers at Jaedenar, west of the road.",
    "Follow the road north to <b>Talonbranch Glade</b>. Unlock the flight path and take its quests.",
    "Near the north end, Nafien gives <b>Deadwood of the North</b>: killing the Deadwood furbolgs makes the Timbermaw furbolgs like you, so they let you walk through their tunnel to Winterspring later. Move on at level 54."
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

{ lv:"54", place:"Ironforge (teleport)", title:"Level 54: new ranks", map:[["ironforge",[26.5,8.5,"Mage trainers (Hall of Mysteries)"]]],
  done:"you've learned every new rank your trainer offers and your talent point is in Arcane Resilience.",
  todo:[
    "Teleport to Ironforge and learn every new rank.",
    "Talent: Frost is finished. Your last points go into the <b>Arcane</b> tab, starting with <b>Arcane Resilience</b>.",
    "Hearth back and carry on."
  ] },

{ lv:"55–57", place:"Chillwind Camp, Western Plaguelands", title:"Western Plaguelands", quests:{5215:"The Scourge Cauldrons"}, map:[["wpl",[43,84,"Chillwind Camp"],[37,57,"Felstone Field"],[46,52,"Dalson's Tears"],[53,66,"Writhing Haunt"],[62,58,"Gahrron's Withering"],[43,70,"Andorhal"]]],
  done:"you're level 57 and all four cauldrons are done.", stuck:"Fight the undead around Andorhal until you are.",
  todo:[
    "Fly to Southshore and ride north through the Alterac Mountains into <b>Western Plaguelands</b>. <b>Chillwind Camp</b> is just inside, in the south. Unlock the flight path.",
    "<b>The Scourge Cauldrons</b> chain: undead lords guard four cauldrons that poison the land, at Felstone Field, Dalson's Tears, the Writhing Haunt and Gahrron's Withering. Kill each lord and use his key on his cauldron.",
    "<b>Andorhal</b>, the ruined city in the middle, has more undead quests.",
    "Move on at level 57."
  ],
  tip:"Undead can't be Polymorphed. Use Frost Nova and step back instead." },

{ lv:"56", place:"Ironforge (teleport)", title:"Level 56: new ranks", map:[["ironforge",[26.5,8.5,"Mage trainers (Hall of Mysteries)"]]],
  done:"you've learned every new rank your trainer offers.",
  todo:[
    "Teleport to Ironforge and learn every new rank.",
    "Fly back to Chillwind Camp and carry on."
  ] },

{ lv:"56–58", place:"Light's Hope, Eastern Plaguelands", title:"Eastern Plaguelands", map:[["epl",[71.7,49.6,"Light's Hope Chapel"],[30.7,77.3,"Darrowshire"],[5.2,35.6,"Tirion Fordring's house"],[22.6,6.1,"Stratholme"]]],
  done:"you're level 58.", stuck:"Fight the undead near Light's Hope Chapel until you are.",
  todo:[
    "Ride east into <b>Eastern Plaguelands</b> and follow the road to <b>Light's Hope Chapel</b> on the far east side. Unlock the flight path.",
    "The <b>Argent Dawn</b> at Light's Hope fight the undead. Their quests give good XP and reputation.",
    "In the ruined village of <b>Darrowshire</b> (south-west), talk to the little ghost girl <b>Pamela Redpath</b>. Her quests tell one of the saddest stories in WoW.",
    "In a small house by the river in the far west, <b>Tirion Fordring</b> starts the famous <b>Redemption</b> chain. Move on at level 58."
  ] },

{ lv:"58", place:"Ironforge (teleport)", title:"Level 58: Mana Ruby", map:[["ironforge",[26.5,8.5,"Mage trainers (Hall of Mysteries)"],[55.5,47.7,"Gryphon master: you land here"]]], learn:["conjuregem4","managem4"],
  done:"your Mana Ruby is on <kbd>Shift</kbd> + <kbd>5</kbd>.",
  todo:[
    "Learn new ranks, including <b>Conjure Mana Ruby</b>, your best mana gem."
  ] },

{ lv:"58–60", place:"Everlook, Winterspring", title:"Winterspring", quests:{3783:"Are We There, Yeti?"}, map:[["felwood",[64.5,8,"Timbermaw Hold (tunnel)"]],["winterspring",[61,38.5,"Everlook"],[31,45,"Donova Snowden (hot springs)"],[67,36,"Winterfall Village (furbolgs)"]]],
  done:"you're level 60!", stuck:"Fight Winterfall furbolgs, or run Blackrock Depths with a group, until you are.",
  todo:[
    "Fly to Talonbranch Glade in Felwood and walk north through the <b>Timbermaw Hold</b> tunnel. It comes out in <b>Winterspring</b>, a snowy valley.",
    "At the hot springs, talk to <b>Donova Snowden</b>: her quests are about the Winterfall furbolgs.",
    "Follow the road east to <b>Everlook</b>, a goblin town. Unlock the flight path, make it your home and take every quest, like <b>Are We There, Yeti?</b> from Legacki.",
    "For the last bars of XP, run end-game dungeons with groups: Blackrock Depths, Lower Blackrock Spire, Dire Maul, Stratholme and Scholomance."
  ] },

{ lv:"60", place:"Ironforge (teleport)", title:"Level 60: the last ranks", pickup:{7463:"Arcane Refreshment"}, map:[["ironforge",[26.5,8.5,"Mage trainers (Hall of Mysteries)"],[55.5,47.7,"Gryphon master: you land here"]]],
  done:"you've learned the last ranks and all 51 talent points are spent.",
  todo:[
    "Learn the last ranks: <b>Frostfire Bolt</b>, <b>Ice Armor</b> and <b>Blizzard</b> among them. Your food stays the Conjured Sweet Rolls from level 52: in WoW Forever no trainer teaches a higher Conjure Food.",
    "Spend your last talent point on <b>Arcane Subtlety</b>. That's all 51.",
    "The best water, <b>Conjured Crystal Water</b>, doesn't come from the trainer: it's the reward for <b>Arcane Refreshment</b>, a quest from Lorekeeper Lydros in Dire Maul (a group dungeon)."
  ] },

{ lv:"60", place:"Mount Hyjal", title:"You made it to 60!", map:[["hyjal"]],
  todo:[
    "Visit <b>Mount Hyjal</b>, a new level 60 zone reached through Winterspring.",
    "From here on, it's about gear, dungeons and raids. Congratulations!"
  ] }
];

/* Talent points: which talent to click at each level. */
const TALENTS = [
  ["10–11", "Precision (Frost tab)", "Click it 2 times (once per level)", "Your spells miss less often."],
  ["12–14", "Improved Frostbolt", "3 times", "Frostbolt casts faster."],
  ["15–17", "Frostbite", "3 times", "Your slowing spells can freeze enemies by themselves."],
  ["18–19", "Improved Frostbolt", "2 more times (5 of 5)", ""],
  ["20", "Ice Lance", "Once", "Triple damage to frozen enemies. Your best new trick."],
  ["21–24", "Ice Shards", "4 times", "Your Frost critical hits do more damage."],
  ["25–27", "Shatter", "3 times", "Many more critical hits on frozen enemies."],
  ["28", "Ice Shards", "Once more (5 of 5)", ""],
  ["29", "Ice Block", "Once", "Your \"don't die\" button."],
  ["30–31", "Fingers of Frost", "2 times", "Sometimes your next spell treats the enemy as frozen: cast Ice Lance."],
  ["32", "Cold Snap", "Once", "Resets your Frost cooldowns, so you can Ice Block or Frost Nova again."],
  ["33–35", "Improved Cone of Cold", "3 times", "Cone of Cold hits harder."],
  ["36–38", "Frost Channeling", "3 times", "Frost spells cost less mana."],
  ["39", "Improved Blizzard", "Once", "Blizzard slows the enemies in it."],
  ["40", "Ice Barrier", "Once", "A damage-absorbing shield. Use it before every fight."],
  ["41", "Precision", "Once more (3 of 3)", ""],
  ["42–46", "Winter's Chill", "5 times", "Frostbolt and empowered Ice Lance sometimes make the enemy easier to crit."],
  ["47–48", "Arctic Reach", "2 times", "Longer range for Frostbolt, Ice Lance and Blizzard."],
  ["49–50", "Permafrost", "2 times", "Your slows last longer and are stronger."],
  ["51–52", "Improved Blizzard", "2 more times (3 of 3)", ""],
  ["53", "Frost Warding", "Once", "Ice Armor gives more armor."],
  ["54–56", "Arcane Resilience (Arcane tab)", "3 times", "Switch to the Arcane tab now. More armor from your Intellect."],
  ["57–58", "Wand Specialization", "2 times", "Your wand hits harder."],
  ["59–60", "Arcane Subtlety", "2 times", "Enemies resist your spells less. That's all 51 points."]
];

/* Words a new player won't know. Matching is case-insensitive. */
const WORDS = {
  "buff": "A good effect on you, like Frost Armor. Its icon shows at the top right of your screen.",
  "flight path": "Talk to a flight master (the person with a gryphon) once to unlock that place. Then you can fly between any places you've unlocked.",
  "trainer": "An NPC who teaches you new spells for gold. Mages need one every 2 levels.",
  "frozen": "Can't move. Frost Nova and Frostbite freeze enemies. Ice Lance does triple damage to frozen enemies.",
  "pull": "Starting a fight with an enemy, usually by hitting it from a distance.",
  "reagent vendor": "A shop NPC who sells things your spells use up, like Runes of Teleportation.",
  "auction house": "Where players buy and sell items. In Ironforge it's near the bank."
};

/* ---------------------------------------------------------
   PART 2 — PAGE BEHAVIOUR
   --------------------------------------------------------- */

const ZONES = {
  dunmorogh: { name: "Dun Morogh", id: 1 },       ironforge: { name: "Ironforge", id: 1537 },
  lochmodan: { name: "Loch Modan", id: 38 },      stormwind: { name: "Stormwind", id: 1519 },
  elwynn: { name: "Elwynn Forest", id: 12 },
  wetlands: { name: "Wetlands", id: 11 },         redridge: { name: "Redridge Mountains", id: 44 },
  duskwood: { name: "Duskwood", id: 10 },         hillsbrad: { name: "Hillsbrad Foothills", id: 267 },
  arathi: { name: "Arathi Highlands", id: 45 },   stranglethorn: { name: "Stranglethorn Vale", id: 33 },
  needles: { name: "Thousand Needles", id: 400 }, tirisfal: { name: "Tirisfal Glades", id: 85 },
  dustwallow: { name: "Dustwallow Marsh", id: 15 }, tanaris: { name: "Tanaris", id: 440 },
  feralas: { name: "Feralas", id: 357 },          hinterlands: { name: "The Hinterlands", id: 47 },
  searing: { name: "Searing Gorge", id: 51 },     ungoro: { name: "Un'Goro Crater", id: 490 },
  felwood: { name: "Felwood", id: 361 },          burning: { name: "Burning Steppes", id: 46 },
  wpl: { name: "Western Plaguelands", id: 28 },   epl: { name: "Eastern Plaguelands", id: 139 },
  winterspring: { name: "Winterspring", id: 618 },
  riverglades: { name: "Riverglades", id: 16591 },
  hyjal: { name: "Mount Hyjal", id: "hyjal" }
};

/* ---------- spells ---------- */
/* school: frost / fire / arcane / util / racial / item  */
const SPELLBOOK = {
  fireball:      { name:"Fireball", lv:1, school:"fire", icon:"flame", text:"Your first attack. From level 4 it moves to Shift+- and you only use it to pull enemies that are far away." },
  frostbolt:     { name:"Frostbolt", lv:4, school:"frost", icon:"snow", text:"Your main attack all the way to 60. Slows the enemy." },
  fireblast:     { name:"Fire Blast", lv:6, school:"fire", icon:"burst", text:"Instant hit. Press whenever it's ready, or while moving." },
  frostnova:     { name:"Frost Nova", lv:10, school:"frost", icon:"snow", text:"Freezes every enemy next to you. Then step away." },
  icelance:      { name:"Ice Lance", lv:20, school:"frost", icon:"wand", talent:true, text:"Triple damage on a frozen enemy. Press right after Frost Nova." },
  polymorph:     { name:"Polymorph", lv:8, school:"arcane", icon:"sheep", text:"Turns an extra enemy into a sheep for a while. Don't hit the sheep." },
  shoot:         { name:"Shoot (wand)", lv:10, school:"item", icon:"wand", text:"Free damage with your wand. Use it to finish enemies. Needs a wand equipped." },
  blink:         { name:"Blink", lv:20, school:"arcane", icon:"arrow", text:"Teleports you a short way forward. Your escape button." },
  coneofcold:    { name:"Cone of Cold", lv:26, school:"frost", icon:"snow", text:"Hits and slows everything in front of you." },
  iceblock:      { name:"Ice Block", lv:29, school:"frost", icon:"cube", talent:true, text:"Nothing can hurt you for a few seconds. Press it when you're about to die." },
  eureka:        { name:"Eureka!", lv:1, school:"racial", icon:"bulb", text:"Gnome racial. For 8 sec your spells cost 10% less mana and hit 10% harder. 2 min cooldown." },
  counterspell:  { name:"Counterspell", lv:24, school:"arcane", icon:"slash", text:"Stops an enemy's spell while they're casting it." },
  arcanemissiles:{ name:"Arcane Missiles", lv:8, school:"arcane", icon:"dots", text:"Channels a stream of arcane bolts. Costs more mana than Frostbolt, so as Frost you rarely need it. Handy against enemies that resist Frost." },

  arcaneexplosion:{ name:"Arcane Explosion", lv:14, school:"arcane", icon:"burst", text:"Hits every enemy around you. Costs a lot of mana. For groups of enemies." },
  blizzard:      { name:"Blizzard", lv:20, school:"frost", icon:"snow", text:"Ice rains on an area for a few seconds. For big groups of enemies." },
  flamestrike:   { name:"Flamestrike", lv:16, school:"fire", icon:"flame", text:"Burns an area. Good right after Frost Nova on a group." },
  icebarrier:    { name:"Ice Barrier", lv:40, school:"frost", icon:"shield", talent:true, text:"A shield that soaks up damage and adds 15% Frost damage. Use before every fight." },
  managem:       { name:"Mana Agate", lv:28, school:"item", icon:"gem", text:"Instantly gives you mana back in a fight. Made by Conjure Mana Agate. One charge, so conjure a new one after you use it." },
  managem2:      { name:"Mana Jade", lv:38, school:"item", icon:"gem", text:"Better mana gem. Made by Conjure Mana Jade." },
  managem3:      { name:"Mana Citrine", lv:48, school:"item", icon:"gem", text:"Better mana gem. Made by Conjure Mana Citrine." },
  managem4:      { name:"Mana Ruby", lv:58, school:"item", icon:"gem", text:"Best mana gem. Made by Conjure Mana Ruby." },

  water1: { name:"Conjured Water", lv:4, school:"item", icon:"drop", text:"Drink it after a fight to refill mana. Made by Conjure Water." },
  water2: { name:"Conjured Fresh Water", lv:10, school:"item", icon:"drop", text:"Better water from Conjure Water (rank 2)." },
  water3: { name:"Conjured Purified Water", lv:20, school:"item", icon:"drop", text:"Better water from Conjure Water (rank 3)." },
  water4: { name:"Conjured Spring Water", lv:30, school:"item", icon:"drop", text:"Better water from Conjure Water (rank 4)." },
  water5: { name:"Conjured Mineral Water", lv:40, school:"item", icon:"drop", text:"Better water from Conjure Water (rank 5)." },
  water6: { name:"Conjured Sparkling Water", lv:50, school:"item", icon:"drop", text:"Better water from Conjure Water (rank 6)." },
  water7: { name:"Conjured Crystal Water", lv:60, school:"item", icon:"drop", text:"Best water from Conjure Water (rank 7). You learn that rank from the Dire Maul quest Arcane Refreshment, not from the trainer." },
  food1:  { name:"Conjured Muffin", lv:6, school:"item", icon:"bread", text:"Eat it after a fight to refill health. Made by Conjure Food." },
  food2:  { name:"Conjured Bread", lv:12, school:"item", icon:"bread", text:"Better food from Conjure Food (rank 2)." },
  food3:  { name:"Conjured Rye", lv:22, school:"item", icon:"bread", text:"Better food from Conjure Food (rank 3)." },
  food4:  { name:"Conjured Pumpernickel", lv:32, school:"item", icon:"bread", text:"Better food from Conjure Food (rank 4)." },
  food5:  { name:"Conjured Sourdough", lv:42, school:"item", icon:"bread", text:"Better food from Conjure Food (rank 5)." },
  food6:  { name:"Conjured Sweet Roll", lv:52, school:"item", icon:"bread", text:"Best food from Conjure Food (rank 6), the highest rank in WoW Forever." },
  evocation:     { name:"Evocation", lv:20, school:"arcane", icon:"swirl", text:"Channels to refill a big chunk of mana. Use after a hard fight." },
  escape:        { name:"Escape Artist", lv:1, school:"racial", icon:"chain", text:"Gnome racial. Breaks roots and slows on you." },
  coldsnap:      { name:"Cold Snap", lv:32, school:"frost", icon:"clock", talent:true, text:"Resets your Frost cooldowns, so you can use Ice Block or Frost Nova again." },
  removecurse:   { name:"Remove Lesser Curse", lv:18, school:"arcane", icon:"cross", text:"Removes a curse from you or a party member." },
  frostfire:     { name:"Frostfire Bolt", lv:40, school:"frost", icon:"flame", text:"A big hit plus damage over time. Optional for a Frost mage." },
  manashield:    { name:"Mana Shield", lv:20, school:"arcane", icon:"shield", text:"Damage takes your mana instead of your health. Emergency only." },

  frostarmor:    { name:"Frost Armor", lv:1, school:"frost", icon:"shield", text:"Armor buff that slows enemies who hit you. Keep it on." },
  icearmor:      { name:"Ice Armor", lv:30, school:"frost", icon:"shield", text:"Replaces Frost Armor. Stronger. Keep it on." },
  magearmor:     { name:"Mage Armor", lv:34, school:"arcane", icon:"shield", text:"Better mana regen. Swap to it for long dungeon fights." },
  arcaneint:     { name:"Arcane Intellect", lv:1, school:"arcane", icon:"star", text:"More mana. Keep it on yourself and cast it on party members." },
  conjurewater:  { name:"Conjure Water", lv:4, school:"arcane", icon:"drop", text:"Makes a stack of water. The water goes on Alt + 1." },
  conjurefood:   { name:"Conjure Food", lv:6, school:"arcane", icon:"bread", text:"Makes a stack of food. The food goes on Alt + 2." },
  conjuregem:    { name:"Conjure Mana Agate", lv:28, school:"arcane", icon:"gem", text:"Makes a Mana Agate. The gem goes on Shift + 5. Recast after you use it." },
  conjuregem2:   { name:"Conjure Mana Jade", lv:38, school:"arcane", icon:"gem", text:"Makes a Mana Jade. The gem goes on Shift + 5." },
  conjuregem3:   { name:"Conjure Mana Citrine", lv:48, school:"arcane", icon:"gem", text:"Makes a Mana Citrine. The gem goes on Shift + 5." },
  conjuregem4:   { name:"Conjure Mana Ruby", lv:58, school:"arcane", icon:"gem", text:"Makes a Mana Ruby. The gem goes on Shift + 5." },
  comprehend:    { name:"Comprehend Scroll", lv:6, school:"arcane", icon:"scroll", text:"Reads the odd scrolls monsters drop. Free buffs." },
  slowfall:      { name:"Slow Fall", lv:12, school:"arcane", icon:"feather", text:"You float down slowly. Saves you from falling damage." },
  hearth:        { name:"Hearthstone", lv:1, school:"item", icon:"house", text:"Takes you to the inn you set as home. 1 hour cooldown." },
  tp_if:         { name:"Teleport: Ironforge", lv:20, school:"arcane", icon:"ring", text:"Takes you to Ironforge. Uses a Rune of Teleportation." },
  tp_sw:         { name:"Teleport: Stormwind", lv:20, school:"arcane", icon:"ring", text:"Takes you to Stormwind. Uses a Rune of Teleportation." },
  mount:         { name:"Mechanostrider", lv:40, school:"item", icon:"horse", text:"Your gnome mount. Buy it at Steelgrill's Depot, Dun Morogh." }
};


/* ---------- real WoW icons (loaded from Wowhead's icon server) ----------
   If you're offline the simple drawings above are shown instead. */
const ICONS = {
  fireball:"spell_fire_flamebolt", frostbolt:"spell_frost_frostbolt02", fireblast:"spell_fire_fireball",
  frostnova:"spell_frost_frostnova", icelance:"spell_frost_frostblast", polymorph:"spell_nature_polymorph",
  shoot:"ability_shootwand", blink:"spell_arcane_blink", coneofcold:"spell_frost_glacier",
  iceblock:"spell_frost_frost", eureka:"inv_gnometoy", counterspell:"spell_frost_iceshock",
  arcanemissiles:"spell_nature_starfall", arcaneexplosion:"spell_nature_wispsplode", blizzard:"spell_frost_icestorm",
  flamestrike:"spell_fire_selfdestruct", icebarrier:"spell_ice_lament", managem:"inv_misc_gem_emerald_01",
  evocation:"spell_nature_purge", escape:"ability_rogue_trip", coldsnap:"spell_frost_wizardmark",
  removecurse:"spell_nature_removecurse", frostfire:"ability_mage_frostfirebolt", manashield:"spell_shadow_detectlesserinvisibility",
  frostarmor:"spell_frost_frostarmor02", icearmor:"spell_frost_frostarmor02", magearmor:"spell_magearmor",
  arcaneint:"spell_holy_magicalsentry", conjurewater:"inv_drink_06", conjurefood:"inv_misc_food_10",
  conjuregem:"inv_misc_gem_emerald_01", comprehend:"inv_scroll_03", slowfall:"spell_magic_featherfall",
  hearth:"inv_misc_rune_01", tp_if:"spell_arcane_teleportironforge", tp_sw:"spell_arcane_teleportstormwind",
  mount:"ability_mount_mechastrider",
  managem2:"inv_misc_gem_emerald_02", managem3:"inv_misc_gem_opal_01", managem4:"inv_misc_gem_ruby_01",
  conjuregem2:"inv_misc_gem_emerald_02", conjuregem3:"inv_misc_gem_opal_01", conjuregem4:"inv_misc_gem_ruby_01",
  water1:"inv_drink_06", water2:"inv_drink_07", water3:"inv_drink_milk_02", water4:"inv_drink_10",
  water5:"inv_drink_09", water6:"inv_drink_11", water7:"inv_drink_18",
  food1:"inv_misc_food_10", food2:"inv_misc_food_09", food3:"inv_misc_food_12", food4:"inv_misc_food_08",
  food5:"inv_misc_food_11", food6:"inv_misc_food_33"
};

/* ---------- which key holds what, from which level ---------- */
/* each slot: [key label, [[fromLevel, spellId], ...]] */
const BARS = [
  { id:"main", title:"Main bar", how:"Keys 1 to =. Everything you press in a normal fight.",
    slots:[
      ["1", [[1,"fireball"],[4,"frostbolt"]]],
      ["2", [[6,"fireblast"]]],
      ["3", [[10,"frostnova"]]],
      ["4", [[20,"icelance"]]],
      ["5", [[8,"polymorph"]]],
      ["6", [[10,"shoot"]]],
      ["7", [[20,"blink"]]],
      ["8", [[26,"coneofcold"]]],
      ["9", [[29,"iceblock"]]],
      ["0", [[1,"eureka"]]],
      ["-", [[24,"counterspell"]]],
      ["=", [[8,"arcanemissiles"]]]
    ]},
  { id:"shift", title:"Bottom left bar", how:"Shift + 1 to =. Group fights, emergencies and rarer spells.",
    slots:[
      ["S1", [[14,"arcaneexplosion"]]],
      ["S2", [[20,"blizzard"]]],
      ["S3", [[16,"flamestrike"]]],
      ["S4", [[40,"icebarrier"]]],
      ["S5", [[28,"managem"],[38,"managem2"],[48,"managem3"],[58,"managem4"]]],
      ["S6", [[20,"evocation"]]],
      ["S7", [[1,"escape"]]],
      ["S8", [[32,"coldsnap"]]],
      ["S9", [[18,"removecurse"]]],
      ["S0", [[40,"frostfire"]]],
      ["S-", [[4,"fireball"]]],
      ["S=", [[20,"manashield"]]]
    ]},
  { id:"side", title:"Right bar", how:"Click these with the mouse between fights. No key needed.",
    slots:[
      ["", [[1,"frostarmor"],[30,"icearmor"]]],
      ["", [[34,"magearmor"]]],
      ["", [[1,"arcaneint"]]],
      ["", [[4,"conjurewater"]]],
      ["", [[6,"conjurefood"]]],
      ["", [[28,"conjuregem"],[38,"conjuregem2"],[48,"conjuregem3"],[58,"conjuregem4"]]],
      ["", [[6,"comprehend"]]],
      ["", [[12,"slowfall"]]],
      ["", [[1,"hearth"]]],
      ["", [[20,"tp_if"]]],
      ["", [[20,"tp_sw"]]],
      ["", [[40,"mount"]]]
    ]},
  { id:"alt", title:"Bottom right bar", how:"Alt + 1 and Alt + 2. The water and food you conjure. Drink and eat after fights.",
    slots:[
      ["A1", [[4,"water1"],[10,"water2"],[20,"water3"],[30,"water4"],[40,"water5"],[50,"water6"],[60,"water7"]]],
      ["A2", [[6,"food1"],[12,"food2"],[22,"food3"],[32,"food4"],[42,"food5"],[52,"food6"]]]
    ]}
];

/* what's in a slot at a level */
