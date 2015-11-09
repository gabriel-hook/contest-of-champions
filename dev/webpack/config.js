import webpack from 'webpack';
import path from 'path';

function config(){
	return {
		entry: {
			app: ['./src/index.js'],
		},
		output: {
			path: path.resolve('./build'),
			publicPath: '/build/',
			filename: '[name].js',
		},
		module: {
			loaders: [
				// javascript and jsx
				{ 
					test: /\.jsx?$/,
					loaders: [ 'babel' ],
					exclude: /node_modules/,
				},
				// scss
				{ 
					test: /\.scss$/,
					loaders: [ 'style', 'css', 'sass' ],
					exclude: /node_modules/,
				},
			]
		},
		plugins: [

		],
	};
}

export default config();
export { config };
