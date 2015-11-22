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
import SynergyPage from './view/Page/SynergyPage.jsx';
import SynergyMenu from './view/Page/SynergyMenu.jsx';
import { requestRender } from './util/animation.js';
import m from 'mithril';

router.on('/guide', () => {
    router.setRoute(`/guide/${ uids[ 0 ] }`);
});

router.on('/guide/:uid', (uid) => {
    app.tab = 'guide';
    app.pages[ 'guide' ] = (
        <GuidePage uid={ uid } />
    );
    app.menu = (
        <GuideMenu uid={ uid } />
    );
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
    m.redraw();
});

router.on('/teams', () => {
    app.tab = 'teams';
    app.pages[ 'teams' ] = (
        <TeamsPage />
    );
    app.menu = null;

    app.menu = (
        <TeamsMenu />
    );
    m.redraw();
});

router.on('/synergy', () => {
    router.setRoute(`/synergy/${ 2 }`);
});

router.on('/synergy/:stars', (stars) => {
    app.tab = 'synergy';
    app.pages[ 'synergy' ] = (
        <SynergyPage stars={ parseInt(stars, 10) } />
    );
    app.menu = (
        <SynergyMenu stars={ stars } />
    );
    m.redraw();
});

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
