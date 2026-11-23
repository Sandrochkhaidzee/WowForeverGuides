/* Settings the shared guide engine (assets/js/guide.js) reads for this character. */
const GUIDE_PAGE = {
  character: "human-paladin",
  saveKey: "humanPaladinBeginner.v1",
  addonsHref: "../addons.html?c=human-paladin",
  abilityWord: "Spell",
  abilitiesWord: "spells",
  itemNote: { test: /^(water|food|potion)/, text: "Water, food and healing potions are items: buy them from a vendor or make them (potions come from First Aid in WoW: Forever), and they show up in your bags. Drag them from your bag (<kbd>B</kbd>) onto the key shown. When a better one replaces an old one, drop the new one on the same key and use up the old ones." }
};

/* =========================================================
   Human Paladin — beginner guide
   Part 1: content (steps, talents, words)
   Part 2: page behaviour
   Facts checked against Warcraft Tavern's and Wowhead's WoW: Forever
   paladin guides (Nov 2026) and the QuestieDB addon for quest ids.
   ========================================================= */

/* ---------------------------------------------------------
   PART 1 — CONTENT
   Each step: lv = your level, place = where, title,
   todo = list of things to do, tip = optional extra help.
   chapter = optional: this step starts a new chapter (shown as a
   heading in the "All steps" list).
   quests = optional: the quests handed in on this step, as {id:"name"}.
   pickup = optional: quests picked up on this step (shown on the map).
   "Find my step from the game" uses them to work out where you are.
   --------------------------------------------------------- */

