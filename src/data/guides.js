import agentvenom from './guide/agentvenom';
import blackbolt from './guide/blackbolt';
import blackpanthercivilwar from './guide/blackpanthercivilwar';
import crossbones from './guide/crossbones';
import cyclops90s from './guide/cyclops90s';
import daredevilnetflix from './guide/daredevilnetflix';
import deadpoolxforce from './guide/deadpoolxforce';
import drstrange from './guide/drstrange';
import elektra from './guide/elektra';
import falcon from './guide/falcon';
import groot from './guide/groot';
import guillotine from './guide/guillotine';
import joefixit from './guide/joefixit';
import kamalakhan from './guide/kamalakhan';
import lukecage from './guide/lukecage';
import magnetomarvelnow from './guide/magnetomarvelnow';
import moonknight from './guide/moonknight';
import redhulk from './guide/redhulk';
import shehulk from './guide/shehulk';
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
import x23 from './guide/x23';

const SPOTLIGHT = 'falcon';

const guides = {
    agentvenom,
    blackbolt,
    blackpanthercivilwar,
    crossbones,
    cyclops90s,
    daredevilnetflix,
    deadpoolxforce,
    drstrange,
    elektra,
    falcon,
    groot,
    guillotine,
    joefixit,
    kamalakhan,
    lukecage,
    magnetomarvelnow,
    moonknight,
    redhulk,
    shehulk,
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
    x23,
};

const uids = Object.keys(guides);

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

export { RATINGS, GRADES, RANGES, DAMAGE_TYPES, PROFILE_TYPES, SPOTLIGHT };
export { uids };
export default guides;
