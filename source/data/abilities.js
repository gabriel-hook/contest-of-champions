import Ability from '../model/Ability';

const abilities = [

    { uid:'stun' },
    { uid:'fatigue' },
    { uid:'powerdrain' },
    { uid:'powerburn' },
    { uid:'bleed' },
    { uid:'cauterize' },
    { uid:'armorbreak' },
    { uid:'fury' },
    { uid:'regeneration' },
    { uid:'unstoppable' },
    { uid:'poison' },
    { uid:'armorup' },
    { uid:'plusdamage' },
    { uid:'pluscritrate' },
    { uid:'pluscritdamage' },
    { uid:'poisonimmunity' },
    { uid:'bleedimmunity' },

].map((ability) => new Ability(ability));

export default abilities;
