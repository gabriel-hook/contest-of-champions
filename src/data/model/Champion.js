import Model from './Model';

class Champion extends Model {
    constructor({ uid, stars, typeId, pi, rank, level, awakened }) {
        super({
            uid: 'champion',
            stars: 1,
            typeId: 'mutant',
            pi: 0,
            rank: 1,
            level: 1,
            awakened: 0,
        }, {
            uid,
            stars,
            typeId,
            pi,
            rank,
            level,
            awakened,
        });
    }

    id() {
        return `${ this.attr.uid }-${ this.attr.stars }`;
    }
}

export default Champion;
