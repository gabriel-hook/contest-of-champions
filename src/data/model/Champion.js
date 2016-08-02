import * as CHAMPION from '../ids/champions';
import * as CATALYST from '../ids/catalyst';
import { TYPE_VALUES } from './Type';
import { ROLE_VALUES } from './Role';
import { isInRange } from '../../util/math';
import { getPi } from '../pi';
import { values } from 'lodash';

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

const CATALYSTS = {
    1: {
        1: [
            { type: CATALYST.GOLD, amount: 2817 },
        ],
    },
    2:{
        1: [
            { type: CATALYST.BASIC, tier: 1, amount: 2 },
            { type: CATALYST.GOLD, amount: 4641 },
        ],
        2: [
            { type: CATALYST.BASIC, tier: 1, amount: 3 },
            { type: CATALYST.CLASS, tier: 1, amount: 1 },
            { type: CATALYST.GOLD, amount: 9282 },
        ],
    },
    3:{
        1: [
            { type: CATALYST.BASIC, tier: 2, amount: 3 },
            { type: CATALYST.CLASS, tier: 1, amount: 2 },
            { type: CATALYST.GOLD, amount: 11500 },
        ],
        2: [
            { type: CATALYST.BASIC, tier: 2, amount: 5 },
            { type: CATALYST.CLASS, tier: 2, amount: 1 },
            { type: CATALYST.GOLD, amount: 23001 },
        ],
        3: [
            { type: CATALYST.BASIC, tier: 3, amount: 3 },
            { type: CATALYST.CLASS, tier: 2, amount: 2 },
            { type: CATALYST.GOLD, amount: 34501 },
        ],
    },
    4:{
        1: [
            { type: CATALYST.BASIC, tier: 3, amount: 4 },
            { type: CATALYST.CLASS, tier: 2, amount: 3 },
            { type: CATALYST.GOLD, amount: 27435 },
        ],
        2: [
            { type: CATALYST.BASIC, tier: 3, amount: 5 },
            { type: CATALYST.CLASS, tier: 3, amount: 1 },
            { type: CATALYST.ALPHA, tier: 1, amount: 1 },
            { type: CATALYST.GOLD, amount: 54850 },
        ],
        3: [
            { type: CATALYST.BASIC, tier: 4, amount: 3 },
            { type: CATALYST.CLASS, tier: 3, amount: 2 },
            { type: CATALYST.ALPHA, tier: 1, amount: 1 },
            { type: CATALYST.GOLD, amount: 82275 },
        ],
        4: [
            { type: CATALYST.BASIC, tier: 4, amount: 5 },
            { type: CATALYST.CLASS, tier: 4, amount: 3 },
            { type: CATALYST.ALPHA, tier: 1, amount: 2 },
            { type: CATALYST.GOLD, amount: 109701 },
        ],
    },
    5: {
        1: [
            { type: CATALYST.BASIC, tier: 4, amount: 2 },
            { type: CATALYST.CLASS, tier: 3, amount: 3 },
            { type: CATALYST.ALPHA, tier: 1, amount: 5 },
            { type: CATALYST.GOLD, amount: 135684 },
        ],
        2: [
            { type: CATALYST.BASIC, tier: 4, amount: 4 },
            { type: CATALYST.CLASS, tier: 4, amount: 3 },
            { type: CATALYST.ALPHA, tier: 1, amount: 5 },
            { type: CATALYST.GOLD, amount: 271370 },
        ],
        3: [
            { type: CATALYST.BASIC, tier: 5, amount: 6 },
            { type: CATALYST.CLASS, tier: 4, amount: 4 },
            { type: CATALYST.ALPHA, tier: 1, amount: 6 },
            { type: CATALYST.ALPHA, tier: 2, amount: 4 },
            { type: CATALYST.GOLD, amount: 407056 },
        ],
        4: [
            { type: CATALYST.BASIC, tier: 5, amount: 4 },
            { type: CATALYST.CLASS, tier: 4, amount: 6 },
            { type: CATALYST.ALPHA, tier: 1, amount: 5 },
            { type: CATALYST.ALPHA, tier: 2, amount: 6 },
            { type: CATALYST.GOLD, amount: 524738 },
        ],
    },
};

const validStars = (stars) => (STAR_RANK_LEVEL[ stars ])? stars: 0;
const validRank = (stars, rank) => (validStars(stars) && isInRange(rank, 1, STAR_RANK_LEVEL[ stars ].ranks))? rank: 0;
const validLevel = (stars, rank, level) => (validRank(stars, rank) && isInRange(level, 1, STAR_RANK_LEVEL[ stars ][ rank ].levels))? level: 0;
const validAwakened = (stars, awakened) => (validStars(stars) && isInRange(awakened, 0, STAR_RANK_LEVEL[ stars ].awakened))? awakened: 0;

class Champion {
    constructor({
        uid = 'champion',
        stars = 1,
        typeId = 'unknown',
        pi = 0,
        rank = 1,
        level = 1,
        awakened = 0,
        role = null,
    }) {
        this.attr = {
            uid,
            role,
            typeId,
        };

        this.attr.stars = validStars(stars | 0) || 0;
        this.attr.rank = validRank(this.attr.stars, rank | 0) || 1;
        this.attr.level = validLevel(this.attr.stars, this.attr.rank, level | 0) || 1;
        this.attr.awakened = validAwakened(this.attr.stars, awakened | 0) || 0;

        this.attr.typeId = TYPE_VALUES.find((typeId) => typeId === this.attr.typeId) || 'unknown';
        this.attr.role = ROLE_VALUES.find((role) => role === this.attr.role) || null;

        this.attr.pi = pi | 0;

        this.id = `${ this.attr.uid }-${ this.attr.stars }`;
        this.typeIndex = TYPE_VALUES.indexOf(this.attr.typeId);
        this.pi = getPi(this.attr) || 0;
    }

    static idToObject(id) {
        const [ uid, stars ] = id.split('-');
        return {
            uid,
            stars: parseInt(stars, 10),
        };
    }

    toJSON() {
        return this.attr;
    }
}

export default Champion;
export { CHAMPION, CATALYST };
export const CHAMPION_VALUES = values(CHAMPION);
export const CATALYST_VALUES = values(CATALYST);
export { STAR_RANK_LEVEL, CATALYSTS };
