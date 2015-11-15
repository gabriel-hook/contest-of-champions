import './Guide.scss';
import { effectImage } from '../../data/effects.js';
import { uidsByType } from '../../data/champions.js';
import synergies from '../../data/synergies.js';
//import guides from '../../data/guides.js';
import router from '../../service/router.js';
import lang from '../../service/lang.js';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const tab = {
    id: 'guide',
    icon: 'user',
    title: 'guide',
};

const menu = {
    header:{
        title: 'guides',
        icon: 'user',
    },
    options: [],
};
uidsByType.forEach(({ typeId, uids }) => {
    menu.options.push({
        header: true,
        title: `type-${ typeId }-name`,
    });
    menu.options = menu.options.concat(uids.map((uid) => ({
        title: `champion-${ uid }-name`,
        image: `../images/champions/portrait_${ uid }.png`,
        selected: (currentUid) => currentUid === uid,
        onclick: () => router.setRoute(`/guide/${ uid }`) && false,
    })));
});

function $image(src) {
    return src && (
        <i class="icon">
            <img src={ src } />
        </i>
    );
}

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

const $synergy = (championId, effectId, stars) => {
    return (
        <div class="guide--synergy">
            {
                $image(`../images/champions/portrait_${ championId }.png`)
            }{
                $image(effectImage(effectId))
            }
            <span class="champion--name" onclick={
                () => router.setRoute(`/guide/${ championId }`)
            }>
                { stars }★
                { lang.get(`champion-${ championId }-name`) }
            </span>
            <span class="effect--name">
                { lang.get(`effect-${ effectId }-name`) }
            </span>
        </div>
    );
};

const Guide = {
    view(ctrl, args) {
        const { uid } = args;
        // const guide = guides[ uid ];
        const mySynergies = getSynergies(uid, true).map((synergy) => {
            const { toId, fromStars, effectId } = synergy.attr;
            return $synergy(toId, effectId, fromStars);
        });
        const externalSynergies = getSynergies(uid, false).map((synergy) => {
            const { fromId, fromStars, effectId } = synergy.attr;
            return $synergy(fromId, effectId, fromStars);
        });

        return (
            <div class="guide">
                <h2>{ lang.get(`champion-${ uid }-name`) }</h2>

                <h3>{ lang.get(`synergies`) }</h3>
                <div>{ mySynergies }</div>

                <h3>{ lang.get(`synergies-external`) }</h3>
                <div>{ externalSynergies }</div>
            </div>
        );
    },
};

export { tab, menu };
export default Guide;
