/*
 * @Author: Orcas
 * @Date: 2021-01-18
 * @LastEditTime: 2020-06-04 14:46:53
 */

const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { config } = require('./config');
const common = require('./webpack.common');
//  使用node。js的导出，将配置进行导出
module.exports = merge([
  common(true),
  {
    mode: 'development',

    // //  监听文件变化
    // watch: true,
    // //  监听选项
    // watchOptions: {
    //   //  忽略某些目录  可以为正则或者数组
    //   ignored: /node_modules/,
    //   //  启动轮询， 默认为false  设置true或毫秒数来启动轮询
    //   poll: false
    // }
    devServer:{
      contentBase: path.join(__dirname, 'build'),
      compress: true,
      port: 9000
    }

  }
])
