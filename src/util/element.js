
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

export { clickElementById }