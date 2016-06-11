import teams, { PRESETS, PRESETS_DUPLICATES, PRESETS_RANGE, save } from '../../service/teams';
import MenuHeader from '../Menu/MenuHeader.jsx';
import MenuSection from '../Menu/MenuSection.jsx';
import MenuOption from '../Menu/MenuOption.jsx';
import { requestRedraw } from '../../util/animation';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

function isActivePreset(preset, currentValues) {
    for(const id in preset)
        if(preset[ id ] !== currentValues[ id ])
            return false;
    return true;
}

const TeamsSettingsMenu = {
    view() {
        const options = [];
        options.push(
            <MenuHeader title="settings" />
        );
        options.push(
            <MenuSection title="presets" />
        );
        Object.keys(PRESETS).forEach((id) => {
            const handleClick = () => {
                teams.weights = {
                    ...teams.weights,
                    ...PRESETS[ id ],
                };
                save();
                requestRedraw();
            };
            options.push(
                <MenuOption
                    title={ `preset-${ id }-name` }
                    selected={ isActivePreset(PRESETS[ id ], teams.weights) }
                    onclick={ handleClick }
                />
            );
        });
        options.push(
            <MenuSection title="duplicate-weights" />
        );
        Object.keys(PRESETS_DUPLICATES).forEach((id) => {
            const handleClick = () => {
                teams.weights = {
                    ...teams.weights,
                    ...PRESETS_DUPLICATES[ id ],
                };
                save();
                requestRedraw();
            };
            options.push(
                <MenuOption
                    title={ `preset-duplicates-${ id }-name` }
                    selected={ isActivePreset(PRESETS_DUPLICATES[ id ], teams.weights) }
                    onclick={ handleClick }
                />
            );
        });
        options.push(
            <MenuSection title="pi-range" />
        );
        Object.keys(PRESETS_RANGE).forEach((id) => {
            const handleClick = () => {
                teams.range = {
                    ...teams.range,
                    ...PRESETS_RANGE[ id ],
                };
                save();
                requestRedraw();
            };
            options.push(
                <MenuOption
                    title={ `preset-range-${ id }-name` }
                    selected={ isActivePreset(PRESETS_RANGE[ id ], teams.range) }
                    onclick={ handleClick }
                />
            );
        });
        return (
            <div m="TeamsSettingsMenu" key={ 'teams-settings-menu' }>
                { options }
            </div>
        );
    },
};

export default TeamsSettingsMenu;
