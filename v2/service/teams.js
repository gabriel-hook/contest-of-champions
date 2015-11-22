import m from 'mithril';

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

const BUILD_STEP = 1 / 500;
const BUILD_STEP_TIME = 10;

let buildInterval;
function buildTeams() {
    clearInterval(buildInterval);
    buildInterval = setInterval(() => {
        teams.progress = teams.progress + BUILD_STEP;
        if(teams.progress > 1) {
            clearInterval(buildInterval);
            teams.building = false;
        }
        m.redraw();
    }, BUILD_STEP_TIME);
    teams.progress = 0;
    teams.building = true;
    m.redraw();
}

export { buildTeams };
export default teams;
