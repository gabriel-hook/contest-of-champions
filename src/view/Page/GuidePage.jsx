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
import ChampionSection from '../ChampionSection.jsx';
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
                    <ChampionSection
                        title={ lang.get('description') }
                        grade={ guide.grades && guide.grades.normal }
                        gradeAwakened={ guide.grades && guide.grades.awakened }
                        description={ guide.description }
                    />
                );
            }
            if(guide.gameplay) {
                details.push(
                    <ChampionSection
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
                    <ChampionSection
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
                    <ChampionSection
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
                            <ChampionSection
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
            <ChampionSection
                title={ lang.get('synergies') }
                raw={ getSynergies(uid, true).map(({ attr }) => (
                    <GuideSynergy
                        championId={ attr.toId }
                        effectId={ attr.effectId }
                        stars={ attr.fromStars }
                    />
                )) }
            />
        );
        details.push(
            <ChampionSection
                title={ lang.get('synergies-external') }
                raw={ getSynergies(uid, false).map(({ attr }) => (
                    <GuideSynergy
                        championId={ attr.fromId }
                        effectId={ attr.effectId }
                        stars={ attr.fromStars }
                    />
                )) }
            />
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
