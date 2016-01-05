import lang from '../../service/lang';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const MenuHeader = {
    view(ctrl, { title, icon }) {
        return (
            <div m="MenuHeader" class="menu-header">
                <div>{ icon }{ lang.get(title) }</div>
            </div>
        );
    },
};

export default MenuHeader;
