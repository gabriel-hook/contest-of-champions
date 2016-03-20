import './Icon.scss';
import { getTypeColor } from '../service/graph';
import classNames from 'classnames';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const Icon = {
    view(ctrl, { icon, spin, type, before, after }) {
        const isSpinning = spin && (typeof spin === 'function')? spin(): spin;
        let style = '';
        if(type) {
            style = `border-bottom: solid 3px ${ getTypeColor(type) }`;
        }
        return icon && (
            <i
                m="Icon"
                style={ style }
                class={ classNames('icon', 'fa', `fa-${ icon }`, {
                    'fa-spin': isSpinning,
                    'icon--before': before,
                    'icon--after': after,
                }) }
            />
        );
    },
};

export default Icon;
