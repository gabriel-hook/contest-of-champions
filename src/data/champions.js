import Champion from './model/Champion';

const UNRELEASED_CHAMPIONS = {
    'redskull': true,
    'maestro': true,
    'shehulk': true,
    'wolverineoldman': true,
    'venompool': true,
    'drstrangemarvelnow': true,
};

const champions = [

    { uid:'blackbolt', typeId:'cosmic', stars: 2 },
    { uid:'blackbolt', typeId:'cosmic', stars: 3 },
    { uid:'blackbolt', typeId:'cosmic', stars: 4 },

    { uid:'captainmarvel', typeId:'cosmic', stars: 3 },
    { uid:'captainmarvel', typeId:'cosmic', stars: 4 },
    { uid:'captainmarvel', typeId:'cosmic', stars: 5 },

    { uid:'drax', typeId:'cosmic', stars: 2 },
    { uid:'drax', typeId:'cosmic', stars: 3 },
    { uid:'drax', typeId:'cosmic', stars: 4 },

    { uid:'gamora', typeId:'cosmic', stars: 1 },
    { uid:'gamora', typeId:'cosmic', stars: 2 },
    { uid:'gamora', typeId:'cosmic', stars: 3 },
    { uid:'gamora', typeId:'cosmic', stars: 4 },

    { uid:'groot', typeId: 'cosmic', stars: 3 },
    { uid:'groot', typeId: 'cosmic', stars: 4 },
    { uid:'groot', typeId: 'cosmic', stars: 5 },

    { uid:'msmarvel', typeId:'cosmic', stars: 3 },
    { uid:'msmarvel', typeId:'cosmic', stars: 4 },

    { uid:'ronan', typeId:'cosmic', stars: 2 },
    { uid:'ronan', typeId:'cosmic', stars: 3 },
    { uid:'ronan', typeId:'cosmic', stars: 4 },
    { uid:'ronan', typeId:'cosmic', stars: 5 },

    { uid:'spidermanblack', typeId:'cosmic', stars: 3 },
    { uid:'spidermanblack', typeId:'cosmic', stars: 4 },

    { uid:'superiorironman', typeId:'cosmic', stars: 2 },
    { uid:'superiorironman', typeId:'cosmic', stars: 3 },
    { uid:'superiorironman', typeId:'cosmic', stars: 4 },

    { uid:'thor', typeId:'cosmic', stars: 2 },
    { uid:'thor', typeId:'cosmic', stars: 3 },
    { uid:'thor', typeId:'cosmic', stars: 4 },

    { uid:'venom', typeId:'cosmic', stars: 3 },
    { uid:'venom', typeId:'cosmic', stars: 4 },
    { uid:'venom', typeId:'cosmic', stars: 5 },

    { uid:'venompool', typeId:'cosmic', stars: 3 },
    { uid:'venompool', typeId:'cosmic', stars: 4 },

    { uid:'ironman', typeId:'tech', stars: 1 },
    { uid:'ironman', typeId:'tech', stars: 2 },
    { uid:'ironman', typeId:'tech', stars: 3 },
    { uid:'ironman', typeId:'tech', stars: 4 },
    { uid:'ironman', typeId:'tech', stars: 5 },

    { uid:'ironpatriot', typeId:'tech', stars: 3 },
    { uid:'ironpatriot', typeId:'tech', stars: 4 },

    { uid:'hulkbuster', typeId:'tech', stars: 2 },
    { uid:'hulkbuster', typeId:'tech', stars: 3 },
    { uid:'hulkbuster', typeId:'tech', stars: 4 },

    { uid:'kang', typeId:'tech', stars: 4 },

    { uid:'rocket', typeId:'tech', stars: 2 },
    { uid:'rocket', typeId:'tech', stars: 3 },
    { uid:'rocket', typeId:'tech', stars: 4 },

    { uid:'starlord', typeId:'tech', stars: 2 },
    { uid:'starlord', typeId:'tech', stars: 3 },
    { uid:'starlord', typeId:'tech', stars: 4 },
    { uid:'starlord', typeId:'tech', stars: 5 },

    { uid:'vision', typeId:'tech', stars: 1 },
    { uid:'vision', typeId:'tech', stars: 2 },
    { uid:'vision', typeId:'tech', stars: 3 },
    { uid:'vision', typeId:'tech', stars: 4 },

    { uid:'thevision', typeId:'tech', stars: 2 },
    { uid:'thevision', typeId:'tech', stars: 3 },
    { uid:'thevision', typeId:'tech', stars: 4 },

    { uid:'ultron', typeId:'tech', stars: 2 },
    { uid:'ultron', typeId:'tech', stars: 3 },
    { uid:'ultron', typeId:'tech', stars: 4 },

    { uid:'warmachine', typeId:'tech', stars: 3 },
    { uid:'warmachine', typeId:'tech', stars: 4 },

    { uid:'colossus', typeId:'mutant', stars: 1 },
    { uid:'colossus', typeId:'mutant', stars: 2 },
    { uid:'colossus', typeId:'mutant', stars: 3 },
    { uid:'colossus', typeId:'mutant', stars: 4 },

    { uid:'cyclops', typeId:'mutant', stars: 2 },
    { uid:'cyclops', typeId:'mutant', stars: 3 },
    { uid:'cyclops', typeId:'mutant', stars: 4 },
    { uid:'cyclops', typeId:'mutant', stars: 5 },

    { uid:'cyclops90s', typeId:'mutant', stars: 3 },
    { uid:'cyclops90s', typeId:'mutant', stars: 4 },
    { uid:'cyclops90s', typeId:'mutant', stars: 5 },

    { uid:'deadpool', typeId:'mutant', stars: 2 },
    { uid:'deadpool', typeId:'mutant', stars: 3 },
    { uid:'deadpool', typeId:'mutant', stars: 4 },

    { uid:'deadpoolxforce', typeId:'mutant', stars: 3 },
    { uid:'deadpoolxforce', typeId:'mutant', stars: 4 },

    { uid:'magneto', typeId:'mutant', stars: 2 },
    { uid:'magneto', typeId:'mutant', stars: 3 },
    { uid:'magneto', typeId:'mutant', stars: 4 },

    { uid:'magnetomarvelnow', typeId:'mutant', stars: 3 },
    { uid:'magnetomarvelnow', typeId:'mutant', stars: 4 },

    { uid:'storm', typeId:'mutant', stars: 2 },
    { uid:'storm', typeId:'mutant', stars: 3 },
    { uid:'storm', typeId:'mutant', stars: 4 },
    { uid:'storm', typeId:'mutant', stars: 5 },

    { uid:'wolverine', typeId:'mutant', stars: 1 },
    { uid:'wolverine', typeId:'mutant', stars: 2 },
    { uid:'wolverine', typeId:'mutant', stars: 3 },
    { uid:'wolverine', typeId:'mutant', stars: 4 },

    { uid:'wolverineoldman', typeId:'mutant', stars: 3 },
    { uid:'wolverineoldman', typeId:'mutant', stars: 4 },

    { uid:'blackpanther', typeId:'skill', stars: 1 },
    { uid:'blackpanther', typeId:'skill', stars: 2 },
    { uid:'blackpanther', typeId:'skill', stars: 3 },
    { uid:'blackpanther', typeId:'skill', stars: 4 },
    { uid:'blackpanther', typeId:'skill', stars: 5 },

    { uid:'blackwidow', typeId:'skill', stars: 2 },
    { uid:'blackwidow', typeId:'skill', stars: 3 },
    { uid:'blackwidow', typeId:'skill', stars: 4 },

    { uid:'daredevil', typeId:'skill', stars: 3 },
    { uid:'daredevil', typeId:'skill', stars: 4 },

    { uid:'daredevilnetflix', typeId:'skill', stars: 2 },
    { uid:'daredevilnetflix', typeId:'skill', stars: 3 },
    { uid:'daredevilnetflix', typeId:'skill', stars: 4 },
    { uid:'daredevilnetflix', typeId:'skill', stars: 5 },

    { uid:'elektra', typeId:'skill', stars: 3 },
    { uid:'elektra', typeId:'skill', stars: 4 },

    { uid:'hawkeye', typeId:'skill', stars: 1 },
    { uid:'hawkeye', typeId:'skill', stars: 2 },
    { uid:'hawkeye', typeId:'skill', stars: 3 },
    { uid:'hawkeye', typeId:'skill', stars: 4 },

    { uid:'moonknight', typeId:'skill', stars: 3 },
    { uid:'moonknight', typeId:'skill', stars: 4 },

    { uid:'punisher', typeId:'skill', stars: 2 },
    { uid:'punisher', typeId:'skill', stars: 3 },
    { uid:'punisher', typeId:'skill', stars: 4 },

    { uid:'redskull', typeId:'skill', stars: 3 },
    { uid:'redskull', typeId:'skill', stars: 4 },
    { uid:'redskull', typeId:'skill', stars: 5 },

    { uid:'wintersoldier', typeId:'skill', stars: 2 },
    { uid:'wintersoldier', typeId:'skill', stars: 3 },
    { uid:'wintersoldier', typeId:'skill', stars: 4 },
    { uid:'wintersoldier', typeId:'skill', stars: 5 },

    { uid:'abomination', typeId:'science', stars: 2 },
    { uid:'abomination', typeId:'science', stars: 3 },
    { uid:'abomination', typeId:'science', stars: 4 },

    { uid:'antman', typeId:'science', stars: 2 },
    { uid:'antman', typeId:'science', stars: 3 },
    { uid:'antman', typeId:'science', stars: 4 },

    { uid:'captainamerica', typeId:'science', stars: 2 },
    { uid:'captainamerica', typeId:'science', stars: 3 },
    { uid:'captainamerica', typeId:'science', stars: 4 },

    { uid:'captainamericawwii', typeId:'science', stars: 3 },
    { uid:'captainamericawwii', typeId:'science', stars: 4 },

    { uid:'electro', typeId:'science', stars: 3 },
    { uid:'electro', typeId:'science', stars: 4 },

    { uid:'hulk', typeId:'science', stars: 1 },
    { uid:'hulk', typeId:'science', stars: 2 },
    { uid:'hulk', typeId:'science', stars: 3 },
    { uid:'hulk', typeId:'science', stars: 4 },

    { uid:'joefixit', typeId:'science', stars: 3 },
    { uid:'joefixit', typeId:'science', stars: 4 },

    { uid:'lukecage', typeId:'science', stars: 3 },
    { uid:'lukecage', typeId:'science', stars: 4 },
    { uid:'lukecage', typeId:'science', stars: 5 },

    { uid:'rhino', typeId:'science', stars: 2 },
    { uid:'rhino', typeId:'science', stars: 3 },
    { uid:'rhino', typeId:'science', stars: 4 },
    { uid:'rhino', typeId:'science', stars: 5 },

    { uid:'shehulk', typeId:'science', stars: 3 },
    { uid:'shehulk', typeId:'science', stars: 4 },

    { uid:'spidergwen', typeId:'science', stars: 3 },
    { uid:'spidergwen', typeId:'science', stars: 4 },

    { uid:'spiderman', typeId:'science', stars: 1 },
    { uid:'spiderman', typeId:'science', stars: 2 },
    { uid:'spiderman', typeId:'science', stars: 3 },
    { uid:'spiderman', typeId:'science', stars: 4 },
    { uid:'spiderman', typeId:'science', stars: 5 },

    { uid:'spidermanmorales', typeId:'science', stars: 3 },
    { uid:'spidermanmorales', typeId:'science', stars: 4 },

    { uid:'yellowjacket', typeId:'science', stars: 2 },
    { uid:'yellowjacket', typeId:'science', stars: 3 },
    { uid:'yellowjacket', typeId:'science', stars: 4 },

    { uid:'drstrange', typeId:'mystic', stars: 3 },
    { uid:'drstrange', typeId:'mystic', stars: 4 },

    { uid:'drstrangemarvelnow', typeId:'mystic', stars: 3 },
    { uid:'drstrangemarvelnow', typeId:'mystic', stars: 4 },
    { uid:'drstrangemarvelnow', typeId:'mystic', stars: 5 },

    { uid:'guillotine', typeId:'mystic', stars: 2 },
    { uid:'guillotine', typeId:'mystic', stars: 3 },
    { uid:'guillotine', typeId:'mystic', stars: 4 },

    { uid:'ironfist', typeId:'mystic', stars: 2 },
    { uid:'ironfist', typeId:'mystic', stars: 3 },
    { uid:'ironfist', typeId:'mystic', stars: 4 },

    { uid:'juggernaut', typeId:'mystic', stars: 1 },
    { uid:'juggernaut', typeId:'mystic', stars: 2 },
    { uid:'juggernaut', typeId:'mystic', stars: 3 },
    { uid:'juggernaut', typeId:'mystic', stars: 4 },
    { uid:'juggernaut', typeId:'mystic', stars: 5 },

    { uid:'magik', typeId:'mystic', stars: 2 },
    { uid:'magik', typeId:'mystic', stars: 3 },
    { uid:'magik', typeId:'mystic', stars: 4 },
    { uid:'magik', typeId:'mystic', stars: 5 },

    { uid:'scarletwitch', typeId:'mystic', stars: 1 },
    { uid:'scarletwitch', typeId:'mystic', stars: 2 },
    { uid:'scarletwitch', typeId:'mystic', stars: 3 },
    { uid:'scarletwitch', typeId:'mystic', stars: 4 },

    { uid:'thorjanefoster', typeId:'mystic', stars: 3 },
    { uid:'thorjanefoster', typeId:'mystic', stars: 4 },
    { uid:'thorjanefoster', typeId:'mystic', stars: 5 },

    { uid:'unstoppablecolossus', typeId:'mystic', stars: 2 },
    { uid:'unstoppablecolossus', typeId:'mystic', stars: 3 },
    { uid:'unstoppablecolossus', typeId:'mystic', stars: 4 },

    { uid:'maestro', stars: 3 },
    { uid:'maestro', stars: 4 },
    { uid:'maestro', stars: 5 },

].map((champion) => new Champion(champion));

const uids = [ ...new Set(champions.map((champion) => champion.attr.uid)) ];
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
export { UNRELEASED_CHAMPIONS };
