import { CHAMPION } from '../model/Champion';

export const UNRELEASED_CHAMPIONS = [
    // Cosmic
    CHAMPION.QUAKE,
    CHAMPION.THANOS,
    // Tech
    CHAMPION.ULTRONCLASSIC,
    // Mutant
    CHAMPION.PHOENIX,
    CHAMPION.PHOENIXDARK,
    CHAMPION.WEAPONX,
    // Skill
    CHAMPION.REDSKULL,
    // Mystic
    CHAMPION.DRSTRANGEMARVELNOW,
    CHAMPION.SCARLETWITCHULTIMATE,
    // Universal
    CHAMPION.MAESTRO,
].reduce((map, champion) => {
    map[ champion ] = true;
    return map;
}, {});
