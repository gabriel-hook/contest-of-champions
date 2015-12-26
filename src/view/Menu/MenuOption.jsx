import './MenuOption.scss';
import classNames from 'classnames';
import lang from '../../service/lang';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const MenuOption = {
    view(ctrl, args) {
        const { title, icon, onclick, href, download, selected, progress, red } = args;
        let link = {};
        if(href) {
            link = {
                ...link,
                href,
                target: '_blank',
            };
        }
        if(download) {
            link = {
                ...link,
                download,
                href: 'data:text/csv;charset=utf-8,',
            };
        }
        return (
            <a
                m="MenuOption"
                class={ classNames('menu-option', {
                    'menu-option--selected': selected,
                    'menu-option--progress': progress,
                    'menu-option--red': red === true || red === 'true',
                }, 'no-select') }
                { ...link }
                onclick={ onclick }
                disabled={ !Boolean(onclick || link) }
            >
                { (progress || progress === 0) && (
                    <div
                        class="menu-option-progress-bar"
                        style={ `width: ${ Math.max(0, Math.min(100, 100 * progress)) }%; transition: ${ (progress <= 0)? 'none': 'width .2s linear' };` }
                    />
                ) || null }
                <div class="menu-option--label">{ icon }{ lang.get(title) }</div>
            </a>
        );
    },
};

export default MenuOption;
