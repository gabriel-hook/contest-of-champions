import './Roster.scss';
import Champion from './Champion.jsx';
import roster from '../service/roster';
import m from 'mithril';

const Roster = {
	view(ctrl, args) {
		const champions = roster.all();
		const selected = args.selected;
		const onSelect = (id) => {
			m.route((selected === id)? '/roster': `/roster/${ id }`);
		};

		return (
			<div className={ `roster ${ selected? 'editing': '' }` }>
				<div> Champions </div>
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
