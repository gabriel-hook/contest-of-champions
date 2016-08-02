export const STAR_RANK_LEVEL = {
    1:{
        1:{ levels: 10 },
        2:{ levels: 20 },
        ranks: 2,
        awakened: 99,
    },
    2:{
        1:{ levels: 10 },
        2:{ levels: 20 },
        3:{ levels: 30 },
        ranks: 3,
        awakened: 99,
    },
    3:{
        1:{ levels: 10 },
        2:{ levels: 20 },
        3:{ levels: 30 },
        4:{ levels: 40 },
        ranks: 4,
        awakened: 99,
    },
    4:{
        1:{ levels: 10 },
        2:{ levels: 20 },
        3:{ levels: 30 },
        4:{ levels: 40 },
        5:{ levels: 50 },
        ranks: 5,
        awakened: 99,
    },
    5:{
        1:{ levels: 25 },
        2:{ levels: 35 },
        3:{ levels: 45 },
        4:{ levels: 55 },
        5:{ levels: 65 },
        ranks: 5,
        awakened: 200,
    },
};

export const STAR_RANK_LEVELS = [
    [ 10, 20 ],
    [ 10, 20, 30 ],
    [ 10, 20, 30, 40 ],
    [ 10, 20, 30, 40, 50 ],
    [ 25, 35, 45, 55, 65 ],
];

export const STAR_LEVELS = STAR_RANK_LEVELS.map((rankLevels) => {
    return rankLevels.reduce((sum, value) => sum + value, 0);
});

export const STAR_RANK_LEVEL_SUMS = STAR_RANK_LEVELS.map((rankLevels) => {
    return rankLevels.reduce((sums, value) => [
        ...sums,
        (sums[ sums.length - 1 ] || 0) + value,
    ], []);
});
