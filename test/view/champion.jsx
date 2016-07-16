import { championMap } from '../../src/data/champions';
import { synergiesFromChampions } from '../../src/data/synergies';
import ChampionGrade from '../../src/view/Champion/ChampionGrade.jsx';
import ChampionHeader from '../../src/view/Champion/ChampionHeader.jsx';
import ChampionPortrait from '../../src/view/Champion/ChampionPortrait.jsx';
import ChampionRating from '../../src/view/Champion/ChampionRating.jsx';
import ChampionSection from '../../src/view/Champion/ChampionSection.jsx';
import ChampionTeam from '../../src/view/Champion/ChampionTeam.jsx';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */
import { renderToDocument as render } from '../../src/util/test';
import roster from '../../src/service/roster';

roster.clear();

describe('view/champion/', () => {

    const champion = championMap[ 'thor-3' ];
    describe('<ChampionGrade/>', () => {
        const title = 'type';
        const grade = 'a';

        it('should render without error', () => expect(render(<ChampionGrade { ...{ title, grade } } />)).to.exist);
    });
    describe('<ChampionHeader/>', () => it('should render without error', () => expect(render(<ChampionHeader champion={ champion } />)).to.exist));
    describe('<ChampionPortrait/>', () => it('should render without error', () => expect(render(<ChampionPortrait champion={ champion } />)).to.exist));
    describe('<ChampionRating/>', () => it('should render without error', () => expect(render(<ChampionRating />)).to.exist));
    describe('<ChampionSection/>', () => it('should render without error', () => expect(render(<ChampionSection />)).to.exist));
    describe('<ChampionTeam/>', () => {
        const champions = [
            championMap[ 'ultron-2' ],
            championMap[ 'antman-2' ],
            championMap[ 'yellowjacket-2' ],
        ];
        const synergies = synergiesFromChampions(champions);

        it('should render without error', () => expect(render(<ChampionTeam { ...{ champions, synergies } } />)).to.exist);
    });
});
