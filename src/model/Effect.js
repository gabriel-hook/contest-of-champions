import Model from './Model.js';

class Effect extends Model {
  constructor({ uid, base, amount }){
    super({
      uid: 'effect-uid',
      base: 0,
      amount: 0,
    }, {
      uid,
      base,
      amount,
    });
  }
}

export default Effect;