const STEPS = [

/* ---------- Northshire, levels 1–6 ---------- */
{ chapter:"Northshire", lv:"1", place:"Northshire Abbey", title:"Before you do anything", map:[["elwynn",[48.2,42.9,"You start here, in front of Northshire Abbey"]]], learn:["sor","holylight","willtosurvive","devotion","perception","hearth","food1"],
  done:"every spell in the <b>Action bar</b> box below is on its key, and Devotion Aura is on.",
  todo:[
    "Press <kbd>P</kbd> to open your spellbook.",
    "Drag each spell from your spellbook to the key shown in the <b>Action bar</b> box below. If the extra bars aren't showing yet, see <b>How to set this up in game</b> on the Action Bars tab.",
    "Click <b>Devotion Aura</b> once. An aura stays on until you change it: it gives you (and friends near you) extra armor.",
    "Your blue bar is <b>mana</b>. Spells cost mana. It fills up again slowly, and fast when you sit and drink water."
  ],
  tip:"Your fight for now: press <kbd>1</kbd> (Seal of Righteousness, a glow on your weapon that adds Holy damage), then walk up to the enemy and let your character hit it. If your health gets low, press <kbd>-</kbd> to heal yourself with Holy Light." },

{ lv:"1–2", place:"Northshire Abbey", title:"Your first quests and your trainer", quests:{783:"A Threat Within", 3101:"Consecrated Letter", 5261:"Eagan Peltskinner"}, pickup:{7:"Kobold Camp Cleanup", 33:"Wolves Across the Border", 18:"Brotherhood of Thieves", 3903:"Milly Osworth"}, map:[["elwynn",[48.2,42.9,"Deputy Willem"],[48.9,41.6,"Marshal McBride (inside the abbey)"],[50.4,42.1,"Brother Sammuel (paladin trainer)"],[48.9,40.2,"Eagan Peltskinner"]]],
  done:"you've handed in <b>A Threat Within</b> and <b>Consecrated Letter</b>, and <b>Kobold Camp Cleanup</b> and <b>Wolves Across the Border</b> are in your quest log.",
  todo:[
    "Talk to <b>Deputy Willem</b>, the guard right in front of you. He has a yellow <b>!</b> over his head. Accept <b>A Threat Within</b>, then also take <b>Eagan Peltskinner</b>, <b>Brotherhood of Thieves</b> and <b>Milly Osworth</b> from him.",
    "Walk into the abbey and hand <b>A Threat Within</b> to <b>Marshal McBride</b>. He gives <b>Kobold Camp Cleanup</b> and your paladin letter, <b>Consecrated Letter</b>.",
    "Read the letter (right-click it in your bags) and take it to <b>Brother Sammuel</b>, the paladin trainer in the hall to the right inside the abbey.",
    "Outside, behind the abbey, <b>Eagan Peltskinner</b> gives <b>Wolves Across the Border</b>."
  ],
  tip:"How to fight: click a wolf to target it, walk up to it and right-click it. Your character keeps swinging by itself while you stand next to the enemy." },

{ lv:"2–4", place:"Northshire Valley", title:"Kobolds, wolves and books", quests:{7:"Kobold Camp Cleanup", 33:"Wolves Across the Border", 3904:"Milly's Harvest", 3905:"Grape Manifest", 91741:"Nibbled-On Book", 92124:"Book Inventory"}, pickup:{15:"Investigate Echo Ridge", 91743:"Rascally Rodents"}, map:[["elwynn",[48.9,36.4,"Kobold vermin"],[48,39.6,"Young wolves"],[50.7,39.4,"Milly Osworth"],[54,35,"Milly's vineyard (crates)"],[49.6,40.4,"Brother Paxton (library)"],[49.5,41.6,"Brother Neals"]]],
  done:"you've handed in <b>Kobold Camp Cleanup</b>, <b>Wolves Across the Border</b>, <b>Milly's Harvest</b> and <b>Grape Manifest</b>, and you're level 4.", stuck:"Fight the kobolds and wolves around the abbey until you're level 4.",
  todo:[
    "<b>Kobold Camp Cleanup</b>: kill <b>10 Kobold Vermin</b> just north of the abbey. Hand it in to McBride and take <b>Investigate Echo Ridge</b>.",
    "<b>Wolves Across the Border</b>: kill young wolves for <b>8 Tough Wolf Meat</b>. Not every wolf drops one. Hand it in to Eagan.",
    "<b>Milly Osworth</b> stands by the abbey's east side. She gives <b>Milly's Harvest</b>: pick up <b>8 crates</b> of grapes in the vineyard east of the abbey (watch out for the thieves there). Then take her <b>Grape Manifest</b> up to <b>Brother Neals</b> at the top of the abbey's bell tower.",
    "A kobold may drop a <b>Nibbled-On Book</b>: right-click it to start a quest. Bring it to <b>Brother Paxton</b> in the abbey library. He sends you to his helper Daniel (<b>Book Inventory</b>) and gives <b>Rascally Rodents</b> (stolen books from kobolds)."
  ],
  tip:"After every fight, if your health is low, heal yourself with Holy Light (<kbd>-</kbd>) and then sit and drink water (<kbd>Alt</kbd> + <kbd>1</kbd>) to get your mana back. Healing is cheaper than waiting." },

{ lv:"4", place:"Brother Sammuel (trainer)", title:"Level 4: Judgement and Blessing of Might", map:[["elwynn",[50.4,42.1,"Brother Sammuel (paladin trainer)"]]], learn:["judgement","might"],
  done:"Judgement is on key <kbd>2</kbd>, Blessing of Might is on your right bar, and you're wearing it.",
  todo:[
    "Go back to Brother Sammuel and learn <b>Judgement</b> and <b>Blessing of Might</b>.",
    "Put Judgement on key <kbd>2</kbd>. Judgement throws the power of your Seal at the enemy for a burst of Holy damage. In WoW: Forever your Seal stays on after a Judgement, so you don't have to cast it again.",
    "Put Blessing of Might on your right bar and cast it on yourself. It gives you more attack power for a whole hour. Click it again whenever it runs out (its icon is at the top right of your screen)."
  ],
  tip:"New fight: Seal (<kbd>1</kbd>) before you walk up, Judgement (<kbd>2</kbd>) as soon as you're close enough, then hit. Judgement again every time it's ready." },

{ lv:"4–5", place:"Echo Ridge Mine", title:"Echo Ridge Mine and the bandits", quests:{15:"Investigate Echo Ridge", 91743:"Rascally Rodents", 18:"Brotherhood of Thieves", 91745:"Mining Consultant", 91752:"The Big Picture"}, pickup:{21:"Skirmish at Echo Ridge", 6:"Bounty on Garrick Padfoot", 91758:"Follow That Kobold!"}, map:[["elwynn",[47.6,31.6,"Echo Ridge Mine"],[47.2,32.2,"Kelsey Fargo"],[52,47,"Defias thugs (bandanas)"],[57.5,48.3,"Garrick Padfoot"],[48.9,41.6,"Marshal McBride"]]],
  done:"you've handed in <b>Investigate Echo Ridge</b>, <b>Rascally Rodents</b>, <b>Brotherhood of Thieves</b> and <b>The Big Picture</b>, and you're level 5.", stuck:"Fight the kobold workers at Echo Ridge until you're level 5.",
  todo:[
    "<b>Investigate Echo Ridge</b>: kill <b>10 Kobold Workers</b> outside and inside <b>Echo Ridge Mine</b>, north of the abbey. Collect the stolen books (<b>Rascally Rodents</b>) from the kobolds there at the same time.",
    "Paxton's next quest sends you to <b>Kelsey Fargo</b> at the mine entrance (<b>Mining Consultant</b>). She gives <b>The Big Picture</b>: take a sack of books from the kobold <b>Shinyfinder Narf</b> deep in the mine and bring it to McBride.",
    "<b>Brotherhood of Thieves</b>: kill the Defias thugs in the fields east of the abbey for <b>12 Red Burlap Bandanas</b>. Hand them to Deputy Willem.",
    "Take <b>Bounty on Garrick Padfoot</b> from Willem, and <b>Skirmish at Echo Ridge</b> and <b>Follow That Kobold!</b> from McBride."
  ],
  tip:"In the mine, kobolds stand close together. Fight them one at a time and step back so you don't pull their friends." },

{ lv:"5–6", place:"Northshire Valley", title:"Garrick, the laborers and off to Goldshire", quests:{6:"Bounty on Garrick Padfoot", 21:"Skirmish at Echo Ridge"}, pickup:{54:"Report to Goldshire", 91772:"Shhh! We're Hunting Kobolds", 2158:"Rest and Relaxation"}, map:[["elwynn",[57.5,48.3,"Garrick Padfoot (bandit camp)"],[48.4,29.9,"Kobold laborers (inside the mine)"],[51.2,40.8,"Tordrin Sternblade (stables)"],[45.6,47.7,"Falkhaan Isenstrider"]]],
  done:"you've handed in <b>Bounty on Garrick Padfoot</b> and <b>Skirmish at Echo Ridge</b>, and <b>Report to Goldshire</b> is in your log.", stuck:"Fight the kobolds in the mine until you're level 6.",
  todo:[
    "<b>Garrick Padfoot</b> is the leader of the bandit camp east of the abbey, by the cabin. Kill him and bring his head to Willem.",
    "<b>Skirmish at Echo Ridge</b>: kill <b>12 Kobold Laborers</b> deeper in the mine. Hand it in to McBride and take <b>Report to Goldshire</b>.",
    "<b>Follow That Kobold!</b>: talk to <b>Tordrin Sternblade</b> by the stables behind the abbey. He gives <b>Shhh! We're Hunting Kobolds</b>: follow the kobold tracks on the way south. It ends in Goldshire.",
    "On the road out of the valley, <b>Falkhaan Isenstrider</b> gives <b>Rest and Relaxation</b>. Follow the road south to the town of <b>Goldshire</b>."
  ] },

{ lv:"6", place:"Brother Sammuel (trainer)", title:"Level 6: Holy Strike", map:[["elwynn",[50.4,42.1,"Brother Sammuel (Northshire)"],[41.2,66.1,"Brother Wilhelm (Goldshire)"]]], learn:["holystrike","crusader","divprot"],
  done:"Holy Strike is on <kbd>3</kbd>, Divine Protection on <kbd>8</kbd> and Seal of the Crusader on <kbd>Shift</kbd> + <kbd>1</kbd>.",
  todo:[
    "Learn <b>Holy Strike</b>, <b>Seal of the Crusader</b> and <b>Divine Protection</b> (Goldshire's trainer, Brother Wilhelm, teaches them too).",
    "<b>Holy Strike</b> (key <kbd>3</kbd>) is new in WoW: Forever: an instant attack that hits hard with Holy power. Use it every time it's ready.",
    "<b>Divine Protection</b> (key <kbd>8</kbd>) makes you immune to damage for a few seconds, but you can't attack while it's on. Press it, then heal yourself with Holy Light.",
    "<b>Seal of the Crusader</b> (<kbd>Shift</kbd> + <kbd>1</kbd>) is for long fights only: cast it, Judge it, then switch back to your normal Seal. The enemy then takes more Holy damage."
  ],
  tip:"Your whole fight from now: Seal → walk up → Judgement → Holy Strike → hit. Press Judgement and Holy Strike every time they light up again." },

/* ---------- Elwynn Forest, levels 6–11 ---------- */
{ chapter:"Elwynn Forest", lv:"6", place:"Goldshire", title:"Make Goldshire your home", quests:{54:"Report to Goldshire", 2158:"Rest and Relaxation", 91772:"Shhh! We're Hunting Kobolds"}, pickup:{62:"The Fargodeep Mine", 47:"Gold Dust Exchange", 60:"Kobold Candles", 85:"Lost Necklace", 106:"Young Lovers", 91775:"Book Return", 99127:"A Net Disaster"}, map:[["elwynn",[42.1,65.9,"Marshal Dughan"],[43.8,65.8,"Innkeeper Farley (Lion's Pride Inn)"],[42.1,67.3,"Remy \"Two Times\""],[43.3,65.7,"William Pestle"],[41.2,66.1,"Brother Wilhelm (paladin trainer, upstairs in the inn)"],[47.5,62.2,"Jason Mathers (Crystal Lake)"]]], learn:["water1","food2"],
  done:"your Hearthstone says <b>Goldshire</b> when you hover over it, and you've handed in <b>Report to Goldshire</b>.",
  todo:[
    "Hand <b>Report to Goldshire</b> and <b>Shhh! We're Hunting Kobolds</b> to <b>Marshal Dughan</b> by the road. Take <b>The Fargodeep Mine</b> and <b>Book Return</b>.",
    "Inside the <b>Lion's Pride Inn</b>, hand <b>Rest and Relaxation</b> to <b>Innkeeper Farley</b> and choose <b>Make this inn your home</b>. Your Hearthstone now teleports you back here (1 hour cooldown).",
    "Take every other quest in town: <b>Gold Dust Exchange</b> (Remy \"Two Times\"), <b>Kobold Candles</b> (William Pestle), and <b>A Net Disaster</b> from Jason Mathers at the lake just east of town. Farther south, <b>Lost Necklace</b> and <b>Young Lovers</b> wait at the farms (next steps).",
    "Buy <b>Ice Cold Milk</b> (drink) and <b>Tel'Abim Bananas</b> (food) from Innkeeper Farley. Put the drink on <kbd>Alt</kbd> + <kbd>1</kbd> and the food on <kbd>Alt</kbd> + <kbd>2</kbd>."
  ],
  tip:"Always log out inside an inn. You'll get bonus XP (called rested XP) when you come back." },

{ lv:"6–8", place:"Elwynn Forest", title:"Fargodeep Mine, the farms and the lake", quests:{62:"The Fargodeep Mine", 47:"Gold Dust Exchange", 60:"Kobold Candles", 85:"Lost Necklace", 86:"Pie for Billy", 84:"Back to Billy", 106:"Young Lovers", 111:"Speak with Gramma", 107:"Note to William", 99127:"A Net Disaster", 99128:"Slimy Menace"}, pickup:{87:"Goldtooth", 88:"Princess Must Die!", 112:"Collecting Kelp", 61:"Shipment to Stormwind", 76:"The Jasperlode Mine"}, map:[["elwynn",[38.8,81.8,"Fargodeep Mine (kobolds)"],[34.5,84.3,"Stonefield Farm (Bernice, Gramma, Ma)"],[43.1,85.7,"Maclure Vineyards (Billy, Maybell)"],[29.8,86,"Tommy Joe Stonefield"],[25,84.8,"Boars (Boar Meat)"],[53.7,66.8,"Crystal Lake murlocs"]]],
  done:"you've handed in <b>The Fargodeep Mine</b>, <b>Gold Dust Exchange</b>, <b>Kobold Candles</b>, the farm quests and <b>Slimy Menace</b>, and you're level 8.", stuck:"Fight the kobolds around Fargodeep Mine until you're level 8.",
  todo:[
    "Go south to the <b>Fargodeep Mine</b>. Explore inside (The Fargodeep Mine) and kill kobolds for <b>10 Gold Dust</b> and <b>8 Large Candles</b>. Pick up the <b>Lost Books</b> lying around in and near the mine for <b>Book Return</b>.",
    "The two farms south of town: at the <b>Stonefield Farm</b> <b>Auntie Bernice</b> gives <b>Lost Necklace</b> (talk to Billy at the Maclure Vineyards, then bring Bernice <b>4 Chunks of Boar Meat</b> from boars to the west). At the vineyard, <b>Maybell</b> gives <b>Young Lovers</b>: take her letter to Tommy Joe by the river west of the Stonefields, then talk to his <b>Gramma</b>, who sends a note to William Pestle in Goldshire.",
    "<b>A Net Disaster</b> and <b>Slimy Menace</b>: check the fishing traps on <b>Crystal Lake</b> and kill murlocs on its shore for Jason Mathers.",
    "Back in Goldshire, hand everything in. Take <b>Collecting Kelp</b> and <b>Shipment to Stormwind</b> from William, and <b>The Jasperlode Mine</b> from Dughan. Billy gives <b>Goldtooth</b> and Ma Stonefield <b>Princess Must Die!</b> (next steps)."
  ],
  tip:"Fights are slow for a paladin at first. That's normal: you almost never die, because you can heal yourself." },

{ lv:"8", place:"Brother Wilhelm (trainer, Goldshire)", title:"Level 8: Hammer of Justice", map:[["elwynn",[41.2,66.1,"Brother Wilhelm (upstairs in the inn)"]]], learn:["hoj","purify"],
  done:"Hammer of Justice is on <kbd>4</kbd> and Purify is on <kbd>Shift</kbd> + <kbd>5</kbd>.",
  todo:[
    "Learn <b>Hammer of Justice</b> and <b>Purify</b>, plus new ranks.",
    "<b>Hammer of Justice</b> (key <kbd>4</kbd>) stuns the enemy for a few seconds: it can't move, attack or cast. Use it when an enemy starts casting a spell, or when you need a moment to heal.",
    "<b>Purify</b> (<kbd>Shift</kbd> + <kbd>5</kbd>) removes poisons and diseases from you or a friend."
  ],
  tip:"Healing trick: Hammer of Justice the enemy, then cast Holy Light while it's stunned. It can't stop your cast." },

{ lv:"8–10", place:"Eastern Elwynn", title:"Goldtooth, the kelp and the east", quests:{87:"Goldtooth", 112:"Collecting Kelp", 76:"The Jasperlode Mine", 91775:"Book Return", 83:"Red Linen Goods", 5545:"A Bundle of Trouble", 91732:"Good Steel"}, pickup:{114:"The Escape", 91777:"Rare Books", 239:"Westbrook Garrison Needs Help!", 40:"A Fishy Peril"}, map:[["elwynn",[41.7,78,"Goldtooth (inside Fargodeep Mine)"],[53.7,66.8,"Crystal Kelp (Crystal Lake murlocs)"],[60.8,52.7,"Jasperlode Mine"],[79.5,68.8,"Eastvale Logging Camp (Sara, Raelen, Hagar)"],[79,59.6,"Bundles of Wood"],[73.6,51.2,"Defias camp (red bandanas)"]]],
  done:"you've handed in <b>Goldtooth</b>, <b>Collecting Kelp</b>, <b>The Jasperlode Mine</b>, <b>Book Return</b> and the Eastvale Logging Camp quests, and you're level 10.", stuck:"Fight the murlocs at Crystal Lake or the Defias in the east until you're level 10.",
  todo:[
    "<b>Goldtooth</b>: a big kobold in the lower part of <b>Fargodeep Mine</b>. Kill him for <b>Bernice's Necklace</b> and bring it to Auntie Bernice.",
    "<b>Collecting Kelp</b>: the murlocs at <b>Crystal Lake</b> drop <b>Crystal Kelp Fronds</b>. Hand in to William and take <b>The Escape</b> (bring the potion to Maybell at the vineyard).",
    "<b>The Jasperlode Mine</b>: explore the mine north-east of the lake. Then follow the road east to the <b>Eastvale Logging Camp</b>: <b>Red Linen Goods</b> (Sara Timberlain: bandanas from the Defias north of the camp), <b>A Bundle of Trouble</b> (Supervisor Raelen: bundles of wood on the ground) and <b>Good Steel</b> (Hagar Lowe: mining tools in the Jasperlode Mine).",
    "Hand <b>Book Return</b> to Dughan in Goldshire; he gives <b>Rare Books</b> (for later) and <b>Westbrook Garrison Needs Help!</b>. Remy gives <b>A Fishy Peril</b>."
  ] },

{ lv:"10", place:"Brother Wilhelm (trainer, Goldshire)", title:"Level 10: Lay on Hands and your first talent", map:[["elwynn",[41.2,66.1,"Brother Wilhelm (upstairs in the inn)"]]], learn:["loh","bop","fury","rfury"],
  done:"Lay on Hands is on <kbd>9</kbd>, Blessing of Protection on <kbd>Shift</kbd> + <kbd>3</kbd>, and your talent point is in Benediction.",
  todo:[
    "Learn <b>Lay on Hands</b>, <b>Blessing of Protection</b>, <b>Seal of Fury</b>, <b>Righteous Fury</b> and the new ranks of Seal of Righteousness and Devotion Aura.",
    "<b>Lay on Hands</b> (key <kbd>9</kbd>) heals you to full health, but uses up all your mana and has a long cooldown. Your 'I'm about to die' button.",
    "<b>Blessing of Protection</b> (<kbd>Shift</kbd> + <kbd>3</kbd>) makes you (or a friend) immune to physical attacks for a few seconds, but you can't attack either. Another emergency button.",
    "<b>Seal of Fury</b> and <b>Righteous Fury</b> are for tanking dungeons. Put them on <kbd>Shift</kbd> + <kbd>9</kbd> and <kbd>Shift</kbd> + <kbd>0</kbd> and leave them alone while questing.",
    "Press <kbd>N</kbd> to open talents. Click the <b>Retribution</b> tab and put your point into <b>Benediction</b>: your instant spells cost less mana."
  ],
  tip:"Paladins rarely die. When a fight goes badly: Divine Protection (<kbd>8</kbd>), Holy Light (<kbd>-</kbd>). If that's not enough: Lay on Hands (<kbd>9</kbd>)." },

{ lv:"10–11", place:"Eastern Elwynn", title:"The lost guards and the murloc village", quests:{40:"A Fishy Peril", 35:"Further Concerns", 37:"Find the Lost Guards", 45:"Discover Rolf's Fate", 71:"Report to Thomas", 39:"Deliver Thomas' Report", 46:"Bounty on Murlocs", 52:"Protect the Frontier", 88:"Princess Must Die!", 114:"The Escape"}, pickup:{59:"Cloth and Leather Armor"}, map:[["elwynn",[74,72.2,"Guard Thomas (east bridge)"],[72.7,60.3,"A half-eaten body"],[79.8,55.5,"Rolf's corpse (murloc village)"],[69.7,79.3,"Princess the pig (Brackwell Pumpkin Patch)"],[42.1,65.9,"Marshal Dughan"]]],
  done:"you've finished the Guard Thomas quests and <b>Princess Must Die!</b>, and you're level 11.", stuck:"Fight the murlocs along the river in eastern Elwynn until you're level 11.",
  todo:[
    "Give <b>A Fishy Peril</b> to Dughan. He sends you to <b>Guard Thomas</b> at the bridge on the road east (<b>Further Concerns</b>).",
    "Thomas gives <b>Find the Lost Guards</b>, <b>Bounty on Murlocs</b> and <b>Protect the Frontier</b>. Follow the river north: find the half-eaten body, then <b>Rolf's corpse</b> in the murloc village. Kill murlocs for their fins, and prowlers and young forest bears around the area. Hand it all in to Thomas, then take his report back to Dughan.",
    "<b>Princess Must Die!</b>: Princess is a big pig at the <b>Brackwell Pumpkin Patch</b> in the south-east. She has two smaller pig friends: pull them one at a time. Bring her collar to Ma Stonefield.",
    "Give the potion to Maybell (<b>The Escape</b>). Dughan also gives <b>Cloth and Leather Armor</b>: it just sends you to Sara Timberlain at the Eastvale Logging Camp."
  ],
  tip:"The murloc village has many murlocs close together. Fight at the edge and use Hammer of Justice on the ones that run away for help." },

{ lv:"11", place:"Westbrook Garrison", title:"Westbrook and Hogger", quests:{239:"Westbrook Garrison Needs Help!", 11:"Riverpaw Gnoll Bounty"}, pickup:{176:"WANTED: \"Hogger\"", 109:"Report to Gryan Stoutmantle"}, map:[["elwynn",[24.2,74.5,"Deputy Rainer (Westbrook Garrison)"],[24.6,74.7,"Wanted poster: Hogger"],[25,92.9,"Hogger (skip unless you have help)"],[27,88,"Riverpaw gnolls"]]],
  done:"you've handed in <b>Riverpaw Gnoll Bounty</b> and <b>Report to Gryan Stoutmantle</b> is in your quest log.", stuck:"Fight the Riverpaw gnolls south of Westbrook until you're level 11.",
  todo:[
    "Follow the road west to the <b>Westbrook Garrison</b> and hand in <b>Westbrook Garrison Needs Help!</b> to <b>Deputy Rainer</b>.",
    "<b>Riverpaw Gnoll Bounty</b>: kill gnolls in the forest south of the garrison for <b>8 Painted Gnoll Armbands</b>.",
    "The poster outside the garrison is <b>WANTED: \"Hogger\"</b>. Hogger is a level 11 elite gnoll: only fight him with a friend or two. Otherwise leave it.",
    "Talk to Deputy Rainer once more: he (or Dughan, or the farmers in Westfall) gives <b>Report to Gryan Stoutmantle</b>. That's your ticket to Westfall."
  ] },

/* ---------- Westfall, levels 11–15 ---------- */
{ chapter:"Westfall", lv:"11–12", place:"Westfall", title:"Into Westfall: the farms", quests:{36:"Westfall Stew", 109:"Report to Gryan Stoutmantle", 184:"Furlbrow's Deed"}, pickup:{22:"Goretusk Liver Pie", 38:"Westfall Stew", 64:"The Forgotten Heirloom", 151:"Poor Old Blanchy", 9:"The Killing Fields", 12:"The People's Militia", 102:"Patrolling Westfall", 153:"Red Leather Bandanas", 92742:"Testing the Wells", 92744:"Murloc Gills", 92909:"Harvesting the Harvesters"}, map:[["westfall",[59.9,19.4,"Furlbrow farm (Verna and Farmer Furlbrow)"],[56.4,30.5,"Saldean's Farm (Salma, Farmer Saldean, Ozwin)"],[56.3,47.5,"Sentinel Hill (Gryan Stoutmantle)"],[56.6,52.6,"Flight master"],[52.5,53,"Alba Fairmoon"],[54,53,"Scout Galiaan"]]],
  done:"Sentinel Hill is your home, you've unlocked its flight path, and the quests above are in your log.",
  todo:[
    "From Goldshire, follow the road west over the bridge into <b>Westfall</b>, a dry farmland. At the first farm, <b>Verna Furlbrow</b> gives <b>Westfall Stew</b> and <b>Poor Old Blanchy</b>, and <b>Farmer Furlbrow</b> gives <b>The Forgotten Heirloom</b>.",
    "Continue south to <b>Saldean's Farm</b>: hand the stew recipe to <b>Salma Saldean</b> and take <b>Goretusk Liver Pie</b> and the next <b>Westfall Stew</b>. <b>Farmer Saldean</b> gives <b>The Killing Fields</b>, and the gnome <b>Ozwin Ironsprocket</b> gives <b>Harvesting the Harvesters</b>.",
    "Follow the road south to <b>Sentinel Hill</b>. Hand <b>Report to Gryan Stoutmantle</b> to Gryan in the tower and take <b>The People's Militia</b>. Take <b>Patrolling Westfall</b> (Captain Danuvin), <b>Red Leather Bandanas</b> (Scout Galiaan), and <b>Testing the Wells</b> and <b>Murloc Gills</b> (Alba Fairmoon, new in Forever).",
    "Make the inn your home and talk to the <b>flight master</b> so you can fly here later."
  ],
  tip:"Westfall quests come in big batches. Check your quest log (<kbd>L</kbd>) to see how many of each thing you need, and do the ones in the same area together." },

{ lv:"12", place:"Goldshire → Stormwind → Elwynn", title:"Paladin quest: Redemption", quests:{2998:"Tome of Divinity", 1642:"The Tome of Divinity", 1643:"The Tome of Divinity", 1644:"The Tome of Divinity", 1780:"The Tome of Divinity", 1781:"The Tome of Divinity", 1786:"The Tome of Divinity", 1787:"The Tome of Divinity", 1788:"The Tome of Divinity", 61:"Shipment to Stormwind"}, map:[["elwynn",[41.2,66.1,"Brother Wilhelm (Goldshire)"],[72.6,51.4,"Henze Faulk"],[73.6,51.2,"Defias Rogue Wizards"]],["stormwind",[50.5,47.5,"Duthorian Rall (Cathedral of Light)"],[63.8,72.2,"Stephanie Turner (Trade District)"],[49.5,45,"Gazin Tenorm (Cathedral)"],[63.2,74.4,"Morgan Pestle"],[71.3,72.2,"Flight master (Dungar Longdrink)"]]], learn:["redemption"],
  done:"you've learned <b>Redemption</b> and it's on your right bar.",
  todo:[
    "In Goldshire, <b>Brother Wilhelm</b> gives <b>Tome of Divinity</b>. Follow the road north-west to <b>Stormwind</b> and find <b>Duthorian Rall</b> in the <b>Cathedral of Light</b> (click any guard: they mark places on your map).",
    "Rall sends you to <b>Stephanie Turner</b> in the Trade District: she wants <b>10 Linen Cloth</b> (humanoids drop it). Back to Rall, then to <b>Gazin Tenorm</b> in the cathedral, who gives you the <b>Symbol of Life</b>.",
    "Go back to eastern Elwynn and use the Symbol of Life on <b>Henze Faulk</b>, who lies on the ground near the Defias camp. He asks for a <b>Defias Script</b>: kill the Defias Rogue Wizards nearby until one drops it. Return it to Gazin, then talk to Rall.",
    "You learn <b>Redemption</b>: it brings a dead player back to life. Put it on your right bar. While you're in the Trade District, give <b>Shipment to Stormwind</b> to Morgan Pestle, and talk to the Stormwind flight master."
  ],
  tip:"Redemption only works on players, out of combat. In dungeons you'll be the one who saves the group after a wipe." },

{ lv:"12–14", place:"Northern Westfall", title:"The farms, the coast and the harvesters", quests:{64:"The Forgotten Heirloom", 22:"Goretusk Liver Pie", 92742:"Testing the Wells", 92744:"Murloc Gills", 12:"The People's Militia", 151:"Poor Old Blanchy"}, pickup:{13:"The People's Militia", 92745:"The State of the Mines"}, map:[["westfall",[49.3,19.3,"Furlbrow's old farmhouse (pocket watch)"],[34.1,17.2,"Murlocs on the coast"],[56.6,18.7,"Jansen Stead well"],[46.1,38.1,"Molsen Farm well"],[47.7,43.4,"Defias Trappers and Smugglers"],[50,30,"Goretusks and oat fields"]]],
  done:"you've handed in <b>The Forgotten Heirloom</b>, <b>Goretusk Liver Pie</b>, <b>Testing the Wells</b>, <b>Murloc Gills</b>, <b>Poor Old Blanchy</b> and the first <b>People's Militia</b>, and you're level 14.", stuck:"Fight the Defias and goretusks in the middle of Westfall until you're level 14.",
  todo:[
    "<b>The Forgotten Heirloom</b>: the pocket watch is in the wardrobe of the old farmhouse west of the Furlbrows, guarded by Defias.",
    "<b>Goretusk Liver Pie</b>: goretusks (boars) everywhere drop livers. Keep their snouts for <b>Westfall Stew</b> too. Pick up oats from the fields for <b>Poor Old Blanchy</b>.",
    "<b>Testing the Wells</b>: use Alba's kit at the wells of the <b>Jansen Stead</b> and the <b>Molsen Farm</b>. <b>Murloc Gills</b>: kill murlocs on the coast. Their eyes count for the stew.",
    "<b>The People's Militia</b>: kill <b>15 Defias Trappers</b> and <b>15 Defias Smugglers</b> around the farms in the middle of the zone. Hand it to Gryan and take part 2. Alba gives <b>The State of the Mines</b>."
  ],
  tip:"Some Defias cast spells. When you see a cast bar under their name, stop it with Hammer of Justice." },

{ lv:"14", place:"Stormwind (fly)", title:"Level 14: Blessing of Wisdom", map:[["stormwind",[49.6,49.8,"Paladin trainers (Cathedral of Light)"],[63.9,69.1,"Woo Ping (weapon trainer, Trade District)"]]], learn:["wisdom"],
  done:"Blessing of Wisdom is on your right bar and you've learned the new ranks.",
  todo:[
    "Fly to Stormwind and visit the paladin trainers in the <b>Cathedral of Light</b>. Learn <b>Blessing of Wisdom</b> and new ranks.",
    "Blessing of Wisdom gives you back mana all the time. Use it instead of Might when you keep running out of mana and have to drink a lot. You can only have one of your Blessings on you at a time.",
    "Optional: <b>Woo Ping</b>, the weapon trainer in the Trade District, teaches <b>Two-Handed Swords</b>. Then any big sword you find is usable too."
  ] },

{ lv:"14–15", place:"Southern Westfall", title:"Moonbrook, the mines and the Defias", quests:{13:"The People's Militia", 102:"Patrolling Westfall", 9:"The Killing Fields", 92745:"The State of the Mines", 38:"Westfall Stew", 92909:"Harvesting the Harvesters"}, pickup:{14:"The People's Militia", 92747:"Moonbrook Espionage"}, map:[["westfall",[46,70.7,"Defias Pillagers and Looters (Moonbrook)"],[60.8,72.6,"Gnolls (paws)"],[39,49.3,"Harvest Watchers"],[44.8,23.1,"Jangolode Mine (kobolds)"],[28.9,48.7,"Gold Coast Quarry (gnoll miners)"],[56.3,47.5,"Sentinel Hill"]]],
  done:"you've handed in <b>The People's Militia</b> part 2, <b>Patrolling Westfall</b>, <b>The Killing Fields</b>, <b>The State of the Mines</b> and <b>Westfall Stew</b>, and you're level 15.", stuck:"Fight the Harvest Watchers in the fields until you're level 15.",
  todo:[
    "<b>The Killing Fields</b> and <b>Harvesting the Harvesters</b>: kill the <b>Harvest Watchers</b> (scarecrow robots) in the fields; they drop the parts Ozwin wants.",
    "<b>The People's Militia</b> part 2: <b>15 Defias Pillagers</b> and <b>15 Defias Looters</b> around <b>Moonbrook</b>, the ruined village in the south. Pillagers cast fire spells: Hammer of Justice them.",
    "<b>Patrolling Westfall</b>: gnolls in the south-east for <b>8 Gnoll Paws</b>. <b>The State of the Mines</b>: kobolds in the <b>Jangolode Mine</b> (north) and gnolls in the <b>Gold Coast Quarry</b> (west).",
    "Hand them all in at Sentinel Hill and Saldean's Farm. Take part 3 of <b>The People's Militia</b> and <b>Moonbrook Espionage</b>: do them on your way back at 17–18, or skip them."
  ] },

/* ---------- Redridge, levels 15–21 ---------- */
{ chapter:"Redridge Mountains", lv:"15", place:"Westfall → Redridge", title:"Travel to Lakeshire", pickup:{65:"The Defias Brotherhood"}, map:[["elwynn",[74,72.2,"Road east (past Guard Thomas)"]],["redridge",[25.5,59.4,"Lakeshire flight master"],[21.5,44.3,"Lakeshire inn"]]],
  done:"Lakeshire is your home and you've unlocked its flight path.",
  todo:[
    "Gryan gives <b>The Defias Brotherhood</b> once you've finished the Militia parts you did: it sends you to Wiley in Lakeshire. Take it.",
    "Fly to Stormwind (or hearth to Goldshire), then follow the road east through Elwynn, past Guard Thomas's bridge, into the <b>Redridge Mountains</b>.",
    "Follow the road to the lakeside town of <b>Lakeshire</b>. Make the inn your home and talk to the flight master (Ariena Stormfeather) so you can fly here later."
  ] },

{ lv:"15–17", place:"Lakeshire", title:"Redridge: the town quests", quests:{129:"A Free Lunch", 130:"Visit the Herbalist", 131:"Delivering Daffodils", 244:"Encroaching Gnolls", 246:"Assessing the Threat", 98407:"Show of Force", 125:"The Lost Tools", 120:"Messenger to Stormwind", 65:"The Defias Brotherhood"}, pickup:{118:"The Price of Shoes", 122:"Underbelly Scales", 92:"Redridge Goulash", 89:"The Everstill Bridge", 124:"A Baying of Gnolls", 132:"The Defias Brotherhood", 121:"Messenger to Stormwind"}, map:[["redridge",[21.5,44.3,"Darcy (inn)"],[10.4,71.3,"Guard Parker (road to Duskwood)"],[16.8,46.3,"Martie Jainrose (herbalist)"],[25.6,60,"Deputy Feldon"],[27.1,48.6,"Foreman Oslow"],[36.4,54.7,"Oslow's Toolbox (bottom of the lake)"],[24.9,44.5,"Magistrate Solomon (town hall)"],[21.4,45.4,"Wiley the Black"]]],
  done:"you've handed in the Lakeshire quests above, and you're level 17.", stuck:"Fight the gnolls and their dogs west of Lakeshire until you're level 17.",
  todo:[
    "Take every quest in town. <b>A Free Lunch</b> (Darcy) is a little walk: Guard Parker → Martie the herbalist → Darcy. Parker also gives <b>Encroaching Gnolls</b>: Deputy Feldon at the bridge then wants <b>Redridge Mongrels</b>, <b>Poachers</b> (<b>Assessing the Threat</b>) and spiked collars from <b>Thrashers</b> (<b>Show of Force</b>).",
    "<b>The Lost Tools</b> (Foreman Oslow): the toolbox lies at the bottom of the lake east of the bridge. Swim down; watch your breath bar.",
    "<b>Messenger to Stormwind</b> (Magistrate Solomon): fly to Stormwind, give the report to General Marcus Jonathan by the city gate, and bring the answer back.",
    "Hand <b>The Defias Brotherhood</b> to <b>Wiley the Black</b> at the inn and take his note back to Gryan later (when you're next in Westfall), or skip the rest of that chain. Take <b>The Price of Shoes</b>, <b>Underbelly Scales</b>, <b>Redridge Goulash</b>, <b>The Everstill Bridge</b> and <b>A Baying of Gnolls</b>."
  ],
  tip:"Gnolls come in pairs. Hammer of Justice one while you fight the other, or pull them apart by walking back." },

{ lv:"16", place:"Stormwind (fly)", title:"Level 16: Retribution Aura", map:[["stormwind",[49.6,49.8,"Paladin trainers (Cathedral of Light)"]]], learn:["retaura","potion1"],
  done:"Retribution Aura is on.",
  todo:[
    "Fly to Stormwind and learn <b>Retribution Aura</b> and new ranks.",
    "Click <b>Retribution Aura</b> and leave it on while you quest: every enemy that hits you takes Holy damage back. Use Devotion Aura only when a fight is too hard.",
    "Learn <b>First Aid</b> in the Cathedral district too if you haven't (ask a guard). In WoW: Forever, First Aid makes <b>healing potions</b> as well as bandages: put a potion on <kbd>Alt</kbd> + <kbd>3</kbd> for emergencies."
  ] },

{ lv:"17–19", place:"Redridge", title:"Gnolls, whelps and goulash", quests:{122:"Underbelly Scales", 92:"Redridge Goulash", 89:"The Everstill Bridge", 124:"A Baying of Gnolls", 118:"The Price of Shoes", 119:"Return to Verner", 121:"Messenger to Stormwind"}, pickup:{20:"Blackrock Menace", 98386:"Alther's Mill", 150:"Murloc Poachers"}, map:[["redridge",[23.6,25.6,"Gnoll camp north of town (pikes and rivets)"],[19,37.3,"Redridge Brutes and Mystics"],[29.8,68.4,"Black dragon whelps"],[47.5,38.4,"Spiders (Crisp Spider Meat)"],[54.7,76.1,"Condors"],[10.6,49.3,"Great goretusks"]],["elwynn",[41.7,65.5,"Smith Argus (Goldshire)"]]],
  done:"you've handed in <b>Underbelly Scales</b>, <b>Redridge Goulash</b>, <b>The Everstill Bridge</b>, <b>A Baying of Gnolls</b> and <b>Return to Verner</b>, and you're level 19.", stuck:"Fight the gnolls north of Lakeshire until you're level 19.",
  todo:[
    "<b>The Everstill Bridge</b> and <b>A Baying of Gnolls</b>: the gnoll camps in the hills north of town. Pick up the iron pikes and rivets lying around while you fight the brutes and mystics.",
    "<b>Underbelly Scales</b>: black dragon whelps south of the lake. <b>Redridge Goulash</b>: condors, great goretusks and tarantulas all around the zone.",
    "<b>The Price of Shoes</b>: take Verner's note to Smith Argus in Goldshire (next time you pass) and bring the horseshoes back.",
    "Take <b>Blackrock Menace</b> (Marshal Marris), <b>Alther's Mill</b> (Oslow) and <b>Murloc Poachers</b> (Dockmaster Baren) for the next step."
  ] },

{ lv:"18", place:"Stormwind (fly)", title:"Level 18: Blessing of Freedom", map:[["stormwind",[49.6,49.8,"Paladin trainers (Cathedral of Light)"]]], learn:["freedom"],
  done:"Blessing of Freedom is on <kbd>Shift</kbd> + <kbd>4</kbd>.",
  todo:[
    "Learn <b>Blessing of Freedom</b> and new ranks (Seal of Righteousness, Divine Protection).",
    "Blessing of Freedom (<kbd>Shift</kbd> + <kbd>4</kbd>) breaks roots and slows. Paladins are slow walkers, so it's your answer to an enemy that freezes or slows you.",
    "Saving tip: you can skip new ranks of Seal of Fury, Righteous Fury and Concentration Aura while you quest. Spend your gold on the spells you press."
  ] },

{ lv:"17–21", place:"Westfall", title:"Dungeon: The Deadmines (optional)", quests:{92819:"Destruction in Deadmines"}, map:[["westfall",[42.5,71.7,"Moonbrook: the Deadmines entrance is in the inn's cellar"],[52.5,53,"Alba Fairmoon"],[56.3,47.5,"Sentinel Hill"]]],
  done:"your group has beaten Edwin VanCleef, or you've decided to skip it.",
  todo:[
    "A dungeon is a private area for a group of 5 players. The Deadmines is under <b>Moonbrook</b> in southern Westfall, for levels 17–21.",
    "Collect its quests first, like <b>Destruction in Deadmines</b> (Alba Fairmoon) and <b>The Defias Brotherhood</b> chain from Gryan. Most dungeon XP in WoW: Forever comes from the quests.",
    "Find a group: open the Looking For Group tool or ask in chat (\"LFG Deadmines\").",
    "As a Retribution paladin you're damage: stay behind the tank (the player the enemies attack), hit the same enemy, and use your Flash of Light / Holy Light on the healer or tank if things go wrong. Groups love paladins."
  ],
  tip:"Want to heal instead? You can! Tell the group \"I'm a paladin, I can heal\" and keep your Holy Light on the tank. From level 40, the second talent setup (Dual Specialization) makes you a real healer. See <b>How to Play → Dungeons</b>." },

/* ---------- Level 20 ---------- */
{ chapter:"Level 20", lv:"20", place:"Stormwind", title:"Level 20: Consecration, Exorcism and Seal of Command", map:[["stormwind",[49.6,49.8,"Paladin trainers (Cathedral of Light)"],[50.5,47.5,"Duthorian Rall"]]], pickup:{1793:"The Tome of Valor"}, learn:["soc","consecration","exorcism","flash","kings"],
  done:"Seal of Command is on <kbd>1</kbd>, Exorcism on <kbd>5</kbd>, Consecration on <kbd>6</kbd>, Flash of Light on <kbd>=</kbd>, Blessing of Kings is on your right bar, and <b>The Tome of Valor</b> is in your log.",
  todo:[
    "Learn everything: <b>Consecration</b>, <b>Exorcism</b>, <b>Flash of Light</b>, <b>Blessing of Kings</b> and new ranks.",
    "Talent: <b>Seal of Command</b>. It replaces Seal of Righteousness on key <kbd>1</kbd>: your swings sometimes hit again for big Holy damage. It's best with a <b>slow, two-handed weapon</b>.",
    "<b>Exorcism</b> (<kbd>5</kbd>): big Holy damage, but only against <b>undead</b> and <b>demons</b>. <b>Consecration</b> (<kbd>6</kbd>): burns the ground under you. Only worth its mana when 3 or more enemies stand in it.",
    "<b>Flash of Light</b> (<kbd>=</kbd>) is a fast, small heal. Holy Light is slow and big. Out of combat, Holy Light is better for your mana.",
    "Talk to <b>Duthorian Rall</b> in the cathedral: he gives <b>The Tome of Valor</b>. Take it; you finish it at level 25."
  ],
  tip:"Weapon: from now on, look for slow two-handed weapons (speed 3.0 or more). Slow weapons trigger Seal of Command more often and harder. If two weapons have similar damage per second, take the slower one." },

{ lv:"20–22", place:"Redridge", title:"Redridge: Blackrock orcs and the mill", quests:{20:"Blackrock Menace", 98386:"Alther's Mill", 150:"Murloc Poachers"}, pickup:{98387:"Blackrock Blockade", 91:"Solomon's Law", 115:"Shadow Magic", 34:"An Unwelcome Guest"}, map:[["redridge",[60.4,54.8,"Blackrock orcs (Battleworn Axes)"],[46.6,42,"Alther's Mill (tarantulas and eggs)"],[53,57.4,"Murlocs on the east shore"],[28.4,49,"Marshal Marris"],[24.6,44.3,"Bailiff Conacher (town hall)"]]],
  done:"you've handed in <b>Blackrock Menace</b>, <b>Alther's Mill</b> and <b>Murloc Poachers</b>, and you're level 22.", stuck:"Fight the Blackrock orcs east of the lake until you're level 22.",
  todo:[
    "<b>Blackrock Menace</b>: Blackrock orcs east of the lake drop <b>Battleworn Axes</b>.",
    "<b>Alther's Mill</b>: kill <b>12 Greater Tarantulas</b> and destroy <b>6 Tarantula Eggs</b> at the mill north-east of town.",
    "<b>Murloc Poachers</b>: murlocs along the east shore of the lake drop <b>Murloc Fins</b>.",
    "Hand them in and take the next Lakeshire quests: <b>Blackrock Blockade</b>, <b>Shadow Magic</b>, <b>Solomon's Law</b> and <b>An Unwelcome Guest</b>. Do them at 23–25 or when you come back."
  ],
  tip:"Blackrock Shadowcasters throw shadow bolts. Stop their casting with Hammer of Justice, and Judge them: Seal of Command's Judgement hits twice as hard on a stunned enemy." },

{ lv:"22", place:"Stormwind (fly)", title:"Level 22: new ranks", map:[["stormwind",[49.6,49.8,"Paladin trainers (Cathedral of Light)"]]],
  done:"you've learned the new ranks your trainer offers.",
  todo:[
    "Learn new ranks. <b>Concentration Aura</b> and <b>Seal of Justice</b> are new too: you can skip both while questing.",
    "Optional: the <b>Stockade</b> dungeon is right here in Stormwind (levels 22–26). Its quests start in Westfall, Redridge and Stormwind."
  ] },

/* ---------- Duskwood, levels 22–25 ---------- */
{ chapter:"Duskwood", lv:"22–24", place:"Darkshire, Duskwood", title:"Duskwood: Raven Hill and the Night Watch", quests:{163:"Raven Hill", 5:"Jitters' Growling Gut", 93:"Dusky Crab Cakes", 240:"Return to Jitters", 245:"Eight-Legged Menaces", 56:"The Night Watch"}, pickup:{164:"Deliveries to Sven", 148:"Supplies from Darkshire", 57:"The Night Watch", 101:"The Totem of Infliction"}, map:[["redridge",[10.4,71.3,"Road south-west to Duskwood"]],["duskwood",[73.5,46,"Darkshire"],[77.5,44.3,"Darkshire flight master"],[18.4,56.4,"Jitters (Raven Hill)"],[66.7,20.8,"Spiders (north of Darkshire)"],[79,69.7,"Tranquil Gardens Cemetery (skeletons)"],[45.1,67,"Watcher Dodds"]]],
  done:"you've handed in <b>Raven Hill</b>, <b>Dusky Crab Cakes</b>, <b>Return to Jitters</b>, <b>Eight-Legged Menaces</b> and the first <b>Night Watch</b>, and you're level 24.", stuck:"Fight the skeletons at the Tranquil Gardens Cemetery until you're level 24.",
  todo:[
    "From Lakeshire, follow the road south-west past Guard Parker into <b>Duskwood</b>, a dark forest. The town is <b>Darkshire</b>, on the east side. Make the inn your home and unlock the flight path.",
    "Take every quest. <b>The Night Watch</b> (Commander Althea Ebonlocke): skeletons at the <b>Tranquil Gardens Cemetery</b>, south-east of town. They're <b>undead</b>: Exorcism (<kbd>5</kbd>) every time it's ready.",
    "<b>Raven Hill</b> (Elaine Carevin) sends you to <b>Jitters</b> in the west. His chain: Chef Grual in Darkshire wants spider legs (<b>Dusky Crab Cakes</b>), then bring the cakes back to Jitters. <b>Watcher Dodds</b> on the road gives <b>Eight-Legged Menaces</b> (little spiders in the west).",
    "Take the next quests too: <b>Deliveries to Sven</b>, Madame Eva's <b>Supplies from Darkshire</b> chain and <b>The Totem of Infliction</b>. Keep their items as you go."
  ],
  tip:"Exorcism only works on undead and demons, so Duskwood's skeletons and ghouls are where it shines. Press it at the start of every undead fight." },

{ lv:"24", place:"Stormwind (fly from Darkshire)", title:"Level 24: Turn Undead", map:[["stormwind",[49.6,49.8,"Paladin trainers (Cathedral of Light)"]]], learn:["turnundead"],
  done:"Turn Undead is on <kbd>Shift</kbd> + <kbd>7</kbd>.",
  todo:[
    "Learn <b>Turn Undead</b> and new ranks (Redemption, Hammer of Justice, Blessing of Protection).",
    "Turn Undead (<kbd>Shift</kbd> + <kbd>7</kbd>) makes one undead enemy run away in fear for a while. Use it when a second skeleton joins your fight: Turn it, kill the first one, then the second."
  ] },

{ lv:"24–25", place:"Duskwood", title:"Duskwood: Eva's errands and Sven", quests:{164:"Deliveries to Sven", 148:"Supplies from Darkshire", 149:"Ghost Hair Thread", 154:"Return the Comb", 157:"Deliver the Thread", 158:"Zombie Juice", 156:"Gather Rot Blossoms", 159:"Juice Delivery", 57:"The Night Watch", 101:"The Totem of Infliction"}, pickup:{95:"Sven's Revenge", 133:"Ghoulish Effigy"}, map:[["duskwood",[7.8,34.1,"Sven's camp (west)"],[28.1,31.5,"Abercrombie's shack"],[82,59.1,"Blind Mary"],[75.8,45.3,"Madame Eva (Darkshire)"],[20.6,46.4,"Raven Hill Cemetery (skeletons, Rot Blossoms)"],[22,32.6,"Ghouls"]]],
  done:"you've finished Eva's thread and juice errands, <b>Deliveries to Sven</b> and part 2 of <b>The Night Watch</b>, and you're level 25.", stuck:"Fight the skeletons at Raven Hill Cemetery until you're level 25.",
  todo:[
    "<b>Deliveries to Sven</b>: bring the supplies to Sven at his camp on the far west edge of Duskwood.",
    "Madame Eva's chain: take the comb to <b>Blind Mary</b> in the house south-east of Darkshire, then the thread to <b>Abercrombie</b> in the shack north of Raven Hill, then <b>Zombie Juice</b> back and forth with Tavernkeep Smitts (Rot Blossoms grow at the Raven Hill Cemetery).",
    "<b>The Night Watch</b> part 2: <b>Skeletal Fiends</b> and <b>Skeletal Horrors</b> at the <b>Raven Hill Cemetery</b> in the west.",
    "<b>The Totem of Infliction</b> takes a while: collect its ghoul fangs, skeleton fingers and spider venom as you go. Hand everything in at Darkshire."
  ] },

{ lv:"25", place:"Southern Westfall", title:"Paladin quest: The Tome of Valor", quests:{1793:"The Tome of Valor", 1649:"The Tome of Valor", 1650:"The Tome of Valor", 1651:"The Tome of Valor", 1652:"The Tome of Valor"}, pickup:{1653:"The Test of Righteousness"}, map:[["stormwind",[50.5,47.5,"Duthorian Rall"]],["westfall",[41.7,89.2,"Daphne Stilwell (southern tip of Westfall)"],[56.6,52.6,"Sentinel Hill flight master"]]],
  done:"you've handed in <b>The Tome of Valor</b> to Duthorian Rall, and <b>The Test of Righteousness</b> is in your log.",
  todo:[
    "Talk to Duthorian Rall in Stormwind to move <b>The Tome of Valor</b> on: he sends you to <b>Daphne Stilwell</b> in Westfall.",
    "Fly to Sentinel Hill and ride south to Daphne's house at the <b>southern tip of Westfall</b>, on the coast.",
    "Talk to her: three waves of Defias attack the house. Stand next to Daphne, fight the Defias that come up the hill, and keep her healed with Flash of Light. Neither of you may die. When it's over, talk to her again.",
    "Hearth or fly to Stormwind and hand it in to Rall. He gives <b>The Test of Righteousness</b> (next step)."
  ],
  tip:"Before the fight: Blessing of Might, Retribution Aura on, full mana. Use Consecration when several Defias come at once. If it goes wrong, Divine Protection and heal yourself and Daphne. Failed? Abandon the quest (<kbd>L</kbd>) and take it again." },

{ lv:"25–30", place:"Ironforge, Loch Modan and dungeons", title:"Paladin quest: Verigan's Fist (optional)", map:[["dunmorogh",[52.5,36.9,"Jordan Stilwell (outside the gates of Ironforge)"]],["lochmodan",[36,44.9,"Bailor Stonehand (Thelsamar)"]]], quests:{1653:"The Test of Righteousness", 1655:"Bailor's Ore Shipment", 1654:"The Test of Righteousness", 1806:"The Test of Righteousness"},
  done:"you've collected Jordan's four items and he has forged <b>Verigan's Fist</b>, or you've decided to skip it.",
  todo:[
    "<b>The Test of Righteousness</b> sends you to <b>Jordan Stilwell</b>, just outside the gates of Ironforge (take the Deeprun Tram from Stormwind's Dwarven District).",
    "He needs four things: <b>Bailor's Refined Ore Shipment</b> (Bailor Stonehand in Thelsamar, Loch Modan: <b>Bailor's Ore Shipment</b>, a cart in the north of Loch Modan), <b>Whitestone Oak Lumber</b> (goblin woodcarvers in <b>The Deadmines</b>), <b>Jordan's Smithing Hammer</b> (inside <b>Shadowfang Keep</b>) and a <b>Kor Gem</b> (naga around <b>Blackfathom Deeps</b>, taken to Thundris Windweaver in Auberdine).",
    "That's three dungeons, so it's a long project for when you run them anyway. The reward, <b>Verigan's Fist</b>, is a great two-handed mace for your level.",
    "Skip it if you'd rather keep questing: the guide carries on without it."
  ] },

/* ---------- Wetlands, levels 25–28 ---------- */
{ chapter:"Wetlands", lv:"25", place:"Ironforge → Loch Modan → Wetlands", title:"Travel to Menethil Harbor", map:[["ironforge",[24.5,6.5,"Paladin trainers (Mystic Ward)"],[55.5,47.7,"Gryphon master"]],["lochmodan",[33.9,50.9,"Thelsamar flight master"]],["wetlands",[10.5,60,"Menethil Harbor"],[9.5,59.7,"Flight master"]]],
  done:"Menethil Harbor is your home and you've unlocked the Ironforge, Thelsamar and Menethil Harbor flight paths.",
  todo:[
    "Take the <b>Deeprun Tram</b> from Stormwind's Dwarven District to <b>Ironforge</b>. Unlock the gryphon master. Ironforge also has paladin trainers, in the <b>Mystic Ward</b>.",
    "Ride east out of Ironforge through Dun Morogh into <b>Loch Modan</b> and unlock the <b>Thelsamar</b> flight path.",
    "From Thelsamar, follow the road north through the Dun Algaz pass into the <b>Wetlands</b>, then west along the road to <b>Menethil Harbor</b> on the coast. Make the inn your home and unlock the flight path."
  ],
  tip:"The Wetlands road passes crocolisks and raptors stronger than you. Stay on the road." },

{ lv:"25–28", place:"Wetlands", title:"The Wetlands", quests:{279:"Claws from the Deep", 484:"Young Crocolisk Skins", 276:"Tramping Paws"}, pickup:{470:"Digging Through the Ooze", 463:"The Greenwarden", 472:"Fall of Dun Modr"}, map:[["wetlands",[10.5,60,"Menethil Harbor"],[34,42,"Whelgar's Excavation Site"],[56.4,40.4,"The Greenwarden"],[48,15,"Dun Modr"],[44,25,"Ironbeard's Tomb"]]],
  done:"you're level 28 and the Menethil Harbor quests are handed in.", stuck:"Fight the murlocs or crocolisks along the Wetlands coast until you are.",
  todo:[
    "Take every quest in town: <b>Claws from the Deep</b> (Karl Boran: kill 12 Bluegill murlocs and <b>Gobbler</b>, north of town, for his head), <b>Young Crocolisk Skins</b> (James Halloran: young crocolisks in the marsh) and <b>Digging Through the Ooze</b> (Sida: kill the black oozes at <b>Ironbeard's Tomb</b>, in the north past Dun Modr, until one drops <b>Sida's Bag</b>). Do the coast ones first.",
    "Then move inland. <b>The Greenwarden</b> (First Mate Fitzsimmons) sends you to Rethiel the Greenwarden, who gives <b>Tramping Paws</b> (gnolls to the south-east) and more. From level 25, Harlo Barnaby's <b>Fall of Dun Modr</b> sends you to Longbraid the Grim at the dwarf ruins in the north. The Wetlands also got 20+ new quests in Forever: take any you find.",
    "New dungeon: <b>Excavation Site</b>, best at levels 26–29. Collect its quests from Caitlin Grassman in Menethil first. Paladins are welcome in any group: you can damage, heal a little, and bring a Blessing for everyone."
  ],
  tip:"Blessings on friends: target another player and click a Blessing. Might for warriors and rogues, Wisdom for casters and healers, Kings for anyone. They last an hour." },

{ lv:"25", place:"Talents (N)", title:"Level 25: Sacred Arbiter and Legacy",
  done:"your talent point and your Legacy point are spent.",
  todo:[
    "Talent: <b>Sacred Arbiter</b>. Holy Strike hits harder and keeps your Judgement effects running on the enemy.",
    "Around now you get your first <b>Legacy</b> point. Press <kbd>Y</kbd> and put it in <b>Thrill of Adventure</b>: every kill gives back some health and mana. Wowhead's Forever guide puts all your first points there."
  ] },

{ lv:"26", place:"Ironforge (fly from Menethil)", title:"Level 26: new ranks", map:[["ironforge",[24.5,6.5,"Paladin trainers (Mystic Ward)"]]], learn:["food4"],
  done:"you've learned the new ranks your trainer offers.",
  todo:[
    "Fly to Ironforge and learn new ranks (Seal of Righteousness, Retribution Aura).",
    "Better supplies from an innkeeper: <b>Goldenbark Apples</b> (food) and <b>Sweet Nectar</b> (drink). Put them on <kbd>Alt</kbd> + <kbd>2</kbd> and <kbd>Alt</kbd> + <kbd>1</kbd>."
  ] },

{ lv:"28", place:"Ironforge (fly)", title:"Level 28: Shadow Resistance Aura", map:[["ironforge",[24.5,6.5,"Paladin trainers (Mystic Ward)"]]],
  done:"you've learned the new ranks your trainer offers.",
  todo:[
    "Learn new ranks (Holy Strike, Holy Light) and <b>Shadow Resistance Aura</b>.",
    "Resistance auras protect your group from one kind of magic. Shadow Resistance Aura helps against shadow-casting enemies like warlocks and undead casters. You won't need it often: it's in your spellbook when you do."
  ] },

/* ---------- 28–34: Duskwood, Arathi, Southshore ---------- */
{ chapter:"Duskwood to Arathi", lv:"28–30", place:"Darkshire, Duskwood", title:"Duskwood: worgen and the Night Watch", quests:{173:"Worgen in the Woods", 57:"The Night Watch", 133:"Ghoulish Effigy", 95:"Sven's Revenge"}, pickup:{55:"Morbent Fel", 228:"Mor'Ladim", 58:"The Night Watch"}, map:[["duskwood",[73.5,46,"Darkshire"],[64,36,"Brightwood Grove (worgen)"],[20,45,"Raven Hill Cemetery (skeletons)"],[80,70,"Tranquil Gardens Cemetery"]]],
  done:"you're level 30 and have handed in <b>Worgen in the Woods</b>.", stuck:"Fight the worgen in Brightwood Grove until you are.",
  todo:[
    "Fly back to <b>Darkshire</b> (from Menethil: fly to Ironforge, take the tram to Stormwind, fly to Darkshire). Make the inn your home again.",
    "Take <b>Worgen in the Woods</b> from Calor (wolf-men in Brightwood Grove, north-west of town) and keep doing Darkshire's chains: <b>The Night Watch</b>, Abercrombie's <b>Ghoulish Effigy</b> and Sven's.",
    "Many Duskwood quests lead into one story about <b>Morbent Fel</b>, a necromancer at the Tranquil Gardens Cemetery. Keep following it: it's one of the best stories in the game, and Exorcism makes short work of his undead.",
    "Skip quests marked <b>Elite</b>, like <b>Mor'Ladim</b>, unless you have a group. Move on at level 30."
  ],
  tip:"Worgen walk in pairs. Hammer of Justice one, fight the other, then finish the first." },

{ lv:"30", place:"Stormwind trainer", title:"Level 30: Seal of Light and Divine Intervention", map:[["stormwind",[49.6,49.8,"Paladin trainers (Cathedral of Light)"]]], learn:["vengeance"],
  done:"you've learned the new ranks and your talent point is in Vengeance.",
  todo:[
    "Fly to Stormwind and learn new ranks (Seal of Command, Consecration, Lay on Hands, Devotion Aura), <b>Seal of Light</b> and <b>Divine Intervention</b>.",
    "<b>Seal of Light</b> heals you a little with every hit. You won't need it for questing. <b>Divine Intervention</b> saves a friend from death at the cost of your own life: a raid trick, leave it in the spellbook.",
    "Talent: <b>Vengeance</b>. After a critical hit, you do more damage for a while. It works by itself."
  ],
  tip:"From now on, the closest paladin trainers are in Stormwind's Cathedral of Light and Ironforge's Mystic Ward. Use whichever is nearer." },

{ lv:"30–32", place:"Arathi Highlands", title:"Arathi Highlands", quests:{681:"Northfold Manor"}, map:[["arathi",[44,89,"Thandol Span (from the Wetlands)"],[45.8,47.6,"Refuge Pointe"],[32,28,"Northfold Manor (Syndicate)"],[66,68,"Witherbark Village (trolls)"],[25,30,"Stromgarde Keep (elites)"],[73,33,"Hammerfall (Horde town)"]]],
  done:"you're level 32 and have handed in <b>Northfold Manor</b>.", stuck:"Fight the Syndicate around Northfold Manor until you are.",
  todo:[
    "Fly to <b>Menethil Harbor</b> and ride north over the big bridge (Thandol Span) into <b>Arathi Highlands</b>, a wide open grassland.",
    "In the middle is <b>Refuge Pointe</b>, the Alliance camp. Unlock the flight path and make it your home.",
    "Take every quest. Captain Nials's <b>Northfold Manor</b> sends you to the Syndicate in the north-west. Sentinel Glynda Nal'Shea sends you after the Witherbark trolls in the south-east.",
    "Stay out of <b>Stromgarde Keep</b> (west) unless you're in a group: it's full of elite enemies. <b>Hammerfall</b> (east) is a Horde town. Move on at level 32."
  ],
  tip:"Syndicate rogues and mages cast and stun. Hammer of Justice the casters; Will to Survive (<kbd>0</kbd>) breaks you out of a stun." },

{ lv:"32", place:"Ironforge (fly from Refuge Pointe)", title:"Level 32: Frost Resistance Aura", map:[["ironforge",[24.5,6.5,"Paladin trainers (Mystic Ward)"]]],
  done:"you've learned every new rank your trainer offers.",
  todo:[
    "Fly to the nearest paladin trainer (from Refuge Pointe, Ironforge is closest) and learn every new rank and <b>Frost Resistance Aura</b>. New ranks replace the old ones on your bars by themselves.",
    "Fly back to Refuge Pointe and carry on."
  ] },

{ lv:"32", place:"Southshore, Hillsbrad", title:"Southshore", quests:{536:"Down the Coast", 505:"Syndicate Assassins"}, map:[["arathi",[20,30,"Gate in Thoradin's Wall (west)"]],["hillsbrad",[50,55,"Southshore"],[40,74,"Murloc beach"]]],
  done:"you're level 33 and have handed in <b>Down the Coast</b> and <b>Syndicate Assassins</b>.", stuck:"Fight the murlocs on the beach south of Southshore until you are.",
  todo:[
    "From Refuge Pointe, ride west through the gate in the huge wall (Thoradin's Wall) into Hillsbrad Foothills. Follow the road south to <b>Southshore</b>. Unlock the flight path.",
    "Take the town's quests. <b>Down the Coast</b> from Lieutenant Farren Orinelle (murlocs on the beach) and <b>Syndicate Assassins</b> from Marshal Redpath (in the Alterac Mountains, north) are quick XP.",
    "Talk to <b>Emissary Jacques</b> to start the new <b>City of Dalaran</b> dungeon (levels 28–35). Optional.",
    "Move on at about level 33."
  ],
  tip:"From here on, on PvP servers, Horde players can attack you. Divine Shield (from 34) and Blessing of Protection are your escape." },

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

{ lv:"34", place:"Nearest paladin trainer", title:"Level 34: Divine Shield", map:[["stormwind",[49.6,49.8,"Paladin trainers (Cathedral of Light)"]]], learn:["divshield"],
  done:"Divine Shield is on <kbd>8</kbd> and Divine Protection has moved to <kbd>Shift</kbd> + <kbd>8</kbd>.",
  todo:[
    "Learn <b>Divine Shield</b> and new ranks.",
    "<b>Divine Shield</b> makes you immune to all damage for a few seconds, and in WoW: Forever you can still attack while it's up. It replaces Divine Protection on key <kbd>8</kbd>: move Divine Protection to <kbd>Shift</kbd> + <kbd>8</kbd>.",
    "Divine Shield, Divine Protection and Blessing of Protection share a lock (<b>Forbearance</b>): after one, you can't use the others for a minute. Pick the best one: usually Divine Shield."
  ] },

{ lv:"35–37", place:"Booty Bay, Stranglethorn", title:"Stranglethorn: Booty Bay", quests:{605:"Singing Blue Shards"}, pickup:{595:"The Bloodsail Buccaneers"}, map:[["stranglethorn",[27,77,"Booty Bay"],[38,3.5,"Rebel Camp"],[35.6,10.6,"Nesingwary's Expedition"]]], learn:["food5","potion4"],
  done:"you're level 37 and have handed in <b>Singing Blue Shards</b>.", stuck:"Fight the pirates or raptors along the coast near Booty Bay until you are.",
  todo:[
    "Follow the main road all the way south to <b>Booty Bay</b>, a goblin port built into a cliff. Unlock the flight path and make the inn your home.",
    "Booty Bay is neutral: Horde players use it too, and the goblin guards attack anyone who starts a fight in town.",
    "Take <b>Singing Blue Shards</b> from Crank Fizzlebub (crystal-backed basilisks in the middle of the zone) and the pirate quests that start with <b>The Bloodsail Buccaneers</b> from First Mate Crazz.",
    "Keep doing the Nesingwary hunting quests as new parts open. Move on at level 37."
  ],
  tip:"Upgrade your supplies: <b>Moon Harvest Pumpkins</b> and <b>Moonberry Juice</b> from vendors, and <b>Superior Healing Potions</b> once First Aid allows it." },

{ lv:"36", place:"Nearest paladin trainer", title:"Level 36: Fire Resistance Aura", map:[["stormwind",[49.6,49.8,"Paladin trainers (Cathedral of Light)"]]],
  done:"you've learned the new ranks.",
  todo:[
    "Fly to a paladin trainer and learn new ranks (Holy Strike, Retribution Aura) and <b>Fire Resistance Aura</b>.",
    "Use your Hearthstone to get back to Booty Bay."
  ] },

{ lv:"35–40", place:"Tirisfal Glades", title:"Dungeon: Scarlet Monastery (optional)", quests:{1050:"Mythology of the Titans", 1053:"In the Name of the Light"}, map:[["tirisfal",[83,33,"Scarlet Monastery"]]],
  done:"your group has finished the wings you wanted, or you've decided to skip it.",
  todo:[
    "Four short dungeon wings, run by crazed crusaders: <b>Graveyard</b> (around level 30), <b>Library</b> (around 33), <b>Armory</b> (around 36) and <b>Cathedral</b> (around 38).",
    "It's deep in Horde land, so don't walk there. Find a group with the Looking For Group tool and let the group summon you at the meeting stone outside.",
    "Collect the Alliance quests first: <b>Mythology of the Titans</b> (Librarian Mae Paledust, Hall of Explorers in Ironforge) and <b>In the Name of the Light</b> (Raleigh the Devout, Southshore inn).",
    "Skip it if you'd rather keep questing."
  ],
  tip:"The Graveyard is full of undead: Exorcism and Consecration shine there." },

/* ---------- 37–44: Riverglades ---------- */
{ chapter:"Riverglades", lv:"37", place:"Redridge → Riverglades", title:"Travel to the Riverglades", map:[["redridge",[25.5,59.4,"Lakeshire flight path"]],["riverglades",[66.7,81,"Demar Brant (Farholde Keep)"],[60.6,81.5,"Gretchen Mayberry (flight master)"]]],
  done:"Farholde Keep is your home (hover over your Hearthstone to check) and you've unlocked its flight path.",
  todo:[
    "Fly to <b>Lakeshire</b> in Redridge Mountains.",
    "From Lakeshire, follow the road north toward the Burning Steppes. Near the edge of the map, a signpost at a crossroads points to the Riverglades: take the right-hand path into the hills.",
    "Follow that road south to <b>Farholde Keep</b>, the Alliance town in the Riverglades (a new zone in WoW Forever).",
    "Unlock the flight path (Gretchen Mayberry) and make the inn your home. From now on you can fly straight between Farholde Keep and Lakeshire."
  ] },

{ lv:"37–40", place:"Farholde Keep, Riverglades", title:"Riverglades: around Farholde Keep", map:[["riverglades",[66.7,81,"Demar Brant (Farholde Keep)"],[60.6,81.5,"Gretchen Mayberry (flight master)"]]],
  done:"you're level 40.", stuck:"Fight the enemies near your current quests in the south of the zone until you are.",
  todo:[
    "Take every quest in Farholde Keep. Many come from <b>Demar Brant</b>, the knight in charge, and the people around him. There are over 70 Alliance quests in this zone.",
    "Riverglades quests come in waves: when you finish a batch, new ones usually appear back in Farholde Keep. Check the town after every few turn-ins.",
    "Start with the farms and lookouts close to the keep. The enemies get tougher the further north you go.",
    "The Horde quests here too (their town is Rog'mar). On PvP servers, keep Divine Shield ready. Move on at level 40."
  ],
  tip:"Farholde Keep is in the south-east of the zone. Use your in-game map (<kbd>M</kbd>) too: new quest givers appear as yellow <b>!</b> on it." },

{ lv:"38", place:"Nearest paladin trainer", title:"Level 38: Seal of Wisdom", map:[["stormwind",[49.6,49.8,"Paladin trainers (Cathedral of Light)"]]], learn:["sow"],
  done:"Seal of Wisdom is on your right bar.",
  todo:[
    "Fly to a paladin trainer (Lakeshire flies to Stormwind) and learn <b>Seal of Wisdom</b> and new ranks.",
    "Seal of Wisdom gives you mana with your hits. When you're almost out of mana in a long fight, switch to it for a few swings.",
    "Your mount at 40 is <b>free</b> for paladins (next step), so you don't have to save gold for it."
  ] },

{ lv:"40", place:"Stormwind", title:"Level 40: your warhorse, plate armor and a second spec", quests:{1661:"The Tome of Nobility"}, map:[["stormwind",[50.5,47.5,"Duthorian Rall"],[49.6,49.8,"Paladin trainers (Cathedral of Light)"]]], learn:["mount","unsealed","sor40"],
  done:"you're riding your warhorse, you can wear plate armor, and your talent point is in Unsealed Wrath.",
  todo:[
    "Fly to Stormwind. Talk to <b>Duthorian Rall</b> in the Cathedral of Light: he gives <b>The Tome of Nobility</b>. Talk to him again and you learn <b>Summon Warhorse</b>, your paladin mount, with the riding skill to use it. No gold needed. Drag the Warhorse from your spellbook to the right bar.",
    "At the trainer, learn <b>Plate Mail</b> (you can wear plate armor now: more armor than mail), new ranks, and look at <b>Dual Talent Specialization</b>: a second talent setup you can switch to (see the Talents tab).",
    "Talent: <b>Unsealed Wrath</b>. Your swings now store copies of your Seal. Seal of Righteousness goes on <kbd>Shift</kbd> + <kbd>2</kbd>: when you've stored 2 copies of Seal of Command, switch to Seal of Righteousness for one swing, then back to Seal of Command (<kbd>1</kbd>). It's optional extra damage: if it's too fiddly, just keep Seal of Command on.",
    "Hearth back to Farholde Keep."
  ],
  tip:"Dual spec for dungeons: make your second setup <b>Holy</b> (healer, recommended for beginners) or <b>Protection</b> (tank). You switch at any time out of combat. See How to Play → Dungeons." },

{ lv:"40–43", place:"Riverglades (north)", title:"Riverglades: Sunnyglade and the north", quests:{94877:"Saving Sunnyglade"}, map:[["riverglades",[66.7,81,"Demar Brant (Farholde Keep)"],[78.8,54,"Powderfuse Port (boat to Tanaris)"]]],
  done:"you're level 43 and have handed in <b>Saving Sunnyglade</b>.", stuck:"Fight the enemies around Sunnyglade until you are.",
  todo:[
    "Fly back to Farholde Keep. Demar Brant's <b>Saving Sunnyglade</b> sends you north to the village of <b>Sunnyglade</b>.",
    "Keep turning in and picking up: the later quests send you further north, toward <b>Twilight's Shroud</b>.",
    "Pick up the quests for the dungeon <b>Krol'dok Stronghold</b> (next step) as they appear.",
    "<b>Powderfuse Port</b>, a neutral goblin port on the east coast, has a bank, an auction house and the boat to Tanaris. Move on at about level 43."
  ] },

{ lv:"42", place:"Stormwind (fly from Farholde Keep)", title:"Level 42: Cleanse", map:[["stormwind",[49.6,49.8,"Paladin trainers (Cathedral of Light)"]]], learn:["cleanse"],
  done:"Cleanse has replaced Purify on <kbd>Shift</kbd> + <kbd>5</kbd>.",
  todo:[
    "Fly from Farholde Keep to Lakeshire, then on to Stormwind. Learn <b>Cleanse</b> and new ranks.",
    "Cleanse removes poisons, diseases <b>and</b> harmful magic from you or a friend. It replaces Purify on <kbd>Shift</kbd> + <kbd>5</kbd>.",
    "Hearth back to Farholde Keep and carry on."
  ] },

{ lv:"41–45", place:"Riverglades", title:"Dungeon: Krol'dok Stronghold (optional)", map:[["riverglades",[37.5,37.5,"Krol'dok Stronghold entrance"],[66.7,81,"Farholde Keep"]]],
  done:"your group has beaten the last boss, or you've decided to skip it.",
  todo:[
    "A new 5-player dungeon for levels 40–45, with six bosses. The entrance is in the hills north of Sunnyglade (with TomTom: <kbd>/way 37.5 37.5</kbd>).",
    "Its quests are a chain of about ten that starts in Farholde Keep. Do the parts you can do alone first.",
    "Find a group with the Looking For Group tool or ask in chat (\"LFG Krol'dok\"). With dual spec you can join as a healer or tank: those groups fill much faster."
  ],
  tip:"Most dungeon XP in Forever comes from quests, so collect them before you go in. Since a November hotfix, dungeon kills also give 50% more XP." },

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
    "Take every quest in Gadgetzan. <b>Wastewander Justice</b> sends you to the bandit camps east of town. (<b>Water Pouch Bounty</b> there no longer gives XP since a November hotfix: skip it.)",
    "<b>Noxious Lair Investigation</b> from Alchemist Pestlezugg: giant insects at the Noxious Lair, south-west of town.",
    "Steamwheedle Port has pirate quests (<b>Southsea Shakedown</b>, <b>Pirate Hats Ahoy!</b>) for the pirates at <b>Lost Rigger Cove</b> on the east coast.",
    "Gadgetzan also has quests for <b>Zul'Farrak</b>, the dungeon in the north-west. Move on at about level 46."
  ],
  tip:"Bandits run away at low health and bring friends. Hammer of Justice the runner, or finish it with Hammer of Wrath (from 44)." },

