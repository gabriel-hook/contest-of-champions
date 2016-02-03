import classNames from 'classnames';
import Icon from './Icon.jsx';
import { getImage } from '../util/images';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const ImageIcon = {
    view(ctrl, { src, icon, alt, hoverSrc, hoverAlt }) {
        const image = getImage(src);
        if(!image && icon) {
            return (
                <Icon icon={ icon } />
            );
        }
        const alternate = getImage(alt);
        const hoverImage = getImage(hoverSrc);
        const hoverAlternate = getImage(hoverAlt);
        const elements = [];
        if(hoverAlt && hoverAlternate) {
            elements.push(
                <img class={ classNames('hover', 'alt') } src={ hoverAlternate.src } />
            );
        }
        if(hoverSrc && hoverImage) {
            elements.push(
                <img class={ classNames('hover') } src={ hoverImage.src } />
            );
        }
        if(alt && alternate) {
            elements.push(
                <img class={ classNames('alt', { 'no-hover': hoverAlt }) } src={ alternate.src } />
            );
        }
        elements.push(
            <img class={ classNames('image', { 'no-hover': hoverSrc }) } src={ image && image.src } />
        );
        return src && (
            <i class="icon">
                { elements }
            </i>
        );
    },
};

export default ImageIcon;
