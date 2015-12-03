import Champion from '../model/Champion';
import champions from '../data/champions';
import { uids as typeIds } from '../data/types';
import { fromStorage, toStorage } from '../util/storage';


let rosterMap;
let roster = fromStorage('roster', []).map((champion) => new Champion(champion));

function all() {
    return roster.slice();
}

function find(fn) {
    return roster.find(fn);
}

function filter(fn) {
    return roster.filter(fn);
}

function available(stars) {
    const has = {};
    roster.forEach((champion) => has[ champion.id() ] = true);
    const available = champions.filter((champion) => stars === champion.attr.stars && !has[ champion.id() ]);
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

update();

export default {
    all,
    filter,
    find,
    available,
    add,
    addAll,
    remove,
    clear,
};
