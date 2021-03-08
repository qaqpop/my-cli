接下来介绍一个打包编译过程中一个极为重要的工具--<font style="color:cornflowerblue">babel</font>。

### ES6的枷锁

细心的朋友可以知道，在之前打包编译测试都是使用简单的<font style="color:cornflowerblue">ES5</font>特性，

并没有使用过<font style="color:cornflowerblue">ES6（ES2015+）</font>特性（**import**除外）

这是因为<font style="color:cornflowerblue">webpack</font>本身不会处理代码中的<font style="color:cornflowerblue">ES6（ES2015+）</font>特性，所以也就没有使用。



先来做一个测试

在 **/src/index.js** 文件使用部分<font style="color:cornflowerblue">ES6（ES2015+）</font>，查看打包编译代码会发现<font style="color:cornflowerblue">webpack</font>并没有处理<font style="color:cornflowerblue">ES6（ES2015+）</font>特性。

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-04-01.png?raw=true" width="600">



自从<font style="color:cornflowerblue">ES6（ES2015+）</font>时代来临后，前端才具有了飞速发展。<font style="color:cornflowerblue">ES6（ES2015+）</font>各种特性也给开发人员带来了便利。

毫不客气的说，没有人再想写<font style="color:cornflowerblue">ES5</font>代码了。



但是，前端代码的<font style="color:cornflowerblue">执行环境（浏览器）</font>是由用户决定的，如果用户一直使用旧版本浏览器，那么新特性就无法运行在用户浏览器中。

这时候就需要一种工具：将代码使用的<font style="color:cornflowerblue">ES6（ES2015+）</font>特性转换为<font style="color:cornflowerblue">ES5</font>特性

这个工具就叫做：<font style="color:cornflowerblue">babel</font>

> :whale2::whale2: :whale2: <font style="color:cornflowerblue">webpack</font>作为一个<font style="color:cornflowerblue">打包器</font>。为<font style="color:cornflowerblue">babel</font>提供了扩展支持。

> :whale2::whale2:  <font style="color:cornflowerblue">ES6</font>是<font style="color:cornflowerblue">ES2015+</font>所有版本统称   有的文章会写成<font style="color:cornflowerblue">ES7</font>、<font style="color:cornflowerblue">ES8</font>。但其实都是<font style="color:cornflowerblue">ES6</font>。

