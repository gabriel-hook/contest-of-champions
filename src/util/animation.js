import m from 'mithril';

const requestNextFrame = (() => {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function() { };
})();

const cancelNextFrame = (() => {
    return window.cancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame ||
        window.oCancelAnimationFrame ||
        window.msCancelAnimationFrame ||
        function() { };
})();

let requestId;
let timeoutId;

function queueRenderDeferred() {
    if(!requestId && !timeoutId) {
        requestId = requestNextFrame(renderDeferred);
        timeoutId = setTimeout(renderDeferred, 50);
    }
}

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
    queueRenderDeferred();
}

function requestRedraw(delay = 2) {
    const deferred = renderDeferredMap[ 'mithril' ];
    m.redraw.strategy('none');
    requestRender({
        id: 'mithril',
        callback: () => {
            m.redraw.strategy('diff');
            m.redraw();
        },
        delay: (deferred)? Math.min(deferred.delay, delay): delay,
    });
}

function renderDeferred() {
    if (requestId) {
        cancelNextFrame(requestId);
    }
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
    timeoutId = requestId = 0;

    let hasDeferred = false;
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
                hasDeferred = true;
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
                hasDeferred = true;
            }
            else if(deferred.callback)
                deferred.callback();
        }
        catch(error) {
            /* eslint-disable no-console */
            console.error(error);
            /* eslint-enable no-console */
        }
    if(hasDeferred) {
        queueRenderDeferred();
    }
}

export { requestRender, requestRedraw };
