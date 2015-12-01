import './GuidePage.scss';
import { effectImage } from '../../data/effects';
import synergies from '../../data/synergies';
import guides from '../../data/guides';
import router from '../../service/router';
import lang from '../../service/lang';
import pure from '../../util/pure';
import ImageIcon from '../ImageIcon.jsx';
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

const Synergy ={
    view(ctrl, args) {
        const { championId, effectId, stars } = args;
        const onclickChampion = () => router.setRoute(`/guide/${ championId }`);
        return (
            <div class="guide-synergy">
                <ImageIcon src={ `images/champions/portrait_${ championId }.png` } />
                <ImageIcon src={ effectImage(effectId) } />
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

const Section = {
    view(ctrl, args) {
        const { title, subtitle, description, note } = args;
        const elements = [];
        elements.push(
            <h3>{ title }</h3>
        );
        if(subtitle) {
            elements.push(
                <div class="text"><b>{ subtitle }</b></div>
            );
        }
        if(description) {
            elements.push(
                <div class="text">{ description }</div>
            );
        }
        if(note) {
            elements.push(
                <div class="text"><b>{ lang.get('note') }: </b>{ note }</div>
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
        if(guide) {
            if(guide.description) {
                details.push(
                    <Section
                        title={ lang.get('description') }
                        description={ guide.description }
                    />
                );
            }
            if(guide.gameplay) {
                details.push(
                    <Section
                        title={ lang.get('gameplay') }
                        subtitle={ guide.gameplay.style }
                        description={ guide.gameplay.description }
                        note={ guide.gameplay.note }
                    />
                );
            }
            if(guide.attack) {
                details.push(
                    <Section
                        title={ lang.get('attack') }
                        description={ guide.attack.heavy }
                        note={ guide.attack.note }
                    />
                );
            }
            if(guide.signature) {
                details.push(
                    <Section
                        title={ lang.get('signature') }
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
                            <Section
                                title={ `${ lang.get(`special`) } ${ index }` }
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
                <h2>{ lang.get(`champion-${ uid }-name`) }</h2>
                { details }
                <h3>{ lang.get(`synergies`) }</h3>
                <div>
                    {getSynergies(uid, true).map(({ attr }) => (
                        <Synergy
                            championId={ attr.toId }
                            effectId={ attr.effectId }
                            stars={ attr.fromStars }
                        />
                    ))}
                </div>
                <h3>{ lang.get(`synergies-external`) }</h3>
                <div>
                    {getSynergies(uid, false).map(({ attr }) => (
                        <Synergy
                            championId={ attr.fromId }
                            effectId={ attr.effectId }
                            stars={ attr.fromStars }
                        />
                    ))}
                </div>
            </div>
        );
    },
};

export default pure(GuidePage);
