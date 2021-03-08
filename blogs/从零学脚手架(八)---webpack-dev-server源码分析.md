上一篇中介绍了<font style="color:cornflowerblue">webpack-dev-server</font>属性配置

这一篇就简单的梳理下<font style="color:cornflowerblue">webpack-dev-server</font>内部实现。

由于涉及到源码解析，所以会涉及到一些比较难啃的知识，我会尽量进行简单化描述。

但如果还是具有具有难度 或 对 <font style="color:cornflowerblue">webpack-dev-server</font>内部实现不感兴趣的朋友，也可以完全跳过此篇。



### 调试webpack-dev-server

#### 配置调试方式

日常开发开发中，如果对代码逻辑不熟悉，最简单的方法就是**调试**，一步步观察流程。

学习<font style="color:cornflowerblue">webpack-dev-server</font>源码，最简单的方法也就是就行调试，不过调试<font style="color:cornflowerblue">webpack-dev-server</font>源码毕竟不像调试本身项目代码那样简单，必定需要做一些配置，

下面先简单介绍两种源码<font style="color:cornflowerblue">webpack-dev-server</font>方式



##### 浏览器调试

现在都知道<font style="color:cornflowerblue">webpack</font>是执行于<font style="color:cornflowerblue">Node.js</font>环境下，所以调试<font style="color:cornflowerblue">webpack</font>也就是调试<font style="color:cornflowerblue">Node.js</font>程序。

伟大的<font style="color:cornflowerblue">Chrome</font>浏览器就给我们提供了调试<font style="color:cornflowerblue">Node.js</font>程序的方案。



首先在**package.json**文件**scripts**属性中添加了一个`debug`指令，使用这个命令启动调试<font style="color:cornflowerblue">Node.js</font>程序

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-08-01.png？raw=true" width="600">



**inspect-brk**属性就是设置调试<font style="color:cornflowerblue">Node.js</font>程序参数 ：

***5858***代表启动<font style="color:cornflowerblue">Node.js</font>程序的端口号

**./node_modules/webpack-dev-server/bin/webpack-dev-server.js** 文件代表调试的指定文件，



接下来就该设置浏览器

在<font style="color:cornflowerblue">Chrome</font>浏览器地址栏输入**chrome://inspect**会进入一个设置页面

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-08-02.png?raw=true" width="600">

> :whale2: 因为我使用的是<font style="color:cornflowerblue">新版Edge</font> ，所以显示的为**edge://inspect**。



点击**Open dedicated DevTools for Node**  便可以进入调试面板

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-08-03.png?raw=true" width="600">

在调试面板中设置需要调试<font style="color:cornflowerblue">Node.js</font>端口号

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-08-04.png?raw=true" width="600">

此时启动 `yarn debug` 便会被<font style="color:cornflowerblue">Chrome</font>捕捉，就可以进行调试

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-08-05.png?raw=true" width="600">





##### IDE调试代码

常用**IDE工具**都可以调试<font style="color:cornflowerblue">Node.js</font>程序。

可以使用**IDE工具**配置调试<font style="color:cornflowerblue">webpack-dev-server</font>。

我使用的是<font style="color:cornflowerblue">WebStorm</font>。可以做到零配置调试

执行点击`Debug start`就可以执行当前命令的调试



<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-08-06.png?raw=true" width="600">

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-08-07.png?raw=true" width="600">



至于<font style="color:cornflowerblue">VS Code</font>，没用过，不太了解配置信息。



#### webpack-dev-server启动流程

下面简单介绍下<font style="color:cornflowerblue">webpack-dev-server</font>启动流程。

在此只介绍下关键流程代码。具体每一步细节有兴趣的朋友可以自行调试查看



<font style="color:cornflowerblue">webpack-dev-server</font>执行的第一个文件是*<font style="color:#f03d3d">webpack</font>库的**/bin/webpack.js**文件模块*，也就是入口文件

原因上一篇已经介绍过：<font style="color:cornflowerblue">webpack-cli@4.0</font>开始，<font style="color:cornflowerblue">webpack-dev-server</font>执行命令改为了 `webpack serve`。使用了<font style="color:cornflowerblue">webpack</font>命令



