import { TYPE, TYPE_VALUES } from './model/Type';
import Champion, { CHAMPION } from './model/Champion';

export const WILLPOWER_SAFE_CHAMPIONS = [
    CHAMPION.BLACKBOLT, CHAMPION.CAPTAINMARVEL, CHAMPION.DRAX, CHAMPION.GAMORA, CHAMPION.GROOT, CHAMPION.KAMALAKHAN, CHAMPION.MSMARVEL, CHAMPION.RONAN, CHAMPION.SUPERIORIRONMAN, CHAMPION.THOR, CHAMPION.VENOM,
    CHAMPION.CIVILWARRIOR, CHAMPION.KANG, CHAMPION.ROCKET, CHAMPION.STARLORD, CHAMPION.VISION, CHAMPION.THEVISION,
    CHAMPION.COLOSSUS, CHAMPION.MAGNETO, CHAMPION.MAGNETOMARVELNOW, CHAMPION.STORM,
    CHAMPION.BLACKWIDOW,
    CHAMPION.CAPTAINAMERICAWWII, CHAMPION.ELECTRO, CHAMPION.HULK, CHAMPION.RHINO, CHAMPION.SHEHULK, CHAMPION.SPIDERGWEN, CHAMPION.SPIDERMANMORALES, CHAMPION.YELLOWJACKET,
    CHAMPION.DRSTRANGE, CHAMPION.GUILLOTINE, CHAMPION.JUGGERNAUT, CHAMPION.MAGIK, CHAMPION.SCARLETWITCH, CHAMPION.THORJANEFOSTER, CHAMPION.UNSTOPPABLECOLOSSUS,
].reduce((map, champion) => {
    map[ champion ] = true;
    return map;
}, {});

export const CHAMPION_PLACEHOLDER = new Champion({ uid: null, stars: 0 });

