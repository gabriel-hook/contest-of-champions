import m from 'mithril';

export function renderToDocument(object) {
    const container = document.createElement('div');
    document.body.appendChild(container);
    m.render(container, object);
    document.body.removeChild(container);
    return container.children[ 0 ];
}
