class Model {
    constructor(attr) {
        this.attr = {
            ...attr,
        };
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
