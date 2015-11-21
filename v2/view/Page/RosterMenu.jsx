import MenuSection from '../App/Menu/MenuSection.jsx';
import MenuOption from '../App/Menu/MenuOption.jsx';
import MenuIcon from '../App/Menu/MenuIcon.jsx';
import roster from '../../service/roster.js';
import router from '../../service/router.js';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const RosterMenu = {
    view(/* ctrl, args */) {
        return (
            <div>
                <MenuSection
                    icon={(
                        <MenuIcon icon="th"/>
                    )}
                    title="roster"
                />
                <MenuOption
                    icon={(
                        <MenuIcon icon="user-plus" />
                    )}
                    title="add-champion"
                    onclick={ () => router.setRoute('/roster/add/2') }
                />
                <MenuOption
                    icon={(
                        <MenuIcon icon="clipboard" />
                    )}
                    title="import-csv"
                />
                <MenuOption
                    icon={(
                        <MenuIcon icon="floppy-o" />
                    )}
                    title="export-csv"
                />
                <MenuOption
                    icon={(
                        <MenuIcon icon="user-times" />
                    )}
                    title="delete-all"
                    onclick={ () => roster.clear() }
                />
            </div>
        );
    },
};

export default RosterMenu;
