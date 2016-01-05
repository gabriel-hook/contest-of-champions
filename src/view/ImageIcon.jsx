import Icon from './Icon.jsx';
import { getImage } from '../util/images';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const ImageIcon = {
    view(ctrl, { src, icon }) {
        const image = getImage(src);
        if(!image && icon) {
            return (
                <Icon icon={ icon } />
            );
        }
        return src && (
            <i class="icon">
                <img src={ image && image.src } />
            </i>
        );
    },
};

export default ImageIcon;
