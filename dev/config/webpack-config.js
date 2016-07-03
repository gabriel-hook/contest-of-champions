import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';

const extractStylesPlugin = new ExtractTextPlugin('style-[contenthash:8].css');

export default {
    entry: {
        app: [ './src/index.js' ],
    },
    output: {
        path: path.resolve('./.build/'),
        filename: '[name]-[hash:8].js',
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
            // fonts & svg
            {
                test: /\.(ttf|eot|svg|woff[2]?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loaders: [ 'file?name=fonts/[name].[ext]&limit=0' ],
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
    ],
};
export { extractStylesPlugin };
