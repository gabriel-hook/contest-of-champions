import './App.scss';
import Navigation from './Navigation.jsx';
import Menu from './Menu.jsx';
import app from '../../service/app.js';
import m from 'mithril';

const App = {
	view(){
		const { tabs, tab, pages, menu } = app;
		const currentPage = tab;
		return (
			<div class="app">
				<div class="pages">
					<div class="wrapper">
					{tabs.map((tab) => (
						<div class={ `page ${ currentPage === tab.id? 'page--current': '' }` }>
							{ pages[tab.id] }
						</div>
					))}
					</div>
				</div>
				<Navigation tabs={ tabs } tab={ tab } />
				<Menu menu={ menu } />
			</div>
		)
	}
};

export default App;
