import * as CHAMPION from '../ids/champions';
import { TYPE_VALUES } from './Type';
import { ROLE_VALUES } from './Role';
import { isInRange } from '../../util/math';
import { getPi } from '../pi';
import { values } from 'lodash';
import Model from './Model';

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
            { type: 'gold', amount: 2817 },
        ],
    },
    2:{
        1: [
            { type: 'basic', tier: 1, amount: 2 },
            { type: 'gold', amount: 4641 },
        ],
        2: [
            { type: 'basic', tier: 1, amount: 3 },
            { type: 'class', tier: 1, amount: 1 },
            { type: 'gold', amount: 9282 },
        ],
    },
    3:{
        1: [
            { type: 'basic', tier: 2, amount: 3 },
            { type: 'class', tier: 1, amount: 2 },
            { type: 'gold', amount: 11500 },
        ],
        2: [
            { type: 'basic', tier: 2, amount: 5 },
            { type: 'class', tier: 2, amount: 1 },
            { type: 'gold', amount: 23001 },
        ],
        3: [
            { type: 'basic', tier: 3, amount: 3 },
            { type: 'class', tier: 2, amount: 2 },
            { type: 'gold', amount: 34501 },
        ],
    },
    4:{
        1: [
            { type: 'basic', tier: 3, amount: 4 },
            { type: 'class', tier: 2, amount: 3 },
            { type: 'gold', amount: 27435 },
        ],
        2: [
            { type: 'basic', tier: 3, amount: 5 },
            { type: 'class', tier: 3, amount: 1 },
            { type: 'alpha', tier: 1, amount: 1 },
            { type: 'gold', amount: 54850 },
        ],
        3: [
            { type: 'basic', tier: 4, amount: 3 },
            { type: 'class', tier: 3, amount: 2 },
            { type: 'alpha', tier: 1, amount: 1 },
            { type: 'gold', amount: 82275 },
        ],
        4: [
            { type: 'basic', tier: 4, amount: 5 },
            { type: 'class', tier: 4, amount: 3 },
            { type: 'alpha', tier: 1, amount: 2 },
            { type: 'gold', amount: 109701 },
        ],
    },
    5: {
        1: [
            { type: 'basic', tier: 4, amount: 2 },
            { type: 'class', tier: 3, amount: 3 },
            { type: 'alpha', tier: 1, amount: 5 },
            { type: 'gold', amount: 135684 },
        ],
        2: [
            { type: 'basic', tier: 4, amount: 4 },
            { type: 'class', tier: 4, amount: 3 },
            { type: 'alpha', tier: 1, amount: 5 },
            { type: 'gold', amount: 271370 },
        ],
        3: [
            { type: 'basic', tier: 5, amount: 6 },
            { type: 'class', tier: 4, amount: 4 },
            { type: 'alpha', tier: 1, amount: 6 },
            { type: 'alpha', tier: 2, amount: 4 },
            { type: 'gold', amount: 407056 },
        ],
        4: [
            { type: 'basic', tier: 5, amount: 4 },
            { type: 'class', tier: 4, amount: 6 },
            { type: 'alpha', tier: 1, amount: 5 },
            { type: 'alpha', tier: 2, amount: 6 },
            { type: 'gold', amount: 524738 },
        ],
    },
};

const validStars = (stars) => (STAR_RANK_LEVEL[ stars ])? stars: 0;
const validRank = (stars, rank) => (validStars(stars) && isInRange(rank, 1, STAR_RANK_LEVEL[ stars ].ranks))? rank: 0;
const validLevel = (stars, rank, level) => (validRank(stars, rank) && isInRange(level, 1, STAR_RANK_LEVEL[ stars ][ rank ].levels))? level: 0;
const validAwakened = (stars, awakened) => (validStars(stars) && isInRange(awakened, 0, STAR_RANK_LEVEL[ stars ].awakened))? awakened: 0;

class Champion extends Model {
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
        super({
            uid,
            stars,
            typeId,
            pi,
            rank,
            level,
            awakened,
            role,
        });

        this.attr.stars = validStars(this.attr.stars | 0) || 0;
        this.attr.rank = validRank(this.attr.stars, this.attr.rank | 0) || 1;
        this.attr.level = validLevel(this.attr.stars, this.attr.rank, this.attr.level | 0) || 1;
        this.attr.awakened = validAwakened(this.attr.stars, this.attr.awakened | 0) || 0;
        this.attr.pi = this.attr.pi | 0;
        this.attr.typeId = TYPE_VALUES.find((typeId) => typeId === this.attr.typeId) || 'unknown';
        this.attr.role = ROLE_VALUES.find((role) => role === this.attr.role) || null;

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
}

export default Champion;
export { CHAMPION };
export const CHAMPION_VALUES = values(CHAMPION);
export { STAR_RANK_LEVEL, CATALYSTS };
