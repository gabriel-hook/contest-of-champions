import lang from '../service/lang';
import app from '../service/app';
import { notify } from '../util/notification';
import Champion from '../data/model/Champion';
import { ROLE } from '../data/model/Role';
import { TYPE } from '../data/model/Type';
import { EFFECT } from '../data/model/Effect';
import { WILLPOWER_SAFE_CHAMPIONS } from '../data/champions';
import { synergiesFromChampions } from '../data/synergies';
import roster from './roster';
import router from './router';
import { fromStorage, toStorage } from '../util/storage';
import { requestRedraw } from '../util/animation';
/* eslint-disable import/no-unresolved */
import Worker from 'webworker?filename=scripts/worker-[hash:6].js!./teams/worker';
/* eslint-enable import/no-unresolved */

const PRESETS = {
    'offensive': {
        [ EFFECT.ATTACK ]: 0.6,
        [ EFFECT.IDOL ]: 0.6,
        [ EFFECT.INSEPARABLE ]: 0.6,
        [ EFFECT.MUTANT_AGENDA ]: 0.6,
        [ EFFECT.COSMIC_SUPREMACY ]: 0.4,
        [ EFFECT.CRITICAL_RATE ]: 0.4,
        [ EFFECT.CRITICAL_DAMAGE ]: 0.4,
        [ EFFECT.BLEED ]: 0.5,
        [ EFFECT.COMBO ]: 0.6,
        [ EFFECT.STUN_ACTIVATION ]: 0.5,
        [ EFFECT.STUN_SPECIAL ]: 0.5,
        [ EFFECT.POWER_GAIN ]: 0.2,
        [ EFFECT.POWER_STEAL ]: 0.2,
        [ EFFECT.ITS_COMPLICATED ]: 0.2,
        [ EFFECT.PERFECT_BLOCK ]: 0.1,
        [ EFFECT.ARMOR ]: 0.1,
        [ EFFECT.HEALTH ]: 0.1,
        [ EFFECT.HEALTH_STEAL ]: 0.2,
        [ EFFECT.HEROES_FOR_HIRE ]: 0.2,
        [ EFFECT.THUNDERBOLTS ]: 0.2,
        [ EFFECT.MASTERMINDS ]: 0.6,
        [ EFFECT.SHIELD_AGENTS ]: 0.6,
        [ EFFECT.SHIELD_CLEARANCE ]: 0.8,
    },
    'balanced': {
        [ EFFECT.ATTACK ]: 0.5,
        [ EFFECT.IDOL ]: 0.5,
        [ EFFECT.INSEPARABLE ]: 0.5,
        [ EFFECT.MUTANT_AGENDA ]: 0.5,
        [ EFFECT.COSMIC_SUPREMACY ]: 0.5,
        [ EFFECT.CRITICAL_RATE ]: 0.5,
        [ EFFECT.CRITICAL_DAMAGE ]: 0.5,
        [ EFFECT.BLEED ]: 0.5,
        [ EFFECT.COMBO ]: 0.5,
        [ EFFECT.STUN_ACTIVATION ]: 0.5,
        [ EFFECT.STUN_SPECIAL ]: 0.5,
        [ EFFECT.POWER_GAIN ]: 0.5,
        [ EFFECT.POWER_STEAL ]: 0.5,
        [ EFFECT.ITS_COMPLICATED ]: 0.5,
        [ EFFECT.PERFECT_BLOCK ]: 0.5,
        [ EFFECT.ARMOR ]: 0.5,
        [ EFFECT.HEALTH ]: 0.5,
        [ EFFECT.HEALTH_STEAL ]: 0.5,
        [ EFFECT.HEROES_FOR_HIRE ]: 0.5,
        [ EFFECT.THUNDERBOLTS ]: 0.5,
        [ EFFECT.MASTERMINDS ]: 0.5,
        [ EFFECT.SHIELD_AGENTS ]: 0.5,
        [ EFFECT.SHIELD_CLEARANCE ]: 0.5,
    },
    'defensive': {
        [ EFFECT.ATTACK ]: 0.1,
        [ EFFECT.IDOL ]: 0.3,
        [ EFFECT.INSEPARABLE ]: 0.1,
        [ EFFECT.MUTANT_AGENDA ]: 0.1,
        [ EFFECT.COSMIC_SUPREMACY ]: 0.2,
        [ EFFECT.CRITICAL_RATE ]: 0.1,
        [ EFFECT.CRITICAL_DAMAGE ]: 0.1,
        [ EFFECT.BLEED ]: 0.1,
        [ EFFECT.COMBO ]: 0.1,
        [ EFFECT.STUN_ACTIVATION ]: 0.5,
        [ EFFECT.STUN_SPECIAL ]: 0.5,
        [ EFFECT.POWER_GAIN ]: 0.3,
        [ EFFECT.POWER_STEAL ]: 0.3,
        [ EFFECT.ITS_COMPLICATED ]: 0.8,
        [ EFFECT.PERFECT_BLOCK ]: 0.8,
        [ EFFECT.ARMOR ]: 0.7,
        [ EFFECT.HEALTH ]: 0.5,
        [ EFFECT.HEALTH_STEAL ]: 0.5,
        [ EFFECT.HEROES_FOR_HIRE ]: 0.5,
        [ EFFECT.THUNDERBOLTS ]: 0.6,
        [ EFFECT.MASTERMINDS ]: 0.1,
        [ EFFECT.SHIELD_AGENTS ]: 0.6,
        [ EFFECT.SHIELD_CLEARANCE ]: 0.8,
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
        'minimum-champion': 0,
        'maximum-champion': 10000,
        'minimum-team': 0,
        'maximum-team': 50000,
    },
    'streak': {
        'minimum-team': 4000,
        'maximum-team': 4500,
    },
};

