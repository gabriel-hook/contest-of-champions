import './index.scss';
import Roster from './view/Roster.jsx';
import m from 'mithril';
import router from './service/router.js';

const app = {
	page: 'roster',
	champion: null,
};
const App = {
	view(){
		const page = app.page;
		const selected = app.champion;
		return (
			<Roster selected={ selected } />
		);
	}
};

m.mount(document.body, (
	<App />
));

document.addEventListener('hotreload', function(){
	console.log('got hot reload event!');
	m.redraw();
});

router.on('/roster', () => {
	app.page = 'roster';
	app.champion = null;
  	m.redraw();
});
router.on('/roster/:champion', (champion) => {
	app.page = 'roster';
	app.champion = champion;
  	m.redraw();
});

router.init('/roster');
