import dataChampions from '../../data/champions.js';
import dataSynergies from '../../data/synergies.js';
import { uids as typeIds } from '../../data/types.js';
import { effectBase } from '../../data/effects.js';
import { combination } from '../../util/math.js';

function buildQuest({
    champions,
    size,
    weights,
    progress,
}) {
    const preselect = [];
    const typeWeights = { 1: 1 };
    [ 2, 3, 4, 5 ].forEach((count) => typeWeights[ count ] = weights[ `duplicates-${ count }` ]);

    const list = champions.map((fid) => {
        /* eslint-disable eqeqeq */
        const [ uid, stars, quest ] = fid.split('-');
        const champion = dataChampions.find(({ attr }) => attr.uid === uid && attr.stars == stars);
        const { typeId } = champion.attr;
        const synergies = {};
        dataSynergies
            .filter(({ attr }) => attr.fromId === uid && attr.fromStars == stars )
            .forEach(({ attr }) => synergies[ attr.toId ] = {
                id: attr.toId,
                value: weights[ `effect-${ attr.effectId }` ] * attr.effectAmount / effectBase(attr.effectId),
            });
        /* eslint-enable eqeqeq */
        return {
            fid,
            uid,
            stars,
            quest,
            type: typeIds.indexOf(typeId),
            synergies,
            value: 1,
        };
    }).filter((champion) => {
        if(champion.quest) {
            preselect.push(champion);
            return false;
        }
        return true;
    });

    let progressCurrent = 0;
    const progressMax = combination(list.length, preselect.length? size - preselect.length: size);
    const progressIncrement = () => {
        progressCurrent++;
        progress(progressCurrent, progressMax);
    };

    const team = (preselect.length > 0)? ((preselect.length > size)?
        getTopPartner(preselect, 0, size, typeWeights, progressIncrement):
        getNextPartner(list, preselect, [], getTypes(preselect), 0, size, typeWeights, progressIncrement)
    ): getTopPartner(list, 0, size, typeWeights, progressIncrement);

    if(team.value > 0) {
        return {
            teams:[
                team.champions.map((champion) => champion.fid),
            ],
            extras:[],
        };
    }
    return {
        teams:[],
        extras:[],
    };
}

function getTopPartner(list, index, depth, typeWeights, progressIncrement) {
    if(index >= list.length)
        return null;
    const current = getNextPartner(
        list,
        addPartnerHero([], list[ index ]),
        [],
        getTypes([ list[ index ] ]),
        index + 1,
        depth,
        typeWeights,
        progressIncrement
    );
    if(current === null)
        return null;
    const next = getTopPartner(list, index+1, depth, typeWeights, progressIncrement);
    return (compareTeams(current, next) >= 0)? current: next;
}

function getNextPartner(list, champions, synergies, types, index, depth, typeWeights, progressIncrement) {
    if(champions.length === depth) {
        progressIncrement();
        return {
            champions,
            synergies,
            value: getTeamValue(champions, synergies, types, typeWeights),
        };
    }
    if(index === list.length)
        return null;
    const current = getNextPartner(
        list,
        addPartnerHero(champions, list[ index ]),
        addPartnerSynergies(synergies, champions, list[ index ]),
        addPartnerType(types, list[ index ]),
        index + 1,
        depth,
        typeWeights,
        progressIncrement
    );
    const next = getNextPartner(list, champions, synergies, types, index+1, depth, typeWeights, progressIncrement);

    return (compareTeams(current, next) >= 0)? current: next;
}

function addPartnerHero(list, champion) {
    const champions = list.slice();
    champions.push(champion);
    return champions;
}

function addPartnerType(list, champion) {
    const types = list.slice();
    types[ champion.type ]++;
    return types;
}

function getTypes(champions) {
    const types=[ 0, 0, 0, 0, 0, 0 ];
    if(champions !== undefined)
        for(let i=0; i<champions.length; i++)
            types[ champions[ i ].type ]++;
    return types;
}

function addPartnerSynergies(oldSynergies, list, next) {
    const synergies = oldSynergies.slice();
    for(let i=0; i<list.length; i++) {
        if(list[ i ].synergies[ next.uid ] !== undefined)
            synergies.push(list[ i ].synergies[ next.uid ]);
        if(next.synergies[ list[ i ].uid ] !== undefined)
            synergies.push(next.synergies[ list[ i ].uid ]);
    }
    return synergies;
}

function getTeamValue(champions, synergies, types, typeWeights) {
    return types.reduce((value, typeAmount) => (typeAmount > 1)? value * typeWeights[ typeAmount ]: value, 1)
        * champions.reduce((value, champion) => value + champion.value, 0)
        * synergies.reduce((value, synergy) => value + synergy.value, 0);
}

function compareTeams(a, b) {
    if(b === null)
        return 1;
    return a.value - b.value;
}

export default buildQuest;
