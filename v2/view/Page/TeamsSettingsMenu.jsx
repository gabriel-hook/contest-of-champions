import MenuOption from '../App/Menu/MenuOption.jsx';
import Icon from '../Icon.jsx';
import router from '../../service/router.js';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const TeamsSettingsMenu = {
    view(/* ctrl, args */) {
        const options = [];
        options.push(
            <MenuOption
                title="teams"
                icon={(
                    <Icon icon="chevron-circle-left" />
                )}
                onclick={ () => router.setRoute('/teams') }
            />
        );
        options.push(
            <div>DEFAULTS</div>
        );
        return (
            <div>
                { options }
            </div>
        );
    },
};

export default TeamsSettingsMenu;
