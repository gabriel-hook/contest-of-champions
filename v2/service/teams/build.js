import buildQuest from './build-quest.js';

function build({
    champions,
    size,
    type,
}) {
    const result = (type === 'quest')?
        buildQuest({
            champions,
            size,
        }):
        {
            teams: [],
            extras: [],
        };
    return result;
}

export default build;
