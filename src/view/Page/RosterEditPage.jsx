import './RosterEditPage.scss';
import { starRankLevels } from '../../data/model/Champion';
import roster from '../../service/roster';
import Champion from '../Champion.jsx';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const tab = {
    id: 'roster',
    icon: 'th',
    title: 'roster',
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
                <Champion champion={ champion } />
            );
            elements.push(
                <div class="clear" />
            );
            elements.push(
                <div>
                    <label>rank</label>
                    <input
                        value={ rank }
                        type="number"
                        min="1"
                        max={ rangeMax }
                        oninput={(event) => {
                            const { value, min, max } = event.target;
                            const rank = Math.min(max, Math.max(min, parseInt(value, 10) || min));
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
                <div>
                    <label>level</label>
                    <input
                        value={ level }
                        type="number"
                        min="1"
                        max={ levelMax }
                        oninput={(event) => {
                            const { value, min, max } = event.target;
                            const level = Math.min(max, Math.max(min, parseInt(value, 10) || min));
                            roster.set(uid, stars, {
                                level,
                            });
                            m.redraw();
                        }}
                    />
                </div>
            );
            elements.push(
                <div>
                    <label>awakened</label>
                    <input
                        value={ awakened }
                        type="number"
                        min="0"
                        max="99"
                        oninput={(event) => {
                            const { value, min, max } = event.target;
                            const awakened = Math.min(max, Math.max(min, parseInt(value, 10) || min));
                            roster.set(uid, stars, {
                                awakened,
                            });
                            m.redraw();
                        }}
                    />
                </div>
            );
            elements.push(
                <div>
                    <label>pi</label>
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
            );
        }
        return (
            <div class="roster-edit">
                { elements }
                <div class="clear" />
            </div>
        );
    },
};

export { tab };
export default RosterPage;
