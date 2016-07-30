
function fromStorage(key, defaultValue) {
    let value;
    if('localStorage' in window) {
        const string = localStorage.getItem(key);
        if(string) {
            value = JSON.parse(string);
            if(value === 'undefined' || value === 'null') {
                return defaultValue;
            }
        }
    }
    if(value === undefined || value === null) {
        return defaultValue;
    }
    return value;
}

function toStorage(key, value) {
    if('localStorage' in window) {
        if(value === null || value === undefined) {
            localStorage.removeItem(key);
        }
        else {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }
}

export { fromStorage, toStorage };
