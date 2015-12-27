import app from '../src/service/app';
import { idMap as championsById } from '../src/data/champions';
import { synergiesFromChampions } from '../src/data/synergies';
import App from '../src/view/App.jsx';
import GuideEditMenu from '../src/view/App/GuideEditMenu.jsx';
import GuideMenu from '../src/view/App/GuideMenu.jsx';
import RosterAddMenu from '../src/view/App/RosterAddMenu.jsx';
import RosterEditMenu from '../src/view/App/RosterEditMenu.jsx';
import RosterMenu from '../src/view/App/RosterMenu.jsx';
import SynergyMenu from '../src/view/App/SynergyMenu.jsx';
import TeamsMenu from '../src/view/App/TeamsMenu.jsx';
import TeamsSettingsMenu from '../src/view/App/TeamsSettingsMenu.jsx';
import GuideEditPage from '../src/view/App/GuideEditPage.jsx';
import GuidePage from '../src/view/App/GuidePage.jsx';
import RosterAddPage from '../src/view/App/RosterAddPage.jsx';
import RosterEditPage from '../src/view/App/RosterEditPage.jsx';
import RosterPage from '../src/view/App/RosterPage.jsx';
import SynergyPage from '../src/view/App/SynergyPage.jsx';
import TeamsPage from '../src/view/App/TeamsPage.jsx';
import TeamsSettingsPage from '../src/view/App/TeamsSettingsPage.jsx';
import Cards from '../src/view/Cards.jsx';
import Menu from '../src/view/Menu.jsx';
import MenuHeader from '../src/view/Menu/MenuHeader.jsx';
import MenuOption from '../src/view/Menu/MenuOption.jsx';
import MenuOptionGroup from '../src/view/Menu/MenuOptionGroup.jsx';
import MenuSection from '../src/view/Menu/MenuSection.jsx';
import ChampionGrade from '../src/view/Champion/ChampionGrade.jsx';
import ChampionHeader from '../src/view/Champion/ChampionHeader.jsx';
import ChampionPortrait from '../src/view/Champion/ChampionPortrait.jsx';
import ChampionRating from '../src/view/Champion/ChampionRating.jsx';
import ChampionSection from '../src/view/Champion/ChampionSection.jsx';
import ChampionTeam from '../src/view/Champion/ChampionTeam.jsx';
import Message from '../src/view/Message.jsx';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

function render(Component, args) {
    const ctrl = {};
    if(Component.controller)
        Component.controller.call(ctrl, args);
    return Component.view(ctrl, args);
}

describe('view', () => {

    describe('App', () => {
        app.edit = true;
        app.tab = 'current';
        app.tabs = [
            {
                id: 'current',
                title: 'tab',
            },
        ];
        app.pages[ 'current' ] = null;
        app.menu = null;
        app.button = null;

        it('should render without error', () => expect(render(App, {})).to.exist);

        describe('GuideEditMenu', () => it('should render without error', () => expect(render(GuideEditMenu, {})).to.exist));
        describe('GuideMenu', () => it('should render without error', () => expect(render(GuideMenu, {})).to.exist));
        describe('RosterAddMenu', () => it('should render without error', () => expect(render(RosterAddMenu, {})).to.exist));
        describe('RosterEditMenu', () => it('should render without error', () => expect(render(RosterEditMenu, {})).to.exist));
        describe('RosterMenu', () => it('should render without error', () => expect(render(RosterMenu, {})).to.exist));
        describe('SynergyMenu', () => it('should render without error', () => expect(render(SynergyMenu, {})).to.exist));
        describe('TeamsMenu', () => it('should render without error', () => expect(render(TeamsMenu, {})).to.exist));
        describe('TeamsSettingsMenu', () => it('should render without error', () => expect(render(TeamsSettingsMenu, {})).to.exist));
        describe('GuideEditPage', () => it('should render without error', () => expect(render(GuideEditPage, {})).to.exist));
        describe('GuidePage', () => it('should render without error', () => expect(render(GuidePage, {})).to.exist));
        describe('RosterAddPage', () => it('should render without error', () => expect(render(RosterAddPage, {})).to.exist));
        describe('RosterEditPage', () => it('should render without error', () => expect(render(RosterEditPage, {})).to.exist));
        describe('RosterPage', () => it('should render without error', () => expect(render(RosterPage, {})).to.exist));
        describe('SynergyPage', () => it('should render without error', () => expect(render(SynergyPage, {})).to.exist));
        describe('TeamsPage', () => it('should render without error', () => expect(render(TeamsPage, {})).to.exist));
        describe('TeamsSettingsPage', () => it('should render without error', () => expect(render(TeamsSettingsPage, {})).to.exist));
    });

    describe('Cards', () => {
        const cards = [];
        const current = 0;

        it('should render without error', () => expect(render(Cards, { cards, current })).to.exist);
    });

    describe('Menu', () => {
        const { tabs, tab, menu, button } = app;

        it('should render without error', () => expect(render(Menu, { tabs, tab, menu, button })).to.exist);

        describe('MenuHeader', () => it('should render without error', () => expect(render(MenuHeader, {})).to.exist));
        describe('MenuOption', () => it('should render without error', () => expect(render(MenuOption, {})).to.exist));
        describe('MenuOptionGroup', () => {
            const options = [];

            it('should render without error', () => expect(render(MenuOptionGroup, { options })).to.exist);
        });
        describe('MenuSection', () => it('should render without error', () => expect(render(MenuSection, {})).to.exist));
    });

    describe('Champion', () => {
        const champion = championsById[ 'thor-3' ];

        describe('ChampionGrade', () => {
            const title = 'type';
            const grade = 'a';

            it('should render without error', () => expect(render(ChampionGrade, { title, grade })).to.exist);
        });
        describe('ChampionHeader', () => it('should render without error', () => expect(render(ChampionHeader, { champion })).to.exist));
        describe('ChampionPortrait', () => it('should render without error', () => expect(render(ChampionPortrait, { champion })).to.exist));
        describe('ChampionRating', () => it('should render without error', () => expect(render(ChampionRating, {})).to.exist));
        describe('ChampionSection', () => it('should render without error', () => expect(render(ChampionSection, {})).to.exist));
        describe('ChampionTeam', () => {
            const champions = [
                championsById[ 'ultron-2' ],
                championsById[ 'antman-2' ],
                championsById[ 'yellowjacket-2' ],
            ];
            const synergies = synergiesFromChampions(champions);

            it('should render without error', () => expect(render(ChampionTeam, { champions, synergies })).to.exist);
        });
    });

    describe('Message', () => it('should render without error', () => expect(render(Message, {})).to.exist));
});
