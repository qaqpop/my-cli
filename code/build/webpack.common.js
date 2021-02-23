const path = require('path')
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//	引用config对象，因导出时为 module.exports.config 所以在此使用 { config }导入
const { config }  = require('./config');

//  isDev  boolean

//  使用node。js的导出，将配置进行导出
module.exports =  (isDev) => {
//  当前模式是否为dev模式，使用此属性来做一个简单显示判断
  isDev = isDev === undefined ? true : isDev;

  return {

    entry: path.join(config.root, 'src/index.js'),
    // 根据isDev参数判断是否缓存JS
    output: {
      //  出口文件的目录地址
      path: path.join(config.root, 'dist'),
      //  出口文件名称，contenthash代表一种缓存，只有文件更改才会更新hash值，重新打包
      filename: `[name]${isDev ? '' : '_[contenthash]'}.js`,
    },

    //devtool:false, //'eval'

    module: {
      rules: [
        {
          //  所有的.js文件都走babel-loader
          test: /\.js(x?)$/,
          include: path.join(config.root, 'src'),
          loader: "babel-loader"
        },
        {
          //  所有的.js文件都走babel-loader
          test: /\.png$/,
          loader: "file-loader"
        },
        {
          //  解析.css文件
          test: /\.css$/i,
          use: [
            {
              loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../',
              }
            },
            {
              loader:  'css-loader',
              options: {
                // 是否解析  url/image-set 文件路径
                // 党true时,会将相对路径的文件地址进行解析   url(yj.png) -> url(./yj.png)
                //  默认为true,
                url: true,

                //  是否解析 @import 文件路径
                //  当为true时,会将@import导入的css地址进行解析   @import 'app2.css' -> @import './app2.css'
                //  默认为true,
                import: true,

                //  是否使用 ES modules ,默认为true
                //  也可以设置为false 使用 common module
                esModule: true,

                //  是否显示映射信息,默认使用的webpack devtool属性
                // sourceMap: true

                //  使用@import之前应该应用多少loader
                //  默认为0
                //https://zhuanlan.zhihu.com/p/94706976
                importLoaders: 2,

                //  是否使用css-module
                //  属性值可以为 boolean | local | global| object
                //  当属性值为 true 或 local 时代表使用 css-module
                //  当属性值为 false 或 global 时代表不使用css-module
                //  object可以深度自定义
                //  默认情况下当css文件名称以 module.css结尾，则代表时css-module
                modules: {
                  //  控制CSS编译级别
                  //  module | icss 默认为 module
                  compileType: 'module',

                  //   哪些文件允许CSS Modules
                  //  RegExp | boolean | path => boolean
                  //  默认为true， 当为true时，使用 /\.module\.\w+$/i 正则匹配
                  auto: /\.module\.\w+$/i,

                  //  生成的本地标识名称
                  //  默认为[hash:base64]
                  localIdentName: '[path][name]__[local]--[hash:base64:5]',

                  //  设置生成本地标识名时的基本加载程序上下文，默认为项目根目录
                  localIdentContext: path.join(config.root, 'src'),

                  //  asIs: 原始名称导出
                  //  camelCase: 按照驼峰命名方式导出,但是不删除原始名称     驼峰+原始名称
                  //  camelCaseOnly: 按照驼峰命名导出,删除原始名称          驼峰
                  //  dashes: 只有“-”连接符被转换为驼峰方式.    不删除原始名称
                  //  dashesOnly: 只有“-”连接符被转换为驼峰方式.    删除原始名称
                  exportLocalsConvention: "camelCase",

                  //  指定函数生成类名,其优先级高于localIdentName
                  // getLocalIdent: (context, localIdentName, localName, options) => {
                  //   return "whatever_random_class_name";
                  // },
                },
              }
            }
          ],
        },
      ]
    },

    optimization: {
      // 根据当前模式进行判断是否需要压缩
      minimize: !isDev,
      minimizer: [
        new TerserPlugin({
          //  包含哪些文件
          include: /\.js(\?.*)?$/i,
          // //  排除哪些文件
          // exclude:/\.js(\?.*)?$/i,
          //  多进程并行运行，默认为true，开启，默认并发数量为os.cpus()-1
          //  可以设置为false(不使用多线程)或者数值（并发数量）
          parallel: true,

          //  可以设置一个function，使用其它压缩插件覆盖默认的压缩插件，默认为undefined，
          minify: undefined,

          terserOptions: {
            // //  是否防止篡改函数名称，true代表防止篡改，即保留函数名称，false即可以篡改，
            // //  此属性对使用Function.prototype.name
            // //  默认为false
            keep_fnames: false,
            // //  是否防止篡改类名称
            keep_classnames: false,
            // //  设置一些其它的解析
            parse: {},
            //  最小化es6模块。默认为false
            module: true,
            //  ·压缩配置

            //  format和output是同一个属性值，，名称不一致，output不建议使用了，被放弃
            format: {
              comments: false,
            },
            //  是否支持IE8，默认不支持
            ie8: false,
            compress: {
              // 是否使用默认设置，这个属性当只启用指定某些选项时可以设置为false
              defaults: false,
              //  是否移除无法访问的代码
              dead_code: false,

              // 折叠仅仅使用一次的变量
              collapse_vars: true,
              warnings: true,
              //  是否删除所有 console.*语句，默认为false，这个可以在线上设置为true
              //  是否删除所有debugger语句，默认为true
              drop_debugger: true,
              //  移除指定func，这个属性假定函数没有任何副作用，可以使用此属性移除所有指定func
              // pure_funcs: ['console.log'], //移除console
            },
          },
          //  是否将注释提出到单独的文件中
          //  值Boolean|String|RegExp|Function<(node, comment) -> Boolean|Object>|Object
          //  默认为true， 只提取/^\**!|@preserve|@license|@cc_on/i注释
          //  感觉没什么特殊情况直接设置为false即可
          extractComments: false,
        })
      ]
    },

    plugins: [
      new HtmlWebpackPlugin({
        //  template的title优先级大于当前数据
        title: 'my-cli',
        //  文件名称
        filename: 'index.html',

        //  模板路径
        template: path.join(config.root, 'src/index.html'),
        // 用于打包后引用脚本时的路径
        publicPath: './',

        //  是否将打包的资源引用到当前HTML， false代表不引用
        //  true或者body将打包后的js脚本放入body元素下，head则将脚本放到中
        //  默认为true
        inject: 'body',
        //  加载js方式，值为defer/blocking
        //  默认为blocking, 如果设置了defer，则在js引用标签上加上此属性，进行异步加载
        scriptLoading: 'blocking',

        //  是否进行缓存，默认为true，在开发环境可以设置成false
        cache: false,
        //  添加mate属性
        meta: {}
      }),

      new CleanWebpackPlugin({

        //  假装文件删除
        //  如果为false则代表真实删除，如果为true，则代表不删除
        dry: false,
        //  是否打印日志到控制台 默认为false
        verbose: true,
        cleanStaleWebpackAssets: false,
        //  允许保留本次打包的文件
        //  true为允许，false为不允许，保留本次打包结果，也就是会删除本次打包的文件
        //  默认为true
        protectWebpackAssets: true,
        //  每次打包之前删除匹配的文件
        cleanOnceBeforeBuildPatterns: ['**/*'],

        //  每次打包之后删除匹配的文件
      }),

      new webpack.DefinePlugin({ "global_a": JSON.stringify("我是一个打包配置的全局变量") }),

      new MiniCssExtractPlugin({
        filename: isDev ? 'css/[name].css' : 'css/[name].css',
        chunkFilename: isDev ? 'css/[name].css' : 'css/[name].css',
      }),
    ],

    resolve: {
      alias: {
        //  设置路径别名
        '@': path.join(config.root, 'src'),

        '~': path.join(config.root, 'src/assets'),
      },
      //  可互忽略的后缀
      extensions: ['.jsx', '.js', '.json', '.css'],
      //  默认读取的文件名
      mainFiles: ['index', 'main'],
    }
  }
}
