function fromStorage(id, initial) {
    let array;
    if(localStorage) {
        const string = localStorage.getItem(id);
        array = JSON.parse(string);
    }
    return array || initial;
}

function toStorage(id, object) {
    if(localStorage) {
        localStorage.setItem(id, JSON.stringify(object));
    }
}

export { fromStorage, toStorage };
