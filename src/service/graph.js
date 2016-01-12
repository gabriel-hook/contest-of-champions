import champions from '../data/champions';
import synergies from '../data/synergies';
import router from '../service/router';
import Graph from './graph/Graph';
import ForceDirectedGraph from './graph/ForceDirectedGraph';
import deepEqual from 'deep-equal';
import { requestRedraw } from '../util/animation';

const UNRELEASED_CHAMPIONS = {
    'redskull': true,
    'maestro': true,
    'drstrangemarvelnow': true,
    'cyclops90s': true,
    'spidermanmorales': true,
};

const TYPE_COLORS = {
    cosmic:'#3af',
    tech:'#23f',
    mutant:'#fa0',
    skill:'#f30',
    science:'#0a0',
    mystic:'#90f',
};

const EFFECT_COLORS = {
    attack:'#f00',
    stun:'#f60',
    mutantagenda:'#ff0',
    inseparable:'#a00',
    critrate:'#fa0',
    critdamage:'#a60',
    powergain:'#a0f',
    powersteal:'#a6f',
    perfectblock:'#00a',
    block:'#66f',
    armor:'#0af',
    health:'#0f0',
    healthsteal:'#af0',
    heroesforhire:'#0a6',
    thunderbolts:'#a6a',
};

let lastSelected;
const legends = {};
const graphs = {};
const fdg = new ForceDirectedGraph({
    stiffness: 800,
    repulsion: 1600,
    damping: 0.5,
    nodeSelected: (nodes, edges) => {
        const currentSelected = {
            nodes,
            edges,
        };
        if(!deepEqual(lastSelected, currentSelected)) {
            const legend = legends[ fdg.stars ];
            if (nodes && nodes.length > 1) {
                const amounts = {};
                edges.forEach((edge) => {
                    const { effect, amount } = edge.data;
                    if(amounts[ effect ])
                        amounts[ effect ] += amount;
                    else
                        amounts[ effect ] = amount;
                });
                for (const effect of legend) {
                    effect.selected = Boolean(amounts[ effect.effectId ]);
                    effect.amount = amounts[ effect.effectId ];
                }
            }
            else if (nodes && nodes.length === 1) {
                const selected = {};
                edges.forEach((edge) => {
                    const { effect } = edge.data;
                    selected[ effect ] = true;
                });
                for (const effect of legend) {
                    effect.selected = selected[ effect.effectId ];
                    effect.amount = null;
                }
            }
            else {
                for (const effect of legend) {
                    effect.selected = true;
                    effect.amount = null;
                }
            }
            lastSelected = currentSelected;
            requestRedraw(5);
        }
        else if((!nodes || !nodes.length) && (!edges || !edges.length)) {
            const legend = legends[ fdg.stars ];
            for(const effect of legend) {
                effect.selected = true;
                effect.amount = null;
            }
            requestRedraw(5);
        }
    },
    effectSelected: (effectId) => {
        const legend = legends[ fdg.stars ];
        for(const effect of legend) {
            effect.selected = effectId === effect.effectId;
            effect.amount = null;
        }
        requestRedraw(5);
    },
});

function getGraph(stars) {
    if(!graphs[ stars ]) {
        const graph = new Graph();
        const nodeMap = {};
        const effectMap = {};
        const legend = [];
        champions
            .filter((champion) => champion.attr.stars === stars && !UNRELEASED_CHAMPIONS[ champion.attr.uid ])
            .map((champion) => {
                const { typeId, uid } = champion.attr;
                const node = graph.newNode({
                    label: uid,
                    image: `images/champions/portrait_${ uid }.png`,
                    type: typeId,
                    color: TYPE_COLORS[ typeId ],
                    neighbors: {},
                    effects: {},
                    onOpen: () => {
                        router.setRoute(`/guide/${ uid }`);
                        requestRedraw();
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
                nodeMap[ fromId ].data.neighbors[ nodeMap[ toId ].id ] = true;
                nodeMap[ fromId ].data.effects[ effectId ] = true;
                nodeMap[ toId ].data.neighbors[ nodeMap[ fromId ].id ] = true;
                nodeMap[ toId ].data.effects[ effectId ] = true;
                effectMap[ effectId ] = true;
                return graph.newEdge(
                    nodeMap[ fromId ],
                    nodeMap[ toId ], {
                        effect: effectId,
                        amount: effectAmount,
                        color: EFFECT_COLORS[ effectId ],
                    });
            });
        for(const effectId in EFFECT_COLORS)
            if(effectMap[ effectId ])
                legend.push({
                    effectId,
                    selected: true,
                });
        legends[ stars ] = legend;
        graphs[ stars ] = graph;
        requestRedraw(5);
    }
    return graphs[ stars ];
}

function getLegend(stars) {
    return legends[ stars ];
}

function updateGraph(stars, top, left, width, height) {
    fdg.update(stars, getGraph(stars), top, left, width, height);
}

export { getLegend };
export { updateGraph };
export default fdg;
