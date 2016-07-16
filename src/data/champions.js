import Champion from './model/Champion';
import {

    CHAMPION_BLACKBOLT,
    CHAMPION_CAPTAINMARVEL,
    CHAMPION_DRAX,
    CHAMPION_GAMORA,
    CHAMPION_GROOT,
    CHAMPION_KAMALAKHAN,
    CHAMPION_LOKI,
    CHAMPION_MSMARVEL,
    CHAMPION_RONAN,
    CHAMPION_SPIDERMANBLACK,
    CHAMPION_SUPERIORIRONMAN,
    CHAMPION_THOR,
    CHAMPION_VENOM,
    CHAMPION_VENOMPOOL,

    CHAMPION_CIVILWARRIOR,
    CHAMPION_HULKBUSTER,
    CHAMPION_IRONMAN,
    CHAMPION_IRONPATRIOT,
    CHAMPION_KANG,
    CHAMPION_ROCKET,
    CHAMPION_STARLORD,
    CHAMPION_VISION,
    CHAMPION_THEVISION,
    CHAMPION_ULTRON,
    CHAMPION_WARMACHINE,

    CHAMPION_BEAST,
    CHAMPION_COLOSSUS,
    CHAMPION_CYCLOPS,
    CHAMPION_CYCLOPS90S,
    CHAMPION_DEADPOOL,
    CHAMPION_DEADPOOLXFORCE,
    CHAMPION_GAMBIT,
    CHAMPION_MAGNETO,
    CHAMPION_MAGNETOMARVELNOW,
    CHAMPION_NIGHTCRAWLER,
    CHAMPION_STORM,
    CHAMPION_WOLVERINE,
    CHAMPION_WOLVERINEOLDMAN,
    CHAMPION_WOLVERINEWEAPONX,
    CHAMPION_X23,

    CHAMPION_AGENTVENOM,
    CHAMPION_BLACKPANTHER,
    CHAMPION_BLACKPANTHERCIVILWAR,
    CHAMPION_BLACKWIDOW,
    CHAMPION_CROSSBONES,
    CHAMPION_DAREDEVIL,
    CHAMPION_DAREDEVILNETFLIX,
    CHAMPION_ELEKTRA,
    CHAMPION_FALCON,
    CHAMPION_HAWKEYE,
    CHAMPION_MOONKNIGHT,
    CHAMPION_PUNISHER,
    CHAMPION_REDSKULL,
    CHAMPION_WINTERSOLDIER,

    CHAMPION_ABOMINATION,
    CHAMPION_ANTMAN,
    CHAMPION_CAPTAINAMERICA,
    CHAMPION_CAPTAINAMERICAWWII,
    CHAMPION_ELECTRO,
    CHAMPION_HULK,
    CHAMPION_JOEFIXIT,
    CHAMPION_LUKECAGE,
    CHAMPION_REDHULK,
    CHAMPION_RHINO,
    CHAMPION_SHEHULK,
    CHAMPION_SPIDERGWEN,
    CHAMPION_SPIDERMAN,
    CHAMPION_SPIDERMANMORALES,
    CHAMPION_YELLOWJACKET,

    CHAMPION_DRSTRANGE,
    CHAMPION_DRSTRANGEMARVELNOW,
    CHAMPION_GUILLOTINE,
    CHAMPION_IRONFIST,
    CHAMPION_IRONFISTWHITE,
    CHAMPION_JUGGERNAUT,
    CHAMPION_MAGIK,
    CHAMPION_SCARLETWITCH,
    CHAMPION_THORJANEFOSTER,
    CHAMPION_UNSTOPPABLECOLOSSUS,

    CHAMPION_MAESTRO,
} from './champion/ids';

export const WILLPOWER_SAFE_CHAMPIONS = [
    // Cosmic
    CHAMPION_BLACKBOLT,
    CHAMPION_CAPTAINMARVEL,
    CHAMPION_DRAX,
    CHAMPION_GAMORA,
    CHAMPION_GROOT,
    CHAMPION_KAMALAKHAN,
    CHAMPION_MSMARVEL,
    CHAMPION_RONAN,
    CHAMPION_SUPERIORIRONMAN,
    CHAMPION_THOR,
    CHAMPION_VENOM,
    // Tech
    CHAMPION_CIVILWARRIOR,
    CHAMPION_KANG,
    CHAMPION_ROCKET,
    CHAMPION_STARLORD,
    CHAMPION_VISION,
    CHAMPION_THEVISION,
    //Mutant
    CHAMPION_COLOSSUS,
    CHAMPION_MAGNETO,
    CHAMPION_MAGNETOMARVELNOW,
    CHAMPION_STORM,
    // Skill
    CHAMPION_BLACKWIDOW,
    // Science
    CHAMPION_CAPTAINAMERICAWWII,
    CHAMPION_ELECTRO,
    CHAMPION_HULK,
    CHAMPION_RHINO,
    CHAMPION_SHEHULK,
    CHAMPION_SPIDERGWEN,
    CHAMPION_SPIDERMANMORALES,
    CHAMPION_YELLOWJACKET,
    // Mystic
    CHAMPION_DRSTRANGE,
    CHAMPION_GUILLOTINE,
    CHAMPION_JUGGERNAUT,
    CHAMPION_MAGIK,
    CHAMPION_SCARLETWITCH,
    CHAMPION_THORJANEFOSTER,
    CHAMPION_UNSTOPPABLECOLOSSUS,
].reduce((map, champion) => {
    map[ champion ] = true;
    return map;
}, {});

