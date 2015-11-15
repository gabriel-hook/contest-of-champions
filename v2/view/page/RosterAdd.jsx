import './RosterAdd.scss';
import Champion from '../Champion.jsx';
import roster from '../../service/roster.js';
import router from '../../service/router.js';
import lang from '../../service/lang.js';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const menu = {
    header:{
        title: 'add-champion',
        icon: 'user-plus',
    },
    options:[
        {
            title: '1★',
            selected: (stars) => stars === '1',
            onclick: () => router.setRoute('/roster/add/1') && false,
            split: 5,
        },
        {
            title: '2★',
            selected: (stars) => stars === '2',
            onclick: () => router.setRoute('/roster/add/2') && false,
            split: 5,
        },
        {
            title: '3★',
            selected: (stars) => stars === '3',
            onclick: () => router.setRoute('/roster/add/3') && false,
            split: 5,
        },
        {
            title: '4★',
            selected: (stars) => stars === '4',
            onclick: () => router.setRoute('/roster/add/4') && false,
            split: 5,
        },
        {
            title: '5★',
            selected: (stars) => stars === '5',
            onclick: () => router.setRoute('/roster/add/5') && false,
            split: 5,
        },
    ],
};

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

export { menu };
export default RosterAdd;
