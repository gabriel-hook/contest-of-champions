import * as CHAMPION from '../ids/champions';
import { STAR_RANK_LEVEL } from '../champions/star-rank-level';
import { TYPE_VALUES } from './Type';
import { ROLE_VALUES } from './Role';
import { isInRange } from '../../util/math';
import { getPi } from '../pi';
import { values } from 'lodash';

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
export { CHAMPION };
export const CHAMPION_VALUES = values(CHAMPION);
export { STAR_RANK_LEVEL };
