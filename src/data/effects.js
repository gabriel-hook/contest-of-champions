import Effect, { EFFECT } from './model/Effect';

export const EFFECT_STARS_AMOUNT = {
    [ EFFECT.ATTACK ]: [ 4, 5, 6 ],
    [ EFFECT.IDOL ]: [ 2, 3, 4 ],
    [ EFFECT.INSEPARABLE ]: [ 7, 8, 9 ],
    [ EFFECT.MUTANT_AGENDA ]: [ 8, 10, 12 ],
    [ EFFECT.COSMIC_SUPREMACY ]: [ 15, 25, 30 ],
    [ EFFECT.CRITICAL_RATE ]: [ 5, 6, 7 ],
    [ EFFECT.CRITICAL_DAMAGE ]: [ 15, 20, 25 ],
    [ EFFECT.BLEED ]: [ 15, 20, 25 ],
    [ EFFECT.COMBO ]: [ 5, 10, 15 ],
    [ EFFECT.STUN_ACTIVATION ]: [ 5, 10, 15 ],
    [ EFFECT.STUN_SPECIAL ]: [ 15, 20, 25 ],
    [ EFFECT.POWER_GAIN ]: [ 3, 4, 5 ],
    [ EFFECT.ITS_COMPLICATED ]: [ 1, 2, 3 ],
    [ EFFECT.PERFECT_BLOCK ]: [ 3, 4, 5 ],
    [ EFFECT.ARMOR ]: [ 5, 6, 7 ],
    [ EFFECT.HEALTH ]: [ 4, 5, 6 ],
    [ EFFECT.HEROES_FOR_HIRE ]: [ 3, 4, 5 ],
    [ EFFECT.THUNDERBOLTS ]: [ 4, 5, 6 ],
    [ EFFECT.MASTERMINDS ]: [ 5, 10, 15 ],
    [ EFFECT.SHIELD_AGENTS ]: [ 10, 12, 15 ],
    [ EFFECT.SHIELD_CLEARANCE ]: [ 10, 12, 15 ],
};
export const EFFECT_STARS_INDEX = { 1: 0, 2: 0, 3: 1, 4: 2, 5: 2 };

const effects = [

    { uid: EFFECT.ATTACK },
    { uid: EFFECT.IDOL },
    { uid: EFFECT.INSEPARABLE },
    { uid: EFFECT.MUTANT_AGENDA },
    { uid: EFFECT.COSMIC_SUPREMACY },
    { uid: EFFECT.CRITICAL_RATE },
    { uid: EFFECT.CRITICAL_DAMAGE },
    { uid: EFFECT.BLEED },
    { uid: EFFECT.COMBO },
    { uid: EFFECT.STUN_ACTIVATION },
    { uid: EFFECT.STUN_SPECIAL },
    { uid: EFFECT.POWER_GAIN },
    { uid: EFFECT.ITS_COMPLICATED },
    { uid: EFFECT.PERFECT_BLOCK },
    { uid: EFFECT.ARMOR },
    { uid: EFFECT.HEALTH },
    { uid: EFFECT.HEROES_FOR_HIRE },
    { uid: EFFECT.THUNDERBOLTS },
    { uid: EFFECT.MASTERMINDS },
    { uid: EFFECT.SHIELD_AGENTS },
    { uid: EFFECT.SHIELD_CLEARANCE },

].map(({ uid }) => new Effect({
    uid,
    base: EFFECT_STARS_AMOUNT[ uid ][ 0 ],
}));

const effectIcons = {
    [ EFFECT.ATTACK ]: 'effect-attack',
    [ EFFECT.IDOL ]: 'effect-idol',
    [ EFFECT.INSEPARABLE ]: 'effect-inseparable',
    [ EFFECT.MUTANT_AGENDA ]: 'effect-mutant-agenda',
    [ EFFECT.COSMIC_SUPREMACY ]: 'effect-cosmic-supremacy',
    [ EFFECT.CRITICAL_RATE ]: 'effect-critical-rate',
    [ EFFECT.CRITICAL_DAMAGE ]: 'effect-critical-damage',
    [ EFFECT.BLEED ]: 'effect-bleed',
    [ EFFECT.COMBO ]: 'effect-combo',
    [ EFFECT.STUN_ACTIVATION ]: 'effect-stun',
    [ EFFECT.STUN_SPECIAL ]: 'effect-stun-special',
    [ EFFECT.POWER_GAIN ]: 'effect-power',
    [ EFFECT.POWER_STEAL ]: 'effect-power-lock',
    [ EFFECT.ITS_COMPLICATED ]: 'effect-power',
    [ EFFECT.PERFECT_BLOCK ]: 'effect-perfect-block',
    [ EFFECT.ARMOR ]: 'effect-armor',
    [ EFFECT.HEALTH ]: 'effect-health',
    [ EFFECT.HEALTH_STEAL ]: 'effect-health-steal',
    [ EFFECT.HEROES_FOR_HIRE ]: 'effect-heroes-for-hire',
    [ EFFECT.THUNDERBOLTS ]: 'effect-thunderbolts',
    [ EFFECT.MASTERMINDS ]: 'effect-masterminds',
    [ EFFECT.SHIELD_AGENTS ]: 'effect-shield',
    [ EFFECT.SHIELD_CLEARANCE ]: 'effect-shield',
};

function effectIcon(uid) {
    return effectIcons[ uid ] || 'circle';
}

const effectBases = effects.reduce((map, { attr }) => {
    map[ attr.uid ] = attr.base;
    return map;
}, {});
function effectBase(uid) {
    return effectBases[ uid ] || 1000;
}

export { effectIcon, effectBase };
export default effects;
