import { requestRedraw } from './util/animation';
import './index.jsx';
import { letItSnow } from './xmas/snow';
import PACKAGE from '../package.json';

/* eslint-disable no-console */
console.info(`${ PACKAGE.description } v${ PACKAGE.version }`);
/* eslint-enable no-console */

document.addEventListener('hotreload', () => requestRedraw(), true);
window.addEventListener('resize', () => requestRedraw(10), true);

letItSnow();
