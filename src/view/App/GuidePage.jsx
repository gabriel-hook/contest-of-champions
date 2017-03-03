import './GuidePage.scss';
import classNames from 'classnames';
import { effectIcon } from '../../data/effects';
import { championMap } from '../../data/champions';
import { CHAMPIONS_TO_FROGSPAWN } from '../../data/champions/frogspawn';
import Champion from '../../data/model/Champion';
import synergies from '../../data/synergies';
import guides from '../../data/guides';
import router from '../../service/router';
import lang from '../../service/lang';
import Icon from '../Icon.jsx';
import ImageIcon from '../ImageIcon.jsx';
import ChampionHeader from '../Champion/ChampionHeader.jsx';
import ChampionSection from '../Champion/ChampionSection.jsx';
import { requestRedraw } from '../../util/animation';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const getSynergies = (uid, isFrom) => {
    const filtered = synergies.filter((synergy) => {
        return synergy.attr[ isFrom? 'fromId': 'toId' ] === uid;
    });
    const keeperStars = filtered.reduce((map, synergy) => {
        const { fromId, fromStars, toId } = synergy.attr;
        if(isFrom && (!map[ toId ] || map[ toId ] > fromStars))
            map[ toId ] = fromStars;
        if(!isFrom && (!map[ fromId ] || map[ fromId ] > fromStars))
            map[ fromId ] = fromStars;
        return map;
    }, {});
    return filtered.filter((synergy) => {
        const { fromId, fromStars, toId } = synergy.attr;
        const uid = isFrom? toId: fromId;
        return fromStars === keeperStars[ uid ];
    });
};

const GuideSynergy ={
    view(ctrl, { championId, effectId, stars, spacing }) {
        const onclickChampion = () => {
            router.setRoute(`/guide/${ championId }`);
            requestRedraw();
        };
        const champion = championMap[ `${ championId }-2` ] || championMap[ `${ championId }-3` ] || championMap[ `${ championId }-4` ] || championMap[ `${ championId }-5` ];
        const typeId = champion && champion.attr.typeId;
        const name = lang.string(`champion-${ championId }-shortname`, null) || lang.string(`champion-${ championId }-name`);

        return (
            <div m="GuideSynergy" class={ classNames('guide-synergy', {
                'guide-synergy--spacing': spacing,
            }) }>
                <div class="guide-synergy-parts">
                    <div class="guide-synergy-part guide-synergy-part--champion">
                        <div
                            class={ classNames('champion-name', 'no-select') }
                            onclick={ onclickChampion }
                            title={ lang.string(`champion-${ championId }-name`) }
                        >
                            <ImageIcon
                                src={ `images/champions/portrait_${ championId }.png` }
                                type={ typeId }
                                icon="user"
                                before
                            />
                            { stars }★
                            { name }
                        </div>
                    </div>
                    <div class="guide-synergy-part guide-synergy-part--effect">
                        <div
                            class="effect-name"
                            title={ lang.string(`effect-${ effectId }-description`) }
                        >
                            <Icon icon={ effectIcon(effectId) } before />
                            { lang.string(`effect-${ effectId }-name`, null) || lang.string(`effect-${ effectId }-type`) }
                        </div>
                    </div>
                    <div class="guide-synergy-clear" />
                </div>
            </div>
        );
    },
};

const GuideAuthor = {
    view(ctrl, { name, type, profile }) {
        let byline = 'profile-by';
        let href;
        let icon;
        if (type) {
            switch(type) {
                case 'reddit': {
                    icon = 'reddit-alien';
                    if(profile)
                        href = `http://reddit.com/u/${ profile }`;
                    break;
                }
                case 'kabam': {
                    icon = 'bomb';
                    if(profile)
                        href = `http://community.kabam.com/forums/member.php?${ profile }`;
                    break;
                }
                case 'spotlight': {
                    byline = 'profile-spotlight-by';
                    icon = 'bomb';
                    if(profile)
                        href = `http://community.kabam.com/forums/showthread.php?${ profile }`;
                    break;
                }
                case 'email': {
                    icon = 'envelope';
                    if(profile)
                        href = `mailto:${ profile }`;
                    break;
                }
            }
        }

        return (
            <div m="GuideAuthor" class="guide-author">
                { `${ lang.string(byline) } ` }
                <a href={ href } target="_blank">
                    { icon && (
                        <Icon icon={ icon } />
                    ) }
                    { name }
                </a>
            </div>
        );
    },
};

