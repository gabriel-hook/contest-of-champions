import en from './lang/en.json';
import es from './lang/es.json';
import br from './lang/br.json';
import ru from './lang/ru.json';
import { uids as CHAMPIONS } from '../data/champions';
import { uids as TYPES } from '../data/types';
import { uids as EFFECTS } from '../data/effects';
import { ABILITIES } from '../data/guides';
import { flatten } from '../util/array';
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

const store = {};
function getLanguage(id) {
    let language = store[ id ];
    if(!language) {
        const defaults = lang.messages[ 'en' ];
        const current = lang.messages[ id ] || {};
        const defaultFields = {};
        flatten([
            'lang',
            ...CHAMPIONS.map((uid) => [ `champion-${ uid }-name`, `champion-${ uid }-shortname` ]),
            ...TYPES.concat('unknown').map((uid) => `type-${ uid }-name`),
            ...EFFECTS.map((uid) => [ `effect-${ uid }-name`, `effect-${ uid }-shortname`, `effect-${ uid }-description` ]),
            ...ABILITIES.map((uid) => `ability-${ uid }`),
        ]).forEach((id) => defaultFields[ id ] = true);
        const values = {};
        Object.keys(current)
            .filter((id) => current[ id ] && (defaults[ id ] || id.endsWith('-shortname')))
            .forEach((id) => values[ id ] = current[ id ]);
        store[ id ] = language = {
            defaultFields,
            values,
        };
    }
    return language;
}

export default lang;
export { getLanguage };
