import { values } from 'lodash';
import * as EFFECT from '../ids/effects';

class Effect {
    constructor({
        uid = 'effect',
        base = 0,
        amount = 0,
    }) {
        this.attr = {
            uid,
            base,
            amount,
        };
    }

    toJSON() {
        return this.attr;
    }
}

export default Effect;
export { EFFECT };
export const EFFECT_VALUES = values(EFFECT);
