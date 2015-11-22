import m from 'mithril';

const images = {};

function getImage(src) {
    let image = images[ src ];
    if(!image) {
        image = new Image();
        image.addEventListener('load', () => {
            image.loaded = true;
            m.redraw();
        });
        image.addEventListener('error', () => {
            image[ src ] = null;
        });
        image.src = `../${ src }`;
        images[ src ] = image;
    }
    return image.loaded && image;
}

export { getImage };
