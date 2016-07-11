import {
    CHAMPION_LOKI,

    CHAMPION_BEAST,
    CHAMPION_GAMBIT,
    CHAMPION_WOLVERINEWEAPONX,

    CHAMPION_REDSKULL,

    CHAMPION_DRSTRANGEMARVELNOW,

    CHAMPION_MAESTRO,
} from './ids';

export const UNRELEASED_CHAMPIONS = [
    // Cosmic
    CHAMPION_LOKI,
    // Tech
    // Mutant
    CHAMPION_BEAST,
    CHAMPION_GAMBIT,
    CHAMPION_WOLVERINEWEAPONX,
    // Skill
    CHAMPION_REDSKULL,
    // Mystic
    CHAMPION_DRSTRANGEMARVELNOW,
    //Unknown
    CHAMPION_MAESTRO,
].reduce((map, champion) => {
    map[ champion ] = true;
    return map;
}, {});
