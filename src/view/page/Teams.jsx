import './Teams.scss';
import Champion from '../Champion.jsx';
import roster from '../../service/roster.js';
import router from '../../service/router.js';
import m from 'mithril';

const Roster = {
	view(ctrl, args) {
		const champions = roster.all();
		const { selected } = args;
		const onSelect = ({ uid, stars}) => {
			const path = `/roster/${ uid }/${ stars }`;
			router.setRoute(path);
		};
		const isEditing = (selected, champion) => (selected && champion
			&& selected.uid === champion.attr.uid
			&& selected.stars === champion.attr.stars
		);
		return (
			<div class="teams">
				<div class="teams-header">{ `${ 0 } Teams.` }</div>
				<div class="clear"></div>
			</div>
		);
	}
}

export default Roster;
