import Type from './model/Type';

const types = [

    { uid: 'cosmic' },
    { uid: 'tech' },
    { uid: 'mutant' },
    { uid: 'skill' },
    { uid: 'science' },
    { uid: 'mystic' },

].map((type) => new Type(type));

function typeImage(uid, append = 'black') {
    return `images/types/${
        uid
    }_${
        append
    }.png`;
}

const uids = [ ...new Set(types.map(({ attr }) => attr.uid)) ];

export { uids, typeImage };
export default types;
