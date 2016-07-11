import './Icon.scss';
import { getTypeColor } from '../service/graph';
import classNames from 'classnames';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const customIcons = [
    'app-icon',
    'effect-armor', 'effect-armor-break', 'effect-attack', 'effect-bleed',
    'effect-block', 'effect-critical-damage', 'effect-critical-rate',
    'effect-degeneration', 'effect-exhaust', 'effect-fatigue', 'effect-heal',
    'effect-heal-block', 'effect-health', 'effect-health-steal', 'effect-heroes-for-hire',
    'effect-idol', 'effect-immunity-bleed', 'effect-immunity-poison', 'effect-incinerate',
    'effect-inseparable', 'effect-mastermind', 'effect-mutant-agenda', 'effect-nullify',
    'effect-perfect-block', 'effect-poison', 'effect-power', 'effect-power-lock',
    'effect-regeneration', 'effect-resist-energy', 'effect-resist-physical',
    'effect-shock', 'effect-stun', 'effect-thunderbolts', 'effect-truestrike',
    'effect-unstoppable', 'effect-weakness',
    'role-alliance-quest', 'role-alliance-war', 'role-arena', 'role-quest',
    'type-cosmic', 'type-mutant', 'type-mystic', 'type-science', 'type-skill', 'type-tech',
].reduce((map, key) => {
    map[ key ] = true;
    return map;
}, {});

const Icon = {
    view(ctrl, { icon, spin, type, before, after }) {
        const isSpinning = spin && (typeof spin === 'function')? spin(): spin;
        let style = '';
        if(type) {
            style = `border-bottom: solid 3px ${ getTypeColor(type) }`;
        }
        const isCustomIcon = customIcons[ icon ] !== undefined;

        return icon && (
            <i
                m="Icon"
                style={ style }
                class={ classNames('icon', {
                    [ 'fa' ]: !isCustomIcon,
                    [ `fa-${ icon }` ]: !isCustomIcon,
                    [ 'fa-spin' ]: !isCustomIcon && isSpinning,
                    [ 'custom-icon' ]: isCustomIcon,
                    [ `custom-icon-${ icon }` ]: isCustomIcon,
                    'icon--before': before,
                    'icon--after': after,
                }) }
            />
        );
    },
};

export default Icon;
