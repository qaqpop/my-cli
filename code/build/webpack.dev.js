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

    devServer: {
      compress: true,
      //  服务器启动的端口号
      port: 7777,

      a:1

    }
  }
])
