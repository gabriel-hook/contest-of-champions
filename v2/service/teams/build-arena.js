
/*

function buildArena(options) {
    const i, j;
    const size = parseInt(options.size, 10), maxTeams = Math.floor(options.champions.length/size), forceExtras = maxTeams * size;
    const heroMap = {}, synergyMap = {}, typeWeights = {}, teamValues = {};
    preprocess(options.champions, heroMap, synergyMap, typeWeights, options.levels);

    const swaps;

    function checkValueAndSwap(array, a, b) {
        //get team values and counts with swaps
        const v1a = getTeamValue(array, a), v1b = getTeamValue(array, b),
            v2a = getTeamValue(array, a, b), v2b = getTeamValue(array, b, a),
            count1 = (v1a > 0? 1: 0) + (v1b > 0? 1: 0),
            count2 = (v2a > 0? 1: 0) + (v2b > 0? 1: 0);

        //dont accept less teams
        if(count1 > count2)
            return false;

        //more teams, or more value
        if(count2 > count1 || (v2a + v2b > v1a + v1b)) {
            const tmp = array[a];
            array[a] = array[b];
            array[b] = tmp;
            swaps++;
            return true;
        }
        return false;
    }

    function getTeamValue(array, index, swap) {
        if(index >= forceExtras)
            return 0;

        const start = Math.floor(index/size) * size, team = array.slice(start, start + size);
        if(swap !== undefined)
            team[index % size] = array[swap];

        const tid = getTeamId(team), value = teamValues[tid];
        if(value === undefined) {
            const hvalue = 0, svalue = 0, types = {};
            for(const i=0; i<team.length; i++) {
                const hero = team[i];
                //get my value
                hvalue += hero.value;
                //get my synergies
                const synergies = synergyMap[hero.fid];
                for(const j=0; j<team.length; j++) {
                    const synergy = synergies[team[j].id];
                    if(synergy)
                        svalue += synergy.value;
                }
                //get my type dupes
                types[hero.type] = (types[hero.type] || 0) + 1;
            }
            const cvalue = 1;
            for(i in types)
                if(types[i] > 1)
                    cvalue *= typeWeights[types[i]] || 1;
            //combine them
            teamValues[tid] = value = hvalue * svalue * cvalue;
        }
        return value;
    }

    const progressMax = 16, didExtrasShuffle, array, arrays = [];

    function addArray() {
        array = [];
        for(i in heroMap)
            array.push(heroMap[i]);
        shuffle(array);
        arrays.push(array);
        didExtrasShuffle = false;
    }

    addArray();

    for(const progressCounter=0; progressCounter<progressMax; progressCounter++) {
        if(options.progress)
            options.progress(progressCounter, progressMax);

        swaps = 0;

        //do the swaps
        for(i=0; i<forceExtras; i++)
            for(j=(Math.floor(i/size)+1)*size; j<array.length; j++)
                if(checkValueAndSwap(array, i, j))
                    break;

        //check if we are missing teams
        const allFull = true;
        for(i=0; i<forceExtras; i+=size)
            if(getTeamValue(array, i) === 0)
                allFull = false;

        //exit if we have nothing left to mess with
        if(swaps === 0) {

            //stuff at the end can be ignored, lets move to empty team
            if(!didExtrasShuffle && !allFull) {
                const empty = -1;
                for(i=0; i<forceExtras; i+=size)
                    if(getTeamValue(array, i) === 0)
                        empty = i;
                if(empty !== -1) {
                    const tmp;
                    for(i=0; i<size && forceExtras+i<array.length; i++) {
                        tmp = array[empty+i];
                        array[empty+i] = array[forceExtras+i];
                        array[forceExtras+i] = tmp;
                    }
                    didExtrasShuffle = true;
                    continue;
                }
            }

            //start new list
            addArray();
        }

    }
    if(options.progress)
        options.progress(progressMax, progressMax);

    //get the best array
    const best = {};
    for(i=0; i<arrays.length; i++) {
        const current = arrays[i], value = 0;
        for(j=0; j<forceExtras; j+=size)
            value += getTeamValue(current, j);
        if(best.value === undefined || best.value < value) {
            best.value = value;
            best.array = current;
        }
    }

    return postprocess(best.array, size, function(array, i) {
        return getTeamValue(array, i);
    });
};

function preprocess(champions, heroMap, synergyMap, typeWeights, levels) {
    const i, fid, uid, stars, champion, synergies;

    for(i=2; i<=5; i++)
        typeWeights[i] = CoC.settings.getDuplicateWeight(i);

    for(i=0; i<champions.length; i++) {
        fid = champions[i];
        splitValues(fid, '_', function(_uid, _stars) {
            uid = _uid;
            stars = parseInt(_stars, 10);
        });
        champion = CoC.data.champions.findWhere({ uid:uid, stars:stars });

        //add hero
        heroMap[fid]={
            id:uid,
            fid:fid,
            type:champion.get("typeId"),
            value:calculateChampionValue(champion, levels)
        };
        synergyMap[fid] = {};
        synergies = CoC.data.synergies.where({ fromId:uid, fromStars:stars });
        for(const s=0;s < synergies.length; s++) {
            const synergy = synergies[s];
            const effect = synergy.effect();
            synergyMap[fid][synergy.get("toId")]={
                value:CoC.settings.getWeight(synergy.get("effectId")) * synergy.get("effectAmount") / effect.get("base")
            };
        }
    }
}

function postprocess(array, size, getValue) {
    const result = { teams:[], extras:[] }, teams = [], i, j;

    for(i=0; i<array.length; i+=size) {
        const value = getValue(array, i);
        if(value > 0) {
            const team = [];
            for(j=0; j<size; j++)
                team.push(array[i+j].fid);

            //sort so same teams don't shuffle around
            team.sort();
            teams.push({ team:team, value:value });
        }
        else
            for(j=0; j<size && i+j<array.length; j++)
                result.extras.push(array[i+j].fid);
    }

    //best teams will be first
    teams.sort(function(a,b) { return b.value-a.value; });
    for(i=0; i<teams.length; i++)
        result.teams.push(teams[i].team);

    return result;
}

//getTeamId
function getTeamId(team) {
    const ids = [];
    for(const i in team)
        ids.push(team[i].fid);
    ids.sort();
    return ids.join('-');
}

function calculateChampionValue(champion, levels) {
    if(levels === false)
        return 1;
    return champion.value();
}

function splitValues(string, split, callback) {
    const values = string.split(split);
    callback.apply(null, values);
}

export default buildArena;

*/
