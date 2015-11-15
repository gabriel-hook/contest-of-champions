import './Roster.scss';
import Message from '../Message.jsx';
import Champion from '../Champion.jsx';
import roster from '../../service/roster.js';
import router from '../../service/router.js';
import lang from '../../service/lang.js';
import m from 'mithril';

const tab = {
    id: 'roster',
    icon: 'th',
    title: 'roster',
};

const menu = {
    header:{
        title: 'roster',
        icon: 'th',
    },
    options:[
        {
            title: 'add-champion',
            icon: 'user-plus',
            onclick: () => router.setRoute('/roster/add/2') || true,
        },
        {
            title: 'import-csv',
            icon: 'clipboard',
        },
        {
            title: 'export-csv',
            icon: 'floppy-o',
        },
        {
            title: 'delete-all',
            icon: 'user-times',
            onclick: () => {
                roster.clear();
                m.redraw();
            },
        },
    ],
};

const Roster = {
    view(ctrl, args) {
        const total = roster.all().length;
        const champions = roster.filter({
            // some filter
        });
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
                class={ `roster ${ selected ? 'editing': '' }` }
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

export { tab, menu };
export default Roster;
