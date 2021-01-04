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

由于需要实现动态网站，就需要使用大量DOM操作实现更新，但随着项目的扩大，网站运行会越来越慢，这时候就需要进行优化。 

在优化排查代码时发现DOM更新时更新了需要没必要更新的DOM。我们都知道DOM是消耗性能的，重新编排DOM，浏览器等操作。所以要想一个办法去优化DOM更新。对于在下，头脑中第一想到的办法就是，在JS中缓存DOM数据，然后在更新时对于新旧DOM，然后过滤掉不需要更新的DOM。

 浏览器DOM是一个*树结构*，那么只需要去缓存一个虚拟DOM的*树结构*即可，然后更新前对比。

DOM优化思路有了，接下来再去思考另一个东西。

在开发时，会大量操作DOM以此展示不同操作。对于有经验的诸君就会封装好多函数去简化代码。例如以下的工具条封装，这样在外部直接调用就可以。

```javascript
function toolbar(){
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

我们开发一般只做到这一步就可以了，但对于Facebook员工他们却想要做到更简单。



试想一下，能否使用JS去组织HTML格式的DOM结构。理论上是可以的。但是需要编写引擎去做底层支持。<font style="color:#f03d3d">React</font>就是这样的引擎。

<font style="color:#f03d3d">React</font>创建了了一种JS的扩展语言。<font style="color:#f03d3d">JSX</font>。允许使用**标签**构建元素。

```jsx
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```

<font style="color:#f03d3d">React</font>创建的<font style="color:#f03d3d">JSX</font>语法通过引擎转换为创建元素的函数。

```jsx
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

> :whale2: <font style="color:#f03d3d">JSX</font>目前被业界通用化。<font style="color:#f03d3d">Vue@3.X</font>也支持<font style="color:#f03d3d">JSX</font>



这就是<font style="color:#f03d3d">React</font>的整体思路。而<font style="color:#f03d3d">React</font>本质也就这么简单，而其中只不过需要处理许多东西，例如css，事件等。

> :whale2::whale2::whale2: <font style="color:#f03d3d">JSX</font>是一种扩展语言。 <font style="color:#f03d3d">JSX</font>中定义的事件、style、class其实是<font style="color:#f03d3d">JSX</font>语法。并不是DOM原生语法。所以类似*class*在DOM语法为*class*，而在<font style="color:#f03d3d">JSX</font>中为*className*



#### 安装react