const DEFAULT_WILLPOWER_SAFE = false;

const DEFAULT_BASE = 0;

const DEFAULT_SANDBAGGING = false;

const DEFAULT_RANGE = {
    ...PRESETS_RANGE[ 'all' ],
};

const DEFAULT_WEIGHTS = {
    ...PRESETS_DUPLICATES[ 'balanced' ],
    ...PRESETS[ 'offensive' ],
    'base': DEFAULT_BASE,
};

const teams = {
    type: ROLE.ARENA,
    size: 3,
    stars: {
        1: true,
        2: true,
        3: true,
        4: true,
        5: true,
    },
    types:{
        [ TYPE.COSMIC ]: true,
        [ TYPE.TECH ]: true,
        [ TYPE.MUTANT ]: true,
        [ TYPE.SKILL ]: true,
        [ TYPE.SCIENCE ]: true,
        [ TYPE.MYSTIC ]: true,
    },
    weights: {
        ...DEFAULT_WEIGHTS,
    },
    range: {
        ...DEFAULT_RANGE,
    },
    willpowersafe: DEFAULT_WILLPOWER_SAFE,
    sandbagging: DEFAULT_SANDBAGGING,
    ...fromStorage('teams', {}),
    progress: 0,
    building: false,
    result: {},
};

// Apply missing defaults
Object.keys(DEFAULT_WEIGHTS).forEach((key) => {
    if(!(key in teams.weights)) {
        teams.weights[ key ] = DEFAULT_WEIGHTS[ key ];
    }
});
Object.keys(DEFAULT_RANGE).forEach((key) => {
    if(!(key in teams.range)) {
        teams.range[ key ] = DEFAULT_RANGE[ key ];
    }
});

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
        sandbagging: teams.sandbagging,
        willpowersafe: teams.willpowersafe,
    });
}

function loadTeam(type, size) {
    if(type === ROLE.ARENA) {
        return;
    }
    const champions = roster.filter((champion) => champion && champion.attr.role === type);
    if(champions.length === size) {
        champions.sort();
        const synergies = synergiesFromChampions(champions);
        teams.result[ `${ type }-${ size }` ] = {
            teams: [
                {
                    champions,
                    synergies,
                },
            ],
            counts: {
                teams: 1,
                synergies: synergies.length,
            },
            extras: [],
        };
    }
    else {
        teams.result[ `${ type }-${ size }` ] = null;
    }
}

[
    { type: ROLE.ALLIANCE_QUEST, size: 3 },
    { type: ROLE.ALLIANCE_WAR_ATTACK, size: 3 },
    { type: ROLE.ALLIANCE_WAR_DEFENSE, size: 5 },
].forEach(({ type, size }) => loadTeam(type, size));

function saveTeam() {
    teams.last = Date.now();
    if(teams.type === ROLE.ARENA || teams.type === ROLE.QUEST) {
        return;
    }
    const result = teams.result[ `${ teams.type }-${ teams.size }` ];
    const champions = result && result.teams && result.teams[ 0 ] && result.teams[ 0 ].champions;
    roster.setTeam(teams.type, champions || []);
}

