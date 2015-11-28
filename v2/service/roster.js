import Champion from '../model/Champion.js';
import champions from '../data/champions';
import { fromStorage, toStorage } from '../util/storage.js';


let rosterMap;
let roster = fromStorage('roster', []).map((champion) => new Champion(champion));

function all() {
    return roster.slice();
}

function filter(fn) {
    return roster.filter(fn);
}

function available(stars) {
    const available = champions.filter((champion) => (
        champion.attr.stars === stars && !rosterMap[ champion.id() ]
    ));
    return available;
}

function update() {
    rosterMap = {};
    for(const champion of roster)
        rosterMap[ champion.id() ] = true;
}

function addAll(stars) {
    const champions = available(stars);
    for(const champion of champions)
        roster.push(new Champion({ ...champion.attr }));
    toStorage('roster', roster);
    update();
}

function add(uid, stars) {
    const champion = champions.find((champion) => (champion.attr.uid === uid && champion.attr.stars === stars));
    if(rosterMap[ champion.id() ])
        return;
    roster.push(new Champion({ ...champion.attr }));
    toStorage('roster', roster);
    update();
}

function remove(uid, stars) {
    const champion = roster.find((champion) => (champion.attr.uid === uid && champion.attr.stars === stars));
    if(champion) {
        const index = roster.indexOf(champion);
        if(index) {
            roster.splice(index, 1);
            toStorage('roster', roster);
        }
    }
    update();
}

function clear() {
    roster = [];
    toStorage('roster', roster);
    update();
}

update();

export default {
    all,
    filter,
    available,
    add,
    addAll,
    remove,
    clear,
};
