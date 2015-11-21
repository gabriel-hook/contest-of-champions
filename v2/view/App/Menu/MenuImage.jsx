import { getImage } from '../../../util/images.js';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const MenuImage = {
    view(ctrl, args) {
        const { src } = args;
        const image = getImage(src);
        return src && (
            <i class="icon">
                <img src={ image && image.src } />
            </i>
        );
    },
};

export default MenuImage;
