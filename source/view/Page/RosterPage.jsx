import './RosterPage.scss';
import roster from '../../service/roster';
import router from '../../service/router';
import lang from '../../service/lang';
import Message from '../Message.jsx';
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
    view(/* ctrl, args */) {
        const total = roster.all().length;
        const champions = roster.all();
        const handleSelect = ({ uid, stars }) => router.setRoute(`/roster/${ uid }/${ stars }`);
        return (
            <div
                class="roster"
            >
                <Message value={ `${ champions.length } ${ lang.get('of') } ${ total } ${ lang.get('champions') }` }/>
                { champions.map((champion, index) => (
                    <div key={ `${ index }-${ champion.id() }` }>
                        <Champion
                            champion={ champion }
                            onclick={ handleSelect.bind(this, champion.attr) }
                        />
                    </div>
                )) }
                <div class="clear" />
            </div>
        );
    },
};

export { tab };
export default RosterPage;
