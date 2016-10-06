import './RosterAddPage.scss';
import classNames from 'classnames';
import roster from '../../service/roster';
import router from '../../service/router';
import lang from '../../service/lang';
import ChampionPortrait from '../Champion/ChampionPortrait.jsx';
import { notify, denotify } from '../../util/notification';
import { requestRedraw } from '../../util/animation';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const RosterAddPage = {
    view(ctrl, { stars }) {
        const champions = roster.available(stars);
        return (
            <div m="RosterAddPage" class="roster-add">
                <div class="add-stars">
                {[ 1, 2, 3, 4, 5 ].map((star) => (
                    <button
                        class={ classNames('add-stars-button', { 'add-stars-button--selected': stars === star }) }
                        onclick={ () => {
                            router.setRoute(`/roster/add/${ star }`);
                            requestRedraw();
                        }}
                    >
                        { `${ star }★` }
                    </button>
                ))}
                </div>
                <button
                    class={ classNames('add-all', { 'disabled': champions.length === 0 }) }
                    onclick={ () => {
                        roster.addAll(stars);
                        requestRedraw();
                        denotify({ tag: 'roster-empty' });
                    }}
                >
                    { lang.string('add-all') }
                </button>
                <div>
                    { champions.map((champion) => (
                        <ChampionPortrait
                            key={ `roster-add-${ champion.id }` }
                            champion={ champion }
                            showPi={false}
                            onclick={ () => {
                                roster.add(champion.attr.uid, stars);
                                denotify({ tag: 'roster-empty' });
                                notify({
                                    message: lang.string('notification-roster-add')
                                        .replace(/\%stars\%/g, stars)
                                        .replace(/\%champion\%/g, lang.string(`champion-${ champion.attr.uid }-shortname`, null) || lang.string(`champion-${ champion.attr.uid }-name`)),
                                    tag: 'roster-add',
                                    onclick: () => router.setRoute(`/roster/${champion.attr.uid}/${stars}`),
                                });
                                requestRedraw(5);
                            }}
                        />
                    )) }
                </div>
                <div class="clear" />
            </div>
        );
    },
};

export default RosterAddPage;
