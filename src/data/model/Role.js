import Model from './Model';
import { values } from 'lodash';
import * as ROLE from '../ids/roles';

class Role extends Model {
    constructor({
        uid = 'role',
    }) {
        super({
            uid,
        });
    }
}

export default Role;
export { ROLE };
export const ROLE_VALUES = values(ROLE);
