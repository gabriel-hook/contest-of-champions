import champions from '../data/champions';
import synergies from '../data/synergies';
import router from '../service/router.js';
import SpringyUI from '../graph/SpringyUI.js';
import Graph from '../graph/Graph.js';

const typeColors = {
    cosmic:'#3af',
    tech:'#23f',
    mutant:'#fa0',
    skill:'#f30',
    science:'#0a0',
    mystic:'#90f',
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

const springy = new SpringyUI({
    stiffness: 800,
    repulsion: 1600,
    damping: 0.5,
    nodeSelected: () => { },
});

const graphs = {};
function getGraph(stars) {
    if(!graphs[ stars ]) {
        const graph = new Graph();
        const getImage = (src) => {
            const image = new Image();
            image.src = src;
            return image;
        };
        const nodeMap = {};
        champions
            .filter((champion) => champion.attr.stars === stars)
            .map((champion) => {
                const { typeId, uid } = champion.attr;
                const node = graph.newNode({
                    label: uid,
                    image: getImage(`../images/champions/portrait_${ uid }.png`),
                    type: typeId,
                    color: typeColors[ typeId ],
                    neighbors: {},
                    effects:{},
                    onOpen: () => {
                        router.setRoute(`/guide/${ uid }`);
                    },
                });
                nodeMap[ uid ] = node;
                return node;
            });
        synergies
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
        graphs[ stars ] = graph;
    }
    return graphs[ stars ];
}

function update(stars) {
    if(springy.stars !== stars) {
        springy.update(stars, getGraph(stars));
    }
    return springy.canvas;
}

export { update };
export { typeColors, effectColors };
export default springy;
