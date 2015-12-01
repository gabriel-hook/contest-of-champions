import MenuHeader from '../App/Menu/MenuHeader.jsx';
import MenuOption from '../App/Menu/MenuOption.jsx';
import Icon from '../Icon.jsx';
import roster from '../../service/roster.js';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const RosterMenu = {
    view(/* ctrl, args */) {
        return (
            <div>
                <MenuHeader
                    icon={(
                        <Icon icon="th"/>
                    )}
                    title="roster"
                />
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
