import './Teams.scss';
import Message from '../Message.jsx';
import Champion from '../Champion.jsx';
import teams from '../../service/teams.js';
import router from '../../service/router.js';
import lang from '../../service/lang.js';
import m from 'mithril';

const tab = {
    id: 'teams',
    icon: 'cog',
    title: 'teams',
};

const menu = {
    header:{
        title: 'teams',
        icon: 'users',
    },
    options:[
        {
            title: 'build',
            icon: 'cog',
        },
        {
            header: true,
            title: 'champions',
        },
        {
            title: '1★',
            selected: ({ stars }) => stars[1],
            onclick: () => {
                teams.stars[1] = !teams.stars[1];
                return false;
            },
            split: 5,
        },
        {
            title: '2★',
            selected: ({ stars }) => stars[2],
            onclick: () => {
                teams.stars[2] = !teams.stars[2];
                return false;
            },
            split: 5,
        },
        {
            title: '3★',
            selected: ({ stars }) => stars[3],
            onclick: () => {
                teams.stars[3] = !teams.stars[3];
                return false;
            },
            split: 5,
        },
        {
            title: '4★',
            selected: ({ stars }) => stars[4],
            onclick: () => {
                teams.stars[4] = !teams.stars[4];
                return false;
            },
            split: 5,
        },
        {
            title: '5★',
            selected: ({ stars }) => stars[5],
            onclick: () => {
                teams.stars[5] = !teams.stars[5];
                return false;
            },
            split: 5,
        },
        {
            header: true,
            title: 'team-size',
        },
        {
            title: '1',
            selected: ({ size }) => size === 1,
            onclick: () => {
                teams.size = 1;
                return false;
            },
            split: 3,
        },
        {
            title: '2',
            selected: ({ size }) => size === 2,
            onclick: () => {
                teams.size = 2;
                return false;
            },
            split: 3,
        },
        {
            title: '3',
            selected: ({ size }) => size === 3,
            onclick: () => {
                teams.size = 3;
                return false;
            },
            split: 3,
        },
        {
            header: true,
            title: 'type',
        },
        {
            title: 'algorithm-quest-name',
            selected: ({ type }) => type === 'quest',
            onclick: () => {
                teams.type = 'quest';
                return false;
            },
            split: 2,
        },
        {
            title: 'algorithm-arena-name',
            selected: ({ type }) => type === 'arena',
            onclick: () => {
                teams.type = 'arena';
                return false;
            },
            split: 2,
        },
    ]
};

const Teams = {
    view(ctrl, args) {

        return (
            <div class="teams">
                <Message value={ `${ 0 } ${ lang.get('teams') }` } />
                <div class="clear"></div>
            </div>
        );
    }
}

export { tab, menu };
export default Teams;
