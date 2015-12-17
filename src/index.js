import { requestRedraw } from './util/animation';
import './index.jsx';
import PACKAGE from '../package.json';

/* eslint-disable no-console */
console.info(`Contest of Champions Companion App v${ PACKAGE.version }`);
/* eslint-enable no-console */

document.addEventListener('hotreload', () => requestRedraw(), true);
window.addEventListener('resize', () => requestRedraw(), true);
