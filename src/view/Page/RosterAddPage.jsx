import './RosterAddPage.scss';
import classNames from 'classnames';
import roster from '../../service/roster';
import router from '../../service/router';
import lang from '../../service/lang';
import Champion from '../Champion.jsx';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const RosterAddPage = {
    view(ctrl, args) {
        const { stars } = args;
        const champions = roster.available(stars);
        return (
            <div class="roster-add">

                <div class="add-stars">
                {[ 1, 2, 3, 4, 5 ].map((star) => (
                    <button
                        class={ classNames('add-stars-button', { 'add-stars-button--selected': stars === star }) }
                        onclick={ () => router.setRoute(`/roster/add/${ star }`) }
                    >
                        { `${ star }★` }
                    </button>
                ))}
                </div>


                <button
                    class={ classNames('add-all', { 'disabled': champions.length === 0 }) }
                    onclick={ () => roster.addAll(stars) }
                >
                    { lang.get('add-all') }
                </button>
                <div style="clear:both" />
                <div>
                    { champions.map((champion, index) => (
                        <Champion
                            key={ `${ index }-${ champion.id }` }
                            champion={ champion }
                            onclick={ () => roster.add(champion.attr.uid, stars) }
                        />
                    )) }
                    <div class="clear"></div>
                </div>
            </div>
        );
    },
};

export default RosterAddPage;
