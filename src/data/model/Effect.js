import Model from './Model';
import { values } from 'lodash';
import * as EFFECT from '../ids/effects';

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
export { EFFECT };
export const EFFECT_VALUES = values(EFFECT);
