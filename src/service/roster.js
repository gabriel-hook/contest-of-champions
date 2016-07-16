import lang from './lang';
import Champion from '../data/model/Champion';
import { UNRELEASED_CHAMPIONS } from '../data/champions/unreleased';
import champions, { championMap, championTypes } from '../data/champions';
import { fromStorage, toStorage } from '../util/storage';

let roster = fromStorage('roster', [])
    .map((attr) => new Champion({
        ...attr,
        typeId: championTypes[ attr.uid ] || attr.typeId,
        stars: Math.max(1, attr.stars | 0),
        level: Math.max(1, attr.level | 0),
        rank: Math.max(1, attr.rank | 0),
    }))
    .filter(({ attr }) => !UNRELEASED_CHAMPIONS[ attr.uid ]);

let rosterOptions = fromStorage('roster-options', {
    sort: {
        key: 'stars',
        direction: 'asc',
    },
    filter: {
        1: true,
        2: true,
        3: true,
        4: true,
        5: true,
        cosmic: true,
        tech: true,
        mutant: true,
        skill: true,
        science: true,
        mystic: true,
    },
    scale: 1,
    upgrades: false,
});
let cache = {};

function setUpgrades(upgrades) {
    rosterOptions = {
        ...rosterOptions,
        upgrades,
    };
    toStorage('roster-options', rosterOptions);
}
function getUpgrades() {
    return rosterOptions.upgrades;
}

function setScale(scale) {
    rosterOptions = {
        ...rosterOptions,
        scale,
    };
    toStorage('roster-options', rosterOptions);
}
function getScale() {
    return rosterOptions.scale;
}

function setFilter(key, value) {
    rosterOptions = {
        ...rosterOptions,
        filter: {
            ...rosterOptions.filter,
            [ key ]: value,
        },
    };
    toStorage('roster-options', rosterOptions);
}
function getFilter(key) {
    return rosterOptions.filter[ key ] !== false;
}

function setSort(key, direction) {
    rosterOptions = {
        ...rosterOptions,
        sort: {
            key,
            direction,
        },
    };
    toStorage('roster-options', rosterOptions);
    save();
}
function getSort() {
    return rosterOptions.sort;
}

const SORT_STARS_DESC = (a, b) => {
    const stars = b.attr.stars - a.attr.stars;
    if(stars !== 0)
        return stars;
    const type = a.typeIndex - b.typeIndex;
    if(type !== 0)
        return type;
    return -b.attr.uid.localeCompare(a.attr.uid);
};
const SORT_STARS_ASC = (a, b) => {
    const stars = a.attr.stars - b.attr.stars;
    if(stars !== 0)
        return stars;
    const type = a.typeIndex - b.typeIndex;
    if(type !== 0)
        return type;
    return -b.attr.uid.localeCompare(a.attr.uid);
};
const SORT_PI_DESC = (a, b) => {
    const pi = (b.attr.pi || b.pi) - (a.attr.pi || a.pi);
    if(pi !== 0)
        return pi;
    const stars = b.attr.stars - a.attr.stars;
    if(stars !== 0)
        return stars;
    const type = a.typeIndex - b.typeIndex;
    if(type !== 0)
        return type;
    return -b.attr.uid.localeCompare(a.attr.uid);
};
const SORT_PI_ASC = (a, b) => {
    const pi = (a.attr.pi || a.pi) - (b.attr.pi || b.pi);
    if(pi !== 0)
        return pi;
    const stars = b.attr.stars - a.attr.stars;
    if(stars !== 0)
        return stars;
    const type = a.typeIndex - b.typeIndex;
    if(type !== 0)
        return type;
    return -b.attr.uid.localeCompare(a.attr.uid);
};
const SORT_NAME_DESC = (a, b) => {
    const name = -lang.get(a.attr.uid).localeCompare(lang.get(b.attr.uid));
    if(name !== 0)
        return name;
    const type = a.typeIndex - b.typeIndex;
    if(type !== 0)
        return type;
    return b.attr.stars - a.attr.stars;
};
const SORT_NAME_ASC = (a, b) => {
    const name = lang.get(a.attr.uid).localeCompare(lang.get(b.attr.uid));
    if(name !== 0)
        return name;
    const type = a.typeIndex - b.typeIndex;
    if(type !== 0)
        return type;
    return b.attr.stars - a.attr.stars;
};

let rosterHash = 'h';
function hash() {
    return rosterHash;
}

