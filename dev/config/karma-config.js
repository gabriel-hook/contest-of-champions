import webpackConfig from './webpack-config';

export default function(config) {
    config.set({
        singleRun: true,
        browsers: config.browsers && config.browsers.length && config.browsers || [ 'PhantomJS2' ],
        // karma only needs to know about the test bundle
        files: [
            { pattern: './node_modules/babel-polyfill/dist/polyfill.js', watched: false, included: true, served: true },
            { pattern: './src/images/**/*', watched: false, included: false, served: true },
            config.file || './test/**/*.js*',
        ],
        proxies: {
            '/images/': '/base/src/images/',
        },
        frameworks: [ 'chai', 'mocha' ],
        // run the bundle through the webpack and sourcemap plugins
        preprocessors: {
            './test/**/*.js*': [ 'webpack', 'sourcemap' ],
        },
        // reporter options
        reporters: [ 'mocha' ],
        mochaReporter: {
            colors: {
                success: 'green',
                info: 'grey',
                warning: 'yellow',
                error: 'red',
            },
        },
        // webpack config object
        webpack: {
            ...webpackConfig,
            devtool: 'inline-source-map',
        },
        webpackMiddleware: {
            noInfo: true,
        },
        phantomjsLauncher: {
            exitOnResourceError: true,
        },
        plugins: [
            'karma-phantomjs2-launcher',
            'karma-mocha-reporter',
            'karma-chai',
            'karma-mocha',
            'karma-sourcemap-loader',
            'karma-webpack',
        ],
        logLevel: config.LOG_WARN,
    });
}
