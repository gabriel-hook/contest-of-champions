require('babel-register');
require('babel-polyfill/dist/polyfill.js');

/* eslint-disable */
var AbstractBrowser = require('mock-browser').delegates.AbstractBrowser;
var browser = new AbstractBrowser({});
global.document = browser.getDocument();
global.window = browser.getWindow();
global.location = browser.getLocation();
global.navigator = browser.getNavigator();
global.history = browser.getHistory();
global.localStorage = browser.getLocalStorage();
global.sessionStorage = browser.getSessionStorage();
/* eslint-enable */

require('./test/service/roster.js');
require('./test/service/teams.js');
