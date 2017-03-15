import './LanguageEditPage.scss';
import { isInDocumentBody } from '../../util/element';
import classNames from 'classnames';
import { CHAMPION_VALUES } from '../../data/model/Champion';
import { TYPE_VALUES } from '../../data/model/Type';
import { EFFECT_VALUES } from '../../data/model/Effect';
import { ABILITY_VALUES } from '../../data/model/Ability';
import lang, { getLanguage } from '../../service/lang';
import Icon from '../Icon.jsx';
import ImageIcon from '../ImageIcon.jsx';
import { requestRedraw } from '../../util/animation';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

/**
 * This sets up the missing fields previous/next buttons depending on window scroll position.
 *
 * @param element - the page element.
 */
function onScroll(element) {
    if(!isInDocumentBody(element)) {
        return;
    }

    let current = 0;
    let previous = null;
    let next = null;
    Array.prototype.forEach.call(element.querySelectorAll('.field-missing') || [], (element, index) => {
        const { top } = element.getBoundingClientRect();
        if(top <= 0) {
            current = index + 1;
        }
        if(top < 0 && (!previous || top > previous.top)) {
            previous = {
                top,
                element,
            };
        }
        else if(top > 0 && (!next || top < next.top)) {
            next = {
                top,
                element,
            };
        }
    });

    const currentMissing = element.querySelector('.field-missing-current');
    if(currentMissing) {
        currentMissing.innerHTML = `${ current } /`;
    }

    const previousControl = element.querySelector('.field-missing-controls-previous');
    if(previousControl) {
        previousControl.onclick = function() {
            if(previous) {
                previous.element.scrollIntoView(true);
            }
        };
        previousControl.className = classNames(
            'field-missing-controls-previous',
            { 'field-missing-controls-active': previous }
        );
    }

    const nextControl = element.querySelector('.field-missing-controls-next');
    if(nextControl) {
        nextControl.onclick = function() {
            if(next) {
                next.element.scrollIntoView(true);
            }
        };
        nextControl.className = classNames(
            'field-missing-controls-next',
            { 'field-missing-controls-active': next }
        );
    }
}

const LanguageEditPage = {
    controller() {
        this.editing = {
            id: null,
            value: '',
        };
    },
    view({ editing }, { langId }) {
        const { defaultFields, values } = getLanguage(langId);
        const elements = [];
        const placeholders = lang.messages[ 'en' ];
        let missing = 0;
        const valueOf = (id) => (editing.id === id)? editing.value: values[ id ];
        const fieldElement = (id, isOptional = false) => (
            <div class={ classNames('field', { 'field-missing': !isOptional && !valueOf(id) && ++missing }) }>
                <label>{ id }</label>
                <input
                    type="text"
                    placeholder={ isOptional? '': placeholders[ id ] }
                    value={ valueOf(id) || '' }
                    onfocus={() => {
                        editing.id = id;
                        editing.value = values[ id ] || '';
                    }}
                    oninput={(event) => {
                        editing.id = id;
                        editing.value = event.target.value || '';
                        requestRedraw();
                    }}
                    onblur={(event) => {
                        const value = event.target.value.trim();
                        values[ id ] = value;
                        if(value.length === 0 && values[ id ] !== undefined) {
                            delete values[ id ];
                        }
                        editing.id = null;
                        editing.value = '';
                    }}
                />
            </div>
        );
        elements.push(
            <div class="field-group">
                <div class="field-group-title">
                    <ImageIcon src={ `images/lang/${ langId }.png` } icon="flag" />
                    { lang.string('language') }
                </div>
                <div class="field-group-set">
                    { fieldElement('lang') }
                </div>
            </div>
        );
        elements.push(
            <div class="field-group">
                <div class="field-group-title">{ lang.string('champions') }</div>
                { CHAMPION_VALUES
                        .map((uid) => [
                            `champion-${ uid }-name`,
                            `champion-${ uid }-shortname`,
                            `champion-${ uid }-description`,
                            `champion-special-${ uid }-1-name`,
                            `champion-special-${ uid }-1-description`,
                            `champion-special-${ uid }-2-name`,
                            `champion-special-${ uid }-2-description`,
                            `champion-special-${ uid }-3-name`,
                            `champion-special-${ uid }-3-description`,
                            `champion-signature-${ uid }-name`,
                            `champion-signature-${ uid }-description`,
                        ])
                        .map(([ name, shortname, ...keys ]) => (
                            <div class="field-group-set">
                                { fieldElement(name) }
                                { fieldElement(shortname, true) }
                                { keys.map((key) => fieldElement(key)) }
                            </div>
                        )) }
            </div>
        );
        elements.push(
            <div class="field-group">
                <div class="field-group-title">{ lang.string('types') }</div>
                { TYPE_VALUES.concat('unknown')
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
                <div class="field-group-title">{ lang.string('effects') }</div>
                { EFFECT_VALUES
                    .map((uid) => [ `effect-${ uid }-type`, `effect-${ uid }-name`, `effect-${ uid }-description` ])
                    .map(([ type, name, description ]) => (
                        <div class="field-group-set">
                            { fieldElement(type) }
                            { fieldElement(name, true) }
                            { fieldElement(description) }
                        </div>
                    )) }
            </div>
        );
        elements.push(
            <div class="field-group">
                <div class="field-group-title">{ lang.string('abilities') }</div>
                { ABILITY_VALUES
                    .map((uid) => [ `ability-${ uid }-name`, `ability-${ uid }-description` ])
                    .map(([ name, description ]) => (
                        <div class="field-group-set">
                            { fieldElement(name) }
                            { fieldElement(description) }
                        </div>
                    )) }
            </div>
        );
        elements.push(
            <div class="field-group">
                <div class="field-group-title">{ lang.string('other') }</div>
                { Object.keys(placeholders)
                    .filter((field) => !defaultFields[ field ])
                    .map((field) => (
                        <div class="field-group-set">
                            { fieldElement(field) }
                        </div>
                    )) }
            </div>
        );
        if(missing) {
            elements.push(
                <div class="field-missing-controls-container">
                    <div class="field-missing-controls">
                        <div class="field-missing-controls-previous">
                            <Icon icon="chevron-up" />
                        </div>
                        <div class="field-missing-controls-count">
                            <span class="field-missing-current"></span>
                            { missing }
                        </div>
                        <div class="field-missing-controls-next">
                            <Icon icon="chevron-down" />
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div
                m="LanguageEditPage"
                class="language-edit"
                config={ (element, isInitialized) => {
                    if(isInitialized) {
                        element.handleScroll();
                        return;
                    }
                    element.handleScroll = onScroll.bind(null, element);
                    element.handleScroll();
                    element.parentNode.addEventListener('scroll', element.handleScroll, true);
                }}
                key={ `lang-${ langId }` }
            >
                { elements }
                <div class="clear" />
            </div>
        );
    },
};

export default LanguageEditPage;
