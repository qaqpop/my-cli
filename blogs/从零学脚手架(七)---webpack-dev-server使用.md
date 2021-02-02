### webpack-dev-server使用



#### 什么是webpack-dev-server



诸君在使用**vue-cli**或者**react-cli**这类脚手架时，`yarn start`命令会开启一个本地服务器，浏览器访问这个服务器端口就可以浏览代码，并且更新代码后页面会自动刷新页面，让开发者能够更好的专注于开发。这个就是**dev-server**。 

 按照寻常打包流程：更改代码，手动执行打包代码，手动刷新浏览器， 一套操作下来就真的是编码30秒，运行2分钟了。**dev-server**是为了让开发者能够专注于编码。而忽略各种关于其他操作。

**dev-server** 就是运行一个服务器，与浏览器进行长链接。然后代码代码或者文件更新时，刷新浏览器这一套操作。

**webpack**中这个库就叫做<font style="color:#f03d3d">webpack-dev-server</font>，使用这个库便可以完成以上操作。

> :whale2: <font style="color:#f03d3d">webpack</font>配置本身就支持监听文件变化，<font style="color:#f03d3d">webpack-dev-server</font>只是默认开启<font style="color:#f03d3d">webpack</font>的监听属性。这个在之后详细说。



<font style="color:#f03d3d">webpack-dev-server</font>这个库在下想比较深入的讲解下，所以分成两篇来进行：第一篇只说<font style="color:#f03d3d">webpack-dev-server</font>的使用配置，第二篇稍微讲解一些流程与其原理。



诸君请拭目以待



#### webpack-dev-server 安装



##### webpack-cli/bin/config-yargs 的问题



截至到目前为止，<font style="color:#f03d3d">webpack-dev-server</font> 目前**最新版本**为 `@3.11.2`，

<img src="./images/image-07-01.png" width="400">

有用过的诸君会知道在使用此版本与**webpack@5.X**使用时会有一个问题:`Cannot find module 'webpack-cli/bin/config-yargs'`

这个我个人感觉是官方有些坑了。

先来安装这个版本的<font style="color:#f03d3d">webpack-dev-server</font>

> yarn add -D webpack-dev-server@3.11.2



了解过<font style="color:#f03d3d">webpack-dev-server</font>的诸君会知道，执行<font style="color:#f03d3d">webpack-dev-server</font>的命令为`webpack-dev-server`



官方NPM介绍文档也是`webpack-dev-server`命令

<img src="./images/image-07-02.png" width="400">

所以一般都会将`yarn start`命令设置为`webpack-dev-server`，

在这里使用`yarn start:dev` 命令设置为`webpack-dev-server`，

<img src="./images/image-07-03.png" width="400">



按照正常来说，此时执行`yarn start:dev`便可以执行<font style="color:#f03d3d">webpack-dev-server</font>。

但实际上，此时执行`yarn start:dev`会直接报错。

<img src="./images/image-07-04.png" width="400">



提示找不到<font style="color:#f03d3d">webpack-cli</font>库中的**config.yargs**模块。我感觉很多刚学习**webpack**并且搜索能力稍微弱一些的新人会卡很久。

> :whale2:  配置使用的<font style="color:#f03d3d">webpack-cli@4.4.0</font>和<font style="color:#f03d3d">webpack@4.14.0</font>



