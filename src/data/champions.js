import Champion, {
    ROLE_ARENA,
    ROLE_QUEST,
    ROLE_ALLIANCE_QUEST,
    ROLE_ALLIANCE_WAR_ATTACK,
    ROLE_ALLIANCE_WAR_DEFENSE,
} from './model/Champion';

// Cosmic
export const CHAMPION_BLACKBOLT = 'blackbolt';
export const CHAMPION_CAPTAINMARVEL = 'captainmarvel';
export const CHAMPION_DRAX = 'drax';
export const CHAMPION_GAMORA = 'gamora';
export const CHAMPION_GROOT = 'groot';
export const CHAMPION_KAMALAKHAN = 'kamalakhan';
export const CHAMPION_LOKI = 'loki';
export const CHAMPION_MSMARVEL = 'msmarvel';
export const CHAMPION_RONAN = 'ronan';
export const CHAMPION_SPIDERMANBLACK = 'spidermanblack';
export const CHAMPION_SUPERIORIRONMAN = 'superiorironman';
export const CHAMPION_THOR = 'thor';
export const CHAMPION_VENOM = 'venom';
export const CHAMPION_VENOMPOOL = 'venompool';
// Tech
export const CHAMPION_CIVILWARRIOR = 'civilwarrior';
export const CHAMPION_HULKBUSTER = 'hulkbuster';
export const CHAMPION_IRONMAN = 'ironman';
export const CHAMPION_IRONPATRIOT = 'ironpatriot';
export const CHAMPION_KANG = 'kang';
export const CHAMPION_ROCKET = 'rocket';
export const CHAMPION_STARLORD = 'starlord';
export const CHAMPION_VISION = 'vision';
export const CHAMPION_THEVISION = 'thevision';
export const CHAMPION_ULTRON = 'ultron';
export const CHAMPION_WARMACHINE = 'warmachine';
//Mutant
export const CHAMPION_BEAST = 'beast';
export const CHAMPION_COLOSSUS = 'colossus';
export const CHAMPION_CYCLOPS = 'cyclops';
export const CHAMPION_CYCLOPS90S = 'cyclops90s';
export const CHAMPION_DEADPOOL = 'deadpool';
export const CHAMPION_DEADPOOLXFORCE = 'deadpoolxforce';
export const CHAMPION_GAMBIT = 'gambit';
export const CHAMPION_MAGNETO = 'magneto';
export const CHAMPION_MAGNETOMARVELNOW = 'magnetomarvelnow';
export const CHAMPION_NIGHTCRAWLER = 'nightcrawler';
export const CHAMPION_STORM = 'storm';
export const CHAMPION_WOLVERINE = 'wolverine';
export const CHAMPION_WOLVERINEOLDMAN = 'wolverineoldman';
export const CHAMPION_WOLVERINEWEAPONX = 'wolverineweaponx';
export const CHAMPION_X23 = 'x23';
// Skill
export const CHAMPION_AGENTVENOM = 'agentvenom';
export const CHAMPION_BLACKPANTHER = 'blackpanther';
export const CHAMPION_BLACKPANTHERCIVILWAR = 'blackpanthercivilwar';
export const CHAMPION_BLACKWIDOW = 'blackwidow';
export const CHAMPION_CROSSBONES = 'crossbones';
export const CHAMPION_DAREDEVIL = 'daredevil';
export const CHAMPION_DAREDEVILNETFLIX = 'daredevilnetflix';
export const CHAMPION_ELEKTRA = 'elektra';
export const CHAMPION_FALCON = 'falcon';
export const CHAMPION_HAWKEYE = 'hawkeye';
export const CHAMPION_MOONKNIGHT = 'moonknight';
export const CHAMPION_PUNISHER = 'punisher';
export const CHAMPION_REDSKULL = 'redskull';
export const CHAMPION_WINTERSOLDIER = 'wintersoldier';
// Science
export const CHAMPION_ABOMINATION = 'abomination';
export const CHAMPION_ANTMAN = 'antman';
export const CHAMPION_CAPTAINAMERICA = 'captainamerica';
export const CHAMPION_CAPTAINAMERICAWWII = 'captainamericawwii';
export const CHAMPION_ELECTRO = 'electro';
export const CHAMPION_HULK = 'hulk';
export const CHAMPION_JOEFIXIT = 'joefixit';
export const CHAMPION_LUKECAGE = 'lukecage';
export const CHAMPION_REDHULK = 'redhulk';
export const CHAMPION_RHINO = 'rhino';
export const CHAMPION_SHEHULK = 'shehulk';
export const CHAMPION_SPIDERGWEN = 'spidergwen';
export const CHAMPION_SPIDERMAN = 'spiderman';
export const CHAMPION_SPIDERMANMORALES = 'spidermanmorales';
export const CHAMPION_YELLOWJACKET = 'yellowjacket';
// Mystic
export const CHAMPION_DRSTRANGE = 'drstrange';
export const CHAMPION_DRSTRANGEMARVELNOW = 'drstrangemarvelnow';
export const CHAMPION_GUILLOTINE = 'guillotine';
export const CHAMPION_IRONFIST = 'ironfist';
export const CHAMPION_IRONFISTWHITE = 'ironfistwhite';
export const CHAMPION_JUGGERNAUT = 'juggernaut';
export const CHAMPION_MAGIK = 'magik';
export const CHAMPION_SCARLETWITCH = 'scarletwitch';
export const CHAMPION_THORJANEFOSTER = 'thorjanefoster';
export const CHAMPION_UNSTOPPABLECOLOSSUS = 'unstoppablecolossus';
// Unknown
export const CHAMPION_MAESTRO = 'maestro';

