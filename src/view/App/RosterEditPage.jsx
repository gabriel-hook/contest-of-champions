import './RosterEditPage.scss';
import { STAR_RANK_LEVEL } from '../../data/model/Champion';
import { ROLE } from '../../data/model/Role';
import { roleImage } from '../../data/roles';
import roster from '../../service/roster';
import router from '../../service/router';
import lang from '../../service/lang';
import Icon from '../Icon.jsx';
import ImageIcon from '../ImageIcon.jsx';
import ChampionHeader from '../Champion/ChampionHeader.jsx';
import ChampionUpgrade from '../Champion/ChampionUpgrade.jsx';
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

const Select = {
    view(ctrl, { value, min, max, values, onchange }) {
        const options = [];
        if(min !== undefined && max !== undefined) {
            for(let i = min; i <= max; i++)
                options.push(
                    <option value={ i } selected={ value === i }>{ i }</option>
                );
        }
        if(values !== undefined) {
            values.forEach((option) => options.push(
                <option value={ option.value } selected={ option.value === value }>{ option.title }</option>
            ));
        }
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

const Number = {
    view(ctrl, { value, placeholder, min, max, onchange }) {
        return (
            <div class="champion-field-input">
                <input
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
        const scalePi = roster.getScale();
        const elements = [];
        if(champion) {
            const { rank, level, typeId, awakened, pi, role } = champion.attr;
            const roleIconImage = roleImage(role)? (
                <ImageIcon src={ roleImage(role) } />
            ): null;
            const rangeMax = STAR_RANK_LEVEL[ stars ]
                && STAR_RANK_LEVEL[ stars ].ranks || 1;
            const levelMax = STAR_RANK_LEVEL[ stars ]
                && STAR_RANK_LEVEL[ stars ][ rank ]
                && STAR_RANK_LEVEL[ stars ][ rank ].levels || 1;
            const awankenedMax = STAR_RANK_LEVEL[ stars ]
                && STAR_RANK_LEVEL[ stars ].awakened || 99;
            elements.push(
                <ChampionHeader champion={ champion } />
            );
            elements.push(
                <ChampionUpgrade stars={ stars } rank={ rank } level={ level } typeId={ typeId } />
            );
            elements.push(
                <label class="champion-field champion-field--neighbor">
                    <span class="champion-field-label">{ lang.get('rank') }</span>
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
                            requestRedraw();
                        }}
                    />
                </label>
            );
            elements.push(
                <label class="champion-field champion-field--neighbor">
                    <span class="champion-field-label">{ lang.get('level') }</span>
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
                            requestRedraw();
                        }}
                    />
                </label>
            );
            elements.push(
                <label class="champion-field">
                    <span class="champion-field-label">{ lang.get('awakened') }</span>
                    <Select
                        value={ awakened }
                        min={ 0 }
                        max={ awankenedMax }
                        onchange={(event) => {
                            const { value } = event.target;
                            const awakened = Math.min(awankenedMax, Math.max(0, parseInt(value, 10) || 0));
                            roster.set(uid, stars, {
                                awakened,
                            });
                            requestRedraw();
                        }}
                    />
                </label>
            );
            elements.push(
                <label class="champion-field">
                    <span class="champion-field-label">{ lang.get('pi') }</span>
                    <Number
                        value={ pi || '' }
                        placeholder={ champion.pi * scalePi | 0 }
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
                </label>
            );
            elements.push(
                <label class="champion-field">
                    <span class="champion-field-label">{ lang.get('role') }</span>
                    <div class="champion-field-role">
                        { roleIconImage }
                    </div>
                    <Select
                        value={ role }
                        values={[
                            {
                                title: lang.get('role-none'),
                                value: null,
                            },
                            {
                                title: lang.get('role-arena'),
                                value: ROLE.ARENA,
                            },
                            {
                                title: lang.get('role-alliance-quest'),
                                value: ROLE.ALLIANCE_QUEST,
                            },
                            {
                                title: lang.get('role-alliance-war-attack'),
                                value: ROLE.ALLIANCE_WAR_ATTACK,
                            },
                            {
                                title: lang.get('role-alliance-war-defense'),
                                value: ROLE.ALLIANCE_WAR_DEFENSE,
                            },
                            {
                                title: lang.get('role-quest'),
                                value: ROLE.QUEST,
                            },
                        ]}
                        onchange={(event) => {
                            const { value } = event.target;
                            const role = value === null? null: value;
                            roster.set(uid, stars, {
                                role,
                            });
                            requestRedraw();
                        }}
                    />
                </label>
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
            <div m="RosterEditPage" class="roster-edit">
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
