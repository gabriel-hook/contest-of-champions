import { uids as TYPES, typeImage, typeIcon } from '../../data/types';
import {
    ROLE_ARENA,
    ROLE_QUEST,
    ROLE_ALLIANCE_QUEST,
    ROLE_ALLIANCE_WAR_ATTACK,
    ROLE_ALLIANCE_WAR_DEFENSE,
} from '../../data/champions';
import teams, { save, saveTeam, loadTeam, buildTeam } from '../../service/teams';
import MenuHeader from '../Menu/MenuHeader.jsx';
import MenuSection from '../Menu/MenuSection.jsx';
import MenuOption from '../Menu/MenuOption.jsx';
import MenuOptionGroup from '../Menu/MenuOptionGroup.jsx';
import Icon from '../Icon.jsx';
import ImageIcon from '../ImageIcon.jsx';
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
                selected={ teams.type === ROLE_ARENA }
                onclick={ () => {
                    teams.type = ROLE_ARENA;
                    teams.size = 3;
                    loadTeam(teams.type);
                    save();
                    requestRedraw();
                }}
            />
        );
        options.push(
            <MenuOption
                title={ ROLE_QUEST }
                selected={ teams.type === ROLE_QUEST }
                options={
                (
                    <MenuOptionGroup options={
                        [ 3, 4, 5 ].map((size) => (
                            <MenuOption
                                raw={ size }
                                selected={ teams.type === ROLE_QUEST && teams.size === size }
                                onclick={ () => {
                                    teams.type = ROLE_QUEST;
                                    teams.size = size;
                                    loadTeam(teams.type);
                                    save();
                                    requestRedraw();
                                }}
                            />
                        ))
                    } />
                )
            } />
        );
        options.push(
            <MenuOption
                title={ 'alliance-war' }
                selected={ teams.type === ROLE_ALLIANCE_WAR_ATTACK || teams.type === ROLE_ALLIANCE_WAR_DEFENSE }
                options={
                (
                    <MenuOptionGroup options={[
                    (
                        <MenuOption
                            title={ 'attack' }
                            selected={ teams.type === ROLE_ALLIANCE_WAR_ATTACK }
                            onclick={ () => {
                                teams.type = ROLE_ALLIANCE_WAR_ATTACK;
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
                            selected={ teams.type === ROLE_ALLIANCE_WAR_DEFENSE }
                            onclick={ () => {
                                teams.type = ROLE_ALLIANCE_WAR_DEFENSE;
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
                selected={ teams.type === ROLE_ALLIANCE_QUEST }
                onclick={ () => {
                    teams.type = ROLE_ALLIANCE_QUEST;
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
                TYPES.map((type) => (
                    <MenuOption
                        icon={(
                            <ImageIcon
                                src={ typeImage(type, 'white') }
                                alt={ typeImage(type, 'black') }
                                hoverSrc={ typeImage(type, 'black') }
                                hoverAlt={ typeImage(type, 'white') }
                                icon={ typeIcon(type) }
                            />
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
            <div m="TeamsMenu" key={ `teams-menu` }>
                { options }
            </div>
        );
    },
};

export default TeamsMenu;
