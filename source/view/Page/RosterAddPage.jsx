import './RosterAddPage.scss';
import classNames from 'classnames';
import Champion from '../Champion.jsx';
import roster from '../../service/roster.js';
import lang from '../../service/lang.js';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const RosterAddPage = {
    view(ctrl, args) {
        const { stars } = args;
        const champions = roster.available(stars);
        return (
            <div class="roster-add">
                <button
                    class={ classNames('add-all', { 'disabled': champions.length === 0 }) }
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

export default RosterAddPage;
