### react

#### react介绍

目前，国内主流的前端应用框架具有两个：[vue.js](https://cn.vuejs.org/)和[react.js](https://reactjs.org/)，关于vue和react的优劣性，网上众说纷纭。在下就不在此引战。

而是直接介绍<font style="color:cornflowerblue">React</font>

>:whale2::whale2::whale2: <font style="color:cornflowerblue">vue</font>和<font style="color:cornflowerblue">React</font>这种都是***快速应用开发工具***，可能也会像曾经如日中天的<font style="color:cornflowerblue">JQuery</font>被市场淘汰，所以个人建议不要盲目只追求快速工具的使用，而是花时间去学习***原点***。例如**设计思想**和**数据结构**。快速应用框架（或语言）只不过是应用工具而已。

> :whale2: 以前都说是“三大框架”，还有一个Google开发的[Angular](https://angular.cn/)，但是国内<font style="color:cornflowerblue">Angular</font>使用份额越来越少。
>
> 个人感觉<font style="color:cornflowerblue">Angular</font>主要问题是上手成本。<font style="color:cornflowerblue">Angular</font>比较偏向于后端，很多概念对于前端开发人员都是噩梦。不过对于前端工程化，个人认为<font style="color:cornflowerblue">Angular</font>是集大成之作。个人建议，对于有经验的朋友，可以稍微学习下<font style="color:cornflowerblue">Angular</font>中的思想。



<font style="color:cornflowerblue">React</font>是一个用于构建用户界面的 *JavaScript* 库，

<font style="color:cornflowerblue">React</font>本身是一个特别简单的库：将元素抽象为<font style="color:cornflowerblue">虚拟DOM</font>，更新DOM时对比<font style="color:cornflowerblue">虚拟DOM</font>，然后只更新那些真正需要更新的元素。



##### React.createElement()

使用**Document**构建DOM时，都是使用 **document.createElement()** 来构建标签

```js
const li =  document.createElement('li');
document.body.appendChild(li)
```



在<font style="color:cornflowerblue">React</font>中, 也提供了这样一个自定义函数来<font style="color:cornflowerblue">React</font>组件。

**React.createElement()** 返回的是一个<font style="color:cornflowerblue">React</font>自定义的元素类型：**ReactElement**

```js
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

<font style="color:cornflowerblue">React</font>提供的**React.createElement()**和**ReactElement**提供了很好平台隔离性。

使用同一套代码编写的元素组件只需要对接不同平台的APi，就可以实现跨平台。

<font style="color:cornflowerblue">React</font>能够跨平台的原因也在于此。

在日常开发中，也会经常写无关业务的通用封装，其思想与此类似。



#### 虚拟DOM

在直接使用**Document**更新DOM元素时，很多时候会因为某些原因 对*不必更新DOM进行更新* 从而产生了性能浪费



解决这个问题一般想到的做法就是做一个*DOM缓存*。创建DOM时将DOM信息缓存，更新时对比新旧DOM。排除掉不必要的更新DOM。

这种缓存DOM数据的方案就叫<font style="color:cornflowerblue">虚拟DOM（Virtual DOM）</font>， 而排除算法叫做<font style="color:cornflowerblue">diff算法</font>

<font style="color:cornflowerblue">React</font>也使用了这种方案提升性能



<font style="color:cornflowerblue">虚拟DOM（Virtual DOM）</font>和<font style="color:cornflowerblue">diff算法</font> 是对数据结构和算法的考验。每一个人都可以模拟出简单的方案，但不是每一个人都可以写出优秀的解决方案。

在下愚钝，对于数据结构和算法掌握的不好。所以对<font style="color:cornflowerblue">虚拟DOM（Virtual DOM）</font>和<font style="color:cornflowerblue">diff算法</font>只有浅薄的认知。有兴趣的朋友可以看一下这篇文章：[深度剖析：如何实现一个 Virtual DOM 算法](https://github.com/livoras/blog/issues/13)



##### JSX

<font style="color:cornflowerblue">React</font>是通过JS构建元素的，

我们都知道使用JS编写页面痛苦是没有结构性。

使用HTML两个标签能搞定的事，使用JS就能写一大堆代码。

<font style="color:cornflowerblue">React</font>为了解决这个问题，提供了一个<font style="color:cornflowerblue">模板语言</font>---<font style="color:cornflowerblue">JSX</font>

<font style="color:cornflowerblue">JSX</font>是一种JS扩展语言。允许在JS中以**标签形式构建元素**。并且<font style="color:cornflowerblue">JSX</font>开发工具中还可以具有各种提示和快捷键。

能够极大的提高开发效率

```js
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```



但<font style="color:cornflowerblue">JSX</font>编写的组件只是**React.createElement()**语法糖，打包编译过程中会将<font style="color:cornflowerblue">JSX</font>语法转换为**React.createElement()**



> :whale2::whale2::whale2: <font style="color:cornflowerblue">JSX</font>编写的组件本质是 **React.createElement()** 语法糖。所以<font style="color:cornflowerblue">React</font>还支持使用 **React.createElement()** 创建<font style="color:cornflowerblue">虚拟DOM（Virtual DOM）</font>。

> :whale2::whale2: <font style="color:cornflowerblue">JSX</font>是<font style="color:cornflowerblue">React</font>提供构建代码方式的一种扩展语言，本质是一个语法糖。<font style="color:cornflowerblue">JSX</font>定义的**事件**、**style**、**class**是<font style="color:cornflowerblue">JSX</font>自身语法，并不是原生DOM。所以有些属性名称不一致。

> :whale2::whale2: <font style="color:cornflowerblue">JSX</font>转换 **React.createElement()** 操作使用的是<font style="color:cornflowerblue">babel</font>提供的一个 ***plugin***，在下面再介绍

>  :whale2: <font style="color:cornflowerblue">JSX</font>目前被社区认可。<font style="color:cornflowerblue">Vue@3.X</font>也支持<font style="color:cornflowerblue">JSX</font>
>





#### 添加 React

##### 安装 react

<font style="color:cornflowerblue">React</font>目前最新版本为***17.0.1***，在这里就直接引用此版本来介绍，对<font style="color:cornflowerblue">React</font>有兴趣的朋友在从老版本循循渐进的学习。

> yarn add react@17.0.1



[react](https://www.npmjs.com/package/react)库是<font style="color:cornflowerblue">React</font>的核心库，具有 **React.createElement()** 、**虚拟DOM**、**JSX语法支持**等一系列核心内容。

但是此库并不没有提供与**真实DOM交互**。与真实DOM交互的代码则由[react-dom](https://www.npmjs.com/package/react-dom)提供，

> yarn add react-dom@17.0.1

<font style="color:#f03d3d">react</font>类似一个通用库，没有与任何平台具有相关性，只负责组织数据结构。

就像写<font style="color:cornflowerblue">React Native</font>时，使用了[react-native](https://www.npmjs.com/package/react-native)来做平台交互。



##### 使用 react

接下来就仿照<font style="color:cornflowerblue">react-cli</font>来组织代码。



###### 根节点

第一步就是在HTML页面中创建一个元素作为<font style="color:cornflowerblue">React</font>承载的根节点。

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-05-01.png?raw=true" width="600">

> :whale2: <font style="color:cornflowerblue">vue-cli</font>也具有这么一个根节点用来承载<font style="color:cornflowerblue">vue</font>，只不过元素ID名称不一样，有兴趣的朋友可以自行查看。



接下来处理**JS**，在之前打包测试中都是使用 **/src/index.js** 文件作为*源文件*。

也是使用此文件作为*源文件*。

> :whale2::whale2: <font style="color:cornflowerblue">React</font>只是承载在<font style="color:cornflowerblue">打包器</font>中的一个应用框架。经过<font style="color:cornflowerblue">打包器</font>打包将<font style="color:cornflowerblue">JSX</font>转换为可运行的代码。

```js
import React from 'react';
import ReactDOM from 'react-dom';

const root = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
ReactDOM.render(root, document.getElementById('root'));

```

在 **/src/index.js** 文件中使用了<font style="color:cornflowerblue">JSX</font>创建元素，然后使用

<font style="color:#f03d3d">react-dom</font>中的 **ReactDOM.render()** 添加到根节点中。

> :whale2:  <font style="color:cornflowerblue">vue-cli</font>也同样如此，有兴趣的朋友可以自行查看



###### @babel/preset-react

不过如果此时执行`yarn build`操作，会直接报错。

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-05-02.png?raw=true" width="600">



这是因为<font style="color:cornflowerblue">JSX</font>无法被识别的问题。前面说过，<font style="color:cornflowerblue">JSX</font>只是<font style="color:cornflowerblue">React</font>提供的一种<font style="color:cornflowerblue">模板语言</font>。本质上并不属于**JS**模块。

所以需要将<font style="color:cornflowerblue">JSX</font>转换为 **React.createElement()** 形式



提供这个转换操作的是<font style="color:cornflowerblue">babel</font>中提供的一个**plugin**：[@Babel/plugin-syntax-jsx](https://www.npmjs.com/package/@babel/plugin-syntax-jsx)

不过不需要直接安装这个**plugin**

<font style="color:cornflowerblue">babel</font>为<font style="color:cornflowerblue">React</font>提供了一个**preset**：[@babel/preset-react](https://www.babeljs.cn/docs/babel-preset-react)。

<font style="color:#f03d3d">@babel/preset-react</font>中封装了所有处理<font style="color:cornflowerblue">React</font>的**plugin**

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-05-new-01.png?raw=true" width="600">

> yarn add -D @babel/preset-react@7.12.13

> :whale2:  [Babel官网](https://www.babeljs.cn/repl)提供了<font style="color:cornflowerblue">JSX</font>转换为 **React.createElement()** 的测试，有兴趣的朋友可以测试测试

然后配置在 **.babelrc** 文件中

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-05-new-06.png?raw=true" width="400">



此时执行`yarn build`便可以执行成功，并且查看生成代码可以看到<font style="color:cornflowerblue">JSX</font>已经转换为了**React.createElement()**

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-05-03.png?raw=true" width="600">



在浏览器也可以正常运行代码

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-05-04.png?raw=true" width="600">



##### .jsx文件

###### app.jsx

<font style="color:cornflowerblue">React</font>代码已经运行成功，接下来就组织<font style="color:cornflowerblue">React</font>代码。

刚才，直接在 **/src/index.js** 文件中编写了<font style="color:cornflowerblue">JSX</font>代码进行测试

但是真正开发中，需要将<font style="color:cornflowerblue">JSX</font>代码编写在 **.jsx** 文件中，通过<font style="color:cornflowerblue">模块导入</font>导入方式提供给 **/src/index.js** 文件。

将<font style="color:cornflowerblue">JSX</font>提取到 **/src/app.jsx** 文件，在 **/src/index.js** 导入。

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-05-05.png?raw=true" width="600">

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-05-06.png?raw=true" width="600">

> :whale2::whale2: **app.jsx**作为<font style="color:cornflowerblue">React</font>框架的根节点。用在承载<font style="color:cornflowerblue">React</font>组件。



**/src/app.jsx** 文件中组件作为<font style="color:cornflowerblue">React</font>的根节点。<font style="color:cornflowerblue">React</font>也是以树的组织方式管理，**/src/app.jsx** 文件中组件就是树根。<font style="color:cornflowerblue">React</font>框架代码就像 **托管** 在了 **/src/app.jsx** 之中

> :whale2: :whale2:
>
> * <font style="color:cornflowerblue">React</font>组件分为 **函数组件** 和 **类组件** ， **函数组件** 方便，再加上 **Hooks** 的助力，在编写颗粒度较小组件时使用 **函数组件** 是个非常好的选择。**类组件** 封装性强，内部提供完善的钩子函数和一系列功能，再加上继承特性。比较适合使用在业务代码主干中。
>* **/src/app.jsx** 中返回的 **<></>** 代表 *空标签* ，<font style="color:cornflowerblue">React</font>组件只允许返回一个元素，但有时候组件需要返回元素数组，可以在外部包一层空标签。与<font style="color:cornflowerblue">Vue</font>中的**template**标签功能一致。
> * <font style="color:cornflowerblue">React</font> ***组件名称约定为大写形式***。



###### webpack配置

**.jsx**作为一种新的文件格式，需要在<font style="color:cornflowerblue">webpack</font>进行配置使用<font style="color:cornflowerblue">babel</font>

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
  }
}
```

并且可以提供引用时忽略后缀名称。

```js
 resolve:{
    //  可被忽略的后缀
    extensions:['.jsx', '.js', '.json'],
  }
```



此时就算成功将<font style="color:cornflowerblue">React</font>使用在脚手架中了。

而对于<font style="color:cornflowerblue">React Router</font>、<font style="color:cornflowerblue">Redux</font>只是用于扩展<font style="color:cornflowerblue">React</font>的开发库。在此就不再添加。

> :whale2: <font style="color:cornflowerblue">vue-cli</font>搭建方式与<font style="color:cornflowerblue">react-cli</font>基本一致，只是各自框架暴露的API不同





### browserslist



#### browserslist是什么

在介绍<font style="color:cornflowerblue">babel</font>时使用过**package.json**文件中**browserslist**属性设置浏览器版本，那么**browserslist**属性到底是怎么回事呢？



前面介绍过，前端的<font style="color:cornflowerblue">运行环境（浏览器）</font>版本是由用户决定的，不同的项目对于浏览器版本要求不一样。

而在打包过程中。需要指定支持的浏览器版本，以这些版本对开发代码做出适配。（CSS、JS都需要适配）。

**browserslist**属性就是提供指定浏览器版本功能。是由[browserslist](https://www.npmjs.com/package/browserslist)库提供的。

而这个简单的功能<font style="color:cornflowerblue">browserslist</font>却做出了强大的效果，得到了社区的高度认可。很多库都直接依赖<font style="color:cornflowerblue">browserslist</font>



#### browserslist配置方式

<font style="color:cornflowerblue">browserslist</font>提供了两种配置方式。

一种就是配置在**package.json**文件中的***browserslist***属性。<font style="color:cornflowerblue">browserslist</font>执行时会默认读取此属性。

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-05-new-02.png?raw=true" width="600">

另一种是使用约定文件。可以在项目根目录（**package.json**所在目录）创建一个约定文件 ***.browserslistrc.json*** ，将属性配置在此。***.browserslistrc.json***文件名称一般会省略后缀：***.browserslistrc***

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-05-new-03.png?raw=true" width="600">

两种方式不可同时设置，否则会直接报错。

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-05-new-04.png?raw=true" width="600">



个人推荐直接配置在**package.json**文件中，没必要创建一个文件了。在此也就直接使用此方案。



#### browserslist环境变量

<font style="color:cornflowerblue">browserslist</font>可以使用不用属性来灵活的控制浏览器版本。

如下所示。可以设置在不同环境下设置不同浏览器版本。

```js
"browserslist": {
    "development": [
        "chrome > 75"
    ],
     "production": [
         "ie 9"
     ]
}
```

属性值取自<font style="color:cornflowerblue">Node.js</font>中环境变量。环境变量名称为**BROWSERSLIST_ENV**。所以需要设置环境变量。

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-05-new-05.png?raw=true" width="600">

注意：在此虽然设置在**webpack.config.js**文件中，但设置的是<font style="color:cornflowerblue">Node.js</font>中的环境变量， 并不是<font style="color:cornflowerblue">webpack</font>提供的环境变量。

<font style="color:cornflowerblue">browserslist</font>属性值名称可以随意命名。只要与<font style="color:cornflowerblue">Node.js</font>中**BROWSERSLIST_ENV**环境变量对应即可。

在此就不贴图测试了，有兴趣的朋友可以自行测试。

至于**BROWSERSLIST_ENV** 环境变量与 <font style="color:cornflowerblue">webpack</font>中不同模式的关联，在下一篇介绍。



#### browserslist支持的浏览器

<font style="color:cornflowerblue">browserslist</font>支持设置当前基本上所有的浏览器，在[Github](https://github.com/browserslist/browserslist#browsers)上作者说明了可以设置的浏览器

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-05-07.png?raw=true" width="600">

可以看到，<font style="color:cornflowerblue">browserslist</font>几乎支持所有浏览器：PC、安卓、IOS 甚至还有国内浏览器。

> :whale2::whale2: 设置浏览器时名称不区分大小写



#### browserslist属性

<font style="color:cornflowerblue">browserslist</font>能得到社区的认可，也就在于<font style="color:cornflowerblue">browserslist</font>提供了强大的属性设置。

如前面使用的 指定 ***区间浏览器（chrome > 75）*** 也只是<font style="color:cornflowerblue">browserslist</font>简单的属性配置



下面简单列举部分<font style="color:cornflowerblue">browserslist</font>属性配置，想了解更多的朋友请参考[Github](https://github.com/browserslist/browserslist)

* **defaults**：<font style="color:cornflowerblue">browserslist</font>设置的默认浏览器版本。属性只相当 ***> 0.5%, last 2 versions, Firefox ESR, not dead***

  

* **指定版本号**： 支持直接指定某个浏览器版本号。

  ***IE 11***：设置IE11浏览器



* **范围版本**：支持设置某个浏览器指定范围版本。

  ***Chrome > 75***： 设置大于Chrome75版本的浏览器

  并且支持 `>=`、`<`、`<=` 语法设置

* **24个月内未更新版本**：支持设置24个月内未更新的版本

  ***dead***



* **浏览器使用率**：支持设置指定浏览器使用率版本

  ***>5%***：全球超过5%人使用的浏览器版本

  **\> 5% in US**：美国超过5%使用的浏览器版本

  ***\> 5% in alt-AS***：亚洲超过5%使用的浏览器版本

  也自定义设置地区，具体参考[Github文档](https://github.com/browserslist/browserslist#custom-usage-data)

  并且支持 `>=`、`<`、`<=` 语法设置



* **最新浏览器版本**：支持设置最新的几个版本浏览器。

  ***last 2 versions***：设置所有浏览器最新的两个版本。

  ***last 2 Chrome versions***：设置Chrome浏览器最新的两个版本



* **排除浏览器**：<font style="color:cornflowerblue">browserslist</font>支持排除指定浏览器，

  ***not ie < 11***：排除IE11以下的浏览器



* **条件组合**：<font style="color:cornflowerblue">browserslist</font>强大的功能之一是支持多个条件做一个，这也是<font style="color:cornflowerblue">browserslist</font>灵活所在。

  例如

  ```json
  "browserslist": [
      "ie 9",
      "Chrome > 75"
  ],
  ```

  这就是一个**并且（and）组合**设置。两者都必须满足

  <font style="color:cornflowerblue">browserslist</font>同样支持 **或者（or）组合**：***> .5% or last 2 versions***





一般只需要简单的设置即可。





### 总结

> :whale2::whale2::whale2:
>
> * <font style="color:cornflowerblue">React</font>是一个快速构建高性能网站的开发框架
>
> * <font style="color:cornflowerblue">React</font>使用了<font style="color:cornflowerblue">虚拟DOM（Virtual DOM）</font>和<font style="color:cornflowerblue">diff 算法</font>优化了DOM操作
> * <font style="color:cornflowerblue">React</font>利用自定义DOM类型解耦平台限制，以此实现了跨平台
>
> * <font style="color:cornflowerblue">JSX</font>只是一个JS扩展语法。<font style="color:cornflowerblue">React</font>使用<font style="color:cornflowerblue">JSX</font>作为构建元素的模板语言
> * <font style="color:cornflowerblue">browserslist</font>是一个强大的设置浏览器版本库。



### 如果此篇对您有所帮助，在此求一个star。项目地址： [OrcasTeam/my-cli](https://github.com/OrcasTeam/my-cli)

### 本文参考

* [vue核心之虚拟DOM(vdom)](https://www.jianshu.com/p/af0b398602bc)
* [深度剖析：如何实现一个 Virtual DOM 算法](https://github.com/livoras/blog/issues/13)
* [browserslist Github](https://github.com/browserslist/browserslist)
* [babel-preset-react](https://www.babeljs.cn/docs/babel-preset-react)



### 本文依赖

* [react@17.0.1](https://www.npmjs.com/package/react/v/17.0.1)

* [react-dom@17.0.1](https://www.npmjs.com/package/react-dom/v/17.0.1)

* [@babel/preset-react@7.12.3](https://www.npmjs.com/package/@babel/preset-react/v/7.12.13)



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
    "@babel/preset-react": "7.12.13",
    "@babel/runtime-corejs3": "7.13.7",
    "babel-loader": "8.2.2",
    "clean-webpack-plugin": "3.0.0",
    "html-webpack-plugin": "5.2.0",
    "webpack": "5.24.0",
    "webpack-cli": "4.5.0"
  },
  "dependencies": {
    "jquery": "3.5.1",
    "react": "17.0.1",
    "react-dom": "17.0.1"
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

//	browserslist环境变量
process.env.BROWSERSLIST_ENV = 'development'

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
        //  所有的.js(x?)文件都走babel-loader
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
    extensions:['.JSX', '.js', '.json'],
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

