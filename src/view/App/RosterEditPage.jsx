import './RosterEditPage.scss';
import { starRankLevels } from '../../data/model/Champion';
import roster from '../../service/roster';
import router from '../../service/router';
import lang from '../../service/lang';
import Icon from '../Icon.jsx';
import ChampionHeader from '../Champion/ChampionHeader.jsx';
import classNames from 'classnames';
import { requestRedraw } from '../../util/animation';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const tab = {
    id: 'roster',
    icon: 'th',
    title: 'roster',
};

const Label = {
    view(ctrl, { id, text }) {
        return (
            <label for={ id } class="champion-field-label">{ lang.get(text) }</label>
        );
    },
};

const Select = {
    view(ctrl, { id, value, min, max, onchange }) {
        const options = [];
        for(let i = min; i <= max; i++)
            options.push(
                <option value={ i } selected={ value === i }>{ i }</option>
            );
        return (
            <div class="champion-field-select">
                <select id={ id } name={ id } onchange={ onchange }>
                    { options }
                </select>
                <Icon icon="caret-down" />
            </div>
        );
    },
};

const Number = {
    view(ctrl, { id, value, placeholder, min, max, onchange }) {
        return (
            <div class="champion-field-input">
                <input
                    id={ id }
                    value={ value || '' }
                    placeholder={ placeholder }
                    type="number"
                    min={ min }
                    max={ max }
                    oninput={ onchange }
                />
            </div>
        );
    },
};

const RosterPage = {
    view(ctrl, { uid, stars }) {
        const champion = roster.get(uid, stars);
        const elements = [];
        if(champion) {
            const { rank, level, awakened, pi } = champion.attr;
            const rangeMax = starRankLevels[ stars ]
                && starRankLevels[ stars ].ranks || 1;
            const levelMax = starRankLevels[ stars ]
                && starRankLevels[ stars ][ rank ]
                && starRankLevels[ stars ][ rank ].levels || 1;
            elements.push(
                <ChampionHeader champion={ champion } />
            );
            elements.push(
                <div class="champion-field">
                    <Label
                        id={ `${ champion.id }-edit-rank` }
                        text="rank"
                    />
                    <Select
                        id={ `${ champion.id }-edit-rank` }
                        value={ rank }
                        min={ 1 }
                        max={ rangeMax }
                        onchange={(event) => {
                            const { value } = event.target;
                            const rank = Math.min(rangeMax, Math.max(1, parseInt(value, 10) || 1));
                            roster.set(uid, stars, {
                                rank,
                                level: 1,
                            });
                            requestRedraw();
                        }}
                    />
                </div>
            );
            elements.push(
                <div class="champion-field">
                    <Label
                        id={ `${ champion.id }-edit-level` }
                        text="level"
                    />
                    <Select
                        id={ `${ champion.id }-edit-level` }
                        value={ level }
                        min={ 1 }
                        max={ levelMax }
                        onchange={(event) => {
                            const { value } = event.target;
                            const level = Math.min(levelMax, Math.max(1, parseInt(value, 10) || 1));
                            roster.set(uid, stars, {
                                level,
                            });
                            requestRedraw();
                        }}
                    />
                </div>
            );
            elements.push(
                <div class="champion-field">
                    <Label
                        id={ `${ champion.id }-edit-awakened` }
                        text="awakened"
                    />
                    <Select
                        id={ `${ champion.id }-edit-awakened` }
                        value={ awakened }
                        min={ 0 }
                        max={ 99 }
                        onchange={(event) => {
                            const { value } = event.target;
                            const awakened = Math.min(99, Math.max(0, parseInt(value, 10) || 0));
                            roster.set(uid, stars, {
                                awakened,
                            });
                            requestRedraw();
                        }}
                    />
                </div>
            );
            elements.push(
                <div class="champion-field">
                    <Label
                        id={ `${ champion.id }-edit-pi` }
                        text="pi"
                    />
                    <Number
                        id={ `${ champion.id }-edit-pi` }
                        value={ pi || '' }
                        placeholder={ champion.pi }
                        min={ 0 }
                        max={ 10000 }
                        onchange={(event) => {
                            const { value, min, max, valueAsNumber } = event.target;
                            const pi = Math.min(max, Math.max(min, parseInt(value, 10) || min));
                            roster.set(uid, stars, {
                                pi,
                            });
                            if(valueAsNumber !== undefined && isNaN(valueAsNumber))
                                event.target.value = '';
                            requestRedraw();
                        }}
                    />
                </div>
            );
            elements.push(
                <button
                    class={ classNames('champion-button', 'champion-button-delete') }
                    onclick={() => {
                        roster.remove(uid, stars);
                        router.setRoute('/roster');
                        requestRedraw();
                    }}
                >
                    { lang.get('delete') }
                </button>
            );
        }
        return (
            <div m="RosterPage" class="roster-edit">
                <div key={ `roster-edit-${ uid }-${ stars }` }>
                    { elements }
                </div>
                <div class="clear" />
            </div>
        );
    },
};

export { tab };
export default RosterPage;
