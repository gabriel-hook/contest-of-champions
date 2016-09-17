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

function championsForType(typeId, champions) {
    return champions.map((champion) => ({
        ...champion,
        typeId,
    }));
}

function championForStars(champion, stars) {
    return stars.map((stars) => ({
        ...champion,
        stars,
    }));
}

const champions = [
    ...championsForType(TYPE.COSMIC, [
        ...championForStars({ uid: CHAMPION.BLACKBOLT }, [ 2, 3, 4 ]),
        ...championForStars({ uid: CHAMPION.CAPTAINMARVEL }, [ 3, 4, 5 ]),
        ...championForStars({ uid: CHAMPION.DRAX }, [ 2, 3, 4, 5 ]),
        ...championForStars({ uid: CHAMPION.GAMORA }, [ 1, 2, 3, 4 ]),
        ...championForStars({ uid: CHAMPION.GROOT }, [ 3, 4, 5 ]),
        ...championForStars({ uid: CHAMPION.KAMALAKHAN }, [ 3, 4, 5 ]),
        ...championForStars({ uid: CHAMPION.MSMARVEL }, [ 3, 4 ]),
        ...championForStars({ uid: CHAMPION.PHOENIX }, [ 5 ]),
        ...championForStars({ uid: CHAMPION.PHOENIXDARK }, [ 5 ]),
        ...championForStars({ uid: CHAMPION.RONAN }, [ 2, 3, 4, 5 ]),
        ...championForStars({ uid: CHAMPION.SPIDERMANBLACK }, [ 3, 4 ]),
        ...championForStars({ uid: CHAMPION.SUPERIORIRONMAN }, [ 2, 3, 4 ]),
        ...championForStars({ uid: CHAMPION.THANOS }, [ 4, 5 ]),
        ...championForStars({ uid: CHAMPION.THOR }, [ 2, 3, 4 ]),
        ...championForStars({ uid: CHAMPION.VENOM }, [ 3, 4, 5 ]),
        ...championForStars({ uid: CHAMPION.VENOMPOOL }, [ 3, 4, 5 ]),
    ]),
    ...championsForType(TYPE.TECH, [
        ...championForStars({ uid: CHAMPION.CIVILWARRIOR }, [ 3, 4, 5 ]),
        ...championForStars({ uid: CHAMPION.HULKBUSTER }, [ 2, 3, 4 ]),
        ...championForStars({ uid: CHAMPION.IRONMAN }, [ 1, 2, 3, 4, 5 ]),
        ...championForStars({ uid: CHAMPION.IRONPATRIOT }, [ 3, 4, 5 ]),
        ...championForStars({ uid: CHAMPION.KANG }, [ 4 ]),
        ...championForStars({ uid: CHAMPION.ROCKET }, [ 2, 3, 4 ]),
        ...championForStars({ uid: CHAMPION.STARLORD }, [ 2, 3, 4, 5 ]),
        ...championForStars({ uid: CHAMPION.VISION }, [ 1, 2, 3, 4 ]),
        ...championForStars({ uid: CHAMPION.THEVISION }, [ 1, 2, 3, 4 ]),
        ...championForStars({ uid: CHAMPION.ULTRON }, [ 2, 3, 4 ]),
        ...championForStars({ uid: CHAMPION.ULTRONCLASSIC }, [ 5 ]),
        ...championForStars({ uid: CHAMPION.WARMACHINE }, [ 2, 3, 4 ]),
    ]),
    ...championsForType(TYPE.MUTANT, [
        ...championForStars({ uid: CHAMPION.BEAST }, [ 3, 4, 5 ]),
        ...championForStars({ uid: CHAMPION.COLOSSUS }, [ 1, 2, 3, 4 ]),
        ...championForStars({ uid: CHAMPION.CYCLOPS }, [ 2, 3, 4, 5 ]),
        ...championForStars({ uid: CHAMPION.CYCLOPS90S }, [ 3, 4, 5 ]),
        ...championForStars({ uid: CHAMPION.DEADPOOL }, [ 2, 3, 4 ]),
        ...championForStars({ uid: CHAMPION.DEADPOOLXFORCE }, [ 2, 3, 4 ]),
        ...championForStars({ uid: CHAMPION.GAMBIT }, [ 3, 4, 5 ]),
        ...championForStars({ uid: CHAMPION.MAGNETO }, [ 2, 3, 4, 5 ]),
        ...championForStars({ uid: CHAMPION.MAGNETOMARVELNOW }, [ 2, 3, 4 ]),
        ...championForStars({ uid: CHAMPION.NIGHTCRAWLER }, [ 3, 4, 5 ]),
        ...championForStars({ uid: CHAMPION.ROGUE }, [ 3, 4, 5 ]),
        ...championForStars({ uid: CHAMPION.STORM }, [ 2, 3, 4, 5 ]),
        ...championForStars({ uid: CHAMPION.WOLVERINE }, [ 1, 2, 3, 4 ]),
        ...championForStars({ uid: CHAMPION.WOLVERINEOLDMAN }, [ 3, 4, 5 ]),
        ...championForStars({ uid: CHAMPION.WEAPONX }, [ 3, 4, 5 ]),
        ...championForStars({ uid: CHAMPION.X23 }, [ 3, 4 ]),
    ]),
    ...championsForType(TYPE.SKILL, [
        ...championForStars({ uid: CHAMPION.AGENTVENOM }, [ 3, 4, 5 ]),
        ...championForStars({ uid: CHAMPION.BLACKPANTHER }, [ 1, 2, 3, 4, 5 ]),
        ...championForStars({ uid: CHAMPION.BLACKPANTHERCIVILWAR }, [ 3, 4, 5 ]),
        ...championForStars({ uid: CHAMPION.BLACKWIDOW }, [ 2, 3, 4 ]),
        ...championForStars({ uid: CHAMPION.CROSSBONES }, [ 3, 4, 5 ]),
        ...championForStars({ uid: CHAMPION.DAREDEVIL }, [ 3, 4 ]),
        ...championForStars({ uid: CHAMPION.DAREDEVILNETFLIX }, [ 2, 3, 4, 5 ]),
        ...championForStars({ uid: CHAMPION.ELEKTRA }, [ 3, 4 ]),
        ...championForStars({ uid: CHAMPION.FALCON }, [ 3, 4, 5 ]),
        ...championForStars({ uid: CHAMPION.HAWKEYE }, [ 1, 2, 3, 4, 5 ]),
        ...championForStars({ uid: CHAMPION.KARNAK }, [ 3, 4, 5 ]),
        ...championForStars({ uid: CHAMPION.MOONKNIGHT }, [ 3, 4 ]),
        ...championForStars({ uid: CHAMPION.PUNISHER }, [ 2, 3, 4 ]),
        ...championForStars({ uid: CHAMPION.REDSKULL }, [ 3, 4, 5 ]),
        ...championForStars({ uid: CHAMPION.WINTERSOLDIER }, [ 2, 3, 4, 5 ]),
    ]),
    ...championsForType(TYPE.SCIENCE, [
        ...championForStars({ uid: CHAMPION.ABOMINATION }, [ 2, 3, 4 ]),
        ...championForStars({ uid: CHAMPION.ANTMAN }, [ 2, 3, 4, 5 ]),
        ...championForStars({ uid: CHAMPION.CAPTAINAMERICA }, [ 2, 3, 4 ]),
        ...championForStars({ uid: CHAMPION.CAPTAINAMERICAWWII }, [ 2, 3, 4 ]),
        ...championForStars({ uid: CHAMPION.ELECTRO }, [ 3, 4 ]),
        ...championForStars({ uid: CHAMPION.HULK }, [ 1, 2, 3, 4 ]),
        ...championForStars({ uid: CHAMPION.JOEFIXIT }, [ 3, 4 ]),
        ...championForStars({ uid: CHAMPION.LUKECAGE }, [ 3, 4, 5 ]),
        ...championForStars({ uid: CHAMPION.QUAKE }, [ 3, 4, 5 ]),
        ...championForStars({ uid: CHAMPION.REDHULK }, [ 3, 4, 5 ]),
        ...championForStars({ uid: CHAMPION.RHINO }, [ 2, 3, 4, 5 ]),
        ...championForStars({ uid: CHAMPION.SHEHULK }, [ 3, 4, 5 ]),
        ...championForStars({ uid: CHAMPION.SPIDERGWEN }, [ 3, 4, 5 ]),
        ...championForStars({ uid: CHAMPION.SPIDERMAN }, [ 1, 2, 3, 4, 5 ]),
        ...championForStars({ uid: CHAMPION.SPIDERMANMORALES }, [ 3, 4 ]),
        ...championForStars({ uid: CHAMPION.YELLOWJACKET }, [ 2, 3, 4 ]),
    ]),
    ...championsForType(TYPE.MYSTIC, [
        ...championForStars({ uid: CHAMPION.DRSTRANGE }, [ 3, 4 ]),
        ...championForStars({ uid: CHAMPION.DRSTRANGEMARVELNOW }, [ 3, 4, 5 ]),
        ...championForStars({ uid: CHAMPION.GUILLOTINE }, [ 2, 3, 4 ]),
        ...championForStars({ uid: CHAMPION.IRONFIST }, [ 2, 3, 4, 5 ]),
        ...championForStars({ uid: CHAMPION.IRONFISTWHITE }, [ 3, 4, 5 ]),
        ...championForStars({ uid: CHAMPION.JUGGERNAUT }, [ 1, 2, 3, 4, 5 ]),
        ...championForStars({ uid: CHAMPION.LOKI }, [ 3, 4, 5 ]),
        ...championForStars({ uid: CHAMPION.MAGIK }, [ 2, 3, 4, 5 ]),
        ...championForStars({ uid: CHAMPION.SCARLETWITCH }, [ 1, 2, 3, 4 ]),
        ...championForStars({ uid: CHAMPION.SCARLETWITCHULTIMATE }, [ 3, 4, 5 ]),
        ...championForStars({ uid: CHAMPION.THORJANEFOSTER }, [ 3, 4, 5 ]),
        ...championForStars({ uid: CHAMPION.UNSTOPPABLECOLOSSUS }, [ 2, 3, 4, 5 ]),
    ]),
    ...championsForType(TYPE.UNIVERSAL, [
        ...championForStars({ uid: CHAMPION.MAESTRO }, [ 5 ]),
    ]),
].map((champion) => new Champion(champion));

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
