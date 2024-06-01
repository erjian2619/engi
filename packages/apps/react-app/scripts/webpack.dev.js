const baseConfig = require('./webpack.base')
const {merge} = require('webpack-merge')
const path = require('path')

module.exports = merge(baseConfig(true),{
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    port: 3000,
    compress: false,// 不压缩，热更新快
    hot: true,
    historyApiFallback: true, // history 路由 404 问题
    // static: {
    //   // 托管的静态 public 文件夹
    //   // directory: path.join(__dirname, '../src')
    // }
  }
})