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
    cosmic: 'type-cosmic',
    tech: 'type-tech',
    mutant: 'type-mutant',
    skill: 'type-skill',
    science: 'type-science',
    mystic: 'type-mystic',
};

function typeIcon(uid) {
    return typeIcons[ uid ] || 'effect-mastermind';
}

const uids = [ ...new Set(types.map(({ attr }) => attr.uid)) ];

export { uids, typeIcon };
export default types;
