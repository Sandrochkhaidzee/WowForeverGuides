/* Druid talent trees in WoW: Forever (game build 1.60.1.71037).
   Made by tools/extract-talents.py from the game's own files: don't edit by hand.
   r/c = row and column in the tree, max = ranks, i = icon, d = what each rank does,
   req = id of the talent that must be full first (the arrow). */
const TALENT_TREE = {
 "cls": "Druid",
 "build": "1.60.1.71037",
 "tabs": [
  {
   "name": "Balance",
   "bg": "druidbalance",
   "i": "spell_nature_starfall",
   "talents": [
    {
     "id": 104923,
     "n": "Improved Wrath",
     "r": 0,
     "c": 1,
     "max": 5,
     "i": "spell_nature_abolishmagic",
     "d": [
      "Reduces the cast time of your Wrath spell by 0.1 sec and its Mana cost by 10%.",
      "Reduces the cast time of your Wrath spell by 0.2 sec and its Mana cost by 20%.",
      "Reduces the cast time of your Wrath spell by 0.3 sec and its Mana cost by 30%.",
      "Reduces the cast time of your Wrath spell by 0.4 sec and its Mana cost by 40%.",
      "Reduces the cast time of your Wrath spell by 0.5 sec and its Mana cost by 50%."
     ]
    },
    {
     "id": 104924,
     "n": "Genesis",
     "r": 0,
     "c": 2,
     "max": 5,
     "i": "spell_arcane_arcane03",
     "d": [
      "Increases the periodic damage and healing done by your spells and abilities by 2%.",
      "Increases the periodic damage and healing done by your spells and abilities by 4%.",
      "Increases the periodic damage and healing done by your spells and abilities by 6%.",
      "Increases the periodic damage and healing done by your spells and abilities by 8%.",
      "Increases the periodic damage and healing done by your spells and abilities by 10%."
     ]
    },
    {
     "id": 104925,
     "n": "Moonglow",
     "r": 1,
     "c": 0,
     "max": 3,
     "i": "spell_nature_sentinal",
     "d": [
      "Reduces the Mana cost of your damaging spells by 8%.",
      "Reduces the Mana cost of your damaging spells by 17%.",
      "Reduces the Mana cost of your damaging spells by 25%."
     ]
    },
    {
     "id": 104931,
     "n": "Improved Moonfire",
     "r": 1,
     "c": 1,
     "max": 2,
     "i": "spell_nature_starfall",
     "d": [
      "Increases the damage and critical strike chance of your Moonfire spell by 5%.",
      "Increases the damage and critical strike chance of your Moonfire spell by 10%."
     ]
    },
    {
     "id": 104927,
     "n": "Nature's Majesty",
     "r": 1,
     "c": 2,
     "max": 2,
     "i": "inv_staff_01",
     "d": [
      "Increases your critical strike chance with spells and melee attacks by 2%.",
      "Increases your critical strike chance with spells and melee attacks by 4%."
     ],
     "req": 104928
    },
    {
     "id": 104929,
     "n": "Nature's Reach",
     "r": 1,
     "c": 3,
     "max": 2,
     "i": "spell_nature_naturetouchgrow",
     "d": [
      "Increases the range of your offensive Balance spells by 10% and improves your chance to hit by 2%.",
      "Increases the range of your offensive Balance spells by 20% and improves your chance to hit by 4%."
     ]
    },
    {
     "id": 104926,
     "n": "Improved Entangling Roots",
     "r": 2,
     "c": 0,
     "max": 3,
     "i": "spell_nature_stranglevines",
     "d": [
      "Increases the damage done by your Entangling Roots spell by 25%, and its victims can take up to 25% more damage without interrupting the effect.",
      "Increases the damage done by your Entangling Roots spell by 50%, and its victims can take up to 50% more damage without interrupting the effect.",
      "Increases the damage done by your Entangling Roots spell by 75%, and its victims can take up to 75% more damage without interrupting the effect."
     ]
    },
    {
     "id": 104928,
     "n": "Nature's Splendor",
     "r": 2,
     "c": 2,
     "max": 1,
     "i": "spell_nature_natureresistancetotem",
     "d": [
      "Increases the duration of your Moonfire and Rejuvenation spells by 3 sec, your Regrowth spell by 6 sec, and your Insect Swarm spell by 2 sec."
     ],
     "req": 104927
    },
    {
     "id": 104930,
     "n": "Insect Swarm",
     "r": 3,
     "c": 0,
     "max": 1,
     "i": "spell_nature_insectswarm",
     "d": [
      "The enemy target is swarmed by insects, decreasing their chance to hit with attacks by 2% and causing 48 Nature damage over 12 sec."
     ]
    },
    {
     "id": 104932,
     "n": "Vengeance",
     "r": 3,
     "c": 1,
     "max": 5,
     "i": "spell_nature_purge",
     "d": [
      "Increases the critical strike damage bonus of your Arcane and Nature spells by 20%.",
      "Increases the critical strike damage bonus of your Arcane and Nature spells by 40%.",
      "Increases the critical strike damage bonus of your Arcane and Nature spells by 60%.",
      "Increases the critical strike damage bonus of your Arcane and Nature spells by 80%.",
      "Increases the critical strike damage bonus of your Arcane and Nature spells by 100%."
     ],
     "req": 104931
    },
    {
     "id": 104933,
     "n": "Improved Starfire",
     "r": 3,
     "c": 2,
     "max": 5,
     "i": "spell_arcane_starfire",
     "d": [
      "Reduces the cast time of Starfire by 0.1 sec and Starfire has a 3% chance to stun its target for 3 sec.",
      "Reduces the cast time of Starfire by 0.2 sec and Starfire has a 6% chance to stun its target for 3 sec.",
      "Reduces the cast time of Starfire by 0.3 sec and Starfire has a 9% chance to stun its target for 3 sec.",
      "Reduces the cast time of Starfire by 0.4 sec and Starfire has a 12% chance to stun its target for 3 sec.",
      "Reduces the cast time of Starfire by 0.5 sec and Starfire has a 15% chance to stun its target for 3 sec."
     ]
    },
    {
     "id": 110844,
     "n": "Overgrowth",
     "r": 4,
     "c": 0,
     "max": 2,
     "i": "inv_misc_herb_15",
     "d": [
      "Increases the maximum number of targets you may have affected by Entangling Roots by 1.",
      "Increases the maximum number of targets you may have affected by Entangling Roots by 2."
     ]
    },
    {
     "id": 104934,
     "n": "Nature's Grace",
     "r": 4,
     "c": 1,
     "max": 1,
     "i": "spell_nature_naturesblessing",
     "d": [
      "All non-periodic spell criticals grace you with a blessing of nature, increasing your spellcasting speed and reducing your global cooldown by 10% for 3 sec."
     ]
    },
    {
     "id": 104935,
     "n": "Eclipse",
     "r": 4,
     "c": 2,
     "max": 3,
     "i": "ability_druid_eclipse",
     "d": [
      "Your Wrath spell reduces the cast time of your next 2 Starfire spells by 0.17 sec. Stores up to 4 charges. Lasts 15 sec.",
      "Your Wrath spell reduces the cast time of your next 2 Starfire spells by 0.33 sec. Stores up to 4 charges. Lasts 15 sec.",
      "Your Wrath spell reduces the cast time of your next 2 Starfire spells by 0.50 sec. Stores up to 4 charges. Lasts 15 sec."
     ]
    },
    {
     "id": 104936,
     "n": "Moonfury",
     "r": 5,
     "c": 1,
     "max": 5,
     "i": "spell_nature_moonglow",
     "d": [
      "Increases the damage done by your Arcane and Nature spells by 2%.",
      "Increases the damage done by your Arcane and Nature spells by 4%.",
      "Increases the damage done by your Arcane and Nature spells by 6%.",
      "Increases the damage done by your Arcane and Nature spells by 8%.",
      "Increases the damage done by your Arcane and Nature spells by 10%."
     ]
    },
    {
     "id": 104937,
     "n": "Moonkin Form",
     "r": 6,
     "c": 1,
     "max": 1,
     "i": "spell_nature_forceofnature",
     "d": [
      "Shapeshift into Moonkin Form, increasing Omen of Clarity's chance to trigger by 100%, Armor contribution from items by 360%, and all party or raid members within 0 yards have their Critical Strike chance increased by 3%. Also protects the caster from Polymorph effects and prevents the use of healing spells.\nThe act of shapeshifting frees the caster of Polymorph and Movement Impairing effects."
     ]
    }
   ]
  },
  {
   "name": "Feral Combat",
   "bg": "druidferalcombat",
   "i": "ability_racial_bearform",
   "talents": [
    {
     "id": 104938,
     "n": "Ferocity",
     "r": 0,
     "c": 1,
     "max": 5,
     "i": "ability_hunter_pet_hyena",
     "d": [
      "Reduces the cost of your Maul, Primal Bite, Swipe, Claw, and Rake abilities by 1 Rage or Energy.",
      "Reduces the cost of your Maul, Primal Bite, Swipe, Claw, and Rake abilities by 2 Rage or Energy.",
      "Reduces the cost of your Maul, Primal Bite, Swipe, Claw, and Rake abilities by 3 Rage or Energy.",
      "Reduces the cost of your Maul, Primal Bite, Swipe, Claw, and Rake abilities by 4 Rage or Energy.",
      "Reduces the cost of your Maul, Primal Bite, Swipe, Claw, and Rake abilities by 5 Rage or Energy."
     ]
    },
    {
     "id": 104939,
     "n": "Furor",
     "r": 0,
     "c": 2,
     "max": 5,
     "i": "spell_holy_blessingofstamina",
     "d": [
      "Gives you a 20% chance to gain 10 Rage when shapeshifting into Bear Form or Dire Bear Form. Shapeshifting into Cat Form restores 20% of the Energy you had when last in Cat Form, plus 2 Energy per second spent outside Bear Form or Dire Bear Form, up to 20 Energy.",
      "Gives you a 40% chance to gain 10 Rage when shapeshifting into Bear Form or Dire Bear Form. Shapeshifting into Cat Form restores 40% of the Energy you had when last in Cat Form, plus 4 Energy per second spent outside Bear Form or Dire Bear Form, up to 40 Energy.",
      "Gives you a 60% chance to gain 10 Rage when shapeshifting into Bear Form or Dire Bear Form. Shapeshifting into Cat Form restores 60% of the Energy you had when last in Cat Form, plus 6 Energy per second spent outside Bear Form or Dire Bear Form, up to 60 Energy.",
      "Gives you a 80% chance to gain 10 Rage when shapeshifting into Bear Form or Dire Bear Form. Shapeshifting into Cat Form restores 80% of the Energy you had when last in Cat Form, plus 8 Energy per second spent outside Bear Form or Dire Bear Form, up to 80 Energy.",
      "Gives you a 100% chance to gain 10 Rage when shapeshifting into Bear Form or Dire Bear Form. Shapeshifting into Cat Form restores 100% of the Energy you had when last in Cat Form, plus 10 Energy per second spent outside Bear Form or Dire Bear Form, up to 100 Energy."
     ]
    },
    {
     "id": 104943,
     "n": "Feral Swiftness",
     "r": 1,
     "c": 0,
     "max": 2,
     "i": "spell_nature_spiritwolf",
     "d": [
      "Increases your movement speed while in Cat Form by 15%, and increases your chance to Dodge by 2%.",
      "Increases your movement speed while in Cat Form by 30%, and increases your chance to Dodge by 4%."
     ]
    },
    {
     "id": 104940,
     "n": "Feral Instinct",
     "r": 1,
     "c": 1,
     "max": 3,
     "i": "ability_ambush",
     "d": [
      "Increases damage done by your Swipe ability by 10% and reduces the chance enemies have to detect you while Prowling as if you were 1 level higher.",
      "Increases damage done by your Swipe ability by 20% and reduces the chance enemies have to detect you while Prowling as if you were 2 levels higher.",
      "Increases damage done by your Swipe ability by 30% and reduces the chance enemies have to detect you while Prowling as if you were 3 levels higher."
     ]
    },
    {
     "id": 104941,
     "n": "Brutal Impact",
     "r": 1,
     "c": 2,
     "max": 2,
     "i": "ability_druid_bash",
     "d": [
      "Increases the stun duration of your Bash and Pounce abilities by 0.5 sec and reduces the cooldown of Bash by 15 sec.",
      "Increases the stun duration of your Bash and Pounce abilities by 1 sec and reduces the cooldown of Bash by 30 sec."
     ]
    },
    {
     "id": 104942,
     "n": "Thick Hide",
     "r": 1,
     "c": 3,
     "max": 3,
     "i": "inv_misc_pelt_bear_03",
     "d": [
      "While in Bear Form, Cat Form, Dire Bear Form, or Moonkin Form, you gain 1 additional base Armor per level and another 0.67 base Armor for each point of defense skill beyond five times your level. This amount can be further increased by multipliers from those forms.",
      "While in Bear Form, Cat Form, Dire Bear Form, or Moonkin Form, you gain 2 additional base Armor per level and another 1.33 base Armor for each point of defense skill beyond five times your level. This amount can be further increased by multipliers from those forms.",
      "While in Bear Form, Cat Form, Dire Bear Form, or Moonkin Form, you gain 3 additional base Armor per level and another 2.00 base Armor for each point of defense skill beyond five times your level. This amount can be further increased by multipliers from those forms."
     ]
    },
    {
     "id": 104945,
     "n": "Shredding Attacks",
     "r": 2,
     "c": 0,
     "max": 3,
     "i": "spell_shadow_vampiricaura",
     "d": [
      "Reduces the Energy cost of your Shred ability by 6 and reduces the Rage cost of your Lacerate ability by 1.",
      "Reduces the Energy cost of your Shred ability by 12 and reduces the Rage cost of your Lacerate ability by 2.",
      "Reduces the Energy cost of your Shred ability by 18 and reduces the Rage cost of your Lacerate ability by 3."
     ]
    },
    {
     "id": 104948,
     "n": "Savage Fury",
     "r": 2,
     "c": 1,
     "max": 2,
     "i": "ability_druid_ravage",
     "d": [
      "Increases the damage caused by your Claw, Rake, Shred, Maul, and Swipe abilities by 5%.",
      "Increases the damage caused by your Claw, Rake, Shred, Maul, and Swipe abilities by 10%."
     ]
    },
    {
     "id": 104944,
     "n": "Feral Charge",
     "r": 2,
     "c": 2,
     "max": 1,
     "i": "ability_hunter_pet_bear",
     "d": [
      "Requires Bear Form, Dire Bear Form Charge an enemy, immobilizing them and interrupting any spell they are casting for 4 sec.\n$@spelltooltip414924"
     ]
    },
    {
     "id": 104946,
     "n": "Sharpened Claws",
     "r": 2,
     "c": 3,
     "max": 2,
     "i": "inv_misc_monsterclaw_04",
     "d": [
      "Increases your critical strike chance while in Bear Form, Dire Bear Form, or Cat Form by 3%.",
      "Increases your critical strike chance while in Bear Form, Dire Bear Form, or Cat Form by 6%."
     ]
    },
    {
     "id": 104952,
     "n": "Predatory Strikes",
     "r": 3,
     "c": 0,
     "max": 3,
     "i": "ability_hunter_pet_cat",
     "d": [
      "Increases your melee Attack Power in Cat Form, Bear Form, and Dire Bear Form by 50% of your level.",
      "Increases your melee Attack Power in Cat Form, Bear Form, and Dire Bear Form by 100% of your level.",
      "Increases your melee Attack Power in Cat Form, Bear Form, and Dire Bear Form by 150% of your level."
     ]
    },
    {
     "id": 104949,
     "n": "Lacerate",
     "r": 3,
     "c": 1,
     "max": 1,
     "i": "ability_druid_lacerate",
     "d": [
      "Lacerates the enemy target, making them bleed for 20 damage over 15 sec plus 10% weapon damage per existing application of Lacerate on the target. Causes a high amount of threat. This effect stacks up to 5 times on the same target."
     ],
     "req": 104948
    },
    {
     "id": 104951,
     "n": "Predatory Discipline",
     "r": 3,
     "c": 2,
     "max": 1,
     "i": "spell_druid_savagery",
     "d": [
      "Your Ferocious Bite ability no longer converts extra Energy into damage, but still deals extra damage based on your excess Energy."
     ]
    },
    {
     "id": 104947,
     "n": "Blood Frenzy",
     "r": 3,
     "c": 3,
     "max": 2,
     "i": "ability_ghoulfrenzy",
     "d": [
      "Gives you a 50% chance to gain an additional 5 Rage any time you get a critical strike while in Bear Form or Dire Bear Form. In addition, your non-periodic critical strikes from Cat Form abilities that generate Combo Points have a 50% chance to add an additional Combo Point.",
      "Gives you a 100% chance to gain an additional 5 Rage any time you get a critical strike while in Bear Form or Dire Bear Form. In addition, your non-periodic critical strikes from Cat Form abilities that generate Combo Points have a 100% chance to add an additional Combo Point."
     ],
     "req": 104946
    },
    {
     "id": 104955,
     "n": "Leader of the Pack",
     "r": 4,
     "c": 1,
     "max": 1,
     "i": "spell_nature_unyeildingstamina",
     "d": [
      "While in Cat Form, Bear Form, or Dire Bear Form, the Leader of the Pack increases the Critical Strike chance of all party or raid members within 0 yards by 3%."
     ]
    },
    {
     "id": 104950,
     "n": "Natural Instinct",
     "r": 4,
     "c": 3,
     "max": 2,
     "i": "ability_druid_predatoryinstincts",
     "d": [
      "Increases the critical strike damage bonus of your melee abilities by 10% and increases your spell healing by 12% of your Intellect.",
      "Increases the critical strike damage bonus of your melee abilities by 20% and increases your spell healing by 25% of your Intellect."
     ]
    },
    {
     "id": 104953,
     "n": "Rend and Tear",
     "r": 5,
     "c": 0,
     "max": 5,
     "i": "ability_druid_primalagression",
     "d": [
      "Increases damage done by your melee abilities on Bleeding targets by 3%.",
      "Increases damage done by your melee abilities on Bleeding targets by 6%.",
      "Increases damage done by your melee abilities on Bleeding targets by 9%.",
      "Increases damage done by your melee abilities on Bleeding targets by 12%.",
      "Increases damage done by your melee abilities on Bleeding targets by 15%."
     ],
     "req": 104952
    },
    {
     "id": 104954,
     "n": "Natural Reaction",
     "r": 5,
     "c": 3,
     "max": 5,
     "i": "ability_bullrush",
     "d": [
      "Increases your dodge chance by 1%, and gives you a 20% chance to gain 5 Rage each time you dodge.",
      "Increases your dodge chance by 2%, and gives you a 40% chance to gain 5 Rage each time you dodge.",
      "Increases your dodge chance by 3%, and gives you a 60% chance to gain 5 Rage each time you dodge.",
      "Increases your dodge chance by 4%, and gives you a 80% chance to gain 5 Rage each time you dodge.",
      "Increases your dodge chance by 5%, and gives you a 100% chance to gain 5 Rage each time you dodge."
     ]
    },
    {
     "id": 104956,
     "n": "Primal Bite",
     "r": 6,
     "c": 1,
     "max": 1,
     "i": "ability_racial_cannibalize",
     "d": [
      "Bite the target, dealing 100% normal damage plus 42 and generating a high amount of threat."
     ],
     "req": 104955
    },
    {
     "id": 113563,
     "n": "Shifting Power",
     "r": 6,
     "c": 2,
     "max": 1,
     "i": "spell_druid_displacement",
     "d": [
      "Instantly convert 0 Mana into 0 Energy. Shifting Power's cost is reduced by effects that reduce the cost of Shapeshifting."
     ],
     "req": 104951
    }
   ]
  },
  {
   "name": "Restoration",
   "bg": "druidrestoration",
   "i": "spell_nature_healingtouch",
   "talents": [
    {
     "id": 104957,
     "n": "Nature's Focus",
     "r": 0,
     "c": 1,
     "max": 5,
     "i": "spell_nature_healingwavegreater",
     "d": [
      "Gives your Arcane and Nature spells a 14% chance to not lose casting time when you take damage.",
      "Gives your Arcane and Nature spells a 28% chance to not lose casting time when you take damage.",
      "Gives your Arcane and Nature spells a 42% chance to not lose casting time when you take damage.",
      "Gives your Arcane and Nature spells a 56% chance to not lose casting time when you take damage.",
      "Gives your Arcane and Nature spells a 70% chance to not lose casting time when you take damage."
     ]
    },
    {
     "id": 104958,
     "n": "Heart of the Wild",
     "r": 0,
     "c": 2,
     "max": 5,
     "i": "spell_holy_blessingofagility",
     "d": [
      "Increases your Intellect by 2%. In addition, while in Bear Form or Dire Bear Form your Stamina is increased by 4% and while in Cat Form your Strength is increased by 2%.",
      "Increases your Intellect by 4%. In addition, while in Bear Form or Dire Bear Form your Stamina is increased by 8% and while in Cat Form your Strength is increased by 4%.",
      "Increases your Intellect by 6%. In addition, while in Bear Form or Dire Bear Form your Stamina is increased by 12% and while in Cat Form your Strength is increased by 6%.",
      "Increases your Intellect by 8%. In addition, while in Bear Form or Dire Bear Form your Stamina is increased by 16% and while in Cat Form your Strength is increased by 8%.",
      "Increases your Intellect by 10%. In addition, while in Bear Form or Dire Bear Form your Stamina is increased by 20% and while in Cat Form your Strength is increased by 10%."
     ]
    },
    {
     "id": 104922,
     "n": "Naturalist",
     "r": 1,
     "c": 0,
     "max": 5,
     "i": "spell_nature_healingtouch",
     "d": [
      "Reduces the cast time of your Healing Touch and Wild Growth spells by 0.1 sec and increases all damage you deal by 2%.",
      "Reduces the cast time of your Healing Touch and Wild Growth spells by 0.2 sec and increases all damage you deal by 4%.",
      "Reduces the cast time of your Healing Touch and Wild Growth spells by 0.3 sec and increases all damage you deal by 6%.",
      "Reduces the cast time of your Healing Touch and Wild Growth spells by 0.4 sec and increases all damage you deal by 8%.",
      "Reduces the cast time of your Healing Touch and Wild Growth spells by 0.5 sec and increases all damage you deal by 10%."
     ]
    },
    {
     "id": 104920,
     "n": "Reflection",
     "r": 1,
     "c": 1,
     "max": 3,
     "i": "spell_frost_windwalkon",
     "d": [
      "Allows 17% of your Mana regeneration to continue while casting.",
      "Allows 33% of your Mana regeneration to continue while casting.",
      "Allows 50% of your Mana regeneration to continue while casting."
     ]
    },
    {
     "id": 104919,
     "n": "Natural Shapeshifter",
     "r": 1,
     "c": 2,
     "max": 3,
     "i": "spell_nature_wispsplode",
     "d": [
      "Reduces the mana cost of all shapeshifting by 10%.",
      "Reduces the mana cost of all shapeshifting by 20%.",
      "Reduces the mana cost of all shapeshifting by 30%."
     ]
    },
    {
     "id": 104917,
     "n": "Subtlety",
     "r": 2,
     "c": 1,
     "max": 3,
     "i": "ability_eyeoftheowl",
     "d": [
      "Reduces the threat generated by your Nature and Arcane spells by 10%.",
      "Reduces the threat generated by your Nature and Arcane spells by 20%.",
      "Reduces the threat generated by your Nature and Arcane spells by 30%."
     ]
    },
    {
     "id": 104916,
     "n": "Gift of Nature",
     "r": 2,
     "c": 2,
     "max": 5,
     "i": "spell_nature_protectionformnature",
     "d": [
      "Increases the effect of all your healing spells by 2%.",
      "Increases the effect of all your healing spells by 4%.",
      "Increases the effect of all your healing spells by 6%.",
      "Increases the effect of all your healing spells by 8%.",
      "Increases the effect of all your healing spells by 10%."
     ]
    },
    {
     "id": 104918,
     "n": "Bloom",
     "r": 2,
     "c": 3,
     "max": 1,
     "i": "inv_misc_herb_felblossom",
     "d": [
      "When your Rejuvenation or Regrowth spell expires due to its duration, the target is instantly healed for an amount equal to 100% of your Spirit. If either spell expires due to being dispelled, the target is healed for 50% of your Spirit instead."
     ]
    },
    {
     "id": 104915,
     "n": "Tranquil Spirit",
     "r": 3,
     "c": 1,
     "max": 5,
     "i": "spell_holy_elunesgrace",
     "d": [
      "Reduces the mana cost of your Healing Touch and Tranquility spells by 2%.",
      "Reduces the mana cost of your Healing Touch and Tranquility spells by 4%.",
      "Reduces the mana cost of your Healing Touch and Tranquility spells by 6%.",
      "Reduces the mana cost of your Healing Touch and Tranquility spells by 8%.",
      "Reduces the mana cost of your Healing Touch and Tranquility spells by 10%."
     ]
    },
    {
     "id": 104914,
     "n": "Improved Rejuvenation",
     "r": 3,
     "c": 2,
     "max": 3,
     "i": "spell_nature_rejuvenation",
     "d": [
      "Increases the effect of your Rejuvenation spell by 5%.",
      "Increases the effect of your Rejuvenation spell by 10%.",
      "Increases the effect of your Rejuvenation spell by 15%."
     ]
    },
    {
     "id": 104912,
     "n": "Swiftmend",
     "r": 3,
     "c": 3,
     "max": 1,
     "i": "inv_relics_idolofrejuvenation",
     "d": [
      "Instantly heals a target with your active Rejuvenation or Regrowth effect for an amount equal to the full duration of the periodic effect."
     ]
    },
    {
     "id": 104921,
     "n": "Nature's Swiftness",
     "r": 4,
     "c": 0,
     "max": 1,
     "i": "spell_nature_ravenform",
     "d": [
      "When activated, your next Nature spell becomes an instant cast spell."
     ],
     "req": 104922
    },
    {
     "id": 104911,
     "n": "Living Spirit",
     "r": 4,
     "c": 1,
     "max": 3,
     "i": "spell_nature_giftofthewaterspirit",
     "d": [
      "Increases your Spirit by 5%.",
      "Increases your Spirit by 10%.",
      "Increases your Spirit by 15%."
     ]
    },
    {
     "id": 104909,
     "n": "Improved Tranquility",
     "r": 4,
     "c": 3,
     "max": 2,
     "i": "spell_nature_tranquility",
     "d": [
      "Reduces threat caused by Tranquility by 50% and its cooldown by 30%.",
      "Reduces threat caused by Tranquility by 100% and its cooldown by 60%."
     ]
    },
    {
     "id": 104913,
     "n": "Improved Regrowth",
     "r": 5,
     "c": 2,
     "max": 5,
     "i": "spell_nature_resistnature",
     "d": [
      "Increases the critical effect chance of your Regrowth spell by 10%.",
      "Increases the critical effect chance of your Regrowth spell by 20%.",
      "Increases the critical effect chance of your Regrowth spell by 30%.",
      "Increases the critical effect chance of your Regrowth spell by 40%.",
      "Increases the critical effect chance of your Regrowth spell by 50%."
     ],
     "req": 104914
    },
    {
     "id": 104910,
     "n": "Wild Growth",
     "r": 6,
     "c": 1,
     "max": 1,
     "i": "ability_druid_flourish",
     "d": [
      "Heals the target and their party for 280 over 7 sec. Party members must be within 0 yards of target. The amount healed is applied quickly at first, and slows down as Wild Growth reaches its full duration."
     ],
     "req": 104911
    }
   ]
  }
 ]
};
