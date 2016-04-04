import buildArena from './build-arena';
import buildQuest from './build-quest';

function build({
    type,
    champions,
    size,
    sandbagging,
    weights,
    range,
    options,
    progress,
}) {
    const settings = { type, champions, size, sandbagging, weights, range, options, progress };
    return (type === 'arena')? buildArena(settings): buildQuest(settings);
}

export default build;
