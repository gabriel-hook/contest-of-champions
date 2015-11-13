import './Menu.scss';
import roster from '../../service/roster.js';
import router from '../../service/router.js';
import lang from '../../service/lang.js';
import m from 'mithril';

function both(f1, f2){
	return () => {
		f1();
		f2();
	};
}

const Menu = {
	controller(args){
		this.open = false;
		this.toggle = () => {
			this.open = !this.open;
		};
	},
	view(ctrl, args) {
		const isOpen = ctrl.open;
		const options = [];
		const { menu, menuKey } = args;
		// header
		options.push(
			<li class="option--header">
				{ lang.get('options') }
			</li>
		);
		if(menu){
			if(menu.header){
				const icon = menu.header.icon && (
					<i class={ `fa fa-${ menu.header.icon }` }></i>
				);
				const image = menu.header.image && (
					<i class="icon">
						<img src={ menu.header.image } />
					</i>
				);
				options.push(
					<li class="option--section">
						{ icon }
						{ image }
						{ lang.get(menu.header.title) }
					</li>
				);
			}
			if(menu.options && menu.options.length){
				for(const option of menu.options){
					const selected = menuKey && option.selected && option.selected(menuKey);
					const header = option.header;
					const icon = option.icon && (
						<i class={ `fa fa-${ option.icon }` }></i>
					);
					const image = option.image && (
						<i class="icon">
							<img src={ option.image } />
						</i>
					);
					const onClick = option.onclick &&
						both(ctrl.toggle, option.onclick) ||
						null;
					options.push(
						<li 
							class={ header? 'option--section': `option ${ selected? 'option--selected': '' }` }
							onclick={ onClick }
						>
							{ icon }
							{ image }
							{ lang.get(option.title) }
						</li>
					);
				}
			}
		}
		// languages
		options.push(
			<li class="option--section">
				<i class="fa fa-globe"></i>
				{ lang.get('language') }
			</li>
		);
		for(const id in lang.messages) {
			const selectLanguage = lang.change.bind(lang, id);
			options.push(
				<li 
					class={ `option ${ lang.current === id? 'option--selected': '' }` }
					onclick={ selectLanguage }
				>
					<i class="icon">
						<img src={ `images/lang/${ id }.png` } />
					</i>
					{ lang.messages[id].lang }
				</li>
			);
		}
		// share
		options.push(
			<li class="option--section">
				{ lang.get('share-to') }
			</li>
		);
		for(const id of [ 'google', 'facebook', 'twitter' ])
			options.push(
				<li class="option">
					{ lang.get(id) }
				</li>
			);
		return (
			<div class={ `menu ${ isOpen? 'menu--open': '' }` }>
				<div class="menu--background" onclick={ ctrl.toggle }></div>
				<div class="wrapper">
					<ul class="menu--options">
						{ options }
					</ul>
					<div class="menu--button" onclick={ ctrl.toggle }>
						<i class="fa fa-bars"></i>
					</div>
				</div>
			</div>
		);
	}
}

export default Menu;
