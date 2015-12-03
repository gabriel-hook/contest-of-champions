import './Team.scss';
import classNames from 'classnames';
import { getImage } from '../util/images';
import { effectImage } from '../data/effects';
import pure from '../util/pure';
import lang from '../service/lang';
import Champion from './Champion.jsx';
import ImageIcon from './ImageIcon.jsx';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const CHAMPION_SELECTED = 1;
const CHAMPION_NEIGHBOR = 2;
const SYNERGY_SELECTED = 1;

function selectNone(ctrl) {
    ctrl.selected = {
        synergies: {},
        champions: {},
    };
    m.redraw();
}

function selectChampion(ctrl, synergies, champions, index) {
    let selected = ctrl.champions[ index ];
    if(!selected) {
        selected = {
            active: true,
            champions: {
                [ index ]: CHAMPION_SELECTED,
            },
            synergies: {},
        };
        const champion = champions[ index ];
        synergies.forEach((synergy, index) => {
            if(champion.attr.uid === synergy.attr.toId) {
                selected.synergies[ index ] = SYNERGY_SELECTED;
                champions.forEach((champion, index) => {
                    if(champion.attr.uid === synergy.attr.fromId && champion.attr.stars === synergy.attr.fromStars)
                        selected.champions[ index ] = CHAMPION_NEIGHBOR;
                });
            }
            else if(champion.attr.uid === synergy.attr.fromId && champion.attr.stars === synergy.attr.fromStars) {
                selected.synergies[ index ] = SYNERGY_SELECTED;
                champions.forEach((champion, index) => {
                    if(champion.attr.uid === synergy.attr.toId)
                        selected.champions[ index ] = CHAMPION_NEIGHBOR;
                });
            }
        });
        ctrl.champions[ index ] = selected;
    }
    ctrl.selected = selected;
}

function selectSynergy(ctrl, synergies, champions, index) {
    let selected = ctrl.synergies[ index ];
    if(!selected) {
        selected = {
            active: true,
            champions: {},
            synergies: {
                [ index ]: SYNERGY_SELECTED,
            },
        };
        const synergy = synergies[ index ];
        champions.forEach((champion, index) => {
            if (champion.attr.uid === synergy.attr.toId)
                selected.champions[ index ] = CHAMPION_SELECTED;
            else if (champion.attr.uid === synergy.attr.fromId && champion.attr.stars === synergy.attr.fromStars)
                selected.champions[ index ] = CHAMPION_SELECTED;
        });
        ctrl.synergies[ index ] = selected;
    }
    ctrl.selected = selected;
}

const Team = {
    controller() {
        this.selected = {
            synergies: {},
            champions: {},
        };
        this.champions = {};
        this.synergies = {};
    },
    view(ctrl, args) {
        const { champions, synergies } = args;
        const size = champions.length;
        ctrl.pure = champions.reduce((value, champion) => {
            if(value) {
                const image = getImage(`images/champions/portrait_${ champion.attr.uid }.png`);
                if(!image)
                    return false;
            }
            return value;
        }, true);
        return(
            <div
                class={ classNames('team', `team--size-${ size }`, { 'team--selected': ctrl.selected.active }) }
                onmouseleave={ () => selectNone(ctrl) }
            >
                <div>
                { champions.map((champion, index) => {
                    const selected = ctrl.selected.champions[ index ] === CHAMPION_SELECTED;
                    const neighbor = ctrl.selected.champions[ index ] === CHAMPION_NEIGHBOR;
                    return (
                        <Champion
                            key={ `champion-${ index }` }
                            champion={ champion }
                            selected={ selected }
                            neighbor={ neighbor }
                            events={{
                                onmouseenter: () => selectChampion(ctrl, synergies, champions, index),
                            }}
                        />
                    );
                }) }
                </div>
                <div className="team-synergies">
                { synergies.map((synergy, index) => {
                    const selected = ctrl.selected.synergies[ index ] === SYNERGY_SELECTED;
                    return (
                        <div
                            class={ classNames('team-synergy', { 'team-synergy--selected': selected }) }
                            onmouseenter={ () => selectSynergy(ctrl, synergies, champions, index) }
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

export default pure(Team);
