import Model from '../util/Model.js';

class Champion extends Model {
	constructor({ uid, stars, typeId, pi }){
		super({
			uid: 'champion-uid',
			stars: 1,
			typeId: 'mutant',
			pi: 0,
		}, {
			uid,
			stars,
			typeId,
			pi,
		});
	}

	id(){
		return `${ this.attr.uid }_${ this.attr.stars }`;
	}
}

export default Champion;
