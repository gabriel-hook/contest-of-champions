import { CHAMPION } from '../model/Champion';

export const UNRELEASED_CHAMPIONS = [
    // Cosmic
    // Tech
    // Mutant
    CHAMPION.GAMBIT,
    CHAMPION.WOLVERINEWEAPONX,
    // Skill
    CHAMPION.REDSKULL,
    // Mystic
    CHAMPION.DRSTRANGEMARVELNOW,
    //Unknown
    CHAMPION.MAESTRO,
].reduce((map, champion) => {
    map[ champion ] = true;
    return map;
}, {});
