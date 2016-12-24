import './ChampionPortrait.scss';
import { STAR_RANK_LEVEL } from '../../data/model/Champion';
import { roleImage } from '../../data/roles';
import { effectIcon } from '../../data/effects';
import classNames from 'classnames';
import ImageIcon from '../ImageIcon.jsx';
import Icon from '../Icon.jsx';
import {
    getImage,
    IMAGE_EMPTY,
    IMAGE_STAR, IMAGE_STAR_AWAKENED,
    IMAGE_BADGE_RANK_UP, IMAGE_BADGE_LEVEL_MAX,
} from '../../images';
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
    view(ctrl, {
        champion, events, selected, neighbor, editing, effects,
        showBadges = true, showPi = true, scalePi = 1,
        onclick, draggable, droppable,
    }) {
        const { uid, stars, rank, level, pi, typeId, awakened, role } = champion.attr;
        let details = uid && lang.string(`champion-${ uid }-name`) || '';
        const starIcon = awakened? (
            <ImageIcon src={ IMAGE_STAR_AWAKENED } />
        ): (
            <ImageIcon src={ IMAGE_STAR } />
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
                        { effects.map(({ effectId, effectAmount }) => {
                            details += `\n${ lang.string(`effect-${ effectId }-type`)} +${ effectAmount }%`;
                            return [ (
                                <Icon icon={ effectIcon(effectId) } after />
                            ), (
                                <span>{ effectAmount }%</span>
                            ) ];
                        }) }
                    </div>
                );
            }
            if(showPi && (pi || champion.pi)) {
                title.push(
                    <div
                        class={ classNames('title-field', 'title-field-pi', {
                            'title-field-pi-custom': pi && pi > 0,
                        }) }
                    >{ lang.number(pi || champion.pi * scalePi) }</div>
                );
            }
            const name = lang.string(`champion-${ uid }-shortname`, null) || lang.string(`champion-${ uid }-name`);
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
            <ImageIcon src={ IMAGE_BADGE_LEVEL_MAX } />
        ):
        (isRankUp && (showBadges === 'upgrade' || showBadges === true))? (
            <ImageIcon src={ IMAGE_BADGE_RANK_UP } />
        ): null;
        const roleIconImage = ((showBadges === 'role' || showBadges === true) && roleImage(role))? (
            <ImageIcon src={ roleImage(role) } />
        ): null;
        const isInvalid = (uid === null);

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
                        ondragstart={ !isInvalid && ((event) => {
                            event.dataTransfer.setData('text/plain', JSON.stringify(champion));
                            if(draggable && events.ondragstart) {
                                const championPortrait = event.target.parentNode.parentNode;
                                const { width, height } = championPortrait.getBoundingClientRect();
                                const handle = championPortrait.cloneNode(true);
                                handle.style.position = 'absolute';
                                handle.style.left = `-${ width }px`;
                                handle.style.top = `-${ height }px`;
                                handle.style.width = `${ width }px`;
                                handle.style.paddingBottom = `${ height }px`;
                                handle.style.zIndex = '2';
                                handle.style.opacity = 1;
                                event.target.handle = handle;
                                document.body.appendChild(handle);
                                event.dataTransfer.setDragImage(handle, width / 2 | 0, height / 2 | 0);
                                events.ondragstart(event);
                            }
                        }) }
                        ondragend={ !isInvalid && ((event) => {
                            if(draggable && events.ondragend) {
                                if(event.target.handle) {
                                    document.body.removeChild(event.target.handle);
                                }
                                events.ondragend(event);
                            }
                        }) }
                        droppable={ droppable }
                        draggable={ !isInvalid }
                        onclick={ onclick }
                        title={ details }
                    >
                        <div class="portrait">
                            <div
                                class={ classNames('portrait-image', { 'portrait-image--hidden': hasPortraitImage }) }
                                config={ addSVG }
                            />
                            <div class={ classNames('portrait-image', { 'portrait-image--hidden': !hasPortraitImage }) }>
                                <img src={ portraitImage && portraitImage.src || IMAGE_EMPTY } />
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
                            { roleIconImage }
                        </div>
                    </div>
                </div>
            </div>
        );
    },
};

export default ChampionPortrait;
