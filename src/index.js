import Roster from './view/Roster.jsx';
import m from 'mithril';

let lastScroll = document.body.scrollTop;

var requestNextFrame = (function(){
  	return requestAnimationFrame || 
	  	webkitRequestAnimationFrame || 
	  	mozRequestAnimationFrame || 
	  	oRequestAnimationFrame || 
	  	msRequestAnimationFrame ||
	  	setTimeout;
})();

const App = {
	controller(){
		requestNextFrame(() => {
			document.body.scrollTop = lastScroll;
		});
        return {
            onunload: function() {
                lastScroll = document.body.scrollTop;
            },
        	id: m.route.param('id'),
        };
	},
	view(ctrl){
		const selected = ctrl.id;
		return (
			<Roster selected={ selected } />
		);
	}
};

m.route.mode = 'hash';
m.route(document.body, '/roster', {
    '/roster/:id': <App />,
    '/roster': <App />,
});

document.addEventListener('hotreload', function(){
  console.log('got hot reload event!');
  m.redraw();
});
