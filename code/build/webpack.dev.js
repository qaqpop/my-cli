/*
 * @Author: Orcas
 * @Date: 2021-01-18
 * @LastEditTime: 2020-06-04 14:46:53
 */

const path = require('path');
const { merge } = require('webpack-merge');
const { config } = require('./config');
const common = require('./webpack.common');
//  使用node。js的导出，将配置进行导出
module.exports = merge([
  common(true),
  {
    mode: 'development',

    devServer:{

      //  服务器host，默认为localhost，
      host: '127.0.0.1',

      //  开启服务器端口号，
      //  默认为8080
      port: 7777,

      //  string | boolean
      //  是否打开浏览器
      //  默认为false，如果设置为true， 启动时会自动打开浏览器
      //  当为字符串时，打开指定浏览器
      open: true, // 'chrome'

      // 打开浏览器后默认打开的页面
      //  string | Array<string>
      //  当设置为Array时，会打开多个页面
      openPage: '', // ['', 'index.html'], //'index.html',

      //  是否启用gzip压缩,
      //  默认为false
      compress: true,

      //  是否启动热更新（HMR）
      //  默认为false，
      //  热更新使用的是webpack中HotModuleReplacementPlugin
      hot: true,

      // 设置允许访问的IP地址，设置为true，则不允许任何IP访问，
      //  也可以设置为数组，与webpack-devser@3.X 的allowedHosts一样
      //  相当于webpack-devser@3.X 的allowedHosts属性
      firewall: true,

      //  是否设置HTTP/2服务器。
      //  所以如果将此属性设置为true，则默认使用https作为服务
      http2: false,

      // //  boolean 或者 object
      // //  默认情况下， dev-server使用HTTPS为HTTP/2提供服务
      // https: {
      //   //  证书，证书属性也可以设置在devServer下，当https设置为boolean时， 与https同级设置
      //   key: '',//fs.readFileSync('/path/to/server.key'),
      //   cert: '',//fs.readFileSync('/path/to/server.crt'),
      //   ca: '',//fs.readFileSync('/path/to/ca.pem'),
      // },


      //  服务器代理配置，当前后端分离开发时，前端请求API需要指定地址
      //  此属性可以设置代理的IP地址
      //  例如如下，当api请求  /api/user真实地址为http://localhost:3000/user
      //  详情使用请参考官网https://webpack.js.org/configuration/dev-server/#devserverproxy
      proxy: {
        '/api':{
          target: 'http://localhost:3000',
          //  pathRewrite属性可以设置前缀，如果不设置pathRewrite： /api/user真实地址为http://localhost:3000/api/user
          pathRewrite: {'^/api' : ''},
          //  HTTPS设置为无效证书
          // secure: false
        }
      },

      //  加入到response头部自定义内容
      headers: {
        'X-Custom-Foo': 'bar'
      },

      //  静态文件属性
      static: {
        //  要挂载在服务器上文件的本地目录
        //  默认为为当前工作目录
        //  建议使用绝对地址
        //  例如设置为 dist后， dev时寻找文件会在/dist目录下寻找静态文件
        //   相当于webpack-dev-server@3.X的 contentBase属性
        directory: path.join(config.root, 'assets'),

        //    挂载到服务器中间件的可访问地址
        //   相当于webpack-dev-server@3.X的 contentBasePublicPath属性
        publicPath: '/static',

        // 设置express.static的参数
        //   相当于webpack-dev-server@3.X的 staticOptions属性
        staticOptions: undefined,

        //  是否加入serve-index中间件，默认为true
        //   相当于webpack-dev-server@3.X的 serveIndex属性
        serveIndex: true,

        //  是否使用chokidar库进行监听文件变化。
        //  webpack使用的是文件系统的的变化通知，但是有时候可能会不管用，例如使用网络文件系统
        //  所以可以设置属性使用chokidar库进行轮询检测文件变化。
        //  此属性可以设置为boolean类型也可以设置为对象类型指定轮询时间(毫秒数）
        //   相当于webpack-dev-server@3.X的 watchOptions属性
        watch: {
          poll: 3000
        },
      },

      //  设置WS客户端的一些属性
      client: {
        //  推送客户端日志级别，
        //  属性具有 "none" | "error" | "warn" | "info" | "log" | "verbose"
        //  例如设置error ，WS并不是推送打包警告和消息， WS客户端会将日志打印在控制台上
        //  如果设置为none， 就算打包失败也不会有消息
        //   相当于webpack-dev-server@3.X的 clientLogLevel属性
        logging: 'verbose',
        //  是否发送发包进度，
        //   相当于webpack-dev-server@3.X的 progress属性
        progress: true,

        //  WebSocket客户端使用的路径
        //  相当于webpack-dev-server@3.X的 sockPath属性

         path: undefined,

        //  WebSocket客户端使用的IP地址
        //  相当于webpack-dev-server@3.X的 sockHost属性
         host: undefined,

        //  WebSocket客户端使用的端口好
        //  相当于webpack-dev-server@3.X的 sockPort属性
         port: undefined,
      },


       public: undefined,


      dev:{

        headers:{
          //  响应头添加数据
          'X-Dev-Header': 'X-Dev-Header',
          serverSideRender: false,
        },

        //   相当于webpack-dev-server@3.X的 mimeTypes属性
        mimeTypes:{

        },

        //  当前生成的打包结果是否写入到磁盘之中
        //  默认为false
        //   相当于webpack-dev-server@3.X的 writeToDisk属性
        writeToDisk: true,

        // 此属性表示生成打包文件存放的路径。默认为根目录

        //   相当于webpack-dev-server@3.X的 publicPath属性
        publicPath: '/',

        //  根目录所指向的页面。
        //  因为HtmlWebpackPlugin设置的 html名称为index.html
        //  所以在此设置为index.html
        //  默认值也是index.html
        //  当前打包状态
        //   相当于webpack-dev-server@3.X的 index属性
        index: 'index.html',

        //  none" | "summary" | "errors-only" | "errors-warnings" | "minimal" | "normal" | "detailed" | "verbose" | boolean | object { … }
        //  控制打包时控制台的输出结果等级，
        //   相当于webpack-dev-server@3.X的 stats属性
        stats: 'errors-only',

        //  自定义dev-server打包文件的输出流
        //  默认情况下，输入流为memory
        outputFileSystem: undefined,


        methods: undefined,

        serverSideRender: undefined

      },


      //  当编译错误后，页面是否显示错误信息， boolean | {}
      //  默认为false，当编译失败后会显示空白页
      //  设置为true后，编译失败会显示错误的覆盖层,也可以设置为object，显示多种类型信息
      overlay: {
        warning:true,
        errors: true
      },

      // 是否注入WS客户端,也就是是否要进行长链接通讯。
      // boolean | function (compilerConfig) => boolean
      //  将此属性设置为false，那么hot、overlay等功能都会失效
      injectClient: true,

      //  是否注入HOT， 这个属性可以算是injectClient的子集。只影响HOT
      injectHot: true,

      //  此属性表示是否每次文件更新时进行重新加载所有模块
      //  HOT是只加载更新的代码
      //  此属性设置为true，也就是放弃HOT，每次文件更新都会重新加载所有模块
      //  这个可以在 浏览器控制台中WS选项查看，
      //  默认值为false
      liveReload: true,

      //  是否开启ZeroConf网络
      bonjour: false,

      //  boolean | object
      //  当此属性设置为true或为object时，如果使用的HTML5 API 所有404页面会跳转到index.html
      //  使用的connect-history-api-fallback库 设置为对象，则会将此对象传参给connect-history-api-fallback库
      historyApiFallback: true,

      //  是否使用局域网IP打开页面
      useLocalIp: false,

      //  是否监听node中stdin.end事件， 关闭服务器
      stdin: false,

      //  终止信号，设置为true时 监听['SIGINT', 'SIGTERM'];事件，事件触发后结束进程
      //  目前dev-server强制将此属性设置为true了，所以改为false不管用。
      setupExitSignals: true,

      transportMode:{
        //  长链接服务类型， 值为 sockjs或者ws
        //  sockjs 使用的sockjs库
        //  ws 使用的ws库
        //  webpack-dev-server@4.X使用的是WS  webpack-dev-server@3.X 使用的是sockjs
        //  目前在webpack-dev-server@4.X使用sockjs会出错， webpack-dev-server@3.X使用WS也会报错
         server: 'ws'
      },

      //  自定义中间件钩子属性
      //    优先于server内部中间件执行
      //  相当于webpack-devser@3.X 的before函数
      onBeforeSetupMiddleware: (app, server, compiler) =>{
        //console.log('我是before', compiler.options)
      },

      //  server内部执行完所有中间件后执行当前中间件
      //  相当于webpack-devser@3.X 的after函数
      onAfterSetupMiddleware: (app, server, compiler) =>{
      },

      //  dev-server提供的当服务器启动后执行的钩子函数
      onListening: (server) => {
        // const port = server.listeningApp.address().port;
        // console.log('Listening on port:', port);
      },
    },

  }
])
