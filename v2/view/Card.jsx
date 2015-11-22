import './Card.scss';
import classNames from 'classnames';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const Card = {
    view(ctrl, args) {
        const { front, back, flipped } = args;
        return (
            <div class={ classNames('card', { 'card--flipped': flipped }) }>
                <div class="card-front">
                    { front }
                </div>
                <div class="card-back">
                    { back }
                </div>
            </div>
        );
    },
};

export default Card;
