import { CHAMPION } from '../model/Champion';

export const UNRELEASED_CHAMPIONS = [
    // Cosmic
    CHAMPION.QUAKE,
    CHAMPION.THANOS,
    // Tech
    // Mutant
    CHAMPION.ROGUE,
    CHAMPION.WOLVERINEWEAPONX,
    // Skill
    CHAMPION.REDSKULL,
    // Mystic
    CHAMPION.DRSTRANGEMARVELNOW,
    CHAMPION.SCARLETWITCHULTIMATE,
    //Unknown
    CHAMPION.MAESTRO,
].reduce((map, champion) => {
    map[ champion ] = true;
    return map;
}, {});
