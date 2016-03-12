import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';

export default {
    entry: {
        app: [ './src/index.js' ],
    },
    output: {
        path: path.resolve('./.build/'),
        filename: '[name]-[hash].js',
    },
    module: {
        loaders: [
            // jsx
            {
                test: /\.jsx(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loaders: [ 'babel' ],
                exclude: /node_modules/,
                hot: {
                    test: /\.jsx(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loaders: [ 'babel' ],
                    exclude: /node_modules/,
                },
            },
            // javascript
            {
                test: /\.js(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loaders: [ 'babel' ],
                exclude: /node_modules/,
            },
            // scss
            {
                test: /\.scss(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?autoprefixer&sourceMap|sass-loader'),
                exclude: /node_modules/,
                hot: {
                    test: /\.scss(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loaders: [ 'style', 'css', 'autoprefixer', 'sass' ],
                    exclude: /node_modules/,
                },
                karma: true,
            },
            // css
            {
                test: /\.css(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?autoprefixer&sourceMap'),
                exclude: /node_modules/,
                hot: {
                    test: /\.css(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loaders: [ 'style', 'css' ],
                    exclude: /node_modules/,
                },
                karma: true,
            },
            // fonts & svg
            {
                test: /\.(ttf|eot|svg|woff[2]?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loaders: [ 'file?name=fonts/[name].[ext]&limit=0' ],
                karma: true,
            },
            // json
            {
                test: /\.json$/,
                loaders: [ 'json' ],
            },
        ],
    },
    plugins: [
        new ExtractTextPlugin('style-[contenthash].css'),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body',
        }),
    ],
};
