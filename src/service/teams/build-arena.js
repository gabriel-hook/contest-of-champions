import Champion from '../../data/model/Champion';
import synergies from '../../data/synergies';
import { effectBase } from '../../data/effects';
import { shuffle } from '../../util/array';

function buildArena({
    champions,
    size,
    sandbagging,
    weights,
    range,
    progress,
}) {
    const maxTeams = Math.floor(champions.length/size);
    const forceExtras = maxTeams * size;
    const championMap = {};
    const synergyMap = {};
    const typeWeights = [ 2, 3, 4, 5 ].reduce((map, count) => {
        map[ count ] = weights[ `duplicates-${ count }` ];
        return map;
    }, { 1: 1 });

    const WEIGHT_BASE = weights[ 'base' ] || 0;

    champions
        .forEach((attr) => {
            const champion = new Champion(attr);
            const { id } = champion;
            const { uid, stars, typeId, pi } = attr;
            championMap[ id ]={
                id,
                uid,
                typeId,
                pi: pi || champion.pi,
            };

            synergyMap[ id ] = {};
            synergies
                .filter(({ attr }) => attr.fromId === uid && attr.fromStars === stars)
                .forEach(({ attr }) => {
                    synergyMap[ id ][ attr.toId ] = {
                        effectId: attr.effectId,
                        group: attr.group,
                        value: weights[ `effect-${ attr.effectId }` ] * attr.effectAmount / effectBase(attr.effectId),
                    };
                });
        });

    function checkValueAndSwap(array, a, b) {
        //get team values and counts with swaps
        const valueA = getTeamValue(array, a);
        const valueB = getTeamValue(array, b);
        const valueSwappedA = getTeamValue(array, a, b);
        const valueSwappedB = getTeamValue(array, b, a);
        const count1 = (valueA > 0? 1: 0) + (valueB > 0? 1: 0);
        const count2 = (valueSwappedA > 0? 1: 0) + (valueSwappedB > 0? 1: 0);

        //dont accept less teams
        if(count1 > count2)
            return false;

        //more teams, or more value
        if(count2 > count1 || (valueSwappedA + valueSwappedB > valueA + valueB)) {
            const tmp = array[ a ];
            array[ a ] = array[ b ];
            array[ b ] = tmp;
            return true;
        }
        return false;
    }

    const teamValues = {};
    const teamPis = {};
    function getTeamValue(array, index, swap) {
        if(index >= forceExtras)
            return 0;

        const start = Math.floor(index / size) * size, team = array.slice(start, start + size);
        if(swap !== undefined)
            team[ index % size ] = array[ swap ];

        const tid = getTeamId(team);

        let pi = teamPis[ tid ];
        if(pi === undefined) {
            pi = team.reduce((sum, { pi }) => sum + pi, 0);
            if(sandbagging) {
                const lowest = Math.min(...team.map(({ pi }) => pi));
                pi = pi - lowest;
            }
            teamPis[ tid ] = pi;
        }

        let value = teamValues[ tid ];
        if(value === undefined) {
            const types = {};
            let synergyValue = team.length * WEIGHT_BASE;
            for(let i=0; i<team.length; i++) {
                const champion = team[ i ];
                //get my synergies
                const groups = {};
                const synergies = synergyMap[ champion.id ];
                for(let j=0; j<team.length; j++) {
                    const synergy = synergies[ team[ j ].uid ];
                    if(synergy) {
                        if(synergy.group) {
                            if(!groups[ synergy.group ]) {
                                groups[ synergy.group ] = true;
                                synergyValue += synergy.value;
                            }
                        }
                        else {
                            synergyValue += synergy.value;
                        }
                    }
                }
                //get my type dupes
                types[ champion.typeId ] = (types[ champion.typeId ] || 0) + 1;
            }

            let typeValue = 1;
            for(const typeId in types) {
                typeValue *= typeWeights[ types[ typeId ] ];
            }

            //combine them
            teamValues[ tid ] = value = pi * synergyValue * typeValue;
        }

        return (pi && pi <= range[ 'maximum-team' ] && pi >= range[ 'minimum-team' ])? value: 0;
    }

    const progressMax = 16;
    let didExtrasShuffle;
    let array;
    const arrays = [];

    function addArray() {
        array = [];
        for(const uid in championMap)
            array.push(championMap[ uid ]);
        shuffle(array);
        arrays.push(array);
        didExtrasShuffle = false;
    }

    addArray();

    for(let progressCounter=0; progressCounter < progressMax; progressCounter++) {
        if(progress)
            progress(progressCounter, progressMax);

        let swaps = 0;

        //do the swaps
        for(let i=0; i<forceExtras; i++)
            for(let j=(Math.floor(i/size)+1)*size; j<array.length; j++)
                if(checkValueAndSwap(array, i, j)) {
                    swaps++;
                    break;
                }

        //check if we are missing teams
        let allFull = true;
        for(let i=0; i<forceExtras; i+=size)
            if(getTeamValue(array, i) === 0)
                allFull = false;

        //exit if we have nothing left to mess with
        if(swaps === 0) {
            //stuff at the end can be ignored, lets move to empty team
            if(!didExtrasShuffle && !allFull) {
                let empty = -1;
                for(let i=0; i<forceExtras; i+=size)
                    if(getTeamValue(array, i) === 0)
                        empty = i;
                if(empty !== -1) {
                    for(let i=0; i<size && forceExtras+i<array.length; i++) {
                        const tmp = array[ empty+i ];
                        array[ empty+i ] = array[ forceExtras+i ];
                        array[ forceExtras+i ] = tmp;
                    }
                    didExtrasShuffle = true;
                    continue;
                }
            }

            //start new list
            addArray();
        }

    }
    if(progress)
        progress(progressMax, progressMax);

    //get the best array
    const best = {};
    for(let i=0; i<arrays.length; i++) {
        const current = arrays[ i ];
        let value = 0;
        for(let j = 0; j < forceExtras; j += size)
            value += getTeamValue(current, j);
        if(best.value === undefined || best.value < value) {
            best.value = value;
            best.array = current;
        }
    }
    array = best.array;

    const teams = [];
    const extras = [];

    for(let i=0; i<array.length; i+=size) {
        const value = getTeamValue(array, i);
        if(value > 0) {
            const team = [];
            for(let j=0; j<size; j++)
                team.push(array[ i+j ].id);

            //sort so same teams don't shuffle around
            team.sort();
            teams.push({ team, value });
        }
        else
            for(let j=0; j<size && i+j<array.length; j++)
                extras.push(array[ i+j ].id);
    }

    //best teams will be first
    teams.sort((a, b) => b.value - a.value);
    return {
        teams: teams.map(({ team }) => team),
        extras,
    };
}

//getTeamId
function getTeamId(team) {
    const ids = [];
    for(const uid in team)
        ids.push(team[ uid ].id);
    ids.sort();
    return ids.join('-');
}

export default buildArena;
