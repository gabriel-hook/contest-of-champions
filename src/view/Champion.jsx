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
	        	<img className="star" src="images/icons/star.png" />
			);
		const name = uid;
		return (
			<div className={ `champion champion--${ typeId } ${ isEditing && 'editing' }` }>
				<div className="container">
				  <div className={ `inner ${ hasClick && 'clickable' }` } onclick={ args.onClick }>
				    <img className="portrait" src={ `images/champions/portrait_${ uid }.png` } />
				    <div className="title">
				      <span className="name">{ name }</span>
				    </div>
				    <div className="stars">
				    	{ starImages }
				    </div>
				  </div>
				</div>
			</div>
		);
	}
}

export default Champion;
