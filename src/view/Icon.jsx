import './Icon.scss';
import classNames from 'classnames';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const Icon = {
    view(ctrl, { icon, spin, before, after }) {
        const isSpinning = spin && (typeof spin === 'function')? spin(): spin;
        return icon && (
            <i
                m="Icon"
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
