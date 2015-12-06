import './RosterEditPage.scss';
import { starRankLevels } from '../../data/model/Champion';
import roster from '../../service/roster';
import router from '../../service/router';
import lang from '../../service/lang';
import Icon from '../Icon.jsx';
import ChampionHeader from '../ChampionHeader.jsx';
import classNames from 'classnames';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const tab = {
    id: 'roster',
    icon: 'th',
    title: 'roster',
};

const Label = {
    view(ctrl, args) {
        const { text } = args;
        return (
            <label class="champion-field-label">{ lang.get(text) }</label>
        );
    },
};

const Select = {
    view(ctrl, args) {
        const { value, min, max, onchange } = args;
        const options = [];
        for(let i = min; i <= max; i++)
            options.push(
                <option value={ i } selected={ value === i }>{ i }</option>
            );
        return (
            <div class="champion-field-select">
                <select onchange={ onchange }>
                    { options }
                </select>
                <Icon icon="caret-down" />
            </div>
        );
    },
};

const RosterPage = {
    view(ctrl, args) {
        const { uid, stars } = args;
        const champion = roster.find(({ attr }) => attr.uid === uid && attr.stars === stars);
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
                    <Label text="rank" />
                    <Select
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
                            m.redraw();
                        }}
                    />
                </div>
            );
            elements.push(
                <div class="champion-field">
                    <Label text="level" />
                    <Select
                        value={ level }
                        min={ 1 }
                        max={ levelMax }
                        onchange={(event) => {
                            const { value } = event.target;
                            const level = Math.min(levelMax, Math.max(1, parseInt(value, 10) || 1));
                            roster.set(uid, stars, {
                                level,
                            });
                            m.redraw();
                        }}
                    />
                </div>
            );
            elements.push(
                <div class="champion-field">
                    <Label text="awakened" />
                    <Select
                        value={ awakened }
                        min={ 0 }
                        max={ 99 }
                        onchange={(event) => {
                            const { value } = event.target;
                            const awakened = Math.min(99, Math.max(0, parseInt(value, 10) || 0));
                            roster.set(uid, stars, {
                                awakened,
                            });
                            m.redraw();
                        }}
                    />
                </div>
            );
            elements.push(
                <div class="champion-field">
                    <Label text="pi" />
                    <div class="champion-field-input">
                        <input
                            value={ pi || '' }
                            placeholder={ champion.pi }
                            type="number"
                            min="0"
                            max="10000"
                            oninput={(event) => {
                                const { value, min, max } = event.target;
                                const pi = Math.min(max, Math.max(min, parseInt(value, 10) || min));
                                roster.set(uid, stars, {
                                    pi,
                                });
                                m.redraw();
                            }}
                        />
                    </div>
                </div>
            );
            elements.push(
                <button
                    class={ classNames('champion-button', 'champion-button-delete') }
                    onclick={() => {
                        roster.remove(uid, stars);
                        router.setRoute('/roster');
                    }}
                >
                    { lang.get('delete') }
                </button>
            );
        }
        return (
            <div class="roster-edit">
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
