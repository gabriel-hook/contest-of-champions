import { CHAMPION_CIVILWARRIOR } from './champions';

export const SPOTLIGHT = CHAMPION_CIVILWARRIOR;
export const RATINGS = [ 1, 2, 3, 4, 5 ];
export const GRADES = [ 'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'E', 'F' ];
export const RANGES = [
    'melee',
    'short',
    'medium',
    'long',
];
export const DAMAGE_TYPES = [
    'physical',
    'energy',
];
export const PROFILE_TYPES = [
    'email',
    'reddit',
    'kabam',
    'spotlight',
];

const guides = {};
const requireGuide = require.context('./guide', true, /\.json$/);
requireGuide.keys().forEach((key) => {
    const name = key.replace('./', '').replace('.json', '');
    guides[ name ] = requireGuide(key);
});

export default guides;

export const uids = Object.keys(guides);
