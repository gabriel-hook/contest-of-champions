import { uids as typeIds } from '../types';
import Model from './Model';

const CATALYSTS = {
    2:{
        1: [
            { tier: 1, type: 'basic', amount: 2 },
        ],
        2: [
            { tier: 1, type: 'basic', amount: 3 },
            { tier: 1, type: 'class', amount: 1 },
        ],
    },
    3:{
        1: [
            { tier: 2, type: 'basic', amount: 3 },
            { tier: 1, type: 'class', amount: 2 },
        ],
        2: [
            { tier: 2, type: 'basic', amount: 5 },
            { tier: 2, type: 'class', amount: 1 },
        ],
        3: [
            { tier: 3, type: 'basic', amount: 3 },
            { tier: 2, type: 'class', amount: 2 },
        ],
    },
    4:{
        1: [
            { tier: 3, type: 'basic', amount: 4 },
            { tier: 2, type: 'class', amount: 3 },
        ],
        2: [
            { tier: 3, type: 'basic', amount: 5 },
            { tier: 3, type: 'class', amount: 1 },
            { tier: 1, type: 'alpha', amount: 1 },
        ],
        3: [
            { tier: 4, type: 'basic', amount: 3 },
            { tier: 3, type: 'class', amount: 2 },
            { tier: 1, type: 'alpha', amount: 1 },
        ],
        4: [
            { tier: 4, type: 'basic', amount: 5 },
            { tier: 4, type: 'class', amount: 3 },
            { tier: 1, type: 'alpha', amount: 2 },
        ],
    },
};

const STAR_RANK_LEVEL={
    1:{
        1:{ levels: 10, min:100, max:175 },
        2:{ levels: 20, min:175, max:250 },
        ranks: 2,
    },
    2:{
        1:{ levels: 10, min:150, max:250 },
        2:{ levels: 20, min:250, max:400 },
        3:{ levels: 30, min:400, max:600 },
        ranks: 3,
    },
    3:{
        1:{ levels: 10, min:300, max:500 },
        2:{ levels: 20, min:500, max:900 },
        3:{ levels: 30, min:900, max:1200 },
        4:{ levels: 40, min:1200, max:1500 },
        ranks: 4,
    },
    4:{
        1:{ levels: 10, min:600, max:1000 },
        2:{ levels: 20, min:1000, max:1500 },
        3:{ levels: 30, min:1500, max:2000 },
        4:{ levels: 40, min:2000, max:2800 },
        5:{ levels: 50, min:2800, max:3500 },
        ranks: 5,
    },
    5:{
        1:{ levels: 25, min:1500, max:2500 },
        2:{ levels: 35, min:2500, max:3500 },
        3:{ levels: 45, min:3500, max:4500 },
        4:{ levels: 55, min:4500, max:5500 },
        5:{ levels: 65, min:5500, max:6500 },
        ranks: 5,
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
    }) {
        super({
            uid,
            stars,
            typeId,
            pi,
            rank,
            level,
            awakened,
        });
        this.id = `${ this.attr.uid }-${ this.attr.stars }`;
        this.typeIndex = typeIds.indexOf(this.attr.typeId);
        this.pi = 0;
        const range = STAR_RANK_LEVEL[ stars ] && STAR_RANK_LEVEL[ stars ][ rank ];
        if(range && level <= range.levels) {
            this.pi = range.min + (level / range.levels) * (range.max - range.min);
            if(awakened > 0)
                this.pi *= 1.05 + Math.min(Math.max(1, awakened), 99) * 0.005;
            this.pi = this.pi | 0;
        }
        this.attr.pi = this.attr.pi | 0;
        this.attr.rank = this.attr.rank | 0;
        this.attr.level = this.attr.level | 0;
        this.attr.awakened = this.attr.awakened | 0;
    }
}

export default Champion;
export { STAR_RANK_LEVEL, CATALYSTS };
