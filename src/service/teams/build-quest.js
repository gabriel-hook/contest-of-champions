import Champion from '../../data/model/Champion';
import { TYPE_VALUES } from '../../data/model/Type';
import dataSynergies from '../../data/synergies';
import { effectBase } from '../../data/effects';
import { combination } from '../../util/math';

function buildQuest({
    champions,
    size,
    weights,
    range,
    progress,
}) {
    const typeWeights = [ 2, 3, 4, 5 ].reduce((map, count) => {
        map[ count ] = weights[ `duplicates-${ count }` ];
        return map;
    }, { 1: 1 });

    const WEIGHT_BASE = weights[ 'base' ] || 0;
    const list = champions
        .map((attr) => {
            const champion = new Champion(attr);
            const { id, pi: basePi } = champion;
            const { uid, stars, typeId, role, pi } = attr;
            const synergies = {};
            dataSynergies
                .filter(({ attr }) => attr.fromId === uid && attr.fromStars === stars )
                .forEach(({ attr }) => (synergies[ attr.toId ] = {
                    id: attr.toId,
                    group: attr.group,
                    value: weights[ `effect-${ attr.effectId }` ] * attr.effectAmount / effectBase(attr.effectId),
                }));

            return {
                id,
                uid,
                stars,
                role,
                type: TYPE_VALUES.indexOf(typeId),
                synergies,
                pi: pi || basePi,
            };
        });
    if(list.length < size) {
        return {
            teams: [],
            extras: [],
        };
    }

    let progressCurrent = 0;
    const progressMax = combination(list.length, size);
    const progressIncrement = () => {
        progressCurrent++;
        progress(progressCurrent, progressMax);
    };

    const team = getTopPartner(list, 0, size, typeWeights, WEIGHT_BASE, range, progressIncrement);
    if(team.value > 0) {
        return {
            teams:[
                team.champions.map((champion) => champion.id),
            ],
            extras:[],
        };
    }
    return {
        teams:[],
        extras:[],
    };
}

function getTopPartner(list, index, depth, typeWeights, base, range, progressIncrement) {
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
        base,
        range,
        progressIncrement
    );
    if(current === null)
        return null;
    const next = getTopPartner(
        list,
        index+1,
        depth,
        typeWeights,
        base,
        range,
        progressIncrement
    );
    return (compareTeams(current, next) >= 0)? current: next;
}

function getNextPartner(list, champions, synergies, types, index, depth, typeWeights, base, range, progressIncrement) {
    if(champions.length === depth) {
        progressIncrement();
        const pi = champions.reduce((value, { pi }) => value + pi, 0);
        const value = (pi && pi >= range[ 'minimum-team' ] && pi <= range[ 'maximum-team' ])?
            getTeamValue(champions, synergies, types, typeWeights, base): 0;
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
        base,
        range,
        progressIncrement
    );
    const next = getNextPartner(
        list,
        champions,
        synergies,
        types,
        index+1,
        depth,
        typeWeights,
        base,
        range,
        progressIncrement
    );
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

function getTeamValue(champions, synergies, types, typeWeights, base) {
    const groups = {};
    return types.reduce((value, typeAmount) => (typeAmount > 1)? value * typeWeights[ typeAmount ]: value, 1)
        * champions.reduce((value, champion) => value + champion.pi, 0)
        * synergies.reduce((value, synergy) => {
            if(synergy.group) {
                if(groups[ synergy.group ]) {
                    return value;
                }
                groups[ synergy.group ] = true;
            }
            return value + synergy.value;
        }, base);
}

function compareTeams(a, b) {
    if(b === null)
        return 1;
    return a.value - b.value;
}

export default buildQuest;
