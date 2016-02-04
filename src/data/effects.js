import Effect from './model/Effect';

const SPECIAL_EFFECTS = {
    'mutantagenda': true,
    'heroesforhire': true,
    'thunderbolts': true,
};

const effects = [

    { uid: 'attack', base: 5 },
    { uid: 'stun', base: 15 },
    { uid: 'mutantagenda', base: 8 },
    { uid: 'inseparable', base: 8 },
    { uid: 'critrate', base: 5 },
    { uid: 'critdamage', base: 15 },
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

const imageMap = {
    'attack': 'attack',
    'stun': 'stun',
    'mutantagenda': 'mutant_agenda',
    'inseparable': 'inseparable',
    'critrate': 'critical',
    'critdamage': 'critical',
    'powergain': 'mana',
    'powersteal': 'mana_steal',
    'perfectblock': 'block',
    'block': 'block',
    'armor': 'armor',
    'health': 'health',
    'healthsteal': 'health_steal',
    'heroesforhire': 'heroes_for_hire',
    'thunderbolts': 'thunderbolts',
};

function effectImage(uid, append = 'black') {
    return `images/effects/${
        imageMap[ uid ]
    }_${
        append
    }.png`;
}

const effectBases = {};
effects.forEach(({ attr }) => effectBases[ attr.uid ] = attr.base);
function effectBase(uid) {
    return effectBases[ uid ];
}

const uids = [ ...new Set(effects.map(({ attr }) => attr.uid)) ];

export { effectImage, effectBase, uids, SPECIAL_EFFECTS };
export default effects;
