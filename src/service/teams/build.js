import buildArena from './build-arena';
import buildQuest from './build-quest';

function build({
    type,
    champions,
    size,
    weights,
    range,
    options,
    progress,
}) {
    const settings = { champions, size, weights, range, options, progress };
    return (type === 'arena')? buildArena(settings):
        (type === 'quest' || type === 'alliance')? buildQuest(settings):
        { teams: [], extras: [] };
}

export default build;
