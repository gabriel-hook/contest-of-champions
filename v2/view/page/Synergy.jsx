import './Synergy.scss';
import springy, { update } from '../../service/springy.js';
import router from '../../service/router.js';
import m from 'mithril';

const tab = {
	id: 'synergy',
	icon: 'users',
	title: 'synergy',
};

const menu = {
	header:{
		title: 'synergies',
		icon: 'users',
	},
	options:[
		{
			title: '1★',
			selected: (stars) => stars === '1',
			onclick: () => router.setRoute('/synergy/1') && false,
            split: 5,
		},
		{
			title: '2★',
			selected: (stars) => stars === '2',
			onclick: () => router.setRoute('/synergy/2') && false,
            split: 5,
		},
		{
			title: '3★',
			selected: (stars) => stars === '3',
			onclick: () => router.setRoute('/synergy/3') && false,
            split: 5,
		},
		{
			title: '4★',
			selected: (stars) => stars === '4',
			onclick: () => router.setRoute('/synergy/4') && false,
            split: 5,
		},
		{
			title: '5★',
			selected: (stars) => stars === '5',
			onclick: () => router.setRoute('/synergy/5') && false,
            split: 5,
		},
	],
};

function draw(element, isInitialized, context){
	update(parseInt(element.getAttribute('stars'), 10));
	if(!isInitialized)
		element.appendChild(springy.canvas);
	springy.canvas.width = element.offsetWidth; 
	springy.canvas.height = element.offsetHeight;
	springy.resize();
}

const Synergy = {
	view(ctrl, args) {
		const stars = args.stars;
		return (
			<div class="synergy" stars={ stars } config={ draw } />
		);
	}
}

export { tab, menu };
export default Synergy;
