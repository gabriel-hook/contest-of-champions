import './Champion.scss';
import classNames from 'classnames';
import { getImage } from '../util/images.js';
import lang from '../service/lang.js';
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

const Champion = {
    view(ctrl, args) {
        const { events, onclick, selected } = args;
        const { uid, stars, typeId } = args.champion.toJSON();
        const starImages = [];
        for(let i=0; i<stars; i++)
            starImages.push(
                <img class="star" src="../images/icons/star.png" />
            );
        const portraitImage = getImage(`images/champions/portrait_${ uid }.png`);
        const hasPortraitImage = Boolean(portraitImage);
        const name = lang.get(`champion-${ uid }-shortname`, null) || lang.get(`champion-${ uid }-name`);
        return (
            <div class={ classNames('champion', `champion--${ typeId }`, { 'champion--selected': selected }) }>
                <div class="container">
                    <div
                        { ...events }
                        class={ classNames('inner', { 'clickable': onclick }) }
                        onclick={ onclick }
                    >
                        <div
                            class={ classNames('portrait', { 'portrait--hidden': hasPortraitImage }) }
                            config={ addSVG }
                        />
                        <div class={ classNames('portrait', { 'portrait--hidden': !hasPortraitImage }) }>
                            <img src={ portraitImage && portraitImage.src } />
                        </div>
                        <div class="title">
                            <span class="name">{ name }</span>
                        </div>
                        <div class="stars">
                            { starImages }
                        </div>
                    </div>
                </div>
            </div>
        );
    },
};

export default Champion;
