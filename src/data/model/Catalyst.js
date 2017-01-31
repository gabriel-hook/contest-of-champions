import * as CATALYST from '../ids/catalyst';
import { values } from 'lodash';

export const CATALYSTS = {
    1: {
        1: [
            { type: CATALYST.GOLD, amount: 2817 },
        ],
    },
    2:{
        1: [
            { type: CATALYST.BASIC, tier: 1, amount: 2 },
            { type: CATALYST.GOLD, amount: 4641 },
        ],
        2: [
            { type: CATALYST.BASIC, tier: 1, amount: 3 },
            { type: CATALYST.CLASS, tier: 1, amount: 1 },
            { type: CATALYST.GOLD, amount: 9282 },
        ],
    },
    3:{
        1: [
            { type: CATALYST.BASIC, tier: 2, amount: 3 },
            { type: CATALYST.CLASS, tier: 1, amount: 2 },
            { type: CATALYST.GOLD, amount: 11500 },
        ],
        2: [
            { type: CATALYST.BASIC, tier: 2, amount: 5 },
            { type: CATALYST.CLASS, tier: 2, amount: 1 },
            { type: CATALYST.GOLD, amount: 23001 },
        ],
        3: [
            { type: CATALYST.BASIC, tier: 3, amount: 3 },
            { type: CATALYST.CLASS, tier: 2, amount: 2 },
            { type: CATALYST.GOLD, amount: 34501 },
        ],
    },
    4:{
        1: [
            { type: CATALYST.BASIC, tier: 3, amount: 4 },
            { type: CATALYST.CLASS, tier: 2, amount: 3 },
            { type: CATALYST.GOLD, amount: 27435 },
        ],
        2: [
            { type: CATALYST.BASIC, tier: 3, amount: 5 },
            { type: CATALYST.CLASS, tier: 3, amount: 1 },
            { type: CATALYST.ALPHA, tier: 1, amount: 1 },
            { type: CATALYST.GOLD, amount: 54850 },
        ],
        3: [
            { type: CATALYST.BASIC, tier: 4, amount: 3 },
            { type: CATALYST.CLASS, tier: 3, amount: 2 },
            { type: CATALYST.ALPHA, tier: 1, amount: 1 },
            { type: CATALYST.GOLD, amount: 82275 },
        ],
        4: [
            { type: CATALYST.BASIC, tier: 4, amount: 5 },
            { type: CATALYST.CLASS, tier: 4, amount: 3 },
            { type: CATALYST.ALPHA, tier: 1, amount: 2 },
            { type: CATALYST.GOLD, amount: 109701 },
        ],
    },
    5: {
        1: [
            { type: CATALYST.BASIC, tier: 4, amount: 2 },
            { type: CATALYST.CLASS, tier: 3, amount: 3 },
            { type: CATALYST.ALPHA, tier: 1, amount: 5 },
            { type: CATALYST.GOLD, amount: 135684 },
        ],
        2: [
            { type: CATALYST.BASIC, tier: 4, amount: 4 },
            { type: CATALYST.CLASS, tier: 4, amount: 3 },
            { type: CATALYST.ALPHA, tier: 1, amount: 5 },
            { type: CATALYST.GOLD, amount: 271370 },
        ],
        3: [
            { type: CATALYST.BASIC, tier: 4, amount: 6 },
            { type: CATALYST.CLASS, tier: 4, amount: 4 },
            { type: CATALYST.ALPHA, tier: 1, amount: 6 },
            { type: CATALYST.ALPHA, tier: 2, amount: 4 },
            { type: CATALYST.GOLD, amount: 407056 },
        ],
        4: [
            { type: CATALYST.BASIC, tier: 5, amount: 4 },
            { type: CATALYST.CLASS, tier: 4, amount: 6 },
            { type: CATALYST.ALPHA, tier: 1, amount: 5 },
            { type: CATALYST.ALPHA, tier: 2, amount: 6 },
            { type: CATALYST.GOLD, amount: 524738 },
        ],
    },
};

export { CATALYST };
export const CATALYST_VALUES = values(CATALYST);
