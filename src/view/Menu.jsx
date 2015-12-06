import './Menu.scss';
import classNames from 'classnames';
import router from '../service/router';
import lang from '../service/lang';
import MenuSection from './Menu/MenuSection.jsx';
import MenuOptionGroup from './Menu/MenuOptionGroup.jsx';
import MenuOption from './Menu/MenuOption.jsx';
import Icon from './Icon.jsx';
import ImageIcon from './ImageIcon.jsx';
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
        const { tabs, tab: currentTab, menu, button } = args;
        const buttonLeft = button && (
            <div class="menu-button menu-button-sub" onclick={ button.onclick }>
                <Icon icon={ button.icon } />
            </div>
        );
        options.push(
            <div class="menu-tabs">
                <MenuOptionGroup
                    options={ tabs.map((tab) => (
                        <MenuOption
                            icon={
                                <Icon icon={ tab.icon } spin={ tab.spin } />
                            }
                            selected={ currentTab === tab.id }
                            onclick={ () => router.setRoute(`/${ tab.id }`) }
                        />
                    )) }
                    tabs="true"
                />
            </div>
        );
        if(menu) {
            options.push(
                <div>
                    { menu }
                </div>
            );
        }
        options.push(
            <MenuSection
                icon={
                    <Icon icon="globe" />
                }
                title="language"
            />
        );
        for(const id in lang.messages) {
            const selectLanguage = lang.change.bind(lang, id);
            options.push(
                <MenuOption
                    selected={ lang.current === id }
                    icon={
                        <ImageIcon src={ `images/lang/${ id }.png` } icon="flag" />
                    }
                    title={ lang.messages[ id ].lang }
                    onclick={ selectLanguage }
                />
            );
        }
        // share
        options.push(
            <MenuSection
                icon={
                    <Icon icon="share-alt" />
                }
                title="share-to"
            />
        );
        options.push(
            <MenuOption
                icon={
                    <Icon icon="google" />
                }
                title="google"
                href="https://plus.google.com/share?url=http://hook.github.io/champions"
            />
        );
        options.push(
            <MenuOption
                icon={
                    <Icon icon="facebook" />
                }
                title="facebook"
                href="http://www.facebook.com/sharer/sharer.php?u=http://hook.github.io/champions"
            />
        );
        options.push(
            <MenuOption
                icon={
                    <Icon icon="twitter" />
                }
                title="twitter"
                href="https://twitter.com/share?url=http://hook.github.io/champions"
            />
        );
        return (
            <div class={ classNames('menu', { 'menu--open': isOpen }) }>
                <div class="menu-background" onclick={ ctrl.toggle }></div>
                <div class="menu-wrapper">
                    <ul class="menu-options">
                        { options }
                    </ul>
                    <div class="menu-button menu-button-main" onclick={ ctrl.toggle }>
                        <div class="menu-button-bar" />
                        <div class="menu-button-bar" />
                        <div class="menu-button-bar" />
                    </div>
                </div>
                { buttonLeft }
            </div>
        );
    },
};

export default Menu;
