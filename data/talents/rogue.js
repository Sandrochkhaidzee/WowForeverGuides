/* Rogue talent trees in WoW: Forever (game build 1.60.1.71037).
   Made by tools/extract-talents.py from the game's own files: don't edit by hand.
   r/c = row and column in the tree, max = ranks, i = icon, d = what each rank does,
   req = id of the talent that must be full first (the arrow). */
const TALENT_TREE = {
 "cls": "Rogue",
 "build": "1.60.1.71037",
 "tabs": [
  {
   "name": "Assassination",
   "bg": "rogueassassination",
   "i": "ability_rogue_eviscerate",
   "talents": [
    {
     "id": 105742,
     "n": "Improved Gouge",
     "r": 0,
     "c": 0,
     "max": 3,
     "i": "ability_gouge",
     "d": [
      "Increases the duration of your Gouge ability by 0.5 sec.",
      "Increases the duration of your Gouge ability by 1 sec.",
      "Increases the duration of your Gouge ability by 1.5 sec."
     ]
    },
    {
     "id": 105723,
     "n": "Remorseless Attacks",
     "r": 0,
     "c": 1,
     "max": 2,
     "i": "ability_fiegndead",
     "d": [
      "After killing a non-trivial enemy, gives you a 20% increased critical strike chance on your next Sinister Strike, Backstab, Ambush, Mutilate, or Ghostly Strike. Lasts 20 sec.",
      "After killing a non-trivial enemy, gives you a 40% increased critical strike chance on your next Sinister Strike, Backstab, Ambush, Mutilate, or Ghostly Strike. Lasts 20 sec."
     ]
    },
    {
     "id": 105722,
     "n": "Malice",
     "r": 0,
     "c": 2,
     "max": 5,
     "i": "ability_racial_bloodrage",
     "d": [
      "Increases your critical strike chance with all attacks and Poisons by 1%.",
      "Increases your critical strike chance with all attacks and Poisons by 2%.",
      "Increases your critical strike chance with all attacks and Poisons by 3%.",
      "Increases your critical strike chance with all attacks and Poisons by 4%.",
      "Increases your critical strike chance with all attacks and Poisons by 5%."
     ]
    },
    {
     "id": 105721,
     "n": "Ruthlessness",
     "r": 1,
     "c": 0,
     "max": 3,
     "i": "ability_druid_disembowel",
     "d": [
      "Gives your finishing moves a 20% chance to add a Combo Point to your target.",
      "Gives your finishing moves a 40% chance to add a Combo Point to your target.",
      "Gives your finishing moves a 60% chance to add a Combo Point to your target."
     ]
    },
    {
     "id": 105717,
     "n": "Improved Expose Armor",
     "r": 1,
     "c": 1,
     "max": 2,
     "i": "ability_warrior_riposte",
     "d": [
      "Reduces the Energy cost of your Expose Armor ability by 5, and refunds 1 Combo Point when cast with 5 Combo Points.",
      "Reduces the Energy cost of your Expose Armor ability by 10, and refunds 2 Combo Points when cast with 5 Combo Points."
     ]
    },
    {
     "id": 105739,
     "n": "Improved Slice and Dice",
     "r": 1,
     "c": 3,
     "max": 3,
     "i": "ability_rogue_slicedice",
     "d": [
      "Increases the duration of your Slice and Dice ability by 15%.",
      "Increases the duration of your Slice and Dice ability by 30%.",
      "Increases the duration of your Slice and Dice ability by 45%."
     ]
    },
    {
     "id": 105720,
     "n": "Vigor",
     "r": 2,
     "c": 0,
     "max": 2,
     "i": "spell_nature_earthbindtotem",
     "d": [
      "Increases your maximum Energy by 5.",
      "Increases your maximum Energy by 10."
     ]
    },
    {
     "id": 105718,
     "n": "Blood Splatter",
     "r": 2,
     "c": 1,
     "max": 1,
     "i": "ability_rogue_rupture",
     "d": [
      "Increases the duration of your Rupture ability by 6 sec and your Garrote ability by 9 sec."
     ]
    },
    {
     "id": 105716,
     "n": "Lethality",
     "r": 2,
     "c": 2,
     "max": 2,
     "i": "ability_criticalstrike",
     "d": [
      "Increases the critical strike damage bonus of your Sinister Strike, Gouge, Backstab, Mutilate, Ghostly Strike, and Hemorrhage abilities by 10%.",
      "Increases the critical strike damage bonus of your Sinister Strike, Gouge, Backstab, Mutilate, Ghostly Strike, and Hemorrhage abilities by 20%."
     ],
     "req": 105722
    },
    {
     "id": 105714,
     "n": "Vile Poisons",
     "r": 3,
     "c": 0,
     "max": 5,
     "i": "ability_rogue_feigndeath",
     "d": [
      "Increases the damage dealt by your poisons by 4% and gives your poisons an additional 8% chance to resist dispel effects.",
      "Increases the damage dealt by your poisons by 8% and gives your poisons an additional 16% chance to resist dispel effects.",
      "Increases the damage dealt by your poisons by 12% and gives your poisons an additional 24% chance to resist dispel effects.",
      "Increases the damage dealt by your poisons by 16% and gives your poisons an additional 32% chance to resist dispel effects.",
      "Increases the damage dealt by your poisons by 20% and gives your poisons an additional 40% chance to resist dispel effects."
     ]
    },
    {
     "id": 105715,
     "n": "Cold Blood",
     "r": 3,
     "c": 1,
     "max": 1,
     "i": "spell_ice_lament",
     "d": [
      "When activated, increases the critical strike chance of your next Sinister Strike, Backstab, Ambush, Eviscerate, or Mutilate by 100%."
     ]
    },
    {
     "id": 105713,
     "n": "Improved Poisons",
     "r": 3,
     "c": 2,
     "max": 5,
     "i": "ability_poisons",
     "d": [
      "Increases the chance to apply Poisons to your target by 2%, and gives Poison applications a 10% chance to not consume a charge.",
      "Increases the chance to apply Poisons to your target by 4%, and gives Poison applications a 20% chance to not consume a charge.",
      "Increases the chance to apply Poisons to your target by 6%, and gives Poison applications a 30% chance to not consume a charge.",
      "Increases the chance to apply Poisons to your target by 8%, and gives Poison applications a 40% chance to not consume a charge.",
      "Increases the chance to apply Poisons to your target by 10%, and gives Poison applications a 50% chance to not consume a charge."
     ]
    },
    {
     "id": 113633,
     "n": "Relentless Strikes",
     "r": 4,
     "c": 0,
     "max": 5,
     "i": "ability_warrior_decisivestrike",
     "d": [
      "Your finishing moves have a 4% chance per Combo Point to restore 25 Energy.",
      "Your finishing moves have a 8% chance per Combo Point to restore 25 Energy.",
      "Your finishing moves have a 12% chance per Combo Point to restore 25 Energy.",
      "Your finishing moves have a 16% chance per Combo Point to restore 25 Energy.",
      "Your finishing moves have a 20% chance per Combo Point to restore 25 Energy."
     ]
    },
    {
     "id": 105712,
     "n": "Venom",
     "r": 4,
     "c": 1,
     "max": 1,
     "i": "inv_sword_31",
     "d": [
      "Causes your Shank ability to increase your Poison damage by 30% and your chance to apply Poisons by 20% for 6 sec."
     ]
    },
    {
     "id": 105711,
     "n": "Improved Kidney Shot",
     "r": 4,
     "c": 2,
     "max": 2,
     "i": "ability_rogue_kidneyshot",
     "d": [
      "Enemies Stunned by your Kidney Shot ability take 5% increased damage from your poisons and attacks.",
      "Enemies Stunned by your Kidney Shot ability take 10% increased damage from your poisons and attacks."
     ]
    },
    {
     "id": 105710,
     "n": "Seal Fate",
     "r": 5,
     "c": 2,
     "max": 3,
     "i": "spell_shadow_chilltouch",
     "d": [
      "Your critical strikes from abilities that add Combo Points have a 33% chance to add an additional Combo Point.",
      "Your critical strikes from abilities that add Combo Points have a 66% chance to add an additional Combo Point.",
      "Your critical strikes from abilities that add Combo Points have a 100% chance to add an additional Combo Point."
     ]
    },
    {
     "id": 105709,
     "n": "Mutilate",
     "r": 6,
     "c": 1,
     "max": 1,
     "i": "ability_rogue_deadlybrew",
     "d": [
      "Instantly attacks with both weapons for 90% weapon damage plus an additional 39.6 with each weapon. Damage increased by 20% against Poisoned targets. Awards 2 Combo Points."
     ],
     "req": 105712
    }
   ]
  },
  {
   "name": "Combat",
   "bg": "roguecombat",
   "i": "ability_backstab",
   "talents": [
    {
     "id": 105708,
     "n": "Coup de Grace",
     "r": 0,
     "c": 0,
     "max": 3,
     "i": "ability_rogue_eviscerate",
     "d": [
      "Increases the damage done by your Eviscerate ability by 7%, and the damage and storage rate of your Death Mark ability by 7%.",
      "Increases the damage done by your Eviscerate ability by 13%, and the damage and storage rate of your Death Mark ability by 13%.",
      "Increases the damage done by your Eviscerate ability by 20%, and the damage and storage rate of your Death Mark ability by 20%."
     ]
    },
    {
     "id": 105741,
     "n": "Efficient Strikes",
     "r": 0,
     "c": 1,
     "max": 2,
     "i": "spell_shadow_ritualofsacrifice",
     "d": [
      "Reduces the Energy cost of your Sinister Strike and Hemorrhage abilities by 3.",
      "Reduces the Energy cost of your Sinister Strike and Hemorrhage abilities by 5."
     ]
    },
    {
     "id": 113398,
     "n": "Lightning Reflexes",
     "r": 0,
     "c": 2,
     "max": 5,
     "i": "spell_nature_invisibilty",
     "d": [
      "Increases your Dodge chance by 1%.",
      "Increases your Dodge chance by 2%.",
      "Increases your Dodge chance by 3%.",
      "Increases your Dodge chance by 4%.",
      "Increases your Dodge chance by 5%."
     ]
    },
    {
     "id": 105719,
     "n": "Puncturing Wounds",
     "r": 1,
     "c": 0,
     "max": 3,
     "i": "ability_backstab",
     "d": [
      "Increases the critical strike chance of your Backstab by 10% and your Mutilate by 5%, and gives Backstab a 15% chance to add an additional Combo Point.",
      "Increases the critical strike chance of your Backstab by 20% and your Mutilate by 10%, and gives Backstab a 30% chance to add an additional Combo Point.",
      "Increases the critical strike chance of your Backstab by 30% and your Mutilate by 15%, and gives Backstab a 45% chance to add an additional Combo Point."
     ]
    },
    {
     "id": 105738,
     "n": "Deflection",
     "r": 1,
     "c": 1,
     "max": 3,
     "i": "ability_parry",
     "d": [
      "Increases your Parry chance by 2%.",
      "Increases your Parry chance by 4%.",
      "Increases your Parry chance by 6%."
     ]
    },
    {
     "id": 105737,
     "n": "Precision",
     "r": 1,
     "c": 2,
     "max": 3,
     "i": "ability_marksmanship",
     "d": [
      "Improves your chance to hit by 1%.",
      "Improves your chance to hit by 2%.",
      "Improves your chance to hit by 3%."
     ]
    },
    {
     "id": 105732,
     "n": "Improved Sprint",
     "r": 1,
     "c": 3,
     "max": 2,
     "i": "ability_rogue_sprint",
     "d": [
      "Gives a 50% chance to remove all movement impairing effects when you activate your Sprint ability.",
      "Gives a 100% chance to remove all movement impairing effects when you activate your Sprint ability."
     ]
    },
    {
     "id": 105736,
     "n": "Endurance",
     "r": 2,
     "c": 0,
     "max": 2,
     "i": "spell_shadow_shadowward",
     "d": [
      "Reduces the cooldown of your Sprint and Evasion abilities by 30%.",
      "Reduces the cooldown of your Sprint and Evasion abilities by 60%."
     ]
    },
    {
     "id": 105735,
     "n": "Riposte",
     "r": 2,
     "c": 1,
     "max": 1,
     "i": "ability_warrior_challange",
     "d": [
      "A strike that becomes active after parrying an opponent's attack. This attack deals 150% weapon damage and disarms the target for ."
     ],
     "req": 105738
    },
    {
     "id": 105759,
     "n": "Composure",
     "r": 2,
     "c": 3,
     "max": 2,
     "i": "ability_rogue_fleetfooted",
     "d": [
      "Increases the Energy cost reduction of your Poised ability by 5.",
      "Increases the Energy cost reduction of your Poised ability by 10."
     ]
    },
    {
     "id": 105733,
     "n": "Improved Kick",
     "r": 3,
     "c": 0,
     "max": 2,
     "i": "ability_kick",
     "d": [
      "Gives your Kick ability a 50% chance to Silence the target for 2 sec.",
      "Gives your Kick ability a 100% chance to Silence the target for 2 sec."
     ]
    },
    {
     "id": 108100,
     "n": "Flawless Execution",
     "r": 3,
     "c": 1,
     "max": 1,
     "i": "inv_sword_35",
     "d": [
      "Reduces the Energy cost of your Eviscerate ability by 15."
     ]
    },
    {
     "id": 105726,
     "n": "Weapon Expertise",
     "r": 3,
     "c": 2,
     "max": 2,
     "i": "spell_holy_blessingofstrength",
     "d": [
      "Reduces the chance for your attacks to be Dodged or Parried by 1%.",
      "Reduces the chance for your attacks to be Dodged or Parried by 2%."
     ],
     "req": 105737
    },
    {
     "id": 105730,
     "n": "Aggression",
     "r": 3,
     "c": 3,
     "max": 3,
     "i": "ability_racial_avatar",
     "d": [
      "Increases the damage of your Sinister Strike and Eviscerate abilities by 5%.",
      "Increases the damage of your Sinister Strike and Eviscerate abilities by 10%.",
      "Increases the damage of your Sinister Strike and Eviscerate abilities by 15%."
     ]
    },
    {
     "id": 113635,
     "n": "Dual Wield Specialization",
     "r": 4,
     "c": 0,
     "max": 2,
     "i": "ability_dualwield",
     "d": [
      "Increases the damage done by your off-hand weapon by 25%.",
      "Increases the damage done by your off-hand weapon by 50%."
     ]
    },
    {
     "id": 105728,
     "n": "Blade Flurry",
     "r": 4,
     "c": 1,
     "max": 1,
     "i": "ability_warrior_punishingblow",
     "d": [
      "Increases your melee attack speed by 20% and your melee attacks strike an additional nearby opponent. Lasts 15 sec."
     ]
    },
    {
     "id": 105727,
     "n": "Hack and Slash",
     "r": 4,
     "c": 2,
     "max": 5,
     "i": "inv_sword_27",
     "d": [
      "Gives your melee weapon attacks a benefit depending on the weapon.\nAxe/Sword: Your successful melee attacks have a 1% chance to trigger an extra attack on the target.\nDagger/Fist: Increases your critical strike chance by 1%.\nMace: Your attacks ignore 3% of your target's armor.",
      "Gives your melee weapon attacks a benefit depending on the weapon.\nAxe/Sword: Your successful melee attacks have a 2% chance to trigger an extra attack on the target.\nDagger/Fist: Increases your critical strike chance by 2%.\nMace: Your attacks ignore 6% of your target's armor.",
      "Gives your melee weapon attacks a benefit depending on the weapon.\nAxe/Sword: Your successful melee attacks have a 3% chance to trigger an extra attack on the target.\nDagger/Fist: Increases your critical strike chance by 3%.\nMace: Your attacks ignore 9% of your target's armor.",
      "Gives your melee weapon attacks a benefit depending on the weapon.\nAxe/Sword: Your successful melee attacks have a 4% chance to trigger an extra attack on the target.\nDagger/Fist: Increases your critical strike chance by 4%.\nMace: Your attacks ignore 12% of your target's armor.",
      "Gives your melee weapon attacks a benefit depending on the weapon.\nAxe/Sword: Your successful melee attacks have a 5% chance to trigger an extra attack on the target.\nDagger/Fist: Increases your critical strike chance by 5%.\nMace: Your attacks ignore 15% of your target's armor."
     ]
    },
    {
     "id": 105740,
     "n": "Flash of Steel",
     "r": 5,
     "c": 2,
     "max": 5,
     "i": "ability_rogue_restlessblades",
     "d": [
      "Increases the Energy generated by your Shank ability by 3 and reduces its cooldown by 0.4 sec.",
      "Increases the Energy generated by your Shank ability by 6 and reduces its cooldown by 0.8 sec.",
      "Increases the Energy generated by your Shank ability by 9 and reduces its cooldown by 1.2 sec.",
      "Increases the Energy generated by your Shank ability by 12 and reduces its cooldown by 1.6 sec.",
      "Increases the Energy generated by your Shank ability by 15 and reduces its cooldown by 2.0 sec."
     ]
    },
    {
     "id": 105724,
     "n": "Adrenaline Rush",
     "r": 6,
     "c": 1,
     "max": 1,
     "i": "spell_shadow_shadowworddominate",
     "d": [
      "Increases your Energy regeneration rate by 100% for 15 sec."
     ],
     "req": 105728
    }
   ]
  },
  {
   "name": "Subtlety",
   "bg": "roguesubtlety",
   "i": "ability_stealth",
   "talents": [
    {
     "id": 105751,
     "n": "Setup",
     "r": 0,
     "c": 0,
     "max": 3,
     "i": "spell_nature_mirrorimage",
     "d": [
      "Gives you a 15% chance to add a Combo Point to your target after Dodging their attack or fully resisting one of their spells.",
      "Gives you a 30% chance to add a Combo Point to your target after Dodging their attack or fully resisting one of their spells.",
      "Gives you a 45% chance to add a Combo Point to your target after Dodging their attack or fully resisting one of their spells."
     ]
    },
    {
     "id": 105761,
     "n": "Master of Deception",
     "r": 0,
     "c": 1,
     "max": 3,
     "i": "spell_shadow_charm",
     "d": [
      "Reduces the chance enemies have to detect you while in Stealth mode as if you were 1 level higher.",
      "Reduces the chance enemies have to detect you while in Stealth mode as if you were 2 levels higher.",
      "Reduces the chance enemies have to detect you while in Stealth mode as if you were 3 levels higher."
     ]
    },
    {
     "id": 105760,
     "n": "Opportunity",
     "r": 0,
     "c": 2,
     "max": 5,
     "i": "ability_warrior_warcry",
     "d": [
      "Increases the damage dealt by your Backstab, Garrote, Ambush, and Mutilate abilities by 4%.",
      "Increases the damage dealt by your Backstab, Garrote, Ambush, and Mutilate abilities by 8%.",
      "Increases the damage dealt by your Backstab, Garrote, Ambush, and Mutilate abilities by 12%.",
      "Increases the damage dealt by your Backstab, Garrote, Ambush, and Mutilate abilities by 16%.",
      "Increases the damage dealt by your Backstab, Garrote, Ambush, and Mutilate abilities by 20%."
     ]
    },
    {
     "id": 105745,
     "n": "Dirty Deeds",
     "r": 1,
     "c": 0,
     "max": 2,
     "i": "spell_shadow_summonsuccubus",
     "d": [
      "Reduces the Energy cost of your Cheap Shot and Garrote abilities by 10, and your Garrote ability no longer requires you to be behind your target.",
      "Reduces the Energy cost of your Cheap Shot and Garrote abilities by 20, and your Garrote ability no longer requires you to be behind your target."
     ]
    },
    {
     "id": 105756,
     "n": "Camouflage",
     "r": 1,
     "c": 1,
     "max": 3,
     "i": "ability_stealth",
     "d": [
      "Reduces your speed penalty from your Stealth ability by 5% and reduces its cooldown by 2 sec.",
      "Reduces your speed penalty from your Stealth ability by 10% and reduces its cooldown by 4 sec.",
      "Reduces your speed penalty from your Stealth ability by 15% and reduces its cooldown by 6 sec."
     ]
    },
    {
     "id": 105749,
     "n": "Improved Ambush",
     "r": 1,
     "c": 2,
     "max": 3,
     "i": "ability_rogue_ambush",
     "d": [
      "Increases the critical strike chance of your Ambush ability by 15%.",
      "Increases the critical strike chance of your Ambush ability by 30%.",
      "Increases the critical strike chance of your Ambush ability by 45%."
     ]
    },
    {
     "id": 105757,
     "n": "Dirty Tricks",
     "r": 1,
     "c": 3,
     "max": 2,
     "i": "ability_sap",
     "d": [
      "Reduces the Energy cost of your Sap and Blind abilities by 25%.",
      "Reduces the Energy cost of your Sap and Blind abilities by 50%."
     ]
    },
    {
     "id": 105755,
     "n": "Initiative",
     "r": 2,
     "c": 0,
     "max": 3,
     "i": "spell_shadow_fumble",
     "d": [
      "Gives you a 33% chance to add an additional combo point to your target when using your Ambush, Garrote, or Cheap Shot ability.",
      "Gives you a 67% chance to add an additional combo point to your target when using your Ambush, Garrote, or Cheap Shot ability.",
      "Gives you a 100% chance to add an additional combo point to your target when using your Ambush, Garrote, or Cheap Shot ability."
     ]
    },
    {
     "id": 105743,
     "n": "Premeditation",
     "r": 2,
     "c": 1,
     "max": 1,
     "i": "spell_shadow_possession",
     "d": [
      "Adds 2 Combo Points to your target. You must add to or use those combo points within 20 sec or the combo points are lost."
     ]
    },
    {
     "id": 105752,
     "n": "Serrated Blades",
     "r": 2,
     "c": 2,
     "max": 3,
     "i": "inv_sword_17",
     "d": [
      "Causes your attacks to ignore 3% of your target's Armor and increases the damage dealt by your Rupture ability by 10%.",
      "Causes your attacks to ignore 6% of your target's Armor and increases the damage dealt by your Rupture ability by 20%.",
      "Causes your attacks to ignore 9% of your target's Armor and increases the damage dealt by your Rupture ability by 30%."
     ]
    },
    {
     "id": 105753,
     "n": "Elusiveness",
     "r": 3,
     "c": 0,
     "max": 2,
     "i": "spell_magic_lesserinvisibilty",
     "d": [
      "Reduces the cooldown of your Vanish and Blind abilities by 45 sec.",
      "Reduces the cooldown of your Vanish and Blind abilities by 90 sec."
     ]
    },
    {
     "id": 105754,
     "n": "Ghostly Strike",
     "r": 3,
     "c": 1,
     "max": 1,
     "i": "spell_shadow_curse",
     "d": [
      "A strike that deals 125% (180% if a Dagger is equipped in your Main Hand) weapon damage, increases your chance to dodge by 15% for 7 sec, and causes your next Ambush or Garrote cast within 7 sec to not require Stealth. Awards 1 combo point."
     ]
    },
    {
     "id": 110867,
     "n": "Quick Getaway",
     "r": 3,
     "c": 3,
     "max": 2,
     "i": "ability_rogue_blackjack",
     "d": [
      "Increases the maximum number of targets you may have Sapped by 1, and increases your movement speed by 15% for 3 sec after Sapping a target.",
      "Increases the maximum number of targets you may have Sapped by 1, and increases your movement speed by 30% for 3 sec after Sapping a target."
     ],
     "req": 105757
    },
    {
     "id": 105747,
     "n": "Heightened Senses",
     "r": 4,
     "c": 0,
     "max": 2,
     "i": "ability_ambush",
     "d": [
      "Increases your Stealth detection as if you were 1 level higher and reduces your chance to be hit by spells and ranged attacks by 2%.",
      "Increases your Stealth detection as if you were 3 levels higher and reduces your chance to be hit by spells and ranged attacks by 4%."
     ]
    },
    {
     "id": 105746,
     "n": "Preparation",
     "r": 4,
     "c": 1,
     "max": 1,
     "i": "spell_shadow_antishadow",
     "d": [
      "When activated, this ability immediately finishes the cooldown on your other Rogue abilities."
     ]
    },
    {
     "id": 105748,
     "n": "Hemorrhage",
     "r": 4,
     "c": 2,
     "max": 1,
     "i": "spell_shadow_lifedrain",
     "d": [
      "An instant strike that deals 100% weapon damage (145% if a Dagger is equipped) and causes the target to take 15% increased Rupture and Garrote damage from the Rogue. Lasts 15 sec. Awards 1 Combo Point."
     ],
     "req": 105752
    },
    {
     "id": 105750,
     "n": "Boot Knife",
     "r": 5,
     "c": 2,
     "max": 5,
     "i": "inv_sword_32",
     "d": [
      "Grants your Shank ability a 20% chance to add 2 Combo Points to the target.",
      "Grants your Shank ability a 40% chance to add 2 Combo Points to the target.",
      "Grants your Shank ability a 60% chance to add 2 Combo Points to the target.",
      "Grants your Shank ability a 80% chance to add 2 Combo Points to the target.",
      "Grants your Shank ability a 100% chance to add 2 Combo Points to the target."
     ]
    },
    {
     "id": 110866,
     "n": "Death Mark",
     "r": 6,
     "c": 1,
     "max": 1,
     "i": "ability_creature_cursed_02",
     "d": [
      "Finishing move that marks the target, storing a portion of the damage dealt by your attacks per Combo Point. Garrote and Rupture damage is stored at twice the rate. After 6 sec, the stored damage is dealt, up to a maximum increased by Attack Power and Critical Strike chance: 1 point : 0% stored, 0 damage cap 2 points: 0% stored, 0 damage cap 3 points: 0% stored, 0 damage cap 4 points: 0% stored, 0 damage cap 5 points: 0% stored, 0 damage cap"
     ],
     "req": 105746
    }
   ]
  }
 ]
};
