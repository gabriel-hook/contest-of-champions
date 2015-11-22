import MenuSection from '../App/Menu/MenuSection.jsx';
import MenuOption from '../App/Menu/MenuOption.jsx';
import MenuOptionGroup from '../App/Menu/MenuOptionGroup.jsx';
import Icon from '../Icon.jsx';
import teams from '../../service/teams.js';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const TeamsMenu = {
    view(/* ctrl, args */) {
        const options = [];
        options.push(
            <MenuSection
                icon={(
                    <Icon icon="users"/>
                )}
                title="teams"
            />
        );
        options.push(
            <MenuOption
                title="build"
                icon={(
                    <Icon icon="cog spinning" />
                )}
                onclick={ () => true }
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
                        title={ `${ star }★` }
                        selected={ teams.stars[ star ] }
                        onclick={ () => teams.stars[ star ] = !teams.stars[ star ] }
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
                [ 1, 2, 3 ].map((size) => (
                    <MenuOption
                        title={ size }
                        selected={ teams.size === size }
                        onclick={ () => teams.size = size }
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
                [ 'quest', 'arena' ].map((type) => (
                    <MenuOption
                        title={ type }
                        selected={ teams.type === type }
                        onclick={ () => teams.type = type }
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

export default TeamsMenu;
