import Champion, {
    ROLE_ARENA,
    ROLE_QUEST,
    ROLE_ALLIANCE_QUEST,
    ROLE_ALLIANCE_WAR_ATTACK,
    ROLE_ALLIANCE_WAR_DEFENSE,
} from './model/Champion';

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

export const CHAMPION_MAESTRO = 'maestro';

export const UNRELEASED_CHAMPIONS = {
    // Cosmic
    [ CHAMPION_LOKI ]: true,
    // Tech
    // Mutant
    [ CHAMPION_BEAST ]: true,
    [ CHAMPION_GAMBIT ]: true,
    [ CHAMPION_NIGHTCRAWLER ]: true,
    [ CHAMPION_WOLVERINEWEAPONX ]: true,
    // Skill
    [ CHAMPION_REDSKULL ]: true,
    // Mystic
    [ CHAMPION_DRSTRANGEMARVELNOW ]: true,
    //Unknown
    [ CHAMPION_MAESTRO ]: true,
};

export const CHAMPION_PLACEHOLDER = new Champion({ uid: null, stars: 0 });

const champions = [
    // Cosmic

	{ uid: CHAMPION_BLACKBOLT, stars: 2, typeId: 'cosmic' },
	{ uid: CHAMPION_BLACKBOLT, stars: 3, typeId: 'cosmic' },
	{ uid: CHAMPION_BLACKBOLT, stars: 4, typeId: 'cosmic' },

	{ uid: CHAMPION_CAPTAINMARVEL, stars: 3, typeId: 'cosmic' },
	{ uid: CHAMPION_CAPTAINMARVEL, stars: 4, typeId: 'cosmic' },
	{ uid: CHAMPION_CAPTAINMARVEL, stars: 5, typeId: 'cosmic' },

	{ uid: CHAMPION_DRAX, stars: 2, typeId: 'cosmic' },
	{ uid: CHAMPION_DRAX, stars: 3, typeId: 'cosmic' },
	{ uid: CHAMPION_DRAX, stars: 4, typeId: 'cosmic' },
	{ uid: CHAMPION_DRAX, stars: 5, typeId: 'cosmic' },

	{ uid: CHAMPION_GAMORA, stars: 1, typeId: 'cosmic' },
	{ uid: CHAMPION_GAMORA, stars: 2, typeId: 'cosmic' },
	{ uid: CHAMPION_GAMORA, stars: 3, typeId: 'cosmic' },
	{ uid: CHAMPION_GAMORA, stars: 4, typeId: 'cosmic' },

	{ uid: CHAMPION_GROOT, stars: 3, typeId: 'cosmic' },
	{ uid: CHAMPION_GROOT, stars: 4, typeId: 'cosmic' },
	{ uid: CHAMPION_GROOT, stars: 5, typeId: 'cosmic' },

	{ uid: CHAMPION_KAMALAKHAN, stars: 3, typeId: 'cosmic' },
	{ uid: CHAMPION_KAMALAKHAN, stars: 4, typeId: 'cosmic' },
	{ uid: CHAMPION_KAMALAKHAN, stars: 5, typeId: 'cosmic' },

	{ uid: CHAMPION_LOKI, stars: 3, typeId: 'cosmic' },
	{ uid: CHAMPION_LOKI, stars: 4, typeId: 'cosmic' },
	{ uid: CHAMPION_LOKI, stars: 5, typeId: 'cosmic' },

	{ uid: CHAMPION_MSMARVEL, stars: 3, typeId: 'cosmic' },
	{ uid: CHAMPION_MSMARVEL, stars: 4, typeId: 'cosmic' },

	{ uid: CHAMPION_RONAN, stars: 2, typeId: 'cosmic' },
	{ uid: CHAMPION_RONAN, stars: 3, typeId: 'cosmic' },
	{ uid: CHAMPION_RONAN, stars: 4, typeId: 'cosmic' },
	{ uid: CHAMPION_RONAN, stars: 5, typeId: 'cosmic' },

	{ uid: CHAMPION_SPIDERMANBLACK, stars: 3, typeId: 'cosmic' },
	{ uid: CHAMPION_SPIDERMANBLACK, stars: 4, typeId: 'cosmic' },

	{ uid: CHAMPION_SUPERIORIRONMAN, stars: 2, typeId: 'cosmic' },
	{ uid: CHAMPION_SUPERIORIRONMAN, stars: 3, typeId: 'cosmic' },
	{ uid: CHAMPION_SUPERIORIRONMAN, stars: 4, typeId: 'cosmic' },

	{ uid: CHAMPION_THOR, stars: 2, typeId: 'cosmic' },
	{ uid: CHAMPION_THOR, stars: 3, typeId: 'cosmic' },
	{ uid: CHAMPION_THOR, stars: 4, typeId: 'cosmic' },

	{ uid: CHAMPION_VENOM, stars: 3, typeId: 'cosmic' },
	{ uid: CHAMPION_VENOM, stars: 4, typeId: 'cosmic' },
	{ uid: CHAMPION_VENOM, stars: 5, typeId: 'cosmic' },

	{ uid: CHAMPION_VENOMPOOL, stars: 3, typeId: 'cosmic' },
	{ uid: CHAMPION_VENOMPOOL, stars: 4, typeId: 'cosmic' },
	{ uid: CHAMPION_VENOMPOOL, stars: 5, typeId: 'cosmic' },

    // Tech

	{ uid: CHAMPION_CIVILWARRIOR, stars: 3, typeId: 'tech' },
	{ uid: CHAMPION_CIVILWARRIOR, stars: 4, typeId: 'tech' },
	{ uid: CHAMPION_CIVILWARRIOR, stars: 5, typeId: 'tech' },

	{ uid: CHAMPION_HULKBUSTER, stars: 2, typeId: 'tech' },
	{ uid: CHAMPION_HULKBUSTER, stars: 3, typeId: 'tech' },
	{ uid: CHAMPION_HULKBUSTER, stars: 4, typeId: 'tech' },

	{ uid: CHAMPION_IRONMAN, stars: 1, typeId: 'tech' },
	{ uid: CHAMPION_IRONMAN, stars: 2, typeId: 'tech' },
	{ uid: CHAMPION_IRONMAN, stars: 3, typeId: 'tech' },
	{ uid: CHAMPION_IRONMAN, stars: 4, typeId: 'tech' },
	{ uid: CHAMPION_IRONMAN, stars: 5, typeId: 'tech' },

	{ uid: CHAMPION_IRONPATRIOT, stars: 3, typeId: 'tech' },
	{ uid: CHAMPION_IRONPATRIOT, stars: 4, typeId: 'tech' },
	{ uid: CHAMPION_IRONPATRIOT, stars: 5, typeId: 'tech' },

	{ uid: CHAMPION_KANG, stars: 4, typeId: 'tech' },

	{ uid: CHAMPION_ROCKET, stars: 2, typeId: 'tech' },
	{ uid: CHAMPION_ROCKET, stars: 3, typeId: 'tech' },
	{ uid: CHAMPION_ROCKET, stars: 4, typeId: 'tech' },

	{ uid: CHAMPION_STARLORD, stars: 2, typeId: 'tech' },
	{ uid: CHAMPION_STARLORD, stars: 3, typeId: 'tech' },
	{ uid: CHAMPION_STARLORD, stars: 4, typeId: 'tech' },
	{ uid: CHAMPION_STARLORD, stars: 5, typeId: 'tech' },

	{ uid: CHAMPION_VISION, stars: 1, typeId: 'tech' },
	{ uid: CHAMPION_VISION, stars: 2, typeId: 'tech' },
	{ uid: CHAMPION_VISION, stars: 3, typeId: 'tech' },
	{ uid: CHAMPION_VISION, stars: 4, typeId: 'tech' },

	{ uid: CHAMPION_THEVISION, stars: 1, typeId: 'tech' },
	{ uid: CHAMPION_THEVISION, stars: 2, typeId: 'tech' },
	{ uid: CHAMPION_THEVISION, stars: 3, typeId: 'tech' },
	{ uid: CHAMPION_THEVISION, stars: 4, typeId: 'tech' },

	{ uid: CHAMPION_ULTRON, stars: 2, typeId: 'tech' },
	{ uid: CHAMPION_ULTRON, stars: 3, typeId: 'tech' },
	{ uid: CHAMPION_ULTRON, stars: 4, typeId: 'tech' },

	{ uid: CHAMPION_WARMACHINE, stars: 2, typeId: 'tech' },
	{ uid: CHAMPION_WARMACHINE, stars: 3, typeId: 'tech' },
	{ uid: CHAMPION_WARMACHINE, stars: 4, typeId: 'tech' },

    // Mutant

	{ uid: CHAMPION_BEAST, stars: 2, typeId: 'mutant' },
	{ uid: CHAMPION_BEAST, stars: 3, typeId: 'mutant' },
	{ uid: CHAMPION_BEAST, stars: 4, typeId: 'mutant' },

	{ uid: CHAMPION_COLOSSUS, stars: 1, typeId: 'mutant' },
	{ uid: CHAMPION_COLOSSUS, stars: 2, typeId: 'mutant' },
	{ uid: CHAMPION_COLOSSUS, stars: 3, typeId: 'mutant' },
	{ uid: CHAMPION_COLOSSUS, stars: 4, typeId: 'mutant' },

	{ uid: CHAMPION_CYCLOPS, stars: 2, typeId: 'mutant' },
	{ uid: CHAMPION_CYCLOPS, stars: 3, typeId: 'mutant' },
	{ uid: CHAMPION_CYCLOPS, stars: 4, typeId: 'mutant' },
	{ uid: CHAMPION_CYCLOPS, stars: 5, typeId: 'mutant' },

	{ uid: CHAMPION_CYCLOPS90S, stars: 3, typeId: 'mutant' },
	{ uid: CHAMPION_CYCLOPS90S, stars: 4, typeId: 'mutant' },
	{ uid: CHAMPION_CYCLOPS90S, stars: 5, typeId: 'mutant' },

	{ uid: CHAMPION_DEADPOOL, stars: 2, typeId: 'mutant' },
	{ uid: CHAMPION_DEADPOOL, stars: 3, typeId: 'mutant' },
	{ uid: CHAMPION_DEADPOOL, stars: 4, typeId: 'mutant' },

	{ uid: CHAMPION_DEADPOOLXFORCE, stars: 2, typeId: 'mutant' },
	{ uid: CHAMPION_DEADPOOLXFORCE, stars: 3, typeId: 'mutant' },
	{ uid: CHAMPION_DEADPOOLXFORCE, stars: 4, typeId: 'mutant' },

	{ uid: CHAMPION_GAMBIT, stars: 2, typeId: 'mutant' },
	{ uid: CHAMPION_GAMBIT, stars: 3, typeId: 'mutant' },
	{ uid: CHAMPION_GAMBIT, stars: 4, typeId: 'mutant' },

	{ uid: CHAMPION_MAGNETO, stars: 2, typeId: 'mutant' },
	{ uid: CHAMPION_MAGNETO, stars: 3, typeId: 'mutant' },
	{ uid: CHAMPION_MAGNETO, stars: 4, typeId: 'mutant' },
	{ uid: CHAMPION_MAGNETO, stars: 5, typeId: 'mutant' },

	{ uid: CHAMPION_MAGNETOMARVELNOW, stars: 3, typeId: 'mutant' },
	{ uid: CHAMPION_MAGNETOMARVELNOW, stars: 4, typeId: 'mutant' },

	{ uid: CHAMPION_NIGHTCRAWLER, stars: 2, typeId: 'mutant' },
	{ uid: CHAMPION_NIGHTCRAWLER, stars: 3, typeId: 'mutant' },
	{ uid: CHAMPION_NIGHTCRAWLER, stars: 4, typeId: 'mutant' },

	{ uid: CHAMPION_STORM, stars: 2, typeId: 'mutant' },
	{ uid: CHAMPION_STORM, stars: 3, typeId: 'mutant' },
	{ uid: CHAMPION_STORM, stars: 4, typeId: 'mutant' },
	{ uid: CHAMPION_STORM, stars: 5, typeId: 'mutant' },

	{ uid: CHAMPION_WOLVERINE, stars: 1, typeId: 'mutant' },
	{ uid: CHAMPION_WOLVERINE, stars: 2, typeId: 'mutant' },
	{ uid: CHAMPION_WOLVERINE, stars: 3, typeId: 'mutant' },
	{ uid: CHAMPION_WOLVERINE, stars: 4, typeId: 'mutant' },

	{ uid: CHAMPION_WOLVERINEOLDMAN, stars: 3, typeId: 'mutant' },
	{ uid: CHAMPION_WOLVERINEOLDMAN, stars: 4, typeId: 'mutant' },
	{ uid: CHAMPION_WOLVERINEOLDMAN, stars: 5, typeId: 'mutant' },

	{ uid: CHAMPION_WOLVERINEWEAPONX, stars: 3, typeId: 'mutant' },
	{ uid: CHAMPION_WOLVERINEWEAPONX, stars: 4, typeId: 'mutant' },
	{ uid: CHAMPION_WOLVERINEWEAPONX, stars: 5, typeId: 'mutant' },

	{ uid: CHAMPION_X23, stars: 3, typeId: 'mutant' },
	{ uid: CHAMPION_X23, stars: 4, typeId: 'mutant' },

    // Skill

	{ uid: CHAMPION_AGENTVENOM, stars: 3, typeId: 'skill' },
	{ uid: CHAMPION_AGENTVENOM, stars: 4, typeId: 'skill' },
	{ uid: CHAMPION_AGENTVENOM, stars: 5, typeId: 'skill' },

	{ uid: CHAMPION_BLACKPANTHER, stars: 1, typeId: 'skill' },
	{ uid: CHAMPION_BLACKPANTHER, stars: 2, typeId: 'skill' },
	{ uid: CHAMPION_BLACKPANTHER, stars: 3, typeId: 'skill' },
	{ uid: CHAMPION_BLACKPANTHER, stars: 4, typeId: 'skill' },
	{ uid: CHAMPION_BLACKPANTHER, stars: 5, typeId: 'skill' },

	{ uid: CHAMPION_BLACKPANTHERCIVILWAR, stars: 3, typeId: 'skill' },
	{ uid: CHAMPION_BLACKPANTHERCIVILWAR, stars: 4, typeId: 'skill' },
	{ uid: CHAMPION_BLACKPANTHERCIVILWAR, stars: 5, typeId: 'skill' },

	{ uid: CHAMPION_BLACKWIDOW, stars: 2, typeId: 'skill' },
	{ uid: CHAMPION_BLACKWIDOW, stars: 3, typeId: 'skill' },
	{ uid: CHAMPION_BLACKWIDOW, stars: 4, typeId: 'skill' },

	{ uid: CHAMPION_CROSSBONES, stars: 3, typeId: 'skill' },
	{ uid: CHAMPION_CROSSBONES, stars: 4, typeId: 'skill' },
	{ uid: CHAMPION_CROSSBONES, stars: 5, typeId: 'skill' },

	{ uid: CHAMPION_DAREDEVIL, stars: 3, typeId: 'skill' },
	{ uid: CHAMPION_DAREDEVIL, stars: 4, typeId: 'skill' },

	{ uid: CHAMPION_DAREDEVILNETFLIX, stars: 2, typeId: 'skill' },
	{ uid: CHAMPION_DAREDEVILNETFLIX, stars: 3, typeId: 'skill' },
	{ uid: CHAMPION_DAREDEVILNETFLIX, stars: 4, typeId: 'skill' },
	{ uid: CHAMPION_DAREDEVILNETFLIX, stars: 5, typeId: 'skill' },

	{ uid: CHAMPION_ELEKTRA, stars: 3, typeId: 'skill' },
	{ uid: CHAMPION_ELEKTRA, stars: 4, typeId: 'skill' },

	{ uid: CHAMPION_FALCON, stars: 3, typeId: 'skill' },
	{ uid: CHAMPION_FALCON, stars: 4, typeId: 'skill' },
	{ uid: CHAMPION_FALCON, stars: 5, typeId: 'skill' },

	{ uid: CHAMPION_HAWKEYE, stars: 1, typeId: 'skill' },
	{ uid: CHAMPION_HAWKEYE, stars: 2, typeId: 'skill' },
	{ uid: CHAMPION_HAWKEYE, stars: 3, typeId: 'skill' },
	{ uid: CHAMPION_HAWKEYE, stars: 4, typeId: 'skill' },
	{ uid: CHAMPION_HAWKEYE, stars: 5, typeId: 'skill' },

	{ uid: CHAMPION_MOONKNIGHT, stars: 3, typeId: 'skill' },
	{ uid: CHAMPION_MOONKNIGHT, stars: 4, typeId: 'skill' },

	{ uid: CHAMPION_PUNISHER, stars: 2, typeId: 'skill' },
	{ uid: CHAMPION_PUNISHER, stars: 3, typeId: 'skill' },
	{ uid: CHAMPION_PUNISHER, stars: 4, typeId: 'skill' },

	{ uid: CHAMPION_REDSKULL, stars: 3, typeId: 'skill' },
	{ uid: CHAMPION_REDSKULL, stars: 4, typeId: 'skill' },
	{ uid: CHAMPION_REDSKULL, stars: 5, typeId: 'skill' },

	{ uid: CHAMPION_WINTERSOLDIER, stars: 2, typeId: 'skill' },
	{ uid: CHAMPION_WINTERSOLDIER, stars: 3, typeId: 'skill' },
	{ uid: CHAMPION_WINTERSOLDIER, stars: 4, typeId: 'skill' },
	{ uid: CHAMPION_WINTERSOLDIER, stars: 5, typeId: 'skill' },

    // Science

	{ uid: CHAMPION_ABOMINATION, stars: 2, typeId: 'science' },
	{ uid: CHAMPION_ABOMINATION, stars: 3, typeId: 'science' },
	{ uid: CHAMPION_ABOMINATION, stars: 4, typeId: 'science' },

	{ uid: CHAMPION_ANTMAN, stars: 2, typeId: 'science' },
	{ uid: CHAMPION_ANTMAN, stars: 3, typeId: 'science' },
	{ uid: CHAMPION_ANTMAN, stars: 4, typeId: 'science' },
	{ uid: CHAMPION_ANTMAN, stars: 5, typeId: 'science' },

	{ uid: CHAMPION_CAPTAINAMERICA, stars: 2, typeId: 'science' },
	{ uid: CHAMPION_CAPTAINAMERICA, stars: 3, typeId: 'science' },
	{ uid: CHAMPION_CAPTAINAMERICA, stars: 4, typeId: 'science' },

	{ uid: CHAMPION_CAPTAINAMERICAWWII, stars: 2, typeId: 'science' },
	{ uid: CHAMPION_CAPTAINAMERICAWWII, stars: 3, typeId: 'science' },
	{ uid: CHAMPION_CAPTAINAMERICAWWII, stars: 4, typeId: 'science' },

	{ uid: CHAMPION_ELECTRO, stars: 3, typeId: 'science' },
	{ uid: CHAMPION_ELECTRO, stars: 4, typeId: 'science' },

	{ uid: CHAMPION_HULK, stars: 1, typeId: 'science' },
	{ uid: CHAMPION_HULK, stars: 2, typeId: 'science' },
	{ uid: CHAMPION_HULK, stars: 3, typeId: 'science' },
	{ uid: CHAMPION_HULK, stars: 4, typeId: 'science' },

	{ uid: CHAMPION_JOEFIXIT, stars: 3, typeId: 'science' },
	{ uid: CHAMPION_JOEFIXIT, stars: 4, typeId: 'science' },

	{ uid: CHAMPION_LUKECAGE, stars: 3, typeId: 'science' },
	{ uid: CHAMPION_LUKECAGE, stars: 4, typeId: 'science' },
	{ uid: CHAMPION_LUKECAGE, stars: 5, typeId: 'science' },

	{ uid: CHAMPION_REDHULK, stars: 3, typeId: 'science' },
	{ uid: CHAMPION_REDHULK, stars: 4, typeId: 'science' },
	{ uid: CHAMPION_REDHULK, stars: 5, typeId: 'science' },

	{ uid: CHAMPION_RHINO, stars: 2, typeId: 'science' },
	{ uid: CHAMPION_RHINO, stars: 3, typeId: 'science' },
	{ uid: CHAMPION_RHINO, stars: 4, typeId: 'science' },
	{ uid: CHAMPION_RHINO, stars: 5, typeId: 'science' },

	{ uid: CHAMPION_SHEHULK, stars: 3, typeId: 'science' },
	{ uid: CHAMPION_SHEHULK, stars: 4, typeId: 'science' },
	{ uid: CHAMPION_SHEHULK, stars: 5, typeId: 'science' },

	{ uid: CHAMPION_SPIDERGWEN, stars: 3, typeId: 'science' },
	{ uid: CHAMPION_SPIDERGWEN, stars: 4, typeId: 'science' },
	{ uid: CHAMPION_SPIDERGWEN, stars: 5, typeId: 'science' },

	{ uid: CHAMPION_SPIDERMAN, stars: 1, typeId: 'science' },
	{ uid: CHAMPION_SPIDERMAN, stars: 2, typeId: 'science' },
	{ uid: CHAMPION_SPIDERMAN, stars: 3, typeId: 'science' },
	{ uid: CHAMPION_SPIDERMAN, stars: 4, typeId: 'science' },
	{ uid: CHAMPION_SPIDERMAN, stars: 5, typeId: 'science' },

	{ uid: CHAMPION_SPIDERMANMORALES, stars: 3, typeId: 'science' },
	{ uid: CHAMPION_SPIDERMANMORALES, stars: 4, typeId: 'science' },

	{ uid: CHAMPION_YELLOWJACKET, stars: 2, typeId: 'science' },
	{ uid: CHAMPION_YELLOWJACKET, stars: 3, typeId: 'science' },
	{ uid: CHAMPION_YELLOWJACKET, stars: 4, typeId: 'science' },

    // Mystic

	{ uid: CHAMPION_DRSTRANGE, stars: 3, typeId: 'mystic' },
	{ uid: CHAMPION_DRSTRANGE, stars: 4, typeId: 'mystic' },

	{ uid: CHAMPION_DRSTRANGEMARVELNOW, stars: 3, typeId: 'mystic' },
	{ uid: CHAMPION_DRSTRANGEMARVELNOW, stars: 4, typeId: 'mystic' },
	{ uid: CHAMPION_DRSTRANGEMARVELNOW, stars: 5, typeId: 'mystic' },

	{ uid: CHAMPION_GUILLOTINE, stars: 2, typeId: 'mystic' },
	{ uid: CHAMPION_GUILLOTINE, stars: 3, typeId: 'mystic' },
	{ uid: CHAMPION_GUILLOTINE, stars: 4, typeId: 'mystic' },

	{ uid: CHAMPION_IRONFIST, stars: 2, typeId: 'mystic' },
	{ uid: CHAMPION_IRONFIST, stars: 3, typeId: 'mystic' },
	{ uid: CHAMPION_IRONFIST, stars: 4, typeId: 'mystic' },
	{ uid: CHAMPION_IRONFIST, stars: 5, typeId: 'mystic' },

	{ uid: CHAMPION_IRONFISTWHITE, stars: 3, typeId: 'mystic' },
	{ uid: CHAMPION_IRONFISTWHITE, stars: 4, typeId: 'mystic' },
	{ uid: CHAMPION_IRONFISTWHITE, stars: 5, typeId: 'mystic' },

	{ uid: CHAMPION_JUGGERNAUT, stars: 1, typeId: 'mystic' },
	{ uid: CHAMPION_JUGGERNAUT, stars: 2, typeId: 'mystic' },
	{ uid: CHAMPION_JUGGERNAUT, stars: 3, typeId: 'mystic' },
	{ uid: CHAMPION_JUGGERNAUT, stars: 4, typeId: 'mystic' },
	{ uid: CHAMPION_JUGGERNAUT, stars: 5, typeId: 'mystic' },

	{ uid: CHAMPION_MAGIK, stars: 2, typeId: 'mystic' },
	{ uid: CHAMPION_MAGIK, stars: 3, typeId: 'mystic' },
	{ uid: CHAMPION_MAGIK, stars: 4, typeId: 'mystic' },
	{ uid: CHAMPION_MAGIK, stars: 5, typeId: 'mystic' },

	{ uid: CHAMPION_SCARLETWITCH, stars: 1, typeId: 'mystic' },
	{ uid: CHAMPION_SCARLETWITCH, stars: 2, typeId: 'mystic' },
	{ uid: CHAMPION_SCARLETWITCH, stars: 3, typeId: 'mystic' },
	{ uid: CHAMPION_SCARLETWITCH, stars: 4, typeId: 'mystic' },

	{ uid: CHAMPION_THORJANEFOSTER, stars: 3, typeId: 'mystic' },
	{ uid: CHAMPION_THORJANEFOSTER, stars: 4, typeId: 'mystic' },
	{ uid: CHAMPION_THORJANEFOSTER, stars: 5, typeId: 'mystic' },

	{ uid: CHAMPION_UNSTOPPABLECOLOSSUS, stars: 2, typeId: 'mystic' },
	{ uid: CHAMPION_UNSTOPPABLECOLOSSUS, stars: 3, typeId: 'mystic' },
	{ uid: CHAMPION_UNSTOPPABLECOLOSSUS, stars: 4, typeId: 'mystic' },
	{ uid: CHAMPION_UNSTOPPABLECOLOSSUS, stars: 5, typeId: 'mystic' },

    // Unknown

	{ uid: CHAMPION_MAESTRO, stars: 4 },
	{ uid: CHAMPION_MAESTRO, stars: 5 },
].map((champion) => new Champion(champion));

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
