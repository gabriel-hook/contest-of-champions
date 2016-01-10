import './ChampionPortrait.scss';
import { STAR_RANK_LEVEL } from '../../data/model/Champion';
import classNames from 'classnames';
import ImageIcon from '../ImageIcon.jsx';
import { getImage, DATA_IMAGE_EMPTY } from '../../util/images';
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
    view(ctrl, { champion, events, onclick, selected, neighbor }) {
        const { uid, stars, rank, level, pi, typeId, awakened } = champion.toJSON();
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
        const title = [];
        if(pi || champion.pi) {
            title.push(
                <div
                    class={ classNames('title-field', 'title-field-pi', {
                        'title-field-pi-custom': pi && pi > 0,
                    }) }
                >{ pi || champion.pi }</div>
            );
        }
        title.push(
            <div class="title-field title-field-name">{ name }</div>
        );
        const isMaxed = STAR_RANK_LEVEL[ stars ] &&
            STAR_RANK_LEVEL[ stars ][ rank ] &&
            STAR_RANK_LEVEL[ stars ].ranks === rank &&
            STAR_RANK_LEVEL[ stars ][ rank ].levels === level;
        const isRankUp = !isMaxed && STAR_RANK_LEVEL[ stars ] &&
            STAR_RANK_LEVEL[ stars ][ rank ] &&
            STAR_RANK_LEVEL[ stars ].ranks > rank &&
            STAR_RANK_LEVEL[ stars ][ rank ].levels === level;
        const upgrade = isMaxed? (
            <ImageIcon
                src="images/icons/max.png"
                icon="check-circle"
            />
        ): isRankUp? (
            <ImageIcon
                src="images/icons/rank-up.png"
                icon="chevron-circle-up"
            />
        ): null;
        return (
            <div
                m="ChampionPortrait"
                class={ classNames('champion', `champion--${ typeId }`,
                    { 'champion--selected': selected, 'champion--neighbor': neighbor }
                ) }
            >
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
                                <img src={ portraitImage && portraitImage.src || DATA_IMAGE_EMPTY } />
                            </div>
                        </div>
                        <div class="title">{ title }</div>
                        <div class={ classNames('stars', { 'stars--awakened': awakened }) }>
                            { starImages }
                        </div>
                        <div class={ classNames('upgrade', { 'upgrade-max': isMaxed, 'upgrade-rank-up': isRankUp }) }>
                            { upgrade }
                        </div>
                    </div>
                </div>
            </div>
        );
    },
};

export default ChampionPortrait;
