
class TransformableImage {
    constructor(dataUrl) {
        this.dataUrl = dataUrl;
        this.data = null;
    }

    getImageData() {
        if(!this.data) {
            const image = new Image();
            image.src = this.dataUrl;
            const width = image.width;
            const height = image.height;
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = width;
            canvas.height = height;
            context.drawImage(image, 0, 0, width, height);
            this.data = {
                canvas,
                context,
                imageData: context.getImageData(0, 0, canvas.width, canvas.height),
                width,
                height,
            };
        }
        return this.data;
    }

    transform(transformer) {
        const { canvas, context, width, height, imageData } = this.getImageData();
        transformer(imageData.data);
        this.data = {
            canvas,
            context,
            imageData,
            width,
            height,
        };
        return this;
    }

    clone() {
        const clone = new TransformableImage(this.dataUrl);
        if(this.data) {
            const { width, height, imageData } = this.data;
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const context = canvas.getContext('2d');
            context.putImageData(imageData, 0, 0);
            clone.data = {
                canvas,
                context,
                imageData: context.getImageData(0, 0, canvas.width, canvas.height),
                width,
                height,
            };
        }
        return clone;
    }

    toDataUrl() {
        const { canvas, context, imageData } = this.getImageData();
        context.putImageData(imageData, 0, 0);
        return canvas.toDataURL();
    }
}

function sanitizeColor(color) {
    return (color < 0)? 0: (color > 255)? 255: color | 0;
}

export function transformGamma(gamma) {
    const gammaCorrection = 1 / Math.max(0.01, Math.min(7.99, gamma));
    return (data) => {
        for(let i = 0; i < data.length; i += 4) {
            data[ i ] = sanitizeColor(255 * Math.pow(data[ i ] / 255, gammaCorrection));
            data[ i + 1 ] = sanitizeColor(255 * Math.pow(data[ i + 1 ] / 255, gammaCorrection));
            data[ i + 2 ] = sanitizeColor(255 * Math.pow(data[ i + 2 ] / 255, gammaCorrection));
        }
    };
}

export function transformAdd({ red = 0, green = 0, blue = 0 }) {
    return (data) => {
        for(let i = 0; i < data.length; i += 4) {
            data[ i ] = sanitizeColor(data[ i ] + red);
            data[ i + 1 ] = sanitizeColor(data[ i + 1 ] + green);
            data[ i + 2 ] = sanitizeColor(data[ i + 2 ] + blue);
        }
    };
}

export function transformShift(amount) {
    return transformAdd({ red: amount, blue: amount, green: amount });
}

export function transformMultiply({ red = 1, green = 1, blue = 1 }) {
    return (data) => {
        for(let i = 0; i < data.length; i += 4) {
            data[ i ] = sanitizeColor(data[ i ] * red);
            data[ i + 1 ] = sanitizeColor(data[ i + 1 ] * green);
            data[ i + 2 ] = sanitizeColor(data[ i + 2 ] * blue);
        }
    };
}

export function transformScale(amount) {
    return transformMultiply({ red: amount, blue: amount, green: amount });
}

export function transformMinimum({ red = 0, green = 0, blue = 0 }) {
    return (data) => {
        for(let i = 0; i < data.length; i += 4) {
            data[ i ] = sanitizeColor(Math.max(data[ i ], red));
            data[ i + 1 ] = sanitizeColor(Math.max(data[ i + 1 ], green));
            data[ i + 2 ] = sanitizeColor(Math.max(data[ i + 2 ], blue));
        }
    };
}

export function transformMaximum({ red = 255, green = 255, blue = 255 }) {
    return (data) => {
        for(let i = 0; i < data.length; i += 4) {
            data[ i ] = sanitizeColor(Math.min(data[ i ], red));
            data[ i + 1 ] = sanitizeColor(Math.min(data[ i + 1 ], green));
            data[ i + 2 ] = sanitizeColor(Math.min(data[ i + 2 ], blue));
        }
    };
}

export function transformGreyscale(data) {
    for(let i = 0; i < data.length; i += 4) {
        const color = ((data[ i ] + data[ i + 1 ] + data[ i + 2 ]) / 3) | 0;
        data[ i ] = color;
        data[ i + 1 ] = color;
        data[ i + 2 ] = color;
    }
}

export default TransformableImage;
