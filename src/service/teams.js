import Champion from '../data/model/Champion';
import lang from '../service/lang';
import app from '../service/app';
import { notify } from '../util/notification';
import dataSynergies from '../data/synergies';
import { SPECIAL_EFFECTS } from '../data/effects';
import roster from './roster';
import router from './router';
import { fromStorage, toStorage } from '../util/storage';
import Worker from 'webworker!./teams/worker';
import { requestRedraw } from '../util/animation';

const PRESETS = {
    'offensive': {
        'effect-attack': 0.6,
        'effect-idol': 0.6,
        'effect-stun': 0.5,
        'effect-mutantagenda': 0.6,
        'effect-inseparable': 0.6,
        'effect-critrate': 0.4,
        'effect-critdamage': 0.4,
        'effect-powergain': 0.2,
        'effect-powersteal': 0.2,
        'effect-perfectblock': 0.1,
        'effect-block': 0.1,
        'effect-armor': 0.1,
        'effect-health': 0.1,
        'effect-healthsteal': 0.2,
        'effect-heroesforhire': 0.2,
        'effect-thunderbolts': 0.2,
    },
    'balanced': {
        'effect-attack': 0.5,
        'effect-idol': 0.5,
        'effect-stun': 0.5,
        'effect-mutantagenda': 0.5,
        'effect-inseparable': 0.5,
        'effect-critrate': 0.5,
        'effect-critdamage': 0.5,
        'effect-powergain': 0.5,
        'effect-powersteal': 0.5,
        'effect-perfectblock': 0.5,
        'effect-block': 0.5,
        'effect-armor': 0.5,
        'effect-health': 0.5,
        'effect-healthsteal': 0.5,
        'effect-heroesforhire': 0.5,
        'effect-thunderbolts': 0.5,
    },
    'defensive': {
        'effect-attack': 0.1,
        'effect-idol': 0.3,
        'effect-stun': 0.5,
        'effect-mutantagenda': 0.1,
        'effect-inseparable': 0.1,
        'effect-critrate': 0.1,
        'effect-critdamage': 0.1,
        'effect-powergain': 0.3,
        'effect-powersteal': 0.3,
        'effect-perfectblock': 0.8,
        'effect-block': 0.7,
        'effect-armor': 0.7,
        'effect-health': 0.5,
        'effect-healthsteal': 0.5,
        'effect-heroesforhire': 0.5,
        'effect-thunderbolts': 0.6,
    },
};

const PRESETS_DUPLICATES = {
    'all': {
        'duplicates-2': 1,
        'duplicates-3': 1,
        'duplicates-4': 1,
        'duplicates-5': 1,
    },
    'balanced': {
        'duplicates-2': 0.8,
        'duplicates-3': 0.4,
        'duplicates-4': 0.2,
        'duplicates-5': 0.1,
    },
    'none': {
        'duplicates-2': 0,
        'duplicates-3': 0,
        'duplicates-4': 0,
        'duplicates-5': 0,
    },
};

const PRESETS_RANGE = {
    'all': {
        'minimum': 0,
        'maximum': 50000,
    },
    'streak': {
        'minimum': 4000,
        'maximum': 4500,
    },
};

const DEFAULT_WEIGHTS = {
    ...PRESETS_DUPLICATES[ 'balanced' ],
    ...PRESETS[ 'offensive' ],
};

const teams = {
    type: 'arena',
    size: 3,
    stars: {
        1: false,
        2: true,
        3: true,
        4: false,
        5: false,
    },
    types:{
        cosmic: true,
        tech: true,
        mutant: true,
        skill: true,
        science: true,
        mystic: true,
    },
    weights: {
        ...DEFAULT_WEIGHTS,
    },
    range: {
        minimum: 0,
        maximum: 50000,
    },
    ...fromStorage('teams', {}),
    progress: 0,
    building: false,
};

//assign missing fields a default value.
for(const key in DEFAULT_WEIGHTS) {
    if(teams.weights[ key ] === undefined) {
        teams.weights[ key ] = DEFAULT_WEIGHTS[ key ];
    }
}

function save() {
    toStorage('teams', {
        type: teams.type,
        size: teams.size,
        stars: teams.stars,
        types: teams.types,
        weights: teams.weights,
        range: teams.range,
    });
}

function idToRosterChampion(id) {
    const { uid, stars } = Champion.idToObject(id);
    return roster.filter(({ attr }) => attr.uid === uid && attr.stars === stars)[ 0 ];
}

function synergiesFromChampions(team) {
    const specials = {};
    const champions = team.reduce((array, champion) => {
        if(champion) {
            return [
                ...array,
                champion,
            ];
        }
        return array;
    }, []);
    return dataSynergies.filter((synergy) => {
        const { fromId, fromStars, toId } = synergy.attr;
        if (!champions.find(({ attr }) => fromId === attr.uid && fromStars === attr.stars))
            return false;
        return Boolean(champions.find(({ attr }) => toId === attr.uid));

    }).filter(({ attr }) => {
        if(SPECIAL_EFFECTS[ attr.effectId ]) {
            const specialId = `${ attr.fromId }-${ attr.fromStars }-${ attr.effectId }`;
            if(specials[ specialId ]) {
                return false;
            }
            specials[ specialId ] = true;
        }
        return true;
    });
}

let progressResetTimeout;

let worker;
function buildTeams() {
    if(worker)
        worker.terminate();
    worker = new Worker();
    worker.onmessage = (event) => {
        switch(event.data.type) {
        case 'result':
            const result = event.data.data;
            teams.progress = 1;
            setTimeout(() => {
                let teamsCount = 0;
                let synergiesCount = 0;
                teams.result = {
                    ...result,
                    teams: result.teams.map((team) => {
                        team.sort();
                        const champions = team.map(idToRosterChampion);
                        const synergies = synergiesFromChampions(champions);
                        teamsCount++;
                        synergiesCount += synergies.length;
                        return {
                            champions,
                            synergies,
                        };
                    }),
                    counts: {
                        teams: teamsCount,
                        synergies: synergiesCount,
                    },
                    extras: result.extras.map(idToRosterChampion),
                };
                teams.building = false;
                teams.last = Date.now();
                progressResetTimeout = setTimeout(() => {
                    teams.progress = 0;
                    requestRedraw();
                    notify({
                        message: lang.get('notification-team-built'),
                        tag: 'team-built',
                        onclick: () => {
                            app.menuOpen = false;
                            router.setRoute('/teams');
                            requestRedraw();
                        },
                    });
                }, 250);
                requestRedraw();
            }, 50);
            requestRedraw();
            break;
        case 'progress':
            const progress = event.data.data;
            teams.progress = progress.current / progress.max;
            requestRedraw(teams.progress > 0 && teams.progress < 1? 5: 0);
            break;
        }
    };
    worker.postMessage({
        type: 'build',
        data: {
            type: teams.type,
            champions: roster
                .filter(({ attr }) => teams.types[ attr.typeId ])
                .filter(({ attr }) => teams.stars[ attr.stars ])
                .filter(
                    teams.type === 'alliance'? ({ attr }) => attr.role !== 'quest':
                    teams.type === 'quest'? ({ attr }) => attr.role !== 'alliance':
                    () => true
                )
                .map((champion) => champion.attr),
            size: teams.size,
            weights: {
                ...teams.weights,
            },
            range: {
                ...teams.range,
            },
        },
    });
    teams.building = true;
    teams.progress = 0;
    clearTimeout(progressResetTimeout);
}

export { PRESETS, PRESETS_DUPLICATES, PRESETS_RANGE, save, buildTeams, synergiesFromChampions };
export default teams;