export const UNRELEASED_CHAMPIONS = [
    // Cosmic
    CHAMPION_LOKI,
    // Tech
    // Mutant
    CHAMPION_BEAST,
    CHAMPION_GAMBIT,
    CHAMPION_WOLVERINEWEAPONX,
    // Skill
    CHAMPION_REDSKULL,
    // Mystic
    CHAMPION_DRSTRANGEMARVELNOW,
    //Unknown
    CHAMPION_MAESTRO,
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

const CHAMPIONS_TO_FROGSPAWN = {};
const FROGSPAWN_TO_CHAMPIONS = {};
[
    [ CHAMPION_BLACKBOLT, 'black_bolt' ],
    [ CHAMPION_CAPTAINMARVEL, 'cap_marvel' ],
    [ CHAMPION_DRAX, 'drax' ],
    [ CHAMPION_GAMORA, 'gamora' ],
    [ CHAMPION_GROOT, 'groot' ],
    [ CHAMPION_KAMALAKHAN, 'kamala_khan' ],
    [ CHAMPION_MSMARVEL, 'ms_marvel' ],
    [ CHAMPION_RONAN, 'ronan' ],
    [ CHAMPION_SPIDERMANBLACK, 'spiderman_black' ],
    [ CHAMPION_SUPERIORIRONMAN, 'superior_ironman' ],
    [ CHAMPION_THOR, 'thor' ],
    [ CHAMPION_VENOM, 'venom' ],
    [ CHAMPION_VENOMPOOL, 'venompool' ],
    [ CHAMPION_IRONMAN, 'ironman' ],
    [ CHAMPION_IRONPATRIOT, 'iron_patriot' ],
    [ CHAMPION_HULKBUSTER, 'hulkbuster' ],
    [ CHAMPION_KANG, 'kang' ],
    [ CHAMPION_ROCKET, 'rocket' ],
    [ CHAMPION_STARLORD, 'star_lord' ],
    [ CHAMPION_VISION, 'vision' ],
    [ CHAMPION_THEVISION, 'the_vision' ],
    [ CHAMPION_ULTRON, 'ultron' ],
    [ CHAMPION_WARMACHINE, 'warmachine' ],
    [ CHAMPION_COLOSSUS, 'colossus' ],
    [ CHAMPION_CYCLOPS, 'cyclops' ],
    [ CHAMPION_CYCLOPS90S, 'cyclops90' ],
    [ CHAMPION_DEADPOOL, 'deadpool' ],
    [ CHAMPION_DEADPOOLXFORCE, 'deadpool_x' ],
    [ CHAMPION_MAGNETO, 'magneto' ],
    [ CHAMPION_MAGNETOMARVELNOW, 'magneto_white' ],
    [ CHAMPION_STORM, 'storm' ],
    [ CHAMPION_WOLVERINE, 'wolverine' ],
    [ CHAMPION_WOLVERINEOLDMAN, 'oldman_logan' ],
    [ CHAMPION_X23, 'wolverine_x23' ],
    [ CHAMPION_AGENTVENOM, 'agent_venom' ],
    [ CHAMPION_BLACKPANTHER, 'black_panther' ],
    [ CHAMPION_BLACKWIDOW, 'black_widow' ],
    [ CHAMPION_DAREDEVIL, 'daredevil' ],
    [ CHAMPION_DAREDEVILNETFLIX, 'daredevil_netflix' ],
    [ CHAMPION_ELEKTRA, 'elektra' ],
    [ CHAMPION_HAWKEYE, 'hawkeye' ],
    [ CHAMPION_MOONKNIGHT, 'moonknight' ],
    [ CHAMPION_PUNISHER, 'punisher' ],
    [ CHAMPION_REDSKULL, 'red_skull' ],
    [ CHAMPION_WINTERSOLDIER, 'wintersoldier' ],
    [ CHAMPION_ABOMINATION, 'abomination' ],
    [ CHAMPION_ANTMAN, 'antman' ],
    [ CHAMPION_CAPTAINAMERICA, 'cap_america' ],
    [ CHAMPION_CAPTAINAMERICAWWII, 'cap_america_wwii' ],
    [ CHAMPION_ELECTRO, 'electro' ],
    [ CHAMPION_HULK, 'hulk' ],
    [ CHAMPION_JOEFIXIT, 'joe_fixit' ],
    [ CHAMPION_LUKECAGE, 'luke_cage' ],
    [ CHAMPION_REDHULK, 'red_hulk' ],
    [ CHAMPION_RHINO, 'rhino' ],
    [ CHAMPION_SHEHULK, 'she_hulk' ],
    [ CHAMPION_SPIDERGWEN, 'spidergwen' ],
    [ CHAMPION_SPIDERMAN, 'spiderman' ],
    [ CHAMPION_SPIDERMANMORALES, 'spiderman_morales' ],
    [ CHAMPION_YELLOWJACKET, 'yellowjacket' ],
    [ CHAMPION_DRSTRANGE, 'dr_strange' ],
    [ CHAMPION_DRSTRANGEMARVELNOW, 'dr_strange_mn' ],
    [ CHAMPION_GUILLOTINE, 'guillotine' ],
    [ CHAMPION_IRONFIST, 'iron_fist' ],
    [ CHAMPION_IRONFISTWHITE, 'iron_fist_white' ],
    [ CHAMPION_JUGGERNAUT, 'juggernaut' ],
    [ CHAMPION_MAGIK, 'magik' ],
    [ CHAMPION_SCARLETWITCH, 'scarlet_witch' ],
    [ CHAMPION_THORJANEFOSTER, 'thor_jane_foster' ],
    [ CHAMPION_UNSTOPPABLECOLOSSUS, 'u_colossus' ],
    [ CHAMPION_MAESTRO, 'maestro' ],
].forEach(([ champion, frogspawn ]) => {
    CHAMPIONS_TO_FROGSPAWN[ champion ] = frogspawn;
    FROGSPAWN_TO_CHAMPIONS[ frogspawn ] = champion;
});

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

const roleImages = {
    [ ROLE_ARENA ]: 'arena',
    [ ROLE_QUEST ]: 'quest',
    [ ROLE_ALLIANCE_QUEST ]: 'alliance-quest',
    [ ROLE_ALLIANCE_WAR_ATTACK ]: 'alliance-war',
    [ ROLE_ALLIANCE_WAR_DEFENSE ]: 'alliance-war',
};

function roleImage(role, color) {
    return `images/roles/${ roleImages[ role ] }_${ color }.png`;
}

export default champions;
export { idMap, uids, uidsByType, roleImage };
export { FROGSPAWN_TO_CHAMPIONS, CHAMPIONS_TO_FROGSPAWN };
