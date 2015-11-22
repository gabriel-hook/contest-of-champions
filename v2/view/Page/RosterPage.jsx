import './RosterPage.scss';
import classNames from 'classnames';
import Message from '../Message.jsx';
import Champion from '../Champion.jsx';
import roster from '../../service/roster.js';
import router from '../../service/router.js';
import lang from '../../service/lang.js';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const tab = {
    id: 'roster',
    icon: 'th',
    title: 'roster',
};

const Roster = {
    view(ctrl, args) {
        const total = roster.all().length;
        const champions = roster.all();
        const { selected } = args;
        const handleSelect = ({ uid, stars }, event) => {
            event.stopPropagation();
            if(selected && selected.uid === uid && selected.stars === stars)
                router.setRoute('/roster');
            else
                router.setRoute(`/roster/${ uid }/${ stars }`);
        };
        const handleDeselect = (event) => {
            event.stopPropagation();
            router.setRoute('/roster');
        };
        const isEditing = (selected, champion) => (selected && champion
            && selected.uid === champion.attr.uid
            && selected.stars === champion.attr.stars
        );
        return (
            <div
                class={ classNames('roster', { 'roster--editing': selected }) }
                onclick={ handleDeselect.bind(this) }
            >
                <Message value={ `${ champions.length } ${ lang.get('of') } ${ total } ${ lang.get('champions') }` }/>
                { champions.map((champion) => (
                    <Champion
                        key={ champion.id() }
                        champion={ champion }
                        isEditing={ isEditing(selected, champion) }
                        onclick={ handleSelect.bind(this, champion.attr) }
                    />
                )) }
                <div class="clear"></div>
            </div>
        );
    },
};

export { tab };
export default Roster;
