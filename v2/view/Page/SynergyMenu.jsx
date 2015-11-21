import MenuSection from '../App/Menu/MenuSection.jsx';
import MenuOption from '../App/Menu/MenuOption.jsx';
import MenuOptionGroup from '../App/Menu/MenuOptionGroup.jsx';
import MenuIcon from '../App/Menu/MenuIcon.jsx';
import router from '../../service/router.js';
import synergy from '../../service/synergy.js';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const SynergyMenu = {
    view(ctrl, args) {
        const { stars } = args;
        const options = [];
        options.push(
            <MenuSection
                icon={(
                    <MenuIcon icon="users"/>
                )}
                title="synergies"
            />
        );
        options.push(
            <MenuOptionGroup options={
                [ '1', '2', '3', '4', '5' ].map((star) => (
                    <MenuOption
                        title={ `${ star }★` }
                        selected={ stars === star }
                        onclick={ () => router.setRoute(`/synergy/${ star }`) }
                    />
                ))
            } />
        );
        options.push(
            <MenuOption
                title="legend-show"
                selected={ synergy.legend === true }
                onclick={ () => {
                    synergy.legend = !synergy.legend;
                }}
            />
        );
        return (
            <div>
                { options }
            </div>
        );
    },
};

export default SynergyMenu;
