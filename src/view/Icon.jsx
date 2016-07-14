import { getTypeColor } from '../service/graph';
import classNames from 'classnames';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */
import '../icons.font';

import './Icon.scss';

/* eslint-disable no-undef */
const customIcons = process.env.CHAMPION_ICONS.reduce((map, key) => {
    map[ key ] = true;
    return map;
}, {});
/* eslint-enable no-undef */

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
                    [ 'champion-icon' ]: isCustomIcon,
                    [ `champion-icon-${ icon }` ]: isCustomIcon,
                    'icon--before': before,
                    'icon--after': after,
                }) }
            />
        );
    },
};

export default Icon;
