import MenuSection from '../App/Menu/MenuSection.jsx';
import MenuOptionGroup from '../App/Menu/MenuOptionGroup.jsx';
import MenuOption from '../App/Menu/MenuOption.jsx';
import Icon from '../Icon.jsx';
import router from '../../service/router.js';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const RosterAddMenu = {
    view(ctrl, args) {
        const { stars } = args;
        const options = [];
        options.push(
            <MenuOption
                title="roster"
                icon={(
                    <Icon icon="chevron-circle-left" />
                )}
                onclick={ () => router.setRoute('/roster') }
            />
        );
        options.push(
            <MenuSection
                icon={(
                    <Icon icon="user-plus"/>
                )}
                title="add-champion"
            />
        );
        options.push(
            <MenuOptionGroup options={
                [ '1', '2', '3', '4', '5' ].map((star) => (
                    <MenuOption
                        title={ `${ star }★` }
                        selected={ stars === star }
                        onclick={ () => router.setRoute(`/roster/add/${ star }`) }
                    />
                ))
            } />
        );
        return (
            <div>
                { options }
            </div>
        );
    },
};

export default RosterAddMenu;
