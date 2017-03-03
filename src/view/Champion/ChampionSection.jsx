import './ChampionSection.scss';
import { RATINGS, GRADES, RANGES, DAMAGE_TYPES } from '../../data/guides';
import { ABILITY_VALUES } from '../../data/model/Ability';
import { abilityIcon } from '../../data/abilities';
import lang from '../../service/lang';
import ChampionGrade from './ChampionGrade.jsx';
import ChampionRating from './ChampionRating.jsx';
import Icon from '../Icon.jsx';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const ChampionSection = {
    view(ctrl, {
            title, icon, name, help, description, note, heavy,
            ranges, damagetypes, abilities,
            rating, grade, gradeAwakened,
            youtube,
            raw, onEdit, noEdit = [],
        }) {
        const elements = [];
        if(onEdit) {
            const editableText = (key) => noEdit.includes(key)
                ? ({})
                : ({
                    'contenteditable': true,
                    'class': 'champion-section-textarea',
                    'oninput': (event) => onEdit(key, event.target.innerText.trim()),
                    'onpaste': (event) => {
                        event.preventDefault();
                        const text = (event.originalEvent || event).clipboardData.getData('text/plain');
                        document.execCommand('insertHTML', false, text);
                    },
                });
            const editableValue = (value) => value === true? '': value;
            const editableSelect = (list, key, initialValue) => (
                <select
                    class="champion-section-select"
                    onchange={ (event) => onEdit(key, event.target.selectedOptions[ 0 ].value) }
                >
                    <option value="" />
                    {
                        list.map((value) => (
                            <option
                                value={ `${ value }` }
                                selected={ initialValue && value === initialValue }
                            >{
                                value
                            }</option>
                        ))
                    }
                </select>
            );
            const editableSelectAdd = (list, key, array, stringify, image) => [
                (
                <select
                    key={ Date.now() }
                    class="champion-section-select champion-section-select-item"
                    onchange={ (event) => onEdit(key, [
                        ...array,
                        event.target.selectedOptions[ 0 ].value,
                    ]) }
                >
                    <option value="">+</option>
                    {
                        list.map((value) => (
                            <option
                                value={ value }
                            >{
                                lang.string(stringify(value))
                            }</option>
                        ))
                    }
                </select>
                ),
                array.length? (
                <div class="champion-section-items">
                    {
                        array.map((value, index) => (
                        <span
                            class="champion-section-item"
                            onclick={ () => onEdit(key, array.filter((v, i) => i !== index)) }
                        >
                            { image && image(value) }{ lang.string(stringify(value)) }
                        </span>
                        ))
                    }
                </div>
                ): null,
            ];
            elements.push(
                <div
                    role="section"
                    aria-label={ title }
                    class="champion-section-title"
                >
                    { icon && (
                        <Icon icon={icon} before />
                    ) || null }
                    { title }
                    { rating !== undefined? (
                        <div style="float:right;">
                            { editableSelect(RATINGS, 'rating', parseInt(rating, 10)) }
                            / 5
                        </div>
                    ): null}
                </div>
            );
            if (grade) {
                elements.push(
                    <div class="champion-section-text">
                        <b>{ lang.string('grade') }:</b>
                        { editableSelect(GRADES, 'grades.normal', grade) }
                    </div>
                );
            }
            if (gradeAwakened) {
                elements.push(
                    <div class="champion-section-text">
                        <b>{ lang.string('awakened') }:</b>
                        { editableSelect(GRADES, 'grades.awakened', gradeAwakened) }
                    </div>
                );
            }
            if (name) {
                elements.push(
                    <div class="champion-section-text">
                        <b {...editableText('name')}>{ editableValue(name) }</b>
                    </div>
                );
            }
            if (help) {
                elements.push(
                    <div class="champion-section-text champion-section-text-description">{
                        help.replace(/(\s*\n\s*)+/g, '\n\n').trim()
                    }</div>
                );
            }
            if (description) {
                elements.push(
                    <div class="champion-section-text champion-section-text-description">
                        <div {...editableText('description')}>{ editableValue(description) }</div>
                    </div>
                );
            }
            if (heavy) {
                elements.push(
                    <div class="champion-section-text">
                        <b>{ lang.string('heavy-attack') }:</b>
                        <span {...editableText('heavy')}>{ editableValue(heavy) }</span>
                    </div>
                );
            }
            if (ranges) {
                elements.push(
                    <div class="champion-section-text">
                        <b>{ lang.string('range') }:</b>
                        { editableSelectAdd(
                            RANGES,
                            'ranges',
                            ranges === true? []: ranges,
                            (range) => `range-${ range }`
                        ) }
                    </div>
                );
            }
            if (damagetypes) {
                elements.push(
                    <div class="champion-section-text">
                        <b>{ lang.string('damage-type') }:</b>
                        { editableSelectAdd(
                            DAMAGE_TYPES,
                            'damagetypes',
                            damagetypes === true? []: damagetypes,
                            (damage) => `damage-${ damage }`
                        ) }
                    </div>
                );
            }
            if (abilities) {
                elements.push(
                    <div class="champion-section-text">
                        <b>{ lang.string('abilities') }:</b>
                        { editableSelectAdd(
                            ABILITY_VALUES,
                            'abilities',
                            abilities === true? []: abilities,
                            (ability) => `ability-${ ability }-name`,
                            (ability) => abilityIcon(ability) && (
                                <Icon icon={ abilityIcon(ability) } before />
                            ) || null
                        ) }
                    </div>
                );
            }
            if (youtube) {
                elements.push(
                    <div class="champion-section-text">
                        <b>{ lang.string('youtube-video') }:</b>
                        <span {...editableText('youtube')}>{ editableValue(youtube) }</span>
                    </div>
                );
            }
            if (note) {
                elements.push(
                    <div class="champion-section-text">
                        <b>{ lang.string('note') }:</b>
                        <span {...editableText('note')}>{ editableValue(note) }</span>
                    </div>
                );
            }
        }
        else {
            elements.push(
                <div
                    role="heading"
                    class="champion-section-title"
                >
                    { icon && (
                        <Icon icon={icon} before />
                    ) || null }
                    { title }
                    { rating !== undefined && (
                        <ChampionRating rating={ rating }/>
                    ) || null}
                </div>
            );
            if (grade) {
                elements.push(
                    <ChampionGrade title="grade" grade={ grade }/>
                );
            }
            if (gradeAwakened) {
                elements.push(
                    <ChampionGrade title="awakened" grade={ gradeAwakened }/>
                );
            }
            if (name) {
                elements.push(
                    <div class="champion-section-text">
                        <b>{ name.replace('\n', '').trim() }</b>
                    </div>
                );
            }
            if (help) {
                elements.push(
                    <div class="champion-section-text champion-section-text-description">{
                        help.replace(/(\s*\n\s*)+/g, '\n\n').trim()
                    }</div>
                );
            }
            if (description) {
                elements.push(
                    <div class="champion-section-text champion-section-text-description">{
                        description.replace(/(\s*\n\s*)+/g, '\n\n').trim()
                    }</div>
                );
            }
            if (heavy) {
                elements.push(
                    <div class="champion-section-text">
                        <b>{ lang.string('heavy-attack') }:</b>
                        <span>{ heavy.replace('\n', '').trim() }</span>
                    </div>
                );
            }
            if (ranges && ranges.length) {
                elements.push(
                    <div class="champion-section-text">
                        <b>{ lang.string('range') }:</b>
                        { ranges.map((range, index) => (
                            <span class={ `champion-section-range champion-section-range-${ range }` }>{
                                (index < ranges.length - 1)
                                    ? `${ lang.string(`range-${ range }`) }, `
                                    : lang.string(`range-${ range }`)
                            }</span>
                        )) }
                    </div>
                );
            }
            if (damagetypes && damagetypes.length) {
                elements.push(
                    <div class="champion-section-text">
                        <b>{ lang.string('damage-type') }:</b>
                        { damagetypes.map((damage, index) => (
                            <span class={ `champion-section-damage champion-section-damage-${ damage }` }>{
                                (index < damagetypes.length - 1)
                                    ? `${ lang.string(`damage-${ damage }`) }, `
                                    : lang.string(`damage-${ damage }`)
                            }</span>
                        )) }
                    </div>
                );
            }
            if (abilities && abilities.length) {
                elements.push(
                    <div class="champion-section-text">
                        <b>{ lang.string('abilities') }:</b>
                        { abilities.map((ability, index) => (
                            <span
                                class={ `champion-section-ability champion-section-ability-${ ability }` }
                                title={ lang.string(`ability-${ ability }-description`) }
                            >
                                { abilityIcon(ability) && (
                                    <Icon icon={ abilityIcon(ability) } before after={ index !== 0 } />
                                ) || null }{ (index < abilities.length - 1)
                                    ? `${ lang.string(`ability-${ ability }-name`) }, `
                                    : lang.string(`ability-${ ability }-name`)
                                }
                            </span>
                        )) }
                    </div>
                );
            }
            if (youtube) {
                elements.push(
                    <div class="champion-section-youtube">
                        <iframe
                            type="text/html"
                            width="640"
                            height="390"
                            src={ `//www.youtube.com/embed/${ youtube.replace('\n', '').trim() }?modestbranding=1` }
                            frameborder="0"
                        />
                    </div>
                );
            }
            if (note) {
                elements.push(
                    <div class="champion-section-text">
                        <b>{ lang.string('note') }:</b>
                        <span>{
                            note.replace(/(\s*\n\s*)+/g, '\n\n').trim()
                        }</span>
                    </div>
                );
            }
        }
        if(raw) {
            elements.push(
                <div class="champion-section-raw">{ raw }</div>
            );
        }
        return (
            <div
                m="ChampionSection"
                role="section"
                class="champion-section"
            >
                { elements }
            </div>
        );
    },
};

export default ChampionSection;
