import Champion, {
    ROLE_ARENA,
    ROLE_QUEST,
    ROLE_ALLIANCE_QUEST,
    ROLE_ALLIANCE_WAR_ATTACK,
    ROLE_ALLIANCE_WAR_DEFENSE,
} from './model/Champion';

const UNRELEASED_CHAMPIONS = {
    'blackpanthercivilwar': true,
    'crossbones': true,
    'falcon': true,
    'redskull': true,
    'drstrangemarvelnow': true,
    'civilwarrior': true,
    'maestro': true,
};

const champions = [

	{ uid: 'blackbolt', stars: 2, typeId: 'cosmic' },
	{ uid: 'blackbolt', stars: 3, typeId: 'cosmic' },
	{ uid: 'blackbolt', stars: 4, typeId: 'cosmic' },

	{ uid: 'captainmarvel', stars: 3, typeId: 'cosmic' },
	{ uid: 'captainmarvel', stars: 4, typeId: 'cosmic' },
	{ uid: 'captainmarvel', stars: 5, typeId: 'cosmic' },

	{ uid: 'drax', stars: 2, typeId: 'cosmic' },
	{ uid: 'drax', stars: 3, typeId: 'cosmic' },
	{ uid: 'drax', stars: 4, typeId: 'cosmic' },

	{ uid: 'gamora', stars: 1, typeId: 'cosmic' },
	{ uid: 'gamora', stars: 2, typeId: 'cosmic' },
	{ uid: 'gamora', stars: 3, typeId: 'cosmic' },
	{ uid: 'gamora', stars: 4, typeId: 'cosmic' },

	{ uid: 'groot', stars: 3, typeId: 'cosmic' },
	{ uid: 'groot', stars: 4, typeId: 'cosmic' },
	{ uid: 'groot', stars: 5, typeId: 'cosmic' },

	{ uid: 'kamalakhan', stars: 3, typeId: 'cosmic' },
	{ uid: 'kamalakhan', stars: 4, typeId: 'cosmic' },
	{ uid: 'kamalakhan', stars: 5, typeId: 'cosmic' },

	{ uid: 'msmarvel', stars: 3, typeId: 'cosmic' },
	{ uid: 'msmarvel', stars: 4, typeId: 'cosmic' },

	{ uid: 'ronan', stars: 2, typeId: 'cosmic' },
	{ uid: 'ronan', stars: 3, typeId: 'cosmic' },
	{ uid: 'ronan', stars: 4, typeId: 'cosmic' },
	{ uid: 'ronan', stars: 5, typeId: 'cosmic' },

	{ uid: 'spidermanblack', stars: 3, typeId: 'cosmic' },
	{ uid: 'spidermanblack', stars: 4, typeId: 'cosmic' },

	{ uid: 'superiorironman', stars: 2, typeId: 'cosmic' },
	{ uid: 'superiorironman', stars: 3, typeId: 'cosmic' },
	{ uid: 'superiorironman', stars: 4, typeId: 'cosmic' },

	{ uid: 'thor', stars: 2, typeId: 'cosmic' },
	{ uid: 'thor', stars: 3, typeId: 'cosmic' },
	{ uid: 'thor', stars: 4, typeId: 'cosmic' },

	{ uid: 'venom', stars: 3, typeId: 'cosmic' },
	{ uid: 'venom', stars: 4, typeId: 'cosmic' },
	{ uid: 'venom', stars: 5, typeId: 'cosmic' },

	{ uid: 'venompool', stars: 3, typeId: 'cosmic' },
	{ uid: 'venompool', stars: 4, typeId: 'cosmic' },
	{ uid: 'venompool', stars: 5, typeId: 'cosmic' },

	{ uid: 'ironman', stars: 1, typeId: 'tech' },
	{ uid: 'ironman', stars: 2, typeId: 'tech' },
	{ uid: 'ironman', stars: 3, typeId: 'tech' },
	{ uid: 'ironman', stars: 4, typeId: 'tech' },
	{ uid: 'ironman', stars: 5, typeId: 'tech' },

	{ uid: 'ironpatriot', stars: 3, typeId: 'tech' },
	{ uid: 'ironpatriot', stars: 4, typeId: 'tech' },

	{ uid: 'hulkbuster', stars: 2, typeId: 'tech' },
	{ uid: 'hulkbuster', stars: 3, typeId: 'tech' },
	{ uid: 'hulkbuster', stars: 4, typeId: 'tech' },

	{ uid: 'kang', stars: 4, typeId: 'tech' },

	{ uid: 'rocket', stars: 2, typeId: 'tech' },
	{ uid: 'rocket', stars: 3, typeId: 'tech' },
	{ uid: 'rocket', stars: 4, typeId: 'tech' },

	{ uid: 'starlord', stars: 2, typeId: 'tech' },
	{ uid: 'starlord', stars: 3, typeId: 'tech' },
	{ uid: 'starlord', stars: 4, typeId: 'tech' },
	{ uid: 'starlord', stars: 5, typeId: 'tech' },

	{ uid: 'vision', stars: 1, typeId: 'tech' },
	{ uid: 'vision', stars: 2, typeId: 'tech' },
	{ uid: 'vision', stars: 3, typeId: 'tech' },
	{ uid: 'vision', stars: 4, typeId: 'tech' },

	{ uid: 'thevision', stars: 2, typeId: 'tech' },
	{ uid: 'thevision', stars: 3, typeId: 'tech' },
	{ uid: 'thevision', stars: 4, typeId: 'tech' },

	{ uid: 'ultron', stars: 2, typeId: 'tech' },
	{ uid: 'ultron', stars: 3, typeId: 'tech' },
	{ uid: 'ultron', stars: 4, typeId: 'tech' },

	{ uid: 'warmachine', stars: 2, typeId: 'tech' },
	{ uid: 'warmachine', stars: 3, typeId: 'tech' },
	{ uid: 'warmachine', stars: 4, typeId: 'tech' },

	{ uid: 'colossus', stars: 1, typeId: 'mutant' },
	{ uid: 'colossus', stars: 2, typeId: 'mutant' },
	{ uid: 'colossus', stars: 3, typeId: 'mutant' },
	{ uid: 'colossus', stars: 4, typeId: 'mutant' },

	{ uid: 'cyclops', stars: 2, typeId: 'mutant' },
	{ uid: 'cyclops', stars: 3, typeId: 'mutant' },
	{ uid: 'cyclops', stars: 4, typeId: 'mutant' },
	{ uid: 'cyclops', stars: 5, typeId: 'mutant' },

	{ uid: 'cyclops90s', stars: 3, typeId: 'mutant' },
	{ uid: 'cyclops90s', stars: 4, typeId: 'mutant' },
	{ uid: 'cyclops90s', stars: 5, typeId: 'mutant' },

	{ uid: 'deadpool', stars: 2, typeId: 'mutant' },
	{ uid: 'deadpool', stars: 3, typeId: 'mutant' },
	{ uid: 'deadpool', stars: 4, typeId: 'mutant' },

	{ uid: 'deadpoolxforce', stars: 2, typeId: 'mutant' },
	{ uid: 'deadpoolxforce', stars: 3, typeId: 'mutant' },
	{ uid: 'deadpoolxforce', stars: 4, typeId: 'mutant' },

	{ uid: 'magneto', stars: 2, typeId: 'mutant' },
	{ uid: 'magneto', stars: 3, typeId: 'mutant' },
	{ uid: 'magneto', stars: 4, typeId: 'mutant' },

	{ uid: 'magnetomarvelnow', stars: 3, typeId: 'mutant' },
	{ uid: 'magnetomarvelnow', stars: 4, typeId: 'mutant' },

	{ uid: 'storm', stars: 2, typeId: 'mutant' },
	{ uid: 'storm', stars: 3, typeId: 'mutant' },
	{ uid: 'storm', stars: 4, typeId: 'mutant' },
	{ uid: 'storm', stars: 5, typeId: 'mutant' },

	{ uid: 'wolverine', stars: 1, typeId: 'mutant' },
	{ uid: 'wolverine', stars: 2, typeId: 'mutant' },
	{ uid: 'wolverine', stars: 3, typeId: 'mutant' },
	{ uid: 'wolverine', stars: 4, typeId: 'mutant' },

	{ uid: 'wolverineoldman', stars: 3, typeId: 'mutant' },
	{ uid: 'wolverineoldman', stars: 4, typeId: 'mutant' },
	{ uid: 'wolverineoldman', stars: 5, typeId: 'mutant' },

	{ uid: 'x23', stars: 3, typeId: 'mutant' },
	{ uid: 'x23', stars: 4, typeId: 'mutant' },

	{ uid: 'agentvenom', stars: 3, typeId: 'skill' },
	{ uid: 'agentvenom', stars: 4, typeId: 'skill' },

	{ uid: 'blackpanther', stars: 1, typeId: 'skill' },
	{ uid: 'blackpanther', stars: 2, typeId: 'skill' },
	{ uid: 'blackpanther', stars: 3, typeId: 'skill' },
	{ uid: 'blackpanther', stars: 4, typeId: 'skill' },
	{ uid: 'blackpanther', stars: 5, typeId: 'skill' },

	{ uid: 'blackpanthercivilwar', stars: 3, typeId: 'skill' },
	{ uid: 'blackpanthercivilwar', stars: 4, typeId: 'skill' },
	{ uid: 'blackpanthercivilwar', stars: 5, typeId: 'skill' },

	{ uid: 'blackwidow', stars: 2, typeId: 'skill' },
	{ uid: 'blackwidow', stars: 3, typeId: 'skill' },
	{ uid: 'blackwidow', stars: 4, typeId: 'skill' },

	{ uid: 'crossbones', stars: 3, typeId: 'skill' },
	{ uid: 'crossbones', stars: 4, typeId: 'skill' },
	{ uid: 'crossbones', stars: 5, typeId: 'skill' },

	{ uid: 'daredevil', stars: 3, typeId: 'skill' },
	{ uid: 'daredevil', stars: 4, typeId: 'skill' },

	{ uid: 'daredevilnetflix', stars: 2, typeId: 'skill' },
	{ uid: 'daredevilnetflix', stars: 3, typeId: 'skill' },
	{ uid: 'daredevilnetflix', stars: 4, typeId: 'skill' },
	{ uid: 'daredevilnetflix', stars: 5, typeId: 'skill' },

	{ uid: 'elektra', stars: 3, typeId: 'skill' },
	{ uid: 'elektra', stars: 4, typeId: 'skill' },

	{ uid: 'falcon', stars: 3, typeId: 'skill' },
	{ uid: 'falcon', stars: 4, typeId: 'skill' },
	{ uid: 'falcon', stars: 5, typeId: 'skill' },

	{ uid: 'hawkeye', stars: 1, typeId: 'skill' },
	{ uid: 'hawkeye', stars: 2, typeId: 'skill' },
	{ uid: 'hawkeye', stars: 3, typeId: 'skill' },
	{ uid: 'hawkeye', stars: 4, typeId: 'skill' },

	{ uid: 'moonknight', stars: 3, typeId: 'skill' },
	{ uid: 'moonknight', stars: 4, typeId: 'skill' },

	{ uid: 'punisher', stars: 2, typeId: 'skill' },
	{ uid: 'punisher', stars: 3, typeId: 'skill' },
	{ uid: 'punisher', stars: 4, typeId: 'skill' },

	{ uid: 'redskull', stars: 3, typeId: 'skill' },
	{ uid: 'redskull', stars: 4, typeId: 'skill' },
	{ uid: 'redskull', stars: 5, typeId: 'skill' },

	{ uid: 'wintersoldier', stars: 2, typeId: 'skill' },
	{ uid: 'wintersoldier', stars: 3, typeId: 'skill' },
	{ uid: 'wintersoldier', stars: 4, typeId: 'skill' },
	{ uid: 'wintersoldier', stars: 5, typeId: 'skill' },

	{ uid: 'abomination', stars: 2, typeId: 'science' },
	{ uid: 'abomination', stars: 3, typeId: 'science' },
	{ uid: 'abomination', stars: 4, typeId: 'science' },

	{ uid: 'antman', stars: 2, typeId: 'science' },
	{ uid: 'antman', stars: 3, typeId: 'science' },
	{ uid: 'antman', stars: 4, typeId: 'science' },

	{ uid: 'captainamerica', stars: 2, typeId: 'science' },
	{ uid: 'captainamerica', stars: 3, typeId: 'science' },
	{ uid: 'captainamerica', stars: 4, typeId: 'science' },

	{ uid: 'captainamericawwii', stars: 2, typeId: 'science' },
	{ uid: 'captainamericawwii', stars: 3, typeId: 'science' },
	{ uid: 'captainamericawwii', stars: 4, typeId: 'science' },

	{ uid: 'electro', stars: 3, typeId: 'science' },
	{ uid: 'electro', stars: 4, typeId: 'science' },

	{ uid: 'hulk', stars: 1, typeId: 'science' },
	{ uid: 'hulk', stars: 2, typeId: 'science' },
	{ uid: 'hulk', stars: 3, typeId: 'science' },
	{ uid: 'hulk', stars: 4, typeId: 'science' },

	{ uid: 'joefixit', stars: 3, typeId: 'science' },
	{ uid: 'joefixit', stars: 4, typeId: 'science' },

	{ uid: 'lukecage', stars: 3, typeId: 'science' },
	{ uid: 'lukecage', stars: 4, typeId: 'science' },
	{ uid: 'lukecage', stars: 5, typeId: 'science' },

	{ uid: 'redhulk', stars: 3, typeId: 'science' },
	{ uid: 'redhulk', stars: 4, typeId: 'science' },
	{ uid: 'redhulk', stars: 5, typeId: 'science' },

	{ uid: 'rhino', stars: 2, typeId: 'science' },
	{ uid: 'rhino', stars: 3, typeId: 'science' },
	{ uid: 'rhino', stars: 4, typeId: 'science' },
	{ uid: 'rhino', stars: 5, typeId: 'science' },

	{ uid: 'shehulk', stars: 3, typeId: 'science' },
	{ uid: 'shehulk', stars: 4, typeId: 'science' },
	{ uid: 'shehulk', stars: 5, typeId: 'science' },

	{ uid: 'spidergwen', stars: 3, typeId: 'science' },
	{ uid: 'spidergwen', stars: 4, typeId: 'science' },
	{ uid: 'spidergwen', stars: 5, typeId: 'science' },

	{ uid: 'spiderman', stars: 1, typeId: 'science' },
	{ uid: 'spiderman', stars: 2, typeId: 'science' },
	{ uid: 'spiderman', stars: 3, typeId: 'science' },
	{ uid: 'spiderman', stars: 4, typeId: 'science' },
	{ uid: 'spiderman', stars: 5, typeId: 'science' },

	{ uid: 'spidermanmorales', stars: 3, typeId: 'science' },
	{ uid: 'spidermanmorales', stars: 4, typeId: 'science' },

	{ uid: 'yellowjacket', stars: 2, typeId: 'science' },
	{ uid: 'yellowjacket', stars: 3, typeId: 'science' },
	{ uid: 'yellowjacket', stars: 4, typeId: 'science' },

	{ uid: 'drstrange', stars: 3, typeId: 'mystic' },
	{ uid: 'drstrange', stars: 4, typeId: 'mystic' },

	{ uid: 'drstrangemarvelnow', stars: 3, typeId: 'mystic' },
	{ uid: 'drstrangemarvelnow', stars: 4, typeId: 'mystic' },
	{ uid: 'drstrangemarvelnow', stars: 5, typeId: 'mystic' },

	{ uid: 'guillotine', stars: 2, typeId: 'mystic' },
	{ uid: 'guillotine', stars: 3, typeId: 'mystic' },
	{ uid: 'guillotine', stars: 4, typeId: 'mystic' },

	{ uid: 'ironfist', stars: 2, typeId: 'mystic' },
	{ uid: 'ironfist', stars: 3, typeId: 'mystic' },
	{ uid: 'ironfist', stars: 4, typeId: 'mystic' },

	{ uid: 'ironfistwhite', stars: 3, typeId: 'mystic' },
	{ uid: 'ironfistwhite', stars: 4, typeId: 'mystic' },
	{ uid: 'ironfistwhite', stars: 5, typeId: 'mystic' },

	{ uid: 'juggernaut', stars: 1, typeId: 'mystic' },
	{ uid: 'juggernaut', stars: 2, typeId: 'mystic' },
	{ uid: 'juggernaut', stars: 3, typeId: 'mystic' },
	{ uid: 'juggernaut', stars: 4, typeId: 'mystic' },
	{ uid: 'juggernaut', stars: 5, typeId: 'mystic' },

	{ uid: 'magik', stars: 2, typeId: 'mystic' },
	{ uid: 'magik', stars: 3, typeId: 'mystic' },
	{ uid: 'magik', stars: 4, typeId: 'mystic' },
	{ uid: 'magik', stars: 5, typeId: 'mystic' },

	{ uid: 'scarletwitch', stars: 1, typeId: 'mystic' },
	{ uid: 'scarletwitch', stars: 2, typeId: 'mystic' },
	{ uid: 'scarletwitch', stars: 3, typeId: 'mystic' },
	{ uid: 'scarletwitch', stars: 4, typeId: 'mystic' },

	{ uid: 'thorjanefoster', stars: 3, typeId: 'mystic' },
	{ uid: 'thorjanefoster', stars: 4, typeId: 'mystic' },
	{ uid: 'thorjanefoster', stars: 5, typeId: 'mystic' },

	{ uid: 'unstoppablecolossus', stars: 2, typeId: 'mystic' },
	{ uid: 'unstoppablecolossus', stars: 3, typeId: 'mystic' },
	{ uid: 'unstoppablecolossus', stars: 4, typeId: 'mystic' },

	{ uid: 'civilwarrior', stars: 4 },
	{ uid: 'civilwarrior', stars: 5 },

	{ uid: 'maestro', stars: 4 },
	{ uid: 'maestro', stars: 5 },

].map((champion) => new Champion(champion));

