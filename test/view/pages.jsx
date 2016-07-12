/* eslint-disable */
import GuideEditPage from '../../src/view/App/GuideEditPage.jsx';
import GuidePage from '../../src/view/App/GuidePage.jsx';
import LanguageEditPage from '../../src/view/App/LanguageEditPage.jsx';
import RosterAddPage from '../../src/view/App/RosterAddPage.jsx';
import RosterEditPage from '../../src/view/App/RosterEditPage.jsx';
import RosterPage from '../../src/view/App/RosterPage.jsx';
import SynergyPage from '../../src/view/App/SynergyPage.jsx';
import TeamsPage from '../../src/view/App/TeamsPage.jsx';
import TeamsEditPage from '../../src/view/App/TeamsEditPage.jsx';
import TeamsSettingsPage from '../../src/view/App/TeamsSettingsPage.jsx';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */
import { renderToDocument as render } from '../../src/util/test';
import roster from '../../src/service/roster';

roster.clear();

describe('view/pages/', () => {

    describe('<GuideEditPage/>', () => it('should render without error', () => expect(render(<GuideEditPage />)).to.exist));
    describe('<GuidePage/>', () => it('should render without error', () => expect(render(<GuidePage />)).to.exist));
    describe('<LanguageEditPage/>', () => it('should render without error', () => expect(render(<LanguageEditPage langId="en" />)).to.exist));
    describe('<RosterAddPage/>', () => {
        it('should render without error for 1 star', () => expect(render(<RosterAddPage stars={ 1 } />)).to.exist);
        it('should render without error for 2 star', () => expect(render(<RosterAddPage stars={ 2 } />)).to.exist);
        it('should render without error for 3 star', () => expect(render(<RosterAddPage stars={ 3 } />)).to.exist);
        it('should render without error for 4 star', () => expect(render(<RosterAddPage stars={ 4 } />)).to.exist);
        it('should render without error for 5 star', () => expect(render(<RosterAddPage stars={ 5 } />)).to.exist);
    });
    describe('<RosterEditPage/>', () => it('should render without error', () => expect(render(<RosterEditPage />)).to.exist));
    describe('<RosterPage/>', () => it('should render without error', () => expect(render(<RosterPage />)).to.exist));
    describe('<SynergyPage/>', () => it('should render without error', () => expect(render(<SynergyPage />)).to.exist));
    describe('<TeamsPage/>', () => it('should render without error', () => expect(render(<TeamsPage />)).to.exist));
    describe('<TeamsEditPage/>', () => it('should render without error', () => expect(render(<TeamsEditPage />)).to.exist));
    describe('<TeamsSettingsPage/>', () => it('should render without error', () => expect(render(<TeamsSettingsPage />)).to.exist));
});
