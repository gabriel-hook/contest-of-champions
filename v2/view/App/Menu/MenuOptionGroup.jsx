import './MenuOptionGroup.scss';
import classNames from 'classnames';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const MenuGroupOption = {
    view(ctrl, args) {
        const { options } = args;

        return (
            <div class={ classNames('menu-option--group', `menu-option--group-${ options.length }`) }>
                { options }
            </div>
        );
    },
};

export default MenuGroupOption;
