import en from '../data/lang/en.json';
import es from '../data/lang/es.json';
import it from '../data/lang/it.json';
import br from '../data/lang/br.json';
import ru from '../data/lang/ru.json';
import { CHAMPION_VALUES } from '../data/model/Champion';
import { TYPE_VALUES } from '../data/model/Type';
import { EFFECT_VALUES } from '../data/model/Effect';
import { ABILITY_VALUES } from '../data/model/Ability';
import { flatten } from '../util/array';
import { fromStorage, toStorage } from '../util/storage';
import { requestRedraw } from '../util/animation';

const warned = {};
function warnMissing(language, id) {
    if(id === undefined) {
        return;
    }
    const key = `${ language }::${ id }`;
    if(!warned[ key ]) {
        /* eslint-disable no-console */
        console.warn(`Missing string "${ id }" for language "${ language }".`);
        /* eslint-enable no-console */
        warned[ key ] = true;
    }
}

const lang = {
    messages: {
        en,
        es,
        it,
        br,
        ru,
    },
    change(lang) {
        if(this.messages[ lang ]) {
            this.current = lang;
            toStorage('lang', lang);
            document.title = this.string('champions');
        }
        requestRedraw();
    },
    number(value) {
        const delimiter = this.messages[ this.current ][ 'number-delimiter' ];
        const string = String(Number(value) | 0);
        if(delimiter) {
            if(string.length > 3) {
                const offset = string.length % 3;
                const out = string.split('')
                    .map((character, index) => (index > 0 && index % 3 === offset)? `${delimiter}${character}`: character)
                    .join('');
                return out;
            }
        }
        return string;
    },
    string(id, fallback = id) {
        return this.messages[ this.current ][ id ] || this.defaultString(id, fallback) || fallback;
    },
    defaultString(id, fallback) {
        if(!fallback) {
            return null;
        }
        warnMissing(this.current, id);
        return (this.current === 'en')? null: this.messages[ 'en' ][ id ];
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
            ...CHAMPION_VALUES.map((uid) => [
                `champion-${ uid }-name`,
                `champion-${ uid }-shortname`,
                `champion-${ uid }-description`,
                `champion-signature-${ uid }-name`,
                `champion-signature-${ uid }-description`,
                `champion-special-${ uid }-1-name`,
                `champion-special-${ uid }-2-name`,
                `champion-special-${ uid }-3-name`,
                `champion-special-${ uid }-1-description`,
                `champion-special-${ uid }-2-description`,
                `champion-special-${ uid }-3-description`,
            ]),
            ...TYPE_VALUES.concat('unknown').map((uid) => `type-${ uid }-name`),
            ...EFFECT_VALUES.map((uid) => [ `effect-${ uid }-name`, `effect-${ uid }-shortname`, `effect-${ uid }-description` ]),
            ...ABILITY_VALUES.map((uid) => `ability-${ uid }`),
        ]).forEach((id) => (defaultFields[ id ] = true));
        const values = {};
        Object.keys(current)
            .filter((id) => current[ id ] && (defaults[ id ] || id.endsWith('-shortname')))
            .forEach((id) => (values[ id ] = current[ id ]));
        store[ id ] = language = {
            defaultFields,
            values,
        };
    }
    return language;
}

export default lang;
export { getLanguage };
