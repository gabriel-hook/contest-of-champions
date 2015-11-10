import 'font-awesome-webpack';
import './index.scss';
import { uids } from './data/champions.js';
import app from './service/app.js';
import roster from './service/roster.js';
import router from './service/router.js';
import App from './view/app/App.jsx';
import Roster from './view/page/Roster.jsx';
import RosterAdd from './view/page/RosterAdd.jsx';
import Teams from './view/page/Teams.jsx';
import Synergy from './view/page/Synergy.jsx';
import m from 'mithril';

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
	app.menu = {
		header:{
			title: 'roster',
			icon: 'th',
		},
		options:[
			{
				title: 'add-champion',
				icon: 'user-plus',
				onclick: () => router.setRoute('/roster/add/2'),
			},

			{
				title: 'import-csv',
				icon: 'clipboard',
			},
			{
				title: 'export-csv',
				icon: 'floppy-o',
			},

			{
				title: 'delete-all',
				icon: 'user-times',
				onclick: () => {
					roster.clear();
  					m.redraw();
				},
			},
		],
	};
  	m.redraw();
});

router.on('/roster/add/:stars', (stars)=> {
	app.tab = 'roster';
	app.pages['roster'] = (
		<RosterAdd stars={ parseInt(stars, 10) } />
	);
	app.menu = {
		header:{
			title: 'add-champion',
			icon: 'user-plus',
		},
		options:[
			{
				title: '★',
				selected: stars === '1',
				onclick: () => router.setRoute('/roster/add/1'),
			},
			{
				title: '★★',
				selected: stars === '2',
				onclick: () => router.setRoute('/roster/add/2'),
			},
			{
				title: '★★★',
				selected: stars === '3',
				onclick: () => router.setRoute('/roster/add/3'),
			},
			{
				title: '★★★★',
				selected: stars === '4',
				onclick: () => router.setRoute('/roster/add/4'),
			},
			{
				title: '★★★★★',
				selected: stars === '5',
				onclick: () => router.setRoute('/roster/add/5'),
			},
		],
	};
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
	app.menu = {
	};
  	m.redraw();
});

router.on('/synergy', () => {
	router.setRoute(`/synergy/${ 2 }`);
});

router.on('/synergy/:stars', (stars) => {
	app.tab = 'synergy';
	app.pages['synergy'] = (
		<Synergy stars={ parseInt(stars, 10) } />
	);
	app.menu = {
		header:{
			title: 'synergies',
			icon: 'users',
		},
		options:[
			{
				title: '★',
				selected: stars === '1',
				onclick: () => router.setRoute('/synergy/1'),
			},
			{
				title: '★★',
				selected: stars === '2',
				onclick: () => router.setRoute('/synergy/2'),
			},
			{
				title: '★★★',
				selected: stars === '3',
				onclick: () => router.setRoute('/synergy/3'),
			},
			{
				title: '★★★★',
				selected: stars === '4',
				onclick: () => router.setRoute('/synergy/4'),
			},
			{
				title: '★★★★★',
				selected: stars === '5',
				onclick: () => router.setRoute('/synergy/5'),
			},
		],
	};
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
		title: 'teams',
	},
	{
		id: 'synergy',
		icon: 'users',
		title: 'synergies',
	},
];

m.mount(document.body, (
	<App />
));
router.init('/roster');
document.addEventListener('hotreload', function(){
	m.redraw();
});
