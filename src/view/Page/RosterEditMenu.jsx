import router from '../../service/router.js';
import roster from '../../service/roster.js';
import MenuHeader from '../Menu/MenuHeader.jsx';
import MenuOption from '../Menu/MenuOption.jsx';
import Icon from '../Icon.jsx';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const RosterMenu = {
    view(ctrl, args) {
        const { uid, stars } = args;
        return (
            <div>
                <MenuHeader title="roster" />
                <MenuOption
                    icon={(
                        <Icon icon="refresh" />
                    )}
                    title="reset"
                />
                <MenuOption
                    icon={(
                        <Icon icon="user-times" />
                    )}
                    title="delete"
                    onclick={() => {
                        roster.remove(uid, stars);
                        router.setRoute('/roster');
                    }}
                />
            </div>
        );
    },
};

export default RosterMenu;
