import './Roster.scss';
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
			<div class={ `roster ${ selected ? 'editing': '' }` }>
				<div class="roster-header">{ `${ champions.length } Champions.` }</div>
				{ champions.map((champion, index) => (
					<Champion 
						key={ champion.id() } 
						champion={ champion } 
						isEditing={ isEditing(selected, champion) } 
						onClick={ onSelect.bind(this, champion.attr) } 
					/>
				)) }
				<div class="clear"></div>
			</div>
		);
	}
}

export default Roster;
