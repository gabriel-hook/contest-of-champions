import dataSynergies from '../data/synergies';
import roster from './roster';
import { fromStorage, toStorage } from '../util/storage';
import Worker from 'webworker!./teams/worker';
import { requestRedraw } from '../util/animation';

const PRESETS = {
    'offensive': {
        'effect-attack': 0.6,
        'effect-stun': 0.5,
        'effect-critrate': 0.4,
        'effect-critdamage': 0.4,
        'effect-powergain': 0.2,
        'effect-powersteal': 0.2,
        'effect-perfectblock': 0.1,
        'effect-block': 0.1,
        'effect-armor': 0.1,
        'effect-health': 0.1,
        'effect-healthsteal': 0.2,
    },
    'balanced': {
        'effect-attack': 0.5,
        'effect-stun': 0.5,
        'effect-critrate': 0.5,
        'effect-critdamage': 0.5,
        'effect-powergain': 0.5,
        'effect-powersteal': 0.5,
        'effect-perfectblock': 0.5,
        'effect-block': 0.5,
        'effect-armor': 0.5,
        'effect-health': 0.5,
        'effect-healthsteal': 0.5,
    },
    'defensive': {
        'effect-attack': 0.1,
        'effect-stun': 0.5,
        'effect-critrate': 0.1,
        'effect-critdamage': 0.1,
        'effect-powergain': 0.3,
        'effect-powersteal': 0.3,
        'effect-perfectblock': 0.8,
        'effect-block': 0.7,
        'effect-armor': 0.7,
        'effect-health': 0.5,
        'effect-healthsteal': 0.5,
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
    weights: {
        ...PRESETS_DUPLICATES[ 'balanced' ],
        ...PRESETS[ 'offensive' ],
    },
    range: {
        minimum: 0,
        maximum: 10000,
    },
    ...fromStorage('teams', {}),
    progress: 0,
    building: false,
};

function update() {
    toStorage('teams', {
        type: teams.type,
        size: teams.size,
        stars: teams.stars,
        weights: teams.weights,
        range: teams.range,
    });
}

function fidToRosterChampion(fid) {
    /* eslint-disable eqeqeq */
    const [ uid, stars ] = fid.split('-');
    return roster.filter((champion) =>
        champion.attr.uid === uid && champion.attr.stars == stars
    )[ 0 ];
    /* eslint-enable eqeqeq */
}

let progressResetTimeout;
const worker = new Worker();
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
                    const champions = team.map(fidToRosterChampion);
                    const synergies = dataSynergies.filter((synergy) => {
                        const { fromId, fromStars, toId } = synergy.attr;
                        if (!champions.find(({ attr }) => fromId === attr.uid && fromStars === attr.stars))
                            return false;
                        return Boolean(champions.find(({ attr }) => toId === attr.uid));

                    });
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
                extras: result.extras.map(fidToRosterChampion),
            };
            teams.building = false;
            progressResetTimeout = setTimeout(() => {
                teams.progress = 0;
                requestRedraw();
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

function buildTeams() {
    if(teams.building)
        return;
    clearTimeout(progressResetTimeout);
    teams.building = true;
    teams.progress = 0;
    worker.postMessage({
        type: 'build',
        data: {
            type: teams.type,
            champions: roster
                .filter((champion) => teams.stars[ champion.attr.stars ])
                .map((champion) => champion.id),
            size: teams.size,
            weights: {
                ...teams.weights,
            },
            range: {
                ...teams.range,
            },
        },
    });
}

export { PRESETS, PRESETS_DUPLICATES, update, buildTeams };
export default teams;
