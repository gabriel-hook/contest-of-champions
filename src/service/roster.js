import Champion from '../data/model/Champion';
import champions, { idMap as championMap } from '../data/champions';
import { fromStorage, toStorage } from '../util/storage';

let roster = fromStorage('roster', []).map((attr) => new Champion({
    ...attr,
    level: Math.max(1, attr.level),
    rank: Math.max(1, attr.rank),
}));
let cache = {};

function save() {
    cache = {};
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

const CSV_HEADER = 'Id,Stars,Rank,Level,Awakened,Pi';
const CSV_HEADER_SHORT = 'Id,Stars';

function toCSV(separator = '\n') {
    const csv = [
        CSV_HEADER,
        ...roster.map(({ attr }) => [
            `"${ attr.uid }"`,
            `${ attr.stars || 1 }`,
            `${ attr.rank || 1 }`,
            `${ attr.level || 1 }`,
            `${ attr.awakened || 0 }`,
            ...(attr.pi !== undefined?
                [ `${ attr.pi }` ]:
                []
            ),
        ]),
    ];
    return csv.join(separator);
}

function fromCSV(csv, filename = 'champions.csv') {
    const lines = csv.match(/[^\r\n]+/g);
    const array = [];
    for(let i=0; i<lines.length; i++) {
        if(i===0 && lines[ i ].replace(/["]/g, '').startsWith(CSV_HEADER_SHORT))
            continue;

        const values = lines[ i ].split(',');
        if(values.length < 2 || values.length > 6)
            throw 'Invalid roster CSV';

        const uid = values[ 0 ].replace(/["]/g, '').toLowerCase();
        const stars = parseInt(values[ 1 ].replace(/["]/g, ''), 10);
        const rank = parseInt(values[ 2 ].replace(/["]/g, ''), 10) || 1;
        const level = values > 3 && parseInt(values[ 3 ].replace(/["]/g, ''), 10) || 1;
        const awakened = values > 4 && parseInt(values[ 4 ].replace(/["]/g, ''), 10) || 0;
        const pi = values > 5 && parseInt(values[ 5 ].replace(/["]/g, ''), 10) || 0;
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
        array.push(new Champion({ ...champion.attr, rank, level, awakened, pi }));
    }
    roster = [
        ...roster,
        ...array,
    ];
    save();
}

function all() {
    const key = `all`;
    let all = cache[ key ];
    if(!all) {
        all = cache[ key ] = [
            ...roster,
        ];
    }
    return all;
}

function get(uid, stars) {
    const key = `get-${ uid }-${ stars }`;
    let champion = cache[ key ];
    if(!champion) {
        champion = cache[ key ] = roster.find(({ attr }) => uid === attr.uid && stars === attr.stars);
    }
    return champion;
}

function find(callback) {
    return roster.find(callback);
}

function filter(callback) {
    return roster.filter(callback);
}

function available(stars) {
    const key = `available-${ stars }`;
    let available = cache[ key ];
    if(available === undefined) {
        const has = {};
        roster.forEach((champion) => has[ champion.id ] = true);
        available = cache[ key ] = champions
            .filter((champion) => stars === champion.attr.stars && !has[ champion.id ])
            .map((champion) => new Champion({
                ...champion.attr,
                rank: 0,
                level: 0,
            }));
    }
    return available;
}

function addAll(stars) {
    const champions = available(stars).map((champion) => new Champion({
        ...champion.attr,
        level: 1,
        rank: 1,
    }));
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
        new Champion({
            ...champion.attr,
            level: 1,
            rank: 1,
        }),
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
    //getters
    all,
    get,
    available,
    //searchers
    filter,
    find,
    //setter
    set,
    //adders
    add,
    addAll,
    //removers
    remove,
    clear,
    //io
    toCSV,
    fromCSV,
};
