import teams, { buildTeams, save } from '../../service/teams';
import MenuHeader from '../Menu/MenuHeader.jsx';
import MenuSection from '../Menu/MenuSection.jsx';
import MenuOption from '../Menu/MenuOption.jsx';
import MenuOptionGroup from '../Menu/MenuOptionGroup.jsx';
import Icon from '../Icon.jsx';
import { requestRedraw } from '../../util/animation';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

//once it's ready
const EDITABLE = false;

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
        if(EDITABLE) {
            options.push(
                <MenuOption
                    title="customize"
                    icon={(
                        <Icon icon="magic" />
                    )}
                    selected={ edit }
                    href={ edit? '/teams': '/teams/edit' }
                />
            );
        }
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
