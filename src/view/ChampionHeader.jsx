import './ChampionHeader.scss';
import classNames from 'classnames';
import ImageIcon from './ImageIcon.jsx';
import { getImage } from '../util/images';
import lang from '../service/lang';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const ChampionHeader = {
    view(ctrl, args) {
        const { champion } = args;
        const { uid, stars, typeId, awakened } = champion.attr;
        const name = lang.get(`champion-${ uid }-name`);
        const starIcon = awakened? (
            <ImageIcon
                src="images/icons/star-awakened.png"
                icon="star"
            />
        ): (
            <ImageIcon
                src="images/icons/star.png"
                icon="star"
            />
        );
        const starImages = [];
        for(let i=0; i<stars; i++)
            starImages.push(starIcon);
        const image = getImage(`images/champions/fullsize_${ uid }.png`);
        let imageStyle;
        if(image) {
            imageStyle = `background-image: url("${ image.src }");`;
        }
        const portrait = getImage(`images/champions/portrait_${ uid }.png`);
        let portraitStyle;
        if(portrait) {
            portraitStyle = `background-image: url("${ portrait.src }");`;
        }
        return (
            <div class="champion-header">
                <div
                    class={ classNames('champion-header-image',
                        'champion-header-image-portrait', {
                            'champion-header-image--loaded': portrait,
                        }
                    ) }
                    style={ portraitStyle }
                />
                <div
                    class={ classNames('champion-header-image', {
                        'champion-header-image--loaded': image,
                    }) }
                    style={ imageStyle }
                />
                <div class="champion-header-name">{ name }</div>
                <div
                    class={ classNames('champion-header-stars',
                           { 'champion-header-stars--awakened': awakened }
                        ) }
                >
                    { starImages }
                </div>
                <div class={ classNames('champion-header-type', `champion--${ typeId }`)} />
            </div>
        );
    },
};

export default ChampionHeader;
