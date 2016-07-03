import './ChampionPortrait.scss';
import {
    STAR_RANK_LEVEL,
    ROLE_ARENA,
    ROLE_QUEST,
    ROLE_ALLIANCE_QUEST,
    ROLE_ALLIANCE_WAR_ATTACK,
    ROLE_ALLIANCE_WAR_DEFENSE,
} from '../../data/model/Champion';
import { effectImage } from '../../data/effects';
import classNames from 'classnames';
import ImageIcon from '../ImageIcon.jsx';
import { getImage, DATA_IMAGE_EMPTY } from '../../util/images';
import lang from '../../service/lang';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const ROLE_IMAGEICONS = {
    [ ROLE_ARENA ]: 'images/icons/arena.png',
    [ ROLE_QUEST ]: 'images/icons/quest.png',
    [ ROLE_ALLIANCE_QUEST ]: 'images/icons/alliance-quest.png',
    [ ROLE_ALLIANCE_WAR_ATTACK ]: 'images/icons/alliance-war.png',
    [ ROLE_ALLIANCE_WAR_DEFENSE ]: 'images/icons/alliance-war.png',
};
const ROLE_ICONS = {
    [ ROLE_ARENA ]: 'certificate',
    [ ROLE_QUEST ]: 'map-o',
    [ ROLE_ALLIANCE_QUEST ]: 'map',
    [ ROLE_ALLIANCE_WAR_ATTACK ]: 'fire',
    [ ROLE_ALLIANCE_WAR_DEFENSE ]: 'shield',
};

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
    view(ctrl, {
        champion, events, selected, neighbor, editing, effects,
        showBadges = true, showPi = true, scalePi = 1,
        onclick, draggable, droppable,
    }) {
        const { uid, stars, rank, level, pi, typeId, awakened, role } = champion.attr;
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
        const portraitImage = (uid !== null) && getImage(`images/champions/portrait_${ uid }.png`);
        const hasPortraitImage = Boolean(portraitImage);
        let title = null;
        if(uid !== null) {
            title = [];
            if(effects && effects.length) {
                title.push(
                    <div class={ classNames('title-field', 'title-field-effects') }>
                        { effects.map(({ effectId, effectAmount }) => [ (
                            <ImageIcon
                                src={ effectImage(effectId, 'white') }
                                alt={ effectImage(effectId, 'black') }
                                hoverSrc={ effectImage(effectId, 'black') }
                                hoverAlt={ effectImage(effectId, 'white') }
                                after
                            />
                        ), (
                            <span>{ effectAmount }%</span>
                        ) ]) }
                    </div>
                );
            }
            if(showPi && (pi || champion.pi)) {
                title.push(
                    <div
                        class={ classNames('title-field', 'title-field-pi', {
                            'title-field-pi-custom': pi && pi > 0,
                        }) }
                    >{ (pi || champion.pi * scalePi) | 0 }</div>
                );
            }
            const name = lang.get(`champion-${ uid }-shortname`, null) || lang.get(`champion-${ uid }-name`);
            title.push(
                <div class="title-field title-field-name">{ name }</div>
            );
        }
        const isMaxed = STAR_RANK_LEVEL[ stars ] &&
            STAR_RANK_LEVEL[ stars ][ rank ] &&
            STAR_RANK_LEVEL[ stars ].ranks === rank &&
            STAR_RANK_LEVEL[ stars ][ rank ].levels === level;
        const isRankUp = !isMaxed && STAR_RANK_LEVEL[ stars ] &&
            STAR_RANK_LEVEL[ stars ][ rank ] &&
            STAR_RANK_LEVEL[ stars ].ranks > rank &&
            STAR_RANK_LEVEL[ stars ][ rank ].levels === level;
        const upgradeIcon = !showBadges? null:
        (isMaxed && (showBadges === 'upgrade' || showBadges === true))? (
            <ImageIcon
                src="images/icons/max.png"
                icon="check-circle"
            />
        ):
        (isRankUp && (showBadges === 'upgrade' || showBadges === true))? (
            <ImageIcon
                src="images/icons/rank-up.png"
                icon="chevron-circle-up"
            />
        ): null;
        const roleIcon = ((showBadges === 'role' || showBadges === true) && ROLE_IMAGEICONS[ role ])? (
            <ImageIcon
                src={ ROLE_IMAGEICONS[ role ] }
                icon={ ROLE_ICONS[ role ] }
            />
        ): null;
        return (
            <div
                m="ChampionPortrait"
                class={ classNames('champion-portrait', `champion--${ typeId }`, {
                    'champion--selected': selected,
                    'champion--neighbor': neighbor,
                    'champion--editing': editing,
                    'champion--null': uid === null,
                }) }
            >
                <div class={ classNames('container', 'no-select') }>
                    <div
                        class={ classNames('inner', { 'clickable': onclick }) }
                        { ...events }
                        droppable={ droppable }
                        draggable={ draggable }
                        onclick={ onclick }
                        title={ uid && lang.get(`champion-${ uid }-name`) || '' }
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
                            { upgradeIcon }
                        </div>
                        <div class={ classNames('role') }>
                            { roleIcon }
                        </div>
                    </div>
                </div>
            </div>
        );
    },
};

export default ChampionPortrait;
export { ROLE_IMAGEICONS, ROLE_ICONS };
