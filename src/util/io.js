import isIE from './ie';

function loadFileFromInput(file, callback) {
    if (file) {
        const reader = new FileReader();
        reader.onload = ({ target }) => callback(target.result);
        reader.readAsText(file);
    }
}

function saveFileEventHandler(event, type, filename, data) {
    if(isIE) {
        const exporter = document.getElementById('roster-exporter');
        exporter.document.open('text/html', 'replace');
        exporter.document.write(`sep=,\r\n${ data }`);
        exporter.document.close();
        exporter.focus();
        exporter.document.execCommand('SaveAs', true, filename);
    }
    else {
        const { target } = event;
        console.log(filename, data)
        target.setAttribute('href', `data:${ type };charset=utf-8,${ encodeURIComponent(data) }`);
    }
}

export { loadFileFromInput, saveFileEventHandler };
