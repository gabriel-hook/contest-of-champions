import './TeamsPage.scss';
import classNames from 'classnames';
import Message from '../Message.jsx';
import Champion from '../Champion.jsx';
import ImageIcon from '../ImageIcon.jsx';
import { effectImage } from '../../data/effects.js';
import teams from '../../service/teams.js';
import lang from '../../service/lang.js';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const TeamsPage = {
    view(/* ctrl, args */) {
        let count = 0;
        let teamDivs;
        let extrasHeader;
        let extrasDiv;
        if(teams.result) {
            count = teams.result.teams.length;
            teamDivs = teams.result.teams.map((team, teamIndex) => {
                const synergies = teams.result.synergies[ teamIndex ].map((synergy) => (
                    <div class="team-synergy">
                        <ImageIcon src={ effectImage(synergy.attr.effectId) } />
                        <span class="effect-name">
                            { lang.get(`effect-${ synergy.attr.effectId }-name`) }
                        </span>
                        <span class="effect-amount">
                            { synergy.attr.effectAmount }%
                        </span>
                    </div>
                ));

                //console.log(teams.result.synergies[ teamIndex ]);

                return (
                    <div
                        key={ `team-${ teamIndex }` }
                        class={ classNames('team', `team--size-${ teams.result.size }`) }
                    >
                        <div>
                        { team.map((champion, championIndex) => (
                            <Champion
                                key={ `team-${ teamIndex}-${ championIndex }-${ champion.id() }` }
                                champion={ champion }
                            />
                        )) }
                        </div>
                        <div className="synergies">
                            { synergies }
                        </div>
                    </div>
                );
            });
            if(teams.result.extras.length)
                extrasHeader = (
                    <h3>{ lang.get('extras') }</h3>
                );
            extrasDiv = teams.result.extras.map((champion, extrasIndex) => (
                <Champion
                    key={ `extras-${ extrasIndex }-${ champion.id() }` }
                    champion={ champion }
                />
            ));
        }
        return (
            <div class="teams">
                <Message value={ `${ count } ${ count === 1? lang.get('team'): lang.get('teams') }` } />
                <div>
                    { teamDivs }
                </div>
                { extrasHeader }
                <div>
                    { extrasDiv }
                </div>
            </div>
        );
    },
};

export default TeamsPage;
