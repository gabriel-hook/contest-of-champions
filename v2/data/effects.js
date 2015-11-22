import Effect from '../model/Effect';

const effects = [

    { uid:'attack', base:5 },
    { uid:'stun', base:15 },
    { uid:'critrate', base:5 },
    { uid:'critdamage', base:15 },
    { uid:'powergain', base:3 },
    { uid:'powersteal', base:3 },
    { uid:'perfectblock', base:3 },
    { uid:'block', base:10 },
    { uid:'armor', base:4 },
    { uid:'health', base:4 },
    { uid:'healthsteal', base:4 },

].map((effect) => new Effect(effect));

const imageMap = {
    'attack':'attack',
    'stun':'stun',
    'critrate':'critical',
    'critdamage':'critical',
    'powergain':'mana',
    'powersteal':'mana-steal',
    'perfectblock':'block',
    'block':'block',
    'armor':'armor',
    'health':'health',
    'healthsteal':'health_steal',
};

function effectImage(uid, isAlternate) {
    return `../images/effects/${
        imageMap[ uid ]
    }${
        isAlternate? '_off': ''
    }.jpg`;
}

const effectBases = {};
effects.forEach((effect) => effectBases[ effect.attr.uid ] = effect.attr.base);
function effectBase(uid) {
    return effectBases[ uid ];
}

export { effectImage, effectBase };
export default effects;
