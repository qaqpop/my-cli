### react

#### react介绍

在当前时代前端，主流的快速应用框架具有两个，[vue.js](https://cn.vuejs.org/)和[react.js](https://reactjs.org/)，关于vue和react哪一个比较“好”，网上众说纷纭。在下就不在此引战。直接介绍react

> :whale2: 以前都说是“三大框架”，还有一个Google开发的[angular](https://angular.cn/)，但是后来angular使用份额越来越少。
>
> 个人感觉是angular的上手成本问题，angular比较偏向后端。angular很多概念对于前端初学者来说那就是噩梦。不过对于前端工程系，在下认为angular是集大成之作。所以在下个人建议，有经验的诸君，可以稍微去看看angular，学一下angular中的思想。 



> :whale2::whale2::whale2:
>
> 在下认为vue和react这种都是快速应用开发工具，可能也会像曾经如日中天的jquery逐渐消失，所以在下个人认为不要盲目只追求这种快速工具，而是花时间去学习***原点***。例如**设计思想**和**数据结构**。这种就是***原点***，所有的*术*都是起源于此。而快速应用框架（或语言）只不过是应用工具罢了。



<font style="color:#f03d3d">React</font>是一个用于构建用户界面的 JavaScript 库，<font style="color:#f03d3d">React</font>其本身其实一个特别简单的库，将页面抽象为虚拟DOM，在更新DOM时先进行对比哪些要更新的，然后只更新那些真正需要更新的，以此节省性能。其实这个操作很容易去想通。



先来整理一<font style="color:#f03d3d">React</font>框架的背景思路。

当早期网站时代，都是直接操作DOM来构建网站的，虽然有着<font style="color:#f03d3d">JQuery</font>这种利器，但是还是直接操作DOM年代。



但是直接操作DOM，对于程序员会有极高的要求，DOM优化并不是每一个程序都能掌握的。  所以极为容易带来DOM性能浪费， 而随着项目的扩大，这种问题会带来网站性能问题。



在这里只说一下DOM节点的操作优化

DOM节点操作优化主要有两个方面，

1.  增加DOM，
2. 更新DOM



##### 增加DOM

有经验的诸君都知道在增加复杂DOM时，需要先在内存中构建好DOM结构，然后使用API去添加。

这样的做法时只与真实DOM接触一次，所以也只会重新渲染一次DOM。从而提高性能

例如下面代码，*appendDom2* 性能要比*appendDom1*， *appendDom2* 函数只是调用一次真实DOM，减少了渲染次数。

```js
function appendDom1(){
  for(item of [1,2,3,4]){
    const li =  document.createElement('li');
    li.innerText = item;
    document.body.appendChild(li)
  }
}


function appendDom2(){
   //	使用createDocumentFragment创建文档片段于内存
  const  fragement = document.createDocumentFragment();
  for(item of [1,2,3,4]){
    const li =  document.createElement('li');
    li.innerText = item;
    fragement.appendChild(li)
  }

  document.body.appendChild(fragement)
}
```



但是这些细节往往是很多程序员的痛。在开发时很容易忽略。

那么最好的办法并不是时刻刻惦记这些细节，而是能开发时忽略。



想做到这样那么就得封装，自己去封装一个**createElement**函数去替代原生的**createElement**

在自己封装的内部做好优化策略，别人使用自定义封装的函数去增加DOM

<font style="color:#f03d3d">React</font>就是这样干的，自定义了**createElement**，将优化策略进行了封装。从而可以忽略开发细节。

```js
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```



不过注意的是，这个函数并没有插入到真实DOM中，而是创建了一个**虚拟DOM**，也就是构成了DOM结构，这样做可以脱离平台限制，做到跨平台

>:whale2::whale2: **React.createElement**创建的是***虚拟DOM***，也就是DOM结构，是通过另一个库来插入到真实DOM中，这样做达到了解耦效果



##### 更新DOM

更新时的问题是往往会更新了不必更新DOM，或者DＯＭ频繁更新造成多次渲染，从而带来了性能浪费。

> :whale2: DOM更新包括 增删改




解决这一问题一般想到的就是做一个真实DOM数据缓存，更新DOM前进行排除掉不必要的更新，以节省性能。

> :whale2: DOM缓存不需要存储DOM所有信息，只存储基础信息能进行排查即可



这种缓存DOM数据的方案就叫***虚拟DOM（Virtual DOM）***， 而排除算法就叫做***diff***算法



也就是<font style="color:#f03d3d">React</font>常说的**VD**和**diff**两个核心。

***虚拟DOM***和***diff算法***听起来很简单，简单实现起来也不难，但是实现高性能就有很大难度了。

React的***diff***就是一个高性能的算法





有了自定义函数、虚拟DOM和diff算法，就可以在编码时忽略各种细节也可以构建高性能的代码了。

但是使用这种原生DOM操作方式总感觉不太舒服：没有结构感、不美观。

最好能使用一种类HTML模板结构去编写代码，这样才会舒服很多。



<font style="color:#f03d3d">React</font>便提供了一种模板解决了这种痛处---<font style="color:#f03d3d">JSX</font>模板

这是一种JS的扩展语言模板。允许在JS中以**标签**形式构建元素。

```js
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```



<font style="color:#f03d3d">JSX</font>其实是**React.createElement**语法糖，在打包过程中会转换为此方法。

毕竟<font style="color:#f03d3d">JSX</font>只是**React**提供的一种模板，浏览器根本不认识。



> :whale2::whale2::whale2:<font style="color:#f03d3d">JSX</font>本质是**React.createElement**语法糖，并且支持使用**React.createElement**方式构建DOM，所以React极为灵活，有的时候灵活的让人头疼

​	

> :whale2::whale2: <font style="color:#f03d3d">JSX</font>只是一个扩展语言，或者可以说是<font style="color:#f03d3d">React</font>提供的一种构建代码方式，本质是一个语法糖。 <font style="color:#f03d3d">JSX</font>中定义的事件、style、class其实是<font style="color:#f03d3d">JSX</font>语法。并不是DOM原生语法。所以类似*class*在DOM语法为*class*，而在<font style="color:#f03d3d">JSX</font>中为*className*



> :whale2::whale2: <font style="color:#f03d3d">JSX</font>转换<font style="color:#f03d3d">React.createElement</font>操作使用的是**Babel**提供的一个**plugin**，在下面再介绍



>  :whale2: <font style="color:#f03d3d">JSX</font>目前被业界通用化。<font style="color:#f03d3d">Vue@3.X</font>也支持<font style="color:#f03d3d">JSX</font>
>
>  :whale2:<font style="color:#f03d3d">Vue</font>底层也使用了虚拟DOM，:whale2:<font style="color:#f03d3d">Vue</font>模板语言则是**template**



这就是<font style="color:#f03d3d">React</font>的整体思路。而<font style="color:#f03d3d">React</font>本质也就这么简单，只不过<font style="color:#f03d3d">React</font>做到了高性能的算法。





#### 安装react

<font style="color:#f03d3d">React</font>目前最新版本为***17.0.1***，对<font style="color:#f03d3d">React</font>有兴趣的诸君可以从老版本循循渐进的学习一下<font style="color:#f03d3d">React</font>。

> yarn add react@17.0.1



<font style="color:#f03d3d">react</font>这个库是一个核心库，里面具有**虚拟DOM**、**JSX语法支持**等一系列核心内容。

但是此库并不支持将**虚拟DOM**插入到**真实DOM**中，做这一步的库是<font style="color:#f03d3d">react-dom</font>库。

> yarn add react-dom@17.0.1



> :whale2: 将react核心库与跟真实DOM转换的库分离开，这样可以做到平台的隔离性。例如在其它平台可以使用另外的库转换为平台识别的元素。



接下来仿照**react-cli**组织代码。



第一步：在html页面中创建一个元素，以此元素作为*react顶级节*点。

<img src="./images/image-05-01.png" width="400">

> :whale2:**vue.cli**中也具有这个节点，只不过ID名称不一样，有兴趣的诸君可以去看看。



接下来处理JS，在之前各种打包中都是使用***index.js***文件作为打包文件。**react**只不过是承载在webpack上的应用框架罢了。



在***index.js***文件中使用react。

```js
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render((
  <h1 className="greeting">
    Hello, world!
  </h1>
), document.getElementById('root'));

```



可以看到，<font style="color:#f03d3d">React</font>执行了**ReactDOM.render**方法，这个方法就是将**虚拟DOM** 添加到指定DOM节点之中。

> :whale2::whale2: vue中也是这样设置，有兴趣的诸君可以看一下vue.cli。本质它们都是搭载在webpack上的应用框架。



不过如果现在打包查看结果的话，打包时会报错

<img src="./images/image-05-02.png" width="400">



这个原因就是**JSX**语法问题， 在前面说过**JSX**是**React**提供的一种模板语言，在非**React**外是无法识别的，

所以需要将**JSX**语法转换为**React.createElement**函数。



提供这个转换操作的是**Babel**中<font style="color:#f03d3d">@Babel/plugin-syntax-jsx</font>

不过不需要引用这个**plugin**。 **Babel** 预设了一个**preset**--[@babel/preset-react](https://www.babeljs.cn/docs/babel-preset-react)， 对**React**使用到的**plugin**进行了封装



所以只需要安装<font style="color:#f03d3d">@babel/preset-react</font>即可

> yarn add -D @babel/preset-react@7.12.10



> :whale2: 在[Babel官网](https://www.babeljs.cn/repl)可以进行测试React组件转换情况，有兴趣的诸君可以去试一试

这时候再进行build就会打包成功。



打包生成的代码最后就是那段代码

<img src="./images/image-05-03.png" width="400">



并且在浏览器可以直接显示代码。

<img src="./images/image-05-04.png" width="400">

> :whale2:代码由于加入了babel，并且设置了ie9可支持，所以同样可以运行再IE上，有兴趣的诸君可以测试一下

运行完美成功。



**React**代码运行成功，接下来就该管理组织**React**代码了，刚刚只是测试，在**index.js**文件中写了一个固定的react组件。

要做的是利用**index.js**文件设置根节点，然后让**React**接管代码



其实在刚才就已经是根节点了，只不过这个根节点是直接写在了***index.js***文件之中。

只要将根节点提出去，然后看起来就会舒服了

<img src="./images/image-05-05.png" width="400">

<img src="./images/image-05-06.png" width="400">





在**app.jsx**文件中创建一个默认组件作为**React**的根节点。在**index.js**使用此节点添加到DOM元素中。

此时就可以在**app.jsx**组件之中随意添加子组件，整个代码就像**托管**在了**app.jsx**之中



> :whale2: 
>
> * React 组件分为函数组件和class组件，函数组件简单，编写颗粒度比较小的组件时是一个很好的选择。class组件封装性强，易作为组件主干。具体使用还是要看编写代码之人。
>* **app.jsx**中返回**<></>**代表*空标签*，React组件只允许返回一个元素，但是有时候组件为元素数组，所有可以在外部包一层空标签。React在渲染时会忽略*空标签*
> * React组件名称约定为大写形式，以区分真实DOM标签。 



在使用**.jsx**文件时，还需要简单的设置一下**webpack**。

1. 忽略后缀引用。需要在***resolve.extensions***属性中设置忽略后缀
2. **React语法**需要**Babel**做转换，所以所有的**.jsx**文件都需要走**babel-loader**

```js
const modules = {

  module:{
    rules:[
      {
        //  所有的.js或者.jsx文件都走babel-loader
        test: /\.js(x?)$/,
        include: path.join(config.root,'src'),
        loader: "babel-loader"
      }
    ]
  },
  resolve:{
    //  可互忽略的后缀
    extensions:['.jsx', '.js', '.json'],
  }
}
```



此刻就做到了在**webpack**中基本添加的框架，使用**React**托管代码。而像**React Router** 或**Redux**,只不过是*运行在React之上快速开发的扩展库*罢了。在此就不添加。

> :whale2: Vue原理与React一致。只是各自框架的API不同





### browserslist



#### browserslist是什么

在配置**babel**时使用到了一个**browserslist**属性来判断生成代码的环境，这个属性到底是什么东西，接下来看这玩意



在**babel**打包时，使用到了浏览器版本依赖，根据浏览器版本转换代码。

不同公司项目对于浏览器版本有着不同要求，例如：

有些支持大部分用户使用的版本即可，

有的像政府项目则需要支持IE，

有的公司则可以直接替客户选择浏览器，而这种直接仅仅支持最新版本浏览器就可以。



所以就需要在打包设置浏览器版本，这个需求像**babel**这类的库都是支持设置(`target`)

但是，在打包时不仅仅**babel**才依赖浏览器版本，像CSS往往也需要去设置指定的版本环境。

而这时候对于开发来说的解决方案就是：将浏览器版本依赖编写在一个配置文件的属性中，然后设置时读取这个配置文件属性。

这样能做到方便维护。



有一种想法，能否让**babel**这类的库默认支持（依赖）写在一个地方的配置，也就是写一个配置文件或者库，自定义配置地址等信息，让**babel**去支持。

如果要实现这样，那就得开发一个让业界普遍认可的设置库。

<font style="color:#f03d3d">browserslist</font>就是这样的存在。   

<font style="color:#f03d3d">browserslist</font>是一个极为强大的设置浏览器版本依赖库，很多库都依赖支持此库。



所在在设置浏览器依赖时支持设置<font style="color:#f03d3d">browserslist</font>，打包时依赖基本上都依赖此库

> :whale2: 虽然不依赖此库则需要根据使用的库去设置，不过前端打包所使用到的库都支持<font style="color:#f03d3d">browserslist</font>



#### browserslist设置

<font style="color:#f03d3d">browserslist</font>库提供了两种配置方式，

1. 配置**package.json**的***browserslist***中
2. 配置在根目录下约定文件：***.browserslistrc.json***中，文件名称一般为***.browserslistrc***

个人感觉直接使用第一种方式就行，没必要单独再建立一个文件。



<font style="color:#f03d3d">browserslist</font>还可以设置为对象形式，进而区分环境依赖。

```js
  "browserslist": {
    "production": [
      "ie 10",
       "Chrome > 75"
    ],
   "development": [
      "Chrome > 75"
    ],
  }
```

但是需要设置环境变量，环境变量名称为`process.env.BROWSERSLIST_ENV`，环境变量在**webpack**中配置



#### browserslist支持的浏览器

<font style="color:#f03d3d">browserslist</font>支持设置当前基本上所有的浏览器，在Github上作者说明了可以设置的浏览器

可以看到，<font style="color:#f03d3d">browserslist</font>几乎支持所有浏览器：PC、安卓、IOS 甚至还有国内Baidu。

设置浏览器时名称不区分大小写

<img src="./images/image-05-07.png" width="400">

#### browserslist属性

<font style="color:#f03d3d">browserslist</font>能得到业界的认可，也就代表<font style="color:#f03d3d">browserslist</font>的功能强大，

也的确是这样，<font style="color:#f03d3d">browserslist</font>设置各种的属性去配置自定义浏览器依赖。

从最简单如 直接设置各种浏览器版本和大于某个浏览器版本，还可以设置使用浏览器的比例情况。下面简单介绍下



* 指定版本号： 最简单的就是指定浏览器版本号，例如： `IE 11`

* 范围版本号：<font style="color:#f03d3d">browserslist</font>支持设置指定范围的版本号，例如：`Chrome > 75`, <font style="color:#f03d3d">browserslist</font>还支持 *>=*、*<*、*<=*语法设置

* ===== >1%

* 浏览器使用率：<font style="color:#f03d3d">browserslist</font>支持设置指定区域内浏览器份额的浏览器版本。例如：`cover 99.5%`代表设置全球内浏览器使用率达到99.5%比例的浏览器。 

  并且还支持指定地区内的使用率： `cover 99.5% in US` 美国区域内的浏览器使用统计数据   `cover 99.5% in alt-AS` 亚洲区域浏览器使用统计数据

  也自定义设置地区，具体参考[Github文档](https://github.com/browserslist/browserslist#custom-usage-data)

* 最新版本的浏览器：<font style="color:#f03d3d">browserslist</font>支持设置最新的几个版本浏览器， 例如：`last 2 versions` 设置每个浏览器最新的两个版本，

  还可以设置指定浏览器的最新版本：`last 2 Chrome versions` Chrome浏览器最新的两个版本

* 支持not：<font style="color:#f03d3d">browserslist</font>支持***not***，也就是排除指定的浏览器，例如：`not ie <= 8` 排除IE8及以下的

* 支持组合设置：<font style="color:#f03d3d">browserslist</font>支持组合设置，这也是<font style="color:#f03d3d">browserslist</font>灵活所在，例如上之前使用

  ```json
   "browserslist": [
        "ie 9",
         "Chrome > 75"
      ],
  ```

  这就是一个**并且（and）组合**设置，<font style="color:#f03d3d">browserslist</font>还支持**或者（or）组合**：`> .5% or last 2 versions`。

  

组合设置配合配置其它各种设置，能灵活的控制各种需求。

而这也代表了<font style="color:#f03d3d">browserslist</font>的强大之处，不过一般不会设置多么复杂.





### 总结

> :whale2::whale2::whale2:
>
> * **React**是一个快速构建高性能网站的开发框架
>
> * **React**使用了**虚拟DOM**和**diff**算法优化了DOM操作
> * **React**利用**虚拟DOM**来解耦平台限制，可以实现跨平台
>
> * **JSX**只是一个模板扩展语法。其本质是**React.createElement**的语法糖
> * **browserslist**是一个强大的浏览器版本设置库，能满足各种需求



### 本文参考

* [vue核心之虚拟DOM(vdom)](https://www.jianshu.com/p/af0b398602bc)

* [browserslist Github](https://github.com/browserslist/browserslist)

* [babel-preset-react官网](https://www.babeljs.cn/docs/babel-preset-react)



### 本文依赖

* [react@17.0.1](https://www.npmjs.com/package/react/v/17.0.1)

* [react-dom@17.0.1](https://www.npmjs.com/package/react-dom/v/17.0.1)

* [@babel/preset-react@7.12.0](https://www.npmjs.com/package/@babel/preset-react/v/7.12.10)



### package.json

```json
{
  "name": "my-cli",
  "version": "1.0.0",
  "main": "index.js",
  "author": "mowenjinzhao<yanzhangshuai@126.com>",
  "license": "MIT",
  "devDependencies": {
    "@babel/core": "7.12.10",
    "@babel/plugin-transform-runtime": "7.12.10",
    "@babel/preset-env": "7.12.11",
    "@babel/preset-react": "7.12.10",
    "@babel/runtime-corejs3": "7.12.5",
    "babel-loader": "8.2.2",
    "clean-webpack-plugin": "3.0.0",
    "html-webpack-plugin": "4.5.0",
    "terser-webpack-plugin": "5.0.3",
    "webpack": "5.14.0",
    "webpack-cli": "4.2.0"
  },
  "dependencies": {
    "core-js": "3.8.1",
    "jquery": "3.5.1",
    "react": "17.0.1",
    "react-dom": "^17.0.1",
    "regenerator-runtime": "0.13.7"
  },
  "scripts": {
    "start": "webpack --mode=development  --config webpack.config.js",
    "build": "webpack --mode=production  --config webpack.config.js"
  },
  "browserslist": [
    "ie 9",
    "Chrome > 75"
  ]
}

```



### webpack.config.js

```js
const path = require('path')
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')


const config = {
  root: path.join(__dirname, './'),
}

const modules = {

  //  入口文件
  //  字符串形式
  entry: path.join(config.root, 'src/index.js'),
  //  对象形式
  // entry:{
  //   'index':  path.join(config.root, 'src/index.js'),
  // },

  //  出口文件
  //  字符串形式
  // output:path.join(config.root, './dist/[name].js')
  //对象形式
  output: {
    //  出口文件的目录地址
    path: path.join(config.root, 'dist'),
    //  出口文件名称，contenthash代表一种缓存，只有文件更改才会更新hash值，重新打包
    filename: '[name]_[contenthash].js'
  },

  //devtool:false, //'eval'

  module:{
    rules:[
      {
        //  所有的.js或者.jsx文件都走babel-loader
        test: /\.js(x?)$/,
        include: path.join(config.root,'src'),
        loader: "babel-loader"
      }
    ]
  },


  optimization: {
    minimize: false,
    minimizer: [
      new TerserPlugin({
        //  包含哪些文件
        include:  /\.js(\?.*)?$/i,
        // //  排除哪些文件
        // exclude:/\.js(\?.*)?$/i,
        //  多进程并行运行，默认为true，开启，默认并发数量为os.cpus()-1
        //  可以设置为false(不使用多线程)或者数值（并发数量）
        parallel:true,

        //  可以设置一个function，使用其它压缩插件覆盖默认的压缩插件，默认为undefined，
        minify:undefined,

        terserOptions: {
          // //  是否防止篡改函数名称，true代表防止篡改，即保留函数名称，false即可以篡改，
          // //  此属性对使用Function.prototype.name
          // //  默认为false
          keep_fnames:false,
          // //  是否防止篡改类名称
          keep_classnames:false,
          // //  设置一些其它的解析
          parse: {},
          //  最小化es6模块。默认为false
          module:true,
          //  ·压缩配置

          //  format和output是同一个属性值，，名称不一致，output不建议使用了，被放弃
          format: {
            comments:false,
          },
          //  是否支持IE8，默认不支持
          ie8:false,
          compress: {
            // 是否使用默认设置，这个属性当只启用指定某些选项时可以设置为false
            defaults:false,
            //  是否移除无法访问的代码
            dead_code:false,

            // 折叠仅仅使用一次的变量
            collapse_vars:true,
            warnings:true,
            //  是否删除所有 console.*语句，默认为false，这个可以在线上设置为true
            //  是否删除所有debugger语句，默认为true
            drop_debugger:true,
            //  移除指定func，这个属性假定函数没有任何副作用，可以使用此属性移除所有指定func
            // pure_funcs: ['console.log'], //移除console
          },
        },
        //  是否将注释提出到单独的文件中
        //  值Boolean|String|RegExp|Function<(node, comment) -> Boolean|Object>|Object
        //  默认为true， 只提取/^\**!|@preserve|@license|@cc_on/i注释
        //  感觉没什么特殊情况直接设置为false即可
        extractComments:false,
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
      template: path.join(config.root, 'src/index.html') ,
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
  ],

  resolve: {
    alias:{
      //  设置路径别名
      '@': path.join(config.root, 'src') ,

      '~':  path.join(config.root, './src/assets') ,
    },
    //  可互忽略的后缀
    extensions:['.jsx', '.js', '.json'],
    //  默认读取的文件名
    mainFiles:['index', 'main'],
  }
}

//  使用node。js的导出，将配置进行导出
module.exports = modules
```



### .babelrc

```json
{
  "presets": [
    "@babel/preset-react",
    [
      "@babel/preset-env",
      {
        "modules":false
        //  移除useBuiltIns设置
        //      "targets": "chrome > 75",
        //      "useBuiltIns": "usage",
        //      "corejs": {
        //        "version": 3,
        //        "proposals":true
        //      }
      }
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": {
          "version": 3,
          "proposals": true
        }
      }
    ]
  ]
}
```

