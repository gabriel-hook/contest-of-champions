import Model from '../util/Model';

class Type extends Model {
  constructor({ uid }){
    super({
      uid: 'type-uid'
    }, {
      uid
    });
  }
}

export default Type;
