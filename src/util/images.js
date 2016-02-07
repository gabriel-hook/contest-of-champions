import { requestRedraw } from './animation';

const images = {};

function getImage(src) {
    if(src === undefined || src === 'undefined') {
        /* eslint-disable no-console */
        console.error('Invalid image', src);
        /* eslint-enable no-console */
        return null;
    }
    let image = images[ src ];
    if(!image) {
        image = new Image();
        image.loaded = null;
        image.addEventListener('load', () => {
            image.loaded = true;
            requestRedraw(5);
        });
        image.addEventListener('error', () => {
            image[ src ] = null;
        });
        image.src = `${ src }`;
        images[ src ] = image;
    }
    return image.loaded && image;
}

const DATA_IMAGE_EMPTY = 'data:image/gif;base64,R0lGODlhAQABAAAAACw=';

export { getImage, DATA_IMAGE_EMPTY };
