import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from '../config/webpack-config.js';

const DEVELOPMENT = gutil.env.dev;

gulp.task('dev', (callback) => {
    const domain = 'localhost';
    const port = 8080;
    const config = {
        ...webpackConfig,
        entry: ((entry) => {
            const hotEntry = {};
            for(const key in entry) {
                hotEntry[ key ] = [
                    `webpack-dev-server/client?http://${ domain }:${ port }`, 'webpack/hot/only-dev-server',
                    ...entry[ key ],
                ];
            }
            return hotEntry;
        })(webpackConfig.entry),
        module: {
            ...webpackConfig.module,
            loaders: webpackConfig.module.loaders.map((loader) => {
                if(loader.hot) {
                    return {
                        ...loader,
                        loaders: [
                            'simple-hot',
                            ...loader.loaders,
                        ],
                    };
                }
                return loader;
            }),
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            ...webpackConfig.plugins || [],
        ],
        devtool: 'eval',
    };

    const compiler = webpack(config);
    const server = new WebpackDevServer(compiler, {
        contentBase: './src',
        hot: true,
        inline: true,
        headers: { 'Access-Control-Allow-Origin': '*' },
        historyApiFallback: true,
    });
    server.listen(port, domain, (err) => {
        if (err)
            throw new gutil.PluginError('webpack-dev-server', err);
        gutil.log('[webpack-dev-server]', `http://${ domain }:${ port }/webpack-dev-server/index.html`);
        callback();
    });
});

gulp.task('webpack', (callback) => {
    const config = {
        ...webpackConfig,
        plugins: [
            ...(DEVELOPMENT)? []: [
                new webpack.optimize.DedupePlugin(),
                new webpack.optimize.UglifyJsPlugin(),
            ],
            ...webpackConfig.plugins || [],
        ],
        devtool: '#sourcemaps',
    };
    webpack(config, (err) => {
        if(err)
            throw new gutil.PluginError('webpack', err);
        callback();
    });
});
