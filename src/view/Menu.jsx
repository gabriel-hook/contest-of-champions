import './Menu.scss';
import classNames from 'classnames';
import router from '../service/router';
import lang from '../service/lang';
import MenuSection from './Menu/MenuSection.jsx';
import MenuOptionGroup from './Menu/MenuOptionGroup.jsx';
import MenuOption from './Menu/MenuOption.jsx';
import Icon from './Icon.jsx';
import ImageIcon from './ImageIcon.jsx';
import { requestRedraw } from '../util/animation';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const Menu = {
    controller(/* args */) {
        this.open = false;
        this.toggle = () => {
            this.open = !this.open;
            requestRedraw();
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
                            onclick={ () => {
                                router.setRoute(`/${ tab.id }`);
                                requestRedraw(2);
                            }}
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
        //language
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
        // links
        options.push(
            <MenuSection
                icon={
                    <Icon icon="share" />
                }
                title="links"
            />
        );
        options.push(
            <MenuOption
                icon={
                    <Icon icon="bomb" />
                }
                title="link-kabam"
                href="http://community.kabam.com/forums/forumdisplay.php?1239-Marvel-Contest-of-Champions"
            />
        );
        options.push(
            <MenuOption
                icon={
                    <Icon icon="reddit-alien" />
                }
                title="link-reddit"
                href="http://reddit.com/r/ContestOfChampions"
            />
        );
        options.push(
            <MenuOption
                icon={
                    <Icon icon="github" />
                }
                title="link-github"
                href="//github.com/hook/champions"
            />
        );
        // links
        options.push(
            <MenuSection
                icon={
                    <Icon icon="share-alt" />
                }
                title="share-to"
            />
        );
        const escapedUrl = encodeURIComponent('http://hook.github.io/champions');
        options.push(
            <MenuOptionGroup
                options={[
                (
                    <MenuOption
                        icon={
                            <Icon icon="google-plus" />
                        }
                       href={ `https://plus.google.com/share?url=${ escapedUrl }` }
                    />
                ),
                (
                    <MenuOption
                        icon={
                            <Icon icon="facebook" />
                        }
                       href={ `http://www.facebook.com/sharer/sharer.php?u=${ escapedUrl }` }
                    />
                ),
                (
                    <MenuOption
                        icon={
                            <Icon icon="twitter" />
                        }
                       href={ `https://twitter.com/share?url=${ escapedUrl }` }
                    />
                ),
                (
                    <MenuOption
                        icon={
                            <Icon icon="pinterest-p" />
                        }
                       href={ `http://pinterest.com/pin/create/link/?url=${ escapedUrl }` }
                    />
                ),
                (
                    <MenuOption
                        icon={
                            <Icon icon="linkedin-square" />
                        }
                       href={ `https://www.linkedin.com/cws/share?url=${ escapedUrl }` }
                    />
                ),
                ]}
            />
        );
        return (
            <div class={ classNames('menu', { 'menu--open': isOpen }) }>
                <div class="menu-background" onclick={ ctrl.toggle }></div>
                <div class="menu-wrapper">
                    <div class="menu-options">
                        { options }
                    </div>
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
