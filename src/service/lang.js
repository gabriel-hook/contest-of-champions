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

function checkLanguageEquals(language) {
    for(const key in lang.messages)
        if(language === key)
            return key;
}

function checkLanguageHas(language) {
    for(const key in lang.messages)
        if(language.includes(key))
            return key;
}

let current = fromStorage('lang');
if(!current) {
    if(navigator && navigator.language) {
        current = checkLanguageEquals(navigator.language) || checkLanguageHas(navigator.language);
    }
    if(!current && navigator && navigator.languages && navigator.languages.length) {
        for(const key in navigator.languages) {
            current = checkLanguageEquals(key);
            if(current)
                break;
        }
        if(!current) {
            for (const key in navigator.languages) {
                current = checkLanguageHas(key);
                if (current)
                    break;
            }
        }
    }
    if(!current) {
        current = 'en';
    }
}
lang.change(current);


export default lang;
