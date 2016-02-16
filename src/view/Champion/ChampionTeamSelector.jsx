import './ChampionTeam.scss';
import './ChampionTeamSelector.scss';
import classNames from 'classnames';
import { PLACEHOLDER } from '../../data/champions';
import effects, { effectImage } from '../../data/effects';
import lang from '../../service/lang';
import ChampionPortrait from './ChampionPortrait.jsx';
import ImageIcon from '../ImageIcon.jsx';
import { requestRedraw } from '../../util/animation';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const ChampionTeamSelector = {
    view(ctrl, { team, swap, onclick, onapply }) {
        const sourceId = swap && swap.source && swap.source.id;
        const targetId = swap && swap.target && swap.target.id;
        const { champions, synergies } = team;
        const size = champions.length;
        return(
            <div
                m="ChampionTeamSelector"
                class={ classNames('champion-team', 'champion-team-selector', ` champion-team--size-${ size }`) }
            >
                <div>
                    { champions.map((champion, index) => (champion)? (
                        <ChampionPortrait
                            key={ champion.id }
                            champion={ champion }
                            editing={ sourceId === champion.id || targetId === champion.id }
                            showBadges={ 'none' }
                            onclick={() => {
                                onclick({
                                    id: champion.id,
                                });
                                requestRedraw();
                            }}
                        />
                    ): (
                        <ChampionPortrait
                            key={ `create_${ index }` }
                            champion={ PLACEHOLDER }
                            editing={ swap && swap.source && swap.source.create && swap.source.index === index }
                            showBadges={ 'none' }
                            onclick={() => {
                                onclick({
                                    create: true,
                                    index,
                                });
                                requestRedraw();
                            }}
                        />
                    )) }
                </div>
                <div className="team-synergies">
                    { effects.map((effect) => {
                        const synergy = synergies.filter((synergy) => synergy.attr.effectId === effect.attr.uid);
                        if(synergy.length === 0)
                            return null;
                        const amount = synergy.reduce((value, synergy) => value + synergy.attr.effectAmount, 0);
                        return (
                            <div
                                class={ classNames('team-synergy', 'no-select') }
                                title={ lang.get(`effect-${ effect.attr.uid }-description`) }
                            >
                                <ImageIcon
                                    src={ effectImage(effect.attr.uid, 'black') }
                                    alt={ effectImage(effect.attr.uid, 'white') }
                                    icon="square"
                                />
                                <span class="effect-name">
                                    { lang.get(`effect-${ effect.attr.uid }-name`) }
                                </span>
                                <span class="effect-amount">
                                    { amount }%
                                </span>
                            </div>
                        );
                    })}
                    <div class="team-pi">
                        { lang.get('pi') }
                        <span class="team-pi-number">
                            { champions.reduce((amount, champion) => amount + (champion && (champion.attr.pi || champion.pi) || 0), 0) }
                        </span>
                    </div>
                </div>
                { onapply && (
                    <div class={ classNames('team-apply', { 'disabled': !swap.target }) } onclick={ onapply }>
                        { lang.get('apply') }
                    </div>
                ) || null }
            </div>
        );
    },
};

export default ChampionTeamSelector;
