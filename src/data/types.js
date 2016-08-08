import Type, { TYPE } from './model/Type';

const types = [
    { uid: TYPE.COSMIC },
    { uid: TYPE.TECH },
    { uid: TYPE.MUTANT },
    { uid: TYPE.SKILL },
    { uid: TYPE.SCIENCE },
    { uid: TYPE.MYSTIC },
].map((type) => new Type(type));

const typeIcons = {
    [ TYPE.COSMIC ]: 'type-cosmic',
    [ TYPE.TECH ]: 'type-tech',
    [ TYPE.MUTANT ]: 'type-mutant',
    [ TYPE.SKILL ]: 'type-skill',
    [ TYPE.SCIENCE ]: 'type-science',
    [ TYPE.MYSTIC ]: 'type-mystic',
};

function typeIcon(uid) {
    return typeIcons[ uid ] || 'type-master';
}

export { typeIcon };
export default types;
