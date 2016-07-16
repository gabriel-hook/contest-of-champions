import Model from './Model';
import { values } from 'lodash';
import * as ABILITY from '../ids/abilities';

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
export { ABILITY };
export const ABILITY_VALUES = values(ABILITY);
