import Type from './model/Type';

const types = [

        { uid: 'cosmic' },
        { uid: 'tech' },
        { uid: 'mutant' },
        { uid: 'skill' },
        { uid: 'science' },
        { uid: 'mystic' },

].map((type) => new Type(type));

const typeIcons = {
    cosmic: 'moon-o',
    tech: 'code-fork',
    mutant: 'transgender-alt',
    skill: 'hand-rock-o',
    science: 'flask',
    mystic: 'eye',
};

function typeIcon(uid) {
    return typeIcons[ uid ] || 'circle';
}

function typeImage(uid, append = 'black') {
    return `images/types/${
        uid
    }_${
        append
    }.png`;
}

const uids = [ ...new Set(types.map(({ attr }) => attr.uid)) ];

export { uids, typeImage, typeIcon };
export default types;
