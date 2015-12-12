import './GuidePage.scss';
import classNames from 'classnames';
import { idMap } from '../../data/champions';
import Champion from '../../data/model/Champion';
import { effectImage } from '../../data/effects';
import synergies from '../../data/synergies';
import guides from '../../data/guides';
import router from '../../service/router';
import lang from '../../service/lang';
import ImageIcon from '../ImageIcon.jsx';
import ChampionHeader from '../ChampionHeader.jsx';
import { requestRedraw } from '../../util/animation';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const getSynergies = (uid, isFrom) => {
    const filtered = synergies.filter((synergy) => {
        return synergy.attr[ isFrom? 'fromId': 'toId' ] === uid;
    });
    const keeperStars = {};
    filtered.forEach((synergy) => {
        const { fromId, fromStars, toId } = synergy.attr;
        if(isFrom && (!keeperStars[ toId ] || keeperStars[ toId ] > fromStars))
            keeperStars[ toId ] = fromStars;
        if(!isFrom && (!keeperStars[ fromId ] || keeperStars[ fromId ] > fromStars))
            keeperStars[ fromId ] = fromStars;
    });
    return filtered.filter((synergy) => {
        const { fromId, fromStars, toId } = synergy.attr;
        const uid = isFrom? toId: fromId;
        return fromStars === keeperStars[ uid ];
    });
};

const GuideSynergy ={
    view(ctrl, args) {
        const { championId, effectId, stars } = args;
        const onclickChampion = () => {
            router.setRoute(`/guide/${ championId }`);
            requestRedraw();
        };
        const name = lang.get(`champion-${ championId }-shortname`, null) || lang.get(`champion-${ championId }-name`);
        return (
            <div class="guide-synergy">
                <div class="guide-synergy-parts">
                    <div class="guide-synergy-part">
                        <div class={ classNames('champion-name', 'no-select') } onclick={ onclickChampion }>
                            <ImageIcon src={ `images/champions/portrait_${ championId }.png` } icon="user" />
                            { stars }★
                            { name }
                        </div>
                    </div>
                    <div class="guide-synergy-part">
                        <div class="effect-name">
                            <ImageIcon src={ effectImage(effectId) } icon="square" />
                            { lang.get(`effect-${ effectId }-name`) }
                        </div>
                    </div>
                    <div class="guide-synergy-clear" />
                </div>
            </div>
        );
    },
};

const GuideGrade = {
    view(ctrl, args) {
        const { title, grade } = args;
        return (
            <div class="guide-grade">
                <b>{ lang.get(title) }:</b>
                <span class={ `guide-grade--value-${ grade[ 0 ].toLowerCase() }` }>
                    { grade }
                </span>
            </div>
        );
    },
};

const GuideRating = {
    view(ctrl, args) {
        const { rating } = args;
        return (
            <div class="guide-rating">
                <span class={ `guide-rating--value-${ rating }` }>
                    { rating }
                </span> / 5
            </div>
        );
    },
};

const GuideSection = {
    view(ctrl, args) {
        const {
            title, subtitle, description, note, heavy,
            rating, grade, gradeAwakened,
        } = args;
        const elements = [];
        elements.push(
            <div class="guide-section-title">
                { title }
                { rating !== undefined && (
                    <GuideRating rating={ rating } />
                ) || null}
            </div>
        );
        if(grade) {
            elements.push(
                <GuideGrade title="grade" grade={ grade } />
            );
        }
        if(gradeAwakened) {
            elements.push(
                <GuideGrade title="awakened" grade={ gradeAwakened } />
            );
        }
        if(subtitle) {
            elements.push(
                <div class="guide-text"><b>{ subtitle }</b></div>
            );
        }
        if(description) {
            elements.push(
                <div class="guide-text">{ description }</div>
            );
        }
        if(heavy) {
            elements.push(
                <div class="guide-text">
                    <b>{ lang.get('heavy-attack') }:</b>
                    { heavy }
                </div>
            );
        }
        if(note) {
            elements.push(
                <div class="guide-text">
                    <b>{ lang.get('note') }:</b>
                    { note }
                </div>
            );
        }
        return (
            <div class="guide-section">
                { elements }
            </div>
        );
    },
};

const GuidePage = {
    view(ctrl, args) {
        const { uid } = args;
        const guide = guides[ uid ];
        const details = [];
        const champion = idMap[ `${ uid }-2` ] || idMap[ `${ uid }-3` ] || idMap[ `${ uid }-4` ] || idMap[ `${ uid }-5` ];
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
        if(guide) {
            if(guide.description) {
                details.push(
                    <GuideSection
                        title={ lang.get('description') }
                        grade={ guide.grades && guide.grades.normal }
                        gradeAwakened={ guide.grades && guide.grades.awakened }
                        description={ guide.description }
                    />
                );
            }
            if(guide.gameplay) {
                details.push(
                    <GuideSection
                        title={ lang.get('gameplay') }
                        rating={ guide.gameplay.rating }
                        subtitle={ guide.gameplay.style }
                        description={ guide.gameplay.description }
                        note={ guide.gameplay.note }
                    />
                );
            }
            if(guide.attack) {
                details.push(
                    <GuideSection
                        title={ lang.get('attack') }
                        rating={ guide.attack.rating }
                        description={ guide.attack.description }
                        heavy={ guide.attack.heavy }
                        note={ guide.attack.note }
                    />
                );
            }
            if(guide.signature) {
                details.push(
                    <GuideSection
                        title={ lang.get('signature') }
                        rating={ guide.signature.rating }
                        subtitle={ guide.signature.name }
                        description={ guide.signature.description }
                        note={ guide.signature.note }
                    />
                );
            }
            if(guide.specials) {
                [ 1, 2, 3 ].forEach((index) => {
                    if(guide.specials[ index ]) {
                        details.push(
                            <GuideSection
                                title={ `${ lang.get(`special`) } ${ index }` }
                                rating={ guide.specials[ index ].rating }
                                subtitle={ guide.specials[ index ].name }
                                description={ guide.specials[ index ].description }
                                note={ guide.specials[ index ].note }
                            />
                        );
                    }
                });
            }
        }
        details.push(
            <div class="guide-section">
                <div class="guide-section-title">
                    { lang.get(`synergies`) }
                </div>
                <div class="guide-synergies">
                    {getSynergies(uid, true).map(({ attr }) => (
                    <GuideSynergy
                        championId={ attr.toId }
                        effectId={ attr.effectId }
                        stars={ attr.fromStars }
                    />
                        ))}
                </div>
            </div>
        );
        details.push(
            <div class="guide-section">
                <div class="guide-section-title">
                    { lang.get(`synergies-external`) }
                </div>
                <div class="guide-synergies">
                    {getSynergies(uid, false).map(({ attr }) => (
                    <GuideSynergy
                        championId={ attr.fromId }
                        effectId={ attr.effectId }
                        stars={ attr.fromStars }
                    />
                        ))}
                </div>
            </div>
        );
        return (
            <div class="guide" key={ 'guide-${ uid }' }>
                { details }
                <div class="clear" />
            </div>
        );
    },
};

export default GuidePage;
