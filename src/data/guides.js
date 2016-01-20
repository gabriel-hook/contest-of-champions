import blackbolt from './guide/blackbolt';
import daredevilnetflix from './guide/daredevilnetflix';
import deadpoolxforce from './guide/deadpoolxforce';
import elektra from './guide/elektra';
import groot from './guide/groot';
import guillotine from './guide/guillotine';
import joefixit from './guide/joefixit';
import lukecage from './guide/lukecage';
import magnetomarvelnow from './guide/magnetomarvelnow';
import moonknight from './guide/moonknight';
import spidergwen from './guide/spidergwen';
import spidermanblack from './guide/spidermanblack';
import spidermanmorales from './guide/spidermanmorales';
import thevision from './guide/thevision';
import thorjanefoster from './guide/thorjanefoster';
import ultron from './guide/ultron';
import venom from './guide/venom';
import venompool from './guide/venompool';
import vision from './guide/vision';
import warmachine from './guide/warmachine';
import wolverineoldman from './guide/wolverineoldman';

const guides = {
    blackbolt,
    daredevilnetflix,
    deadpoolxforce,
    elektra,
    groot,
    guillotine,
    joefixit,
    lukecage,
    magnetomarvelnow,
    moonknight,
    spidergwen,
    spidermanblack,
    spidermanmorales,
    thevision,
    thorjanefoster,
    ultron,
    venom,
    venompool,
    vision,
    warmachine,
    wolverineoldman,
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
    'stagger',
    'fatigue',
    'weakness',
    'powerdrain',
    'powerburn',
    'shock',
    'bleed',
    'healblock',
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

const PROFILE_TYPES = [
    'email',
    'reddit',
    'kabam',
    'spotlight',
];

export { RATINGS, GRADES, RANGES, DAMAGE_TYPES, ABILITIES, PROFILE_TYPES };
export default guides;
