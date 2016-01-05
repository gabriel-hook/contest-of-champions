import './ChampionGrade.scss';
import lang from '../../service/lang';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const ChampionGrade = {
    view(ctrl, { title, grade }) {
        return (
            <div m="ChampionGrade" class="champion-grade">
                <b>{ lang.get(title) }:</b>
                <span class={ `champion-grade--value-${ grade[ 0 ].toLowerCase() }` }>
                    { grade }
                </span>
            </div>
        );
    },
};

export default ChampionGrade;
