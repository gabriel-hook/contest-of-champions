import { TYPE_VALUES } from '../../data/model/Type';
import { typeIcon } from '../../data/types';
import { ROLE } from '../../data/model/Role';
import { roleIcon } from '../../data/roles';
import teams, { save, saveTeam, loadTeam, buildTeam, lockTeams } from '../../service/teams';
import MenuHeader from '../Menu/MenuHeader.jsx';
import MenuSection from '../Menu/MenuSection.jsx';
import MenuOption from '../Menu/MenuOption.jsx';
import MenuOptionGroup from '../Menu/MenuOptionGroup.jsx';
import Icon from '../Icon.jsx';
import { requestRedraw } from '../../util/animation';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const TeamsMenu = {
    view(ctrl, { edit }) {
        const options = [];
        options.push(
            <MenuHeader title="teams" />
        );
        options.push(
            <MenuOption
                title="build"
                icon={(
                    <Icon icon="cog" spin={ teams.building } before />
                )}
                onclick={ () => {
                    buildTeam();
                    requestRedraw();
                }}
                progress={ teams.progress }
            />
        );
        options.push(
            <MenuOption
                title="modify"
                icon={(
                    <Icon icon="pencil" before />
                )}
                selected={ edit }
                href={ edit? '/teams': '/teams/edit' }
            />
        );
        options.push(
            <MenuOption
                title="dissolve"
                icon={(
                    <Icon icon="user-times" before />
                )}
                onclick={ () => {
                    teams.result[ `${ teams.type }-${ teams.size }` ] = null;
                    if(teams.type === ROLE.ARENA) {
                        lockTeams();
                    }
                    saveTeam();
                    save();
                    requestRedraw();
                }}
                red
            />
        );
        options.push(
            <MenuSection title="type" />
        );

        options.push(
            <MenuOption
                title={ 'arena' }
                icon={(
                    <Icon icon={ roleIcon(ROLE.ARENA) } before />
                )}
                selected={ teams.type === ROLE.ARENA }
                onclick={ () => {
                    teams.type = ROLE.ARENA;
                    teams.size = 3;
                    loadTeam(teams.type);
                    save();
                    requestRedraw();
                }}
            />
        );
        options.push(
            <MenuOption
                title={ ROLE.QUEST }
                icon={(
                    <Icon icon={ roleIcon(ROLE.QUEST) } before />
                )}
                selected={ teams.type === ROLE.QUEST }
                options={(
                    <MenuOptionGroup options={
                        [ 3, 4, 5 ].map((size) => (
                            <MenuOption
                                raw={ size }
                                selected={ teams.type === ROLE.QUEST && teams.size === size }
                                onclick={ () => {
                                    teams.type = ROLE.QUEST;
                                    teams.size = size;
                                    loadTeam(teams.type);
                                    save();
                                    requestRedraw();
                                }}
                            />
                        ))
                    } />
                )}
            />
        );
        options.push(
            <MenuOption
                title={ 'alliance-war' }
                icon={(
                    <Icon icon={ roleIcon(ROLE.ALLIANCE_WAR) } before />
                )}
                selected={ teams.type === ROLE.ALLIANCE_WAR_ATTACK || teams.type === ROLE.ALLIANCE_WAR_DEFENSE }
                options={
                (
                    <MenuOptionGroup options={[
                    (
                        <MenuOption
                            title={ 'attack' }
                            selected={ teams.type === ROLE.ALLIANCE_WAR_ATTACK }
                            onclick={ () => {
                                teams.type = ROLE.ALLIANCE_WAR_ATTACK;
                                teams.size = 3;
                                loadTeam(teams.type);
                                save();
                                requestRedraw();
                            }}
                        />
                    ),
                    (
                        <MenuOption
                            title={ 'defense' }
                            selected={ teams.type === ROLE.ALLIANCE_WAR_DEFENSE }
                            onclick={ () => {
                                teams.type = ROLE.ALLIANCE_WAR_DEFENSE;
                                teams.size = 5;
                                loadTeam(teams.type);
                                save();
                                requestRedraw();
                            }}
                        />
                    ),
                    ]} />
                )
            } />
        );
        options.push(
            <MenuOption
                title={ 'alliance-quest' }
                icon={(
                    <Icon icon={ roleIcon(ROLE.ALLIANCE_QUEST) } before />
                )}
                selected={ teams.type === ROLE.ALLIANCE_QUEST }
                onclick={ () => {
                    teams.type = ROLE.ALLIANCE_QUEST;
                    teams.size = 3;
                    loadTeam(teams.type);
                    save();
                    requestRedraw();
                }}
            />
        );
        options.push(
            <MenuSection title="champions" />
        );
        options.push(
            <MenuOptionGroup options={
                [ 1, 2, 3, 4, 5 ].map((star) => (
                    <MenuOption
                        raw={ `${ star }★` }
                        selected={ teams.stars[ star ] }
                        onclick={ () => {
                            teams.stars[ star ] = !teams.stars[ star ];
                            save();
                            requestRedraw();
                        }}
                    />
                ))
            } />
        );
        options.push(
            <MenuOptionGroup options={
                TYPE_VALUES.map((type) => (
                    <MenuOption
                        icon={(
                            <Icon icon={ typeIcon(type) } />
                        )}
                        info={ `type-${ type }-name` }
                        selected={ teams.types[ type ] }
                        onclick={ () => {
                            teams.types[ type ] = !teams.types[ type ];
                            save();
                            requestRedraw();
                        }}
                    />
                ))
            } />
        );
        return (
            <div m="TeamsMenu" key={ 'teams-menu' }>
                { options }
            </div>
        );
    },
};

export default TeamsMenu;
