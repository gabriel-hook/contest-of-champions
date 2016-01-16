import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from '../config/webpack-config.js';

gulp.task('develop', (callback) => {
    const domain = 'localhost';
    const port = 8080;
    const config = {
        ...webpackConfig,
        entry: ((entry) => {
            const hotEntry = {};
            for(const key in entry) {
                hotEntry[ key ] = [
                    `webpack-dev-server/client?http://${ domain }:${ port }`,
                    'webpack/hot/only-dev-server',
                    ...entry[ key ],
                ];
            }
            return hotEntry;
        })(webpackConfig.entry),
        module: {
            ...webpackConfig.module,
            loaders: webpackConfig.module.loaders.map((loader) => (!loader.hot)? loader: {
                ...loader,
                loaders: [
                    'simple-hot',
                    ...loader.loaders,
                ],
            }),
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            ...webpackConfig.plugins || [],
        ],
        devtool: '#eval-source-map',
    };
    const compiler = webpack(config);
    const server = new WebpackDevServer(compiler, {
        contentBase: './src',
        hot: true,
        inline: true,
        headers: { 'Access-Control-Allow-Origin': '*' },
        historyApiFallback: true,
        stats: {
            colors: true,
            assets: false,
            cached: false,
            cachedAssets: false,
            chunks: false,
        },
    });
    server.listen(port, domain, (err) => {
        if (err) {
            callback();
            throw new gutil.PluginError('webpack-dev-server', err);
        }
        gutil.log('[webpack-dev-server]', `http://${ domain }:${ port }/index.html`);
    });
});

gulp.task('webpack', (callback) => {
    const config = {
        ...webpackConfig,
        plugins: [
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({ minimize: true }),
            ...webpackConfig.plugins || [],
        ],
        devtool: '#source-map',
    };
    webpack(config, (err) => {
        if(err)
            throw new gutil.PluginError('webpack', err);
        callback();
    });
});
