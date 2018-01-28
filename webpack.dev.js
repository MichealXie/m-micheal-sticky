const merge = require('webpack-merge');
const common = require('./webpack.common.js')

module.exports = merge(common,{
	devtool: 'inline-source-map',
	// 如果想修改 webpack-dev-server 配置，在这个对象里面修改
	devServer: {
		port: 8081
	},
	plugins: [
		
	]
})