import './ChampionSection.scss';
import lang from '../../service/lang';
import ChampionGrade from './ChampionGrade.jsx';
import ChampionRating from './ChampionRating.jsx';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const ChampionSection = {
    view(ctrl, args) {
        const {
            title, subtitle, description, note, heavy,
            rating, grade, gradeAwakened,
            raw,
        } = args;
        const elements = [];
        elements.push(
            <div class="champion-section-title">
                { title }
                { rating !== undefined && (
                    <ChampionRating rating={ rating } />
                ) || null}
            </div>
        );
        if(grade) {
            elements.push(
                <ChampionGrade title="grade" grade={ grade } />
            );
        }
        if(gradeAwakened) {
            elements.push(
                <ChampionGrade title="awakened" grade={ gradeAwakened } />
            );
        }
        if(subtitle) {
            elements.push(
                <div class="champion-section-text"><b>{ subtitle }</b></div>
            );
        }
        if(description) {
            elements.push(
                <div class="champion-section-text">{ description }</div>
            );
        }
        if(heavy) {
            elements.push(
                <div class="champion-section-text">
                    <b>{ lang.get('heavy-attack') }:</b>
                    { heavy }
                </div>
            );
        }
        if(note) {
            elements.push(
                <div class="champion-section-text">
                    <b>{ lang.get('note') }:</b>
                    { note }
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