这个问题其实很简单，直接在[github](https://github.com/webpack/webpack-dev-server/issues?q=yargs+)就能搜到答案

<img src="./images/image-07-05.png" width="400">



可以看到答案，使用另一条命令就可以：`webpack serve`

<img src="./images/image-07-06.png" width="400">



此时使用`yarn start`就可以执行成功。默认启动的是**8080端口**号

<img src="./images/image-07-07.png" width="400">



那么这到底怎么回事呢？通过查看源码和测试<font style="color:#f03d3d">webpack-dev-server@4.0.0beta.0</font>在下略有猜测。

先看一下<font style="color:#f03d3d">webpack-dev-server@3.11.2</font>的一段代码

<img src="./images/image-07-08.png" width="400">

这是**webpack-dev-server/bin/webpack-dev-server.js**中的一段代码。使用`webpack-dev-server`命令执行时便会执行此模块。

在这个模块中加载了**webpack-cli/bin/** *config/* **config-yargs**和**webpack-cli/bin/** *utils/* **convert-argv**。



但是在<font style="color:#f03d3d">webpack-cli@4.X</font>版本代码结构已经改变，并没有这两个模块

<img src="./images/image-07-09.png" width="400">

可以看到，在<font style="color:#f03d3d">webpack-cli@4.4.0</font>中*bin目录*只有一个**cli模块**，所以可想而知就找不到了。



在使用<font style="color:#f03d3d">webpack@4.X</font>版本时，使用的<font style="color:#f03d3d">webpack-cli@3.X</font>，<font style="color:#f03d3d">webpack-dev-server@3.X</font>

后来更新到<font style="color:#f03d3d">webpack@5.X</font>时，<font style="color:#f03d3d">webpack-cli</font>也进行了大版本的更新，变成了<font style="color:#f03d3d">webpack-cli@4.X</font>，并且加入了`webpack serve`命令执行**webpack-dev-server**



但是<font style="color:#f03d3d">webpack-dev-server</font>并没有跟着更新大版本，依然是<font style="color:#f03d3d">webpack-dev-server@3.X</font>。并且也没有去更新这段代码，也就造成了使用`webpack-dev-server`命令报错的问题。



这个问题在<font style="color:#f03d3d">webpack-dev-server@4.X</font>进行了修复。不过<font style="color:#f03d3d">webpack-dev-server@4.X</font>目前只有一个<font style="color:#f03d3d">webpack-dev-server@4.0.0beta.0</font>版本。

<img src="./images/image-07-10.png" width="400">



在<font style="color:#f03d3d">webpack-dev-server@4.0.0beta.0</font>的[github](https://github.com/webpack/webpack-dev-server/blob/v4.0.0-beta.0/bin/webpack-dev-server.js)可以看到**/bin/webpack-dev-server.js**模块中没有了上面两段代码。

<img src="./images/image-07-11.png" width="400">



并且在<font style="color:#f03d3d">webpack-dev-server@4.0.0beta.0</font>文档中的命令是`webpack serve`

<img src="./images/image-07-12.png" width="400">





也就是其实这个问题是这样的：

:whale2::whale2:  <font style="color:#f03d3d">webpack-cli@4.X</font>版本开始，**webpack**团队将**dev-server**的命令改为了`webpack serve` 。<font style="color:#f03d3d">webpack</font>与<font style="color:#f03d3d">webpack-cli</font>都进行了大版本的更新。而<font style="color:#f03d3d">webpack-dev-server</font>并没有进行大版本更新，所以会导致老命令`webpack-dev-server`的错误。

> :whale2: 这个问题也是暂时性的，

`webpack serve`命令在 <font style="color:#f03d3d">webpack-cli@4.0.0</font>版本文档中有提到。

<img src="./images/image-07-13.png" width="400">





##### webpack serve

`webpack serve`命令的执行，入口是跟`webpack`命令一样，都是<font style="color:#f03d3d">webpack</font>库。在<font style="color:#f03d3d">webpack</font>库中调用<font style="color:#f03d3d">webpack-cli</font>库模块。然后在<font style="color:#f03d3d">webpack-cli</font>库根据其命令调用<font style="color:#f03d3d">@webpack-cli</font>库中的**serve模块**，开启<font style="color:#f03d3d">webpack-dev-server</font>中的服务器模块。这些代码都是<font style="color:#f03d3d">webpack-cli@4.X</font>新加的，所以并不会报错。详细内容在下一篇介绍。



<img src="./images/image-07-14.png" width="400">



> :whale2::whale2: <font style="color:#f03d3d">webpack</font>、<font style="color:#f03d3d">webpack-cli</font>、<font style="color:#f03d3d">webpack-dev-server</font>这三个跨库调用模块都是根据模块路径调用的。所以只要某个库文件结构稍微改动，就会像`webpack-dev-server`命令这样直接报错。 不过在新版本代码进行了优化，通过像`serve`这样的约定名称进行跨库调用。尽可能降低了耦合度。
>
> 
>
> :whale2:<font style="color:#f03d3d">@webpack-cli</font>是<font style="color:#f03d3d">webpack-cli4.X</font>依赖的一个库。





#####  webpack-dev-server@3.X 与webpack@5.X 关于HOT的问题。



在安装完<font style="color:#f03d3d">webpack-dev-server</font>之后，便可以直接使用命令去运行，并且开启了一个**8080端口**的服务器，这是使用的默认配置。

在上面说过  <font style="color:#f03d3d">webpack-dev-server</font>库的一个功能就是在代码更新后，会通过**WebScoket**推送浏览器进行更新。但是以目前使用的<font style="color:#f03d3d">webpack-dev-server@3.11.2</font>和<font style="color:#f03d3d">webpack@5.14.0</font>  **HOT**会有问题。



下面先来做一个测试



<img src="./images/image-07-15.png" width="400">



运行`yarn start`后就可以使用浏览器进行查看



<img src="./images/image-07-16.png" width="400">

此时将代码进行更新，会发现浏览器并没有更新，并且可以看到，浏览器网络中***WS***没有推送数据

> :whale2: **WS**“：WebSocket推送数据显示的窗口



<img src="./images/image-07-17.png" width="400">



<img src="./images/image-07-18.png" width="400">





在下对这个问题调试了下代码，发现WS根本就没有连接上，后来在[github](https://github.com/webpack/webpack-dev-server/issues/2980)中找到了答案。

原因是因为**package.json**文件中的***browserslist***，将此属性去掉就可以进行**HOT**。

<img src="./images/image-07-19.png" width="400">





这是一个BUG，但是按照官方给的解释好像只会在<font style="color:#f03d3d">webpack@4.X</font>修复这个问题。我使用<font style="color:#f03d3d">webpack@4.0.0beta.0</font>测试就没有这个问题

<img src="./images/image-07-20.png" width="400">





#### webpack-dev-server配置

<font style="color:#f03d3d">webpack-dev-server</font>使用的配置是配置在<font style="color:#f03d3d">webpack</font>中的，在<font style="color:#f03d3d">webpack</font>配置项中具有一个`devServer`配置，这个就是设置<font style="color:#f03d3d">webpack-dev-server</font>的。



##### 版本选择

目前<font style="color:#f03d3d">webpack@5.X</font>稳定版才4个月，并且<font style="color:#f03d3d">webpack-dev-server</font>还没有新版本的稳定版。所以<font style="color:#f03d3d">webpack@5.X</font>一般还是只是学习使用。

<font style="color:#f03d3d">webpack-dev-server@4.0.0beta.0</font>又更改了很多属性。

在此想将<font style="color:#f03d3d">webpack-dev-server@4.0.0beta.0</font>和<font style="color:#f03d3d">webpack-dev-server@3.X</font>两个版本的配置都讲解一下。

所以在此进行配置两套环境，分别在不同代码分支

1. <font style="color:#f03d3d">webpack@4.X</font>、<font style="color:#f03d3d">webpack-cli@3.X</font>、<font style="color:#f03d3d">webpack-dev-server@3.X</font>
2. <font style="color:#f03d3d">webpack@5.X</font>、<font style="color:#f03d3d">webpack-cli@4.X</font>、<font style="color:#f03d3d">webpack-dev-server@4.X</font>



#### webpack-dev-server配置



##### @3.11.2

> :whale2:  webpack@4.X 分支



> yarn add -D webpack@4.46.0 webpack-cli@3.3.12 webpack-dev-server@3.11.2 terser-webpack-plugin@4.2.3



> :whale2::whale2: <font style="color:#f03d3d">terser-webpack-plugin</font>包需要降到`@4.X`。 









