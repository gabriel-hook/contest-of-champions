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
        }
        return (
            <div class="roster-edit">
                { elements }
                Edit page, last one before I get analytics in and release!
                <div class="clear" />
            </div>
        );
    },
};

export { tab };
export default RosterPage;
