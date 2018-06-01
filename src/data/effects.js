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
    [ EFFECT.SHARED_GENETIC_MEMORY ]: [ 10, 12, 15 ],
    [ EFFECT.DEMON_HUNTER ]: [ 10, 12, 15 ],
    [ EFFECT.SPIRIT_OF_JUSTICE ]: [ 10, 12, 15 ],
    [ EFFECT.HEIGHTENED_SENSES ]: [ 10, 12, 15 ],
    [ EFFECT.COMPETITION ]: [ 10, 12, 15 ],
    [ EFFECT.BANE_OF_HELLS_KITCHEN ]: [ 10, 12, 15 ],
    [ EFFECT.DEFENDERS_DESTROYER ]: [ 10, 12, 15 ],
    [ EFFECT.SPLIT_PERSONALITY ]: [ 10, 12, 15 ],
    [ EFFECT.ELECTRIC_SUPERCHARGE ]: [ 10, 12, 15 ],
    [ EFFECT.SEETHING_HATRED ]: [ 10, 12, 15 ],
    [ EFFECT.PARTICLE_PHYSICS ]: [ 10, 12, 15 ],
    [ EFFECT.ENGINEERING ]: [ 10, 12, 15 ],
    [ EFFECT.BIOCHEMISTRY ]: [ 10, 12, 15 ],
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
    { uid: EFFECT.SHARED_GENETIC_MEMORY },
    { uid: EFFECT.DEMON_HUNTER },
    { uid: EFFECT.SPIRIT_OF_JUSTICE },
    { uid: EFFECT.HEIGHTENED_SENSES },
    { uid: EFFECT.COMPETITION },
    { uid: EFFECT.BANE_OF_HELLS_KITCHEN },
    { uid: EFFECT.DEFENDERS_DESTROYER },
    { uid: EFFECT.SPLIT_PERSONALITY },
    { uid: EFFECT.ELECTRIC_SUPERCHARGE },
    { uid: EFFECT.SEETHING_HATRED },
    { uid: EFFECT.PARTICLE_PHYSICS },
    { uid: EFFECT.ENGINEERING },
    { uid: EFFECT.BIOCHEMISTRY },

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
    [ EFFECT.SHARED_GENETIC_MEMORY ]: 'effect-shared-genetic-memory',
    [ EFFECT.DEMON_HUNTER ]: 'effect-demon-hunter',
    [ EFFECT.SPIRIT_OF_JUSTICE ]: 'effect-spirit-of-justice',
    [ EFFECT.HEIGHTENED_SENSES ]: 'effect-heightened-senses',
    [ EFFECT.COMPETITION ]: 'effect-competition',
    [ EFFECT.BANE_OF_HELLS_KITCHEN ]: 'effect-bane-of-hells-kitchen',
    [ EFFECT.DEFENDERS_DESTROYER ]: 'effect-armor-break',
    [ EFFECT.SPLIT_PERSONALITY ]: 'effect-inseparable',
    [ EFFECT.ELECTRIC_SUPERCHARGE ]: 'effect-electric-supercharge',
    [ EFFECT.SEETHING_HATRED ]: 'effect-seething-hatred',
    [ EFFECT.PARTICLE_PHYSICS ]: 'effect-particle-physics',
    [ EFFECT.ENGINEERING ]: 'effect-engineering',
    [ EFFECT.BIOCHEMISTRY ]: 'effect-biochemistry',
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
