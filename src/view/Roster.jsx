import './Roster.scss';
import Champion from './Champion.jsx';
import roster from '../service/roster';
import m from 'mithril';
import router from '../service/router.js';

const Roster = {
	view(ctrl, args) {
		const champions = roster.all();
		const selected = args.selected;
		const onSelect = (champion) => {
			const path = (selected === champion)? '/roster': `/roster/${ champion }`;
			router.setRoute(path);
		};

		return (
			<div className={ `roster ${ selected? 'editing': '' }` }>
				<div className="roster-header">{ `${ champions.length } Champions.` }</div>
				{ champions.map((champion, index) => (
					<Champion 
						key={ champion.id() } 
						champion={ champion } 
						isEditing={ selected && selected === champion.id() } 
						onClick={ onSelect.bind(this, champion.id()) } 
					/>
				)) }
			</div>
		);
	}
}

export default Roster;
