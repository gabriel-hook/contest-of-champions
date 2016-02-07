
const uids = [
    'stun',
    'stagger',
    'fatigue',
    'weakness',
    'nullify',
    'powerdrain',
    'powerburn',
    'shock',
    'bleed',
    'healblock',
    'cauterize',
    'armorbreak',
    'fury',
    'regeneration',
    'healthsteal',
    'unstoppable',
    'poison',
    'armorup',
    'plusdamage',
    'pluscritrate',
    'pluscritdamage',
    'poisonimmunity',
    'bleedimmunity',
];

const abilityImageMap = {
    'stun': 'stun',
    'stagger': null,
    'fatigue': null,
    'weakness': null,
    'nullify': null,
    'powerdrain': 'mana_steal',
    'powerburn': 'mana_steal',
    'shock': null,
    'bleed': 'bleed',
    'healblock': null,
    'cauterize': null,
    'armorbreak': 'armor_break',
    'fury': 'attack',
    'regeneration': 'heal',
    'healthsteal': 'health-steal',
    'unstoppable': null,
    'poison': null,
    'armorup': 'armor',
    'plusdamage': 'attack',
    'pluscritrate': 'critical_rate',
    'pluscritdamage': 'critical',
    'poisonimmunity': null,
    'bleedimmunity': null,
};

function abilityImage(uid, append = 'black') {
    return abilityImageMap[ uid ]? `images/effects/${
        abilityImageMap[ uid ]
    }_${
        append
    }.png`: null;
}

export { uids, abilityImage };
