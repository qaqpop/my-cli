### react

#### react介绍

在当前时代前端，主流的开发框架具有两个，[vue.js](https://cn.vuejs.org/)和[react.js](https://reactjs.org/)，<font style="color:#f03d3d">React</font>是Facebook公司开发并开源的一个项目，而<font style="color:#f03d3d">Vue</font>是尤雨溪老师开发出的一个项目，属于中国国内项目

> :whale2: 以前都说是“三大框架”，还有一个Google开发的[angular](https://angular.cn/)，但是后来angular份额越来越少。
>
> 个人感觉是angular的上手成本问题，angular比较偏向后端。angular很多概念对于前端初学者来说那就是噩梦。对于前端工程系的发展，在下认为angular是集大成之作，但也因此造成了angular的学习成本。所以在下个人建议，有经验的诸君，可以稍微去看看angular，学一学angular中的思想。 

对于vue和react哪一个比较“好”，网上众说纷纭。在下就不在此引战。直接介绍react

> :whale2::whale2::whale2:
>
> 在下认为vue和react这种都是快速应用开发工具，可能也会像曾经如日中天的jquery逐渐消失，所以在下个人认为不要盲目只追求这种快速工具，而是花时间去学习***原点***。例如**设计思想**和**数据结构**。这种就是***原点***，所有的*术*都是起源于此。而快速应用框架（或语言）只不过是应用工具罢了。



<font style="color:#f03d3d">React</font>是一个用于构建用户界面的 JavaScript 库，<font style="color:#f03d3d">React</font>其本身其实一个特别简单的库，将页面抽象为虚拟DOM，在更新DOM时先进行对比哪些要更新的，然后只更新那些真正需要更新的，以此节省性能。其实这个操作很容易去想通。先来整理一下react思路背景。

现在来简单思考一下利用DOM编写**动态网站**的过程

首先使用原生DOM去更新页面，但随着项目的扩大，网站运行会越来越慢，这时候就需要进行优化。 

在优化排查代码时发现DOM更新时会更新许多没有修改的DOM，而不是局部更新。我们都知道DOM是消耗性能的，重新编排DOM，浏览器等操作。所以要想一个办法去优化DOM更新。对于这种优化，一般来说，想到的解决方案就是在JS中缓存DOM结构，然后在更新时对比新旧DOM，过滤掉不需要更新的DOM。这种算法就叫做***diff***算法，React的虚拟DOM核心也就是***diff***算法



DOM优化思路有了，接下来再去思考另一个东西。

在开发时，会大量操作DOM以此展示不同操作。对于有经验的诸君就会封装好多函数去简化代码。例如以下的工具条封装，这样在外部直接调用就可以。

```javascript
function createToolbar(){
  const  ls = ['首页','新闻','个人信息']
  const ul =  document.createElement('ul')

 ls.map(item=> {
   const li = document.createElement('li',);
   li.innerText = item
   ul.appendChild(li)
 })
  return ul
}

```

> :whale2: 动态生成DOM，先不考虑事件和CSS

一般开发应用程序到这一步就可以了， 但是如果想做一个通用库，那么还需要进行抽象。



试想一下，能否使用一种模板去组织虚拟DOM，然后提供一个引擎做底层转换为真实DOM。

<font style="color:#f03d3d">React</font>就创建了这么一种模板--<font style="color:#f03d3d">JSX</font>。

<font style="color:#f03d3d">JSX</font>是一种JS的扩展扩展语言，允许在JS中以**标签**形式构建元素。

```jsx
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```

<font style="color:#f03d3d">React</font>运行时将<font style="color:#f03d3d">JSX</font>转换成<font style="color:#f03d3d">React</font>*自定义元素*。也就是虚拟DOM

```jsx
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```



> :whale2: :whale2: 诸君注意到转换自定义元素实际上是创建的虚拟DOM。 那么为什么不直接创建DOM呢？这么做有什么好处呢？
>
> 因为跨平台。使用React做一层虚拟DOM抽象，这样与真实DOM进行隔离，这样对真实DOM进行数据化，可以对库进行分离，然后根据不同平台使用不同平台的DOM库。从而达到跨平台效果。



> :whale2: <font style="color:#f03d3d">JSX</font>目前被业界通用化。<font style="color:#f03d3d">Vue@3.X</font>也支持<font style="color:#f03d3d">JSX</font>
>
>  :whale2:<font style="color:#f03d3d">Vue</font>底层也使用了虚拟DOM，:whale2:<font style="color:#f03d3d">Vue</font>模板语言则是**template**



这就是<font style="color:#f03d3d">React</font>的整体思路。而<font style="color:#f03d3d">React</font>本质也就这么简单，而其中只不过需要处理许多东西，例如css，事件等。

> :whale2::whale2::whale2: <font style="color:#f03d3d">JSX</font>是一种扩展语言。 <font style="color:#f03d3d">JSX</font>中定义的事件、style、class其实是<font style="color:#f03d3d">JSX</font>语法。并不是DOM原生语法。所以类似*class*在DOM语法为*class*，而在<font style="color:#f03d3d">JSX</font>中为*className*





#### 安装react



