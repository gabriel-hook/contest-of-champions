import './MenuOption.scss';
import classNames from 'classnames';
import lang from '../../service/lang';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const MenuOption = {
    view(ctrl, args) {
        const { title, icon, onclick, selected, progress } = args;
        return (
            <a
                class={ classNames('menu-option', { 'menu-option--selected': selected, 'menu-option--progress': progress }) }
                onclick={ onclick }
                disabled={ Boolean(onclick) }
            >
                { progress && (
                    <div
                        class="menu-option-progress-bar"
                        style={ `width: ${ Math.max(0, Math.min(100, 100 * progress)) }%;` }
                    />
                ) || null }
                <div class="menu-option--label">{ icon }{ lang.get(title) }</div>
            </a>
        );
    },
};

export default MenuOption;
