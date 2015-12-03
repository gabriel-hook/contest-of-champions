import roster from '../../service/roster.js';
import MenuHeader from '../Menu/MenuHeader.jsx';
import MenuOption from '../Menu/MenuOption.jsx';
import Icon from '../Icon.jsx';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const RosterMenu = {
    view(/* ctrl, args */) {
        return (
            <div>
                <MenuHeader title="roster" />
                <MenuOption
                    icon={(
                        <Icon icon="clipboard" />
                    )}
                    title="import-csv"
                />
                <MenuOption
                    icon={(
                        <Icon icon="floppy-o" />
                    )}
                    title="export-csv"
                />
                <MenuOption
                    icon={(
                        <Icon icon="user-times" />
                    )}
                    title="delete-all"
                    onclick={ () => roster.clear() }
                />
            </div>
        );
    },
};

export default RosterMenu;
