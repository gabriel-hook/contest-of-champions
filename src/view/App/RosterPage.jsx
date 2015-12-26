import './RosterPage.scss';
import roster from '../../service/roster';
import router from '../../service/router';
import lang from '../../service/lang';
import Message from '../Message.jsx';
import ChampionPortrait from '../Champion/ChampionPortrait.jsx';
import { requestRedraw } from '../../util/animation';
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
        const handleSelect = ({ uid, stars }) => {
            router.setRoute(`/roster/${ uid }/${ stars }`);
            requestRedraw();
        };
        return (
            <div m="RosterPage" class="roster">
                <Message value={ `${ champions.length } ${ lang.get('of') } ${ total } ${ lang.get('champions') }` }/>
                <div>
                    { champions.map((champion, index) => (
                        <ChampionPortrait
                            key={ `${ index }-${ champion.id }` }
                            champion={ champion }
                            onclick={ handleSelect.bind(this, champion.attr) }
                        />
                    )) }
                </div>
                <div class="clear" />
            </div>
        );
    },
};

export { tab };
export default RosterPage;
