import agentvenom from './guide/agentvenom';
import blackbolt from './guide/blackbolt';
import cyclops90s from './guide/cyclops90s';
import daredevilnetflix from './guide/daredevilnetflix';
import deadpoolxforce from './guide/deadpoolxforce';
import drstrange from './guide/drstrange';
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
    agentvenom,
    blackbolt,
    cyclops90s,
    daredevilnetflix,
    deadpoolxforce,
    drstrange,
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
];

const PROFILE_TYPES = [
    'email',
    'reddit',
    'kabam',
    'spotlight',
];

export { RATINGS, GRADES, RANGES, DAMAGE_TYPES, PROFILE_TYPES };
export default guides;
