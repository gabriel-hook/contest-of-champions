import './App.scss';
import Navigation from './Navigation.jsx';
import Menu from './Menu.jsx';
import app from '../../service/app.js';
import m from 'mithril';

const App = {
	view(){
		const { tabs, tab, pages, menu, menuKey } = app;
		const currentPage = tab;
		return (
			<div class="app">
				<div class="pages" key={ 0 }>
					<div class="wrapper">
					{tabs.map((tab) => (
						<div class={ `page ${ currentPage === tab.id? 'page--current': '' }` }>
							{ pages[tab.id] }
						</div>
					))}
					</div>
				</div>
				<Navigation tabs={ tabs } tab={ tab } key={ 1 }/>
				<Menu menu={ menu } menuKey={ menuKey }  key={ 2 }/>
			</div>
		)
	}
};

export default App;
