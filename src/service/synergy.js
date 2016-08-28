import { fromStorage, toStorage } from '../util/storage';

let synergyOptions = fromStorage('synergy-options', {
    legend: true,
    roster: false,
});

function getLegend() {
    return synergyOptions.legend;
}

function getRoster() {
    return synergyOptions.roster;
}

function setField(key, value) {
    synergyOptions = {
        ...synergyOptions,
        [ key ]: value,
    };
    toStorage('synergy-options', synergyOptions);
}

function setLegend(value) {
    setField('legend', value);
}

function setRoster(value) {
    setField('roster', value);
}

export { getLegend, setLegend, getRoster, setRoster };
