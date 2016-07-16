import Model from './Model';
import { values } from 'lodash';
import * as TYPE from '../ids/types';

class Type extends Model {
    constructor({
        uid = 'type',
    }) {
        super({
            uid,
        });
    }
}

export default Type;
export { TYPE };
export const TYPE_VALUES = values(TYPE);
