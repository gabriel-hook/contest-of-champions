import 'font-awesome-webpack';
import './index.scss';
import App from './view/app/App.jsx';
import Roster from './view/page/Roster.jsx';
import Teams from './view/page/Teams.jsx';
import m from 'mithril';
import { uids } from './data/champions.js';
import router from './service/router.js';
import app from './service/app.js';

router.on('/guide', () => {
	router.setRoute(`/guide/${ uids[0] }`);
});

router.on('/guide/:uid', (uid) => {
	app.tab = 'guide';
  	m.redraw();
});

router.on('/roster', () => {
	app.tab = 'roster';
	app.pages['roster'] = (
		<Roster />
	);
  	m.redraw();
});
router.on('/roster/:uid/:stars', (uid, stars)=> {
	app.tab = 'roster';
	app.pages['roster'] = (
		<Roster selected={ { uid, stars: parseInt(stars, 10) } } />
	);
  	m.redraw();
});

router.on('/teams', () => {
	app.tab = 'teams';
	app.pages['teams'] = (
		<Teams />
	);
  	m.redraw();
});

router.on('/synergy', () => {
	app.tab = 'synergy';
  	m.redraw();
});

app.tabs = [
	{
		id: 'guide',
		icon: 'user',
		title: 'Guide',
	},
	{
		id: 'roster',
		icon: 'th',
		title: 'Roster',
	},
	{
		id: 'teams',
		icon: 'cog',
		title: 'Teams',
	},
	{
		id: 'synergy',
		icon: 'users',
		title: 'Synergy',
	},
];

m.mount(document.body, (
	<App />
));
router.init('/roster');
document.addEventListener('hotreload', function(){
	m.redraw();
});
