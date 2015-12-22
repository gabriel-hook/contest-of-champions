import buildArena from './build-arena';
import buildQuest from './build-quest';

function build({
    type,
    champions,
    size,
    weights,
    range,
    progress,
}) {
    return (type === 'arena')? buildArena({ champions, size, weights, range, progress }):
        (type === 'quest')? buildQuest({ champions, size, weights, range, progress }):
        { teams: [], extras: [] };
}

export default build;
