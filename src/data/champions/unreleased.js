import { CHAMPION } from '../model/Champion';

export const UNRELEASED_CHAMPIONS = [
    // Cosmic
    // Tech
    // Mutant
    // Skill
    CHAMPION.MASACRE,
    // Mystic
    // Universal
].reduce((map, champion) => {
    map[ champion ] = true;
    return map;
}, {});
