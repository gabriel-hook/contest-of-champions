import en from './lang/en';
import es from './lang/es';
import br from './lang/br';
import ru from './lang/ru';
import { fromStorage, toStorage } from '../util/storage';
import { requestRedraw } from '../util/animation';

const lang = {
    messages: {
        en,
        es,
        br,
        ru,
    },
    change(lang) {
        if(this.messages[ lang ]) {
            this.current = lang;
            toStorage('lang', lang);
            document.title = this.get('champions');
        }
        requestRedraw();
    },
    get(id, fallback = id) {
        return this.messages[ this.current ][ id ] || this.default(id, fallback) || fallback;
    },
    default(id, fallback) {
        if(this.current === 'en' || !fallback)
            return null;
        return this.messages[ 'en' ][ id ];
    },
};

lang.change(fromStorage('lang', 'en'));

export default lang;
