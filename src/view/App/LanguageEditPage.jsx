import './LanguageEditPage.scss';
import { uids as CHAMPIONS } from '../../data/champions';
import { uids as TYPES } from '../../data/types';
import { uids as EFFECTS } from '../../data/effects';
import { ABILITIES } from '../../data/guides';
import lang, { getLanguage } from '../../service/lang';
import ImageIcon from '../ImageIcon.jsx';
import { requestRedraw } from '../../util/animation';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const LanguageEditPage = {
    view(ctrl, { langId }) {
        const { defaultFields, values } = getLanguage(langId);
        const elements = [];
        const placeholders = lang.messages[ 'en' ];
        const fieldElement = (id, isOptional = false) => (
            <div class="field">
                <label>{ id }</label>
                <input
                    placeholder={ isOptional? '': placeholders[ id ] }
                    value={ values[ id ] || '' }
                    oninput={(event) => {
                        const value = event.target.value.trim();
                        values[ id ] = value;
                        if(value.length === 0 && values[ id ] !== undefined) {
                            delete values[ id ];
                        }
                        requestRedraw();
                    }}
                />
            </div>
        );
        elements.push(
            <div class="field-group">
                <div class="field-group-title">
                    <ImageIcon src={ `images/lang/${ langId }.png` } icon="flag" />
                    { lang.get('language') }
                </div>
                <div class="field-group-set">
                    { fieldElement('lang') }
                </div>
            </div>
        );
        elements.push(
            <div class="field-group">
                <div class="field-group-title">{ lang.get('champions') }</div>
                { CHAMPIONS
                        .map((uid) => [ `champion-${ uid }-name`, `champion-${ uid }-shortname` ])
                        .map(([ name, shortname ]) => (
                            <div class="field-group-set">
                                { fieldElement(name) }
                                { fieldElement(shortname, true) }
                            </div>
                        )) }
            </div>
        );
        elements.push(
            <div class="field-group">
                <div class="field-group-title">{ lang.get('types') }</div>
                { TYPES.concat('unknown')
                    .map((uid) => `type-${ uid }-name`)
                    .map((id) => (
                        <div class="field-group-set">
                            { fieldElement(id) }
                        </div>
                    )) }
            </div>
        );
        elements.push(
            <div class="field-group">
                <div class="field-group-title">{ lang.get('effects') }</div>
                { EFFECTS
                    .map((uid) => [ `effect-${ uid }-name`, `effect-${ uid }-shortname`, `effect-${ uid }-description` ])
                    .map(([ name, shortname, description ]) => (
                        <div class="field-group-set">
                            { fieldElement(name) }
                            { fieldElement(shortname, true) }
                            { fieldElement(description) }
                        </div>
                    )) }
            </div>
        );
        elements.push(
            <div class="field-group">
                <div class="field-group-title">{ lang.get('abilities') }</div>
                { ABILITIES
                    .map((uid) => `ability-${ uid }`)
                    .map((id) => (
                        <div class="field-group-set">
                            { fieldElement(id) }
                        </div>
                    )) }
            </div>
        );
        elements.push(
            <div class="field-group">
                <div class="field-group-title">{ lang.get('other') }</div>
                { Object.keys(placeholders)
                    .filter((field) => !defaultFields[ field ])
                    .map((field) => (
                        <div class="field-group-set">
                            { fieldElement(field) }
                        </div>
                    )) }
            </div>
        );
        return (
            <div m="LanguageEditPage" class="language-edit" key={ `lang-${ langId }` }>
                { elements }
                <div class="clear" />
            </div>
        );
    },
};

export default LanguageEditPage;
