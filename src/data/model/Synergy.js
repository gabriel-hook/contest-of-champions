class Synergy {
    constructor({
        fromId = 'champion',
        fromStars = 1,
        toId = 'champion',
        effectId = 'effect',
        effectAmount = 0,
        group = 0,
    }) {
        this.attr = {
            fromId,
            fromStars,
            toId,
            effectId,
            effectAmount,
            group,
        };
    }

    toJSON() {
        return this.attr;
    }
}

export default Synergy;
