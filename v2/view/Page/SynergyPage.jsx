import './SynergyPage.scss';
import graph, { getLegend, updateGraph } from '../../service/graph.js';
import lang from '../../service/lang.js';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

function config(element, isInitialized) {
    const { top, left, width, height } = element.getBoundingClientRect();
    const stars = parseInt(element.getAttribute('stars'), 10);
    updateGraph(stars, top, left, width, height);
    if(!isInitialized)
        element.appendChild(graph.canvas);
}

const Synergy = {
    view(ctrl, args) {
        const stars = args.stars;
        updateGraph(stars);

        const legend = getLegend(stars);
        const items = legend && legend.map(({ effectId, selected, amount }) => {
            const amountString = amount && ` - ${ amount }%`;
            const onclick = () => {
                graph.selectEdgeType(effectId);
            };
            return (
                <div
                    class={ `legend-effect legend-effect--${ effectId }${
                        selected? ' legend-effect--selected': ''
                    }` }
                    onclick={ onclick }
                >
                    { lang.get(`effect-${ effectId }-name`) }
                    { amountString }
                </div>
            );
        });

        return (
            <div class="synergy" stars={ stars } config={ config }>
                <div class="legend">
                    { items }
                </div>
            </div>
        );
    },
};

export default Synergy;
