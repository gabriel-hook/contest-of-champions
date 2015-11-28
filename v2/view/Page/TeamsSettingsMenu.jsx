import MenuHeader from '../App/Menu/MenuHeader.jsx';
import MenuSection from '../App/Menu/MenuSection.jsx';
import MenuOption from '../App/Menu/MenuOption.jsx';
import Icon from '../Icon.jsx';
import teams, { presets, update } from '../../service/teams.js';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

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
        Object.keys(presets).forEach((id) => {
            options.push(
                <MenuOption
                    title={ `preset-${ id }-name` }
                    onclick={ () => {
                        teams.weights = {
                            ...teams.weights,
                            ...presets[ id ],
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
