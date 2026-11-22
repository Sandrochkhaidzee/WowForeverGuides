/* Mage talent trees in WoW: Forever (game build 1.60.1.71037).
   Made by tools/extract-talents.py from the game's own files: don't edit by hand.
   r/c = row and column in the tree, max = ranks, i = icon, d = what each rank does,
   req = id of the talent that must be full first (the arrow). */
const TALENT_TREE = {
 "cls": "Mage",
 "build": "1.60.1.71037",
 "tabs": [
  {
   "name": "Arcane",
   "bg": "magearcane",
   "i": "spell_holy_magicalsentry",
   "talents": [
    {
     "id": 105815,
     "n": "Wand Specialization",
     "r": 0,
     "c": 0,
     "max": 2,
     "i": "inv_wand_01",
     "d": [
      "Increases your damage with Wands by 13%.",
      "Increases your damage with Wands by 25%."
     ]
    },
    {
     "id": 105813,
     "n": "Improved Channeling",
     "r": 0,
     "c": 1,
     "max": 5,
     "i": "spell_nature_starfall",
     "d": [
      "Gives your Arcane Missiles spell a 20% chance and your Arcane Blast and Arcane Wrath spells a 14% chance to not lose casting time when you take damage.",
      "Gives your Arcane Missiles spell a 40% chance and your Arcane Blast and Arcane Wrath spells a 28% chance to not lose casting time when you take damage.",
      "Gives your Arcane Missiles spell a 60% chance and your Arcane Blast and Arcane Wrath spells a 42% chance to not lose casting time when you take damage.",
      "Gives your Arcane Missiles spell a 80% chance and your Arcane Blast and Arcane Wrath spells a 56% chance to not lose casting time when you take damage.",
      "Gives your Arcane Missiles spell a 100% chance and your Arcane Blast and Arcane Wrath spells a 70% chance to not lose casting time when you take damage."
     ]
    },
    {
     "id": 105802,
     "n": "Arcane Resilience",
     "r": 0,
     "c": 2,
     "max": 3,
     "i": "spell_arcane_arcaneresilience",
     "d": [
      "Increases your Armor by an amount equal to 25% of your Intellect.",
      "Increases your Armor by an amount equal to 50% of your Intellect.",
      "Increases your Armor by an amount equal to 75% of your Intellect."
     ]
    },
    {
     "id": 105812,
     "n": "Arcane Subtlety",
     "r": 1,
     "c": 0,
     "max": 2,
     "i": "spell_holy_dispelmagic",
     "d": [
      "Reduces your target's resistance to all your spells by 8 and reduces the threat caused by your Arcane spells by 15%.",
      "Reduces your target's resistance to all your spells by 15 and reduces the threat caused by your Arcane spells by 30%."
     ]
    },
    {
     "id": 105811,
     "n": "Magic Absorption",
     "r": 1,
     "c": 1,
     "max": 2,
     "i": "spell_nature_astralrecalgroup",
     "d": [
      "Increases all your resistances by 5 and causes all spells you fully resist to restore 1% of your total mana. Cannot trigger more often than 1 time per sec.",
      "Increases all your resistances by 10 and causes all spells you fully resist to restore 2% of your total mana. Cannot trigger more often than 1 time per sec."
     ]
    },
    {
     "id": 105810,
     "n": "Arcane Concentration",
     "r": 1,
     "c": 2,
     "max": 5,
     "i": "spell_shadow_manaburn",
     "d": [
      "Gives you a 2% chance of entering a Clearcasting state after any damage spell hits a target. The Clearcasting state reduces the mana cost of your next damage spell by 100%.",
      "Gives you a 4% chance of entering a Clearcasting state after any damage spell hits a target. The Clearcasting state reduces the mana cost of your next damage spell by 100%.",
      "Gives you a 6% chance of entering a Clearcasting state after any damage spell hits a target. The Clearcasting state reduces the mana cost of your next damage spell by 100%.",
      "Gives you a 8% chance of entering a Clearcasting state after any damage spell hits a target. The Clearcasting state reduces the mana cost of your next damage spell by 100%.",
      "Gives you a 10% chance of entering a Clearcasting state after any damage spell hits a target. The Clearcasting state reduces the mana cost of your next damage spell by 100%."
     ]
    },
    {
     "id": 105809,
     "n": "Missile Barrage",
     "r": 1,
     "c": 3,
     "max": 2,
     "i": "ability_mage_missilebarrage",
     "d": [
      "Gives your Arcane Blast spell a 20% chance, and your Arcane Wrath, Fireball, Frostbolt, and Frostfire Bolt spells a 10% chance to reduce the channeled duration of your next Arcane Missiles spell by 50%, reduce the Mana cost by 100%, and missiles fire every 0.5 sec.",
      "Gives your Arcane Blast spell a 40% chance, and your Arcane Wrath, Fireball, Frostbolt, and Frostfire Bolt spells a 20% chance to reduce the channeled duration of your next Arcane Missiles spell by 50%, reduce the Mana cost by 100%, and missiles fire every 0.5 sec."
     ]
    },
    {
     "id": 105808,
     "n": "Arcane Geometry",
     "r": 2,
     "c": 0,
     "max": 2,
     "i": "inv_ability_mage_radiantspark",
     "d": [
      "Increases the range of your Arcane spells by 3 yards.",
      "Increases the range of your Arcane spells by 6 yards."
     ]
    },
    {
     "id": 105807,
     "n": "Arcane Impact",
     "r": 2,
     "c": 1,
     "max": 3,
     "i": "spell_nature_wispsplode",
     "d": [
      "Increases the critical strike chance of your Arcane spells by 2%.",
      "Increases the critical strike chance of your Arcane spells by 4%.",
      "Increases the critical strike chance of your Arcane spells by 6%."
     ]
    },
    {
     "id": 105806,
     "n": "Arcane Blast",
     "r": 2,
     "c": 3,
     "max": 1,
     "i": "spell_arcane_blast",
     "d": [
      "Blasts the target with energy, dealing 32 Arcane damage. Each time you cast Arcane Blast, you gain 12% of your Intellect as Spell Damage and the mana cost of Arcane Blast is increased by 100%. Effect stacks up to 4 times and lasts 18 sec from time of initial application."
     ]
    },
    {
     "id": 105805,
     "n": "Arcane Shielding",
     "r": 3,
     "c": 0,
     "max": 2,
     "i": "spell_shadow_detectlesserinvisibility",
     "d": [
      "Decreases the Mana lost per point of damage taken when your Mana Shield spell is active by 17% and increases the resistances granted by your Mage Armor spell by 25%.",
      "Decreases the Mana lost per point of damage taken when your Mana Shield spell is active by 33% and increases the resistances granted by your Mage Armor spell by 50%."
     ]
    },
    {
     "id": 105804,
     "n": "Improved Counterspell",
     "r": 3,
     "c": 1,
     "max": 2,
     "i": "spell_frost_iceshock",
     "d": [
      "Your Counterspell also Silences the target for 2 sec.",
      "Your Counterspell also Silences the target for 4 sec."
     ]
    },
    {
     "id": 105803,
     "n": "Arcane Meditation",
     "r": 3,
     "c": 2,
     "max": 3,
     "i": "spell_shadow_siphonmana",
     "d": [
      "Allows 17% of your Mana regeneration to continue while casting.",
      "Allows 33% of your Mana regeneration to continue while casting.",
      "Allows 50% of your Mana regeneration to continue while casting."
     ],
     "req": 105810
    },
    {
     "id": 113627,
     "n": "Arcane Wrath",
     "r": 3,
     "c": 3,
     "max": 1,
     "i": "ability_mage_netherwindpresence",
     "d": [
      "Launches a projectile of pure Arcane energy at the enemy target, causing 120 Arcane damage. This spell gains additional Spell Damage equal to 5% of your maximum Mana."
     ],
     "req": 105806
    },
    {
     "id": 105801,
     "n": "Presence of Mind",
     "r": 4,
     "c": 1,
     "max": 1,
     "i": "spell_nature_enchantarmor",
     "d": [
      "When activated, your next Mage spell with a casting time less than 10 sec becomes an instant cast spell."
     ]
    },
    {
     "id": 105800,
     "n": "Arcane Mind",
     "r": 4,
     "c": 2,
     "max": 5,
     "i": "spell_shadow_charm",
     "d": [
      "Increases your Intellect by 2% and increases the critical strike damage bonus of your Arcane spells by 20%.",
      "Increases your Intellect by 4% and increases the critical strike damage bonus of your Arcane spells by 40%.",
      "Increases your Intellect by 6% and increases the critical strike damage bonus of your Arcane spells by 60%.",
      "Increases your Intellect by 8% and increases the critical strike damage bonus of your Arcane spells by 80%.",
      "Increases your Intellect by 10% and increases the critical strike damage bonus of your Arcane spells by 100%."
     ]
    },
    {
     "id": 105799,
     "n": "Arcane Instability",
     "r": 5,
     "c": 2,
     "max": 3,
     "i": "spell_shadow_teleport",
     "d": [
      "Increases the damage done by your spells by 1% and your critical strike chance by 1%.",
      "Increases the damage done by your spells by 2% and your critical strike chance by 2%.",
      "Increases the damage done by your spells by 3% and your critical strike chance by 3%."
     ]
    },
    {
     "id": 105798,
     "n": "Arcane Power",
     "r": 6,
     "c": 1,
     "max": 1,
     "i": "spell_nature_lightning",
     "d": [
      "For the next 15 sec, your spells deal 30% more damage while costing 30% more mana to cast."
     ],
     "req": 105801
    }
   ]
  },
  {
   "name": "Fire",
   "bg": "magefire",
   "i": "spell_fire_firebolt02",
   "talents": [
    {
     "id": 105796,
     "n": "Incineration",
     "r": 0,
     "c": 1,
     "max": 5,
     "i": "spell_fire_flameshock",
     "d": [
      "Increases the critical strike chance of your Fire Blast, Ice Lance, Arcane Blast, and Scorch spells by 2%.",
      "Increases the critical strike chance of your Fire Blast, Ice Lance, Arcane Blast, and Scorch spells by 4%.",
      "Increases the critical strike chance of your Fire Blast, Ice Lance, Arcane Blast, and Scorch spells by 6%.",
      "Increases the critical strike chance of your Fire Blast, Ice Lance, Arcane Blast, and Scorch spells by 8%.",
      "Increases the critical strike chance of your Fire Blast, Ice Lance, Arcane Blast, and Scorch spells by 10%."
     ]
    },
    {
     "id": 105795,
     "n": "Accelerant",
     "r": 0,
     "c": 2,
     "max": 5,
     "i": "spell_fire_flamebolt",
     "d": [
      "Reduces the casting time of your Fireball, Frostfire Bolt, and Arcane Wrath spells by 0.1 sec.",
      "Reduces the casting time of your Fireball, Frostfire Bolt, and Arcane Wrath spells by 0.2 sec.",
      "Reduces the casting time of your Fireball, Frostfire Bolt, and Arcane Wrath spells by 0.3 sec.",
      "Reduces the casting time of your Fireball, Frostfire Bolt, and Arcane Wrath spells by 0.4 sec.",
      "Reduces the casting time of your Fireball, Frostfire Bolt, and Arcane Wrath spells by 0.5 sec."
     ]
    },
    {
     "id": 105794,
     "n": "Ignite",
     "r": 1,
     "c": 0,
     "max": 5,
     "i": "spell_fire_incinerate",
     "d": [
      "Your critical strikes from Fire damage spells cause the target to burn for an additional 8% of your spell's damage over 4 sec.",
      "Your critical strikes from Fire damage spells cause the target to burn for an additional 16% of your spell's damage over 4 sec.",
      "Your critical strikes from Fire damage spells cause the target to burn for an additional 24% of your spell's damage over 4 sec.",
      "Your critical strikes from Fire damage spells cause the target to burn for an additional 32% of your spell's damage over 4 sec.",
      "Your critical strikes from Fire damage spells cause the target to burn for an additional 40% of your spell's damage over 4 sec."
     ]
    },
    {
     "id": 105793,
     "n": "Flame Throwing",
     "r": 1,
     "c": 1,
     "max": 2,
     "i": "spell_fire_flare",
     "d": [
      "Increases the range of your Fire spells by 3 yards.",
      "Increases the range of your Fire spells by 6 yards."
     ]
    },
    {
     "id": 105792,
     "n": "Impact",
     "r": 1,
     "c": 2,
     "max": 3,
     "i": "spell_fire_meteorstorm",
     "d": [
      "Gives your Fire spells a 3% chance to stun the target for 2 sec.",
      "Gives your Fire spells a 7% chance to stun the target for 2 sec.",
      "Gives your Fire spells a 10% chance to stun the target for 2 sec."
     ]
    },
    {
     "id": 105789,
     "n": "Burning Soul",
     "r": 2,
     "c": 0,
     "max": 3,
     "i": "spell_fire_fire",
     "d": [
      "Gives your Fire spells a 23% chance to not lose casting time when you take damage and reduces the threat caused by your Fire spells by 10%.",
      "Gives your Fire spells a 47% chance to not lose casting time when you take damage and reduces the threat caused by your Fire spells by 20%.",
      "Gives your Fire spells a 70% chance to not lose casting time when you take damage and reduces the threat caused by your Fire spells by 30%."
     ]
    },
    {
     "id": 105791,
     "n": "Improved Flamestrike",
     "r": 2,
     "c": 1,
     "max": 3,
     "i": "spell_fire_selfdestruct",
     "d": [
      "Increases the critical strike chance of your Flamestrike spell by 5%.",
      "Increases the critical strike chance of your Flamestrike spell by 10%.",
      "Increases the critical strike chance of your Flamestrike spell by 15%."
     ]
    },
    {
     "id": 105790,
     "n": "Pyroblast",
     "r": 2,
     "c": 2,
     "max": 1,
     "i": "spell_fire_fireball02",
     "d": [
      "Hurls an immense fiery boulder that causes 110 Fire damage and an additional 44 Fire damage over 12 sec."
     ]
    },
    {
     "id": 105797,
     "n": "Improved Fire Blast",
     "r": 2,
     "c": 3,
     "max": 2,
     "i": "spell_fire_lavaspawn",
     "d": [
      "Reduces the cooldown of your Fire Blast spell by 1 sec and increases its range by 8 yards.",
      "Reduces the cooldown of your Fire Blast spell by 2 sec and increases its range by 15 yards."
     ]
    },
    {
     "id": 105788,
     "n": "Improved Scorch",
     "r": 3,
     "c": 0,
     "max": 3,
     "i": "spell_fire_soulburn",
     "d": [
      "Your Scorch spell has a 33% chance to cause your target to be vulnerable to Fire damage. This vulnerability increases all Fire damage you deal to your target by 3% and lasts 30 sec, stacking up to 5 times.",
      "Your Scorch spell has a 67% chance to cause your target to be vulnerable to Fire damage. This vulnerability increases all Fire damage you deal to your target by 3% and lasts 30 sec, stacking up to 5 times.",
      "Your Scorch spell has a 100% chance to cause your target to be vulnerable to Fire damage. This vulnerability increases all Fire damage you deal to your target by 3% and lasts 30 sec, stacking up to 5 times."
     ]
    },
    {
     "id": 105787,
     "n": "Improved Fire Ward",
     "r": 3,
     "c": 1,
     "max": 2,
     "i": "spell_fire_firearmor",
     "d": [
      "Causes your Fire Ward to have a 10% chance to reflect Fire spells while active.",
      "Causes your Fire Ward to have a 20% chance to reflect Fire spells while active."
     ]
    },
    {
     "id": 105786,
     "n": "Heating Up",
     "r": 3,
     "c": 2,
     "max": 1,
     "i": "spell_fire_firebolt",
     "d": [
      "Non-periodic critical strikes with Fireball, Frostfire Bolt, Fire Blast, and Scorch reduce the cast time of your next Pyroblast cast within 20 sec by 25%, stacking up to 3 times. Fire Blast grants an additional stack every time it deals damage."
     ],
     "req": 105790
    },
    {
     "id": 105785,
     "n": "Master of Elements",
     "r": 3,
     "c": 3,
     "max": 3,
     "i": "spell_fire_masterofelements",
     "d": [
      "Your Fire and Frost critical strikes will refund 10% of their base mana cost.",
      "Your Fire and Frost critical strikes will refund 20% of their base mana cost.",
      "Your Fire and Frost critical strikes will refund 30% of their base mana cost."
     ]
    },
    {
     "id": 105784,
     "n": "Critical Mass",
     "r": 4,
     "c": 1,
     "max": 3,
     "i": "spell_nature_wispheal",
     "d": [
      "Increases the critical strike chance of your Fire spells by 2%.",
      "Increases the critical strike chance of your Fire spells by 4%.",
      "Increases the critical strike chance of your Fire spells by 6%."
     ]
    },
    {
     "id": 105783,
     "n": "Blast Wave",
     "r": 4,
     "c": 2,
     "max": 1,
     "i": "spell_holy_excorcism_02",
     "d": [
      "A wave of flame radiates outward from the caster, damaging all enemies caught within the blast for 163 Fire damage, and Dazing them for 50% reduced movement speed for 6 sec."
     ]
    },
    {
     "id": 105782,
     "n": "Fire Power",
     "r": 5,
     "c": 2,
     "max": 3,
     "i": "spell_fire_immolation",
     "d": [
      "Increases the damage done by your Fire spells by 1% per your Fire effects on the target, up to a maximum increase of 4%. Effects which mix multiple schools of magic do not qualify.",
      "Increases the damage done by your Fire spells by 2% per your Fire effects on the target, up to a maximum increase of 8%. Effects which mix multiple schools of magic do not qualify.",
      "Increases the damage done by your Fire spells by 3% per your Fire effects on the target, up to a maximum increase of 12%. Effects which mix multiple schools of magic do not qualify."
     ]
    },
    {
     "id": 105781,
     "n": "Combustion",
     "r": 6,
     "c": 1,
     "max": 1,
     "i": "spell_fire_sealoffire",
     "d": [
      "When activated, this spell causes each of your Fire damage spell hits to increase your critical strike chance with Fire damage spells by 10%. This effect lasts until you have caused 3 non-periodic critical strikes with Fire spells."
     ],
     "req": 105784
    }
   ]
  },
  {
   "name": "Frost",
   "bg": "magefrost",
   "i": "spell_frost_frostbolt02",
   "talents": [
    {
     "id": 105780,
     "n": "Frost Warding",
     "r": 0,
     "c": 0,
     "max": 2,
     "i": "spell_frost_frostward",
     "d": [
      "Increases the Armor and resistances granted by your Frost Armor and Ice Armor spells by 15%, gives your Frost Ward a 10% chance to negate the warded damage spell, and increases the amount absorbed by your Ice Barrier and Frost Ward by 10%.",
      "Increases the Armor and resistances granted by your Frost Armor and Ice Armor spells by 30%, gives your Frost Ward a 20% chance to negate the warded damage spell, and increases the amount absorbed by your Ice Barrier and Frost Ward by 20%."
     ]
    },
    {
     "id": 105779,
     "n": "Improved Frostbolt",
     "r": 0,
     "c": 1,
     "max": 5,
     "i": "spell_frost_frostbolt02",
     "d": [
      "Reduces the casting time of your Frostbolt spell by 0.1 sec.",
      "Reduces the casting time of your Frostbolt spell by 0.2 sec.",
      "Reduces the casting time of your Frostbolt spell by 0.3 sec.",
      "Reduces the casting time of your Frostbolt spell by 0.4 sec.",
      "Reduces the casting time of your Frostbolt spell by 0.5 sec."
     ]
    },
    {
     "id": 105778,
     "n": "Precision",
     "r": 0,
     "c": 2,
     "max": 3,
     "i": "spell_ice_magicdamage",
     "d": [
      "Improves your chance to hit with all spells by 2%.",
      "Improves your chance to hit with all spells by 4%.",
      "Improves your chance to hit with all spells by 6%."
     ]
    },
    {
     "id": 105777,
     "n": "Ice Shards",
     "r": 1,
     "c": 0,
     "max": 5,
     "i": "spell_frost_iceshard",
     "d": [
      "Increases the critical strike damage bonus of your Frost spells by 20%.",
      "Increases the critical strike damage bonus of your Frost spells by 40%.",
      "Increases the critical strike damage bonus of your Frost spells by 60%.",
      "Increases the critical strike damage bonus of your Frost spells by 80%.",
      "Increases the critical strike damage bonus of your Frost spells by 100%."
     ]
    },
    {
     "id": 105774,
     "n": "Frostbite",
     "r": 1,
     "c": 1,
     "max": 3,
     "i": "spell_frost_frostarmor",
     "d": [
      "Gives your Chill effects a 5% chance to Freeze the target for 5 sec.",
      "Gives your Chill effects a 10% chance to Freeze the target for 5 sec.",
      "Gives your Chill effects a 15% chance to Freeze the target for 5 sec."
     ]
    },
    {
     "id": 105775,
     "n": "Improved Frost Nova",
     "r": 1,
     "c": 2,
     "max": 2,
     "i": "spell_frost_freezingbreath",
     "d": [
      "Reduces the cooldown of your Frost Nova spell by 2 sec.",
      "Reduces the cooldown of your Frost Nova spell by 4 sec."
     ]
    },
    {
     "id": 105776,
     "n": "Permafrost",
     "r": 1,
     "c": 3,
     "max": 3,
     "i": "spell_frost_wisp",
     "d": [
      "Increases the duration of your Chill effects by 11% and reduces the target's speed by an additional 3%.",
      "Increases the duration of your Chill effects by 22% and reduces the target's speed by an additional 7%.",
      "Increases the duration of your Chill effects by 33% and reduces the target's speed by an additional 10%."
     ]
    },
    {
     "id": 105772,
     "n": "Frost Channeling",
     "r": 2,
     "c": 0,
     "max": 3,
     "i": "spell_frost_stun",
     "d": [
      "Reduces the mana cost of your Frost spells by 5% and reduces the threat caused by your Frost spells by 10%.",
      "Reduces the mana cost of your Frost spells by 10% and reduces the threat caused by your Frost spells by 20%.",
      "Reduces the mana cost of your Frost spells by 15% and reduces the threat caused by your Frost spells by 30%."
     ]
    },
    {
     "id": 105771,
     "n": "Improved Blizzard",
     "r": 2,
     "c": 1,
     "max": 3,
     "i": "spell_frost_icestorm",
     "d": [
      "Adds a Chill effect to your Blizzard spell. This effect lowers the target's movement speed by 15% for 1.5 sec.",
      "Adds a Chill effect to your Blizzard spell. This effect lowers the target's movement speed by 25% for 1.5 sec.",
      "Adds a Chill effect to your Blizzard spell. This effect lowers the target's movement speed by 40% for 1.5 sec."
     ]
    },
    {
     "id": 105767,
     "n": "Ice Lance",
     "r": 2,
     "c": 2,
     "max": 1,
     "i": "spell_frost_frostblast",
     "d": [
      "Deals 28 Frost damage to an enemy target. Deals 300% increased damage to Frozen targets."
     ]
    },
    {
     "id": 105770,
     "n": "Arctic Reach",
     "r": 3,
     "c": 0,
     "max": 2,
     "i": "spell_shadow_darkritual",
     "d": [
      "Increases the range of your Frostbolt, Ice Lance, and Blizzard spells and the radius of your Frost Nova and Cone of Cold spells by 10%.",
      "Increases the range of your Frostbolt, Ice Lance, and Blizzard spells and the radius of your Frost Nova and Cone of Cold spells by 20%."
     ]
    },
    {
     "id": 105769,
     "n": "Ice Block",
     "r": 3,
     "c": 1,
     "max": 1,
     "i": "spell_frost_frost",
     "d": [
      "You become encased in a block of ice, protecting you from all physical attacks and spells for 10 sec, but during that time you cannot attack, move, or cast spells."
     ]
    },
    {
     "id": 105768,
     "n": "Shatter",
     "r": 3,
     "c": 3,
     "max": 3,
     "i": "spell_frost_frostshock",
     "d": [
      "Increases the critical strike chance of all your spells against Frozen targets by 17%.",
      "Increases the critical strike chance of all your spells against Frozen targets by 33%.",
      "Increases the critical strike chance of all your spells against Frozen targets by 50%."
     ]
    },
    {
     "id": 105765,
     "n": "Improved Cone of Cold",
     "r": 4,
     "c": 0,
     "max": 3,
     "i": "spell_frost_glacier",
     "d": [
      "Increases the damage dealt by your Cone of Cold spell by 12%.",
      "Increases the damage dealt by your Cone of Cold spell by 23%.",
      "Increases the damage dealt by your Cone of Cold spell by 35%."
     ]
    },
    {
     "id": 105766,
     "n": "Cold Snap",
     "r": 4,
     "c": 1,
     "max": 1,
     "i": "spell_frost_wizardmark",
     "d": [
      "Finishes the remaining cooldown on all your other Frost spells."
     ]
    },
    {
     "id": 105764,
     "n": "Fingers of Frost",
     "r": 4,
     "c": 2,
     "max": 2,
     "i": "ability_mage_wintersgrasp",
     "d": [
      "Gives your Chill effects a 15% chance to grant you the Fingers of Frost effect, which treats your next 1 spell cast as if the target were Frozen. Lasts 15 sec.",
      "Gives your Chill effects a 15% chance to grant you the Fingers of Frost effect, which treats your next 2 spells cast as if the target were Frozen. Lasts 15 sec."
     ],
     "req": 105767
    },
    {
     "id": 105763,
     "n": "Winter's Chill",
     "r": 5,
     "c": 2,
     "max": 5,
     "i": "spell_frost_chillingblast",
     "d": [
      "Gives your Frostbolt and Fingers of Frost empowered Ice Lance spells a 20% chance to apply Winter's Chill, increasing the target's damage taken from your next Cone of Cold by 20% and it gains an additional 7% of your spell damage, stacking up to 5 times.",
      "Gives your Frostbolt and Fingers of Frost empowered Ice Lance spells a 40% chance to apply Winter's Chill, increasing the target's damage taken from your next Cone of Cold by 20% and it gains an additional 7% of your spell damage, stacking up to 5 times.",
      "Gives your Frostbolt and Fingers of Frost empowered Ice Lance spells a 60% chance to apply Winter's Chill, increasing the target's damage taken from your next Cone of Cold by 20% and it gains an additional 7% of your spell damage, stacking up to 5 times.",
      "Gives your Frostbolt and Fingers of Frost empowered Ice Lance spells a 80% chance to apply Winter's Chill, increasing the target's damage taken from your next Cone of Cold by 20% and it gains an additional 7% of your spell damage, stacking up to 5 times.",
      "Gives your Frostbolt and Fingers of Frost empowered Ice Lance spells a 100% chance to apply Winter's Chill, increasing the target's damage taken from your next Cone of Cold by 20% and it gains an additional 7% of your spell damage, stacking up to 5 times."
     ]
    },
    {
     "id": 105762,
     "n": "Ice Barrier",
     "r": 6,
     "c": 1,
     "max": 1,
     "i": "spell_ice_lament",
     "d": [
      "Shield yourself, absorbing 431 damage and increasing your Frost damage by 15% for 1 min. While shielded, your Frost damage is increased by an additional 5% and you do not lose casting time when you take damage."
     ],
     "req": 105766
    }
   ]
  }
 ]
};
