import './Menu.scss';
import lang from '../../service/lang.js';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

function clickAndClose(click, close) {
    return () => click() && close();
}

function $icon(icon) {
    return icon && (
        <i class={ `fa fa-${ icon }` } />
    );
}
function $image(src) {
    return src && (
        <i class="icon">
            <img src={ src } />
        </i>
    );
}

const Menu = {
    controller(/* args */) {
        this.open = false;
        this.toggle = () => {
            this.open = !this.open;
        };
    },
    view(ctrl, args) {
        const isOpen = ctrl.open;
        const options = [];
        const { menu, menuKey } = args;
        // header
        options.push(
            <li class="option--header">
                { lang.get('options') }
            </li>
        );
        if(menu) {
            if(menu.header) {
                const icon = $icon(menu.header.icon);
                const image = $image(menu.header.image);
                options.push(
                    <li class="option--section">
                        { icon }
                        { image }
                        { lang.get(menu.header.title) }
                    </li>
                );
            }
            if(menu.options && menu.options.length) {
                menu.options.forEach((option) => {
                    const header = option.header;
                    const icon = $icon(option.icon);
                    const image = $image(option.image);
                    let selected = menuKey && option.selected && option.selected(menuKey);
                    const type = option.type || 'default';
                    let control;
                    if(type === 'check') {
                        control = selected? $icon('check-square-o'): $icon('fa-square-o');
                        selected = null;
                    }
                    else if(type === 'radio') {
                        control = selected? $icon('fa fa-dot-circle-o'): $icon('fa fa-circle-o');
                        selected = null;
                    }
                    const split = option.split;
                    const onClick = option.onclick &&
                        clickAndClose(option.onclick, ctrl.toggle) ||
                        null;
                    options.push(
                        <li
                            class={ header?
                                'option--section':
                                `option ${
                                    selected? 'option--selected': ''
                                } ${
                                    split? `option--split-${ split }`: ''
                                }`
                            }
                            onclick={ onClick }
                        >
                            { control }
                            { icon }
                            { image }
                            { lang.get(option.title) }
                        </li>
                    );
                });
            }
        }
        // languages
        options.push(
            <li class="option--section">
                { $icon('globe') }
                { lang.get('language') }
            </li>
        );
        for(const id in lang.messages) {
            const selectLanguage = lang.change.bind(lang, id);
            options.push(
                <li
                    class={
                        `option ${
                            lang.current === id? 'option--selected': ''
                        }`
                    }
                    onclick={ selectLanguage }
                >
                    { $image(`../images/lang/${ id }.png`) }
                    { lang.messages[ id ].lang }
                </li>
            );
        }
        // share
        options.push(
            <li class="option--section">
                { lang.get('share-to') }
            </li>
        );
        for(const { id, icon } of [
            {
                id: 'google',
                icon: 'google',

            },
            {
                id: 'facebook',
                icon: 'facebook',
            },
            {
                id: 'twitter',
                icon: 'twitter',
            },
        ]) {
            options.push(
                <li class="option">
                    { $icon(icon) }
                    { lang.get(id) }
                </li>
            );
        }
        return (
            <div class={ `menu ${ isOpen? 'menu--open': '' }` }>
                <div class="menu--background" onclick={ ctrl.toggle }></div>
                <div class="wrapper">
                    <ul class="menu--options">
                        { options }
                    </ul>
                    <div class="menu--button" onclick={ ctrl.toggle }>
                        { $icon('bars') }
                    </div>
                </div>
            </div>
        );
    },
};

export default Menu;
