import lang from '../../../service/lang.js';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const MenuSection = {
    view(ctrl, args) {
        const { title, icon } = args;

        return (
            <div class="menu-section">
                <div>{ icon }{ lang.get(title) }</div>
            </div>
        );
    },
};

export default MenuSection;
