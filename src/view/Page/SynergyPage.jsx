import './SynergyPage.scss';
import classNames from 'classnames';
import graph, { getLegend, updateGraph } from '../../service/graph';
import lang from '../../service/lang';
import synergy from '../../service/synergy';
import { requestRedraw } from '../../util/animation';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

function config(element, isInitialized) {
    const { top, left, width, height } = element.getBoundingClientRect();
    const stars = parseInt(element.getAttribute('stars'), 10);
    updateGraph(stars, top, left, width, height);
    if(!isInitialized) {
        element.appendChild(graph.canvas);
        setTimeout(() => {
            const { top, left, width, height } = element.getBoundingClientRect();
            updateGraph(stars, top, left, width, height);
        }, 250);
    }
}

const SynergyPage = {
    view(ctrl, args) {
        const stars = args.stars;
        const legend = getLegend(stars);
        const items = legend && legend.map(({ effectId, selected, amount }) => {
            return (
                <div
                    class={ classNames('legend-effect', `legend-effect--${ effectId }`,
                        { 'legend-effect--selected': selected }
                    ) }
                    onclick={ () => {
                        graph.selectEdgeType(effectId);
                        requestRedraw(5);
                    }}
                >
                    { lang.get(`effect-${ effectId }-name`) }
                    { amount && ` - ${ amount }%` }
                </div>
            );
        });

        return (
            <div class="synergy" stars={ stars } config={ config }>
                <div class={ classNames('legend', { 'legend--hidden': !synergy.legend }) }>
                    { items }
                </div>
            </div>
        );
    },
};

export default SynergyPage;
