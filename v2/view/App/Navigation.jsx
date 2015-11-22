import './Navigation.scss';
import Icon from '../Icon.jsx';
import router from '../../service/router.js';
import lang from '../../service/lang.js';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const Navigation = {
    view(ctrl, args) {
        const { tab: currentTab, tabs } = args;

        const buttons = tabs.map((tab) => {
            return (
                <button
                    class={ `navigation-tab ${ (currentTab === tab.id)? 'navigation-tab--current': '' }` }
                    onclick={ () => router.setRoute(`/${ tab.id }`) }
                >
                    <Icon icon={ tab.icon } />
                    <div class="navigation-tab-title">
                        { lang.get(tab.title) }
                    </div>
                </button>
            );
        });

        return (
            <header class={ `navigation navigation--count-${ buttons.length }` }>
                { buttons }
            </header>
        );
    },
};

export default Navigation;
