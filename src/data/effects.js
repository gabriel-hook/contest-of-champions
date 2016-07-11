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

const effectIcons = {
    'attack': 'effect-attack',
    'idol': 'effect-idol',
    'inseparable': 'effect-inseparable',
    'mutantagenda': 'effect-mutant-agenda',
    'critrate': 'effect-critical-rate',
    'critdamage': 'effect-critical-damage',
    'bleed': 'effect-bleed',
    'stunactivation': 'effect-stun',
    'stunspecial': 'effect-stun',
    'powergain': 'effect-power',
    'powersteal': 'effect-power-steal',
    'perfectblock': 'effect-perfect-block',
    'block': 'effect-block',
    'armor': 'effect-armor',
    'health': 'effect-health',
    'healthsteal': 'effect-health-steal',
    'heroesforhire': 'effect-heroes-for-hire',
    'thunderbolts': 'effect-thunderbolts',
    'mastermind': 'effect-mastermind',
};

function effectIcon(uid) {
    return effectIcons[ uid ] || 'circle';
}

const effectBases = effects.reduce((map, { attr }) => {
    map[ attr.uid ] = attr.base;
    return map;
}, {});
function effectBase(uid) {
    return effectBases[ uid ];
}

const uids = [ ...new Set(effects.map(({ attr }) => attr.uid)) ];

export { effectIcon, effectBase };
export { uids };
export default effects;
