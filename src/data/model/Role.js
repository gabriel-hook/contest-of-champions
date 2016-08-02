import { values } from 'lodash';
import * as ROLE from '../ids/roles';

class Role {
    constructor({
        uid = 'role',
    }) {
        this.attr = {
            uid,
        };
    }

    toJSON() {
        return this.attr;
    }
}

export default Role;
export { ROLE };
export const ROLE_VALUES = values(ROLE);
