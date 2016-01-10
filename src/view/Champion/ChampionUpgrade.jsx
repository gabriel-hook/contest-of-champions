import './ChampionUpgrade.scss';
import { STAR_RANK_LEVEL, CATALYSTS } from '../../data/model/Champion';
import classNames from 'classnames';
import ImageIcon from '../ImageIcon.jsx';
import lang from '../../service/lang';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const ChampionUpgrade = {
    view(ctrl, { stars, rank, level, typeId }) {
        const definitionStars = STAR_RANK_LEVEL[ stars ];
        const definitionRank = definitionStars[ rank ];
        const isMaxed = definitionStars.ranks === rank && definitionRank.levels === level;
        const isRankUp = definitionStars.ranks > rank && definitionRank.levels === level;
        const catalysts = CATALYSTS[ stars ] && CATALYSTS[ stars ][ rank ];
        return (
            <div
                m="ChampionUpgrade"
                class={ classNames('champion-upgrade', {
                    'champion-upgrade-rank-up': isRankUp,
                    'champion-upgrade-max': isMaxed,
                }) }
            >
                { (isMaxed)? lang.get('upgrade-maxed'):
                (!catalysts)? lang.get('upgrade-max-rank'):
                catalysts.map(({ tier, type, amount }) => (
                    <span class="champion-upgrade-catalyst">
                        { amount } x
                        <ImageIcon
                            src={ `images/catalysts/tier_${ tier }_${ (type === 'class')? typeId: type }.png` }
                            icon="cube"
                        />
                    </span>
                )) }
            </div>
        );
    },
};

export default ChampionUpgrade;
