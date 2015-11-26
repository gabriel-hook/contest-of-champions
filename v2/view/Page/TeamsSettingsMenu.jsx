import MenuOption from '../App/Menu/MenuOption.jsx';
import MenuSection from '../App/Menu/MenuSection.jsx';
import Icon from '../Icon.jsx';
import teams, { presets } from '../../service/teams.js';
import router from '../../service/router.js';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const TeamsSettingsMenu = {
    view(/* ctrl, args */) {
        const options = [];
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
