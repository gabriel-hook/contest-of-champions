import m from 'mithril';
import dataSynergies from '../data/synergies.js';
import { requestRender } from '../util/animation.js';
import roster from './roster.js';
import build from './teams/build.js';

const presets = {
    'offensive': {
        title: 'offensive',
        weights: {
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
    },
    'balanced': {
        title: 'balanced',
        weights: {
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
    },
    'defensive': {
        title: 'defensive',
        weights: {
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
        'duplicates-2': 0.8,
        'duplicates-3': 0.4,
        'duplicates-4': 0.2,
        'duplicates-5': 0.1,
        ...presets[ 'offensive' ].weights,
    },
    progress: 0,
    building: false,
};

function fidToRosterChampion(fid) {
    /* eslint-disable eqeqeq */
    const [ uid, stars ] = fid.split('-');
    return roster.filter((champion) =>
        champion.attr.uid === uid && champion.attr.stars == stars
    )[ 0 ];
    /* eslint-enable eqeqeq */
}

function buildTeams() {
    teams.building = true;
    teams.result = build({
        type: teams.type,
        champions: roster
            .filter((champion) => teams.stars[ champion.attr.stars ])
            .map((champion) => champion.id()),
        size: teams.size,
        weights: {
            ...teams.weights,
        },
        progress: (current, max) => {
            requestRender('progress', () => {
                teams.progress = current / max;
                m.redraw();
            });
        },
    });
    teams.result.size = teams.size;
    teams.result.teams = teams.result.teams.map((team) => team.map(fidToRosterChampion));
    teams.result.synergies = teams.result.teams.map((team) => {
        const synergies = [];
        dataSynergies.forEach((synergy) => {
            const { fromId, fromStars, toId } = synergy.attr;
            if(team.find(({ attr }) => fromId === attr.uid && fromStars === attr.stars) && team.find(({ attr }) => toId === attr.uid))
                synergies.push(synergy);
        });
        return synergies;
    });
    teams.result.extras = teams.result.extras.map(fidToRosterChampion);

    teams.building = false;
    m.redraw();
}

export { presets, buildTeams };
export default teams;
