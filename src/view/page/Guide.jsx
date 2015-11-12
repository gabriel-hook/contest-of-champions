import './Guide.scss';
import { uids } from '../../data/champions.js';
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
		title: 'guide',
		icon: 'user',
	},
	options: uids.map((uid) => ({
		title: `champion-${ uid }-name`,
		image: `images/champions/portrait_${ uid }.png`,
		selected: (currentUid) => currentUid === uid,
		onclick: () => router.setRoute(`/guide/${ uid }`),
	})),
};

const Guide = {
	view(ctrl, args) {
		const { uid } = args;
		const guide = guides[ uid ];

		return (
			<div class="guide">
				{ uid }
			</div>
		);
	}
}

export { tab, menu };
export default Guide;