在*<font style="color:#f03d3d">webpack</font>库的**/bin/webpack.js**文件模块*中调用了*<font style="color:#f03d3d">webpack-cli</font>库的**/bin/cli.js**文件模块*。

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-08-08.png?raw=true" width="600">

> :whale2: 执行<font style="color:cornflowerblue">webpack-cli</font>时检测<font style="color:cornflowerblue">webpack-cli</font>是否安装就是在<font style="color:#f03d3d">webpack</font>库的**/bin/webpack.js**文件模块执行的，有兴趣的朋友可以自行查看。



之后在*<font style="color:cornflowerblue">webpack-cli</font>的**/bin/cli.js**文件模块*中调用了**lib/bootstrap.js**启动文件模块

然后在**lib/bootstrap.js**启动文件模块中创建了**/lib/webpack-cli.js**模块实例（**WebpackCLI**）并调用***run()***

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-08-09.png?raw=true" width="600">

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-08-10.png?raw=true" width="600">

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-08-11.png?raw=true" width="600">



之后**WebpackCLI.run()** 中根据命令调用对应<font style="color:cornflowerblue">@webpack-cli</font>库中对应文件。

如`webpack serve`，根据***serve***命令参数调用 <font style="color:cornflowerblue">@webpack-cli</font>库**/serve/**中模块 。

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-08-12.png?raw=true" width="600">

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-08-13.png?raw=true" width="600">



> :whale2::whale2: <font style="color:cornflowerblue">@webpack-cli</font>是<font style="color:cornflowerblue">webpack-cli@4.X</font>版本依赖



在 <font style="color:cornflowerblue">@webpack-cli</font>中**/serve/index.js**文件模块中调用**/serve/startDevServer.js**文件模块

最后在**/serve/startDevServer.js**创建<font style="color:cornflowerblue">webpack-dev-server</font>中**/lib/Server.js**模块实例对象。

并且调用**Server.listen()**监听启动服务器。



<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-08-14.png?raw=true" width="600">

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-08-15.png?raw=true" width="600">

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-08-16.png?raw=true" width="600">

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-08-17.png?raw=true" width="600">

以上，就是<font style="color:cornflowerblue">webpack-dev-server</font>服务器的启动流程。



<font style="color:cornflowerblue">webpack-dev-server</font>服务器启动时跨了好几个库调用代码，  

<font style="color:cornflowerblue">webpack</font> ---> <font style="color:cornflowerblue">webpack-cli</font> ---> <font style="color:cornflowerblue">@webpack-cli</font> ---> <font style="color:cornflowerblue">webpack-dev-server</font>。不过只要弄清楚了执行逻辑，理解起来并不会有多大困难

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-08-new-01.jpg?raw=true" width="400">



### 源码模块解析

#### express服务器

在上一篇说到过<font style="color:cornflowerblue">webpack-dev-server</font>内部使用了<font style="color:cornflowerblue">express</font>框架来作为服务器。

先来看一下<font style="color:cornflowerblue">express</font>、

<font style="color:cornflowerblue">webpack-dev-server</font>的服务器是**/lib/Server.js**文件模块。

关于<font style="color:cornflowerblue">express</font>也就是在此模块中。

**/lib/Server.js**模块构造函数中，初始化了许多东西，其中就有<font style="color:cornflowerblue">express</font>

在**/lib/Server.js**构造函数中便初始化了<font style="color:cornflowerblue">express</font>

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-08-18.png?raw=true" width="600">

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-08-19.png?raw=true" width="600">

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-08-20.png?raw=true" width="600">

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-08-21.png?raw=true" width="600">

可以看到在**Server.setupApp()**中构建了<font style="color:cornflowerblue">express</font>服务器实例

然后在**Server.createServer()** 中赋值给了**Server.listeningApp**。

最后在**Server.listen()**进行了启动。

**Server.listen()**就是在<font style="color:cornflowerblue">@webpack-cli</font>中**/serve/startDevServer.js**文件模块调用的。

> :whale2: **Server.setupApp()**和**Server.createServer()**之间为<font style="color:cornflowerblue">express</font>添加了配置的中间件。





#### 监听代码文件更新

<font style="color:cornflowerblue">webpack-dev-server</font>中，最主要的功能就是：*监听代码变化触发重新编译*、*编译完成后通知浏览器更新数据*。

