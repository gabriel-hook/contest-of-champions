import teams, { PRESETS, PRESETS_DUPLICATES, update } from '../../service/teams';
import MenuHeader from '../Menu/MenuHeader.jsx';
import MenuSection from '../Menu/MenuSection.jsx';
import MenuOption from '../Menu/MenuOption.jsx';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

function isActivePreset(preset) {
    for(const id in preset)
        if(preset[ id ] !== teams.weights[ id ])
            return false;
    return true;
}

const TeamsSettingsMenu = {
    view(/* ctrl, args */) {
        const options = [];
        options.push(
            <MenuHeader title="settings" />
        );
        options.push(
            <MenuSection title="presets" />
        );
        Object.keys(PRESETS).forEach((id) => {
            options.push(
                <MenuOption
                    title={ `preset-${ id }-name` }
                    selected={ isActivePreset(PRESETS[ id ]) }
                    onclick={ () => {
                        teams.weights = {
                            ...teams.weights,
                            ...PRESETS[ id ],
                        };
                        update();
                        m.redraw();
                    } }
                />
            );
        });
        options.push(
            <MenuSection title="duplicate-weights" />
        );
        Object.keys(PRESETS_DUPLICATES).forEach((id) => {
            options.push(
                <MenuOption
                    title={ `preset-duplicates-${ id }-name` }
                    selected={ isActivePreset(PRESETS_DUPLICATES[ id ]) }
                    onclick={ () => {
                        teams.weights = {
                            ...teams.weights,
                            ...PRESETS_DUPLICATES[ id ],
                        };
                        update();
                        m.redraw();
                    } }
                />
            );
        });
        return (
            <div key={ `teams-settings-menu` }>
                { options }
            </div>
        );
    },
};

export default TeamsSettingsMenu;
