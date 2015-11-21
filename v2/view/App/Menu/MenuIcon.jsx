/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const MenuIcon = {
    view(ctrl, args) {
        const { icon } = args;
        return icon && (
            <i class={ `fa fa-${ icon }` } />
        );
    },
};

export default MenuIcon;
