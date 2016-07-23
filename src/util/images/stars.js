import TransformableImage, { transformMinimum, transformAdd, transformMultiply, transformGamma } from './TransformableImage';

const imageStar = new TransformableImage(require('../../images/base/star.png'));

const IMAGE_STAR = imageStar.clone()
    .transform(transformMinimum({ red: 255, green: 127, blue: 31 }))
    .transform(transformGamma(0.35))
    .transform(transformMultiply({ red: 2, green: 1.35, blue: 0.1 }))
    .toDataUrl();

const IMAGE_STAR_AWAKENED = imageStar.clone()
    .transform(transformAdd({ red: 32, green: 32, blue: 48 }))
    .transform(transformMultiply({ red: 0.95, green: 0.95, blue: 1 }))
    .toDataUrl();

export { IMAGE_STAR, IMAGE_STAR_AWAKENED };
