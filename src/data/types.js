import Type, { TYPE } from './model/Type';

const types = [
    { uid: TYPE.COSMIC },
    { uid: TYPE.TECH },
    { uid: TYPE.MUTANT },
    { uid: TYPE.SKILL },
    { uid: TYPE.SCIENCE },
    { uid: TYPE.MYSTIC },
].map((type) => new Type(type));

function typeIcon(uid) {
    return `type-${ uid }`;
}

export { typeIcon };
export default types;
