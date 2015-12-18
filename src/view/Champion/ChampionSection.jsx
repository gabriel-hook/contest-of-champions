import './ChampionSection.scss';
import lang from '../../service/lang';
import ChampionGrade from './ChampionGrade.jsx';
import ChampionRating from './ChampionRating.jsx';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const POSSIBLE_RATINGS = [ 1, 2, 3, 4, 5 ];
const POSSIBLE_GRADES = [ 'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'E', 'F' ];

const ChampionSection = {
    view(ctrl, args) {
        const {
            title, subtitle, description, note, heavy,
            ranges, damagetypes, abilities,
            rating, grade, gradeAwakened,
            raw, onEdit,
        } = args;
        const editableText = (key) => (onEdit)? {
            contenteditable: true,
            class: 'champion-section-textarea',
            oninput: (event) => onEdit(key, event.target.innerText),
        }: {};
        const editableValue = (value) => value === true? '': value;
        const gradeSelect = (key, grade) => (
            <select
                class="champion-section-select"
                onchange={ (event) => onEdit(key, event.target.selectedOptions[ 0 ].value) }
            >
                <option value=""></option>
                {
                    POSSIBLE_GRADES.map((value) => (
                        <option
                            value={ `${ value }` }
                            selected={ grade && value === grade }
                        >{
                            value
                        }</option>
                    ))
                }
            </select>
        );
        const ratingSelect = (key, rating) => (
            <select
                class="champion-section-select"
                onchange={ (event) => onEdit(key, event.target.selectedOptions[ 0 ].value) }
            >
                <option value=""></option>
                {
                    POSSIBLE_RATINGS.map((value) => (
                        <option
                            value={ `${ value }` }
                            selected={ rating && value === rating }
                        >{
                            value
                        }</option>
                    ))
                }
            </select>
        );

        const elements = [];
        elements.push(
            <div class="champion-section-title">
                { title }
                { rating !== undefined && (onEdit? (
                    <div style="float:right;">
                        { ratingSelect('rating', rating) }
                        / 5
                    </div>
                ): (
                    <ChampionRating rating={ rating } />
                )) || null}
            </div>
        );
        if(grade) {
            elements.push(
                onEdit? (
                    <div class="champion-section-text">
                        <b>{ lang.get('grade') }:</b>
                        { gradeSelect('grades.normal', grade) }
                    </div>
                ): (
                    <ChampionGrade title="grade" grade={ grade }/>
                )
            );
        }
        if(gradeAwakened) {
            elements.push(
                onEdit? (
                    <div class="champion-section-text">
                        <b>{ lang.get('awakened') }:</b>
                        { gradeSelect('grades.awakened', gradeAwakened) }
                    </div>
                ): (
                    <ChampionGrade title="awakened" grade={ gradeAwakened } />
                )
            );
        }
        if(subtitle) {
            elements.push(
                <div class="champion-section-text">
                    <b {...editableText('subtitle')}>{ editableValue(subtitle) }</b>
                </div>
            );
        }
        if(description) {
            elements.push(
                <div class="champion-section-text">
                    <div {...editableText('description')}>{ editableValue(description) }</div>
                </div>
            );
        }
        if(heavy) {
            elements.push(
                <div class="champion-section-text">
                    <b>{ lang.get('heavy-attack') }:</b>
                    <span {...editableText('heavy')}>{ editableValue(heavy) }</span>
                </div>
            );
        }
        if(ranges && ranges.length) {
            elements.push(
                <div class="champion-section-text">
                    <b>{ lang.get('range') }:</b>
                    { ranges.map((range, index) => (
                        <span class={ `champion-section-range-${ range }` }>{
                            (index < ranges.length - 1)?
                                `${ lang.get(`range-${ range }`) }, `:
                                lang.get(`range-${ range }`)
                        }</span>
                    )) }
                </div>
            );
        }
        if(damagetypes && damagetypes.length) {
            elements.push(
                <div class="champion-section-text">
                    <b>{ lang.get('damage-type') }:</b>
                    { damagetypes.map((damage, index) => (
                        <span class={ `champion-section-damage-${ damage }` }>{
                            (index < damagetypes.length - 1)?
                                `${ lang.get(`damage-${ damage }`) }, `:
                                lang.get(`damage-${ damage }`)
                        }</span>
                    )) }
                </div>
            );
        }
        if(abilities && abilities.length) {
            elements.push(
                <div class="champion-section-text">
                    <b>{ lang.get('abilities') }:</b>
                    { abilities.map((ability, index) => (
                    <span class={ `champion-section-ability-${ ability }` }>{
                        (index < abilities.length - 1)?
                            `${ lang.get(`ability-${ ability }`) }, `:
                            lang.get(`ability-${ ability }`)
                        }</span>
                        )) }
                </div>
            );
        }
        if(note) {
            elements.push(
                <div class="champion-section-text">
                    <b>{ lang.get('note') }:</b>
                    <span {...editableText('note')}>{ editableValue(note) }</span>
                </div>
            );
        }
        if(raw) {
            elements.push(
                <div class="champion-section-raw">
                    { raw }
                </div>
            );
        }
        return (
            <div class="champion-section">
                { elements }
            </div>
        );
    },
};

export default ChampionSection;
