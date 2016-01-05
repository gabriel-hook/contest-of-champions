import './MenuOptionGroup.scss';
import classNames from 'classnames';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const MenuGroupOption = {
    view(ctrl, { options, tabs }) {
        return (
            <div
                m="MenuGroupOption"
                class={ classNames('menu-option--group', `menu-option--group-${ options.length }`, { 'menu-option--group-tabs': tabs }) }
            >
                { options }
            </div>
        );
    },
};

export default MenuGroupOption;
