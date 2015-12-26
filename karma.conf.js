require('babel-register');

module.exports = function(config) {
    config.set(require('./dev/config/karma-config').default);
};
