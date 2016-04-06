
const uids = [
    'truestrike',
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
    'powerlock',
    'regeneration',
    'degeneration',
    'healthsteal',
    'healblock',
    'energyresist',
    'energyabsorb',
    'stun',
    'stagger',
    'nullify',
    'evade',
];

const abilityImages = {
    'truestrike': 'truestrike',
    'fury': 'attack',
    'weakness': 'weakness',
    'precision': 'critical_rate',
    'fatigue': 'fatigue',
    'cruelty': 'critical_damage',
    'exhaust': 'exhaust',
    'armorbreak': 'armor_break',
    'armorup': 'armor_up',
    'physicalresist': 'resist_physical',
    'unstoppable': 'unstoppable',
    'poison': 'poison',
    'poisonimmunity': 'immunity_poison',
    'cauterize': null,
    'bleed': 'bleed',
    'bleedimmunity': 'immunity_bleed',
    'shock': 'shock',
    'powerdrain': 'mana_steal',
    'powerburn': 'mana',
    'powerlock': 'powerlock',
    'regeneration': 'regeneration',
    'degeneration': 'degeneration',
    'healthsteal': 'health_steal',
    'healblock': 'healblock',
    'energyresist': 'resist_energy',
    'energyabsorb': null,
    'stun': 'stun',
    'stagger': 'nullify',
    'nullify': 'nullify',
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
