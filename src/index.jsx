import 'babel-polyfill';
import 'font-awesome-webpack';
import './index.scss';
import { requestRender } from './util/animation';
import { uids } from './data/champions';
import app from './service/app';
import router from './service/router';
import teams from './service/teams';
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
    m.redraw();
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
        onclick: () => router.setRoute('/roster/add/2'),
    };
    m.redraw();
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
        <RosterAddMenu stars={ stars } />
    );
    app.button = {
        icon: 'share',
        onclick: () => router.setRoute('/roster'),
    };
    m.redraw();
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
    m.redraw();
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
    m.redraw();
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
    m.redraw();
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
    m.redraw();
});

router.on('.*', () => router.setRoute('roster'));

app.tabs = [
    {
        id: 'guide',
        icon: 'user',
        title: 'guide',
    },
    {
        id: 'roster',
        icon: 'th',
        title: 'roster',
    },
    {
        id: 'teams',
        icon: 'cog',
        spin: () => teams.building,
        title: 'teams',
    },
    {
        id: 'synergy',
        icon: 'users',
        title: 'synergy',
    },
];

m.mount(document.body, (
    <App />
));
router.init('/roster');
document.addEventListener('hotreload', () => m.redraw());
window.addEventListener('resize', () => requestRender('resize', m.redraw), true);
