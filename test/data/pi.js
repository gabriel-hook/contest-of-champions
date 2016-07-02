import { getPI } from '../../src/data/pi';

describe('data/pi', () => {

    describe('getPI()', () => it('should return non-zero default values', () => {
        const values = [ 1, 2, 3, 4, 5 ].map((stars) => getPI({ uid: 'fake', stars, rank: 1, level: 1 }));
        expect(0).to.not.be.oneOf(values);
    }));
});
