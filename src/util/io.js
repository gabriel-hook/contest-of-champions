function loadFileFromInput(input, callback) {
    const file = input.files && input.files[ 0 ];
    if (file) {
        const reader = new FileReader();
        reader.onload = ({ target }) => callback(target.result, file.name);
        reader.readAsText(file);
    }
    input.value = '';
}

function saveFileEventHandler(target, type, filename, data) {
    const blob = new Blob([ data ], { type });
    if(window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, filename);
    }
    else {
        target.setAttribute('href', `data:${ type };charset=utf-8,${ encodeURIComponent(data) }`);
    }
}

export { loadFileFromInput, saveFileEventHandler };
