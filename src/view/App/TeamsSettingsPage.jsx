import './TeamsSettingsPage.scss';
import classNames from 'classnames';
import effects, { effectImage } from '../../data/effects';
import teams, { save } from '../../service/teams';
import lang from '../../service/lang';
import ImageIcon from '../ImageIcon.jsx';
import { requestRedraw } from '../../util/animation';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const MAX_PI_RANGE = 50000;

const DUPLICATE_TITLES = {
    2: 'double',
    3: 'triple',
    4: 'quadruple',
    5: 'quintuple',
};

const Slider = {
    view(ctrl, { object, field, toInputValue, fromInputValue }) {
        return (
            <input
                class="field-slider"
                type="range"
                min="0"
                max="1000"
                step="1"
                value={ toInputValue(object[ field ]) }
                oninput={ (event) => {
                    object[ field ] = fromInputValue(event.target.value);
                    save();
                    requestRedraw(10);
                } }
            />
        );
    },
};

const Field = {
    view(ctrl, { title, icon, toggle, slider, isLargeSlider, value }) {
        return (
            <div class="field">
                <label class="field-name">
                    { icon }
                    { title }
                </label>
                <div
                    class={ classNames('field-input',
                        { 'field-input-small': !isLargeSlider },
                        { 'field-input-large': isLargeSlider }
                    )}
                >
                    { slider }
                    { toggle }
                    <span class="field-value">
                        { value }
                    </span>
                </div>
            </div>
        );
    },
};

const TeamsSettingsPage = {
    view() {
        return (
            <div m="TeamsSettingsPage" class="teams-settings">
                <div class="header">
                    { lang.get('synergy-weights') }
                </div>
                { effects.map(({ attr }) => (
                    <Field
                        title={ lang.get(`effect-${ attr.uid }-shortname`, null) || lang.get(`effect-${ attr.uid }-name`) }
                        icon={(
                            <ImageIcon
                                src={ effectImage(attr.uid, 'white') }
                                alt={ effectImage(attr.uid, 'black') }
                            />
                        )}
                        slider={
                            <Slider
                                object={ teams.weights }
                                field={ `effect-${ attr.uid }` }
                                toInputValue={ (value) => value * 1000 }
                                fromInputValue={ (value) => value / 1000 }
                            />
                        }
                        value={ (teams.weights[ `effect-${ attr.uid }` ] * 1000 | 0) / 10 }
                    />
                )) }
                <div class="header">
                    { lang.get('duplicate-weights') }
                </div>
                { [ 2, 3, 4, 5 ].map((count) => (
                    <Field
                        title={ `(${ count }x) ${ lang.get(DUPLICATE_TITLES[ count ]) }` }
                        slider={
                            <Slider
                                object={ teams.weights }
                                field={ `duplicates-${ count }` }
                                toInputValue={ (value) => value * 1000 }
                                fromInputValue={ (value) => value / 1000 }
                            />
                        }
                        value={ (teams.weights[ `duplicates-${ count }` ] * 1000 | 0) / 10 }
                    />
                )) }
                <div class="header">
                    { lang.get('pi-range') }
                </div>
                { [
                    'minimum',
                    'maximum',
                ].map((which) => (
                    <Field
                        title={ lang.get(`pi-range-${ which }`) }
                        slider={
                            <Slider
                                object={ teams.range }
                                field={ which }
                                toInputValue={ (value) => 1000 * value / MAX_PI_RANGE }
                                fromInputValue={ (value) => MAX_PI_RANGE * value / 1000 }
                            />
                        }
                        isLargeSlider={ true }
                        value={ teams.range[ which ] | 0 }
                    />
                )) }
                <div class="clear" />
            </div>
        );
    },
};
export default TeamsSettingsPage;
