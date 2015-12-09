import Champion from '../data/model/Champion';
import champions, { idMap as championMap } from '../data/champions';
import { fromStorage, toStorage } from '../util/storage';

let roster = fromStorage('roster', []).map((attr) => new Champion(attr));

function save() {
    const byId = {};
    roster.forEach((champion) => byId[ champion.id ] = champion);
    roster = [];
    for(const id in byId)
        roster.push(byId[ id ]);
    roster.sort((a, b) => {
        const stars = b.attr.stars - a.attr.stars;
        if(stars !== 0)
            return stars;
        const type = a.typeIndex - b.typeIndex;
        if(type !== 0)
            return type;
        return -b.attr.uid.localeCompare(a.attr.uid);
    });
    toStorage('roster', roster);
}

const CSV_HEADER = 'Id,Stars,Rank,Level,Awakened';

function toCSV(separator = '\n') {
    const csv = [
        CSV_HEADER,
        ...roster.map(({ attr }) => (
            `"${ attr.uid }",${ attr.stars || 1 },${ attr.rank || 1 },${ attr.level || 1 },${ attr.awakened || 0 }`
        )),
    ];
    return csv.join(separator);
}

function fromCSV(csv, filename = 'champions.csv') {
    const lines = csv.match(/[^\r\n]+/g);
    const array = [];
    for(let i=0; i<lines.length; i++) {
        if(i===0 && lines[ i ].replace(/["]/g, '') === CSV_HEADER)
            continue;

        const values = lines[ i ].split(',');
        if(values.length !== 5)
            throw 'Invalid roster CSV';

        const uid = values[ 0 ].replace(/["]/g, '').toLowerCase();
        const stars = parseInt(values[ 1 ].replace(/["]/g, ''), 10);
        const rank = parseInt(values[ 2 ].replace(/["]/g, ''), 10);
        const level = parseInt(values[ 3 ].replace(/["]/g, ''), 10);
        const awakened = parseInt(values[ 4 ].replace(/["]/g, ''), 10);
        if(typeof uid !== 'string' || isNaN(stars) || isNaN(rank) || isNaN(level) || isNaN(awakened)) {
            /* eslint-disable no-console */
            console.error(`Invalid line in ${ filename }:${ i + 1 }`);
            /* eslint-enable no-console */
            continue;
        }
        const champion = championMap[ `${ uid }-${ stars }` ];
        if(champion === undefined) {
            /* eslint-disable no-console */
            console.error(`Champion not found "${ uid }" in ${ filename }:${ i + 1 }`);
            /* eslint-enable no-console */
            continue;
        }
        array.push(new Champion({ ...champion.attr, rank, level, awakened }));
    }
    roster = [
        ...roster,
        ...array,
    ];
    save();
}

function all() {
    return [
        ...roster,
    ];
}

function find(callback) {
    return roster.find(callback);
}

function filter(callback) {
    return roster.filter(callback);
}

function available(stars) {
    const has = {};
    roster.forEach((champion) => has[ champion.id ] = true);
    const available = champions.filter((champion) => stars === champion.attr.stars && !has[ champion.id ]);
    return available;
}

function addAll(stars) {
    const champions = available(stars).map((champion) => new Champion({ ...champion.attr }));
    roster = [
        ...roster,
        ...champions,
    ];
    save();
}

function add(uid, stars) {
    const champion = champions.find((champion) => (champion.attr.uid === uid && champion.attr.stars === stars));
    roster = [
        ...roster,
        new Champion({ ...champion.attr }),
    ];
    save();
}

function remove(uid, stars) {
    roster = roster.filter(({ attr }) => attr.uid !== uid || attr.stars !== stars);
    save();

}

function clear() {
    roster = [];
    save();
}

function set(uid, stars, attr = {}) {
    const champion = roster.find((champion) => (champion.attr.uid === uid && champion.attr.stars === stars));
    if(!champion)
        return;
    roster = [
        ...roster,
        new Champion({
            ...champion.attr,
            ...attr,
            uid,
            stars,
        }),
    ];
    save();
}

export default {
    set,
    all,
    filter,
    find,
    available,
    add,
    addAll,
    remove,
    clear,
    toCSV,
    fromCSV,
};