其中*监听**代码文件**变化触发重新编译*是由<font style="color:cornflowerblue">webpack</font>自身提供的一个功能。



<font style="color:cornflowerblue">webpack</font>配置项中具有一个**watch**属性，此属性就代表是否要处于监听状态，监听***代码文件***变化



先来做一个简单的测试。

新建一个**webpack.watch.js**配置文件，在此配置文件设置**watch**属性

```js
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
//  使用node。js的导出，将配置进行导出
module.exports = merge([
  common(true),
  {
    mode:'development',
    //  监听文件变化
    watch: true,
    //  监听选项
    watchOptions: {
      //  忽略某些目录  可以为正则或者数组
      ignored: /node_modules/,
      //  启动轮询， 默认为false  设置true或毫秒数来启动轮询
      poll: false
    }
  }
])
```

在**package.json**中添加***watch***指令，命令执行`webapck`命令。

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-08-22.png?raw=true" width="600">

此时执行`yarn watch`命令打包完成后也会一直处于**wating**状态，等待***代码文件***变化

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-08-23.png?raw=true" width="600">

更新代码，便会触发重新打包，

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-08-24.png?raw=true" width="600">

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-08-25.png?raw=true" width="600">



**watch**属性仅仅提供了**watching**状态等待***代码文件***变化，进行重新编译。

> :whale2: ***watch***属性只会监听已引用的代码模块文件，对于没有引用的代码模块文件是不会监听，有兴趣的朋友可以自行测试。



#### 打包文件内存化

使用<font style="color:cornflowerblue">webpack-dev-server</font>时，会发现并没有生成本地打包文件。

在上一篇中也介绍过<font style="color:cornflowerblue">webpack-dev-server</font>默认将打包文件打在了内存流，提升访问速度

<font style="color:cornflowerblue">webpack-dev-server</font>默认使用了<font style="color:cornflowerblue">webpack-dev-middleware</font>中间件将打包文件内存化



<font style="color:cornflowerblue">webpack-dev-middleware</font>中间件也是在 **/lib/Server.js**构造函数中添加的

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-08-26.png?raw=true" width="600">

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-08-27.png?raw=true" width="600">



<font style="color:cornflowerblue">webpack-dev-middleware</font>的**/dist/index.js**模块中调用了***/dist/utils/setupOutputFileSystem.js***模块，此模块就是设置输出流函数

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-08-28.png?raw=true" width="600">

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-08-29.png?raw=true" width="600">

