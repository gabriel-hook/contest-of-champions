import './Team.scss';
import Champion from './Champion.jsx';
import ImageIcon from './ImageIcon.jsx';
import { effectImage } from '../data/effects.js';
import classNames from 'classnames';
import lang from '../service/lang.js';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const TYPE_CHAMPION = 1;
const TYPE_SYNERGY = 2;

const Team = {
    controller() {
        this.selected = {
            type: null,
            index: null,
        };
    },
    view(ctrl, args) {
        const { champions, synergies } = args;
        const size = champions.length;
        return(
            <div
                class={ classNames('team', `team--size-${ size }`, { 'team--selected': ctrl.selected.type }) }
                onmouseout={() => {
                    ctrl.selected = {
                        type: null,
                        index: null,
                    };
                    m.redraw();
                }}
            >
                <div>
                { champions.map((champion, index) => {
                    let selected = false;
                    if(ctrl.selected.type === TYPE_SYNERGY) {
                        const synergy = synergies[ ctrl.selected.index ];
                        selected = synergy.attr.toId === champion.attr.uid ||
                            synergy.attr.fromId === champion.attr.uid && synergy.attr.fromStars === champion.attr.stars;
                    }
                    else if (ctrl.selected.type === TYPE_CHAMPION)
                        selected = ctrl.selected.index === index;
                    return (
                        <Champion
                            key={ `champion-${ index }` }
                            champion={ champion }
                            selected={ selected }
                            events={{
                                onmouseover: () => {
                                    ctrl.selected.type = TYPE_CHAMPION;
                                    ctrl.selected.index = index;
                                    m.redraw();
                                },
                            }}
                        />
                    );
                }) }
                </div>
                <div className="team-synergies">
                { synergies.map((synergy, index) => {
                    let selected = false;
                    if(ctrl.selected.type === TYPE_CHAMPION) {
                        const champion = champions[ ctrl.selected.index ];
                        selected = synergy.attr.toId === champion.attr.uid ||
                            synergy.attr.fromId === champion.attr.uid && synergy.attr.fromStars === champion.attr.stars;
                    }
                    else if (ctrl.selected.type === TYPE_SYNERGY)
                        selected = ctrl.selected.index === index;
                    return (
                        <div
                            class={ classNames('team-synergy', { 'team-synergy--selected': selected }) }
                            onmouseover={() => {
                                ctrl.selected.type = TYPE_SYNERGY;
                                ctrl.selected.index = index;
                                m.redraw();
                            }}
                        >
                            <ImageIcon src={ effectImage(synergy.attr.effectId) }/>
                            <span class="effect-name">
                                { lang.get(`effect-${ synergy.attr.effectId }-name`) }
                            </span>
                            <span class="effect-amount">
                                { synergy.attr.effectAmount }%
                            </span>
                        </div>
                            );
                })}
                </div>
            </div>
        );
    },
};

export default Team;
