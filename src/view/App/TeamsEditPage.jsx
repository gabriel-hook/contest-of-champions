import './TeamsEditPage.scss';
import teams from '../../service/teams';
import roster from '../../service/roster';
//import lang from '../../service/lang';
import ChampionTeamSelector from '../Champion/ChampionTeamSelector.jsx';
import ChampionPortrait from '../Champion/ChampionPortrait.jsx';
import { requestRedraw } from '../../util/animation';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const TeamsEditPage = {
    controller() {
        this.swap = {};
        this.create = {
            champions: [],
            synergies: [],
        };
    },

    view({ swap, create }) {
        const result = teams.result;
        const elements = [];
        const inTeam = {};
        if(result) {
            const { teams } = result;
            teams && teams.forEach(({ champions, synergies }, teamIndex) => elements.push(
                <ChampionTeamSelector
                    key={ `team-selectors-${ teamIndex }` }
                    team={{
                        champions,
                        synergies,
                    }}
                    swap={ swap }
                    onclick={(id) => {
                        if(swap.target === id) {
                            swap.target = null;
                        }
                        else if (swap.source === id) {
                            swap.source = null;
                        }
                        else if(champions.some((champion) => champion.id === swap.source)) {
                            swap.source = id;
                        }
                        else if(!swap.source) {
                            swap.source = id;
                            swap.target = null;
                        }
                        else {
                            swap.target = id;
                        }
                        requestRedraw();
                    }}
                />
            ));
            teams && teams.forEach(({ champions }) => champions.forEach((champion) => inTeam[ champion.id ] = true));
        }

        //add temp team here...
        while(create.champions.length < teams.size) {
            create.champions.push(null);
        }
        while(create.champions.length > teams.size) {
            create.champions.pop();
        }
        elements.push(
            <ChampionTeamSelector
                key={ `team-selectors-create` }
                team={{
                    champions: create.champions,
                    synergies: create.synergies,
                }}
                swap={ swap }
                onclick={(id) => {
                    if(swap.target === id) {
                        swap.target = null;
                    }
                    else if (swap.source === id) {
                        swap.source = null;
                    }
                    else if(create.champions.some((champion, index) => champion && champion.id === swap.source ||
                        `create_${ index }` === swap.source)) {
                        swap.source = id;
                    }
                    else if(!swap.source) {
                        swap.source = id;
                        swap.target = null;
                    }
                    else {
                        swap.target = id;
                    }
                    requestRedraw();
                }}
            />
        );

        roster
            .filter((champion) => !inTeam[ champion.id ] && teams.stars[ champion.attr.stars ])
            .forEach((champion) => elements.push(
                <ChampionPortrait
                    key={ `team-selectors-${ champion.id }` }
                    champion={ champion }
                    editing={ swap.target === champion.id }
                    onclick={() => {
                        if(swap.target === champion.id) {
                            swap.target = null;
                        }
                        else {
                            swap.target = champion.id;
                        }
                        requestRedraw();
                    }}
                />
            ));
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
