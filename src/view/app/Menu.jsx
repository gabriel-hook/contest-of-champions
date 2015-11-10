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
		const { menu } = args;

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
				options.push(
					<li class="option--section">
						{ icon }
						{ lang.get(menu.header.title) }
					</li>
				);
			}
			if(menu.options && menu.options.length){
				for(const option of menu.options){
					const icon = option.icon && (
						<i class={ `fa fa-${ option.icon }` }></i>
					);
					const onClick = option.onclick &&
						both(ctrl.toggle, option.onclick) ||
						null;
					options.push(
						<li 
							class={ `option ${ option.selected? 'option--selected': '' }` }
							onclick={ onClick }
						>
							{ icon }
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
					<img class="icon" src={ `images/lang/${ id }.png` } />
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
