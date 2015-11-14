import Type from '../model/Type';

const types = [

	{ uid:'cosmic' },
	{ uid:'tech' },
	{ uid:'mutant' },
	{ uid:'skill' },
	{ uid:'science' },
	{ uid:'mystic' },
  
].map((type) => new Type(type));

export default types;
