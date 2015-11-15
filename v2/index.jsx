import 'font-awesome-webpack';
import './index.scss';
import { uids } from './data/champions.js';
import app from './service/app.js';
import teams from './service/teams.js';
import router from './service/router.js';
import App from './view/app/App.jsx';
import Card from './view/Card.jsx';
import Guide, { tab as guideTab, menu as guideMenu } from './view/page/Guide.jsx';
import Roster, { tab as rosterTab, menu as rosterMenu } from './view/page/Roster.jsx';
import RosterAdd, { menu as rosterAddMenu } from './view/page/RosterAdd.jsx';
import Teams, { tab as teamsTab, menu as teamsMenu } from './view/page/Teams.jsx';
import Synergy, { tab as synergyTab, menu as synergyMenu } from './view/page/Synergy.jsx';
import m from 'mithril';

router.on('/guide', () => {
    router.setRoute(`/guide/${ uids[ 0 ] }`);
});

router.on('/guide/:uid', (uid) => {
    app.tab = 'guide';
    app.pages[ 'guide' ] = (
        <Guide uid={ uid } />
    );
    app.menu = guideMenu;
    app.menuKey = uid;
    m.redraw();
});

router.on('/roster', () => {
    app.tab = 'roster';
    app.pages[ 'roster-main' ] = (
        <Roster />
    );
    app.pages[ 'roster' ] = (
        <Card
            front={ app.pages[ 'roster-main' ] }
            back={ app.pages[ 'roster-add' ] }
            flipped={ false }
        />
    );
    app.menu = rosterMenu;
    app.menuKey = null;
    m.redraw();
});

router.on('/roster/add/:stars', (stars) => {
    app.tab = 'roster';
    app.pages[ 'roster-add' ] = (
        <RosterAdd stars={ parseInt(stars, 10) } />
    );
    app.pages[ 'roster' ] = (
        <Card
            front={ app.pages[ 'roster-main' ] }
            back={ app.pages[ 'roster-add' ] }
            flipped={ true }
        />
    );
    app.menu = rosterAddMenu;
    app.menuKey = stars;
    m.redraw();
});

router.on('/roster/:uid/:stars', (uid, stars) => {
    app.tab = 'roster';
    app.pages[ 'roster-main' ] = (
        <Roster selected={ { uid, stars: parseInt(stars, 10) } } />
    );
    app.pages[ 'roster' ] = (
        <Card
            front={ app.pages[ 'roster-main' ] }
            back={ app.pages[ 'roster-add' ] }
            flipped={ false }
        />
    );
    app.menu = rosterMenu;
    app.menuKey = null;
    m.redraw();
});

router.on('/teams', () => {
    app.tab = 'teams';
    app.pages[ 'teams' ] = (
        <Teams />
    );
    app.menu = teamsMenu;
    app.menuKey = teams;
    m.redraw();
});

router.on('/synergy', () => {
    router.setRoute(`/synergy/${ 2 }`);
});

router.on('/synergy/:stars', (stars) => {
    app.tab = 'synergy';
    app.pages[ 'synergy' ] = (
        <Synergy stars={ parseInt(stars, 10) } />
    );
    app.menu = synergyMenu;
    app.menuKey = stars;
    m.redraw();
});

app.tabs = [
    guideTab,
    rosterTab,
    teamsTab,
    synergyTab,
];

m.mount(document.body, (
    <App />
));
router.init('/roster');
document.addEventListener('hotreload', () => {
    m.redraw();
});
