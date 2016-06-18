import Model from './Model';

class Synergy extends Model {
    constructor({
        fromId = 'champion',
        fromStars = 1,
        toId = 'champion',
        effectId = 'effect',
        effectAmount = 0,
        group = 0,
    }) {
        super({
            fromId,
            fromStars,
            toId,
            effectId,
            effectAmount,
            group,
        });
    }
}

export default Synergy;
