import './ChampionUpgrade.scss';
import { STAR_RANK_LEVEL, CATALYSTS } from '../../data/model/Champion';
import classNames from 'classnames';
import ImageIcon from '../ImageIcon.jsx';
import { getImage } from '../../util/images';
import lang from '../../service/lang';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const ChampionUpgrade = {
    view(ctrl, { stars, rank, level }) {
        let max = false;

        const definitionStars = STAR_RANK_LEVEL[ stars ];
        const definitionRank = definitionStars[ rank ];
        if(definitionStars.ranks === rank && definitionRank.levels === level) {
            max = true;
        }

        const content = [];

        if(max) {

        }

        return (
            <div
                m="ChampionUpgrade"
                class={ classNames('champion-upgrade', { 'champion-upgrade-max': max }) }
            >
                { content }
            </div>
        );
    },
};

export default ChampionUpgrade;
