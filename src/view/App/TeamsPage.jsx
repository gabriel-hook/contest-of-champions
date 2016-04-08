import './TeamsPage.scss';
import { roleImage } from '../../data/champions';
import { ROLE_ARENA, ROLE_ALLIANCE_WAR_ATTACK, ROLE_ALLIANCE_WAR_DEFENSE } from '../../data/model/Champion';
import teams from '../../service/teams';
import lang from '../../service/lang';
import Message from '../Message.jsx';
import ImageIcon from '../ImageIcon.jsx';
import ChampionTeam from '../Champion/ChampionTeam.jsx';
import ChampionPortrait from '../Champion/ChampionPortrait.jsx';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

function results(type, size) {
    const result = teams.result[ `${ type }-${ size }` ];
    if(result) {
        const { counts, teams, extras } = result;
        const message = type === ROLE_ARENA?
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
                        <ImageIcon
                            src={ roleImage(type, 'white') }
                            alt={ roleImage(type, 'black') }
                            icon="square-o"
                        />
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
                    <ImageIcon
                        src={ roleImage(type, 'white') }
                        alt={ roleImage(type, 'black') }
                        icon="square-o"
                    />
                )}
                value={ lang.get(`role-${ type }`) }
            />
        </div>
    );
}

const TeamsPage = {
    view() {
        let result;
        if(teams.type === ROLE_ALLIANCE_WAR_ATTACK || teams.type === ROLE_ALLIANCE_WAR_DEFENSE) {
            result = [
                results(ROLE_ALLIANCE_WAR_ATTACK, 3),
                results(ROLE_ALLIANCE_WAR_DEFENSE, 5),
            ];
        }
        else {
            result = [
                results(teams.type, teams.size),
            ];
        }
        return (
            <div m="TeamsPage" class="teams">
                { result }
                <div class="clear" />
            </div>
        );
    },
};

export default TeamsPage;
