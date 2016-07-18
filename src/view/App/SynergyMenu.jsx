import { EFFECT_VALUES } from '../../data/model/Effect';
import { effectIcon } from '../../data/effects';
import synergy from '../../service/synergy';
import MenuHeader from '../Menu/MenuHeader.jsx';
import MenuSection from '../Menu/MenuSection.jsx';
import MenuOption from '../Menu/MenuOption.jsx';
import MenuOptionGroup from '../Menu/MenuOptionGroup.jsx';
import Icon from '../Icon.jsx';
import { requestRedraw } from '../../util/animation';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const SynergyMenu = {
    view(ctrl, { stars, effect }) {
        return (
            <div m="SynergyMenu" key={ `teams-menu-${ stars }` }>
                <MenuHeader title="synergies" />
                <MenuOption
                    icon={(
                        <Icon icon="list" before />
                    )}
                    title="legend-show"
                    selected={ synergy.legend === true }
                    onclick={ () => {
                        synergy.legend = !synergy.legend;
                        requestRedraw();
                    }}
                />
                <MenuOption
                    icon={(
                        <Icon icon="users" before />
                    )}
                    title="roster-use"
                    selected={ synergy.roster === true }
                    onclick={ () => {
                        synergy.roster = !synergy.roster;
                        requestRedraw();
                    }}
                />
                <MenuSection
                    title="show-by"
                />
                <MenuOptionGroup options={
                    [ '1', '2', '3', '4', '5' ].map((star) => (
                        <MenuOption
                            raw={ `${ star }★` }
                            selected={ stars === star }
                            href={ `/synergy/stars/${ star }` }
                        />
                    ))
                } />
                { EFFECT_VALUES.map((uid) => (
                        <MenuOption
                            icon={(
                                <Icon icon={ effectIcon(uid) } before />
                            )}
                            alternate={ `effect-${ uid }-name` }
                            title={ `effect-${ uid }-type` }
                            selected={ uid === effect }
                            href={ `/synergy/effect/${ uid }` }
                        />
                )) }
            </div>
        );
    },
};

export default SynergyMenu;
