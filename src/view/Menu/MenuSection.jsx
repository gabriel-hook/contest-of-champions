import lang from '../../service/lang';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const MenuSection = {
    view(ctrl, { title, icon }) {
        return (
            <div
                m="MenuSection"
                role="heading"
                aria-label={ lang.get(title) }
                class="menu-section">
                <div>{ icon }{ lang.get(title) }</div>
            </div>
        );
    },
};

export default MenuSection;
