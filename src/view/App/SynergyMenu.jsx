import synergy from '../../service/synergy';
import MenuHeader from '../Menu/MenuHeader.jsx';
import MenuOption from '../Menu/MenuOption.jsx';
import MenuOptionGroup from '../Menu/MenuOptionGroup.jsx';
import { requestRedraw } from '../../util/animation';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const SynergyMenu = {
    view(ctrl, { stars }) {
        return (
            <div m="SynergyMenu" key={ `teams-menu-${ stars }` }>
                <MenuHeader title="synergies" />
                <MenuOptionGroup options={
                    [ '1', '2', '3', '4', '5' ].map((star) => (
                        <MenuOption
                            raw={ `${ star }★` }
                            selected={ stars === star }
                            href={ `/synergy/${ star }` }
                        />
                    ))
                } />
                <MenuOption
                    title="legend-show"
                    selected={ synergy.legend === true }
                    onclick={ () => {
                        synergy.legend = !synergy.legend;
                        requestRedraw();
                    }}
                />
            </div>
        );
    },
};

export default SynergyMenu;
