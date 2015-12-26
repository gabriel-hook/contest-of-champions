import App from '../src/view/App.jsx';
import Cards from '../src/view/Cards.jsx';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

describe('view', () => {

    describe('App', () => it('should render without error', () => expect(<App />).to.exist));
    describe('Cards', () => it('should render without error', () => expect(<Cards />).to.exist));
    describe('Menu', () => it('should render without error', () => expect(<Menu />).to.exist));

});
