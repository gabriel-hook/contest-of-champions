/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const MenuIcon = {
    view(ctrl, args) {
        const { icon, spin } = args;
        return icon && (
            <i class={ `icon fa fa-${ icon } ${ spin? 'fa-spin': '' }` } />
        );
    },
};

export default MenuIcon;
