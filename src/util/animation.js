import m from 'mithril';

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
let renderDeferredArray = [];
let renderDeferredMap = {};

function requestRender({ id, callback, delay = 0 }) {
    if(id) {
        renderDeferredMap[ id ] = {
            callback,
            delay,
        };
    }
    else {
        renderDeferredArray.push({
            callback,
            delay,
        });
    }
}

function requestRedraw(delay = 2) {
    const deferred = renderDeferredMap[ 'mithril' ];
    requestRender({
        id: 'mithril',
        callback: m.redraw,
        delay: (deferred)? Math.min(deferred.delay, delay): delay,
    });
    m.redraw.strategy('none');
}

function doFrame() {
    if(requestId && cancelNextFrame)
        cancelNextFrame(requestId);
    if(timeoutId)
        clearTimeout(timeoutId);

    const deferredArray = renderDeferredArray;
    const deferredMap = renderDeferredMap;
    renderDeferredArray = [];
    renderDeferredMap = {};

    for(const deferred of deferredArray)
        try {
            if(deferred.delay && deferred.delay > 1) {
                renderDeferredArray.push({
                    ...deferred,
                    delay: deferred.delay - 1,
                });
            }
            else if(deferred.callback)
                deferred.callback();
        }
        catch(error) {
            /* eslint-disable no-console */
            console.error(error);
            /* eslint-enable no-console */
        }
    for(const id in deferredMap)
        try {
            const deferred = deferredMap[ id ];
            if(deferred.delay && deferred.delay > 1) {
                renderDeferredMap[ id ] = {
                    ...deferred,
                    delay: deferred.delay - 1,
                };
            }
            else if(deferred.callback)
                deferred.callback();
        }
        catch(error) {
            /* eslint-disable no-console */
            console.error(error);
            /* eslint-enable no-console */
        }

    requestId = requestNextFrame(doFrame);
    timeoutId = setTimeout(doFrame, 50);
}
doFrame();

export { requestRender, requestRedraw };
