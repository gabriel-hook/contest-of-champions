import Effect from './model/Effect';

export const EFFECT_STARS_AMOUNT = {
    attack: [ 4, 5, 6 ],
    idol: [ 3, 4, 5 ],
    inseparable: [ 7, 8, 9 ],
    mutantagenda: [ 8, 10, 12 ],
    critrate: [ 5, 6, 7 ],
    critdamage: [ 15, 20, 25 ],
    bleed: [ 15, 20, 25 ],
    stunactivation: [ 5, 10, 15 ],
    stunspecial: [ 15, 20, 25 ],
    powergain: [ 3, 4, 5 ],
    perfectblock: [ 3, 4, 5 ],
    block: [ 10, 15, 20 ],
    armor: [ 5, 6, 7 ],
    health: [ 4, 5, 6 ],
    heroesforhire: [ 3, 4, 5 ],
    thunderbolts: [ 4, 5, 6 ],
};
export const EFFECT_STARS_INDEX = { 1: 0, 2: 0, 3: 1, 4: 2, 5: 2 };

const effects = [

    { uid: 'attack' },
    { uid: 'idol' },
    { uid: 'inseparable' },
    { uid: 'mutantagenda' },
    { uid: 'critrate' },
    { uid: 'critdamage' },
    { uid: 'bleed' },
    { uid: 'stunactivation' },
    { uid: 'stunspecial' },
    { uid: 'powergain' },
    { uid: 'perfectblock' },
    { uid: 'block' },
    { uid: 'armor' },
    { uid: 'health' },
    { uid: 'heroesforhire' },
    { uid: 'thunderbolts' },

].map(({ uid }) => new Effect({
    uid,
    base: EFFECT_STARS_AMOUNT[ uid ][ 0 ],
}));

const effectImages = {
    'attack': 'attack',
    'idol': 'idol',
    'inseparable': 'inseparable',
    'mutantagenda': 'mutant_agenda',
    'critrate': 'critical_rate',
    'critdamage': 'critical_damage',
    'bleed': 'bleed',
    'stunactivation': 'stun',
    'stunspecial': 'stun',
    'powergain': 'mana',
    'powersteal': 'mana_steal',
    'perfectblock': 'perfectblock',
    'block': 'block',
    'armor': 'armor_up',
    'health': 'health',
    'healthsteal': 'health_steal',
    'heroesforhire': 'heroes_for_hire',
    'thunderbolts': 'thunderbolts',
    'mastermind': 'mastermind',
};

function effectImage(uid, append = 'black') {
    return effectImages[ uid ]? `images/effects/${
        effectImages[ uid ]
    }_${
        append
    }.png`: null;
}

const effectBases = effects.reduce((map, { attr }) => {
    map[ attr.uid ] = attr.base;
    return map;
}, {});
function effectBase(uid) {
    return effectBases[ uid ];
}

const uids = [ ...new Set(effects.map(({ attr }) => attr.uid)) ];

export { effectImage, effectBase };
export { uids };
export default effects;
