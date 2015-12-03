import en from './lang/en';
import es from './lang/es';
import ru from './lang/ru';
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
