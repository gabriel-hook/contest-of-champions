import app from '../../src/service/app';
import App from '../../src/view/App.jsx';
import Slides from '../../src/view/Slides.jsx';
import Menu from '../../src/view/Menu.jsx';
import MenuHeader from '../../src/view/Menu/MenuHeader.jsx';
import MenuOption from '../../src/view/Menu/MenuOption.jsx';
import MenuOptionGroup from '../../src/view/Menu/MenuOptionGroup.jsx';
import MenuSection from '../../src/view/Menu/MenuSection.jsx';
import Message from '../../src/view/Message.jsx';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */
import { renderToDocument as render } from '../../src/util/test';
import roster from '../../src/service/roster';

roster.clear();

describe('view/', () => {

    describe('<App/>', () => {
        app.edit = true;
        app.tab = 'champions';
        app.tabs = [
            {
                id: 'champions',
                title: 'champions',
                icon: 'user',
            },
        ];
        app.pages[ 'champions' ] = null;
        app.menu = {
            view() {
                return (
                    <div />
                );
            },
        };
        app.button = null;

        it('should render without error', () => expect(render(<App />)).to.exist);
    });

    describe('<Slides/>', () => {
        const slides = [];
        const current = 0;

        it('should render without error', () => expect(render(<Slides { ...{ slides, current } } />)).to.exist);
    });

    describe('<Menu/>', () => {
        const { tabs, tab, menu, button } = app;
        it('should render without error', () => expect(render(<Menu { ...{ tabs, tab, menu, button } } />)).to.exist);
    });
    describe('<MenuHeader/>', () => it('should render without error', () => expect(render(<MenuHeader />)).to.exist));
    describe('<MenuOption/>', () => it('should render without error', () => expect(render(<MenuOption />)).to.exist));
    describe('<MenuOptionGroup/>', () => {
        const options = [];

        it('should render without error', () => expect(render(<MenuOptionGroup { ...{ options } } />)).to.exist);
    });
    describe('<MenuSection/>', () => it('should render without error', () => expect(render(<MenuSection />)).to.exist));

    describe('<Message/>', () => it('should render without error', () => expect(render(<Message />)).to.exist));
});
