import ImageTransformer, { add, multiply, gamma } from './ImageTransformer';

const imageStar = new ImageTransformer(require('../../images/base/star.png'));

const IMAGE_STAR = imageStar.clone()
    .transform(gamma(0.5))
    .transform(multiply({ red: 2, green: 1.3, blue: 0.5 }))
    .toDataUrl();

const IMAGE_STAR_AWAKENED = imageStar.clone()
    .transform(add('#113'))
    .transform(gamma(0.5))
    .transform(multiply({ red: 0.90, green: 0.90, blue: 0.95 }))
    .toDataUrl();

export { IMAGE_STAR, IMAGE_STAR_AWAKENED };
