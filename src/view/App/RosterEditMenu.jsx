import router from '../../service/router.js';
import roster from '../../service/roster.js';
import MenuHeader from '../Menu/MenuHeader.jsx';
import MenuOption from '../Menu/MenuOption.jsx';
import Icon from '../Icon.jsx';
import { requestRedraw } from '../../util/animation';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const RosterMenu = {
    view(ctrl, args) {
        const { uid, stars } = args;
        return (
            <div key={ `roster-edit-menu-${ uid }-${ stars }` }>
                <MenuHeader title="roster" />
                <MenuOption
                    icon={(
                        <Icon icon="user" />
                    )}
                    title="view-guide"
                    onclick={ () => {
                        router.setRoute(`/guide/${ uid }`);
                        requestRedraw();
                    }}
                />
                <MenuOption
                    icon={(
                        <Icon icon="refresh" />
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
