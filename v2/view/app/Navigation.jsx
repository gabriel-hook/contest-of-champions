import './Navigation.scss';
import router from '../../service/router.js';
import lang from '../../service/lang.js';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const Navigation = {
    view(ctrl, args) {
        const { tab: currentTab, tabs } = args;

        const buttons = tabs.map((tab) => {
            const className = `navigation-tab ${ (currentTab === tab.id)? 'navigation-tab--current': '' }`;
            const handleClick = (/* evt */) => router.setRoute(`/${ tab.id }`);
            let icon;
            if(tab.icon)
                icon = (
                    <div class="icon">
                        <i class={ `fa fa-${ tab.icon }` } />
                    </div>
                );
            return (
                <button class={ className } onclick={ handleClick }>
                    { icon }
                    { lang.get(tab.title) }
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
