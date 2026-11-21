/* Settings the shared guide engine (assets/js/guide.js) reads for this character. */
const GUIDE_PAGE = {
  character: "gnome-mage",
  saveKey: "gnomeMageBeginner.v1",
  addonsHref: "Gnome-Mage-Addons.html",
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
   chapter = optional: this step starts a new chapter (shown in the
   journey strip above the step and in the "All steps" list).
   --------------------------------------------------------- */

const STEPS = [

/* ---------- Coldridge Valley, levels 1–6 ---------- */
{ chapter:"Coldridge Valley", lv:"1", place:"Coldridge Valley", title:"Before you do anything", map:[["dunmorogh",[29.9,71.2,"You start here, outside Anvilmar"]]], learn:["fireball","frostarmor","arcaneint","eureka","escape","hearth"],
  todo:[
    "Press <kbd>P</kbd> to open your spellbook.",
    "Drag each spell from your spellbook to the key shown in the <b>Action bar</b> box below. If the extra bars aren't showing yet, see <b>How to set this up in game</b> on the Action Bars tab.",
    "Click each one to cast it on yourself. These are your buffs. Recast them whenever their icons disappear from the top right of your screen."
  ],
  tip:"Fireball is already on key <kbd>1</kbd>. That's your attack for now." },

{ lv:"1", place:"Coldridge Valley", title:"Your first quest", map:[["dunmorogh",[29.9,71.2,"Sten Stoutarm"],[26.5,75.5,"Wolves"]]],
  todo:[
    "Talk to <b>Sten Stoutarm</b>, the dwarf right in front of you. He has a yellow <b>!</b> over his head. Accept <b>Dwarven Outfitters</b>.",
    "Walk southwest and kill wolves until you have 8 Tough Wolf Meat.",
    "Go back to Sten. He now has a yellow <b>?</b>. Talk to him to turn in the quest."
  ],
  tip:"How to fight: click a wolf to target it, then press <kbd>1</kbd> while standing still. Start casting before it reaches you." },

{ lv:"1–2", place:"Coldridge Valley", title:"Meet your trainer", map:[["dunmorogh",[28.7,66.4,"Marryk Nurribit (inside Anvilmar)"],[29.9,71.2,"Sten and Balir"],[28,79,"Troggs"]]],
  todo:[
    "Sten gives you a letter called <b>Glyphic Memorandum</b>. Take it to <b>Marryk Nurribit</b>, the mage trainer in the valley.",
    "Also take <b>Coldridge Valley Mail Delivery</b> from Sten and <b>A New Threat</b> from Balir Frosthammer.",
    "For A New Threat, kill the troggs to the south, then go back to Balir."
  ],
  tip:"After every fight, if your health or mana is low, sit and eat or drink before the next one. It saves you from dying." },

{ lv:"3–5", place:"Coldridge Valley", title:"Deliver the mail", map:[["dunmorogh",[22.6,71.4,"Talin Keeneye"],[25.1,75.7,"Grelin Whitebeard's camp"],[26.8,79.2,"Troll cave"]]],
  todo:[
    "Walk west along the road to <b>Talin Keeneye</b> and give him the mail. Take his quest <b>The Boar Hunter</b> and kill boars nearby.",
    "Take the next mail to <b>Grelin Whitebeard</b>'s camp to the south. Take <b>The Troll Cave</b> and kill the young trolls.",
    "Then <b>The Stolen Journal</b>: kill the troll leader, Grik'nir the Cold, at the back of the cave."
  ],
  tip:"In caves, enemies stand close together. Fight them one at a time: target the closest one and step back so you don't pull its friends." },

{ lv:"4", place:"Marryk Nurribit (trainer)", title:"Level 4: your main spell", map:[["dunmorogh",[28.7,66.4,"Marryk Nurribit (mage trainer)"]]], learn:["frostbolt","fireball","conjurewater","water1"],
  todo:[
    "Go back to Marryk and learn <b>Frostbolt</b> and <b>Conjure Water</b>.",
    "Put Frostbolt on key <kbd>1</kbd> and move Fireball to <kbd>Shift</kbd> + <kbd>-</kbd>. Frostbolt slows the enemy, so it takes longer to reach you.",
    "Cast Conjure Water a few times. It makes <b>Conjured Water</b> in your bags. Drag that water onto <kbd>Alt</kbd> + <kbd>1</kbd> and drink it (press <kbd>Alt</kbd> + <kbd>1</kbd>) whenever your mana is low."
  ] },

{ lv:"5", place:"Anvilmar", title:"Free bag", map:[["dunmorogh",[28.7,66.4,"Anvilmar"]]],
  todo:[
    "Find <b>Grund Drokda</b> at Anvilmar (the building where you started) and do <b>Grund and Gozwin</b>.",
    "The reward is a 6-slot bag. Right-click it to equip it in a free bag slot."
  ],
  tip:"If he doesn't have a quest yet, come back a level later." },

{ lv:"5–6", place:"Coldridge Valley", title:"Finish the valley", map:[["dunmorogh",[28.7,66.4,"Anvilmar"]]],
  todo:[
    "Take <b>Scalding Mornbrew Delivery</b> at Anvilmar and run it straight to its destination before it goes cold, then bring the mug back.",
    "Turn in everything you've finished."
  ] },

{ lv:"6", place:"Marryk Nurribit (trainer)", title:"Level 6: train again", map:[["dunmorogh",[28.7,66.4,"Marryk Nurribit (mage trainer)"]]], learn:["fireblast","conjurefood","comprehend","food1"],
  todo:[
    "Learn <b>Fire Blast</b>, <b>Conjure Food</b> and <b>Comprehend Scroll</b>.",
    "Cast Conjure Food. It makes <b>Conjured Muffins</b> in your bags. Drag them onto <kbd>Alt</kbd> + <kbd>2</kbd> and eat (press <kbd>Alt</kbd> + <kbd>2</kbd>) whenever your health is low.",
    "Put Fire Blast on key <kbd>2</kbd>. It hits instantly. Use it whenever it's ready.",
    "Visit the junior gathering trainers nearby and take the free gathering book."
  ],
  tip:"Comprehend Scroll is a mage-only skill in Forever. Monsters sometimes drop odd scrolls; use it on them to get free buffs and small spells." },

{ lv:"6", place:"Coldridge Pass", title:"Leave the valley", map:[["dunmorogh",[33.9,72.2,"Hands Springsprocket, Coldridge Pass"],[46.7,53,"Kharanos"]]],
  todo:[
    "Take <b>Supplies to Tannok</b> from Hands Springsprocket.",
    "Walk through the tunnel (Coldridge Pass) to the town of <b>Kharanos</b>."
  ] },

/* ---------- Kharanos, levels 6–11 ---------- */
{ chapter:"Kharanos", lv:"6", place:"Kharanos", title:"Make Kharanos your home", map:[["dunmorogh",[47.3,52.4,"Thunderbrew Distillery (inn)"]]],
  todo:[
    "Find the innkeeper in the Thunderbrew Distillery (the big inn) and choose <b>Make this inn your home</b>.",
    "Your <b>Hearthstone</b> (in your bag) now teleports you back here. It has a 1 hour cooldown.",
    "Turn in <b>Supplies to Tannok</b>."
  ],
  tip:"Always log out inside an inn. You'll get bonus XP (called rested XP) when you come back." },

{ lv:"6", place:"Kharanos", title:"Learn Cooking", map:[["dunmorogh",[47.3,52.4,"Thunderbrew Distillery"]]],
  todo:[
    "Find the cooking trainer in Kharanos and learn Cooking.",
    "Do <b>Beer Basted Boar Ribs</b> from Ragnar Thunderbrew. It teaches you a recipe.",
    "Cooked food gives the <b>Well Fed</b> buff: 5% more XP from kills."
  ] },

{ lv:"6–7", place:"Kharanos", title:"Grab every quest in town", map:[["dunmorogh",[46.7,53,"Kharanos"],[49.4,48.4,"Steelgrill's Depot"],[42.5,53,"The Grizzled Den"]]],
  todo:[
    "Walk around Kharanos and take every yellow <b>!</b> you see. You should get about 8 quests.",
    "Press <kbd>L</kbd> to open your quest log. Each quest tells you where to go.",
    "Start with the easy ones close to town: <b>Stocking Jetsteam</b> (boars and bears) and <b>The Grizzled Den</b> (wendigos in a cave)."
  ] },

{ lv:"7–8", place:"West of Kharanos", title:"Gnome quest: fix the machines", map:[["dunmorogh",[45.9,49.4,"Razzle Sprysprocket"],[25.5,41.5,"Leper Gnomes"]]],
  todo:[
    "For <b>Operation Recombobulation</b>, go west toward Gnomeregan and kill the Leper Gnomes for gears and cogs.",
    "Bring them back to Razzle Sprysprocket in Kharanos."
  ] },

{ lv:"8", place:"Magis Sparkmantle (trainer, Kharanos)", title:"Level 8: Polymorph", map:[["dunmorogh",[47.3,52.4,"Magis Sparkmantle (Kharanos)"]]], learn:["polymorph","arcanemissiles"],
  todo:[
    "Kharanos has its own mage trainer, <b>Magis Sparkmantle</b>. Learn <b>Polymorph</b> and <b>Arcane Missiles</b>.",
    "Put Polymorph on key <kbd>5</kbd> and Arcane Missiles on key <kbd>=</kbd>."
  ],
  tip:"If two enemies attack you, cast Polymorph on one of them. It turns into a sheep and can't fight for a while. Kill the other one, then deal with the sheep. Don't hit the sheep, or it wakes up." },

{ lv:"8–9", place:"Around Kharanos", title:"Trolls and stout", map:[["dunmorogh",[40,43,"Shimmer Ridge"],[25,51,"Frostmane Hold"],[40.6,65.1,"Hunter camp"],[47.3,52.4,"Kharanos inn"]]],
  todo:[
    "<b>The Perfect Stout</b> / <b>Shimmer Stout</b>: kill the troll casters at Shimmer Ridge for Shimmerweed.",
    "<b>Frostmane Hold</b>: explore the troll camp and kill the headhunters.",
    "<b>Bitter Rivals</b> leads into the inn's cellar. <b>Ammo for Rumbleshot</b> sends you to a hunter's camp south of town.",
    "If you see a new quest about <b>snow leopards</b> or <b>wendigos</b>, take it too. Forever added a new chain around this level."
  ],
  tip:"Trolls come in groups. Pull one at a time with Frostbolt from far away." },

{ lv:"10", place:"Magis Sparkmantle (trainer, Kharanos)", title:"Level 10: Frost Nova and your first talent", map:[["dunmorogh",[47.3,52.4,"Magis Sparkmantle (Kharanos)"]]], learn:["frostnova"],
  todo:[
    "Learn <b>Frost Nova</b>. Put it on key <kbd>3</kbd>.",
    "Press <kbd>N</kbd> to open talents. Click the <b>Frost</b> tab and put your point into <b>Improved Frostbolt</b>.",
    "Magis also gives you <b>Speak with Bink</b>, a mage quest in Ironforge. Keep it for later."
  ],
  tip:"The combo to learn now: Frostbolt the enemy. When it reaches you, press Frost Nova. It freezes in place. Walk a few steps away and keep casting Frostbolt." },

{ lv:"10", place:"Gol'Bolar Quarry (east)", title:"The quarry", map:[["dunmorogh",[68.9,56,"Gol'Bolar Quarry"],[74,53,"Dark Iron Spies"]]],
  todo:[
    "Follow the road east to Gol'Bolar Quarry.",
    "Take <b>Those Blasted Troggs!</b> and <b>The Public Servant</b> and kill troggs in and around the mine.",
    "Talk to <b>Earthseer Farsen</b> and take <b>Nip 'Em in the Bud</b>: kill 10 Dark Iron Spies east of the quarry.",
    "One spy drops a <b>Dark Iron Map</b>. Right-click it, bring it to Farsen and take <b>Old Ironforge Incursion</b>. That's a dungeon quest for later."
  ] },

{ lv:"10–11", place:"Dun Morogh", title:"Wrap up Dun Morogh", map:[["dunmorogh",[46.7,53,"Kharanos"]]],
  todo:[
    "Turn in everything in Kharanos.",
    "Skip <b>Protecting the Herd</b>. Its boss is an <b>elite</b>, too strong to fight alone.",
    "From Rejold Barleybrew, take <b>Stout to Kadrell</b>. It points you to the next zone."
  ] },

/* ---------- Ironforge ---------- */
{ chapter:"Ironforge", lv:"10–11", place:"Ironforge", title:"Visit Ironforge", map:[["dunmorogh",[53.5,34.9,"Gates of Ironforge"]],["ironforge",[15,85,"You come in here"],[55.5,47.7,"Gryphon master"]]],
  todo:[
    "Follow the road north from Kharanos to the big gate of <b>Ironforge</b>.",
    "Inside, find the gryphon master and talk to him to unlock the <b>flight path</b>.",
    "Find the Tailoring and Enchanting trainers and learn both. Tailoring lets you make your own clothes from the cloth enemies drop. Step-by-step leveling routes are on the <a href=\"Gnome-Mage-Professions.html\">Professions page</a>."
  ],
  tip:"Lost in Ironforge? Ask any guard. Click them and they'll mark the place on your map." },

{ lv:"10–11", place:"Ironforge, Mystic Ward", title:"Mage quest: Bink", map:[["ironforge",[26.5,8.5,"Bink (Hall of Mysteries)"]],["dunmorogh",[23,40,"Huts outside Gnomeregan"]]],
  todo:[
    "Go to the Mystic Ward and find <b>Bink</b> in the Hall of Mysteries. Turn in Speak with Bink.",
    "She gives <b>Mage-tastic Gizmonitor</b>. It's in one of the huts outside Gnomeregan, in the far west of Dun Morogh.",
    "Search the huts but <b>don't go inside Gnomeregan</b>. Everything there is much too strong for you."
  ] },

{ lv:"10–12", place:"Ironforge", title:"Get a wand and a dungeon quest", map:[["ironforge",[25,74,"Auction house"],[39,55,"Thom Filch (below the High Seat)"]]], learn:["shoot"],
  todo:[
    "Buy a <b>Lesser Magic Wand</b> from the auction house, or ask an enchanter to make you one.",
    "Put your wand's <b>Shoot</b> on key <kbd>6</kbd>. Use it to finish enemies that are almost dead. It costs no mana.",
    "Find <b>Thom Filch</b> near the bridge under the king's throne room and take <b>Important Heirlooms</b>. It's for the Hall of Thanes dungeon later."
  ] },

/* ---------- Loch Modan, levels 11–19 ---------- */
{ chapter:"Loch Modan", lv:"11", place:"Road to Loch Modan", title:"Move to Loch Modan", map:[["dunmorogh",[46.7,53,"Kharanos"],[87.5,50,"Tunnel to Loch Modan"]],["lochmodan",[23.3,74,"Guard tower"]]],
  todo:[
    "From Kharanos, follow the road east through the mountain tunnel into <b>Loch Modan</b>.",
    "At the first guard tower, take <b>The Trogg Threat</b> and <b>In Defense of the King's Lands</b>."
  ] },

{ lv:"12", place:"Thelsamar", title:"Your new home: Thelsamar", map:[["lochmodan",[35,47,"Thelsamar"]]],
  todo:[
    "Follow the road to the town of <b>Thelsamar</b>.",
    "Make the inn your home. Unlock the flight path. Turn in <b>Stout to Kadrell</b>.",
    "Take every quest in town: <b>Rat Catching</b>, <b>Thelsamar Blood Sausages</b>, <b>Mountaineer Stormpike's Task</b>, <b>Ironband's Excavation</b>."
  ],
  tip:"There's no mage trainer here. Every two levels, fly to Ironforge to train. It's a short flight." },

{ lv:"12", place:"Ironforge (fly)", title:"Level 12: train", map:[["ironforge",[26.5,8.5,"Mage trainers (Hall of Mysteries)"],[55.5,47.7,"Gryphon master: you land here"]]], learn:["slowfall"],
  todo:[
    "Fly to Ironforge, open the mage trainer, and learn everything you can afford.",
    "Spend your talent point (<kbd>N</kbd>): Improved Frostbolt again."
  ],
  tip:"From now on, train every even level and spend a talent point every level. The Talents tab of this guide tells you which one." },

{ lv:"12–14", place:"Loch Modan", title:"Kobolds and the excavation", map:[["lochmodan",[24.8,18.4,"Mountaineer Stormpike"],[35,19,"Silver Stream Mine"],[65,65,"Ironband's Excavation"]]],
  todo:[
    "<b>Mountaineer Stormpike's Task</b> → <b>Filthy Paws</b> → <b>Stormpike's Order</b>: kobolds in the Silver Stream Mine.",
    "<b>Ironband's Excavation</b>: go to the dig site in the southeast and follow the chain.",
    "Take any new quests you see. Loch Modan has 11 new ones in Forever."
  ] },

{ lv:"13–18", place:"Under Ironforge", title:"Your first dungeon: Hall of Thanes", map:[["ironforge"]],
  todo:[
    "A dungeon is a private area for a group of 5 players. Hall of Thanes is new in Forever and sits under Ironforge.",
    "Before going, have these quests: <b>Important Heirlooms</b> (Thom Filch) and <b>Old Ironforge Incursion</b> (from the quarry). Two more start inside.",
    "Find a group: open the Looking For Group tool or ask in chat (\"LFG Hall of Thanes\").",
    "Inside, stay behind the tank (the player the enemies attack), use Frostbolt, and don't attack before the tank does."
  ],
  tip:"The 5 quests here give about one whole level of XP. Most dungeon XP in Forever comes from quests, not kills." },

{ lv:"14", place:"Ironforge (fly)", title:"Level 14: your first area spell", map:[["ironforge",[26.5,8.5,"Mage trainers (Hall of Mysteries)"],[55.5,47.7,"Gryphon master: you land here"]]], learn:["arcaneexplosion"],
  todo:[
    "Learn <b>Arcane Explosion</b>. It hits every enemy around you, but costs a lot of mana.",
    "You don't need it much while questing alone. It's for later, when you fight groups."
  ] },

{ lv:"15", place:"Stormwind", title:"Mage quest: a free robe", map:[["ironforge",[76.5,51,"Deeprun Tram"]],["stormwind",[64,8,"The tram arrives here"],[39,80,"Jennea Cannon (Mage Quarter)"],[66.3,62.1,"Flight master"]]],
  todo:[
    "In Ironforge, go to Tinker Town and take the <b>Deeprun Tram</b> to Stormwind.",
    "Find <b>Jennea Cannon</b> in the Mage Quarter and do her chain, ending with <b>Manaweave Robe</b>.",
    "Unlock Stormwind's flight path while you're there."
  ] },

{ lv:"15–18", place:"Loch Modan", title:"Finish Loch Modan", map:[["lochmodan",[35,47,"Thelsamar"],[65,65,"Ironband's Excavation"]]],
  todo:[
    "Finish your Thelsamar quests: sausages, crocolisks, the excavation chain.",
    "Skip <b>WANTED: Chok'sul</b>. It's an elite."
  ],
  tip:"Running out of quests? Westfall (south of Stormwind) and Redridge Mountains also fit this level." },

{ lv:"16", place:"Ironforge (fly)", title:"Level 16: Flamestrike", map:[["ironforge",[26.5,8.5,"Mage trainers (Hall of Mysteries)"],[55.5,47.7,"Gryphon master: you land here"]]], learn:["flamestrike"],
  todo:[
    "Fly to Ironforge and learn <b>Flamestrike</b> plus any new ranks.",
    "Flamestrike burns an area on the ground. Cast it right after Frost Nova when several enemies are frozen together."
  ] },

{ lv:"18", place:"Ironforge (fly)", title:"Level 18: Remove Lesser Curse", map:[["ironforge",[26.5,8.5,"Mage trainers (Hall of Mysteries)"],[55.5,47.7,"Gryphon master: you land here"]]], learn:["removecurse"],
  todo:[
    "Learn <b>Remove Lesser Curse</b>.",
    "In dungeons, when a party member has a curse on them, click them and cast it. Groups love mages who do this."
  ] },

/* ---------- Level 20 ---------- */
{ chapter:"Level 20 training", lv:"20", place:"Ironforge", title:"Level 20: the big one", map:[["ironforge",[26.5,8.5,"Mage trainers (Hall of Mysteries)"],[55.5,47.7,"Gryphon master: you land here"]]], learn:["blink","blizzard","evocation","manashield","tp_if","tp_sw"],
  todo:[
    "Learn everything: <b>Blink</b>, <b>Blizzard</b>, <b>Evocation</b>, <b>Teleport: Ironforge</b>, <b>Teleport: Stormwind</b> and new ranks.",
    "Buy a few <b>Runes of Teleportation</b> from the reagent vendor. Teleports use them up.",
    "Put Blink on key <kbd>7</kbd>. It jumps you forward a short distance. Use it to get away."
  ],
  tip:"Teleports mean you can leave your Hearthstone set to wherever you're questing and still reach the city whenever you like." },

{ lv:"20", place:"Talents (N)", title:"Level 20: Ice Lance", learn:["icelance"],
  todo:[
    "Put this level's talent point into <b>Ice Lance</b>.",
    "Open your spellbook (<kbd>P</kbd>) and put Ice Lance on key <kbd>4</kbd>."
  ],
  tip:"Ice Lance does triple damage to a frozen enemy. New combo: Frostbolt → enemy reaches you → Frost Nova → step back → Ice Lance → Frostbolt." },

{ lv:"20", place:"Loch Modan → Wetlands", title:"Travel to the Wetlands", map:[["lochmodan",[24.8,18.4,"Algaz Station: road north"]],["wetlands",[53,72,"Dun Algaz: you come in here"],[10.5,60,"Menethil Harbor"]]],
  todo:[
    "From Loch Modan, take the road north through the pass (Dun Algaz) into the <b>Wetlands</b>.",
    "Stay on the road. Some enemies along it are stronger than you.",
    "Follow the road to <b>Menethil Harbor</b> on the west coast."
  ] },

/* ---------- Wetlands, levels 20–28 ---------- */
{ chapter:"Wetlands", lv:"20–22", place:"Menethil Harbor", title:"Settle in Menethil", map:[["wetlands",[10.5,60,"Menethil Harbor"]]],
  todo:[
    "Make the inn your home. Unlock the flight path.",
    "Take every quest in town: <b>Claws from the Deep</b>, <b>Young Crocolisk Skins</b>, <b>Digging Through the Ooze</b>, <b>Daily Delivery</b> and more."
  ] },

{ lv:"21–24", place:"Wetlands", title:"Quest the Wetlands", map:[["wetlands",[56.4,40.4,"The Greenwarden"],[48,15,"Dun Modr"],[44,25,"Ironbeard's Tomb"]]],
  todo:[
    "Do the coast quests first (murlocs, crocolisks), then move inland.",
    "<b>The Greenwarden</b> → <b>Tramping Paws</b> (gnolls). Then the dwarf ruins in the north: <b>Fall of Dun Modr</b>, <b>Ironbeard's Tomb</b>.",
    "The Wetlands got 20+ new quests in Forever. Take everything you find."
  ] },

{ lv:"24", place:"Ironforge (teleport)", title:"Level 24: Counterspell", map:[["ironforge",[26.5,8.5,"Mage trainers (Hall of Mysteries)"],[55.5,47.7,"Gryphon master: you land here"]]], learn:["counterspell"],
  todo:[
    "Learn <b>Counterspell</b>. When an enemy is casting a spell (you'll see a cast bar under its name), press it to stop the spell."
  ] },

{ lv:"25", place:"Talents (N)", title:"Level 25: Ice Block and Legacy", learn:["iceblock"],
  todo:[
    "Talent: <b>Ice Block</b>. Put it on key <kbd>9</kbd>. When you're about to die, press it: you're frozen in a block of ice and nothing can hurt you for a few seconds.",
    "Around now you get your first <b>Legacy</b> point. Press <kbd>Y</kbd> and put it in <b>Thrill of Adventure</b>: every kill gives back some health and mana."
  ] },

{ lv:"24–29", place:"Wetlands", title:"Dungeon: Excavation Site", map:[["wetlands",[10.5,60,"Caitlin Grassman (Menethil)"],[34,42,"Whelgar's Excavation Site"]],["redridge",[26,46,"Dorin Songblade (Lakeshire)"]]],
  todo:[
    "Another new dungeon, in the Wetlands. Best at levels 26–29.",
    "Collect its quests first: <b>Caitlin Grassman</b> in Menethil and <b>Dorin Songblade</b> in Lakeshire (Redridge). Others come from the Wetlands quest chains.",
    "Find a group the same way as Hall of Thanes."
  ] },

{ lv:"26", place:"Stormwind (teleport)", title:"Level 26: Cone of Cold and another mage quest", map:[["stormwind",[39,80,"Mage Quarter: trainer and Andromath"]]], learn:["coneofcold"],
  todo:[
    "Learn <b>Cone of Cold</b> and put it on key <kbd>8</kbd>. It hits and slows everything in front of you.",
    "Do the mage quest from <b>High Sorcerer Andromath</b> in Stormwind. The reward is <b>Astral Knot Garment</b> (chest armor)."
  ] },

{ lv:"27–28", place:"Wetlands", title:"Finish the Wetlands", map:[["wetlands",[10.5,60,"Menethil Harbor"]]],
  todo:[
    "Finish your Wetlands quests.",
    "If the north part feels too hard, go to <b>Redridge Mountains</b> or <b>Duskwood</b> (both near Stormwind) for a few levels."
  ] },

/* ---------- 28–36 ---------- */
{ chapter:"Duskwood to Stranglethorn", lv:"28–30", place:"Duskwood or Hillsbrad", title:"Two zones to choose from", map:[["duskwood",[73.5,46,"Darkshire"]],["hillsbrad",[50,55,"Southshore"]]],
  todo:[
    "<b>Duskwood</b> (town: Darkshire) or <b>Hillsbrad Foothills</b> (town: Southshore). Pick one, or do both.",
    "In Southshore, talk to <b>Emissary Jacques</b> to start the new <b>City of Dalaran</b> dungeon (levels 28–35)."
  ],
  tip:"From Duskwood onward, on PvP servers, Horde players can attack you. Frost Nova and Blink are your escape." },

{ lv:"28", place:"Trainer", title:"Level 28: mana gem", learn:["conjuregem","managem"],
  todo:[
    "Learn <b>Conjure Mana Agate</b> and cast it. It makes a <b>Mana Agate</b> in your bags.",
    "Drag the Mana Agate onto <kbd>Shift</kbd> + <kbd>5</kbd>. In a hard fight, press it to get mana back instantly. Conjure a new one after you use it."
  ] },

{ lv:"30", place:"Trainer", title:"Level 30: Ice Armor and the wand quest", learn:["icearmor"],
  todo:[
    "Learn <b>Ice Armor</b>. It replaces Frost Armor and is stronger.",
    "Keep spending a talent point every level. The Talents tab tells you which one.",
    "Take <b>Journey to the Marsh</b> from the mage trainer. This starts the quest for the <b>Icefury Wand</b>."
  ] },

{ lv:"30–33", place:"Arathi Highlands", title:"Arathi Highlands", map:[["arathi",[44,89,"Thandol Span (from the Wetlands)"],[45.8,47.6,"Refuge Pointe"],[52,50,"Circle of Outer Binding"],[66,68,"Witherbark trolls"]]],
  todo:[
    "From the Wetlands, go north over the big bridge (Thandol Span) into <b>Arathi Highlands</b>.",
    "Make <b>Refuge Pointe</b> your home and unlock the flight path.",
    "Wand quest: kill Witherbark trolls for 10 Totem Sticks and take them to the stone circle in the middle of the zone (the Circle of Outer Binding)."
  ] },

{ lv:"32–35", place:"Stranglethorn Vale", title:"Stranglethorn Vale", map:[["stranglethorn",[38,3.5,"Rebel Camp"],[27,77,"Booty Bay"]]],
  todo:[
    "A big jungle zone south of Duskwood. Start at <b>Rebel Camp</b> in the north, then <b>Booty Bay</b> in the far south.",
    "Unlock both flight paths."
  ] },

{ lv:"33–35", place:"Several places", title:"Finish the wand quest", map:[["needles",[78,77,"Mirage Raceway"]],["tirisfal",[83,33,"Scarlet Monastery"]],["dustwallow",[46,57,"Tabetha"]]],
  todo:[
    "<b>Thousand Needles</b> (Kalimdor, boat needed): at the Mirage Raceway talk to Magus Tirth, then target the chicken \"Plucky\" Johnson and type <kbd>/beckon</kbd>.",
    "<b>Scarlet Monastery Library</b> (a dungeon): grab the Rituals of Power book from a side table.",
    "Bring it all to <b>Tabetha</b> in Dustwallow Marsh and choose the <b>Icefury Wand</b>."
  ],
  tip:"This quest sends you around the world. It's optional. If it feels like too much, skip it." },

{ lv:"34", place:"Trainer + Talents (N)", title:"Level 34: Mage Armor and Cold Snap", learn:["magearmor","coldsnap"],
  todo:[
    "Learn <b>Mage Armor</b> at the trainer. Keep Ice Armor on while questing; swap to Mage Armor for long dungeon fights.",
    "Talent: <b>Cold Snap</b>. It resets your Frost cooldowns, so you get a second Ice Block or Frost Nova."
  ] },

/* ---------- 35–60 ---------- */
{ chapter:"Riverglades to 60", lv:"35–40", place:"Riverglades (new zone)", title:"Riverglades", map:[["riverglades"]],
  todo:[
    "A brand new zone for levels 35–45. From Redridge, take the road toward Burning Steppes, turn right into the hills, and follow the road south to <b>Farholde Keep</b>.",
    "Make it your home and unlock the flight path. It flies straight back to Redridge.",
    "Quest here until about 42. There are 150+ quests."
  ] },

{ lv:"40", place:"Trainer + Dun Morogh", title:"Level 40: your mount!", map:[["dunmorogh",[49.4,48.4,"Steelgrill's Depot (mount vendor)"]]], learn:["mount","frostfire","icebarrier"],
  todo:[
    "Learn riding and buy a <b>mechanostrider</b> (gnome mount) at <b>Steelgrill's Depot</b> in Dun Morogh. Start saving gold around level 30.",
    "Learn <b>Frostfire Bolt</b> and <b>Portals</b> at the trainer.",
    "Talent: <b>Ice Barrier</b>, a shield that absorbs damage. Use it before every fight."
  ] },

{ lv:"40–45", place:"Riverglades, Tanaris", title:"Riverglades to Tanaris", map:[["riverglades"],["tanaris",[51,28,"Gadgetzan"]]],
  todo:[
    "Finish Riverglades. Its dungeon is <b>Krol'dok Stronghold</b>.",
    "Take the boat from Powderfuse Port (in Riverglades) to <b>Tanaris</b>, a desert in Kalimdor. Town: <b>Gadgetzan</b>."
  ] },

{ lv:"45–50", place:"Several zones", title:"Pick two zones", map:[["tanaris",[51,28,"Gadgetzan"]],["feralas",[30.5,43.5,"Feathermoon Stronghold"]],["hinterlands",[14,46,"Aerie Peak"]],["searing",[38,27,"Thorium Point"]]],
  todo:[
    "Choose from <b>Tanaris</b>, <b>Feralas</b>, <b>The Hinterlands</b> and <b>Searing Gorge</b>.",
    "Do the zones where you have the most quests. Move on when the quests turn green."
  ],
  tip:"From level 48, most quests also give gold." },

{ lv:"50–55", place:"Several zones", title:"Un'Goro and Felwood", map:[["ungoro",[43.5,8.5,"Marshal's Refuge"]],["felwood",[62.5,24.5,"Talonbranch Glade"]],["burning",[84,68,"Morgan's Vigil"]],["wpl",[43,84,"Chillwind Camp"]]],
  todo:[
    "<b>Un'Goro Crater</b> (a dinosaur jungle) and <b>Felwood</b> (a poisoned forest).",
    "Also <b>Burning Steppes</b> and <b>Western Plaguelands</b> if you run out."
  ] },

{ lv:"55–60", place:"Several zones", title:"The last levels", map:[["epl",[81.5,59,"Light's Hope Chapel"]],["winterspring",[61,38.5,"Everlook"]]],
  todo:[
    "<b>Eastern Plaguelands</b> and <b>Winterspring</b>.",
    "Run dungeons with groups. Their quests give big XP."
  ] },

{ lv:"60", place:"Mount Hyjal", title:"You made it to 60!", map:[["hyjal"]],
  todo:[
    "Visit <b>Mount Hyjal</b>, a new level 60 zone reached through Winterspring.",
    "From here on, it's about gear, dungeons and raids. Congratulations!"
  ] }
];

/* Talent points: which talent to click at each level. */
const TALENTS = [
  ["10–14", "Improved Frostbolt", "Click it 5 times (once per level)", "Frostbolt casts faster."],
  ["15–19", "Ice Shards", "5 times", "Your Frost spells hit harder on critical hits."],
  ["20", "Ice Lance", "Once", "Triple damage to frozen enemies. Your best new trick."],
  ["21–23", "Frostbite", "3 times", "Frostbolt can freeze enemies by itself."],
  ["24", "Improved Frost Nova", "Once", "Frost Nova comes back sooner."],
  ["25", "Ice Block", "Once", "Your \"don't die\" button."],
  ["26", "Improved Frost Nova", "Once more (2 of 2)", ""],
  ["27–29", "Shatter", "3 times", "More critical hits on frozen enemies."],
  ["30–31", "Arctic Reach", "2 times", "Longer range."],
  ["32–33", "Fingers of Frost", "2 times", "Enemies count as frozen more often, so more Ice Lances."],
  ["34", "Cold Snap", "Once", "Resets your Frost cooldowns, so you can Ice Block twice."],
  ["35–39", "Winter's Chill", "5 times", "Makes Cone of Cold stronger."],
  ["40", "Ice Barrier", "Once", "A damage-absorbing shield."],
  ["41–45", "Improved Channeling (Arcane tab)", "5 times", "Switch to the Arcane tab now."],
  ["46–50", "Arcane Concentration", "5 times", "Sometimes your next spell is free."],
  ["51–52", "Missile Barrage", "2 times", "Sometimes gives a free, fast Arcane Missiles. Press it when it lights up."],
  ["53–54", "Arcane Subtlety", "2 times", ""],
  ["55–56", "Arcane Impact", "2 times", ""],
  ["57", "Arcane Blast", "Once", ""],
  ["58–60", "Arcane Meditation", "3 times", "Better mana regeneration. That's all 51 points."]
];

/* Words a new player won't know. Matching is case-insensitive. */
const WORDS = {
  "buff": "A good effect on you, like Frost Armor. Its icon shows at the top right of your screen.",
  "elite": "A much stronger enemy. Its portrait has a golden dragon border. Skip these alone.",
  "dungeon": "A private area for a group of 5 players, with bosses and better loot.",
  "flight path": "Talk to a flight master (the person with a gryphon) once to unlock that place. Then you can fly between any places you've unlocked.",
  "hearthstone": "A stone in your bag that teleports you to the inn you set as home. Usable once an hour.",
  "rested xp": "Bonus XP you build up while logged out in an inn or city. Your XP bar turns blue while you have it.",
  "talent": "One point per level from 10. You spend it in the talent window (N) to make yourself stronger.",
  "trainer": "An NPC who teaches you new spells for gold. Mages need one every 2 levels.",
  "tank": "The group member (often a warrior) whose job is to make enemies attack them, not you.",
  "frozen": "Can't move. Frost Nova and Frostbite freeze enemies. Ice Lance does triple damage to frozen enemies.",
  "pull": "Starting a fight with an enemy, usually by hitting it from a distance.",
  "cooldown": "Waiting time before you can use an ability again. The button shows a clock-style sweep.",
  "elites": "Much stronger enemies with a golden dragon border on their portrait. Skip them alone.",
  "legacy": "A Forever system: you earn points across your whole account and spend them on bonuses. Press Y.",
  "reagent vendor": "A shop NPC who sells things your spells use up, like Runes of Teleportation.",
  "auction house": "Where players buy and sell items. In Ironforge it's near the bank.",
  "pvp": "Fighting other players. On PvP servers, the other faction can attack you in some zones."
};

/* ---------------------------------------------------------
   PART 2 — PAGE BEHAVIOUR
   --------------------------------------------------------- */

const ZONES = {
  dunmorogh: { name: "Dun Morogh", id: 1 },       ironforge: { name: "Ironforge", id: 1537 },
  lochmodan: { name: "Loch Modan", id: 38 },      stormwind: { name: "Stormwind", id: 1519 },
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
  riverglades: { name: "Riverglades", id: null, none: "Riverglades is new in WoW: Forever, so there's no map of it here yet. Follow the directions above." },
  hyjal: { name: "Mount Hyjal", id: null, none: "Mount Hyjal isn't on the classic maps. Follow the directions above." }
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
  shoot:         { name:"Shoot (wand)", lv:5, school:"item", icon:"wand", text:"Free damage with your wand. Use it to finish enemies. Needs a wand equipped." },
  blink:         { name:"Blink", lv:20, school:"arcane", icon:"arrow", text:"Teleports you a short way forward. Your escape button." },
  coneofcold:    { name:"Cone of Cold", lv:26, school:"frost", icon:"snow", text:"Hits and slows everything in front of you." },
  iceblock:      { name:"Ice Block", lv:25, school:"frost", icon:"cube", talent:true, text:"Nothing can hurt you for a few seconds. Press it when you're about to die." },
  eureka:        { name:"Eureka!", lv:1, school:"racial", icon:"bulb", text:"Gnome racial. For 8 sec your spells cost 10% less mana and hit 10% harder. 2 min cooldown." },
  counterspell:  { name:"Counterspell", lv:24, school:"arcane", icon:"slash", text:"Stops an enemy's spell while they're casting it." },
  arcanemissiles:{ name:"Arcane Missiles", lv:8, school:"arcane", icon:"dots", text:"Channels a stream of arcane bolts. Mostly for later: from level 51 (Missile Barrage talent), press it when it lights up, because then it's free and fast." },

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
  water7: { name:"Conjured Crystal Water", lv:60, school:"item", icon:"drop", text:"Best water from Conjure Water (rank 7)." },
  food1:  { name:"Conjured Muffin", lv:6, school:"item", icon:"bread", text:"Eat it after a fight to refill health. Made by Conjure Food." },
  food2:  { name:"Conjured Bread", lv:12, school:"item", icon:"bread", text:"Better food from Conjure Food (rank 2)." },
  food3:  { name:"Conjured Rye", lv:22, school:"item", icon:"bread", text:"Better food from Conjure Food (rank 3)." },
  food4:  { name:"Conjured Pumpernickel", lv:32, school:"item", icon:"bread", text:"Better food from Conjure Food (rank 4)." },
  food5:  { name:"Conjured Sourdough", lv:42, school:"item", icon:"bread", text:"Better food from Conjure Food (rank 5)." },
  food6:  { name:"Conjured Sweet Roll", lv:52, school:"item", icon:"bread", text:"Better food from Conjure Food (rank 6)." },
  food7:  { name:"Conjured Cinnamon Roll", lv:60, school:"item", icon:"bread", text:"Best food from Conjure Food (rank 7)." },
  evocation:     { name:"Evocation", lv:20, school:"arcane", icon:"swirl", text:"Channels to refill a big chunk of mana. Use after a hard fight." },
  escape:        { name:"Escape Artist", lv:1, school:"racial", icon:"chain", text:"Gnome racial. Breaks roots and slows on you." },
  coldsnap:      { name:"Cold Snap", lv:34, school:"frost", icon:"clock", talent:true, text:"Resets your Frost cooldowns, so you can use Ice Block or Frost Nova again." },
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
  food5:"inv_misc_food_11", food6:"inv_misc_food_33", food7:"inv_misc_food_73cinnamonroll"
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
      ["6", [[5,"shoot"]]],
      ["7", [[20,"blink"]]],
      ["8", [[26,"coneofcold"]]],
      ["9", [[25,"iceblock"]]],
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
      ["S8", [[34,"coldsnap"]]],
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
      ["A2", [[6,"food1"],[12,"food2"],[22,"food3"],[32,"food4"],[42,"food5"],[52,"food6"],[60,"food7"]]]
    ]}
];

/* what's in a slot at a level */
