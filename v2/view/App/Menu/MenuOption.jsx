import './MenuOption.scss';
import lang from '../../../service/lang.js';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const MenuOption = {
    view(ctrl, args) {
        const { title, icon, onclick, selected } = args;

        return (
            <div
                class={
                    `menu-option ${ selected? 'menu-option--selected': '' }`
                }
                onclick={ onclick }
                disabled={ Boolean(onclick) }
            >
                <div>{ icon }{ lang.get(title) }</div>
            </div>
        );
    },
};

export default MenuOption;
