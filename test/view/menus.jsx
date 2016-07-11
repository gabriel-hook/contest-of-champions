import GuideEditMenu from '../../src/view/App/GuideEditMenu.jsx';
import GuideMenu from '../../src/view/App/GuideMenu.jsx';
import LanguageEditMenu from '../../src/view/App/LanguageEditMenu.jsx';
import RosterAddMenu from '../../src/view/App/RosterAddMenu.jsx';
import RosterEditMenu from '../../src/view/App/RosterEditMenu.jsx';
import RosterMenu from '../../src/view/App/RosterMenu.jsx';
import SynergyMenu from '../../src/view/App/SynergyMenu.jsx';
import TeamsMenu from '../../src/view/App/TeamsMenu.jsx';
import TeamsSettingsMenu from '../../src/view/App/TeamsSettingsMenu.jsx';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */
import { renderToDocument as render } from '../../src/util/test';
import roster from '../../src/service/roster';

roster.clear();

describe('view/menus/', () => {

    describe('<GuideEditMenu/>', () => it('should render without error', () => expect(render(<GuideEditMenu uid="blackbolt" />)).to.exist));
    describe('<GuideMenu/>', () => it('should render without error', () => expect(render(<GuideMenu />)).to.exist));
    describe('<LanguageEditMenu/>', () => it('should render without error', () => expect(render(<LanguageEditMenu />)).to.exist));
    describe('<RosterAddMenu/>', () => it('should render without error', () => expect(render(<RosterAddMenu />)).to.exist));
    describe('<RosterEditMenu/>', () => it('should render without error', () => expect(render(<RosterEditMenu />)).to.exist));
    describe('<RosterMenu/>', () => it('should render without error', () => expect(render(<RosterMenu />)).to.exist));
    describe('<SynergyMenu/>', () => it('should render without error', () => expect(render(<SynergyMenu />)).to.exist));
    describe('<TeamsMenu/>', () => it('should render without error', () => expect(render(<TeamsMenu />)).to.exist));
    describe('<TeamsSettingsMenu/>', () => it('should render without error', () => expect(render(<TeamsSettingsMenu />)).to.exist));
});
