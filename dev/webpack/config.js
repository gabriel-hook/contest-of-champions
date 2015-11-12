import webpack from 'webpack';
import path from 'path';

function config(){
	return {
		entry: {
			app: ['./src/index.js'],
		},
		output: {
			path: path.resolve('./build/'),
			publicPath: 'build/',
			filename: '[name].js',
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
			]
		},
		plugins: [
			//fill these in programmatically
		],
	};
}

export default config();
export { config };
