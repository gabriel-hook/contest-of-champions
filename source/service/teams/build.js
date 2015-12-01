import buildArena from './build-arena.js';
import buildQuest from './build-quest.js';

function build({
    champions,
    size,
    type,
    weights,
    progress,
}) {
    return (type === 'arena')? buildArena({ champions, size, weights, progress }):
        (type === 'quest')? buildQuest({ champions, size, weights, progress }):
        { teams: [], extras: [] };
}

export default build;
