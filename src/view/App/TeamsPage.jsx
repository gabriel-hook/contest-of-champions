import './TeamsPage.scss';
import { ROLE } from '../../data/model/Role';
import { roleIcon } from '../../data/roles';
import teams from '../../service/teams';
import lang from '../../service/lang';
import Message from '../Message.jsx';
import Icon from '../Icon.jsx';
import ChampionTeam from '../Champion/ChampionTeam.jsx';
import ChampionPortrait from '../Champion/ChampionPortrait.jsx';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

function results(type, size) {
    const result = teams.result[ `${ type }-${ size }` ];
    if(result) {
        const { counts, teams, extras } = result;
        const message = type === ROLE.ARENA?
            ` - ${ counts.teams } ${ lang.get('teams') } ${ lang.get('with') } ${ counts.synergies } ${ lang.get('synergies') }`:
            ` - ${ counts.synergies } ${ lang.get('synergies') }`;
        const teamDivs = teams.map(({ champions, synergies }) => (
            <ChampionTeam
                key={ `teams-${ champions.map((champion) => champion.id).join('-') }` }
                champions={ champions }
                synergies={ synergies }
                showBadges={ 'upgrade' }
            />
        ));
        const extraDivs = [];
        if(extras.length) {
            extraDivs.push(
                <div class="header">{ lang.get('extras') }</div>
            );
            extraDivs.push(extras.map((champion) => (
                <ChampionPortrait
                    key={ `teams-extras-${ champion.id }` }
                    champion={ champion }
                    showBadges={ 'upgrade' }
                />
            )));
        }
        return (
            <div>
                <Message
                    icon={(
                        <Icon icon={ roleIcon(type) } before />
                    )}
                    value={ `${ lang.get(`role-${ type }`) }${ message }` }
                />
                { teamDivs }
                { extraDivs }
            </div>
        );
    }
    return (
        <div>
            <Message
                icon={(
                    <Icon icon={ roleIcon(type) } before />
                )}
                value={ lang.get(`role-${ type }`) }
            />
        </div>
    );
}

const TeamsPage = {
    view() {
        return (
            <div m="TeamsPage" class="teams">
                {(teams.type === ROLE.ALLIANCE_WAR_ATTACK || teams.type === ROLE.ALLIANCE_WAR_DEFENSE)? (
                    <div key="teams-alliance">
                        { results(ROLE.ALLIANCE_WAR_ATTACK, 3) }
                        { results(ROLE.ALLIANCE_WAR_DEFENSE, 5) }
                    </div>
                ): (
                    <div key="teams-other">
                        { results(teams.type, teams.size) }
                    </div>
                )}
                <div key="none" class="clear" />
            </div>
        );
    },
};

export default TeamsPage;
