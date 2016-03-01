import './TeamsEditPage.scss';
import teams, { synergiesFromChampions } from '../../service/teams';
import roster from '../../service/roster';
import lang from '../../service/lang';
import deepEqual from 'deep-equal';
import ChampionTeamSelector from '../Champion/ChampionTeamSelector.jsx';
import ChampionPortrait from '../Champion/ChampionPortrait.jsx';
import Message from '../Message.jsx';
import { requestRedraw } from '../../util/animation';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

function applyTeams(updatedTeams) {
    updatedTeams.forEach((team) => {
        team.value = team.champions.reduce((sum, champion) => sum + (champion.attr.pi || champion.pi), 0);
    });
    teams.result = {
        teams: updatedTeams,
        counts: {
            teams: 0,
            synergies: 0,
        },
        extras: [],
    };
    const inTeam = {};
    updatedTeams.forEach((team) => {
        teams.result.counts.teams++;
        teams.result.counts.synergies += team.synergies.length;
        team.champions.forEach((champion) => inTeam[ champion.id ] = true);
    });
    roster.filter((champion) => !inTeam[ champion.id ] && teams.stars[ champion.attr.stars ])
        .forEach((champion) => teams.result.extras.push(champion));
}

function calculateSynergies(swap) {
    const { source, target } = swap;
    if(source && target) {
        [ source, target ].forEach((group, index) => {
            const other = (index === 0)? target: source;
            if(group.team && group.index !== undefined) {
                const champions = [ ...group.team.champions ];
                champions[ group.index ] = other.champion;
                group.synergies = synergiesFromChampions(champions);
            }
            else {
                group.synergies = [];
            }
        });
    }
    else {
        [ source, target ].forEach((group) => {
            if(group) {
                if(group.champion && group.team) {
                    const champions = [ ...group.team.champions ];
                    champions[ group.index ] = null;
                    group.synergies = synergiesFromChampions(champions);
                }
                else if(group.champion) {
                    group.synergies = [];
                }
                else {
                    group.synergies = null;
                }
            }
        });
    }
}

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
        this.types = {};
        this.last = -1;
        this.reset = () => {
            const starsEqual = deepEqual(this.stars, teams.stars);
            const typesEqual = deepEqual(this.types, teams.types);
            if(this.last !== teams.last || this.size !== teams.size || !starsEqual || !typesEqual) {
                if(this.last === teams.last && (this.size !== teams.size || !starsEqual || !typesEqual)) {
                    teams.result = null;
                    this.teams = [];
                }
                else {
                    this.teams = teams.result && teams.result.teams.map(({ champions, synergies }) => ({
                        champions: [
                            ...champions,
                        ],
                        synergies: [
                            ...synergies,
                        ],
                    })) || [];
                }
                this.swap.source = null;
                this.swap.target = null;
                this.create.champions = [ null ];
                this.create.synergies = [];
                this.stars = { ...teams.stars };
                this.types = { ...teams.types };
                this.size = teams.size;
                this.last = teams.last;
                this.init = true;
            }
        };
        this.apply = () => {
            const { source, target } = this.swap;
            if(source && target) {
                if(source.index !== undefined && source.team) {
                    source.team.champions[ source.index ] = target.champion;
                    source.team.synergies = synergiesFromChampions(source.team.champions);
                }
                if(target.index !== undefined && target.team) {
                    target.team.champions[ target.index ] = source.champion;
                    target.team.synergies = synergiesFromChampions(target.team.champions);
                }
                if(source.create && !source.team.champions.some((champion) => !champion)) {
                    this.teams.push(this.create);
                    this.create = {
                        champions: [ null ],
                        synergies: [],
                    };
                }
            }
            this.swap.source = null;
            this.swap.target = null;
            applyTeams(this.teams);
        };
    },

    view(ctrl) {
        ctrl.reset();
        const { swap, create, teams } = ctrl;
        const { source, target } = swap;
        const targetId = target && target.champion && target.champion.id;
        const teamElements = [];
        const createElements = [];
        const extraElements = [];
        const inTeam = {};
        const synergiesCount = teams.reduce((amount, { synergies }) => amount + synergies.length, 0);
        const message = synergiesCount?
            `${ teams.length } ${ lang.get('teams') } ${ lang.get('width') } ${ synergiesCount } ${ lang.get('synergies') }`:
            `${ teams.length } ${ lang.get('teams') }`;
        teams.forEach(({ champions, synergies }, teamIndex) => {
            teamElements.push(
                <ChampionTeamSelector
                    team={{
                        champions,
                        synergies,
                    }}
                    swap={ swap }
                    onup={ teamIndex > 0 && (() => {
                        const swap = teams[ teamIndex ];
                        teams[ teamIndex ] = teams[ teamIndex - 1 ];
                        teams[ teamIndex - 1 ] = swap;
                        applyTeams(teams);
                        requestRedraw();
                    }) }
                    ondown={ teamIndex < teams.length - 1 && (() => {
                        const swap = teams[ teamIndex ];
                        teams[ teamIndex ] = teams[ teamIndex + 1 ];
                        teams[ teamIndex + 1 ] = swap;
                        applyTeams(teams);
                        requestRedraw();
                    }) }
                    draggable={ true }
                    droppable={ true }
                    ondragstart={(index) => {
                        swap.source = null;
                        swap.target = {
                            team: teams[ teamIndex ],
                            champion: champions[ index ],
                            index,
                        };
                        swap.dragging = true;
                        calculateSynergies(swap);
                        requestRedraw(5);
                    }}
                    ondragend={() => {
                        if(source && target) {
                            ctrl.apply();
                        }
                        swap.dragging = false;
                        swap.source = null;
                        swap.target = null;
                    }}
                    ondragover={(index, event) => {
                        if(target && target.champion && !champions.some(({ id }) => id === target.champion.id)) {
                            swap.source = {
                                team: teams[ teamIndex ],
                                champion: champions[ index ],
                                index,
                            };
                            calculateSynergies(swap);
                            requestRedraw();
                        }
                        event.preventDefault();
                    }}
                    ondragout={(index, event) => {
                        if(source && source.index === index) {
                            swap.source = null;
                            calculateSynergies(swap);
                        }
                        requestRedraw();
                        event.preventDefault();
                    }}
                    onclick={(index) => {
                        if(targetId === champions[ index ].id) {
                            swap.target = null;
                        }
                        else if (source && source.champion === champions[ index ]) {
                            swap.source = null;
                        }
                        else if(source && champions.some((champion) => source.champion === champion)) {
                            swap.source = {
                                team: teams[ teamIndex ],
                                champion: champions[ index ],
                                index,
                            };
                        }
                        else if(!source) {
                            swap.source = {
                                team: teams[ teamIndex ],
                                champion: champions[ index ],
                                index,
                            };
                            if(swap.target && swap.target.index) {
                                swap.target = null;
                            }
                        }
                        else {
                            swap.target = {
                                team: teams[ teamIndex ],
                                champion: champions[ index ],
                                index,
                            };
                            if(source && source.create && !source.champion) {
                                swap.source = null;
                            }
                        }
                        calculateSynergies(swap);
                        requestRedraw();
                    }}
                    onsplit={ source && champions.some((champion) => champion === source.champion) && !target && (() => {
                        ctrl.teams = teams.filter((element, index) => teamIndex !== index);
                        swap.source = null;
                        applyTeams(teams);
                        requestRedraw();
                    })}
                    onapply={ source && champions.some((champion) => champion === source.champion) && target && ctrl.apply }
                />
            );
            champions.forEach((champion) => inTeam[ champion.id ] = true);
        });
        const extras = roster
            .filter((champion) => ctrl.stars[ champion.attr.stars ])
            .filter((champion) => ctrl.types[ champion.attr.typeId ])
            .filter((champion) => !inTeam[ champion.id ]);
        if(extras.length >= ctrl.size) {
            while(create.champions.length < ctrl.size) {
                create.champions.push(null);
            }
            while(create.champions.length > ctrl.size) {
                create.champions.pop();
            }
            createElements.push(
                <ChampionTeamSelector
                    key={ `team-create` }
                    team={{
                        champions: create.champions,
                        synergies: create.synergies,
                    }}
                    swap={ swap }
                    draggable={ true }
                    droppable={ true }
                    ondragstart={(index) => {
                        const champion = create.champions[ index ];
                        if(champion) {
                            swap.source = null;
                            swap.target = {
                                team: create,
                                index,
                                champion,
                                create: true,
                            };
                            swap.dragging = true;
                            calculateSynergies(swap);
                        }
                        requestRedraw();
                    }}
                    ondragend={() => {
                        if(source && target) {
                            ctrl.apply();
                        }
                        swap.dragging = false;
                        swap.source = null;
                        swap.target = null;
                    }}
                    ondragover={(index, event) => {
                        const champion = create.champions[ index ];
                        if(target && !target.create && (!target.team || champion)) {
                            swap.source = {
                                team: create,
                                index,
                                champion,
                                create: true,
                            };
                            calculateSynergies(swap);
                            requestRedraw();
                        }
                        event.preventDefault();
                    }}
                    ondragout={(index, event) => {
                        if(source && source.index === index) {
                            swap.source = null;
                            calculateSynergies(swap);
                        }
                        requestRedraw();
                        event.preventDefault();
                    }}
                    onclick={(index) => {
                        if(source && source.create && source.index === index) {
                            swap.source = null;
                            if(swap.target && swap.target.team) {
                                swap.source = swap.target;
                                swap.target = null;
                            }
                        }
                        else {
                            if(!swap.target && swap.source && swap.source.id) {
                                swap.target = swap.source;
                            }
                            swap.source = {
                                team: create,
                                index,
                                champion: create.champions[ index ],
                                create: true,
                            };
                            if(target && target.champion && inTeam[ target.champion.id ]) {
                                swap.target = null;
                            }
                        }
                        calculateSynergies(swap);
                        requestRedraw();
                    }}
                    onapply={ source && target && source.create && target.champion && ctrl.apply }
                    onremove={ source && source.create && source.champion && !target && (() => {
                        create.champions[ swap.source.index ] = null;
                        create.synergies = synergiesFromChampions(create.champions);
                        swap.source = null;
                        applyTeams(teams);
                        requestRedraw();
                    }) }
                    create
                />
            );
            create.champions.forEach((champion) => champion && (inTeam[ champion.id ] = true));
        }
        extras.filter((champion) => champion && !inTeam[ champion.id ]).forEach((champion) => extraElements.push(
            <ChampionPortrait
                key={ `champion-${ champion.id }` }
                champion={ champion }
                editing={ target && target.champion && target.champion.id === champion.id }
                draggable={ true }
                events={{
                    ondragstart: () => {
                        swap.source = null;
                        swap.target = {
                            champion,
                        };
                        swap.dragging = true;
                        requestRedraw();
                    },
                    ondragend: () => {
                        if(source && target) {
                            ctrl.apply();
                        }
                        swap.dragging = false;
                        swap.source = null;
                        swap.target = null;
                    },
                }}
                onclick={() => {
                    if(target && target.champion && target.champion.id === champion.id) {
                        swap.target = null;
                    }
                    else {
                        swap.target = {
                            champion,
                        };
                    }
                    calculateSynergies(swap);
                    requestRedraw();
                }}
            />
        ));
        return (
            <div m="TeamsPage" class="teams">
                <Message value={ message } />
                <div>
                    { teamElements }
                </div>
                <div>
                    { createElements }
                </div>
                <div>
                    { extraElements }
                </div>
                <div class="clear" />
            </div>
        );
    },
};

export default TeamsEditPage;
