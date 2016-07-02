import values from './pi/values.json';

const STAR_RANK_LEVELS = [
    [ 10, 20 ],
    [ 10, 20, 30 ],
    [ 10, 20, 30, 40 ],
    [ 10, 20, 30, 40, 50 ],
    [ 25, 35, 45, 55, 65 ],
];
const STAR_LEVELS = STAR_RANK_LEVELS.map((rankLevels) => {
    return rankLevels.reduce((sum, value) => sum + value, 0);
});
const STAR_RANK_LEVEL_SUMS = STAR_RANK_LEVELS.map((rankLevels) => {
    return rankLevels.reduce((sums, value) => [
        ...sums,
        (sums[ sums.length - 1 ] || 0) + value,
    ], []);
});

const getLevelRatio = (stars, rank, level) => {
    const rankLevelSums = STAR_RANK_LEVEL_SUMS[ stars - 1 ];
    const rankSum = rankLevelSums && rankLevelSums[ rank - 2 ] || 0;
    return (rankSum + level) / (STAR_LEVELS[ stars - 1 ] || 1);
};

export function getPI({ uid, stars = 1, rank = 1, level = 1, awakened = 0 }) {
    const value = values[ `${ uid }-${ stars }` ] || values[ `default-${ stars }` ];
    if(!value) {
        return 0;
    }
    const ratio = getLevelRatio(stars, rank, level);
    const base = value.min + (value.max - value.min) * ratio;
    if(!awakened) {
        return base | 0;
    }
    const ln = Math.log(awakened);
    const sig = [ 0, 1, 2, 3 ].reduce((sum, i) => {
        let c = value[ `sig-${ i }` ] || 0;
        if(!c) {
            return sum;
        }
        if(i > 0) {
            c *= Math.pow(ln, i);
        }
        return sum + c;
    }, 0);
    return (base + sig * ratio) | 0;
}
