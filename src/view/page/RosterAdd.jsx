import './RosterAdd.scss';
import Champion from '../Champion.jsx';
import roster from '../../service/roster.js';
import router from '../../service/router.js';
import lang from '../../service/lang.js';
import m from 'mithril';

const menu = {
	header:{
		title: 'add-champion',
		icon: 'user-plus',
	},
	options:[
		{
			title: '★',
			selected: (stars) => stars === '1',
			onclick: () => router.setRoute('/roster/add/1'),
		},
		{
			title: '★★',
			selected: (stars) => stars === '2',
			onclick: () => router.setRoute('/roster/add/2'),
		},
		{
			title: '★★★',
			selected: (stars) => stars === '3',
			onclick: () => router.setRoute('/roster/add/3'),
		},
		{
			title: '★★★★',
			selected: (stars) => stars === '4',
			onclick: () => router.setRoute('/roster/add/4'),
		},
		{
			title: '★★★★★',
			selected: (stars) => stars === '5',
			onclick: () => router.setRoute('/roster/add/5'),
		},
	],
};

const RosterAdd = {
	view(ctrl, args) {
		const { stars } = args;
		const champions = roster.available(stars);
		return (
			<div class="roster-add">
				<div class="menu--back" onclick={
					() => router.setRoute('/roster')
				}>
					<i class="fa fa-hand-o-left"/>
				</div>
				<button 
					class={ `add-all ${ champions.length === 0? 'disabled': '' }` }
					onclick={ () => roster.addAll(stars) }
				>
					{ lang.get('add-all') }
				</button>
				<div class="clear"></div>
				{ champions.map((champion) => (
					<Champion 
						key={ champion.id() } 
						champion={ champion } 
						onclick={ () => roster.add(champion.attr.uid, stars) } 
					/>
				)) }
				<div class="clear"></div>
			</div>
		);
	}
};

export { menu };
export default RosterAdd;
