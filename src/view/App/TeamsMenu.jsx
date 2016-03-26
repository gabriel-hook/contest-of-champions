import { uids as TYPES, typeImage, typeIcon } from '../../data/types';
import teams, { buildTeams, save } from '../../service/teams';
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
                    buildTeams();
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
            <MenuSection title="type" />
        );

        options.push(
            <MenuOption
                title={ 'arena' }
                selected={ teams.type === 'arena' }
                onclick={ () => {
                    teams.type = 'arena';
                    teams.size = 3;
                    save();
                    requestRedraw();
                }}
            />
        );
        options.push(
            <MenuOption
                title={ 'alliance-war' }
                selected={ teams.type === 'alliance-war-attack' || teams.type === 'alliance-war-defense' }
                options={
                (
                    <MenuOptionGroup options={[
                    (
                        <MenuOption
                            title={ 'attack' }
                            selected={ teams.type === 'alliance-war-attack' }
                            onclick={ () => {
                                teams.type = 'alliance-war-attack';
                                teams.size = 3;
                                save();
                                requestRedraw();
                            }}
                        />
                    ),
                    (
                        <MenuOption
                            title={ 'defense' }
                            selected={ teams.type === 'alliance-war-defense' }
                            onclick={ () => {
                                teams.type = 'alliance-war-defense';
                                teams.size = 5;
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
                selected={ teams.type === 'alliance-quest' }
                onclick={ () => {
                    teams.type = 'alliance-quest';
                    teams.size = 3;
                    save();
                    requestRedraw();
                }}
            />
        );
        options.push(
            <MenuOption
                title={ 'quest' }
                selected={ teams.type === 'quest' }
                options={
                (
                    <MenuOptionGroup options={
                        [ 3, 4, 5 ].map((size) => (
                            <MenuOption
                                raw={ size }
                                selected={ teams.type === 'quest' && teams.size === size }
                                onclick={ () => {
                                    teams.type = 'quest';
                                    teams.size = size;
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
