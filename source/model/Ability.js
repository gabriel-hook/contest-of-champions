import Model from './Model';

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
