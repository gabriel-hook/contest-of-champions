import './App.scss';
import classNames from 'classnames';
import app from '../service/app';
import teams from '../service/teams';
import Menu from './Menu.jsx';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

function addRawHTML(element, isInitialized) {
    if(!isInitialized) {
        element.innerHTML = `
            <span class="champion-icon champion-icon-app-icon"></span>
            <span class="fa fa-asterisk"></span>
            <iframe id="io-exporter"></iframe>
            <svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg">
                <symbol id="portrait-placeholder">
                    <path
                        fill="#909090"
                        d="M 3.5709275,215.81378 C 3.7352275,204.03019 3.8497975,199.05392 3.5005675,183.77748 C 11.214111,174.15409 38.3674,169.74066 45.785393,167.0981 C 55.358378,159.98075 66.203698,153.92378 75.552667,148.56151 C 80.7154,145.60034 80.782546,135.45005 80.404668,128.63362 C 78.689369,118.98009 77.782686,110.65561 70.86354,103.56735 C 70.47649,101.54341 69.346365,96.899211 65.948685,90.832271 C 63.662168,80.636072 54.650066,68.010083 56.914311,61.532735 C 62.944238,44.282973 57.676043,37.272904 61.378834,35.798494 C 69.823479,32.435953 72.10706,25.082426 79.841538,17.698566 C 102.43887,13.411138 98.965362,1.9932189 115.84961,4.1987589 C 136.77696,6.9324259 125.2515,10.014792 139.60507,17.279644 C 157.23926,26.204921 146.73196,27.108963 162.83032,50.739759 C 172.38972,64.771999 153.76819,65.728581 158.59298,78.146165 C 163.04993,89.617072 152.54354,91.572613 147.24294,104.12579 C 142.15767,116.16899 138.96668,119.70997 144.82195,135.58386 C 150.25927,150.32462 159.28667,143.58938 179.677,165.66778 C 184.85448,171.27389 203.45549,164.48784 216.26305,180.85898 C 216.25506,189.25148 216.44185,198.19473 216.49943,216.08121 C 159.09474,215.87646 3.5709275,215.81378 3.5709275,215.81378 z "
                    />
                </symbol>
            </svg>
        `;
    }
}

const App = {
    view() {
        const { tabs, tab, pages, menu, button } = app;
        const { progress } = teams;
        const currentPage = tab;
        return (
            <div m="App" class="app">
                <div class="pages">
                    {tabs.map((tab) => (
                        <div class={ classNames('page', { 'page--current': currentPage === tab.id }) } key={ tab.id }>
                            { (currentPage === tab.id)? pages[ tab.id ]: { subtree: 'retain' } }
                        </div>
                    ))}
                </div>
                <Menu tabs={ tabs } tab={ tab } menu={ menu } button={ button } />
                <div class="app-building">
                    <div
                        class="app-building--progress"
                        style={ `width: ${ Math.max(0, Math.min(100, 100 * progress)) }%; transition: ${ (progress <= 0)? 'none': 'width .3s linear' };` }
                    />
                </div>
                <div class="raw-html" config={ addRawHTML } />
            </div>
        );
    },
};

export default App;
