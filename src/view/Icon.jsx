import { getTypeColor } from '../service/graph';
import classNames from 'classnames';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */
import '../icons.font';

import './Icon.scss';

const championIcons = require
    .context('../icons', true, /\.svg$/)
    .keys()
    .map((filename) => filename.replace(/.*\//g, '').replace(/\.svg$/, ''))
    .reduce((map, key) => {
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
        const isChampionIcon = championIcons[ icon ] !== undefined;

        return icon && (
            <i
                m="Icon"
                style={ style }
                class={ classNames('icon', {
                    [ 'fa' ]: !isChampionIcon,
                    [ `fa-${ icon }` ]: !isChampionIcon,
                    [ 'fa-spin' ]: !isChampionIcon && isSpinning,
                    [ 'champion-icon' ]: isChampionIcon,
                    [ `champion-icon-${ icon }` ]: isChampionIcon,
                    'icon--before': before,
                    'icon--after': after,
                }) }
            />
        );
    },
};

export default Icon;
