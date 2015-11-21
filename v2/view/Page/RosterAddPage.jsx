import './RosterAddPage.scss';
import Champion from '../Champion.jsx';
import roster from '../../service/roster.js';
import lang from '../../service/lang.js';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const RosterAdd = {
    view(ctrl, args) {
        const { stars } = args;
        const champions = roster.available(stars);
        return (
            <div class="roster-add">
                <button
                    class={ `add-all ${ champions.length === 0? 'disabled': '' }` }
                    onclick={ () => roster.addAll(stars) }
                >
                    { lang.get('add-all') }
                </button>
                <div class="clear"></div>
                { champions.map((champion) => (
                    <Champion
                        key={ champion.id() }
                        champion={ champion }
                        onclick={ () => roster.add(champion.attr.uid, stars) }
                    />
                )) }
                <div class="clear"></div>
            </div>
        );
    },
};

export default RosterAdd;
