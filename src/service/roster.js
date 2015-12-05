import Champion from '../data/model/Champion';
import champions, { idMap as championMap } from '../data/champions';
import { uids as typeIds } from '../data/types';
import { fromStorage, toStorage } from '../util/storage';

let roster = fromStorage('roster', []).map((attr) => new Champion(attr));

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
            /* eslint-disable no-console */
            continue;
        }
        const champion = championMap[ Champion.prototype.id.call({ attr: { uid, stars } }) ];
        if(champion === undefined) {
            console.error(`Champion not found "${ uid }" in ${ filename }:${ i + 1 }`);
            continue;
        }
        array.push(new Champion({ ...champion.attr, rank, level, awakened }));
    }
    roster = [
        ...roster,
        ...array,
    ];
    update();
}

function all() {
    return [
        ...roster,
    ];
}

function find(fn) {
    return roster.find(fn);
}

function filter(fn) {
    return roster.filter(fn);
}

function available(stars) {
    const has = {};
    roster.forEach((champion) => has[ champion.id ] = true);
    const available = champions.filter((champion) => stars === champion.attr.stars && !has[ champion.id ]);
    return available;
}

function update() {
    roster.forEach((champion) => champion.typeIndex = typeIds.indexOf(champion.attr.typeId));
    roster.sort((a, b) => {
        const stars = b.attr.stars - a.attr.stars;
        if(stars !== 0)
            return stars;
        const type = a.typeIndex - b.typeIndex;
        if(type !== 0)
            return type;
        return -b.attr.uid.localeCompare(a.attr.uid);
    });
    roster = roster.reduce((array, champion) => {
        const last = array[ array.length - 1 ];
        if(last && champion.attr.uid === last.attr.uid && champion.attr.stars === last.attr.stars) {
            array[ array.length - 1 ] = champion;
        }
        else
            array.push(champion);
        return array;
    }, []);
    toStorage('roster', roster);
}

function addAll(stars) {
    const champions = available(stars).map((champion) => new Champion({ ...champion.attr }));
    roster = [
        ...roster,
        ...champions,
    ];
    update();
}

function add(uid, stars) {
    const champion = champions.find((champion) => (champion.attr.uid === uid && champion.attr.stars === stars));
    roster = [
        ...roster,
        new Champion({ ...champion.attr }),
    ];
    update();
}

function remove(uid, stars) {
    roster = roster.filter(({ attr }) => attr.uid !== uid || attr.stars !== stars);
    update();

}

function clear() {
    roster = [];
    update();
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
    console.log({
        ...champion.attr,
        ...attr,
        uid,
        stars,
    })

    update();
}

update();

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
