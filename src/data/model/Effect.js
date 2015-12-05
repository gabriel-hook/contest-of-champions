import Model from './Model';

class Effect extends Model {
    constructor({
        uid = 'effect',
        base = 0,
        amount = 0,
    }) {
        super({
            uid,
            base,
            amount,
        });
    }
}

export default Effect;
