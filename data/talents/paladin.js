/* Paladin talent trees in WoW: Forever (game build 1.60.1.71037).
   Made by tools/extract-talents.py from the game's own files: don't edit by hand.
   r/c = row and column in the tree, max = ranks, i = icon, d = what each rank does,
   req = id of the talent that must be full first (the arrow). */
const TALENT_TREE = {
 "cls": "Paladin",
 "build": "1.60.1.71037",
 "tabs": [
  {
   "name": "Holy",
   "bg": "paladinholy",
   "i": "spell_holy_holybolt",
   "talents": [
    {
     "id": 105335,
     "n": "Spiritual Focus",
     "r": 0,
     "c": 1,
     "max": 5,
     "i": "spell_arcane_blink",
     "d": [
      "Gives your Flash of Light, Holy Light, and Light's Vigil spells a 14% chance to not lose casting time when you take damage.",
      "Gives your Flash of Light, Holy Light, and Light's Vigil spells a 28% chance to not lose casting time when you take damage.",
      "Gives your Flash of Light, Holy Light, and Light's Vigil spells a 42% chance to not lose casting time when you take damage.",
      "Gives your Flash of Light, Holy Light, and Light's Vigil spells a 56% chance to not lose casting time when you take damage.",
      "Gives your Flash of Light, Holy Light, and Light's Vigil spells a 70% chance to not lose casting time when you take damage."
     ]
    },
    {
     "id": 113630,
     "n": "Divine Strength",
     "r": 0,
     "c": 2,
     "max": 5,
     "i": "ability_golemthunderclap",
     "d": [
      "Increases your Strength by 2%.",
      "Increases your Strength by 4%.",
      "Increases your Strength by 6%.",
      "Increases your Strength by 8%.",
      "Increases your Strength by 10%."
     ]
    },
    {
     "id": 105333,
     "n": "Healing Light",
     "r": 1,
     "c": 0,
     "max": 3,
     "i": "spell_holy_holybolt",
     "d": [
      "Increases the amount healed by your Holy Light, Flash of Light, and Holy Shock spells by 4%.",
      "Increases the amount healed by your Holy Light, Flash of Light, and Holy Shock spells by 8%.",
      "Increases the amount healed by your Holy Light, Flash of Light, and Holy Shock spells by 12%."
     ]
    },
    {
     "id": 110871,
     "n": "Reverence",
     "r": 1,
     "c": 1,
     "max": 2,
     "i": "spell_holy_divineillumination",
     "d": [
      "Allows 15% of your Mana regeneration to continue while casting.",
      "Allows 30% of your Mana regeneration to continue while casting."
     ]
    },
    {
     "id": 105334,
     "n": "Improved Seals",
     "r": 1,
     "c": 2,
     "max": 5,
     "i": "ability_thunderbolt",
     "d": [
      "Increases the damage done by your Seals and Judgements by 3%.",
      "Increases the damage done by your Seals and Judgements by 6%.",
      "Increases the damage done by your Seals and Judgements by 9%.",
      "Increases the damage done by your Seals and Judgements by 12%.",
      "Increases the damage done by your Seals and Judgements by 15%."
     ]
    },
    {
     "id": 105327,
     "n": "Purifying Power",
     "r": 1,
     "c": 3,
     "max": 2,
     "i": "spell_holy_purifyingpower",
     "d": [
      "Reduces the mana cost of your Cleanse and Purify spells by 10% and reduces the cooldown of your Exorcism and Holy Wrath spells by 17%.",
      "Reduces the mana cost of your Cleanse and Purify spells by 20% and reduces the cooldown of your Exorcism and Holy Wrath spells by 33%."
     ]
    },
    {
     "id": 105325,
     "n": "Divine Favor",
     "r": 2,
     "c": 0,
     "max": 1,
     "i": "spell_holy_heal",
     "d": [
      "When activated, gives your next Flash of Light, Holy Light, or Holy Shock spell a 100% critical effect chance."
     ]
    },
    {
     "id": 105329,
     "n": "Illumination",
     "r": 2,
     "c": 1,
     "max": 5,
     "i": "spell_holy_greaterheal",
     "d": [
      "After getting a critical effect from your Flash of Light, Holy Light, Light's Vigil, or Holy Shock heal spell you have a 20% chance to gain Mana equal to 50% of the base cost of the spell.",
      "After getting a critical effect from your Flash of Light, Holy Light, Light's Vigil, or Holy Shock heal spell you have a 40% chance to gain Mana equal to 50% of the base cost of the spell.",
      "After getting a critical effect from your Flash of Light, Holy Light, Light's Vigil, or Holy Shock heal spell you have a 60% chance to gain Mana equal to 50% of the base cost of the spell.",
      "After getting a critical effect from your Flash of Light, Holy Light, Light's Vigil, or Holy Shock heal spell you have a 80% chance to gain Mana equal to 50% of the base cost of the spell.",
      "After getting a critical effect from your Flash of Light, Holy Light, Light's Vigil, or Holy Shock heal spell you have a 100% chance to gain Mana equal to 50% of the base cost of the spell."
     ],
     "req": 110871
    },
    {
     "id": 105704,
     "n": "Holy Conduit",
     "r": 2,
     "c": 2,
     "max": 2,
     "i": "spell_holy_devineaegis",
     "d": [
      "Reduces the mana cost of your Consecration, Holy Wrath, Exorcism, and Hammer of Wrath spells by 20%.",
      "Reduces the mana cost of your Consecration, Holy Wrath, Exorcism, and Hammer of Wrath spells by 40%."
     ]
    },
    {
     "id": 105324,
     "n": "Divine Precision",
     "r": 3,
     "c": 0,
     "max": 2,
     "i": "spell_holy_mindsooth",
     "d": [
      "Improves your chance to hit with Holy spells by 4%, and reduces the duration of Silence effects on you by 10%.",
      "Improves your chance to hit with Holy spells by 8%, and reduces the duration of Silence effects on you by 20%."
     ]
    },
    {
     "id": 110873,
     "n": "Infusion of Light",
     "r": 3,
     "c": 1,
     "max": 2,
     "i": "ability_paladin_infusionoflight",
     "d": [
      "Your Holy Shock and Flash of Light critical hits reduce the cast time of your next Holy Light cast within 15 sec by 0.5 sec.",
      "Your Holy Shock and Flash of Light critical hits reduce the cast time of your next Holy Light cast within 15 sec by 1.0 sec."
     ]
    },
    {
     "id": 105330,
     "n": "Oath of Light",
     "r": 3,
     "c": 2,
     "max": 1,
     "i": "spell_holy_greaterblessingoflight",
     "d": [
      "Swear an Oath to protect target ally for 5 min, increasing the healing of your Holy Light on them by up to 0, your Flash of Light by up to 0, and your Holy Shock by up to 0. Only one Oath of Light may be sworn by the Paladin at any one time."
     ]
    },
    {
     "id": 110872,
     "n": "Consecrated Ground",
     "r": 4,
     "c": 0,
     "max": 2,
     "i": "spell_holy_innerfire",
     "d": [
      "Gives your Holy spells 5% increased damage against the first 4 enemies that enter your Consecration.",
      "Gives your Holy spells 10% increased damage against the first 4 enemies that enter your Consecration."
     ]
    },
    {
     "id": 105323,
     "n": "Holy Shock",
     "r": 4,
     "c": 1,
     "max": 1,
     "i": "spell_holy_searinglight",
     "d": [
      "Blasts the target with Holy energy, causing 134 Holy damage to an enemy, or 114 healing to an ally."
     ]
    },
    {
     "id": 113631,
     "n": "Boundless Light",
     "r": 4,
     "c": 2,
     "max": 2,
     "i": "ability_paladin_sacredcleansing",
     "d": [
      "Increases the critical strike chance of your Holy Shock spell by 15% when cast on allies not affected by your Oath of Light.",
      "Increases the critical strike chance of your Holy Shock spell by 30% when cast on allies not affected by your Oath of Light."
     ],
     "req": 105323
    },
    {
     "id": 105321,
     "n": "Holy Power",
     "r": 5,
     "c": 2,
     "max": 5,
     "i": "spell_holy_power",
     "d": [
      "Increases the critical strike healing bonus of your Holy spells by 10%.",
      "Increases the critical strike healing bonus of your Holy spells by 20%.",
      "Increases the critical strike healing bonus of your Holy spells by 30%.",
      "Increases the critical strike healing bonus of your Holy spells by 40%.",
      "Increases the critical strike healing bonus of your Holy spells by 50%."
     ]
    },
    {
     "id": 105320,
     "n": "Light's Vigil",
     "r": 6,
     "c": 1,
     "max": 1,
     "i": "ability_paladin_judgementofthepure",
     "d": [
      "Applies Light's Vigil to a friendly target for 30 sec. The caster's next Holy Shock on the target incurs no cooldown and heals the target and their party for 324. Only one Vigil per Paladin may be active in each party."
     ],
     "req": 105323
    }
   ]
  },
  {
   "name": "Protection",
   "bg": "paladinprotection",
   "i": "spell_holy_devotionaura",
   "talents": [
    {
     "id": 105332,
     "n": "Divine Intellect",
     "r": 0,
     "c": 1,
     "max": 5,
     "i": "spell_nature_sleep",
     "d": [
      "Increases your total Intellect by 2%.",
      "Increases your total Intellect by 4%.",
      "Increases your total Intellect by 6%.",
      "Increases your total Intellect by 8%.",
      "Increases your total Intellect by 10%."
     ]
    },
    {
     "id": 105626,
     "n": "Redoubt",
     "r": 0,
     "c": 2,
     "max": 5,
     "i": "ability_defend",
     "d": [
      "Damaging melee attacks against you have a 179978% chance to increase your chance to block by 6%. Lasts 10 sec or 5 blocks.",
      "Damaging melee attacks against you have a 179978% chance to increase your chance to block by 12%. Lasts 10 sec or 5 blocks.",
      "Damaging melee attacks against you have a 179978% chance to increase your chance to block by 18%. Lasts 10 sec or 5 blocks.",
      "Damaging melee attacks against you have a 179978% chance to increase your chance to block by 24%. Lasts 10 sec or 5 blocks.",
      "Damaging melee attacks against you have a 179978% chance to increase your chance to block by 30%. Lasts 10 sec or 5 blocks."
     ]
    },
    {
     "id": 105638,
     "n": "Precision",
     "r": 1,
     "c": 0,
     "max": 3,
     "i": "ability_rogue_ambush",
     "d": [
      "Improves your chance to hit by 1%.",
      "Improves your chance to hit by 2%.",
      "Improves your chance to hit by 3%."
     ]
    },
    {
     "id": 105637,
     "n": "Guardian's Favor",
     "r": 1,
     "c": 1,
     "max": 2,
     "i": "spell_holy_sealofprotection",
     "d": [
      "Reduces the cooldown of your Blessing of Protection by 1 min and increases the duration of your Blessing of Freedom by 3 sec.",
      "Reduces the cooldown of your Blessing of Protection by 2 min and increases the duration of your Blessing of Freedom by 6 sec."
     ]
    },
    {
     "id": 105632,
     "n": "Sacred Duty",
     "r": 1,
     "c": 3,
     "max": 2,
     "i": "spell_holy_divineintervention",
     "d": [
      "Reduces the cooldown of your Divine Shield, Divine Protection, and Templar's Bulwark spells by 30 sec, and reduces the duration of Forbearance by 5 sec.",
      "Reduces the cooldown of your Divine Shield, Divine Protection, and Templar's Bulwark spells by 60 sec, and reduces the duration of Forbearance by 10 sec."
     ]
    },
    {
     "id": 105625,
     "n": "Templar's Bulwark",
     "r": 2,
     "c": 0,
     "max": 1,
     "i": "ability_paladin_shieldofthetemplar",
     "d": [
      "When activated, this ability grants you an absorb shield equal to 100% of your maximum health for 8 sec. Applies Forbearance for 1 min. Cannot be cast while Forbearance is active."
     ]
    },
    {
     "id": 105633,
     "n": "Improved Hammer of Justice",
     "r": 2,
     "c": 1,
     "max": 3,
     "i": "spell_holy_sealofmight",
     "d": [
      "Decreases the cooldown of your Hammer of Justice spell by 5 sec.",
      "Decreases the cooldown of your Hammer of Justice spell by 10 sec.",
      "Decreases the cooldown of your Hammer of Justice spell by 15 sec."
     ]
    },
    {
     "id": 110874,
     "n": "Shield Specialization",
     "r": 2,
     "c": 2,
     "max": 2,
     "i": "inv_shield_06",
     "d": [
      "Increases the amount of damage absorbed by your shield by 15%, and gives your blocks a 50% chance to restore 4% of your maximum Mana. May only occur once every 0roccooldown sec.",
      "Increases the amount of damage absorbed by your shield by 30%, and gives your blocks a 100% chance to restore 4% of your maximum Mana. May only occur once every 0roccooldown sec."
     ],
     "req": 105626
    },
    {
     "id": 105630,
     "n": "Toughness",
     "r": 2,
     "c": 3,
     "max": 5,
     "i": "spell_holy_devotion",
     "d": [
      "Increases your armor value from items by 2%.",
      "Increases your armor value from items by 4%.",
      "Increases your armor value from items by 6%.",
      "Increases your armor value from items by 8%.",
      "Increases your armor value from items by 10%."
     ]
    },
    {
     "id": 110878,
     "n": "Swift Judgement",
     "r": 3,
     "c": 0,
     "max": 1,
     "i": "ability_paladin_judgementred",
     "d": [
      "Unleash the energy of a Seal spell upon an enemy. Does not consume the Seal. Refer to individual Seals for Judgement effect. Does not share a cooldown with your Judgement ability."
     ],
     "req": 105625
    },
    {
     "id": 105634,
     "n": "Improved Righteous Fury",
     "r": 3,
     "c": 1,
     "max": 3,
     "i": "spell_holy_sealoffury",
     "d": [
      "While Righteous Fury is active, all damage taken is reduced by 3%.",
      "While Righteous Fury is active, all damage taken is reduced by 6%.",
      "While Righteous Fury is active, all damage taken is reduced by 9%."
     ]
    },
    {
     "id": 105636,
     "n": "Anticipation",
     "r": 3,
     "c": 2,
     "max": 5,
     "i": "spell_magic_lesserinvisibilty",
     "d": [
      "Increases your Defense Skill by 4.",
      "Increases your Defense Skill by 8.",
      "Increases your Defense Skill by 12.",
      "Increases your Defense Skill by 16.",
      "Increases your Defense Skill by 20."
     ]
    },
    {
     "id": 105639,
     "n": "Stoicism",
     "r": 4,
     "c": 0,
     "max": 2,
     "i": "spell_holy_stoicism",
     "d": [
      "Reduces the duration of Stun and Charm effects on you by 10%.",
      "Reduces the duration of Stun and Charm effects on you by 20%."
     ]
    },
    {
     "id": 105628,
     "n": "Holy Shield",
     "r": 4,
     "c": 1,
     "max": 1,
     "i": "spell_holy_blessingofprotection",
     "d": [
      "Increases chance to block by 30% for 10 sec, and deals 75 Holy damage for each attack blocked while active. Damage caused by Holy Shield causes 20% additional threat. Each block expends a charge. 4 charges."
     ]
    },
    {
     "id": 105627,
     "n": "Reckoning",
     "r": 4,
     "c": 2,
     "max": 5,
     "i": "spell_holy_blessingofstrength",
     "d": [
      "Gives you a 8% chance after Blocking and a 20% chance after receiving a non-periodic critical strike to gain an extra attack. Stores up to 4 extra attacks. Cannot occur from Blocks more than once every 0.0 sec.",
      "Gives you a 16% chance after Blocking and a 40% chance after receiving a non-periodic critical strike to gain an extra attack. Stores up to 4 extra attacks. Cannot occur from Blocks more than once every 0.0 sec.",
      "Gives you a 24% chance after Blocking and a 60% chance after receiving a non-periodic critical strike to gain an extra attack. Stores up to 4 extra attacks. Cannot occur from Blocks more than once every 0.0 sec.",
      "Gives you a 32% chance after Blocking and a 80% chance after receiving a non-periodic critical strike to gain an extra attack. Stores up to 4 extra attacks. Cannot occur from Blocks more than once every 0.0 sec.",
      "Gives you a 40% chance after Blocking and a 100% chance after receiving a non-periodic critical strike to gain an extra attack. Stores up to 4 extra attacks. Cannot occur from Blocks more than once every 0.0 sec."
     ]
    },
    {
     "id": 110879,
     "n": "Iron Creed",
     "r": 5,
     "c": 2,
     "max": 3,
     "i": "spell_holy_improvedresistanceauras",
     "d": [
      "Increases the threat generated by your Holy Strike ability by 10%. While Righteous Fury is active, Holy Strike also reduces your damage taken by 2% for 6 sec.",
      "Increases the threat generated by your Holy Strike ability by 20%. While Righteous Fury is active, Holy Strike also reduces your damage taken by 4% for 6 sec.",
      "Increases the threat generated by your Holy Strike ability by 30%. While Righteous Fury is active, Holy Strike also reduces your damage taken by 6% for 6 sec."
     ]
    },
    {
     "id": 110875,
     "n": "Shieldsworn",
     "r": 6,
     "c": 1,
     "max": 1,
     "i": "spell_holy_greaterblessingofsanctuary",
     "d": [
      "Reduces the cooldown of your Holy Strike ability by 4 sec. Additionally, Holy Strike now strikes with your shield, triggering your active Holy Shield and Shield Specialization talents without consuming their charges or triggering their cooldowns, and allowing you to Block spells for 6 sec."
     ],
     "req": 105628
    }
   ]
  },
  {
   "name": "Retribution",
   "bg": "paladincombat",
   "i": "spell_holy_auraoflight",
   "talents": [
    {
     "id": 105707,
     "n": "Deflection",
     "r": 0,
     "c": 1,
     "max": 5,
     "i": "ability_parry",
     "d": [
      "Increases your Parry chance by 1%.",
      "Increases your Parry chance by 2%.",
      "Increases your Parry chance by 3%.",
      "Increases your Parry chance by 4%.",
      "Increases your Parry chance by 5%."
     ]
    },
    {
     "id": 105706,
     "n": "Benediction",
     "r": 0,
     "c": 2,
     "max": 5,
     "i": "spell_frost_windwalkon",
     "d": [
      "Reduces the Mana cost of all instant cast spells and abilities by 2%.",
      "Reduces the Mana cost of all instant cast spells and abilities by 4%.",
      "Reduces the Mana cost of all instant cast spells and abilities by 6%.",
      "Reduces the Mana cost of all instant cast spells and abilities by 8%.",
      "Reduces the Mana cost of all instant cast spells and abilities by 10%."
     ]
    },
    {
     "id": 105705,
     "n": "Improved Judgement",
     "r": 1,
     "c": 0,
     "max": 2,
     "i": "spell_holy_righteousfury",
     "d": [
      "Decreases the cooldown of your Judgement ability by 1 sec.",
      "Decreases the cooldown of your Judgement ability by 2 sec."
     ]
    },
    {
     "id": 105703,
     "n": "Conviction",
     "r": 1,
     "c": 1,
     "max": 3,
     "i": "spell_holy_retributionaura",
     "d": [
      "Improves your chance to get a critical strike with all spells and attacks by 2%.",
      "Improves your chance to get a critical strike with all spells and attacks by 4%.",
      "Improves your chance to get a critical strike with all spells and attacks by 6%."
     ]
    },
    {
     "id": 105701,
     "n": "Sanctified Judgement",
     "r": 1,
     "c": 2,
     "max": 3,
     "i": "ability_paladin_judgementblue",
     "d": [
      "Gives your Judgement ability a 33% chance to return 20% of the Mana cost of the judged seal.",
      "Gives your Judgement ability a 66% chance to return 40% of the Mana cost of the judged seal.",
      "Gives your Judgement ability a 100% chance to return 60% of the Mana cost of the judged seal."
     ]
    },
    {
     "id": 105702,
     "n": "Vindication",
     "r": 2,
     "c": 0,
     "max": 3,
     "i": "spell_holy_vindication",
     "d": [
      "Gives your damaging melee attacks a chance to reduce the target's Attack Power by 2 for 30 sec.",
      "Gives your damaging melee attacks a chance to reduce the target's Attack Power by 4 for 30 sec.",
      "Gives your damaging melee attacks a chance to reduce the target's Attack Power by 6 for 30 sec."
     ]
    },
    {
     "id": 105331,
     "n": "Unyielding Faith",
     "r": 2,
     "c": 1,
     "max": 2,
     "i": "spell_holy_unyieldingfaith",
     "d": [
      "Reduces the duration of Fear and Disorient effects on you by 15%.",
      "Reduces the duration of Fear and Disorient effects on you by 30%."
     ]
    },
    {
     "id": 105696,
     "n": "Seal of Command",
     "r": 2,
     "c": 2,
     "max": 1,
     "i": "ability_warrior_innerrage",
     "d": [
      "Gives the Paladin a chance to deal additional Holy damage equal to 70% of normal weapon damage. Only one Seal can be active on the Paladin at any one time. Lasts 30 sec.\nUnleashing this Seal's energy will judge an enemy, instantly causing 48.5 Holy damage, 97 if the target is stunned or incapacitated."
     ]
    },
    {
     "id": 105699,
     "n": "Pursuit of Justice",
     "r": 2,
     "c": 3,
     "max": 2,
     "i": "spell_holy_persuitofjustice",
     "d": [
      "Increases movement speed and mounted movement speed by 8%. This does not stack with other movement speed increasing effects.",
      "Increases movement speed and mounted movement speed by 15%. This does not stack with other movement speed increasing effects."
     ]
    },
    {
     "id": 105698,
     "n": "Eye for an Eye",
     "r": 3,
     "c": 0,
     "max": 2,
     "i": "spell_holy_eyeforaneye",
     "d": [
      "All critical strikes against you cause 5% of the damage taken to the attacker as well. The damage caused by Eye for an Eye will not exceed 50% of the Paladin's total health.",
      "All critical strikes against you cause 10% of the damage taken to the attacker as well. The damage caused by Eye for an Eye will not exceed 50% of the Paladin's total health."
     ]
    },
    {
     "id": 105700,
     "n": "Sacred Arbiter",
     "r": 3,
     "c": 1,
     "max": 1,
     "i": "inv_sword_08",
     "d": [
      "Increases the damage of your Holy Strike ability by 20% and causes it to refresh all Judgement effects on the target."
     ]
    },
    {
     "id": 105697,
     "n": "Two-Handed Weapon Specialization",
     "r": 3,
     "c": 3,
     "max": 3,
     "i": "inv_hammer_04",
     "d": [
      "Increases the Physical and Holy damage you deal by 2%, and reduces all threat you generate by 7% while a two-handed melee weapon is equipped.",
      "Increases the Physical and Holy damage you deal by 4%, and reduces all threat you generate by 14% while a two-handed melee weapon is equipped.",
      "Increases the Physical and Holy damage you deal by 6%, and reduces all threat you generate by 20% while a two-handed melee weapon is equipped."
     ]
    },
    {
     "id": 113629,
     "n": "Turn Evil",
     "r": 4,
     "c": 0,
     "max": 2,
     "i": "spell_holy_turnundead",
     "d": [
      "Reduces the cast time of your Turn Undead spell by 0.5 sec, its cooldown by 5 sec, and allows it to affect Demons.",
      "Reduces the cast time of your Turn Undead spell by 1.0 sec, its cooldown by 10 sec, and allows it to affect Demons."
     ]
    },
    {
     "id": 105694,
     "n": "Repentance",
     "r": 4,
     "c": 1,
     "max": 1,
     "i": "spell_holy_prayerofhealing",
     "d": [
      "Puts the enemy target in a state of meditation, incapacitating them for up to 6 sec. Any damage caused will awaken the target. Only works against Humanoids."
     ]
    },
    {
     "id": 105693,
     "n": "Vengeance",
     "r": 4,
     "c": 2,
     "max": 3,
     "i": "ability_racial_avatar",
     "d": [
      "Increases your Physical and Holy damage dealt by 1% for 30 sec after landing a non-periodic critical strike. Stacks up to 5 times.",
      "Increases your Physical and Holy damage dealt by 2% for 30 sec after landing a non-periodic critical strike. Stacks up to 5 times.",
      "Increases your Physical and Holy damage dealt by 3% for 30 sec after landing a non-periodic critical strike. Stacks up to 5 times."
     ],
     "req": 105696
    },
    {
     "id": 110882,
     "n": "Champion of the Light",
     "r": 5,
     "c": 2,
     "max": 5,
     "i": "ability_paladin_enlightenedjudgements",
     "d": [
      "Increases your spell damage by up to 12% of your Intellect, and reduces the cast time of your Hammer of Wrath by 0.2 sec.",
      "Increases your spell damage by up to 24% of your Intellect, and reduces the cast time of your Hammer of Wrath by 0.4 sec.",
      "Increases your spell damage by up to 36% of your Intellect, and reduces the cast time of your Hammer of Wrath by 0.6 sec.",
      "Increases your spell damage by up to 48% of your Intellect, and reduces the cast time of your Hammer of Wrath by 0.8 sec.",
      "Increases your spell damage by up to 60% of your Intellect, and reduces the cast time of your Hammer of Wrath by 1.0 sec."
     ]
    },
    {
     "id": 105692,
     "n": "Unsealed Wrath",
     "r": 6,
     "c": 1,
     "max": 1,
     "i": "spell_holy_blessedresillience",
     "d": [
      "Your melee attacks store a copy of your active Seal for 15 sec, stacking up to 3 times. Landing an attack with a different Seal consumes all stacks, giving the stored Seal its normal chance to activate once per stack."
     ],
     "req": 105694
    }
   ]
  }
 ]
};
