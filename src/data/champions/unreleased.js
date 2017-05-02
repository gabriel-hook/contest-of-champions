import { CHAMPION } from '../model/Champion';

export const UNRELEASED_CHAMPIONS = [
    // Cosmic
    CHAMPION.NEBULA,
    CHAMPION.YONDU,
    // Mutant
    // Skill
    // Mystic
    CHAMPION.DRSTRANGEMARVELNOW,
    CHAMPION.SCARLETWITCHULTIMATE,
    // Universal
    CHAMPION.MAESTRO,
].reduce((map, champion) => {
    map[ champion ] = true;
    return map;
}, {});
