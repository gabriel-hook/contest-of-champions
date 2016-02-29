import './ImageIcon.scss';
import classNames from 'classnames';
import Icon from './Icon.jsx';
import { getImage } from '../util/images';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const ImageIcon = {
    view(ctrl, { src, icon, alt, hoverSrc, hoverAlt, solitary }) {
        const elements = [];
        const image = getImage(src);
        if(image) {
            if(hoverSrc) {
                const hoverImage = getImage(hoverSrc);
                if(hoverImage) {
                    if(hoverAlt) {
                        const hoverAlternate = getImage(hoverAlt);
                        if(hoverAlternate) {
                            elements.push(
                                <img class={ classNames('hover', 'alt') } src={ hoverAlternate.src } />
                            );
                        }
                    }
                    elements.push(
                        <img class={ classNames('hover') } src={ hoverImage.src } />
                    );
                }
            }
            if(alt) {
                const alternate = getImage(alt);
                if(alternate) {
                    elements.push(
                        <img class={ classNames('alt', { 'no-hover': hoverAlt }) } src={ alternate.src } />
                    );
                }
            }
            elements.push(
                <img class={ classNames('image', { 'no-hover': hoverSrc }) } src={ image && image.src } />
            );
        }
        else if(icon) {
            return (
                <Icon icon={ icon } />
            );
        }
        return src && (
            <div class={ classNames('image-icon', { 'image-icon--solitary': solitary }) }>
                { elements }
            </div>
        );
    },
};

export default ImageIcon;
