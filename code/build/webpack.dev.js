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

    devServer:{
      //  开启服务器端口号，默认为8080
      port: 7777,
      contentBase: path.resolve(__dirname, 'dist'),
      //  是否打开浏览器
      //  默认为false，如果设置为true， 启动时会自欧东打开浏览器
      open: true,
      transportMode:{
        //  长链接服务类型， 值为 sockjs或者ws
        //  sockjs 使用的sockjs库
        //  ws 使用的ws库
        //  默认为sockjs   webpack-dev-server@3.X ws不可用
         server: 'sockjs'
      }
    }
  }
])
