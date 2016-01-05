import './Cards.scss';
import classNames from 'classnames';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const Cards = {
    view(ctrl, { cards, current }) {
        return (
            <div m="Cards" class="cards">
                    { cards.map((card, index) => {

                        return (
                            <div class={ classNames('card', {
                                'card-previous': index < current,
                                'card-current': index === current,
                                'card-next': index > current,
                            }) }>
                                { card }
                            </div>
                        );
                    }) }
            </div>
        );
    },
};

export default Cards;
