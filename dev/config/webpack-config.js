import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import LodashModulePlugin from 'lodash-webpack-plugin';
import glob from 'glob';
import path from 'path';

const extractStylesPlugin = new ExtractTextPlugin('styles/[name]-[contenthash:6].css');

const championIcons = glob.sync('./src/icons/*.svg').map((filename) => filename
    .replace(/([^\/\\]+[\/\\])+/g, '')
    .replace(/\.svg$/, '')
);

export default {
    entry: {
        app: [ './src/index.js' ],
    },
    output: {
        path: path.resolve('./.build/'),
        filename: 'scripts/[name]-[hash:6].js',
    },
    module: {
        loaders: [
            // jsx
            {
                test: /\.jsx?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loaders: [ 'babel' ],
                exclude: /node_modules/,
                hot: true,
            },
            // scss
            {
                test: /\.scss(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loaders: [ 'style', 'css?sourceMap', 'autoprefixer', 'sass?sourceMap' ],
                exclude: /node_modules/,
                deploy: {
                    loaders: null,
                    loader: extractStylesPlugin.extract([ 'css?sourceMap', 'autoprefixer', 'sass?sourceMap' ]),
                },
                hot: true,
            },
            // css
            {
                test: /\.css(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loaders: [ 'style', 'css', 'autoprefixer' ],
                deploy: {
                    loaders: null,
                    loader: extractStylesPlugin.extract([ 'css?sourceMap', 'autoprefixer' ]),
                },
                hot: true,
            },
            // font definition
            {
                test: /\.font$/,
                loaders: [ 'style', 'css', 'fontgen?embed' ],
                deploy: {
                    loaders: null,
                    loader: extractStylesPlugin.extract([ 'css?sourceMap', 'fontgen?fileName=fonts/[fontname]-[hash:6][ext]' ]),
                },
                hot: true,
            },
            // fonts & svg
            {
                test: /\.(ttf|eot|svg|woff[2]?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loaders: [ 'file?limit=0&name=fonts/[name]-[hash:6].[ext]' ],
            },
            // images
            {
                test: /\.(png|jpe?g|gif)$/,
                loaders: [ 'url?limit=1000000000000' ],
            },
            // json
            {
                test: /\.json$/,
                loaders: [ 'json' ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body',
        }),
        new webpack.DefinePlugin({
            'process.env':{},
        }),
        new LodashModulePlugin(),
    ],
};
export { extractStylesPlugin, championIcons };
