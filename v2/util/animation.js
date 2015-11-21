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

let requestId;
let timeoutId;
let renderCallbackArray = [];
let renderCallbackMap = {};

function requestRender(id, callback) {
    if(id) {
        renderCallbackMap[ id ] = callback;
    }
    else {
        renderCallbackArray.push(callback);
    }
}

function doFrame() {
    if(requestId && cancelNextFrame)
        cancelNextFrame(requestId);
    if(timeoutId)
        clearTimeout(timeoutId);

    const callbackArray = renderCallbackArray;
    const callbackMap = renderCallbackMap;
    renderCallbackArray = [];
    renderCallbackMap = {};

    for(const callback of callbackArray)
        try {
            if(callback)
                callback();
        }
        catch(error) {
            /* eslint-disable no-console */
            console.error(error);
            /* eslint-enable no-console */
        }
    for(const id in callbackMap)
        try {
            const callback = callbackMap[ id ];
            if(callback)
                callback();
        }
        catch(error) {
            /* eslint-disable no-console */
            console.error(error);
            /* eslint-enable no-console */
        }

    requestId = requestNextFrame(doFrame);
    timeoutId = setTimeout(doFrame, 100);
}
doFrame();

export { requestRender };
