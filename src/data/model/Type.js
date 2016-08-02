import { values } from 'lodash';
import * as TYPE from '../ids/types';

class Type {
    constructor({
        uid = 'type',
    }) {
        this.attr = {
            uid,
        };
    }

    toJSON() {
        return this.attr;
    }
}

export default Type;
export { TYPE };
export const TYPE_VALUES = values(TYPE);
