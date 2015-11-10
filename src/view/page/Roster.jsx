import './Roster.scss';
import Champion from '../Champion.jsx';
import roster from '../../service/roster.js';
import router from '../../service/router.js';
import lang from '../../service/lang.js';
import m from 'mithril';

const Roster = {
	view(ctrl, args) {
		const total = roster.all().length;
		const champions = roster.filter({
			// some filter
		});
		const { selected } = args;
		const handleSelect = ({ uid, stars}, event) => {
			event.stopPropagation();
			router.setRoute(`/roster/${ uid }/${ stars }`);
		};
		const handleDeselect = (event) => {
			event.stopPropagation();
			router.setRoute('/roster')
		};
		const isEditing = (selected, champion) => (selected && champion
			&& selected.uid === champion.attr.uid
			&& selected.stars === champion.attr.stars
		);
		return (
			<div 
				class={ `roster ${ selected ? 'editing': '' }` }
				onclick={ handleDeselect.bind(this) }
			>
				<div class="roster-header">
					{ `${ champions.length } ${ lang.get('of') } ${ total } ${ lang.get('champions') }` }
				</div>
				{ champions.map((champion) => (
					<Champion 
						key={ champion.id() } 
						champion={ champion } 
						isEditing={ isEditing(selected, champion) } 
						onclick={ handleSelect.bind(this, champion.attr) } 
					/>
				)) }
				<div class="clear"></div>
			</div>
		);
	}
}

export default Roster;
