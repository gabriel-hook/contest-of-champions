import { requestRedraw } from './animation';

const images = {};

function getImage(src) {
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
