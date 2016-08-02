import coefficientsByStar from './pi/coefficient-by-stars.json';
import coefficientsByRank from './pi/coefficient-by-rank.json';
import { STAR_LEVELS, STAR_RANK_LEVELS, STAR_RANK_LEVEL_SUMS } from './champions/star-rank-level';

function getLevelRatio(stars, rank, level) {
    const levelMax = STAR_LEVELS[ stars - 1 ];
    const levelActual = (STAR_RANK_LEVEL_SUMS[ stars - 1 ][ rank - 2 ] || 0) + level;
    return levelActual / levelMax;
}

function getBasePi(data, value) {
    const keys = Object.keys(data);
    const minKey = Math.min(...keys);
    const maxKey = Math.max(...keys);
    const { [ minKey ]: minValue, [ maxKey ]: maxValue } = data;
    return minValue + (maxValue - minValue) * (value - minKey) / (maxKey - minKey);
}

function awakenedReduction(awakened) {
    const ln = Math.log(awakened);
    return (sum, value, exponent) => {
        if(!value) {
            return sum;
        }
        if(exponent === 0) {
            return sum + value;
        }
        if(exponent === 1) {
            return sum + value * ln;
        }
        return sum + value * Math.pow(ln, exponent);
    };
}

function getRankPi({ uid, stars = 1, rank = 1, level = 1, awakened = 0 }) {
    const value = coefficientsByRank[ `${ uid }-${ stars }` ];
    if(!value) {
        return 0;
    }
    const valueForRank = value[ rank ];
    if(!valueForRank) {
        return 0;
    }
    const minMaxPi = valueForRank[ 'pi' ];
    if(!awakened) {
        return getBasePi(minMaxPi, level) | 0;
    }
    const { k, s0, s1, s2, s3 } = valueForRank;
    const maxLevel = STAR_RANK_LEVELS[ stars - 1 ][ rank - 1 ];
    let maxPi = 0;
    if(stars === 4) {
        maxPi = k * [ s0, s1, s2 ].reduce(awakenedReduction(awakened));
    }
    else if (stars === 5) {
        maxPi = k / [ s0, s1, s2, s3 ].reduce(awakenedReduction(awakened));
    }
    if(maxPi && maxLevel) {
        return getBasePi({
            ...minMaxPi,
            [ maxLevel ]: maxPi,
        }, level) | 0;
    }
    return 0;
}

function getStarsPi({ uid, stars = 1, rank = 1, level = 1, awakened = 0 }) {
    let value = coefficientsByStar[ `default-${ stars }` ];
    if(!value) {
        return 0;
    }
    value = {
        ...value,
        ...(coefficientsByStar[ `${ uid }-${ stars }` ] || {}),
    };
    const levelRatio = getLevelRatio(stars, rank, level);
    const { min: baseMinPi, max: baseMaxPi } = value;
    if(!awakened) {
        return (baseMinPi + (baseMaxPi - baseMinPi) * levelRatio) | 0;
    }
    const { s0, s1, s2, s3 } = value;
    const maxPi = baseMaxPi + [ s0, s1, s2, s3 ].reduce(awakenedReduction(awakened));
    return (baseMinPi + (maxPi - baseMinPi) * levelRatio) | 0;
}

export function getPi(attr) {
    const byRank = getRankPi(attr);
    if(byRank) {
        return byRank;
    }
    return getStarsPi(attr);
}
