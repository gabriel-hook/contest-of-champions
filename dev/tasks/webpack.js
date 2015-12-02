import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { config } from '../webpack/webpack-config.js';

const DEVELOPMENT = gutil.env.dev;

gulp.task('dev', (callback) => {
    const domain = 'localhost';
    const port = 8080;
    const devConfig = config();
    for (const key in devConfig.entry)
        devConfig.entry[ key ].unshift(`webpack-dev-server/client?http://${ domain }:${ port }`, 'webpack/hot/only-dev-server');
    for (const key in devConfig.module.loaders)
        if(devConfig.module.loaders[ key ].hot)
            devConfig.module.loaders[ key ].loaders.unshift('simple-hot');
    devConfig.plugins.unshift(new webpack.HotModuleReplacementPlugin());
    devConfig.devtool = 'eval';
    const compiler = webpack(devConfig);
    const server = new WebpackDevServer(compiler, {
        contentBase: './source',
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
    const buildConfig = config();

    if(!DEVELOPMENT) {
        buildConfig.plugins.unshift(
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin()
        );
    }

    buildConfig.devtool = '#sourcemaps';
    webpack(buildConfig, (err) => {
        if(err)
            throw new gutil.PluginError('webpack', err);
        callback();
    });
});
