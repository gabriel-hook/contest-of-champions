import './RosterPage.scss';
import roster from '../../service/roster';
import router from '../../service/router';
import lang from '../../service/lang';
import Message from '../Message.jsx';
import Icon from '../Icon.jsx';
import ChampionPortrait from '../Champion/ChampionPortrait.jsx';
import ChampionUpgrades from '../Champion/ChampionUpgrades.jsx';
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
    view() {
        const total = roster.all().length;
        const champions = roster.filter((champion) => roster.getFilter(champion.attr.stars) && roster.getFilter(champion.attr.typeId));
        const prestige = champions
            .map(({ pi }) => pi)
            .sort((a, b) => b - a)
            .slice(0, 5)
            .reduce((value, pi, index, array) => value + pi / array.length, 0) | 0;
        const scalePi = roster.getScale();
        const handleSelect = ({ uid, stars }) => {
            router.setRoute(`/roster/${ uid }/${ stars }`);
            requestRedraw();
        };
        const upgrades = roster.getUpgrades() && (
            <ChampionUpgrades champions={ champions } />
        ) || null;

        return (
            <div m="RosterPage" class="roster">
                <Message
                    icon={(
                        <Icon
                            icon={
                                (champions.length > 1)? 'users':
                                (champions.length)? 'user':
                                'user-times'
                            }
                            before
                        />
                    )}
                    value={ `${ champions.length } ${ lang.get('of') } ${ total } ${ lang.get('champions') }` }
                    alt={ prestige && `${ lang.get('prestige') } ${ prestige }` }
                />
                { upgrades }
                <div>
                    { champions.map((champion) => (
                        <ChampionPortrait
                            key={ `roster-${ champion.id }` }
                            champion={ champion }
                            scalePi={ scalePi }
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
