import 'babel-polyfill';
import 'font-awesome-webpack';
import './index.scss';
import { uids } from './data/champions';
import app from './service/app';
import router from './service/router';
import analytics from './service/analytics';
import App from './view/App.jsx';
import Card from './view/Card.jsx';
import GuidePage from './view/Page/GuidePage.jsx';
import GuideMenu from './view/Page/GuideMenu.jsx';
import RosterPage from './view/Page/RosterPage.jsx';
import RosterMenu from './view/Page/RosterMenu.jsx';
import RosterAddPage from './view/Page/RosterAddPage.jsx';
import RosterAddMenu from './view/Page/RosterAddMenu.jsx';
import RosterEditPage from './view/Page/RosterEditPage.jsx';
import RosterEditMenu from './view/Page/RosterEditMenu.jsx';
import TeamsPage from './view/Page/TeamsPage.jsx';
import TeamsMenu from './view/Page/TeamsMenu.jsx';
import TeamsSettingsPage from './view/Page/TeamsSettingsPage.jsx';
import TeamsSettingsMenu from './view/Page/TeamsSettingsMenu.jsx';
import SynergyPage from './view/Page/SynergyPage.jsx';
import SynergyMenu from './view/Page/SynergyMenu.jsx';
import { requestRedraw } from './util/animation';
import m from 'mithril';

router.on('/guide', () => router.setRoute(`/guide/${ uids[ 0 ] }`));

router.on('/guide/:uid', (uid) => {
    app.tab = 'guide';
    app.pages[ 'guide' ] = (
        <GuidePage uid={ uid } />
    );
    app.menu = (
        <GuideMenu uid={ uid } />
    );
    app.button = null;
    analytics.pageView();
    requestRedraw();
});

router.on('/roster', () => {
    app.tab = 'roster';
    app.pages[ 'roster-show' ] = (
        <RosterPage />
    );
    app.pages[ 'roster' ] = (
        <Card
            cards={[
                app.pages[ 'roster-add' ],
                app.pages[ 'roster-show' ],
                app.pages[ 'roster-edit' ],
            ]}
            current={ 1 }
        />
    );
    app.menu = (
        <RosterMenu />
    );
    app.button = {
        icon: 'user-plus',
        onclick: () => router.setRoute(`/roster/add/${ app.lastAddStars || 2 }`),
    };
    analytics.pageView();
    requestRedraw();
});

router.on('/roster/add/:stars', (stars) => {
    app.tab = 'roster';
    app.pages[ 'roster-add' ] = (
        <RosterAddPage stars={ parseInt(stars, 10) } />
    );
    app.pages[ 'roster' ] = (
        <Card
            cards={[
                app.pages[ 'roster-add' ],
                app.pages[ 'roster-show' ],
                app.pages[ 'roster-edit' ],
            ]}
            current={ 0 }
        />
    );
    app.menu = (
        <RosterAddMenu />
    );
    app.button = {
        icon: 'share',
        onclick: () => router.setRoute('/roster'),
    };
    app.lastAddStars = stars;
    analytics.pageView();
    requestRedraw();
});

router.on('/roster/:uid/:stars', (uid, stars) => {
    app.tab = 'roster';
    app.pages[ 'roster-edit' ] = (
        <RosterEditPage uid={ uid } stars={ parseInt(stars, 10) } />
    );
    app.pages[ 'roster' ] = (
        <Card
            cards={[
                app.pages[ 'roster-add' ],
                app.pages[ 'roster-show' ],
                app.pages[ 'roster-edit' ],
            ]}
            current={ 2 }
        />
    );
    app.menu = (
        <RosterEditMenu uid={ uid } stars={ parseInt(stars, 10) } />
    );
    app.button = {
        icon: 'reply',
        onclick: () => router.setRoute('/roster'),
    };
    analytics.pageView();
    requestRedraw();
});

router.on('/teams/settings', () => {
    app.tab = 'teams';
    app.pages[ 'teams-settings' ] = (
        <TeamsSettingsPage />
    );
    app.pages[ 'teams' ] = (
        <Card
            cards={[
                app.pages[ 'teams-main' ],
                app.pages[ 'teams-settings' ],
            ]}
            current={ 1 }
        />
    );
    app.menu = (
        <TeamsSettingsMenu />
    );
    app.button = {
        icon: 'reply',
        onclick: () => router.setRoute('/teams'),
    };
    analytics.pageView();
    requestRedraw();
});

router.on('/teams', () => {
    app.tab = 'teams';
    app.pages[ 'teams-main' ] = (
        <TeamsPage />
    );
    app.pages[ 'teams' ] = (
        <Card
            cards={[
                app.pages[ 'teams-main' ],
                app.pages[ 'teams-settings' ],
            ]}
            current={ 0 }
        />
    );
    app.menu = (
        <TeamsMenu />
    );
    app.button = {
        icon: 'sliders',
        onclick: () => router.setRoute('/teams/settings'),
    };
    analytics.pageView();
    requestRedraw();
});

router.on('/synergy', () => router.setRoute(`/synergy/${ 2 }`));

router.on('/synergy/:stars', (stars) => {
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
        icon: 'area-chart',
    },
];

m.mount(document.body, (
    <App />
));
router.init('/roster');
document.addEventListener('hotreload', () => requestRedraw());
window.addEventListener('resize', () => requestRedraw(0), true);
