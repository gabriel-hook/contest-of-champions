import CHAMPIONS, { UNRELEASED_CHAMPIONS } from '../data/champions';
import SYNERGIES from '../data/synergies';
import router from '../service/router';
import Graph from './graph/Graph';
import ForceDirectedGraph from './graph/ForceDirectedGraph';
import deepEqual from 'deep-equal';
import { requestRedraw } from '../util/animation';

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
            const legend = legends[ fdg.id ];
            if (nodes && nodes.length > 1) {
                const amounts = {};
                const synergies = {};
                edges
                    .filter((edge) => {
                        if(synergies[ edge.data.id ]) {
                            return false;
                        }
                        synergies[ edge.data.id ] = true;
                        return true;
                    })
                    .forEach((edge) => {
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
            const legend = legends[ fdg.id ];
            for(const effect of legend) {
                effect.selected = true;
                effect.amount = null;
            }
            requestRedraw(5);
        }
    },
    effectSelected: (effectId) => {
        const legend = legends[ fdg.id ];
        for(const effect of legend) {
            effect.selected = effectId === effect.effectId;
            effect.amount = null;
        }
        requestRedraw(5);
    },
});

function getStarGraph(stars) {
    const id = `stars-${ stars }`;
    if(!graphs[ id ]) {
        const graph = new Graph();
        const nodeMap = {};
        const effectMap = {};
        const legend = [];
        CHAMPIONS
            .filter((champion) => champion.attr.stars === stars && !UNRELEASED_CHAMPIONS[ champion.attr.uid ])
            .forEach((champion) => {
                const { typeId, uid, stars } = champion.attr;
                const node = graph.newNode({
                    uid,
                    stars,
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
        SYNERGIES
            .filter((synergy) =>
                synergy.attr.fromStars === stars &&
                nodeMap[ synergy.attr.toId ] &&
                nodeMap[ synergy.attr.fromId ]
            )
            .forEach((synergy) => {
                const { fromId, fromStars, toId, effectId, effectAmount } = synergy.attr;
                nodeMap[ fromId ].data.neighbors[ nodeMap[ toId ].id ] = true;
                nodeMap[ fromId ].data.effects[ effectId ] = true;
                nodeMap[ toId ].data.neighbors[ nodeMap[ fromId ].id ] = true;
                nodeMap[ toId ].data.effects[ effectId ] = true;
                effectMap[ effectId ] = true;
                return graph.newEdge(
                    nodeMap[ fromId ],
                    nodeMap[ toId ], {
                        id: `${ fromId }-${ fromStars }-${ toId }-${ effectId }`,
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
        legends[ id ] = legend;
        graphs[ id ] = graph;
        requestRedraw(5);
    }
    return graphs[ id ];
}

function getEffectGraph(effect) {
    const id = `effect-${ effect }`;
    if(!graphs[ id ]) {
        const graph = new Graph();
        const nodeMap = {};
        const legend = [];
        const championsFrom = {};
        const championsTo = {};
        SYNERGIES
            .filter(({ attr }) => attr.effectId === effect)
            .forEach(({ attr }) => {
                championsFrom[ `${ attr.fromId }-${ attr.fromStars }` ] = true;
                championsTo[ attr.toId ] = true;
            });
        CHAMPIONS
            .filter(({ attr }) => championsTo[ attr.uid ] || championsFrom[ `${ attr.uid }-${ attr.stars }` ])
            .map((champion) => {
                const { typeId, uid, stars } = champion.attr;
                const node = graph.newNode({
                    uid,
                    stars,
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
                nodeMap[ `${ uid }-${ stars }` ] = node;
                if(!nodeMap[ uid ])
                    nodeMap[ uid ] = [];
                nodeMap[ uid ].push(node);
                return node;
            });

        SYNERGIES
            .filter(({ attr }) => attr.effectId === effect)
            .forEach((synergy) => {
                const { fromId, fromStars, toId, effectId, effectAmount } = synergy.attr;
                const nodeFrom = nodeMap[ `${ fromId }-${ fromStars }` ];
                if(nodeFrom) {
                    nodeMap[ toId ].forEach((nodeTo) => {
                        if(nodeTo) {
                            nodeFrom.data.neighbors[ nodeTo.id ] = true;
                            graph.newEdge(
                                nodeFrom,
                                nodeTo,
                                {
                                    id: `${ fromId }-${ fromStars }-${ toId }-${ effectId }`,
                                    effect,
                                    amount: effectAmount,
                                    color: EFFECT_COLORS[ effect ],
                                });
                        }
                    });
                }
            });
        legend.push({
            effectId: effect,
            selected: true,
        });
        legends[ id ] = legend;
        graphs[ id ] = graph;
        requestRedraw(5);
    }
    return graphs[ id ];
}

function getLegend({ stars, effect }) {
    return legends[ `stars-${ stars }` ] || legends[ `effect-${ effect }` ];
}

function updateGraph({ stars, effect }, top, left, width, height) {
    if(stars) {
        fdg.update(`stars-${ stars }`, false, getStarGraph(stars), top, left, width, height);
    }
    else if (effect) {
        fdg.update(`effect-${ effect }`, true, getEffectGraph(effect), top, left, width, height);
    }
}

export { getLegend };
export { updateGraph };
export default fdg;