{ lv:"44", place:"Tanaris", title:"Level 44: train later",
  done:"you've read this and carried on questing.",
  todo:[
    "Your trainer now has <b>Hammer of Wrath</b>, but the paladin trainers are far away in Stormwind and Ironforge. Don't go now: keep questing in Kalimdor and train 44, 46 and 48 together on your way to the Hinterlands (step <b>Level 48</b>).",
    "Skipping a training visit is fine: you only miss a little damage until you catch up."
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

{ lv:"48", place:"Back to Stormwind", title:"Level 48: Hammer of Wrath and the ranks you skipped", map:[["tanaris",[51,28,"Gadgetzan flight master"],[67.5,23,"Steamwheedle Port (boat to the Riverglades)"]],["stormwind",[49.6,49.8,"Paladin trainers (Cathedral of Light)"]]], learn:["how"],
  done:"Hammer of Wrath is on key <kbd>7</kbd> and you've learned every rank you skipped.",
  todo:[
    "Back to the Eastern Kingdoms: fly from Feathermoon to Gadgetzan, ride east to <b>Steamwheedle Port</b> and take the boat to Powderfuse Port. Ride to Farholde Keep and fly to Lakeshire, then Stormwind.",
    "Learn everything from 44, 46 and 48. <b>Hammer of Wrath</b> (key <kbd>7</kbd>) only works on enemies below 20% health: it throws a hammer for big Holy damage, even at range. The perfect finisher for enemies that run away.",
    "<b>Blessing of Sacrifice</b> (from 46) can wait: you won't need it while questing.",
    "Then fly to Southshore for the <b>Hinterlands</b> (next step)."
  ] },

{ lv:"47–50", place:"Aerie Peak, Hinterlands", title:"The Hinterlands", quests:{2877:"Skulk Rock Clean-up", 2880:"Troll Necklace Bounty"}, pickup:{2988:"Witherbark Cages"}, map:[["hinterlands",[14,46,"Aerie Peak"],[55,42,"Skulk Rock (oozes)"],[63,73,"Jintha'Alor (trolls)"]]],
  done:"you're level 50 and have handed in <b>Skulk Rock Clean-up</b> and <b>Troll Necklace Bounty</b>.", stuck:"Fight Witherbark trolls (their necklaces count for the bounty) until you are.",
  todo:[
    "Fly to <b>Southshore</b> (Hillsbrad) and ride north-east into <b>The Hinterlands</b>. <b>Aerie Peak</b>, the Wildhammer dwarf town, is right at the entrance.",
    "Unlock the flight path and make the inn your home.",
    "Take every quest: <b>Skulk Rock Clean-up</b> (oozes at Skulk Rock), <b>Troll Necklace Bounty</b> (necklaces from any Witherbark troll) and Gryphon Master Talonaxe's chain, starting with <b>Witherbark Cages</b>.",
    "Run out of quests? <b>Searing Gorge</b> (town: Thorium Point) is another zone for this level. Move on at level 50."
  ],
  tip:"WoW Forever adds a new dungeon for these levels: <b>Alcaz Prison</b> (about 48–53). Look for it in the Looking For Group tool." },

/* ---------- 49–60 ---------- */
{ chapter:"Un'Goro to 60", lv:"50", place:"Stormwind", title:"Level 50: Holy Wrath and new ranks", map:[["stormwind",[49.6,49.8,"Paladin trainers (Cathedral of Light)"],[48.5,49.1,"Katherine the Pure"]]],
  done:"you've learned every new rank your trainer offers and your talent point is spent.",
  todo:[
    "Fly to Stormwind and learn new ranks (Lay on Hands, Divine Shield, Seal of Command, Consecration). <b>Holy Wrath</b> (undead and demons around you) is new: skip it while questing.",
    "Talent: <b>Improved Seals</b> (Holy tab). Your Retribution tree is finished: from now on your points go into the Holy tab, then Protection. The Talents tab shows the order.",
    "Optional: <b>Katherine the Pure</b> in the cathedral has the paladin chain that starts with <b>In Search of Aeonas</b> (from level 45, sends you to Felwood). Take it if she offers it."
  ] },

{ lv:"49–52", place:"Marshal's Refuge, Un'Goro", title:"Un'Goro Crater", quests:{4284:"Crystals of Power", 4243:"Chasing A-Me 01"}, map:[["ungoro",[43.5,8.5,"Marshal's Refuge"],[50,48,"Fire Plume Ridge (volcano)"],[70,75,"Entrance from Tanaris"]]],
  done:"you're level 52 and have handed in <b>Crystals of Power</b> and <b>Chasing A-Me 01</b>.", stuck:"Fight the raptors and stegodons near Marshal's Refuge until you are.",
  todo:[
    "Back to Kalimdor: fly to Farholde Keep, ride to Powderfuse Port and take the boat to Steamwheedle Port. Fly or ride to Gadgetzan and head west out of Tanaris. The road goes down a long ramp into <b>Un'Goro Crater</b>, a jungle full of dinosaurs.",
    "Follow the crater's edge north to <b>Marshal's Refuge</b>, a camp under the northern cliffs. Unlock the flight path.",
    "Take every quest. <b>Crystals of Power</b> from J.D. Collie: pick up the coloured crystals that lie on the ground all over the crater (your quest log says which colours and how many). Karna Remtravel's <b>Chasing A-Me 01</b> sends you to walk a lost robot home.",
    "Watch out for <b>Devilsaurs</b>: huge dinosaurs that walk around and hit very hard. Stay out of their way. Move on at level 52."
  ],
  tip:"If a Devilsaur catches you: Divine Shield, then ride away on your warhorse." },

{ lv:"52", place:"Stormwind", title:"Level 52: the Mightstone (paladin quest, optional)", pickup:{8415:"Chillwind Point"}, map:[["stormwind",[48.4,50.2,"Lord Grayson Shadowbreaker (Cathedral of Light)"]]],
  done:"you've learned the new ranks, and <b>Chillwind Point</b> is in your log (or you've decided to skip it).",
  todo:[
    "Learn new ranks at the trainer. <b>Greater Blessing of Might</b> is new: it blesses a whole class at once and needs a reagent. It's for raids: skip it while questing.",
    "<b>Lord Grayson Shadowbreaker</b> gives <b>Chillwind Point</b>: a paladin chain in the Western Plaguelands that ends with the <b>Mightstone</b>, a trinket that helps against undead. You'll be there at 55 anyway.",
    "The last part needs voodoo feathers from the troll bosses in the <b>Sunken Temple</b> dungeon, so finish it only if you run that dungeon."
  ] },

{ lv:"52–54", place:"Felwood", title:"Felwood", quests:{5155:"Forces of Jaedenar", 8461:"Deadwood of the North"}, map:[["darkshore",[36.3,45.6,"Auberdine (ship from Stormwind)"]],["ashenvale",[36.5,49.5,"Astranaar"]],["felwood",[51,82,"Emerald Sanctuary"],[37,60,"Jaedenar (Shadow Council)"],[62.5,24.5,"Talonbranch Glade"],[64.5,8,"Timbermaw Hold (tunnel to Winterspring)"]]],
  done:"you're level 54 and have handed in <b>Forces of Jaedenar</b> and <b>Deadwood of the North</b>.", stuck:"Fight Deadwood furbolgs in northern Felwood until you are. It also makes the Timbermaw like you.",
  todo:[
    "Take the ship from Stormwind to <b>Auberdine</b> in Darkshore and unlock its flight path. Ride south into Ashenvale, unlock <b>Astranaar</b> on the way, and follow the road north-east into <b>Felwood</b>, a forest poisoned by demons.",
    "In the south, stop at the <b>Emerald Sanctuary</b> camp. <b>Forces of Jaedenar</b> from Greta Mosshoof sends you after the demon worshippers at Jaedenar, west of the road. Demons: Exorcism every time it's ready.",
    "Follow the road north to <b>Talonbranch Glade</b>. Unlock the flight path and take its quests.",
    "Near the north end, Nafien gives <b>Deadwood of the North</b>: killing the Deadwood furbolgs makes the Timbermaw furbolgs like you, so they let you walk through their tunnel to Winterspring later. Move on at level 54."
  ] },

{ lv:"54", place:"Nearest paladin trainer", title:"Level 54: new ranks", map:[["stormwind",[49.6,49.8,"Paladin trainers (Cathedral of Light)"]]],
  done:"you've learned every new rank your trainer offers.",
  todo:[
    "Learn new ranks (Hammer of Justice, Blessing of Sacrifice). <b>Greater Blessing of Wisdom</b> is a raid spell: skip it.",
    "Then head for the Burning Steppes: fly to Lakeshire."
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

{ lv:"55–57", place:"Chillwind Camp, Western Plaguelands", title:"Western Plaguelands", quests:{5215:"The Scourge Cauldrons", 8415:"Chillwind Point"}, pickup:{8414:"Dispelling Evil"}, map:[["wpl",[43,84,"Chillwind Camp"],[37,57,"Felstone Field"],[46,52,"Dalson's Tears"],[53,66,"Writhing Haunt"],[62,58,"Gahrron's Withering"],[43,70,"Andorhal"]]],
  done:"you're level 57 and all four cauldrons are done.", stuck:"Fight the undead around Andorhal until you are.",
  todo:[
    "Fly to Southshore and ride north through the Alterac Mountains into <b>Western Plaguelands</b>. <b>Chillwind Camp</b> is just inside, in the south. Unlock the flight path.",
    "Hand <b>Chillwind Point</b> to Commander Ashlam Valorfist if you took it. His <b>Dispelling Evil</b> wants <b>Minion's Scourgestones</b>: undead in both Plaguelands drop them.",
    "<b>The Scourge Cauldrons</b> chain: undead lords guard four cauldrons that poison the land, at Felstone Field, Dalson's Tears, the Writhing Haunt and Gahrron's Withering. Kill each lord and use his key on his cauldron.",
    "<b>Andorhal</b>, the ruined city in the middle, has more undead quests. Move on at level 57."
  ],
  tip:"This is paladin country: almost everything here is undead. Exorcism on every pull, Consecration when three or more come at you, and Turn Undead on the extra one." },

{ lv:"56", place:"Ironforge or Stormwind", title:"Level 56: new ranks", map:[["ironforge",[24.5,6.5,"Paladin trainers (Mystic Ward)"]]], learn:["food7"],
  done:"you've learned every new rank your trainer offers.",
  todo:[
    "Fly to Ironforge (the Mystic Ward) or Stormwind (the Cathedral of Light) and learn every new rank.",
    "Better food: <b>Homemade Cherry Pie</b> from a baker. Put it on <kbd>Alt</kbd> + <kbd>2</kbd>.",
    "Fly back to Chillwind Camp and carry on."
  ] },

{ lv:"56–58", place:"Light's Hope, Eastern Plaguelands", title:"Eastern Plaguelands", map:[["epl",[81.5,59,"Light's Hope Chapel"],[36,90,"Darrowshire"],[7,43,"Tirion Fordring's house"],[27,11,"Stratholme"]]],
  done:"you're level 58.", stuck:"Fight the undead near Light's Hope Chapel until you are.",
  todo:[
    "Ride east into <b>Eastern Plaguelands</b> and follow the road to <b>Light's Hope Chapel</b> on the far east side. Unlock the flight path.",
    "The <b>Argent Dawn</b> at Light's Hope fight the undead. Their quests give good XP and reputation, and every undead drops Scourgestones for them.",
    "In the ruined village of <b>Darrowshire</b> (south-west), talk to the little ghost girl <b>Pamela Redpath</b>. Her quests tell one of the saddest stories in WoW.",
    "In a small house by the river in the far west, <b>Tirion Fordring</b>, a paladin like you, starts the famous <b>Redemption</b> chain. Move on at level 58."
  ] },

{ lv:"58", place:"Ironforge or Stormwind", title:"Level 58: new ranks", map:[["stormwind",[49.6,49.8,"Paladin trainers (Cathedral of Light)"]]],
  done:"you've learned every new rank your trainer offers.",
  todo:[
    "Fly from Light's Hope Chapel to Ironforge or Stormwind and learn every new rank.",
    "Then head for Winterspring (next step): take the ship from Stormwind to Auberdine and fly to Talonbranch Glade in Felwood."
  ] },

{ lv:"58–60", place:"Everlook, Winterspring", title:"Winterspring", quests:{3783:"Are We There, Yeti?"}, map:[["felwood",[64.5,8,"Timbermaw Hold (tunnel)"]],["winterspring",[61,38.5,"Everlook"],[31,45,"Donova Snowden (hot springs)"],[67,36,"Winterfall Village (furbolgs)"]]],
  done:"you're level 60!", stuck:"Fight Winterfall furbolgs, or run Blackrock Depths with a group, until you are.",
  todo:[
    "Fly to Talonbranch Glade in Felwood and walk north through the <b>Timbermaw Hold</b> tunnel. It comes out in <b>Winterspring</b>, a snowy valley.",
    "At the hot springs, talk to <b>Donova Snowden</b>: her quests are about the Winterfall furbolgs.",
    "Follow the road east to <b>Everlook</b>, a goblin town. Unlock the flight path, make it your home and take every quest, like <b>Are We There, Yeti?</b> from Legacki.",
    "For the last bars of XP, run end-game dungeons with groups: Blackrock Depths, Lower Blackrock Spire, Dire Maul, Stratholme and Scholomance. With dual spec, join as healer or tank."
  ] },

{ lv:"60", place:"Stormwind", title:"Level 60: Greater Blessing of Kings", map:[["stormwind",[49.6,49.8,"Paladin trainers (Cathedral of Light)"]]],
  done:"you've learned the last ranks and all 51 talent points are spent.",
  todo:[
    "Learn the last ranks and <b>Greater Blessing of Kings</b> (for raids).",
    "Spend your last talent point on <b>Precision</b> (Protection tab). That's all 51.",
    "At 60 paladins also get a class quest for the <b>Charger</b>, a fast epic mount: ask Lord Grayson Shadowbreaker in the Cathedral of Light. It's a long, group-heavy chain."
  ] },

{ lv:"60", place:"Mount Hyjal", title:"You made it to 60!", map:[["hyjal"]],
  todo:[
    "Visit <b>Mount Hyjal</b>, a new level 60 zone reached through Winterspring.",
    "From here on, it's about gear, dungeons and raids. Every raid wants paladins for their Blessings. Congratulations!"
  ] }
];

/* Talent points: which talent to click at each level.
   The Retribution leveling order from Wowhead's WoW: Forever guide (Nov 18, 2026).
   It ends at 31 Retribution / 12 Holy / 8 Protection, Warcraft Tavern's level 60 build. */
const TALENTS = [
  ["10–14", "Benediction (Retribution tab)", "Click it 5 times (once per level)", "Judgement, Holy Strike and your Seals cost less mana. Less drinking."],
  ["15–16", "Improved Judgement", "2 times", "Judgement is ready sooner."],
  ["17–19", "Sanctified Judgement", "3 times", "Judgement gives back mana. Almost free to cast."],
  ["20", "Seal of Command", "Once", "Your big Seal. Your swings sometimes hit again for big Holy damage. Best with a slow two-hander."],
  ["21–22", "Pursuit of Justice", "2 times", "You run faster, and later ride faster too."],
  ["23–24", "Conviction", "2 times", "More critical hits."],
  ["25", "Sacred Arbiter", "Once", "Holy Strike hits harder and keeps your Judgement effects on the enemy."],
  ["26–28", "Two-Handed Weapon Specialization", "3 times", "More damage with a two-handed weapon."],
  ["29", "Conviction", "Once more (3 of 3)", ""],
  ["30–32", "Vengeance", "3 times", "After a critical hit, you do more damage for 30 seconds."],
  ["33", "Repentance", "Once", "A button: puts a humanoid to sleep for a few seconds. Judge it right after for double Seal of Command damage."],
  ["34", "Unyielding Faith", "Once", "Fear works on you for less time. Mainly a step to the next row."],
  ["35–39", "Champion of the Light", "5 times", "Your Intellect turns into spell power: every Holy spell and Seal hits harder."],
  ["40", "Unsealed Wrath", "Once", "Your swings store copies of your Seal. Swap Seals for one swing to set them all off. That's the bottom of Retribution."],
  ["41–45", "Divine Strength (Holy tab)", "5 times", "Switch to the Holy tab. +10% Strength."],
  ["46–50", "Improved Seals", "5 times", "Your Seals and Judgements hit 15% harder."],
  ["51–52", "Holy Conduit", "2 times", "Consecration, Exorcism and Hammer of Wrath cost less mana."],
  ["53–57", "Divine Intellect (Protection tab)", "5 times", "Switch to the Protection tab. +10% Intellect: more mana, and more spell power through Champion of the Light."],
  ["58–60", "Precision", "3 times", "You miss less often. That's all 51 points."]
];

/* Words a new player won't know. Matching is case-insensitive.
   (Words every class meets, like mana or aura, come from data/words.js; these replace them for the paladin.) */
const WORDS = {
  "buff": "A good effect on you, like a Blessing. Its icon shows at the top right of your screen.",
  "flight path": "Talk to a flight master (the person with a gryphon) once to unlock that place. Then you can fly between any places you've unlocked.",
  "trainer": "An NPC who teaches you new spells for gold. Paladins need one every 2 levels: Northshire, Goldshire, Stormwind's Cathedral of Light and Ironforge's Mystic Ward.",
  "mana": "The blue bar under your health. Paladin spells, Seals and Judgement cost mana. Drink water after fights to fill it, or put Blessing of Wisdom on.",
  "seal": "A paladin buff on your weapon that lasts 30 seconds: your hits do something extra (Holy damage, mana, healing). Only one Seal at a time. Seal of Righteousness first, Seal of Command from 20.",
  "judgement": "Throws your Seal's power at the enemy for a burst of damage. In WoW: Forever the Seal stays on afterwards, so just press Judgement every time it's ready.",
  "blessing": "A paladin buff for one player that lasts an hour: Might (attack power), Wisdom (mana), Kings (all stats). Each paladin can give each player one Blessing.",
  "aura": "A paladin effect that's always on and helps everyone in your group near you. Only one at a time. Retribution Aura while questing, Devotion Aura for hard fights.",
  "salvation": "In WoW: Forever, Blessing of Salvation became Salvation (and its opposite, Revoke): it lowers how angry enemies get at a friend, and it can sit next to a normal Blessing.",
  "forbearance": "A lock after Divine Shield, Divine Protection or Blessing of Protection: for a minute you can't use another one of them.",
  "holy strike": "New in WoW: Forever: an instant paladin attack with Holy power. Press it every time it's ready.",
  "undead": "Skeletons, zombies, ghosts and ghouls. Exorcism and Turn Undead only work on undead (and demons). Holy damage loves them.",
  "two-hander": "A big weapon held in both hands, like a two-handed mace or sword. Retribution paladins want the slowest, hardest-hitting one they can find.",
  "stun": "The enemy can't move or attack for a few seconds. Hammer of Justice stuns. Will to Survive frees you from a stun.",
  "pull": "Starting a fight with an enemy, for example by walking up to it or Judging it.",
  "dual specialization": "From level 40: a second talent setup you can switch to at any time out of combat. Keep Retribution for questing and make the second one Holy (healer) or Protection (tank) for dungeons.",
  "auction house": "Where players buy and sell items. Every big city has one."
};

/* ---------------------------------------------------------
   PART 2 — PAGE BEHAVIOUR
   --------------------------------------------------------- */

const ZONES = {
  elwynn: { name: "Elwynn Forest", id: 12 },       stormwind: { name: "Stormwind", id: 1519 },
  westfall: { name: "Westfall", id: 40 },          redridge: { name: "Redridge Mountains", id: 44 },
  duskwood: { name: "Duskwood", id: 10 },          ironforge: { name: "Ironforge", id: 1537 },
  dunmorogh: { name: "Dun Morogh", id: 1 },        lochmodan: { name: "Loch Modan", id: 38 },
  wetlands: { name: "Wetlands", id: 11 },          hillsbrad: { name: "Hillsbrad Foothills", id: 267 },
  arathi: { name: "Arathi Highlands", id: 45 },    stranglethorn: { name: "Stranglethorn Vale", id: 33 },
  tirisfal: { name: "Tirisfal Glades", id: 85 },   needles: { name: "Thousand Needles", id: 400 },
  tanaris: { name: "Tanaris", id: 440 },           feralas: { name: "Feralas", id: 357 },
  hinterlands: { name: "The Hinterlands", id: 47 }, ungoro: { name: "Un'Goro Crater", id: 490 },
  darkshore: { name: "Darkshore", id: 148 },       ashenvale: { name: "Ashenvale", id: 331 },
  felwood: { name: "Felwood", id: 361 },           burning: { name: "Burning Steppes", id: 46 },
  wpl: { name: "Western Plaguelands", id: 28 },    epl: { name: "Eastern Plaguelands", id: 139 },
  winterspring: { name: "Winterspring", id: 618 },
  riverglades: { name: "Riverglades", id: 16591 },
  hyjal: { name: "Mount Hyjal", id: "hyjal" }
};

/* ---------- spells ---------- */
/* school: holy / phys / racial / item  (the colour of the button's frame) */
const SPELLBOOK = {
  sor:          { name:"Seal of Righteousness", lv:1, school:"holy", icon:"star", text:"Your first Seal. For 30 seconds every hit does extra Holy damage. Cast it before every fight until level 20." },
  sor40:        { name:"Seal of Righteousness", lv:40, school:"holy", icon:"star", text:"From level 40 (Unsealed Wrath): after 2 swings with Seal of Command, switch to this for one swing to set off the stored copies, then back to Command. Optional." },
  soc:          { name:"Seal of Command", lv:20, school:"holy", icon:"star", talent:true, text:"Your Seal from level 20. Your swings sometimes hit again for big Holy damage. Best with a slow two-handed weapon. Its Judgement hits twice as hard on a stunned enemy." },
  judgement:    { name:"Judgement", lv:4, school:"holy", icon:"burst", text:"Throws your Seal's power at the enemy. In WoW: Forever the Seal stays on. Press it every time it's ready." },
  holystrike:   { name:"Holy Strike", lv:6, school:"holy", icon:"blade", text:"New in WoW: Forever. An instant attack that hits with Holy power. Press it every time it's ready." },
  hoj:          { name:"Hammer of Justice", lv:8, school:"holy", icon:"burst", text:"Stuns the enemy for a few seconds. Stops spellcasters, or gives you time to heal." },
  exorcism:     { name:"Exorcism", lv:20, school:"holy", icon:"star", text:"Big Holy damage, but only on undead and demons. Use it on every undead." },
  consecration: { name:"Consecration", lv:20, school:"holy", icon:"flame", text:"Burns the ground under you for a few seconds. Worth its mana when 3 or more enemies stand in it." },
  how:          { name:"Hammer of Wrath", lv:44, school:"holy", icon:"burst", text:"Only on enemies below 20% health. Throws a hammer for big Holy damage, even from range. The finisher." },
  divprot:      { name:"Divine Protection", lv:6, school:"holy", icon:"shield", text:"You're immune to damage for a few seconds, but can't attack. Press it, then heal yourself. From 34 it moves to Shift + 8." },
  divshield:    { name:"Divine Shield", lv:34, school:"holy", icon:"shield", text:"You're immune to all damage for a few seconds and can keep attacking. Your strongest 'save me' button." },
  loh:          { name:"Lay on Hands", lv:10, school:"holy", icon:"cross", text:"Heals you (or a friend) to full health, but uses all your mana. Long cooldown. For emergencies." },
  willtosurvive:{ name:"Will to Survive", lv:1, school:"racial", icon:"star", text:"Human racial, new in WoW: Forever. Breaks you out of any stun." },
  holylight:    { name:"Holy Light", lv:1, school:"holy", icon:"cross", text:"A slow, big heal. Your main heal between fights: heal up with it, then drink." },
  flash:        { name:"Flash of Light", lv:20, school:"holy", icon:"cross", text:"A fast, small heal. For during a fight, when you can't wait for Holy Light." },

  crusader:     { name:"Seal of the Crusader", lv:6, school:"holy", icon:"star", text:"For long fights: cast it, Judge it (the enemy takes more Holy damage), then switch back to your normal Seal." },
  bop:          { name:"Blessing of Protection", lv:10, school:"holy", icon:"shield", text:"Makes you or a friend immune to physical attacks for a few seconds, but they can't attack either. Saves a friend in a dungeon." },
  freedom:      { name:"Blessing of Freedom", lv:18, school:"holy", icon:"feather", text:"Frees you or a friend from roots and slows for a few seconds." },
  purify:       { name:"Purify", lv:8, school:"holy", icon:"drop", text:"Removes a poison or disease from you or a friend." },
  cleanse:      { name:"Cleanse", lv:42, school:"holy", icon:"drop", text:"Removes a poison, disease or magic effect from you or a friend. Replaces Purify." },
  repentance:   { name:"Repentance", lv:33, school:"holy", icon:"eye", talent:true, text:"Puts a humanoid to sleep for up to 6 seconds. Any damage wakes it. Judge it right after for double Seal of Command damage." },
  turnundead:   { name:"Turn Undead", lv:24, school:"holy", icon:"eye", text:"One undead enemy runs away in fear for a while. Use it on a second undead that joins the fight." },
  fury:         { name:"Seal of Fury", lv:10, school:"holy", icon:"star", text:"The tank Seal, new in WoW: Forever. Its Judgement is the paladin taunt. Only for tanking dungeons." },
  rfury:        { name:"Righteous Fury", lv:10, school:"holy", icon:"flame", text:"Makes enemies much angrier at you. Only for tanking dungeons: switch it off while questing." },

  might:        { name:"Blessing of Might", lv:4, school:"holy", icon:"shield", text:"More attack power for an hour. Your normal Blessing while questing." },
  wisdom:       { name:"Blessing of Wisdom", lv:14, school:"holy", icon:"shield", text:"Gives mana back all the time for an hour. Use it when you drink too often, and on healers and casters." },
  kings:        { name:"Blessing of Kings", lv:20, school:"holy", icon:"shield", text:"All stats +10% for an hour. Great on any friend." },
  devotion:     { name:"Devotion Aura", lv:1, school:"holy", icon:"ring", text:"More armor for you and your group. For hard fights. Click once: it stays on." },
  retaura:      { name:"Retribution Aura", lv:16, school:"holy", icon:"ring", text:"Enemies that hit you or your group take Holy damage. Your questing aura." },
  redemption:   { name:"Redemption", lv:12, school:"holy", icon:"cross", text:"Brings a dead player back to life. From the level 12 paladin quest." },
  sow:          { name:"Seal of Wisdom", lv:38, school:"holy", icon:"star", text:"Your hits give you mana. Switch to it for a few swings when you're almost out of mana." },
  perception:   { name:"Perception", lv:1, school:"racial", icon:"eye", text:"Human racial. For a short time you see stealthed rogues and druids (and sneaking enemies) more easily." },
  firstaid:     { name:"First Aid", lv:10, school:"item", icon:"cross", text:"Opens First Aid, where you make bandages and, in WoW: Forever, healing potions from cloth and herbs. Learn it in Stormwind." },
  hearth:       { name:"Hearthstone", lv:1, school:"item", icon:"house", text:"Takes you to the inn you set as home. 1 hour cooldown." },
  mount:        { name:"Summon Warhorse", lv:40, school:"holy", icon:"horse", text:"Your paladin mount, from the level 40 class quest. No gold needed. 60% faster." },
  unsealed:     { name:"Unsealed Wrath", lv:40, school:"holy", icon:"star", talent:true, text:"Passive talent: no button. Your swings store copies of your Seal. Switch Seals for one swing to set them all off." },
  vengeance:    { name:"Vengeance", lv:30, school:"holy", icon:"burst", talent:true, text:"Passive talent: no button. After a critical hit you do more damage for 30 seconds." },
  sacrifice:    { name:"Blessing of Sacrifice", lv:46, school:"holy", icon:"shield", text:"Some of the damage a friend takes goes to you instead. Rarely needed while questing." },

  water1: { name:"Ice Cold Milk", lv:5, school:"item", icon:"drop", text:"Drink it after a fight to refill mana. Sold by innkeepers and food vendors. (Refreshing Spring Water before level 5.)" },
  water2: { name:"Melon Juice", lv:15, school:"item", icon:"drop", text:"Better drink from a vendor." },
  water3: { name:"Sweet Nectar", lv:25, school:"item", icon:"drop", text:"Better drink from a vendor." },
  water4: { name:"Moonberry Juice", lv:35, school:"item", icon:"drop", text:"Better drink from a vendor." },
  water5: { name:"Morning Glory Dew", lv:45, school:"item", icon:"drop", text:"Best vendor drink." },
  food1: { name:"Shiny Red Apple", lv:1, school:"item", icon:"bread", text:"Eat it after a fight to refill health, or heal yourself with Holy Light instead. Sold by food vendors." },
  food2: { name:"Tel'Abim Banana", lv:5, school:"item", icon:"bread", text:"Better food from a food vendor." },
  food3: { name:"Snapvine Watermelon", lv:15, school:"item", icon:"bread", text:"Better food from a food vendor." },
  food4: { name:"Goldenbark Apple", lv:25, school:"item", icon:"bread", text:"Better food from a food vendor." },
  food5: { name:"Moon Harvest Pumpkin", lv:35, school:"item", icon:"bread", text:"Better food from a food vendor." },
  food6: { name:"Deep Fried Plantains", lv:45, school:"item", icon:"bread", text:"Better food from a food vendor." },
  food7: { name:"Homemade Cherry Pie", lv:55, school:"item", icon:"bread", text:"Best vendor food. Sold by bakers. Cooked food from Cooking is even better: it gives bonus XP in WoW: Forever." },
  potion1: { name:"Lesser Healing Potion", lv:16, school:"item", icon:"drop", text:"Heals you at once in a fight. Made with First Aid in WoW: Forever, or bought at the auction house." },
  potion2: { name:"Healing Potion", lv:22, school:"item", icon:"drop", text:"Better healing potion." },
  potion3: { name:"Greater Healing Potion", lv:30, school:"item", icon:"drop", text:"Better healing potion." },
  potion4: { name:"Superior Healing Potion", lv:36, school:"item", icon:"drop", text:"Better healing potion." },
  potion5: { name:"Major Healing Potion", lv:48, school:"item", icon:"drop", text:"Best healing potion." }
};


/* ---------- real WoW icons (from the game files; Wowhead's icon server if missing) ----------
   If you're offline the simple drawings above are shown instead. */
const ICONS = {
  sor:"ability_thunderbolt", sor40:"ability_thunderbolt", soc:"ability_warrior_innerrage", judgement:"spell_holy_righteousfury",
  holystrike:"classicon_paladin", hoj:"spell_holy_sealofmight", exorcism:"spell_holy_excorcism_02", consecration:"spell_holy_innerfire",
  how:"ability_thunderclap", divprot:"spell_holy_restoration", divshield:"spell_holy_divineintervention", loh:"spell_holy_layonhands",
  willtosurvive:"spell_shadow_charm", holylight:"spell_holy_holybolt", flash:"spell_holy_flashheal",
  crusader:"spell_holy_holysmite", bop:"spell_holy_sealofprotection", freedom:"spell_holy_sealofvalor", purify:"spell_holy_purify",
  cleanse:"spell_holy_renew", repentance:"spell_holy_prayerofhealing", turnundead:"spell_holy_turnundead",
  fury:"spell_holy_retributionaura", rfury:"spell_holy_sealoffury",
  might:"spell_holy_fistofjustice", wisdom:"spell_holy_sealofwisdom", kings:"spell_magic_magearmor", devotion:"spell_holy_devotionaura",
  retaura:"spell_holy_auraoflight", redemption:"spell_holy_resurrection", sow:"spell_holy_righteousnessaura", perception:"spell_nature_sleep",
  firstaid:"spell_holy_sealofsacrifice", hearth:"inv_misc_rune_01", mount:"spell_nature_swiftness",
  unsealed:"spell_holy_blessedresillience", vengeance:"ability_racial_avatar", sacrifice:"spell_holy_sealofsacrifice",
  water1:"inv_drink_milk_01", water2:"inv_drink_09", water3:"inv_drink_12", water4:"inv_drink_02", water5:"inv_potion_01",
  food1:"inv_misc_food_19", food2:"inv_misc_food_24", food3:"inv_misc_food_22", food4:"inv_misc_food_20",
  food5:"inv_misc_food_25", food6:"inv_misc_food_23", food7:"inv_misc_food_10",
  potion1:"inv_potion_50", potion2:"inv_potion_51", potion3:"inv_potion_52", potion4:"inv_potion_53", potion5:"inv_potion_54"
};

/* ---------- which key holds what, from which level ---------- */
/* each slot: [key label, [[fromLevel, spellId], ...]] */
const BARS = [
  { id:"main", title:"Main bar", how:"Keys 1 to =. Everything you press in a normal fight, plus your heals.",
    slots:[
      ["1", [[1,"sor"],[20,"soc"]]],
      ["2", [[4,"judgement"]]],
      ["3", [[6,"holystrike"]]],
      ["4", [[8,"hoj"]]],
      ["5", [[20,"exorcism"]]],
      ["6", [[20,"consecration"]]],
      ["7", [[48,"how"]]],
      ["8", [[6,"divprot"],[34,"divshield"]]],
      ["9", [[10,"loh"]]],
      ["0", [[1,"willtosurvive"]]],
      ["-", [[1,"holylight"]]],
      ["=", [[20,"flash"]]]
    ]},
  { id:"shift", title:"Bottom left bar", how:"Shift + 1 to =. Extra Seals, help for friends, and the tanking buttons.",
    slots:[
      ["S1", [[6,"crusader"]]],
      ["S2", [[40,"sor40"]]],
      ["S3", [[10,"bop"]]],
      ["S4", [[18,"freedom"]]],
      ["S5", [[8,"purify"],[42,"cleanse"]]],
      ["S6", [[33,"repentance"]]],
      ["S7", [[24,"turnundead"]]],
      ["S8", [[34,"divprot"]]],
      ["S9", [[10,"fury"]]],
      ["S0", [[10,"rfury"]]],
      ["S-", [[38,"sow"]]],
      ["S=", []]
    ]},
  { id:"side", title:"Right bar", how:"Click these with the mouse between fights. No key needed.",
    slots:[
      ["", [[4,"might"]]],
      ["", [[14,"wisdom"]]],
      ["", [[20,"kings"]]],
      ["", [[1,"devotion"]]],
      ["", [[16,"retaura"]]],
      ["", [[12,"redemption"]]],
      ["", [[1,"perception"]]],
      ["", [[10,"firstaid"]]],
      ["", [[1,"hearth"]]],
      ["", [[40,"mount"]]]
    ]},
  { id:"alt", title:"Bottom right bar", how:"Alt + 1, Alt + 2 and Alt + 3. Drink, food and a healing potion.",
    slots:[
      ["A1", [[5,"water1"],[15,"water2"],[25,"water3"],[35,"water4"],[45,"water5"]]],
      ["A2", [[1,"food1"],[5,"food2"],[15,"food3"],[25,"food4"],[35,"food5"],[45,"food6"],[55,"food7"]]],
      ["A3", [[16,"potion1"],[22,"potion2"],[30,"potion3"],[36,"potion4"],[48,"potion5"]]]
    ]}
];
