import isIE from './ie';

function loadFileFromInput(input, callback) {
    const file = input.files && input.files[ 0 ];
    if (file) {
        const reader = new FileReader();
        reader.onload = ({ target }) => callback(target.result);
        reader.readAsText(file);
    }
    input.value = '';
}

function saveFileEventHandler(event, type, filename, data) {
    if(isIE) {
        const exporter = document.getElementById('io-exporter');
        exporter.document.open('text/html', 'replace');
        exporter.document.write(`sep=,\r\n${ data }`);
        exporter.document.close();
        exporter.focus();
        exporter.document.execCommand('SaveAs', true, filename);
    }
    else {
        const { target } = event;
        target.setAttribute('href', `data:${ type };charset=utf-8,${ encodeURIComponent(data) }`);
    }
}

export { loadFileFromInput, saveFileEventHandler };
