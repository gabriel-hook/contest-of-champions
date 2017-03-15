import './GuidePage.scss';
import './GuideEditPage.scss';
import { championMap } from '../../data/champions';
import Champion from '../../data/model/Champion';
import guides, { PROFILE_TYPES } from '../../data/guides';
import lang from '../../service/lang';
import ChampionHeader from '../Champion/ChampionHeader.jsx';
import ChampionSection from '../Champion/ChampionSection.jsx';
import { requestRedraw } from '../../util/animation';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

function editGuide(uid, initialSelectors, initialKey, value) {
    const guide = guides[ uid ] || (guides[ uid ] = {});
    let object = guide;

    const keys = initialKey.split('.');
    const selectors = (keys.length > 1)?
    [
        ...initialSelectors,
        ...keys.filter((value, index) => index < keys.length - 1),
    ]:
        initialSelectors;
    const key = keys[ keys.length - 1 ];

    for(let i = 0; i < selectors.length; i++) {
        if(!object[ selectors[ i ] ])
            object[ selectors[ i ] ] = {};
        object = object[ selectors[ i ] ];
    }
    object[ key ] = value || undefined;
    requestRedraw();
}

const GuideEditAuthor = {
    view(ctrl, { name, type, profile, onEdit }) {
        const editableText = (key) => ({
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
                            lang.string(`profile-${ value }`)
                        }</option>
                    ))
                }
            </select>
        );
        const elements = [];
        elements.push(
            <div class="champion-section-text">
                <b>{ lang.string('author') }:</b>
                <span {...editableText('name')}>{ editableValue(name) }</span>
            </div>
        );
        elements.push(
            <div class="champion-section-text">
                <b>{ lang.string('type') }:</b>
                { editableSelect(PROFILE_TYPES, 'type', type) }
            </div>
        );
        if(type && type !== true) {
            elements.push(
                <div class="champion-section-text">
                    <b>{ lang.string(
                        (type === 'email')?
                            'email':
                        (type === 'spotlight')?
                            'thread':
                            'profile'
                    ) }:</b>
                    <span {...editableText('profile')}>{ editableValue(profile) }</span>
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

const GuideEditPage = {
    view(ctrl, { uid }) {
        const guide = guides[ uid ];
        const details = [];
        const champion = championMap[ `${ uid }-2` ] || championMap[ `${ uid }-3` ] || championMap[ `${ uid }-4` ] || championMap[ `${ uid }-5` ];
        if(champion) {
            details.push(
                <ChampionHeader
                    champion={ new Champion({
                        ...champion.attr,
                        stars: 0,
                    }) }
                />
            );
        }
        const grades = guide && guide.grades;
        details.push(
            <ChampionSection
                title={ lang.string('description') }
                help={ lang.string(`champion-${uid}-description`, null) }
                grade={ grades && guide.grades.normal || true }
                gradeAwakened={ grades && guide.grades.awakened || true }
                description={ guide && guide.description || true }
                youtube={ guide && guide.youtube || true }
                onEdit={ (key, value) => editGuide(uid, [ ], key, value) }
            />
        );
        const gameplay = guide && guide.gameplay;
        details.push(
            <ChampionSection
                title={ lang.string('gameplay') }
                rating={ gameplay && guide.gameplay.rating || true }
                description={ gameplay && guide.gameplay.description || true }
                abilities={ gameplay && guide.gameplay.abilities || true }
                note={ gameplay && guide.gameplay.note || true }
                onEdit={ (key, value) => editGuide(uid, [ 'gameplay' ], key, value) }
            />
        );
        const attack = guide && guide.attack;
        details.push(
            <ChampionSection
                title={ lang.string('attack') }
                rating={ attack && guide.attack.rating || true }
                description={ attack && guide.attack.description || true }
                heavy={ attack && guide.attack.heavy || true }
                ranges={ attack && guide.attack.ranges || true }
                damagetypes={ attack && guide.attack.damagetypes || true }
                abilities={ attack && guide.attack.abilities || true }
                note={ attack && guide.attack.note || true }
                onEdit={ (key, value) => editGuide(uid, [ 'attack' ], key, value) }
            />
        );
        [ 1, 2, 3 ].forEach((index) => {
            const special = guide && guide.specials && guide.specials[ index ];
            details.push(
                <ChampionSection
                    title={ `${ lang.string('special') } ${ index }` }
                    rating={ special && special.rating || true }
                    name={ lang.string(`champion-special-${uid}-${index}-name`, null) }
                    help={ lang.string(`champion-special-${uid}-${index}-description`, null) }
                    description={ special && special.description || true }
                    ranges={ special && special.ranges || (index !== 3) }
                    damagetypes={ special && special.damagetypes || true }
                    abilities={ special && special.abilities || true }
                    note={ special && special.note || true }
                    onEdit={ (key, value) => editGuide(uid, [ 'specials', index ], key, value) }
                    noEdit={ [ 'name' ] }
                />
            );
        });
        const signature = guide && guide.signature;
        details.push(
            <ChampionSection
                title={ lang.string('signature') }
                rating={ signature && guide.signature.rating || true }
                name={ lang.string(`champion-signature-${uid}-name`, null) }
                help={ lang.string(`champion-signature-${uid}-description`, null) }
                description={ signature && guide.signature.description || true }
                abilities={ signature && guide.signature.abilities || true }
                note={ signature && guide.signature.note || true }
                onEdit={ (key, value) => editGuide(uid, [ 'signature' ], key, value) }
                noEdit={ [ 'name' ] }
            />
        );
        const author = guide && guide.author;
        details.push(
            <GuideEditAuthor
                name={ author && author.name || true }
                type={ author && author.type || true }
                profile={ author && author.profile || true }
                onEdit={ (key, value) => editGuide(uid, [ 'author' ], key, value) }
            />
        );
        return (
            <div m="GuideEditPage" class="guide guide-edit" key={ `guide-${ uid }` }>
                { details }
                <div class="clear" />
            </div>
        );
    },
};

export default GuideEditPage;
