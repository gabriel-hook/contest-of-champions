import { CHAMPION } from './model/Champion';
import { EFFECT } from './model/Effect';
import { EFFECT_STARS_AMOUNT, EFFECT_STARS_INDEX } from './effects';
import Synergy from './model/Synergy';

function fromId(fromId, synergies) {
    return synergies.map((synergy) => ({
        ...synergy,
        fromId,
    }));
}

function fromStarsRange(fromStarsMin, fromStarsMax, synergy) {
    const fromStarsArray = [];
    for(let i = fromStarsMin; i <= fromStarsMax; i++) {
        fromStarsArray.push(i);
    }
    return fromStarsArray.map((fromStars) => ({
        ...synergy,
        fromStars,
    }));
}

function fromStars(fromStars, synergies) {
    return synergies.map((synergy) => ({
        ...synergy,
        fromStars,
    }));
}

let toIdsCounter = 0;
function toIds(toIds, synergy) {
    toIdsCounter++;
    return toIds.map((toId) => ({
        ...synergy,
        toId,
        group: `group-${ toIdsCounter }`,
    }));
}

const synergies = [

    ...fromId(CHAMPION.BLACKBOLT, [
        ...fromStarsRange(2, 4, { toId: CHAMPION.CYCLOPS, effectId: EFFECT.BLOCK }),
        ...fromStarsRange(3, 4, { toId: CHAMPION.SPIDERMAN, effectId: EFFECT.ARMOR }),
        ...fromStarsRange(3, 4, { toId: CHAMPION.RONAN, effectId: EFFECT.ATTACK }),
        ...fromStarsRange(3, 4, { toId: CHAMPION.HULK, effectId: EFFECT.CRITICAL_DAMAGE }),
    ]),
    ...fromId(CHAMPION.CAPTAINMARVEL, [
        ...fromStarsRange(3, 5, { toId: CHAMPION.CAPTAINAMERICA, effectId: EFFECT.ARMOR }),
        ...fromStarsRange(3, 5, { toId: CHAMPION.GAMORA, effectId: EFFECT.ARMOR }),
        ...fromStarsRange(3, 5, { toId: CHAMPION.IRONMAN, effectId: EFFECT.ARMOR }),
        ...fromStarsRange(4, 5, { toId: CHAMPION.WOLVERINE, effectId: EFFECT.POWER_GAIN }),
    ]),
    ...fromId(CHAMPION.DRAX, [
        ...fromStarsRange(2, 5, { toId: CHAMPION.STARLORD, effectId: EFFECT.PERFECT_BLOCK }),
        ...fromStarsRange(2, 5, { toId: CHAMPION.GAMORA, effectId: EFFECT.CRITICAL_DAMAGE }),
    ]),
    ...fromId(CHAMPION.GAMORA, [
        ...fromStarsRange(2, 4, { toId: CHAMPION.STARLORD, effectId: EFFECT.ARMOR }),
        ...fromStarsRange(3, 4, { toId: CHAMPION.DRAX, effectId: EFFECT.CRITICAL_DAMAGE }),
    ]),
    ...fromId(CHAMPION.GROOT, [
        ...fromStarsRange(3, 5, { toId: CHAMPION.STARLORD, effectId: EFFECT.ARMOR }),
        ...fromStarsRange(3, 5, { toId: CHAMPION.DRAX, effectId: EFFECT.PERFECT_BLOCK }),
        ...fromStarsRange(3, 5, { toId: CHAMPION.ROCKET, effectId: EFFECT.INSEPARABLE }),
    ]),
    ...fromId(CHAMPION.KAMALAKHAN, [
        ...fromStarsRange(3, 5, { toId: CHAMPION.CAPTAINMARVEL, effectId: EFFECT.IDOL }),
        ...fromStarsRange(3, 5, { toId: CHAMPION.MSMARVEL, effectId: EFFECT.IDOL }),
        ...fromStarsRange(3, 5, { toId: CHAMPION.SPIDERMANMORALES, effectId: EFFECT.PERFECT_BLOCK }),
        ...fromStarsRange(4, 5, { toId: CHAMPION.VISION, effectId: EFFECT.PERFECT_BLOCK }),
    ]),

    ...fromId(CHAMPION.MSMARVEL, [
        ...fromStars(3, [
            { toId: CHAMPION.CAPTAINAMERICA, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.IRONMAN, effectId: EFFECT.PERFECT_BLOCK },
            { toId: CHAMPION.THOR, effectId: EFFECT.PERFECT_BLOCK },
            { toId: CHAMPION.HULK, effectId: EFFECT.PERFECT_BLOCK },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.CAPTAINAMERICA, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.IRONMAN, effectId: EFFECT.PERFECT_BLOCK },
            { toId: CHAMPION.THOR, effectId: EFFECT.PERFECT_BLOCK },
            { toId: CHAMPION.HULK, effectId: EFFECT.PERFECT_BLOCK },
        ]),
    ]),

    ...fromId(CHAMPION.RONAN, [
        ...fromStars(2, [
            { toId: CHAMPION.BLACKBOLT, effectId: EFFECT.CRITICAL_DAMAGE },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION.BLACKBOLT, effectId: EFFECT.CRITICAL_DAMAGE },
            { toId: CHAMPION.IRONMAN, effectId: EFFECT.CRITICAL_RATE },
            { toId: CHAMPION.GAMORA, effectId: EFFECT.CRITICAL_DAMAGE },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.BLACKBOLT, effectId: EFFECT.CRITICAL_DAMAGE },
            { toId: CHAMPION.IRONMAN, effectId: EFFECT.CRITICAL_RATE },
            { toId: CHAMPION.GAMORA, effectId: EFFECT.CRITICAL_DAMAGE },
            { toId: CHAMPION.HULK, effectId: EFFECT.CRITICAL_RATE },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION.BLACKBOLT, effectId: EFFECT.CRITICAL_DAMAGE },
            { toId: CHAMPION.IRONMAN, effectId: EFFECT.CRITICAL_RATE },
            { toId: CHAMPION.GAMORA, effectId: EFFECT.CRITICAL_DAMAGE },
            { toId: CHAMPION.HULK, effectId: EFFECT.CRITICAL_RATE },
        ]),
    ]),

    ...fromId(CHAMPION.SPIDERMANBLACK, [
        ...fromStars(3, [
            { toId: CHAMPION.STORM, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.ELECTRO, effectId: EFFECT.CRITICAL_RATE },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.STORM, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.ELECTRO, effectId: EFFECT.CRITICAL_RATE },
        ]),
    ]),

    ...fromId(CHAMPION.SUPERIORIRONMAN, [
        ...fromStars(2, [
            { toId: CHAMPION.CAPTAINAMERICA, effectId: EFFECT.CRITICAL_RATE },
            { toId: CHAMPION.DAREDEVIL, effectId: EFFECT.CRITICAL_DAMAGE },
            { toId: CHAMPION.THOR, effectId: EFFECT.PERFECT_BLOCK },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION.CAPTAINAMERICA, effectId: EFFECT.CRITICAL_RATE },
            { toId: CHAMPION.DAREDEVIL, effectId: EFFECT.CRITICAL_DAMAGE },
            { toId: CHAMPION.THOR, effectId: EFFECT.PERFECT_BLOCK },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.CAPTAINAMERICA, effectId: EFFECT.CRITICAL_RATE },
            { toId: CHAMPION.DAREDEVIL, effectId: EFFECT.CRITICAL_DAMAGE },
            { toId: CHAMPION.THOR, effectId: EFFECT.PERFECT_BLOCK },
        ]),
    ]),

    ...fromId(CHAMPION.THOR, [
        ...fromStars(2, [
            { toId: CHAMPION.DRSTRANGE, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.IRONMAN, effectId: EFFECT.ARMOR },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION.DRSTRANGE, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.IRONMAN, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.JUGGERNAUT, effectId: EFFECT.CRITICAL_RATE },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.DRSTRANGE, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.IRONMAN, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.JUGGERNAUT, effectId: EFFECT.CRITICAL_RATE },
        ]),
    ]),

    ...fromId(CHAMPION.VENOM, [
        ...fromStars(3, [
            { toId: CHAMPION.SPIDERMAN, effectId: EFFECT.ATTACK },
            { toId: CHAMPION.SPIDERMANBLACK, effectId: EFFECT.HEALTH },
            { toId: CHAMPION.ELECTRO, effectId: EFFECT.CRITICAL_DAMAGE },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.SPIDERMAN, effectId: EFFECT.ATTACK },
            { toId: CHAMPION.SPIDERMANBLACK, effectId: EFFECT.HEALTH },
            { toId: CHAMPION.ELECTRO, effectId: EFFECT.CRITICAL_DAMAGE },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION.SPIDERMAN, effectId: EFFECT.ATTACK },
            { toId: CHAMPION.SPIDERMANBLACK, effectId: EFFECT.HEALTH },
            { toId: CHAMPION.ELECTRO, effectId: EFFECT.CRITICAL_DAMAGE },
        ]),
    ]),

    ...fromId(CHAMPION.VENOMPOOL, [
        ...fromStars(3, [
            { toId: CHAMPION.VENOM, effectId: EFFECT.INSEPARABLE },
            { toId: CHAMPION.DEADPOOL, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.DEADPOOLXFORCE, effectId: EFFECT.ARMOR },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.VENOM, effectId: EFFECT.INSEPARABLE },
            { toId: CHAMPION.DEADPOOL, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.DEADPOOLXFORCE, effectId: EFFECT.ARMOR },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION.VENOM, effectId: EFFECT.INSEPARABLE },
            { toId: CHAMPION.DEADPOOL, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.DEADPOOLXFORCE, effectId: EFFECT.ARMOR },
        ]),
    ]),

    ...fromId(CHAMPION.CIVILWARRIOR, [
        ...fromStarsRange(3, 5, { toId: CHAMPION.WINTERSOLDIER, effectId: EFFECT.ARMOR }),
        ...fromStarsRange(3, 5, { toId: CHAMPION.FALCON, effectId: EFFECT.ARMOR }),
        ...fromStarsRange(3, 5, { toId: CHAMPION.GUILLOTINE, effectId: EFFECT.PERFECT_BLOCK }),
        ...toIds([ CHAMPION.IRONMAN, CHAMPION.HULKBUSTER ], ...fromStarsRange(4, 5, { effectId: EFFECT.CRITICAL_DAMAGE })),
    ]),

    ...fromId(CHAMPION.IRONMAN, [
        ...fromStars(2, [
            { toId: CHAMPION.THOR, effectId: EFFECT.PERFECT_BLOCK },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION.CAPTAINAMERICA, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.THOR, effectId: EFFECT.PERFECT_BLOCK },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.CAPTAINAMERICA, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.THOR, effectId: EFFECT.PERFECT_BLOCK },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION.CAPTAINAMERICA, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.THOR, effectId: EFFECT.PERFECT_BLOCK },
        ]),
    ]),

    ...fromId(CHAMPION.IRONPATRIOT, [
        ...fromStars(3, [
            { toId: CHAMPION.IRONMAN, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.SPIDERMAN, effectId: EFFECT.CRITICAL_RATE },
            { toId: CHAMPION.CAPTAINAMERICA, effectId: EFFECT.CRITICAL_DAMAGE },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.IRONMAN, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.SPIDERMAN, effectId: EFFECT.CRITICAL_RATE },
            { toId: CHAMPION.CAPTAINAMERICA, effectId: EFFECT.CRITICAL_DAMAGE },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION.IRONMAN, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.SPIDERMAN, effectId: EFFECT.CRITICAL_RATE },
            { toId: CHAMPION.CAPTAINAMERICA, effectId: EFFECT.CRITICAL_DAMAGE },
        ]),
    ]),

    ...fromId(CHAMPION.KANG, [
        ...fromStars(4, [
            { toId: CHAMPION.BLACKBOLT, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.THEVISION, effectId: EFFECT.CRITICAL_RATE },
            { toId: CHAMPION.THOR, effectId: EFFECT.CRITICAL_RATE },
        ]),
    ]),

    ...fromId(CHAMPION.HULKBUSTER, [
        ...fromStars(2, [
            { toId: CHAMPION.HULK, effectId: EFFECT.CRITICAL_DAMAGE },
            { toId: CHAMPION.HULK, effectId: EFFECT.CRITICAL_DAMAGE },
            { toId: CHAMPION.IRONMAN, effectId: EFFECT.HEALTH },
            { toId: CHAMPION.SUPERIORIRONMAN, effectId: EFFECT.HEALTH },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.HULK, effectId: EFFECT.CRITICAL_DAMAGE },
            { toId: CHAMPION.IRONMAN, effectId: EFFECT.HEALTH },
            { toId: CHAMPION.SUPERIORIRONMAN, effectId: EFFECT.HEALTH },
        ]),
    ]),

    ...fromId(CHAMPION.ROCKET, [
        ...fromStars(2, [
            { toId: CHAMPION.STARLORD, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.GAMORA, effectId: EFFECT.PERFECT_BLOCK },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION.STARLORD, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.RONAN, effectId: EFFECT.CRITICAL_RATE },
            { toId: CHAMPION.GAMORA, effectId: EFFECT.PERFECT_BLOCK },
            { toId: CHAMPION.DRAX, effectId: EFFECT.PERFECT_BLOCK },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.STARLORD, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.RONAN, effectId: EFFECT.CRITICAL_RATE },
            { toId: CHAMPION.GAMORA, effectId: EFFECT.PERFECT_BLOCK },
            { toId: CHAMPION.DRAX, effectId: EFFECT.PERFECT_BLOCK },
        ]),
    ]),

    ...fromId(CHAMPION.STARLORD, [
        ...fromStars(2, [
            { toId: CHAMPION.ROCKET, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.DRAX, effectId: EFFECT.PERFECT_BLOCK },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION.ROCKET, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.DRAX, effectId: EFFECT.PERFECT_BLOCK },
            { toId: CHAMPION.GAMORA, effectId: EFFECT.PERFECT_BLOCK },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.ROCKET, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.DRAX, effectId: EFFECT.PERFECT_BLOCK },
            { toId: CHAMPION.GAMORA, effectId: EFFECT.PERFECT_BLOCK },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION.ROCKET, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.DRAX, effectId: EFFECT.PERFECT_BLOCK },
            { toId: CHAMPION.GAMORA, effectId: EFFECT.PERFECT_BLOCK },
        ]),
    ]),

    ...fromId(CHAMPION.VISION, [
        ...fromStars(2, [
            { toId: CHAMPION.SCARLETWITCH, effectId: EFFECT.POWER_GAIN },
            { toId: CHAMPION.IRONMAN, effectId: EFFECT.PERFECT_BLOCK },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION.SCARLETWITCH, effectId: EFFECT.POWER_GAIN },
            { toId: CHAMPION.IRONMAN, effectId: EFFECT.PERFECT_BLOCK },
            { toId: CHAMPION.MAGNETO, effectId: EFFECT.CRITICAL_RATE },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.SCARLETWITCH, effectId: EFFECT.POWER_GAIN },
            { toId: CHAMPION.IRONMAN, effectId: EFFECT.PERFECT_BLOCK },
            { toId: CHAMPION.MAGNETO, effectId: EFFECT.CRITICAL_RATE },
        ]),
    ]),

    ...fromId(CHAMPION.THEVISION, [
        ...fromStars(2, [
            { toId: CHAMPION.IRONMAN, effectId: EFFECT.HEALTH },
            { toId: CHAMPION.SCARLETWITCH, effectId: EFFECT.PERFECT_BLOCK },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION.IRONMAN, effectId: EFFECT.HEALTH },
            { toId: CHAMPION.SCARLETWITCH, effectId: EFFECT.PERFECT_BLOCK },
            { toId: CHAMPION.ULTRON, effectId: EFFECT.ATTACK },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.IRONMAN, effectId: EFFECT.HEALTH },
            { toId: CHAMPION.SCARLETWITCH, effectId: EFFECT.PERFECT_BLOCK },
            { toId: CHAMPION.ULTRON, effectId: EFFECT.ATTACK },
        ]),
    ]),

    ...fromId(CHAMPION.ULTRON, [
        ...fromStars(2, [
            { toId: CHAMPION.IRONMAN, effectId: EFFECT.HEALTH },
            { toId: CHAMPION.SCARLETWITCH, effectId: EFFECT.ARMOR },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION.IRONMAN, effectId: EFFECT.HEALTH },
            { toId: CHAMPION.SCARLETWITCH, effectId: EFFECT.ARMOR },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.IRONMAN, effectId: EFFECT.HEALTH },
            { toId: CHAMPION.SCARLETWITCH, effectId: EFFECT.ARMOR },
        ]),
    ]),

    ...fromId(CHAMPION.WARMACHINE, [
        ...fromStars(2, [
            { toId: CHAMPION.HULKBUSTER, effectId: EFFECT.ARMOR },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION.HULKBUSTER, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.HAWKEYE, effectId: EFFECT.BLOCK },
            { toId: CHAMPION.BLACKWIDOW, effectId: EFFECT.PERFECT_BLOCK },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.HULKBUSTER, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.BLACKPANTHER, effectId: EFFECT.CRITICAL_RATE },
            { toId: CHAMPION.HAWKEYE, effectId: EFFECT.BLOCK },
            { toId: CHAMPION.BLACKWIDOW, effectId: EFFECT.PERFECT_BLOCK },
        ]),
    ]),

    ...fromId(CHAMPION.COLOSSUS, [
        ...fromStars(2, [
            { toId: CHAMPION.JUGGERNAUT, effectId: EFFECT.CRITICAL_RATE },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION.JUGGERNAUT, effectId: EFFECT.CRITICAL_RATE },
            { toId: CHAMPION.WOLVERINE, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.MAGIK, effectId: EFFECT.HEALTH },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.JUGGERNAUT, effectId: EFFECT.CRITICAL_RATE },
            { toId: CHAMPION.WOLVERINE, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.MAGIK, effectId: EFFECT.HEALTH },
        ]),
    ]),

    ...fromId(CHAMPION.CYCLOPS, [
        ...fromStars(2, [
            { toId: CHAMPION.WOLVERINE, effectId: EFFECT.CRITICAL_DAMAGE },
            ...toIds([ CHAMPION.STORM, CHAMPION.COLOSSUS ], { effectId: EFFECT.MUTANT_AGENDA }),
        ]),
        ...fromStars(3, [
            { toId: CHAMPION.WOLVERINE, effectId: EFFECT.CRITICAL_DAMAGE },
            { toId: CHAMPION.MAGNETO, effectId: EFFECT.ATTACK },
            ...toIds([ CHAMPION.STORM, CHAMPION.COLOSSUS ], { effectId: EFFECT.MUTANT_AGENDA }),
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.WOLVERINE, effectId: EFFECT.CRITICAL_DAMAGE },
            { toId: CHAMPION.MAGNETO, effectId: EFFECT.ATTACK },
            ...toIds([ CHAMPION.STORM, CHAMPION.COLOSSUS ], { effectId: EFFECT.MUTANT_AGENDA }),
        ]),
        ...fromStars(5, [
            { toId: CHAMPION.WOLVERINE, effectId: EFFECT.CRITICAL_DAMAGE },
            { toId: CHAMPION.MAGNETO, effectId: EFFECT.ATTACK },
            ...toIds([ CHAMPION.STORM, CHAMPION.COLOSSUS ], { effectId: EFFECT.MUTANT_AGENDA }),
        ]),
    ]),

    ...fromId(CHAMPION.CYCLOPS90S, [
        ...fromStars(3, [
            { toId: CHAMPION.MAGNETO, effectId: EFFECT.ATTACK },
            { toId: CHAMPION.STORM, effectId: EFFECT.BLOCK },
            ...toIds([ CHAMPION.COLOSSUS, CHAMPION.WOLVERINE ], { effectId: EFFECT.MUTANT_AGENDA }),
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.MAGNETO, effectId: EFFECT.ATTACK },
            { toId: CHAMPION.STORM, effectId: EFFECT.BLOCK },
            ...toIds([ CHAMPION.COLOSSUS, CHAMPION.WOLVERINE ], { effectId: EFFECT.MUTANT_AGENDA }),
        ]),
        ...fromStars(5, [
            { toId: CHAMPION.MAGNETO, effectId: EFFECT.ATTACK },
            { toId: CHAMPION.STORM, effectId: EFFECT.BLOCK },
            ...toIds([ CHAMPION.COLOSSUS, CHAMPION.WOLVERINE ], { effectId: EFFECT.MUTANT_AGENDA }),
        ]),
    ]),

    ...fromId(CHAMPION.DEADPOOL, [
        ...fromStars(2, [
            { toId: CHAMPION.PUNISHER, effectId: EFFECT.PERFECT_BLOCK },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION.RHINO, effectId: EFFECT.CRITICAL_RATE },
            { toId: CHAMPION.WOLVERINE, effectId: EFFECT.HEALTH },
            { toId: CHAMPION.PUNISHER, effectId: EFFECT.PERFECT_BLOCK },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.RHINO, effectId: EFFECT.CRITICAL_RATE },
            { toId: CHAMPION.WOLVERINE, effectId: EFFECT.HEALTH },
            { toId: CHAMPION.PUNISHER, effectId: EFFECT.PERFECT_BLOCK },
        ]),
    ]),

    ...fromId(CHAMPION.DEADPOOLXFORCE, [
        ...fromStars(2, [
            { toId: CHAMPION.MOONKNIGHT, effectId: EFFECT.CRITICAL_DAMAGE },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION.MOONKNIGHT, effectId: EFFECT.CRITICAL_DAMAGE },
            { toId: CHAMPION.DEADPOOL, effectId: EFFECT.CRITICAL_DAMAGE },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.MAGNETOMARVELNOW, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.MOONKNIGHT, effectId: EFFECT.CRITICAL_DAMAGE },
            { toId: CHAMPION.DEADPOOL, effectId: EFFECT.CRITICAL_DAMAGE },
        ]),
    ]),

    ...fromId(CHAMPION.MAGNETO, [
        ...fromStars(2, [
            { toId: CHAMPION.CYCLOPS, effectId: EFFECT.BLOCK },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION.WOLVERINE, effectId: EFFECT.CRITICAL_RATE },
            { toId: CHAMPION.CYCLOPS, effectId: EFFECT.BLOCK },
            { toId: CHAMPION.STORM, effectId: EFFECT.CRITICAL_DAMAGE },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.WOLVERINE, effectId: EFFECT.CRITICAL_RATE },
            { toId: CHAMPION.CYCLOPS, effectId: EFFECT.BLOCK },
            { toId: CHAMPION.STORM, effectId: EFFECT.CRITICAL_DAMAGE },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION.WOLVERINE, effectId: EFFECT.CRITICAL_RATE },
            { toId: CHAMPION.CYCLOPS, effectId: EFFECT.BLOCK },
            { toId: CHAMPION.STORM, effectId: EFFECT.CRITICAL_DAMAGE },
        ]),
    ]),

    ...fromId(CHAMPION.MAGNETOMARVELNOW, [
        ...fromStars(2, [
            { toId: CHAMPION.CYCLOPS, effectId: EFFECT.PERFECT_BLOCK },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION.CYCLOPS, effectId: EFFECT.PERFECT_BLOCK },
            { toId: CHAMPION.MAGIK, effectId: EFFECT.PERFECT_BLOCK },
            { toId: CHAMPION.WOLVERINE, effectId: EFFECT.CRITICAL_DAMAGE },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.CYCLOPS, effectId: EFFECT.PERFECT_BLOCK },
            { toId: CHAMPION.MAGIK, effectId: EFFECT.PERFECT_BLOCK },
            { toId: CHAMPION.WOLVERINE, effectId: EFFECT.CRITICAL_DAMAGE },
        ]),
    ]),

    ...fromId(CHAMPION.NIGHTCRAWLER, [
        ...fromStars(3, [
            { toId: CHAMPION.BEAST, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.JUGGERNAUT, effectId: EFFECT.CRITICAL_RATE },
            ...toIds([ CHAMPION.CYCLOPS, CHAMPION.CYCLOPS90S ], { effectId: EFFECT.PERFECT_BLOCK }),
            { toId: CHAMPION.X23, effectId: EFFECT.CRITICAL_DAMAGE },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.BEAST, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.JUGGERNAUT, effectId: EFFECT.CRITICAL_RATE },
            ...toIds([ CHAMPION.CYCLOPS, CHAMPION.CYCLOPS90S ], { effectId: EFFECT.PERFECT_BLOCK }),
            { toId: CHAMPION.X23, effectId: EFFECT.CRITICAL_DAMAGE },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION.BEAST, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.JUGGERNAUT, effectId: EFFECT.CRITICAL_RATE },
            ...toIds([ CHAMPION.CYCLOPS, CHAMPION.CYCLOPS90S ], { effectId: EFFECT.PERFECT_BLOCK }),
            { toId: CHAMPION.X23, effectId: EFFECT.CRITICAL_DAMAGE },
        ]),
    ]),

    ...fromId(CHAMPION.STORM, [
        ...fromStars(2, [
            { toId: CHAMPION.BLACKPANTHER, effectId: EFFECT.POWER_GAIN },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION.MAGIK, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.CYCLOPS, effectId: EFFECT.PERFECT_BLOCK },
            { toId: CHAMPION.BLACKPANTHER, effectId: EFFECT.POWER_GAIN },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.MAGIK, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.CYCLOPS, effectId: EFFECT.PERFECT_BLOCK },
            { toId: CHAMPION.BLACKPANTHER, effectId: EFFECT.POWER_GAIN },
            { toId: CHAMPION.MAGNETO, effectId: EFFECT.CRITICAL_RATE },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION.MAGIK, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.CYCLOPS, effectId: EFFECT.PERFECT_BLOCK },
            { toId: CHAMPION.BLACKPANTHER, effectId: EFFECT.POWER_GAIN },
            { toId: CHAMPION.MAGNETO, effectId: EFFECT.CRITICAL_RATE },
        ]),
    ]),

    ...fromId(CHAMPION.WOLVERINE, [
        ...fromStars(2, [
            { toId: CHAMPION.CYCLOPS, effectId: EFFECT.CRITICAL_DAMAGE },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION.CYCLOPS, effectId: EFFECT.CRITICAL_DAMAGE },
            { toId: CHAMPION.CAPTAINAMERICA, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.MAGNETO, effectId: EFFECT.CRITICAL_RATE },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.CYCLOPS, effectId: EFFECT.CRITICAL_DAMAGE },
            { toId: CHAMPION.CAPTAINAMERICA, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.MAGNETO, effectId: EFFECT.CRITICAL_RATE },
        ]),
    ]),

    ...fromId(CHAMPION.WOLVERINEOLDMAN, [
        ...fromStars(3, [
            { toId: CHAMPION.WOLVERINE, effectId: EFFECT.CRITICAL_RATE },
            { toId: CHAMPION.HAWKEYE, effectId: EFFECT.ARMOR },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.WOLVERINE, effectId: EFFECT.CRITICAL_RATE },
            { toId: CHAMPION.HAWKEYE, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.HULK, effectId: EFFECT.ATTACK },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION.WOLVERINE, effectId: EFFECT.CRITICAL_RATE },
            { toId: CHAMPION.HAWKEYE, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.HULK, effectId: EFFECT.ATTACK },
        ]),
    ]),

    ...fromId(CHAMPION.X23, [
        ...fromStars(3, [
            { toId: CHAMPION.WOLVERINE, effectId: EFFECT.HEALTH },
            { toId: CHAMPION.AGENTVENOM, effectId: EFFECT.PERFECT_BLOCK },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.WOLVERINE, effectId: EFFECT.HEALTH },
            { toId: CHAMPION.AGENTVENOM, effectId: EFFECT.PERFECT_BLOCK },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION.WOLVERINE, effectId: EFFECT.HEALTH },
            { toId: CHAMPION.AGENTVENOM, effectId: EFFECT.PERFECT_BLOCK },
        ]),
    ]),

    ...fromId(CHAMPION.AGENTVENOM, [
        ...fromStars(3, [
            { toId: CHAMPION.SPIDERMAN, effectId: EFFECT.IDOL },
            { toId: CHAMPION.VENOM, effectId: EFFECT.HEALTH },
            { toId: CHAMPION.SPIDERMANBLACK, effectId: EFFECT.HEALTH },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.SPIDERMAN, effectId: EFFECT.IDOL },
            { toId: CHAMPION.VENOM, effectId: EFFECT.HEALTH },
            { toId: CHAMPION.SPIDERMANBLACK, effectId: EFFECT.HEALTH },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION.SPIDERMAN, effectId: EFFECT.IDOL },
            { toId: CHAMPION.VENOM, effectId: EFFECT.HEALTH },
            { toId: CHAMPION.SPIDERMANBLACK, effectId: EFFECT.HEALTH },
        ]),
    ]),

    ...fromId(CHAMPION.BLACKPANTHER, [
        ...fromStars(2, [
            { toId: CHAMPION.IRONFIST, effectId: EFFECT.CRITICAL_DAMAGE },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION.IRONFIST, effectId: EFFECT.CRITICAL_DAMAGE },
            { toId: CHAMPION.STORM, effectId: EFFECT.POWER_GAIN },
            { toId: CHAMPION.DEADPOOL, effectId: EFFECT.CRITICAL_RATE },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.IRONFIST, effectId: EFFECT.CRITICAL_DAMAGE },
            { toId: CHAMPION.STORM, effectId: EFFECT.POWER_GAIN },
            { toId: CHAMPION.DEADPOOL, effectId: EFFECT.CRITICAL_RATE },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION.IRONFIST, effectId: EFFECT.CRITICAL_DAMAGE },
            { toId: CHAMPION.STORM, effectId: EFFECT.POWER_GAIN },
            { toId: CHAMPION.DEADPOOL, effectId: EFFECT.CRITICAL_RATE },
        ]),
    ]),

    ...fromId(CHAMPION.BLACKPANTHERCIVILWAR, [
        ...fromStars(3, [
            ...toIds([ CHAMPION.THEVISION, CHAMPION.BLACKWIDOW ], { effectId: EFFECT.ARMOR }),
            { toId: CHAMPION.WINTERSOLDIER, effectId: EFFECT.ATTACK },
            { toId: CHAMPION.ANTMAN, effectId: EFFECT.CRITICAL_DAMAGE },
            ...toIds([ CHAMPION.HAWKEYE, CHAMPION.BLACKPANTHER ], { effectId: EFFECT.BLEED }),
        ]),
        ...fromStars(4, [
            ...toIds([ CHAMPION.THEVISION, CHAMPION.BLACKWIDOW ], { effectId: EFFECT.ARMOR }),
            { toId: CHAMPION.WINTERSOLDIER, effectId: EFFECT.ATTACK },
            { toId: CHAMPION.ANTMAN, effectId: EFFECT.CRITICAL_DAMAGE },
            ...toIds([ CHAMPION.HAWKEYE, CHAMPION.BLACKPANTHER ], { effectId: EFFECT.BLEED }),
        ]),
        ...fromStars(5, [
            ...toIds([ CHAMPION.THEVISION, CHAMPION.BLACKWIDOW ], { effectId: EFFECT.ARMOR }),
            { toId: CHAMPION.WINTERSOLDIER, effectId: EFFECT.ATTACK },
            { toId: CHAMPION.ANTMAN, effectId: EFFECT.CRITICAL_DAMAGE },
            ...toIds([ CHAMPION.HAWKEYE, CHAMPION.BLACKPANTHER ], { effectId: EFFECT.BLEED }),
        ]),
    ]),

    ...fromId(CHAMPION.CROSSBONES, [
        ...fromStars(3, [
            ...toIds([ CHAMPION.CAPTAINAMERICA, CHAMPION.CAPTAINAMERICAWWII, CHAMPION.FALCON ], { effectId: EFFECT.CRITICAL_RATE }),
            ...toIds([ CHAMPION.WINTERSOLDIER, CHAMPION.BLACKWIDOW ], { effectId: EFFECT.CRITICAL_DAMAGE }),
        ]),
        ...fromStars(4, [
            ...toIds([ CHAMPION.CAPTAINAMERICA, CHAMPION.CAPTAINAMERICAWWII, CHAMPION.FALCON ], { effectId: EFFECT.CRITICAL_RATE }),
            ...toIds([ CHAMPION.WINTERSOLDIER, CHAMPION.BLACKWIDOW ], { effectId: EFFECT.CRITICAL_DAMAGE }),
        ]),
        ...fromStars(5, [
            ...toIds([ CHAMPION.CAPTAINAMERICA, CHAMPION.CAPTAINAMERICAWWII, CHAMPION.FALCON ], { effectId: EFFECT.CRITICAL_RATE }),
            ...toIds([ CHAMPION.WINTERSOLDIER, CHAMPION.BLACKWIDOW ], { effectId: EFFECT.CRITICAL_DAMAGE }),
        ]),
    ]),

    ...fromId(CHAMPION.DAREDEVIL, [
        ...fromStars(3, [
            { toId: CHAMPION.SUPERIORIRONMAN, effectId: EFFECT.CRITICAL_DAMAGE },
            { toId: CHAMPION.BLACKWIDOW, effectId: EFFECT.POWER_GAIN },
            { toId: CHAMPION.ELEKTRA, effectId: EFFECT.POWER_GAIN },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.SUPERIORIRONMAN, effectId: EFFECT.CRITICAL_DAMAGE },
            { toId: CHAMPION.BLACKWIDOW, effectId: EFFECT.POWER_GAIN },
            { toId: CHAMPION.ELEKTRA, effectId: EFFECT.POWER_GAIN },
        ]),
    ]),

    ...fromId(CHAMPION.DAREDEVILNETFLIX, [
        ...fromStars(2, [
            { toId: CHAMPION.ELEKTRA, effectId: EFFECT.POWER_GAIN },
            { toId: CHAMPION.PUNISHER, effectId: EFFECT.CRITICAL_DAMAGE },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION.ELEKTRA, effectId: EFFECT.POWER_GAIN },
            { toId: CHAMPION.LUKECAGE, effectId: EFFECT.PERFECT_BLOCK },
            { toId: CHAMPION.PUNISHER, effectId: EFFECT.CRITICAL_DAMAGE },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.ELEKTRA, effectId: EFFECT.POWER_GAIN },
            { toId: CHAMPION.LUKECAGE, effectId: EFFECT.PERFECT_BLOCK },
            { toId: CHAMPION.PUNISHER, effectId: EFFECT.CRITICAL_DAMAGE },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION.ELEKTRA, effectId: EFFECT.POWER_GAIN },
            { toId: CHAMPION.LUKECAGE, effectId: EFFECT.PERFECT_BLOCK },
            { toId: CHAMPION.PUNISHER, effectId: EFFECT.CRITICAL_DAMAGE },
        ]),
    ]),

    ...fromId(CHAMPION.ELEKTRA, [
        ...fromStars(3, [
            { toId: CHAMPION.WOLVERINE, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.DAREDEVIL, effectId: EFFECT.POWER_GAIN },
            { toId: CHAMPION.BLACKWIDOW, effectId: EFFECT.CRITICAL_DAMAGE },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.WOLVERINE, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.DAREDEVIL, effectId: EFFECT.POWER_GAIN },
            { toId: CHAMPION.DEADPOOL, effectId: EFFECT.PERFECT_BLOCK },
            { toId: CHAMPION.BLACKWIDOW, effectId: EFFECT.CRITICAL_DAMAGE },
        ]),
    ]),

    ...fromId(CHAMPION.FALCON, [
        ...fromStars(3, [
            ...toIds([ CHAMPION.CAPTAINAMERICA, CHAMPION.CAPTAINAMERICAWWII ], { effectId: EFFECT.ARMOR }),
            ...toIds([ CHAMPION.WARMACHINE, CHAMPION.BLACKWIDOW ], { effectId: EFFECT.CRITICAL_RATE }),
            ...toIds([ CHAMPION.THEVISION, CHAMPION.BLACKPANTHERCIVILWAR ], { effectId: EFFECT.CRITICAL_RATE }),
            ...toIds([ CHAMPION.ANTMAN, CHAMPION.HAWKEYE ], { effectId: EFFECT.PERFECT_BLOCK }),
        ]),
        ...fromStars(4, [
            ...toIds([ CHAMPION.CAPTAINAMERICA, CHAMPION.CAPTAINAMERICAWWII ], { effectId: EFFECT.ARMOR }),
            ...toIds([ CHAMPION.WARMACHINE, CHAMPION.BLACKWIDOW ], { effectId: EFFECT.CRITICAL_RATE }),
            ...toIds([ CHAMPION.THEVISION, CHAMPION.BLACKPANTHERCIVILWAR ], { effectId: EFFECT.CRITICAL_RATE }),
            ...toIds([ CHAMPION.ANTMAN, CHAMPION.HAWKEYE ], { effectId: EFFECT.PERFECT_BLOCK }),
        ]),
        ...fromStars(5, [
            ...toIds([ CHAMPION.CAPTAINAMERICA, CHAMPION.CAPTAINAMERICAWWII ], { effectId: EFFECT.ARMOR }),
            ...toIds([ CHAMPION.WARMACHINE, CHAMPION.BLACKWIDOW ], { effectId: EFFECT.CRITICAL_RATE }),
            ...toIds([ CHAMPION.THEVISION, CHAMPION.BLACKPANTHERCIVILWAR ], { effectId: EFFECT.CRITICAL_RATE }),
            ...toIds([ CHAMPION.ANTMAN, CHAMPION.HAWKEYE ], { effectId: EFFECT.PERFECT_BLOCK }),
        ]),
    ]),

    ...fromId(CHAMPION.HAWKEYE, [
        ...fromStars(2, [
            { toId: CHAMPION.SCARLETWITCH, effectId: EFFECT.POWER_GAIN },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION.SCARLETWITCH, effectId: EFFECT.POWER_GAIN },
            { toId: CHAMPION.MOONKNIGHT, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.IRONMAN, effectId: EFFECT.ARMOR },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.SCARLETWITCH, effectId: EFFECT.POWER_GAIN },
            { toId: CHAMPION.MOONKNIGHT, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.IRONMAN, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.HULK, effectId: EFFECT.ARMOR },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION.SCARLETWITCH, effectId: EFFECT.POWER_GAIN },
            { toId: CHAMPION.MOONKNIGHT, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.IRONMAN, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.HULK, effectId: EFFECT.ARMOR },
        ]),
    ]),

    ...fromId(CHAMPION.MOONKNIGHT, [
        ...fromStars(3, [
            { toId: CHAMPION.SPIDERMAN, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.DAREDEVIL, effectId: EFFECT.PERFECT_BLOCK },
            { toId: CHAMPION.DEADPOOLXFORCE, effectId: EFFECT.CRITICAL_DAMAGE },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.SPIDERMAN, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.DAREDEVIL, effectId: EFFECT.PERFECT_BLOCK },
            { toId: CHAMPION.DEADPOOLXFORCE, effectId: EFFECT.CRITICAL_DAMAGE },
            { toId: CHAMPION.IRONPATRIOT, effectId: EFFECT.CRITICAL_RATE },
        ]),
    ]),

    ...fromId(CHAMPION.PUNISHER, [
        ...fromStars(2, [
            { toId: CHAMPION.SPIDERMAN, effectId: EFFECT.CRITICAL_DAMAGE },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION.SPIDERMAN, effectId: EFFECT.CRITICAL_DAMAGE },
            { toId: CHAMPION.RHINO, effectId: EFFECT.PERFECT_BLOCK },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.SPIDERMAN, effectId: EFFECT.CRITICAL_DAMAGE },
            { toId: CHAMPION.RHINO, effectId: EFFECT.PERFECT_BLOCK },
        ]),
    ]),

    ...fromId(CHAMPION.WINTERSOLDIER, [
        ...fromStars(2, [
            { toId: CHAMPION.WOLVERINE, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.CAPTAINAMERICA, effectId: EFFECT.PERFECT_BLOCK },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION.WOLVERINE, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.CAPTAINAMERICA, effectId: EFFECT.PERFECT_BLOCK },
            { toId: CHAMPION.CAPTAINAMERICAWWII, effectId: EFFECT.ARMOR },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.WOLVERINE, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.CAPTAINAMERICA, effectId: EFFECT.PERFECT_BLOCK },
            { toId: CHAMPION.CAPTAINAMERICAWWII, effectId: EFFECT.ARMOR },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION.WOLVERINE, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.CAPTAINAMERICA, effectId: EFFECT.PERFECT_BLOCK },
            { toId: CHAMPION.CAPTAINAMERICAWWII, effectId: EFFECT.ARMOR },
        ]),
    ]),

    ...fromId(CHAMPION.BLACKWIDOW, [
        ...fromStars(2, [
            { toId: CHAMPION.CAPTAINMARVEL, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.WINTERSOLDIER, effectId: EFFECT.POWER_GAIN },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION.HULK, effectId: EFFECT.STUN_SPECIAL },
            { toId: CHAMPION.CAPTAINMARVEL, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.WINTERSOLDIER, effectId: EFFECT.POWER_GAIN },
            { toId: CHAMPION.HAWKEYE, effectId: EFFECT.POWER_GAIN },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.HULK, effectId: EFFECT.STUN_SPECIAL },
            { toId: CHAMPION.CAPTAINMARVEL, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.WINTERSOLDIER, effectId: EFFECT.POWER_GAIN },
            { toId: CHAMPION.HAWKEYE, effectId: EFFECT.POWER_GAIN },
        ]),
    ]),

    ...fromId(CHAMPION.ABOMINATION, [
        ...fromStars(2, [
            { toId: CHAMPION.RHINO, effectId: EFFECT.ARMOR },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION.RHINO, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.HULK, effectId: EFFECT.ATTACK },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.RHINO, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.HULK, effectId: EFFECT.ATTACK },
        ]),
    ]),

    ...fromId(CHAMPION.ANTMAN, [
        ...fromStars(2, [
            { toId: CHAMPION.YELLOWJACKET, effectId: EFFECT.ATTACK },
            { toId: CHAMPION.IRONMAN, effectId: EFFECT.PERFECT_BLOCK },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION.YELLOWJACKET, effectId: EFFECT.ATTACK },
            { toId: CHAMPION.SPIDERMAN, effectId: EFFECT.PERFECT_BLOCK },
            { toId: CHAMPION.IRONMAN, effectId: EFFECT.PERFECT_BLOCK },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.HULK, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.YELLOWJACKET, effectId: EFFECT.ATTACK },
            { toId: CHAMPION.SPIDERMAN, effectId: EFFECT.PERFECT_BLOCK },
            { toId: CHAMPION.IRONMAN, effectId: EFFECT.PERFECT_BLOCK },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION.HULK, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.YELLOWJACKET, effectId: EFFECT.ATTACK },
            { toId: CHAMPION.SPIDERMAN, effectId: EFFECT.PERFECT_BLOCK },
            { toId: CHAMPION.IRONMAN, effectId: EFFECT.PERFECT_BLOCK },
        ]),
    ]),

    ...fromId(CHAMPION.CAPTAINAMERICA, [
        ...fromStars(2, [
            { toId: CHAMPION.SPIDERMAN, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.SUPERIORIRONMAN, effectId: EFFECT.CRITICAL_RATE },
            { toId: CHAMPION.IRONMAN, effectId: EFFECT.ARMOR },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION.WINTERSOLDIER, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.SPIDERMAN, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.SUPERIORIRONMAN, effectId: EFFECT.CRITICAL_RATE },
            { toId: CHAMPION.IRONMAN, effectId: EFFECT.PERFECT_BLOCK },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.WINTERSOLDIER, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.SPIDERMAN, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.SUPERIORIRONMAN, effectId: EFFECT.CRITICAL_RATE },
            { toId: CHAMPION.IRONMAN, effectId: EFFECT.PERFECT_BLOCK },
        ]),
    ]),

    ...fromId(CHAMPION.CAPTAINAMERICAWWII, [
        ...fromStars(2, [
            { toId: CHAMPION.WINTERSOLDIER, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.WOLVERINE, effectId: EFFECT.ARMOR },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION.WINTERSOLDIER, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.WOLVERINE, effectId: EFFECT.ARMOR },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.WINTERSOLDIER, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.WOLVERINE, effectId: EFFECT.ARMOR },
        ]),
    ]),

    ...fromId(CHAMPION.ELECTRO, [
        ...fromStars(3, [
            { toId: CHAMPION.SPIDERMAN, effectId: EFFECT.ATTACK },
            { toId: CHAMPION.RHINO, effectId: EFFECT.ARMOR },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.SPIDERMAN, effectId: EFFECT.ATTACK },
            { toId: CHAMPION.RHINO, effectId: EFFECT.ARMOR },
        ]),
    ]),

    ...fromId(CHAMPION.HULK, [
        ...fromStars(2, [
            { toId: CHAMPION.THOR, effectId: EFFECT.CRITICAL_DAMAGE },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION.THOR, effectId: EFFECT.CRITICAL_DAMAGE },
            { toId: CHAMPION.ABOMINATION, effectId: EFFECT.CRITICAL_RATE },
            { toId: CHAMPION.HAWKEYE, effectId: EFFECT.ARMOR },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.THOR, effectId: EFFECT.CRITICAL_DAMAGE },
            { toId: CHAMPION.ABOMINATION, effectId: EFFECT.CRITICAL_RATE },
            { toId: CHAMPION.HAWKEYE, effectId: EFFECT.ARMOR },
        ]),
    ]),

    ...fromId(CHAMPION.JOEFIXIT, [
        ...fromStars(3, [
            { toId: CHAMPION.WOLVERINE, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.MOONKNIGHT, effectId: EFFECT.CRITICAL_RATE },
            { toId: CHAMPION.HULK, effectId: EFFECT.ATTACK },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.WOLVERINE, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.MOONKNIGHT, effectId: EFFECT.CRITICAL_RATE },
            { toId: CHAMPION.MSMARVEL, effectId: EFFECT.CRITICAL_RATE },
            { toId: CHAMPION.HULK, effectId: EFFECT.ATTACK },
        ]),
    ]),

    ...fromId(CHAMPION.LUKECAGE, [
        ...fromStars(3, [
            { toId: CHAMPION.IRONFIST, effectId: EFFECT.HEROES_FOR_HIRE },
            ...toIds([ CHAMPION.JUGGERNAUT, CHAMPION.IRONPATRIOT ], { effectId: EFFECT.THUNDERBOLTS }),
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.IRONFIST, effectId: EFFECT.HEROES_FOR_HIRE },
            ...toIds([ CHAMPION.JUGGERNAUT, CHAMPION.IRONPATRIOT ], { effectId: EFFECT.THUNDERBOLTS }),
        ]),
        ...fromStars(5, [
            { toId: CHAMPION.IRONFIST, effectId: EFFECT.HEROES_FOR_HIRE },
            ...toIds([ CHAMPION.JUGGERNAUT, CHAMPION.IRONPATRIOT ], { effectId: EFFECT.THUNDERBOLTS }),
        ]),
    ]),

    ...fromId(CHAMPION.RHINO, [
        ...fromStars(2, [
            { toId: CHAMPION.SPIDERMAN, effectId: EFFECT.CRITICAL_RATE },
            { toId: CHAMPION.ABOMINATION, effectId: EFFECT.ARMOR },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION.SPIDERMAN, effectId: EFFECT.CRITICAL_RATE },
            { toId: CHAMPION.ABOMINATION, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.ELECTRO, effectId: EFFECT.PERFECT_BLOCK },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.SPIDERMAN, effectId: EFFECT.CRITICAL_RATE },
            { toId: CHAMPION.ABOMINATION, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.ELECTRO, effectId: EFFECT.PERFECT_BLOCK },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION.SPIDERMAN, effectId: EFFECT.CRITICAL_RATE },
            { toId: CHAMPION.ABOMINATION, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.ELECTRO, effectId: EFFECT.PERFECT_BLOCK },
        ]),
    ]),

    ...fromId(CHAMPION.REDHULK, [
        ...fromStars(3, [
            { toId: CHAMPION.ABOMINATION, effectId: EFFECT.CRITICAL_RATE },
            { toId: CHAMPION.HULK, effectId: EFFECT.ATTACK },
            { toId: CHAMPION.X23, effectId: EFFECT.PERFECT_BLOCK },
            ...toIds([ CHAMPION.ELEKTRA, CHAMPION.AGENTVENOM ], { effectId: EFFECT.THUNDERBOLTS }),
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.ABOMINATION, effectId: EFFECT.CRITICAL_RATE },
            { toId: CHAMPION.HULK, effectId: EFFECT.ATTACK },
            { toId: CHAMPION.X23, effectId: EFFECT.PERFECT_BLOCK },
            ...toIds([ CHAMPION.ELEKTRA, CHAMPION.AGENTVENOM ], { effectId: EFFECT.THUNDERBOLTS }),
        ]),
        ...fromStars(5, [
            { toId: CHAMPION.ABOMINATION, effectId: EFFECT.CRITICAL_RATE },
            { toId: CHAMPION.HULK, effectId: EFFECT.ATTACK },
            { toId: CHAMPION.X23, effectId: EFFECT.PERFECT_BLOCK },
            ...toIds([ CHAMPION.ELEKTRA, CHAMPION.AGENTVENOM ], { effectId: EFFECT.THUNDERBOLTS }),
        ]),
    ]),

    ...fromId(CHAMPION.SHEHULK, [
        ...fromStars(3, [
            { toId: CHAMPION.HULK, effectId: EFFECT.HEALTH },
            { toId: CHAMPION.SUPERIORIRONMAN, effectId: EFFECT.POWER_GAIN },
            { toId: CHAMPION.KAMALAKHAN, effectId: EFFECT.PERFECT_BLOCK },
            { toId: CHAMPION.DAREDEVIL, effectId: EFFECT.STUN_ACTIVATION },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.HULK, effectId: EFFECT.HEALTH },
            { toId: CHAMPION.SUPERIORIRONMAN, effectId: EFFECT.POWER_GAIN },
            { toId: CHAMPION.KAMALAKHAN, effectId: EFFECT.PERFECT_BLOCK },
            { toId: CHAMPION.DAREDEVIL, effectId: EFFECT.STUN_ACTIVATION },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION.HULK, effectId: EFFECT.HEALTH },
            { toId: CHAMPION.SUPERIORIRONMAN, effectId: EFFECT.POWER_GAIN },
            { toId: CHAMPION.KAMALAKHAN, effectId: EFFECT.PERFECT_BLOCK },
            { toId: CHAMPION.DAREDEVIL, effectId: EFFECT.STUN_ACTIVATION },
        ]),
    ]),

    ...fromId(CHAMPION.SPIDERMAN, [
        ...fromStars(1, [
            { toId: CHAMPION.WOLVERINE, effectId: EFFECT.HEALTH },
            { toId: CHAMPION.HAWKEYE, effectId: EFFECT.ATTACK },
        ]),
        ...fromStars(2, [
            { toId: CHAMPION.WOLVERINE, effectId: EFFECT.HEALTH },
            { toId: CHAMPION.HAWKEYE, effectId: EFFECT.ATTACK },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION.WOLVERINE, effectId: EFFECT.HEALTH },
            { toId: CHAMPION.HAWKEYE, effectId: EFFECT.ATTACK },
            { toId: CHAMPION.ELECTRO, effectId: EFFECT.CRITICAL_RATE },
            { toId: CHAMPION.CAPTAINAMERICA, effectId: EFFECT.ARMOR },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.WOLVERINE, effectId: EFFECT.HEALTH },
            { toId: CHAMPION.HAWKEYE, effectId: EFFECT.ATTACK },
            { toId: CHAMPION.ELECTRO, effectId: EFFECT.CRITICAL_RATE },
            { toId: CHAMPION.CAPTAINAMERICA, effectId: EFFECT.ARMOR },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION.WOLVERINE, effectId: EFFECT.HEALTH },
            { toId: CHAMPION.HAWKEYE, effectId: EFFECT.ATTACK },
            { toId: CHAMPION.ELECTRO, effectId: EFFECT.CRITICAL_RATE },
            { toId: CHAMPION.CAPTAINAMERICA, effectId: EFFECT.ARMOR },
        ]),
    ]),

    ...fromId(CHAMPION.SPIDERGWEN, [
        ...fromStars(3, [
            { toId: CHAMPION.RHINO, effectId: EFFECT.CRITICAL_RATE },
            { toId: CHAMPION.DAREDEVIL, effectId: EFFECT.CRITICAL_RATE },
            { toId: CHAMPION.SPIDERMAN, effectId: EFFECT.POWER_GAIN },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.RHINO, effectId: EFFECT.CRITICAL_RATE },
            { toId: CHAMPION.DAREDEVIL, effectId: EFFECT.CRITICAL_RATE },
            { toId: CHAMPION.SPIDERMAN, effectId: EFFECT.POWER_GAIN },
            { toId: CHAMPION.PUNISHER, effectId: EFFECT.CRITICAL_DAMAGE },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION.RHINO, effectId: EFFECT.CRITICAL_RATE },
            { toId: CHAMPION.DAREDEVIL, effectId: EFFECT.CRITICAL_RATE },
            { toId: CHAMPION.SPIDERMAN, effectId: EFFECT.POWER_GAIN },
            { toId: CHAMPION.PUNISHER, effectId: EFFECT.CRITICAL_DAMAGE },
        ]),
    ]),

    ...fromId(CHAMPION.SPIDERMANMORALES, [
        ...fromStars(3, [
            { toId: CHAMPION.VENOM, effectId: EFFECT.ATTACK },
            { toId: CHAMPION.SPIDERGWEN, effectId: EFFECT.PERFECT_BLOCK },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.ELECTRO, effectId: EFFECT.CRITICAL_RATE },
            { toId: CHAMPION.IRONPATRIOT, effectId: EFFECT.CRITICAL_RATE },
            { toId: CHAMPION.VENOM, effectId: EFFECT.ATTACK },
            { toId: CHAMPION.SPIDERGWEN, effectId: EFFECT.PERFECT_BLOCK },
        ]),
    ]),

    ...fromId(CHAMPION.YELLOWJACKET, [
        ...fromStars(2, [
            { toId: CHAMPION.ANTMAN, effectId: EFFECT.ATTACK },
            { toId: CHAMPION.ULTRON, effectId: EFFECT.CRITICAL_DAMAGE },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION.ANTMAN, effectId: EFFECT.ATTACK },
            { toId: CHAMPION.ULTRON, effectId: EFFECT.CRITICAL_DAMAGE },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.ANTMAN, effectId: EFFECT.ATTACK },
            { toId: CHAMPION.ULTRON, effectId: EFFECT.CRITICAL_DAMAGE },
        ]),
    ]),

    ...fromId(CHAMPION.DRSTRANGE, [
        ...fromStars(3, [
            { toId: CHAMPION.THOR, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.SPIDERMAN, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.SCARLETWITCH, effectId: EFFECT.BLOCK },
            { toId: CHAMPION.BLACKBOLT, effectId: EFFECT.PERFECT_BLOCK },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.THOR, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.SPIDERMAN, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.SCARLETWITCH, effectId: EFFECT.BLOCK },
            { toId: CHAMPION.BLACKBOLT, effectId: EFFECT.PERFECT_BLOCK },
        ]),
    ]),

    ...fromId(CHAMPION.IRONFIST, [
        ...fromStars(2, [
            { toId: CHAMPION.BLACKPANTHER, effectId: EFFECT.ARMOR },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION.BLACKPANTHER, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.DRSTRANGE, effectId: EFFECT.ARMOR },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.BLACKPANTHER, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.DRSTRANGE, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.WOLVERINE, effectId: EFFECT.ARMOR },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION.BLACKPANTHER, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.DRSTRANGE, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.WOLVERINE, effectId: EFFECT.ARMOR },
        ]),
    ]),

    ...fromId(CHAMPION.IRONFISTWHITE, [
        ...fromStars(3, [
            { toId: CHAMPION.DRSTRANGE, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.DAREDEVIL, effectId: EFFECT.ARMOR },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.DRSTRANGE, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.DAREDEVIL, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.WARMACHINE, effectId: EFFECT.PERFECT_BLOCK },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION.DRSTRANGE, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.DAREDEVIL, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.WARMACHINE, effectId: EFFECT.PERFECT_BLOCK },
        ]),
    ]),

    ...fromId(CHAMPION.GUILLOTINE, [
        ...fromStars(2, [
            { toId: CHAMPION.VENOM, effectId: EFFECT.ATTACK },
            { toId: CHAMPION.CAPTAINAMERICAWWII, effectId: EFFECT.PERFECT_BLOCK },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION.VENOM, effectId: EFFECT.ATTACK },
            { toId: CHAMPION.CAPTAINAMERICAWWII, effectId: EFFECT.PERFECT_BLOCK },
            { toId: CHAMPION.MAGIK, effectId: EFFECT.CRITICAL_DAMAGE },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.BLACKPANTHER, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.VENOM, effectId: EFFECT.ATTACK },
            { toId: CHAMPION.CAPTAINAMERICAWWII, effectId: EFFECT.PERFECT_BLOCK },
            { toId: CHAMPION.MAGIK, effectId: EFFECT.CRITICAL_DAMAGE },
        ]),
    ]),

    ...fromId(CHAMPION.JUGGERNAUT, [
        ...fromStars(2, [
            { toId: CHAMPION.COLOSSUS, effectId: EFFECT.CRITICAL_RATE },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION.DRSTRANGE, effectId: EFFECT.ATTACK },
            { toId: CHAMPION.COLOSSUS, effectId: EFFECT.CRITICAL_RATE },
            { toId: CHAMPION.HULK, effectId: EFFECT.CRITICAL_RATE },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.DRSTRANGE, effectId: EFFECT.ATTACK },
            { toId: CHAMPION.COLOSSUS, effectId: EFFECT.CRITICAL_RATE },
            { toId: CHAMPION.HULK, effectId: EFFECT.CRITICAL_RATE },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION.DRSTRANGE, effectId: EFFECT.ATTACK },
            { toId: CHAMPION.COLOSSUS, effectId: EFFECT.CRITICAL_RATE },
            { toId: CHAMPION.HULK, effectId: EFFECT.CRITICAL_RATE },
        ]),
    ]),

    ...fromId(CHAMPION.MAGIK, [
        ...fromStars(2, [
            { toId: CHAMPION.COLOSSUS, effectId: EFFECT.HEALTH },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION.STORM, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.COLOSSUS, effectId: EFFECT.HEALTH },
            { toId: CHAMPION.CYCLOPS, effectId: EFFECT.PERFECT_BLOCK },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.STORM, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.COLOSSUS, effectId: EFFECT.HEALTH },
            { toId: CHAMPION.CYCLOPS, effectId: EFFECT.PERFECT_BLOCK },
            { toId: CHAMPION.JUGGERNAUT, effectId: EFFECT.CRITICAL_RATE },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION.STORM, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.COLOSSUS, effectId: EFFECT.HEALTH },
            { toId: CHAMPION.CYCLOPS, effectId: EFFECT.PERFECT_BLOCK },
            { toId: CHAMPION.JUGGERNAUT, effectId: EFFECT.CRITICAL_RATE },
        ]),
    ]),

    ...fromId(CHAMPION.SCARLETWITCH, [
        ...fromStars(2, [
            { toId: CHAMPION.CAPTAINMARVEL, effectId: EFFECT.ARMOR },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION.CAPTAINMARVEL, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.VISION, effectId: EFFECT.POWER_GAIN },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.CAPTAINMARVEL, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.VISION, effectId: EFFECT.POWER_GAIN },
        ]),
    ]),

    ...fromId(CHAMPION.THORJANEFOSTER, [
        ...fromStars(3, [
            { toId: CHAMPION.THOR, effectId: EFFECT.POWER_GAIN },
            { toId: CHAMPION.VISION, effectId: EFFECT.PERFECT_BLOCK },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.BLACKWIDOW, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.THOR, effectId: EFFECT.POWER_GAIN },
            { toId: CHAMPION.VISION, effectId: EFFECT.PERFECT_BLOCK },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION.BLACKWIDOW, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.THOR, effectId: EFFECT.POWER_GAIN },
            { toId: CHAMPION.VISION, effectId: EFFECT.PERFECT_BLOCK },
        ]),
    ]),

    ...fromId(CHAMPION.UNSTOPPABLECOLOSSUS, [
        ...fromStars(2, [
            { toId: CHAMPION.MAGIK, effectId: EFFECT.HEALTH },
            { toId: CHAMPION.JUGGERNAUT, effectId: EFFECT.CRITICAL_DAMAGE },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION.WOLVERINE, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.MAGIK, effectId: EFFECT.HEALTH },
            { toId: CHAMPION.CYCLOPS, effectId: EFFECT.PERFECT_BLOCK },
            { toId: CHAMPION.JUGGERNAUT, effectId: EFFECT.CRITICAL_DAMAGE },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION.WOLVERINE, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.MAGIK, effectId: EFFECT.HEALTH },
            { toId: CHAMPION.CYCLOPS, effectId: EFFECT.PERFECT_BLOCK },
            { toId: CHAMPION.JUGGERNAUT, effectId: EFFECT.CRITICAL_DAMAGE },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION.WOLVERINE, effectId: EFFECT.ARMOR },
            { toId: CHAMPION.MAGIK, effectId: EFFECT.HEALTH },
            { toId: CHAMPION.CYCLOPS, effectId: EFFECT.PERFECT_BLOCK },
            { toId: CHAMPION.JUGGERNAUT, effectId: EFFECT.CRITICAL_DAMAGE },
        ]),
    ]),

].map((synergy) => new Synergy({
    ...synergy,
    effectAmount: effectAmount(synergy.effectId, synergy.fromStars),
}));

function effectAmount(effectId, fromStars) {
    const amounts = EFFECT_STARS_AMOUNT[ effectId ];
    if(!amounts) {
        return 0;
    }
    return amounts[ EFFECT_STARS_INDEX[ fromStars ] || 0 ] || 0;
}

function synergiesFromChampions(champions) {
    const groups = {};
    const validChampions = champions.filter((champion) => champion);
    return synergies.filter(({ attr: { fromId, fromStars, toId, group } }) => {
        const id = `${ fromId }-${ fromStars }`;
        const found = validChampions.find((champion) => champion.id === id) &&
            validChampions.find(({ attr: { uid } }) => uid === toId);
        if(!found) {
            return false;
        }
        if(group) {
            if(groups[ group ]) {
                return false;
            }
            groups[ group ] = true;
        }
        return true;
    });
}

export { synergiesFromChampions };
export default synergies;
