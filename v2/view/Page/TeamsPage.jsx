import './TeamsPage.scss';
import Message from '../Message.jsx';
import Champion from '../Champion.jsx';
import teams from '../../service/teams.js';
import lang from '../../service/lang.js';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const Teams = {
    view(/* ctrl, args */) {
        let count = 0;
        let teamDivs;
        if(teams.result) {
            count = teams.result.teams.length;
            teamDivs = teams.result.teams.map((team) => {
                return (
                    <div class="team">
                        { team.map((champion) => (
                            <Champion
                                key={ champion.id() }
                                champion={ champion }
                            />
                        )) }
                    </div>
                );
            });
        }

        return (
            <div class="teams">
                <Message value={ `${ count } ${ count === 1? lang.get('team'): lang.get('teams') }` } />
                { teamDivs }
                <div class="clear"></div>
            </div>
        );
    },
};

export default Teams;
