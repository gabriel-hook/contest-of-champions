import './TeamsEditPage.scss';
import teams, { synergiesFromChampions } from '../../service/teams';
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
        this.swap = {
            source: null,
            target: null,
        };
        this.create = { };
        this.teams = [];
        this.size = 0;
        this.stars = {};
        this.last = -1;
        this.reset = () => {
            if(this.last === teams.last) {
                return;
            }
            this.teams = teams.result && teams.result.teams.map(({ champions, synergies }) => ({
                champions: [
                    ...champions,
                ],
                synergies: [
                    ...synergies,
                ],
            })) || [];
            this.swap.source = null;
            this.swap.target = null;
            this.create.champions = [];
            this.create.synergies = [];
            this.stars = teams.stars;
            this.size = teams.size;
            this.last = teams.last;
        };
        this.apply = () => {
            const { source, target } = this.swap;

            if(source && target) {
                if(source.create) {
                    this.create.champions[ source.index ] = roster.find(({ id }) => id === target.id);
                    this.create.synergies = synergiesFromChampions(this.create.champions);
                    if(this.create.champions.reduce((count, element) => count + (element? 1: 0), 0) === this.size) {
                        this.teams.push(this.create);
                        this.create = {
                            champions: [],
                            synergies: [],
                        };
                    }
                }
                else {
                    const sourceTeam = source && source.team;
                    const targetTeam = target && target.team;
                    // swapping between teams
                    if(sourceTeam && targetTeam) {
                        const sourceIndex = sourceTeam.champions.findIndex((champion) => champion.id === source.id);
                        const targetIndex = targetTeam.champions.findIndex((champion) => champion.id === target.id);
                        const swap = sourceTeam.champions[ sourceIndex ];
                        sourceTeam.champions[ sourceIndex ] = targetTeam.champions[ targetIndex ];
                        targetTeam.champions[ targetIndex ] = swap;
                        sourceTeam.synergies = synergiesFromChampions(sourceTeam.champions);
                        targetTeam.synergies = synergiesFromChampions(targetTeam.champions);
                    }
                    // swapping a free champions
                    else {
                        const sourceIndex = sourceTeam.champions.findIndex((champion) => champion.id === source.id);
                        sourceTeam.champions[ sourceIndex ] = roster.find(({ id }) => id === target.id);
                        sourceTeam.synergies = synergiesFromChampions(sourceTeam.champions);
                    }
                }
            }
            this.swap.source = null;
            this.swap.target = null;
        };
    },

    view(ctrl) {
        ctrl.reset();
        const { swap, create, teams } = ctrl;
        const sourceId = swap.source && swap.source.id;
        const targetId = swap.target && swap.target.id;
        const elements = [];
        const inTeam = {};
        teams.forEach(({ champions, synergies }, teamIndex) => {
            elements.push(
                <ChampionTeamSelector
                    key={ `team-selectors-${ teamIndex }` }
                    team={{
                        champions,
                        synergies,
                    }}
                    swap={ swap }
                    onclick={(attributes) => {
                        if(targetId === attributes.id) {
                            swap.target = null;
                        }
                        else if (sourceId === attributes.id) {
                            swap.source = null;
                        }
                        else if(champions.some((champion) => champion.id === sourceId)) {
                            swap.source = {
                                team: teams[ teamIndex ],
                                ...attributes,
                            };
                        }
                        else if(!sourceId) {
                            swap.source = {
                                team: teams[ teamIndex ],
                                ...attributes,
                            };
                            swap.target = null;
                        }
                        else {
                            swap.target = {
                                team: teams[ teamIndex ],
                                ...attributes,
                            };
                        }
                        requestRedraw();
                    }}
                    onapply={ champions.some((champion) => champion && champion.id === sourceId) && ctrl.apply }
                />
            );
            champions.forEach((champion) => inTeam[ champion.id ] = true);
        });
        const extras = roster.filter((champion) => !inTeam[ champion.id ] && ctrl.stars[ champion.attr.stars ]);
        if(extras.length >= ctrl.size) {
            while(create.champions.length < ctrl.size) {
                create.champions.push(null);
            }
            while(create.champions.length > ctrl.size) {
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
                    onclick={(attributes) => {
                        if(swap.source && (swap.source.create && swap.source.index === attributes.index)) {
                            swap.source = null;
                            swap.target = null;
                        }
                        else {
                            swap.source = {
                                team: create,
                                ...attributes,
                            };
                            if(targetId && inTeam[ targetId ]) {
                                swap.target = null;
                            }
                        }
                        requestRedraw();
                    }}
                    onapply={ swap.source && swap.source.create && ctrl.apply }
                />
            );
            create.champions.forEach((champion) => champion && (inTeam[ champion.id ] = true));
        }
        extras.filter((champion) => champion && !inTeam[ champion.id ]).forEach((champion) => elements.push(
            <ChampionPortrait
                key={ `team-selectors-${ champion.id }` }
                champion={ champion }
                editing={ targetId === champion.id }
                onclick={() => {
                    if(targetId === champion.id) {
                        swap.target = null;
                    }
                    else {
                        swap.target = {
                            id: champion.id,
                        };
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
