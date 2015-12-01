import Model from './Model.js';

class Ability extends Model {
    constructor({ uid }) {
        super({
            uid: 'ability-uid',
        }, {
            uid,
        });
    }
}

export default Ability;
