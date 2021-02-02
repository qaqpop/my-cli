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
      setupExitSignals: '1',

      //  服务器host，默认为localhost，
      host: '127.0.0.1',
      //  开启服务器端口号，
      //  默认为8080
      port: 7777,

      //  提供静态文件的地址。 string | Array | false   设置为false则代表关闭
      //  默认为为当前工作目录
      //  建议使用绝对地址
      //  此属性优先级必public低
      //  例如设置为 dist后， dev时寻找文件会以dist目录
      contentBase: path.resolve(config.root, ''),  //[ path.resolve(config.root, 'dist') ],

      //  提供静态文件地址目录别名，此属性与contentBase对应，
      //
      contentBasePublicPath: '/',  // ['dist']


      //  设置路径的前缀路径
      //  例如，如果设置为/assets/
      //  那么服务器启动后，访问所有数据都需要加入/assets/前缀
      //  localhost:7777/assets
      publicPath: '/',

      //  string | boolean
      //  是否打开浏览器
      //  默认为false，如果设置为true， 启动时会自动打开浏览器
      //  当为字符串时，打开指定浏览器
      open: true, // 'chrome'

      // 打开浏览器后默认打开的页面
      //  string | Array<string>
      //  当设置为Array时，会打开多个页面
      openPage: '', // ['', 'index.html'], //'index.html',

      //  是否启用gzip压缩
      //  默认为false
      compress: true,

      //  是否启动热更新（HMR）
      //  默认为false，
      //  热更新使用的是webpack中HotModuleReplacementPlugin
      hot: true,

      //  设置为true之后，更新不支持热更新的文件，不会刷新页面，而是在控制台输出热更新失败
      //  默认为false，此属性优先级大于hot，
      hotOnly: false,

      //  是否设置HTTP/2服务器。
      //  对于nodeV10以上的版本  由于spdy有问题
      //  所以如果将此属性设置为true，则默认使用https作为服务
      http2: false,

      //  boolean 或者 object
      //  默认情况下， dev-server使用HTTPS为HTTP/2提供服务
      https: {
        //  证书，证书属性也可以设置在devServer下，当https设置为boolean时， 与https同级设置
        key: null,//fs.readFileSync('/path/to/server.key'),
        cert: null,//fs.readFileSync('/path/to/server.crt'),
        ca: null,//fs.readFileSync('/path/to/ca.pem'),
      },

      // key: null,//fs.readFileSync('/path/to/server.key'),
      // cert: null,//fs.readFileSync('/path/to/server.crt'),
      // ca: null,//fs.readFileSync('/path/to/ca.pem'),

      allowedHosts: [

      ],


      //  服务器代理配置，当前后端分离开发时，前端请求API需要指定地址
      //  此属性可以设置代理的IP地址
      //  例如如下，当api请求  /api/user真实地址为http://localhost:3000/user
      //  pathRewrite属性可以设置前缀，如果不设置pathRewrite： /api/user真实地址为http://localhost:3000/api/user

      //  详情使用请参考官网https://webpack.js.org/configuration/dev-server/#devserverproxy
      proxy: {
        '/api':{
          target: 'http://localhost:3000',
          pathRewrite: {'^/api' : ''},
          //  HTTPS设置为无效证书
          // secure: false
        }
      },

      //  加入到response头部自定义内容
      headers: {
        'X-Custom-Foo': 'bar'
      },

      //  根目录所指向的页面。
      //  有兴趣的可以改为 “/”试一下
      index: 'index.html',


      //  当编译错误后，页面是否显示错误信息， boolean | {}
      //  默认为false，当编译失败后会显示空白页
      //  设置为true后，编译失败会显示错误的覆盖层,也可以设置为object，显示多种类型信息

      overlay: {
        warning:true,
        errors: true
      },

      //  输出打包进度
      //  默认为false
      progress: true,

      //如果此属性设置为true，那么除了初始启动信息所有信息都不在输出。error也不会输出
      quiet: false,

      //  禁止显示打包消息，但是依然会显示警告和错误
      noInfo: false,

      //   控制打包详情的控制台输出,例如打包的文件大小等等
      //  'none' | 'errors-only' | 'minimal' | 'normal' | 'verbose' | string
      stats:'minimal',

      // 是否注入webpack客户端
      // boolean | function (compilerConfig) => boolean
      // 这个注入客户端意思是：是否要将webpack库注入进去
      // dev-server中好多功能是由webpack提供实现的。将webpack注入到dev-server中进行通讯，
      //  将此属性设置为false，那么hot、overlay等功能都会失效
      //  默认为true，  有兴趣的诸君可以设置为false测试一下
      injectClient: true,

      //  是否注入HOT， 这个属性可以算是injectClient的子集。只影响HOT
      injectHot: true,

      //  设置dev-server自动刷新方式
      //  具有inline 和 iframe两种模式
      //  默认使用inline模式  具体请参考 https://segmentfault.com/a/1190000014141798
      inline: true,

      //  此属性表示是否每次文件更新时进行重新加载所有模块
      //  HOT是只加载更新的代码
      //  此属性设置为true，也就是放弃HOT，每次文件更新都会重新加载所有模块
      //  这个可以在 浏览器控制台中WS选项查看，
      //  默认值为false
      liveReload: false,

      //  pfx征书地址
      pfx: '',

      //  是否启动懒编译，启动懒编译后，只有请求文件时才会信息编译
      //  当启动懒编译后，也就意味着不在监听文件变化
       lazy: false,

      //  此属性设置在懒编译时，访问哪个文件时进行编译。
      //  启动懒编译后，默认访问任何文件都会进行编译，
      //  此属性为了减少懒编译编译，
       filename: 'main.js',


      //  设置webpack-dev-middleware使用的mimeType
      mimeTypes: { },

      //  自定义中间件属性
      //    优先于server内部中间件执行
      before: (app, server, compiler) =>{
        //console.log('我是before', compiler.options)
      },

      //  server内部执行完所有中间件后执行当前中间件
      after: (app, server, compiler) =>{},

      //  dev-server提供的当服务器启动后执行的钩子函数
      onListening: (server) => {
        // const port = server.listeningApp.address().port;
        // console.log('Listening on port:', port);
      },


      //  boolean | object
      //  当此属性设置为true或为object时，如果使用的HTML5 API 所有404页面会跳转到index.html
      //  使用的connect-history-api-fallback库 设置为对象，则会将此对象传参给connect-history-api-fallback库
      historyApiFallback: false,


      transportMode:{
        //  长链接服务类型， 值为 sockjs或者ws
        //  sockjs 使用的sockjs库
        //  ws 使用的ws库
        //  默认为sockjs   webpack-dev-server@3.X ws不可用
         server: 'sockjs'
      }
    },

  }
])
