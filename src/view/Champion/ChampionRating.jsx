import './ChampionRating.scss';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const ChampionRating = {
    view(ctrl, { rating }) {
        return (
            <div
                m="ChampionRating"
                class="champion-rating"
            >
                <span class={ `champion-rating--value-${ rating }` }>
                    { rating }
                </span> / 5
            </div>
        );
    },
};

export default ChampionRating;
