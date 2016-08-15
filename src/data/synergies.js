import { CHAMPION } from './model/Champion';
import { EFFECT } from './model/Effect';
import { EFFECT_STARS_AMOUNT, EFFECT_STARS_INDEX } from './effects';
import Synergy from './model/Synergy';

function arrayRange(min, max) {
    const array = [];
    for(let i = min; i <= max; i++) {
        array.push(i);
    }
    return array;
}

function fromId(fromId, synergies) {
    return synergies.map((synergy) => ({
        ...synergy,
        fromId,
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

/**
  * fromStars(fromStarsMin, [fromStarsMax,] [toIds,] synergy)
  */
function fromStars(fromStarsMin, ...args) {
    let fromStarsMax = fromStarsMin;
    let toIdList;
    let synergy;
    args.forEach((arg) => {
        if(Number.isInteger(arg)) {
            fromStarsMax = arg;
        }
        else if(Array.isArray(arg)) {
            toIdList = arg;
        }
        else {
            synergy = arg;
        }
    });
    const fromStarsRange = arrayRange(fromStarsMin, fromStarsMax);
    if(toIdList) {
        const synergies = [];
        fromStarsRange
            .map((fromStars) => ({
                ...synergy,
                fromStars,
            }))
            .forEach((synergy) => {
                synergies.push(...toIds(toIdList, synergy));
            });
        return synergies;
    }
    return fromStarsRange.map((fromStars) => ({
        ...synergy,
        fromStars,
    }));
}

const synergies = [

    ...fromId(CHAMPION.BLACKBOLT, [
        ...fromStars(2, 4, [ CHAMPION.KAMALAKHAN, CHAMPION.RONAN ], { effectId: EFFECT.COSMIC_SUPREMACY }),
        ...fromStars(2, 4, [ CHAMPION.SPIDERMAN, CHAMPION.CYCLOPS ], { effectId: EFFECT.ARMOR }),
        ...fromStars(3, 4, { toId: CHAMPION.KANG, effectId: EFFECT.ATTACK }),
        ...fromStars(3, 4, { toId: CHAMPION.HULK, effectId: EFFECT.CRITICAL_DAMAGE }),
    ]),

    ...fromId(CHAMPION.CAPTAINMARVEL, [
        ...fromStars(3, 5, { toId: CHAMPION.CAPTAINAMERICA, effectId: EFFECT.ARMOR }),
        ...fromStars(3, 5, { toId: CHAMPION.GAMORA, effectId: EFFECT.ARMOR }),
        ...fromStars(3, 5, { toId: CHAMPION.IRONMAN, effectId: EFFECT.ARMOR }),
        ...fromStars(4, 5, { toId: CHAMPION.WOLVERINE, effectId: EFFECT.POWER_GAIN }),
    ]),

    ...fromId(CHAMPION.DRAX, [
        ...fromStars(2, 5, { toId: CHAMPION.STARLORD, effectId: EFFECT.PERFECT_BLOCK }),
        ...fromStars(2, 5, { toId: CHAMPION.GAMORA, effectId: EFFECT.CRITICAL_DAMAGE }),
        ...fromStars(3, 4, { toId: CHAMPION.AGENTVENOM, effectId: EFFECT.PERFECT_BLOCK }),
    ]),

    ...fromId(CHAMPION.GAMORA, [
        ...fromStars(2, 4, { toId: CHAMPION.STARLORD, effectId: EFFECT.ARMOR }),
        ...fromStars(3, 4, { toId: CHAMPION.DRAX, effectId: EFFECT.CRITICAL_DAMAGE }),
        ...fromStars(3, 4, { toId: CHAMPION.AGENTVENOM, effectId: EFFECT.PERFECT_BLOCK }),
        ...fromStars(4, 4, { toId: CHAMPION.SHEHULK, effectId: EFFECT.ARMOR }),
    ]),

    ...fromId(CHAMPION.GROOT, [
        ...fromStars(3, 5, { toId: CHAMPION.STARLORD, effectId: EFFECT.ARMOR }),
        ...fromStars(3, 5, { toId: CHAMPION.DRAX, effectId: EFFECT.PERFECT_BLOCK }),
        ...fromStars(3, 5, { toId: CHAMPION.ROCKET, effectId: EFFECT.INSEPARABLE }),
    ]),

    ...fromId(CHAMPION.KAMALAKHAN, [
        ...fromStars(3, 5, { toId: CHAMPION.CAPTAINMARVEL, effectId: EFFECT.IDOL }),
        ...fromStars(3, 5, { toId: CHAMPION.MSMARVEL, effectId: EFFECT.IDOL }),
        ...fromStars(3, 5, { toId: CHAMPION.SPIDERMANMORALES, effectId: EFFECT.PERFECT_BLOCK }),
        ...fromStars(4, 5, { toId: CHAMPION.VISION, effectId: EFFECT.PERFECT_BLOCK }),
    ]),

    ...fromId(CHAMPION.MSMARVEL, [
        ...fromStars(3, 4, { toId: CHAMPION.CAPTAINAMERICA, effectId: EFFECT.ARMOR }),
        ...fromStars(3, 4, { toId: CHAMPION.IRONMAN, effectId: EFFECT.PERFECT_BLOCK }),
        ...fromStars(3, 4, { toId: CHAMPION.THOR, effectId: EFFECT.PERFECT_BLOCK }),
        ...fromStars(3, 4, { toId: CHAMPION.HULK, effectId: EFFECT.PERFECT_BLOCK }),
    ]),

    ...fromId(CHAMPION.RONAN, [
        ...fromStars(2, 5, { toId: CHAMPION.BLACKBOLT, effectId: EFFECT.CRITICAL_DAMAGE }),
        ...fromStars(3, 5, { toId: CHAMPION.IRONMAN, effectId: EFFECT.CRITICAL_RATE }),
        ...fromStars(3, 5, { toId: CHAMPION.GAMORA, effectId: EFFECT.CRITICAL_DAMAGE }),
        ...fromStars(4, 5, { toId: CHAMPION.HULK, effectId: EFFECT.CRITICAL_RATE }),
    ]),

    ...fromId(CHAMPION.SPIDERMANBLACK, [
        ...fromStars(3, 4, { toId: CHAMPION.STORM, effectId: EFFECT.ARMOR }),
        ...fromStars(3, 4, { toId: CHAMPION.ELECTRO, effectId: EFFECT.CRITICAL_RATE }),
        ...fromStars(3, 4, { toId: CHAMPION.AGENTVENOM, effectId: EFFECT.HEALTH }),
    ]),

    ...fromId(CHAMPION.SUPERIORIRONMAN, [
        ...fromStars(2, 4, { toId: CHAMPION.CAPTAINAMERICA, effectId: EFFECT.CRITICAL_RATE }),
        ...fromStars(2, 4, { toId: CHAMPION.DAREDEVIL, effectId: EFFECT.CRITICAL_DAMAGE }),
        ...fromStars(2, 4, { toId: CHAMPION.THOR, effectId: EFFECT.PERFECT_BLOCK }),
    ]),

    ...fromId(CHAMPION.THOR, [
        ...fromStars(2, 4, { toId: CHAMPION.DRSTRANGE, effectId: EFFECT.ARMOR }),
        ...fromStars(2, 4, { toId: CHAMPION.IRONMAN, effectId: EFFECT.ARMOR }),
        ...fromStars(3, 4, { toId: CHAMPION.JUGGERNAUT, effectId: EFFECT.CRITICAL_RATE }),
    ]),

    ...fromId(CHAMPION.VENOM, [
        ...fromStars(3, 5, { toId: CHAMPION.SPIDERMAN, effectId: EFFECT.ATTACK }),
        ...fromStars(3, 5, { toId: CHAMPION.SPIDERMANBLACK, effectId: EFFECT.HEALTH }),
        ...fromStars(3, 5, { toId: CHAMPION.ELECTRO, effectId: EFFECT.CRITICAL_DAMAGE }),
    ]),

    ...fromId(CHAMPION.VENOMPOOL, [
        ...fromStars(3, 5, [ CHAMPION.SPIDERMANBLACK, CHAMPION.AGENTVENOM ], { effectId: EFFECT.HEALTH }),
        ...fromStars(3, 5, { toId: CHAMPION.VENOM, effectId: EFFECT.INSEPARABLE }),
        ...fromStars(3, 5, { toId: CHAMPION.DEADPOOL, effectId: EFFECT.ARMOR }),
        ...fromStars(4, 5, { toId: CHAMPION.DEADPOOLXFORCE, effectId: EFFECT.ARMOR }),
    ]),

    ...fromId(CHAMPION.CIVILWARRIOR, [
        ...fromStars(3, 5, { toId: CHAMPION.WINTERSOLDIER, effectId: EFFECT.ARMOR }),
        ...fromStars(3, 5, { toId: CHAMPION.FALCON, effectId: EFFECT.ARMOR }),
        ...fromStars(3, 5, { toId: CHAMPION.GUILLOTINE, effectId: EFFECT.PERFECT_BLOCK }),
        ...fromStars(4, 5, [ CHAMPION.IRONMAN, CHAMPION.HULKBUSTER ], { effectId: EFFECT.CRITICAL_DAMAGE }),
    ]),

    ...fromId(CHAMPION.IRONMAN, [
        ...fromStars(2, 5, [ CHAMPION.THOR, CHAMPION.WARMACHINE ], { effectId: EFFECT.PERFECT_BLOCK }),
        ...fromStars(3, 5, { toId: CHAMPION.ULTRON, effectId: EFFECT.CRITICAL_RATE }),
        ...fromStars(3, 5, { toId: CHAMPION.CAPTAINAMERICA, effectId: EFFECT.ARMOR }),
        ...fromStars(4, 5, { toId: CHAMPION.THORJANEFOSTER, effectId: EFFECT.PERFECT_BLOCK }),
    ]),

    ...fromId(CHAMPION.IRONPATRIOT, [
        ...fromStars(3, 5, { toId: CHAMPION.IRONMAN, effectId: EFFECT.ARMOR }),
        ...fromStars(3, 5, { toId: CHAMPION.SPIDERMAN, effectId: EFFECT.CRITICAL_RATE }),
        ...fromStars(3, 5, { toId: CHAMPION.CAPTAINAMERICA, effectId: EFFECT.CRITICAL_DAMAGE }),
    ]),

    ...fromId(CHAMPION.KANG, [
        ...fromStars(4, { toId: CHAMPION.BLACKBOLT, effectId: EFFECT.ARMOR }),
        ...fromStars(4, { toId: CHAMPION.THEVISION, effectId: EFFECT.CRITICAL_RATE }),
        ...fromStars(4, { toId: CHAMPION.THOR, effectId: EFFECT.CRITICAL_RATE }),
    ]),

    ...fromId(CHAMPION.HULKBUSTER, [
        ...fromStars(2, 4, [ CHAMPION.HULK, CHAMPION.YELLOWJACKET ], { effectId: EFFECT.CRITICAL_DAMAGE }),
        ...fromStars(3, 4, { toId: CHAMPION.IRONMAN, effectId: EFFECT.HEALTH }),
        ...fromStars(3, 4, { toId: CHAMPION.SUPERIORIRONMAN, effectId: EFFECT.HEALTH }),
        ...fromStars(4, 4, { toId: CHAMPION.ULTRON, effectId: EFFECT.CRITICAL_RATE }),
    ]),

    ...fromId(CHAMPION.ROCKET, [
        ...fromStars(2, 4, [ CHAMPION.STARLORD, CHAMPION.GROOT ], { effectId: EFFECT.ARMOR }),
        ...fromStars(2, 4, { toId: CHAMPION.GAMORA, effectId: EFFECT.PERFECT_BLOCK }),
        ...fromStars(3, 4, { toId: CHAMPION.RONAN, effectId: EFFECT.CRITICAL_RATE }),
        ...fromStars(3, 4, { toId: CHAMPION.DRAX, effectId: EFFECT.PERFECT_BLOCK }),
    ]),

    ...fromId(CHAMPION.STARLORD, [
        ...fromStars(2, 5, [ CHAMPION.ROCKET, CHAMPION.GROOT ], { effectId: EFFECT.ARMOR }),
        ...fromStars(2, 5, { toId: CHAMPION.DRAX, effectId: EFFECT.PERFECT_BLOCK }),
        ...fromStars(3, 5, { toId: CHAMPION.GAMORA, effectId: EFFECT.PERFECT_BLOCK }),
    ]),

    ...fromId(CHAMPION.VISION, [
        ...fromStars(2, 4, { toId: CHAMPION.SCARLETWITCH, effectId: EFFECT.POWER_GAIN }),
        ...fromStars(2, 4, { toId: CHAMPION.IRONMAN, effectId: EFFECT.PERFECT_BLOCK }),
        ...fromStars(3, 4, { toId: CHAMPION.MAGNETO, effectId: EFFECT.CRITICAL_RATE }),
    ]),

    ...fromId(CHAMPION.THEVISION, [
        ...fromStars(2, 4, { toId: CHAMPION.IRONMAN, effectId: EFFECT.HEALTH }),
        ...fromStars(2, 4, { toId: CHAMPION.SCARLETWITCH, effectId: EFFECT.CRITICAL_RATE }),
        ...fromStars(3, 4, { toId: CHAMPION.ULTRON, effectId: EFFECT.ATTACK }),
    ]),

    ...fromId(CHAMPION.ULTRON, [
        ...fromStars(2, 4, [ CHAMPION.IRONMAN, CHAMPION.SUPERIORIRONMAN ], { effectId: EFFECT.HEALTH }),
        ...fromStars(2, 4, { toId: CHAMPION.SCARLETWITCH, effectId: EFFECT.ARMOR }),
        ...fromStars(3, 4, { toId: CHAMPION.BLACKWIDOW, effectId: EFFECT.CRITICAL_RATE }),
    ]),

    ...fromId(CHAMPION.WARMACHINE, [
        ...fromStars(2, 4, { toId: CHAMPION.HULKBUSTER, effectId: EFFECT.ARMOR }),
        ...fromStars(3, 4, { toId: CHAMPION.HAWKEYE, effectId: EFFECT.CRITICAL_RATE }),
        ...fromStars(3, 4, { toId: CHAMPION.BLACKWIDOW, effectId: EFFECT.PERFECT_BLOCK }),
        ...fromStars(2, 4, { toId: CHAMPION.BLACKPANTHER, effectId: EFFECT.CRITICAL_RATE }),
    ]),

    ...fromId(CHAMPION.BEAST, [
        ...fromStars(4, 5, [ CHAMPION.SUPERIORIRONMAN, CHAMPION.BLACKPANTHER ], { effectId: EFFECT.MASTERMINDS }),
        ...fromStars(3, 5, [ CHAMPION.NIGHTCRAWLER, CHAMPION.COLOSSUS ], { effectId: EFFECT.MUTANT_AGENDA }),
        ...fromStars(3, 5, { toId: CHAMPION.IRONPATRIOT, effectId: EFFECT.CRITICAL_RATE }),
        ...fromStars(3, 5, { toId: CHAMPION.GAMBIT, effectId: EFFECT.ARMOR }),
    ]),

    ...fromId(CHAMPION.COLOSSUS, [
        ...fromStars(2, 4, { toId: CHAMPION.JUGGERNAUT, effectId: EFFECT.CRITICAL_RATE }),
        ...fromStars(3, 4, [ CHAMPION.WOLVERINE, CHAMPION.WOLVERINEOLDMAN ], { effectId: EFFECT.ARMOR }),
        ...fromStars(3, 4, { toId: CHAMPION.MAGIK, effectId: EFFECT.HEALTH }),
    ]),

    ...fromId(CHAMPION.CYCLOPS, [
        ...fromStars(2, 5, { toId: CHAMPION.WOLVERINE, effectId: EFFECT.CRITICAL_DAMAGE }),
        ...fromStars(2, 5, [ CHAMPION.STORM, CHAMPION.COLOSSUS ], { effectId: EFFECT.MUTANT_AGENDA }),
        ...fromStars(3, 5, { toId: CHAMPION.MAGNETO, effectId: EFFECT.ATTACK }),
    ]),

    ...fromId(CHAMPION.CYCLOPS90S, [
        ...fromStars(3, 5, { toId: CHAMPION.MAGNETO, effectId: EFFECT.ATTACK }),
        ...fromStars(3, 5, { toId: CHAMPION.STORM, effectId: EFFECT.PERFECT_BLOCK }),
        ...fromStars(3, 5, [ CHAMPION.COLOSSUS, CHAMPION.WOLVERINE ], { effectId: EFFECT.MUTANT_AGENDA }),
    ]),

    ...fromId(CHAMPION.DEADPOOL, [
        ...fromStars(2, 4, { toId: CHAMPION.PUNISHER, effectId: EFFECT.PERFECT_BLOCK }),
        ...fromStars(3, 4, { toId: CHAMPION.RHINO, effectId: EFFECT.CRITICAL_RATE }),
        ...fromStars(3, 4, [ CHAMPION.WOLVERINE, CHAMPION.WOLVERINEOLDMAN ], { effectId: EFFECT.HEALTH }),
    ]),

    ...fromId(CHAMPION.DEADPOOLXFORCE, [
        ...fromStars(2, 4, { toId: CHAMPION.MOONKNIGHT, effectId: EFFECT.CRITICAL_DAMAGE }),
        ...fromStars(3, 4, { toId: CHAMPION.DEADPOOL, effectId: EFFECT.CRITICAL_DAMAGE }),
        ...fromStars(4, { toId: CHAMPION.MAGNETOMARVELNOW, effectId: EFFECT.ARMOR }),
    ]),

    ...fromId(CHAMPION.MAGNETO, [
        ...fromStars(2, 5, [ CHAMPION.CYCLOPS, CHAMPION.CYCLOPS90S ], { effectId: EFFECT.ATTACK }),
        ...fromStars(3, 5, { toId: CHAMPION.WOLVERINE, effectId: EFFECT.CRITICAL_RATE }),
        ...fromStars(3, 5, { toId: CHAMPION.STORM, effectId: EFFECT.CRITICAL_DAMAGE }),
        ...fromStars(3, 5, { toId: CHAMPION.MAGIK, effectId: EFFECT.ARMOR }),
    ]),

    ...fromId(CHAMPION.MAGNETOMARVELNOW, [
        ...fromStars(2, 4, { toId: CHAMPION.CYCLOPS, effectId: EFFECT.PERFECT_BLOCK }),
        ...fromStars(3, 4, { toId: CHAMPION.MAGIK, effectId: EFFECT.PERFECT_BLOCK }),
        ...fromStars(3, 4, { toId: CHAMPION.WOLVERINE, effectId: EFFECT.CRITICAL_DAMAGE }),
    ]),

    ...fromId(CHAMPION.NIGHTCRAWLER, [
        ...fromStars(3, 5, { toId: CHAMPION.BEAST, effectId: EFFECT.ARMOR }),
        ...fromStars(3, 5, { toId: CHAMPION.JUGGERNAUT, effectId: EFFECT.CRITICAL_RATE }),
        ...fromStars(3, 5, [ CHAMPION.CYCLOPS, CHAMPION.CYCLOPS90S ], { effectId: EFFECT.PERFECT_BLOCK }),
        ...fromStars(4, 5, { toId: CHAMPION.X23, effectId: EFFECT.CRITICAL_DAMAGE }),
    ]),

    ...fromId(CHAMPION.STORM, [
        ...fromStars(2, 5, { toId: CHAMPION.BLACKPANTHER, effectId: EFFECT.POWER_GAIN }),
        ...fromStars(3, 5, { toId: CHAMPION.MAGIK, effectId: EFFECT.ARMOR }),
        ...fromStars(3, 5, [ CHAMPION.CYCLOPS, CHAMPION.CYCLOPS90S ], { effectId: EFFECT.PERFECT_BLOCK }),
        ...fromStars(4, 5, [ CHAMPION.MAGNETO, CHAMPION.MAGNETOMARVELNOW ], { effectId: EFFECT.CRITICAL_RATE }),
    ]),

    ...fromId(CHAMPION.WOLVERINE, [
        ...fromStars(2, 4, [ CHAMPION.CYCLOPS, CHAMPION.CYCLOPS90S ], { effectId: EFFECT.CRITICAL_DAMAGE }),
        ...fromStars(3, 4, [ CHAMPION.CAPTAINAMERICA, CHAMPION.CAPTAINAMERICAWWII ], { effectId: EFFECT.ARMOR }),
        ...fromStars(3, 4, { toId: CHAMPION.MAGNETO, effectId: EFFECT.CRITICAL_RATE }),
    ]),

    ...fromId(CHAMPION.WOLVERINEOLDMAN, [
        ...fromStars(3, 5, { toId: CHAMPION.WOLVERINE, effectId: EFFECT.CRITICAL_RATE }),
        ...fromStars(3, 5, { toId: CHAMPION.HAWKEYE, effectId: EFFECT.ARMOR }),
        ...fromStars(4, 5, { toId: CHAMPION.HULK, effectId: EFFECT.ATTACK }),
    ]),

    ...fromId(CHAMPION.X23, [
        ...fromStars(3, 5, [ CHAMPION.WOLVERINE, CHAMPION.WOLVERINEOLDMAN ], { effectId: EFFECT.HEALTH }),
        ...fromStars(3, 5, { toId: CHAMPION.AGENTVENOM, effectId: EFFECT.PERFECT_BLOCK }),
    ]),

    ...fromId(CHAMPION.AGENTVENOM, [
        ...fromStars(3, 5, { toId: CHAMPION.SPIDERMAN, effectId: EFFECT.IDOL }),
        ...fromStars(3, 5, { toId: CHAMPION.VENOM, effectId: EFFECT.HEALTH }),
        ...fromStars(3, 5, { toId: CHAMPION.SPIDERMANBLACK, effectId: EFFECT.HEALTH }),
    ]),

    ...fromId(CHAMPION.BLACKPANTHER, [
        ...fromStars(2, 5, [ CHAMPION.IRONFIST, CHAMPION.IRONFISTWHITE ], { effectId: EFFECT.CRITICAL_DAMAGE }),
        ...fromStars(3, 5, { toId: CHAMPION.STORM, effectId: EFFECT.POWER_GAIN }),
        ...fromStars(3, 5, { toId: CHAMPION.DEADPOOL, effectId: EFFECT.CRITICAL_RATE }),
    ]),

    ...fromId(CHAMPION.BLACKPANTHERCIVILWAR, [
        ...fromStars(3, 5, [ CHAMPION.THEVISION, CHAMPION.BLACKWIDOW ], { effectId: EFFECT.ARMOR }),
        ...fromStars(3, 5, { toId: CHAMPION.WINTERSOLDIER, effectId: EFFECT.ATTACK }),
        ...fromStars(3, 5, { toId: CHAMPION.ANTMAN, effectId: EFFECT.CRITICAL_DAMAGE }),
        ...fromStars(3, 5, [ CHAMPION.HAWKEYE, CHAMPION.BLACKPANTHER ], { effectId: EFFECT.BLEED }),
    ]),

    ...fromId(CHAMPION.BLACKWIDOW, [
        ...fromStars(2, 4, [ CHAMPION.CAPTAINMARVEL, CHAMPION.MSMARVEL ], { effectId: EFFECT.ARMOR }),
        ...fromStars(2, 4, { toId: CHAMPION.WINTERSOLDIER, effectId: EFFECT.POWER_GAIN }),
        ...fromStars(3, 4, [ CHAMPION.HULK, CHAMPION.HULKBUSTER ], { effectId: EFFECT.STUN_SPECIAL }),
        ...fromStars(3, 4, { toId: CHAMPION.HAWKEYE, effectId: EFFECT.POWER_GAIN }),
    ]),

    ...fromId(CHAMPION.CROSSBONES, [
        ...fromStars(3, 5, [ CHAMPION.CAPTAINAMERICA, CHAMPION.CAPTAINAMERICAWWII, CHAMPION.FALCON ], { effectId: EFFECT.CRITICAL_RATE }),
        ...fromStars(4, 5, [ CHAMPION.WINTERSOLDIER, CHAMPION.BLACKWIDOW ], { effectId: EFFECT.CRITICAL_DAMAGE }),
    ]),

    ...fromId(CHAMPION.DAREDEVIL, [
        ...fromStars(3, 4, { toId: CHAMPION.SUPERIORIRONMAN, effectId: EFFECT.CRITICAL_DAMAGE }),
        ...fromStars(3, 4, { toId: CHAMPION.BLACKWIDOW, effectId: EFFECT.POWER_GAIN }),
        ...fromStars(3, 4, { toId: CHAMPION.ELEKTRA, effectId: EFFECT.POWER_GAIN }),
    ]),

    ...fromId(CHAMPION.DAREDEVILNETFLIX, [
        ...fromStars(2, 5, { toId: CHAMPION.ELEKTRA, effectId: EFFECT.POWER_GAIN }),
        ...fromStars(2, 5, { toId: CHAMPION.PUNISHER, effectId: EFFECT.CRITICAL_DAMAGE }),
        ...fromStars(3, 5, { toId: CHAMPION.LUKECAGE, effectId: EFFECT.PERFECT_BLOCK }),
    ]),

    ...fromId(CHAMPION.ELEKTRA, [
        ...fromStars(3, 4, { toId: CHAMPION.WOLVERINE, effectId: EFFECT.ARMOR }),
        ...fromStars(3, 4, { toId: CHAMPION.DAREDEVIL, effectId: EFFECT.POWER_GAIN }),
        ...fromStars(3, 4, { toId: CHAMPION.BLACKWIDOW, effectId: EFFECT.CRITICAL_DAMAGE }),
        ...fromStars(4, 4, { toId: CHAMPION.DEADPOOL, effectId: EFFECT.PERFECT_BLOCK }),
    ]),

    ...fromId(CHAMPION.FALCON, [
        ...fromStars(3, 5, [ CHAMPION.CAPTAINAMERICA, CHAMPION.CAPTAINAMERICAWWII ], { effectId: EFFECT.ARMOR }),
        ...fromStars(3, 5, [ CHAMPION.WARMACHINE, CHAMPION.BLACKWIDOW ], { effectId: EFFECT.CRITICAL_RATE }),
        ...fromStars(3, 5, [ CHAMPION.THEVISION, CHAMPION.BLACKPANTHERCIVILWAR ], { effectId: EFFECT.CRITICAL_RATE }),
        ...fromStars(3, 5, [ CHAMPION.ANTMAN, CHAMPION.HAWKEYE ], { effectId: EFFECT.PERFECT_BLOCK }),
    ]),

    ...fromId(CHAMPION.HAWKEYE, [
        ...fromStars(2, 5, { toId: CHAMPION.SCARLETWITCH, effectId: EFFECT.POWER_GAIN }),
        ...fromStars(3, 5, { toId: CHAMPION.MOONKNIGHT, effectId: EFFECT.ARMOR }),
        ...fromStars(3, 5, { toId: CHAMPION.IRONMAN, effectId: EFFECT.ARMOR }),
        ...fromStars(4, 5, { toId: CHAMPION.HULK, effectId: EFFECT.ARMOR }),
    ]),

    ...fromId(CHAMPION.MOONKNIGHT, [
        ...fromStars(3, 4, { toId: CHAMPION.SPIDERMAN, effectId: EFFECT.ARMOR }),
        ...fromStars(3, 4, { toId: CHAMPION.DAREDEVIL, effectId: EFFECT.PERFECT_BLOCK }),
        ...fromStars(3, 4, [ CHAMPION.DEADPOOLXFORCE, CHAMPION.DEADPOOL ], { effectId: EFFECT.CRITICAL_DAMAGE }),
        ...fromStars(4, 4, { toId: CHAMPION.IRONPATRIOT, effectId: EFFECT.CRITICAL_RATE }),
    ]),

    ...fromId(CHAMPION.PUNISHER, [
        ...fromStars(2, 4, { toId: CHAMPION.SPIDERMAN, effectId: EFFECT.CRITICAL_DAMAGE }),
        ...fromStars(3, 4, { toId: CHAMPION.RHINO, effectId: EFFECT.PERFECT_BLOCK }),
        ...fromStars(3, 4, [ CHAMPION.DAREDEVIL, CHAMPION.DAREDEVILNETFLIX ], { effectId: EFFECT.CRITICAL_DAMAGE }),
    ]),

    ...fromId(CHAMPION.WINTERSOLDIER, [
        ...fromStars(2, 5, { toId: CHAMPION.WOLVERINE, effectId: EFFECT.ARMOR }),
        ...fromStars(2, 5, { toId: CHAMPION.CAPTAINAMERICA, effectId: EFFECT.PERFECT_BLOCK }),
        ...fromStars(3, 5, { toId: CHAMPION.CAPTAINAMERICAWWII, effectId: EFFECT.ARMOR }),
    ]),

    ...fromId(CHAMPION.ABOMINATION, [
        ...fromStars(2, 4, { toId: CHAMPION.RHINO, effectId: EFFECT.ARMOR }),
        ...fromStars(3, 4, { toId: CHAMPION.HULK, effectId: EFFECT.ATTACK }),
        ...fromStars(4, 4, { toId: CHAMPION.SHEHULK, effectId: EFFECT.CRITICAL_RATE }),
        ...fromStars(4, 4, { toId: CHAMPION.REDHULK, effectId: EFFECT.CRITICAL_RATE }),
    ]),

    ...fromId(CHAMPION.ANTMAN, [
        ...fromStars(2, 5, { toId: CHAMPION.YELLOWJACKET, effectId: EFFECT.ATTACK }),
        ...fromStars(2, 5, { toId: CHAMPION.IRONMAN, effectId: EFFECT.PERFECT_BLOCK }),
        ...fromStars(3, 5, { toId: CHAMPION.SPIDERMAN, effectId: EFFECT.PERFECT_BLOCK }),
        ...fromStars(4, 5, { toId: CHAMPION.HULK, effectId: EFFECT.ARMOR }),
    ]),

    ...fromId(CHAMPION.CAPTAINAMERICA, [
        ...fromStars(2, 4, [ CHAMPION.SPIDERMAN, CHAMPION.SPIDERMANBLACK ], { effectId: EFFECT.ARMOR }),
        ...fromStars(2, 4, { toId: CHAMPION.SUPERIORIRONMAN, effectId: EFFECT.CRITICAL_RATE }),
        ...fromStars(2, 4, { toId: CHAMPION.IRONMAN, effectId: EFFECT.CRITICAL_RATE }),
        ...fromStars(3, 4, { toId: CHAMPION.WINTERSOLDIER, effectId: EFFECT.ARMOR }),
    ]),

    ...fromId(CHAMPION.CAPTAINAMERICAWWII, [
        ...fromStars(2, 4, { toId: CHAMPION.WINTERSOLDIER, effectId: EFFECT.ARMOR }),
        ...fromStars(2, 4, { toId: CHAMPION.WOLVERINE, effectId: EFFECT.ARMOR }),
        ...fromStars(3, 4, { toId: CHAMPION.GUILLOTINE, effectId: EFFECT.ARMOR }),
    ]),

    ...fromId(CHAMPION.ELECTRO, [
        ...fromStars(3, 4, { toId: CHAMPION.SPIDERMAN, effectId: EFFECT.ATTACK }),
        ...fromStars(3, 4, { toId: CHAMPION.RHINO, effectId: EFFECT.ARMOR }),
    ]),

    ...fromId(CHAMPION.HULK, [
        ...fromStars(2, 4, { toId: CHAMPION.THOR, effectId: EFFECT.CRITICAL_DAMAGE }),
        ...fromStars(3, 4, { toId: CHAMPION.ABOMINATION, effectId: EFFECT.CRITICAL_RATE }),
        ...fromStars(3, 4, { toId: CHAMPION.HAWKEYE, effectId: EFFECT.ARMOR }),
    ]),

    ...fromId(CHAMPION.JOEFIXIT, [
        ...fromStars(3, 4, { toId: CHAMPION.WOLVERINE, effectId: EFFECT.ARMOR }),
        ...fromStars(3, 4, { toId: CHAMPION.MOONKNIGHT, effectId: EFFECT.CRITICAL_RATE }),
        ...fromStars(3, 4, { toId: CHAMPION.HULK, effectId: EFFECT.ATTACK }),
        ...fromStars(4, 4, { toId: CHAMPION.MSMARVEL, effectId: EFFECT.CRITICAL_RATE }),
    ]),

    ...fromId(CHAMPION.LUKECAGE, [
        ...fromStars(3, 5, { toId: CHAMPION.IRONFIST, effectId: EFFECT.HEROES_FOR_HIRE }),
        ...fromStars(3, 5, [ CHAMPION.JUGGERNAUT, CHAMPION.IRONPATRIOT ], { effectId: EFFECT.THUNDERBOLTS }),
    ]),

    ...fromId(CHAMPION.RHINO, [
        ...fromStars(2, 5, [ CHAMPION.SPIDERMAN, CHAMPION.SPIDERGWEN ], { effectId: EFFECT.CRITICAL_RATE }),
        ...fromStars(2, 5, { toId: CHAMPION.ABOMINATION, effectId: EFFECT.ARMOR }),
        ...fromStars(3, 5, { toId: CHAMPION.ELECTRO, effectId: EFFECT.PERFECT_BLOCK }),
    ]),

    ...fromId(CHAMPION.REDHULK, [
        ...fromStars(3, 5, { toId: CHAMPION.ABOMINATION, effectId: EFFECT.CRITICAL_RATE }),
        ...fromStars(3, 5, { toId: CHAMPION.HULK, effectId: EFFECT.ATTACK }),
        ...fromStars(4, 5, { toId: CHAMPION.X23, effectId: EFFECT.PERFECT_BLOCK }),
        ...fromStars(3, 5, [ CHAMPION.ELEKTRA, CHAMPION.AGENTVENOM ], { effectId: EFFECT.THUNDERBOLTS }),
    ]),

    ...fromId(CHAMPION.SHEHULK, [
        ...fromStars(3, 5, { toId: CHAMPION.HULK, effectId: EFFECT.HEALTH }),
        ...fromStars(3, 5, { toId: CHAMPION.SUPERIORIRONMAN, effectId: EFFECT.POWER_GAIN }),
        ...fromStars(3, 5, { toId: CHAMPION.KAMALAKHAN, effectId: EFFECT.PERFECT_BLOCK }),
        ...fromStars(3, 5, { toId: CHAMPION.DAREDEVIL, effectId: EFFECT.STUN_ACTIVATION }),
    ]),

    ...fromId(CHAMPION.SPIDERMAN, [
        ...fromStars(1, 5, { toId: CHAMPION.WOLVERINE, effectId: EFFECT.HEALTH }),
        ...fromStars(1, 5, { toId: CHAMPION.HAWKEYE, effectId: EFFECT.ATTACK }),
        ...fromStars(3, 5, { toId: CHAMPION.ELECTRO, effectId: EFFECT.CRITICAL_RATE }),
        ...fromStars(3, 5, { toId: CHAMPION.CAPTAINAMERICA, effectId: EFFECT.ARMOR }),
    ]),

    ...fromId(CHAMPION.SPIDERGWEN, [
        ...fromStars(3, 5, { toId: CHAMPION.RHINO, effectId: EFFECT.CRITICAL_RATE }),
        ...fromStars(3, 5, { toId: CHAMPION.DAREDEVIL, effectId: EFFECT.CRITICAL_RATE }),
        ...fromStars(3, 5, { toId: CHAMPION.SPIDERMAN, effectId: EFFECT.POWER_GAIN }),
        ...fromStars(4, 5, { toId: CHAMPION.PUNISHER, effectId: EFFECT.CRITICAL_DAMAGE }),
    ]),

    ...fromId(CHAMPION.SPIDERMANMORALES, [
        ...fromStars(3, 4, { toId: CHAMPION.VENOM, effectId: EFFECT.ATTACK }),
        ...fromStars(3, 4, { toId: CHAMPION.SPIDERGWEN, effectId: EFFECT.PERFECT_BLOCK }),
        ...fromStars(4, 4, { toId: CHAMPION.ELECTRO, effectId: EFFECT.CRITICAL_RATE }),
        ...fromStars(4, 4, { toId: CHAMPION.IRONPATRIOT, effectId: EFFECT.CRITICAL_RATE }),
    ]),

    ...fromId(CHAMPION.YELLOWJACKET, [
        ...fromStars(2, 4, { toId: CHAMPION.ANTMAN, effectId: EFFECT.ATTACK }),
        ...fromStars(2, 4, { toId: CHAMPION.ULTRON, effectId: EFFECT.CRITICAL_DAMAGE }),
        ...fromStars(3, 4, { toId: CHAMPION.JOEFIXIT, effectId: EFFECT.CRITICAL_DAMAGE }),
        ...fromStars(4, 4, { toId: CHAMPION.SUPERIORIRONMAN, effectId: EFFECT.IDOL }),
    ]),

    ...fromId(CHAMPION.DRSTRANGE, [
        ...fromStars(3, 4, [ CHAMPION.THOR, CHAMPION.X23 ], { effectId: EFFECT.ARMOR }),
        ...fromStars(3, 4, { toId: CHAMPION.SPIDERMAN, effectId: EFFECT.ARMOR }),
        ...fromStars(3, 4, { toId: CHAMPION.SCARLETWITCH, effectId: EFFECT.PERFECT_BLOCK }),
        ...fromStars(3, 4, { toId: CHAMPION.BLACKBOLT, effectId: EFFECT.PERFECT_BLOCK }),
    ]),

    ...fromId(CHAMPION.IRONFIST, [
        ...fromStars(2, 5, { toId: CHAMPION.BLACKPANTHER, effectId: EFFECT.ARMOR }),
        ...fromStars(3, 5, [ CHAMPION.LUKECAGE, CHAMPION.SHEHULK ], { effectId: EFFECT.HEROES_FOR_HIRE }),
        ...fromStars(3, 5, { toId: CHAMPION.DRSTRANGE, effectId: EFFECT.ARMOR }),
        ...fromStars(4, 5, { toId: CHAMPION.WOLVERINE, effectId: EFFECT.ARMOR }),
    ]),

    ...fromId(CHAMPION.IRONFISTWHITE, [
        ...fromStars(3, 5, { toId: CHAMPION.DRSTRANGE, effectId: EFFECT.ARMOR }),
        ...fromStars(3, 5, { toId: CHAMPION.DAREDEVIL, effectId: EFFECT.ARMOR }),
        ...fromStars(4, 5, { toId: CHAMPION.WARMACHINE, effectId: EFFECT.PERFECT_BLOCK }),
    ]),

    ...fromId(CHAMPION.GUILLOTINE, [
        ...fromStars(2, 4, { toId: CHAMPION.VENOM, effectId: EFFECT.ATTACK }),
        ...fromStars(2, 4, { toId: CHAMPION.CAPTAINAMERICAWWII, effectId: EFFECT.PERFECT_BLOCK }),
        ...fromStars(3, 4, { toId: CHAMPION.MAGIK, effectId: EFFECT.CRITICAL_DAMAGE }),
        ...fromStars(4, 4, { toId: CHAMPION.BLACKPANTHER, effectId: EFFECT.ARMOR }),
    ]),

    ...fromId(CHAMPION.JUGGERNAUT, [
        ...fromStars(2, 5, [ CHAMPION.COLOSSUS, CHAMPION.UNSTOPPABLECOLOSSUS ], { effectId: EFFECT.CRITICAL_RATE }),
        ...fromStars(3, 5, { toId: CHAMPION.DRSTRANGE, effectId: EFFECT.ATTACK }),
        ...fromStars(3, 5, { toId: CHAMPION.HULK, effectId: EFFECT.CRITICAL_RATE }),
    ]),

    ...fromId(CHAMPION.LOKI, [
        ...fromStars(3, 5, { toId: CHAMPION.THOR, effectId: EFFECT.HEALTH }),
        ...fromStars(3, 5, [ CHAMPION.HULK, CHAMPION.REDHULK, CHAMPION.THORJANEFOSTER ], { effectId: EFFECT.CRITICAL_RATE }),
        ...fromStars(3, 5, [ CHAMPION.MAGNETO, CHAMPION.MAGNETOMARVELNOW ], { effectId: EFFECT.MASTERMINDS }),
    ]),

    ...fromId(CHAMPION.MAGIK, [
        ...fromStars(2, 5, [ CHAMPION.COLOSSUS, CHAMPION.UNSTOPPABLECOLOSSUS ], { effectId: EFFECT.HEALTH }),
        ...fromStars(3, 5, { toId: CHAMPION.STORM, effectId: EFFECT.ARMOR }),
        ...fromStars(3, 5, [ CHAMPION.CYCLOPS, CHAMPION.GUILLOTINE ], { effectId: EFFECT.PERFECT_BLOCK }),
        ...fromStars(4, 5, { toId: CHAMPION.JUGGERNAUT, effectId: EFFECT.CRITICAL_RATE }),
    ]),

    ...fromId(CHAMPION.SCARLETWITCH, [
        ...fromStars(2, 4, [ CHAMPION.CAPTAINMARVEL, CHAMPION.MSMARVEL ], { effectId: EFFECT.ARMOR }),
        ...fromStars(3, 4, { toId: CHAMPION.VISION, effectId: EFFECT.POWER_GAIN }),
        ...fromStars(3, 4, { toId: CHAMPION.ANTMAN, effectId: EFFECT.PERFECT_BLOCK }),
    ]),

    ...fromId(CHAMPION.THORJANEFOSTER, [
        ...fromStars(3, 5, { toId: CHAMPION.THOR, effectId: EFFECT.POWER_GAIN }),
        ...fromStars(3, 5, { toId: CHAMPION.VISION, effectId: EFFECT.PERFECT_BLOCK }),
        ...fromStars(4, 5, { toId: CHAMPION.BLACKWIDOW, effectId: EFFECT.ARMOR }),
        ...fromStars(4, 5, { toId: CHAMPION.JOEFIXIT, effectId: EFFECT.PERFECT_BLOCK }),
    ]),

    ...fromId(CHAMPION.UNSTOPPABLECOLOSSUS, [
        ...fromStars(2, 5, { toId: CHAMPION.MAGIK, effectId: EFFECT.HEALTH }),
        ...fromStars(2, 5, { toId: CHAMPION.JUGGERNAUT, effectId: EFFECT.CRITICAL_DAMAGE }),
        ...fromStars(3, 5, [ CHAMPION.WOLVERINE, CHAMPION.WOLVERINEOLDMAN ], { effectId: EFFECT.ARMOR }),
        ...fromStars(3, 5, { toId: CHAMPION.CYCLOPS, effectId: EFFECT.PERFECT_BLOCK }),
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