> :whale2: 上面代码使用到了<font style="color:cornflowerblue">ES6</font>的 **Promise类型**、**块级声明（const）**、**箭头函数**、**for-of语法**、**数组API**、**await**属性，不了解<font style="color:cornflowerblue">ES6</font>的朋友可以学习阮一峰老师的[ES6入门教程](https://es6.ruanyifeng.com/)



### babel

#### babel介绍

<font style="color:cornflowerblue">ES6</font>来临后，前端开启了百花绽放的时代。从而也导致了<font style="color:cornflowerblue">ES6</font>转<font style="color:cornflowerblue">ES5</font>的工作并不仅仅局限于**JS**语言的原始特性。

例如：<font style="color:cornflowerblue">Typescript</font>、<font style="color:cornflowerblue">JSX</font>语法等等。



这些都可以使用<font style="color:cornflowerblue">babel</font>进行处理。

<font style="color:cornflowerblue">babel</font>的设计思想也与<font style="color:cornflowerblue">webpack</font>一致：提供<font style="color:#06f">**核心引擎**</font> + <font style="color:#06f">**插件化**</font>的模式管理

<font style="color:cornflowerblue">babel</font>提供了一个<font style="color:#06f">**核心引擎**</font>库：[@babel/core](https://www.npmjs.com/package/@babel/core) 和 扩展插件库配置。



#### @babel/cli

<font style="color:cornflowerblue">babel</font> 其实并不是<font style="color:cornflowerblue">webpack</font>一个<font style="color:cornflowerblue">扩展插件</font>，它是一个独立的工具。可以进行单独配置、运行。

<font style="color:cornflowerblue">babel</font>提供了一个[@babel/cli](https://www.npmjs.com/package/@babel/cli)库，与[webpack-cli](https://www.npmjs.com/package/webpack-cli)库一样，允许命令行直接运行<font style="color:cornflowerblue">babel</font>

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-04-02.png?raw=true" width="600">

``` js
{
  "scripts": {
	"build": "babel src -d lib"
  }
}
```

在此就不介绍<font style="color:cornflowerblue">@babel/cli</font>这一块的内容了，有兴趣的朋友可以去[官网](https://www.babeljs.cn/docs/usage)学习

> :whale2::whale2::whale2: <font style="color:cornflowerblue">babel</font>作为一个独立工具，理论可以配置在所有<font style="color:cornflowerblue">打包器</font>中。



####  babel-loader

<font style="color:cornflowerblue">babel</font>作为一个独立的工具，那么肯定不能直接配置在<font style="color:cornflowerblue">webpack</font>中。

那么想要<font style="color:cornflowerblue">babel</font>执行在<font style="color:cornflowerblue">webpack</font>，就必须提供一个<font style="color:cornflowerblue">适配器</font>，来桥接两个库。

而这个<font style="color:cornflowerblue">适配器</font>就是[babel-loader](https://www.npmjs.com/package/babel-loader)。

<font style="color:#f03d3d">babel-loader</font>在<font style="color:cornflowerblue">webpack</font>执行时拦截需要转换文件，将文件先交给<font style="color:cornflowerblue">babel</font>进行转换，然后再传回<font style="color:cornflowerblue">webpack</font>执行接下来的操作。

而<font style="color:#f03d3d">babel-loader</font>只是调用了<font style="color:#f03d3d">@babel/core</font>库中的API。最后执行的还是<font style="color:#f03d3d">@babel/core</font>引擎



下面先安装<font style="color:#f03d3d">babel-loader</font>和<font style="color:#f03d3d">@babel/core</font>

> yarn add -D babel-loader@8.2.2 @babel/core@7.13.1

然后在**webpack.config.js**中配置所有的**js**文件都使用<font style="color:#f03d3d">babel-loader</font>进行转换。

```javascript
{
   module:{
    rules:[
      {
        //  所有的.js文件都走babel-loader
        test:/\.js$/,
        include: path.join(config.root,'src'),
        loader: "babel-loader",
      }
    ]
  },
}
```

> :whale2: <font style="color:cornflowerblue">babel@6.X</font>版本时，<font style="color:#06f">**核心引擎**</font>库名为<font style="color:#f03d3d">babel-core</font>。从<font style="color:cornflowerblue">babel@7.X</font>版本之后，官方对库名称做了统一的修改，官方提供的包都以<font style="color:cornflowerblue">@babel/</font>冠名，所以<font style="color:#f03d3d">babel-core</font>和<font style="color:#f03d3d">@babel/core</font>实际上是一个库 。有兴趣朋友可以在<font style="color:cornflowerblue">NPM</font>中对比下两个包的版本  ：[@babel/core](https://www.npmjs.com/package/@babel/core)、[babel-core](https://www.npmjs.com/package/babel-core)

> :whale2:后面会陆续加入其它文件执行<font style="color:#f03d3d">babel-loader</font>。例如：<font style="color:cornflowerblue">.ts</font>、<font style="color:cornflowerblue">.jsx</font>

但是目前依然无法转换<font style="color:cornflowerblue">ES6（ES2015+）</font>代码。因为只添加了<font style="color:cornflowerblue">引擎（@babel/core）</font>，并没有添加具体转换库。



#### @babel/preset-env

先来介绍一下[@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env)库，来完成部分转换功能。

<font style="color:#f03d3d">@babel/preset-env</font>是<font style="color:cornflowerblue">babel </font>***预设***的一个<font style="color:cornflowerblue">plugin</font>

> yarn add -D @babel/preset-env@7.13.5



在配置<font style="color:cornflowerblue">loader</font>时，可以设置当前<font style="color:cornflowerblue">loader</font>使用的属性和依赖库。<font style="color:#f03d3d">babel-loader</font>具有一个**presets**属性来依赖的<font style="color:cornflowerblue">预设插件（preset）</font>

```javascript
{
    module:{
        rules:[
            {
                //  所有的.js文件都走babel-loader
                test:/\.js$/,
                include: path.join(config.root,'src'),
                loader: "babel-loader",
                options: {
                    presets:[
                        "@babel/preset-env",
                    ]
                }
            }
        ]
    }  
}
```

> :whale2::whale2: **presets**的执行是从后往前执行的，官方说为了确保向后兼容

> :whale2: **presets**配置可以设置短名称，
>
> 1. <font style="color:cornflowerblue">preset</font>库名称以 **babel-preset-** 前缀，可以省去前缀。 例如：**babel-preset-my-custom**，可以直接设置为：**custom**
> 2. 短名称也适用于冠名，例如：**@org/preset-env**，可以设置为：**@org/env**
>



此时执行`yarn build`操作后生成的代码就会处理<font style="color:cornflowerblue">部分ES6（ES2015+）</font>

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-04-04.png?raw=true" width="600">

生成代码中可以看到：**await**、**for-of**、**const** 这些<font style="color:cornflowerblue">ES6</font>代码被转换了。

> :whale2: 代码中的那堆 **case** 语句，是**await**  <font style="color:cornflowerblue">ES5</font>的写法。**await** 本质只是一个 ***将异步同步化***的<font style="color:cornflowerblue">状态机</font>。不熟悉 **await** 机制的朋友可以忽略，只需知道代码为**await**语法<font style="color:cornflowerblue">ES5</font>写法即可。



但细心的朋友可以发现，并不是所有的<font style="color:cornflowerblue">ES6</font>特性被转换了。

还有部分<font style="color:cornflowerblue">ES6</font>特性并没有被转换（**promise**、**includes**、**filter**），并且代码被一个**箭头函数**包裹着。

代码被箭头函数包裹这个问题稍后在解决。

先来了解下为什么有的<font style="color:cornflowerblue">ES6</font>特性没有被转换。

> :whale2: <font style="color:#f03d3d">@babel/preset-env</font>取代了<font style="color:cornflowerblue">preset-es20</font>系列的<font style="color:cornflowerblue">预设插件（preset）</font>

 目前生成代码还无法在浏览器运行，缺少**regeneratorRuntime**，这个稍后再说

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-04-new-01.png?raw=true" width="600">



#### Syntax和API

思考一个问题：刚才***被转换***的<font style="color:cornflowerblue">ES6</font>特性与***未被转换***的<font style="color:cornflowerblue">ES6</font>特性有何不同。

答案是***被转换***的<font style="color:cornflowerblue">ES6</font>特性是<font style="color:#06f">**Syntax（语法）**</font>，而未被转换的则是：<font style="color:#06f">**API（类型、函数）**</font>

<font style="color:cornflowerblue">babel</font>处理<font style="color:cornflowerblue">ES6</font>特性时将<font style="color:#06f">**Syntax（语法）**</font>和<font style="color:#06f">**API（类型、函数）**</font>进行了分开处理。



为什么要这样做呢？

原因是两者本质的不同：<font style="color:#06f">**Syntax（语法）**</font>是***一个语言本身客观存在的事实***，而<font style="color:#06f">**API（类型、函数）**</font>，则只是***对一系列操作的封装***

当<font style="color:cornflowerblue">执行环境</font>***不支持***某<font style="color:#06f">**Syntax（语法）**</font>时，那么就只能使用其它<font style="color:#06f">**Syntax（语法）**</font>进行替换。

而<font style="color:cornflowerblue">执行环境</font>中***不存在***某<font style="color:#06f">**API（类型、函数）**</font>时，可以编写自定义<font style="color:#06f">**API（类型、函数）**</font>进行替换。

> :whale2:  **JS**中<font style="color:#06f">**Syntax（语法）**</font>错误提示是：<font style="color:#f03d3d">Uncaught SyntaxError</font>；<font style="color:#06f">**API（类型、函数）**</font>错误提示是：<font style="color:#f03d3d">Uncaught ReferenceError</font>。



<font style="color:#f03d3d">@babel/preset-env</font>只是<font style="color:cornflowerblue">babel</font>提供处理<font style="color:#06f">**Syntax（语法）**</font>的<font style="color:cornflowerblue">预设插件（preset）</font>

至于<font style="color:#06f">**API（类型、函数）**</font>的处理，则是由其它<font style="color:cornflowerblue">插件</font>处理，这个<font style="color:cornflowerblue">插件</font>俗称：<font style="color:#06f">**垫片、腻子**</font>。



#### babel配置形式

在处理<font style="color:#06f">**API（类型、函数）**</font>之前，先介绍下<font style="color:cornflowerblue">babel</font>配置文件。

刚才在配置<font style="color:#f03d3d">@babel/preset-env</font>时，直接配置在了<font style="color:cornflowerblue">babel-loader</font>中**presets**属性。

除了<font style="color:cornflowerblue">babel-loader</font>，<font style="color:cornflowerblue">babel</font>还支持其它方式配置



#####  package.json

<font style="color:#f03d3d">@babel/core</font>支持在**package.json**文件设置

**package.json**文件**babel**属性设置<font style="color:cornflowerblue">babel 插件</font>

<font style="color:#f03d3d">@babel/core</font>执行时会尝试读取此属性。

```json
 "babel": {
   "presets": [
     "@babel/preset-env"
   ],
   "plugins": [
   ]
 }
```



#####  配置文件

<font style="color:cornflowerblue">babel</font>支持使用配置文件设置。

这种方式与**webpack.config.js**文件一样，使用<font style="color:#007FFF">.**约定文件名称**</font>设置。<font style="color:#f03d3d">@babel/core</font>执行时会尝试读取<font style="color:#007FFF">.**约定文件**</font>。

<font style="color:#007FFF">**约定文件名称**</font> 可以为 **babel.config.js** 或 **.babelrc.json** 。 较为常用的是 **.babelrc.json** 。不过一般都会省略后缀， 名称叫做 ***.babelrc***

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-04-05.png?raw=true" width="600">



**package.json**形式和**配置文件**形式 只能选择一种形式设置。如果同时存在会直接报错。

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-04-06.png?raw=true" width="600">

<font style="color:cornflowerblue">babel-loader</font>配置方式优先级高于其他两种方式



##### 参数设置

在使用<font style="color:cornflowerblue">plugin/preset</font>时，可以设置属性。

不过参数形式有些奇葩。

<font style="color:cornflowerblue">plugin/preset</font>与参数存在于一个数组内，第一个为<font style="color:cornflowerblue">plugin/preset</font>，第二个为属性对象

```javascript
{
  "presets": [
     ["@babel/preset-env", {
          "targets": "defaults"
     }]
  ],
  "plugins": [
  ]
}
```

> :whale2::whale2::whale2:   以下会使用**配置文件**方式，所以一定要把<font style="color:cornflowerblue">babel-loader</font>中的设置删除掉。否则会因为优先级问题而失效。:我就因为这个疏漏曾经被耽误了一天

   

   #### 转换API（类型、函数）

   ##### 设置低版本浏览器

 在转换<font style="color:#06f">**API（类型、函数）**</font>时要进行测试。

而开发人员基本上使用的都是新版浏览器，所以需要具有一个不支持<font style="color:cornflowerblue">ES6</font><font style="color:#06f">**API（类型、函数）**</font>的浏览器。

一般<font style="color:cornflowerblue">ES6</font>的新特性，都已经不再支持<font style="color:cornflowerblue">IE浏览器</font>了。所以<font style="color:cornflowerblue">IE浏览器</font>是一个天然的测试对象。

  例如<font style="color:cornflowerblue">ES6</font>**Promise**类型，就不再支持<font style="color:cornflowerblue">IE浏览器</font>

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-04-07.png?raw=true" width="600">



<font style="color:cornflowerblue">win 10</font>系统携带的<font style="color:cornflowerblue">IE浏览器</font>版本一般都为<font style="color:cornflowerblue">IE11</font>。<font style="color:cornflowerblue">IE浏览器</font>支持对版本进行修改<font style="color:cornflowerblue">IE浏览器</font>

**F12-开发者模式--仿真--文档模式** 可以修改<font style="color:cornflowerblue">IE浏览器</font>版本，在这里使用的版本为<font style="color:cornflowerblue">IE9</font>

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-04-08.png?raw=true" width="600">



   

##### 处理箭头函数包裹

在刚才打包编译时，发现生成的代码使用了一个**箭头函数**包裹。

这个**箭头函数**函数怀疑是打包时<font style="color:cornflowerblue">webpack</font>搞得鬼，具体原因没排查，在这里只介绍下处理方案。

在**package.json**文件中添加**browserslist**属性，设置打包代码支持<font style="color:cornflowerblue">IE9</font>浏览器。

   ```json
"browserslist": [
    "ie 9"
]
   ```

> :whale2: **browserslist**属性是[browserslist](https://www.npmjs.com/package/browserslist)库提供的一个属性，<font style="color:#f03d3d">browserslist</font>是提供浏览器版本支持的库。多个库中都依赖了<font style="color:#f03d3d">browserslist</font>。  <font style="color:#f03d3d">browserslist</font>库详情在下一篇介绍。

此时使用`yarn build`执行打包编译，生成代码就不再由**箭头函数**包裹

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-04-09.png?raw=true" width="600">



   ##### regenerator-runtime和core-js

###### regenerator-runtime

介绍下关于之前打包代码缺少 **regeneratorRuntime()** 问题。

**regeneratorRuntime()** 是由[regenerator-runtime](https://www.npmjs.com/package/regenerator-runtime)库提供的，

<font style="color:#f03d3d">regenerator-runtime</font>库是一个转换<font style="color:cornflowerblue">ES6</font>中 **generator函数**、**await函数**  功能的库。<font style="color:cornflowerblue">babel</font>直接使用此库处理两种函数。



###### core-js

很多文章介绍时<font style="color:#f03d3d">regenerator-runtime</font>都与<font style="color:#f03d3d">core-js</font>一起介绍。所以在此也将这两个库放在一起介绍。

处理<font style="color:cornflowerblue">ES6 API（类型、函数）</font>的解决方案在上面介绍过。

当<font style="color:cornflowerblue">执行环境</font>中***不存在***某<font style="color:#06f">**API（类型、函数）**</font>时，可以使用自定义<font style="color:#06f">**API（类型、函数）**</font>进行替代。

而<font style="color:#f03d3d">core-js</font>库就是一个自定义的<font style="color:#06f">**API（类型、函数）**</font>库。也就是俗称的**腻子**

[core-js](https://www.npmjs.com/package/core-js)是 个人开源项目，并不属于任何公司。

<font style="color:cornflowerblue">babel</font>直接使用了<font style="color:#f03d3d">core-js</font>进行处理<font style="color:#06f">**API（类型、函数）**</font>



<font style="color:#f03d3d">core-js</font>截至到编写文章时的最新版本为<font style="color:cornflowerblue">@3.9.0</font>

<font style="color:#f03d3d">core-js</font>的<font style="color:cornflowerblue">@3.X</font>与<font style="color:cornflowerblue">@2.X</font>两个大版本间具有巨大的差异性，以至于影响到了<font style="color:cornflowerblue">babel</font>。不过目前基本都是使用<font style="color:cornflowerblue">core-js@3.X</font>版本。

> :whale2: <font style="color:#f03d3d">core-js</font>开发者目前在开发<font style="color:cornflowerblue">core-js@4.X</font>版本。可能到时候配置又会具有大变化。



##### @babel/polyfill

关于<font style="color:cornflowerblue">babel</font>的文章中，有很多都会介绍<font style="color:#f03d3d">@babel/polyfill</font>。

[@babel/polyfill](https://www.npmjs.com/package/@babel/polyfill)库其实就是<font style="color:cornflowerblue">babel</font>对<font style="color:#f03d3d">core-js</font>和<font style="color:#f03d3d">regenerator-runtime</font>的封装库。

不过在<font style="color:cornflowerblue">babel</font>官网，这个库已经被弃用了。<font style="color:cornflowerblue">babel@7.4.0</font>版本之后就建议直接使用<font style="color:#f03d3d">core-js</font>和<font style="color:#f03d3d">regenerator-runtime</font>

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-04-10.png?raw=true" width="600">

   

上面那段话的大致意思为：<font style="color:cornflowerblue">@babel@7.4.0</font>开始，<font style="color:#f03d3d">@babel/polyfill</font>会被弃用，直接使用<font style="color:#f03d3d">core-js</font>和<font style="color:#f03d3d">regenerator-runtime</font>。

下面那段话的大致意思为：<font style="color:cornflowerblue">babel</font>具有一个<font style="color:cornflowerblue">polyfill</font>包含了<font style="color:#f03d3d">core-js</font>和<font style="color:#f03d3d">regenerator-runtime</font>。

> :whale2::whale2::whale2: 关于<font style="color:#f03d3d">@babel/polyfill</font>库被弃用的原因好像是因为：<font style="color:cornflowerblue">core-js@3.X</font>版本和<font style="color:cornflowerblue">core-js@2.X</font>版本的巨大差异 导致<font style="color:#f03d3d">@babel/polyfill</font>无法***过渡适配***。

   



#####  core-js、regenerator-runtime使用

> yarn add regenerator-runtime@0.13.7  core-js@3.9.0    // 安装在**dependencies**

  

直接使用<font style="color:#f03d3d">core-js</font>和<font style="color:#f03d3d">regenerator-runtime</font>需要在代码中手动引用。<font style="color:cornflowerblue">babel</font>当然也支持配置，慢慢来

**index.js**文件引用。

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-04-11.png?raw=true" width="600">

> :whale2::whale2: 
>
> 1. 导入<font style="color:#f03d3d">core-js</font>库时，导入方式为：**"core-js/stable"**，是为了只导入稳定版本特性， 关于stage请参考：[[ECMAScript] TC39 process](https://www.jianshu.com/p/b0877d1fc2a4)
> 2. 导入<font style="color:#f03d3d">regenerator-runtime</font>时，导入方式为：**regenerator-runtime/runtime**，为了节省文件大小

   此时执行`yarn build`打包 编译生成代码中会看到好多引用代码。这些都是<font style="color:#f03d3d">core-js</font>处理<font style="color:cornflowerblue">ES6 API（类型、函数）</font>的<font style="color:#06f">垫片</font>

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-04-12.png?raw=true" width="600">

 

例如**promise**类型，就可以在编译生成后的代码中找到<font style="color:#f03d3d">core-js</font>自定义的实现方式。

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-04-new-02.png?raw=true" width="600">

这时候使用<font style="color:cornflowerblue">IE9</font>运行代码可以运行成功，也就是说<font style="color:cornflowerblue">ES6 API（类型、函数）</font>被成功替代了。

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-04-13.png?raw=true" width="600">

   

   

 #### @babel/preset-env 属性设置

##### 按需加载

刚才加入<font style="color:#f03d3d">core-js</font>和<font style="color:#f03d3d">regenerator-runtime</font>后打包运行，可以知道<font style="color:cornflowerblue">ES6 API（类型、函数）</font>被成功替代了。

但其实这里还具有一个非常严重的问题，那就是文件大小。

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-04-14.png?raw=true" width="600">

可以看到打包生成的文件现在高达**428K**。虽然打包代码压缩，但也不应该这个大小

在代码中仅写了两个函数。那么原因大概是引入<font style="color:#f03d3d">core-js</font>和<font style="color:#f03d3d">regenerator-runtime</font>导致。

<font style="color:#f03d3d">core-js</font>是<font style="color:cornflowerblue">ES6 API（类型、函数）</font>的垫片。

<font style="color:#f03d3d">core-js</font>本身并不知道你使用哪些<font style="color:cornflowerblue">ES6 API（类型、函数）</font>，而<font style="color:cornflowerblue">babel</font>默认情况会将所有的垫片引入，

也就造成了这个恐怖的文件大小



前端对于文件大小非常敏感，文件大小直接影响到网站的加载速度。所以必须要做到<font style="color:cornflowerblue">**按需加载**</font>垫片 （仅加载需要使用的垫片）



不同项目对<font style="color:cornflowerblue">浏览器支持版本</font>需求不一样。

<font style="color:cornflowerblue">babel</font>处理<font style="color:cornflowerblue">ES6 API（类型、函数）</font>垫片时的<font style="color:cornflowerblue">**按需加载**</font>垫片具有三种含义

1. 按照**浏览器版本加载**垫片
2. 按照**代码中使用加载**垫片
3. 按照**浏览器版本+代码中使用加载**垫片

> :whale2:<font style="color:cornflowerblue">浏览器支持版本</font>需求 取决于项目的使用用户，例如有的项目只是公司管理项目，无须兼容老版本浏览器



<font style="color:cornflowerblue">babel</font>中<font style="color:#f03d3d">@babel/preset-env</font>提供了两种按需加载配置方案：***按照浏览器版本加载（1）***和***按照浏览器版本+代码中使用加载（3）***



@babel/preset-env 属性配置



###### 设置浏览器版本（browserslist、targets）

<font style="color:cornflowerblue">**按需加载**</font>垫片中有一个**浏览器版本加载**的含义，想要实现**浏览器版本加载**那就必须设置浏览器版本，

<font style="color:cornflowerblue">babel</font>提供了两种设置浏览器版本的方案：



 <strong>**browserslist**</strong>

**browserslist**方案在刚才处理函数包裹代码时使用到了，设置在**package.json**中的**browserslist**属性

```js
"browserslist": [
    "ie 9"
]
```

<font style="color:cornflowerblue">browserslist</font>是一个提供浏览器版本的一个库，提供了多种配置规则，好多库都使用到了<font style="color:cornflowerblue">browserslist</font>，例如：<font style="color:cornflowerblue">babel</font>。

**browserslist**属性是**Array**，允许设置多个浏览器版本。例如***ie 9***，便是支持<font style="color:cornflowerblue">IE9</font>浏览器。

还可以设置范围版本，例如大于<font style="color:cornflowerblue">Chrome75</font>版本。

```js
"browserslist": [
    "Chrome > 75"
]
```

在这里只使用这两种规则测试，<font style="color:cornflowerblue">browserslist</font>会在下一篇介绍



 <strong>**targets**</strong>

**targets**属性是<font style="color:cornflowerblue">babel</font>自身提供浏览器版本设置，配置在<font style="color:#f03d3d">@babel/preset-env</font>属性中

**targets**属性类型为 **String**、**Object**；支持<font style="color:cornflowerblue">browserslist</font>格式规则。

**targets**属性的优先级高于**browserslist**。

```json
{
    "presets": [
        ["@babel/preset-env",{
            "targets": "chrome > 75",
        }]
    ],
    "plugins": [
    ]
}
```

```json
{
    "presets": [
        ["@babel/preset-env",{
            "targets": {
                "chrome": "58",
                "ie": "11"
            }]
            ],
        "plugins": [
    ]
}
```



推荐使用<font style="color:cornflowerblue">browserslist</font>设置，也就是**package.json**中**browserslist**属性。

因为<font style="color:cornflowerblue">browserslist</font>库已经被社区高度认可。好多库都依赖了<font style="color:cornflowerblue">browserslist</font>，使用<font style="color:cornflowerblue">browserslist</font>库可以做到：配置统一管理，利于项目维护

> :whale2:::whale2::whale2: 浏览器版本设置也会影响<font style="color:#06f">**Syntax（语法）**</font>的转换。 指定的浏览器版本支持的<font style="color:#06f">**Syntax（语法）**</font>不会被转换<font style="color:cornflowerblue">ES5</font>





###### corejs

在介绍<font style="color:cornflowerblue">**按需加载**</font>垫片之前再说一个<font style="color:#f03d3d">@babel/preset-env</font>属性：**corejs**

**corejs**属性是<font style="color:cornflowerblue">babel@7.4.0</font>时加入的，用于设置加载<font style="color:#f03d3d">core-js</font>版本。

**corejs**设置的类型为： **String**、**Object**。

```json
{
    "presets": [
        ["@babel/preset-env",{
            "corejs": {
                "version": "3.9",
                "proposals":true
            }
        }]
    ],
    "plugins": [
    ]
}
```

> * **version**：设置加载的<font style="color:#f03d3d">core-js</font>版本。
>
>   此属性可以设置任何受支持的<font style="color:#f03d3d">core-js</font>
>
>   参数类型为 **String**
>
>   默认值为：***2.0***
>
>   
>
> * **proposals**：是否加载<font style="color:#f03d3d">core-js</font>支持的 **提议API**
>
>   参数类型为：**Boolean**
>
>   默认值为：***false***

> :whale2::whale2: **corejs**属性只有在启用<font style="color:cornflowerblue">**按需加载**</font>垫片（**useBuiltIns**设置为***entry***、***usage***才有效。



   ###### useBuiltIns 

<font style="color:cornflowerblue">**按需加载**</font>垫片是由<font style="color:#f03d3d">@babel/preset-env</font>库提供的**useBuiltIns**属性设置。

**useBuiltIns**属性可以设置三个属性值：



 <strong>**false**</strong>

不启用<font style="color:cornflowerblue">**按需加载**</font>垫片功能，全部加载<font style="color:#f03d3d">core-js</font>垫片。此值为默认值。



<strong>**entry**</strong>

<font style="color:cornflowerblue">按照**浏览器版本加载**</font>垫片。

   ```json
   {
     "presets": [
       ["@babel/preset-env",{
         "useBuiltIns": "entry",
         "corejs": {
           "version": "3.9",
           "proposals":true
         }
   
       }]
     ],
  "plugins": [
     ]
}
   ```

  

**browserslist**属性为 ***Chrome > 75*** 时 打包出来的文件大小就会小很多

```json
"browserslist": [
    "Chrome > 75"
]
```

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-04-15.png?raw=true" width="600">



可以看到，此时文件大小与刚才是天壤之别。因为浏览器设置的为 ***Chrome > 75*** ，几乎支持全部新特性

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-04-16.png?raw=true" width="600">

可以看到打包生成代码中没有提供**filter**垫片，并且 **await** 语法都没有转换。这些特性在新版<font style="color:cornflowerblue">Chrome</font>都提供了。

如果将**browserslist**属性设置为 **ie 9**

那么文件大小依然会很大。因为<font style="color:cornflowerblue">ES6</font> 新特性都不支持<font style="color:cornflowerblue">IE 9</font>

```json
"browserslist": [
    "ie 9"
]
```

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-04-new-03.png?raw=true" width="600">

  

 <strong>**usage**</strong>

刚才使用***entry***属性值实现了按照**浏览器版本加载**垫片的功能。

不过并不能算是我们需要的真正<font style="color:cornflowerblue">**按需加载**</font>垫片。

**useBuiltIns**属性的***usage***值提供了***理论上***真正的<font style="color:cornflowerblue">**按需加载**</font>：**浏览器版本+代码中使用**

   ```json
   {
     "presets": [
       	["@babel/preset-env",{
         "useBuiltIns": "usage",
         "corejs": {
           "version": "3.9",
           "proposals":true
         }
    	}]
     ],
     "plugins": [
     ]
   }
   ```



在使用***usage***属性值时，就不需要手动引用<font style="color:#f03d3d">core-js</font>和<font style="color:#f03d3d">regenerator-runtime</font>库了

<font style="color:cornflowerblue">babel</font>会自动加载。

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-04-17.png?raw=true" width="600">



   此时哪怕设置**ie 9**。打包文件大小也不会像***entry***时那么大了。

```json
"browserslist": [
    "ie 9"
]
```

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-04-18.png?raw=true" width="600">

​      

   而在**Chrome > 75**的情况下，代码都不需要进行处理了

   ```json
 "browserslist": [
       "Chrome > 75"
 ]
   ```

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-04-19.png?raw=true" width="600">



 <strong>**entry、usage有话说**</strong>

1. <font style="color:cornflowerblue">babel</font>在处理***entry***属性值时，直接将<font style="color:cornflowerblue">**按需加载**</font>处理逻辑做到了入口。而在处理***usage***时，则在用到时进行了单独引用，并且保证每一个<font style="color:#06f">**API（类型、函数）**</font>只引用一次

2. 在两者选择使用时，不要一味的追求***usage***，因为***usage***使用起来更为棘手

   <img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-04-new-05.png?raw=true" width="600">
   
   
   
   

###### modules

<font style="color:#f03d3d">@babel/preset-env</font>配置项中有一个**modules**。

**modules**属性表示是否将**ES modules**转换为**指定模块类型**处理。

**modules**属性值具有：***amd***、***systemjs***、***umd***、***commonjs***、***cjs***、***auto***、***false***。

默认属性值为***auto***：默认情况下，使用**ES modules**来进行处理，但是会受到其它<font style="color:cornflowerblue">plugin</font>的**modules**属性影响。

推荐使用**ES modules**，将属性值设置为***false***

因为**ES6 modules** 可以进行***tree-shaking***优化

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "modules":false
      }
    ]
  ]
}
```



<font style="color:#f03d3d">@babel/preset-env</font>还有一些别的属性，在此就不赘述。有兴趣的朋友可以查询[官网](https://www.babeljs.cn/docs/babel-preset-env#targets)。



#### @babel/plugin-transform-runtime

<font style="color:cornflowerblue">babel</font>处理<font style="color:cornflowerblue">ES6</font>特性时，还提供了一个解决<font style="color:cornflowerblue">全局污染</font>的垫片库：[@babel/plugin-transform-runtime](https://www.npmjs.com/package/@babel/plugin-transform-runtime)

<font style="color:#f03d3d">@babel/plugin-transform-runtime</font>也是一个经常被使用到的库。



在日常开发中都应该遵守的一个原则：*避免全局污染*。

***全局污染***是一件极为可怕的问题。在协同、代码运行时会出现不可预知的问题。

<font style="color:#f03d3d">@babel/plugin-transform-runtime</font>库就是将代码使用到的<font style="color:cornflowerblue">ES6 API（类型、函数）</font>名称转换为自定义名称，从而*避免污染运行环境自身API*。

> :whale2: <font style="color:#f03d3d">@babel/plugin-transform-runtime</font>与***usage***属性值一样：按照**浏览器版本+代码中使用加载**垫片

开发***第三方库***，强烈建议使用<font style="color:#f03d3d">@babel/plugin-transform-runtime</font>



##### @babel/runtime-corejs3

<font style="color:#f03d3d">@babel/plugin-transform-runtime</font>库依赖了一个<font style="color:#f03d3d">@babel/runtime-corejs3</font>或<font style="color:#f03d3d">@babel/runtime-corejs2</font>库。

> :whale2::whale2::whale2: 
>
> <font style="color:#f03d3d">@babel/runtime-corejs3</font>对应的<font style="color:cornflowerblue">core-js@3.X</font>
>
> <font style="color:#f03d3d">@babel/runtime-corejs2</font>对应的<font style="color:cornflowerblue">core-js@2.X</font>



<font style="color:#f03d3d">@babel/runtime-corejs3</font>是<font style="color:cornflowerblue">babel</font>提供的<font style="color:#f03d3d">core-js</font>封装库，内部做了一些处理，具体可以参考[这篇文章](https://segmentfault.com/a/1190000020237790)。不过此文章是基于<font style="color:#f03d3d">@babel/runtime-corejs2</font>版本，与<font style="color:#f03d3d">@babel/runtime-corejs3</font>具有一定差异。

> yarn add -D @babel/plugin-transform-runtime@7.13.7  @babel/runtime-corejs3@7.13.7   



> :whale2::whale2:  使用<font style="color:#f03d3d">@babel/plugin-transform-runtime</font>时，就不需要安装<font style="color:#f03d3d">core-js</font>和<font style="color:#f03d3d">regenerator-runtime</font> ，<font style="color:#f03d3d">@babel/runtime-corejs3</font>中会依赖这两个库



**.babelrc**文件中使用<font style="color:#f03d3d">@babel/plugin-transform-runtime</font>配置替代<font style="color:#f03d3d">@babel/preset-env</font>中配置。

不过注意的是<font style="color:#f03d3d">@babel/plugin-transform-runtime</font>属性中**corejs.version**不再是字符串，而是***2***、***3***。 因为加载的是<font style="color:cornflowerblue">@babel/runtime-corejs[3/2]</font>

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        //  移除useBuiltIns设置
        //      "targets": "chrome > 75",
        //      "useBuiltIns": "usage",
        //      "corejs": {
        //        "version": "3.9",
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



配置完毕后，不再需要任何引用就可以进行打包生成。

```js
"browserslist": [
    "ie 9"
]
```

在<font style="color:cornflowerblue">IE9</font>环境`yarn build`。

可以看到使用的**ES6-API**已经被转换为另外的API了，所以并不会再污染全局代码。至于打包的大小，并没有多大

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-04-21.png?raw=true" width="600">

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-04-22.png?raw=true" width="600">



至于在***Chrome > 75***的打包结果，有兴趣的朋友可以自行测试。



#### preset和plugin

在使用<font style="color:cornflowerblue">babel</font>库时，发现有两种类型：

1. **preset**：<font style="color:#f03d3d">@babel/preset-env</font>
2. **plugin**：<font style="color:#f03d3d">@babel/plugin-transform-runtime</font>

配置时也是不同属性：

```json
{
  "presets": [
    
  ],
  "plugins": [
  ]
}
```



**preset**的中文翻译为：**预置**。其实也就是<font style="color:cornflowerblue">babel</font>提供的**预置插件库**，其本质也都是<font style="color:cornflowerblue">plugin</font>

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-04-23.png?raw=true" width="600">



### 总结 

> :whale2::whale2::whale2:
>
> * <font style="color:cornflowerblue">babel</font>来用来处理<font style="color:cornflowerblue">ES6</font>特性的库
> * <font style="color:cornflowerblue">babel</font>也是<font style="color:#06f">**核心引擎**</font> + <font style="color:#06f">**插件化**</font>的设计模式
> * <font style="color:#f03d3d">babel-loader</font>是<font style="color:cornflowerblue">babel</font>的适配器，将<font style="color:cornflowerblue">babel</font>提供<font style="color:cornflowerblue">webpack</font>使用
> * <font style="color:cornflowerblue">babel</font>使用不同的插件分别处理<font style="color:#06f">**Syntax（语法）**</font>和<font style="color:#06f">**API（类型、函数）**</font>
> * <font style="color:cornflowerblue">babel</font>提供不少的**预设插件**，配置在**presets**属性中。
> * <font style="color:#f03d3d">@babel/preset-env</font>中**useBuiltIns**属性用来设置<font style="color:cornflowerblue">按需加载</font>垫片
> * <font style="color:#f03d3d">@babel/plugin-transform-runtime</font>提供了一种不污染全局情况下使用垫片方式。



### 如果此篇对您有所帮助，在此求一个star。项目地址： [OrcasTeam/my-cli](https://github.com/OrcasTeam/my-cli)

### 本文参考

* [@babel/preset-env 与@babel/plugin-transform-runtime 使用及场景区别](https://segmentfault.com/a/1190000021188054)

* [babel corejs@3 是如何按需polyfill原型对象方法的](https://zhuanlan.zhihu.com/p/139359864)

* [@babel/plugin-transform-runtime 到底是什么？](https://zhuanlan.zhihu.com/p/147083132)

* [Babel7 转码（四）- polyfill 还是 transform-runtime](https://segmentfault.com/a/1190000020237790)

* [Polyfill 方案的过去、现在和未来 #80](https://github.com/sorrycc/blog/issues/80)

* [2020 如何优雅的兼容 IE](https://www.yuque.com/kuitos/gky7yw/qskte2)



### 本文依赖

* [babel-loader@8.2.2]( https://www.npmjs.com/package/babel-loader/v/8.2.2)
* [@babel/core@7.13.1]( https://www.npmjs.com/package/@babel/core/v/7.13.1)
* [@babel/preset-env@7.13.5]( https://www.npmjs.com/package/@babel/preset-env/v/7.13.5)
* [regenerator-runtime@0.13.7](https://www.npmjs.com/package/regenerator-runtime/v/0.13.7)
* [core-js@3.9.0](https://www.npmjs.com/package/core-js/v/3.9.0)
* [@babel/plugin-transform-runtime@7.13.7](https://www.npmjs.com/package/@babel/plugin-transform-runtime/v/7.13.7)
* [@babel/runtime-corejs3@7.13.7](https://www.npmjs.com/package/@babel/runtime-corejs3/v/7.13.7)



### package.json

```json
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
    "@babel/runtime-corejs3": "7.13.7",
    "babel-loader": "8.2.2",
    "clean-webpack-plugin": "3.0.0",
    "html-webpack-plugin": "5.2.0",
    "webpack": "5.24.0",
    "webpack-cli": "4.5.0"
  },
  "dependencies": {
    "jquery": "3.5.1",
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

```javascript
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

  //  输出文件
  //  字符串形式
  // output:path.join(config.root, './dist/[name].js')
  //对象形式
  output: {
    //  输出文件的目录地址
    path: path.join(config.root, 'dist'),
    //  输出文件名称，contenthash代表一种缓存，只有文件更改才会更新hash值，重新打包
    filename: '[name]_[contenthash].js'
  },

  //devtool:false, //'eval'

  module:{
    rules:[
      {
        //  所有的.js文件都走babel-loader
        test:/\.js$/,
        include: path.join(config.root,'src'),
        loader: "babel-loader"
      }
    ]
  },


  optimization: {
    minimize: false,
    minimizer: [
    new TerserPlugin({
          //  指定压缩的文件
          include: /\.js(\?.*)?$/i,

          // 排除压缩的文件
          // exclude:/\.js(\?.*)?$/i,

          //  是否启用多线程运行，默认为true，开启，默认并发数量为os.cpus()-1
          //  可以设置为false(不使用多线程)或者数值（并发数量）
          parallel: true,

          //  可以设置一个function，使用其它压缩插件覆盖默认的压缩插件，默认为undefined，
          minify: undefined,

          //  是否将代码注释提取到一个单独的文件。
          //  属性值：Boolean | String | RegExp | Function<(node, comment) -> Boolean|Object> | Object
          //  默认为true， 只提取/^\**!|@preserve|@license|@cc_on/i注释
          //  感觉没什么特殊情况直接设置为false即可
          extractComments: false,

          // 压缩时的选项设置
          terserOptions: {
            //  是否保留原始函数名称，true代表保留，false即保留
            //  此属性对使用Function.prototype.name
            //  默认为false
            keep_fnames: false,

            // 是否保留原始类名称
            keep_classnames: false,

            //  format和output是同一个属性值，，名称不一致，output不建议使用了，被放弃
            // 指定压缩格式。例如是否保留*注释*，是否始终为*if*、*for*等设置大括号。
            format: {
              comments: false,
            },
            output: undefined,

            //  是否支持IE8，默认不支持
            ie8: false,

            compress: {
              // 是否使用默认配置项，这个属性当只启用指定某些选项时可以设置为false
              defaults: false,

              // 是否移除无法访问的代码
              dead_code: false,

              // 是否优化只使用一次的变量
              collapse_vars: true,

              warnings: true,

              //  是否删除所有 console.*语句，默认为false，这个可以在线上设置为true
              drop_console: false,

              //  是否删除所有debugger语句，默认为true
              drop_debugger: true,

              //  移除指定func，这个属性假定函数没有任何副作用，可以使用此属性移除所有指定func
              // pure_funcs: ['console.log'], //移除console
            },
          },
    	})
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
       //  HTML的标题，
        //  template的title优先级大于当前数据
        title: 'my-cli',

        //  输出的html文件名称
        filename: 'index.html',

        //  本地HTML模板文件地址
        template: path.join(config.root, 'src/index.html'),

        // 引用JS文件的目录路径
        publicPath: './',

        //  引用JS文件的位置
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
 		// 是否假装删除文件
        //  如果为false则代表真实删除，如果为true，则代表不删除
        dry: false,

        //  是否将删除日志打印到控制台 默认为false
        verbose: true,

        //  允许保留本次打包的文件
        //  true为允许，false为不允许，保留本次打包结果，也就是会删除本次打包的文件
        //  默认为true
        protectWebpackAssets: true,

        //  每次打包之前删除匹配的文件
        cleanOnceBeforeBuildPatterns: ['**/*'],

        //  每次打包之后删除匹配的文件
        cleanAfterEveryBuildPatterns:["*.js"],
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
    extensions:['.js', '.json'],
    //  默认读取的文件名
    mainFiles:['index', 'main'],
  }
}

//  使用node.js的导出，将配置进行导出
module.exports = modules
```



### .babelrc

```json
{
  "presets": [
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