可以看到，默认情况下，<font style="color:cornflowerblue">webpack-dev-middleware</font>使用了[memfs](https://www.npmjs.com/package/memfs)作为输出流，<font style="color:#f03d3d">memfs</font>就是一个内存流库

> :whale2:是一个**Node.js** 内存流的库，具体参考[官方](https://www.npmjs.com/package/memfs)

> :whale2:<font style="color:cornflowerblue">webpack-dev-middleware</font> 项目主文件是**/dist/cjs.js**，在**/dist/cjs.js**调用了**/dist/index.js**。





#### WebSocket

<font style="color:cornflowerblue">webpack-dev-server</font>核心功能  *编译完成后通知浏览器更新数据* 就就是使用<font style="color:cornflowerblue">WebSocket</font>完成的。

在服务器启动后，实例化<font style="color:cornflowerblue">WebSocket Server</font>。浏览器访问时对浏览器（<font style="color:cornflowerblue">WebSocket Client</font>）进行长链接。

当代码编译完成后，使用<font style="color:cornflowerblue">WebSocket Server</font>向浏览器（<font style="color:cornflowerblue">WebSocket Client</font>）推送消息

浏览器（<font style="color:cornflowerblue">WebSocket Client</font>）接收到后完成对应操作。



##### WebSocket Server

######  Server 创建

<font style="color:cornflowerblue">WebSocket Server</font>的实例化是在**Server.listen()**中进行的。

在成功启动服务器后，判断是否设置了**hot**或**liveReload**。如果设置就调用**Server.createSocketServer()**实例化<font style="color:cornflowerblue">WebSocket Server</font>

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-08-30.png?raw=true" width="600">

**Server.createSocketServer()**执行时，首先会根据配置选择<font style="color:cornflowerblue">WebSocket Server</font>类型。

然后实例化此<font style="color:cornflowerblue">WebSocket Server</font>。

<font style="color:cornflowerblue">webpack-dev-server@4.X</font>默认使用**WebsocketServer.js**类型，也就是[ws](https://www.npmjs.com/package/ws)

<font style="color:cornflowerblue">webpack-dev-server@3.X</font>默认使用**SockJSServer.js**类型，也就是[sockjs](https://www.npmjs.com/package/sockjs)

> :whale2::whale2: 
>
> 目前在<font style="color:#f03d3d">webpack-dev-server@3.11.2</font>版本使用<font style="color:cornflowerblue">ws</font>会有问题，而<font style="color:#f03d3d">webpack-dev-server@4.0.0beta.0</font>版本使用<font style="color:cornflowerblue">sockjs</font>也有问题，
>
> 所以<font style="color:cornflowerblue">WebSocket Server</font>直接使用默认即可

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-08-31.png?raw=true" width="600">

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-08-32.png?raw=true" width="600">

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-08-33.png?raw=true" width="600">

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-08-34.png?raw=true" width="600">



###### 消息推送

在**Server.js**模块中具有一个**sockWrite()**，这个函数就是调用<font style="color:cornflowerblue">WebSocket Server</font>来推送消息。

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-08-35.png?raw=true" width="600">



<font style="color:cornflowerblue">webpack-dev-server</font>在三个时机中使用了<font style="color:cornflowerblue">WebSocket Server</font>推送消息



<strong>客户端连接</strong>

在客户端连接（浏览器访问）

<font style="color:cornflowerblue">WebSocket Server</font>会推送初始化信息。例如是否开启 <font style="color:cornflowerblue">热更新</font> 、overlay配置信息、是否要输出打包编译进度、输入日志级别等。

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-08-36.png?raw=true" width="600">



<strong>代码编译完毕</strong>

在每次代码打包编译完毕后，<font style="color:cornflowerblue">WebSocket Server</font>会将此次编译信息推送给**客户端（浏览器）**。

<font style="color:cornflowerblue">webpack</font>内部暴露了 编译结束后（编译成功、编译失败）的一系列钩子事件。

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-08-37.png?raw=true" width="600">

<font style="color:cornflowerblue">webpack-dev-server</font>就是使用了此钩子函数。

在**Server.js**构造函数中监听<font style="color:cornflowerblue">webpack</font>钩子函数

编译完成后使用<font style="color:cornflowerblue">WebSocket Server</font>推送消息

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-08-38.png?raw=true" width="600">

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-08-39.png?raw=true" width="600">



<strong>静态文件发生变化</strong>

<font style="color:cornflowerblue">webpack-dev-server</font>提供了当静态文件变化时，使用<font style="color:cornflowerblue">WebSocket Server</font>推送消息通知客户端（浏览器）自动刷新浏览器。

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-08-40.png?raw=true" width="600">





##### WebSocket Client

<font style="color:cornflowerblue">WebSocket client</font>是<font style="color:cornflowerblue">WebSocket</font>的客户端（浏览器）<font style="color:cornflowerblue">WebSocket client</font>接收到消息时，会根据消息类型执行对应的操作，例如刷新浏览器、获取最新代码数据、输出日志等信息。

<font style="color:cornflowerblue">WebSocket client</font>代码存放在<font style="color:cornflowerblue">webpack-dev-server</font>的**/client**目录下。<font style="color:cornflowerblue">WebSocket client</font>也是具有**SockJSClient**和**WebsocketClient**两种类型，与<font style="color:cornflowerblue">WebSocket Server</font>对应

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-08-41.png?raw=true" width="600">

###### 消息处理

<font style="color:cornflowerblue">WebSocket client</font> 消息处理逻辑编写在**/client/default/index.js**模块文件中。

**/client/default/index.js**模块文件中有一个**onSocketMessage**对象，这个对象就是消息处理对象。

将**onSocketMessage**对象复制于此。添加部分注释，以便理解，  具体就不再赘述。

其实代码还是很好理解的。

有兴趣的朋友可以看看源码。

```js
var onSocketMessage = {
  hot: function hot() {
    //	如果推送hot，就代表使用HMR。在客户端连接后推送
    options.hot = true;
    log.info('Hot Module Replacement enabled.');
  },
    
  liveReload: function liveReload() {
     //	如果推送liveReload，就代表使用liveReload。在客户端连接后推送
    options.liveReload = true;
    log.info('Live Reloading enabled.');
  },
    
  invalid: function invalid() {
     //	监听webpack编译无效时推送。invalid与done一样，是webpack钩子函数
    log.info('App updated. Recompiling...'); // fixes #1042. overlay doesn't clear if errors are fixed but warnings remain.

    //	如果设置了错误页面，就将页面进行清除
    if (options.useWarningOverlay || options.useErrorOverlay) {
      overlay.clear();
    }

    sendMessage('Invalid');
  },
    
  hash: function hash(_hash) {
    //	当前代码模块的hash值。
    status.currentHash = _hash;
  },
    
  'still-ok': function stillOk() {
    log.info('Nothing changed.');

    if (options.useWarningOverlay || options.useErrorOverlay) {
      overlay.clear();
    }

    sendMessage('StillOk');
  },
    
  logging: function logging(level) {
    //	客户端显示日志级别，客户端连接后推送
    // this is needed because the HMR logger operate separately from
    // dev server logger
    var hotCtx = require.context('webpack/hot', false, /^\.\/log$/);

    if (hotCtx.keys().indexOf('./log') !== -1) {
      hotCtx('./log').setLogLevel(level);
    }

    setLogLevel(level);
  },
  overlay: function overlay(value) {
    //	设置编译错误时，是否显示错误页面。客户端连接后推送
    if (typeof document !== 'undefined') {
      if (typeof value === 'boolean') {
        options.useWarningOverlay = false;
        options.useErrorOverlay = value;
      } else if (value) {
        options.useWarningOverlay = value.warnings;
        options.useErrorOverlay = value.errors;
      }
    }
  },
    
  progress: function progress(_progress) {
    //	是否显示当前打包进度，客户端连接后推送
    if (typeof document !== 'undefined') {
      options.useProgress = _progress;
    }
  },
    
  'progress-update': function progressUpdate(data) {
    //	当前打包进度
    if (options.useProgress) {
      log.info("".concat(data.percent, "% - ").concat(data.msg, "."));
    }

    sendMessage('Progress', data);
  },
    
  ok: function ok() {
    //	编译成功推送当前类型，
    sendMessage('Ok');

     //	如果设置了错误页面，就将页面进行清除
    if (options.useWarningOverlay || options.useErrorOverlay) {
      overlay.clear();
    }

    if (options.initial) {
      return options.initial = false;
    }

    //使用此方法重新加载数据，此方法会处理HMR
    reloadApp(options, status);
  },
    
  'content-changed': function contentChanged() {
    //	静态文件改变时推送，重新刷新页面
    log.info('Content base changed. Reloading...');
    self.location.reload();
  },
    
  warnings: function warnings(_warnings) {
    //	编译出现警告后推送 
    log.warn('Warnings while compiling.');

    var strippedWarnings = _warnings.map(function (warning) {
      return stripAnsi(warning);
    });

    sendMessage('Warnings', strippedWarnings);

    for (var i = 0; i < strippedWarnings.length; i++) {
      log.warn(strippedWarnings[i]);
    }

    //	如果显示错误页面设置警告提示，那么就显示
    if (options.useWarningOverlay) {
      overlay.showMessage(_warnings);
    }

    if (options.initial) {
      return options.initial = false;
    }
      
	//使用此方法重新加载数据，此方法会处理HMR
    reloadApp(options, status);
  },
    
  errors: function errors(_errors) {
    //	编译错误后推送
    log.error('Errors while compiling. Reload prevented.');

    var strippedErrors = _errors.map(function (error) {
      return stripAnsi(error);
    });

    sendMessage('Errors', strippedErrors);

    for (var i = 0; i < strippedErrors.length; i++) {
      log.error(strippedErrors[i]);
    }

    //	如果显示错误页面设置了错误提示，那么就显示
    if (options.useErrorOverlay) {
      overlay.showMessage(_errors);
    }

    options.initial = false;
  },
    
  error: function error(_error) {
    log.error(_error);
  },
    
  close: function close() {
    // WebSocket Server关闭前的推送
    log.error('Disconnected!');
    sendMessage('Close');
  }
};
```



###### reloadApp

**reloadApp()** 代码位于**/client/default/utils/reloadApp.js**文件中。

此函数是个人感觉是一个关键函数，所以在此简单介绍下。

**reloadApp()**是当代码文件发生变化后的处理逻辑。

**reloadApp()**根据**hot**和**liveReload**两个属性类型做了不同处理方案。



当**hot**时，加载**webpack/hot/emitter**模块，用于触发热更新。

**webpack/hot/emitter**模块是<font style="color:cornflowerblue">webpack</font>中热更新定义的事件。

而当**liveReload**时，就直接刷新页面重新获取数据

也就是这两个**hot**和**liveReload**两个属性控制了能否实时更新代码

只不过**hot**采取热更新方式，而**liveReload**是直接刷新页面

并且**hot**优先级高于**liveReload**

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-08-42.png?raw=true" width="600">



#### HMR

提到<font style="color:cornflowerblue">webpack-dev-server</font>，总是离不开<font style="color:cornflowerblue">热更新（HMR）</font>的话题。<font style="color:cornflowerblue">热更新（HMR）</font>是<font style="color:cornflowerblue">webpack-dev-server</font>提供的比较重要的功能

开发时，往往只更新一小段代码，就需要在浏览器中查看效果。

而如果仅仅更新一小段代码，让浏览器刷新重新加载所有数据。那样会极大的浪费时间。

最好的结果就是打包编译时记录当前更新的模块文件，让浏览器只更新此模块文件。

这个技术就是叫作<font style="color:cornflowerblue">热更新（Hot Module Replacement）</font>



<font style="color:cornflowerblue">webpack-dev-server</font>中，<font style="color:cornflowerblue">热更新（HMR）</font>其实是由<font style="color:cornflowerblue">webpack</font>内置的一个**plugin**提供的：<font style="color:#f03d3d">HotModuleReplacementPlugin</font>



使用<font style="color:cornflowerblue">webpack-dev-server</font>时，如果设置了**hot**属性，<font style="color:cornflowerblue">webpack-dev-server</font>会自动添加这个**plugin**

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-08-43.png?raw=true" width="600">

> :whale2:此代码在<font style="color:cornflowerblue">webpack-dev-server</font>的**/lib/utils/DevServerPlugin.js**



<font style="color:#f03d3d">HotModuleReplacementPlugin</font>每次编译后会生成一个***hash***，对应其编译文件。<font style="color:cornflowerblue">WebSocket</font>推送类型中具有一个**hash**类型，就是推送的***hash***



<font style="color:cornflowerblue">WebSocket client</font>处理消息时，会存储***hash***。

然后在**reloadApp()**中根据当前***hash*** 执行**webpackHotUpdate**事件拉去最新代码。


```js
hash: function hash(_hash) {
    status.currentHash = _hash;
},
```

```js
 if (hot) {
    log.info('App hot update...');

    var hotEmitter = require('webpack/hot/emitter');

    hotEmitter.emit('webpackHotUpdate', currentHash);

    if (typeof self !== 'undefined' && self.window) {
      // broadcast update to window
      self.postMessage("webpackHotUpdate".concat(currentHash), '*');
    }
  } // allow refreshing the page only if liveReload isn't disabled
  else if (liveReload) {
```



**webpackHotUpdate**事件是<font style="color:#f03d3d">webpack</font>中定义的一个事件，代码在**/hot/dev-server.js**。其功能是获取此次编译的代码。

```js
if (module.hot) {
	var lastHash;
	var upToDate = function upToDate() {
		return lastHash.indexOf(__webpack_hash__) >= 0;
	};
	var log = require("./log");
	var check = function check() {
		module.hot
			.check(true)
			.then(function (updatedModules) {
				//	HMR检查成功
				if (!updatedModules) {
                    //	如果没有更新的modules，则刷新页面，
					window.location.reload();
					return;
				}
				if (!upToDate()) {
					check();
				}

           		//	调用HMR处理方法，只加载更新代码
				require("./log-apply-result")(updatedModules, updatedModules);
				if (upToDate()) {
					log("info", "[HMR] App is up to date.");
				}
			})
			.catch(function (err) {
           		//	HMR检查失败，重新刷新页面
				var status = module.hot.status();
				if (["abort", "fail"].indexOf(status) >= 0) {
					window.location.reload();
				} else {
					log("warning", "[HMR] Update failed: " + log.formatError(err));
				}
			});
	};
	var hotEmitter = require("./emitter");
    //	事件定义
	hotEmitter.on("webpackHotUpdate", function (currentHash) {
		lastHash = currentHash;
		if (!upToDate() && module.hot.status() === "idle") {
			log("info", "[HMR] Checking for updates on the server...");
			check();
		}
	});
	log("info", "[HMR] Waiting for update signal from WDS...");
} else {
	throw new Error("[HMR] Hot Module Replacement is disabled.");
}
```



### 总结

> :whale2::whale2::whale2:
>
> * 调试<font style="color:cornflowerblue">webpack-dev-server</font>代码具有两种方法：浏览器和IDE
> * <font style="color:cornflowerblue">webpack-dev-server</font>内部使用了*<font style="color:cornflowerblue">express</font>框架作为服务器
> * <font style="color:cornflowerblue">webpack-dev-server</font>默认使用了内存流（<font style="color:cornflowerblue">memfs</font>）存储打包文件
> * <font style="color:cornflowerblue">webpack-dev-server</font>使用了<font style="color:cornflowerblue">webpack</font>提供的钩子函数监听打包编译
> * **wating**状态是<font style="color:cornflowerblue">webpack</font>提供的功能，其属性为：**watch**
> * <font style="color:cornflowerblue">热更新（HMR）</font>是使用了<font style="color:cornflowerblue">webpack</font>内置的<font style="color:#f03d3d">HotModuleReplacementPlugin</font>，<font style="color:cornflowerblue">webpack-dev-server</font>每次在代码编译完成后将***hash***值推送给浏览器

如果此篇对您有所帮助，在此求一个star。项目地址： [OrcasTeam/my-cli](https://github.com/OrcasTeam/my-cli)

### 本文参考

* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)

* [webpack-dev-server、HMR解析](https://zhuanlan.zhihu.com/p/159318414)
* [Webpack HMR 原理解析](https://zhuanlan.zhihu.com/p/30669007)



### package.json

```js
{
  "name": "my-cli",
  "version": "1.0.0",
  "main": "index.js",
  "author": "mowenjinzhao<yanzhangshuai@126.com>",
  "license": "MIT",
  "devDependencies": {
    "@babel/core": "7.13.1",
    "@babel/plugin-transform-runtime": "7.13.7",
    "@babel/preset-env": "7.13.5",
    "@babel/preset-react": "7.12.13",
    "@babel/runtime-corejs3": "7.13.7",
    "babel-loader": "8.2.2",
    "clean-webpack-plugin": "3.0.0",
    "css-loader": "5.0.2",
    "file-loader": "6.2.0",
    "html-webpack-plugin": "5.2.0",
    "mini-css-extract-plugin": "1.3.8",
    "style-loader": "2.0.0",
    "webpack": "5.24.0",
    "webpack-cli": "4.5.0",
    "webpack-dev-server": "4.0.0-beta.0",
    "webpack-merge": "5.7.3"
  },
  "dependencies": {
    "react": "17.0.1",
    "react-dom": "17.0.1"
  },
  "scripts": {
    "start:dev": "webpack-dev-server  --config build/webpack.dev.js",
    "start": "webpack serve  --config build/webpack.dev.js",
    "build": "webpack  --config build/webpack.pro.js",
    "debug": "node --inspect-brk=5858 ./node_modules/webpack-dev-server/bin/webpack-dev-server.js",
    "watch": "webpack  --config build/webpack.watch.js"
  },

  "browserslist": {
    "development": [
      "chrome > 75"
    ],
    "production": [
      "ie 9"
    ]
  }
}

```



### webpack.watch.js

```js
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
//  使用node。js的导出，将配置进行导出
module.exports = merge([
  common(true),
  {
    mode:'development',
    //  监听文件变化
    watch: true,
    //  监听选项
    watchOptions: {
      //  忽略某些目录  可以为正则或者数组
      ignored: /node_modules/,
      //  启动轮询， 默认为false  设置true或毫秒数来启动轮询
      poll: false
    }
  }
])
```



