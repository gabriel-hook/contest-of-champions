import './Menu.scss';
import MenuHeader from './Menu/MenuHeader.jsx';
import MenuSection from './Menu/MenuSection.jsx';
import MenuOption from './Menu/MenuOption.jsx';
import MenuIcon from './Menu/MenuIcon.jsx';
import MenuImage from './Menu/MenuImage.jsx';
import lang from '../../service/lang.js';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

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
        const { menu } = args;
        // header
        options.push(
            <MenuHeader title="options" />
        );
        if(menu) {
            options.push(menu);
        }
        // languages
        options.push(
            <MenuSection
                icon={(
                    <MenuIcon icon="globe" />
                )}
                title="language"
            />
        );
        for(const id in lang.messages) {
            const selectLanguage = lang.change.bind(lang, id);
            options.push(
                <MenuOption
                    selected={ lang.current === id }
                    icon={(
                        <MenuImage src={ `images/lang/${ id }.png` } />
                    )}
                    title={ lang.messages[ id ].lang }
                    onclick={ selectLanguage }
                />
            );
        }
        // share
        options.push(
            <MenuSection title="share-to" />
        );
        options.push(
            <MenuOption
                icon={
                    <MenuIcon icon="google" />
                }
                title="google"
            />
        );
        options.push(
            <MenuOption
                icon={
                    <MenuIcon icon="facebook" />
                }
                title="facebook"
            />
        );
        options.push(
            <MenuOption
                icon={
                    <MenuIcon icon="twitter" />
                }
                title="twitter"
            />
        );
        return (
            <div class={ `menu ${ isOpen? 'menu--open': '' }` }>
                <div class="menu--background" onclick={ ctrl.toggle }></div>
                <div class="wrapper">
                    <ul class="menu--options">
                        { options }
                    </ul>
                    <div class="menu--button" onclick={ ctrl.toggle }>
                        <MenuIcon icon="bars" />
                    </div>
                </div>
            </div>
        );
    },
};

export default Menu;
