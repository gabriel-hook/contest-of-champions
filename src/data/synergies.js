import Synergy from './model/Synergy';

const EFFECT_STARS_AMOUNT = {
    attack: [ 4, 5, 6 ],
    idol: [ 3, 4, 5 ],
    inseparable: [ 7, 8, 9 ],
    mutantagenda: [ 8, 10, 12 ],
    critrate: [ 5, 6, 7 ],
    critdamage: [ 15, 20, 25 ],
    bleed: [ 15, 20, 25 ],
    stunactivation: [ 5, 10, 15 ],
    stunspecial: [ 15, 20, 25 ],
    powergain: [ 3, 4, 5 ],
    perfectblock: [ 3, 4, 5 ],
    block: [ 10, 15, 20 ],
    armor: [ 5, 6, 7 ],
    health: [ 4, 5, 6 ],
    heroesforhire: [ 3, 4, 5 ],
    thunderbolts: [ 4, 5, 6 ],
};
const EFFECT_STARS_INDEX = { 1: 0, 2: 0, 3: 1, 4: 2, 5: 3 };

const synergies = [

    ...fromId('blackbolt', [
        ...fromStars(2, [
            { toId: 'cyclops', effectId: 'block' },
        ]),
        ...fromStars(3, [
            { toId: 'cyclops', effectId: 'block' },
            { toId: 'spiderman', effectId: 'armor' },
            { toId: 'ronan', effectId: 'attack' },
            { toId: 'hulk', effectId: 'critdamage' },
        ]),
        ...fromStars(4, [
            { toId: 'cyclops', effectId: 'block' },
            { toId: 'spiderman', effectId: 'armor' },
            { toId: 'ronan', effectId: 'attack' },
            { toId: 'hulk', effectId: 'critdamage' },
        ]),
    ]),

    ...fromId('captainmarvel', [
        ...fromStars(3, [
            { toId: 'captainamerica', effectId: 'armor' },
            { toId: 'gamora', effectId: 'armor' },
            { toId: 'ironman', effectId: 'armor' },
        ]),
        ...fromStars(4, [
            { toId: 'captainamerica', effectId: 'armor' },
            { toId: 'gamora', effectId: 'armor' },
            { toId: 'ironman', effectId: 'armor' },
            { toId: 'wolverine', effectId: 'powergain' },
        ]),
        ...fromStars(5, [
            { toId: 'captainamerica', effectId: 'armor' },
            { toId: 'gamora', effectId: 'armor' },
            { toId: 'ironman', effectId: 'armor' },
            { toId: 'wolverine', effectId: 'powergain' },
        ]),
    ]),

    ...fromId('drax', [
        ...fromStars(2, [
            { toId: 'starlord', effectId: 'perfectblock' },
            { toId: 'gamora', effectId: 'critdamage' },
        ]),
        ...fromStars(3, [
            { toId: 'starlord', effectId: 'perfectblock' },
            { toId: 'gamora', effectId: 'critdamage' },
        ]),
        ...fromStars(4, [
            { toId: 'starlord', effectId: 'perfectblock' },
            { toId: 'gamora', effectId: 'critdamage' },
        ]),
        ...fromStars(5, [
            { toId: 'starlord', effectId: 'perfectblock' },
            { toId: 'gamora', effectId: 'critdamage' },
        ]),
    ]),

    ...fromId('gamora', [
        ...fromStars(2, [
            { toId: 'starlord', effectId: 'armor' },
        ]),
        ...fromStars(3, [
            { toId: 'starlord', effectId: 'armor' },
            { toId: 'drax', effectId: 'critdamage' },
        ]),
        ...fromStars(4, [
            { toId: 'starlord', effectId: 'armor' },
            { toId: 'drax', effectId: 'critdamage' },
        ]),
    ]),

    ...fromId('groot', [
        ...fromStars(3, [
            { toId: 'starlord', effectId: 'armor' },
            { toId: 'drax', effectId: 'perfectblock' },
            { toId: 'rocket', effectId: 'inseparable' },
        ]),
        ...fromStars(4, [
            { toId: 'starlord', effectId: 'armor' },
            { toId: 'drax', effectId: 'perfectblock' },
            { toId: 'rocket', effectId: 'inseparable' },
        ]),
        ...fromStars(5, [
            { toId: 'starlord', effectId: 'armor' },
            { toId: 'drax', effectId: 'perfectblock' },
            { toId: 'rocket', effectId: 'inseparable' },
        ]),
    ]),

    ...fromId('kamalakhan', [
        ...fromStars(3, [
            { toId: 'captainmarvel', effectId: 'idol' },
            { toId: 'msmarvel', effectId: 'idol' },
            { toId: 'spidermanmorales', effectId: 'perfectblock' },
        ]),
        ...fromStars(4, [
            { toId: 'captainmarvel', effectId: 'idol' },
            { toId: 'msmarvel', effectId: 'idol' },
            { toId: 'spidermanmorales', effectId: 'perfectblock' },
            { toId: 'vision', effectId: 'perfectblock' },
        ]),
        ...fromStars(5, [
            { toId: 'captainmarvel', effectId: 'idol' },
            { toId: 'msmarvel', effectId: 'idol' },
            { toId: 'spidermanmorales', effectId: 'perfectblock' },
            { toId: 'vision', effectId: 'perfectblock' },
        ]),
    ]),

    ...fromId('msmarvel', [
        ...fromStars(3, [
            { toId: 'captainamerica', effectId: 'armor' },
            { toId: 'ironman', effectId: 'perfectblock' },
            { toId: 'thor', effectId: 'perfectblock' },
            { toId: 'hulk', effectId: 'perfectblock' },
        ]),
        ...fromStars(4, [
            { toId: 'captainamerica', effectId: 'armor' },
            { toId: 'ironman', effectId: 'perfectblock' },
            { toId: 'thor', effectId: 'perfectblock' },
            { toId: 'hulk', effectId: 'perfectblock' },
        ]),
    ]),

    ...fromId('ronan', [
        ...fromStars(2, [
            { toId: 'blackbolt', effectId: 'critdamage' },
        ]),
        ...fromStars(3, [
            { toId: 'blackbolt', effectId: 'critdamage' },
            { toId: 'ironman', effectId: 'critrate' },
            { toId: 'gamora', effectId: 'critdamage' },
        ]),
        ...fromStars(4, [
            { toId: 'blackbolt', effectId: 'critdamage' },
            { toId: 'ironman', effectId: 'critrate' },
            { toId: 'gamora', effectId: 'critdamage' },
            { toId: 'hulk', effectId: 'critrate' },
        ]),
        ...fromStars(5, [
            { toId: 'blackbolt', effectId: 'critdamage' },
            { toId: 'ironman', effectId: 'critrate' },
            { toId: 'gamora', effectId: 'critdamage' },
            { toId: 'hulk', effectId: 'critrate' },
        ]),
    ]),

    ...fromId('spidermanblack', [
        ...fromStars(3, [
            { toId: 'storm', effectId: 'armor' },
            { toId: 'electro', effectId: 'critrate' },
        ]),
        ...fromStars(4, [
            { toId: 'storm', effectId: 'armor' },
            { toId: 'electro', effectId: 'critrate' },
        ]),
    ]),

    ...fromId('superiorironman', [
        ...fromStars(2, [
            { toId: 'captainamerica', effectId: 'critrate' },
            { toId: 'daredevil', effectId: 'critdamage' },
            { toId: 'thor', effectId: 'perfectblock' },
        ]),
        ...fromStars(3, [
            { toId: 'captainamerica', effectId: 'critrate' },
            { toId: 'daredevil', effectId: 'critdamage' },
            { toId: 'thor', effectId: 'perfectblock' },
        ]),
        ...fromStars(4, [
            { toId: 'captainamerica', effectId: 'critrate' },
            { toId: 'daredevil', effectId: 'critdamage' },
            { toId: 'thor', effectId: 'perfectblock' },
        ]),
    ]),

    ...fromId('thor', [
        ...fromStars(2, [
            { toId: 'drstrange', effectId: 'armor' },
            { toId: 'ironman', effectId: 'armor' },
        ]),
        ...fromStars(3, [
            { toId: 'drstrange', effectId: 'armor' },
            { toId: 'ironman', effectId: 'armor' },
            { toId: 'juggernaut', effectId: 'critrate' },
        ]),
        ...fromStars(4, [
            { toId: 'drstrange', effectId: 'armor' },
            { toId: 'ironman', effectId: 'armor' },
            { toId: 'juggernaut', effectId: 'critrate' },
        ]),
    ]),

    ...fromId('venom', [
        ...fromStars(3, [
            { toId: 'spiderman', effectId: 'attack' },
            { toId: 'spidermanblack', effectId: 'health' },
            { toId: 'electro', effectId: 'critdamage' },
        ]),
        ...fromStars(4, [
            { toId: 'spiderman', effectId: 'attack' },
            { toId: 'spidermanblack', effectId: 'health' },
            { toId: 'electro', effectId: 'critdamage' },
        ]),
        ...fromStars(5, [
            { toId: 'spiderman', effectId: 'attack' },
            { toId: 'spidermanblack', effectId: 'health' },
            { toId: 'electro', effectId: 'critdamage' },
        ]),
    ]),

    ...fromId('venompool', [
        ...fromStars(3, [
            { toId: 'venom', effectId: 'inseparable' },
            { toId: 'deadpool', effectId: 'armor' },
            { toId: 'deadpoolxforce', effectId: 'armor' },
        ]),
        ...fromStars(4, [
            { toId: 'venom', effectId: 'inseparable' },
            { toId: 'deadpool', effectId: 'armor' },
            { toId: 'deadpoolxforce', effectId: 'armor' },
        ]),
        ...fromStars(5, [
            { toId: 'venom', effectId: 'inseparable' },
            { toId: 'deadpool', effectId: 'armor' },
            { toId: 'deadpoolxforce', effectId: 'armor' },
        ]),
    ]),

    ...fromId('civilwarrior', [
        ...fromStars(3, [
            { toId: 'wintersoldier', effectId: 'armor' },
            { toId: 'falcon', effectId: 'armor' },
            { toId: 'guillotine', effectId: 'perfectblock' },
            ...toIds([ 'ironman', 'hulkbuster' ], { effectId: 'critdamage' }),
        ]),
        ...fromStars(4, [
            { toId: 'wintersoldier', effectId: 'armor' },
            { toId: 'falcon', effectId: 'armor' },
            { toId: 'guillotine', effectId: 'perfectblock' },
            ...toIds([ 'ironman', 'hulkbuster' ], { effectId: 'critdamage' }),
        ]),
        ...fromStars(5, [
            { toId: 'wintersoldier', effectId: 'armor' },
            { toId: 'falcon', effectId: 'armor' },
            { toId: 'guillotine', effectId: 'perfectblock' },
            ...toIds([ 'ironman', 'hulkbuster' ], { effectId: 'critdamage' }),
        ]),
    ]),

    ...fromId('ironman', [
        ...fromStars(2, [
            { toId: 'thor', effectId: 'perfectblock' },
        ]),
        ...fromStars(3, [
            { toId: 'captainamerica', effectId: 'armor' },
            { toId: 'thor', effectId: 'perfectblock' },
        ]),
        ...fromStars(4, [
            { toId: 'captainamerica', effectId: 'armor' },
            { toId: 'thor', effectId: 'perfectblock' },
        ]),
        ...fromStars(5, [
            { toId: 'captainamerica', effectId: 'armor' },
            { toId: 'thor', effectId: 'perfectblock' },
        ]),
    ]),

    ...fromId('ironpatriot', [
        ...fromStars(3, [
            { toId: 'ironman', effectId: 'armor' },
            { toId: 'spiderman', effectId: 'critrate' },
            { toId: 'captainamerica', effectId: 'critdamage' },
        ]),
        ...fromStars(4, [
            { toId: 'ironman', effectId: 'armor' },
            { toId: 'spiderman', effectId: 'critrate' },
            { toId: 'captainamerica', effectId: 'critdamage' },
        ]),
        ...fromStars(5, [
            { toId: 'ironman', effectId: 'armor' },
            { toId: 'spiderman', effectId: 'critrate' },
            { toId: 'captainamerica', effectId: 'critdamage' },
        ]),
    ]),

    ...fromId('kang', [
        ...fromStars(4, [
            { toId: 'blackbolt', effectId: 'armor' },
            { toId: 'thevision', effectId: 'critrate' },
            { toId: 'thor', effectId: 'critrate' },
        ]),
    ]),

    ...fromId('hulkbuster', [
        ...fromStars(2, [
            { toId: 'hulk', effectId: 'critdamage' },
            { toId: 'hulk', effectId: 'critdamage' },
            { toId: 'ironman', effectId: 'health' },
            { toId: 'superiorironman', effectId: 'health' },
        ]),
        ...fromStars(4, [
            { toId: 'hulk', effectId: 'critdamage' },
            { toId: 'ironman', effectId: 'health' },
            { toId: 'superiorironman', effectId: 'health' },
        ]),
    ]),

    ...fromId('rocket', [
        ...fromStars(2, [
            { toId: 'starlord', effectId: 'armor' },
            { toId: 'gamora', effectId: 'perfectblock' },
        ]),
        ...fromStars(3, [
            { toId: 'starlord', effectId: 'armor' },
            { toId: 'ronan', effectId: 'critrate' },
            { toId: 'gamora', effectId: 'perfectblock' },
            { toId: 'drax', effectId: 'perfectblock' },
        ]),
        ...fromStars(4, [
            { toId: 'starlord', effectId: 'armor' },
            { toId: 'ronan', effectId: 'critrate' },
            { toId: 'gamora', effectId: 'perfectblock' },
            { toId: 'drax', effectId: 'perfectblock' },
        ]),
    ]),

    ...fromId('starlord', [
        ...fromStars(2, [
            { toId: 'rocket', effectId: 'armor' },
            { toId: 'drax', effectId: 'perfectblock' },
        ]),
        ...fromStars(3, [
            { toId: 'rocket', effectId: 'armor' },
            { toId: 'drax', effectId: 'perfectblock' },
            { toId: 'gamora', effectId: 'perfectblock' },
        ]),
        ...fromStars(4, [
            { toId: 'rocket', effectId: 'armor' },
            { toId: 'drax', effectId: 'perfectblock' },
            { toId: 'gamora', effectId: 'perfectblock' },
        ]),
        ...fromStars(5, [
            { toId: 'rocket', effectId: 'armor' },
            { toId: 'drax', effectId: 'perfectblock' },
            { toId: 'gamora', effectId: 'perfectblock' },
        ]),
    ]),

    ...fromId('vision', [
        ...fromStars(2, [
            { toId: 'scarletwitch', effectId: 'powergain' },
            { toId: 'ironman', effectId: 'perfectblock' },
        ]),
        ...fromStars(3, [
            { toId: 'scarletwitch', effectId: 'powergain' },
            { toId: 'ironman', effectId: 'perfectblock' },
            { toId: 'magneto', effectId: 'critrate' },
        ]),
        ...fromStars(4, [
            { toId: 'scarletwitch', effectId: 'powergain' },
            { toId: 'ironman', effectId: 'perfectblock' },
            { toId: 'magneto', effectId: 'critrate' },
        ]),
    ]),

    ...fromId('thevision', [
        ...fromStars(2, [
            { toId: 'ironman', effectId: 'health' },
            { toId: 'scarletwitch', effectId: 'perfectblock' },
        ]),
        ...fromStars(3, [
            { toId: 'ironman', effectId: 'health' },
            { toId: 'scarletwitch', effectId: 'perfectblock' },
            { toId: 'ultron', effectId: 'attack' },
        ]),
        ...fromStars(4, [
            { toId: 'ironman', effectId: 'health' },
            { toId: 'scarletwitch', effectId: 'perfectblock' },
            { toId: 'ultron', effectId: 'attack' },
        ]),
    ]),

    ...fromId('ultron', [
        ...fromStars(2, [
            { toId: 'ironman', effectId: 'health' },
            { toId: 'scarletwitch', effectId: 'armor' },
        ]),
        ...fromStars(3, [
            { toId: 'ironman', effectId: 'health' },
            { toId: 'scarletwitch', effectId: 'armor' },
        ]),
        ...fromStars(4, [
            { toId: 'ironman', effectId: 'health' },
            { toId: 'scarletwitch', effectId: 'armor' },
        ]),
    ]),

    ...fromId('warmachine', [
        ...fromStars(2, [
            { toId: 'hulkbuster', effectId: 'armor' },
        ]),
        ...fromStars(3, [
            { toId: 'hulkbuster', effectId: 'armor' },
            { toId: 'hawkeye', effectId: 'block' },
            { toId: 'blackwidow', effectId: 'perfectblock' },
        ]),
        ...fromStars(4, [
            { toId: 'hulkbuster', effectId: 'armor' },
            { toId: 'blackpanther', effectId: 'critrate' },
            { toId: 'hawkeye', effectId: 'block' },
            { toId: 'blackwidow', effectId: 'perfectblock' },
        ]),
    ]),

    ...fromId('colossus', [
        ...fromStars(2, [
            { toId: 'juggernaut', effectId: 'critrate' },
        ]),
        ...fromStars(3, [
            { toId: 'juggernaut', effectId: 'critrate' },
            { toId: 'wolverine', effectId: 'armor' },
            { toId: 'magik', effectId: 'health' },
        ]),
        ...fromStars(4, [
            { toId: 'juggernaut', effectId: 'critrate' },
            { toId: 'wolverine', effectId: 'armor' },
            { toId: 'magik', effectId: 'health' },
        ]),
    ]),

    ...fromId('cyclops', [
        ...fromStars(2, [
            { toId: 'wolverine', effectId: 'critdamage' },
            ...toIds([ 'storm', 'colossus' ], { effectId: 'mutantagenda' }),
        ]),
        ...fromStars(3, [
            { toId: 'wolverine', effectId: 'critdamage' },
            { toId: 'magneto', effectId: 'attack' },
            ...toIds([ 'storm', 'colossus' ], { effectId: 'mutantagenda' }),
        ]),
        ...fromStars(4, [
            { toId: 'wolverine', effectId: 'critdamage' },
            { toId: 'magneto', effectId: 'attack' },
            ...toIds([ 'storm', 'colossus' ], { effectId: 'mutantagenda' }),
        ]),
        ...fromStars(5, [
            { toId: 'wolverine', effectId: 'critdamage' },
            { toId: 'magneto', effectId: 'attack' },
            ...toIds([ 'storm', 'colossus' ], { effectId: 'mutantagenda' }),
        ]),
    ]),

    ...fromId('cyclops90s', [
        ...fromStars(3, [
            { toId: 'magneto', effectId: 'attack' },
            { toId: 'storm', effectId: 'block' },
            ...toIds([ 'colossus', 'wolverine' ], { effectId: 'mutantagenda' }),
        ]),
        ...fromStars(4, [
            { toId: 'magneto', effectId: 'attack' },
            { toId: 'storm', effectId: 'block' },
            ...toIds([ 'colossus', 'wolverine' ], { effectId: 'mutantagenda' }),
        ]),
        ...fromStars(5, [
            { toId: 'magneto', effectId: 'attack' },
            { toId: 'storm', effectId: 'block' },
            ...toIds([ 'colossus', 'wolverine' ], { effectId: 'mutantagenda' }),
        ]),
    ]),

    ...fromId('deadpool', [
        ...fromStars(2, [
            { toId: 'punisher', effectId: 'perfectblock' },
        ]),
        ...fromStars(3, [
            { toId: 'rhino', effectId: 'critrate' },
            { toId: 'wolverine', effectId: 'health' },
            { toId: 'punisher', effectId: 'perfectblock' },
        ]),
        ...fromStars(4, [
            { toId: 'rhino', effectId: 'critrate' },
            { toId: 'wolverine', effectId: 'health' },
            { toId: 'punisher', effectId: 'perfectblock' },
        ]),
    ]),

    ...fromId('deadpoolxforce', [
        ...fromStars(2, [
            { toId: 'moonknight', effectId: 'critdamage' },
        ]),
        ...fromStars(3, [
            { toId: 'moonknight', effectId: 'critdamage' },
            { toId: 'deadpool', effectId: 'critdamage' },
        ]),
        ...fromStars(4, [
            { toId: 'magnetomarvelnow', effectId: 'armor' },
            { toId: 'moonknight', effectId: 'critdamage' },
            { toId: 'deadpool', effectId: 'critdamage' },
        ]),
    ]),

    ...fromId('magneto', [
        ...fromStars(2, [
            { toId: 'cyclops', effectId: 'block' },
        ]),
        ...fromStars(3, [
            { toId: 'wolverine', effectId: 'critrate' },
            { toId: 'cyclops', effectId: 'block' },
            { toId: 'storm', effectId: 'critdamage' },
        ]),
        ...fromStars(4, [
            { toId: 'wolverine', effectId: 'critrate' },
            { toId: 'cyclops', effectId: 'block' },
            { toId: 'storm', effectId: 'critdamage' },
        ]),
        ...fromStars(5, [
            { toId: 'wolverine', effectId: 'critrate' },
            { toId: 'cyclops', effectId: 'block' },
            { toId: 'storm', effectId: 'critdamage' },
        ]),
    ]),

    ...fromId('magnetomarvelnow', [
        ...fromStars(3, [
            { toId: 'cyclops', effectId: 'perfectblock' },
            { toId: 'magik', effectId: 'perfectblock' },
            { toId: 'wolverine', effectId: 'critdamage' },
        ]),
        ...fromStars(4, [
            { toId: 'cyclops', effectId: 'perfectblock' },
            { toId: 'magik', effectId: 'perfectblock' },
            { toId: 'wolverine', effectId: 'critdamage' },
        ]),
    ]),

    ...fromId('storm', [
        ...fromStars(2, [
            { toId: 'blackpanther', effectId: 'powergain' },
        ]),
        ...fromStars(3, [
            { toId: 'magik', effectId: 'armor' },
            { toId: 'cyclops', effectId: 'perfectblock' },
            { toId: 'blackpanther', effectId: 'powergain' },
        ]),
        ...fromStars(4, [
            { toId: 'magik', effectId: 'armor' },
            { toId: 'cyclops', effectId: 'perfectblock' },
            { toId: 'blackpanther', effectId: 'powergain' },
            { toId: 'magneto', effectId: 'critrate' },
        ]),
        ...fromStars(5, [
            { toId: 'magik', effectId: 'armor' },
            { toId: 'cyclops', effectId: 'perfectblock' },
            { toId: 'blackpanther', effectId: 'powergain' },
            { toId: 'magneto', effectId: 'critrate' },
        ]),
    ]),

    ...fromId('wolverine', [
        ...fromStars(2, [
            { toId: 'cyclops', effectId: 'critdamage' },
        ]),
        ...fromStars(3, [
            { toId: 'cyclops', effectId: 'critdamage' },
            { toId: 'captainamerica', effectId: 'armor' },
            { toId: 'magneto', effectId: 'critrate' },
        ]),
        ...fromStars(4, [
            { toId: 'cyclops', effectId: 'critdamage' },
            { toId: 'captainamerica', effectId: 'armor' },
            { toId: 'magneto', effectId: 'critrate' },
        ]),
    ]),

    ...fromId('wolverineoldman', [
        ...fromStars(3, [
            { toId: 'wolverine', effectId: 'critrate' },
            { toId: 'hawkeye', effectId: 'armor' },
        ]),
        ...fromStars(4, [
            { toId: 'wolverine', effectId: 'critrate' },
            { toId: 'hawkeye', effectId: 'armor' },
            { toId: 'hulk', effectId: 'attack' },
        ]),
        ...fromStars(5, [
            { toId: 'wolverine', effectId: 'critrate' },
            { toId: 'hawkeye', effectId: 'armor' },
            { toId: 'hulk', effectId: 'attack' },
        ]),
    ]),

    ...fromId('x23', [
        ...fromStars(3, [
            { toId: 'wolverine', effectId: 'health' },
            { toId: 'agentvenom', effectId: 'perfectblock' },
        ]),
        ...fromStars(4, [
            { toId: 'wolverine', effectId: 'health' },
            { toId: 'agentvenom', effectId: 'perfectblock' },
        ]),
        ...fromStars(5, [
            { toId: 'wolverine', effectId: 'health' },
            { toId: 'agentvenom', effectId: 'perfectblock' },
        ]),
    ]),

    ...fromId('agentvenom', [
        ...fromStars(3, [
            { toId: 'spiderman', effectId: 'idol' },
            { toId: 'venom', effectId: 'health' },
            { toId: 'spidermanblack', effectId: 'health' },
        ]),
        ...fromStars(4, [
            { toId: 'spiderman', effectId: 'idol' },
            { toId: 'venom', effectId: 'health' },
            { toId: 'spidermanblack', effectId: 'health' },
        ]),
        ...fromStars(5, [
            { toId: 'spiderman', effectId: 'idol' },
            { toId: 'venom', effectId: 'health' },
            { toId: 'spidermanblack', effectId: 'health' },
        ]),
    ]),

    ...fromId('blackpanther', [
        ...fromStars(2, [
            { toId: 'ironfist', effectId: 'critdamage' },
        ]),
        ...fromStars(3, [
            { toId: 'ironfist', effectId: 'critdamage' },
            { toId: 'storm', effectId: 'powergain' },
            { toId: 'deadpool', effectId: 'critrate' },
        ]),
        ...fromStars(4, [
            { toId: 'ironfist', effectId: 'critdamage' },
            { toId: 'storm', effectId: 'powergain' },
            { toId: 'deadpool', effectId: 'critrate' },
        ]),
        ...fromStars(5, [
            { toId: 'ironfist', effectId: 'critdamage' },
            { toId: 'storm', effectId: 'powergain' },
            { toId: 'deadpool', effectId: 'critrate' },
        ]),
    ]),

    ...fromId('blackpanthercivilwar', [
        ...fromStars(3, [
            ...toIds([ 'thevision', 'blackwidow' ], { effectId: 'armor' }),
            { toId: 'wintersoldier', effectId: 'attack' },
            { toId: 'antman', effectId: 'critdamage' },
            ...toIds([ 'hawkeye', 'blackpanther' ], { effectId: 'bleed' }),
        ]),
        ...fromStars(4, [
            ...toIds([ 'thevision', 'blackwidow' ], { effectId: 'armor' }),
            { toId: 'wintersoldier', effectId: 'attack' },
            { toId: 'antman', effectId: 'critdamage' },
            ...toIds([ 'hawkeye', 'blackpanther' ], { effectId: 'bleed' }),
        ]),
        ...fromStars(5, [
            ...toIds([ 'thevision', 'blackwidow' ], { effectId: 'armor' }),
            { toId: 'wintersoldier', effectId: 'attack' },
            { toId: 'antman', effectId: 'critdamage' },
            ...toIds([ 'hawkeye', 'blackpanther' ], { effectId: 'bleed' }),
        ]),
    ]),

    ...fromId('crossbones', [
        ...fromStars(3, [
            ...toIds([ 'captainamerica', 'captainamericawwii', 'falcon' ], { effectId: 'critrate' }),
            ...toIds([ 'wintersoldier', 'blackwidow' ], { effectId: 'critdamage' }),
        ]),
        ...fromStars(4, [
            ...toIds([ 'captainamerica', 'captainamericawwii', 'falcon' ], { effectId: 'critrate' }),
            ...toIds([ 'wintersoldier', 'blackwidow' ], { effectId: 'critdamage' }),
        ]),
        ...fromStars(5, [
            ...toIds([ 'captainamerica', 'captainamericawwii', 'falcon' ], { effectId: 'critrate' }),
            ...toIds([ 'wintersoldier', 'blackwidow' ], { effectId: 'critdamage' }),
        ]),
    ]),

    ...fromId('daredevil', [
        ...fromStars(3, [
            { toId: 'superiorironman', effectId: 'critdamage' },
            { toId: 'blackwidow', effectId: 'powergain' },
            { toId: 'elektra', effectId: 'powergain' },
        ]),
        ...fromStars(4, [
            { toId: 'superiorironman', effectId: 'critdamage' },
            { toId: 'blackwidow', effectId: 'powergain' },
            { toId: 'elektra', effectId: 'powergain' },
        ]),
    ]),

    ...fromId('daredevilnetflix', [
        ...fromStars(2, [
            { toId: 'elektra', effectId: 'powergain' },
            { toId: 'punisher', effectId: 'critdamage' },
        ]),
        ...fromStars(3, [
            { toId: 'elektra', effectId: 'powergain' },
            { toId: 'lukecage', effectId: 'perfectblock' },
            { toId: 'punisher', effectId: 'critdamage' },
        ]),
        ...fromStars(4, [
            { toId: 'elektra', effectId: 'powergain' },
            { toId: 'lukecage', effectId: 'perfectblock' },
            { toId: 'punisher', effectId: 'critdamage' },
        ]),
        ...fromStars(5, [
            { toId: 'elektra', effectId: 'powergain' },
            { toId: 'lukecage', effectId: 'perfectblock' },
            { toId: 'punisher', effectId: 'critdamage' },
        ]),
    ]),

    ...fromId('elektra', [
        ...fromStars(3, [
            { toId: 'wolverine', effectId: 'armor' },
            { toId: 'daredevil', effectId: 'powergain' },
            { toId: 'blackwidow', effectId: 'critdamage' },
        ]),
        ...fromStars(4, [
            { toId: 'wolverine', effectId: 'armor' },
            { toId: 'daredevil', effectId: 'powergain' },
            { toId: 'deadpool', effectId: 'perfectblock' },
            { toId: 'blackwidow', effectId: 'critdamage' },
        ]),
    ]),

    ...fromId('falcon', [
        ...fromStars(3, [
            ...toIds([ 'captainamerica', 'captainamericawwii' ], { effectId: 'armor' }),
            ...toIds([ 'warmachine', 'blackwidow' ], { effectId: 'critrate' }),
            ...toIds([ 'vision', 'blackpanthercivilwar' ], { effectId: 'critrate' }),
            ...toIds([ 'antman', 'hawkeye' ], { effectId: 'perfectblock' }),
        ]),
        ...fromStars(4, [
            ...toIds([ 'captainamerica', 'captainamericawwii' ], { effectId: 'armor' }),
            ...toIds([ 'warmachine', 'blackwidow' ], { effectId: 'critrate' }),
            ...toIds([ 'vision', 'blackpanthercivilwar' ], { effectId: 'critrate' }),
            ...toIds([ 'antman', 'hawkeye' ], { effectId: 'perfectblock' }),
        ]),
        ...fromStars(5, [
            ...toIds([ 'captainamerica', 'captainamericawwii' ], { effectId: 'armor' }),
            ...toIds([ 'warmachine', 'blackwidow' ], { effectId: 'critrate' }),
            ...toIds([ 'vision', 'blackpanthercivilwar' ], { effectId: 'critrate' }),
            ...toIds([ 'antman', 'hawkeye' ], { effectId: 'perfectblock' }),
        ]),
    ]),

    ...fromId('hawkeye', [
        ...fromStars(2, [
            { toId: 'scarletwitch', effectId: 'powergain' },
        ]),
        ...fromStars(3, [
            { toId: 'scarletwitch', effectId: 'powergain' },
            { toId: 'moonknight', effectId: 'armor' },
            { toId: 'ironman', effectId: 'armor' },
        ]),
        ...fromStars(4, [
            { toId: 'scarletwitch', effectId: 'powergain' },
            { toId: 'moonknight', effectId: 'armor' },
            { toId: 'ironman', effectId: 'armor' },
            { toId: 'hulk', effectId: 'armor' },
        ]),
        ...fromStars(5, [
            { toId: 'scarletwitch', effectId: 'powergain' },
            { toId: 'moonknight', effectId: 'armor' },
            { toId: 'ironman', effectId: 'armor' },
            { toId: 'hulk', effectId: 'armor' },
        ]),
    ]),

    ...fromId('moonknight', [
        ...fromStars(3, [
            { toId: 'spiderman', effectId: 'armor' },
            { toId: 'daredevil', effectId: 'perfectblock' },
            { toId: 'deadpoolxforce', effectId: 'critdamage' },
        ]),
        ...fromStars(4, [
            { toId: 'spiderman', effectId: 'armor' },
            { toId: 'daredevil', effectId: 'perfectblock' },
            { toId: 'deadpoolxforce', effectId: 'critdamage' },
            { toId: 'ironpatriot', effectId: 'critrate' },
        ]),
    ]),

    ...fromId('punisher', [
        ...fromStars(2, [
            { toId: 'spiderman', effectId: 'critdamage' },
        ]),
        ...fromStars(3, [
            { toId: 'spiderman', effectId: 'critdamage' },
            { toId: 'rhino', effectId: 'perfectblock' },
        ]),
        ...fromStars(4, [
            { toId: 'spiderman', effectId: 'critdamage' },
            { toId: 'rhino', effectId: 'perfectblock' },
        ]),
    ]),

    ...fromId('wintersoldier', [
        ...fromStars(2, [
            { toId: 'wolverine', effectId: 'armor' },
            { toId: 'captainamerica', effectId: 'perfectblock' },
        ]),
        ...fromStars(3, [
            { toId: 'wolverine', effectId: 'armor' },
            { toId: 'captainamerica', effectId: 'perfectblock' },
            { toId: 'captainamericawwii', effectId: 'armor' },
        ]),
        ...fromStars(4, [
            { toId: 'wolverine', effectId: 'armor' },
            { toId: 'captainamerica', effectId: 'perfectblock' },
            { toId: 'captainamericawwii', effectId: 'armor' },
        ]),
        ...fromStars(5, [
            { toId: 'wolverine', effectId: 'armor' },
            { toId: 'captainamerica', effectId: 'perfectblock' },
            { toId: 'captainamericawwii', effectId: 'armor' },
        ]),
    ]),

    ...fromId('blackwidow', [
        ...fromStars(2, [
            { toId: 'captainmarvel', effectId: 'armor' },
            { toId: 'wintersoldier', effectId: 'powergain' },
        ]),
        ...fromStars(3, [
            { toId: 'hulk', effectId: 'stunspecial' },
            { toId: 'captainmarvel', effectId: 'armor' },
            { toId: 'wintersoldier', effectId: 'powergain' },
            { toId: 'hawkeye', effectId: 'powergain' },
        ]),
        ...fromStars(4, [
            { toId: 'hulk', effectId: 'stunspecial' },
            { toId: 'captainmarvel', effectId: 'armor' },
            { toId: 'wintersoldier', effectId: 'powergain' },
            { toId: 'hawkeye', effectId: 'powergain' },
        ]),
    ]),

    ...fromId('abomination', [
        ...fromStars(2, [
            { toId: 'rhino', effectId: 'armor' },
        ]),
        ...fromStars(3, [
            { toId: 'rhino', effectId: 'armor' },
            { toId: 'hulk', effectId: 'attack' },
        ]),
        ...fromStars(4, [
            { toId: 'rhino', effectId: 'armor' },
            { toId: 'hulk', effectId: 'attack' },
        ]),
    ]),

    ...fromId('antman', [
        ...fromStars(2, [
            { toId: 'yellowjacket', effectId: 'attack' },
            { toId: 'ironman', effectId: 'perfectblock' },
        ]),
        ...fromStars(3, [
            { toId: 'yellowjacket', effectId: 'attack' },
            { toId: 'spiderman', effectId: 'perfectblock' },
            { toId: 'ironman', effectId: 'perfectblock' },
        ]),
        ...fromStars(4, [
            { toId: 'hulk', effectId: 'armor' },
            { toId: 'yellowjacket', effectId: 'attack' },
            { toId: 'spiderman', effectId: 'perfectblock' },
            { toId: 'ironman', effectId: 'perfectblock' },
        ]),
        ...fromStars(5, [
            { toId: 'hulk', effectId: 'armor' },
            { toId: 'yellowjacket', effectId: 'attack' },
            { toId: 'spiderman', effectId: 'perfectblock' },
            { toId: 'ironman', effectId: 'perfectblock' },
        ]),
    ]),

    ...fromId('captainamerica', [
        ...fromStars(2, [
            { toId: 'spiderman', effectId: 'armor' },
            { toId: 'superiorironman', effectId: 'critrate' },
            { toId: 'ironman', effectId: 'armor' },
        ]),
        ...fromStars(3, [
            { toId: 'wintersoldier', effectId: 'armor' },
            { toId: 'spiderman', effectId: 'armor' },
            { toId: 'superiorironman', effectId: 'critrate' },
            { toId: 'ironman', effectId: 'perfectblock' },
        ]),
        ...fromStars(4, [
            { toId: 'wintersoldier', effectId: 'armor' },
            { toId: 'spiderman', effectId: 'armor' },
            { toId: 'superiorironman', effectId: 'critrate' },
            { toId: 'ironman', effectId: 'perfectblock' },
        ]),
    ]),

    ...fromId('captainamericawwii', [
        ...fromStars(2, [
            { toId: 'wintersoldier', effectId: 'armor' },
            { toId: 'wolverine', effectId: 'armor' },
        ]),
        ...fromStars(3, [
            { toId: 'wintersoldier', effectId: 'armor' },
            { toId: 'wolverine', effectId: 'armor' },
        ]),
        ...fromStars(4, [
            { toId: 'wintersoldier', effectId: 'armor' },
            { toId: 'wolverine', effectId: 'armor' },
        ]),
    ]),

    ...fromId('electro', [
        ...fromStars(3, [
            { toId: 'spiderman', effectId: 'attack' },
            { toId: 'rhino', effectId: 'armor' },
        ]),
        ...fromStars(4, [
            { toId: 'spiderman', effectId: 'attack' },
            { toId: 'rhino', effectId: 'armor' },
        ]),
    ]),

    ...fromId('hulk', [
        ...fromStars(2, [
            { toId: 'thor', effectId: 'critdamage' },
        ]),
        ...fromStars(3, [
            { toId: 'thor', effectId: 'critdamage' },
            { toId: 'abomination', effectId: 'critrate' },
            { toId: 'hawkeye', effectId: 'armor' },
        ]),
        ...fromStars(4, [
            { toId: 'thor', effectId: 'critdamage' },
            { toId: 'abomination', effectId: 'critrate' },
            { toId: 'hawkeye', effectId: 'armor' },
        ]),
    ]),

    ...fromId('joefixit', [
        ...fromStars(3, [
            { toId: 'wolverine', effectId: 'armor' },
            { toId: 'moonknight', effectId: 'critrate' },
            { toId: 'hulk', effectId: 'attack' },
        ]),
        ...fromStars(4, [
            { toId: 'wolverine', effectId: 'armor' },
            { toId: 'moonknight', effectId: 'critrate' },
            { toId: 'msmarvel', effectId: 'critrate' },
            { toId: 'hulk', effectId: 'attack' },
        ]),
    ]),

    ...fromId('lukecage', [
        ...fromStars(3, [
            { toId: 'ironfist', effectId: 'heroesforhire' },
            ...toIds([ 'juggernaut', 'ironpatriot' ], { effectId: 'thunderbolts' }),
        ]),
        ...fromStars(4, [
            { toId: 'ironfist', effectId: 'heroesforhire' },
            ...toIds([ 'juggernaut', 'ironpatriot' ], { effectId: 'thunderbolts' }),
        ]),
        ...fromStars(5, [
            { toId: 'ironfist', effectId: 'heroesforhire' },
            ...toIds([ 'juggernaut', 'ironpatriot' ], { effectId: 'thunderbolts' }),
        ]),
    ]),

    ...fromId('rhino', [
        ...fromStars(2, [
            { toId: 'spiderman', effectId: 'critrate' },
            { toId: 'abomination', effectId: 'armor' },
        ]),
        ...fromStars(3, [
            { toId: 'spiderman', effectId: 'critrate' },
            { toId: 'abomination', effectId: 'armor' },
            { toId: 'electro', effectId: 'perfectblock' },
        ]),
        ...fromStars(4, [
            { toId: 'spiderman', effectId: 'critrate' },
            { toId: 'abomination', effectId: 'armor' },
            { toId: 'electro', effectId: 'perfectblock' },
        ]),
        ...fromStars(5, [
            { toId: 'spiderman', effectId: 'critrate' },
            { toId: 'abomination', effectId: 'armor' },
            { toId: 'electro', effectId: 'perfectblock' },
        ]),
    ]),

    ...fromId('redhulk', [
        ...fromStars(3, [
            { toId: 'abomination', effectId: 'critrate' },
            { toId: 'hulk', effectId: 'attack' },
            { toId: 'x23', effectId: 'perfectblock' },
            ...toIds([ 'elektra', 'agentvenom' ], { effectId: 'thunderbolts' }),
        ]),
        ...fromStars(4, [
            { toId: 'abomination', effectId: 'critrate' },
            { toId: 'hulk', effectId: 'attack' },
            { toId: 'x23', effectId: 'perfectblock' },
            ...toIds([ 'elektra', 'agentvenom' ], { effectId: 'thunderbolts' }),
        ]),
        ...fromStars(5, [
            { toId: 'abomination', effectId: 'critrate' },
            { toId: 'hulk', effectId: 'attack' },
            { toId: 'x23', effectId: 'perfectblock' },
            ...toIds([ 'elektra', 'agentvenom' ], { effectId: 'thunderbolts' }),
        ]),
    ]),

    ...fromId('shehulk', [
        ...fromStars(3, [
            { toId: 'hulk', effectId: 'health' },
            { toId: 'superiorironman', effectId: 'powergain' },
            { toId: 'kamalakhan', effectId: 'perfectblock' },
            { toId: 'daredevil', effectId: 'stunactivation' },
        ]),
        ...fromStars(4, [
            { toId: 'hulk', effectId: 'health' },
            { toId: 'superiorironman', effectId: 'powergain' },
            { toId: 'kamalakhan', effectId: 'perfectblock' },
            { toId: 'daredevil', effectId: 'stunactivation' },
        ]),
        ...fromStars(5, [
            { toId: 'hulk', effectId: 'health' },
            { toId: 'superiorironman', effectId: 'powergain' },
            { toId: 'kamalakhan', effectId: 'perfectblock' },
            { toId: 'daredevil', effectId: 'stunactivation' },
        ]),
    ]),

    ...fromId('spiderman', [
        ...fromStars(1, [
            { toId: 'wolverine', effectId: 'health' },
            { toId: 'hawkeye', effectId: 'attack' },
        ]),
        ...fromStars(2, [
            { toId: 'wolverine', effectId: 'health' },
            { toId: 'hawkeye', effectId: 'attack' },
        ]),
        ...fromStars(3, [
            { toId: 'wolverine', effectId: 'health' },
            { toId: 'hawkeye', effectId: 'attack' },
            { toId: 'electro', effectId: 'critrate' },
            { toId: 'captainamerica', effectId: 'armor' },
        ]),
        ...fromStars(4, [
            { toId: 'wolverine', effectId: 'health' },
            { toId: 'hawkeye', effectId: 'attack' },
            { toId: 'electro', effectId: 'critrate' },
            { toId: 'captainamerica', effectId: 'armor' },
        ]),
        ...fromStars(5, [
            { toId: 'wolverine', effectId: 'health' },
            { toId: 'hawkeye', effectId: 'attack' },
            { toId: 'electro', effectId: 'critrate' },
            { toId: 'captainamerica', effectId: 'armor' },
        ]),
    ]),

    ...fromId('spidergwen', [
        ...fromStars(3, [
            { toId: 'rhino', effectId: 'critrate' },
            { toId: 'daredevil', effectId: 'critrate' },
            { toId: 'spiderman', effectId: 'powergain' },
        ]),
        ...fromStars(4, [
            { toId: 'rhino', effectId: 'critrate' },
            { toId: 'daredevil', effectId: 'critrate' },
            { toId: 'spiderman', effectId: 'powergain' },
            { toId: 'punisher', effectId: 'critdamage' },
        ]),
        ...fromStars(5, [
            { toId: 'rhino', effectId: 'critrate' },
            { toId: 'daredevil', effectId: 'critrate' },
            { toId: 'spiderman', effectId: 'powergain' },
            { toId: 'punisher', effectId: 'critdamage' },
        ]),
    ]),

    ...fromId('spidermanmorales', [
        ...fromStars(3, [
            { toId: 'venom', effectId: 'attack' },
            { toId: 'spidergwen', effectId: 'perfectblock' },
        ]),
        ...fromStars(4, [
            { toId: 'electro', effectId: 'critrate' },
            { toId: 'ironpatriot', effectId: 'critrate' },
            { toId: 'venom', effectId: 'attack' },
            { toId: 'spidergwen', effectId: 'perfectblock' },
        ]),
    ]),

    ...fromId('yellowjacket', [
        ...fromStars(2, [
            { toId: 'antman', effectId: 'attack' },
            { toId: 'ultron', effectId: 'critdamage' },
        ]),
        ...fromStars(3, [
            { toId: 'antman', effectId: 'attack' },
            { toId: 'ultron', effectId: 'critdamage' },
        ]),
        ...fromStars(4, [
            { toId: 'antman', effectId: 'attack' },
            { toId: 'ultron', effectId: 'critdamage' },
        ]),
    ]),

    ...fromId('drstrange', [
        ...fromStars(3, [
            { toId: 'thor', effectId: 'armor' },
            { toId: 'spiderman', effectId: 'armor' },
            { toId: 'scarletwitch', effectId: 'block' },
            { toId: 'blackbolt', effectId: 'perfectblock' },
        ]),
        ...fromStars(4, [
            { toId: 'thor', effectId: 'armor' },
            { toId: 'spiderman', effectId: 'armor' },
            { toId: 'scarletwitch', effectId: 'block' },
            { toId: 'blackbolt', effectId: 'perfectblock' },
        ]),
    ]),

    ...fromId('ironfist', [
        ...fromStars(2, [
            { toId: 'blackpanther', effectId: 'armor' },
        ]),
        ...fromStars(3, [
            { toId: 'blackpanther', effectId: 'armor' },
            { toId: 'drstrange', effectId: 'armor' },
        ]),
        ...fromStars(4, [
            { toId: 'blackpanther', effectId: 'armor' },
            { toId: 'drstrange', effectId: 'armor' },
            { toId: 'wolverine', effectId: 'armor' },
        ]),
        ...fromStars(5, [
            { toId: 'blackpanther', effectId: 'armor' },
            { toId: 'drstrange', effectId: 'armor' },
            { toId: 'wolverine', effectId: 'armor' },
        ]),
    ]),

    ...fromId('ironfistwhite', [
        ...fromStars(3, [
            { toId: 'drstrange', effectId: 'armor' },
            { toId: 'daredevil', effectId: 'armor' },
        ]),
        ...fromStars(4, [
            { toId: 'drstrange', effectId: 'armor' },
            { toId: 'daredevil', effectId: 'armor' },
            { toId: 'warmachine', effectId: 'perfectblock' },
        ]),
        ...fromStars(5, [
            { toId: 'drstrange', effectId: 'armor' },
            { toId: 'daredevil', effectId: 'armor' },
            { toId: 'warmachine', effectId: 'perfectblock' },
        ]),
    ]),

    ...fromId('guillotine', [
        ...fromStars(2, [
            { toId: 'venom', effectId: 'attack' },
            { toId: 'captainamericawwii', effectId: 'perfectblock' },
        ]),
        ...fromStars(3, [
            { toId: 'venom', effectId: 'attack' },
            { toId: 'captainamericawwii', effectId: 'perfectblock' },
            { toId: 'magik', effectId: 'critdamage' },
        ]),
        ...fromStars(4, [
            { toId: 'blackpanther', effectId: 'armor' },
            { toId: 'venom', effectId: 'attack' },
            { toId: 'captainamericawwii', effectId: 'perfectblock' },
            { toId: 'magik', effectId: 'critdamage' },
        ]),
    ]),

    ...fromId('juggernaut', [
        ...fromStars(2, [
            { toId: 'colossus', effectId: 'critrate' },
        ]),
        ...fromStars(3, [
            { toId: 'drstrange', effectId: 'attack' },
            { toId: 'colossus', effectId: 'critrate' },
            { toId: 'hulk', effectId: 'critrate' },
        ]),
        ...fromStars(4, [
            { toId: 'drstrange', effectId: 'attack' },
            { toId: 'colossus', effectId: 'critrate' },
            { toId: 'hulk', effectId: 'critrate' },
        ]),
        ...fromStars(5, [
            { toId: 'drstrange', effectId: 'attack' },
            { toId: 'colossus', effectId: 'critrate' },
            { toId: 'hulk', effectId: 'critrate' },
        ]),
    ]),

    ...fromId('magik', [
        ...fromStars(2, [
            { toId: 'colossus', effectId: 'health' },
        ]),
        ...fromStars(3, [
            { toId: 'storm', effectId: 'armor' },
            { toId: 'colossus', effectId: 'health' },
            { toId: 'cyclops', effectId: 'perfectblock' },
        ]),
        ...fromStars(4, [
            { toId: 'storm', effectId: 'armor' },
            { toId: 'colossus', effectId: 'health' },
            { toId: 'cyclops', effectId: 'perfectblock' },
            { toId: 'juggernaut', effectId: 'critrate' },
        ]),
        ...fromStars(5, [
            { toId: 'storm', effectId: 'armor' },
            { toId: 'colossus', effectId: 'health' },
            { toId: 'cyclops', effectId: 'perfectblock' },
            { toId: 'juggernaut', effectId: 'critrate' },
        ]),
    ]),

    ...fromId('scarletwitch', [
        ...fromStars(2, [
            { toId: 'captainmarvel', effectId: 'armor' },
        ]),
        ...fromStars(3, [
            { toId: 'captainmarvel', effectId: 'armor' },
            { toId: 'vision', effectId: 'powergain' },
        ]),
        ...fromStars(4, [
            { toId: 'captainmarvel', effectId: 'armor' },
            { toId: 'vision', effectId: 'powergain' },
        ]),
    ]),

    ...fromId('thorjanefoster', [
        ...fromStars(3, [
            { toId: 'thor', effectId: 'powergain' },
            { toId: 'vision', effectId: 'perfectblock' },
        ]),
        ...fromStars(4, [
            { toId: 'blackwidow', effectId: 'armor' },
            { toId: 'thor', effectId: 'powergain' },
            { toId: 'vision', effectId: 'perfectblock' },
        ]),
        ...fromStars(5, [
            { toId: 'blackwidow', effectId: 'armor' },
            { toId: 'thor', effectId: 'powergain' },
            { toId: 'vision', effectId: 'perfectblock' },
        ]),
    ]),

    ...fromId('unstoppablecolossus', [
        ...fromStars(2, [
            { toId: 'magik', effectId: 'health' },
            { toId: 'juggernaut', effectId: 'critdamage' },
        ]),
        ...fromStars(3, [
            { toId: 'wolverine', effectId: 'armor' },
            { toId: 'magik', effectId: 'health' },
            { toId: 'cyclops', effectId: 'perfectblock' },
            { toId: 'juggernaut', effectId: 'critdamage' },
        ]),
        ...fromStars(4, [
            { toId: 'wolverine', effectId: 'armor' },
            { toId: 'magik', effectId: 'health' },
            { toId: 'cyclops', effectId: 'perfectblock' },
            { toId: 'juggernaut', effectId: 'critdamage' },
        ]),
        ...fromStars(5, [
            { toId: 'wolverine', effectId: 'armor' },
            { toId: 'magik', effectId: 'health' },
            { toId: 'cyclops', effectId: 'perfectblock' },
            { toId: 'juggernaut', effectId: 'critdamage' },
        ]),
    ]),

].map((synergy) => new Synergy({
    ...synergy,
    effectAmount: effectAmount(synergy.effectId, synergy.fromStars),
}));

function fromId(fromId, synergies) {
    return synergies.map((synergy) => ({
        fromId,
        ...synergy,
    }));
}

function fromStars(fromStars, synergies) {
    return synergies.map((synergy) => ({
        fromStars,
        ...synergy,
    }));
}

function toIds(toIds, synergy) {
    toIds.counter = (toIds.counter + 1) || 1;
    return toIds.map((toId) => ({
        toId,
        ...synergy,
        group: toIds.counter,
    }));
}

function effectAmount(effectId, fromStars) {
    const amounts = EFFECT_STARS_AMOUNT[ effectId ];
    if(!amounts) {
        return 0;
    }
    return amounts[ EFFECT_STARS_INDEX[ fromStars ] || 0 ] || 0;
}

function synergiesFromChampions(champions) {
    const ids = {};
    champions.forEach((champion) => (ids[ champion.attr.uid ] = true));
    return champions
        .map((champion) => synergies.filter((synergy) => {
            const { fromId, fromStars, toId } = synergy.attr;
            if(fromId !== champion.attr.uid || fromStars !== champion.attr.stars)
                return false;
            return ids[ toId ];
        }))
        .reduce((array, current) => array.concat(current), []);
}

export { synergiesFromChampions };
export default synergies;
