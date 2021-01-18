### 打包CSS

从这一篇开始学习在**my-cli**中添加**CSS**

在前面介绍过，webpack脚手架只处理**JS模块**，非JS模块需要通过***loader***转换为JS模块去处理。

所以，想要处理**CSS模块**就必须使用能够解析的***loader***去处理。

> :whale2:这里说的**CSS模块**为***.CSS***文件。并不是使用行内样式或者使用**HTMLElement**中***style***属性设置。



幸运的是**webpack社区**中提供了解析**CSS模块**的 ***loader***

* [css-loader](https://github.com/webpack-contrib/css-loader)
* [style-loader](https://github.com/webpack-contrib/style-loader)



接下来先使用这两个包在测试一下，然后再详细介绍具体作用

> yarn add -D style-loader@2.0.0 css-loader@5.0.1



在webpack中使用这两个**loader**

```js
{
   module:{
    rules:[
      {
        //  所有的.js文件都走babel-loader
        test:/\.js(x?)$/,
        include:path.join(__dirname,'src'),
        loader: "babel-loader"
      },
      {
        //  解析.css文件
        test: /\.css$/i,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader:  'css-loader'
          }
        ],
      },
    ]
  }
}
```



这样就是一个最简单的**CSS模块**的配置。



先来测试一下。



<img src=".//images//image-06-01.png" width="400">

这里文件结构有点复杂，主要为了结构清晰。

在**src**目录中具有一个**components**目录，这个目录存放了***app.jsx***依赖的所有的组件

**components**目录中有一个**css-test**的目录。这个目录中具有一个***CssTest***组件，代表*CSS测试组件*，组件写在**css-test**目录中的**index.jsx**文件中

**css-test**也具有一个**components**目录，代表每一个测试组件，也就是***CSSTest***的依赖组件。   其中就有***Cssemo1***组件（*demo1目录*）。

*css-test/demo1*目录下还具有一个**index.css**，这个是***Cssemo1***组件依赖的css文件

<img src=".//images//image-06-02.png" width="200">

<img src=".//images//image-06-03.png" width="200">

<img src=".//images//image-06-04.png" width="200">

看起来结构比较繁琐，但是对于组件分类个人感觉还是比较清晰的。



在此***CSSDemo1***中使用了**css**模块。

*yarn build*打包 运行打包后的html文件便可看出结果。

<img src=".//images//image-06-05.png" width="400">



可以看到CSS被应用上了，但是根节点也作用上了CS，与想要的结果不符。

这是因为CSS是加载在了全局，这个问题处理则需要使用***css-module***。后面再说。



现在看一下打包后的代码。

<img src=".//images//image-06-06.png" width="600">



可以看到CSS并没有生成对应的.CSS文件，而是直接被加载到了打包的JS中。

这个在生产环境绝对不被允许的。CSS文件加载本身就具有优化策略，如果将CSS打包到JS，不仅会丧失其优化策略，还会加大JS文件的大小。

所以需要拆分CSS。 不过这个也在后面学习。

所以现在留了两个问题

1. css-module：局部CSS问题
2. 拆分CSS：将CSS拆分为单独文件



下面先来看看 <font style="color:#f03d3d">style-loader</font>和<font style="color:#f03d3d">css-loader</font>具体作用和属性



### style-loader

<font style="color:#f03d3d">style-loader</font>并不是一个*转换CSS模块*的*loader*，而是一个将CSS注入到DOM的*loader*，它的工作就是将转换好的*CSS模块*插入到DOM中，也就是像刚才看到的那样将CSS插入到打包生成的JS中，但刚才也说到了，这种方案并不是可取。生成环境中需要将CSS进行分离，所以在<font style="color:#f03d3d">production</font>环境使用其它loader进行拆分，

而在<font style="color:#f03d3d">development</font>环境就不需要拆分CSS了，所以这个*loader*也是必使用的*loader*之一



现在来看看<font style="color:#f03d3d">style-loader</font>的属性设置。



