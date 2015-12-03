import Type from './model/Type';

const types = [

    { uid:'cosmic' },
    { uid:'tech' },
    { uid:'mutant' },
    { uid:'skill' },
    { uid:'science' },
    { uid:'mystic' },

].map((type) => new Type(type));

const uids = [ ...new Set(types.map((type) => type.attr.uid)) ];

export { uids };
export default types;
