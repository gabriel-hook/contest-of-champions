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

describe('view', () => {

    describe('App', () => {
        it('should render without error', () => expect(<App />).to.exist);

        describe('GuideEditMenu', () => it('should render without error', () => expect(<GuideEditMenu />).to.exist));
        describe('GuideMenu', () => it('should render without error', () => expect(<GuideMenu />).to.exist));
        describe('RosterAddMenu', () => it('should render without error', () => expect(<RosterAddMenu />).to.exist));
        describe('RosterEditMenu', () => it('should render without error', () => expect(<RosterEditMenu />).to.exist));
        describe('RosterMenu', () => it('should render without error', () => expect(<RosterMenu />).to.exist));
        describe('SynergyMenu', () => it('should render without error', () => expect(<SynergyMenu />).to.exist));
        describe('TeamsMenu', () => it('should render without error', () => expect(<TeamsMenu />).to.exist));
        describe('TeamsSettingsMenu', () => it('should render without error', () => expect(<TeamsSettingsMenu />).to.exist));
        describe('GuideEditPage', () => it('should render without error', () => expect(<GuideEditPage />).to.exist));
        describe('GuidePage', () => it('should render without error', () => expect(<GuidePage />).to.exist));
        describe('RosterAddPage', () => it('should render without error', () => expect(<RosterAddPage />).to.exist));
        describe('RosterEditPage', () => it('should render without error', () => expect(<RosterEditPage />).to.exist));
        describe('RosterPage', () => it('should render without error', () => expect(<RosterPage />).to.exist));
        describe('SynergyPage', () => it('should render without error', () => expect(<SynergyPage />).to.exist));
        describe('TeamsPage', () => it('should render without error', () => expect(<TeamsPage />).to.exist));
        describe('TeamsSettingsPage', () => it('should render without error', () => expect(<TeamsSettingsPage />).to.exist));
    });

    describe('Cards', () => it('should render without error', () => expect(<Cards />).to.exist));

    describe('Menu', () => {
        it('should render without error', () => expect(<Menu />).to.exist);

        describe('MenuHeader', () => it('should render without error', () => expect(<MenuHeader />).to.exist));
        describe('MenuOption', () => it('should render without error', () => expect(<MenuOption />).to.exist));
        describe('MenuOptionGroup', () => it('should render without error', () => expect(<MenuOptionGroup />).to.exist));
        describe('MenuSection', () => it('should render without error', () => expect(<MenuSection />).to.exist));
    });

    describe('Champion', () => {
        describe('ChampionGrade', () => it('should render without error', () => expect(<ChampionGrade />).to.exist));
        describe('ChampionHeader', () => it('should render without error', () => expect(<ChampionHeader />).to.exist));
        describe('ChampionPortrait', () => it('should render without error', () => expect(<ChampionPortrait />).to.exist));
        describe('ChampionRating', () => it('should render without error', () => expect(<ChampionRating />).to.exist));
        describe('ChampionSection', () => it('should render without error', () => expect(<ChampionSection />).to.exist));
        describe('ChampionTeam', () => it('should render without error', () => expect(<ChampionTeam />).to.exist));
    });

    describe('Message', () => it('should render without error', () => expect(<Message />).to.exist));
});
