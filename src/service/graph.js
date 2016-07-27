import CHAMPIONS from '../data/champions';
import SYNERGIES from '../data/synergies';
import router from '../service/router';
import roster from '../service/roster';
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
    idol:'#f0a',
    inseparable:'#a00',
    mutantagenda:'#ff0',
    cosmicsupremacy:'#66f',
    critrate:'#fa0',
    critdamage:'#a60',
    bleed:'#f06',
    stunactivation:'#f66',
    stunspecial:'#f60',
    powergain:'#a0f',
    powersteal:'#a6f',
    perfectblock:'#00a',
    armor:'#0af',
    health:'#0f0',
    healthsteal:'#af0',
    heroesforhire:'#0a6',
    thunderbolts:'#a6a',
    masterminds:'#ff6',
};

function getTypeColor(typeId) {
    return TYPE_COLORS[ typeId ] || null;
}

function getEffectColor(effectId) {
    return EFFECT_COLORS[ effectId ] || null;
}

let lastSelected;
const rosters = {};
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
                const uniqueEdges = {};
                edges.forEach((edge) => {
                    const { id, amount } = edge.data;
                    if(uniqueEdges[ id ] && uniqueEdges[ id ].data.amount > amount) {
                        return;
                    }
                    uniqueEdges[ id ] = edge;
                });
                Object.values(uniqueEdges).forEach((edge) => {
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

function getGraph(id, championFilter, synergyFilter, useRoster) {
    const forceUpdate = useRoster && (!rosters[ id ] || rosters[ id ] !== roster.hash());
    if(!graphs[ id ] || forceUpdate) {
        const graph = new Graph(forceUpdate);
        const nodeMap = {};
        const legend = [];
        const championsFrom = {};
        const championsTo = {};
        const effectMap = {};
        const synergies = SYNERGIES
            .filter(synergyFilter)
            .map((synergy) => {
                championsFrom[ `${ synergy.attr.fromId }-${ synergy.attr.fromStars }` ] = true;
                championsTo[ synergy.attr.toId ] = true;
                return synergy;
            });
        (useRoster? roster.all(): CHAMPIONS)
            .filter((champion) => (championsTo[ champion.attr.uid ] || championsFrom[ `${ champion.attr.uid }-${ champion.attr.stars }` ]) && championFilter(champion))
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
                nodeMap[ `${ uid }-${ stars }` ] = node;
                if(!nodeMap[ uid ])
                    nodeMap[ uid ] = [];
                nodeMap[ uid ].push(node);
                return node;
            });
        synergies.forEach((synergy) => {
            const { fromId, fromStars, toId, effectId, effectAmount, group } = synergy.attr;
            const nodeFrom = nodeMap[ `${ fromId }-${ fromStars }` ];
            const nodesTo = nodeMap[ toId ];
            if(nodeFrom && nodesTo) {
                nodesTo.forEach((nodeTo) => {
                    nodeFrom.data.neighbors[ nodeTo.id ] = true;
                    nodeFrom.data.effects[ effectId ] = true;
                    nodeTo.data.neighbors[ nodeFrom.id ] = true;
                    nodeTo.data.effects[ effectId ] = true;
                    graph.newEdge(
                        nodeFrom,
                        nodeTo,
                        {
                            id: (group)?
                                `${ group }`:
                                `${ fromId }-${ fromStars }-${ toId }-${ effectId }`,
                            effect: effectId,
                            amount: effectAmount,
                            color: EFFECT_COLORS[ effectId ],
                        }
                    );
                    effectMap[ effectId ] = true;
                });
            }
        });
        for(const effectId in EFFECT_COLORS) {
            if(effectMap[ effectId ]) {
                legend.push({
                    effectId,
                    selected: true,
                });
            }
        }
        legends[ id ] = legend;
        graphs[ id ] = graph;
        rosters[ id ] = roster.hash();
        requestRedraw(5);
    }
    return graphs[ id ];
}

function getGraphId({ stars, effect, roster }) {
    let id = 'graph';
    if(stars) {
        id = `${ id }-stars-${ stars }`;
    }
    if (effect) {
        id = `${ id }-effect-${ effect }`;
    }
    if(roster) {
        id = `${ id }-roster`;
    }
    return id;
}

function getLegend(definition) {
    return legends[ getGraphId(definition) ];
}

function updateGraph(definition, ...dimensions) {
    const id = getGraphId(definition);
    let showStars = true;
    let championFilter = () => true;
    let synergyFilter = () => true;
    const { stars, effect, roster } = definition;
    if(stars) {
        showStars = false;
        championFilter = ({ attr }) => attr.stars === stars;
    }
    if (effect) {
        synergyFilter = ({ attr }) => attr.effectId === effect;
    }
    fdg.update(id, showStars, getGraph(id, championFilter, synergyFilter, roster), ...dimensions);
}

export default fdg;
export { getLegend, updateGraph, getTypeColor, getEffectColor };
