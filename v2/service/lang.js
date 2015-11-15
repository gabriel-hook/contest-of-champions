import en from '../lang/en.js';
import es from '../lang/es.js';
import ru from '../lang/ru.js';
import m from 'mithril';

const lang = {
    current: 'en',
    messages: {
        en,
        es,
        ru,
    },
    change(lang) {
        if(this.messages[ lang ]) {
            this.current = lang;
            m.redraw();
        }
    },
    get(id, fallback = id) {
        return this.messages[ this.current ][ id ] || fallback;
    },
};

export default lang;
