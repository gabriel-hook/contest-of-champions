import dataChampions from '../../data/champions';
import dataSynergies from '../../data/synergies';
import { uids as typeIds } from '../../data/types';
import { effectBase, SPECIAL_EFFECTS } from '../../data/effects';
import { combination } from '../../util/math';

function buildQuest({
    champions,
    size,
    weights,
    range,
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
                special: SPECIAL_EFFECTS[ attr.effectId ] && `${ attr.fromId }-${ attr.fromStars }-${ attr.effectId }`,
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
            pi: champion.attr.pi || champion.pi,
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
        getTopPartner(preselect, 0, size, typeWeights, range, progressIncrement):
        getNextPartner(list, preselect, [], getTypes(preselect), 0, size, typeWeights, range, progressIncrement)
    ): getTopPartner(list, 0, size, typeWeights, range, progressIncrement);

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

function getTopPartner(list, index, depth, typeWeights, range, progressIncrement) {
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
        range,
        progressIncrement
    );
    if(current === null)
        return null;
    const next = getTopPartner(list, index+1, depth, typeWeights, range, progressIncrement);
    return (compareTeams(current, next) >= 0)? current: next;
}

function getNextPartner(list, champions, synergies, types, index, depth, typeWeights, range, progressIncrement) {
    if(champions.length === depth) {
        progressIncrement();
        const pi = champions.reduce((value, { pi }) => value + pi, 0);
        const value = (pi && pi >= range.minimum && pi <= range.maximum)?
            getTeamValue(champions, synergies, types, typeWeights): 0;
        return {
            champions,
            synergies,
            value,
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
        range,
        progressIncrement
    );
    const next = getNextPartner(list, champions, synergies, types, index+1, depth, typeWeights, range, progressIncrement);
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
    const specials = {};
    return types.reduce((value, typeAmount) => (typeAmount > 1)? value * typeWeights[ typeAmount ]: value, 1)
        * champions.reduce((value, champion) => value + champion.pi, 0)
        * synergies.reduce((value, synergy) => {
            if(synergy.special) {
                if(specials[ synergy.special ]) {
                    return 0;
                }
                specials[ synergy.special ] = true;
            }
            return value + synergy.value;
        }, 0);
}

function compareTeams(a, b) {
    if(b === null)
        return 1;
    return a.value - b.value;
}

export default buildQuest;
