
//requestAnimFrame function from Paul Irish
const requestNextFrame = (() => {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame;
})();

const cancelNextFrame = (() => {
    return window.cancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame ||
        window.oCancelAnimationFrame ||
        window.msCancelAnimationFrame;
})();


function requestRender(callback) {
    if(requestNextFrame === undefined || cancelNextFrame === undefined)
        setTimeout(callback, 50);
    else {
        let requestId;
        let timeoutId;
        if(document.hasFocus()) {
            requestId = requestNextFrame(() => {
                clearTimeout(timeoutId);
                callback();
            });
        }
        timeoutId = setTimeout(() => {
            cancelNextFrame(requestId);
            callback();
        }, 50);
    }
}

export { requestRender };
