/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(14);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(15);
	
	__webpack_require__(26);
	
	var _champions = __webpack_require__(35);
	
	var _app = __webpack_require__(38);
	
	var _app2 = _interopRequireDefault(_app);
	
	var _teams = __webpack_require__(39);
	
	var _teams2 = _interopRequireDefault(_teams);
	
	var _roster = __webpack_require__(40);
	
	var _roster2 = _interopRequireDefault(_roster);
	
	var _router = __webpack_require__(41);
	
	var _router2 = _interopRequireDefault(_router);
	
	var _App = __webpack_require__(43);
	
	var _App2 = _interopRequireDefault(_App);
	
	var _Card = __webpack_require__(58);
	
	var _Card2 = _interopRequireDefault(_Card);
	
	var _Guide = __webpack_require__(61);
	
	var _Guide2 = _interopRequireDefault(_Guide);
	
	var _Roster = __webpack_require__(73);
	
	var _Roster2 = _interopRequireDefault(_Roster);
	
	var _RosterAdd = __webpack_require__(79);
	
	var _RosterAdd2 = _interopRequireDefault(_RosterAdd);
	
	var _Teams = __webpack_require__(82);
	
	var _Teams2 = _interopRequireDefault(_Teams);
	
	var _Synergy = __webpack_require__(85);
	
	var _Synergy2 = _interopRequireDefault(_Synergy);
	
	var _mithril = __webpack_require__(53);
	
	var _mithril2 = _interopRequireDefault(_mithril);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_router2.default.on('/guide', function () {
		_router2.default.setRoute('/guide/' + _champions.uids[0]);
	});
	
	_router2.default.on('/guide/:uid', function (uid) {
		_app2.default.tab = 'guide';
		_app2.default.pages['guide'] = _mithril2.default.component(_Guide2.default, { uid: uid }, []);
		_app2.default.menu = _Guide.menu;
		_app2.default.menuKey = uid;
		_mithril2.default.redraw();
	});
	
	_router2.default.on('/roster', function () {
		_app2.default.tab = 'roster';
		_app2.default.pages['roster-main'] = _mithril2.default.component(_Roster2.default, {}, []);
		_app2.default.pages['roster'] = _mithril2.default.component(_Card2.default, {
			front: _app2.default.pages['roster-main'],
			back: _app2.default.pages['roster-add'],
			flipped: false
		}, []);
		_app2.default.menu = _Roster.menu;
		_app2.default.menuKey = null;
		_mithril2.default.redraw();
	});
	
	_router2.default.on('/roster/add/:stars', function (stars) {
		_app2.default.tab = 'roster';
		_app2.default.pages['roster-add'] = _mithril2.default.component(_RosterAdd2.default, { stars: parseInt(stars, 10) }, []);
		_app2.default.pages['roster'] = _mithril2.default.component(_Card2.default, {
			front: _app2.default.pages['roster-main'],
			back: _app2.default.pages['roster-add'],
			flipped: true
		}, []);
		_app2.default.menu = _RosterAdd.menu;
		_app2.default.menuKey = stars;
		_mithril2.default.redraw();
	});
	
	_router2.default.on('/roster/:uid/:stars', function (uid, stars) {
		_app2.default.tab = 'roster';
		_app2.default.pages['roster-main'] = _mithril2.default.component(_Roster2.default, { selected: { uid: uid, stars: parseInt(stars, 10) } }, []);
		_app2.default.pages['roster'] = _mithril2.default.component(_Card2.default, {
			front: _app2.default.pages['roster-main'],
			back: _app2.default.pages['roster-add'],
			flipped: false
		}, []);
		_app2.default.menu = _Roster.menu;
		_app2.default.menuKey = null;
		_mithril2.default.redraw();
	});
	
	_router2.default.on('/teams', function () {
		_app2.default.tab = 'teams';
		_app2.default.pages['teams'] = _mithril2.default.component(_Teams2.default, {}, []);
		_app2.default.menu = _Teams.menu;
		_app2.default.menuKey = _teams2.default;
		_mithril2.default.redraw();
	});
	
	_router2.default.on('/synergy', function () {
		_router2.default.setRoute('/synergy/' + 2);
	});
	
	_router2.default.on('/synergy/:stars', function (stars) {
		_app2.default.tab = 'synergy';
		_app2.default.pages['synergy'] = _mithril2.default.component(_Synergy2.default, { stars: parseInt(stars, 10) }, []);
		_app2.default.menu = _Synergy.menu;
		_app2.default.menuKey = stars;
		_mithril2.default.redraw();
	});
	
	_app2.default.tabs = [_Guide.tab, _Roster.tab, _Teams.tab, _Synergy.tab];
	
	_mithril2.default.mount(document.body, _mithril2.default.component(_App2.default, {}, []));
	_router2.default.init('/roster');
	document.addEventListener('hotreload', function () {
		_mithril2.default.redraw();
	});

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(16);


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(17);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(25)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./node_modules/css-loader/index.js!./../less-loader/index.js!./font-awesome-styles.loader.js!./font-awesome.config.js", function() {
				var newContent = require("!!./node_modules/css-loader/index.js!./../less-loader/index.js!./font-awesome-styles.loader.js!./font-awesome.config.js");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(18)();
	// imports
	
	
	// module
	exports.push([module.id, ".fa-border {\n  padding: .2em .25em .15em;\n  border: solid 0.08em #eee;\n  border-radius: .1em;\n}\n.fa-pull-left {\n  float: left;\n}\n.fa-pull-right {\n  float: right;\n}\n.fa.fa-pull-left {\n  margin-right: .3em;\n}\n.fa.fa-pull-right {\n  margin-left: .3em;\n}\n/* Deprecated as of 4.4.0 */\n.pull-right {\n  float: right;\n}\n.pull-left {\n  float: left;\n}\n.fa.pull-left {\n  margin-right: .3em;\n}\n.fa.pull-right {\n  margin-left: .3em;\n}\n.fa {\n  display: inline-block;\n  font: normal normal normal 14px/1 FontAwesome;\n  font-size: inherit;\n  text-rendering: auto;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n.fa-fw {\n  width: 1.28571429em;\n  text-align: center;\n}\n/* Font Awesome uses the Unicode Private Use Area (PUA) to ensure screen\n   readers do not read off random characters that represent icons */\n.fa-glass:before {\n  content: \"\\F000\";\n}\n.fa-music:before {\n  content: \"\\F001\";\n}\n.fa-search:before {\n  content: \"\\F002\";\n}\n.fa-envelope-o:before {\n  content: \"\\F003\";\n}\n.fa-heart:before {\n  content: \"\\F004\";\n}\n.fa-star:before {\n  content: \"\\F005\";\n}\n.fa-star-o:before {\n  content: \"\\F006\";\n}\n.fa-user:before {\n  content: \"\\F007\";\n}\n.fa-film:before {\n  content: \"\\F008\";\n}\n.fa-th-large:before {\n  content: \"\\F009\";\n}\n.fa-th:before {\n  content: \"\\F00A\";\n}\n.fa-th-list:before {\n  content: \"\\F00B\";\n}\n.fa-check:before {\n  content: \"\\F00C\";\n}\n.fa-remove:before,\n.fa-close:before,\n.fa-times:before {\n  content: \"\\F00D\";\n}\n.fa-search-plus:before {\n  content: \"\\F00E\";\n}\n.fa-search-minus:before {\n  content: \"\\F010\";\n}\n.fa-power-off:before {\n  content: \"\\F011\";\n}\n.fa-signal:before {\n  content: \"\\F012\";\n}\n.fa-gear:before,\n.fa-cog:before {\n  content: \"\\F013\";\n}\n.fa-trash-o:before {\n  content: \"\\F014\";\n}\n.fa-home:before {\n  content: \"\\F015\";\n}\n.fa-file-o:before {\n  content: \"\\F016\";\n}\n.fa-clock-o:before {\n  content: \"\\F017\";\n}\n.fa-road:before {\n  content: \"\\F018\";\n}\n.fa-download:before {\n  content: \"\\F019\";\n}\n.fa-arrow-circle-o-down:before {\n  content: \"\\F01A\";\n}\n.fa-arrow-circle-o-up:before {\n  content: \"\\F01B\";\n}\n.fa-inbox:before {\n  content: \"\\F01C\";\n}\n.fa-play-circle-o:before {\n  content: \"\\F01D\";\n}\n.fa-rotate-right:before,\n.fa-repeat:before {\n  content: \"\\F01E\";\n}\n.fa-refresh:before {\n  content: \"\\F021\";\n}\n.fa-list-alt:before {\n  content: \"\\F022\";\n}\n.fa-lock:before {\n  content: \"\\F023\";\n}\n.fa-flag:before {\n  content: \"\\F024\";\n}\n.fa-headphones:before {\n  content: \"\\F025\";\n}\n.fa-volume-off:before {\n  content: \"\\F026\";\n}\n.fa-volume-down:before {\n  content: \"\\F027\";\n}\n.fa-volume-up:before {\n  content: \"\\F028\";\n}\n.fa-qrcode:before {\n  content: \"\\F029\";\n}\n.fa-barcode:before {\n  content: \"\\F02A\";\n}\n.fa-tag:before {\n  content: \"\\F02B\";\n}\n.fa-tags:before {\n  content: \"\\F02C\";\n}\n.fa-book:before {\n  content: \"\\F02D\";\n}\n.fa-bookmark:before {\n  content: \"\\F02E\";\n}\n.fa-print:before {\n  content: \"\\F02F\";\n}\n.fa-camera:before {\n  content: \"\\F030\";\n}\n.fa-font:before {\n  content: \"\\F031\";\n}\n.fa-bold:before {\n  content: \"\\F032\";\n}\n.fa-italic:before {\n  content: \"\\F033\";\n}\n.fa-text-height:before {\n  content: \"\\F034\";\n}\n.fa-text-width:before {\n  content: \"\\F035\";\n}\n.fa-align-left:before {\n  content: \"\\F036\";\n}\n.fa-align-center:before {\n  content: \"\\F037\";\n}\n.fa-align-right:before {\n  content: \"\\F038\";\n}\n.fa-align-justify:before {\n  content: \"\\F039\";\n}\n.fa-list:before {\n  content: \"\\F03A\";\n}\n.fa-dedent:before,\n.fa-outdent:before {\n  content: \"\\F03B\";\n}\n.fa-indent:before {\n  content: \"\\F03C\";\n}\n.fa-video-camera:before {\n  content: \"\\F03D\";\n}\n.fa-photo:before,\n.fa-image:before,\n.fa-picture-o:before {\n  content: \"\\F03E\";\n}\n.fa-pencil:before {\n  content: \"\\F040\";\n}\n.fa-map-marker:before {\n  content: \"\\F041\";\n}\n.fa-adjust:before {\n  content: \"\\F042\";\n}\n.fa-tint:before {\n  content: \"\\F043\";\n}\n.fa-edit:before,\n.fa-pencil-square-o:before {\n  content: \"\\F044\";\n}\n.fa-share-square-o:before {\n  content: \"\\F045\";\n}\n.fa-check-square-o:before {\n  content: \"\\F046\";\n}\n.fa-arrows:before {\n  content: \"\\F047\";\n}\n.fa-step-backward:before {\n  content: \"\\F048\";\n}\n.fa-fast-backward:before {\n  content: \"\\F049\";\n}\n.fa-backward:before {\n  content: \"\\F04A\";\n}\n.fa-play:before {\n  content: \"\\F04B\";\n}\n.fa-pause:before {\n  content: \"\\F04C\";\n}\n.fa-stop:before {\n  content: \"\\F04D\";\n}\n.fa-forward:before {\n  content: \"\\F04E\";\n}\n.fa-fast-forward:before {\n  content: \"\\F050\";\n}\n.fa-step-forward:before {\n  content: \"\\F051\";\n}\n.fa-eject:before {\n  content: \"\\F052\";\n}\n.fa-chevron-left:before {\n  content: \"\\F053\";\n}\n.fa-chevron-right:before {\n  content: \"\\F054\";\n}\n.fa-plus-circle:before {\n  content: \"\\F055\";\n}\n.fa-minus-circle:before {\n  content: \"\\F056\";\n}\n.fa-times-circle:before {\n  content: \"\\F057\";\n}\n.fa-check-circle:before {\n  content: \"\\F058\";\n}\n.fa-question-circle:before {\n  content: \"\\F059\";\n}\n.fa-info-circle:before {\n  content: \"\\F05A\";\n}\n.fa-crosshairs:before {\n  content: \"\\F05B\";\n}\n.fa-times-circle-o:before {\n  content: \"\\F05C\";\n}\n.fa-check-circle-o:before {\n  content: \"\\F05D\";\n}\n.fa-ban:before {\n  content: \"\\F05E\";\n}\n.fa-arrow-left:before {\n  content: \"\\F060\";\n}\n.fa-arrow-right:before {\n  content: \"\\F061\";\n}\n.fa-arrow-up:before {\n  content: \"\\F062\";\n}\n.fa-arrow-down:before {\n  content: \"\\F063\";\n}\n.fa-mail-forward:before,\n.fa-share:before {\n  content: \"\\F064\";\n}\n.fa-expand:before {\n  content: \"\\F065\";\n}\n.fa-compress:before {\n  content: \"\\F066\";\n}\n.fa-plus:before {\n  content: \"\\F067\";\n}\n.fa-minus:before {\n  content: \"\\F068\";\n}\n.fa-asterisk:before {\n  content: \"\\F069\";\n}\n.fa-exclamation-circle:before {\n  content: \"\\F06A\";\n}\n.fa-gift:before {\n  content: \"\\F06B\";\n}\n.fa-leaf:before {\n  content: \"\\F06C\";\n}\n.fa-fire:before {\n  content: \"\\F06D\";\n}\n.fa-eye:before {\n  content: \"\\F06E\";\n}\n.fa-eye-slash:before {\n  content: \"\\F070\";\n}\n.fa-warning:before,\n.fa-exclamation-triangle:before {\n  content: \"\\F071\";\n}\n.fa-plane:before {\n  content: \"\\F072\";\n}\n.fa-calendar:before {\n  content: \"\\F073\";\n}\n.fa-random:before {\n  content: \"\\F074\";\n}\n.fa-comment:before {\n  content: \"\\F075\";\n}\n.fa-magnet:before {\n  content: \"\\F076\";\n}\n.fa-chevron-up:before {\n  content: \"\\F077\";\n}\n.fa-chevron-down:before {\n  content: \"\\F078\";\n}\n.fa-retweet:before {\n  content: \"\\F079\";\n}\n.fa-shopping-cart:before {\n  content: \"\\F07A\";\n}\n.fa-folder:before {\n  content: \"\\F07B\";\n}\n.fa-folder-open:before {\n  content: \"\\F07C\";\n}\n.fa-arrows-v:before {\n  content: \"\\F07D\";\n}\n.fa-arrows-h:before {\n  content: \"\\F07E\";\n}\n.fa-bar-chart-o:before,\n.fa-bar-chart:before {\n  content: \"\\F080\";\n}\n.fa-twitter-square:before {\n  content: \"\\F081\";\n}\n.fa-facebook-square:before {\n  content: \"\\F082\";\n}\n.fa-camera-retro:before {\n  content: \"\\F083\";\n}\n.fa-key:before {\n  content: \"\\F084\";\n}\n.fa-gears:before,\n.fa-cogs:before {\n  content: \"\\F085\";\n}\n.fa-comments:before {\n  content: \"\\F086\";\n}\n.fa-thumbs-o-up:before {\n  content: \"\\F087\";\n}\n.fa-thumbs-o-down:before {\n  content: \"\\F088\";\n}\n.fa-star-half:before {\n  content: \"\\F089\";\n}\n.fa-heart-o:before {\n  content: \"\\F08A\";\n}\n.fa-sign-out:before {\n  content: \"\\F08B\";\n}\n.fa-linkedin-square:before {\n  content: \"\\F08C\";\n}\n.fa-thumb-tack:before {\n  content: \"\\F08D\";\n}\n.fa-external-link:before {\n  content: \"\\F08E\";\n}\n.fa-sign-in:before {\n  content: \"\\F090\";\n}\n.fa-trophy:before {\n  content: \"\\F091\";\n}\n.fa-github-square:before {\n  content: \"\\F092\";\n}\n.fa-upload:before {\n  content: \"\\F093\";\n}\n.fa-lemon-o:before {\n  content: \"\\F094\";\n}\n.fa-phone:before {\n  content: \"\\F095\";\n}\n.fa-square-o:before {\n  content: \"\\F096\";\n}\n.fa-bookmark-o:before {\n  content: \"\\F097\";\n}\n.fa-phone-square:before {\n  content: \"\\F098\";\n}\n.fa-twitter:before {\n  content: \"\\F099\";\n}\n.fa-facebook-f:before,\n.fa-facebook:before {\n  content: \"\\F09A\";\n}\n.fa-github:before {\n  content: \"\\F09B\";\n}\n.fa-unlock:before {\n  content: \"\\F09C\";\n}\n.fa-credit-card:before {\n  content: \"\\F09D\";\n}\n.fa-feed:before,\n.fa-rss:before {\n  content: \"\\F09E\";\n}\n.fa-hdd-o:before {\n  content: \"\\F0A0\";\n}\n.fa-bullhorn:before {\n  content: \"\\F0A1\";\n}\n.fa-bell:before {\n  content: \"\\F0F3\";\n}\n.fa-certificate:before {\n  content: \"\\F0A3\";\n}\n.fa-hand-o-right:before {\n  content: \"\\F0A4\";\n}\n.fa-hand-o-left:before {\n  content: \"\\F0A5\";\n}\n.fa-hand-o-up:before {\n  content: \"\\F0A6\";\n}\n.fa-hand-o-down:before {\n  content: \"\\F0A7\";\n}\n.fa-arrow-circle-left:before {\n  content: \"\\F0A8\";\n}\n.fa-arrow-circle-right:before {\n  content: \"\\F0A9\";\n}\n.fa-arrow-circle-up:before {\n  content: \"\\F0AA\";\n}\n.fa-arrow-circle-down:before {\n  content: \"\\F0AB\";\n}\n.fa-globe:before {\n  content: \"\\F0AC\";\n}\n.fa-wrench:before {\n  content: \"\\F0AD\";\n}\n.fa-tasks:before {\n  content: \"\\F0AE\";\n}\n.fa-filter:before {\n  content: \"\\F0B0\";\n}\n.fa-briefcase:before {\n  content: \"\\F0B1\";\n}\n.fa-arrows-alt:before {\n  content: \"\\F0B2\";\n}\n.fa-group:before,\n.fa-users:before {\n  content: \"\\F0C0\";\n}\n.fa-chain:before,\n.fa-link:before {\n  content: \"\\F0C1\";\n}\n.fa-cloud:before {\n  content: \"\\F0C2\";\n}\n.fa-flask:before {\n  content: \"\\F0C3\";\n}\n.fa-cut:before,\n.fa-scissors:before {\n  content: \"\\F0C4\";\n}\n.fa-copy:before,\n.fa-files-o:before {\n  content: \"\\F0C5\";\n}\n.fa-paperclip:before {\n  content: \"\\F0C6\";\n}\n.fa-save:before,\n.fa-floppy-o:before {\n  content: \"\\F0C7\";\n}\n.fa-square:before {\n  content: \"\\F0C8\";\n}\n.fa-navicon:before,\n.fa-reorder:before,\n.fa-bars:before {\n  content: \"\\F0C9\";\n}\n.fa-list-ul:before {\n  content: \"\\F0CA\";\n}\n.fa-list-ol:before {\n  content: \"\\F0CB\";\n}\n.fa-strikethrough:before {\n  content: \"\\F0CC\";\n}\n.fa-underline:before {\n  content: \"\\F0CD\";\n}\n.fa-table:before {\n  content: \"\\F0CE\";\n}\n.fa-magic:before {\n  content: \"\\F0D0\";\n}\n.fa-truck:before {\n  content: \"\\F0D1\";\n}\n.fa-pinterest:before {\n  content: \"\\F0D2\";\n}\n.fa-pinterest-square:before {\n  content: \"\\F0D3\";\n}\n.fa-google-plus-square:before {\n  content: \"\\F0D4\";\n}\n.fa-google-plus:before {\n  content: \"\\F0D5\";\n}\n.fa-money:before {\n  content: \"\\F0D6\";\n}\n.fa-caret-down:before {\n  content: \"\\F0D7\";\n}\n.fa-caret-up:before {\n  content: \"\\F0D8\";\n}\n.fa-caret-left:before {\n  content: \"\\F0D9\";\n}\n.fa-caret-right:before {\n  content: \"\\F0DA\";\n}\n.fa-columns:before {\n  content: \"\\F0DB\";\n}\n.fa-unsorted:before,\n.fa-sort:before {\n  content: \"\\F0DC\";\n}\n.fa-sort-down:before,\n.fa-sort-desc:before {\n  content: \"\\F0DD\";\n}\n.fa-sort-up:before,\n.fa-sort-asc:before {\n  content: \"\\F0DE\";\n}\n.fa-envelope:before {\n  content: \"\\F0E0\";\n}\n.fa-linkedin:before {\n  content: \"\\F0E1\";\n}\n.fa-rotate-left:before,\n.fa-undo:before {\n  content: \"\\F0E2\";\n}\n.fa-legal:before,\n.fa-gavel:before {\n  content: \"\\F0E3\";\n}\n.fa-dashboard:before,\n.fa-tachometer:before {\n  content: \"\\F0E4\";\n}\n.fa-comment-o:before {\n  content: \"\\F0E5\";\n}\n.fa-comments-o:before {\n  content: \"\\F0E6\";\n}\n.fa-flash:before,\n.fa-bolt:before {\n  content: \"\\F0E7\";\n}\n.fa-sitemap:before {\n  content: \"\\F0E8\";\n}\n.fa-umbrella:before {\n  content: \"\\F0E9\";\n}\n.fa-paste:before,\n.fa-clipboard:before {\n  content: \"\\F0EA\";\n}\n.fa-lightbulb-o:before {\n  content: \"\\F0EB\";\n}\n.fa-exchange:before {\n  content: \"\\F0EC\";\n}\n.fa-cloud-download:before {\n  content: \"\\F0ED\";\n}\n.fa-cloud-upload:before {\n  content: \"\\F0EE\";\n}\n.fa-user-md:before {\n  content: \"\\F0F0\";\n}\n.fa-stethoscope:before {\n  content: \"\\F0F1\";\n}\n.fa-suitcase:before {\n  content: \"\\F0F2\";\n}\n.fa-bell-o:before {\n  content: \"\\F0A2\";\n}\n.fa-coffee:before {\n  content: \"\\F0F4\";\n}\n.fa-cutlery:before {\n  content: \"\\F0F5\";\n}\n.fa-file-text-o:before {\n  content: \"\\F0F6\";\n}\n.fa-building-o:before {\n  content: \"\\F0F7\";\n}\n.fa-hospital-o:before {\n  content: \"\\F0F8\";\n}\n.fa-ambulance:before {\n  content: \"\\F0F9\";\n}\n.fa-medkit:before {\n  content: \"\\F0FA\";\n}\n.fa-fighter-jet:before {\n  content: \"\\F0FB\";\n}\n.fa-beer:before {\n  content: \"\\F0FC\";\n}\n.fa-h-square:before {\n  content: \"\\F0FD\";\n}\n.fa-plus-square:before {\n  content: \"\\F0FE\";\n}\n.fa-angle-double-left:before {\n  content: \"\\F100\";\n}\n.fa-angle-double-right:before {\n  content: \"\\F101\";\n}\n.fa-angle-double-up:before {\n  content: \"\\F102\";\n}\n.fa-angle-double-down:before {\n  content: \"\\F103\";\n}\n.fa-angle-left:before {\n  content: \"\\F104\";\n}\n.fa-angle-right:before {\n  content: \"\\F105\";\n}\n.fa-angle-up:before {\n  content: \"\\F106\";\n}\n.fa-angle-down:before {\n  content: \"\\F107\";\n}\n.fa-desktop:before {\n  content: \"\\F108\";\n}\n.fa-laptop:before {\n  content: \"\\F109\";\n}\n.fa-tablet:before {\n  content: \"\\F10A\";\n}\n.fa-mobile-phone:before,\n.fa-mobile:before {\n  content: \"\\F10B\";\n}\n.fa-circle-o:before {\n  content: \"\\F10C\";\n}\n.fa-quote-left:before {\n  content: \"\\F10D\";\n}\n.fa-quote-right:before {\n  content: \"\\F10E\";\n}\n.fa-spinner:before {\n  content: \"\\F110\";\n}\n.fa-circle:before {\n  content: \"\\F111\";\n}\n.fa-mail-reply:before,\n.fa-reply:before {\n  content: \"\\F112\";\n}\n.fa-github-alt:before {\n  content: \"\\F113\";\n}\n.fa-folder-o:before {\n  content: \"\\F114\";\n}\n.fa-folder-open-o:before {\n  content: \"\\F115\";\n}\n.fa-smile-o:before {\n  content: \"\\F118\";\n}\n.fa-frown-o:before {\n  content: \"\\F119\";\n}\n.fa-meh-o:before {\n  content: \"\\F11A\";\n}\n.fa-gamepad:before {\n  content: \"\\F11B\";\n}\n.fa-keyboard-o:before {\n  content: \"\\F11C\";\n}\n.fa-flag-o:before {\n  content: \"\\F11D\";\n}\n.fa-flag-checkered:before {\n  content: \"\\F11E\";\n}\n.fa-terminal:before {\n  content: \"\\F120\";\n}\n.fa-code:before {\n  content: \"\\F121\";\n}\n.fa-mail-reply-all:before,\n.fa-reply-all:before {\n  content: \"\\F122\";\n}\n.fa-star-half-empty:before,\n.fa-star-half-full:before,\n.fa-star-half-o:before {\n  content: \"\\F123\";\n}\n.fa-location-arrow:before {\n  content: \"\\F124\";\n}\n.fa-crop:before {\n  content: \"\\F125\";\n}\n.fa-code-fork:before {\n  content: \"\\F126\";\n}\n.fa-unlink:before,\n.fa-chain-broken:before {\n  content: \"\\F127\";\n}\n.fa-question:before {\n  content: \"\\F128\";\n}\n.fa-info:before {\n  content: \"\\F129\";\n}\n.fa-exclamation:before {\n  content: \"\\F12A\";\n}\n.fa-superscript:before {\n  content: \"\\F12B\";\n}\n.fa-subscript:before {\n  content: \"\\F12C\";\n}\n.fa-eraser:before {\n  content: \"\\F12D\";\n}\n.fa-puzzle-piece:before {\n  content: \"\\F12E\";\n}\n.fa-microphone:before {\n  content: \"\\F130\";\n}\n.fa-microphone-slash:before {\n  content: \"\\F131\";\n}\n.fa-shield:before {\n  content: \"\\F132\";\n}\n.fa-calendar-o:before {\n  content: \"\\F133\";\n}\n.fa-fire-extinguisher:before {\n  content: \"\\F134\";\n}\n.fa-rocket:before {\n  content: \"\\F135\";\n}\n.fa-maxcdn:before {\n  content: \"\\F136\";\n}\n.fa-chevron-circle-left:before {\n  content: \"\\F137\";\n}\n.fa-chevron-circle-right:before {\n  content: \"\\F138\";\n}\n.fa-chevron-circle-up:before {\n  content: \"\\F139\";\n}\n.fa-chevron-circle-down:before {\n  content: \"\\F13A\";\n}\n.fa-html5:before {\n  content: \"\\F13B\";\n}\n.fa-css3:before {\n  content: \"\\F13C\";\n}\n.fa-anchor:before {\n  content: \"\\F13D\";\n}\n.fa-unlock-alt:before {\n  content: \"\\F13E\";\n}\n.fa-bullseye:before {\n  content: \"\\F140\";\n}\n.fa-ellipsis-h:before {\n  content: \"\\F141\";\n}\n.fa-ellipsis-v:before {\n  content: \"\\F142\";\n}\n.fa-rss-square:before {\n  content: \"\\F143\";\n}\n.fa-play-circle:before {\n  content: \"\\F144\";\n}\n.fa-ticket:before {\n  content: \"\\F145\";\n}\n.fa-minus-square:before {\n  content: \"\\F146\";\n}\n.fa-minus-square-o:before {\n  content: \"\\F147\";\n}\n.fa-level-up:before {\n  content: \"\\F148\";\n}\n.fa-level-down:before {\n  content: \"\\F149\";\n}\n.fa-check-square:before {\n  content: \"\\F14A\";\n}\n.fa-pencil-square:before {\n  content: \"\\F14B\";\n}\n.fa-external-link-square:before {\n  content: \"\\F14C\";\n}\n.fa-share-square:before {\n  content: \"\\F14D\";\n}\n.fa-compass:before {\n  content: \"\\F14E\";\n}\n.fa-toggle-down:before,\n.fa-caret-square-o-down:before {\n  content: \"\\F150\";\n}\n.fa-toggle-up:before,\n.fa-caret-square-o-up:before {\n  content: \"\\F151\";\n}\n.fa-toggle-right:before,\n.fa-caret-square-o-right:before {\n  content: \"\\F152\";\n}\n.fa-euro:before,\n.fa-eur:before {\n  content: \"\\F153\";\n}\n.fa-gbp:before {\n  content: \"\\F154\";\n}\n.fa-dollar:before,\n.fa-usd:before {\n  content: \"\\F155\";\n}\n.fa-rupee:before,\n.fa-inr:before {\n  content: \"\\F156\";\n}\n.fa-cny:before,\n.fa-rmb:before,\n.fa-yen:before,\n.fa-jpy:before {\n  content: \"\\F157\";\n}\n.fa-ruble:before,\n.fa-rouble:before,\n.fa-rub:before {\n  content: \"\\F158\";\n}\n.fa-won:before,\n.fa-krw:before {\n  content: \"\\F159\";\n}\n.fa-bitcoin:before,\n.fa-btc:before {\n  content: \"\\F15A\";\n}\n.fa-file:before {\n  content: \"\\F15B\";\n}\n.fa-file-text:before {\n  content: \"\\F15C\";\n}\n.fa-sort-alpha-asc:before {\n  content: \"\\F15D\";\n}\n.fa-sort-alpha-desc:before {\n  content: \"\\F15E\";\n}\n.fa-sort-amount-asc:before {\n  content: \"\\F160\";\n}\n.fa-sort-amount-desc:before {\n  content: \"\\F161\";\n}\n.fa-sort-numeric-asc:before {\n  content: \"\\F162\";\n}\n.fa-sort-numeric-desc:before {\n  content: \"\\F163\";\n}\n.fa-thumbs-up:before {\n  content: \"\\F164\";\n}\n.fa-thumbs-down:before {\n  content: \"\\F165\";\n}\n.fa-youtube-square:before {\n  content: \"\\F166\";\n}\n.fa-youtube:before {\n  content: \"\\F167\";\n}\n.fa-xing:before {\n  content: \"\\F168\";\n}\n.fa-xing-square:before {\n  content: \"\\F169\";\n}\n.fa-youtube-play:before {\n  content: \"\\F16A\";\n}\n.fa-dropbox:before {\n  content: \"\\F16B\";\n}\n.fa-stack-overflow:before {\n  content: \"\\F16C\";\n}\n.fa-instagram:before {\n  content: \"\\F16D\";\n}\n.fa-flickr:before {\n  content: \"\\F16E\";\n}\n.fa-adn:before {\n  content: \"\\F170\";\n}\n.fa-bitbucket:before {\n  content: \"\\F171\";\n}\n.fa-bitbucket-square:before {\n  content: \"\\F172\";\n}\n.fa-tumblr:before {\n  content: \"\\F173\";\n}\n.fa-tumblr-square:before {\n  content: \"\\F174\";\n}\n.fa-long-arrow-down:before {\n  content: \"\\F175\";\n}\n.fa-long-arrow-up:before {\n  content: \"\\F176\";\n}\n.fa-long-arrow-left:before {\n  content: \"\\F177\";\n}\n.fa-long-arrow-right:before {\n  content: \"\\F178\";\n}\n.fa-apple:before {\n  content: \"\\F179\";\n}\n.fa-windows:before {\n  content: \"\\F17A\";\n}\n.fa-android:before {\n  content: \"\\F17B\";\n}\n.fa-linux:before {\n  content: \"\\F17C\";\n}\n.fa-dribbble:before {\n  content: \"\\F17D\";\n}\n.fa-skype:before {\n  content: \"\\F17E\";\n}\n.fa-foursquare:before {\n  content: \"\\F180\";\n}\n.fa-trello:before {\n  content: \"\\F181\";\n}\n.fa-female:before {\n  content: \"\\F182\";\n}\n.fa-male:before {\n  content: \"\\F183\";\n}\n.fa-gittip:before,\n.fa-gratipay:before {\n  content: \"\\F184\";\n}\n.fa-sun-o:before {\n  content: \"\\F185\";\n}\n.fa-moon-o:before {\n  content: \"\\F186\";\n}\n.fa-archive:before {\n  content: \"\\F187\";\n}\n.fa-bug:before {\n  content: \"\\F188\";\n}\n.fa-vk:before {\n  content: \"\\F189\";\n}\n.fa-weibo:before {\n  content: \"\\F18A\";\n}\n.fa-renren:before {\n  content: \"\\F18B\";\n}\n.fa-pagelines:before {\n  content: \"\\F18C\";\n}\n.fa-stack-exchange:before {\n  content: \"\\F18D\";\n}\n.fa-arrow-circle-o-right:before {\n  content: \"\\F18E\";\n}\n.fa-arrow-circle-o-left:before {\n  content: \"\\F190\";\n}\n.fa-toggle-left:before,\n.fa-caret-square-o-left:before {\n  content: \"\\F191\";\n}\n.fa-dot-circle-o:before {\n  content: \"\\F192\";\n}\n.fa-wheelchair:before {\n  content: \"\\F193\";\n}\n.fa-vimeo-square:before {\n  content: \"\\F194\";\n}\n.fa-turkish-lira:before,\n.fa-try:before {\n  content: \"\\F195\";\n}\n.fa-plus-square-o:before {\n  content: \"\\F196\";\n}\n.fa-space-shuttle:before {\n  content: \"\\F197\";\n}\n.fa-slack:before {\n  content: \"\\F198\";\n}\n.fa-envelope-square:before {\n  content: \"\\F199\";\n}\n.fa-wordpress:before {\n  content: \"\\F19A\";\n}\n.fa-openid:before {\n  content: \"\\F19B\";\n}\n.fa-institution:before,\n.fa-bank:before,\n.fa-university:before {\n  content: \"\\F19C\";\n}\n.fa-mortar-board:before,\n.fa-graduation-cap:before {\n  content: \"\\F19D\";\n}\n.fa-yahoo:before {\n  content: \"\\F19E\";\n}\n.fa-google:before {\n  content: \"\\F1A0\";\n}\n.fa-reddit:before {\n  content: \"\\F1A1\";\n}\n.fa-reddit-square:before {\n  content: \"\\F1A2\";\n}\n.fa-stumbleupon-circle:before {\n  content: \"\\F1A3\";\n}\n.fa-stumbleupon:before {\n  content: \"\\F1A4\";\n}\n.fa-delicious:before {\n  content: \"\\F1A5\";\n}\n.fa-digg:before {\n  content: \"\\F1A6\";\n}\n.fa-pied-piper:before {\n  content: \"\\F1A7\";\n}\n.fa-pied-piper-alt:before {\n  content: \"\\F1A8\";\n}\n.fa-drupal:before {\n  content: \"\\F1A9\";\n}\n.fa-joomla:before {\n  content: \"\\F1AA\";\n}\n.fa-language:before {\n  content: \"\\F1AB\";\n}\n.fa-fax:before {\n  content: \"\\F1AC\";\n}\n.fa-building:before {\n  content: \"\\F1AD\";\n}\n.fa-child:before {\n  content: \"\\F1AE\";\n}\n.fa-paw:before {\n  content: \"\\F1B0\";\n}\n.fa-spoon:before {\n  content: \"\\F1B1\";\n}\n.fa-cube:before {\n  content: \"\\F1B2\";\n}\n.fa-cubes:before {\n  content: \"\\F1B3\";\n}\n.fa-behance:before {\n  content: \"\\F1B4\";\n}\n.fa-behance-square:before {\n  content: \"\\F1B5\";\n}\n.fa-steam:before {\n  content: \"\\F1B6\";\n}\n.fa-steam-square:before {\n  content: \"\\F1B7\";\n}\n.fa-recycle:before {\n  content: \"\\F1B8\";\n}\n.fa-automobile:before,\n.fa-car:before {\n  content: \"\\F1B9\";\n}\n.fa-cab:before,\n.fa-taxi:before {\n  content: \"\\F1BA\";\n}\n.fa-tree:before {\n  content: \"\\F1BB\";\n}\n.fa-spotify:before {\n  content: \"\\F1BC\";\n}\n.fa-deviantart:before {\n  content: \"\\F1BD\";\n}\n.fa-soundcloud:before {\n  content: \"\\F1BE\";\n}\n.fa-database:before {\n  content: \"\\F1C0\";\n}\n.fa-file-pdf-o:before {\n  content: \"\\F1C1\";\n}\n.fa-file-word-o:before {\n  content: \"\\F1C2\";\n}\n.fa-file-excel-o:before {\n  content: \"\\F1C3\";\n}\n.fa-file-powerpoint-o:before {\n  content: \"\\F1C4\";\n}\n.fa-file-photo-o:before,\n.fa-file-picture-o:before,\n.fa-file-image-o:before {\n  content: \"\\F1C5\";\n}\n.fa-file-zip-o:before,\n.fa-file-archive-o:before {\n  content: \"\\F1C6\";\n}\n.fa-file-sound-o:before,\n.fa-file-audio-o:before {\n  content: \"\\F1C7\";\n}\n.fa-file-movie-o:before,\n.fa-file-video-o:before {\n  content: \"\\F1C8\";\n}\n.fa-file-code-o:before {\n  content: \"\\F1C9\";\n}\n.fa-vine:before {\n  content: \"\\F1CA\";\n}\n.fa-codepen:before {\n  content: \"\\F1CB\";\n}\n.fa-jsfiddle:before {\n  content: \"\\F1CC\";\n}\n.fa-life-bouy:before,\n.fa-life-buoy:before,\n.fa-life-saver:before,\n.fa-support:before,\n.fa-life-ring:before {\n  content: \"\\F1CD\";\n}\n.fa-circle-o-notch:before {\n  content: \"\\F1CE\";\n}\n.fa-ra:before,\n.fa-rebel:before {\n  content: \"\\F1D0\";\n}\n.fa-ge:before,\n.fa-empire:before {\n  content: \"\\F1D1\";\n}\n.fa-git-square:before {\n  content: \"\\F1D2\";\n}\n.fa-git:before {\n  content: \"\\F1D3\";\n}\n.fa-y-combinator-square:before,\n.fa-yc-square:before,\n.fa-hacker-news:before {\n  content: \"\\F1D4\";\n}\n.fa-tencent-weibo:before {\n  content: \"\\F1D5\";\n}\n.fa-qq:before {\n  content: \"\\F1D6\";\n}\n.fa-wechat:before,\n.fa-weixin:before {\n  content: \"\\F1D7\";\n}\n.fa-send:before,\n.fa-paper-plane:before {\n  content: \"\\F1D8\";\n}\n.fa-send-o:before,\n.fa-paper-plane-o:before {\n  content: \"\\F1D9\";\n}\n.fa-history:before {\n  content: \"\\F1DA\";\n}\n.fa-circle-thin:before {\n  content: \"\\F1DB\";\n}\n.fa-header:before {\n  content: \"\\F1DC\";\n}\n.fa-paragraph:before {\n  content: \"\\F1DD\";\n}\n.fa-sliders:before {\n  content: \"\\F1DE\";\n}\n.fa-share-alt:before {\n  content: \"\\F1E0\";\n}\n.fa-share-alt-square:before {\n  content: \"\\F1E1\";\n}\n.fa-bomb:before {\n  content: \"\\F1E2\";\n}\n.fa-soccer-ball-o:before,\n.fa-futbol-o:before {\n  content: \"\\F1E3\";\n}\n.fa-tty:before {\n  content: \"\\F1E4\";\n}\n.fa-binoculars:before {\n  content: \"\\F1E5\";\n}\n.fa-plug:before {\n  content: \"\\F1E6\";\n}\n.fa-slideshare:before {\n  content: \"\\F1E7\";\n}\n.fa-twitch:before {\n  content: \"\\F1E8\";\n}\n.fa-yelp:before {\n  content: \"\\F1E9\";\n}\n.fa-newspaper-o:before {\n  content: \"\\F1EA\";\n}\n.fa-wifi:before {\n  content: \"\\F1EB\";\n}\n.fa-calculator:before {\n  content: \"\\F1EC\";\n}\n.fa-paypal:before {\n  content: \"\\F1ED\";\n}\n.fa-google-wallet:before {\n  content: \"\\F1EE\";\n}\n.fa-cc-visa:before {\n  content: \"\\F1F0\";\n}\n.fa-cc-mastercard:before {\n  content: \"\\F1F1\";\n}\n.fa-cc-discover:before {\n  content: \"\\F1F2\";\n}\n.fa-cc-amex:before {\n  content: \"\\F1F3\";\n}\n.fa-cc-paypal:before {\n  content: \"\\F1F4\";\n}\n.fa-cc-stripe:before {\n  content: \"\\F1F5\";\n}\n.fa-bell-slash:before {\n  content: \"\\F1F6\";\n}\n.fa-bell-slash-o:before {\n  content: \"\\F1F7\";\n}\n.fa-trash:before {\n  content: \"\\F1F8\";\n}\n.fa-copyright:before {\n  content: \"\\F1F9\";\n}\n.fa-at:before {\n  content: \"\\F1FA\";\n}\n.fa-eyedropper:before {\n  content: \"\\F1FB\";\n}\n.fa-paint-brush:before {\n  content: \"\\F1FC\";\n}\n.fa-birthday-cake:before {\n  content: \"\\F1FD\";\n}\n.fa-area-chart:before {\n  content: \"\\F1FE\";\n}\n.fa-pie-chart:before {\n  content: \"\\F200\";\n}\n.fa-line-chart:before {\n  content: \"\\F201\";\n}\n.fa-lastfm:before {\n  content: \"\\F202\";\n}\n.fa-lastfm-square:before {\n  content: \"\\F203\";\n}\n.fa-toggle-off:before {\n  content: \"\\F204\";\n}\n.fa-toggle-on:before {\n  content: \"\\F205\";\n}\n.fa-bicycle:before {\n  content: \"\\F206\";\n}\n.fa-bus:before {\n  content: \"\\F207\";\n}\n.fa-ioxhost:before {\n  content: \"\\F208\";\n}\n.fa-angellist:before {\n  content: \"\\F209\";\n}\n.fa-cc:before {\n  content: \"\\F20A\";\n}\n.fa-shekel:before,\n.fa-sheqel:before,\n.fa-ils:before {\n  content: \"\\F20B\";\n}\n.fa-meanpath:before {\n  content: \"\\F20C\";\n}\n.fa-buysellads:before {\n  content: \"\\F20D\";\n}\n.fa-connectdevelop:before {\n  content: \"\\F20E\";\n}\n.fa-dashcube:before {\n  content: \"\\F210\";\n}\n.fa-forumbee:before {\n  content: \"\\F211\";\n}\n.fa-leanpub:before {\n  content: \"\\F212\";\n}\n.fa-sellsy:before {\n  content: \"\\F213\";\n}\n.fa-shirtsinbulk:before {\n  content: \"\\F214\";\n}\n.fa-simplybuilt:before {\n  content: \"\\F215\";\n}\n.fa-skyatlas:before {\n  content: \"\\F216\";\n}\n.fa-cart-plus:before {\n  content: \"\\F217\";\n}\n.fa-cart-arrow-down:before {\n  content: \"\\F218\";\n}\n.fa-diamond:before {\n  content: \"\\F219\";\n}\n.fa-ship:before {\n  content: \"\\F21A\";\n}\n.fa-user-secret:before {\n  content: \"\\F21B\";\n}\n.fa-motorcycle:before {\n  content: \"\\F21C\";\n}\n.fa-street-view:before {\n  content: \"\\F21D\";\n}\n.fa-heartbeat:before {\n  content: \"\\F21E\";\n}\n.fa-venus:before {\n  content: \"\\F221\";\n}\n.fa-mars:before {\n  content: \"\\F222\";\n}\n.fa-mercury:before {\n  content: \"\\F223\";\n}\n.fa-intersex:before,\n.fa-transgender:before {\n  content: \"\\F224\";\n}\n.fa-transgender-alt:before {\n  content: \"\\F225\";\n}\n.fa-venus-double:before {\n  content: \"\\F226\";\n}\n.fa-mars-double:before {\n  content: \"\\F227\";\n}\n.fa-venus-mars:before {\n  content: \"\\F228\";\n}\n.fa-mars-stroke:before {\n  content: \"\\F229\";\n}\n.fa-mars-stroke-v:before {\n  content: \"\\F22A\";\n}\n.fa-mars-stroke-h:before {\n  content: \"\\F22B\";\n}\n.fa-neuter:before {\n  content: \"\\F22C\";\n}\n.fa-genderless:before {\n  content: \"\\F22D\";\n}\n.fa-facebook-official:before {\n  content: \"\\F230\";\n}\n.fa-pinterest-p:before {\n  content: \"\\F231\";\n}\n.fa-whatsapp:before {\n  content: \"\\F232\";\n}\n.fa-server:before {\n  content: \"\\F233\";\n}\n.fa-user-plus:before {\n  content: \"\\F234\";\n}\n.fa-user-times:before {\n  content: \"\\F235\";\n}\n.fa-hotel:before,\n.fa-bed:before {\n  content: \"\\F236\";\n}\n.fa-viacoin:before {\n  content: \"\\F237\";\n}\n.fa-train:before {\n  content: \"\\F238\";\n}\n.fa-subway:before {\n  content: \"\\F239\";\n}\n.fa-medium:before {\n  content: \"\\F23A\";\n}\n.fa-yc:before,\n.fa-y-combinator:before {\n  content: \"\\F23B\";\n}\n.fa-optin-monster:before {\n  content: \"\\F23C\";\n}\n.fa-opencart:before {\n  content: \"\\F23D\";\n}\n.fa-expeditedssl:before {\n  content: \"\\F23E\";\n}\n.fa-battery-4:before,\n.fa-battery-full:before {\n  content: \"\\F240\";\n}\n.fa-battery-3:before,\n.fa-battery-three-quarters:before {\n  content: \"\\F241\";\n}\n.fa-battery-2:before,\n.fa-battery-half:before {\n  content: \"\\F242\";\n}\n.fa-battery-1:before,\n.fa-battery-quarter:before {\n  content: \"\\F243\";\n}\n.fa-battery-0:before,\n.fa-battery-empty:before {\n  content: \"\\F244\";\n}\n.fa-mouse-pointer:before {\n  content: \"\\F245\";\n}\n.fa-i-cursor:before {\n  content: \"\\F246\";\n}\n.fa-object-group:before {\n  content: \"\\F247\";\n}\n.fa-object-ungroup:before {\n  content: \"\\F248\";\n}\n.fa-sticky-note:before {\n  content: \"\\F249\";\n}\n.fa-sticky-note-o:before {\n  content: \"\\F24A\";\n}\n.fa-cc-jcb:before {\n  content: \"\\F24B\";\n}\n.fa-cc-diners-club:before {\n  content: \"\\F24C\";\n}\n.fa-clone:before {\n  content: \"\\F24D\";\n}\n.fa-balance-scale:before {\n  content: \"\\F24E\";\n}\n.fa-hourglass-o:before {\n  content: \"\\F250\";\n}\n.fa-hourglass-1:before,\n.fa-hourglass-start:before {\n  content: \"\\F251\";\n}\n.fa-hourglass-2:before,\n.fa-hourglass-half:before {\n  content: \"\\F252\";\n}\n.fa-hourglass-3:before,\n.fa-hourglass-end:before {\n  content: \"\\F253\";\n}\n.fa-hourglass:before {\n  content: \"\\F254\";\n}\n.fa-hand-grab-o:before,\n.fa-hand-rock-o:before {\n  content: \"\\F255\";\n}\n.fa-hand-stop-o:before,\n.fa-hand-paper-o:before {\n  content: \"\\F256\";\n}\n.fa-hand-scissors-o:before {\n  content: \"\\F257\";\n}\n.fa-hand-lizard-o:before {\n  content: \"\\F258\";\n}\n.fa-hand-spock-o:before {\n  content: \"\\F259\";\n}\n.fa-hand-pointer-o:before {\n  content: \"\\F25A\";\n}\n.fa-hand-peace-o:before {\n  content: \"\\F25B\";\n}\n.fa-trademark:before {\n  content: \"\\F25C\";\n}\n.fa-registered:before {\n  content: \"\\F25D\";\n}\n.fa-creative-commons:before {\n  content: \"\\F25E\";\n}\n.fa-gg:before {\n  content: \"\\F260\";\n}\n.fa-gg-circle:before {\n  content: \"\\F261\";\n}\n.fa-tripadvisor:before {\n  content: \"\\F262\";\n}\n.fa-odnoklassniki:before {\n  content: \"\\F263\";\n}\n.fa-odnoklassniki-square:before {\n  content: \"\\F264\";\n}\n.fa-get-pocket:before {\n  content: \"\\F265\";\n}\n.fa-wikipedia-w:before {\n  content: \"\\F266\";\n}\n.fa-safari:before {\n  content: \"\\F267\";\n}\n.fa-chrome:before {\n  content: \"\\F268\";\n}\n.fa-firefox:before {\n  content: \"\\F269\";\n}\n.fa-opera:before {\n  content: \"\\F26A\";\n}\n.fa-internet-explorer:before {\n  content: \"\\F26B\";\n}\n.fa-tv:before,\n.fa-television:before {\n  content: \"\\F26C\";\n}\n.fa-contao:before {\n  content: \"\\F26D\";\n}\n.fa-500px:before {\n  content: \"\\F26E\";\n}\n.fa-amazon:before {\n  content: \"\\F270\";\n}\n.fa-calendar-plus-o:before {\n  content: \"\\F271\";\n}\n.fa-calendar-minus-o:before {\n  content: \"\\F272\";\n}\n.fa-calendar-times-o:before {\n  content: \"\\F273\";\n}\n.fa-calendar-check-o:before {\n  content: \"\\F274\";\n}\n.fa-industry:before {\n  content: \"\\F275\";\n}\n.fa-map-pin:before {\n  content: \"\\F276\";\n}\n.fa-map-signs:before {\n  content: \"\\F277\";\n}\n.fa-map-o:before {\n  content: \"\\F278\";\n}\n.fa-map:before {\n  content: \"\\F279\";\n}\n.fa-commenting:before {\n  content: \"\\F27A\";\n}\n.fa-commenting-o:before {\n  content: \"\\F27B\";\n}\n.fa-houzz:before {\n  content: \"\\F27C\";\n}\n.fa-vimeo:before {\n  content: \"\\F27D\";\n}\n.fa-black-tie:before {\n  content: \"\\F27E\";\n}\n.fa-fonticons:before {\n  content: \"\\F280\";\n}\n/* makes the font 33% larger relative to the icon container */\n.fa-lg {\n  font-size: 1.33333333em;\n  line-height: 0.75em;\n  vertical-align: -15%;\n}\n.fa-2x {\n  font-size: 2em;\n}\n.fa-3x {\n  font-size: 3em;\n}\n.fa-4x {\n  font-size: 4em;\n}\n.fa-5x {\n  font-size: 5em;\n}\n.fa-ul {\n  padding-left: 0;\n  margin-left: 2.14285714em;\n  list-style-type: none;\n}\n.fa-ul > li {\n  position: relative;\n}\n.fa-li {\n  position: absolute;\n  left: -2.14285714em;\n  width: 2.14285714em;\n  top: 0.14285714em;\n  text-align: center;\n}\n.fa-li.fa-lg {\n  left: -1.85714286em;\n}\n/* FONT PATH\n * -------------------------- */\n@font-face {\n  font-family: 'FontAwesome';\n  src: url(" + __webpack_require__(19) + ");\n  src: url(" + __webpack_require__(20) + "?#iefix&v=4.4.0) format('embedded-opentype'), url(" + __webpack_require__(21) + ") format('woff2'), url(" + __webpack_require__(22) + ") format('woff'), url(" + __webpack_require__(23) + ") format('truetype'), url(" + __webpack_require__(24) + "#fontawesomeregular) format('svg');\n  font-weight: normal;\n  font-style: normal;\n}\n.fa-rotate-90 {\n  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=1);\n  -webkit-transform: rotate(90deg);\n  -ms-transform: rotate(90deg);\n  transform: rotate(90deg);\n}\n.fa-rotate-180 {\n  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2);\n  -webkit-transform: rotate(180deg);\n  -ms-transform: rotate(180deg);\n  transform: rotate(180deg);\n}\n.fa-rotate-270 {\n  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);\n  -webkit-transform: rotate(270deg);\n  -ms-transform: rotate(270deg);\n  transform: rotate(270deg);\n}\n.fa-flip-horizontal {\n  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1);\n  -webkit-transform: scale(-1, 1);\n  -ms-transform: scale(-1, 1);\n  transform: scale(-1, 1);\n}\n.fa-flip-vertical {\n  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1);\n  -webkit-transform: scale(1, -1);\n  -ms-transform: scale(1, -1);\n  transform: scale(1, -1);\n}\n:root .fa-rotate-90,\n:root .fa-rotate-180,\n:root .fa-rotate-270,\n:root .fa-flip-horizontal,\n:root .fa-flip-vertical {\n  filter: none;\n}\n.fa-spin {\n  -webkit-animation: fa-spin 2s infinite linear;\n  animation: fa-spin 2s infinite linear;\n}\n.fa-pulse {\n  -webkit-animation: fa-spin 1s infinite steps(8);\n  animation: fa-spin 1s infinite steps(8);\n}\n@-webkit-keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(359deg);\n    transform: rotate(359deg);\n  }\n}\n@keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(359deg);\n    transform: rotate(359deg);\n  }\n}\n.fa-stack {\n  position: relative;\n  display: inline-block;\n  width: 2em;\n  height: 2em;\n  line-height: 2em;\n  vertical-align: middle;\n}\n.fa-stack-1x,\n.fa-stack-2x {\n  position: absolute;\n  left: 0;\n  width: 100%;\n  text-align: center;\n}\n.fa-stack-1x {\n  line-height: inherit;\n}\n.fa-stack-2x {\n  font-size: 2em;\n}\n.fa-inverse {\n  color: #fff;\n}\n", ""]);
	
	// exports


/***/ },
/* 18 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "fonts/fontawesome-webfont.eot"

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "fonts/fontawesome-webfont.eot"

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "fonts/fontawesome-webfont.woff2"

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "fonts/fontawesome-webfont.woff"

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "fonts/fontawesome-webfont.ttf"

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "fonts/fontawesome-webfont.svg"

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}
	
	function createLinkElement() {
		var linkElement = document.createElement("link");
		var head = getHeadElement();
		linkElement.rel = "stylesheet";
		head.appendChild(linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement();
			update = updateLink.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(27);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(34)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js!./index.scss", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js!./index.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(28)();
	// imports
	
	
	// module
	exports.push([module.id, "* {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none; }\n\nhtml, body {\n  margin: 0px;\n  padding: 0px; }\n\n@font-face {\n  font-family: Hanzel;\n  src: url(" + __webpack_require__(29) + ");\n  src: url(" + __webpack_require__(29) + "?#iefix) format(\"embedded-opentype\"), url(" + __webpack_require__(30) + ") format(\"woff2\"), url(" + __webpack_require__(31) + ") format(\"woff\"), url(" + __webpack_require__(32) + ") format(\"truetype\"), url(" + __webpack_require__(33) + "#hanzelnormal) format(\"svg\");\n  font-weight: normal;\n  font-style: normal; }\n", ""]);
	
	// exports


/***/ },
/* 28 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "fonts/hanzel-normal-webfont.eot"

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "fonts/hanzel-normal-webfont.woff2"

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "fonts/hanzel-normal-webfont.woff"

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "fonts/hanzel-normal-webfont.ttf"

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "fonts/hanzel-normal-webfont.svg"

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.uidsByType = exports.uids = undefined;
	
	var _Champion = __webpack_require__(36);
	
	var _Champion2 = _interopRequireDefault(_Champion);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var champions = [{ uid: 'blackbolt', typeId: 'cosmic', stars: 2 }, { uid: 'blackbolt', typeId: 'cosmic', stars: 3 }, { uid: 'blackbolt', typeId: 'cosmic', stars: 4 }, { uid: 'captainmarvel', typeId: 'cosmic', stars: 3 }, { uid: 'captainmarvel', typeId: 'cosmic', stars: 4 }, { uid: 'captainmarvel', typeId: 'cosmic', stars: 5 }, { uid: 'drax', typeId: 'cosmic', stars: 2 }, { uid: 'drax', typeId: 'cosmic', stars: 3 }, { uid: 'drax', typeId: 'cosmic', stars: 4 }, { uid: 'gamora', typeId: 'cosmic', stars: 1 }, { uid: 'gamora', typeId: 'cosmic', stars: 2 }, { uid: 'gamora', typeId: 'cosmic', stars: 3 }, { uid: 'gamora', typeId: 'cosmic', stars: 4 }, { uid: 'msmarvel', typeId: 'cosmic', stars: 3 }, { uid: 'msmarvel', typeId: 'cosmic', stars: 4 }, { uid: 'ronan', typeId: 'cosmic', stars: 2 }, { uid: 'ronan', typeId: 'cosmic', stars: 3 }, { uid: 'ronan', typeId: 'cosmic', stars: 4 }, { uid: 'ronan', typeId: 'cosmic', stars: 5 }, { uid: 'spidermanblack', typeId: 'cosmic', stars: 3 }, { uid: 'spidermanblack', typeId: 'cosmic', stars: 4 }, { uid: 'superiorironman', typeId: 'cosmic', stars: 2 }, { uid: 'superiorironman', typeId: 'cosmic', stars: 3 }, { uid: 'superiorironman', typeId: 'cosmic', stars: 4 }, { uid: 'thor', typeId: 'cosmic', stars: 2 }, { uid: 'thor', typeId: 'cosmic', stars: 3 }, { uid: 'thor', typeId: 'cosmic', stars: 4 }, { uid: 'thorjanefoster', typeId: 'cosmic', stars: 3 }, { uid: 'thorjanefoster', typeId: 'cosmic', stars: 4 }, { uid: 'venom', typeId: 'cosmic', stars: 3 }, { uid: 'venom', typeId: 'cosmic', stars: 4 }, { uid: 'venom', typeId: 'cosmic', stars: 5 }, { uid: 'ironman', typeId: 'tech', stars: 1 }, { uid: 'ironman', typeId: 'tech', stars: 2 }, { uid: 'ironman', typeId: 'tech', stars: 3 }, { uid: 'ironman', typeId: 'tech', stars: 4 }, { uid: 'ironman', typeId: 'tech', stars: 5 }, { uid: 'ironpatriot', typeId: 'tech', stars: 3 }, { uid: 'ironpatriot', typeId: 'tech', stars: 4 }, { uid: 'hulkbuster', typeId: 'tech', stars: 2 }, { uid: 'hulkbuster', typeId: 'tech', stars: 3 }, { uid: 'hulkbuster', typeId: 'tech', stars: 4 }, { uid: 'kang', typeId: 'tech', stars: 4 }, { uid: 'rocket', typeId: 'tech', stars: 3 }, { uid: 'rocket', typeId: 'tech', stars: 4 }, { uid: 'starlord', typeId: 'tech', stars: 2 }, { uid: 'starlord', typeId: 'tech', stars: 3 }, { uid: 'starlord', typeId: 'tech', stars: 4 }, { uid: 'starlord', typeId: 'tech', stars: 5 }, { uid: 'vision', typeId: 'tech', stars: 1 }, { uid: 'vision', typeId: 'tech', stars: 2 }, { uid: 'vision', typeId: 'tech', stars: 3 }, { uid: 'vision', typeId: 'tech', stars: 4 }, { uid: 'thevision', typeId: 'tech', stars: 2 }, { uid: 'thevision', typeId: 'tech', stars: 3 }, { uid: 'thevision', typeId: 'tech', stars: 4 }, { uid: 'ultron', typeId: 'tech', stars: 2 }, { uid: 'ultron', typeId: 'tech', stars: 3 }, { uid: 'ultron', typeId: 'tech', stars: 4 }, { uid: 'warmachine', typeId: 'tech', stars: 3 }, { uid: 'warmachine', typeId: 'tech', stars: 4 }, { uid: 'colossus', typeId: 'mutant', stars: 1 }, { uid: 'colossus', typeId: 'mutant', stars: 2 }, { uid: 'colossus', typeId: 'mutant', stars: 3 }, { uid: 'colossus', typeId: 'mutant', stars: 4 }, { uid: 'cyclops', typeId: 'mutant', stars: 2 }, { uid: 'cyclops', typeId: 'mutant', stars: 3 }, { uid: 'cyclops', typeId: 'mutant', stars: 4 }, { uid: 'cyclops', typeId: 'mutant', stars: 5 }, { uid: 'deadpool', typeId: 'mutant', stars: 2 }, { uid: 'deadpool', typeId: 'mutant', stars: 3 }, { uid: 'deadpool', typeId: 'mutant', stars: 4 }, { uid: 'deadpoolxforce', typeId: 'mutant', stars: 3 }, { uid: 'deadpoolxforce', typeId: 'mutant', stars: 4 }, { uid: 'magneto', typeId: 'mutant', stars: 2 }, { uid: 'magneto', typeId: 'mutant', stars: 3 }, { uid: 'magneto', typeId: 'mutant', stars: 4 }, { uid: 'magnetomarvelnow', typeId: 'mutant', stars: 3 }, { uid: 'magnetomarvelnow', typeId: 'mutant', stars: 4 }, { uid: 'storm', typeId: 'mutant', stars: 2 }, { uid: 'storm', typeId: 'mutant', stars: 3 }, { uid: 'storm', typeId: 'mutant', stars: 4 }, { uid: 'storm', typeId: 'mutant', stars: 5 }, { uid: 'wolverine', typeId: 'mutant', stars: 1 }, { uid: 'wolverine', typeId: 'mutant', stars: 2 }, { uid: 'wolverine', typeId: 'mutant', stars: 3 }, { uid: 'wolverine', typeId: 'mutant', stars: 4 }, { uid: 'blackpanther', typeId: 'skill', stars: 1 }, { uid: 'blackpanther', typeId: 'skill', stars: 2 }, { uid: 'blackpanther', typeId: 'skill', stars: 3 }, { uid: 'blackpanther', typeId: 'skill', stars: 4 }, { uid: 'blackpanther', typeId: 'skill', stars: 5 }, { uid: 'blackwidow', typeId: 'skill', stars: 2 }, { uid: 'blackwidow', typeId: 'skill', stars: 3 }, { uid: 'blackwidow', typeId: 'skill', stars: 4 }, { uid: 'daredevil', typeId: 'skill', stars: 3 }, { uid: 'daredevil', typeId: 'skill', stars: 4 }, { uid: 'daredevilnetflix', typeId: 'skill', stars: 3 }, { uid: 'daredevilnetflix', typeId: 'skill', stars: 4 }, { uid: 'elektra', typeId: 'skill', stars: 3 }, { uid: 'elektra', typeId: 'skill', stars: 4 }, { uid: 'hawkeye', typeId: 'skill', stars: 1 }, { uid: 'hawkeye', typeId: 'skill', stars: 2 }, { uid: 'hawkeye', typeId: 'skill', stars: 3 }, { uid: 'hawkeye', typeId: 'skill', stars: 4 }, { uid: 'moonknight', typeId: 'skill', stars: 3 }, { uid: 'moonknight', typeId: 'skill', stars: 4 }, { uid: 'punisher', typeId: 'skill', stars: 2 }, { uid: 'punisher', typeId: 'skill', stars: 3 }, { uid: 'punisher', typeId: 'skill', stars: 4 }, { uid: 'wintersoldier', typeId: 'skill', stars: 2 }, { uid: 'wintersoldier', typeId: 'skill', stars: 3 }, { uid: 'wintersoldier', typeId: 'skill', stars: 4 }, { uid: 'wintersoldier', typeId: 'skill', stars: 5 }, { uid: 'abomination', typeId: 'science', stars: 2 }, { uid: 'abomination', typeId: 'science', stars: 3 }, { uid: 'abomination', typeId: 'science', stars: 4 }, { uid: 'antman', typeId: 'science', stars: 2 }, { uid: 'antman', typeId: 'science', stars: 3 }, { uid: 'antman', typeId: 'science', stars: 4 }, { uid: 'captainamerica', typeId: 'science', stars: 2 }, { uid: 'captainamerica', typeId: 'science', stars: 3 }, { uid: 'captainamerica', typeId: 'science', stars: 4 }, { uid: 'captainamericawwii', typeId: 'science', stars: 3 }, { uid: 'captainamericawwii', typeId: 'science', stars: 4 }, { uid: 'electro', typeId: 'science', stars: 3 }, { uid: 'electro', typeId: 'science', stars: 4 }, { uid: 'hulk', typeId: 'science', stars: 1 }, { uid: 'hulk', typeId: 'science', stars: 2 }, { uid: 'hulk', typeId: 'science', stars: 3 }, { uid: 'hulk', typeId: 'science', stars: 4 }, { uid: 'joefixit', typeId: 'science', stars: 3 }, { uid: 'joefixit', typeId: 'science', stars: 4 }, { uid: 'rhino', typeId: 'science', stars: 2 }, { uid: 'rhino', typeId: 'science', stars: 3 }, { uid: 'rhino', typeId: 'science', stars: 4 }, { uid: 'rhino', typeId: 'science', stars: 5 }, { uid: 'spidergwen', typeId: 'science', stars: 3 }, { uid: 'spidergwen', typeId: 'science', stars: 4 }, { uid: 'spiderman', typeId: 'science', stars: 1 }, { uid: 'spiderman', typeId: 'science', stars: 2 }, { uid: 'spiderman', typeId: 'science', stars: 3 }, { uid: 'spiderman', typeId: 'science', stars: 4 }, { uid: 'spiderman', typeId: 'science', stars: 5 }, { uid: 'spidermanmorales', typeId: 'science', stars: 3 }, { uid: 'spidermanmorales', typeId: 'science', stars: 4 }, { uid: 'yellowjacket', typeId: 'science', stars: 2 }, { uid: 'yellowjacket', typeId: 'science', stars: 3 }, { uid: 'yellowjacket', typeId: 'science', stars: 4 }, { uid: 'drstrange', typeId: 'mystic', stars: 3 }, { uid: 'drstrange', typeId: 'mystic', stars: 4 }, { uid: 'guillotine', typeId: 'mystic', stars: 2 }, { uid: 'guillotine', typeId: 'mystic', stars: 3 }, { uid: 'guillotine', typeId: 'mystic', stars: 4 }, { uid: 'ironfist', typeId: 'mystic', stars: 2 }, { uid: 'ironfist', typeId: 'mystic', stars: 3 }, { uid: 'ironfist', typeId: 'mystic', stars: 4 }, { uid: 'juggernaut', typeId: 'mystic', stars: 1 }, { uid: 'juggernaut', typeId: 'mystic', stars: 2 }, { uid: 'juggernaut', typeId: 'mystic', stars: 3 }, { uid: 'juggernaut', typeId: 'mystic', stars: 4 }, { uid: 'juggernaut', typeId: 'mystic', stars: 5 }, { uid: 'magik', typeId: 'mystic', stars: 2 }, { uid: 'magik', typeId: 'mystic', stars: 3 }, { uid: 'magik', typeId: 'mystic', stars: 4 }, { uid: 'magik', typeId: 'mystic', stars: 5 }, { uid: 'scarletwitch', typeId: 'mystic', stars: 1 }, { uid: 'scarletwitch', typeId: 'mystic', stars: 2 }, { uid: 'scarletwitch', typeId: 'mystic', stars: 3 }, { uid: 'scarletwitch', typeId: 'mystic', stars: 4 }, { uid: 'unstoppablecolossus', typeId: 'mystic', stars: 2 }, { uid: 'unstoppablecolossus', typeId: 'mystic', stars: 3 }, { uid: 'unstoppablecolossus', typeId: 'mystic', stars: 4 }].map(function (champion) {
		return new _Champion2.default(champion);
	});
	
	var uids = [].concat(_toConsumableArray(new Set(champions.map(function (champion) {
		return champion.attr.uid;
	}))));
	
	var uidsByType = [];
	champions.forEach(function (champion) {
		var _champion$attr = champion.attr;
		var uid = _champion$attr.uid;
		var typeId = _champion$attr.typeId;
	
		var currentTypeId = uidsByType.length && uidsByType[uidsByType.length - 1].typeId;
		if (currentTypeId != typeId) uidsByType.push({
			typeId: typeId,
			uids: []
		});
		var uids = uidsByType[uidsByType.length - 1].uids;
		if (uids[uids.length - 1] !== uid) uids.push(uid);
	});
	
	exports.default = champions;
	exports.uids = uids;
	exports.uidsByType = uidsByType;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _Model2 = __webpack_require__(37);
	
	var _Model3 = _interopRequireDefault(_Model2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Champion = (function (_Model) {
		_inherits(Champion, _Model);
	
		function Champion(_ref) {
			var uid = _ref.uid;
			var stars = _ref.stars;
			var typeId = _ref.typeId;
			var pi = _ref.pi;
	
			_classCallCheck(this, Champion);
	
			return _possibleConstructorReturn(this, Object.getPrototypeOf(Champion).call(this, {
				uid: 'champion-uid',
				stars: 1,
				typeId: 'mutant',
				pi: 0
			}, {
				uid: uid,
				stars: stars,
				typeId: typeId,
				pi: pi
			}));
		}
	
		_createClass(Champion, [{
			key: 'id',
			value: function id() {
				return this.attr.uid + '-' + this.attr.stars;
			}
		}]);
	
		return Champion;
	})(_Model3.default);
	
	exports.default = Champion;

/***/ },
/* 37 */
/***/ function(module, exports) {

	"use strict";
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Model = (function () {
		function Model() {
			var defaults = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
			var definition = arguments[1];
	
			_classCallCheck(this, Model);
	
			this.attr = _extends({}, defaults, definition);
		}
	
		_createClass(Model, [{
			key: "set",
			value: function set(key, value) {
				this.attr[key] = value;
			}
		}, {
			key: "get",
			value: function get(key) {
				return this.attr[key];
			}
		}, {
			key: "toJSON",
			value: function toJSON() {
				return this.attr;
			}
		}]);
	
		return Model;
	})();
	
	exports.default = Model;

/***/ },
/* 38 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var app = {
		pages: {}
	};
	
	exports.default = app;

/***/ },
/* 39 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var teams = {
		type: 'arena',
		size: 3,
		stars: {
			1: false,
			2: true,
			3: true,
			4: false,
			5: false
		}
	};
	
	exports.default = teams;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _Champion = __webpack_require__(36);
	
	var _Champion2 = _interopRequireDefault(_Champion);
	
	var _champions = __webpack_require__(35);
	
	var _champions2 = _interopRequireDefault(_champions);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function fromStorage(id) {
		var array = [];
		if (localStorage) {
			var string = localStorage.getItem('roster');
			array = JSON.parse(string) || [];
			array = array.map(function (champion) {
				return new _Champion2.default(champion);
			});
		}
		return array;
	}
	
	function toStorage(id, object) {
		if (localStorage) {
			localStorage.setItem('roster', JSON.stringify(object));
		}
	}
	
	var rosterMap = undefined;
	var roster = fromStorage('roster');
	
	function all() {
		return roster.slice();
	}
	
	function filter(filter) {
		return roster.slice();
	}
	
	function available(stars) {
		var available = _champions2.default.filter(function (champion) {
			return champion.attr.stars === stars && !rosterMap[champion.id()];
		});
		return available;
	}
	
	function update() {
		rosterMap = {};
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;
	
		try {
			for (var _iterator = roster[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var champion = _step.value;
	
				rosterMap[champion.id()] = true;
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}
	}
	
	function addAll(stars) {
		var champions = available(stars);
		var _iteratorNormalCompletion2 = true;
		var _didIteratorError2 = false;
		var _iteratorError2 = undefined;
	
		try {
			for (var _iterator2 = champions[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
				var champion = _step2.value;
	
				roster.push(new _Champion2.default(_extends({}, champion.attr)));
			}
		} catch (err) {
			_didIteratorError2 = true;
			_iteratorError2 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion2 && _iterator2.return) {
					_iterator2.return();
				}
			} finally {
				if (_didIteratorError2) {
					throw _iteratorError2;
				}
			}
		}
	
		toStorage('roster', roster);
		update();
	}
	
	function add(uid, stars) {
		var champion = _champions2.default.find(function (champion) {
			return champion.attr.uid === uid && champion.attr.stars === stars;
		});
		if (rosterMap[champion.id()]) return;
		roster.push(new _Champion2.default(_extends({}, champion.attr)));
		toStorage('roster', roster);
		update();
	}
	
	function remove(uid, stars) {
		var champion = roster.find(function (champion) {
			return champion.attr.uid === uid && champion.attr.stars === stars;
		});
		if (champion) {
			var index = roster.indexOf(champion);
			if (index) {
				roster.splice(index, 1);
				toStorage('roster', roster);
			}
		}
		update();
	}
	
	function clear() {
		roster = [];
		toStorage('roster', roster);
		update();
	}
	
	update();
	exports.default = {
		all: all,
		filter: filter,
		available: available,
		add: add,
		addAll: addAll,
		remove: remove,
		clear: clear
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _director = __webpack_require__(42);
	
	exports.default = new _director.Router();

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	
	
	//
	// Generated on Tue Dec 16 2014 12:13:47 GMT+0100 (CET) by Charlie Robbins, Paolo Fragomeni & the Contributors (Using Codesurgeon).
	// Version 1.2.6
	//
	
	(function (exports) {
	
	/*
	 * browser.js: Browser specific functionality for director.
	 *
	 * (C) 2011, Charlie Robbins, Paolo Fragomeni, & the Contributors.
	 * MIT LICENSE
	 *
	 */
	
	var dloc = document.location;
	
	function dlocHashEmpty() {
	  // Non-IE browsers return '' when the address bar shows '#'; Director's logic
	  // assumes both mean empty.
	  return dloc.hash === '' || dloc.hash === '#';
	}
	
	var listener = {
	  mode: 'modern',
	  hash: dloc.hash,
	  history: false,
	
	  check: function () {
	    var h = dloc.hash;
	    if (h != this.hash) {
	      this.hash = h;
	      this.onHashChanged();
	    }
	  },
	
	  fire: function () {
	    if (this.mode === 'modern') {
	      this.history === true ? window.onpopstate() : window.onhashchange();
	    }
	    else {
	      this.onHashChanged();
	    }
	  },
	
	  init: function (fn, history) {
	    var self = this;
	    this.history = history;
	
	    if (!Router.listeners) {
	      Router.listeners = [];
	    }
	
	    function onchange(onChangeEvent) {
	      for (var i = 0, l = Router.listeners.length; i < l; i++) {
	        Router.listeners[i](onChangeEvent);
	      }
	    }
	
	    //note IE8 is being counted as 'modern' because it has the hashchange event
	    if ('onhashchange' in window && (document.documentMode === undefined
	      || document.documentMode > 7)) {
	      // At least for now HTML5 history is available for 'modern' browsers only
	      if (this.history === true) {
	        // There is an old bug in Chrome that causes onpopstate to fire even
	        // upon initial page load. Since the handler is run manually in init(),
	        // this would cause Chrome to run it twise. Currently the only
	        // workaround seems to be to set the handler after the initial page load
	        // http://code.google.com/p/chromium/issues/detail?id=63040
	        setTimeout(function() {
	          window.onpopstate = onchange;
	        }, 500);
	      }
	      else {
	        window.onhashchange = onchange;
	      }
	      this.mode = 'modern';
	    }
	    else {
	      //
	      // IE support, based on a concept by Erik Arvidson ...
	      //
	      var frame = document.createElement('iframe');
	      frame.id = 'state-frame';
	      frame.style.display = 'none';
	      document.body.appendChild(frame);
	      this.writeFrame('');
	
	      if ('onpropertychange' in document && 'attachEvent' in document) {
	        document.attachEvent('onpropertychange', function () {
	          if (event.propertyName === 'location') {
	            self.check();
	          }
	        });
	      }
	
	      window.setInterval(function () { self.check(); }, 50);
	
	      this.onHashChanged = onchange;
	      this.mode = 'legacy';
	    }
	
	    Router.listeners.push(fn);
	
	    return this.mode;
	  },
	
	  destroy: function (fn) {
	    if (!Router || !Router.listeners) {
	      return;
	    }
	
	    var listeners = Router.listeners;
	
	    for (var i = listeners.length - 1; i >= 0; i--) {
	      if (listeners[i] === fn) {
	        listeners.splice(i, 1);
	      }
	    }
	  },
	
	  setHash: function (s) {
	    // Mozilla always adds an entry to the history
	    if (this.mode === 'legacy') {
	      this.writeFrame(s);
	    }
	
	    if (this.history === true) {
	      window.history.pushState({}, document.title, s);
	      // Fire an onpopstate event manually since pushing does not obviously
	      // trigger the pop event.
	      this.fire();
	    } else {
	      dloc.hash = (s[0] === '/') ? s : '/' + s;
	    }
	    return this;
	  },
	
	  writeFrame: function (s) {
	    // IE support...
	    var f = document.getElementById('state-frame');
	    var d = f.contentDocument || f.contentWindow.document;
	    d.open();
	    d.write("<script>_hash = '" + s + "'; onload = parent.listener.syncHash;<script>");
	    d.close();
	  },
	
	  syncHash: function () {
	    // IE support...
	    var s = this._hash;
	    if (s != dloc.hash) {
	      dloc.hash = s;
	    }
	    return this;
	  },
	
	  onHashChanged: function () {}
	};
	
	var Router = exports.Router = function (routes) {
	  if (!(this instanceof Router)) return new Router(routes);
	
	  this.params   = {};
	  this.routes   = {};
	  this.methods  = ['on', 'once', 'after', 'before'];
	  this.scope    = [];
	  this._methods = {};
	
	  this._insert = this.insert;
	  this.insert = this.insertEx;
	
	  this.historySupport = (window.history != null ? window.history.pushState : null) != null
	
	  this.configure();
	  this.mount(routes || {});
	};
	
	Router.prototype.init = function (r) {
	  var self = this
	    , routeTo;
	  this.handler = function(onChangeEvent) {
	    var newURL = onChangeEvent && onChangeEvent.newURL || window.location.hash;
	    var url = self.history === true ? self.getPath() : newURL.replace(/.*#/, '');
	    self.dispatch('on', url.charAt(0) === '/' ? url : '/' + url);
	  };
	
	  listener.init(this.handler, this.history);
	
	  if (this.history === false) {
	    if (dlocHashEmpty() && r) {
	      dloc.hash = r;
	    } else if (!dlocHashEmpty()) {
	      self.dispatch('on', '/' + dloc.hash.replace(/^(#\/|#|\/)/, ''));
	    }
	  }
	  else {
	    if (this.convert_hash_in_init) {
	      // Use hash as route
	      routeTo = dlocHashEmpty() && r ? r : !dlocHashEmpty() ? dloc.hash.replace(/^#/, '') : null;
	      if (routeTo) {
	        window.history.replaceState({}, document.title, routeTo);
	      }
	    }
	    else {
	      // Use canonical url
	      routeTo = this.getPath();
	    }
	
	    // Router has been initialized, but due to the chrome bug it will not
	    // yet actually route HTML5 history state changes. Thus, decide if should route.
	    if (routeTo || this.run_in_init === true) {
	      this.handler();
	    }
	  }
	
	  return this;
	};
	
	Router.prototype.explode = function () {
	  var v = this.history === true ? this.getPath() : dloc.hash;
	  if (v.charAt(1) === '/') { v=v.slice(1) }
	  return v.slice(1, v.length).split("/");
	};
	
	Router.prototype.setRoute = function (i, v, val) {
	  var url = this.explode();
	
	  if (typeof i === 'number' && typeof v === 'string') {
	    url[i] = v;
	  }
	  else if (typeof val === 'string') {
	    url.splice(i, v, s);
	  }
	  else {
	    url = [i];
	  }
	
	  listener.setHash(url.join('/'));
	  return url;
	};
	
	//
	// ### function insertEx(method, path, route, parent)
	// #### @method {string} Method to insert the specific `route`.
	// #### @path {Array} Parsed path to insert the `route` at.
	// #### @route {Array|function} Route handlers to insert.
	// #### @parent {Object} **Optional** Parent "routes" to insert into.
	// insert a callback that will only occur once per the matched route.
	//
	Router.prototype.insertEx = function(method, path, route, parent) {
	  if (method === "once") {
	    method = "on";
	    route = function(route) {
	      var once = false;
	      return function() {
	        if (once) return;
	        once = true;
	        return route.apply(this, arguments);
	      };
	    }(route);
	  }
	  return this._insert(method, path, route, parent);
	};
	
	Router.prototype.getRoute = function (v) {
	  var ret = v;
	
	  if (typeof v === "number") {
	    ret = this.explode()[v];
	  }
	  else if (typeof v === "string"){
	    var h = this.explode();
	    ret = h.indexOf(v);
	  }
	  else {
	    ret = this.explode();
	  }
	
	  return ret;
	};
	
	Router.prototype.destroy = function () {
	  listener.destroy(this.handler);
	  return this;
	};
	
	Router.prototype.getPath = function () {
	  var path = window.location.pathname;
	  if (path.substr(0, 1) !== '/') {
	    path = '/' + path;
	  }
	  return path;
	};
	function _every(arr, iterator) {
	  for (var i = 0; i < arr.length; i += 1) {
	    if (iterator(arr[i], i, arr) === false) {
	      return;
	    }
	  }
	}
	
	function _flatten(arr) {
	  var flat = [];
	  for (var i = 0, n = arr.length; i < n; i++) {
	    flat = flat.concat(arr[i]);
	  }
	  return flat;
	}
	
	function _asyncEverySeries(arr, iterator, callback) {
	  if (!arr.length) {
	    return callback();
	  }
	  var completed = 0;
	  (function iterate() {
	    iterator(arr[completed], function(err) {
	      if (err || err === false) {
	        callback(err);
	        callback = function() {};
	      } else {
	        completed += 1;
	        if (completed === arr.length) {
	          callback();
	        } else {
	          iterate();
	        }
	      }
	    });
	  })();
	}
	
	function paramifyString(str, params, mod) {
	  mod = str;
	  for (var param in params) {
	    if (params.hasOwnProperty(param)) {
	      mod = params[param](str);
	      if (mod !== str) {
	        break;
	      }
	    }
	  }
	  return mod === str ? "([._a-zA-Z0-9-%()]+)" : mod;
	}
	
	function regifyString(str, params) {
	  var matches, last = 0, out = "";
	  while (matches = str.substr(last).match(/[^\w\d\- %@&]*\*[^\w\d\- %@&]*/)) {
	    last = matches.index + matches[0].length;
	    matches[0] = matches[0].replace(/^\*/, "([_.()!\\ %@&a-zA-Z0-9-]+)");
	    out += str.substr(0, matches.index) + matches[0];
	  }
	  str = out += str.substr(last);
	  var captures = str.match(/:([^\/]+)/ig), capture, length;
	  if (captures) {
	    length = captures.length;
	    for (var i = 0; i < length; i++) {
	      capture = captures[i];
	      if (capture.slice(0, 2) === "::") {
	        str = capture.slice(1);
	      } else {
	        str = str.replace(capture, paramifyString(capture, params));
	      }
	    }
	  }
	  return str;
	}
	
	function terminator(routes, delimiter, start, stop) {
	  var last = 0, left = 0, right = 0, start = (start || "(").toString(), stop = (stop || ")").toString(), i;
	  for (i = 0; i < routes.length; i++) {
	    var chunk = routes[i];
	    if (chunk.indexOf(start, last) > chunk.indexOf(stop, last) || ~chunk.indexOf(start, last) && !~chunk.indexOf(stop, last) || !~chunk.indexOf(start, last) && ~chunk.indexOf(stop, last)) {
	      left = chunk.indexOf(start, last);
	      right = chunk.indexOf(stop, last);
	      if (~left && !~right || !~left && ~right) {
	        var tmp = routes.slice(0, (i || 1) + 1).join(delimiter);
	        routes = [ tmp ].concat(routes.slice((i || 1) + 1));
	      }
	      last = (right > left ? right : left) + 1;
	      i = 0;
	    } else {
	      last = 0;
	    }
	  }
	  return routes;
	}
	
	var QUERY_SEPARATOR = /\?.*/;
	
	Router.prototype.configure = function(options) {
	  options = options || {};
	  for (var i = 0; i < this.methods.length; i++) {
	    this._methods[this.methods[i]] = true;
	  }
	  this.recurse = options.recurse || this.recurse || false;
	  this.async = options.async || false;
	  this.delimiter = options.delimiter || "/";
	  this.strict = typeof options.strict === "undefined" ? true : options.strict;
	  this.notfound = options.notfound;
	  this.resource = options.resource;
	  this.history = options.html5history && this.historySupport || false;
	  this.run_in_init = this.history === true && options.run_handler_in_init !== false;
	  this.convert_hash_in_init = this.history === true && options.convert_hash_in_init !== false;
	  this.every = {
	    after: options.after || null,
	    before: options.before || null,
	    on: options.on || null
	  };
	  return this;
	};
	
	Router.prototype.param = function(token, matcher) {
	  if (token[0] !== ":") {
	    token = ":" + token;
	  }
	  var compiled = new RegExp(token, "g");
	  this.params[token] = function(str) {
	    return str.replace(compiled, matcher.source || matcher);
	  };
	  return this;
	};
	
	Router.prototype.on = Router.prototype.route = function(method, path, route) {
	  var self = this;
	  if (!route && typeof path == "function") {
	    route = path;
	    path = method;
	    method = "on";
	  }
	  if (Array.isArray(path)) {
	    return path.forEach(function(p) {
	      self.on(method, p, route);
	    });
	  }
	  if (path.source) {
	    path = path.source.replace(/\\\//ig, "/");
	  }
	  if (Array.isArray(method)) {
	    return method.forEach(function(m) {
	      self.on(m.toLowerCase(), path, route);
	    });
	  }
	  path = path.split(new RegExp(this.delimiter));
	  path = terminator(path, this.delimiter);
	  this.insert(method, this.scope.concat(path), route);
	};
	
	Router.prototype.path = function(path, routesFn) {
	  var self = this, length = this.scope.length;
	  if (path.source) {
	    path = path.source.replace(/\\\//ig, "/");
	  }
	  path = path.split(new RegExp(this.delimiter));
	  path = terminator(path, this.delimiter);
	  this.scope = this.scope.concat(path);
	  routesFn.call(this, this);
	  this.scope.splice(length, path.length);
	};
	
	Router.prototype.dispatch = function(method, path, callback) {
	  var self = this, fns = this.traverse(method, path.replace(QUERY_SEPARATOR, ""), this.routes, ""), invoked = this._invoked, after;
	  this._invoked = true;
	  if (!fns || fns.length === 0) {
	    this.last = [];
	    if (typeof this.notfound === "function") {
	      this.invoke([ this.notfound ], {
	        method: method,
	        path: path
	      }, callback);
	    }
	    return false;
	  }
	  if (this.recurse === "forward") {
	    fns = fns.reverse();
	  }
	  function updateAndInvoke() {
	    self.last = fns.after;
	    self.invoke(self.runlist(fns), self, callback);
	  }
	  after = this.every && this.every.after ? [ this.every.after ].concat(this.last) : [ this.last ];
	  if (after && after.length > 0 && invoked) {
	    if (this.async) {
	      this.invoke(after, this, updateAndInvoke);
	    } else {
	      this.invoke(after, this);
	      updateAndInvoke();
	    }
	    return true;
	  }
	  updateAndInvoke();
	  return true;
	};
	
	Router.prototype.invoke = function(fns, thisArg, callback) {
	  var self = this;
	  var apply;
	  if (this.async) {
	    apply = function(fn, next) {
	      if (Array.isArray(fn)) {
	        return _asyncEverySeries(fn, apply, next);
	      } else if (typeof fn == "function") {
	        fn.apply(thisArg, (fns.captures || []).concat(next));
	      }
	    };
	    _asyncEverySeries(fns, apply, function() {
	      if (callback) {
	        callback.apply(thisArg, arguments);
	      }
	    });
	  } else {
	    apply = function(fn) {
	      if (Array.isArray(fn)) {
	        return _every(fn, apply);
	      } else if (typeof fn === "function") {
	        return fn.apply(thisArg, fns.captures || []);
	      } else if (typeof fn === "string" && self.resource) {
	        self.resource[fn].apply(thisArg, fns.captures || []);
	      }
	    };
	    _every(fns, apply);
	  }
	};
	
	Router.prototype.traverse = function(method, path, routes, regexp, filter) {
	  var fns = [], current, exact, match, next, that;
	  function filterRoutes(routes) {
	    if (!filter) {
	      return routes;
	    }
	    function deepCopy(source) {
	      var result = [];
	      for (var i = 0; i < source.length; i++) {
	        result[i] = Array.isArray(source[i]) ? deepCopy(source[i]) : source[i];
	      }
	      return result;
	    }
	    function applyFilter(fns) {
	      for (var i = fns.length - 1; i >= 0; i--) {
	        if (Array.isArray(fns[i])) {
	          applyFilter(fns[i]);
	          if (fns[i].length === 0) {
	            fns.splice(i, 1);
	          }
	        } else {
	          if (!filter(fns[i])) {
	            fns.splice(i, 1);
	          }
	        }
	      }
	    }
	    var newRoutes = deepCopy(routes);
	    newRoutes.matched = routes.matched;
	    newRoutes.captures = routes.captures;
	    newRoutes.after = routes.after.filter(filter);
	    applyFilter(newRoutes);
	    return newRoutes;
	  }
	  if (path === this.delimiter && routes[method]) {
	    next = [ [ routes.before, routes[method] ].filter(Boolean) ];
	    next.after = [ routes.after ].filter(Boolean);
	    next.matched = true;
	    next.captures = [];
	    return filterRoutes(next);
	  }
	  for (var r in routes) {
	    if (routes.hasOwnProperty(r) && (!this._methods[r] || this._methods[r] && typeof routes[r] === "object" && !Array.isArray(routes[r]))) {
	      current = exact = regexp + this.delimiter + r;
	      if (!this.strict) {
	        exact += "[" + this.delimiter + "]?";
	      }
	      match = path.match(new RegExp("^" + exact));
	      if (!match) {
	        continue;
	      }
	      if (match[0] && match[0] == path && routes[r][method]) {
	        next = [ [ routes[r].before, routes[r][method] ].filter(Boolean) ];
	        next.after = [ routes[r].after ].filter(Boolean);
	        next.matched = true;
	        next.captures = match.slice(1);
	        if (this.recurse && routes === this.routes) {
	          next.push([ routes.before, routes.on ].filter(Boolean));
	          next.after = next.after.concat([ routes.after ].filter(Boolean));
	        }
	        return filterRoutes(next);
	      }
	      next = this.traverse(method, path, routes[r], current);
	      if (next.matched) {
	        if (next.length > 0) {
	          fns = fns.concat(next);
	        }
	        if (this.recurse) {
	          fns.push([ routes[r].before, routes[r].on ].filter(Boolean));
	          next.after = next.after.concat([ routes[r].after ].filter(Boolean));
	          if (routes === this.routes) {
	            fns.push([ routes["before"], routes["on"] ].filter(Boolean));
	            next.after = next.after.concat([ routes["after"] ].filter(Boolean));
	          }
	        }
	        fns.matched = true;
	        fns.captures = next.captures;
	        fns.after = next.after;
	        return filterRoutes(fns);
	      }
	    }
	  }
	  return false;
	};
	
	Router.prototype.insert = function(method, path, route, parent) {
	  var methodType, parentType, isArray, nested, part;
	  path = path.filter(function(p) {
	    return p && p.length > 0;
	  });
	  parent = parent || this.routes;
	  part = path.shift();
	  if (/\:|\*/.test(part) && !/\\d|\\w/.test(part)) {
	    part = regifyString(part, this.params);
	  }
	  if (path.length > 0) {
	    parent[part] = parent[part] || {};
	    return this.insert(method, path, route, parent[part]);
	  }
	  if (!part && !path.length && parent === this.routes) {
	    methodType = typeof parent[method];
	    switch (methodType) {
	     case "function":
	      parent[method] = [ parent[method], route ];
	      return;
	     case "object":
	      parent[method].push(route);
	      return;
	     case "undefined":
	      parent[method] = route;
	      return;
	    }
	    return;
	  }
	  parentType = typeof parent[part];
	  isArray = Array.isArray(parent[part]);
	  if (parent[part] && !isArray && parentType == "object") {
	    methodType = typeof parent[part][method];
	    switch (methodType) {
	     case "function":
	      parent[part][method] = [ parent[part][method], route ];
	      return;
	     case "object":
	      parent[part][method].push(route);
	      return;
	     case "undefined":
	      parent[part][method] = route;
	      return;
	    }
	  } else if (parentType == "undefined") {
	    nested = {};
	    nested[method] = route;
	    parent[part] = nested;
	    return;
	  }
	  throw new Error("Invalid route context: " + parentType);
	};
	
	
	
	Router.prototype.extend = function(methods) {
	  var self = this, len = methods.length, i;
	  function extend(method) {
	    self._methods[method] = true;
	    self[method] = function() {
	      var extra = arguments.length === 1 ? [ method, "" ] : [ method ];
	      self.on.apply(self, extra.concat(Array.prototype.slice.call(arguments)));
	    };
	  }
	  for (i = 0; i < len; i++) {
	    extend(methods[i]);
	  }
	};
	
	Router.prototype.runlist = function(fns) {
	  var runlist = this.every && this.every.before ? [ this.every.before ].concat(_flatten(fns)) : _flatten(fns);
	  if (this.every && this.every.on) {
	    runlist.push(this.every.on);
	  }
	  runlist.captures = fns.captures;
	  runlist.source = fns.source;
	  return runlist;
	};
	
	Router.prototype.mount = function(routes, path) {
	  if (!routes || typeof routes !== "object" || Array.isArray(routes)) {
	    return;
	  }
	  var self = this;
	  path = path || [];
	  if (!Array.isArray(path)) {
	    path = path.split(self.delimiter);
	  }
	  function insertOrMount(route, local) {
	    var rename = route, parts = route.split(self.delimiter), routeType = typeof routes[route], isRoute = parts[0] === "" || !self._methods[parts[0]], event = isRoute ? "on" : rename;
	    if (isRoute) {
	      rename = rename.slice((rename.match(new RegExp("^" + self.delimiter)) || [ "" ])[0].length);
	      parts.shift();
	    }
	    if (isRoute && routeType === "object" && !Array.isArray(routes[route])) {
	      local = local.concat(parts);
	      self.mount(routes[route], local);
	      return;
	    }
	    if (isRoute) {
	      local = local.concat(rename.split(self.delimiter));
	      local = terminator(local, self.delimiter);
	    }
	    self.insert(event, local, routes[route]);
	  }
	  for (var route in routes) {
	    if (routes.hasOwnProperty(route)) {
	      insertOrMount(route, path.slice(0));
	    }
	  }
	};
	
	
	
	}( true ? exports : window));

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	__webpack_require__(44);
	
	var _Navigation = __webpack_require__(46);
	
	var _Navigation2 = _interopRequireDefault(_Navigation);
	
	var _Menu = __webpack_require__(55);
	
	var _Menu2 = _interopRequireDefault(_Menu);
	
	var _app = __webpack_require__(38);
	
	var _app2 = _interopRequireDefault(_app);
	
	var _mithril = __webpack_require__(53);
	
	var _mithril2 = _interopRequireDefault(_mithril);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var App = {
		view: function view() {
			var tabs = _app2.default.tabs;
			var tab = _app2.default.tab;
			var pages = _app2.default.pages;
			var menu = _app2.default.menu;
			var menuKey = _app2.default.menuKey;
	
			var currentPage = tab;
			return {
				tag: 'div',
				children: ['\n\t\t\t\t', {
					tag: 'div',
					children: ['\n\t\t\t\t\t', {
						tag: 'div',
						children: ['\n\t\t\t\t\t', tabs.map(function (tab) {
							return {
								tag: 'div',
								children: ['\n\t\t\t\t\t\t\t', pages[tab.id], '\n\t\t\t\t\t\t'],
								attrs: { className: 'page ' + (currentPage === tab.id ? 'page--current' : '') }
							};
						}), '\n\t\t\t\t\t'],
						attrs: { className: 'wrapper' }
					}, '\n\t\t\t\t'],
					attrs: { className: 'pages', key: 0 }
				}, '\n\t\t\t\t', _mithril2.default.component(_Navigation2.default, { tabs: tabs, tab: tab, key: 1 }, []), '\n\t\t\t\t', _mithril2.default.component(_Menu2.default, { menu: menu, menuKey: menuKey, key: 2 }, []), '\n\t\t\t'],
				attrs: { className: 'app' }
			};
		}
	};
	
	exports.default = App;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(45);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(34)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/sass-loader/index.js!./App.scss", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/sass-loader/index.js!./App.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(28)();
	// imports
	
	
	// module
	exports.push([module.id, ".app .pages {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  padding-bottom: 54px;\n  box-sizing: border-box; }\n  .app .pages .wrapper {\n    position: relative;\n    width: 100%;\n    height: 100%; }\n    .app .pages .wrapper .page {\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n      opacity: 0.001;\n      overflow-y: auto;\n      pointer-events: none;\n      transition: opacity 0.25s;\n      background: #ccc; }\n      .app .pages .wrapper .page.page--current {\n        opacity: 1;\n        pointer-events: auto;\n        perspective: 1600px; }\n\n.app .navigation {\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  width: 100%; }\n", ""]);
	
	// exports


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	__webpack_require__(47);
	
	var _roster = __webpack_require__(40);
	
	var _roster2 = _interopRequireDefault(_roster);
	
	var _router = __webpack_require__(41);
	
	var _router2 = _interopRequireDefault(_router);
	
	var _lang = __webpack_require__(49);
	
	var _lang2 = _interopRequireDefault(_lang);
	
	var _mithril = __webpack_require__(53);
	
	var _mithril2 = _interopRequireDefault(_mithril);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Navigation = {
		view: function view(ctrl, args) {
			var currentTab = args.tab;
			var tabs = args.tabs;
	
			var buttons = tabs.map(function (tab) {
				var className = 'navigation-tab ' + (currentTab === tab.id ? 'navigation-tab--current' : '');
				var handleClick = function handleClick() {
					return (/* evt */_router2.default.setRoute('/' + tab.id)
					);
				};
				var icon = undefined;
				if (tab.icon) icon = {
					tag: 'div',
					children: ['\n\t\t\t\t\t\t', {
						tag: 'i',
						attrs: { className: 'fa fa-' + tab.icon }
					}, '\n\t\t\t\t\t'],
					attrs: { className: 'icon' }
				};
				return {
					tag: 'button',
					children: ['\n\t\t\t\t\t', icon, '\n\t\t\t\t\t', _lang2.default.get(tab.title), '\n\t\t\t\t'],
					attrs: { className: className, onclick: handleClick }
				};
			});
	
			return {
				tag: 'header',
				children: ['\n\t\t\t\t', buttons, '\n\t\t\t'],
				attrs: { className: 'navigation navigation--count-' + buttons.length }
			};
		}
	};
	
	exports.default = Navigation;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(48);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(34)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/sass-loader/index.js!./Navigation.scss", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/sass-loader/index.js!./Navigation.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(28)();
	// imports
	
	
	// module
	exports.push([module.id, ".navigation {\n  border-top: solid 1px silver; }\n  .navigation .navigation-tab {\n    font-size: 1.0em;\n    line-height: 18px;\n    padding: .5em 0;\n    border: 0;\n    background: #f6f6f6;\n    color: #000;\n    text-shadow: 0 1px 0 #fff;\n    text-transform: uppercase;\n    font-family: Hanzel, Verdana, Geneva, sans-serif;\n    font-weight: bold;\n    cursor: pointer;\n    transition: background 0.25s, color 0.25s, text-shadow 0.25s; }\n    .navigation .navigation-tab .icon {\n      padding-bottom: 4px; }\n  .navigation .navigation-tab:hover {\n    background: #eee; }\n  .navigation .navigation-tab--current,\n  .navigation .navigation-tab--current:hover {\n    background: #38c;\n    color: #fff;\n    text-shadow: 0 1px 0 #000; }\n  .navigation.navigation--count-1 .navigation-tab {\n    width: 100%; }\n  .navigation.navigation--count-2 .navigation-tab {\n    width: 50%; }\n  .navigation.navigation--count-3 .navigation-tab {\n    width: 33.334%; }\n  .navigation.navigation--count-4 .navigation-tab {\n    width: 25%; }\n  .navigation.navigation--count-5 .navigation-tab {\n    width: 20%; }\n", ""]);
	
	// exports


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _en = __webpack_require__(50);
	
	var _en2 = _interopRequireDefault(_en);
	
	var _es = __webpack_require__(51);
	
	var _es2 = _interopRequireDefault(_es);
	
	var _ru = __webpack_require__(52);
	
	var _ru2 = _interopRequireDefault(_ru);
	
	var _mithril = __webpack_require__(53);
	
	var _mithril2 = _interopRequireDefault(_mithril);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var lang = {
		current: 'en',
		messages: {
			en: _en2.default,
			es: _es2.default,
			ru: _ru2.default
		},
		change: function change(lang) {
			if (this.messages[lang]) {
				this.current = lang;
				_mithril2.default.redraw();
			}
		},
		get: function get(id) {
			var fallback = arguments.length <= 1 || arguments[1] === undefined ? id : arguments[1];
	
			return this.messages[this.current][id] || fallback;
		}
	};
	
	exports.default = lang;

/***/ },
/* 50 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    lang: 'English',
	
	    //Champion name
	    'champion-blackbolt-name': 'Black Bolt',
	    'champion-captainmarvel-name': 'Captain Marvel',
	    'champion-drax-name': 'Drax',
	    'champion-gamora-name': 'Gamora',
	    'champion-msmarvel-name': 'Ms. Marvel',
	    'champion-ronan-name': 'Ronan',
	    'champion-spidermanblack-name': 'Spider-Man Symbiote',
	    'champion-superiorironman-name': 'Superior Iron Man',
	    'champion-thor-name': 'Thor',
	    'champion-thorjanefoster-name': 'Thor Jane Foster',
	    'champion-venom-name': 'Venom',
	    'champion-ironman-name': 'Iron Man',
	    'champion-ironpatriot-name': 'Iron Patriot',
	    'champion-hulkbuster-name': 'Hulkbuster',
	    'champion-kang-name': 'Kang',
	    'champion-rocket-name': 'Rocket Raccoon',
	    'champion-starlord-name': 'Star-Lord',
	    'champion-vision-name': 'Vision',
	    'champion-thevision-name': 'The Vision',
	    'champion-ultron-name': 'Ultron',
	    'champion-warmachine-name': 'War Machine',
	    'champion-colossus-name': 'Colossus',
	    'champion-cyclops-name': 'Cyclops',
	    'champion-deadpool-name': 'Deadpool',
	    'champion-deadpoolxforce-name': 'Deadpool X-Force',
	    'champion-magneto-name': 'Magneto',
	    'champion-magnetomarvelnow-name': 'Magneto Marvel Now',
	    'champion-storm-name': 'Storm',
	    'champion-wolverine-name': 'Wolverine',
	    'champion-blackpanther-name': 'Black Panther',
	    'champion-blackwidow-name': 'Black Widow',
	    'champion-daredevil-name': 'Daredevil',
	    'champion-daredevilnetflix-name': 'Daredevil',
	    'champion-elektra-name': 'Elektra',
	    'champion-hawkeye-name': 'Hawkeye',
	    'champion-moonknight-name': 'Moon Knight',
	    'champion-punisher-name': 'Punisher',
	    'champion-wintersoldier-name': 'Winter Soldier',
	    'champion-abomination-name': 'Abomination',
	    'champion-antman-name': 'Ant-Man',
	    'champion-captainamerica-name': 'Captain America',
	    'champion-captainamericawwii-name': 'Captain America WWII',
	    'champion-electro-name': 'Electro',
	    'champion-hulk-name': 'Hulk',
	    'champion-joefixit-name': 'Joe Fixit',
	    'champion-rhino-name': 'Rhino',
	    'champion-spidergwen-name': 'Spider-Gwen',
	    'champion-spiderman-name': 'Spider-Man',
	    'champion-spidermanmorales-name': 'Spider-Man Morales',
	    'champion-yellowjacket-name': 'YellowJacket',
	    'champion-drstrange-name': 'Doctor Strange',
	    'champion-ironfist-name': 'Iron Fist',
	    'champion-guillotine-name': 'Guillotine',
	    'champion-juggernaut-name': 'Juggernaut',
	    'champion-magik-name': 'Magik',
	    'champion-scarletwitch-name': 'Scarlet Witch',
	    'champion-unstoppablecolossus-name': 'Unstoppable Colossus',
	
	    //Champion shortname
	    'champion-captainmarvel-shortname': 'Cap. Marvel',
	    'champion-spidermanblack-shortname': 'Spider-Man',
	    'champion-superiorironman-shortname': 'Sup. Iron Man',
	    'champion-thorjanefoster-shortname': 'Thor',
	    'champion-rocket-shortname': 'Rocket',
	    'champion-deadpoolxforce-shortname': 'Deadpool',
	    'champion-magnetomarvelnow-shortname': 'Magneto',
	    'champion-captainamerica-shortname': 'Cap. America',
	    'champion-captainamericawwii-shortname': 'Cap. America',
	    'champion-spidermanmorales-shortname': 'Spider-Man',
	    'champion-drstrange-shortname': 'Dr. Strange',
	    'champion-unstoppablecolossus-shortname': 'Unst. Colossus',
	
	    //Ability name
	    'ability-stun-name': 'Stun',
	    'ability-fatigue-name': 'Fatigue',
	    'ability-powerdrain-name': 'Power Drain',
	    'ability-powerburn-name': 'Power Burn',
	    'ability-bleed-name': 'Bleed',
	    'ability-cauterize-name': 'Cauterize',
	    'ability-armorbreak-name': 'Armor Break',
	    'ability-fury-name': 'Fury',
	    'ability-regeneration-name': 'Regeneration',
	    'ability-unstoppable-name': 'Unstoppable',
	    'ability-poison-name': 'Poison',
	    'ability-armorup-name': 'Armor Up',
	    'ability-plusdamage-name': 'Increased Damage',
	    'ability-pluscritrate-name': 'Increased Critical Rate',
	    'ability-pluscritdamage-name': 'Increased Critical Damage',
	    'ability-poisonimmunity-name': 'Poison Immunity',
	    'ability-bleedimmunity-name': 'Bleed Immunity',
	
	    //Effect name
	    'effect-attack-name': 'Attack',
	    'effect-stun-name': 'Stun',
	    'effect-critrate-name': 'Critical Rate',
	    'effect-critdamage-name': 'Critical Damage',
	    'effect-powergain-name': 'Power Gain',
	    'effect-powersteal-name': 'Power Steal',
	    'effect-perfectblock-name': 'Perfect Block',
	    'effect-block-name': 'Block Proficiency',
	    'effect-armor-name': 'Armor',
	    'effect-health-name': 'Health',
	    'effect-healthsteal-name': 'Health Steal',
	
	    //Effect description
	    'effect-attack-description': 'Increases damage on all attacks.',
	    'effect-stun-description': 'Chance to Stun on special attacks.',
	    'effect-critrate-description': 'Increases the chance for Critical hit.',
	    'effect-critdamage-description': 'Increases damage multiplier for Critical hits.',
	    'effect-powergain-description': 'Gain additional Power (used to trigger a special) whenever Power is gained.',
	    'effect-powersteal-description': 'Gain Power (used to trigger a special) when attacking.',
	    'effect-perfectblock-description': 'Increased chance to Perfect Block for 0 damage.',
	    'effect-block-description': 'Increases Block effectiveness for less damage taken.',
	    'effect-armor-description': 'Increases Armor so that all damage taken is decreased.',
	    'effect-health-description': 'Increases champion Health.',
	    'effect-healthsteal-description': 'Gain Health when attacking.',
	
	    //Type name
	    'type-cosmic-name': 'Cosmic',
	    'type-tech-name': 'Tech',
	    'type-mutant-name': 'Mutant',
	    'type-skill-name': 'Skill',
	    'type-science-name': 'Science',
	    'type-mystic-name': 'Mystic',
	
	    //Crystal name
	    'crystal-versus-name': 'Versus',
	    'crystal-arena-name': 'Arena',
	    'crystal-alliance-name': 'Alliance',
	    'crystal-daily-name': 'Daily',
	    'crystal-2star-name': '2-Star',
	    'crystal-premium-name': 'Premium',
	    'crystal-3star-name': '3-Star',
	    'crystal-4star-name': '4-Star',
	
	    //Crystal description (keep $CURRENCY$ tokens for image replacement)
	    'crystal-versus-description': 'Acquired when you win a versus match.',
	    'crystal-arena-description': 'Buy for 2000 $BATTLECHIPS$.',
	    'crystal-alliance-description': 'Buy for 1000 $LOYALTY$.',
	    'crystal-daily-description': 'Acquired once every 24 hours.',
	    'crystal-premium-description': 'Buy for 100 $UNITS$.',
	    'crystal-3star-description': 'Buy for 400 $UNITS$, rare event.',
	    'crystal-4star-description': 'Buy for 2500 $UNITS$, very rare event.',
	
	    //Algorithm name
	    'algorithm-quest-name': 'Quest',
	    'algorithm-arena-name': 'Arena',
	
	    //Algorithm description
	    'algorithm-quest-description': 'SLOW. This picks the best team mathematically given all parameters.',
	    'algorithm-arena-description': 'FAST. This chooses the best combinations of teams possible.',
	
	    //Listing words
	    'of': 'of',
	    'with': 'with',
	    'found': 'Found',
	    'extras': 'Extras',
	
	    //Common words/sections
	    'team': 'Team',
	    'teams': 'Teams',
	
	    'guide': 'Guide',
	    'guides': 'Guides',
	
	    'champion': 'Champion',
	    'champions': 'Champions',
	
	    'synergy': 'Synergy',
	    'synergies': 'Synergies',
	
	    'crystal': 'Crystal',
	    'crystals': 'Crystals',
	
	    'roster': 'Roster',
	
	    //Roster Panel
	    'manage': 'Manage',
	    'add-champion': 'Add a Champion',
	    'import-csv': 'Import .csv',
	    'export-csv': 'Export .csv',
	    'delete-all': 'Delete All',
	
	    'sort': 'Sort',
	    'filter': 'Filter',
	
	    //Roster Config
	    'stars': 'Stars',
	    'type': 'Type',
	    'name': 'Name',
	
	    'rank': 'Rank',
	    'level': 'Level',
	    'awakened': 'Awakened',
	    'quest': 'Quest',
	    'view-guide': 'View Guide',
	
	    'delete': 'Delete',
	    'cancel': 'Cancel',
	
	    'ask-delete': 'Are you sure you want to delete',
	    'ask-delete-all': 'Are you sure you want to delete all of your champions?',
	    'cannot-undo': 'This action cannot be undone.',
	
	    //Team Panel
	    'advanced-settings': 'Advanced Settings',
	    'team-size': 'Team Size',
	    'algorithm': 'Algorithm',
	    'arena': 'Arena',
	    'build': 'Build',
	
	    //Add Champion Page
	    'add-all': 'Add All',
	
	    //Advanced Settings Page
	    'reset-defaults': 'Reset to Defaults',
	    'champion-weights': 'Champion Weights',
	    'synergy-weights': 'Synergy Weights',
	    'duplicate-weights': 'Duplicate Class Weights',
	    'choose-preset': 'Choose a preset...',
	    'use-levels': 'Calculate using stars / ranks / levels',
	
	    //Tuples
	    'double': 'Double',
	    'triple': 'Triple',
	    'quadruple': 'Quadruple',
	    'quintuple': 'Quintuple',
	
	    //Guide Page
	    'choose-guide': 'Choose a guide',
	
	    //Options
	    'options': 'Options',
	    'share-to': 'Share to',
	    'facebook': 'Facebook',
	    'twitter': 'Twitter',
	    'google': 'Google',
	    'tools': 'Tools',
	    'language': 'Language',
	    'synergy-map': 'Synergy Map',
	    'roster-manager': 'Roster Manager',
	
	    //Onboarding Messages
	    'onboarding-synergies': 'Use the roster manager tool to add more champions to your roster.',
	    'onboarding-roster': 'Use the options menu to add new champions',
	    'onboarding-teams': 'Use the Build menu create your teams!',
	
	    //Guide
	    'coming-soon': 'Coming Soon...',
	    'description': 'Description',
	    'gameplay': 'Gameplay',
	    'special': 'Special',
	    'signature': 'Signature Ability',
	    'attack': 'Attack',
	    'heavy-attack': 'Heavy Attack',
	    'abilities': 'Abilities',
	    'passive-abilities': 'Passive Abilities',
	
	    'rating': 'Rating',
	    'grade': 'Grade',
	    'strategy': 'Strategy',
	    'style': 'Style',
	
	    'damage-type': 'Damage Type',
	    'range': 'Range',
	    'note': 'Note',
	
	    'synergies-external': 'External Synergies',
	
	    'author': 'Author',
	    'profile': 'Profile',
	    'profile-reddit': 'Reddit /u/',
	    'profile-kabam': 'Kabam Forums',
	    'author-credit': 'This guide was written by',
	
	    'email': 'E-mail',
	
	    'none': 'None'
	};

/***/ },
/* 51 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    lang: 'Español',
	
	    //Champion name
	    'champion-blackbolt-name': 'Rayo Negro',
	    'champion-captainmarvel-name': 'Capitana Marvel',
	    'champion-drax-name': 'Drax',
	    'champion-gamora-name': 'Gamora',
	    'champion-msmarvel-name': 'Ms. Marvel',
	    'champion-ronan-name': 'Ronan',
	    'champion-spidermanblack-name': 'Spider-Man Simbionte',
	    'champion-superiorironman-name': 'Iron Man Superior',
	    'champion-thor-name': 'Thor',
	    'champion-thorjanefoster-name': 'Thor Jane Foster',
	    'champion-venom-name': 'Venom',
	    'champion-ironman-name': 'Iron Man',
	    'champion-ironpatriot-name': 'Iron Patriot',
	    'champion-hulkbuster-name': 'Hulkbuster',
	    'champion-kang-name': 'Kang',
	    'champion-rocket-name': 'Rocket el Mapache',
	    'champion-starlord-name': 'Star-Lord',
	    'champion-vision-name': 'Visión',
	    'champion-thevision-name': 'La Vision',
	    'champion-ultron-name': 'Ultron',
	    'champion-warmachine-name': 'Máquina de Guerra',
	    'champion-colossus-name': 'Coloso',
	    'champion-cyclops-name': 'Cíclope',
	    'champion-deadpool-name': 'Deadpool',
	    'champion-deadpoolxforce-name': 'Deadpool X-Force',
	    'champion-magneto-name': 'Magneto',
	    'champion-magnetomarvelnow-name': 'Magneto Marvel Now',
	    'champion-storm-name': 'Tormenta',
	    'champion-wolverine-name': 'Lobezno',
	    'champion-blackpanther-name': 'Pantera Negra',
	    'champion-blackwidow-name': 'Viuda Negra',
	    'champion-daredevil-name': 'Daredevil',
	    'champion-daredevilnetflix-name': 'Daredevil',
	    'champion-elektra-name': 'Elektra',
	    'champion-hawkeye-name': 'Ojo de Halcon',
	    'champion-moonknight-name': 'Caballero Luna',
	    'champion-punisher-name': 'Punisher',
	    'champion-wintersoldier-name': 'Soldado del Invierno',
	    'champion-abomination-name': 'Abominación',
	    'champion-antman-name': 'Ant-Man',
	    'champion-captainamerica-name': 'Capitán América',
	    'champion-captainamericawwii-name': 'Capitán América 2º GM',
	    'champion-electro-name': 'Electro',
	    'champion-hulk-name': 'Hulk',
	    'champion-joefixit-name': 'Joe Fixit',
	    'champion-rhino-name': 'Rhino',
	    'champion-spidergwen-name': 'Spider-Gwen',
	    'champion-spiderman-name': 'Spider-Man',
	    'champion-spidermanmorales-name': 'Spider-Man Morales',
	    'champion-yellowjacket-name': 'YellowJacket',
	    'champion-drstrange-name': 'Dr. Extraño',
	    'champion-ironfist-name': 'Puño de Hierro',
	    'champion-juggernaut-name': 'Juggernaut',
	    'champion-magik-name': 'Magik',
	    'champion-scarletwitch-name': 'Bruja Escarlata',
	    'champion-unstoppablecolossus-name': 'Coloso Imparable',
	
	    //Champion shortname
	    'champion-captainmarvel-shortname': 'Cap. Marvel',
	    'champion-spidermanblack-shortname': 'Spider-Man',
	    'champion-superiorironman-shortname': 'Iron Man Sup.',
	    'champion-thorjanefoster-shortname': 'Thor',
	    'champion-rocket-shortname': 'Rocket',
	    'champion-deadpoolxforce-shortname': 'Deadpool',
	    'champion-magnetomarvelnow-shortname': 'Magneto',
	    'champion-captainamerica-shortname': 'Cap. America',
	    'champion-captainamericawwii-shortname': 'Cap. America',
	    'champion-spidermanmorales-shortname': 'Spider-Man',
	    'champion-unstoppablecolossus-shortname': 'Coloso Imp.',
	
	    //Effect name
	    'effect-attack-name': 'Ataque',
	    'effect-stun-name': 'Aturdir',
	    'effect-critrate-name': 'Prob. de Golpe Crítico',
	    'effect-critdamage-name': 'Daño de Golpe Crítico',
	    'effect-powergain-name': 'Acopio de Poder',
	    'effect-powersteal-name': 'Robapoderes',
	    'effect-perfectblock-name': 'Bloqueo Impecable',
	    'effect-block-name': 'Bloqueo Maestro',
	    'effect-armor-name': 'Robustez',
	    'effect-health-name': 'Curación',
	    'effect-healthsteal-name': 'Parásito',
	
	    //Effect description
	    'effect-attack-description': 'Incrementa el daño de todos los ataques.',
	    'effect-stun-description': 'Probabilidad de aturdir con ataques especiales.',
	    'effect-critrate-description': 'Incrementa la probabilidad para golpes críticos.',
	    'effect-critdamage-description': 'Incrementa el daño para golpes críticos.',
	    'effect-powergain-description': 'Gana poder adicional (usado para activar un especial) cada vez que se gana poder.',
	    'effect-powersteal-description': 'Gana poder adicional (usado para activar un especial) cuando atacas.',
	    'effect-perfectblock-description': 'Probabilidad adicional de hacer un bloqueo perfecto con 0 daño.',
	    'effect-block-description': 'Incrementa la efectividad del bloqueo para reducir el daño recibido.',
	    'effect-armor-description': 'Incrementa la armadura para reducir todo el daño recibido.',
	    'effect-health-description': 'Incrementa la salúd del luchador.',
	    'effect-healthsteal-description': 'Incrementa la salúd al atacar.',
	
	    //Type name
	    'type-cosmic-name': 'Cósmico',
	    'type-tech-name': 'Tecnológico',
	    'type-mutant-name': 'Mutante',
	    'type-skill-name': 'Habilidad',
	    'type-science-name': 'Científico',
	    'type-mystic-name': 'Místico',
	
	    //Crystal name
	    'crystal-versus-name': 'Versus',
	    'crystal-arena-name': 'Arena',
	    'crystal-alliance-name': 'Alianza',
	    'crystal-daily-name': 'Diario',
	    'crystal-2star-name': '2 Estrellas',
	    'crystal-premium-name': 'Premium',
	    'crystal-3star-name': '3 Estrellas',
	    'crystal-4star-name': '4 Estrellas',
	
	    //Crystal description (keep $CURRENCY$ tokens for image replacement)
	    'crystal-versus-description': 'Obtenido al ganar una pelea versus.',
	    'crystal-arena-description': 'Cómpralo por 2000 $BATTLECHIPS$.',
	    'crystal-alliance-description': 'Cómpralo por 1000 $LOYALTY$.',
	    'crystal-daily-description': 'Adquirido una vez cada 24 horas.',
	    'crystal-premium-description': 'Cómpralo por 100 $UNITS$.',
	    'crystal-3star-description': 'Cómpralo por 400 $UNITS$, poco común.',
	    'crystal-4star-description': 'Cómpralo por 2500 $UNITS$, muy poco común.',
	
	    //Algorithm name
	    'algorithm-greedy-name': 'Egoísta',
	    'algorithm-shuffle-name': 'Mixto',
	
	    //Algorithm description
	    'algorithm-greedy-description': 'LENTO. Elige el mejor equipo matemáticamente tomando en cuenta todos los parámetros.',
	    'algorithm-shuffle-description': 'RÁPIDO. Elige las mejores combinaciones posibles de equipos.',
	
	    //Listing words
	    'of': 'de',
	    'with': 'con',
	    'found': 'Encontrado',
	    'extras': 'Extras',
	
	    //Common words/sections
	    'team': 'Equipo',
	    'teams': 'Equipos',
	
	    'guide': 'Guía',
	    'guides': 'Guías',
	
	    'champion': 'Luchador',
	    'champions': 'Luchadores',
	
	    'synergy': 'Sinergia',
	    'synergies': 'Sinergias',
	
	    'crystal': 'Cristal',
	    'crystals': 'Cristales',
	
	    'roster': 'Repertorio',
	
	    //Roster Panel
	    'manage': 'Administra',
	    'add-champion': 'Añade un Luchador',
	    'import-csv': 'Import .csv',
	    'export-csv': 'Export .csv',
	    'delete-all': 'Borra todo',
	
	    'sort': 'Clasificar',
	    'filter': 'Filtrar',
	
	    //Roster Config
	    'stars': 'Estrellas',
	    'type': 'Tipo',
	    'name': 'Name',
	
	    'rank': 'Rango',
	    'level': 'Nivel',
	    'awakened': 'Despertado',
	    'quest': 'Gesta',
	    'view-guide': 'Ver Guía',
	
	    'delete': 'Borrar',
	    'cancel': 'Cancelar',
	
	    'ask-delete': '¿Estas seguro que quieres borrar?',
	    'ask-delete-all': '¿Estás seguro que quieres borrar a todos tus luchadores?',
	    'cannot-undo': 'Esta acción no puede ser deshecha.',
	
	    //Team Panel
	    'advanced-settings': 'Configuración Avanzada',
	    'team-size': 'Tamaño del Equipo',
	    'algorithm': 'Algoritmo',
	    'arena': 'Arena',
	    'build': 'Armar',
	
	    //Add Champion Page
	    'add-all': 'Añadir Todo',
	
	    //Advanced Settings Page
	    'reset-defaults': 'Reiniciar a default',
	    'champion-weights': 'Importancia de Luchadores',
	    'synergy-weights': 'Importancia de Sinergías',
	    'duplicate-weights': 'Importancia de Duplicación',
	    'choose-preset': 'Elige un parámetro...',
	    'use-levels': 'Calcula usando Estrellas / Rangos / Niveles',
	
	    //Tuples
	    'double': 'Doble',
	    'triple': 'Triple',
	    'quadruple': 'Cuadruple',
	    'quintuple': 'Quintuple',
	
	    //Guide Page
	    'choose-guide': 'Elige una guía',
	
	    //Options
	    'options': 'Opciones',
	    'share-to': 'Compartir',
	    'facebook': 'Facebook',
	    'twitter': 'Twitter',
	    'google': 'Google',
	    'tools': 'Herramientas',
	    'language': 'Idioma',
	    'synergy-map': 'Mapa de Sinergias',
	    'roster-manager': 'Administrador de Repertorio',
	
	    //Onboarding Messages
	    'onboarding-synergies': 'Usa la herramienta Administrador de Repertorio para añadir más luchadores a tu repertorio.',
	    'onboarding-roster': 'Usa el menú de opciones para añadir nuevos luchadores',
	    'onboarding-teams': '¡Usa el menú Armar para crear tus equipos!',
	
	    //Guide
	    'coming-soon': 'Pronto...',
	    'gameplay': 'Gameplay',
	    'special': 'Especial',
	    'signature': 'Habilidad Especial',
	    'heavy-attack': 'Ataque Pesado',
	    'abilities': 'Abilidades',
	
	    'grade': 'Calificación',
	    'strategy': 'Estrategia',
	
	    'damage-type': 'Tipo de daño',
	    'range': 'Rango',
	    'note': 'Nota',
	
	    'synergies-external': 'Sinergias Externas',
	
	    'none': 'Ninguno'
	};
	// http://collabedit.com/pwxck

/***/ },
/* 52 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    lang: 'Русский',
	
	    //Champion name
	    'champion-blackbolt-name': 'Черный Гром',
	    'champion-captainmarvel-name': 'Капитан Марвел',
	    'champion-drax-name': 'Дракс',
	    'champion-gamora-name': 'Гамора',
	    'champion-msmarvel-name': 'Мисс Марвел',
	    'champion-ronan-name': 'Ронан',
	    'champion-spidermanblack-name': 'Черный Человек-Паук',
	    'champion-superiorironman-name': 'Высший Железный Человек',
	    'champion-thor-name': 'Тор',
	    'champion-thorjanefoster-name': 'Джейн Фостер',
	    'champion-venom-name': 'Веном',
	    'champion-ironman-name': 'Железный Человек',
	    'champion-ironpatriot-name': 'Железный Патриот',
	    'champion-hulkbuster-name': 'Халкбастер',
	    'champion-kang-name': 'Канг',
	    'champion-rocket-name': 'Реактивный Енот',
	    'champion-starlord-name': 'Звездный Лорд',
	    'champion-vision-name': 'Вижн',
	    'champion-thevision-name': 'Вижн Кино',
	    'champion-ultron-name': 'Альтрон Прайм',
	    'champion-warmachine-name': 'Воитель',
	    'champion-colossus-name': 'Колосс',
	    'champion-cyclops-name': 'Циклоп',
	    'champion-deadpool-name': 'Дедпул',
	    'champion-deadpoolxforce-name': 'Дедпул X-Force',
	    'champion-magneto-name': 'Магнето',
	    'champion-magnetomarvelnow-name': 'Белый Магнето',
	    'champion-storm-name': 'Шторм',
	    'champion-wolverine-name': 'Росомаха',
	    'champion-blackpanther-name': 'Черная Пантера',
	    'champion-blackwidow-name': 'Черная Вдова',
	    'champion-daredevil-name': 'Сорвиголова',
	    'champion-daredevilnetflix-name': 'Сорвиголова Netflix',
	    'champion-elektra-name': 'Электра',
	    'champion-hawkeye-name': 'Соколиный Глаз',
	    'champion-moonknight-name': 'Лунный Рыцарь',
	    'champion-punisher-name': 'Каратель',
	    'champion-wintersoldier-name': 'Зимний Солдат',
	    'champion-abomination-name': 'Мерзость',
	    'champion-antman-name': 'Человек Муравей',
	    'champion-captainamerica-name': 'Капитан Америка',
	    'champion-captainamericawwii-name': 'Капитан Америка WWII',
	    'champion-electro-name': 'Электро',
	    'champion-hulk-name': 'Халк',
	    'champion-joefixit-name': 'Джо Фиксит',
	    'champion-rhino-name': 'Носорог',
	    'champion-spidergwen-name': 'Спайдер Гвен',
	    'champion-spiderman-name': 'Человек-Паук',
	    'champion-spidermanmorales-name': 'Человек-Паук Моралес',
	    'champion-yellowjacket-name': 'Желтый Шершень',
	    'champion-drstrange-name': 'Доктор Стрэндж',
	    'champion-ironfist-name': 'Железный Кулак',
	    'champion-juggernaut-name': 'Джаггернаут',
	    'champion-magik-name': 'Мэджик',
	    'champion-scarletwitch-name': 'Алая Ведьма',
	    'champion-unstoppablecolossus-name': 'Неудержимый Колосс',
	
	    //Champion shortnames
	    'champion-blackbolt-shortname': 'Гром',
	    'champion-captainmarvel-shortname': 'Кэп Марвел',
	    'champion-drax-shortname': 'Дракс',
	    'champion-gamora-shortname': 'Гамора',
	    'champion-msmarvel-shortname': 'Мисс',
	    'champion-ronan-shortname': 'Ронан',
	    'champion-spidermanblack-shortname': 'Черный Паук',
	    'champion-superiorironman-shortname': 'СЖЧ',
	    'champion-thor-shortname': 'Тор',
	    'champion-thorjanefoster-shortname': 'Джейн Фостер',
	    'champion-venom-shortname': 'Веном',
	    'champion-ironman-shortname': 'ЖЧ',
	    'champion-ironpatriot-shortname': 'ЖП',
	    'champion-hulkbuster-shortname': 'ХБ',
	    'champion-kang-shortname': 'Канг',
	    'champion-rocket-shortname': 'Енот',
	    'champion-starlord-shortname': 'Лорд',
	    'champion-vision-shortname': 'Вижн',
	    'champion-thevision-shortname': 'Вижн Кино',
	    'champion-ultron-shortname': 'Альтрон',
	    'champion-warmachine-shortname': 'Воитель',
	    'champion-colossus-shortname': 'Колосс',
	    'champion-cyclops-shortname': 'Циклоп',
	    'champion-deadpool-shortname': 'Дед',
	    'champion-deadpoolxforce-shortname': 'Дед седой',
	    'champion-magneto-shortname': 'Магнит',
	    'champion-magnetomarvelnow-shortname': 'Белый Магнит',
	    'champion-storm-shortname': 'Шторм',
	    'champion-wolverine-shortname': 'Рося',
	    'champion-blackpanther-shortname': 'Пантера',
	    'champion-blackwidow-shortname': 'Вдова',
	    'champion-daredevil-shortname': 'Сорвиголова',
	    'champion-daredevilnetflix-shortname': 'Сорвиголова Netflix',
	    'champion-elektra-shortname': 'Электра',
	    'champion-hawkeye-shortname': 'Сокол',
	    'champion-moonknight-shortname': 'Лунатик',
	    'champion-punisher-shortname': 'Кара',
	    'champion-wintersoldier-shortname': 'Зимний',
	    'champion-abomination-shortname': 'Мерзость',
	    'champion-antman-shortname': 'Муравей',
	    'champion-captaishortnamerica-shortname': 'Кэп',
	    'champion-captaishortnamericawwii-shortname': 'Кэп ВМВ',
	    'champion-electro-shortname': 'Электрик',
	    'champion-hulk-shortname': 'Халк',
	    'champion-joefixit-shortname': 'Фиксит',
	    'champion-rhino-shortname': 'Носорог',
	    'champion-spidergwen-shortname': 'Гвен',
	    'champion-spiderman-shortname': 'Паук',
	    'champion-spidermanmorales-shortname': 'Моралес',
	    'champion-yellowjacket-shortname': 'Шершень',
	    'champion-drstrange-shortname': 'Док',
	    'champion-ironfist-shortname': 'Кулак',
	    'champion-juggernaut-shortname': 'Джаг',
	    'champion-magik-shortname': 'Мэджик',
	    'champion-scarletwitch-shortname': 'Ведьма',
	    'champion-unstoppablecolossus-shortname': 'Неуд',
	
	    //Effect name
	    'effect-attack-name': 'Атака',
	    'effect-stun-name': 'Оглушение',
	    'effect-critrate-name': 'Вероятность крит. урона',
	    'effect-critdamage-name': 'Крит. Урон',
	    'effect-powergain-name': 'Увеличение Энергии',
	    'effect-powersteal-name': 'Кража Энергии',
	    'effect-perfectblock-name': 'Идеальный Блок',
	    'effect-block-name': 'Вероятность ид. блока',
	    'effect-armor-name': 'Броня',
	    'effect-health-name': 'Здоровье',
	    'effect-healthsteal-name': 'Кража здоровья',
	
	    //Effect description
	    'effect-attack-description': 'Увеличение урона на все атаки.',
	    'effect-stun-description': 'Шанс оглушения при спец. атаках.',
	    'effect-critrate-description': 'Увеличение вероятности крит. урона.',
	    'effect-critdamage-description': 'Увеличение критического урона.',
	    'effect-powergain-description': 'Увеличечние энергии (от спец. атак) независимо от атаки.',
	    'effect-powersteal-description': 'Кража энергии (от спец. атак) за счет атаки.',
	    'effect-perfectblock-description': 'Увеличение шанса идеального блока - 0 урона в блоке.',
	    'effect-block-description': 'Увеличение эффективности блокирования - уменьшение урона в блоке.',
	    'effect-armor-description': 'Увеличение брони, тем самым уменьшая получаемый урон.',
	    'effect-health-description': 'Увеличение здоровья чемпиона.',
	    'effect-healthsteal-description': 'Восполнение здоровья при атаке.',
	
	    //Type name
	    'type-cosmic-name': 'Космос',
	    'type-tech-name': 'Технологии',
	    'type-mutant-name': 'Мутации',
	    'type-skill-name': 'Способности',
	    'type-science-name': 'Наука',
	    'type-mystic-name': 'Мистика',
	
	    //Crystal name
	    'crystal-versus-name': 'Кристалл за битвы',
	    'crystal-arena-name': 'Кристалл Арены',
	    'crystal-alliance-name': 'Кристалл союза',
	    'crystal-daily-name': 'Ежедневный кристалл',
	    'crystal-2star-name': 'Кристалл героя с 2-мя звездами',
	    'crystal-premium-name': 'Усиленный кристалл героя',
	    'crystal-3star-name': 'Кристалл героя с 3-мя звездами',
	    'crystal-4star-name': 'Кристалл героя с 4-мя звездами',
	
	    //Crystal description (keep $CURRENCY$ tokens for image replacement)
	    'crystal-versus-description': 'Даётся за победу на арене 1vs1.',
	    'crystal-arena-description': 'Покупается за 2000 $BATTLECHIPS$.',
	    'crystal-alliance-description': 'Покупается за 1000 $LOYALTY$.',
	    'crystal-daily-description': 'Появляется каждые 24 часа.',
	    'crystal-premium-description': 'Покупается за 100 $UNITS$.',
	    'crystal-3star-description': 'Покупается за 400 $UNITS$, редкая акция.',
	    'crystal-4star-description': 'Покупается за 2500 $UNITS$, очень редкая акция.',
	
	    //Algorithm name
	    'algorithm-greedy-name': 'Greedy',
	    'algorithm-shuffle-name': 'Смешанный',
	
	    //Algorithm description
	    'algorithm-greedy-description': 'МЕДЛЕННЫЙ. Выбирает команды, используя математический просчет на основе введенных апраметров.',
	    'algorithm-shuffle-description': 'БЫСТРЫЙ. Выбирает лучшую возможную комбинацию команды.',
	
	    //Listing words
	    'of': 'из',
	    'with': 'с',
	    'found': 'Найден',
	    'extras': 'Экстра',
	
	    //Common words/sections
	    'team': 'Команда',
	    'teams': 'Команды',
	    'guide': 'Руководство',
	    'guides': 'Руководства',
	    'champion': 'Чемпион',
	    'champions': 'Чемпионы',
	    'synergy': 'Синергия',
	    'synergies': 'Синергии',
	    'crystal': 'Кристалл',
	    'crystals': 'Кристаллы',
	    'roster': 'Список',
	
	    //Roster Panel
	    'manage': 'Управление',
	    'add-champion': 'Добавить чемпиона',
	    'import-csv': 'Импорт .csv',
	    'export-csv': 'Экспорт .csv',
	    'delete-all': 'Удалить всех',
	    'sort': 'Сортировать',
	    'filter': 'Фильтр',
	
	    //Roster Config
	    'stars': 'Категория',
	    'type': 'Класс',
	    'name': 'Имя',
	
	    'rank': 'Ранг',
	    'level': 'Уровень',
	    'awakened': 'Дубль',
	    'quest': 'Задание',
	    'view-guide': 'Посмотреть руководство',
	
	    'delete': 'Удалить',
	    'cancel': 'Отмена',
	
	    'ask-delete': 'Вы уверены, что хотите удалить?',
	    'ask-delete-all': 'Вы уверены, что хотите удалить всех чемпионов?',
	    'cannot-undo': 'Это действие не может быть отменено.',
	
	    //Team Panel
	    'advanced-settings': 'Дополнительные настройки',
	    'team-size': 'Размер команды',
	    'algorithm': 'Алгоритм',
	    'quest-group': 'Группа задания',
	    'build': 'Построить',
	
	    //Add Champion Page
	    'add-all': 'Добавить всех',
	
	    //Advanced Settings Page
	    'reset-defaults': 'Восстановить стандартные настройки',
	    'champion-weights': 'Уровни чемпионов',
	    'synergy-weights': 'Уровни синергии',
	    'duplicate-weights': 'Уровни дублей',
	    'choose-preset': 'Выберите предустановку...',
	    'use-levels': 'Просчитать используя звезды / ранги / уровни',
	
	    //Tuples
	    'double': 'Двойной',
	    'triple': 'Тройной',
	    'quadruple': 'Четверной',
	    'quintuple': 'Пятерной',
	
	    //Guide Page
	    'choose-guide': 'Выберите руководство',
	
	    //Options
	    'options': 'Опции',
	    'share-to': 'Поделиться',
	    'facebook': 'Facebook',
	    'twitter': 'Twitter',
	    'google': 'Google',
	    'language': 'Язык',
	    'tools': 'Опции',
	    'synergy-map': 'Карта синергии',
	    'roster-manager': 'Манеджер списка',
	
	    //Onboarding Messages
	    'onboarding-synergies': 'Используейте меню настройки списка, чтобы добавить еще чемпионов.',
	    'onboarding-roster': 'Откройте настройки, чтобы добавить нового чемпиона',
	    'onboarding-teams': 'Используйте меню строителя, чтобы создать свою команду!',
	
	    //Guide
	    'coming-soon': 'Скоро обновление...',
	    'gameplay': 'Геймплей',
	    'special': 'Специальные атаки',
	    'signature': 'Коронная способность',
	    'heavy-attack': 'Тяжелая атака',
	    'abilities': 'Способности',
	
	    'grade': 'Оценка',
	    'strategy': 'Стратегия',
	
	    'damage-type': 'Тип урона',
	    'range': 'Дальний',
	    'note': 'Заметка',
	
	    'synergies-external': 'Синергия от других чемпионов',
	
	    'none': 'Отсутствует'
	};
	// http://collabedit.com/uuf57

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {var m = (function app(window, undefined) {
		var OBJECT = "[object Object]", ARRAY = "[object Array]", STRING = "[object String]", FUNCTION = "function";
		var type = {}.toString;
		var parser = /(?:(^|#|\.)([^#\.\[\]]+))|(\[.+?\])/g, attrParser = /\[(.+?)(?:=("|'|)(.*?)\2)?\]/;
		var voidElements = /^(AREA|BASE|BR|COL|COMMAND|EMBED|HR|IMG|INPUT|KEYGEN|LINK|META|PARAM|SOURCE|TRACK|WBR)$/;
		var noop = function() {}
	
		// caching commonly used variables
		var $document, $location, $requestAnimationFrame, $cancelAnimationFrame;
	
		// self invoking function needed because of the way mocks work
		function initialize(window){
			$document = window.document;
			$location = window.location;
			$cancelAnimationFrame = window.cancelAnimationFrame || window.clearTimeout;
			$requestAnimationFrame = window.requestAnimationFrame || window.setTimeout;
		}
	
		initialize(window);
	
	
		/**
		 * @typedef {String} Tag
		 * A string that looks like -> div.classname#id[param=one][param2=two]
		 * Which describes a DOM node
		 */
	
		/**
		 *
		 * @param {Tag} The DOM node tag
		 * @param {Object=[]} optional key-value pairs to be mapped to DOM attrs
		 * @param {...mNode=[]} Zero or more Mithril child nodes. Can be an array, or splat (optional)
		 *
		 */
		function m() {
			var args = [].slice.call(arguments);
			var hasAttrs = args[1] != null && type.call(args[1]) === OBJECT && !("tag" in args[1] || "view" in args[1]) && !("subtree" in args[1]);
			var attrs = hasAttrs ? args[1] : {};
			var classAttrName = "class" in attrs ? "class" : "className";
			var cell = {tag: "div", attrs: {}};
			var match, classes = [];
			if (type.call(args[0]) != STRING) throw new Error("selector in m(selector, attrs, children) should be a string")
			while (match = parser.exec(args[0])) {
				if (match[1] === "" && match[2]) cell.tag = match[2];
				else if (match[1] === "#") cell.attrs.id = match[2];
				else if (match[1] === ".") classes.push(match[2]);
				else if (match[3][0] === "[") {
					var pair = attrParser.exec(match[3]);
					cell.attrs[pair[1]] = pair[3] || (pair[2] ? "" :true)
				}
			}
	
			var children = hasAttrs ? args.slice(2) : args.slice(1);
			if (children.length === 1 && type.call(children[0]) === ARRAY) {
				cell.children = children[0]
			}
			else {
				cell.children = children
			}
			
			for (var attrName in attrs) {
				if (attrs.hasOwnProperty(attrName)) {
					if (attrName === classAttrName && attrs[attrName] != null && attrs[attrName] !== "") {
						classes.push(attrs[attrName])
						cell.attrs[attrName] = "" //create key in correct iteration order
					}
					else cell.attrs[attrName] = attrs[attrName]
				}
			}
			if (classes.length > 0) cell.attrs[classAttrName] = classes.join(" ");
			
			return cell
		}
		function build(parentElement, parentTag, parentCache, parentIndex, data, cached, shouldReattach, index, editable, namespace, configs) {
			//`build` is a recursive function that manages creation/diffing/removal of DOM elements based on comparison between `data` and `cached`
			//the diff algorithm can be summarized as this:
			//1 - compare `data` and `cached`
			//2 - if they are different, copy `data` to `cached` and update the DOM based on what the difference is
			//3 - recursively apply this algorithm for every array and for the children of every virtual element
	
			//the `cached` data structure is essentially the same as the previous redraw's `data` data structure, with a few additions:
			//- `cached` always has a property called `nodes`, which is a list of DOM elements that correspond to the data represented by the respective virtual element
			//- in order to support attaching `nodes` as a property of `cached`, `cached` is *always* a non-primitive object, i.e. if the data was a string, then cached is a String instance. If data was `null` or `undefined`, cached is `new String("")`
			//- `cached also has a `configContext` property, which is the state storage object exposed by config(element, isInitialized, context)
			//- when `cached` is an Object, it represents a virtual element; when it's an Array, it represents a list of elements; when it's a String, Number or Boolean, it represents a text node
	
			//`parentElement` is a DOM element used for W3C DOM API calls
			//`parentTag` is only used for handling a corner case for textarea values
			//`parentCache` is used to remove nodes in some multi-node cases
			//`parentIndex` and `index` are used to figure out the offset of nodes. They're artifacts from before arrays started being flattened and are likely refactorable
			//`data` and `cached` are, respectively, the new and old nodes being diffed
			//`shouldReattach` is a flag indicating whether a parent node was recreated (if so, and if this node is reused, then this node must reattach itself to the new parent)
			//`editable` is a flag that indicates whether an ancestor is contenteditable
			//`namespace` indicates the closest HTML namespace as it cascades down from an ancestor
			//`configs` is a list of config functions to run after the topmost `build` call finishes running
	
			//there's logic that relies on the assumption that null and undefined data are equivalent to empty strings
			//- this prevents lifecycle surprises from procedural helpers that mix implicit and explicit return statements (e.g. function foo() {if (cond) return m("div")}
			//- it simplifies diffing code
			//data.toString() might throw or return null if data is the return value of Console.log in Firefox (behavior depends on version)
			try {if (data == null || data.toString() == null) data = "";} catch (e) {data = ""}
			if (data.subtree === "retain") return cached;
			var cachedType = type.call(cached), dataType = type.call(data);
			if (cached == null || cachedType !== dataType) {
				if (cached != null) {
					if (parentCache && parentCache.nodes) {
						var offset = index - parentIndex;
						var end = offset + (dataType === ARRAY ? data : cached.nodes).length;
						clear(parentCache.nodes.slice(offset, end), parentCache.slice(offset, end))
					}
					else if (cached.nodes) clear(cached.nodes, cached)
				}
				cached = new data.constructor;
				if (cached.tag) cached = {}; //if constructor creates a virtual dom element, use a blank object as the base cached node instead of copying the virtual el (#277)
				cached.nodes = []
			}
	
			if (dataType === ARRAY) {
				//recursively flatten array
				for (var i = 0, len = data.length; i < len; i++) {
					if (type.call(data[i]) === ARRAY) {
						data = data.concat.apply([], data);
						i-- //check current index again and flatten until there are no more nested arrays at that index
						len = data.length
					}
				}
				
				var nodes = [], intact = cached.length === data.length, subArrayCount = 0;
	
				//keys algorithm: sort elements without recreating them if keys are present
				//1) create a map of all existing keys, and mark all for deletion
				//2) add new keys to map and mark them for addition
				//3) if key exists in new list, change action from deletion to a move
				//4) for each key, handle its corresponding action as marked in previous steps
				var DELETION = 1, INSERTION = 2 , MOVE = 3;
				var existing = {}, shouldMaintainIdentities = false;
				for (var i = 0; i < cached.length; i++) {
					if (cached[i] && cached[i].attrs && cached[i].attrs.key != null) {
						shouldMaintainIdentities = true;
						existing[cached[i].attrs.key] = {action: DELETION, index: i}
					}
				}
				
				var guid = 0
				for (var i = 0, len = data.length; i < len; i++) {
					if (data[i] && data[i].attrs && data[i].attrs.key != null) {
						for (var j = 0, len = data.length; j < len; j++) {
							if (data[j] && data[j].attrs && data[j].attrs.key == null) data[j].attrs.key = "__mithril__" + guid++
						}
						break
					}
				}
				
				if (shouldMaintainIdentities) {
					var keysDiffer = false
					if (data.length != cached.length) keysDiffer = true
					else for (var i = 0, cachedCell, dataCell; cachedCell = cached[i], dataCell = data[i]; i++) {
						if (cachedCell.attrs && dataCell.attrs && cachedCell.attrs.key != dataCell.attrs.key) {
							keysDiffer = true
							break
						}
					}
					
					if (keysDiffer) {
						for (var i = 0, len = data.length; i < len; i++) {
							if (data[i] && data[i].attrs) {
								if (data[i].attrs.key != null) {
									var key = data[i].attrs.key;
									if (!existing[key]) existing[key] = {action: INSERTION, index: i};
									else existing[key] = {
										action: MOVE,
										index: i,
										from: existing[key].index,
										element: cached.nodes[existing[key].index] || $document.createElement("div")
									}
								}
							}
						}
						var actions = []
						for (var prop in existing) actions.push(existing[prop])
						var changes = actions.sort(sortChanges);
						var newCached = new Array(cached.length)
						newCached.nodes = cached.nodes.slice()
	
						for (var i = 0, change; change = changes[i]; i++) {
							if (change.action === DELETION) {
								clear(cached[change.index].nodes, cached[change.index]);
								newCached.splice(change.index, 1)
							}
							if (change.action === INSERTION) {
								var dummy = $document.createElement("div");
								dummy.key = data[change.index].attrs.key;
								parentElement.insertBefore(dummy, parentElement.childNodes[change.index] || null);
								newCached.splice(change.index, 0, {attrs: {key: data[change.index].attrs.key}, nodes: [dummy]})
								newCached.nodes[change.index] = dummy
							}
	
							if (change.action === MOVE) {
								if (parentElement.childNodes[change.index] !== change.element && change.element !== null) {
									parentElement.insertBefore(change.element, parentElement.childNodes[change.index] || null)
								}
								newCached[change.index] = cached[change.from]
								newCached.nodes[change.index] = change.element
							}
						}
						cached = newCached;
					}
				}
				//end key algorithm
	
				for (var i = 0, cacheCount = 0, len = data.length; i < len; i++) {
					//diff each item in the array
					var item = build(parentElement, parentTag, cached, index, data[i], cached[cacheCount], shouldReattach, index + subArrayCount || subArrayCount, editable, namespace, configs);
					if (item === undefined) continue;
					if (!item.nodes.intact) intact = false;
					if (item.$trusted) {
						//fix offset of next element if item was a trusted string w/ more than one html element
						//the first clause in the regexp matches elements
						//the second clause (after the pipe) matches text nodes
						subArrayCount += (item.match(/<[^\/]|\>\s*[^<]/g) || [0]).length
					}
					else subArrayCount += type.call(item) === ARRAY ? item.length : 1;
					cached[cacheCount++] = item
				}
				if (!intact) {
					//diff the array itself
					
					//update the list of DOM nodes by collecting the nodes from each item
					for (var i = 0, len = data.length; i < len; i++) {
						if (cached[i] != null) nodes.push.apply(nodes, cached[i].nodes)
					}
					//remove items from the end of the array if the new array is shorter than the old one
					//if errors ever happen here, the issue is most likely a bug in the construction of the `cached` data structure somewhere earlier in the program
					for (var i = 0, node; node = cached.nodes[i]; i++) {
						if (node.parentNode != null && nodes.indexOf(node) < 0) clear([node], [cached[i]])
					}
					if (data.length < cached.length) cached.length = data.length;
					cached.nodes = nodes
				}
			}
			else if (data != null && dataType === OBJECT) {
				var views = [], controllers = []
				while (data.view) {
					var view = data.view.$original || data.view
					var controllerIndex = m.redraw.strategy() == "diff" && cached.views ? cached.views.indexOf(view) : -1
					var controller = controllerIndex > -1 ? cached.controllers[controllerIndex] : new (data.controller || noop)
					var key = data && data.attrs && data.attrs.key
					data = pendingRequests == 0 || (cached && cached.controllers && cached.controllers.indexOf(controller) > -1) ? data.view(controller) : {tag: "placeholder"}
					if (data.subtree === "retain") return cached;
					if (key) {
						if (!data.attrs) data.attrs = {}
						data.attrs.key = key
					}
					if (controller.onunload) unloaders.push({controller: controller, handler: controller.onunload})
					views.push(view)
					controllers.push(controller)
				}
				if (!data.tag && controllers.length) throw new Error("Component template must return a virtual element, not an array, string, etc.")
				if (!data.attrs) data.attrs = {};
				if (!cached.attrs) cached.attrs = {};
	
				var dataAttrKeys = Object.keys(data.attrs)
				var hasKeys = dataAttrKeys.length > ("key" in data.attrs ? 1 : 0)
				//if an element is different enough from the one in cache, recreate it
				if (data.tag != cached.tag || dataAttrKeys.sort().join() != Object.keys(cached.attrs).sort().join() || data.attrs.id != cached.attrs.id || data.attrs.key != cached.attrs.key || (m.redraw.strategy() == "all" && (!cached.configContext || cached.configContext.retain !== true)) || (m.redraw.strategy() == "diff" && cached.configContext && cached.configContext.retain === false)) {
					if (cached.nodes.length) clear(cached.nodes);
					if (cached.configContext && typeof cached.configContext.onunload === FUNCTION) cached.configContext.onunload()
					if (cached.controllers) {
						for (var i = 0, controller; controller = cached.controllers[i]; i++) {
							if (typeof controller.onunload === FUNCTION) controller.onunload({preventDefault: noop})
						}
					}
				}
				if (type.call(data.tag) != STRING) return;
	
				var node, isNew = cached.nodes.length === 0;
				if (data.attrs.xmlns) namespace = data.attrs.xmlns;
				else if (data.tag === "svg") namespace = "http://www.w3.org/2000/svg";
				else if (data.tag === "math") namespace = "http://www.w3.org/1998/Math/MathML";
				
				if (isNew) {
					if (data.attrs.is) node = namespace === undefined ? $document.createElement(data.tag, data.attrs.is) : $document.createElementNS(namespace, data.tag, data.attrs.is);
					else node = namespace === undefined ? $document.createElement(data.tag) : $document.createElementNS(namespace, data.tag);
					cached = {
						tag: data.tag,
						//set attributes first, then create children
						attrs: hasKeys ? setAttributes(node, data.tag, data.attrs, {}, namespace) : data.attrs,
						children: data.children != null && data.children.length > 0 ?
							build(node, data.tag, undefined, undefined, data.children, cached.children, true, 0, data.attrs.contenteditable ? node : editable, namespace, configs) :
							data.children,
						nodes: [node]
					};
					if (controllers.length) {
						cached.views = views
						cached.controllers = controllers
						for (var i = 0, controller; controller = controllers[i]; i++) {
							if (controller.onunload && controller.onunload.$old) controller.onunload = controller.onunload.$old
							if (pendingRequests && controller.onunload) {
								var onunload = controller.onunload
								controller.onunload = noop
								controller.onunload.$old = onunload
							}
						}
					}
					
					if (cached.children && !cached.children.nodes) cached.children.nodes = [];
					//edge case: setting value on <select> doesn't work before children exist, so set it again after children have been created
					if (data.tag === "select" && "value" in data.attrs) setAttributes(node, data.tag, {value: data.attrs.value}, {}, namespace);
					parentElement.insertBefore(node, parentElement.childNodes[index] || null)
				}
				else {
					node = cached.nodes[0];
					if (hasKeys) setAttributes(node, data.tag, data.attrs, cached.attrs, namespace);
					cached.children = build(node, data.tag, undefined, undefined, data.children, cached.children, false, 0, data.attrs.contenteditable ? node : editable, namespace, configs);
					cached.nodes.intact = true;
					if (controllers.length) {
						cached.views = views
						cached.controllers = controllers
					}
					if (shouldReattach === true && node != null) parentElement.insertBefore(node, parentElement.childNodes[index] || null)
				}
				//schedule configs to be called. They are called after `build` finishes running
				if (typeof data.attrs["config"] === FUNCTION) {
					var context = cached.configContext = cached.configContext || {};
	
					// bind
					var callback = function(data, args) {
						return function() {
							return data.attrs["config"].apply(data, args)
						}
					};
					configs.push(callback(data, [node, !isNew, context, cached]))
				}
			}
			else if (typeof data != FUNCTION) {
				//handle text nodes
				var nodes;
				if (cached.nodes.length === 0) {
					if (data.$trusted) {
						nodes = injectHTML(parentElement, index, data)
					}
					else {
						nodes = [$document.createTextNode(data)];
						if (!parentElement.nodeName.match(voidElements)) parentElement.insertBefore(nodes[0], parentElement.childNodes[index] || null)
					}
					cached = "string number boolean".indexOf(typeof data) > -1 ? new data.constructor(data) : data;
					cached.nodes = nodes
				}
				else if (cached.valueOf() !== data.valueOf() || shouldReattach === true) {
					nodes = cached.nodes;
					if (!editable || editable !== $document.activeElement) {
						if (data.$trusted) {
							clear(nodes, cached);
							nodes = injectHTML(parentElement, index, data)
						}
						else {
							//corner case: replacing the nodeValue of a text node that is a child of a textarea/contenteditable doesn't work
							//we need to update the value property of the parent textarea or the innerHTML of the contenteditable element instead
							if (parentTag === "textarea") parentElement.value = data;
							else if (editable) editable.innerHTML = data;
							else {
								if (nodes[0].nodeType === 1 || nodes.length > 1) { //was a trusted string
									clear(cached.nodes, cached);
									nodes = [$document.createTextNode(data)]
								}
								parentElement.insertBefore(nodes[0], parentElement.childNodes[index] || null);
								nodes[0].nodeValue = data
							}
						}
					}
					cached = new data.constructor(data);
					cached.nodes = nodes
				}
				else cached.nodes.intact = true
			}
	
			return cached
		}
		function sortChanges(a, b) {return a.action - b.action || a.index - b.index}
		function setAttributes(node, tag, dataAttrs, cachedAttrs, namespace) {
			for (var attrName in dataAttrs) {
				var dataAttr = dataAttrs[attrName];
				var cachedAttr = cachedAttrs[attrName];
				if (!(attrName in cachedAttrs) || (cachedAttr !== dataAttr)) {
					cachedAttrs[attrName] = dataAttr;
					try {
						//`config` isn't a real attributes, so ignore it
						if (attrName === "config" || attrName == "key") continue;
						//hook event handlers to the auto-redrawing system
						else if (typeof dataAttr === FUNCTION && attrName.indexOf("on") === 0) {
							node[attrName] = autoredraw(dataAttr, node)
						}
						//handle `style: {...}`
						else if (attrName === "style" && dataAttr != null && type.call(dataAttr) === OBJECT) {
							for (var rule in dataAttr) {
								if (cachedAttr == null || cachedAttr[rule] !== dataAttr[rule]) node.style[rule] = dataAttr[rule]
							}
							for (var rule in cachedAttr) {
								if (!(rule in dataAttr)) node.style[rule] = ""
							}
						}
						//handle SVG
						else if (namespace != null) {
							if (attrName === "href") node.setAttributeNS("http://www.w3.org/1999/xlink", "href", dataAttr);
							else if (attrName === "className") node.setAttribute("class", dataAttr);
							else node.setAttribute(attrName, dataAttr)
						}
						//handle cases that are properties (but ignore cases where we should use setAttribute instead)
						//- list and form are typically used as strings, but are DOM element references in js
						//- when using CSS selectors (e.g. `m("[style='']")`), style is used as a string, but it's an object in js
						else if (attrName in node && !(attrName === "list" || attrName === "style" || attrName === "form" || attrName === "type" || attrName === "width" || attrName === "height")) {
							//#348 don't set the value if not needed otherwise cursor placement breaks in Chrome
							if (tag !== "input" || node[attrName] !== dataAttr) node[attrName] = dataAttr
						}
						else node.setAttribute(attrName, dataAttr)
					}
					catch (e) {
						//swallow IE's invalid argument errors to mimic HTML's fallback-to-doing-nothing-on-invalid-attributes behavior
						if (e.message.indexOf("Invalid argument") < 0) throw e
					}
				}
				//#348 dataAttr may not be a string, so use loose comparison (double equal) instead of strict (triple equal)
				else if (attrName === "value" && tag === "input" && node.value != dataAttr) {
					node.value = dataAttr
				}
			}
			return cachedAttrs
		}
		function clear(nodes, cached) {
			for (var i = nodes.length - 1; i > -1; i--) {
				if (nodes[i] && nodes[i].parentNode) {
					try {nodes[i].parentNode.removeChild(nodes[i])}
					catch (e) {} //ignore if this fails due to order of events (see http://stackoverflow.com/questions/21926083/failed-to-execute-removechild-on-node)
					cached = [].concat(cached);
					if (cached[i]) unload(cached[i])
				}
			}
			if (nodes.length != 0) nodes.length = 0
		}
		function unload(cached) {
			if (cached.configContext && typeof cached.configContext.onunload === FUNCTION) {
				cached.configContext.onunload();
				cached.configContext.onunload = null
			}
			if (cached.controllers) {
				for (var i = 0, controller; controller = cached.controllers[i]; i++) {
					if (typeof controller.onunload === FUNCTION) controller.onunload({preventDefault: noop});
				}
			}
			if (cached.children) {
				if (type.call(cached.children) === ARRAY) {
					for (var i = 0, child; child = cached.children[i]; i++) unload(child)
				}
				else if (cached.children.tag) unload(cached.children)
			}
		}
		function injectHTML(parentElement, index, data) {
			var nextSibling = parentElement.childNodes[index];
			if (nextSibling) {
				var isElement = nextSibling.nodeType != 1;
				var placeholder = $document.createElement("span");
				if (isElement) {
					parentElement.insertBefore(placeholder, nextSibling || null);
					placeholder.insertAdjacentHTML("beforebegin", data);
					parentElement.removeChild(placeholder)
				}
				else nextSibling.insertAdjacentHTML("beforebegin", data)
			}
			else parentElement.insertAdjacentHTML("beforeend", data);
			var nodes = [];
			while (parentElement.childNodes[index] !== nextSibling) {
				nodes.push(parentElement.childNodes[index]);
				index++
			}
			return nodes
		}
		function autoredraw(callback, object) {
			return function(e) {
				e = e || event;
				m.redraw.strategy("diff");
				m.startComputation();
				try {return callback.call(object, e)}
				finally {
					endFirstComputation()
				}
			}
		}
	
		var html;
		var documentNode = {
			appendChild: function(node) {
				if (html === undefined) html = $document.createElement("html");
				if ($document.documentElement && $document.documentElement !== node) {
					$document.replaceChild(node, $document.documentElement)
				}
				else $document.appendChild(node);
				this.childNodes = $document.childNodes
			},
			insertBefore: function(node) {
				this.appendChild(node)
			},
			childNodes: []
		};
		var nodeCache = [], cellCache = {};
		m.render = function(root, cell, forceRecreation) {
			var configs = [];
			if (!root) throw new Error("Ensure the DOM element being passed to m.route/m.mount/m.render is not undefined.");
			var id = getCellCacheKey(root);
			var isDocumentRoot = root === $document;
			var node = isDocumentRoot || root === $document.documentElement ? documentNode : root;
			if (isDocumentRoot && cell.tag != "html") cell = {tag: "html", attrs: {}, children: cell};
			if (cellCache[id] === undefined) clear(node.childNodes);
			if (forceRecreation === true) reset(root);
			cellCache[id] = build(node, null, undefined, undefined, cell, cellCache[id], false, 0, null, undefined, configs);
			for (var i = 0, len = configs.length; i < len; i++) configs[i]()
		};
		function getCellCacheKey(element) {
			var index = nodeCache.indexOf(element);
			return index < 0 ? nodeCache.push(element) - 1 : index
		}
	
		m.trust = function(value) {
			value = new String(value);
			value.$trusted = true;
			return value
		};
	
		function gettersetter(store) {
			var prop = function() {
				if (arguments.length) store = arguments[0];
				return store
			};
	
			prop.toJSON = function() {
				return store
			};
	
			return prop
		}
	
		m.prop = function (store) {
			//note: using non-strict equality check here because we're checking if store is null OR undefined
			if (((store != null && type.call(store) === OBJECT) || typeof store === FUNCTION) && typeof store.then === FUNCTION) {
				return propify(store)
			}
	
			return gettersetter(store)
		};
	
		var roots = [], components = [], controllers = [], lastRedrawId = null, lastRedrawCallTime = 0, computePreRedrawHook = null, computePostRedrawHook = null, prevented = false, topComponent, unloaders = [];
		var FRAME_BUDGET = 16; //60 frames per second = 1 call per 16 ms
		function parameterize(component, args) {
			var controller = function() {
				return (component.controller || noop).apply(this, args) || this
			}
			var view = function(ctrl) {
				if (arguments.length > 1) args = args.concat([].slice.call(arguments, 1))
				return component.view.apply(component, args ? [ctrl].concat(args) : [ctrl])
			}
			view.$original = component.view
			var output = {controller: controller, view: view}
			if (args[0] && args[0].key != null) output.attrs = {key: args[0].key}
			return output
		}
		m.component = function(component) {
			return parameterize(component, [].slice.call(arguments, 1))
		}
		m.mount = m.module = function(root, component) {
			if (!root) throw new Error("Please ensure the DOM element exists before rendering a template into it.");
			var index = roots.indexOf(root);
			if (index < 0) index = roots.length;
			
			var isPrevented = false;
			var event = {preventDefault: function() {
				isPrevented = true;
				computePreRedrawHook = computePostRedrawHook = null;
			}};
			for (var i = 0, unloader; unloader = unloaders[i]; i++) {
				unloader.handler.call(unloader.controller, event)
				unloader.controller.onunload = null
			}
			if (isPrevented) {
				for (var i = 0, unloader; unloader = unloaders[i]; i++) unloader.controller.onunload = unloader.handler
			}
			else unloaders = []
			
			if (controllers[index] && typeof controllers[index].onunload === FUNCTION) {
				controllers[index].onunload(event)
			}
			
			if (!isPrevented) {
				m.redraw.strategy("all");
				m.startComputation();
				roots[index] = root;
				if (arguments.length > 2) component = subcomponent(component, [].slice.call(arguments, 2))
				var currentComponent = topComponent = component = component || {controller: function() {}};
				var constructor = component.controller || noop
				var controller = new constructor;
				//controllers may call m.mount recursively (via m.route redirects, for example)
				//this conditional ensures only the last recursive m.mount call is applied
				if (currentComponent === topComponent) {
					controllers[index] = controller;
					components[index] = component
				}
				endFirstComputation();
				return controllers[index]
			}
		};
		var redrawing = false
		m.redraw = function(force) {
			if (redrawing) return
			redrawing = true
			//lastRedrawId is a positive number if a second redraw is requested before the next animation frame
			//lastRedrawID is null if it's the first redraw and not an event handler
			if (lastRedrawId && force !== true) {
				//when setTimeout: only reschedule redraw if time between now and previous redraw is bigger than a frame, otherwise keep currently scheduled timeout
				//when rAF: always reschedule redraw
				if ($requestAnimationFrame === window.requestAnimationFrame || new Date - lastRedrawCallTime > FRAME_BUDGET) {
					if (lastRedrawId > 0) $cancelAnimationFrame(lastRedrawId);
					lastRedrawId = $requestAnimationFrame(redraw, FRAME_BUDGET)
				}
			}
			else {
				redraw();
				lastRedrawId = $requestAnimationFrame(function() {lastRedrawId = null}, FRAME_BUDGET)
			}
			redrawing = false
		};
		m.redraw.strategy = m.prop();
		function redraw() {
			if (computePreRedrawHook) {
				computePreRedrawHook()
				computePreRedrawHook = null
			}
			for (var i = 0, root; root = roots[i]; i++) {
				if (controllers[i]) {
					var args = components[i].controller && components[i].controller.$$args ? [controllers[i]].concat(components[i].controller.$$args) : [controllers[i]]
					m.render(root, components[i].view ? components[i].view(controllers[i], args) : "")
				}
			}
			//after rendering within a routed context, we need to scroll back to the top, and fetch the document title for history.pushState
			if (computePostRedrawHook) {
				computePostRedrawHook();
				computePostRedrawHook = null
			}
			lastRedrawId = null;
			lastRedrawCallTime = new Date;
			m.redraw.strategy("diff")
		}
	
		var pendingRequests = 0;
		m.startComputation = function() {pendingRequests++};
		m.endComputation = function() {
			pendingRequests = Math.max(pendingRequests - 1, 0);
			if (pendingRequests === 0) m.redraw()
		};
		var endFirstComputation = function() {
			if (m.redraw.strategy() == "none") {
				pendingRequests--
				m.redraw.strategy("diff")
			}
			else m.endComputation();
		}
	
		m.withAttr = function(prop, withAttrCallback) {
			return function(e) {
				e = e || event;
				var currentTarget = e.currentTarget || this;
				withAttrCallback(prop in currentTarget ? currentTarget[prop] : currentTarget.getAttribute(prop))
			}
		};
	
		//routing
		var modes = {pathname: "", hash: "#", search: "?"};
		var redirect = noop, routeParams, currentRoute, isDefaultRoute = false;
		m.route = function() {
			//m.route()
			if (arguments.length === 0) return currentRoute;
			//m.route(el, defaultRoute, routes)
			else if (arguments.length === 3 && type.call(arguments[1]) === STRING) {
				var root = arguments[0], defaultRoute = arguments[1], router = arguments[2];
				redirect = function(source) {
					var path = currentRoute = normalizeRoute(source);
					if (!routeByValue(root, router, path)) {
						if (isDefaultRoute) throw new Error("Ensure the default route matches one of the routes defined in m.route")
						isDefaultRoute = true
						m.route(defaultRoute, true)
						isDefaultRoute = false
					}
				};
				var listener = m.route.mode === "hash" ? "onhashchange" : "onpopstate";
				window[listener] = function() {
					var path = $location[m.route.mode]
					if (m.route.mode === "pathname") path += $location.search
					if (currentRoute != normalizeRoute(path)) {
						redirect(path)
					}
				};
				computePreRedrawHook = setScroll;
				window[listener]()
			}
			//config: m.route
			else if (arguments[0].addEventListener || arguments[0].attachEvent) {
				var element = arguments[0];
				var isInitialized = arguments[1];
				var context = arguments[2];
				var vdom = arguments[3];
				element.href = (m.route.mode !== 'pathname' ? $location.pathname : '') + modes[m.route.mode] + vdom.attrs.href;
				if (element.addEventListener) {
					element.removeEventListener("click", routeUnobtrusive);
					element.addEventListener("click", routeUnobtrusive)
				}
				else {
					element.detachEvent("onclick", routeUnobtrusive);
					element.attachEvent("onclick", routeUnobtrusive)
				}
			}
			//m.route(route, params, shouldReplaceHistoryEntry)
			else if (type.call(arguments[0]) === STRING) {
				var oldRoute = currentRoute;
				currentRoute = arguments[0];
				var args = arguments[1] || {}
				var queryIndex = currentRoute.indexOf("?")
				var params = queryIndex > -1 ? parseQueryString(currentRoute.slice(queryIndex + 1)) : {}
				for (var i in args) params[i] = args[i]
				var querystring = buildQueryString(params)
				var currentPath = queryIndex > -1 ? currentRoute.slice(0, queryIndex) : currentRoute
				if (querystring) currentRoute = currentPath + (currentPath.indexOf("?") === -1 ? "?" : "&") + querystring;
	
				var shouldReplaceHistoryEntry = (arguments.length === 3 ? arguments[2] : arguments[1]) === true || oldRoute === arguments[0];
	
				if (window.history.pushState) {
					computePreRedrawHook = setScroll
					computePostRedrawHook = function() {
						window.history[shouldReplaceHistoryEntry ? "replaceState" : "pushState"](null, $document.title, modes[m.route.mode] + currentRoute);
					};
					redirect(modes[m.route.mode] + currentRoute)
				}
				else {
					$location[m.route.mode] = currentRoute
					redirect(modes[m.route.mode] + currentRoute)
				}
			}
		};
		m.route.param = function(key) {
			if (!routeParams) throw new Error("You must call m.route(element, defaultRoute, routes) before calling m.route.param()")
			return routeParams[key]
		};
		m.route.mode = "search";
		function normalizeRoute(route) {
			return route.slice(modes[m.route.mode].length)
		}
		function routeByValue(root, router, path) {
			routeParams = {};
	
			var queryStart = path.indexOf("?");
			if (queryStart !== -1) {
				routeParams = parseQueryString(path.substr(queryStart + 1, path.length));
				path = path.substr(0, queryStart)
			}
	
			// Get all routes and check if there's
			// an exact match for the current path
			var keys = Object.keys(router);
			var index = keys.indexOf(path);
			if(index !== -1){
				m.mount(root, router[keys [index]]);
				return true;
			}
	
			for (var route in router) {
				if (route === path) {
					m.mount(root, router[route]);
					return true
				}
	
				var matcher = new RegExp("^" + route.replace(/:[^\/]+?\.{3}/g, "(.*?)").replace(/:[^\/]+/g, "([^\\/]+)") + "\/?$");
	
				if (matcher.test(path)) {
					path.replace(matcher, function() {
						var keys = route.match(/:[^\/]+/g) || [];
						var values = [].slice.call(arguments, 1, -2);
						for (var i = 0, len = keys.length; i < len; i++) routeParams[keys[i].replace(/:|\./g, "")] = decodeURIComponent(values[i])
						m.mount(root, router[route])
					});
					return true
				}
			}
		}
		function routeUnobtrusive(e) {
			e = e || event;
			if (e.ctrlKey || e.metaKey || e.which === 2) return;
			if (e.preventDefault) e.preventDefault();
			else e.returnValue = false;
			var currentTarget = e.currentTarget || e.srcElement;
			var args = m.route.mode === "pathname" && currentTarget.search ? parseQueryString(currentTarget.search.slice(1)) : {};
			while (currentTarget && currentTarget.nodeName.toUpperCase() != "A") currentTarget = currentTarget.parentNode
			m.route(currentTarget[m.route.mode].slice(modes[m.route.mode].length), args)
		}
		function setScroll() {
			if (m.route.mode != "hash" && $location.hash) $location.hash = $location.hash;
			else window.scrollTo(0, 0)
		}
		function buildQueryString(object, prefix) {
			var duplicates = {}
			var str = []
			for (var prop in object) {
				var key = prefix ? prefix + "[" + prop + "]" : prop
				var value = object[prop]
				var valueType = type.call(value)
				var pair = (value === null) ? encodeURIComponent(key) :
					valueType === OBJECT ? buildQueryString(value, key) :
					valueType === ARRAY ? value.reduce(function(memo, item) {
						if (!duplicates[key]) duplicates[key] = {}
						if (!duplicates[key][item]) {
							duplicates[key][item] = true
							return memo.concat(encodeURIComponent(key) + "=" + encodeURIComponent(item))
						}
						return memo
					}, []).join("&") :
					encodeURIComponent(key) + "=" + encodeURIComponent(value)
				if (value !== undefined) str.push(pair)
			}
			return str.join("&")
		}
		function parseQueryString(str) {
			if (str.charAt(0) === "?") str = str.substring(1);
			
			var pairs = str.split("&"), params = {};
			for (var i = 0, len = pairs.length; i < len; i++) {
				var pair = pairs[i].split("=");
				var key = decodeURIComponent(pair[0])
				var value = pair.length == 2 ? decodeURIComponent(pair[1]) : null
				if (params[key] != null) {
					if (type.call(params[key]) !== ARRAY) params[key] = [params[key]]
					params[key].push(value)
				}
				else params[key] = value
			}
			return params
		}
		m.route.buildQueryString = buildQueryString
		m.route.parseQueryString = parseQueryString
		
		function reset(root) {
			var cacheKey = getCellCacheKey(root);
			clear(root.childNodes, cellCache[cacheKey]);
			cellCache[cacheKey] = undefined
		}
	
		m.deferred = function () {
			var deferred = new Deferred();
			deferred.promise = propify(deferred.promise);
			return deferred
		};
		function propify(promise, initialValue) {
			var prop = m.prop(initialValue);
			promise.then(prop);
			prop.then = function(resolve, reject) {
				return propify(promise.then(resolve, reject), initialValue)
			};
			return prop
		}
		//Promiz.mithril.js | Zolmeister | MIT
		//a modified version of Promiz.js, which does not conform to Promises/A+ for two reasons:
		//1) `then` callbacks are called synchronously (because setTimeout is too slow, and the setImmediate polyfill is too big
		//2) throwing subclasses of Error cause the error to be bubbled up instead of triggering rejection (because the spec does not account for the important use case of default browser error handling, i.e. message w/ line number)
		function Deferred(successCallback, failureCallback) {
			var RESOLVING = 1, REJECTING = 2, RESOLVED = 3, REJECTED = 4;
			var self = this, state = 0, promiseValue = 0, next = [];
	
			self["promise"] = {};
	
			self["resolve"] = function(value) {
				if (!state) {
					promiseValue = value;
					state = RESOLVING;
	
					fire()
				}
				return this
			};
	
			self["reject"] = function(value) {
				if (!state) {
					promiseValue = value;
					state = REJECTING;
	
					fire()
				}
				return this
			};
	
			self.promise["then"] = function(successCallback, failureCallback) {
				var deferred = new Deferred(successCallback, failureCallback);
				if (state === RESOLVED) {
					deferred.resolve(promiseValue)
				}
				else if (state === REJECTED) {
					deferred.reject(promiseValue)
				}
				else {
					next.push(deferred)
				}
				return deferred.promise
			};
	
			function finish(type) {
				state = type || REJECTED;
				next.map(function(deferred) {
					state === RESOLVED && deferred.resolve(promiseValue) || deferred.reject(promiseValue)
				})
			}
	
			function thennable(then, successCallback, failureCallback, notThennableCallback) {
				if (((promiseValue != null && type.call(promiseValue) === OBJECT) || typeof promiseValue === FUNCTION) && typeof then === FUNCTION) {
					try {
						// count protects against abuse calls from spec checker
						var count = 0;
						then.call(promiseValue, function(value) {
							if (count++) return;
							promiseValue = value;
							successCallback()
						}, function (value) {
							if (count++) return;
							promiseValue = value;
							failureCallback()
						})
					}
					catch (e) {
						m.deferred.onerror(e);
						promiseValue = e;
						failureCallback()
					}
				} else {
					notThennableCallback()
				}
			}
	
			function fire() {
				// check if it's a thenable
				var then;
				try {
					then = promiseValue && promiseValue.then
				}
				catch (e) {
					m.deferred.onerror(e);
					promiseValue = e;
					state = REJECTING;
					return fire()
				}
				thennable(then, function() {
					state = RESOLVING;
					fire()
				}, function() {
					state = REJECTING;
					fire()
				}, function() {
					try {
						if (state === RESOLVING && typeof successCallback === FUNCTION) {
							promiseValue = successCallback(promiseValue)
						}
						else if (state === REJECTING && typeof failureCallback === "function") {
							promiseValue = failureCallback(promiseValue);
							state = RESOLVING
						}
					}
					catch (e) {
						m.deferred.onerror(e);
						promiseValue = e;
						return finish()
					}
	
					if (promiseValue === self) {
						promiseValue = TypeError();
						finish()
					}
					else {
						thennable(then, function () {
							finish(RESOLVED)
						}, finish, function () {
							finish(state === RESOLVING && RESOLVED)
						})
					}
				})
			}
		}
		m.deferred.onerror = function(e) {
			if (type.call(e) === "[object Error]" && !e.constructor.toString().match(/ Error/)) throw e
		};
	
		m.sync = function(args) {
			var method = "resolve";
			function synchronizer(pos, resolved) {
				return function(value) {
					results[pos] = value;
					if (!resolved) method = "reject";
					if (--outstanding === 0) {
						deferred.promise(results);
						deferred[method](results)
					}
					return value
				}
			}
	
			var deferred = m.deferred();
			var outstanding = args.length;
			var results = new Array(outstanding);
			if (args.length > 0) {
				for (var i = 0; i < args.length; i++) {
					args[i].then(synchronizer(i, true), synchronizer(i, false))
				}
			}
			else deferred.resolve([]);
	
			return deferred.promise
		};
		function identity(value) {return value}
	
		function ajax(options) {
			if (options.dataType && options.dataType.toLowerCase() === "jsonp") {
				var callbackKey = "mithril_callback_" + new Date().getTime() + "_" + (Math.round(Math.random() * 1e16)).toString(36);
				var script = $document.createElement("script");
	
				window[callbackKey] = function(resp) {
					script.parentNode.removeChild(script);
					options.onload({
						type: "load",
						target: {
							responseText: resp
						}
					});
					window[callbackKey] = undefined
				};
	
				script.onerror = function(e) {
					script.parentNode.removeChild(script);
	
					options.onerror({
						type: "error",
						target: {
							status: 500,
							responseText: JSON.stringify({error: "Error making jsonp request"})
						}
					});
					window[callbackKey] = undefined;
	
					return false
				};
	
				script.onload = function(e) {
					return false
				};
	
				script.src = options.url
					+ (options.url.indexOf("?") > 0 ? "&" : "?")
					+ (options.callbackKey ? options.callbackKey : "callback")
					+ "=" + callbackKey
					+ "&" + buildQueryString(options.data || {});
				$document.body.appendChild(script)
			}
			else {
				var xhr = new window.XMLHttpRequest;
				xhr.open(options.method, options.url, true, options.user, options.password);
				xhr.onreadystatechange = function() {
					if (xhr.readyState === 4) {
						if (xhr.status >= 200 && xhr.status < 300) options.onload({type: "load", target: xhr});
						else options.onerror({type: "error", target: xhr})
					}
				};
				if (options.serialize === JSON.stringify && options.data && options.method !== "GET") {
					xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8")
				}
				if (options.deserialize === JSON.parse) {
					xhr.setRequestHeader("Accept", "application/json, text/*");
				}
				if (typeof options.config === FUNCTION) {
					var maybeXhr = options.config(xhr, options);
					if (maybeXhr != null) xhr = maybeXhr
				}
	
				var data = options.method === "GET" || !options.data ? "" : options.data
				if (data && (type.call(data) != STRING && data.constructor != window.FormData)) {
					throw "Request data should be either be a string or FormData. Check the `serialize` option in `m.request`";
				}
				xhr.send(data);
				return xhr
			}
		}
		function bindData(xhrOptions, data, serialize) {
			if (xhrOptions.method === "GET" && xhrOptions.dataType != "jsonp") {
				var prefix = xhrOptions.url.indexOf("?") < 0 ? "?" : "&";
				var querystring = buildQueryString(data);
				xhrOptions.url = xhrOptions.url + (querystring ? prefix + querystring : "")
			}
			else xhrOptions.data = serialize(data);
			return xhrOptions
		}
		function parameterizeUrl(url, data) {
			var tokens = url.match(/:[a-z]\w+/gi);
			if (tokens && data) {
				for (var i = 0; i < tokens.length; i++) {
					var key = tokens[i].slice(1);
					url = url.replace(tokens[i], data[key]);
					delete data[key]
				}
			}
			return url
		}
	
		m.request = function(xhrOptions) {
			if (xhrOptions.background !== true) m.startComputation();
			var deferred = new Deferred();
			var isJSONP = xhrOptions.dataType && xhrOptions.dataType.toLowerCase() === "jsonp";
			var serialize = xhrOptions.serialize = isJSONP ? identity : xhrOptions.serialize || JSON.stringify;
			var deserialize = xhrOptions.deserialize = isJSONP ? identity : xhrOptions.deserialize || JSON.parse;
			var extract = isJSONP ? function(jsonp) {return jsonp.responseText} : xhrOptions.extract || function(xhr) {
				return xhr.responseText.length === 0 && deserialize === JSON.parse ? null : xhr.responseText
			};
			xhrOptions.method = (xhrOptions.method || 'GET').toUpperCase();
			xhrOptions.url = parameterizeUrl(xhrOptions.url, xhrOptions.data);
			xhrOptions = bindData(xhrOptions, xhrOptions.data, serialize);
			xhrOptions.onload = xhrOptions.onerror = function(e) {
				try {
					e = e || event;
					var unwrap = (e.type === "load" ? xhrOptions.unwrapSuccess : xhrOptions.unwrapError) || identity;
					var response = unwrap(deserialize(extract(e.target, xhrOptions)), e.target);
					if (e.type === "load") {
						if (type.call(response) === ARRAY && xhrOptions.type) {
							for (var i = 0; i < response.length; i++) response[i] = new xhrOptions.type(response[i])
						}
						else if (xhrOptions.type) response = new xhrOptions.type(response)
					}
					deferred[e.type === "load" ? "resolve" : "reject"](response)
				}
				catch (e) {
					m.deferred.onerror(e);
					deferred.reject(e)
				}
				if (xhrOptions.background !== true) m.endComputation()
			};
			ajax(xhrOptions);
			deferred.promise = propify(deferred.promise, xhrOptions.initialValue);
			return deferred.promise
		};
	
		//testing API
		m.deps = function(mock) {
			initialize(window = mock || window);
			return window;
		};
		//for internal testing only, do not use `m.deps.factory`
		m.deps.factory = app;
	
		return m
	})(typeof window != "undefined" ? window : {});
	
	if (typeof module != "undefined" && module !== null && module.exports) module.exports = m;
	else if (true) !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {return m}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(54)(module)))

/***/ },
/* 54 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	__webpack_require__(56);
	
	var _roster = __webpack_require__(40);
	
	var _roster2 = _interopRequireDefault(_roster);
	
	var _router = __webpack_require__(41);
	
	var _router2 = _interopRequireDefault(_router);
	
	var _lang = __webpack_require__(49);
	
	var _lang2 = _interopRequireDefault(_lang);
	
	var _mithril = __webpack_require__(53);
	
	var _mithril2 = _interopRequireDefault(_mithril);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function clickAndClose(click, close) {
	    return function () {
	        return click() && close();
	    };
	}
	
	function $icon(icon) {
	    return icon && {
	        tag: 'i',
	        attrs: { className: 'fa fa-' + icon }
	    };
	}
	function $image(src) {
	    return src && {
	        tag: 'i',
	        children: ['\n            ', {
	            tag: 'img',
	            attrs: { src: src }
	        }, '\n        '],
	        attrs: { className: 'icon' }
	    };
	}
	
	var Menu = {
	    controller: function controller(args) {
	        var _this = this;
	
	        this.open = false;
	        this.toggle = function () {
	            _this.open = !_this.open;
	        };
	    },
	    view: function view(ctrl, args) {
	        var isOpen = ctrl.open;
	        var options = [];
	        var menu = args.menu;
	        var menuKey = args.menuKey;
	        // header
	
	        options.push({
	            tag: 'li',
	            children: ['\n                ', _lang2.default.get('options'), '\n            '],
	            attrs: { className: 'option--header' }
	        });
	        if (menu) {
	            if (menu.header) {
	                var icon = $icon(menu.header.icon);
	                var image = $image(menu.header.image);
	                options.push({
	                    tag: 'li',
	                    children: ['\n                        ', icon, '\n                        ', image, '\n                        ', _lang2.default.get(menu.header.title), '\n                    '],
	                    attrs: { className: 'option--section' }
	                });
	            }
	            if (menu.options && menu.options.length) {
	                menu.options.forEach(function (option, index, array) {
	                    var header = option.header;
	                    var icon = $icon(option.icon);
	                    var image = $image(option.image);
	                    var selected = menuKey && option.selected && option.selected(menuKey);
	                    var type = option.type || 'default';
	                    var control = undefined;
	                    if (type === 'check') {
	                        control = selected ? $icon('check-square-o') : $icon('fa-square-o');
	                        selected = null;
	                    } else if (type === 'radio') {
	                        control = selected ? $icon('fa fa-dot-circle-o') : $icon('fa fa-circle-o');
	                        selected = null;
	                    }
	                    var split = option.split;
	                    var onClick = option.onclick && clickAndClose(option.onclick, ctrl.toggle) || null;
	                    options.push({
	                        tag: 'li',
	                        children: ['\n                            ', control, '\n                            ', icon, '\n                            ', image, '\n                            ', _lang2.default.get(option.title), '\n                        '],
	                        attrs: {
	                            className: header ? 'option--section' : 'option ' + (selected ? 'option--selected' : '') + ' ' + (split ? 'option--split-' + split : ''),
	                            onclick: onClick
	                        }
	                    });
	                });
	            }
	        }
	        // languages
	        options.push({
	            tag: 'li',
	            children: ['\n                ', $icon('globe'), '\n                ', _lang2.default.get('language'), '\n            '],
	            attrs: { className: 'option--section' }
	        });
	        for (var id in _lang2.default.messages) {
	            var selectLanguage = _lang2.default.change.bind(_lang2.default, id);
	            options.push({
	                tag: 'li',
	                children: ['\n                    ', $image('images/lang/' + id + '.png'), '\n                    ', _lang2.default.messages[id].lang, '\n                '],
	                attrs: {
	                    className: 'option ' + (_lang2.default.current === id ? 'option--selected' : ''),
	                    onclick: selectLanguage
	                }
	            });
	        }
	        // share
	        options.push({
	            tag: 'li',
	            children: ['\n                ', _lang2.default.get('share-to'), '\n            '],
	            attrs: { className: 'option--section' }
	        });
	        var _arr = [{
	            id: 'google',
	            icon: 'google'
	
	        }, {
	            id: 'facebook',
	            icon: 'facebook'
	        }, {
	            id: 'twitter',
	            icon: 'twitter'
	        }];
	        for (var _i = 0; _i < _arr.length; _i++) {
	            var _arr$_i = _arr[_i];
	            var id = _arr$_i.id;
	            var icon = _arr$_i.icon;
	
	            options.push({
	                tag: 'li',
	                children: ['\n                    ', $icon(icon), '\n                    ', _lang2.default.get(id), '\n                '],
	                attrs: { className: 'option' }
	            });
	        }
	        return {
	            tag: 'div',
	            children: ['\n                ', {
	                tag: 'div',
	                attrs: { className: 'menu--background', onclick: ctrl.toggle }
	            }, '\n                ', {
	                tag: 'div',
	                children: ['\n                    ', {
	                    tag: 'ul',
	                    children: ['\n                        ', options, '\n                    '],
	                    attrs: { className: 'menu--options' }
	                }, '\n                    ', {
	                    tag: 'div',
	                    children: ['\n                        ', $icon('bars'), '\n                    '],
	                    attrs: { className: 'menu--button', onclick: ctrl.toggle }
	                }, '\n                '],
	                attrs: { className: 'wrapper' }
	            }, '\n            '],
	            attrs: { className: 'menu ' + (isOpen ? 'menu--open' : '') }
	        };
	    }
	};
	
	exports.default = Menu;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(57);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(34)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/sass-loader/index.js!./Menu.scss", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/sass-loader/index.js!./Menu.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(28)();
	// imports
	
	
	// module
	exports.push([module.id, ".menu {\n  pointer-events: none;\n  position: fixed;\n  top: 0;\n  right: 0;\n  width: 100%;\n  height: 100%; }\n  .menu .wrapper {\n    pointer-events: none;\n    position: absolute;\n    top: 0;\n    right: 0;\n    position: absolute;\n    width: 80%;\n    max-width: 400px;\n    height: 100%; }\n  .menu ul, .menu li {\n    display: block;\n    list-style-type: none;\n    margin: 0;\n    padding: 0; }\n  .menu .menu--button {\n    pointer-events: auto;\n    cursor: pointer;\n    position: absolute;\n    top: 0;\n    right: 0;\n    padding: 8px 16px;\n    background: #f6f6f6;\n    color: #000;\n    font-size: 1.5em;\n    text-shadow: 0 1px 0 #fff;\n    border: solid silver;\n    border-width: 0 0 1px 1px;\n    box-sizing: border-box;\n    transition: color 0.25s, border-color 0.25s, text-shadow 0.25s, background 0.25s; }\n    .menu .menu--button:hover {\n      background: #eee; }\n  .menu .menu--options {\n    pointer-events: auto;\n    position: absolute;\n    overflow: hidden;\n    top: 0;\n    right: 0;\n    width: 0;\n    max-height: 0;\n    overflow-y: auto;\n    opacity: 0.001;\n    background: #38c;\n    transition: opacity 0s ease 0.25s, max-height 0.25s, width 0.25s; }\n    .menu .menu--options .option--header,\n    .menu .menu--options .option--section {\n      font-family: Hanzel, Verdana, Geneva, sans-serif;\n      font-size: 1.1em;\n      line-height: 1.1em;\n      color: #fff;\n      text-shadow: 0 1px 0 #000;\n      text-transform: uppercase;\n      padding: .75em; }\n    .menu .menu--options .option--header {\n      padding: .75em; }\n    .menu .menu--options .option--section {\n      line-height: 1.3em;\n      padding: .5em .75em;\n      background: rgba(255, 255, 255, 0.1); }\n    .menu .menu--options .option {\n      cursor: pointer;\n      font-family: Hanzel, Verdana, Geneva, sans-serif;\n      font-size: 1.1em;\n      line-height: 1.1em;\n      color: #fff;\n      padding: .5em .5em .5em 1.5em;\n      text-shadow: 0 1px 0 #000;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n      overflow: hidden; }\n      .menu .menu--options .option:hover {\n        background: #ddd;\n        color: #000;\n        text-shadow: 0 1px 0 #fff; }\n      .menu .menu--options .option.option--selected {\n        background: #eee;\n        color: #000;\n        text-shadow: 0 1px 0 #fff; }\n      .menu .menu--options .option.option--split-2, .menu .menu--options .option.option--split-3, .menu .menu--options .option.option--split-4, .menu .menu--options .option.option--split-5, .menu .menu--options .option.option--split-6 {\n        display: inline-block;\n        display: inline-table;\n        box-sizing: border-box;\n        text-align: center;\n        padding: .5em .5em .5em .5em; }\n      .menu .menu--options .option.option--split-2 {\n        width: 50%; }\n      .menu .menu--options .option.option--split-3 {\n        width: 33.333%; }\n      .menu .menu--options .option.option--split-4 {\n        width: 25%; }\n      .menu .menu--options .option.option--split-5 {\n        width: 20%; }\n      .menu .menu--options .option.option--split-6 {\n        width: 16.664%; }\n    .menu .menu--options .icon {\n      position: relative;\n      display: inline-block;\n      margin: -.25em 0; }\n      .menu .menu--options .icon img {\n        position: relative;\n        width: 1.2em;\n        margin-bottom: -.3em;\n        z-index: 100; }\n  .menu .menu--background {\n    pointer-events: none;\n    position: absolute;\n    top: 0;\n    right: 0;\n    width: 100%;\n    height: 100%;\n    background: transparent;\n    transition: background 0.25s; }\n  .menu.menu--open .menu--button,\n  .menu.menu--open .menu--button:hover {\n    color: #fff;\n    text-shadow: 0 1px 0 #000;\n    border-color: rgba(192, 192, 192, 0);\n    background: rgba(255, 255, 255, 0);\n    box-shadow: 0 0 0 transparent; }\n  .menu.menu--open .menu--options {\n    opacity: 1;\n    width: 100%;\n    max-height: 100%;\n    transition: opacity 0s, max-height 0.25s, width 0.25s; }\n  .menu.menu--open .menu--background {\n    pointer-events: auto;\n    background: rgba(0, 0, 0, 0.5); }\n", ""]);
	
	// exports


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	__webpack_require__(59);
	
	var _mithril = __webpack_require__(53);
	
	var _mithril2 = _interopRequireDefault(_mithril);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Card = {
		view: function view(ctrl, args) {
			var front = args.front;
			var back = args.back;
			var flipped = args.flipped;
	
			return {
				tag: 'div',
				children: ['\n\t\t\t\t', {
					tag: 'div',
					children: ['\n\t\t\t\t\t', front, '\n\t\t\t\t'],
					attrs: { className: 'card-front' }
				}, '\n\t\t\t\t', {
					tag: 'div',
					children: ['\n\t\t\t\t\t', back, '\n\t\t\t\t'],
					attrs: { className: 'card-back' }
				}, '\n\t\t\t'],
				attrs: { className: 'card ' + (flipped ? 'card--flipped' : '') }
			};
		}
	};
	
	exports.default = Card;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(60);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(34)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./Card.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./Card.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(28)();
	// imports
	
	
	// module
	exports.push([module.id, ".card {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  background: #fff;\n  transform-style: preserve-3d;\n  transition: transform 0.333s; }\n  .card .card-front,\n  .card .card-back {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    overflow-y: auto;\n    background: #fff;\n    backface-visibility: hidden; }\n  .card .card-back {\n    pointer-events: none;\n    transform: rotateY(180deg); }\n  .card.card--flipped {\n    transform: rotateY(180deg); }\n    .card.card--flipped .card-front {\n      pointer-events: none; }\n    .card.card--flipped .card-back {\n      pointer-events: auto; }\n", ""]);
	
	// exports


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.menu = exports.tab = undefined;
	
	__webpack_require__(62);
	
	var _Message = __webpack_require__(64);
	
	var _Message2 = _interopRequireDefault(_Message);
	
	var _effects = __webpack_require__(67);
	
	var _champions = __webpack_require__(35);
	
	var _synergies = __webpack_require__(69);
	
	var _synergies2 = _interopRequireDefault(_synergies);
	
	var _guides = __webpack_require__(71);
	
	var _guides2 = _interopRequireDefault(_guides);
	
	var _roster = __webpack_require__(40);
	
	var _roster2 = _interopRequireDefault(_roster);
	
	var _router = __webpack_require__(41);
	
	var _router2 = _interopRequireDefault(_router);
	
	var _lang = __webpack_require__(49);
	
	var _lang2 = _interopRequireDefault(_lang);
	
	var _mithril = __webpack_require__(53);
	
	var _mithril2 = _interopRequireDefault(_mithril);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var tab = {
		id: 'guide',
		icon: 'user',
		title: 'guide'
	};
	
	var menu = {
		header: {
			title: 'guides',
			icon: 'user'
		},
		options: []
	};
	_champions.uidsByType.forEach(function (_ref) {
		var typeId = _ref.typeId;
		var uids = _ref.uids;
	
		menu.options.push({
			header: true,
			title: 'type-' + typeId + '-name'
		});
		menu.options = menu.options.concat(uids.map(function (uid) {
			return {
				title: 'champion-' + uid + '-name',
				image: '../images/champions/portrait_' + uid + '.png',
				selected: function selected(currentUid) {
					return currentUid === uid;
				},
				onclick: function onclick() {
					return _router2.default.setRoute('/guide/' + uid) && false;
				}
			};
		}));
	});
	
	function $image(src) {
		return src && {
			tag: 'i',
			children: ['\n            ', {
				tag: 'img',
				attrs: { src: src }
			}, '\n        '],
			attrs: { className: 'icon' }
		};
	}
	
	var getSynergies = function getSynergies(uid, isFrom) {
		var filtered = _synergies2.default.filter(function (synergy) {
			return synergy.attr[isFrom ? 'fromId' : 'toId'] === uid;
		});
		var keeperStars = {};
		filtered.forEach(function (synergy) {
			var _synergy$attr = synergy.attr;
			var fromId = _synergy$attr.fromId;
			var fromStars = _synergy$attr.fromStars;
			var toId = _synergy$attr.toId;
	
			if (isFrom && (!keeperStars[toId] || keeperStars[toId] > fromStars)) keeperStars[toId] = fromStars;
			if (!isFrom && (!keeperStars[fromId] || keeperStars[fromId] > fromStars)) keeperStars[fromId] = fromStars;
		});
		return filtered.filter(function (synergy) {
			var _synergy$attr2 = synergy.attr;
			var fromId = _synergy$attr2.fromId;
			var fromStars = _synergy$attr2.fromStars;
			var toId = _synergy$attr2.toId;
	
			var uid = isFrom ? toId : fromId;
			return fromStars === keeperStars[uid];
		});
	};
	
	var $synergy = function $synergy(championId, effectId, stars) {
		return {
			tag: 'div',
			children: ['\n\t\t\t', $image('../images/champions/portrait_' + championId + '.png'), $image((0, _effects.effectImage)(effectId)), '\n\t\t\t', {
				tag: 'span',
				children: ['\n\t\t\t\t', stars, '★ \n\t\t\t\t', _lang2.default.get('champion-' + championId + '-name'), '\n\t\t\t'],
				attrs: { className: 'champion--name', onclick: function onclick() {
						return _router2.default.setRoute('/guide/' + championId);
					} }
			}, '\n\t\t\t', {
				tag: 'span',
				children: ['\n\t\t\t\t', _lang2.default.get('effect-' + effectId + '-name'), '\n\t\t\t'],
				attrs: { className: 'effect--name' }
			}, '\n\t\t'],
			attrs: { className: 'guide--synergy' }
		};
	};
	
	var Guide = {
		view: function view(ctrl, args) {
			var uid = args.uid;
	
			var guide = _guides2.default[uid];
			var mySynergies = getSynergies(uid, true).map(function (synergy) {
				var _synergy$attr3 = synergy.attr;
				var toId = _synergy$attr3.toId;
				var fromStars = _synergy$attr3.fromStars;
				var effectId = _synergy$attr3.effectId;
	
				return $synergy(toId, effectId, fromStars);
			});
			var externalSynergies = getSynergies(uid, false).map(function (synergy) {
				var _synergy$attr4 = synergy.attr;
				var fromId = _synergy$attr4.fromId;
				var fromStars = _synergy$attr4.fromStars;
				var effectId = _synergy$attr4.effectId;
	
				return $synergy(fromId, effectId, fromStars);
			});
	
			return {
				tag: 'div',
				children: ['\n\t\t\t\t', {
					tag: 'h2',
					children: [_lang2.default.get('champion-' + uid + '-name')]
				}, '\n\n\t\t\t\t', {
					tag: 'h3',
					children: [_lang2.default.get('synergies')]
				}, '\n\t\t\t\t', {
					tag: 'div',
					children: [mySynergies]
				}, '\n\n\t\t\t\t', {
					tag: 'h3',
					children: [_lang2.default.get('synergies-external')]
				}, '\n\t\t\t\t', {
					tag: 'div',
					children: [externalSynergies]
				}, '\n\t\t\t'],
				attrs: { className: 'guide' }
			};
		}
	};
	
	exports.tab = tab;
	exports.menu = menu;
	exports.default = Guide;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(63);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(34)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/sass-loader/index.js!./Guide.scss", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/sass-loader/index.js!./Guide.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(28)();
	// imports
	
	
	// module
	exports.push([module.id, ".guide {\n  padding: 24px;\n  background: #fff;\n  min-height: 100%;\n  box-sizing: border-box; }\n  .guide .icon {\n    position: relative;\n    display: inline-block;\n    margin: .25em 0; }\n    .guide .icon img {\n      position: relative;\n      width: 1.5em;\n      margin-bottom: -.3em;\n      z-index: 100; }\n  .guide h2,\n  .guide h3 {\n    font-weight: normal;\n    font-family: Hanzel, Verdana, Geneva, sans-serif;\n    text-shadow: 0 1px 0 #ccc; }\n  .guide .guide--synergy .champion--name {\n    cursor: pointer;\n    display: inline-block;\n    font-family: Hanzel, Verdana, Geneva, sans-serif;\n    font-size: 1.0em;\n    text-transform: uppercase;\n    text-shadow: 0 1px 0 #ccc; }\n  .guide .guide--synergy .effect--name {\n    display: inline-block;\n    font-family: Helvetica Neue,Helvetica,Arial,sans-serif;\n    font-size: 1.0em; }\n", ""]);
	
	// exports


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	__webpack_require__(65);
	
	var _mithril = __webpack_require__(53);
	
	var _mithril2 = _interopRequireDefault(_mithril);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Message = {
		view: function view(ctrl, args) {
			var value = args.value;
	
			return {
				tag: 'div',
				children: ['\n\t\t\t\t', value, '\n\t\t\t'],
				attrs: { className: 'message' }
			};
		}
	};
	
	exports.default = Message;

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(66);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(34)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./Message.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./Message.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(28)();
	// imports
	
	
	// module
	exports.push([module.id, ".message {\n  margin: auto;\n  max-width: 250px;\n  background: rgba(0, 0, 0, 0.5);\n  color: #fff;\n  text-shadow: 0 1px 0 #000;\n  text-align: center;\n  border-radius: 5px;\n  padding: 16px;\n  font-family: Helvetica Neue,Helvetica,Arial,sans-serif;\n  font-size: 1.0em; }\n", ""]);
	
	// exports


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.effectImage = undefined;
	
	var _Effect = __webpack_require__(68);
	
	var _Effect2 = _interopRequireDefault(_Effect);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var effects = [{ uid: 'attack', base: 5 }, { uid: 'stun', base: 15 }, { uid: 'critrate', base: 5 }, { uid: 'critdamage', base: 15 }, { uid: 'powergain', base: 3 }, { uid: 'powersteal', base: 3 }, { uid: 'perfectblock', base: 3 }, { uid: 'block', base: 10 }, { uid: 'armor', base: 4 }, { uid: 'health', base: 4 }, { uid: 'healthsteal', base: 4 }].map(function (effect) {
	    return new _Effect2.default(effect);
	});
	
	var imageMap = {
	    'attack': 'attack',
	    'stun': 'stun',
	    'critrate': 'critical',
	    'critdamage': 'critical',
	    'powergain': 'mana',
	    'powersteal': 'mana-steal',
	    'perfectblock': 'block',
	    'block': 'block',
	    'armor': 'armor',
	    'health': 'health',
	    'healthsteal': 'health_steal'
	};
	
	function effectImage(uid, isAlternate) {
	    return 'images/effects/' + imageMap[uid] + (isAlternate ? '_off' : '') + '.jpg';
	}
	
	exports.effectImage = effectImage;
	exports.default = effects;

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Model2 = __webpack_require__(37);
	
	var _Model3 = _interopRequireDefault(_Model2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Effect = (function (_Model) {
	  _inherits(Effect, _Model);
	
	  function Effect(_ref) {
	    var uid = _ref.uid;
	    var base = _ref.base;
	    var amount = _ref.amount;
	
	    _classCallCheck(this, Effect);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Effect).call(this, {
	      uid: 'effect-uid',
	      base: 0,
	      amount: 0
	    }, {
	      uid: uid,
	      base: base,
	      amount: amount
	    }));
	  }
	
	  return Effect;
	})(_Model3.default);
	
	exports.default = Effect;

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Synergy = __webpack_require__(70);
	
	var _Synergy2 = _interopRequireDefault(_Synergy);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var synergies = [{ fromId: 'blackbolt', fromStars: 2, toId: 'cyclops', effectId: 'block', effectAmount: 10 }, { fromId: 'blackbolt', fromStars: 3, toId: 'cyclops', effectId: 'block', effectAmount: 15 }, { fromId: 'blackbolt', fromStars: 3, toId: 'spiderman', effectId: 'armor', effectAmount: 5 }, { fromId: 'blackbolt', fromStars: 3, toId: 'ronan', effectId: 'attack', effectAmount: 4 }, { fromId: 'blackbolt', fromStars: 3, toId: 'hulk', effectId: 'critdamage', effectAmount: 20 }, { fromId: 'blackbolt', fromStars: 4, toId: 'cyclops', effectId: 'block', effectAmount: 20 }, { fromId: 'blackbolt', fromStars: 4, toId: 'spiderman', effectId: 'armor', effectAmount: 6 }, { fromId: 'blackbolt', fromStars: 4, toId: 'ronan', effectId: 'attack', effectAmount: 5 }, { fromId: 'blackbolt', fromStars: 4, toId: 'hulk', effectId: 'critdamage', effectAmount: 25 }, { fromId: 'captainmarvel', fromStars: 3, toId: 'captainamerica', effectId: 'armor', effectAmount: 5 }, { fromId: 'captainmarvel', fromStars: 3, toId: 'gamora', effectId: 'armor', effectAmount: 5 }, { fromId: 'captainmarvel', fromStars: 3, toId: 'ironman', effectId: 'armor', effectAmount: 5 }, { fromId: 'captainmarvel', fromStars: 4, toId: 'captainamerica', effectId: 'armor', effectAmount: 6 }, { fromId: 'captainmarvel', fromStars: 4, toId: 'gamora', effectId: 'armor', effectAmount: 6 }, { fromId: 'captainmarvel', fromStars: 4, toId: 'ironman', effectId: 'armor', effectAmount: 6 }, { fromId: 'captainmarvel', fromStars: 4, toId: 'wolverine', effectId: 'powergain', effectAmount: 5 }, { fromId: 'captainmarvel', fromStars: 5, toId: 'captainamerica', effectId: 'armor', effectAmount: 7 }, { fromId: 'captainmarvel', fromStars: 5, toId: 'gamora', effectId: 'armor', effectAmount: 7 }, { fromId: 'captainmarvel', fromStars: 5, toId: 'ironman', effectId: 'armor', effectAmount: 7 }, { fromId: 'captainmarvel', fromStars: 5, toId: 'wolverine', effectId: 'powergain', effectAmount: 6 }, { fromId: 'drax', fromStars: 2, toId: 'starlord', effectId: 'perfectblock', effectAmount: 3 }, { fromId: 'drax', fromStars: 2, toId: 'gamora', effectId: 'critdamage', effectAmount: 15 }, { fromId: 'drax', fromStars: 3, toId: 'starlord', effectId: 'perfectblock', effectAmount: 4 }, { fromId: 'drax', fromStars: 3, toId: 'gamora', effectId: 'critdamage', effectAmount: 20 }, { fromId: 'drax', fromStars: 4, toId: 'starlord', effectId: 'perfectblock', effectAmount: 5 }, { fromId: 'drax', fromStars: 4, toId: 'gamora', effectId: 'critdamage', effectAmount: 25 }, { fromId: 'gamora', fromStars: 2, toId: 'starlord', effectId: 'armor', effectAmount: 4 }, { fromId: 'gamora', fromStars: 3, toId: 'starlord', effectId: 'armor', effectAmount: 5 }, { fromId: 'gamora', fromStars: 3, toId: 'drax', effectId: 'critdamage', effectAmount: 20 }, { fromId: 'gamora', fromStars: 4, toId: 'starlord', effectId: 'armor', effectAmount: 6 }, { fromId: 'gamora', fromStars: 4, toId: 'drax', effectId: 'critdamage', effectAmount: 25 }, { fromId: 'msmarvel', fromStars: 3, toId: 'captainamerica', effectId: 'armor', effectAmount: 5 }, { fromId: 'msmarvel', fromStars: 3, toId: 'ironman', effectId: 'perfectblock', effectAmount: 4 }, { fromId: 'msmarvel', fromStars: 3, toId: 'thor', effectId: 'perfectblock', effectAmount: 4 }, { fromId: 'msmarvel', fromStars: 3, toId: 'hulk', effectId: 'perfectblock', effectAmount: 4 }, { fromId: 'msmarvel', fromStars: 4, toId: 'captainamerica', effectId: 'armor', effectAmount: 6 }, { fromId: 'msmarvel', fromStars: 4, toId: 'ironman', effectId: 'perfectblock', effectAmount: 5 }, { fromId: 'msmarvel', fromStars: 4, toId: 'thor', effectId: 'perfectblock', effectAmount: 5 }, { fromId: 'msmarvel', fromStars: 4, toId: 'hulk', effectId: 'perfectblock', effectAmount: 5 }, { fromId: 'ronan', fromStars: 2, toId: 'blackbolt', effectId: 'critdamage', effectAmount: 15 }, { fromId: 'ronan', fromStars: 3, toId: 'blackbolt', effectId: 'critdamage', effectAmount: 20 }, { fromId: 'ronan', fromStars: 3, toId: 'ironman', effectId: 'critrate', effectAmount: 6 }, { fromId: 'ronan', fromStars: 3, toId: 'gamora', effectId: 'critdamage', effectAmount: 20 }, { fromId: 'ronan', fromStars: 4, toId: 'blackbolt', effectId: 'critdamage', effectAmount: 25 }, { fromId: 'ronan', fromStars: 4, toId: 'ironman', effectId: 'critrate', effectAmount: 7 }, { fromId: 'ronan', fromStars: 4, toId: 'gamora', effectId: 'critdamage', effectAmount: 25 }, { fromId: 'ronan', fromStars: 5, toId: 'blackbolt', effectId: 'critdamage', effectAmount: 25 }, { fromId: 'ronan', fromStars: 5, toId: 'ironman', effectId: 'critrate', effectAmount: 7 }, { fromId: 'ronan', fromStars: 5, toId: 'gamora', effectId: 'critdamage', effectAmount: 25 }, { fromId: 'spidermanblack', fromStars: 3, toId: 'storm', effectId: 'armor', effectAmount: 5 }, { fromId: 'spidermanblack', fromStars: 3, toId: 'electro', effectId: 'critrate', effectAmount: 6 }, { fromId: 'spidermanblack', fromStars: 4, toId: 'storm', effectId: 'armor', effectAmount: 6 }, { fromId: 'spidermanblack', fromStars: 4, toId: 'electro', effectId: 'critrate', effectAmount: 7 }, { fromId: 'superiorironman', fromStars: 2, toId: 'captainamerica', effectId: 'critrate', effectAmount: 5 }, { fromId: 'superiorironman', fromStars: 2, toId: 'daredevil', effectId: 'critdamage', effectAmount: 15 }, { fromId: 'superiorironman', fromStars: 2, toId: 'thor', effectId: 'perfectblock', effectAmount: 3 }, { fromId: 'superiorironman', fromStars: 3, toId: 'captainamerica', effectId: 'critrate', effectAmount: 6 }, { fromId: 'superiorironman', fromStars: 3, toId: 'daredevil', effectId: 'critdamage', effectAmount: 20 }, { fromId: 'superiorironman', fromStars: 3, toId: 'thor', effectId: 'perfectblock', effectAmount: 4 }, { fromId: 'superiorironman', fromStars: 4, toId: 'captainamerica', effectId: 'critrate', effectAmount: 7 }, { fromId: 'superiorironman', fromStars: 4, toId: 'daredevil', effectId: 'critdamage', effectAmount: 25 }, { fromId: 'superiorironman', fromStars: 4, toId: 'thor', effectId: 'perfectblock', effectAmount: 4 }, { fromId: 'thor', fromStars: 2, toId: 'drstrange', effectId: 'armor', effectAmount: 4 }, { fromId: 'thor', fromStars: 2, toId: 'ironman', effectId: 'armor', effectAmount: 4 }, { fromId: 'thor', fromStars: 3, toId: 'drstrange', effectId: 'armor', effectAmount: 5 }, { fromId: 'thor', fromStars: 3, toId: 'ironman', effectId: 'armor', effectAmount: 5 }, { fromId: 'thor', fromStars: 3, toId: 'juggernaut', effectId: 'armor', effectAmount: 6 }, { fromId: 'thor', fromStars: 4, toId: 'drstrange', effectId: 'armor', effectAmount: 6 }, { fromId: 'thor', fromStars: 4, toId: 'ironman', effectId: 'armor', effectAmount: 6 }, { fromId: 'thor', fromStars: 4, toId: 'juggernaut', effectId: 'armor', effectAmount: 7 }, { fromId: 'venom', fromStars: 3, toId: 'spiderman', effectId: 'attack', effectAmount: 5 }, { fromId: 'venom', fromStars: 3, toId: 'spidermanblack', effectId: 'health', effectAmount: 4 }, { fromId: 'venom', fromStars: 3, toId: 'electro', effectId: 'critdamage', effectAmount: 20 }, { fromId: 'venom', fromStars: 4, toId: 'spiderman', effectId: 'attack', effectAmount: 6 }, { fromId: 'venom', fromStars: 4, toId: 'spidermanblack', effectId: 'health', effectAmount: 5 }, { fromId: 'venom', fromStars: 4, toId: 'electro', effectId: 'critdamage', effectAmount: 25 }, { fromId: 'venom', fromStars: 5, toId: 'spiderman', effectId: 'attack', effectAmount: 6 }, { fromId: 'venom', fromStars: 5, toId: 'spidermanblack', effectId: 'health', effectAmount: 5 }, { fromId: 'venom', fromStars: 5, toId: 'electro', effectId: 'critdamage', effectAmount: 25 }, { fromId: 'ironman', fromStars: 2, toId: 'thor', effectId: 'perfectblock', effectAmount: 3 }, { fromId: 'ironman', fromStars: 3, toId: 'captainamerica', effectId: 'armor', effectAmount: 5 }, { fromId: 'ironman', fromStars: 3, toId: 'thor', effectId: 'perfectblock', effectAmount: 4 }, { fromId: 'ironman', fromStars: 4, toId: 'captainamerica', effectId: 'armor', effectAmount: 6 }, { fromId: 'ironman', fromStars: 4, toId: 'thor', effectId: 'perfectblock', effectAmount: 5 }, { fromId: 'ironman', fromStars: 5, toId: 'captainamerica', effectId: 'armor', effectAmount: 6 }, { fromId: 'ironman', fromStars: 5, toId: 'thor', effectId: 'perfectblock', effectAmount: 5 }, { fromId: 'ironpatriot', fromStars: 3, toId: 'ironman', effectId: 'armor', effectAmount: 5 }, { fromId: 'ironpatriot', fromStars: 3, toId: 'spiderman', effectId: 'critrate', effectAmount: 6 }, { fromId: 'ironpatriot', fromStars: 3, toId: 'captainamerica', effectId: 'critdamage', effectAmount: 20 }, { fromId: 'ironpatriot', fromStars: 4, toId: 'ironman', effectId: 'armor', effectAmount: 6 }, { fromId: 'ironpatriot', fromStars: 4, toId: 'spiderman', effectId: 'critrate', effectAmount: 7 }, { fromId: 'ironpatriot', fromStars: 4, toId: 'captainamerica', effectId: 'critdamage', effectAmount: 25 }, { fromId: 'kang', fromStars: 4, toId: 'blackbolt', effectId: 'armor', effectAmount: 6 }, { fromId: 'kang', fromStars: 4, toId: 'thevision', effectId: 'critrate', effectAmount: 7 }, { fromId: 'kang', fromStars: 4, toId: 'thor', effectId: 'critrate', effectAmount: 7 }, { fromId: 'kang', fromStars: 4, toId: 'spidermanblack', effectId: 'critrate', effectAmount: 7 }, { fromId: 'hulkbuster', fromStars: 2, toId: 'hulk', effectId: 'critdamage', effectAmount: 15 }, { fromId: 'hulkbuster', fromStars: 3, toId: 'hulk', effectId: 'critdamage', effectAmount: 20 }, { fromId: 'hulkbuster', fromStars: 3, toId: 'ironman', effectId: 'perfectblock', effectAmount: 5 }, { fromId: 'hulkbuster', fromStars: 3, toId: 'superiorironman', effectId: 'perfectblock', effectAmount: 5 }, { fromId: 'hulkbuster', fromStars: 4, toId: 'hulk', effectId: 'critdamage', effectAmount: 25 }, { fromId: 'hulkbuster', fromStars: 4, toId: 'ironman', effectId: 'perfectblock', effectAmount: 6 }, { fromId: 'hulkbuster', fromStars: 4, toId: 'superiorironman', effectId: 'perfectblock', effectAmount: 6 }, { fromId: 'rocket', fromStars: 3, toId: 'starlord', effectId: 'armor', effectAmount: 5 }, { fromId: 'rocket', fromStars: 3, toId: 'ronan', effectId: 'critrate', effectAmount: 6 }, { fromId: 'rocket', fromStars: 3, toId: 'gamora', effectId: 'perfectblock', effectAmount: 4 }, { fromId: 'rocket', fromStars: 3, toId: 'drax', effectId: 'perfectblock', effectAmount: 4 }, { fromId: 'rocket', fromStars: 4, toId: 'starlord', effectId: 'armor', effectAmount: 6 }, { fromId: 'rocket', fromStars: 4, toId: 'ronan', effectId: 'critrate', effectAmount: 7 }, { fromId: 'rocket', fromStars: 4, toId: 'gamora', effectId: 'perfectblock', effectAmount: 5 }, { fromId: 'rocket', fromStars: 4, toId: 'drax', effectId: 'perfectblock', effectAmount: 5 }, { fromId: 'starlord', fromStars: 2, toId: 'rocket', effectId: 'armor', effectAmount: 4 }, { fromId: 'starlord', fromStars: 2, toId: 'drax', effectId: 'perfectblock', effectAmount: 3 }, { fromId: 'starlord', fromStars: 3, toId: 'rocket', effectId: 'armor', effectAmount: 5 }, { fromId: 'starlord', fromStars: 3, toId: 'drax', effectId: 'perfectblock', effectAmount: 4 }, { fromId: 'starlord', fromStars: 3, toId: 'gamora', effectId: 'perfectblock', effectAmount: 4 }, { fromId: 'starlord', fromStars: 4, toId: 'rocket', effectId: 'armor', effectAmount: 6 }, { fromId: 'starlord', fromStars: 4, toId: 'drax', effectId: 'perfectblock', effectAmount: 5 }, { fromId: 'starlord', fromStars: 4, toId: 'gamora', effectId: 'perfectblock', effectAmount: 5 }, { fromId: 'starlord', fromStars: 5, toId: 'rocket', effectId: 'armor', effectAmount: 6 }, { fromId: 'starlord', fromStars: 5, toId: 'drax', effectId: 'perfectblock', effectAmount: 5 }, { fromId: 'starlord', fromStars: 5, toId: 'gamora', effectId: 'perfectblock', effectAmount: 5 }, { fromId: 'vision', fromStars: 2, toId: 'scarletwitch', effectId: 'powergain', effectAmount: 3 }, { fromId: 'vision', fromStars: 2, toId: 'ironman', effectId: 'perfectblock', effectAmount: 3 }, { fromId: 'vision', fromStars: 3, toId: 'scarletwitch', effectId: 'powergain', effectAmount: 4 }, { fromId: 'vision', fromStars: 3, toId: 'ironman', effectId: 'perfectblock', effectAmount: 4 }, { fromId: 'vision', fromStars: 4, toId: 'scarletwitch', effectId: 'powergain', effectAmount: 5 }, { fromId: 'vision', fromStars: 4, toId: 'ironman', effectId: 'perfectblock', effectAmount: 5 }, { fromId: 'thevision', fromStars: 2, toId: 'ironman', effectId: 'health', effectAmount: 4 }, { fromId: 'thevision', fromStars: 2, toId: 'scarletwitch', effectId: 'perfectblock', effectAmount: 3 }, { fromId: 'thevision', fromStars: 3, toId: 'ironman', effectId: 'health', effectAmount: 5 }, { fromId: 'thevision', fromStars: 3, toId: 'scarletwitch', effectId: 'perfectblock', effectAmount: 4 }, { fromId: 'thevision', fromStars: 3, toId: 'ultron', effectId: 'attack', effectAmount: 4 }, { fromId: 'thevision', fromStars: 4, toId: 'ironman', effectId: 'health', effectAmount: 6 }, { fromId: 'thevision', fromStars: 4, toId: 'scarletwitch', effectId: 'perfectblock', effectAmount: 5 }, { fromId: 'thevision', fromStars: 4, toId: 'ultron', effectId: 'attack', effectAmount: 5 }, { fromId: 'ultron', fromStars: 2, toId: 'ironman', effectId: 'health', effectAmount: 4 }, { fromId: 'ultron', fromStars: 2, toId: 'scarletwitch', effectId: 'armor', effectAmount: 4 }, { fromId: 'ultron', fromStars: 3, toId: 'ironman', effectId: 'health', effectAmount: 5 }, { fromId: 'ultron', fromStars: 3, toId: 'scarletwitch', effectId: 'armor', effectAmount: 5 }, { fromId: 'ultron', fromStars: 4, toId: 'ironman', effectId: 'health', effectAmount: 6 }, { fromId: 'ultron', fromStars: 4, toId: 'scarletwitch', effectId: 'armor', effectAmount: 6 }, { fromId: 'warmachine', fromStars: 3, toId: 'hulkbuster', effectId: 'armor', effectAmount: 5 }, { fromId: 'warmachine', fromStars: 3, toId: 'hawkeye', effectId: 'block', effectAmount: 15 }, { fromId: 'warmachine', fromStars: 3, toId: 'blackwidow', effectId: 'perfectblock', effectAmount: 4 }, { fromId: 'warmachine', fromStars: 4, toId: 'hulkbuster', effectId: 'armor', effectAmount: 6 }, { fromId: 'warmachine', fromStars: 4, toId: 'blackpanther', effectId: 'critrate', effectAmount: 7 }, { fromId: 'warmachine', fromStars: 4, toId: 'hawkeye', effectId: 'block', effectAmount: 20 }, { fromId: 'warmachine', fromStars: 4, toId: 'blackwidow', effectId: 'perfectblock', effectAmount: 5 }, { fromId: 'colossus', fromStars: 2, toId: 'juggernaut', effectId: 'critrate', effectAmount: 5 }, { fromId: 'colossus', fromStars: 3, toId: 'juggernaut', effectId: 'critrate', effectAmount: 6 }, { fromId: 'colossus', fromStars: 3, toId: 'wolverine', effectId: 'armor', effectAmount: 5 }, { fromId: 'colossus', fromStars: 3, toId: 'magik', effectId: 'health', effectAmount: 4 }, { fromId: 'colossus', fromStars: 4, toId: 'juggernaut', effectId: 'critrate', effectAmount: 7 }, { fromId: 'colossus', fromStars: 4, toId: 'wolverine', effectId: 'armor', effectAmount: 6 }, { fromId: 'colossus', fromStars: 4, toId: 'magik', effectId: 'health', effectAmount: 5 }, { fromId: 'cyclops', fromStars: 2, toId: 'wolverine', effectId: 'critdamage', effectAmount: 15 }, { fromId: 'cyclops', fromStars: 3, toId: 'wolverine', effectId: 'critdamage', effectAmount: 20 }, { fromId: 'cyclops', fromStars: 3, toId: 'magneto', effectId: 'attack', effectAmount: 4 }, { fromId: 'cyclops', fromStars: 4, toId: 'wolverine', effectId: 'critdamage', effectAmount: 25 }, { fromId: 'cyclops', fromStars: 4, toId: 'magneto', effectId: 'attack', effectAmount: 5 }, { fromId: 'cyclops', fromStars: 5, toId: 'wolverine', effectId: 'critdamage', effectAmount: 25 }, { fromId: 'cyclops', fromStars: 5, toId: 'magneto', effectId: 'attack', effectAmount: 5 }, { fromId: 'deadpool', fromStars: 2, toId: 'punisher', effectId: 'perfectblock', effectAmount: 3 }, { fromId: 'deadpool', fromStars: 3, toId: 'rhino', effectId: 'critrate', effectAmount: 6 }, { fromId: 'deadpool', fromStars: 3, toId: 'wolverine', effectId: 'health', effectAmount: 4 }, { fromId: 'deadpool', fromStars: 3, toId: 'punisher', effectId: 'perfectblock', effectAmount: 4 }, { fromId: 'deadpool', fromStars: 4, toId: 'rhino', effectId: 'critrate', effectAmount: 7 }, { fromId: 'deadpool', fromStars: 4, toId: 'wolverine', effectId: 'health', effectAmount: 5 }, { fromId: 'deadpool', fromStars: 4, toId: 'punisher', effectId: 'perfectblock', effectAmount: 5 }, { fromId: 'deadpoolxforce', fromStars: 3, toId: 'moonknight', effectId: 'critdamage', effectAmount: 20 }, { fromId: 'deadpoolxforce', fromStars: 3, toId: 'deadpool', effectId: 'critdamage', effectAmount: 20 }, { fromId: 'deadpoolxforce', fromStars: 4, toId: 'magnetomarvelnow', effectId: 'armor', effectAmount: 6 }, { fromId: 'deadpoolxforce', fromStars: 4, toId: 'moonknight', effectId: 'critdamage', effectAmount: 25 }, { fromId: 'deadpoolxforce', fromStars: 4, toId: 'deadpool', effectId: 'critdamage', effectAmount: 25 }, { fromId: 'magneto', fromStars: 2, toId: 'wolverine', effectId: 'critrate', effectAmount: 5 }, { fromId: 'magneto', fromStars: 2, toId: 'cyclops', effectId: 'block', effectAmount: 10 }, { fromId: 'magneto', fromStars: 2, toId: 'storm', effectId: 'critdamage', effectAmount: 15 }, { fromId: 'magneto', fromStars: 3, toId: 'wolverine', effectId: 'critrate', effectAmount: 6 }, { fromId: 'magneto', fromStars: 3, toId: 'cyclops', effectId: 'block', effectAmount: 15 }, { fromId: 'magneto', fromStars: 3, toId: 'storm', effectId: 'critdamage', effectAmount: 20 }, { fromId: 'magneto', fromStars: 4, toId: 'wolverine', effectId: 'critrate', effectAmount: 7 }, { fromId: 'magneto', fromStars: 4, toId: 'cyclops', effectId: 'block', effectAmount: 20 }, { fromId: 'magneto', fromStars: 4, toId: 'storm', effectId: 'critdamage', effectAmount: 25 }, { fromId: 'magnetomarvelnow', fromStars: 3, toId: 'cyclops', effectId: 'perfectblock', effectAmount: 4 }, { fromId: 'magnetomarvelnow', fromStars: 3, toId: 'magik', effectId: 'perfectblock', effectAmount: 4 }, { fromId: 'magnetomarvelnow', fromStars: 3, toId: 'wolverine', effectId: 'critdamage', effectAmount: 20 }, { fromId: 'magnetomarvelnow', fromStars: 4, toId: 'cyclops', effectId: 'perfectblock', effectAmount: 5 }, { fromId: 'magnetomarvelnow', fromStars: 4, toId: 'magik', effectId: 'perfectblock', effectAmount: 5 }, { fromId: 'magnetomarvelnow', fromStars: 4, toId: 'wolverine', effectId: 'critdamage', effectAmount: 25 }, { fromId: 'storm', fromStars: 2, toId: 'blackpanther', effectId: 'powergain', effectAmount: 3 }, { fromId: 'storm', fromStars: 3, toId: 'magik', effectId: 'armor', effectAmount: 6 }, { fromId: 'storm', fromStars: 3, toId: 'cyclops', effectId: 'perfectblock', effectAmount: 4 }, { fromId: 'storm', fromStars: 3, toId: 'blackpanther', effectId: 'powergain', effectAmount: 4 }, { fromId: 'storm', fromStars: 4, toId: 'magik', effectId: 'armor', effectAmount: 7 }, { fromId: 'storm', fromStars: 4, toId: 'cyclops', effectId: 'perfectblock', effectAmount: 5 }, { fromId: 'storm', fromStars: 4, toId: 'blackpanther', effectId: 'powergain', effectAmount: 5 }, { fromId: 'storm', fromStars: 4, toId: 'magneto', effectId: 'critrate', effectAmount: 7 }, { fromId: 'storm', fromStars: 5, toId: 'magik', effectId: 'armor', effectAmount: 7 }, { fromId: 'storm', fromStars: 5, toId: 'cyclops', effectId: 'perfectblock', effectAmount: 5 }, { fromId: 'storm', fromStars: 5, toId: 'blackpanther', effectId: 'powergain', effectAmount: 5 }, { fromId: 'storm', fromStars: 5, toId: 'magneto', effectId: 'critrate', effectAmount: 7 }, { fromId: 'wolverine', fromStars: 2, toId: 'cyclops', effectId: 'critdamage', effectAmount: 15 }, { fromId: 'wolverine', fromStars: 3, toId: 'cyclops', effectId: 'critdamage', effectAmount: 20 }, { fromId: 'wolverine', fromStars: 3, toId: 'captainamerica', effectId: 'armor', effectAmount: 5 }, { fromId: 'wolverine', fromStars: 3, toId: 'magneto', effectId: 'critrate', effectAmount: 6 }, { fromId: 'wolverine', fromStars: 4, toId: 'cyclops', effectId: 'critdamage', effectAmount: 25 }, { fromId: 'wolverine', fromStars: 4, toId: 'captainamerica', effectId: 'armor', effectAmount: 6 }, { fromId: 'wolverine', fromStars: 4, toId: 'magneto', effectId: 'critrate', effectAmount: 7 }, { fromId: 'blackpanther', fromStars: 2, toId: 'ironfist', effectId: 'critdamage', effectAmount: 15 }, { fromId: 'blackpanther', fromStars: 3, toId: 'ironfist', effectId: 'critdamage', effectAmount: 20 }, { fromId: 'blackpanther', fromStars: 3, toId: 'storm', effectId: 'powergain', effectAmount: 4 }, { fromId: 'blackpanther', fromStars: 3, toId: 'deadpool', effectId: 'critrate', effectAmount: 6 }, { fromId: 'blackpanther', fromStars: 4, toId: 'ironfist', effectId: 'critdamage', effectAmount: 25 }, { fromId: 'blackpanther', fromStars: 4, toId: 'storm', effectId: 'powergain', effectAmount: 5 }, { fromId: 'blackpanther', fromStars: 4, toId: 'deadpool', effectId: 'critrate', effectAmount: 7 }, { fromId: 'blackpanther', fromStars: 5, toId: 'ironfist', effectId: 'critdamage', effectAmount: 25 }, { fromId: 'blackpanther', fromStars: 5, toId: 'storm', effectId: 'powergain', effectAmount: 5 }, { fromId: 'blackpanther', fromStars: 5, toId: 'deadpool', effectId: 'critrate', effectAmount: 7 }, { fromId: 'daredevil', fromStars: 3, toId: 'superiorironman', effectId: 'critdamage', effectAmount: 20 }, { fromId: 'daredevil', fromStars: 3, toId: 'blackwidow', effectId: 'powergain', effectAmount: 4 }, { fromId: 'daredevil', fromStars: 3, toId: 'elektra', effectId: 'powergain', effectAmount: 4 }, { fromId: 'daredevil', fromStars: 4, toId: 'superiorironman', effectId: 'critdamage', effectAmount: 25 }, { fromId: 'daredevil', fromStars: 4, toId: 'blackwidow', effectId: 'powergain', effectAmount: 5 }, { fromId: 'daredevil', fromStars: 4, toId: 'elektra', effectId: 'powergain', effectAmount: 5 }, { fromId: 'elektra', fromStars: 3, toId: 'wolverine', effectId: 'armor', effectAmount: 5 }, { fromId: 'elektra', fromStars: 3, toId: 'daredevil', effectId: 'powergain', effectAmount: 4 }, { fromId: 'elektra', fromStars: 3, toId: 'blackwidow', effectId: 'critdamage', effectAmount: 20 }, { fromId: 'elektra', fromStars: 4, toId: 'wolverine', effectId: 'armor', effectAmount: 6 }, { fromId: 'elektra', fromStars: 4, toId: 'daredevil', effectId: 'powergain', effectAmount: 5 }, { fromId: 'elektra', fromStars: 4, toId: 'deadpool', effectId: 'perfectblock', effectAmount: 5 }, { fromId: 'elektra', fromStars: 4, toId: 'blackwidow', effectId: 'critdamage', effectAmount: 25 }, { fromId: 'hawkeye', fromStars: 2, toId: 'scarletwitch', effectId: 'powergain', effectAmount: 3 }, { fromId: 'hawkeye', fromStars: 3, toId: 'scarletwitch', effectId: 'powergain', effectAmount: 4 }, { fromId: 'hawkeye', fromStars: 3, toId: 'ironman', effectId: 'armor', effectAmount: 5 }, { fromId: 'hawkeye', fromStars: 4, toId: 'scarletwitch', effectId: 'powergain', effectAmount: 5 }, { fromId: 'hawkeye', fromStars: 4, toId: 'ironman', effectId: 'armor', effectAmount: 6 }, { fromId: 'hawkeye', fromStars: 4, toId: 'hulk', effectId: 'armor', effectAmount: 6 }, { fromId: 'moonknight', fromStars: 3, toId: 'spiderman', effectId: 'armor', effectAmount: 5 }, { fromId: 'moonknight', fromStars: 3, toId: 'daredevil', effectId: 'perfectblock', effectAmount: 4 }, { fromId: 'moonknight', fromStars: 3, toId: 'deadpoolxforce', effectId: 'critdamage', effectAmount: 20 }, { fromId: 'moonknight', fromStars: 4, toId: 'spiderman', effectId: 'armor', effectAmount: 6 }, { fromId: 'moonknight', fromStars: 4, toId: 'daredevil', effectId: 'perfectblock', effectAmount: 5 }, { fromId: 'moonknight', fromStars: 4, toId: 'deadpoolxforce', effectId: 'critdamage', effectAmount: 25 }, { fromId: 'moonknight', fromStars: 4, toId: 'ironpatriot', effectId: 'critrate', effectAmount: 7 }, { fromId: 'punisher', fromStars: 2, toId: 'spiderman', effectId: 'critdamage', effectAmount: 15 }, { fromId: 'punisher', fromStars: 3, toId: 'spiderman', effectId: 'critdamage', effectAmount: 20 }, { fromId: 'punisher', fromStars: 3, toId: 'rhino', effectId: 'perfectblock', effectAmount: 4 }, { fromId: 'punisher', fromStars: 4, toId: 'spiderman', effectId: 'critdamage', effectAmount: 25 }, { fromId: 'punisher', fromStars: 4, toId: 'rhino', effectId: 'perfectblock', effectAmount: 5 }, { fromId: 'wintersoldier', fromStars: 2, toId: 'wolverine', effectId: 'armor', effectAmount: 4 }, { fromId: 'wintersoldier', fromStars: 2, toId: 'captainamerica', effectId: 'perfectblock', effectAmount: 3 }, { fromId: 'wintersoldier', fromStars: 3, toId: 'wolverine', effectId: 'armor', effectAmount: 5 }, { fromId: 'wintersoldier', fromStars: 3, toId: 'captainamerica', effectId: 'perfectblock', effectAmount: 4 }, { fromId: 'wintersoldier', fromStars: 4, toId: 'wolverine', effectId: 'armor', effectAmount: 6 }, { fromId: 'wintersoldier', fromStars: 4, toId: 'captainamerica', effectId: 'perfectblock', effectAmount: 5 }, { fromId: 'wintersoldier', fromStars: 5, toId: 'wolverine', effectId: 'armor', effectAmount: 6 }, { fromId: 'wintersoldier', fromStars: 5, toId: 'captainamerica', effectId: 'perfectblock', effectAmount: 5 }, { fromId: 'blackwidow', fromStars: 2, toId: 'captainmarvel', effectId: 'armor', effectAmount: 4 }, { fromId: 'blackwidow', fromStars: 2, toId: 'wintersoldier', effectId: 'powergain', effectAmount: 3 }, { fromId: 'blackwidow', fromStars: 3, toId: 'hulk', effectId: 'stun', effectAmount: 20 }, { fromId: 'blackwidow', fromStars: 3, toId: 'captainmarvel', effectId: 'armor', effectAmount: 5 }, { fromId: 'blackwidow', fromStars: 3, toId: 'wintersoldier', effectId: 'powergain', effectAmount: 4 }, { fromId: 'blackwidow', fromStars: 3, toId: 'hawkeye', effectId: 'powergain', effectAmount: 4 }, { fromId: 'blackwidow', fromStars: 4, toId: 'hulk', effectId: 'stun', effectAmount: 25 }, { fromId: 'blackwidow', fromStars: 4, toId: 'captainmarvel', effectId: 'armor', effectAmount: 6 }, { fromId: 'blackwidow', fromStars: 4, toId: 'wintersoldier', effectId: 'powergain', effectAmount: 5 }, { fromId: 'blackwidow', fromStars: 4, toId: 'hawkeye', effectId: 'powergain', effectAmount: 5 }, { fromId: 'abomination', fromStars: 2, toId: 'rhino', effectId: 'armor', effectAmount: 4 }, { fromId: 'abomination', fromStars: 3, toId: 'rhino', effectId: 'armor', effectAmount: 5 }, { fromId: 'abomination', fromStars: 3, toId: 'hulk', effectId: 'attack', effectAmount: 4 }, { fromId: 'abomination', fromStars: 4, toId: 'rhino', effectId: 'armor', effectAmount: 6 }, { fromId: 'abomination', fromStars: 4, toId: 'hulk', effectId: 'attack', effectAmount: 5 }, { fromId: 'antman', fromStars: 2, toId: 'yellowjacket', effectId: 'attack', effectAmount: 4 }, { fromId: 'antman', fromStars: 2, toId: 'ironman', effectId: 'perfectblock', effectAmount: 3 }, { fromId: 'antman', fromStars: 3, toId: 'yellowjacket', effectId: 'attack', effectAmount: 5 }, { fromId: 'antman', fromStars: 3, toId: 'spiderman', effectId: 'perfectblock', effectAmount: 4 }, { fromId: 'antman', fromStars: 3, toId: 'ironman', effectId: 'perfectblock', effectAmount: 4 }, { fromId: 'antman', fromStars: 4, toId: 'hulk', effectId: 'armor', effectAmount: 6 }, { fromId: 'antman', fromStars: 4, toId: 'yellowjacket', effectId: 'attack', effectAmount: 6 }, { fromId: 'antman', fromStars: 4, toId: 'spiderman', effectId: 'perfectblock', effectAmount: 5 }, { fromId: 'antman', fromStars: 4, toId: 'ironman', effectId: 'perfectblock', effectAmount: 5 }, { fromId: 'captainamerica', fromStars: 2, toId: 'spiderman', effectId: 'armor', effectAmount: 4 }, { fromId: 'captainamerica', fromStars: 2, toId: 'superiorironman', effectId: 'critrate', effectAmount: 5 }, { fromId: 'captainamerica', fromStars: 2, toId: 'ironman', effectId: 'armor', effectAmount: 3 }, { fromId: 'captainamerica', fromStars: 3, toId: 'wintersoldier', effectId: 'armor', effectAmount: 5 }, { fromId: 'captainamerica', fromStars: 3, toId: 'spiderman', effectId: 'armor', effectAmount: 5 }, { fromId: 'captainamerica', fromStars: 3, toId: 'superiorironman', effectId: 'critrate', effectAmount: 6 }, { fromId: 'captainamerica', fromStars: 3, toId: 'ironman', effectId: 'perfectblock', effectAmount: 4 }, { fromId: 'captainamerica', fromStars: 4, toId: 'wintersoldier', effectId: 'armor', effectAmount: 6 }, { fromId: 'captainamerica', fromStars: 4, toId: 'spiderman', effectId: 'armor', effectAmount: 6 }, { fromId: 'captainamerica', fromStars: 4, toId: 'superiorironman', effectId: 'critrate', effectAmount: 7 }, { fromId: 'captainamerica', fromStars: 4, toId: 'ironman', effectId: 'perfectblock', effectAmount: 5 }, { fromId: 'captainamericawwii', fromStars: 3, toId: 'wintersoldier', effectId: 'armor', effectAmount: 5 }, { fromId: 'captainamericawwii', fromStars: 3, toId: 'wolverine', effectId: 'armor', effectAmount: 5 }, { fromId: 'captainamericawwii', fromStars: 4, toId: 'wintersoldier', effectId: 'armor', effectAmount: 6 }, { fromId: 'captainamericawwii', fromStars: 4, toId: 'wolverine', effectId: 'armor', effectAmount: 6 }, { fromId: 'electro', fromStars: 3, toId: 'spiderman', effectId: 'attack', effectAmount: 4 }, { fromId: 'electro', fromStars: 3, toId: 'rhino', effectId: 'armor', effectAmount: 5 }, { fromId: 'electro', fromStars: 4, toId: 'spiderman', effectId: 'attack', effectAmount: 5 }, { fromId: 'electro', fromStars: 4, toId: 'rhino', effectId: 'armor', effectAmount: 6 }, { fromId: 'hulk', fromStars: 2, toId: 'thor', effectId: 'critdamage', effectAmount: 15 }, { fromId: 'hulk', fromStars: 3, toId: 'thor', effectId: 'critdamage', effectAmount: 20 }, { fromId: 'hulk', fromStars: 3, toId: 'abomination', effectId: 'critrate', effectAmount: 6 }, { fromId: 'hulk', fromStars: 3, toId: 'hawkeye', effectId: 'armor', effectAmount: 5 }, { fromId: 'hulk', fromStars: 4, toId: 'thor', effectId: 'critdamage', effectAmount: 25 }, { fromId: 'hulk', fromStars: 4, toId: 'abomination', effectId: 'critrate', effectAmount: 7 }, { fromId: 'hulk', fromStars: 4, toId: 'hawkeye', effectId: 'armor', effectAmount: 6 }, { fromId: 'joefixit', fromStars: 3, toId: 'wolverine', effectId: 'armor', effectAmount: 5 }, { fromId: 'joefixit', fromStars: 3, toId: 'moonknight', effectId: 'critrate', effectAmount: 6 }, { fromId: 'joefixit', fromStars: 3, toId: 'hulk', effectId: 'attack', effectAmount: 5 }, { fromId: 'joefixit', fromStars: 4, toId: 'wolverine', effectId: 'armor', effectAmount: 6 }, { fromId: 'joefixit', fromStars: 4, toId: 'moonknight', effectId: 'critrate', effectAmount: 7 }, { fromId: 'joefixit', fromStars: 4, toId: 'msmarvel', effectId: 'critrate', effectAmount: 7 }, { fromId: 'joefixit', fromStars: 4, toId: 'hulk', effectId: 'attack', effectAmount: 6 }, { fromId: 'rhino', fromStars: 2, toId: 'spiderman', effectId: 'critrate', effectAmount: 5 }, { fromId: 'rhino', fromStars: 2, toId: 'abomination', effectId: 'armor', effectAmount: 4 }, { fromId: 'rhino', fromStars: 3, toId: 'spiderman', effectId: 'critrate', effectAmount: 6 }, { fromId: 'rhino', fromStars: 3, toId: 'abomination', effectId: 'armor', effectAmount: 5 }, { fromId: 'rhino', fromStars: 3, toId: 'electro', effectId: 'perfectblock', effectAmount: 4 }, { fromId: 'rhino', fromStars: 4, toId: 'spiderman', effectId: 'critrate', effectAmount: 7 }, { fromId: 'rhino', fromStars: 4, toId: 'abomination', effectId: 'armor', effectAmount: 6 }, { fromId: 'rhino', fromStars: 4, toId: 'electro', effectId: 'perfectblock', effectAmount: 5 }, { fromId: 'rhino', fromStars: 5, toId: 'spiderman', effectId: 'critrate', effectAmount: 7 }, { fromId: 'rhino', fromStars: 5, toId: 'abomination', effectId: 'armor', effectAmount: 6 }, { fromId: 'rhino', fromStars: 5, toId: 'electro', effectId: 'perfectblock', effectAmount: 5 }, { fromId: 'spiderman', fromStars: 1, toId: 'wolverine', effectId: 'health', effectAmount: 5 }, { fromId: 'spiderman', fromStars: 1, toId: 'hawkeye', effectId: 'attack', effectAmount: 5 }, { fromId: 'spiderman', fromStars: 2, toId: 'wolverine', effectId: 'health', effectAmount: 5 }, { fromId: 'spiderman', fromStars: 2, toId: 'hawkeye', effectId: 'attack', effectAmount: 5 }, { fromId: 'spiderman', fromStars: 3, toId: 'wolverine', effectId: 'health', effectAmount: 5 }, { fromId: 'spiderman', fromStars: 3, toId: 'hawkeye', effectId: 'attack', effectAmount: 5 }, { fromId: 'spiderman', fromStars: 3, toId: 'electro', effectId: 'health', effectAmount: 6 }, { fromId: 'spiderman', fromStars: 3, toId: 'captainamerica', effectId: 'armor', effectAmount: 5 }, { fromId: 'spiderman', fromStars: 4, toId: 'wolverine', effectId: 'health', effectAmount: 6 }, { fromId: 'spiderman', fromStars: 4, toId: 'hawkeye', effectId: 'attack', effectAmount: 6 }, { fromId: 'spiderman', fromStars: 4, toId: 'electro', effectId: 'health', effectAmount: 7 }, { fromId: 'spiderman', fromStars: 4, toId: 'captainamerica', effectId: 'armor', effectAmount: 6 }, { fromId: 'spiderman', fromStars: 5, toId: 'wolverine', effectId: 'health', effectAmount: 6 }, { fromId: 'spiderman', fromStars: 5, toId: 'hawkeye', effectId: 'attack', effectAmount: 6 }, { fromId: 'spiderman', fromStars: 5, toId: 'electro', effectId: 'health', effectAmount: 7 }, { fromId: 'spiderman', fromStars: 5, toId: 'captainamerica', effectId: 'armor', effectAmount: 6 }, { fromId: 'spidergwen', fromStars: 3, toId: 'rhino', effectId: 'critrate', effectAmount: 6 }, { fromId: 'spidergwen', fromStars: 3, toId: 'daredevil', effectId: 'critrate', effectAmount: 6 }, { fromId: 'spidergwen', fromStars: 3, toId: 'spiderman', effectId: 'powergain', effectAmount: 4 }, { fromId: 'spidergwen', fromStars: 4, toId: 'rhino', effectId: 'critrate', effectAmount: 7 }, { fromId: 'spidergwen', fromStars: 4, toId: 'daredevil', effectId: 'critrate', effectAmount: 7 }, { fromId: 'spidergwen', fromStars: 4, toId: 'spiderman', effectId: 'powergain', effectAmount: 5 }, { fromId: 'spidergwen', fromStars: 4, toId: 'punisher', effectId: 'critdamage', effectAmount: 25 }, { fromId: 'spidergwen', fromStars: 5, toId: 'rhino', effectId: 'critrate', effectAmount: 7 }, { fromId: 'spidergwen', fromStars: 5, toId: 'daredevil', effectId: 'critrate', effectAmount: 7 }, { fromId: 'spidergwen', fromStars: 5, toId: 'spiderman', effectId: 'powergain', effectAmount: 5 }, { fromId: 'spidergwen', fromStars: 5, toId: 'punisher', effectId: 'critdamage', effectAmount: 25 }, { fromId: 'yellowjacket', fromStars: 2, toId: 'antman', effectId: 'attack', effectAmount: 4 }, { fromId: 'yellowjacket', fromStars: 2, toId: 'ultron', effectId: 'critdamage', effectAmount: 15 }, { fromId: 'yellowjacket', fromStars: 3, toId: 'antman', effectId: 'attack', effectAmount: 5 }, { fromId: 'yellowjacket', fromStars: 3, toId: 'ultron', effectId: 'critdamage', effectAmount: 20 }, { fromId: 'yellowjacket', fromStars: 4, toId: 'antman', effectId: 'attack', effectAmount: 6 }, { fromId: 'yellowjacket', fromStars: 4, toId: 'ultron', effectId: 'critdamage', effectAmount: 25 }, { fromId: 'drstrange', fromStars: 3, toId: 'thor', effectId: 'armor', effectAmount: 5 }, { fromId: 'drstrange', fromStars: 3, toId: 'spiderman', effectId: 'armor', effectAmount: 5 }, { fromId: 'drstrange', fromStars: 3, toId: 'scarletwitch', effectId: 'block', effectAmount: 15 }, { fromId: 'drstrange', fromStars: 3, toId: 'blackbolt', effectId: 'perfectblock', effectAmount: 4 }, { fromId: 'drstrange', fromStars: 4, toId: 'thor', effectId: 'armor', effectAmount: 6 }, { fromId: 'drstrange', fromStars: 4, toId: 'spiderman', effectId: 'armor', effectAmount: 6 }, { fromId: 'drstrange', fromStars: 4, toId: 'scarletwitch', effectId: 'block', effectAmount: 20 }, { fromId: 'drstrange', fromStars: 4, toId: 'blackbolt', effectId: 'perfectblock', effectAmount: 5 }, { fromId: 'ironfist', fromStars: 2, toId: 'blackpanther', effectId: 'armor', effectAmount: 4 }, { fromId: 'ironfist', fromStars: 3, toId: 'blackpanther', effectId: 'armor', effectAmount: 5 }, { fromId: 'ironfist', fromStars: 3, toId: 'drstrange', effectId: 'armor', effectAmount: 5 }, { fromId: 'ironfist', fromStars: 4, toId: 'blackpanther', effectId: 'armor', effectAmount: 6 }, { fromId: 'ironfist', fromStars: 4, toId: 'drstrange', effectId: 'armor', effectAmount: 6 }, { fromId: 'ironfist', fromStars: 4, toId: 'wolverine', effectId: 'armor', effectAmount: 6 }, { fromId: 'guillotine', fromStars: 2, toId: 'venom', effectId: 'attack', effectAmount: 4 }, { fromId: 'guillotine', fromStars: 2, toId: 'captainamericawwii', effectId: 'perfectblock', effectAmount: 3 }, { fromId: 'guillotine', fromStars: 3, toId: 'venom', effectId: 'attack', effectAmount: 5 }, { fromId: 'guillotine', fromStars: 3, toId: 'captainamericawwii', effectId: 'perfectblock', effectAmount: 4 }, { fromId: 'guillotine', fromStars: 3, toId: 'magik', effectId: 'critdamage', effectAmount: 20 }, { fromId: 'guillotine', fromStars: 4, toId: 'blackpanther', effectId: 'armor', effectAmount: 6 }, { fromId: 'guillotine', fromStars: 4, toId: 'venom', effectId: 'attack', effectAmount: 6 }, { fromId: 'guillotine', fromStars: 4, toId: 'captainamericawwii', effectId: 'perfectblock', effectAmount: 5 }, { fromId: 'guillotine', fromStars: 4, toId: 'magik', effectId: 'critdamage', effectAmount: 25 }, { fromId: 'juggernaut', fromStars: 2, toId: 'colossus', effectId: 'critrate', effectAmount: 5 }, { fromId: 'juggernaut', fromStars: 3, toId: 'drstrange', effectId: 'attack', effectAmount: 4 }, { fromId: 'juggernaut', fromStars: 3, toId: 'colossus', effectId: 'critrate', effectAmount: 6 }, { fromId: 'juggernaut', fromStars: 3, toId: 'hulk', effectId: 'critrate', effectAmount: 6 }, { fromId: 'juggernaut', fromStars: 4, toId: 'drstrange', effectId: 'attack', effectAmount: 5 }, { fromId: 'juggernaut', fromStars: 4, toId: 'colossus', effectId: 'critrate', effectAmount: 7 }, { fromId: 'juggernaut', fromStars: 4, toId: 'hulk', effectId: 'critrate', effectAmount: 7 }, { fromId: 'juggernaut', fromStars: 5, toId: 'drstrange', effectId: 'attack', effectAmount: 5 }, { fromId: 'juggernaut', fromStars: 5, toId: 'colossus', effectId: 'critrate', effectAmount: 7 }, { fromId: 'juggernaut', fromStars: 5, toId: 'hulk', effectId: 'critrate', effectAmount: 7 }, { fromId: 'magik', fromStars: 2, toId: 'colossus', effectId: 'health', effectAmount: 4 }, { fromId: 'magik', fromStars: 3, toId: 'storm', effectId: 'armor', effectAmount: 5 }, { fromId: 'magik', fromStars: 3, toId: 'colossus', effectId: 'health', effectAmount: 5 }, { fromId: 'magik', fromStars: 3, toId: 'cyclops', effectId: 'perfectblock', effectAmount: 4 }, { fromId: 'magik', fromStars: 4, toId: 'storm', effectId: 'armor', effectAmount: 6 }, { fromId: 'magik', fromStars: 4, toId: 'colossus', effectId: 'health', effectAmount: 6 }, { fromId: 'magik', fromStars: 4, toId: 'cyclops', effectId: 'perfectblock', effectAmount: 5 }, { fromId: 'magik', fromStars: 4, toId: 'juggernaut', effectId: 'critrate', effectAmount: 7 }, { fromId: 'magik', fromStars: 5, toId: 'storm', effectId: 'armor', effectAmount: 6 }, { fromId: 'magik', fromStars: 5, toId: 'colossus', effectId: 'health', effectAmount: 6 }, { fromId: 'magik', fromStars: 5, toId: 'cyclops', effectId: 'perfectblock', effectAmount: 5 }, { fromId: 'magik', fromStars: 5, toId: 'juggernaut', effectId: 'critrate', effectAmount: 7 }, { fromId: 'scarletwitch', fromStars: 2, toId: 'captainmarvel', effectId: 'armor', effectAmount: 4 }, { fromId: 'scarletwitch', fromStars: 3, toId: 'captainmarvel', effectId: 'armor', effectAmount: 5 }, { fromId: 'scarletwitch', fromStars: 3, toId: 'vision', effectId: 'powergain', effectAmount: 4 }, { fromId: 'scarletwitch', fromStars: 4, toId: 'captainmarvel', effectId: 'armor', effectAmount: 6 }, { fromId: 'scarletwitch', fromStars: 4, toId: 'vision', effectId: 'powergain', effectAmount: 5 }, { fromId: 'unstoppablecolossus', fromStars: 2, toId: 'magik', effectId: 'health', effectAmount: 4 }, { fromId: 'unstoppablecolossus', fromStars: 2, toId: 'juggernaut', effectId: 'critdamage', effectAmount: 15 }, { fromId: 'unstoppablecolossus', fromStars: 3, toId: 'wolverine', effectId: 'armor', effectAmount: 5 }, { fromId: 'unstoppablecolossus', fromStars: 3, toId: 'magik', effectId: 'health', effectAmount: 5 }, { fromId: 'unstoppablecolossus', fromStars: 3, toId: 'cyclops', effectId: 'perfectblock', effectAmount: 4 }, { fromId: 'unstoppablecolossus', fromStars: 3, toId: 'juggernaut', effectId: 'critdamage', effectAmount: 20 }, { fromId: 'unstoppablecolossus', fromStars: 4, toId: 'wolverine', effectId: 'armor', effectAmount: 6 }, { fromId: 'unstoppablecolossus', fromStars: 4, toId: 'magik', effectId: 'health', effectAmount: 6 }, { fromId: 'unstoppablecolossus', fromStars: 4, toId: 'cyclops', effectId: 'perfectblock', effectAmount: 5 }, { fromId: 'unstoppablecolossus', fromStars: 4, toId: 'juggernaut', effectId: 'critdamage', effectAmount: 25 }].map(function (synergy) {
	    return new _Synergy2.default(synergy);
	});
	
	exports.default = synergies;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Model2 = __webpack_require__(37);
	
	var _Model3 = _interopRequireDefault(_Model2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Synergy = (function (_Model) {
	  _inherits(Synergy, _Model);
	
	  function Synergy(_ref) {
	    var fromId = _ref.fromId;
	    var fromStars = _ref.fromStars;
	    var toId = _ref.toId;
	    var effectId = _ref.effectId;
	    var effectAmount = _ref.effectAmount;
	
	    _classCallCheck(this, Synergy);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Synergy).call(this, {
	      fromId: 'from-champion-uid',
	      fromStars: 1,
	      toId: 'to-champion-uid',
	      effectId: 'effect-uid',
	      effectAmount: 0
	    }, {
	      fromId: fromId,
	      fromStars: fromStars,
	      toId: toId,
	      effectId: effectId,
	      effectAmount: effectAmount
	    }));
	  }
	
	  return Synergy;
	})(_Model3.default);
	
	exports.default = Synergy;

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _blackbolt = __webpack_require__(72);
	
	var _blackbolt2 = _interopRequireDefault(_blackbolt);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var guides = {
		blackbolt: _blackbolt2.default
	};
	
	exports.default = guides;

/***/ },
/* 72 */
/***/ function(module, exports) {

	module.exports = {
		"grades": {
			"normal": "A",
			"awakened": "A"
		},
		"description": "Black Bolt is an often overlooked champion, but his fast fluid attacks, along with powerful specials and having stun on all his specials make him a formidable champion among the cosmic class. ",
		"gameplay": {
			"style": "OFFENSIVE",
			"description": "You will want to often spam your L1 (Particle Beam) as the true damage and stun it can deal is the highlight of Black Bolt’s power. With consistent hits, you can exploit the power of his Particle Beam by locking them down and dealing huge amounts of damage. Be mindful of their energy bars, however, as it is easy to forget while comboing that your attacks will fill up their bar quite fast and the enemy may land an L3 against you ",
			"note": "This is not to say the L2 and L3 shouldn't be used, but especially for champions with armor or physical resistances the L1 is reccomended."
		},
		"signature": {
			"rating": "3",
			"name": "Provocation",
			"description": "Being struck by critical hits will give Black Bolt either Attack or Crit Damage (random which is given)  that increases the stat by a certain percentage (12.9% at level 8) for the rest of the fight. ",
			"note": " This ability is designed more of a carry for longer fights where you will be getting hit a lot and hence gaining power as you do so, but most fights don’t last this long and if you are skilled enough, you won’t be getting hit much and it will only trigger if that hit is a critical. It is nice to have, but by no means a game changing dupe."
		},
		"heavy": {
			"rating": "3",
			"description": " Quite regular, easy to charge up and has a decent range, but usually not recommended as champions like to exploit the second you need to charge it up, and gives no other benefits to you other than a bit of extra damage while a champion is stunned or when a good opportunity presents itself."
		},
		"specials": {
			"1": {
				"rating": "5",
				"damagetypes": [
					"Energy"
				],
				"ranges": [
					"Long"
				],
				"description": "The true ability of Black bolt, this L1 is a very powerful ability as it deals True Damage, which ignores all armor and resistances as well as having an extremely high chance to stun. The particle beam is also extremely quick so advanced AIs are less likely to block this attack after a combo, making it significantly more useful than you might expect. It can be predictable, but it has an immense range and is very powerful.",
				"abilities": [
					"stun"
				],
				"note": "Also applies Direct Damage",
				"name": "Particle Beam"
			},
			"2": {
				"description": "Although Black Bolts L2, can do more damage and has a higher chance to stun than Particle Beam, it is generally not as useful due to how easy the ability is to block and the recoil that comes with it (fixed at 5% of your maximum health every time you use this ability). Use Corkscrew mainly with enemies that have lower armor (as it does not deal true damage) and be careful not to let the opponent block it, as you will take more damage than they will. ",
				"rating": "4",
				"abilities": [
					"stun"
				],
				"damagetypes": [
					"Physical"
				],
				"ranges": [
					"Medium"
				],
				"name": "Corkscrew"
			},
			"3": {
				"rating": "3",
				"description": "Hypersonic Whisper has an extremely high chance to stun so if you ever felt the stun wasn’t long enough on his other specials, then you will want to use this. However, this special only has stun with regular L3 damage so you are much better off focusing on your L1 and L2. It is by no means a bad special, but rather his first two will benefit you more in fights.",
				"abilities": [
					"stun"
				],
				"damagetypes": [
					"Energy"
				],
				"name": "Hypersonic Whisper"
			}
		},
		"author": {
			"profile": {
				"name": "Sifakaster",
				"type": "reddit"
			},
			"name": "Verreaux"
		},
		"attack": {
			"heavy": "Quite regular, easy to charge up and has a decent range, but usually not recommended as champions like to exploit the second you need to charge it up, and gives no other benefits to you other than a bit of extra damage while a champion is stunned or when a good opportunity presents itself.",
			"rating": "3"
		}
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.menu = exports.tab = undefined;
	
	__webpack_require__(74);
	
	var _Message = __webpack_require__(64);
	
	var _Message2 = _interopRequireDefault(_Message);
	
	var _Champion = __webpack_require__(76);
	
	var _Champion2 = _interopRequireDefault(_Champion);
	
	var _roster = __webpack_require__(40);
	
	var _roster2 = _interopRequireDefault(_roster);
	
	var _router = __webpack_require__(41);
	
	var _router2 = _interopRequireDefault(_router);
	
	var _lang = __webpack_require__(49);
	
	var _lang2 = _interopRequireDefault(_lang);
	
	var _mithril = __webpack_require__(53);
	
	var _mithril2 = _interopRequireDefault(_mithril);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var tab = {
		id: 'roster',
		icon: 'th',
		title: 'roster'
	};
	
	var menu = {
		header: {
			title: 'roster',
			icon: 'th'
		},
		options: [{
			title: 'add-champion',
			icon: 'user-plus',
			onclick: function onclick() {
				return _router2.default.setRoute('/roster/add/2') || true;
			}
		}, {
			title: 'import-csv',
			icon: 'clipboard'
		}, {
			title: 'export-csv',
			icon: 'floppy-o'
		}, {
			title: 'delete-all',
			icon: 'user-times',
			onclick: function onclick() {
				_roster2.default.clear();
				_mithril2.default.redraw();
			}
		}]
	};
	
	var Roster = {
		view: function view(ctrl, args) {
			var _this = this;
	
			var total = _roster2.default.all().length;
			var champions = _roster2.default.filter({
				// some filter
			});
			var selected = args.selected;
	
			var handleSelect = function handleSelect(_ref, event) {
				var uid = _ref.uid;
				var stars = _ref.stars;
	
				event.stopPropagation();
				if (selected && selected.uid === uid && selected.stars === stars) _router2.default.setRoute('/roster');else _router2.default.setRoute('/roster/' + uid + '/' + stars);
			};
			var handleDeselect = function handleDeselect(event) {
				event.stopPropagation();
				_router2.default.setRoute('/roster');
			};
			var isEditing = function isEditing(selected, champion) {
				return selected && champion && selected.uid === champion.attr.uid && selected.stars === champion.attr.stars;
			};
			return {
				tag: 'div',
				children: ['\n\t\t\t\t', _mithril2.default.component(_Message2.default, { value: champions.length + ' ' + _lang2.default.get('of') + ' ' + total + ' ' + _lang2.default.get('champions') }, []), '\n\t\t\t\t', champions.map(function (champion) {
					return _mithril2.default.component(_Champion2.default, {
						key: champion.id(),
						champion: champion,
						isEditing: isEditing(selected, champion),
						onclick: handleSelect.bind(_this, champion.attr)
					}, []);
				}), '\n\t\t\t\t', {
					tag: 'div',
					attrs: { className: 'clear' }
				}, '\n\t\t\t'],
				attrs: {
					className: 'roster ' + (selected ? 'editing' : ''),
					onclick: handleDeselect.bind(this)
				}
			};
		}
	};
	
	exports.tab = tab;
	exports.menu = menu;
	exports.default = Roster;

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(75);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(34)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/sass-loader/index.js!./Roster.scss", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/sass-loader/index.js!./Roster.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(28)();
	// imports
	
	
	// module
	exports.push([module.id, ".roster {\n  padding: 24px; }\n  .roster.editing .champion {\n    opacity: 0.25; }\n  .roster.editing .champion.editing {\n    opacity: 1; }\n  .roster .champion {\n    transition: opacity 0.25s; }\n  .roster .clear {\n    clear: both; }\n", ""]);
	
	// exports


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	__webpack_require__(77);
	
	var _roster = __webpack_require__(40);
	
	var _roster2 = _interopRequireDefault(_roster);
	
	var _lang = __webpack_require__(49);
	
	var _lang2 = _interopRequireDefault(_lang);
	
	var _mithril = __webpack_require__(53);
	
	var _mithril2 = _interopRequireDefault(_mithril);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Champion = {
		view: function view(ctrl, args) {
			var _args$champion$toJSON = args.champion.toJSON();
	
			var uid = _args$champion$toJSON.uid;
			var stars = _args$champion$toJSON.stars;
			var typeId = _args$champion$toJSON.typeId;
			var pi = _args$champion$toJSON.pi;
	
			var hasClick = args.onclick || '';
			var isEditing = args.isEditing || '';
			var starImages = [];
			for (var i = 0; i < stars; i++) {
				starImages.push({
					tag: 'img',
					attrs: { className: 'star', src: '../images/icons/star.png' }
				});
			}var name = _lang2.default.get('champion-' + uid + '-shortname', null) || _lang2.default.get('champion-' + uid + '-name');
			return {
				tag: 'div',
				children: ['\n\t\t\t\t', {
					tag: 'div',
					children: ['\n\t\t\t\t\t', {
						tag: 'div',
						children: ['\n\t\t\t\t\t\t', {
							tag: 'img',
							attrs: { className: 'portrait', src: '../images/champions/portrait_' + uid + '.png' }
						}, '\n\t\t\t\t\t\t', {
							tag: 'div',
							children: ['\n\t\t\t\t\t\t\t', {
								tag: 'span',
								children: [name],
								attrs: { className: 'name' }
							}, '\n\t\t\t\t\t\t'],
							attrs: { className: 'title' }
						}, '\n\t\t\t\t\t\t', {
							tag: 'div',
							children: ['\n\t\t\t\t\t\t\t', starImages, '\n\t\t\t\t\t\t'],
							attrs: { className: 'stars' }
						}, '\n\t\t\t\t\t'],
						attrs: {
							className: 'inner ' + (hasClick && 'clickable'),
							onclick: args.onclick
						}
					}, '\n\t\t\t\t'],
					attrs: { className: 'container' }
				}, '\n\t\t\t'],
				attrs: { className: 'champion champion--' + typeId + ' ' + (isEditing && 'editing') }
			};
		}
	};
	
	exports.default = Champion;

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(78);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(34)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./Champion.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./Champion.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(28)();
	// imports
	
	
	// module
	exports.push([module.id, ".champion {\n  display: block;\n  position: relative;\n  float: left;\n  height: 0%;\n  width: 16.66666%;\n  padding-bottom: 16.66666%; }\n  .champion.champion--cosmic {\n    color: #3af; }\n  .champion.champion--tech {\n    color: #23f; }\n  .champion.champion--mutant {\n    color: #fa0; }\n  .champion.champion--skill {\n    color: #f30; }\n  .champion.champion--science {\n    color: #0a0; }\n  .champion.champion--mystic {\n    color: #90f; }\n  .champion .container {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    box-sizing: border-box;\n    padding: 10px; }\n    .champion .container .inner {\n      position: relative;\n      width: 100%;\n      height: 100%; }\n      .champion .container .inner.clickable {\n        cursor: pointer; }\n  .champion .portrait {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    pointer-events: none; }\n  .champion .title {\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 100%;\n    overflow: hidden;\n    min-height: 14px;\n    background: rgba(0, 0, 0, 0.5);\n    box-sizing: border-box;\n    border-bottom: solid 10px;\n    border-top-left-radius: 5px;\n    border-top-right-radius: 5px; }\n    .champion .title .name {\n      display: block;\n      box-sizing: border-box;\n      text-align: center;\n      width: 100%;\n      padding: 0 3px;\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      color: #f6f6f6;\n      font-family: Hanzel, Verdana, Geneva, sans-serif;\n      font-size: 1em;\n      text-transform: uppercase;\n      text-shadow: 0 1px 0 #000; }\n      @media (max-width: 355px) {\n        .champion .title .name {\n          font-size: 0.6em;\n          line-height: 1.5em; } }\n      @media (max-width: 800px) and (min-width: 355px) {\n        .champion .title .name {\n          font-size: 0.8em;\n          line-height: 1.5em; } }\n      @media (min-width: 800px) {\n        .champion .title .name {\n          font-size: 1em;\n          line-height: 1.5em; } }\n    @media (max-width: 355px) {\n      .champion .title {\n        border-bottom-width: 6px; } }\n    @media (max-width: 800px) and (min-width: 355px) {\n      .champion .title {\n        border-bottom-width: 8px; } }\n  .champion .stars {\n    position: absolute;\n    right: 0;\n    display: block;\n    width: 100%;\n    text-align: center;\n    vertical-align: text-bottom;\n    pointer-events: none; }\n    .champion .stars .star {\n      display: inline-block;\n      position: relative;\n      width: 19%;\n      margin-right: 1%;\n      padding: 0; }\n      .champion .stars .star:last-child {\n        margin-right: 0; }\n    @media (max-width: 355px) {\n      .champion .stars {\n        bottom: -18%; } }\n    @media (max-width: 800px) and (min-width: 355px) {\n      .champion .stars {\n        bottom: -16%; } }\n    @media (min-width: 800px) {\n      .champion .stars {\n        bottom: -15%; } }\n  @media (max-width: 500px) {\n    .champion {\n      width: 33.333333333333333%;\n      padding-bottom: 33.33333333333333333%; } }\n  @media (min-width: 500px) and (max-width: 700px) {\n    .champion {\n      width: 25%;\n      padding-bottom: 25%; } }\n  @media (min-width: 700px) and (max-width: 900px) {\n    .champion {\n      width: 20%;\n      padding-bottom: 20%; } }\n  @media (min-width: 900px) and (max-width: 1100px) {\n    .champion {\n      width: 16.6666666%;\n      padding-bottom: 16.6666666%; } }\n  @media (min-width: 1100px) and (max-width: 1300px) {\n    .champion {\n      width: 14.285714285714286%;\n      padding-bottom: 14.285714285714286%; } }\n  @media (min-width: 1300px) and (max-width: 1500px) {\n    .champion {\n      width: 12.5%;\n      padding-bottom: 12.5%; } }\n  @media (min-width: 1500px) and (max-width: 1700px) {\n    .champion {\n      width: 11.11111111111111%;\n      padding-bottom: 11.11111111111111%; } }\n  @media (min-width: 1700px) {\n    .champion {\n      width: 10%;\n      padding-bottom: 10%; } }\n", ""]);
	
	// exports


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.menu = undefined;
	
	__webpack_require__(80);
	
	var _Champion = __webpack_require__(76);
	
	var _Champion2 = _interopRequireDefault(_Champion);
	
	var _roster = __webpack_require__(40);
	
	var _roster2 = _interopRequireDefault(_roster);
	
	var _router = __webpack_require__(41);
	
	var _router2 = _interopRequireDefault(_router);
	
	var _lang = __webpack_require__(49);
	
	var _lang2 = _interopRequireDefault(_lang);
	
	var _mithril = __webpack_require__(53);
	
	var _mithril2 = _interopRequireDefault(_mithril);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var menu = {
		header: {
			title: 'add-champion',
			icon: 'user-plus'
		},
		options: [{
			title: '1★',
			selected: function selected(stars) {
				return stars === '1';
			},
			onclick: function onclick() {
				return _router2.default.setRoute('/roster/add/1') && false;
			},
			split: 5
		}, {
			title: '2★',
			selected: function selected(stars) {
				return stars === '2';
			},
			onclick: function onclick() {
				return _router2.default.setRoute('/roster/add/2') && false;
			},
			split: 5
		}, {
			title: '3★',
			selected: function selected(stars) {
				return stars === '3';
			},
			onclick: function onclick() {
				return _router2.default.setRoute('/roster/add/3') && false;
			},
			split: 5
		}, {
			title: '4★',
			selected: function selected(stars) {
				return stars === '4';
			},
			onclick: function onclick() {
				return _router2.default.setRoute('/roster/add/4') && false;
			},
			split: 5
		}, {
			title: '5★',
			selected: function selected(stars) {
				return stars === '5';
			},
			onclick: function onclick() {
				return _router2.default.setRoute('/roster/add/5') && false;
			},
			split: 5
		}]
	};
	
	var RosterAdd = {
		view: function view(ctrl, args) {
			var stars = args.stars;
	
			var champions = _roster2.default.available(stars);
			return {
				tag: 'div',
				children: ['\n\t\t\t\t', {
					tag: 'button',
					children: ['\n\t\t\t\t\t', _lang2.default.get('add-all'), '\n\t\t\t\t'],
					attrs: {
						className: 'add-all ' + (champions.length === 0 ? 'disabled' : ''),
						onclick: function onclick() {
							return _roster2.default.addAll(stars);
						}
					}
				}, '\n\t\t\t\t', {
					tag: 'div',
					attrs: { className: 'clear' }
				}, '\n\t\t\t\t', champions.map(function (champion) {
					return _mithril2.default.component(_Champion2.default, {
						key: champion.id(),
						champion: champion,
						onclick: function onclick() {
							return _roster2.default.add(champion.attr.uid, stars);
						}
					}, []);
				}), '\n\t\t\t\t', {
					tag: 'div',
					attrs: { className: 'clear' }
				}, '\n\t\t\t'],
				attrs: { className: 'roster-add' }
			};
		}
	};
	
	exports.menu = menu;
	exports.default = RosterAdd;

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(81);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(34)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/sass-loader/index.js!./RosterAdd.scss", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/sass-loader/index.js!./RosterAdd.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(28)();
	// imports
	
	
	// module
	exports.push([module.id, ".roster-add {\n  padding: 24px; }\n  .roster-add .add-all {\n    cursor: pointer;\n    display: block;\n    margin: .0 auto 1em;\n    padding: 16px;\n    border: none;\n    border-radius: none;\n    width: 500px;\n    max-width: 90%;\n    text-align: center;\n    font-family: Hanzel, Verdana, Geneva, sans-serif;\n    font-size: 18px;\n    background: #38c;\n    color: #fff;\n    text-shadow: 0 1px 0 #000;\n    box-shadow: 0 0 16px rgba(0, 0, 0, 0.5);\n    transition: background 0.25s, color 0.25s, text-shadow 0.25s; }\n    .roster-add .add-all:hover {\n      background: #eee;\n      color: #000;\n      text-shadow: 0 1px 0 #fff; }\n    .roster-add .add-all.disabled {\n      pointer-events: none;\n      cursor: default;\n      background: #eee;\n      color: #ccc;\n      text-shadow: 0 1px 0 #fff;\n      box-shadow: 0 0 16px rgba(0, 0, 0, 0.25); }\n  .roster-add .clear {\n    clear: both; }\n", ""]);
	
	// exports


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.menu = exports.tab = undefined;
	
	__webpack_require__(83);
	
	var _Message = __webpack_require__(64);
	
	var _Message2 = _interopRequireDefault(_Message);
	
	var _Champion = __webpack_require__(76);
	
	var _Champion2 = _interopRequireDefault(_Champion);
	
	var _teams = __webpack_require__(39);
	
	var _teams2 = _interopRequireDefault(_teams);
	
	var _router = __webpack_require__(41);
	
	var _router2 = _interopRequireDefault(_router);
	
	var _lang = __webpack_require__(49);
	
	var _lang2 = _interopRequireDefault(_lang);
	
	var _mithril = __webpack_require__(53);
	
	var _mithril2 = _interopRequireDefault(_mithril);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var tab = {
	    id: 'teams',
	    icon: 'cog',
	    title: 'teams'
	};
	
	var menu = {
	    header: {
	        title: 'teams',
	        icon: 'users'
	    },
	    options: [{
	        title: 'build',
	        icon: 'cog',
	        onclick: function onclick() {
	            return true;
	        }
	    }, {
	        header: true,
	        title: 'champions'
	    }, {
	        title: '1★',
	        selected: function selected(_ref) {
	            var stars = _ref.stars;
	            return stars[1];
	        },
	        onclick: function onclick() {
	            _teams2.default.stars[1] = !_teams2.default.stars[1];
	        },
	        split: 5
	    }, {
	        title: '2★',
	        selected: function selected(_ref2) {
	            var stars = _ref2.stars;
	            return stars[2];
	        },
	        onclick: function onclick() {
	            _teams2.default.stars[2] = !_teams2.default.stars[2];
	        },
	        split: 5
	    }, {
	        title: '3★',
	        selected: function selected(_ref3) {
	            var stars = _ref3.stars;
	            return stars[3];
	        },
	        onclick: function onclick() {
	            _teams2.default.stars[3] = !_teams2.default.stars[3];
	        },
	        split: 5
	    }, {
	        title: '4★',
	        selected: function selected(_ref4) {
	            var stars = _ref4.stars;
	            return stars[4];
	        },
	        onclick: function onclick() {
	            _teams2.default.stars[4] = !_teams2.default.stars[4];
	        },
	        split: 5
	    }, {
	        title: '5★',
	        selected: function selected(_ref5) {
	            var stars = _ref5.stars;
	            return stars[5];
	        },
	        onclick: function onclick() {
	            _teams2.default.stars[5] = !_teams2.default.stars[5];
	        },
	        split: 5
	    }, {
	        header: true,
	        title: 'team-size'
	    }, {
	        title: '1',
	        selected: function selected(_ref6) {
	            var size = _ref6.size;
	            return size === 1;
	        },
	        onclick: function onclick() {
	            _teams2.default.size = 1;
	        },
	        split: 3
	    }, {
	        title: '2',
	        selected: function selected(_ref7) {
	            var size = _ref7.size;
	            return size === 2;
	        },
	        onclick: function onclick() {
	            _teams2.default.size = 2;
	        },
	        split: 3
	    }, {
	        title: '3',
	        selected: function selected(_ref8) {
	            var size = _ref8.size;
	            return size === 3;
	        },
	        onclick: function onclick() {
	            _teams2.default.size = 3;
	        },
	        split: 3
	    }, {
	        header: true,
	        title: 'type'
	    }, {
	        title: 'algorithm-quest-name',
	        selected: function selected(_ref9) {
	            var type = _ref9.type;
	            return type === 'quest';
	        },
	        onclick: function onclick() {
	            _teams2.default.type = 'quest';
	        },
	        split: 2
	    }, {
	        title: 'algorithm-arena-name',
	        selected: function selected(_ref10) {
	            var type = _ref10.type;
	            return type === 'arena';
	        },
	        onclick: function onclick() {
	            _teams2.default.type = 'arena';
	        },
	        split: 2
	    }]
	};
	
	var Teams = {
	    view: function view(ctrl, args) {
	
	        return {
	            tag: 'div',
	            children: ['\n                ', _mithril2.default.component(_Message2.default, { value: 0 + ' ' + _lang2.default.get('teams') }, []), '\n                ', {
	                tag: 'div',
	                attrs: { className: 'clear' }
	            }, '\n            '],
	            attrs: { className: 'teams' }
	        };
	    }
	};
	
	exports.tab = tab;
	exports.menu = menu;
	exports.default = Teams;

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(84);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(34)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/sass-loader/index.js!./Teams.scss", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/sass-loader/index.js!./Teams.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(28)();
	// imports
	
	
	// module
	exports.push([module.id, ".teams {\n  padding: 24px;\n  background: #fff;\n  min-height: 100%;\n  box-sizing: border-box; }\n  .teams .teams-header {\n    margin: auto;\n    max-width: 250px;\n    background: rgba(0, 0, 0, 0.5);\n    color: #fff;\n    text-shadow: 0 1px 0 #000;\n    text-align: center;\n    border-radius: 5px;\n    padding: 16px;\n    font-family: Helvetica Neue,Helvetica,Arial,sans-serif;\n    font-size: 1.1em; }\n  .teams .clear {\n    clear: both; }\n", ""]);
	
	// exports


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.menu = exports.tab = undefined;
	
	__webpack_require__(86);
	
	var _springy = __webpack_require__(88);
	
	var _springy2 = _interopRequireDefault(_springy);
	
	var _router = __webpack_require__(41);
	
	var _router2 = _interopRequireDefault(_router);
	
	var _mithril = __webpack_require__(53);
	
	var _mithril2 = _interopRequireDefault(_mithril);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var tab = {
		id: 'synergy',
		icon: 'users',
		title: 'synergy'
	};
	
	var menu = {
		header: {
			title: 'synergies',
			icon: 'users'
		},
		options: [{
			title: '1★',
			selected: function selected(stars) {
				return stars === '1';
			},
			onclick: function onclick() {
				return _router2.default.setRoute('/synergy/1') && false;
			},
			split: 5
		}, {
			title: '2★',
			selected: function selected(stars) {
				return stars === '2';
			},
			onclick: function onclick() {
				return _router2.default.setRoute('/synergy/2') && false;
			},
			split: 5
		}, {
			title: '3★',
			selected: function selected(stars) {
				return stars === '3';
			},
			onclick: function onclick() {
				return _router2.default.setRoute('/synergy/3') && false;
			},
			split: 5
		}, {
			title: '4★',
			selected: function selected(stars) {
				return stars === '4';
			},
			onclick: function onclick() {
				return _router2.default.setRoute('/synergy/4') && false;
			},
			split: 5
		}, {
			title: '5★',
			selected: function selected(stars) {
				return stars === '5';
			},
			onclick: function onclick() {
				return _router2.default.setRoute('/synergy/5') && false;
			},
			split: 5
		}]
	};
	
	function draw(element, isInitialized, context) {
		(0, _springy.update)(parseInt(element.getAttribute('stars'), 10));
		if (!isInitialized) element.appendChild(_springy2.default.canvas);
		_springy2.default.canvas.width = element.offsetWidth;
		_springy2.default.canvas.height = element.offsetHeight;
		_springy2.default.resize();
	}
	
	var Synergy = {
		view: function view(ctrl, args) {
			var stars = args.stars;
			return {
				tag: 'div',
				attrs: { className: 'synergy', stars: stars, config: draw }
			};
		}
	};
	
	exports.tab = tab;
	exports.menu = menu;
	exports.default = Synergy;

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(87);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(34)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/sass-loader/index.js!./Synergy.scss", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/sass-loader/index.js!./Synergy.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(28)();
	// imports
	
	
	// module
	exports.push([module.id, ".synergy {\n  background: #fff;\n  height: 100%;\n  width: 100%;\n  overflow: hidden; }\n  .synergy canvas {\n    width: 100%;\n    height: 100%; }\n    .synergy canvas.hover {\n      cursor: pointer;\n      cursor: grab; }\n    .synergy canvas.dragging {\n      cursor: move;\n      cursor: grabbing; }\n    .synergy canvas.selecting {\n      cursor: crosshair;\n      cursor: cell; }\n", ""]);
	
	// exports


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.effectColors = exports.typeColors = exports.update = undefined;
	
	var _champions = __webpack_require__(35);
	
	var _champions2 = _interopRequireDefault(_champions);
	
	var _synergies = __webpack_require__(69);
	
	var _synergies2 = _interopRequireDefault(_synergies);
	
	var _router = __webpack_require__(41);
	
	var _router2 = _interopRequireDefault(_router);
	
	var _SpringyUI = __webpack_require__(89);
	
	var _SpringyUI2 = _interopRequireDefault(_SpringyUI);
	
	var _Graph = __webpack_require__(96);
	
	var _Graph2 = _interopRequireDefault(_Graph);
	
	var _Node = __webpack_require__(97);
	
	var _Node2 = _interopRequireDefault(_Node);
	
	var _Edge = __webpack_require__(98);
	
	var _Edge2 = _interopRequireDefault(_Edge);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var typeColors = {
		cosmic: '#3af',
		tech: '#23f',
		mutant: '#fa0',
		skill: '#f30',
		science: '#0a0',
		mystic: '#90f'
	};
	var effectColors = {
		attack: '#f00',
		stun: '#f60',
		critrate: '#fa0',
		critdamage: '#a60',
		powergain: '#a0f',
		powersteal: '#a6f',
		perfectblock: '#00a',
		block: '#66f',
		armor: '#0af',
		health: '#0f0',
		healthsteal: '#af0'
	};
	
	var springy = new _SpringyUI2.default({
		stiffness: 800,
		repulsion: 1600,
		damping: 0.5,
		nodeSelected: function nodeSelected() {}
	});
	
	var graphs = {};
	function getGraph(stars) {
		if (!graphs[stars]) {
			(function () {
				var graph = new _Graph2.default();
				var getImage = function getImage(src) {
					var image = new Image();
					image.src = src;
					return image;
				};
				var nodeMap = {};
				var nodes = _champions2.default.filter(function (champion) {
					return champion.attr.stars === stars;
				}).map(function (champion) {
					var _champion$attr = champion.attr;
					var typeId = _champion$attr.typeId;
					var uid = _champion$attr.uid;
	
					var node = graph.newNode({
						label: uid,
						image: getImage('../images/champions/portrait_' + uid + '.png'),
						type: typeId,
						color: typeColors[typeId],
						neighbors: {},
						effects: {},
						onOpen: function onOpen() {
							_router2.default.setRoute('/guide/' + uid);
						}
					});
					nodeMap[uid] = node;
					return node;
				});
				var edges = _synergies2.default.filter(function (synergy) {
					return synergy.attr.fromStars === stars && nodeMap[synergy.attr.toId] && nodeMap[synergy.attr.fromId];
				}).map(function (synergy) {
					var _synergy$attr = synergy.attr;
					var fromId = _synergy$attr.fromId;
					var toId = _synergy$attr.toId;
					var effectId = _synergy$attr.effectId;
					var effectAmount = _synergy$attr.effectAmount;
	
					return graph.newEdge(nodeMap[fromId], nodeMap[toId], {
						effect: effectId,
						amount: effectAmount,
						color: effectColors[effectId]
					});
				});
				graphs[stars] = graph;
			})();
		}
		return graphs[stars];
	}
	
	function update(stars) {
		if (springy.stars !== stars) {
			springy.update(stars, getGraph(stars));
		}
		return springy.canvas;
	}
	
	exports.update = update;
	exports.typeColors = typeColors;
	exports.effectColors = effectColors;
	exports.default = springy;

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (_ref) {
	  var _this = this;
	
	  var _ref$stiffness = _ref.stiffness;
	  var stiffness = _ref$stiffness === undefined ? 400.0 : _ref$stiffness;
	  var _ref$repulsion = _ref.repulsion;
	  var repulsion = _ref$repulsion === undefined ? 400.0 : _ref$repulsion;
	  var _ref$damping = _ref.damping;
	  var damping = _ref$damping === undefined ? 0.5 : _ref$damping;
	  var _ref$minEnergyThresho = _ref.minEnergyThreshold;
	  var minEnergyThreshold = _ref$minEnergyThresho === undefined ? 0.00001 : _ref$minEnergyThresho;
	  var _ref$nodeSelected = _ref.nodeSelected;
	  var nodeSelected = _ref$nodeSelected === undefined ? null : _ref$nodeSelected;
	  var _ref$maxTeamSize = _ref.maxTeamSize;
	  var maxTeamSize = _ref$maxTeamSize === undefined ? 5 : _ref$maxTeamSize;
	  var _ref$activeMass = _ref.activeMass;
	  var activeMass = _ref$activeMass === undefined ? 500 : _ref$activeMass;
	  var _ref$graph = _ref.graph;
	  var graph = _ref$graph === undefined ? new _Graph2.default() : _ref$graph;
	
	  var canvas = this.canvas = document.createElement('canvas');
	  var ctx = canvas.getContext("2d");
	
	  //We can check to see if the font has been loaded before using.
	  var ScaledNodeFont = function ScaledNodeFont() {
	    this.fontSize = 16 * pixelRatio;
	    this.font = this.fontSize + "px Hanzel, sans-serif";
	
	    var canvas = document.createElement('canvas');
	    var context = canvas.getContext('2d');
	
	    context.font = this.fontSize + "px sans-serif";
	    var wrongSize = context.measureText("wE arE reaDY.").width;
	
	    context.font = this.font;
	
	    this.isReady = function () {
	      if (!this.loaded && context.measureText("wE arE reaDY.").width !== wrongSize) this.loaded = true;
	      return this.loaded;
	    };
	  };
	
	  var nodeFont = undefined;
	  var pixelRatio = undefined;
	  var canvasState = undefined;
	  this.resize = function () {
	    pixelRatio = window.devicePixelRatio || 1;
	    nodeFont = new ScaledNodeFont();
	
	    var parentNode = canvas.parentNode;
	    if (parentNode) {
	      canvas.width = parentNode.offsetWidth;
	      canvas.height = parentNode.offsetHeight;
	    }
	    canvasState = canvas.getBoundingClientRect();
	  };
	  this.resize();
	
	  this.update = function (stars, graph) {
	    _this.stars = stars;
	
	    _this.layout.graph = graph;
	    _this.layout.nodePoints = {};
	    _this.layout.edgeSprings = {};
	
	    graph.eventListeners = _this.graph.eventListeners;
	    _this.graph = graph;
	
	    clearSelected();
	    renderer.start();
	  };
	
	  function addEventListeners(element, types, listener) {
	    types.split(' ').forEach(function (type) {
	      return element.addEventListener(type, listener, true);
	    });
	  }
	
	  var resizeTimeout = undefined;
	  addEventListeners(window, 'resize', function (e) {
	    if (resizeTimeout) clearTimeout(resizeTimeout);
	    resizeTimeout = setTimeout(_this.resize, 25);
	  });
	
	  this.graph = graph;
	  this.layout = new _ForceDirectedLayout2.default(graph, stiffness, repulsion, damping, minEnergyThreshold);
	
	  // calculate bounding box of graph layout.. with ease-in
	  var currentBB = this.layout.getBoundingBox();
	
	  // convert to/from screen coordinates
	  function toScreen(point) {
	    var size = currentBB.topright.clone().subtract(currentBB.bottomleft);
	    var delta = point.clone().subtract(currentBB.bottomleft);
	    return new _Vector2.default(delta.x / size.x * canvasState.width, delta.y / size.y * canvasState.height);
	  };
	
	  function fromScreen(point) {
	    var size = currentBB.topright.clone().subtract(currentBB.bottomleft);
	    return new _Vector2.default(point.x / canvasState.width * size.x + currentBB.bottomleft.x, point.y / canvasState.height * size.y + currentBB.bottomleft.y);
	  };
	
	  function getCoordinate(x, y) {
	    return new _Vector2.default(x, y).multiply(pixelRatio);
	  };
	
	  var graphShake = function graphShake() {
	    _this.layout.eachNode(function (node, point) {
	      point.p = _Vector2.default.random();
	    });
	  };
	
	  // half-assed drag and drop
	  var selected = [];
	  var edgeSelected = null;
	  var dragged = null;
	  var moved = 0;
	  var selection = null;
	  var clicks = 0;
	  var clickSource = undefined;
	
	  this.selectEdgeType = function (type) {
	    clearSelected();
	    edgeSelected = type;
	    if (dragged) dragged.point.active = false;
	    dragged = null;
	    renderer.start();
	  };
	
	  //Selection Modifications
	  var addSelected = function addSelected(node) {
	    var array = selected.slice(),
	        index = array.indexOf(node);
	    if (index !== -1) array.splice(index, 1);
	    array.push(node);
	    updateSelected(array);
	  };
	  var toggleSelected = function toggleSelected(node) {
	    var array = selected.slice(),
	        index = array.indexOf(node);
	    if (index !== -1) array.splice(index, 1);else array.push(node);
	    updateSelected(array);
	  };
	  var replaceSelected = function replaceSelected(node) {
	    var index = selected.indexOf(node);
	    if (index === -1) updateSelected([node]);
	  };
	  var boxSelected = function boxSelected(selectType) {
	    //select the first 5 closest to the start point and inside
	    var x1 = Math.min(selection.start.x, selection.end.x) | 0;
	    var y1 = Math.min(selection.start.y, selection.end.y) | 0;
	    var x2 = x1 + Math.abs(selection.start.x - selection.end.x) | 0;
	    var y2 = y1 + Math.abs(selection.start.y - selection.end.y) | 0;
	
	    var array = [];
	    _this.graph.nodes.forEach(function (node) {
	      if (!node.bb) return;
	      if (array.indexOf(node) !== -1) return;
	      if (node.bb.center.x > x1 && node.bb.center.x < x2 && node.bb.center.y > y1 && node.bb.center.y < y2) {
	        var dx = Math.abs(selection.start.x + selection.end.x) / 2 - node.bb.center.x;
	        var dy = Math.abs(selection.start.y + selection.end.y) / 2 - node.bb.center.y;
	        array.push({ distanceSquared: dx * dx + dy * dy, node: node });
	      }
	    });
	    array.sort(function (a, b) {
	      return b.distanceSquared - a.distanceSquared;
	    });
	    array = array.map(function (element) {
	      return element.node;
	    });
	    if (selectType === "add") {
	      for (var i = 0; i < selection.before.length; i++) {
	        index = array.indexOf(selection.before[i]);
	        if (index !== -1) array.splice(index, 1);
	        array.push(selection.before[i]);
	      }
	    }
	    if (selectType === "toggle") {
	      for (var i = 0; i < selection.before.length; i++) {
	        index = array.indexOf(selection.before[i]);
	        if (index !== -1) array.splice(index, 1);else array.push(selection.before[i]);
	      }
	    }
	    updateSelected(array);
	  };
	
	  var clearSelected = function clearSelected() {
	    updateSelected([]);
	  };
	  var updateSelected = function updateSelected(array) {
	    var i;
	
	    if (array.length > maxTeamSize) array = array.slice(-maxTeamSize);
	
	    for (i = 0; i < selected.length; i++) {
	      selected[i].selected = false;
	    }selected = array;
	    for (i = 0; i < selected.length; i++) {
	      var point = _this.layout.point(selected[i]);
	      if (point) point.m = activeMass;
	      selected[i].selected = true;
	    }
	  };
	  var updateNodesSelected = function updateNodesSelected() {
	    var i, j, k, edge;
	
	    if (nodeSelected) {
	      var selectedEdges = [];
	      for (i = 0; i < _this.graph.edges.length; i++) {
	        edge = _this.graph.edges[i];
	        if (selected.length > 1) {
	          for (j = 0; j < selected.length; j++) {
	            for (k = 0; k < selected.length; k++) {
	              if (selected[j] === edge.source && selected[k] === edge.target) selectedEdges.push(edge);
	            }
	          }
	        } else {
	          for (j = 0; j < selected.length; j++) {
	            if (selected[j] === edge.source || selected[j] === edge.target || selected[j].data.neighbors[edge.source.id] && selected[j].data.neighbors[edge.target.id]) selectedEdges.push(edge);
	          }
	        }
	      }
	      nodeSelected(selected, selectedEdges);
	    }
	  };
	
	  var findNodeAt = function findNodeAt(coord) {
	    var nearest = {};
	    _this.graph.nodes.forEach(function (node) {
	      var distance = node.distanceSquared(coord.x, coord.y);
	      if (nearest.distance === undefined || distance < nearest.distance) {
	        var found;
	        if (clickSource === "touch") {
	          var radius = Math.max(32, node.bb.size);
	          found = node.bb ? distance < radius * radius : false;
	        } else found = node.containsPoint(coord);
	        if (found) {
	          nearest.node = node, nearest.distance = distance;
	        }
	      }
	    });
	    return nearest.node;
	  };
	
	  //Pointer actions
	  var pointerStart = function pointerStart(coord, selectType, otherCoord) {
	    if (dragged) dragged.point.active = false;
	    var node = findNodeAt(coord);
	    if (!node) {
	      if (selectType === "replace" || clickSource === "touch") {
	        clearSelected();
	        updateNodesSelected();
	      }
	      if (clickSource === "touch") {
	        if (coord && otherCoord) {
	          selection = { start: coord, end: otherCoord, before: selected, type: selectType };
	        }
	      } else if (selectType) selection = { start: coord, before: selected, type: selectType };
	      clicks = 0;
	    } else {
	      if (node.isSelected()) clicks++;
	      var point = fromScreen(coord);
	      dragged = { node: node, point: _this.layout.point(node) };
	      dragged.offset = new _Vector2.default(dragged.point.p.x - point.x, dragged.point.p.y - point.y);
	      dragged.coord = coord;
	      dragged.point.active = true;
	      dragged.point.m = activeMass;
	    }
	    moved = 0;
	    renderer.start();
	  };
	
	  var pointerMove = function pointerMove(coord, selectType, otherCoord) {
	    var point = fromScreen(coord);
	    if (dragged !== null) {
	      moved += coord.clone().subtract(dragged.coord).length();
	      dragged.coord = coord;
	      dragged.point.p = point.add(dragged.offset);
	      dragged.point.m = activeMass;
	      dragged.point.active = true;
	    } else if (clickSource === "touch") {
	      if (coord && otherCoord) {
	        selection.start = coord;
	        selection.end = otherCoord;
	        selection.type = selectType;
	      }
	    } else if (selection) {
	      selection.end = coord;
	      selection.type = selectType;
	    }
	    renderer.start();
	  };
	
	  var pointerEnd = function pointerEnd(clicked, selectType) {
	    selection = null;
	    if (dragged !== null) {
	      if (moved < 10) {
	        switch (selectType) {
	          case "add":
	            addSelected(dragged.node);
	            break;
	          case "toggle":
	            toggleSelected(dragged.node);
	            break;
	          case "replace":
	            replaceSelected(dragged.node);
	            break;
	        }
	        updateNodesSelected();
	        edgeSelected = null;
	      }
	      dragged.point.active = false;
	      dragged = null;
	    } else if (clicked) edgeSelected = null;
	  };
	
	  function selectType(event) {
	    return event.shiftKey ? "add" : event.ctrlKey ? "toggle" : "replace";
	  }
	
	  addEventListeners(document.body, 'keyup', function (e) {
	    if (e.which === 27) {
	      // escape
	      e.preventDefault();
	      clearSelected();
	      if (nodeSelected) {
	        nodeSelected(selected);
	      }
	    } else if (e.which === 32) {
	      // space bar
	      e.preventDefault();
	      graphShake();
	    }
	  });
	
	  var tapHold = {
	    handler: function handler() {
	      var node = dragged && dragged.node;
	      if (moved < 10 && node && node.isSelected() && node.data.onOpen) {
	        node.data.onOpen();
	        pointerEnd();
	      }
	    },
	    timeout: 0,
	    timeoutDelay: 1000
	  };
	
	  addEventListeners(canvas, 'dblclick', function (e) {
	    if (clickSource !== "mouse" || clicks < 2 || e.shiftKey || e.ctrlKey) return;
	    var node = findNodeAt(getCoordinate(e.pageX - canvasState.left, e.pageY - canvasState.top));
	    if (moved < 10 && node && node.isSelected() && node.data.onOpen) {
	      node.data.onOpen();
	      pointerEnd();
	    }
	    e.preventDefault();
	  });
	
	  addEventListeners(canvas, 'touchstart', function (e) {
	    clearTimeout(tapHold.timeout);
	    if (window.event.touches.length === 1) tapHold.timeout = setTimeout(tapHold.handler, tapHold.timeoutDelay);
	    clickSource = "touch";
	    var coord = getCoordinate(window.event.touches[0].pageX - canvasState.left, window.event.touches[0].pageY - canvasState.top),
	        otherCoord;
	    if (window.event.touches.length > 1) otherCoord = getCoordinate(window.event.touches[1].pageX - canvasState.left, window.event.touches[1].pageY - canvasState.top);
	    pointerStart(coord, "toggle", otherCoord);
	    e.preventDefault();
	    e.stopPropagation();
	    return false;
	  });
	
	  addEventListeners(canvas, 'touchmove', function (e) {
	    clickSource = "touch";
	    var coord = getCoordinate(window.event.touches[0].pageX - canvasState.left, window.event.touches[0].pageY - canvasState.top),
	        otherCoord;
	    if (window.event.touches.length > 1) otherCoord = getCoordinate(window.event.touches[1].pageX - canvasState.left, window.event.touches[1].pageY - canvasState.top);
	    pointerMove(coord, "toggle", otherCoord);
	    e.preventDefault();
	    e.stopPropagation();
	    return false;
	  });
	
	  addEventListeners(canvas, 'touchend', function (e) {
	    clearTimeout(tapHold.timeout);
	    clickSource = "touch";
	    if (window.event.touches.length === 0) pointerEnd(true, "toggle");
	    e.preventDefault();
	    e.stopPropagation();
	    return false;
	  });
	
	  addEventListeners(canvas, 'touchleave touchcancel', function (e) {
	    clearTimeout(tapHold.timeout);
	    clickSource = "touch";
	    pointerEnd(false, "toggle");
	  });
	
	  addEventListeners(window, 'touchend', function (e) {
	    clearTimeout(tapHold.timeout);
	    clickSource = "touch";
	    pointerEnd(false, "toggle");
	  });
	
	  addEventListeners(canvas, 'mousedown', function (e) {
	    if (e.button === 2) return;
	    clickSource = "mouse";
	    pointerStart(getCoordinate(e.pageX - canvasState.left, e.pageY - canvasState.top), selectType(e));
	    e.preventDefault();
	  });
	
	  addEventListeners(window, 'mousemove', function (e) {
	    clickSource = "mouse";
	    pointerMove(getCoordinate(e.pageX - canvasState.left, e.pageY - canvasState.top), selectType(e));
	    e.preventDefault();
	  });
	
	  addEventListeners(window, 'mouseup', function (e) {
	    if (e.target !== canvas && !dragged && !selection) return;
	    clickSource = "mouse";
	    pointerEnd(true, selectType(e));
	    e.preventDefault();
	  });
	
	  addEventListeners(canvas, 'mousedown mousemove mouseenter mouseleave', function (e) {
	    var state = '';
	    if (selection) state = 'selecting';else if (dragged !== null) state = 'dragging';else {
	      if (findNodeAt(getCoordinate(e.pageX - canvasState.left, e.pageY - canvasState.top))) state = 'hover';
	    }
	    switch (state) {
	      case 'selecting':
	        canvas.className = "selecting";
	        break;
	      case 'dragging':
	        canvas.className = "dragging";
	        break;
	      case 'hover':
	        canvas.className = "hover";
	        break;
	      default:
	        canvas.className = "";
	    }
	  });
	
	  var nodeHitmasks = {};
	  function getHitmask(src, image) {
	    if (!nodeHitmasks[src]) {
	      if (typeof image === "function") image = image();
	      var x,
	          y,
	          size = image.width,
	          imageData = image.getContext('2d').getImageData(0, 0, size, size),
	          data = imageData.data,
	          opaque = {};
	      for (x = 0; x < size; x++) {
	        opaque[x] = {};
	        for (y = 0; y < size; y++) {
	          opaque[x][y] = data[y * size * 4 + x * 4 + 3] > 127 ? true : undefined;
	        }
	      }
	      nodeHitmasks[src] = { size: size, opaque: opaque };
	    }
	    return nodeHitmasks[src];
	  }
	
	  var nodeImages = {};
	  var nodeImageQueue = {
	    list: [],
	    todo: {}
	  };
	  nodeImageQueue.push = function (id, callback) {
	    nodeImageQueue.insert(id, callback, 'push');
	  };
	  nodeImageQueue.unshift = function (id, callback) {
	    nodeImageQueue.insert(id, callback, 'unshift');
	  };
	  nodeImageQueue.insert = function (id, callback, method) {
	    nodeImageQueue.todo[id] = callback;
	    nodeImageQueue.list[method].call(nodeImageQueue.list, id);
	    if (!nodeImageQueue.timeout) nodeImageQueue.next();
	  };
	  nodeImageQueue.next = function () {
	    if (nodeImageQueue.list.length === 0) return;
	    var id = nodeImageQueue.list.shift();
	    var todo = nodeImageQueue.todo[id];
	    delete nodeImageQueue.todo[id];
	    nodeImageQueue.timeout = setTimeout(function () {
	      delete nodeImageQueue.timeout;
	      todo.call(null);
	      nodeImageQueue.next();
	    }, 25);
	  };
	
	  function addPortaitImages(src, image, color) {
	    //build the image
	    var canvas = document.createElement('canvas'),
	        context = canvas.getContext('2d'),
	        barHeight = Math.max(2, image.width / 10 | 0);
	    canvas.width = canvas.height = image.width;
	    context.drawImage(image, 0, 0, canvas.width, canvas.height);
	    context.fillStyle = color;
	    context.fillRect(0, canvas.height - barHeight, canvas.width, barHeight);
	
	    if (nodeImages[src].portraits === undefined) nodeImages[src].portraits = [];
	    nodeImages[src].portraits.push(canvas);
	
	    var resize = image.width >> 1;
	    if (resize >= 16) {
	      var resizeCanvas = document.createElement('canvas'),
	          resizeContext = resizeCanvas.getContext('2d');
	      resizeCanvas.width = resizeCanvas.height = resize;
	      resizeContext.drawImage(image, 0, 0, resize, resize);
	      nodeImageQueue.unshift(src, function () {
	        addPortaitImages(src, resizeCanvas, color);
	      }, 'unshift');
	    } else {
	      nodeImages[src].loaded = true;
	    }
	  }
	
	  var placeholders = {};
	  var placeholderCoords = [
	  //Used the svg path from here and just filled the path with bezier curves.
	  //The original size of the svg path was 220x220 so scale to new size.
	  //https://upload.wikimedia.org/wikipedia/en/b/b9/No_free_portrait.svg
	  3.5709275, 215.81378, 3.7352275, 204.03019, 3.8497975, 199.05392, 3.5005675, 183.77748, 11.214111, 174.15409, 38.3674, 169.74066, 45.785393, 167.0981, 55.358378, 159.98075, 66.203698, 153.92378, 75.552667, 148.56151, 80.7154, 145.60034, 80.782546, 135.45005, 80.404668, 128.63362, 78.689369, 118.98009, 77.782686, 110.65561, 70.86354, 103.56735, 70.47649, 101.54341, 69.346365, 96.899211, 65.948685, 90.832271, 63.662168, 80.636072, 54.650066, 68.010083, 56.914311, 61.532735, 62.944238, 44.282973, 57.676043, 37.272904, 61.378834, 35.798494, 69.823479, 32.435953, 72.10706, 25.082426, 79.841538, 17.698566, 102.43887, 13.411138, 98.965362, 1.9932189, 115.84961, 4.1987589, 136.77696, 6.9324259, 125.2515, 10.014792, 139.60507, 17.279644, 157.23926, 26.204921, 146.73196, 27.108963, 162.83032, 50.739759, 172.38972, 64.771999, 153.76819, 65.728581, 158.59298, 78.146165, 163.04993, 89.617072, 152.54354, 91.572613, 147.24294, 104.12579, 142.15767, 116.16899, 138.96668, 119.70997, 144.82195, 135.58386, 150.25927, 150.32462, 159.28667, 143.58938, 179.677, 165.66778, 184.85448, 171.27389, 203.45549, 164.48784, 216.26305, 180.85898, 216.25506, 189.25148, 216.44185, 198.19473, 216.49943, 216.08121, 159.09474, 215.87646, 3.5709275, 215.81378, 3.5709275, 215.81378];
	
	  function getPlaceholder(size, color) {
	    var id = size + '_' + (color || '');
	    if (!placeholders[id]) {
	      var canvas, context;
	      if (!placeholders[size]) {
	        var ratio = size / 220;
	        canvas = document.createElement('canvas');
	        context = canvas.getContext('2d');
	        canvas.height = canvas.width = size;
	        context.beginPath();
	        context.moveTo(placeholderCoords[0] * ratio, placeholderCoords[1] * ratio);
	        for (var i = 2; i < placeholderCoords.length; i += 6) {
	          context.bezierCurveTo(placeholderCoords[i] * ratio, placeholderCoords[i + 1] * ratio, placeholderCoords[i + 2] * ratio, placeholderCoords[i + 3] * ratio, placeholderCoords[i + 4] * ratio, placeholderCoords[i + 5] * ratio);
	        }context.closePath();
	        context.lineWidth = 3;
	        context.strokeStyle = "#868686";
	        context.stroke();
	        context.fillStyle = "#909090";
	        context.fill();
	        placeholders[size] = canvas;
	      }
	      var barHeight = Math.max(2, size / 10 | 0);
	      canvas = document.createElement('canvas');
	      context = canvas.getContext('2d');
	      canvas.height = canvas.width = size;
	      context.drawImage(placeholders[size], 0, 0, canvas.width, canvas.height);
	      context.fillStyle = color || "#000";
	      context.fillRect(0, canvas.height - barHeight, canvas.width, barHeight);
	      placeholders[id] = canvas;
	    }
	    return placeholders[id];
	  }
	
	  var _getPortraitSizeTarget = function getPortraitSizeTarget(number) {
	    var list = {};
	    _getPortraitSizeTarget = function (number) {
	      if (list[number] === undefined) {
	        var i = 1,
	            last = 0;
	        while (i != number && i + (i - last) >> 1 < number) {
	          last = i;
	          i = i << 1;
	        }
	        list[number] = i;
	      }
	      return list[number];
	    };
	    return _getPortraitSizeTarget(number);
	  };
	
	  //we cache the best sized portrait with type bar
	  _Node2.default.prototype.setPortraitImage = function (size) {
	    var portrait,
	        hitmask,
	        img = this.data.image,
	        color = this.data.color || "#111111",
	        node = this;
	    if (img) {
	      var src = img.src;
	      if (src in nodeImages) {
	        if (nodeImages[src].loaded) {
	          //sample down for better antialiasing
	          var portraits = nodeImages[src].portraits,
	              target = _getPortraitSizeTarget(size);
	          for (var i = 0; i < portraits.length && portraits[i].width >= target; i++) {
	            portrait = portraits[i];
	          } //get hitmask from largest image
	          hitmask = getHitmask(src, portraits[0]);
	        }
	      } else {
	        nodeImages[src] = {
	          loaded: false,
	          portraits: []
	        };
	        var image = new Image();
	        image.addEventListener("load", function () {
	          nodeImageQueue.push(src, function () {
	            addPortaitImages(src, image, color);
	          });
	        });
	        image.src = src;
	      }
	    }
	    if (!portrait) {
	      portrait = getPlaceholder(size, color);
	      hitmask = getHitmask('portrait', function () {
	        return getPlaceholder(256);
	      });
	    }
	
	    this.image = portrait;
	    this.hitmask = hitmask;
	  };
	
	  _Node2.default.prototype.setPortraitText = function () {
	    if (!this.text || this.text.font != nodeFont || !this.text.ready && this.text.ready !== nodeFont.isReady()) {
	      var canvas = document.createElement('canvas');
	      var context = canvas.getContext('2d');
	
	      var uid = this.data.label;
	      var text = _lang2.default.get('champion-' + uid + '-shortname', null) || _lang2.default.get('champion-' + uid + '-name');
	
	      context.font = nodeFont.font;
	      var paddingX = pixelRatio * (nodeFont.isReady() ? 6 : 3);
	      var paddingTop = pixelRatio * (nodeFont.isReady() ? 4 : 3);
	      var paddingBottom = pixelRatio * 3;
	      var textWidth = context.measureText(text).width;
	      var textHeight = nodeFont.fontSize;
	
	      canvas.width = textWidth + paddingX * 2 | 0;
	      canvas.height = textHeight + paddingTop + paddingBottom | 0;
	
	      //draw the text background
	      context.fillStyle = "rgba(0, 0, 0, 0.5)";
	      context.fillRect(0, 0, canvas.width, canvas.height);
	      //draw the name
	      context.font = nodeFont.font;
	      context.fillStyle = "#ffffff";
	      context.textAlign = "left";
	      context.textBaseline = "top";
	      context.shadowColor = "#000";
	      context.shadowOffsetX = 1 * pixelRatio;
	      context.shadowOffsetY = 1 * pixelRatio;
	      context.fillText(text, paddingX, paddingTop);
	
	      this.text = canvas;
	      this.text.font = nodeFont;
	      this.text.ready = nodeFont.isReady();
	    }
	  };
	
	  var renderer = this.renderer = new _Renderer2.default(this.layout,
	  // clear
	  function () {
	    currentBB = _this.layout.getBoundingBox();
	    ctx.clearRect(0, 0, canvas.width, canvas.height);
	    if (selection && selection.start && selection.end) {
	      boxSelected(selection.type);
	      updateNodesSelected();
	    }
	    if (dragged) {
	      var point = fromScreen(dragged.coord);
	      dragged.point.p = point.add(dragged.offset);
	      dragged.point.m = activeMass;
	    }
	  },
	  // processNode
	  function (node, point) {
	    var s = toScreen(point),
	        x = s.x | 0,
	        y = s.y | 0,
	        fullSize = node.getSize() | 0,
	        halfSize = fullSize >> 1;
	    //set images/bounds
	    node.setPortraitText();
	    node.setPortraitImage(fullSize);
	    node.setBoundingBox(x - halfSize, y - halfSize, fullSize);
	  },
	  // drawEdge
	  function (edge, pointStart, pointEnd) {
	    var p1 = toScreen(pointStart),
	        p2 = toScreen(pointEnd);
	    var isSelected = 0;
	    if (edgeSelected) {
	      if (edge.data.effect === edgeSelected) isSelected = 1;
	    } else if (selected.length === maxTeamSize) {
	      if (edge.source.isSelected() && edge.target.isSelected()) isSelected = 1;
	    } else if (selected.length > 1) {
	      var sourceSelected = edge.source.isSelected(),
	          targetSelected = edge.target.isSelected();
	      if (sourceSelected && targetSelected) isSelected = 1;else if (sourceSelected || targetSelected) isSelected = 0.5;else if (edge.target.isSelectedNeighbor() && edge.source.isSelectedNeighbor()) isSelected = 0.5;
	    } else if (selected.length) {
	      if (edge.source.isSelected() || edge.target.isSelected()) isSelected = 1;
	      if (edge.target.isSelectedNeighbor() && edge.source.isSelectedNeighbor()) isSelected = 0.5;
	    } else isSelected = 1;
	
	    var normal = p2.clone().subtract(p1).normal().normalise();
	    var from = _this.graph.getEdges(edge.source, edge.target);
	    var to = _this.graph.getEdges(edge.target, edge.source);
	    var total = from.length + to.length;
	
	    // Figure out edge's position in relation to other edges between the same nodes
	    var n = 0;
	    for (var i = 0; i < from.length; i++) {
	      if (from[i].id === edge.id) {
	        n = i;
	      }
	    }
	
	    //change default to  10.0 to allow text fit between edges
	    var spacing = Math.min(Math.max(4, Math.min(window.innerWidth, window.innerHeight) / 50), 12) * pixelRatio;
	
	    // Figure out how far off center the line should be drawn
	    var offset = normal.multiply(-((total - 1) * spacing) / 2.0 + n * spacing);
	    var s1 = p1.clone().add(offset);
	    var s2 = p2.clone().add(offset);
	    var sdelta = s2.clone().subtract(s1).normalise();
	    var weight = selected.length > 1 && isSelected === 1 ? 2 : 1.0;
	    var width = Math.max(weight * 1.5, 0.1) * pixelRatio;
	    var arrowWidth = 1 + width;
	    var arrowLength = arrowWidth * 4;
	    var overlapping = edge.target.overlapping(edge.source);
	    var lineStart, lineEnd, lineDelta, lineDiff;
	    var halfArrow = sdelta.clone().multiply(arrowLength * 0.75);
	    var sourceAbove = s1.y < s2.y;
	
	    //get best line start/end
	    if (overlapping) {
	      if (sourceAbove) {
	        lineStart = s1.clone();
	        lineEnd = edge.target.intersection(s1, s2);
	      } else {
	        lineStart = edge.source.intersection(s2, s1);
	        lineEnd = s2.clone();
	      }
	    } else {
	      lineStart = edge.source.intersection(s2, s1);
	      lineEnd = edge.target.intersection(s1, s2);
	
	      //adjust if we have too short or long direction
	      if (!lineStart || !lineEnd || (lineDiff = lineEnd.clone().subtract(lineStart)).lengthSquared() < arrowLength * arrowLength || lineDiff.normalise().dot(sdelta) < 0) {
	        if (sourceAbove) {
	          lineStart = s1.clone();
	          lineEnd = edge.target.intersection(s1, s2);
	        } else {
	          lineStart = edge.source.intersection(s2, s1);
	          lineEnd = s2.clone();
	        }
	      }
	    }
	    lineStart = lineStart || s1.clone();
	    lineEnd = lineEnd || s2.clone();
	    lineEnd.subtract(halfArrow);
	    var ldelta = lineEnd.clone().subtract(lineStart).normalise();
	
	    var arrowStart = lineEnd.clone().add(halfArrow);
	    var stroke = edge.data.color || '#000000';
	    var alpha = isSelected === 0 ? 0.1 : isSelected === 0.5 ? 0.5 : 1.0;
	
	    ctx.save();
	
	    //settings
	    ctx.lineWidth = width;
	    ctx.lineCap = overlapping ? "round" : "butt";
	    ctx.strokeStyle = stroke;
	    ctx.fillStyle = stroke;
	    ctx.globalAlpha = alpha;
	
	    //line
	
	    if (ldelta.dot(sdelta) > 0) {
	      ctx.beginPath();
	      ctx.moveTo(lineStart.x, lineStart.y);
	      ctx.lineTo(lineEnd.x, lineEnd.y);
	      ctx.closePath();
	      ctx.stroke();
	    }
	
	    // arrow
	    ctx.translate(arrowStart.x, arrowStart.y);
	    ctx.rotate(Math.atan2(p2.y - p1.y, p2.x - p1.x));
	    ctx.beginPath();
	    ctx.moveTo(-arrowLength, arrowWidth);
	    ctx.lineTo(0, 0);
	    ctx.lineTo(-arrowLength, -arrowWidth);
	    ctx.lineTo(-arrowLength * 0.8, -0);
	    ctx.closePath();
	    ctx.fill();
	
	    ctx.restore();
	  },
	  // drawNode
	  function (node, point) {
	    var size = node.bb.size;
	
	    if (node.isSelected()) ctx.globalAlpha = 1.0;else if (edgeSelected) ctx.globalAlpha = node.data.effects[edgeSelected] ? 1.0 : 0.25;else if (selected.length === maxTeamSize) ctx.globalAlpha = 0.25;else if (selected.length > 1) ctx.globalAlpha = node.isSelectedNeighbor() ? 0.75 : 0.25;else if (selected.length) ctx.globalAlpha = node.isSelectedNeighbor() ? 1.0 : 0.25;else ctx.globalAlpha = 1.0;
	
	    //draw the portrait
	    ctx.drawImage(node.image, node.bb.topLeft.x, node.bb.topLeft.y, size, size);
	  },
	  // drawNodeOverlay
	  function (node, point) {
	    if (!node.isSelected() || !node.text) return;
	
	    ctx.globalAlpha = 1.0;
	
	    //draw the portrait text
	    var width = node.text.width,
	        height = node.text.height;
	    ctx.drawImage(node.text, Math.min(Math.max(0, node.bb.center.x - width / 2 | 0), canvasState.width - width), Math.min(Math.max(0, node.bb.center.y - height - node.bb.size / 2 | 0), canvasState.height - height), width, height);
	  },
	  // drawOverlay
	  function () {
	    if (selection && selection.start && selection.end) {
	      var x = -0.5 + Math.min(selection.start.x, selection.end.x) | 0,
	          y = -0.5 + Math.min(selection.start.y, selection.end.y) | 0,
	          width = 0.5 + Math.abs(selection.start.x - selection.end.x) | 0,
	          height = 0.5 + Math.abs(selection.start.y - selection.end.y) | 0;
	
	      ctx.save();
	
	      //translate the entire context by .5 to get 1px width lines
	      ctx.translate(0.5, 0.5);
	
	      //draw the outline
	      ctx.lineWidth = pixelRatio;
	      ctx.strokeStyle = "rgb(95, 156, 255)";
	      ctx.strokeRect(x, y, width, height);
	
	      //draw the overlay, but not over drawn content
	      ctx.globalCompositeOperation = "destination-over";
	      ctx.fillStyle = "rgba(64, 138, 226, 0.15)";
	      ctx.fillRect(x, y, width, height);
	
	      ctx.restore();
	    }
	  });
	
	  _Node2.default.prototype.setBoundingBox = function (x, y, size) {
	    this.bb = {
	      topLeft: new _Vector2.default(x, y),
	      bottomRight: new _Vector2.default(x + size, y + size),
	      center: new _Vector2.default(x + size / 2 | 0, y + size / 2 | 0),
	      size: size
	    };
	  };
	
	  // return true if inside BB and not over a 0 opacity pixel
	  _Node2.default.prototype.containsPoint = function (point, y) {
	    var x, px, py;
	    if (y === undefined) {
	      y = point.y;
	      x = point.x;
	    } else x = point;
	
	    if (this.bb && this.hitmask) {
	      px = (x - this.bb.topLeft.x) / this.bb.size * this.hitmask.size | 0;
	      py = (y - this.bb.topLeft.y) / this.bb.size * this.hitmask.size | 0;
	      if (this.hitmask.opaque[px]) return this.hitmask.opaque[px][py];
	    }
	    return false;
	  };
	
	  _Node2.default.prototype.containsPointRaw = function (x, y) {
	    return this.hitmask.opaque[x | 0][y | 0];
	  };
	
	  _Node2.default.prototype.overlappingBoundingBox = function (node) {
	    return this.bb && node.bb && this.bb.topLeft.x <= node.bb.bottomRight.x && this.bb.bottomRight.x >= node.bb.topLeft.x && this.bb.topLeft.y <= node.bb.bottomRight.y && this.bb.bottomRight.y >= node.bb.topLeft.y;
	  };
	
	  _Node2.default.prototype.overlapping = function (node) {
	    if (this.overlappingBoundingBox(node)) {
	      if (this.hitmask && node.hitmask) {
	        var tlx, tly, brx, bry;
	        if (this.bb.bottomRight.y < node.bb.bottomRight.y) {
	          tly = node.bb.topLeft.y | 0;
	          bry = this.bb.bottomRight.y | 0;
	        } else {
	          tly = this.bb.topLeft.y | 0;
	          bry = node.bb.bottomRight.y | 0;
	        }
	        if (this.bb.topLeft.x < node.bb.topLeft.x) {
	          tlx = node.bb.topLeft.x | 0;
	          brx = this.bb.bottomRight.x | 0;
	        } else {
	          tlx = this.bb.topLeft.x | 0;
	          brx = node.bb.bottomRight.x | 0;
	        }
	        for (var x = tlx; x < brx; x++) {
	          for (var y = tly; y < bry; y++) {
	            if (this.containsPoint(x, y) && node.containsPoint(x, y)) return true;
	          }
	        }return false;
	      }
	      return true;
	    }
	    return false;
	  };
	
	  _Node2.default.prototype.distanceSquared = function (x, y) {
	    if (!this.bb) return null;
	    var dx = this.bb.center.x - x,
	        dy = this.bb.center.y - y;
	    return dx * dx + dy * dy;
	  };
	
	  _Node2.default.prototype.isSelected = function () {
	    return this.selected;
	  };
	
	  _Node2.default.prototype.isSelectedNeighbor = function () {
	    for (var i = 0; i < selected.length; i++) {
	      if (selected[i].data.neighbors[this.id]) return true;
	    }return false;
	  };
	
	  _Node2.default.prototype.getSize = function () {
	    var canvasSize = Math.min(canvasState.width, canvasState.height),
	        size = Math.min(Math.max(16, canvasSize >> 4), 128);
	    if (this.isSelected()) size *= 1.5;
	    return size;
	  };
	
	  //find the nearest edge of the image, assuming end is inside of node
	  _Node2.default.prototype.intersection = function (outside, inside) {
	    if (!this.hitmask || !this.bb) return null;
	
	    //get position relative to hitmask
	    var last,
	        check = inside.clone().subtract(this.bb.topLeft).divide(this.bb.size).multiply(this.hitmask.size),
	        delta = outside.clone().subtract(inside).normalise().divide(this.bb.size).multiply(this.hitmask.size);
	    while (check.x >= 0 && check.y >= 0 && check.y < this.hitmask.size && check.x < this.hitmask.size) {
	      if (this.containsPointRaw(check.x, check.y)) {
	        if (!last) last = check.clone();else last.copy(check);
	      }
	      check.add(delta);
	    }
	    if (!last) return null;
	
	    //scale and move back to relative position
	    return last.divide(this.hitmask.size).multiply(this.bb.size).add(this.bb.topLeft);
	  };
	  return this;
	};
	
	var _animation = __webpack_require__(90);
	
	var _lang = __webpack_require__(49);
	
	var _lang2 = _interopRequireDefault(_lang);
	
	var _ForceDirectedLayout = __webpack_require__(91);
	
	var _ForceDirectedLayout2 = _interopRequireDefault(_ForceDirectedLayout);
	
	var _Renderer = __webpack_require__(95);
	
	var _Renderer2 = _interopRequireDefault(_Renderer);
	
	var _Graph = __webpack_require__(96);
	
	var _Graph2 = _interopRequireDefault(_Graph);
	
	var _Vector = __webpack_require__(93);
	
	var _Vector2 = _interopRequireDefault(_Vector);
	
	var _Point = __webpack_require__(92);
	
	var _Point2 = _interopRequireDefault(_Point);
	
	var _Spring = __webpack_require__(94);
	
	var _Spring2 = _interopRequireDefault(_Spring);
	
	var _Node = __webpack_require__(97);
	
	var _Node2 = _interopRequireDefault(_Node);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	;

/***/ },
/* 90 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	//requestAnimFrame function from Paul Irish
	var requestNextFrame = (function () {
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
	})();
	
	var cancelNextFrame = (function () {
		return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame;
	})();
	
	function requestRender(callback) {
		if (requestNextFrame === undefined || cancelNextFrame === undefined) setTimeout(callback, 50);else {
			(function () {
				var requestId = undefined;
				var timeoutId = undefined;
				if (document.hasFocus()) {
					requestId = requestNextFrame(function () {
						clearTimeout(timeoutId);
						callback.call(null);
					});
				}
				timeoutId = setTimeout(function () {
					cancelNextFrame(requestId);
					callback.call(null);
				}, 50);
			})();
		}
	}
	
	exports.requestRender = requestRender;

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _Point = __webpack_require__(92);
	
	var _Point2 = _interopRequireDefault(_Point);
	
	var _Spring = __webpack_require__(94);
	
	var _Spring2 = _interopRequireDefault(_Spring);
	
	var _Vector = __webpack_require__(93);
	
	var _Vector2 = _interopRequireDefault(_Vector);
	
	var _animation = __webpack_require__(90);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ForceDirectedLayout = (function () {
		function ForceDirectedLayout(graph, stiffness, repulsion, damping) {
			var minEnergyThreshold = arguments.length <= 4 || arguments[4] === undefined ? 0.01 : arguments[4];
	
			_classCallCheck(this, ForceDirectedLayout);
	
			this.graph = graph;
			this.stiffness = stiffness; // spring stiffness constant
			this.repulsion = repulsion; // repulsion constant
			this.damping = damping; // velocity damping factor
			this.minEnergyThreshold = minEnergyThreshold; //threshold used to determine render stop
	
			this.nodePoints = {}; // keep track of points associated with nodes
			this.edgeSprings = {}; // keep track of springs associated with edges
		}
	
		_createClass(ForceDirectedLayout, [{
			key: 'point',
			value: function point(node) {
				if (!(node.id in this.nodePoints)) {
					var mass = node.data.mass !== undefined ? node.data.mass : 1.0;
					this.nodePoints[node.id] = new _Point2.default(_Vector2.default.random(), mass);
				}
				return this.nodePoints[node.id];
			}
		}, {
			key: 'spring',
			value: function spring(edge) {
				var _this = this;
	
				if (!(edge.id in this.edgeSprings)) {
					var _ret = (function () {
						var length = edge.data.length !== undefined ? edge.data.length : 1.0;
						var existingSpring = false;
						_this.graph.getEdges(edge.source, edge.target).forEach(function (otherEdge) {
							if (existingSpring === false && otherEdge.id in _this.edgeSprings) {
								existingSpring = _this.edgeSprings[otherEdge.id];
							}
						}, _this);
						if (existingSpring !== false) {
							return {
								v: new _Spring2.default(existingSpring.point1, existingSpring.point2, 0.0, 0.0)
							};
						}
						_this.graph.getEdges(edge.target, edge.source).forEach(function (otherEdge) {
							if (existingSpring === false && otherEdge.id in _this.edgeSprings) {
								existingSpring = _this.edgeSprings[otherEdge.id];
							}
						}, _this);
						if (existingSpring !== false) {
							return {
								v: new _Spring2.default(existingSpring.point2, existingSpring.point1, 0.0, 0.0)
							};
						}
						_this.edgeSprings[edge.id] = new _Spring2.default(_this.point(edge.source), _this.point(edge.target), length, _this.stiffness);
					})();
	
					if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
				}
				return this.edgeSprings[edge.id];
			}
	
			// callback should accept two arguments: Node, Point
	
		}, {
			key: 'eachNode',
			value: function eachNode(callback) {
				var _this2 = this;
	
				this.graph.nodes.forEach(function (node) {
					callback.call(_this2, node, _this2.point(node));
				});
			}
		}, {
			key: 'eachEdge',
	
			// callback should accept two arguments: Edge, Spring
			value: function eachEdge(callback) {
				var _this3 = this;
	
				this.graph.edges.forEach(function (edge) {
					callback.call(_this3, edge, _this3.spring(edge));
				});
			}
		}, {
			key: 'eachSpring',
	
			// callback should accept one argument: Spring
			value: function eachSpring(callback) {
				var _this4 = this;
	
				this.graph.edges.forEach(function (edge) {
					callback.call(_this4, _this4.spring(edge));
				});
			}
	
			// callback should accept one argument: Spring
	
		}, {
			key: 'eachUniqueSpring',
			value: function eachUniqueSpring(callback) {
				var _this5 = this;
	
				var ids = {};
				this.graph.edges.forEach(function (edge) {
					if (ids[edge.nodes]) return;
					ids[edge.nodes] = true;
					callback.call(_this5, _this5.spring(edge));
				});
			}
	
			// Physics stuff
	
		}, {
			key: 'decayMasses',
			value: function decayMasses() {
				this.eachNode(function (node, point) {
					if (point.active || node.selected) return;
					if (point.m !== point.mass) {
						var difference = Math.abs(point.mass - point.m);
						if (difference < 1) {
							point.m = point.mass;
							point.delta = undefined;
						} else {
							if (point.delta === undefined) {
								point.delta = Math.max(1, difference / 100);
								if (point.m < point.mass) point.delta = -point.delta;
							}
							point.m -= point.delta;
						}
					}
				});
			}
	
			// Physics stuff
	
		}, {
			key: 'applyCoulombsLaw',
			value: function applyCoulombsLaw() {
				var _this6 = this;
	
				this.eachNode(function (node1, point1) {
					_this6.eachNode(function (node2, point2) {
						if (node1.id === node2.id) return;
						var direction = point1.p.clone().subtract(point2.p);
						// avoid massive forces at small distances (and divide by zero)
						var distanceSquared = Math.max(0.1, direction.lengthSquared());
						var normal = direction.normalise();
						var strong1 = node1.selected || point1.active;
						var strong2 = node2.selected || point2.active;
						var repulsion = _this6.repulsion;
						if (strong1 || strong2) {
							repulsion *= Math.max(1, Math.min(Math.max(point1.m, point2.m) / 10, strong1 && strong2 ? 10 : 5));
						}
						// apply force to each end point
						point1.applyForce(normal.multiply(repulsion).divide(0.5 * distanceSquared));
						point2.applyForce(normal.multiply(-1));
					});
				});
			}
		}, {
			key: 'applyHookesLaw',
			value: function applyHookesLaw() {
				this.eachUniqueSpring(function (spring) {
					// the direction of the spring
					var direction = spring.point2.p.clone().subtract(spring.point1.p);
					var displacement = spring.length - direction.length();
					var normal = direction.normalise();
					var k = spring.k;
					// apply opposite forces to each end point
					spring.point1.applyForce(normal.multiply(-0.5 * k * displacement));
					spring.point2.applyForce(normal.multiply(-1));
				});
			}
		}, {
			key: 'attractToCentre',
			value: function attractToCentre() {
				this.eachNode(function (node, point) {
					var direction = point.p.clone().multiply(-1.0),
					    repulsion = this.repulsion;
					point.applyForce(direction.multiply(repulsion / 50.0));
				});
			}
		}, {
			key: 'updateVelocity',
			value: function updateVelocity(timestep) {
				this.eachNode(function (node, point) {
					point.v.add(point.a.multiply(timestep)).multiply(this.damping);
					point.a = new _Vector2.default(0, 0);
				});
			}
		}, {
			key: 'updatePosition',
			value: function updatePosition(timestep) {
				this.eachNode(function (node, point) {
					point.p.add(point.v.clone().multiply(timestep));
				});
			}
	
			// Calculate the total kinetic energy of the system
	
		}, {
			key: 'totalEnergy',
			value: function totalEnergy(timestep) {
				var energy = 0.0;
				this.eachNode(function (node, point) {
					var speedSquared = point.v.lengthSquared();
					energy += 0.5 * point.m * speedSquared;
				});
				return energy;
			}
	
			/**
	   * Start simulation if it's not running already.
	   * In case it's running then the call is ignored, and none of the callbacks passed is ever executed.
	   */
	
		}, {
			key: 'start',
			value: function start(render, onRenderStop, onRenderStart) {
				var _this7 = this;
	
				if (this._started) return;
				this._started = true;
				this._stop = false;
				if (onRenderStart !== undefined) {
					onRenderStart();
				}
				var tickDelta = 0.01;
				var milliseconds = 25;
				var totalEnergy = 500;
				var rendering = true;
				//force initial render in case we start out of focus
				setTimeout(function () {
					_this7.tick(tickDelta);
					if (render !== undefined) {
						render();
					}
				}, 0);
				//do physics ticks on a timer
				var tickLoop = function tickLoop() {
					_this7.tick(tickDelta);
					totalEnergy = _this7.totalEnergy();
					if (_this7._stop) rendering = false;
					if (rendering) setTimeout(tickLoop, milliseconds);
				};
				setTimeout(tickLoop, milliseconds);
				//do renders every animation frame
				var animationLoop = function animationLoop() {
					if (rendering) {
						(0, _animation.requestRender)(animationLoop);
						if (render !== undefined && totalEnergy > _this7.minEnergyThreshold) {
							render();
						}
					} else if (onRenderStop !== undefined) {
						onRenderStop();
					}
				};
				(0, _animation.requestRender)(animationLoop);
			}
		}, {
			key: 'stop',
			value: function stop() {
				this._stop = true;
			}
		}, {
			key: 'tick',
			value: function tick(timestep) {
				this.decayMasses();
				this.applyCoulombsLaw();
				this.applyHookesLaw();
				this.attractToCentre();
				this.updateVelocity(timestep);
				this.updatePosition(timestep);
			}
	
			// Find the nearest point to a particular position
	
		}, {
			key: 'nearest',
			value: function nearest(position) {
				var _this8 = this;
	
				var min = {
					node: null,
					point: null,
					distance: null
				};
				this.graph.nodes.forEach(function (node) {
					var point = _this8.point(node);
					var distance = point.p.clone().subtract(position).length();
					if (min.distance === null || distance < min.distance) {
						min = {
							node: node,
							point: point,
							distance: distance
						};
					}
				});
				return min;
			}
	
			// returns [bottomleft, topright]
	
		}, {
			key: 'getBoundingBox',
			value: function getBoundingBox() {
				var bottomleft = new _Vector2.default(-2, -2);
				var topright = new _Vector2.default(2, 2);
				var minimum = -50;
				var maximum = 50;
				this.eachNode(function (n, point) {
					// Bound the node
					point.p.bound(minimum, maximum);
					// Resize the BBox if needed
					bottomleft.set(Math.min(bottomleft.x, point.p.x), Math.min(bottomleft.y, point.p.y));
					topright.set(Math.max(topright.x, point.p.x), Math.max(topright.y, point.p.y));
				});
				var padding = topright.clone().subtract(bottomleft).multiply(0.07); // ~5% padding
				return { bottomleft: bottomleft.subtract(padding), topright: topright.add(padding) };
			}
		}]);
	
		return ForceDirectedLayout;
	})();
	
	exports.default = ForceDirectedLayout;

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _Vector = __webpack_require__(93);
	
	var _Vector2 = _interopRequireDefault(_Vector);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// Point
	
	var Point = (function () {
		function Point(position, mass) {
			_classCallCheck(this, Point);
	
			this.p = position; // position
			this.mass = this.m = mass; // mass
			this.v = new _Vector2.default(0, 0); // velocity
			this.a = new _Vector2.default(0, 0); // acceleration
		}
	
		_createClass(Point, [{
			key: 'applyForce',
			value: function applyForce(force) {
				this.a.x += force.x / this.m;
				this.a.y += force.y / this.m;
			}
		}]);
	
		return Point;
	})();
	
	exports.default = Point;

/***/ },
/* 93 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var VECTOR_EQUALS_TOLERANCE = 0.0000001;
	
	var Vector = (function () {
		function Vector(x, y) {
			_classCallCheck(this, Vector);
	
			this.x = x;
			this.y = y;
		}
	
		_createClass(Vector, [{
			key: "clone",
			value: function clone() {
				return new Vector(this.x, this.y);
			}
		}, {
			key: "bound",
			value: function bound(minimum, maximum) {
				this.x = Math.max(minimum, Math.min(maximum, this.x));
				this.y = Math.max(minimum, Math.min(maximum, this.y));
				return this;
			}
		}, {
			key: "set",
			value: function set(x, y) {
				this.x = x;
				this.y = y;
				return this;
			}
		}, {
			key: "copy",
			value: function copy(otherVector) {
				this.x = otherVector.x;
				this.y = otherVector.y;
				return this;
			}
		}, {
			key: "add",
			value: function add(otherVector) {
				this.x += otherVector.x;
				this.y += otherVector.y;
				return this;
			}
		}, {
			key: "subtract",
			value: function subtract(otherVector) {
				this.x -= otherVector.x;
				this.y -= otherVector.y;
				return this;
			}
		}, {
			key: "multiply",
			value: function multiply(n) {
				this.x *= n;
				this.y *= n;
				return this;
			}
		}, {
			key: "divide",
			value: function divide(n) {
				this.x = this.x / n || 0;
				this.y = this.y / n || 0;
				return this;
			}
		}, {
			key: "dot",
			value: function dot(otherVector) {
				return this.x * otherVector.x + this.y * otherVector.y;
			}
		}, {
			key: "lengthSquared",
			value: function lengthSquared() {
				return this.x * this.x + this.y * this.y;
			}
		}, {
			key: "length",
			value: function length() {
				return Math.sqrt(this.x * this.x + this.y * this.y);
			}
		}, {
			key: "normal",
			value: function normal() {
				var tmp = this.x;
				this.x = -this.y;
				this.y = tmp;
				return this;
			}
		}, {
			key: "normalise",
			value: function normalise() {
				this.divide(this.length());
				return this;
			}
		}, {
			key: "equals",
			value: function equals(otherVector) {
				return Math.abs(this.x - otherVector.x) < VECTOR_EQUALS_TOLERANCE && Math.abs(this.y - otherVector.y) < VECTOR_EQUALS_TOLERANCE;
			}
		}], [{
			key: "random",
			value: function random() {
				return new Vector(5.0 * (Math.random() - 0.5), 5.0 * (Math.random() - 0.5));
			}
		}]);
	
		return Vector;
	})();
	
	exports.default = Vector;

/***/ },
/* 94 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// Spring
	
	var Spring = function Spring(point1, point2, length, k) {
		_classCallCheck(this, Spring);
	
		this.point1 = point1;
		this.point2 = point2;
		this.length = length; // spring length at rest
		this.k = k; // spring constant (See Hooke's law) .. how stiff the spring is
	};
	
	exports.default = Spring;

/***/ },
/* 95 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Renderer handles the layout rendering loop
	 * @param onRenderStop optional callback function that gets executed whenever rendering stops.
	 * @param onRenderStart optional callback function that gets executed whenever rendering starts.
	 */
	
	var Renderer = (function () {
		function Renderer(layout, clear, processNode, drawEdge, drawNode, drawNodeOverlay, drawOverlay, onRenderStop, onRenderStart) {
			_classCallCheck(this, Renderer);
	
			this.layout = layout;
			this.clear = clear;
			this.processNode = processNode;
			this.drawEdge = drawEdge;
			this.drawNode = drawNode;
			this.drawNodeOverlay = drawNodeOverlay;
			this.drawOverlay = drawOverlay;
			this.onRenderStop = onRenderStop;
			this.onRenderStart = onRenderStart;
			this.layout.graph.addGraphListener(this);
		}
	
		_createClass(Renderer, [{
			key: "graphChanged",
			value: function graphChanged(e) {
				this.start();
			}
	
			/**
	   * Starts the simulation of the layout in use.
	   *
	   * Note that in case the algorithm is still or already running then the layout that's in use
	   * might silently ignore the call, and your optional <code>done</code> callback is never executed.
	   * At least the built-in ForceDirected layout behaves in this way.
	   *
	   * @param done An optional callback function that gets executed when the springy algorithm stops,
	   * either because it ended or because stop() was called.
	   */
	
		}, {
			key: "start",
			value: function start(done) {
				var _this = this;
	
				this.layout.start(function () {
					_this.clear();
					//build arrays of functions to process
					var opsBefore = [],
					    opsAfter = [];
					_this.layout.eachNode(function (node, point) {
						_this.processNode(node, point.p);
						opsBefore.push({
							args: [node, point.p],
							func: _this.drawNode,
							zindex: point.p.y
						});
						opsAfter.push({
							args: [node, point.p],
							func: _this.drawNodeOverlay,
							zindex: point.p.y
						});
					});
					_this.layout.eachEdge(function (edge, spring) {
						opsBefore.push({
							args: [edge, spring.point1.p, spring.point2.p],
							func: _this.drawEdge,
							zindex: (spring.point1.p.y + spring.point2.p.y + Math.max(spring.point1.p.y, spring.point2.p.y)) / 3
						});
					});
					//sort by z-index
					opsBefore.sort(function (a, b) {
						return a.zindex - b.zindex;
					});
					opsAfter.sort(function (a, b) {
						return a.zindex - b.zindex;
					});
					//process the rendering functions
					for (var i = 0; i < opsBefore.length; i++) {
						opsBefore[i].func.apply(_this, opsBefore[i].args);
					}for (var i = 0; i < opsAfter.length; i++) {
						opsAfter[i].func.apply(_this, opsAfter[i].args);
					}_this.drawOverlay();
				}, this.onRenderStop, this.onRenderStart);
			}
		}, {
			key: "stop",
			value: function stop() {
				this.layout.stop();
			}
		}]);
	
		return Renderer;
	})();
	
	exports.default = Renderer;

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _Node = __webpack_require__(97);
	
	var _Node2 = _interopRequireDefault(_Node);
	
	var _Edge = __webpack_require__(98);
	
	var _Edge2 = _interopRequireDefault(_Edge);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Graph = (function () {
		function Graph() {
			_classCallCheck(this, Graph);
	
			this.nodeSet = {};
			this.nodes = [];
			this.edges = [];
			this.adjacency = {};
			this.nextNodeId = 0;
			this.nextEdgeId = 0;
			this.eventListeners = [];
		}
	
		_createClass(Graph, [{
			key: 'addNode',
			value: function addNode(node) {
				if (!(node.id in this.nodeSet)) {
					this.nodes.push(node);
				}
				this.nodeSet[node.id] = node;
				this.notify();
				return node;
			}
		}, {
			key: 'addEdge',
			value: function addEdge(edge) {
				var exists = false;
				this.edges.forEach(function (otherEdge) {
					if (edge.id === otherEdge.id) {
						exists = true;
					}
				});
				if (!exists) {
					this.edges.push(edge);
				}
				if (!(edge.source.id in this.adjacency)) {
					this.adjacency[edge.source.id] = {};
				}
				if (!(edge.target.id in this.adjacency[edge.source.id])) {
					this.adjacency[edge.source.id][edge.target.id] = [];
				}
				exists = false;
				this.adjacency[edge.source.id][edge.target.id].forEach(function (otherEdge) {
					if (edge.id === otherEdge.id) {
						exists = true;
					}
				});
				if (!exists) {
					this.adjacency[edge.source.id][edge.target.id].push(edge);
				}
				this.notify();
				return edge;
			}
		}, {
			key: 'newNode',
			value: function newNode(data) {
				var node = new _Node2.default(this.nextNodeId++, data);
				this.addNode(node);
				return node;
			}
		}, {
			key: 'newEdge',
			value: function newEdge(source, target, data) {
				var edge = new _Edge2.default(this.nextEdgeId++, source, target, data);
				this.addEdge(edge);
				return edge;
			}
	
			// find the edges from node1 to node2
	
		}, {
			key: 'getEdges',
			value: function getEdges(node1, node2) {
				if (node1.id in this.adjacency && node2.id in this.adjacency[node1.id]) {
					return this.adjacency[node1.id][node2.id];
				}
				return [];
			}
	
			// remove a node and it's associated edges from the graph
	
		}, {
			key: 'removeNode',
			value: function removeNode(node) {
				if (node.id in this.nodeSet) {
					delete this.nodeSet[node.id];
				}
				for (var i = this.nodes.length - 1; i >= 0; i--) {
					if (this.nodes[i].id === node.id) {
						this.nodes.splice(i, 1);
					}
				}
				this.detachNode(node);
			}
	
			// removes edges associated with a given node
	
		}, {
			key: 'detachNode',
			value: function detachNode(node) {
				this.edges.slice().forEach(function (edge) {
					if (edge.source.id === node.id || edge.target.id === node.id) {
						this.removeEdge(edge);
					}
				}, this);
				this.notify();
			}
	
			// remove a node and it's associated edges from the graph
	
		}, {
			key: 'removeEdge',
			value: function removeEdge(edge) {
				for (var i = this.edges.length - 1; i >= 0; i--) {
					if (this.edges[i].id === edge.id) {
						this.edges.splice(i, 1);
					}
				}
				for (var x in this.adjacency) {
					for (var y in this.adjacency[x]) {
						var edges = this.adjacency[x][y];
						for (var j = edges.length - 1; j >= 0; j--) {
							if (this.adjacency[x][y][j].id === edge.id) {
								this.adjacency[x][y].splice(j, 1);
							}
						}
						// Clean up empty edge arrays
						if (this.adjacency[x][y].length === 0) {
							delete this.adjacency[x][y];
						}
					}
					// Clean up empty objects
					if (isEmpty(this.adjacency[x])) {
						delete this.adjacency[x];
					}
				}
				this.notify();
			}
		}, {
			key: 'addGraphListener',
			value: function addGraphListener(obj) {
				this.eventListeners.push(obj);
			}
		}, {
			key: 'notify',
			value: function notify() {
				this.eventListeners.forEach(function (obj) {
					obj.graphChanged();
				});
			}
		}]);
	
		return Graph;
	})();
	
	function isEmpty(obj) {
		for (var k in obj) {
			if (obj.hasOwnProperty(k)) {
				return false;
			}
		}
		return true;
	}
	
	exports.default = Graph;

/***/ },
/* 97 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Node = function Node(id) {
	    var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    _classCallCheck(this, Node);
	
	    this.id = id;
	    this.data = data;
	
	    // Data fields used by layout algorithm in this file:
	    // this.data.mass
	    // Data used by default renderer in springyui.js
	    // this.data.label
	};
	
	exports.default = Node;

/***/ },
/* 98 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Edge = function Edge(id, source, target) {
		var data = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	
		_classCallCheck(this, Edge);
	
		this.id = id;
		this.source = source;
		this.target = target;
		this.data = data;
	
		var nodes = [this.source.id, this.target.id];
		nodes.sort();
		this.nodes = nodes.join('_');
	
		// Edge data field used by layout alorithm
		// this.data.length
		// this.data.type
	};
	
	exports.default = Edge;

/***/ }
/******/ ]);
//# sourceMappingURL=app-cdc806f9a2b1b4c6ca00.js.map