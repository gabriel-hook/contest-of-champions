import m from 'mithril';
import roster from './roster.js';
import build from './teams/build.js';

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
    progress: 0,
    building: false,
};

const BUILD_STEP = 1 / 50;
const BUILD_STEP_TIME = 10;

let buildInterval;
function buildTeams() {
    clearInterval(buildInterval);
    buildInterval = setInterval(() => {
        teams.progress = teams.progress + BUILD_STEP;
        if(teams.progress > 1) {
            clearInterval(buildInterval);
            teams.building = false;
            teams.result = build({
                type: teams.type,
                champions: roster
                    .filter((champion) => teams.stars[ champion.attr.stars ])
                    .map((champion) => champion.id()),
                size: teams.size,
            });
            teams.result.teams = teams.result.teams.map((team) => team.map((fid) => {
                const [ uid, stars ] = fid.split('-');
                return roster.filter((champion) =>
                    champion.attr.uid === uid && champion.attr.stars == stars
                )[ 0 ];
            }));
        }
        m.redraw();
    }, BUILD_STEP_TIME);
    teams.progress = 0;
    teams.building = true;
    m.redraw();
}

export { buildTeams };
export default teams;