function save() {
    cache = {};
    const byId = roster.reduce((map, champion) => {
        map[ champion.id ] = champion;
        return map;
    }, {});
    roster = [];
    for(const id in byId) {
        roster.push(byId[ id ]);
    }
    let sort = SORT_STARS_DESC;
    if(rosterOptions.sort.key === 'stars') {
        sort = (rosterOptions.sort.direction === 'desc')? SORT_STARS_DESC: SORT_STARS_ASC;
    }
    else if(rosterOptions.sort.key === 'pi') {
        sort = (rosterOptions.sort.direction === 'desc')? SORT_PI_DESC: SORT_PI_ASC;
    }
    else if(rosterOptions.sort.key === 'name') {
        sort = (rosterOptions.sort.direction === 'desc')? SORT_NAME_DESC: SORT_NAME_ASC;
    }
    roster.sort(sort);
    rosterHash = `h${ roster
        .map(({ id }) => id)
        .join('')
        .split('')
        .reduce((a, b) => {
            const c = ((a << 5) - a) + b.charCodeAt(0);
            return c & c;
        }, 0)
    }`;
    setScale(roster
        .filter((champion) => champion.attr.pi && champion.pi)
        .map((champion) => champion.attr.pi / champion.pi)
        .reduce((sum, value, index, array) => sum + value / array.length, 0) || 1
    );
    toStorage('roster', roster);
}


const CSV_HEADER_SHORT = 'Id,Stars';
const CSV_HEADER = 'Id,Stars,Rank,Level,Awakened,Pi,Role';

function toCSV(separator = '\n') {
    const csv = [
        CSV_HEADER,
        ...roster.map(({ attr }) => [
            `"${ attr.uid }"`,
            `${ attr.stars || 1 }`,
            `${ attr.rank || 1 }`,
            `${ attr.level || 1 }`,
            `${ attr.awakened || 0 }`,
            `${ attr.pi || 0 }`,
            `${ attr.role || '' }`,
        ]),
    ];
    return csv.join(separator);
}

function fromCSV(csv, filename = 'champions.csv') {
    const lines = csv.match(/[^\r\n]+/g);
    const array = [];
    const getIntegerValue = (array, index, defaultValue) => {
        let value;
        if(array.length > index) {
            value = parseInt(array[ index ].replace(/["]/g, ''), 10);
        }
        return (value === undefined)? defaultValue: value;
    };
    const getStringValue = (array, index, defaultValue) => {
        let value;
        if(array.length > index) {
            value = array[ index ].replace(/["]/g, '');
        }
        return value || defaultValue;
    };
    for(let i=0; i<lines.length; i++) {
        if(i===0 && lines[ i ].replace(/["]/g, '').startsWith(CSV_HEADER_SHORT))
            continue;

        const values = lines[ i ].split(',');
        if(values.length < 2 || values.length > 7)
            throw 'Invalid roster CSV';

        const uid = values[ 0 ].replace(/["]/g, '').toLowerCase();
        const stars = getIntegerValue(values, 1, 1);
        const rank = getIntegerValue(values, 2, 1);
        const level = getIntegerValue(values, 3, 1);
        const awakened = getIntegerValue(values, 4, 0);
        const pi = getIntegerValue(values, 5, 0);
        const role = getStringValue(values, 6, null);
        if(typeof uid !== 'string' || isNaN(stars) || isNaN(rank) || isNaN(level) || isNaN(awakened) || isNaN(pi)) {
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
        if(!UNRELEASED_CHAMPIONS[ uid ]) {
            array.push(new Champion({ ...champion.attr, rank, level, awakened, pi, role }));
        }
    }
    roster = [
        ...roster,
        ...array,
    ];
    save();
}

function all() {
    const key = 'all';
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
        roster.forEach((champion) => (has[ champion.id ] = true));
        available = cache[ key ] = champions
            .filter((champion) => stars === champion.attr.stars && !has[ champion.id ] && !UNRELEASED_CHAMPIONS[ champion.attr.uid ])
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

function setTeam(role, champions) {
    roster = [
        ...roster.map(({ attr }) => new Champion({
            ...attr,
            role: (role === attr.role)? null: attr.role,
        })),
        ...champions.map(({ attr }) => new Champion({
            ...attr,
            role,
        })),
    ];
    save();
}

// Initialize with current sorting alorithms etc.
save();

export default {
    //getters
    all, get, available,
    //searchers
    filter, find,
    //setter
    set, setTeam,
    //adders
    add, addAll,
    //removers
    remove, clear,
    //csv
    toCSV, fromCSV,
    //options
    setFilter, getFilter, setSort, getSort, setUpgrades, getUpgrades, getScale,
    //hashing
    hash,
};
