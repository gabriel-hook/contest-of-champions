import { uids as typeIds } from '../types';
import Model from './Model';

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

const STAR_RANK_LEVEL={
    1:{
        1:{ levels: 10, min:100, max:175 },
        2:{ levels: 20, min:175, max:250 },
        ranks: 2,
        awakened: 99,
    },
    2:{
        1:{ levels: 10, min:150, max:250 },
        2:{ levels: 20, min:250, max:400 },
        3:{ levels: 30, min:400, max:600 },
        ranks: 3,
        awakened: 99,
    },
    3:{
        1:{ levels: 10, min:300, max:500 },
        2:{ levels: 20, min:500, max:900 },
        3:{ levels: 30, min:900, max:1200 },
        4:{ levels: 40, min:1200, max:1500 },
        ranks: 4,
        awakened: 99,
    },
    4:{
        1:{ levels: 10, min:600, max:1000 },
        2:{ levels: 20, min:1000, max:1500 },
        3:{ levels: 30, min:1500, max:2000 },
        4:{ levels: 40, min:2000, max:2800 },
        5:{ levels: 50, min:2800, max:3500 },
        ranks: 5,
        awakened: 99,
    },
    5:{
        1:{ levels: 25, min:1500, max:2500 },
        2:{ levels: 35, min:2500, max:3500 },
        3:{ levels: 45, min:3500, max:4500 },
        4:{ levels: 55, min:4500, max:5500 },
        5:{ levels: 65, min:5500, max:6500 },
        ranks: 5,
        awakened: 200,
    },
};

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
        this.id = `${ this.attr.uid }-${ this.attr.stars }`;
        this.typeIndex = typeIds.indexOf(this.attr.typeId);
        this.pi = 0;
        const range = STAR_RANK_LEVEL[ stars ] && STAR_RANK_LEVEL[ stars ][ rank ];
        if(range && level <= range.levels) {
            const awakenedMax = STAR_RANK_LEVEL[ stars ].awakened || 1;
            this.pi = range.min + (level / range.levels) * (range.max - range.min);
            if(awakened > 0) {
                this.pi *= 1.05 + 0.2 * Math.min(Math.max(1, awakened), awakenedMax) / awakenedMax;
            }
            this.pi = this.pi | 0;
        }
        this.attr.pi = this.attr.pi | 0;
        this.attr.rank = this.attr.rank | 0;
        this.attr.level = this.attr.level | 0;
        this.attr.awakened = this.attr.awakened | 0;
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
export { STAR_RANK_LEVEL, CATALYSTS };
