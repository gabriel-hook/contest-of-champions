import blackbolt from './guide/blackbolt';
import elektra from './guide/elektra';
import guillotine from './guide/guillotine';
import spidermanblack from './guide/spidermanblack';
import thorjanefoster from './guide/thorjanefoster';
import thevision from './guide/thevision';
import ultron from './guide/ultron';
import vision from './guide/vision';
import warmachine from './guide/warmachine';

const guides = {
    blackbolt,
    elektra,
    guillotine,
    spidermanblack,
    thorjanefoster,
    thevision,
    ultron,
    vision,
    warmachine,
};

const RATINGS = [ 1, 2, 3, 4, 5 ];
const GRADES = [ 'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'E', 'F' ];
const RANGES = [
    'melee',
    'short',
    'medium',
    'long',
];
const DAMAGE_TYPES = [
    'physical',
    'energy',
    'shock',
];
const ABILITIES = [
    'stun',
    'fatigue',
    'powerdrain',
    'powerburn',
    'bleed',
    'cauterize',
    'armorbreak',
    'fury',
    'regeneration',
    'unstoppable',
    'poison',
    'armorup',
    'plusdamage',
    'pluscritrate',
    'pluscritdamage',
    'poisonimmunity',
    'bleedimmunity',
];

export { RATINGS, GRADES, RANGES, DAMAGE_TYPES, ABILITIES };
export default guides;