export const CHAMPION_PLACEHOLDER = new Champion({ uid: null, stars: 0 });

const champions = [
    // Cosmic
    ...championForStars({ uid: CHAMPION_BLACKBOLT, typeId: 'cosmic' }, [ 2, 3, 4 ]),
    ...championForStars({ uid: CHAMPION_CAPTAINMARVEL, typeId: 'cosmic' }, [ 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION_DRAX, typeId: 'cosmic' }, [ 2, 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION_GAMORA, typeId: 'cosmic' }, [ 1, 2, 3, 4 ]),
    ...championForStars({ uid: CHAMPION_GROOT, typeId: 'cosmic' }, [ 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION_KAMALAKHAN, typeId: 'cosmic' }, [ 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION_LOKI, typeId: 'cosmic' }, [ 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION_MSMARVEL, typeId: 'cosmic' }, [ 3, 4 ]),
    ...championForStars({ uid: CHAMPION_RONAN, typeId: 'cosmic' }, [ 2, 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION_SPIDERMANBLACK, typeId: 'cosmic' }, [ 3, 4 ]),
    ...championForStars({ uid: CHAMPION_SUPERIORIRONMAN, typeId: 'cosmic' }, [ 2, 3, 4 ]),
    ...championForStars({ uid: CHAMPION_THOR, typeId: 'cosmic' }, [ 2, 3, 4 ]),
    ...championForStars({ uid: CHAMPION_VENOM, typeId: 'cosmic' }, [ 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION_VENOMPOOL, typeId: 'cosmic' }, [ 3, 4, 5 ]),
    // Tech
    ...championForStars({ uid: CHAMPION_CIVILWARRIOR, typeId: 'tech' }, [ 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION_HULKBUSTER, typeId: 'tech' }, [ 2, 3, 4 ]),
    ...championForStars({ uid: CHAMPION_IRONMAN, typeId: 'tech' }, [ 1, 2, 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION_IRONPATRIOT, typeId: 'tech' }, [ 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION_KANG, typeId: 'tech' }, [ 4 ]),
    ...championForStars({ uid: CHAMPION_ROCKET, typeId: 'tech' }, [ 2, 3, 4 ]),
    ...championForStars({ uid: CHAMPION_STARLORD, typeId: 'tech' }, [ 2, 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION_VISION, typeId: 'tech' }, [ 1, 2, 3, 4 ]),
    ...championForStars({ uid: CHAMPION_THEVISION, typeId: 'tech' }, [ 1, 2, 3, 4 ]),
    ...championForStars({ uid: CHAMPION_ULTRON, typeId: 'tech' }, [ 2, 3, 4 ]),
    ...championForStars({ uid: CHAMPION_WARMACHINE, typeId: 'tech' }, [ 2, 3, 4 ]),
    // Mutant
    ...championForStars({ uid: CHAMPION_BEAST, typeId: 'mutant' }, [ 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION_COLOSSUS, typeId: 'mutant' }, [ 1, 2, 3, 4 ]),
    ...championForStars({ uid: CHAMPION_CYCLOPS, typeId: 'mutant' }, [ 2, 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION_CYCLOPS90S, typeId: 'mutant' }, [ 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION_DEADPOOL, typeId: 'mutant' }, [ 2, 3, 4 ]),
    ...championForStars({ uid: CHAMPION_DEADPOOLXFORCE, typeId: 'mutant' }, [ 2, 3, 4 ]),
    ...championForStars({ uid: CHAMPION_GAMBIT, typeId: 'mutant' }, [ 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION_MAGNETO, typeId: 'mutant' }, [ 2, 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION_MAGNETOMARVELNOW, typeId: 'mutant' }, [ 3, 4 ]),
    ...championForStars({ uid: CHAMPION_NIGHTCRAWLER, typeId: 'mutant' }, [ 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION_STORM, typeId: 'mutant' }, [ 2, 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION_WOLVERINE, typeId: 'mutant' }, [ 1, 2, 3, 4 ]),
    ...championForStars({ uid: CHAMPION_WOLVERINEOLDMAN, typeId: 'mutant' }, [ 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION_WOLVERINEWEAPONX, typeId: 'mutant' }, [ 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION_X23, typeId: 'mutant' }, [ 3, 4 ]),
    // Skill
    ...championForStars({ uid: CHAMPION_AGENTVENOM, typeId: 'skill' }, [ 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION_BLACKPANTHER, typeId: 'skill' }, [ 1, 2, 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION_BLACKPANTHERCIVILWAR, typeId: 'skill' }, [ 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION_BLACKWIDOW, typeId: 'skill' }, [ 2, 3, 4 ]),
    ...championForStars({ uid: CHAMPION_CROSSBONES, typeId: 'skill' }, [ 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION_DAREDEVIL, typeId: 'skill' }, [ 3, 4 ]),
    ...championForStars({ uid: CHAMPION_DAREDEVILNETFLIX, typeId: 'skill' }, [ 2, 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION_ELEKTRA, typeId: 'skill' }, [ 3, 4 ]),
    ...championForStars({ uid: CHAMPION_FALCON, typeId: 'skill' }, [ 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION_HAWKEYE, typeId: 'skill' }, [ 1, 2, 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION_MOONKNIGHT, typeId: 'skill' }, [ 3, 4 ]),
    ...championForStars({ uid: CHAMPION_PUNISHER, typeId: 'skill' }, [ 2, 3, 4 ]),
    ...championForStars({ uid: CHAMPION_REDSKULL, typeId: 'skill' }, [ 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION_WINTERSOLDIER, typeId: 'skill' }, [ 2, 3, 4, 5 ]),
    // Science
    ...championForStars({ uid: CHAMPION_ABOMINATION, typeId: 'science' }, [ 2, 3, 4 ]),
    ...championForStars({ uid: CHAMPION_ANTMAN, typeId: 'science' }, [ 2, 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION_CAPTAINAMERICA, typeId: 'science' }, [ 2, 3, 4 ]),
    ...championForStars({ uid: CHAMPION_CAPTAINAMERICAWWII, typeId: 'science' }, [ 2, 3, 4 ]),
    ...championForStars({ uid: CHAMPION_ELECTRO, typeId: 'science' }, [ 3, 4 ]),
    ...championForStars({ uid: CHAMPION_HULK, typeId: 'science' }, [ 1, 2, 3, 4 ]),
    ...championForStars({ uid: CHAMPION_JOEFIXIT, typeId: 'science' }, [ 3, 4 ]),
    ...championForStars({ uid: CHAMPION_LUKECAGE, typeId: 'science' }, [ 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION_REDHULK, typeId: 'science' }, [ 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION_RHINO, typeId: 'science' }, [ 2, 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION_SHEHULK, typeId: 'science' }, [ 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION_SPIDERGWEN, typeId: 'science' }, [ 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION_SPIDERMAN, typeId: 'science' }, [ 1, 2, 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION_SPIDERMANMORALES, typeId: 'science' }, [ 3, 4 ]),
    ...championForStars({ uid: CHAMPION_YELLOWJACKET, typeId: 'science' }, [ 2, 3, 4 ]),
    // Mystic
    ...championForStars({ uid: CHAMPION_DRSTRANGE, typeId: 'mystic' }, [ 3, 4 ]),
    ...championForStars({ uid: CHAMPION_DRSTRANGEMARVELNOW, typeId: 'mystic' }, [ 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION_GUILLOTINE, typeId: 'mystic' }, [ 2, 3, 4 ]),
    ...championForStars({ uid: CHAMPION_IRONFIST, typeId: 'mystic' }, [ 2, 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION_IRONFISTWHITE, typeId: 'mystic' }, [ 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION_JUGGERNAUT, typeId: 'mystic' }, [ 1, 2, 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION_MAGIK, typeId: 'mystic' }, [ 2, 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION_SCARLETWITCH, typeId: 'mystic' }, [ 1, 2, 3, 4 ]),
    ...championForStars({ uid: CHAMPION_THORJANEFOSTER, typeId: 'mystic' }, [ 3, 4, 5 ]),
    ...championForStars({ uid: CHAMPION_UNSTOPPABLECOLOSSUS, typeId: 'mystic' }, [ 2, 3, 4, 5 ]),
    // Unknown
    ...championForStars({ uid: CHAMPION_MAESTRO }, [ 5 ]),
].map((champion) => new Champion(champion));

function championForStars(champion, stars) {
    return stars.map((stars) => ({
        ...champion,
        stars,
    }));
}

const uids = [ ...new Set(champions.map(({ attr }) => attr.uid)) ];

const idMap = {};
const uidsByType = [];
champions.forEach((champion) => {
    const { uid, typeId } = champion.attr;
    const currentTypeId = uidsByType.length && uidsByType[ uidsByType.length - 1 ].typeId;
    if(currentTypeId !== typeId)
        uidsByType.push({
            typeId,
            uids: [],
        });
    const uids = uidsByType[ uidsByType.length - 1 ].uids;
    if(uids[ uids.length - 1 ] !== uid)
        uids.push(uid);
    idMap[ champion.id ] = champion;
});

export default champions;
export { idMap, uids, uidsByType };
