import './ChampionHeader.scss';
import classNames from 'classnames';
import Icon from '../Icon.jsx';
import ImageIcon from '../ImageIcon.jsx';
import { getImage, IMAGE_STAR, IMAGE_STAR_AWAKENED } from '../../images';
import lang from '../../service/lang';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const ChampionHeader = {
    view(ctrl, { champion }) {
        const { uid, stars, typeId, awakened } = champion.attr;
        const name = lang.string(`champion-${ uid }-name`);
        const starIcon = awakened? (
            <ImageIcon
                src={ IMAGE_STAR_AWAKENED }
                icon="star"
            />
        ): (
            <ImageIcon
                src={ IMAGE_STAR }
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
            <div
                m="ChampionHeader"
                role="banner"
                aria-label={ lang.string(`champion-${ uid }-name`) }
                class="champion-header"
                title={ lang.string(`champion-${ uid }-name`) }
            >
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
                <div class="champion-header-name">
                    <span class={ classNames('champion-header-name-type', `champion--${ typeId }`) }>
                        <Icon class="type" icon={ `type-${ typeId }` } before />
                    </span>
                    { name }
                </div>
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
