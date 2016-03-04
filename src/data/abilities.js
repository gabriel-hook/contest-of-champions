
const uids = [
    'fury',
    'weakness',
    'precision',
    'fatigue',
    'cruelty',
    'exhaust',
    'armorbreak',
    'armorup',
    'physicalresist',
    'unstoppable',
    'poison',
    'poisonimmunity',
    'cauterize',
    'bleed',
    'bleedimmunity',
    'shock',
    'powerdrain',
    'powerburn',
    'regeneration',
    'healthsteal',
    'healblock',
    'energyabsorb',
    'stun',
    'stagger',
    'nullify',
    'evade',
];

const abilityImages = {
    'fury': 'attack',
    'weakness': null,
    'precision': 'critical_rate',
    'fatigue': null,
    'cruelty': 'critical_damage',
    'exhaust': null,
    'armorbreak': 'armor_break',
    'armorup': 'armor',
    'physicalresist': null,
    'unstoppable': null,
    'poison': null,
    'poisonimmunity': null,
    'cauterize': null,
    'bleed': 'bleed',
    'bleedimmunity': null,
    'shock': null,
    'powerdrain': 'mana_steal',
    'powerburn': 'mana_steal',
    'regeneration': 'heal',
    'healthsteal': 'health-steal',
    'healblock': null,
    'energyabsorb': null,
    'stun': 'stun',
    'stagger': null,
    'nullify': null,
    'evade': null,
};

function abilityImage(uid, append = 'black') {
    return abilityImages[ uid ]? `images/effects/${
        abilityImages[ uid ]
    }_${
        append
    }.png`: null;
}

export { uids, abilityImage };
