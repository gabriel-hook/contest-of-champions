import './SynergyPage.scss';
import classNames from 'classnames';
import { effectImage } from '../../data/effects';
import graph, { getLegend, updateGraph } from '../../service/graph';
import lang from '../../service/lang';
import synergy from '../../service/synergy';
import ImageIcon from '../ImageIcon.jsx';
import { requestRedraw } from '../../util/animation';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

function config({ stars, effect }, element, isInitialized) {
    const { top, left, width, height } = element.getBoundingClientRect();
    if(!isInitialized) {
        element.appendChild(graph.canvas);
    }
    updateGraph({ stars, effect }, top, left, width, height);
}

const SynergyPage = {
    view(ctrl, { stars, effect }) {
        const legend = getLegend({ stars, effect });
        return (
            <div m="SynergyPage" class="synergy" config={ config.bind(null, { stars, effect }) }>
                <div class={ classNames('legend', { 'legend--hidden': !synergy.legend }) }>
                    { legend && legend.map(({ effectId, selected, amount }) => (
                        <div
                            class={ classNames('no-select',
                                'legend-effect',
                                `legend-effect--${ effectId }`,
                                { 'legend-effect--selected': selected }
                            ) }
                            onclick={ () => {
                                graph.selectEdgeType(effectId);
                                requestRedraw(5);
                            }}
                            title={ lang.get(`effect-${ effectId }-description`) }
                        >
                            <ImageIcon src={ effectImage(effectId) } icon="square"/>
                            <span class="legend-effect-title">
                                { lang.get(`effect-${ effectId }-shortname`, null) || lang.get(`effect-${ effectId }-name`) }
                                { amount && ` - ${ amount }%` }
                            </span>
                        </div>
                    )) }
                </div>
            </div>
        );
    },
};

export default SynergyPage;
