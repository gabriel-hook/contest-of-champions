import './App.scss';
import Navigation from './Navigation.jsx';
import app from '../../service/app.js';
import m from 'mithril';

const App = {
	view(){
		const { tabs, tab, pages } = app;
		const currentPage = tab;
		return (
			<div class="app">
				<div class="pages">
					{tabs.map((tab) => (
						<div class={ `page ${ currentPage === tab.id? 'page--current': '' }` }>
							{ pages[tab.id] }
						</div>
					))}
				</div>
				<Navigation tabs={ tabs } tab={ tab } />
			</div>
		)
	}
};

export default App;
