import 'babel-polyfill';
import 'font-awesome-webpack';
import './index.scss';
import { notify } from './util/notification';
import { uids } from './data/champions';
import lang from './service/lang';
import app from './service/app';
import router from './service/router';
import roster from './service/roster';
import analytics from './service/analytics';
import App from './view/App.jsx';
import Cards from './view/Cards.jsx';
import GuidePage from './view/App/GuidePage.jsx';
import GuideMenu from './view/App/GuideMenu.jsx';
import GuideEditPage from './view/App/GuideEditPage.jsx';
import GuideEditMenu from './view/App/GuideEditMenu.jsx';
import RosterPage from './view/App/RosterPage.jsx';
import RosterMenu from './view/App/RosterMenu.jsx';
import RosterAddPage from './view/App/RosterAddPage.jsx';
import RosterAddMenu from './view/App/RosterAddMenu.jsx';
import RosterEditPage from './view/App/RosterEditPage.jsx';
import RosterEditMenu from './view/App/RosterEditMenu.jsx';
import TeamsPage from './view/App/TeamsPage.jsx';
import TeamsMenu from './view/App/TeamsMenu.jsx';
import TeamsSettingsPage from './view/App/TeamsSettingsPage.jsx';
import TeamsSettingsMenu from './view/App/TeamsSettingsMenu.jsx';
import SynergyPage from './view/App/SynergyPage.jsx';
import SynergyMenu from './view/App/SynergyMenu.jsx';
import { requestRedraw } from './util/animation';
import m from 'mithril';

/**
 * Reset router if we are hot loading so we only get new routes.
 */
if(router._invoked) {
    router.destroy();
    router.routes = {};
}

router.on('/guide/?', () => router.setRoute(`/guide/${ uids[ 0 ] }`));

router.on('/guide/:uid/?', (uid) => {
    app.tab = 'guide';
    app.cards[ 'guide-show' ] = (
        <GuidePage uid={ uid } />
    );
    app.pages[ 'guide' ] = (
        <Cards
            cards={[
                app.cards[ 'guide-show' ],
                app.cards[ 'guide-edit' ],
            ]}
            current={ 0 }
        />
    );
    app.menu = (
        <GuideMenu uid={ uid } />
    );
    app.button = !app.edit? null: {
        icon: 'pencil',
        href: `/guide/${ uid }/edit`,
    };
    analytics.pageView();
    requestRedraw();
});

router.on('/guide/:uid/edit/?', (uid) => {
    app.edit = true;
    app.tab = 'guide';
    app.cards[ 'guide-edit' ] = (
        <GuideEditPage uid={ uid } />
    );
    app.pages[ 'guide' ] = (
        <Cards
            cards={[
                app.cards[ 'guide-show' ],
                app.cards[ 'guide-edit' ],
            ]}
            current={ 1 }
        />
    );
    app.menu = (
        <GuideEditMenu uid={ uid } />
    );
    app.button = {
        icon: 'reply',
        href: `/guide/${ uid }`,
    };
    analytics.pageView();
    requestRedraw();
});

router.on('/roster/?', () => {
    app.tab = 'roster';
    app.cards[ 'roster-show' ] = (
        <RosterPage />
    );
    app.pages[ 'roster' ] = (
        <Cards
            cards={[
                app.cards[ 'roster-add' ],
                app.cards[ 'roster-show' ],
                app.cards[ 'roster-edit' ],
            ]}
            current={ 1 }
        />
    );
    app.menu = (
        <RosterMenu />
    );
    app.button = {
        icon: 'user-plus',
        href: `/roster/add/${ app.lastAddStars || 2 }`,
    };
    analytics.pageView();
    requestRedraw();
    if(roster.all().length === 0) {
        notify({
            message: lang.get('notification-roster-empty'),
            tag: 'roster-empty',
            onclick: () => router.setRoute(`/roster/add/${ app.lastAddStars || 2 }`),
        });
    }
});

router.on('/roster/add/:stars/?', (stars) => {
    app.tab = 'roster';
    app.cards[ 'roster-add' ] = (
        <RosterAddPage stars={ parseInt(stars, 10) } />
    );
    app.pages[ 'roster' ] = (
        <Cards
            cards={[
                app.cards[ 'roster-add' ],
                app.cards[ 'roster-show' ],
                app.cards[ 'roster-edit' ],
            ]}
            current={ 0 }
        />
    );
    app.menu = (
        <RosterAddMenu />
    );
    app.button = {
        icon: 'share',
        href: '/roster',
    };
    app.lastAddStars = stars;
    analytics.pageView();
    requestRedraw();
});

router.on('/roster/:uid/:stars/?', (uid, stars) => {
    app.tab = 'roster';
    app.cards[ 'roster-edit' ] = (
        <RosterEditPage uid={ uid } stars={ parseInt(stars, 10) } />
    );
    app.pages[ 'roster' ] = (
        <Cards
            cards={[
                app.cards[ 'roster-add' ],
                app.cards[ 'roster-show' ],
                app.cards[ 'roster-edit' ],
            ]}
            current={ 2 }
        />
    );
    app.menu = (
        <RosterEditMenu uid={ uid } stars={ parseInt(stars, 10) } />
    );
    app.button = {
        icon: 'reply',
        href: '/roster',
    };
    analytics.pageView();
    requestRedraw();
});

router.on('/teams/settings/?', () => {
    app.tab = 'teams';
    app.cards[ 'teams-settings' ] = (
        <TeamsSettingsPage />
    );
    app.pages[ 'teams' ] = (
        <Cards
            cards={[
                app.cards[ 'teams-main' ],
                app.cards[ 'teams-settings' ],
            ]}
            current={ 1 }
        />
    );
    app.menu = (
        <TeamsSettingsMenu />
    );
    app.button = {
        icon: 'reply',
        href: '/teams',
    };
    analytics.pageView();
    requestRedraw();
});

router.on('/teams/?', () => {
    app.tab = 'teams';
    app.cards[ 'teams-main' ] = (
        <TeamsPage />
    );
    app.pages[ 'teams' ] = (
        <Cards
            cards={[
                app.cards[ 'teams-main' ],
                app.cards[ 'teams-settings' ],
            ]}
            current={ 0 }
        />
    );
    app.menu = (
        <TeamsMenu />
    );
    app.button = {
        icon: 'sliders',
        href: '/teams/settings',
    };
    analytics.pageView();
    requestRedraw();
});

router.on('/synergy/?', () => router.setRoute(`/synergy/${ 2 }`));

router.on('/synergy/:stars/?', (stars) => {
    app.tab = 'synergy';
    app.pages[ 'synergy' ] = (
        <SynergyPage stars={ parseInt(stars, 10) } />
    );
    app.menu = (
        <SynergyMenu stars={ stars } />
    );
    app.button = null;
    analytics.pageView();
    requestRedraw();
});

router.on('/lang/:lang/?(.*)', (langId, redirect) => {
    lang.change(langId);
    router.setRoute(`${ redirect }`);
});

router.on('.*', () => router.setRoute('roster'));

app.tabs = [
    {
        id: 'guide',
        title: 'guide',
        icon: 'user',
    },
    {
        id: 'roster',
        title: 'roster',
        icon: 'users',
    },
    {
        id: 'teams',
        title: 'teams',
        icon: 'cogs',
    },
    {
        id: 'synergy',
        title: 'synergy',
        icon: 'sitemap',
    },
];

m.mount(document.body, (
    <App />
));

router.init('/roster');
