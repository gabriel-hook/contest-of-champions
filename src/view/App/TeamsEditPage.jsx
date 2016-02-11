import './TeamsEditPage.scss';
import teams from '../../service/teams';
//import lang from '../../service/lang';
import ChampionTeam from '../Champion/ChampionTeam.jsx';
//import ChampionPortrait from '../Champion/ChampionPortrait.jsx';
import ChampionHeader from '../Champion/ChampionHeader.jsx';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const TeamsEditPage = {
    view() {
        const result = teams.result;
        const elements = [];
        if(result) {
            const { teams, extras } = result;
            teams && teams.forEach(({ champions, synergies }) => elements.push(
                <ChampionTeam
                    key={ `teams-${ champions.map((champion) => champion.id).join('-') }` }
                    champions={ champions }
                    synergies={ synergies }
                />
            ));

            extras && extras.forEach((champion) => elements.push(
                <ChampionHeader
                    champion={ champion }
                />
            ));
        }
        return (
            <div m="TeamsPage" class="teams">
                <div>
                    { elements }
                </div>
                <div class="clear" />
            </div>
        );
    },
};

export default TeamsEditPage;
