import { CHAMPION_NIGHTCRAWLER } from './champions';

export const SPOTLIGHT = CHAMPION_NIGHTCRAWLER;
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

const requireGuide = require.context('./guide', true, /\.json$/);
const uids = requireGuide.keys();
const guides = requireGuide.keys().reduce((map, key) => {
    const name = key.replace('./', '').replace('.json', '');
    map[ name ] = requireGuide(key);
    return map;
}, {});

export default guides;

export { uids };
