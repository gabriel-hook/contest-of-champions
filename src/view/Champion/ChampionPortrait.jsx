import './ChampionPortrait.scss';
import classNames from 'classnames';
import ImageIcon from '../ImageIcon.jsx';
import { getImage } from '../../util/images';
import lang from '../../service/lang';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

function addSVG(element, isInitialized) {
    if(!isInitialized) {
        element.innerHTML = `
            <svg viewBox="0 0 220 220">
                <use xlink:href="#portrait-placeholder" />
            </svg>
        `;
    }
}

const ChampionPortrait = {
    view(ctrl, args) {
        const { events, onclick, selected, neighbor } = args;
        const { uid, stars, typeId, awakened } = args.champion.toJSON();
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
        const portraitImage = getImage(`images/champions/portrait_${ uid }.png`);
        const hasPortraitImage = Boolean(portraitImage);
        const name = lang.get(`champion-${ uid }-shortname`, null) || lang.get(`champion-${ uid }-name`);
        return (
            <div class={ classNames('champion', `champion--${ typeId }`, { 'champion--selected': selected, 'champion--neighbor': neighbor }) }>
                <div class={ classNames('container', 'no-select') }>
                    <div
                        { ...events }
                        class={ classNames('inner', { 'clickable': onclick }) }
                        onclick={ onclick }
                        title={ lang.get(`champion-${ uid }-name`) }
                    >
                        <div class="portrait">
                            <div
                                class={ classNames('portrait-image', { 'portrait-image--hidden': hasPortraitImage }) }
                                config={ addSVG }
                            />
                            <div class={ classNames('portrait-image', { 'portrait-image--hidden': !hasPortraitImage }) }>
                                <img src={ portraitImage && portraitImage.src || null } />
                            </div>
                        </div>
                        <div class="title">
                            <span class="name">{ name }</span>
                        </div>
                        <div class={ classNames('stars', { 'stars--awakened': awakened }) }>
                            { starImages }
                        </div>
                    </div>
                </div>
            </div>
        );
    },
};

export default ChampionPortrait;
