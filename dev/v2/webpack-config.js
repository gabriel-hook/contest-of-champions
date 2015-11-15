import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

function config() {
    return {
        entry: {
            app: [ './v2/index.jsx' ],
        },
        output: {
            path: path.resolve('./.build/v2/'),
            filename: '[name]-[hash].js',
        },
        module: {
            loaders: [
                // javascript and jsx
                {
                    test: /\.jsx?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loaders: [ 'babel' ],
                    exclude: /node_modules/,
                },
                // scss
                {
                    test: /\.scss(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loaders: [ 'style', 'css', 'sass' ],
                    exclude: /node_modules/,
                },
                // fonts & svg
                {
                    test: /\.(ttf|eot|svg|woff[2]?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loaders: [ 'file?name=fonts/[name].[ext]&limit=0' ],
                },
                // fonts & svg
                {
                    test: /\.json$/,
                    loaders: [ 'json' ],
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Champions',
            }),
        ],
    };
}

export default config();
export { config };
