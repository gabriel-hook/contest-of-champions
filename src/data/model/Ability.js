import { values } from 'lodash';
import * as ABILITY from '../ids/abilities';

class Ability {
    constructor({
        uid = 'ability',
    }) {
        this.attr = {
            uid,
        };
    }

    toJSON() {
        return this.attr;
    }
}

export default Ability;
export { ABILITY };
export const ABILITY_VALUES = values(ABILITY);
