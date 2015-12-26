import classNames from 'classnames';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const Icon = {
    view(ctrl, args) {
        const { icon, spin } = args;
        const isSpinning = spin && (typeof spin === 'function')? spin(): spin;
        return icon && (
            <i
                m="Icon"
                class={ classNames('icon', 'fa', `fa-${ icon }`, { 'fa-spin': isSpinning }) }
            />
        );
    },
};

export default Icon;
