import './GuidePage.scss';
import { getImage } from '../../util/images';
import { effectImage } from '../../data/effects';
import synergies from '../../data/synergies';
import guides from '../../data/guides';
import router from '../../service/router';
import lang from '../../service/lang';
import ImageIcon from '../ImageIcon.jsx';
import classNames from 'classnames';
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
        const onclickChampion = () => router.setRoute(`/guide/${ championId }`);
        return (
            <div class="guide-synergy">
                <ImageIcon src={ `images/champions/portrait_${ championId }.png` } icon="user" />
                <ImageIcon src={ effectImage(effectId) } icon="square" />
                <span class="champion-name" onclick={ onclickChampion }>
                    { stars }★
                    { lang.get(`champion-${ championId }-name`) }
                </span>
                <span class="effect-name">
                    { lang.get(`effect-${ effectId }-name`) }
                </span>
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
            title, subtitle, description, note,
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

const GuideBackground = {
    view(ctrl, args) {
        const { uid } = args;
        const backgroundImage = getImage(`images/champions/fullsize_${ uid }.png`);
        let backgroundStyle;
        if(backgroundImage) {
            backgroundStyle = `background-image: url("${ backgroundImage.src }");`;
        }
        return (
            <img
                class={ classNames('guide-background', {
                    'guide-background--loaded': backgroundImage,
                }) }
                style={ backgroundStyle }
            />
        );
    },
};

const GuidePage = {
    view(ctrl, args) {
        const { uid } = args;
        const guide = guides[ uid ];
        const details = [];
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
                        description={ guide.attack.heavy }
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
        return (
            <div class="guide">
                <GuideBackground
                    key={ `guide-background-${ uid }` }
                    uid={ uid }
                />
                <div class="guide-title">{ lang.get(`champion-${ uid }-name`) }</div>
                { details }
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
                <div class="clear" />
            </div>
        );
    },
};

export default GuidePage;
