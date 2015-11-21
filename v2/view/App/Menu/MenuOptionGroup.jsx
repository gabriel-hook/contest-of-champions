import './MenuOptionGroup.scss';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const MenuGroupOption = {
    view(ctrl, args) {
        const { options } = args;

        return (
            <div class={ `menu-option--group menu-option--group-${ options.length }` }>
                { options }
            </div>
        );
    },
};

export default MenuGroupOption;
