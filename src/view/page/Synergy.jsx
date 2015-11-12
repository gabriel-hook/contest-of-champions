import './Synergy.scss';
import champions from '../../data/champions';
import synergies from '../../data/synergies';
import router from '../../service/router.js';
import SpringyUI from '../../graph/SpringyUI.js';
import Graph from '../../graph/Graph.js';
import Node from '../../graph/Node.js';
import Edge from '../../graph/Edge.js';
import m from 'mithril';

const tab = {
	id: 'synergy',
	icon: 'users',
	title: 'synergies',
};

const menu = {
	header:{
		title: 'synergies',
		icon: 'users',
	},
	options:[
		{
			title: '★',
			selected: (stars) => stars === '1',
			onclick: () => router.setRoute('/synergy/1'),
		},
		{
			title: '★★',
			selected: (stars) => stars === '2',
			onclick: () => router.setRoute('/synergy/2'),
		},
		{
			title: '★★★',
			selected: (stars) => stars === '3',
			onclick: () => router.setRoute('/synergy/3'),
		},
		{
			title: '★★★★',
			selected: (stars) => stars === '4',
			onclick: () => router.setRoute('/synergy/4'),
		},
		{
			title: '★★★★★',
			selected: (stars) => stars === '5',
			onclick: () => router.setRoute('/synergy/5'),
		},
	],
};

const typeColors = {
	cosmic:'#3af',
	tech:'#23f',
	mutant:'#fa0',
	skill:'#f30',
	science:'#0a0',
	mystic:'#90f'
};
const effectColors = {
	attack:'#f00',
	stun:'#f60',
	critrate:'#fa0',
	critdamage:'#a60',
	powergain:'#a0f',
	powersteal:'#a6f',
	perfectblock:'#00a',
	block:'#66f',
	armor:'#0af',
	health:'#0f0',
	healthsteal:'#af0',
};

let springy;
const graphs = {};

function getGraph(stars) {
	if(!graphs[stars]) {
		const graph = new Graph();
		const getImage = (src) => {
			var image = new Image();
			image.src = src;
			return image;
		};
		const nodeMap = {};
		const nodes = champions
			.filter((champion) => champion.attr.stars === stars)
			.map((champion) => {
				const { typeId, uid } = champion.attr;
				const node = graph.newNode({
					label: uid,
					image: getImage(`images/champions/portrait_${ uid }.png`),
					type: typeId,
					color: typeColors[ typeId ],
					neighbors: {},
					effects:{},
					onOpen: () => {
						router.setRoute(`/guide/${ uid }`);
					}
				});
				nodeMap[ uid ] = node;
				return node;
			});
		const edges = synergies
			.filter((synergy) => 
				synergy.attr.fromStars === stars && 
				nodeMap[ synergy.attr.toId ] && 
				nodeMap[ synergy.attr.fromId ] 
			)
			.map((synergy) => {
				const { fromId, toId, effectId, effectAmount } = synergy.attr;
				return graph.newEdge(
					nodeMap[ fromId ],
					nodeMap[ toId ], {
						effect: effectId,
						amount: effectAmount,
						color: effectColors[ effectId ],
					});
			});
		graphs[stars] = graph;
	}
	return graphs[stars];
}

function getCanvas(stars) {
	if(!springy){
		springy = new SpringyUI({
			stiffness: 800,
			repulsion: 1600,
			damping: 0.5,
			nodeSelected: function () { }
		});
	}
	if(springy.stars !== stars)
		springy.update(stars, getGraph(stars));
	return springy.canvas;
}

function draw(element, isInitialized, context){
	const canvas = getCanvas(parseInt(element.getAttribute('stars'), 10));
	if(!isInitialized)
		element.appendChild(canvas);
	canvas.width = element.offsetWidth; 
	canvas.height = element.offsetHeight;
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
