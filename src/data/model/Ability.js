import Model from './Model';

class Ability extends Model {
    constructor({
        uid = 'ability',
    }) {
        super({
            uid,
        });
    }
}

export default Ability;
