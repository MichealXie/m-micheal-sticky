const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')



function resolve(dir) {
	return path.join(__dirname, dir)
}


module.exports = {
	entry: {
		bundle: './src/main.js',
		vendor: ["axios", "vue", "vue-router", "vuex"]
	},
	output: {
		path: path.join(__dirname, 'dist'),
		// chunkhash 在 dev 会出错, prodution 的时候改回来就好
		// publicPath: './', 
		filename: '[name].[hash].js'
	},
	resolve: {
		// 文件扩展名，写明以后就不需要每个文件写后缀
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'@': resolve('src'),
			// 不加会报: You are using the runtime-only build of Vue where the template compiler is not available
			'vue$': 'vue/dist/vue.esm.js',
		}
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						stylus: ExtractTextPlugin.extract({
							use: ['css-loader', 'stylus-loader'],
							fallback: 'vue-style-loader'
						})
					}
				}
			},
			// {
			// 	test: /\.tsx?$/,
			// 	loader: 'ts-loader',
			// 	exclude: /node_modules/,
			// 	options: {
			// 		appendTsSuffixTo: [/\.vue$/]
			// 	}
			// },
			// TS 自带 bable
			{
				test: /\.js$/,
				use: 'babel-loader',
				include: [resolve('src')]
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 10000,
						name: 'images/[name].[hash:7].[ext]'
					}
				}]
			},
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: ['vendor', 'manifest'],
			minChunks: Infinity
		}),
		new CleanWebpackPlugin(['dist/*.js', 'dist/css/*.css'], {
			verbose: true,
			dry: false
		}),
		new HtmlWebpackPlugin({
			template: 'index.html',
		}),

		new ExtractTextPlugin("css/[name].[contenthash].css"),
		// HMR 开启 css 代码分离后想要 CSS 热更新的代价
		new webpack.HotModuleReplacementPlugin(),
	]
};