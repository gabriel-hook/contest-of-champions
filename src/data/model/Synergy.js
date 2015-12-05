import Model from './Model';

class Synergy extends Model {
    constructor({
        fromId = 'champion',
        fromStars = 1,
        toId = 'champion',
        effectId = 'effect',
        effectAmount = 0,
    }) {
        super({
            fromId,
            fromStars,
            toId,
            effectId,
            effectAmount,
        });
    }
}

export default Synergy;
