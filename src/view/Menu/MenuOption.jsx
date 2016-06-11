import './MenuOption.scss';
import router from '../../service/router';
import classNames from 'classnames';
import lang from '../../service/lang';
import { requestRedraw } from '../../util/animation';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

function linkIsExternal(href) {
    return href.startsWith('http') || href.startsWith('//');
}

const MenuOption = {
    view(ctrl, {
        info, raw, alternate, title, icon, onclick, href,
        download, selected, invalid, progress, red,
        options,
    }) {
        let link = {};
        if(href) {
            const isExternal = linkIsExternal(href);
            link = {
                ...link,
                href: isExternal? href: `#${ href }`,
                target: '_blank',
                onclick: (onclick)? null: (event) => {
                    if(!isExternal) {
                        event.preventDefault();
                    }
                    router.setRoute(href);
                    requestRedraw();
                },
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
                role="menuitem"
                aria-label={ lang.get(title) || lang.get(info) }
                class={ classNames('menu-option', {
                    'menu-option--options': options,
                    'menu-option--invalid': invalid,
                    'menu-option--selected': selected,
                    'menu-option--progress': progress,
                    'menu-option--red': red === true || red === 'true',
                }, 'no-select') }
                title={ lang.get(info) || '' }
                onclick={ onclick }
                { ...link }
                disabled={ !(onclick || link) }
            >
                { (progress || progress === 0) && (
                    <div
                        aria-valuenow={ Math.max(0, Math.min(100, 100 * progress)) }
                        aria-valuemin="0"
                        aria-valuemax="100"
                        class="menu-option-progress-bar"
                        style={ `width: ${ Math.max(0, Math.min(100, 100 * progress)) }%; transition: ${ (progress <= 0)? 'none': 'width .3s linear' };` }
                    />
                ) || null }
                <div class="menu-option--label">{ icon }{ raw || lang.get(alternate, null) || lang.get(title) }</div>
                { options && (
                    <div class="menu-option-options">
                        { options}
                    </div>
                ) }
            </a>
        );
    },
};

export default MenuOption;
