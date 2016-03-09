import roster from '../../service/roster.js';
import MenuHeader from '../Menu/MenuHeader.jsx';
import MenuOption from '../Menu/MenuOption.jsx';
import Icon from '../Icon.jsx';
import { requestRedraw } from '../../util/animation';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const RosterMenu = {
    view(ctrl, { uid, stars }) {
        return (
            <div m="RosterMenu" key={ `roster-edit-menu-${ uid }-${ stars }` }>
                <MenuHeader title="roster" />
                <MenuOption
                    icon={(
                        <Icon icon="user" before />
                    )}
                    title="view-guide"
                    href={ `/guide/${ uid }` }
                />
                <MenuOption
                    icon={(
                        <Icon icon="refresh" before />
                    )}
                    title="reset"
                    onclick={() => {
                        roster.set(uid, stars, {
                            rank: 1,
                            level: 1,
                            awakened: 0,
                            pi: 0,
                        });
                        requestRedraw();
                    }}
                />
            </div>
        );
    },
};

export default RosterMenu;
