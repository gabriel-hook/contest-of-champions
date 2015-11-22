import Model from './Model.js';

class Champion extends Model {
    constructor({ uid, stars, typeId, pi }) {
        super({
            uid: 'champion',
            stars: 1,
            typeId: 'mutant',
            pi: 0,
        }, {
            uid,
            stars,
            typeId,
            pi,
        });
    }

    id() {
        return `${ this.attr.uid }-${ this.attr.stars }`;
    }
}

export default Champion;
