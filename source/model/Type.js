import Model from './Model.js';

class Type extends Model {
    constructor({ uid }) {
        super({
            uid: 'type-uid',
        }, {
            uid,
        });
    }
}

export default Type;
