import { ABILITY } from './model/Ability';

const abilityIcons = {
    [ ABILITY.TRUE_STRIKE ]: 'effect-truestrike',
    [ ABILITY.FURY ]: 'effect-attack',
    [ ABILITY.WEAKNESS ]: 'effect-weakness',
    [ ABILITY.PRECISION ]: 'effect-critical-rate',
    [ ABILITY.FATIGUE ]: 'effect-fatigue',
    [ ABILITY.CRUELTY ]: 'effect-critical-damage',
    [ ABILITY.EXHAUST ]: 'effect-exhaust',
    [ ABILITY.ARMOR_BREAK ]: 'effect-armor-break',
    [ ABILITY.ARMOR_UP ]: 'effect-armor',
    [ ABILITY.PHYSICAL_RESIST ]: 'effect-resist-physical',
    [ ABILITY.UNSTOPPABLE ]: 'effect-unstoppable',
    [ ABILITY.POISON ]: 'effect-poison',
    [ ABILITY.POISON_IMMUNITY ]: 'effect-immunity-poison',
    [ ABILITY.CAUTERIZE ]: 'effect-incinerate',
    [ ABILITY.BLEED ]: 'effect-bleed',
    [ ABILITY.BLEED_IMMUNITY ]: 'effect-immunity-bleed',
    [ ABILITY.SHOCK ]: 'effect-shock',
    [ ABILITY.INCINERATE ]: 'effect-incinerate',
    [ ABILITY.POWER_DRAIN ]: 'effect-power-lock',
    [ ABILITY.POWER_BURN ]: 'effect-power-lock',
    [ ABILITY.POWER_LOCK ]: 'effect-power-lock',
    [ ABILITY.REGENERATION ]: 'effect-regeneration',
    [ ABILITY.DEGENERATION ]: 'effect-degeneration',
    [ ABILITY.HEALTH_STEAL ]: 'effect-health-steal',
    [ ABILITY.HEAL_BLOCK ]: 'effect-heal-block',
    [ ABILITY.ENERGY_RESIST ]: 'effect-resist-energy',
    [ ABILITY.ENERGY_ABSORB ]: 'effect-resist-energy',
    [ ABILITY.STUN ]: 'effect-stun',
    [ ABILITY.STAGGER ]: 'effect-nullify',
    [ ABILITY.NULLIFY ]: 'effect-nullify',
    [ ABILITY.EVADE ]: 'effect-evade',
};

function abilityIcon(uid) {
    return abilityIcons[ uid ];
}

export { abilityIcon };
