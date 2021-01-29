这篇学习下开发模式下使用的一个特别的包。

### webpack-dev-server 是什么

在使用**vue-cli**或者**react-cli**这类脚手架时，使用**yarn start**命令会开启一个小型服务器，浏览器访问这个端口号就可以看到打包后的代码，并且更新代码后页面会自动刷新。开发起来特别方便。

这个其实是为了开发方便提供的，毕竟每次更新代码后，重新执行打包命令，然后刷新浏览器，这一套操作下来会感觉很麻烦，

那么能不能提供一个开发时专用包，让开发者每次更新完代码之后会自动执行这一些列操作。

有这需求就有解决方案，在**webpack**中，官方提供了一个<font style="color:#f03d3d">webpack-dev-server</font>，这个库就是完成这一系列操作，让开发更加便利。



#### 启动express服务器

<font style="color:#f03d3d">webpack-dev-server</font>库其实本质就是启动了一个express服务器，服务器与浏览器进行了***长链接通讯（WebScoket）***， 以便可以通知浏览器进行更新数据。

<img src="./images/image-07-01.png" width="400">

TODO:



#### 监听代码文件更改

这个功能其实是<font style="color:#f03d3d">webpack</font>本身提供的，在<font style="color:#f03d3d">webpack</font>配置中具有一个***watch***属性，这个属性代表是否监听文件变化

```js
module.exports = merge([
  common(true),
  {
    mode: 'development',

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



这时候开发模式就可以进行监听文件自动重新打包。

首先运行 yarn start 会发现终端一直处于一种***watching***状态

<img src="./images/image-07-02.png" width="400">

这时候将*app.jsx*文件中的 **Hello World**改为**Hello World-watch**会发现重新运行打包了，并且在打包文件中也可以看到更改。

<img src="./images/image-07-03.png" width="400">

<img src="./images/image-07-04.png" width="400">



在使用<font style="color:#f03d3d">webpack-dev-server</font>情况下，***watch***选项是默认打开的，所以监听文件变化是**webpack**本身提供的一种功能。

不过仅仅使用***watch***无法做到自动刷新浏览器，也没有开启服务器，只能使用浏览器访问打包出来的**html**进行查看

> :whale2: ***watch***只会监听已解析的文件，对于没有引用的文件是不会监听，有兴趣的诸君可以自行测试一下。



#### 将打包文件内存化

在使用**vue-cli**或**react-cli**进行开发时，*yarn start*之后，细心的诸君会发现，并没有任何的生成文件。这其实是<font style="color:#f03d3d">webpack-dev-server</font>将打包生成的代码缓存到了内存之中。而完成这个操作并不是<font style="color:#f03d3d">webpack-dev-server</font>库  而是它依赖的<font style="color:#f03d3d">webpack-dev-middleware</font>中间件。

<font style="color:#f03d3d">webpack-dev-middleware</font>会重新设置**webpack.compiler**的***output***。

<img src="./images/image-07-05.png" width="400">



从上面代码<font style="color:#f03d3d">webpack-dev-middleware</font>源码可以看到默认情况下<font style="color:#f03d3d">webpack-dev-middleware</font>会设置`createFsFromVolume(new Volume())`为**output**

而`createFsFromVolume(new Volume())`是<font style="color:#f03d3d">memfs</font>库的API。<font style="color:#f03d3d">memfs</font>是一个内存流库。

<img src="./images/image-07-06.png" width="400">



而这些代码可以得出，<font style="color:#f03d3d">webpack-dev-server</font>库使用了<font style="color:#f03d3d">webpack-dev-middleware</font>中间件将**webpack**打包后的结果输出到的内存流之中。

> :whale2: <font style="color:#f03d3d">webpack-dev-server</font>依赖<font style="color:#f03d3d">webpack-dev-middleware</font> 。  <font style="color:#f03d3d">webpack-dev-middleware</font>依赖<font style="color:#f03d3d">memfs</font>



这个中间件有兴趣的诸君可以去[Github](https://github.com/webpack/webpack-dev-middleware)看一下。

那么又为什么将代码打包到内存中。原因就是快。众所周知，内存的读取要快于硬盘。所以为了能更快的处理文件，可以将打包文件缓存内存进行处理。



#### 热更新（HMR）

<font style="color:#f03d3d">webpack-dev-server</font>提供了热更新，这也是一个重要的功能，对于大一些的项目，修改一点代码然后将所有文件重新打包，并且让浏览器重新加载所有文件，

这个操作会很浪费时间，所以提供热更新，只对更改的文件进行重新加载。以便能更快的进行响应。

热更新其实也不是<font style="color:#f03d3d">webpack-dev-server</font>自身提供的，而是使用了**webpack**内置的一个一个*plugin*--<font style="color:#f03d3d">HotModuleReplacementPlugin</font>。

在开启热更新时，<font style="color:#f03d3d">webpack-dev-server</font>为添加这个plugin。

> <font style="color:#f03d3d">webpack-dev-server</font>内部源码，可以看到如果当前开启了热更新（hot）,并且没有添加<font style="color:#f03d3d">HotModuleReplacementPlugin</font>，<font style="color:#f03d3d">webpack-dev-server</font>就会自动添加

<img src="./images/image-07-07.png" width="400">





#### 流程简述

1.  <font style="color:#f03d3d">webpack-dev-server</font>运行
   1. 会开启一个express服务器，浏览器访问这个端口时，会通过<font style="color:#f03d3d">sockjs</font>(一个webScoket的库)与浏览器建立一个长链接，
   2. 自动开启**webpack**的***watch***属性，监听文件变化。
   3. 在开启热更新情况下时，自动添加<font style="color:#f03d3d">HotModuleReplacementPlugin</font>
2. 当文件内容更改后， **webpack**监听到文件改变，会根据配置重新对文件进行重新打包。
3. **webpack**打包完毕后，<font style="color:#f03d3d">webpack-dev-middleware</font>与**webpack**进行通讯，告诉webpack将文件打包到内存之中。
4. 







> :whale2: 这里只是简单的介绍下<font style="color:#f03d3d">webpack-dev-server</font>的流程，具体每个库的内部实现有兴趣的诸君可以自己去看看。

https://www.cnblogs.com/wangpenghui522/p/6826182.html



https://blog.csdn.net/weixin_43684713/article/details/92839419

https://github.com/webpack/webpack-dev-middleware

https://zhuanlan.zhihu.com/p/159318414

https://zhuanlan.zhihu.com/p/30669007

