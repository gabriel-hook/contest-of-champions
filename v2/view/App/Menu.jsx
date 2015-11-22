import './Menu.scss';
import classNames from 'classnames';
import MenuHeader from './Menu/MenuHeader.jsx';
import MenuSection from './Menu/MenuSection.jsx';
import MenuOption from './Menu/MenuOption.jsx';
import Icon from '../Icon.jsx';
import ImageIcon from '../ImageIcon.jsx';
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
                    <Icon icon="globe" />
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
                        <ImageIcon src={ `images/lang/${ id }.png` } />
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
                    <Icon icon="google" />
                }
                title="google"
            />
        );
        options.push(
            <MenuOption
                icon={
                    <Icon icon="facebook" />
                }
                title="facebook"
            />
        );
        options.push(
            <MenuOption
                icon={
                    <Icon icon="twitter" />
                }
                title="twitter"
            />
        );
        return (
            <div class={ classNames('menu', { 'menu--open': isOpen }) }>
                <div class="menu--background" onclick={ ctrl.toggle }></div>
                <div class="wrapper">
                    <ul class="menu--options">
                        { options }
                    </ul>
                    <div class="menu--button" onclick={ ctrl.toggle }>
                        <Icon icon="bars" />
                    </div>
                </div>
            </div>
        );
    },
};

export default Menu;
