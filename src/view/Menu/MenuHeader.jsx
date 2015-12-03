import lang from '../../service/lang';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const MenuHeader = {
    view(ctrl, args) {
        const { title, icon } = args;

        return (
            <div class="menu-header">
                <div>{ icon }{ lang.get(title) }</div>
            </div>
        );
    },
};

export default MenuHeader;
