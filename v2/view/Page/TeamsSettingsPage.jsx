import './TeamsSettingsPage.scss';
import effects from '../../data/effects.js';
import teams from '../../service/teams.js';
import lang from '../../service/lang.js';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const Slider = {
    view(ctrl, args) {
        const { object, field } = args;
        return (
            <input
                type="range"
                min="0"
                max="1000"
                step="1"
                value={ object[ field ] * 1000 }
                oninput={ (event) => {
                    object[ field ] = event.target.value / 1000;
                    m.redraw();
                } }
            />
        );
    },
};

const TeamsSettingsPage = {
    view() {
        const effectSliders = effects.map(({ attr }) => (
            <div>
                <label>{ lang.get(`effect-${ attr.uid }-name`) }</label>
                <Slider object={ teams.weights } field={ `effect-${ attr.uid }` } />
            </div>
        ));

        return (
            <div class="teams-settings">
                { effectSliders }
            </div>
        );
    },
};

export default TeamsSettingsPage;
