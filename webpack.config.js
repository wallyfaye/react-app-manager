const webpack = require('webpack');
const path = require('path');

module.exports = [
	{
		watch: false,
		entry: ["./scripts/main.js"], 
		output: {
			path: path.resolve('./data'), 
			filename: "bundle.js"
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify('production')
				}
			}),
			new webpack.optimize.UglifyJsPlugin()
		],
		module: {
			rules: [{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: [{
					loader: 'babel-loader',
					options: {
						presets: [
							['es2015', {modules: false}],
							['react']
						],
						plugins: [
							'syntax-dynamic-import',
							'transform-class-properties',
							'transform-object-rest-spread'
						]
					}
				}]
			}]
		}
	}
]