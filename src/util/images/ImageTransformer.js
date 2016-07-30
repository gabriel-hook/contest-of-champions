
class ImageTransformer {
    constructor(dataUrl) {
        this.dataUrl = dataUrl;
        this.data = null;
    }

    getImageData() {
        if(!this.data) {
            const image = new Image();
            image.src = this.dataUrl;
            const width = image.width || 1;
            const height = image.height || 1;
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = width;
            canvas.height = height;
            context.drawImage(image, 0, 0, width, height);
            this.data = {
                canvas,
                context,
                imageData: context.getImageData(0, 0, width, height),
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
        const clone = new ImageTransformer(this.dataUrl);
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
                imageData: context.getImageData(0, 0, width, height),
                width,
                height,
            };
        }
        return clone;
    }

    toDataUrl() {
        const { canvas, context, imageData } = this.getImageData();
        context.putImageData(imageData, 0, 0);
        return canvas.toDataURL('image/png', 1.0);
    }
}

function sanitizeColor(color) {
    return (color < 0)? 0: (color > 255)? 255: color | 0;
}

function rbgShorthandValue(character) {
    const value = parseInt(character, 16);
    return (value << 4) + value;
}

function rgbParam(param) {
    if(typeof param === 'number') {
        return { red: param, green: param, blue: param };
    }
    if(typeof param === 'string') {
        if(/#[0-9a-fA-F]{3}/.test(param)) {
            return {
                red: rbgShorthandValue(param[ 1 ]),
                green: rbgShorthandValue(param[ 2 ]),
                blue: rbgShorthandValue(param[ 3 ]),
            };
        }
        if(/#[0-9a-fA-F]{6}/.test(param)) {
            return {
                red: parseInt(param.slice(1, 3), 16),
                green: parseInt(param.slice(3, 5), 16),
                blue: parseInt(param.slice(5, 7), 16),
            };
        }
        const value = parseInt(param, 10);
        return { red: value, green: value, blue: value };
    }
    return param;
}

export function gamma(gamma) {
    const gammaCorrection = 1 / Math.max(0.01, Math.min(7.99, gamma));
    return (data) => {
        for(let i = 0; i < data.length; i += 4) {
            data[ i ] = sanitizeColor(255 * Math.pow(data[ i ] / 255, gammaCorrection));
            data[ i + 1 ] = sanitizeColor(255 * Math.pow(data[ i + 1 ] / 255, gammaCorrection));
            data[ i + 2 ] = sanitizeColor(255 * Math.pow(data[ i + 2 ] / 255, gammaCorrection));
        }
    };
}

export function add(param) {
    const { red = 0, green = 0, blue = 0 } = rgbParam(param);
    return (data) => {
        for(let i = 0; i < data.length; i += 4) {
            data[ i ] = sanitizeColor(data[ i ] + red);
            data[ i + 1 ] = sanitizeColor(data[ i + 1 ] + green);
            data[ i + 2 ] = sanitizeColor(data[ i + 2 ] + blue);
        }
    };
}

export function multiply(param) {
    const { red = 1, green = 1, blue = 1 } = rgbParam(param);
    return (data) => {
        for(let i = 0; i < data.length; i += 4) {
            data[ i ] = sanitizeColor(data[ i ] * red);
            data[ i + 1 ] = sanitizeColor(data[ i + 1 ] * green);
            data[ i + 2 ] = sanitizeColor(data[ i + 2 ] * blue);
        }
    };
}

export function colorize(param) {
    const { red = 255, green = 255, blue = 255 } = rgbParam(param);
    return (data) => {
        for(let i = 0; i < data.length; i += 4) {
            data[ i ] = sanitizeColor(data[ i ] * red / 255);
            data[ i + 1 ] = sanitizeColor(data[ i + 1 ] * green / 255);
            data[ i + 2 ] = sanitizeColor(data[ i + 2 ] * blue / 255);
        }
    };
}

export function minimum(param) {
    const { red = 0, green = 0, blue = 0 } = rgbParam(param);
    return (data) => {
        for(let i = 0; i < data.length; i += 4) {
            data[ i ] = sanitizeColor(Math.max(data[ i ], red));
            data[ i + 1 ] = sanitizeColor(Math.max(data[ i + 1 ], green));
            data[ i + 2 ] = sanitizeColor(Math.max(data[ i + 2 ], blue));
        }
    };
}

export function maximum(param) {
    const { red = 255, green = 255, blue = 255 } = rgbParam(param);
    return (data) => {
        for(let i = 0; i < data.length; i += 4) {
            data[ i ] = sanitizeColor(Math.min(data[ i ], red));
            data[ i + 1 ] = sanitizeColor(Math.min(data[ i + 1 ], green));
            data[ i + 2 ] = sanitizeColor(Math.min(data[ i + 2 ], blue));
        }
    };
}

export function greyscale(data) {
    for(let i = 0; i < data.length; i += 4) {
        const rgb = data.slice(i, i + 2);
        const lightness = (Math.max(...rgb) + Math.min(...rgb)) * 0.5 | 0;
        data[ i ] = lightness;
        data[ i + 1 ] = lightness;
        data[ i + 2 ] = lightness;
    }
}

export default ImageTransformer;
