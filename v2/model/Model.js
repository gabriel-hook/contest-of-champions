class Model {
    constructor(defaults = {}, definition) {
        this.attr = { ...defaults, ...definition };
    }

    set(key, value) {
        this.attr[ key ] = value;
    }

    get(key) {
        return this.attr[ key ];
    }

    toJSON() {
        return this.attr;
    }
}

export default Model;
