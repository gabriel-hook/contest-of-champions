function fromStorage(id, initial) {
    let object;
    if(localStorage) {
        const string = localStorage.getItem(id);
        object = JSON.parse(string);
        if(object === 'undefined' || object === 'null') {
            return initial;
        }
    }
    return object || initial;
}

function toStorage(id, object) {
    if(localStorage) {
        localStorage.setItem(id, JSON.stringify(object));
    }
}

export { fromStorage, toStorage };
