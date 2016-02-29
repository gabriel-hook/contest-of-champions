import { uids as TYPES, typeImage } from '../../data/types';
import teams, { buildTeams, save } from '../../service/teams';
import MenuHeader from '../Menu/MenuHeader.jsx';
import MenuSection from '../Menu/MenuSection.jsx';
import MenuOption from '../Menu/MenuOption.jsx';
import MenuOptionGroup from '../Menu/MenuOptionGroup.jsx';
import Icon from '../Icon.jsx';
import ImageIcon from '../ImageIcon.jsx';
import lang from '../../service/lang';
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
                    <Icon icon="cog" spin={ teams.building } />
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
                    <Icon icon="pencil" />
                )}
                selected={ edit }
                href={ edit? '/teams': '/teams/edit' }
            />
        );
        options.push(
            <MenuSection
                title="champions"
            />
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
            <MenuSection
                title="types"
            />
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
                                icon="square"
                                solitary
                            />
                        )}
                        info={ lang.get(`type-${ type }-name`) }
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
        options.push(
            <MenuSection
                title="team-size"
            />
        );
        options.push(
            <MenuOptionGroup options={
                [ 3, 4, 5 ].map((size) => (
                    <MenuOption
                        raw={ size }
                        selected={ teams.size === size }
                        onclick={ () => {
                            teams.size = size;
                            save();
                            requestRedraw();
                        }}
                    />
                ))
            } />
        );
        options.push(
            <MenuSection
                title="type"
            />
        );
        options.push(
            <MenuOptionGroup options={
                [ 'quest', 'alliance', 'arena' ].map((type) => (
                    <MenuOption
                        title={ type }
                        selected={ teams.type === type }
                        onclick={ () => {
                            teams.type = type;
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