const uids = [ ...new Set(champions.map(({ attr }) => attr.uid)) ];

const CHAMPIONS_TO_FROGSPAWN = {};
const FROGSPAWN_TO_CHAMPIONS = {};
[
    [ 'blackbolt', 'black_bolt' ],
    [ 'captainmarvel', 'cap_marvel' ],
    [ 'drax', 'drax' ],
    [ 'gamora', 'gamora' ],
    [ 'groot', 'groot' ],
    [ 'kamalakhan', 'kamala_khan' ],
    [ 'msmarvel', 'ms_marvel' ],
    [ 'ronan', 'ronan' ],
    [ 'spidermanblack', 'spiderman_black' ],
    [ 'superiorironman', 'superior_ironman' ],
    [ 'thor', 'thor' ],
    [ 'venom', 'venom' ],
    [ 'venompool', 'venompool' ],
    [ 'ironman', 'ironman' ],
    [ 'ironpatriot', 'iron_patriot' ],
    [ 'hulkbuster', 'hulkbuster' ],
    [ 'kang', 'kang' ],
    [ 'rocket', 'rocket' ],
    [ 'starlord', 'star_lord' ],
    [ 'vision', 'vision' ],
    [ 'thevision', 'the_vision' ],
    [ 'ultron', 'ultron' ],
    [ 'warmachine', 'warmachine' ],
    [ 'colossus', 'colossus' ],
    [ 'cyclops', 'cyclops' ],
    [ 'cyclops90s', 'cyclops90' ],
    [ 'deadpool', 'deadpool' ],
    [ 'deadpoolxforce', 'deadpool_x' ],
    [ 'magneto', 'magneto' ],
    [ 'magnetomarvelnow', 'magneto_white' ],
    [ 'storm', 'storm' ],
    [ 'wolverine', 'wolverine' ],
    [ 'wolverineoldman', 'oldman_logan' ],
    [ 'x23', 'wolverine_x23' ],
    [ 'agentvenom', 'agent_venom' ],
    [ 'blackpanther', 'black_panther' ],
    [ 'blackwidow', 'black_widow' ],
    [ 'daredevil', 'daredevil' ],
    [ 'daredevilnetflix', 'daredevil_netflix' ],
    [ 'elektra', 'elektra' ],
    [ 'hawkeye', 'hawkeye' ],
    [ 'moonknight', 'moonknight' ],
    [ 'punisher', 'punisher' ],
    [ 'redskull', 'red_skull' ],
    [ 'wintersoldier', 'wintersoldier' ],
    [ 'abomination', 'abomination' ],
    [ 'antman', 'antman' ],
    [ 'captainamerica', 'cap_america' ],
    [ 'captainamericawwii', 'cap_america_wwii' ],
    [ 'electro', 'electro' ],
    [ 'hulk', 'hulk' ],
    [ 'joefixit', 'joe_fixit' ],
    [ 'lukecage', 'luke_cage' ],
    [ 'redhulk', 'red_hulk' ],
    [ 'rhino', 'rhino' ],
    [ 'shehulk', 'she_hulk' ],
    [ 'spidergwen', 'spidergwen' ],
    [ 'spiderman', 'spiderman' ],
    [ 'spidermanmorales', 'spiderman_morales' ],
    [ 'yellowjacket', 'yellowjacket' ],
    [ 'drstrange', 'dr_strange' ],
    [ 'drstrangemarvelnow', 'dr_strange_mn' ],
    [ 'guillotine', 'guillotine' ],
    [ 'ironfist', 'iron_fist' ],
    [ 'ironfistwhite', 'iron_fist_white' ],
    [ 'juggernaut', 'juggernaut' ],
    [ 'magik', 'magik' ],
    [ 'scarletwitch', 'scarlet_witch' ],
    [ 'thorjanefoster', 'thor_jane_foster' ],
    [ 'unstoppablecolossus', 'u_colossus' ],
    [ 'maestro', 'maestro' ],
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

const PLACEHOLDER = new Champion({ uid: null, stars: 0 });

export default champions;
export { idMap, uids, uidsByType, roleImage };
export { UNRELEASED_CHAMPIONS, PLACEHOLDER, FROGSPAWN_TO_CHAMPIONS, CHAMPIONS_TO_FROGSPAWN };
