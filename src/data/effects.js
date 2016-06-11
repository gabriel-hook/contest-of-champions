import Effect from './model/Effect';

const SPECIAL_EFFECTS = {
    'mutantagenda': true,
    'heroesforhire': true,
    'thunderbolts': true,
};

const effects = [

    { uid: 'attack', base: 5 },
    { uid: 'idol', base: 3 },
    { uid: 'inseparable', base: 8 },
    { uid: 'mutantagenda', base: 8 },
    { uid: 'critrate', base: 5 },
    { uid: 'critdamage', base: 15 },
    { uid: 'bleed', base: 15 },
    { uid: 'stun', base: 15 },
    { uid: 'powergain', base: 3 },
    //{ uid: 'powersteal', base: 3 },
    { uid: 'perfectblock', base: 3 },
    { uid: 'block', base: 10 },
    { uid: 'armor', base: 4 },
    { uid: 'health', base: 4 },
    //{ uid: 'healthsteal', base: 4 },
    { uid: 'heroesforhire', base: 4 },
    { uid: 'thunderbolts', base: 5 },

].map((effect) => new Effect(effect));

const effectImages = {
    'attack': 'attack',
    'idol': 'idol',
    'inseparable': 'inseparable',
    'mutantagenda': 'mutant_agenda',
    'critrate': 'critical_rate',
    'critdamage': 'critical_damage',
    'bleed': 'bleed',
    'stun': 'stun',
    'powergain': 'mana',
    'powersteal': 'mana_steal',
    'perfectblock': 'perfectblock',
    'block': 'block',
    'armor': 'armor_up',
    'health': 'health',
    'healthsteal': 'health_steal',
    'heroesforhire': 'heroes_for_hire',
    'thunderbolts': 'thunderbolts',
};

function effectImage(uid, append = 'black') {
    return effectImages[ uid ]? `images/effects/${
        effectImages[ uid ]
    }_${
        append
    }.png`: null;
}

const effectBases = {};
effects.forEach(({ attr }) => (effectBases[ attr.uid ] = attr.base));
function effectBase(uid) {
    return effectBases[ uid ];
}

const uids = [ ...new Set(effects.map(({ attr }) => attr.uid)) ];

export { effectImage, effectBase };
export { uids, SPECIAL_EFFECTS };
export default effects;