const champions = [
    // Cosmic
    ...championForStars({ uid: CHAMPION.BLACKBOLT, typeId: TYPE.COSMIC }, [ 2, 3, 4 ]),
    ...championForStars({ uid: CHAMPION.CAPTAINMARVEL, typeId: TYPE.COSMIC }, [ 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION.DRAX, typeId: TYPE.COSMIC }, [ 2, 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION.GAMORA, typeId: TYPE.COSMIC }, [ 1, 2, 3, 4 ]),
    ...championForStars({ uid: CHAMPION.GROOT, typeId: TYPE.COSMIC }, [ 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION.KAMALAKHAN, typeId: TYPE.COSMIC }, [ 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION.MSMARVEL, typeId: TYPE.COSMIC }, [ 3, 4 ]),
    ...championForStars({ uid: CHAMPION.RONAN, typeId: TYPE.COSMIC }, [ 2, 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION.SPIDERMANBLACK, typeId: TYPE.COSMIC }, [ 3, 4 ]),
    ...championForStars({ uid: CHAMPION.SUPERIORIRONMAN, typeId: TYPE.COSMIC }, [ 2, 3, 4 ]),
    ...championForStars({ uid: CHAMPION.THOR, typeId: TYPE.COSMIC }, [ 2, 3, 4 ]),
    ...championForStars({ uid: CHAMPION.VENOM, typeId: TYPE.COSMIC }, [ 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION.VENOMPOOL, typeId: TYPE.COSMIC }, [ 3, 4, 5 ]),
    // Tech
    ...championForStars({ uid: CHAMPION.CIVILWARRIOR, typeId: TYPE.TECH }, [ 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION.HULKBUSTER, typeId: TYPE.TECH }, [ 2, 3, 4 ]),
    ...championForStars({ uid: CHAMPION.IRONMAN, typeId: TYPE.TECH }, [ 1, 2, 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION.IRONPATRIOT, typeId: TYPE.TECH }, [ 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION.KANG, typeId: TYPE.TECH }, [ 4 ]),
    ...championForStars({ uid: CHAMPION.ROCKET, typeId: TYPE.TECH }, [ 2, 3, 4 ]),
    ...championForStars({ uid: CHAMPION.STARLORD, typeId: TYPE.TECH }, [ 2, 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION.VISION, typeId: TYPE.TECH }, [ 1, 2, 3, 4 ]),
    ...championForStars({ uid: CHAMPION.THEVISION, typeId: TYPE.TECH }, [ 1, 2, 3, 4 ]),
    ...championForStars({ uid: CHAMPION.ULTRON, typeId: TYPE.TECH }, [ 2, 3, 4 ]),
    ...championForStars({ uid: CHAMPION.WARMACHINE, typeId: TYPE.TECH }, [ 2, 3, 4 ]),
    // Mutant
    ...championForStars({ uid: CHAMPION.BEAST, typeId: TYPE.MUTANT }, [ 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION.COLOSSUS, typeId: TYPE.MUTANT }, [ 1, 2, 3, 4 ]),
    ...championForStars({ uid: CHAMPION.CYCLOPS, typeId: TYPE.MUTANT }, [ 2, 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION.CYCLOPS90S, typeId: TYPE.MUTANT }, [ 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION.DEADPOOL, typeId: TYPE.MUTANT }, [ 2, 3, 4 ]),
    ...championForStars({ uid: CHAMPION.DEADPOOLXFORCE, typeId: TYPE.MUTANT }, [ 2, 3, 4 ]),
    ...championForStars({ uid: CHAMPION.GAMBIT, typeId: TYPE.MUTANT }, [ 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION.MAGNETO, typeId: TYPE.MUTANT }, [ 2, 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION.MAGNETOMARVELNOW, typeId: TYPE.MUTANT }, [ 2, 3, 4 ]),
    ...championForStars({ uid: CHAMPION.NIGHTCRAWLER, typeId: TYPE.MUTANT }, [ 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION.STORM, typeId: TYPE.MUTANT }, [ 2, 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION.WOLVERINE, typeId: TYPE.MUTANT }, [ 1, 2, 3, 4 ]),
    ...championForStars({ uid: CHAMPION.WOLVERINEOLDMAN, typeId: TYPE.MUTANT }, [ 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION.WOLVERINEWEAPONX, typeId: TYPE.MUTANT }, [ 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION.X23, typeId: TYPE.MUTANT }, [ 3, 4 ]),
    // Skill
    ...championForStars({ uid: CHAMPION.AGENTVENOM, typeId: TYPE.SKILL }, [ 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION.BLACKPANTHER, typeId: TYPE.SKILL }, [ 1, 2, 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION.BLACKPANTHERCIVILWAR, typeId: TYPE.SKILL }, [ 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION.BLACKWIDOW, typeId: TYPE.SKILL }, [ 2, 3, 4 ]),
    ...championForStars({ uid: CHAMPION.CROSSBONES, typeId: TYPE.SKILL }, [ 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION.DAREDEVIL, typeId: TYPE.SKILL }, [ 3, 4 ]),
    ...championForStars({ uid: CHAMPION.DAREDEVILNETFLIX, typeId: TYPE.SKILL }, [ 2, 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION.ELEKTRA, typeId: TYPE.SKILL }, [ 3, 4 ]),
    ...championForStars({ uid: CHAMPION.FALCON, typeId: TYPE.SKILL }, [ 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION.HAWKEYE, typeId: TYPE.SKILL }, [ 1, 2, 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION.MOONKNIGHT, typeId: TYPE.SKILL }, [ 3, 4 ]),
    ...championForStars({ uid: CHAMPION.PUNISHER, typeId: TYPE.SKILL }, [ 2, 3, 4 ]),
    ...championForStars({ uid: CHAMPION.REDSKULL, typeId: TYPE.SKILL }, [ 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION.WINTERSOLDIER, typeId: TYPE.SKILL }, [ 2, 3, 4, 5 ]),
    // Science
    ...championForStars({ uid: CHAMPION.ABOMINATION, typeId: TYPE.SCIENCE }, [ 2, 3, 4 ]),
    ...championForStars({ uid: CHAMPION.ANTMAN, typeId: TYPE.SCIENCE }, [ 2, 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION.CAPTAINAMERICA, typeId: TYPE.SCIENCE }, [ 2, 3, 4 ]),
    ...championForStars({ uid: CHAMPION.CAPTAINAMERICAWWII, typeId: TYPE.SCIENCE }, [ 2, 3, 4 ]),
    ...championForStars({ uid: CHAMPION.ELECTRO, typeId: TYPE.SCIENCE }, [ 3, 4 ]),
    ...championForStars({ uid: CHAMPION.HULK, typeId: TYPE.SCIENCE }, [ 1, 2, 3, 4 ]),
    ...championForStars({ uid: CHAMPION.JOEFIXIT, typeId: TYPE.SCIENCE }, [ 3, 4 ]),
    ...championForStars({ uid: CHAMPION.LUKECAGE, typeId: TYPE.SCIENCE }, [ 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION.REDHULK, typeId: TYPE.SCIENCE }, [ 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION.RHINO, typeId: TYPE.SCIENCE }, [ 2, 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION.SHEHULK, typeId: TYPE.SCIENCE }, [ 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION.SPIDERGWEN, typeId: TYPE.SCIENCE }, [ 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION.SPIDERMAN, typeId: TYPE.SCIENCE }, [ 1, 2, 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION.SPIDERMANMORALES, typeId: TYPE.SCIENCE }, [ 3, 4 ]),
    ...championForStars({ uid: CHAMPION.YELLOWJACKET, typeId: TYPE.SCIENCE }, [ 2, 3, 4 ]),
    // Mystic
    ...championForStars({ uid: CHAMPION.DRSTRANGE, typeId: TYPE.MYSTIC }, [ 3, 4 ]),
    ...championForStars({ uid: CHAMPION.DRSTRANGEMARVELNOW, typeId: TYPE.MYSTIC }, [ 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION.GUILLOTINE, typeId: TYPE.MYSTIC }, [ 2, 3, 4 ]),
    ...championForStars({ uid: CHAMPION.IRONFIST, typeId: TYPE.MYSTIC }, [ 2, 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION.IRONFISTWHITE, typeId: TYPE.MYSTIC }, [ 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION.JUGGERNAUT, typeId: TYPE.MYSTIC }, [ 1, 2, 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION.LOKI, typeId: TYPE.MYSTIC }, [ 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION.MAGIK, typeId: TYPE.MYSTIC }, [ 2, 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION.SCARLETWITCH, typeId: TYPE.MYSTIC }, [ 1, 2, 3, 4 ]),
    ...championForStars({ uid: CHAMPION.THORJANEFOSTER, typeId: TYPE.MYSTIC }, [ 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION.UNSTOPPABLECOLOSSUS, typeId: TYPE.MYSTIC }, [ 2, 3, 4, 5 ]),
    // Unknown
    ...championForStars({ uid: CHAMPION.MAESTRO }, [ 5 ]),
].map((champion) => new Champion(champion));

function championForStars(champion, stars) {
    return stars.map((stars) => ({
        ...champion,
        stars,
    }));
}

const championTypeMap = TYPE_VALUES.map((type) => ({
    typeId: type,
    uids: [],
}));
const championMap = {};
const championTypes = {};
champions.forEach((champion) => {
    const { uid, typeId } = champion.attr;
    const typeMap = championTypeMap[ TYPE_VALUES.indexOf(typeId) ];
    if(typeMap && typeMap.uids.indexOf(uid) === -1) {
        typeMap.uids.push(uid);
    }
    championTypes[ uid ] = typeId;
    championMap[ champion.id ] = champion;
});

export default champions;
export { championMap, championTypes, championTypeMap };
