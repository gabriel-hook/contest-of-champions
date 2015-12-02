import router from '../../service/router';
import MenuHeader from '../Menu/MenuHeader.jsx';
import MenuOptionGroup from '../Menu/MenuOptionGroup.jsx';
import MenuOption from '../Menu/MenuOption.jsx';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const RosterAddMenu = {
    view(ctrl, args) {
        const { stars } = args;
        return (
            <div>
                <MenuHeader title="add-champion" />
                <MenuOptionGroup
                    options={ [ '1', '2', '3', '4', '5' ].map((star) => (
                        <MenuOption
                            title={ `${ star }★` }
                            selected={ stars === star }
                            onclick={ () => router.setRoute(`/roster/add/${ star }`) }
                        />
                    ))}
                />
            </div>
        );
    },
};

export default RosterAddMenu;
