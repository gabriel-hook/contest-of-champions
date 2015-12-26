import './TeamsPage.scss';
import teams from '../../service/teams';
import lang from '../../service/lang';
import Message from '../Message.jsx';
import Team from '../Team.jsx';
import ChampionPortrait from '../Champion/ChampionPortrait.jsx';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const TeamsPage = {
    view(/* ctrl, args */) {
        const result = teams.result;
        let message = `0 ${ lang.get('teams') }`;
        let teamDivs;
        let extrasHeader;
        let extrasDiv;
        if(result) {
            const { counts, teams, extras } = result;
            message = `${ counts.teams } ${ lang.get('teams') } ${ lang.get('with') } ${ counts.synergies } ${ lang.get('synergies') }`;
            teamDivs = teams.map(({ champions, synergies }) => (
                <Team
                    key={ champions.map((champion) => champion.id).join('-') }
                    champions={ champions }
                    synergies={ synergies }
                />
            ));
            if(extras.length) {
                extrasHeader = (
                    <div class="header">{ lang.get('extras') }</div>
                );
                extrasDiv = extras.map((champion, extrasIndex) => (
                    <ChampionPortrait
                        key={ `extras-${ extrasIndex }-${ champion.id }` }
                        champion={ champion }
                    />
                ));
            }
        }
        return (
            <div m="TeamsPage" class="teams">
                <Message value={ message } />
                <div>
                    { teamDivs }
                </div>
                { extrasHeader }
                <div>
                    { extrasDiv }
                </div>
                <div class="clear" />
            </div>
        );
    },
};

export default TeamsPage;
