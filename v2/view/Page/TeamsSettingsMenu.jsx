import MenuHeader from '../App/Menu/MenuHeader.jsx';
import MenuSection from '../App/Menu/MenuSection.jsx';
import MenuOption from '../App/Menu/MenuOption.jsx';
import Icon from '../Icon.jsx';
import teams, { PRESETS, PRESETS_DUPLICATES, update } from '../../service/teams.js';
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
            <MenuHeader
                icon={(
                    <Icon icon="cogs"/>
                )}
                title="settings"
            />
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
            <div>
                { options }
            </div>
        );
    },
};

export default TeamsSettingsMenu;
