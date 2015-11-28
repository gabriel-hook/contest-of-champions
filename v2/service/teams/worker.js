import 'babel-polyfill';
import build from './build';

const PROGRESS_DEBOUNCE_TIME = 50;
let lastProgressNow;

/* eslint-disable no-undef */
onmessage = function(event) {
/* eslint-disable no-undef */

    switch(event.data.type) {
    case 'build':
        const result = build({
            ...event.data.data,
            progress(current, max) {
                const now = Date.now();
                if(lastProgressNow && now - lastProgressNow < PROGRESS_DEBOUNCE_TIME)
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
            type: 'result',
            data: result,
        });
        break;
    }
};
