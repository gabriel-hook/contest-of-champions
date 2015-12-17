import router from '../../service/router';
import synergy from '../../service/synergy';
import MenuHeader from '../Menu/MenuHeader.jsx';
import MenuOption from '../Menu/MenuOption.jsx';
import MenuOptionGroup from '../Menu/MenuOptionGroup.jsx';
import { requestRedraw } from '../../util/animation';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const SynergyMenu = {
    view(ctrl, args) {
        const { stars } = args;
        const options = [];
        options.push(
            <MenuHeader title="synergies" />
        );
        options.push(
            <MenuOptionGroup options={
                [ '1', '2', '3', '4', '5' ].map((star) => (
                    <MenuOption
                        title={ `${ star }★` }
                        selected={ stars === star }
                        onclick={ () => {
                            router.setRoute(`/synergy/${ star }`);
                            requestRedraw();
                        }}
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
                    requestRedraw();
                }}
            />
        );
        return (
            <div key={ `teams-menu-${ stars }` }>
                { options }
            </div>
        );
    },
};

export default SynergyMenu;
