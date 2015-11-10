import './Champion.scss';
import roster from '../service/roster';
import m from 'mithril';

const Champion = {
	view(ctrl, args) {
		const { uid, stars, typeId, pi } = args.champion.toJSON();
		const hasClick = args.onClick  || '';
		const isEditing = args.isEditing  || '';
		const starImages = [];
		for(let i=0; i<stars; i++)
			starImages.push(
	        	<img class="star" src="images/icons/star.png" />
			);
		const name = uid;
		return (
			<div class={ `champion champion--${ typeId } ${ isEditing && 'editing' }` }>
				<div class="container">
				  <div class={ `inner ${ hasClick && 'clickable' }` } onclick={ args.onClick }>
				    <img class="portrait" src={ `images/champions/portrait_${ uid }.png` } />
				    <div class="title">
				      <span class="name">{ name }</span>
				    </div>
				    <div class="stars">
				    	{ starImages }
				    </div>
				  </div>
				</div>
			</div>
		);
	}
}

export default Champion;
