import './Card.scss';
import classNames from 'classnames';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const Card = {
    view(ctrl, args) {
        const { cards, current } = args;
        return (
            <div class="cards">
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

export default Card;
