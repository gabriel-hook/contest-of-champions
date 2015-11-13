import './Teams.scss';
import Message from '../Message.jsx';
import Champion from '../Champion.jsx';
import teams from '../../service/teams.js';
import router from '../../service/router.js';
import lang from '../../service/lang.js';
import m from 'mithril';

const tab = {
	id: 'teams',
	icon: 'cog',
	title: 'teams',
};

const menu = {

};

const Teams = {
	view(ctrl, args) {

		return (
			<div class="teams">
				<Message value={ `${ 0 } ${ lang.get('teams') }` } />
				<div class="clear"></div>
			</div>
		);
	}
}

export { tab, menu };
export default Teams;
