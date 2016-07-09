import { getPi } from '../../src/data/pi';

describe('data/pi', () => {

    describe('getPi()', () => it('should return non-zero default values', () => {
        const values = [ 1, 2, 3, 4, 5 ].map((stars) => getPi({ uid: 'fake', stars, rank: 1, level: 1 }));
        expect(0).to.not.be.oneOf(values);
    }));
});
