import {
    CHAMPION_BLACKBOLT, CHAMPION_CAPTAINMARVEL, CHAMPION_DRAX, CHAMPION_GAMORA,
    CHAMPION_GROOT, CHAMPION_KAMALAKHAN, CHAMPION_MSMARVEL, CHAMPION_RONAN,
    CHAMPION_SPIDERMANBLACK, CHAMPION_SUPERIORIRONMAN, CHAMPION_THOR,
    CHAMPION_VENOM, CHAMPION_VENOMPOOL,

    CHAMPION_CIVILWARRIOR, CHAMPION_HULKBUSTER, CHAMPION_IRONMAN,
    CHAMPION_IRONPATRIOT, CHAMPION_KANG, CHAMPION_ROCKET, CHAMPION_STARLORD,
    CHAMPION_VISION, CHAMPION_THEVISION, CHAMPION_ULTRON, CHAMPION_WARMACHINE,

    CHAMPION_BEAST, CHAMPION_COLOSSUS, CHAMPION_CYCLOPS, CHAMPION_CYCLOPS90S,
    CHAMPION_DEADPOOL, CHAMPION_DEADPOOLXFORCE, CHAMPION_MAGNETO,
    CHAMPION_MAGNETOMARVELNOW, CHAMPION_NIGHTCRAWLER, CHAMPION_STORM,
    CHAMPION_WOLVERINE, CHAMPION_WOLVERINEOLDMAN, CHAMPION_X23,

    CHAMPION_AGENTVENOM, CHAMPION_BLACKPANTHER, CHAMPION_BLACKPANTHERCIVILWAR,
    CHAMPION_BLACKWIDOW, CHAMPION_CROSSBONES, CHAMPION_DAREDEVIL,
    CHAMPION_DAREDEVILNETFLIX, CHAMPION_ELEKTRA, CHAMPION_FALCON,
    CHAMPION_HAWKEYE, CHAMPION_MOONKNIGHT, CHAMPION_PUNISHER, CHAMPION_WINTERSOLDIER,

    CHAMPION_ABOMINATION, CHAMPION_ANTMAN, CHAMPION_CAPTAINAMERICA,
    CHAMPION_CAPTAINAMERICAWWII, CHAMPION_ELECTRO, CHAMPION_HULK,
    CHAMPION_JOEFIXIT, CHAMPION_LUKECAGE, CHAMPION_REDHULK, CHAMPION_RHINO,
    CHAMPION_SHEHULK, CHAMPION_SPIDERGWEN, CHAMPION_SPIDERMAN,
    CHAMPION_SPIDERMANMORALES, CHAMPION_YELLOWJACKET,

    CHAMPION_DRSTRANGE, CHAMPION_GUILLOTINE, CHAMPION_IRONFIST,
    CHAMPION_IRONFISTWHITE, CHAMPION_JUGGERNAUT, CHAMPION_MAGIK,
    CHAMPION_SCARLETWITCH, CHAMPION_THORJANEFOSTER, CHAMPION_UNSTOPPABLECOLOSSUS,
} from './champions';
import { EFFECT_STARS_AMOUNT, EFFECT_STARS_INDEX } from './effects';
import Synergy from './model/Synergy';

