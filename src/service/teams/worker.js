import 'babel-polyfill';
import build from './build';

const PROGRESS_DEBOUNCE_TIME = 300;
let lastProgressNow;

/* eslint-disable no-undef */
onmessage = function(event) {
/* eslint-disable no-undef */

    switch(event.data.type) {
        case 'build': {
            const result = build({
                ...event.data.data,
                progress(current, max) {
                    const now = Date.now();
                    if(current > 0 && current < max && lastProgressNow && now - lastProgressNow < PROGRESS_DEBOUNCE_TIME)
                        return;
                    postMessage({
                        type: 'progress',
                        data: {
                            current,
                            max,
                        },
                    });
                    lastProgressNow = now;
                },
            });
            postMessage({
                type: 'progress',
                data: {
                    current: 1,
                    max: 1,
                },
            });
            postMessage({
                type: 'result',
                data: result,
            });
            break;
        }
    }
};

export default {};
