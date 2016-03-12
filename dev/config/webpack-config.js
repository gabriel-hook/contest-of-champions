import HtmlWebpackPlugin from 'html-webpack-plugin';
//import ExtractTextPlugin from 'extract-text-webpack-plugin';
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
                hot: true,
            },
            // javascript
            {
                test: /\.js(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loaders: [ 'babel' ],
                exclude: /node_modules/,
                hot: true,
            },
            // scss
            {
                test: /\.scss(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loaders: [ 'style', 'css', 'autoprefixer', 'sass' ],
                exclude: /node_modules/,
                hot: true,
            },
            // css
            {
                test: /\.css(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loaders: [ 'style', 'css', 'autoprefixer' ],
                exclude: /node_modules/,
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
    //    new ExtractTextPlugin('style-[contenthash].css'),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body',
        }),
    ],
};