function idToRosterChampion(id) {
    const { uid, stars } = Champion.idToObject(id);
    return roster.filter(({ attr }) => attr.uid === uid && attr.stars === stars)[ 0 ];
}

let lockedTeams = [];
let lockedTeamMap = {};
let lockedChampionMap = {};
function lockTeams(map = {}) {
    lockedTeams = [];
    lockedTeamMap = {};
    lockedChampionMap = {};
    Object.keys(map)
        .filter((key) => map[ key ])
        .forEach((tid) => {
            const champions = map[ tid ];
            const uids = tid.split('_');
            lockedTeams.push(champions);
            lockedTeamMap[ tid ] = champions;
            uids.forEach((id) => {
                lockedChampionMap[ id ] = true;
            });
        });
}
function isTeamLocked(tid) {
    return Boolean(lockedTeamMap[ tid ]);
}
function isChampionLocked(uid) {
    return lockedChampionMap[ uid ];
}

let progressResetTimeout;

let worker = new Worker();
let lastWorker;

function buildTeam() {
    clearTimeout(progressResetTimeout);
    new Promise((resolve) => {
        if(lastWorker)
            lastWorker.terminate();
        lastWorker = worker;
        worker.onmessage = (event) => {
            switch(event.data.type) {
                case 'result': {
                    teams.progress = 1;
                    setTimeout(() => resolve(event.data.data), 50);
                    requestRedraw();
                    break;
                }
                case 'progress': {
                    const progress = event.data.data;
                    teams.progress = progress.current / progress.max;
                    requestRedraw(teams.progress > 0 && teams.progress < 1? 5: 0);
                    break;
                }
            }
        };
        worker.postMessage({
            type: 'build',
            data: {
                type: teams.type,
                champions: roster
                    .filter(({ attr }) => teams.types[ attr.typeId ] !== false)
                    .filter(({ attr }) => teams.stars[ attr.stars ] !== false)
                    .filter((champion) => {
                        const pi = champion.attr.pi || champion.pi;
                        return teams.range[ 'minimum-champion' ] <= pi && teams.range[ 'maximum-champion' ] >= pi;
                    })
                    .filter(
                        teams.type !== ROLE.ARENA?
                            ({ attr }) => !attr.role || attr.role === ROLE.ARENA || attr.role === teams.type:
                            ({ id }) => !isChampionLocked(id)
                    )
                    .filter(({ attr }) => !teams.willpowersafe || WILLPOWER_SAFE_CHAMPIONS[ attr.uid ])
                    .map((champion) => champion.attr),
                size: teams.size,
                sandbagging: teams.sandbagging,
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
    })
        .then((result) => {
            let teamsCount = 0;
            let synergiesCount = 0;
            const teamsList = result.teams.map((team) => {
                team.sort();
                const champions = team.map(idToRosterChampion);
                const synergies = synergiesFromChampions(champions);
                teamsCount++;
                synergiesCount += synergies.length;
                return {
                    champions,
                    synergies,
                };
            });
            if(teams.type === ROLE.ARENA) {
                teamsList.unshift(...lockedTeams.map((champions) => {
                    const synergies = synergiesFromChampions(champions);
                    teamsCount++;
                    synergiesCount += synergies.length;
                    return {
                        champions,
                        synergies: synergiesFromChampions(champions),
                    };
                }));
            }
            teams.result[ `${ teams.type }-${ teams.size }` ] = {
                ...result,
                teams: teamsList,
                counts: {
                    teams: teamsCount,
                    synergies: synergiesCount,
                },
                extras: result.extras.map(idToRosterChampion),
            };
            saveTeam();
            teams.building = false;
            requestRedraw();
            return new Promise((resolve) => (progressResetTimeout = setTimeout(resolve, 250)));
        })
        .then(() => {
            teams.progress = 0;
            requestRedraw();
            notify({
                message: lang.string('notification-team-built'),
                tag: 'team-built',
                onclick: () => {
                    app.menuOpen = false;
                    router.setRoute('/teams');
                    requestRedraw();
                },
            });
        });
    worker = new Worker();
}

export { PRESETS, PRESETS_DUPLICATES, PRESETS_RANGE };
export { save, saveTeam, loadTeam, buildTeam, lockTeams, isTeamLocked, lockedTeamMap };
export default teams;
