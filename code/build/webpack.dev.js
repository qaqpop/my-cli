/*
 * @Author: Orcas
 * @Date: 2021-01-18
 * @LastEditTime: 2020-06-04 14:46:53
 */

const merge = require('webpack-merge');
const common = require('./webpack-common');
//  使用node。js的导出，将配置进行导出
module.exports = merge(common(true), {
  mode:'development',
})
