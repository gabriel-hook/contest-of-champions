
//requestAnimFrame function from Paul Irish
var requestNextFrame = (function(){
  	return window.requestAnimationFrame || 
	  	window.webkitRequestAnimationFrame || 
	  	window.mozRequestAnimationFrame || 
	  	window.oRequestAnimationFrame || 
	  	window.msRequestAnimationFrame;
})();

var cancelNextFrame = (function(){
	return window.cancelAnimationFrame || 
		window.webkitCancelAnimationFrame || 
		window.mozCancelAnimationFrame || 
		window.oCancelAnimationFrame || 
		window.msCancelAnimationFrame;
})();

function requestRender(callback){
	if(requestNextFrame === undefined || cancelNextFrame === undefined)
		setTimeout(callback, 50);
	else{
		let requestId;
		let timeoutId;
		if(document.hasFocus()){
			requestId = requestNextFrame(() => {
				clearTimeout(timeoutId);
				callback.call(null);
			});
		}
		timeoutId = setTimeout(() => {
			cancelNextFrame(requestId);
			callback.call(null);
		}, 50);
	}
}

export { requestRender };
