import 'babel-polyfill';
import 'font-awesome-webpack';
import './index.scss';
import { uids } from './data/champions.js';
import app from './service/app.js';
import router from './service/router.js';
import teams from './service/teams.js';
import App from './view/App.jsx';
import Card from './view/Card.jsx';
import GuidePage from './view/Page/GuidePage.jsx';
import GuideMenu from './view/Page/GuideMenu.jsx';
import RosterPage from './view/Page/RosterPage.jsx';
import RosterMenu from './view/Page/RosterMenu.jsx';
import RosterAddPage from './view/Page/RosterAddPage.jsx';
import RosterAddMenu from './view/Page/RosterAddMenu.jsx';
import TeamsPage from './view/Page/TeamsPage.jsx';
import TeamsMenu from './view/Page/TeamsMenu.jsx';
import TeamsSettingsPage from './view/Page/TeamsSettingsPage.jsx';
import TeamsSettingsMenu from './view/Page/TeamsSettingsMenu.jsx';
import SynergyPage from './view/Page/SynergyPage.jsx';
import SynergyMenu from './view/Page/SynergyMenu.jsx';
import { requestRender } from './util/animation.js';
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
    app.pages[ 'roster-main' ] = (
        <RosterPage />
    );
    app.pages[ 'roster' ] = (
        <Card
            front={ app.pages[ 'roster-main' ] }
            back={ app.pages[ 'roster-add' ] }
            flipped={ false }
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
            front={ app.pages[ 'roster-main' ] }
            back={ app.pages[ 'roster-add' ] }
            flipped={ true }
        />
    );
    app.menu = (
        <RosterAddMenu stars={ stars } />
    );
    app.button = {
        icon: 'th',
        onclick: () => router.setRoute('/roster'),
    };
    m.redraw();
});

router.on('/roster/:uid/:stars', (uid, stars) => {
    app.tab = 'roster';
    app.pages[ 'roster-main' ] = (
        <RosterPage selected={ { uid, stars: parseInt(stars, 10) } } />
    );
    app.pages[ 'roster' ] = (
        <Card
            front={ app.pages[ 'roster-main' ] }
            back={ app.pages[ 'roster-add' ] }
            flipped={ false }
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

router.on('/teams/settings', () => {
    app.tab = 'teams';
    app.pages[ 'teams-settings' ] = (
        <TeamsSettingsPage />
    );
    app.pages[ 'teams' ] = (
        <Card
            front={ app.pages[ 'teams-main' ] }
            back={ app.pages[ 'teams-settings' ] }
            flipped={ true }
        />
    );
    app.menu = (
        <TeamsSettingsMenu />
    );
    app.button = {
        icon: 'chevron-circle-left',
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
            front={ app.pages[ 'teams-main' ] }
            back={ app.pages[ 'teams-settings' ] }
            flipped={ false }
        />
    );
    app.menu = (
        <TeamsMenu />
    );
    app.button = {
        icon: 'cogs',
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