const GuidePage = {
    view(ctrl, { uid }) {
        const guide = guides[ uid ];
        const details = [];
        const champion = championMap[ `${ uid }-2` ] || championMap[ `${ uid }-3` ] || championMap[ `${ uid }-4` ] || championMap[ `${ uid }-5` ];
        if(champion) {
            details.push(
                <ChampionHeader
                    champion={ new Champion({
                        ...champion.attr,
                        stars: 0,
                    }) }
                />
            );
        }
        let signatureLink;
        if(CHAMPIONS_TO_FROGSPAWN[ uid ]) {
            signatureLink = (
                <a
                    href={ `http://coc.frogspawn.de/champions/#${ CHAMPIONS_TO_FROGSPAWN[ uid ] }` }
                    target="_blank"
                    class="guide-external-link"
                >
                    <Icon icon="file-text" before />
                    { lang.string('details') }
                </a>
            );
        }

        if(guide && guide.description) {
            details.push(
                <ChampionSection
                    title={ lang.string('description') }
                    help={ lang.string(`champion-${uid}-description`, null) }
                    grade={ guide.grades && guide.grades.normal }
                    gradeAwakened={ guide.grades && guide.grades.awakened }
                    description={ guide.description }
                    youtube={ guide.youtube }
                />
            );
        }
        else {
            details.push(
                <ChampionSection
                    title={ lang.string('description') }
                    help={ lang.string(`champion-${uid}-description`, null) }
                />
            );
        }

        if (guide) {
            if(guide.gameplay) {
                details.push(
                    <ChampionSection
                        title={ lang.string('gameplay') }
                        rating={ guide.gameplay.rating }
                        description={ guide.gameplay.description }
                        abilities={ guide.gameplay.abilities }
                        note={ guide.gameplay.note }
                    />
                );
            }
            if(guide.attack) {
                details.push(
                    <ChampionSection
                        title={ lang.string('attack') }
                        rating={ guide.attack.rating }
                        description={ guide.attack.description }
                        heavy={ guide.attack.heavy }
                        ranges={ guide.attack.ranges }
                        damagetypes={ guide.attack.damagetypes }
                        abilities={ guide.attack.abilities }
                        note={ guide.attack.note }
                    />
                );
            }
        }

        [ 1, 2, 3 ].forEach((index) => {
            if(guide && guide.specials && guide.specials[ index ]) {
                details.push(
                    <ChampionSection
                        title={ `${ lang.string('special') } ${ index }` }
                        icon={ `special-${ index }` }
                        rating={ guide.specials[ index ].rating }
                        name={ lang.string(`champion-special-${uid}-${index}-name`, null) }
                        help={ lang.string(`champion-special-${uid}-${index}-description`, null) }
                        description={ guide.specials[ index ].description }
                        ranges={ (index === 3)? null: guide.specials[ index ].ranges }
                        damagetypes={ guide.specials[ index ].damagetypes }
                        abilities={ guide.specials[ index ].abilities }
                        note={ guide.specials[ index ].note }
                    />
                );
            }
            else {
                details.push(
                    <ChampionSection
                        title={ `${ lang.string('special') } ${ index }` }
                        icon={ `special-${ index }` }
                        name={ lang.string(`champion-special-${uid}-${index}-name`, null) }
                        help={ lang.string(`champion-special-${uid}-${index}-description`, null) }
                    />
                );
            }
        });

        if (guide && guide.signature) {
            details.push(
                <ChampionSection
                    title={ lang.string('signature') }
                    name={ lang.string(`champion-signature-${uid}-name`, null) }
                    help={ lang.string(`champion-signature-${uid}-description`, null) }
                    rating={ guide.signature.rating }
                    description={ guide.signature.description }
                    abilities={ guide.signature.abilities }
                    note={ guide.signature.note }
                    raw={ signatureLink }
                />
            );
        }
        else {
            details.push(
                <ChampionSection
                    title={ lang.string('signature') }
                    name={ lang.string(`champion-signature-${uid}-name`, null) }
                    help={ lang.string(`champion-signature-${uid}-description`, null) }
                    raw={ signatureLink }
                />
            );
        }
        let lastGroup;
        details.push(
            <ChampionSection
                title={ lang.string('synergies') }
                icon="synergy"
                raw={ getSynergies(uid, true).map(({ attr }, index) => {
                    const isNewGroup = (index > 0) && (!attr.group || attr.group !== lastGroup);
                    lastGroup = attr.group;
                    return (
                        <GuideSynergy
                            championId={ attr.toId }
                            effectId={ attr.effectId }
                            stars={ attr.fromStars }
                            spacing={isNewGroup}
                        />
                    );
                }) }
            />
        );
        details.push(
            <ChampionSection
                title={ lang.string('synergies-external') }
                icon="synergy"
                raw={ getSynergies(uid, false).map(({ attr }) => (
                    <GuideSynergy
                        championId={ attr.fromId }
                        typeId={ attr.typeId }
                        effectId={ attr.effectId }
                        stars={ attr.fromStars }
                    />
                )) }
            />
        );
        if(guide && guide.author) {
            details.push(
                <GuideAuthor
                    name={ guide.author.name }
                    type={ guide.author.type }
                    profile={ guide.author.profile }
                />
            );
        }
        return (
            <div
                m="GuidePage"
                role="article"
                class="guide"
            >
                { details }
                <div class="clear" />
            </div>
        );
    },
};

export default GuidePage;