const synergies = [

    ...fromId(CHAMPION_BLACKBOLT, [
        ...fromStars(2, [
            { toId: CHAMPION_CYCLOPS, effectId: 'block' },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION_CYCLOPS, effectId: 'block' },
            { toId: CHAMPION_SPIDERMAN, effectId: 'armor' },
            { toId: CHAMPION_RONAN, effectId: 'attack' },
            { toId: CHAMPION_HULK, effectId: 'critdamage' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_CYCLOPS, effectId: 'block' },
            { toId: CHAMPION_SPIDERMAN, effectId: 'armor' },
            { toId: CHAMPION_RONAN, effectId: 'attack' },
            { toId: CHAMPION_HULK, effectId: 'critdamage' },
        ]),
    ]),

    ...fromId(CHAMPION_CAPTAINMARVEL, [
        ...fromStars(3, [
            { toId: CHAMPION_CAPTAINAMERICA, effectId: 'armor' },
            { toId: CHAMPION_GAMORA, effectId: 'armor' },
            { toId: CHAMPION_IRONMAN, effectId: 'armor' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_CAPTAINAMERICA, effectId: 'armor' },
            { toId: CHAMPION_GAMORA, effectId: 'armor' },
            { toId: CHAMPION_IRONMAN, effectId: 'armor' },
            { toId: CHAMPION_WOLVERINE, effectId: 'powergain' },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION_CAPTAINAMERICA, effectId: 'armor' },
            { toId: CHAMPION_GAMORA, effectId: 'armor' },
            { toId: CHAMPION_IRONMAN, effectId: 'armor' },
            { toId: CHAMPION_WOLVERINE, effectId: 'powergain' },
        ]),
    ]),

    ...fromId(CHAMPION_DRAX, [
        ...fromStars(2, [
            { toId: CHAMPION_STARLORD, effectId: 'perfectblock' },
            { toId: CHAMPION_GAMORA, effectId: 'critdamage' },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION_STARLORD, effectId: 'perfectblock' },
            { toId: CHAMPION_GAMORA, effectId: 'critdamage' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_STARLORD, effectId: 'perfectblock' },
            { toId: CHAMPION_GAMORA, effectId: 'critdamage' },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION_STARLORD, effectId: 'perfectblock' },
            { toId: CHAMPION_GAMORA, effectId: 'critdamage' },
        ]),
    ]),

    ...fromId(CHAMPION_GAMORA, [
        ...fromStars(2, [
            { toId: CHAMPION_STARLORD, effectId: 'armor' },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION_STARLORD, effectId: 'armor' },
            { toId: CHAMPION_DRAX, effectId: 'critdamage' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_STARLORD, effectId: 'armor' },
            { toId: CHAMPION_DRAX, effectId: 'critdamage' },
        ]),
    ]),

    ...fromId(CHAMPION_GROOT, [
        ...fromStars(3, [
            { toId: CHAMPION_STARLORD, effectId: 'armor' },
            { toId: CHAMPION_DRAX, effectId: 'perfectblock' },
            { toId: CHAMPION_ROCKET, effectId: 'inseparable' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_STARLORD, effectId: 'armor' },
            { toId: CHAMPION_DRAX, effectId: 'perfectblock' },
            { toId: CHAMPION_ROCKET, effectId: 'inseparable' },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION_STARLORD, effectId: 'armor' },
            { toId: CHAMPION_DRAX, effectId: 'perfectblock' },
            { toId: CHAMPION_ROCKET, effectId: 'inseparable' },
        ]),
    ]),

    ...fromId(CHAMPION_KAMALAKHAN, [
        ...fromStars(3, [
            { toId: CHAMPION_CAPTAINMARVEL, effectId: 'idol' },
            { toId: CHAMPION_MSMARVEL, effectId: 'idol' },
            { toId: CHAMPION_SPIDERMANMORALES, effectId: 'perfectblock' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_CAPTAINMARVEL, effectId: 'idol' },
            { toId: CHAMPION_MSMARVEL, effectId: 'idol' },
            { toId: CHAMPION_SPIDERMANMORALES, effectId: 'perfectblock' },
            { toId: CHAMPION_VISION, effectId: 'perfectblock' },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION_CAPTAINMARVEL, effectId: 'idol' },
            { toId: CHAMPION_MSMARVEL, effectId: 'idol' },
            { toId: CHAMPION_SPIDERMANMORALES, effectId: 'perfectblock' },
            { toId: CHAMPION_VISION, effectId: 'perfectblock' },
        ]),
    ]),

    ...fromId(CHAMPION_MSMARVEL, [
        ...fromStars(3, [
            { toId: CHAMPION_CAPTAINAMERICA, effectId: 'armor' },
            { toId: CHAMPION_IRONMAN, effectId: 'perfectblock' },
            { toId: CHAMPION_THOR, effectId: 'perfectblock' },
            { toId: CHAMPION_HULK, effectId: 'perfectblock' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_CAPTAINAMERICA, effectId: 'armor' },
            { toId: CHAMPION_IRONMAN, effectId: 'perfectblock' },
            { toId: CHAMPION_THOR, effectId: 'perfectblock' },
            { toId: CHAMPION_HULK, effectId: 'perfectblock' },
        ]),
    ]),

    ...fromId(CHAMPION_RONAN, [
        ...fromStars(2, [
            { toId: CHAMPION_BLACKBOLT, effectId: 'critdamage' },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION_BLACKBOLT, effectId: 'critdamage' },
            { toId: CHAMPION_IRONMAN, effectId: 'critrate' },
            { toId: CHAMPION_GAMORA, effectId: 'critdamage' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_BLACKBOLT, effectId: 'critdamage' },
            { toId: CHAMPION_IRONMAN, effectId: 'critrate' },
            { toId: CHAMPION_GAMORA, effectId: 'critdamage' },
            { toId: CHAMPION_HULK, effectId: 'critrate' },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION_BLACKBOLT, effectId: 'critdamage' },
            { toId: CHAMPION_IRONMAN, effectId: 'critrate' },
            { toId: CHAMPION_GAMORA, effectId: 'critdamage' },
            { toId: CHAMPION_HULK, effectId: 'critrate' },
        ]),
    ]),

    ...fromId(CHAMPION_SPIDERMANBLACK, [
        ...fromStars(3, [
            { toId: CHAMPION_STORM, effectId: 'armor' },
            { toId: CHAMPION_ELECTRO, effectId: 'critrate' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_STORM, effectId: 'armor' },
            { toId: CHAMPION_ELECTRO, effectId: 'critrate' },
        ]),
    ]),

    ...fromId(CHAMPION_SUPERIORIRONMAN, [
        ...fromStars(2, [
            { toId: CHAMPION_CAPTAINAMERICA, effectId: 'critrate' },
            { toId: CHAMPION_DAREDEVIL, effectId: 'critdamage' },
            { toId: CHAMPION_THOR, effectId: 'perfectblock' },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION_CAPTAINAMERICA, effectId: 'critrate' },
            { toId: CHAMPION_DAREDEVIL, effectId: 'critdamage' },
            { toId: CHAMPION_THOR, effectId: 'perfectblock' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_CAPTAINAMERICA, effectId: 'critrate' },
            { toId: CHAMPION_DAREDEVIL, effectId: 'critdamage' },
            { toId: CHAMPION_THOR, effectId: 'perfectblock' },
        ]),
    ]),

    ...fromId(CHAMPION_THOR, [
        ...fromStars(2, [
            { toId: CHAMPION_DRSTRANGE, effectId: 'armor' },
            { toId: CHAMPION_IRONMAN, effectId: 'armor' },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION_DRSTRANGE, effectId: 'armor' },
            { toId: CHAMPION_IRONMAN, effectId: 'armor' },
            { toId: CHAMPION_JUGGERNAUT, effectId: 'critrate' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_DRSTRANGE, effectId: 'armor' },
            { toId: CHAMPION_IRONMAN, effectId: 'armor' },
            { toId: CHAMPION_JUGGERNAUT, effectId: 'critrate' },
        ]),
    ]),

    ...fromId(CHAMPION_VENOM, [
        ...fromStars(3, [
            { toId: CHAMPION_SPIDERMAN, effectId: 'attack' },
            { toId: CHAMPION_SPIDERMANBLACK, effectId: 'health' },
            { toId: CHAMPION_ELECTRO, effectId: 'critdamage' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_SPIDERMAN, effectId: 'attack' },
            { toId: CHAMPION_SPIDERMANBLACK, effectId: 'health' },
            { toId: CHAMPION_ELECTRO, effectId: 'critdamage' },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION_SPIDERMAN, effectId: 'attack' },
            { toId: CHAMPION_SPIDERMANBLACK, effectId: 'health' },
            { toId: CHAMPION_ELECTRO, effectId: 'critdamage' },
        ]),
    ]),

    ...fromId(CHAMPION_VENOMPOOL, [
        ...fromStars(3, [
            { toId: CHAMPION_VENOM, effectId: 'inseparable' },
            { toId: CHAMPION_DEADPOOL, effectId: 'armor' },
            { toId: CHAMPION_DEADPOOLXFORCE, effectId: 'armor' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_VENOM, effectId: 'inseparable' },
            { toId: CHAMPION_DEADPOOL, effectId: 'armor' },
            { toId: CHAMPION_DEADPOOLXFORCE, effectId: 'armor' },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION_VENOM, effectId: 'inseparable' },
            { toId: CHAMPION_DEADPOOL, effectId: 'armor' },
            { toId: CHAMPION_DEADPOOLXFORCE, effectId: 'armor' },
        ]),
    ]),

    ...fromId(CHAMPION_CIVILWARRIOR, [
        ...fromStars(3, [
            { toId: CHAMPION_WINTERSOLDIER, effectId: 'armor' },
            { toId: CHAMPION_FALCON, effectId: 'armor' },
            { toId: CHAMPION_GUILLOTINE, effectId: 'perfectblock' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_WINTERSOLDIER, effectId: 'armor' },
            { toId: CHAMPION_FALCON, effectId: 'armor' },
            { toId: CHAMPION_GUILLOTINE, effectId: 'perfectblock' },
            ...toIds([ CHAMPION_IRONMAN, CHAMPION_HULKBUSTER ], { effectId: 'critdamage' }),
        ]),
        ...fromStars(5, [
            { toId: CHAMPION_WINTERSOLDIER, effectId: 'armor' },
            { toId: CHAMPION_FALCON, effectId: 'armor' },
            { toId: CHAMPION_GUILLOTINE, effectId: 'perfectblock' },
            ...toIds([ CHAMPION_IRONMAN, CHAMPION_HULKBUSTER ], { effectId: 'critdamage' }),
        ]),
    ]),

    ...fromId(CHAMPION_IRONMAN, [
        ...fromStars(2, [
            { toId: CHAMPION_THOR, effectId: 'perfectblock' },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION_CAPTAINAMERICA, effectId: 'armor' },
            { toId: CHAMPION_THOR, effectId: 'perfectblock' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_CAPTAINAMERICA, effectId: 'armor' },
            { toId: CHAMPION_THOR, effectId: 'perfectblock' },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION_CAPTAINAMERICA, effectId: 'armor' },
            { toId: CHAMPION_THOR, effectId: 'perfectblock' },
        ]),
    ]),

    ...fromId(CHAMPION_IRONPATRIOT, [
        ...fromStars(3, [
            { toId: CHAMPION_IRONMAN, effectId: 'armor' },
            { toId: CHAMPION_SPIDERMAN, effectId: 'critrate' },
            { toId: CHAMPION_CAPTAINAMERICA, effectId: 'critdamage' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_IRONMAN, effectId: 'armor' },
            { toId: CHAMPION_SPIDERMAN, effectId: 'critrate' },
            { toId: CHAMPION_CAPTAINAMERICA, effectId: 'critdamage' },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION_IRONMAN, effectId: 'armor' },
            { toId: CHAMPION_SPIDERMAN, effectId: 'critrate' },
            { toId: CHAMPION_CAPTAINAMERICA, effectId: 'critdamage' },
        ]),
    ]),

    ...fromId(CHAMPION_KANG, [
        ...fromStars(4, [
            { toId: CHAMPION_BLACKBOLT, effectId: 'armor' },
            { toId: CHAMPION_THEVISION, effectId: 'critrate' },
            { toId: CHAMPION_THOR, effectId: 'critrate' },
        ]),
    ]),

    ...fromId(CHAMPION_HULKBUSTER, [
        ...fromStars(2, [
            { toId: CHAMPION_HULK, effectId: 'critdamage' },
            { toId: CHAMPION_HULK, effectId: 'critdamage' },
            { toId: CHAMPION_IRONMAN, effectId: 'health' },
            { toId: CHAMPION_SUPERIORIRONMAN, effectId: 'health' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_HULK, effectId: 'critdamage' },
            { toId: CHAMPION_IRONMAN, effectId: 'health' },
            { toId: CHAMPION_SUPERIORIRONMAN, effectId: 'health' },
        ]),
    ]),

    ...fromId(CHAMPION_ROCKET, [
        ...fromStars(2, [
            { toId: CHAMPION_STARLORD, effectId: 'armor' },
            { toId: CHAMPION_GAMORA, effectId: 'perfectblock' },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION_STARLORD, effectId: 'armor' },
            { toId: CHAMPION_RONAN, effectId: 'critrate' },
            { toId: CHAMPION_GAMORA, effectId: 'perfectblock' },
            { toId: CHAMPION_DRAX, effectId: 'perfectblock' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_STARLORD, effectId: 'armor' },
            { toId: CHAMPION_RONAN, effectId: 'critrate' },
            { toId: CHAMPION_GAMORA, effectId: 'perfectblock' },
            { toId: CHAMPION_DRAX, effectId: 'perfectblock' },
        ]),
    ]),

    ...fromId(CHAMPION_STARLORD, [
        ...fromStars(2, [
            { toId: CHAMPION_ROCKET, effectId: 'armor' },
            { toId: CHAMPION_DRAX, effectId: 'perfectblock' },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION_ROCKET, effectId: 'armor' },
            { toId: CHAMPION_DRAX, effectId: 'perfectblock' },
            { toId: CHAMPION_GAMORA, effectId: 'perfectblock' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_ROCKET, effectId: 'armor' },
            { toId: CHAMPION_DRAX, effectId: 'perfectblock' },
            { toId: CHAMPION_GAMORA, effectId: 'perfectblock' },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION_ROCKET, effectId: 'armor' },
            { toId: CHAMPION_DRAX, effectId: 'perfectblock' },
            { toId: CHAMPION_GAMORA, effectId: 'perfectblock' },
        ]),
    ]),

    ...fromId(CHAMPION_VISION, [
        ...fromStars(2, [
            { toId: CHAMPION_SCARLETWITCH, effectId: 'powergain' },
            { toId: CHAMPION_IRONMAN, effectId: 'perfectblock' },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION_SCARLETWITCH, effectId: 'powergain' },
            { toId: CHAMPION_IRONMAN, effectId: 'perfectblock' },
            { toId: CHAMPION_MAGNETO, effectId: 'critrate' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_SCARLETWITCH, effectId: 'powergain' },
            { toId: CHAMPION_IRONMAN, effectId: 'perfectblock' },
            { toId: CHAMPION_MAGNETO, effectId: 'critrate' },
        ]),
    ]),

    ...fromId(CHAMPION_THEVISION, [
        ...fromStars(2, [
            { toId: CHAMPION_IRONMAN, effectId: 'health' },
            { toId: CHAMPION_SCARLETWITCH, effectId: 'perfectblock' },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION_IRONMAN, effectId: 'health' },
            { toId: CHAMPION_SCARLETWITCH, effectId: 'perfectblock' },
            { toId: CHAMPION_ULTRON, effectId: 'attack' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_IRONMAN, effectId: 'health' },
            { toId: CHAMPION_SCARLETWITCH, effectId: 'perfectblock' },
            { toId: CHAMPION_ULTRON, effectId: 'attack' },
        ]),
    ]),

    ...fromId(CHAMPION_ULTRON, [
        ...fromStars(2, [
            { toId: CHAMPION_IRONMAN, effectId: 'health' },
            { toId: CHAMPION_SCARLETWITCH, effectId: 'armor' },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION_IRONMAN, effectId: 'health' },
            { toId: CHAMPION_SCARLETWITCH, effectId: 'armor' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_IRONMAN, effectId: 'health' },
            { toId: CHAMPION_SCARLETWITCH, effectId: 'armor' },
        ]),
    ]),

    ...fromId(CHAMPION_WARMACHINE, [
        ...fromStars(2, [
            { toId: CHAMPION_HULKBUSTER, effectId: 'armor' },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION_HULKBUSTER, effectId: 'armor' },
            { toId: CHAMPION_HAWKEYE, effectId: 'block' },
            { toId: CHAMPION_BLACKWIDOW, effectId: 'perfectblock' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_HULKBUSTER, effectId: 'armor' },
            { toId: CHAMPION_BLACKPANTHER, effectId: 'critrate' },
            { toId: CHAMPION_HAWKEYE, effectId: 'block' },
            { toId: CHAMPION_BLACKWIDOW, effectId: 'perfectblock' },
        ]),
    ]),

    ...fromId(CHAMPION_COLOSSUS, [
        ...fromStars(2, [
            { toId: CHAMPION_JUGGERNAUT, effectId: 'critrate' },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION_JUGGERNAUT, effectId: 'critrate' },
            { toId: CHAMPION_WOLVERINE, effectId: 'armor' },
            { toId: CHAMPION_MAGIK, effectId: 'health' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_JUGGERNAUT, effectId: 'critrate' },
            { toId: CHAMPION_WOLVERINE, effectId: 'armor' },
            { toId: CHAMPION_MAGIK, effectId: 'health' },
        ]),
    ]),

    ...fromId(CHAMPION_CYCLOPS, [
        ...fromStars(2, [
            { toId: CHAMPION_WOLVERINE, effectId: 'critdamage' },
            ...toIds([ CHAMPION_STORM, CHAMPION_COLOSSUS ], { effectId: 'mutantagenda' }),
        ]),
        ...fromStars(3, [
            { toId: CHAMPION_WOLVERINE, effectId: 'critdamage' },
            { toId: CHAMPION_MAGNETO, effectId: 'attack' },
            ...toIds([ CHAMPION_STORM, CHAMPION_COLOSSUS ], { effectId: 'mutantagenda' }),
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_WOLVERINE, effectId: 'critdamage' },
            { toId: CHAMPION_MAGNETO, effectId: 'attack' },
            ...toIds([ CHAMPION_STORM, CHAMPION_COLOSSUS ], { effectId: 'mutantagenda' }),
        ]),
        ...fromStars(5, [
            { toId: CHAMPION_WOLVERINE, effectId: 'critdamage' },
            { toId: CHAMPION_MAGNETO, effectId: 'attack' },
            ...toIds([ CHAMPION_STORM, CHAMPION_COLOSSUS ], { effectId: 'mutantagenda' }),
        ]),
    ]),

    ...fromId(CHAMPION_CYCLOPS90S, [
        ...fromStars(3, [
            { toId: CHAMPION_MAGNETO, effectId: 'attack' },
            { toId: CHAMPION_STORM, effectId: 'block' },
            ...toIds([ CHAMPION_COLOSSUS, CHAMPION_WOLVERINE ], { effectId: 'mutantagenda' }),
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_MAGNETO, effectId: 'attack' },
            { toId: CHAMPION_STORM, effectId: 'block' },
            ...toIds([ CHAMPION_COLOSSUS, CHAMPION_WOLVERINE ], { effectId: 'mutantagenda' }),
        ]),
        ...fromStars(5, [
            { toId: CHAMPION_MAGNETO, effectId: 'attack' },
            { toId: CHAMPION_STORM, effectId: 'block' },
            ...toIds([ CHAMPION_COLOSSUS, CHAMPION_WOLVERINE ], { effectId: 'mutantagenda' }),
        ]),
    ]),

    ...fromId(CHAMPION_DEADPOOL, [
        ...fromStars(2, [
            { toId: CHAMPION_PUNISHER, effectId: 'perfectblock' },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION_RHINO, effectId: 'critrate' },
            { toId: CHAMPION_WOLVERINE, effectId: 'health' },
            { toId: CHAMPION_PUNISHER, effectId: 'perfectblock' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_RHINO, effectId: 'critrate' },
            { toId: CHAMPION_WOLVERINE, effectId: 'health' },
            { toId: CHAMPION_PUNISHER, effectId: 'perfectblock' },
        ]),
    ]),

    ...fromId(CHAMPION_DEADPOOLXFORCE, [
        ...fromStars(2, [
            { toId: CHAMPION_MOONKNIGHT, effectId: 'critdamage' },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION_MOONKNIGHT, effectId: 'critdamage' },
            { toId: CHAMPION_DEADPOOL, effectId: 'critdamage' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_MAGNETOMARVELNOW, effectId: 'armor' },
            { toId: CHAMPION_MOONKNIGHT, effectId: 'critdamage' },
            { toId: CHAMPION_DEADPOOL, effectId: 'critdamage' },
        ]),
    ]),

    ...fromId(CHAMPION_MAGNETO, [
        ...fromStars(2, [
            { toId: CHAMPION_CYCLOPS, effectId: 'block' },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION_WOLVERINE, effectId: 'critrate' },
            { toId: CHAMPION_CYCLOPS, effectId: 'block' },
            { toId: CHAMPION_STORM, effectId: 'critdamage' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_WOLVERINE, effectId: 'critrate' },
            { toId: CHAMPION_CYCLOPS, effectId: 'block' },
            { toId: CHAMPION_STORM, effectId: 'critdamage' },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION_WOLVERINE, effectId: 'critrate' },
            { toId: CHAMPION_CYCLOPS, effectId: 'block' },
            { toId: CHAMPION_STORM, effectId: 'critdamage' },
        ]),
    ]),

    ...fromId(CHAMPION_MAGNETOMARVELNOW, [
        ...fromStars(3, [
            { toId: CHAMPION_CYCLOPS, effectId: 'perfectblock' },
            { toId: CHAMPION_MAGIK, effectId: 'perfectblock' },
            { toId: CHAMPION_WOLVERINE, effectId: 'critdamage' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_CYCLOPS, effectId: 'perfectblock' },
            { toId: CHAMPION_MAGIK, effectId: 'perfectblock' },
            { toId: CHAMPION_WOLVERINE, effectId: 'critdamage' },
        ]),
    ]),

    ...fromId(CHAMPION_NIGHTCRAWLER, [
        ...fromStars(3, [
            { toId: CHAMPION_BEAST, effectId: 'armor' },
            { toId: CHAMPION_JUGGERNAUT, effectId: 'critrate' },
            ...toIds([ CHAMPION_CYCLOPS, CHAMPION_CYCLOPS90S ], { effectId: 'perfectblock' }),
            { toId: CHAMPION_X23, effectId: 'critdamage' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_BEAST, effectId: 'armor' },
            { toId: CHAMPION_JUGGERNAUT, effectId: 'critrate' },
            ...toIds([ CHAMPION_CYCLOPS, CHAMPION_CYCLOPS90S ], { effectId: 'perfectblock' }),
            { toId: CHAMPION_X23, effectId: 'critdamage' },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION_BEAST, effectId: 'armor' },
            { toId: CHAMPION_JUGGERNAUT, effectId: 'critrate' },
            ...toIds([ CHAMPION_CYCLOPS, CHAMPION_CYCLOPS90S ], { effectId: 'perfectblock' }),
            { toId: CHAMPION_X23, effectId: 'critdamage' },
        ]),
    ]),

    ...fromId(CHAMPION_STORM, [
        ...fromStars(2, [
            { toId: CHAMPION_BLACKPANTHER, effectId: 'powergain' },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION_MAGIK, effectId: 'armor' },
            { toId: CHAMPION_CYCLOPS, effectId: 'perfectblock' },
            { toId: CHAMPION_BLACKPANTHER, effectId: 'powergain' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_MAGIK, effectId: 'armor' },
            { toId: CHAMPION_CYCLOPS, effectId: 'perfectblock' },
            { toId: CHAMPION_BLACKPANTHER, effectId: 'powergain' },
            { toId: CHAMPION_MAGNETO, effectId: 'critrate' },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION_MAGIK, effectId: 'armor' },
            { toId: CHAMPION_CYCLOPS, effectId: 'perfectblock' },
            { toId: CHAMPION_BLACKPANTHER, effectId: 'powergain' },
            { toId: CHAMPION_MAGNETO, effectId: 'critrate' },
        ]),
    ]),

    ...fromId(CHAMPION_WOLVERINE, [
        ...fromStars(2, [
            { toId: CHAMPION_CYCLOPS, effectId: 'critdamage' },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION_CYCLOPS, effectId: 'critdamage' },
            { toId: CHAMPION_CAPTAINAMERICA, effectId: 'armor' },
            { toId: CHAMPION_MAGNETO, effectId: 'critrate' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_CYCLOPS, effectId: 'critdamage' },
            { toId: CHAMPION_CAPTAINAMERICA, effectId: 'armor' },
            { toId: CHAMPION_MAGNETO, effectId: 'critrate' },
        ]),
    ]),

    ...fromId(CHAMPION_WOLVERINEOLDMAN, [
        ...fromStars(3, [
            { toId: CHAMPION_WOLVERINE, effectId: 'critrate' },
            { toId: CHAMPION_HAWKEYE, effectId: 'armor' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_WOLVERINE, effectId: 'critrate' },
            { toId: CHAMPION_HAWKEYE, effectId: 'armor' },
            { toId: CHAMPION_HULK, effectId: 'attack' },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION_WOLVERINE, effectId: 'critrate' },
            { toId: CHAMPION_HAWKEYE, effectId: 'armor' },
            { toId: CHAMPION_HULK, effectId: 'attack' },
        ]),
    ]),

    ...fromId(CHAMPION_X23, [
        ...fromStars(3, [
            { toId: CHAMPION_WOLVERINE, effectId: 'health' },
            { toId: CHAMPION_AGENTVENOM, effectId: 'perfectblock' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_WOLVERINE, effectId: 'health' },
            { toId: CHAMPION_AGENTVENOM, effectId: 'perfectblock' },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION_WOLVERINE, effectId: 'health' },
            { toId: CHAMPION_AGENTVENOM, effectId: 'perfectblock' },
        ]),
    ]),

    ...fromId(CHAMPION_AGENTVENOM, [
        ...fromStars(3, [
            { toId: CHAMPION_SPIDERMAN, effectId: 'idol' },
            { toId: CHAMPION_VENOM, effectId: 'health' },
            { toId: CHAMPION_SPIDERMANBLACK, effectId: 'health' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_SPIDERMAN, effectId: 'idol' },
            { toId: CHAMPION_VENOM, effectId: 'health' },
            { toId: CHAMPION_SPIDERMANBLACK, effectId: 'health' },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION_SPIDERMAN, effectId: 'idol' },
            { toId: CHAMPION_VENOM, effectId: 'health' },
            { toId: CHAMPION_SPIDERMANBLACK, effectId: 'health' },
        ]),
    ]),

    ...fromId(CHAMPION_BLACKPANTHER, [
        ...fromStars(2, [
            { toId: CHAMPION_IRONFIST, effectId: 'critdamage' },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION_IRONFIST, effectId: 'critdamage' },
            { toId: CHAMPION_STORM, effectId: 'powergain' },
            { toId: CHAMPION_DEADPOOL, effectId: 'critrate' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_IRONFIST, effectId: 'critdamage' },
            { toId: CHAMPION_STORM, effectId: 'powergain' },
            { toId: CHAMPION_DEADPOOL, effectId: 'critrate' },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION_IRONFIST, effectId: 'critdamage' },
            { toId: CHAMPION_STORM, effectId: 'powergain' },
            { toId: CHAMPION_DEADPOOL, effectId: 'critrate' },
        ]),
    ]),

    ...fromId(CHAMPION_BLACKPANTHERCIVILWAR, [
        ...fromStars(3, [
            ...toIds([ CHAMPION_THEVISION, CHAMPION_BLACKWIDOW ], { effectId: 'armor' }),
            { toId: CHAMPION_WINTERSOLDIER, effectId: 'attack' },
            { toId: CHAMPION_ANTMAN, effectId: 'critdamage' },
            ...toIds([ CHAMPION_HAWKEYE, CHAMPION_BLACKPANTHER ], { effectId: 'bleed' }),
        ]),
        ...fromStars(4, [
            ...toIds([ CHAMPION_THEVISION, CHAMPION_BLACKWIDOW ], { effectId: 'armor' }),
            { toId: CHAMPION_WINTERSOLDIER, effectId: 'attack' },
            { toId: CHAMPION_ANTMAN, effectId: 'critdamage' },
            ...toIds([ CHAMPION_HAWKEYE, CHAMPION_BLACKPANTHER ], { effectId: 'bleed' }),
        ]),
        ...fromStars(5, [
            ...toIds([ CHAMPION_THEVISION, CHAMPION_BLACKWIDOW ], { effectId: 'armor' }),
            { toId: CHAMPION_WINTERSOLDIER, effectId: 'attack' },
            { toId: CHAMPION_ANTMAN, effectId: 'critdamage' },
            ...toIds([ CHAMPION_HAWKEYE, CHAMPION_BLACKPANTHER ], { effectId: 'bleed' }),
        ]),
    ]),

    ...fromId(CHAMPION_CROSSBONES, [
        ...fromStars(3, [
            ...toIds([ CHAMPION_CAPTAINAMERICA, CHAMPION_CAPTAINAMERICAWWII, CHAMPION_FALCON ], { effectId: 'critrate' }),
            ...toIds([ CHAMPION_WINTERSOLDIER, CHAMPION_BLACKWIDOW ], { effectId: 'critdamage' }),
        ]),
        ...fromStars(4, [
            ...toIds([ CHAMPION_CAPTAINAMERICA, CHAMPION_CAPTAINAMERICAWWII, CHAMPION_FALCON ], { effectId: 'critrate' }),
            ...toIds([ CHAMPION_WINTERSOLDIER, CHAMPION_BLACKWIDOW ], { effectId: 'critdamage' }),
        ]),
        ...fromStars(5, [
            ...toIds([ CHAMPION_CAPTAINAMERICA, CHAMPION_CAPTAINAMERICAWWII, CHAMPION_FALCON ], { effectId: 'critrate' }),
            ...toIds([ CHAMPION_WINTERSOLDIER, CHAMPION_BLACKWIDOW ], { effectId: 'critdamage' }),
        ]),
    ]),

    ...fromId(CHAMPION_DAREDEVIL, [
        ...fromStars(3, [
            { toId: CHAMPION_SUPERIORIRONMAN, effectId: 'critdamage' },
            { toId: CHAMPION_BLACKWIDOW, effectId: 'powergain' },
            { toId: CHAMPION_ELEKTRA, effectId: 'powergain' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_SUPERIORIRONMAN, effectId: 'critdamage' },
            { toId: CHAMPION_BLACKWIDOW, effectId: 'powergain' },
            { toId: CHAMPION_ELEKTRA, effectId: 'powergain' },
        ]),
    ]),

    ...fromId(CHAMPION_DAREDEVILNETFLIX, [
        ...fromStars(2, [
            { toId: CHAMPION_ELEKTRA, effectId: 'powergain' },
            { toId: CHAMPION_PUNISHER, effectId: 'critdamage' },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION_ELEKTRA, effectId: 'powergain' },
            { toId: CHAMPION_LUKECAGE, effectId: 'perfectblock' },
            { toId: CHAMPION_PUNISHER, effectId: 'critdamage' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_ELEKTRA, effectId: 'powergain' },
            { toId: CHAMPION_LUKECAGE, effectId: 'perfectblock' },
            { toId: CHAMPION_PUNISHER, effectId: 'critdamage' },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION_ELEKTRA, effectId: 'powergain' },
            { toId: CHAMPION_LUKECAGE, effectId: 'perfectblock' },
            { toId: CHAMPION_PUNISHER, effectId: 'critdamage' },
        ]),
    ]),

    ...fromId(CHAMPION_ELEKTRA, [
        ...fromStars(3, [
            { toId: CHAMPION_WOLVERINE, effectId: 'armor' },
            { toId: CHAMPION_DAREDEVIL, effectId: 'powergain' },
            { toId: CHAMPION_BLACKWIDOW, effectId: 'critdamage' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_WOLVERINE, effectId: 'armor' },
            { toId: CHAMPION_DAREDEVIL, effectId: 'powergain' },
            { toId: CHAMPION_DEADPOOL, effectId: 'perfectblock' },
            { toId: CHAMPION_BLACKWIDOW, effectId: 'critdamage' },
        ]),
    ]),

    ...fromId(CHAMPION_FALCON, [
        ...fromStars(3, [
            ...toIds([ CHAMPION_CAPTAINAMERICA, CHAMPION_CAPTAINAMERICAWWII ], { effectId: 'armor' }),
            ...toIds([ CHAMPION_WARMACHINE, CHAMPION_BLACKWIDOW ], { effectId: 'critrate' }),
            ...toIds([ CHAMPION_THEVISION, CHAMPION_BLACKPANTHERCIVILWAR ], { effectId: 'critrate' }),
            ...toIds([ CHAMPION_ANTMAN, CHAMPION_HAWKEYE ], { effectId: 'perfectblock' }),
        ]),
        ...fromStars(4, [
            ...toIds([ CHAMPION_CAPTAINAMERICA, CHAMPION_CAPTAINAMERICAWWII ], { effectId: 'armor' }),
            ...toIds([ CHAMPION_WARMACHINE, CHAMPION_BLACKWIDOW ], { effectId: 'critrate' }),
            ...toIds([ CHAMPION_THEVISION, CHAMPION_BLACKPANTHERCIVILWAR ], { effectId: 'critrate' }),
            ...toIds([ CHAMPION_ANTMAN, CHAMPION_HAWKEYE ], { effectId: 'perfectblock' }),
        ]),
        ...fromStars(5, [
            ...toIds([ CHAMPION_CAPTAINAMERICA, CHAMPION_CAPTAINAMERICAWWII ], { effectId: 'armor' }),
            ...toIds([ CHAMPION_WARMACHINE, CHAMPION_BLACKWIDOW ], { effectId: 'critrate' }),
            ...toIds([ CHAMPION_THEVISION, CHAMPION_BLACKPANTHERCIVILWAR ], { effectId: 'critrate' }),
            ...toIds([ CHAMPION_ANTMAN, CHAMPION_HAWKEYE ], { effectId: 'perfectblock' }),
        ]),
    ]),

    ...fromId(CHAMPION_HAWKEYE, [
        ...fromStars(2, [
            { toId: CHAMPION_SCARLETWITCH, effectId: 'powergain' },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION_SCARLETWITCH, effectId: 'powergain' },
            { toId: CHAMPION_MOONKNIGHT, effectId: 'armor' },
            { toId: CHAMPION_IRONMAN, effectId: 'armor' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_SCARLETWITCH, effectId: 'powergain' },
            { toId: CHAMPION_MOONKNIGHT, effectId: 'armor' },
            { toId: CHAMPION_IRONMAN, effectId: 'armor' },
            { toId: CHAMPION_HULK, effectId: 'armor' },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION_SCARLETWITCH, effectId: 'powergain' },
            { toId: CHAMPION_MOONKNIGHT, effectId: 'armor' },
            { toId: CHAMPION_IRONMAN, effectId: 'armor' },
            { toId: CHAMPION_HULK, effectId: 'armor' },
        ]),
    ]),

    ...fromId(CHAMPION_MOONKNIGHT, [
        ...fromStars(3, [
            { toId: CHAMPION_SPIDERMAN, effectId: 'armor' },
            { toId: CHAMPION_DAREDEVIL, effectId: 'perfectblock' },
            { toId: CHAMPION_DEADPOOLXFORCE, effectId: 'critdamage' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_SPIDERMAN, effectId: 'armor' },
            { toId: CHAMPION_DAREDEVIL, effectId: 'perfectblock' },
            { toId: CHAMPION_DEADPOOLXFORCE, effectId: 'critdamage' },
            { toId: CHAMPION_IRONPATRIOT, effectId: 'critrate' },
        ]),
    ]),

    ...fromId(CHAMPION_PUNISHER, [
        ...fromStars(2, [
            { toId: CHAMPION_SPIDERMAN, effectId: 'critdamage' },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION_SPIDERMAN, effectId: 'critdamage' },
            { toId: CHAMPION_RHINO, effectId: 'perfectblock' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_SPIDERMAN, effectId: 'critdamage' },
            { toId: CHAMPION_RHINO, effectId: 'perfectblock' },
        ]),
    ]),

    ...fromId(CHAMPION_WINTERSOLDIER, [
        ...fromStars(2, [
            { toId: CHAMPION_WOLVERINE, effectId: 'armor' },
            { toId: CHAMPION_CAPTAINAMERICA, effectId: 'perfectblock' },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION_WOLVERINE, effectId: 'armor' },
            { toId: CHAMPION_CAPTAINAMERICA, effectId: 'perfectblock' },
            { toId: CHAMPION_CAPTAINAMERICAWWII, effectId: 'armor' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_WOLVERINE, effectId: 'armor' },
            { toId: CHAMPION_CAPTAINAMERICA, effectId: 'perfectblock' },
            { toId: CHAMPION_CAPTAINAMERICAWWII, effectId: 'armor' },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION_WOLVERINE, effectId: 'armor' },
            { toId: CHAMPION_CAPTAINAMERICA, effectId: 'perfectblock' },
            { toId: CHAMPION_CAPTAINAMERICAWWII, effectId: 'armor' },
        ]),
    ]),

    ...fromId(CHAMPION_BLACKWIDOW, [
        ...fromStars(2, [
            { toId: CHAMPION_CAPTAINMARVEL, effectId: 'armor' },
            { toId: CHAMPION_WINTERSOLDIER, effectId: 'powergain' },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION_HULK, effectId: 'stunspecial' },
            { toId: CHAMPION_CAPTAINMARVEL, effectId: 'armor' },
            { toId: CHAMPION_WINTERSOLDIER, effectId: 'powergain' },
            { toId: CHAMPION_HAWKEYE, effectId: 'powergain' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_HULK, effectId: 'stunspecial' },
            { toId: CHAMPION_CAPTAINMARVEL, effectId: 'armor' },
            { toId: CHAMPION_WINTERSOLDIER, effectId: 'powergain' },
            { toId: CHAMPION_HAWKEYE, effectId: 'powergain' },
        ]),
    ]),

    ...fromId(CHAMPION_ABOMINATION, [
        ...fromStars(2, [
            { toId: CHAMPION_RHINO, effectId: 'armor' },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION_RHINO, effectId: 'armor' },
            { toId: CHAMPION_HULK, effectId: 'attack' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_RHINO, effectId: 'armor' },
            { toId: CHAMPION_HULK, effectId: 'attack' },
        ]),
    ]),

    ...fromId(CHAMPION_ANTMAN, [
        ...fromStars(2, [
            { toId: CHAMPION_YELLOWJACKET, effectId: 'attack' },
            { toId: CHAMPION_IRONMAN, effectId: 'perfectblock' },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION_YELLOWJACKET, effectId: 'attack' },
            { toId: CHAMPION_SPIDERMAN, effectId: 'perfectblock' },
            { toId: CHAMPION_IRONMAN, effectId: 'perfectblock' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_HULK, effectId: 'armor' },
            { toId: CHAMPION_YELLOWJACKET, effectId: 'attack' },
            { toId: CHAMPION_SPIDERMAN, effectId: 'perfectblock' },
            { toId: CHAMPION_IRONMAN, effectId: 'perfectblock' },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION_HULK, effectId: 'armor' },
            { toId: CHAMPION_YELLOWJACKET, effectId: 'attack' },
            { toId: CHAMPION_SPIDERMAN, effectId: 'perfectblock' },
            { toId: CHAMPION_IRONMAN, effectId: 'perfectblock' },
        ]),
    ]),

    ...fromId(CHAMPION_CAPTAINAMERICA, [
        ...fromStars(2, [
            { toId: CHAMPION_SPIDERMAN, effectId: 'armor' },
            { toId: CHAMPION_SUPERIORIRONMAN, effectId: 'critrate' },
            { toId: CHAMPION_IRONMAN, effectId: 'armor' },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION_WINTERSOLDIER, effectId: 'armor' },
            { toId: CHAMPION_SPIDERMAN, effectId: 'armor' },
            { toId: CHAMPION_SUPERIORIRONMAN, effectId: 'critrate' },
            { toId: CHAMPION_IRONMAN, effectId: 'perfectblock' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_WINTERSOLDIER, effectId: 'armor' },
            { toId: CHAMPION_SPIDERMAN, effectId: 'armor' },
            { toId: CHAMPION_SUPERIORIRONMAN, effectId: 'critrate' },
            { toId: CHAMPION_IRONMAN, effectId: 'perfectblock' },
        ]),
    ]),

    ...fromId(CHAMPION_CAPTAINAMERICAWWII, [
        ...fromStars(2, [
            { toId: CHAMPION_WINTERSOLDIER, effectId: 'armor' },
            { toId: CHAMPION_WOLVERINE, effectId: 'armor' },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION_WINTERSOLDIER, effectId: 'armor' },
            { toId: CHAMPION_WOLVERINE, effectId: 'armor' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_WINTERSOLDIER, effectId: 'armor' },
            { toId: CHAMPION_WOLVERINE, effectId: 'armor' },
        ]),
    ]),

    ...fromId(CHAMPION_ELECTRO, [
        ...fromStars(3, [
            { toId: CHAMPION_SPIDERMAN, effectId: 'attack' },
            { toId: CHAMPION_RHINO, effectId: 'armor' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_SPIDERMAN, effectId: 'attack' },
            { toId: CHAMPION_RHINO, effectId: 'armor' },
        ]),
    ]),

    ...fromId(CHAMPION_HULK, [
        ...fromStars(2, [
            { toId: CHAMPION_THOR, effectId: 'critdamage' },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION_THOR, effectId: 'critdamage' },
            { toId: CHAMPION_ABOMINATION, effectId: 'critrate' },
            { toId: CHAMPION_HAWKEYE, effectId: 'armor' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_THOR, effectId: 'critdamage' },
            { toId: CHAMPION_ABOMINATION, effectId: 'critrate' },
            { toId: CHAMPION_HAWKEYE, effectId: 'armor' },
        ]),
    ]),

    ...fromId(CHAMPION_JOEFIXIT, [
        ...fromStars(3, [
            { toId: CHAMPION_WOLVERINE, effectId: 'armor' },
            { toId: CHAMPION_MOONKNIGHT, effectId: 'critrate' },
            { toId: CHAMPION_HULK, effectId: 'attack' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_WOLVERINE, effectId: 'armor' },
            { toId: CHAMPION_MOONKNIGHT, effectId: 'critrate' },
            { toId: CHAMPION_MSMARVEL, effectId: 'critrate' },
            { toId: CHAMPION_HULK, effectId: 'attack' },
        ]),
    ]),

    ...fromId(CHAMPION_LUKECAGE, [
        ...fromStars(3, [
            { toId: CHAMPION_IRONFIST, effectId: 'heroesforhire' },
            ...toIds([ CHAMPION_JUGGERNAUT, CHAMPION_IRONPATRIOT ], { effectId: 'thunderbolts' }),
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_IRONFIST, effectId: 'heroesforhire' },
            ...toIds([ CHAMPION_JUGGERNAUT, CHAMPION_IRONPATRIOT ], { effectId: 'thunderbolts' }),
        ]),
        ...fromStars(5, [
            { toId: CHAMPION_IRONFIST, effectId: 'heroesforhire' },
            ...toIds([ CHAMPION_JUGGERNAUT, CHAMPION_IRONPATRIOT ], { effectId: 'thunderbolts' }),
        ]),
    ]),

    ...fromId(CHAMPION_RHINO, [
        ...fromStars(2, [
            { toId: CHAMPION_SPIDERMAN, effectId: 'critrate' },
            { toId: CHAMPION_ABOMINATION, effectId: 'armor' },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION_SPIDERMAN, effectId: 'critrate' },
            { toId: CHAMPION_ABOMINATION, effectId: 'armor' },
            { toId: CHAMPION_ELECTRO, effectId: 'perfectblock' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_SPIDERMAN, effectId: 'critrate' },
            { toId: CHAMPION_ABOMINATION, effectId: 'armor' },
            { toId: CHAMPION_ELECTRO, effectId: 'perfectblock' },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION_SPIDERMAN, effectId: 'critrate' },
            { toId: CHAMPION_ABOMINATION, effectId: 'armor' },
            { toId: CHAMPION_ELECTRO, effectId: 'perfectblock' },
        ]),
    ]),

    ...fromId(CHAMPION_REDHULK, [
        ...fromStars(3, [
            { toId: CHAMPION_ABOMINATION, effectId: 'critrate' },
            { toId: CHAMPION_HULK, effectId: 'attack' },
            { toId: CHAMPION_X23, effectId: 'perfectblock' },
            ...toIds([ CHAMPION_ELEKTRA, CHAMPION_AGENTVENOM ], { effectId: 'thunderbolts' }),
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_ABOMINATION, effectId: 'critrate' },
            { toId: CHAMPION_HULK, effectId: 'attack' },
            { toId: CHAMPION_X23, effectId: 'perfectblock' },
            ...toIds([ CHAMPION_ELEKTRA, CHAMPION_AGENTVENOM ], { effectId: 'thunderbolts' }),
        ]),
        ...fromStars(5, [
            { toId: CHAMPION_ABOMINATION, effectId: 'critrate' },
            { toId: CHAMPION_HULK, effectId: 'attack' },
            { toId: CHAMPION_X23, effectId: 'perfectblock' },
            ...toIds([ CHAMPION_ELEKTRA, CHAMPION_AGENTVENOM ], { effectId: 'thunderbolts' }),
        ]),
    ]),

    ...fromId(CHAMPION_SHEHULK, [
        ...fromStars(3, [
            { toId: CHAMPION_HULK, effectId: 'health' },
            { toId: CHAMPION_SUPERIORIRONMAN, effectId: 'powergain' },
            { toId: CHAMPION_KAMALAKHAN, effectId: 'perfectblock' },
            { toId: CHAMPION_DAREDEVIL, effectId: 'stunactivation' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_HULK, effectId: 'health' },
            { toId: CHAMPION_SUPERIORIRONMAN, effectId: 'powergain' },
            { toId: CHAMPION_KAMALAKHAN, effectId: 'perfectblock' },
            { toId: CHAMPION_DAREDEVIL, effectId: 'stunactivation' },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION_HULK, effectId: 'health' },
            { toId: CHAMPION_SUPERIORIRONMAN, effectId: 'powergain' },
            { toId: CHAMPION_KAMALAKHAN, effectId: 'perfectblock' },
            { toId: CHAMPION_DAREDEVIL, effectId: 'stunactivation' },
        ]),
    ]),

    ...fromId(CHAMPION_SPIDERMAN, [
        ...fromStars(1, [
            { toId: CHAMPION_WOLVERINE, effectId: 'health' },
            { toId: CHAMPION_HAWKEYE, effectId: 'attack' },
        ]),
        ...fromStars(2, [
            { toId: CHAMPION_WOLVERINE, effectId: 'health' },
            { toId: CHAMPION_HAWKEYE, effectId: 'attack' },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION_WOLVERINE, effectId: 'health' },
            { toId: CHAMPION_HAWKEYE, effectId: 'attack' },
            { toId: CHAMPION_ELECTRO, effectId: 'critrate' },
            { toId: CHAMPION_CAPTAINAMERICA, effectId: 'armor' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_WOLVERINE, effectId: 'health' },
            { toId: CHAMPION_HAWKEYE, effectId: 'attack' },
            { toId: CHAMPION_ELECTRO, effectId: 'critrate' },
            { toId: CHAMPION_CAPTAINAMERICA, effectId: 'armor' },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION_WOLVERINE, effectId: 'health' },
            { toId: CHAMPION_HAWKEYE, effectId: 'attack' },
            { toId: CHAMPION_ELECTRO, effectId: 'critrate' },
            { toId: CHAMPION_CAPTAINAMERICA, effectId: 'armor' },
        ]),
    ]),

    ...fromId(CHAMPION_SPIDERGWEN, [
        ...fromStars(3, [
            { toId: CHAMPION_RHINO, effectId: 'critrate' },
            { toId: CHAMPION_DAREDEVIL, effectId: 'critrate' },
            { toId: CHAMPION_SPIDERMAN, effectId: 'powergain' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_RHINO, effectId: 'critrate' },
            { toId: CHAMPION_DAREDEVIL, effectId: 'critrate' },
            { toId: CHAMPION_SPIDERMAN, effectId: 'powergain' },
            { toId: CHAMPION_PUNISHER, effectId: 'critdamage' },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION_RHINO, effectId: 'critrate' },
            { toId: CHAMPION_DAREDEVIL, effectId: 'critrate' },
            { toId: CHAMPION_SPIDERMAN, effectId: 'powergain' },
            { toId: CHAMPION_PUNISHER, effectId: 'critdamage' },
        ]),
    ]),

    ...fromId(CHAMPION_SPIDERMANMORALES, [
        ...fromStars(3, [
            { toId: CHAMPION_VENOM, effectId: 'attack' },
            { toId: CHAMPION_SPIDERGWEN, effectId: 'perfectblock' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_ELECTRO, effectId: 'critrate' },
            { toId: CHAMPION_IRONPATRIOT, effectId: 'critrate' },
            { toId: CHAMPION_VENOM, effectId: 'attack' },
            { toId: CHAMPION_SPIDERGWEN, effectId: 'perfectblock' },
        ]),
    ]),

    ...fromId(CHAMPION_YELLOWJACKET, [
        ...fromStars(2, [
            { toId: CHAMPION_ANTMAN, effectId: 'attack' },
            { toId: CHAMPION_ULTRON, effectId: 'critdamage' },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION_ANTMAN, effectId: 'attack' },
            { toId: CHAMPION_ULTRON, effectId: 'critdamage' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_ANTMAN, effectId: 'attack' },
            { toId: CHAMPION_ULTRON, effectId: 'critdamage' },
        ]),
    ]),

    ...fromId(CHAMPION_DRSTRANGE, [
        ...fromStars(3, [
            { toId: CHAMPION_THOR, effectId: 'armor' },
            { toId: CHAMPION_SPIDERMAN, effectId: 'armor' },
            { toId: CHAMPION_SCARLETWITCH, effectId: 'block' },
            { toId: CHAMPION_BLACKBOLT, effectId: 'perfectblock' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_THOR, effectId: 'armor' },
            { toId: CHAMPION_SPIDERMAN, effectId: 'armor' },
            { toId: CHAMPION_SCARLETWITCH, effectId: 'block' },
            { toId: CHAMPION_BLACKBOLT, effectId: 'perfectblock' },
        ]),
    ]),

    ...fromId(CHAMPION_IRONFIST, [
        ...fromStars(2, [
            { toId: CHAMPION_BLACKPANTHER, effectId: 'armor' },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION_BLACKPANTHER, effectId: 'armor' },
            { toId: CHAMPION_DRSTRANGE, effectId: 'armor' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_BLACKPANTHER, effectId: 'armor' },
            { toId: CHAMPION_DRSTRANGE, effectId: 'armor' },
            { toId: CHAMPION_WOLVERINE, effectId: 'armor' },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION_BLACKPANTHER, effectId: 'armor' },
            { toId: CHAMPION_DRSTRANGE, effectId: 'armor' },
            { toId: CHAMPION_WOLVERINE, effectId: 'armor' },
        ]),
    ]),

    ...fromId(CHAMPION_IRONFISTWHITE, [
        ...fromStars(3, [
            { toId: CHAMPION_DRSTRANGE, effectId: 'armor' },
            { toId: CHAMPION_DAREDEVIL, effectId: 'armor' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_DRSTRANGE, effectId: 'armor' },
            { toId: CHAMPION_DAREDEVIL, effectId: 'armor' },
            { toId: CHAMPION_WARMACHINE, effectId: 'perfectblock' },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION_DRSTRANGE, effectId: 'armor' },
            { toId: CHAMPION_DAREDEVIL, effectId: 'armor' },
            { toId: CHAMPION_WARMACHINE, effectId: 'perfectblock' },
        ]),
    ]),

    ...fromId(CHAMPION_GUILLOTINE, [
        ...fromStars(2, [
            { toId: CHAMPION_VENOM, effectId: 'attack' },
            { toId: CHAMPION_CAPTAINAMERICAWWII, effectId: 'perfectblock' },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION_VENOM, effectId: 'attack' },
            { toId: CHAMPION_CAPTAINAMERICAWWII, effectId: 'perfectblock' },
            { toId: CHAMPION_MAGIK, effectId: 'critdamage' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_BLACKPANTHER, effectId: 'armor' },
            { toId: CHAMPION_VENOM, effectId: 'attack' },
            { toId: CHAMPION_CAPTAINAMERICAWWII, effectId: 'perfectblock' },
            { toId: CHAMPION_MAGIK, effectId: 'critdamage' },
        ]),
    ]),

    ...fromId(CHAMPION_JUGGERNAUT, [
        ...fromStars(2, [
            { toId: CHAMPION_COLOSSUS, effectId: 'critrate' },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION_DRSTRANGE, effectId: 'attack' },
            { toId: CHAMPION_COLOSSUS, effectId: 'critrate' },
            { toId: CHAMPION_HULK, effectId: 'critrate' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_DRSTRANGE, effectId: 'attack' },
            { toId: CHAMPION_COLOSSUS, effectId: 'critrate' },
            { toId: CHAMPION_HULK, effectId: 'critrate' },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION_DRSTRANGE, effectId: 'attack' },
            { toId: CHAMPION_COLOSSUS, effectId: 'critrate' },
            { toId: CHAMPION_HULK, effectId: 'critrate' },
        ]),
    ]),

    ...fromId(CHAMPION_MAGIK, [
        ...fromStars(2, [
            { toId: CHAMPION_COLOSSUS, effectId: 'health' },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION_STORM, effectId: 'armor' },
            { toId: CHAMPION_COLOSSUS, effectId: 'health' },
            { toId: CHAMPION_CYCLOPS, effectId: 'perfectblock' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_STORM, effectId: 'armor' },
            { toId: CHAMPION_COLOSSUS, effectId: 'health' },
            { toId: CHAMPION_CYCLOPS, effectId: 'perfectblock' },
            { toId: CHAMPION_JUGGERNAUT, effectId: 'critrate' },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION_STORM, effectId: 'armor' },
            { toId: CHAMPION_COLOSSUS, effectId: 'health' },
            { toId: CHAMPION_CYCLOPS, effectId: 'perfectblock' },
            { toId: CHAMPION_JUGGERNAUT, effectId: 'critrate' },
        ]),
    ]),

    ...fromId(CHAMPION_SCARLETWITCH, [
        ...fromStars(2, [
            { toId: CHAMPION_CAPTAINMARVEL, effectId: 'armor' },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION_CAPTAINMARVEL, effectId: 'armor' },
            { toId: CHAMPION_VISION, effectId: 'powergain' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_CAPTAINMARVEL, effectId: 'armor' },
            { toId: CHAMPION_VISION, effectId: 'powergain' },
        ]),
    ]),

    ...fromId(CHAMPION_THORJANEFOSTER, [
        ...fromStars(3, [
            { toId: CHAMPION_THOR, effectId: 'powergain' },
            { toId: CHAMPION_VISION, effectId: 'perfectblock' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_BLACKWIDOW, effectId: 'armor' },
            { toId: CHAMPION_THOR, effectId: 'powergain' },
            { toId: CHAMPION_VISION, effectId: 'perfectblock' },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION_BLACKWIDOW, effectId: 'armor' },
            { toId: CHAMPION_THOR, effectId: 'powergain' },
            { toId: CHAMPION_VISION, effectId: 'perfectblock' },
        ]),
    ]),

    ...fromId(CHAMPION_UNSTOPPABLECOLOSSUS, [
        ...fromStars(2, [
            { toId: CHAMPION_MAGIK, effectId: 'health' },
            { toId: CHAMPION_JUGGERNAUT, effectId: 'critdamage' },
        ]),
        ...fromStars(3, [
            { toId: CHAMPION_WOLVERINE, effectId: 'armor' },
            { toId: CHAMPION_MAGIK, effectId: 'health' },
            { toId: CHAMPION_CYCLOPS, effectId: 'perfectblock' },
            { toId: CHAMPION_JUGGERNAUT, effectId: 'critdamage' },
        ]),
        ...fromStars(4, [
            { toId: CHAMPION_WOLVERINE, effectId: 'armor' },
            { toId: CHAMPION_MAGIK, effectId: 'health' },
            { toId: CHAMPION_CYCLOPS, effectId: 'perfectblock' },
            { toId: CHAMPION_JUGGERNAUT, effectId: 'critdamage' },
        ]),
        ...fromStars(5, [
            { toId: CHAMPION_WOLVERINE, effectId: 'armor' },
            { toId: CHAMPION_MAGIK, effectId: 'health' },
            { toId: CHAMPION_CYCLOPS, effectId: 'perfectblock' },
            { toId: CHAMPION_JUGGERNAUT, effectId: 'critdamage' },
        ]),
    ]),

].map((synergy) => new Synergy({
    ...synergy,
    effectAmount: effectAmount(synergy.effectId, synergy.fromStars),
}));

function fromId(fromId, synergies) {
    return synergies.map((synergy) => ({
        fromId,
        ...synergy,
    }));
}

function fromStars(fromStars, synergies) {
    return synergies.map((synergy) => ({
        fromStars,
        ...synergy,
    }));
}

function toIds(toIds, synergy) {
    toIds.counter = (toIds.counter + 1) || 1;
    return toIds.map((toId) => ({
        toId,
        ...synergy,
        group: toIds.counter,
    }));
}

function effectAmount(effectId, fromStars) {
    const amounts = EFFECT_STARS_AMOUNT[ effectId ];
    if(!amounts) {
        return 0;
    }
    return amounts[ EFFECT_STARS_INDEX[ fromStars ] || 0 ] || 0;
}

function synergiesFromChampions(champions) {
    const ids = champions.reduce((map, champion) => {
        map[ champion.attr.uid ] = true;
        return map;
    }, {});
    return champions
        .map((champion) => synergies.filter((synergy) => {
            const { fromId, fromStars, toId } = synergy.attr;
            if(fromId !== champion.attr.uid || fromStars !== champion.attr.stars)
                return false;
            return ids[ toId ];
        }))
        .reduce((array, current) => array.concat(current), []);
}

export { synergiesFromChampions };
export default synergies;
