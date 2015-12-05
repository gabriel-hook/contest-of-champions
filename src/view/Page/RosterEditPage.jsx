import './RosterEditPage.scss';
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
            elements.push(
                <Champion champion={ champion } />
            );
            elements.push(
                <div class="clear" />
            );
            elements.push(
                <div>
                    <b>rank</b>: { champion.attr.rank }
                </div>
            );
            elements.push(
                <div>
                    <b>level</b>: { champion.attr.level }
                </div>
            );
            elements.push(
                <div>
                    <b>awakened</b>: { champion.attr.awakened }
                </div>
            );
        }
        return (
            <div class="roster-edit">
                { elements }
                <div class="clear" />
                <button onclick={() => {
                    roster.set(uid, stars, {
                        awakened: champion.attr.awakened? 0: 1,
                    });
                    m.redraw();
                }}>
                    Awakened Toggle
                </button>
                <div class="clear" />
            </div>
        );
    },
};

export { tab };
export default RosterPage;
