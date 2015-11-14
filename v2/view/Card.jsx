import './Card.scss';
import m from 'mithril';

const Card = {
	view(ctrl, args) {
		const { front, back, flipped } = args;
		return (
			<div class={ `card ${ flipped? 'card--flipped': '' }` }>
				<div class='card-front'>
					{ front }
				</div>
				<div class='card-back'>
					{ back }
				</div>
			</div>
		);
	}
}

export default Card;
