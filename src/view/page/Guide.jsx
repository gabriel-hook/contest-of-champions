import './Guide.scss';
import Message from '../Message.jsx';
import Champion from '../Champion.jsx';
import { uidsByType } from '../../data/champions.js';
import guides from '../../data/guides.js';
import roster from '../../service/roster.js';
import router from '../../service/router.js';
import lang from '../../service/lang.js';
import m from 'mithril';

const tab = {
	id: 'guide',
	icon: 'user',
	title: 'guide',
};

const menu = {
	header:{
		title: 'guides',
		icon: 'user',
	},
	options: [],
};
uidsByType.forEach(({ typeId, uids}) => {
	menu.options.push({
		header: true,
		title: `type-${ typeId }-name`,
	});
	menu.options = menu.options.concat(uids.map((uid) => ({
		title: `champion-${ uid }-name`,
		image: `images/champions/portrait_${ uid }.png`,
		selected: (currentUid) => currentUid === uid,
		onclick: () => router.setRoute(`/guide/${ uid }`),
	})));
});


const Guide = {
	view(ctrl, args) {
		const { uid } = args;
		const guide = guides[ uid ];

		return (
			<div class="guide">
				<Message value={ uid }/>
			</div>
		);
	}
}

export { tab, menu };
export default Guide;
