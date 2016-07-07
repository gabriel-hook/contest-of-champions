function isInDocumentBody(element) {
    /* eslint-disable no-else-return */
    if(element === undefined || element === null || element === document.body) {
        return false;
    }
    else if(document.body.contains) {
        return document.body.contains(element);
    }
    else {
        let node = element;
        while(node.parentNode) {
            if(node === document.body) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    }
    /* eslint-enable no-else-return */
}

function clickElementById(id) {
    const element = document.getElementById(id);
    if(document.createEventObject) {
        element.target.fireEvent('onclick');
    }
    else if(MouseEvent) {
        const event = new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': true,
        });
        element.dispatchEvent(event);
    }
    else {
        const event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, true, window);
        element.dispatchEvent(event);
    }
}

export { clickElementById, isInDocumentBody };
