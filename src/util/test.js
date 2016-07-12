import m from 'mithril';

export function renderToDocument(object) {
    const container = document.createElement('div');
    try {
        document.body.appendChild(container);
        m.render(container, object);
        return container.children[ 0 ];
    }
    finally {
        m.render(container, null);
        document.body.removeChild(container);
    }
}
