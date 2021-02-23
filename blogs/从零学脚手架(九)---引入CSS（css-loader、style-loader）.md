在之前，我们都只是处理JS，并没有涉及到CSS，这是因为CSS也是一个比较大的模块。里面牵扯到的东西比较多。

从这一篇文章开始，开始讲解CSS。诸位请拭目以待。



### 打包CSS

#### 最简单配置

在之前介绍过，webpack脚手架只处理<font style="color:cornflowerblue">JS模块</font>，<font style="color:cornflowerblue">非JS模块</font>需要通过***loader***转换为JS模块去处理。

所以：处理<font style="color:cornflowerblue">CSS模块</font>就必须使用能够解析的***loader***去处理。

> :whale2:这里说的<font style="color:cornflowerblue">CSS模块</font>为`.CSS`文件。并不是使用行内样式或者使用**HTMLElement**中***style***属性设置。



**webpack社区**就提供了解析<font style="color:cornflowerblue">CSS模块</font>的 ***loader***

* [css-loader](https://github.com/webpack-contrib/css-loader)
* [style-loader](https://github.com/webpack-contrib/style-loader)



先使用这两个包进行测试

> yarn add -D style-loader@2.0.0 css-loader@5.0.2



**webpack.common.js**中添加配置

```js
 module: {
      rules: [
        {
          //  所有的.js文件都走babel-loader
          test: /\.js(x?)$/,
          include: path.join(config.root, 'src'),
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
    },
```



以上就是一个最简单的<font style="color:cornflowerblue">CSS模块</font>配置。



先来做一个测试

在**/src**目录下创建一个**app.css**

<img src=".//images//image-09-01.png" width="400">



然后在**app.jsx**中引入

<img src=".//images//image-09-02.png" width="400">



此时打包运行可以看到*CSS*被成功使用

<img src=".//images//image-09-03.png" width="400">



看起来一切正常。

但其实还是具有很大的问题，





#### 问题

##### 未生成CSS文件

先来看一下打包生成的代码。



**webpack.dev.js**中`devServer.dev.writeToDisk`设置为·`true`，将生成文件写入本地

```js
module.exports = merge([
  common(true),
  {
    mode: 'development',
	devServer:{
        dev:{
            writeToDisk: true
        }
    }

  }
])

```





查看生成文件发现并没有生成`.CSS`文件，CSS是使用的**JS**去添加的。

<img src=".//images//image-09-04.png" width="400">



生产环境下绝对不允许这样。CSS文件加载本身就具有优化策略，如果将CSS打包到JS，不仅会丧失其优化策略，还会加大JS文件的大小。



这个问题其实是 <font style="color:#f03d3d">style-loader</font>的原因， <font style="color:#f03d3d">style-loader</font>使用JS创建**style标签**，在生产环境下就需要使用别的*loader*来做<font style="color:cornflowerblue">CSS拆分</font>。



##### CSS冲突

我们都知道CSS都是全局性质的。使用相同的类名或属性设置样式时，会产生样式覆盖问题。而如果开发时创建不同的类名，协同性又会极差。

所以业界提供了两种解决方案

* <font style="color:cornflowerblue">CSS Module</font>  编译打包时，将CSS类名创建唯一性
* <font style="color:cornflowerblue">CSS in JS</font> 将CSS植入到JS中



<font style="color:cornflowerblue">CSS Module</font> 和<font style="color:cornflowerblue">CSS in JS</font>在之后会详细讲述



下面先来看看 <font style="color:#f03d3d">css-loader</font>和<font style="color:#f03d3d">style-loader</font>具体作用和属性



### css-loader

<font style="color:#f03d3d">css-loader</font>其实只是一个解析 **import/require()** 导入方式的库，

它会将CSS文件数据解析为一个JS数组，这样就可以供JS使用。

至于添加到HTML中，则交给其它库来进行



<font style="color:#f03d3d">css-loader</font>具有一个**options**属性可以自定义配置信息。

```js
{
  loader:  'css-loader',
  options: {
    // 是否解析  url/image-set 文件路径
    // 党true时,会将相对路径的文件地址进行解析   url(yj.png) -> url(./yj.png)
    //  默认为true,
    url: true,

    //  是否解析 @import 文件路径
    //  当为true时,会将@import导入的css地址进行解析   @import 'app2.css' -> @import './app2.css'
    //  默认为true,
    import: true,

    //  是否使用 ES modules ,默认为true
    //  也可以设置为false 使用 common module
    esModule: true,

    //  是否显示映射信息,默认使用的webpack devtool属性
    // sourceMap: true

    //  使用@import之前应该应用多少loader
    //  默认为0
    //https://zhuanlan.zhihu.com/p/94706976
    importLoaders: 2,

    //  是否使用css-module
    //  属性值可以为 boolean | local | global| object
    //  当属性值为 true 或 local 时代表使用 css-module
    //  当属性值为 false 或 global 时代表不使用css-module
    //  object可以深度自定义
    //  默认情况下当css文件名称以 module.css结尾，则代表时css-module
    modules: {
      //  控制CSS编译级别
      //  module | icss 默认为 module
      compileType: 'module',

      //   哪些文件允许CSS Modules
      //  RegExp | boolean | path => boolean
      //  默认为true， 当为true时，使用 /\.module\.\w+$/i 正则匹配
      auto: /\.module\.\w+$/i,

      //  生成的本地标识名称
      //  默认为[hash:base64]
      localIdentName: '[path][name]__[local]--[hash:base64:5]',

      //  设置生成本地标识名时的基本加载程序上下文，默认为项目根目录
      localIdentContext: path.join(config.root, 'src'),

      //  asIs: 原始名称导出
      //  camelCase: 按照驼峰命名方式导出,但是不删除原始名称     驼峰+原始名称
      //  camelCaseOnly: 按照驼峰命名导出,删除原始名称          驼峰
      //  dashes: 只有“-”连接符被转换为驼峰方式.    不删除原始名称
      //  dashesOnly: 只有“-”连接符被转换为驼峰方式.    删除原始名称
      exportLocalsConvention: "dashes",

      //  指定函数生成类名,其优先级高于localIdentName
      // getLocalIdent: (context, localIdentName, localName, options) => {
      //   return "whatever_random_class_name";
      // },
    },
  }
}
```

> * **url**：使用 *url/image-set* 时，是否解析文件路径。默认为true。
>
> 
>
> * **import**：使用 *@import* 时，是否解析文件路径。默认为true
>
> 
>
> * **esModule**：是否使用 <font style="color:cornflowerblue">CS Module</font>  导出CSS模块。默认为true，设置false则代表使用<font style="color:cornflowerblue">common js</font>导出。官方建议使用 <font style="color:cornflowerblue">CSS Module</font>
>
> 
>
> * **sourceMap**：是否需要映射文件，默认使用 ***webpack.devtool***属性
>
> 
>
> * **importLoaders**：使用 *@import*之前应用的**loader**数量，默认为0，请参考：[css-loader中importLoaders的理解](https://zhuanlan.zhihu.com/p/94706976)
>
> 
>
> * **modules**：设置  <font style="color:cornflowerblue">CSS Module</font>。 属性可以设置为 *boolean | local | global | object*
>
>   ***true***和***local***都代表使用 <font style="color:cornflowerblue">CSS Module</font>，  ***false***和 ***global***代表不使用。
>
>   设置object可以定制化<font style="color:cornflowerblue">CSS Module</font>
>
> 
>
>   - **compileType**：设置编译级别 ：*module | icss*。 默认为***module***
>   - **auto**：设置允许  <font style="color:cornflowerblue">CSS Module</font>的文件。 *RegExp | boolean | path => boolean*。 默认为***true***，使用` /\.module\.\w+$/i `正则
>   - **localIdentName**：设置本地标识名称的CSS。 默认为`[hash:base64]`
>   - **localIdentContext**：设置生成本地标识名时的基本加载程序上下文，默认为项目根目录
>   - **exportLocalsConvention**：设置CSS类名转换规则。可以将名称使用驼峰导出。
>   - **getLocalIdent**：指定函数生成类名,其优先级高于**localIdentName**



以上就是<font style="color:#f03d3d">css-loader</font>部分属性。有些属性比较好理解，有些则需要查看生成后的代码对比理解。下面就通过观察生成代码来查看部分属性



查看生成代码最好使用<font style="color:cornflowerblue">CSS拆分</font>，将CSS拆分到`.css`文件中。所以在此就先使用<font style="color:#f03d3d">mini-css-extract-plugin</font>进行测试。

> yarn add -D mini-css-extract-plugin@1.3.8



> :whale2:<font style="color:#f03d3d">mini-css-extract-plugin</font>在这里不做解释，在后面再详细讲解



部分CSS还需要使用到图片，在此使用<font style="color:#f03d3d">file-loader</font>处理图片，<font style="color:#f03d3d">file-loader</font>也在之后讲解。

> yarn add -D file-loader@6.2.0



**webpack.common.js**中配置

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports =  (isDev) => {
    
    return {
        module: {
          rules: [
            {
              //  所有的.png文件都走file-loader
              test: /\.png$/,
              loader: "file-loader"
            },
            {
              //  解析.css文件
              test: /\.css$/i,
              use: [
                {
                    //	使用MiniCssExtractPlugin做CSS分离
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    publicPath: '../',
                  }
                },

              ],
            },
          ]
    	},
        
         plugins: [
           //	生成CSS文件设置
          new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[name].css',
          }),
        ],
    }
}
```



此时执行`yarn build`会在***/dist/***目录中看到**.css**文件



<img src=".//images//image-09-05.png" width="400">





> :whale2: 查看生成代码，执行`yarn build`查看即可,



#### url 

**url**属性是决定是否解析 *url/image-set*文件路径。例如**.css**文件中使用了背景图片。如果**url**属性为***true***，在打包时就会解析当前图片并进行打包

<img src=".//images//image-09-06.png" width="400">

<img src=".//images//image-09-07.png" width="400">



反之，如果为***false***，则不会进行任何解析。

<img src=".//images//image-09-08.png" width="400">



#### import

**import**属性与**url**属性意思相同，只不过解析的为**@import**，当为***true***时，会解析文件中所引用的**@import**

<img src=".//images//image-09-09.png" width="400">

<img src=".//images//image-09-10.png" width="400">



反之，当为***false***时，则不会进行解析

<img src=".//images//image-09-11.png" width="400">







#### modules

**modules**属性是设置<font style="color:cornflowerblue">CSS Module</font>的属性。

在前面说过 ，<font style="color:cornflowerblue">CSS Module</font>是解决CSS冲突的一种解决方案，这种解决方案就是打包编译时生成唯一的CSS类名。

**modules**属性提供了强大的<font style="color:cornflowerblue">CSS Module</font>设置。



当**modules**属性为***true***或者**local**时就代表所有文件使用<font style="color:cornflowerblue">CSS Module</font>，所有的类名都会使用`[hash:base64]`保持唯一性。



<img src=".//images//image-09-12.png" width="400">

**modules**也可以设置为***object***，详细的进行控制。



##### auto

设置使用<font style="color:cornflowerblue">CSS Module</font>的文件，使用正则进行匹配文件名称。当为true时，使用`/\.module\.\w+$/i`正则。

<img src=".//images//image-09-13.png" width="400">



##### localIdentName 

自定义css类名的属性。

```js
localIdentName: '[path][name]__[local]--[hash:base64:5]',
```

<img src=".//images//image-09-14.png" width="400">

> :whale2::whale2: 默认上下文目录是项目根目录，所；以CSS类名以**src**目录起始



##### localIdentContext

设置上下文目录

```js
localIdentContext: path.join(config.root, 'src'),
```

<img src=".//images//image-09-15.png" width="400">



##### exportLocalsConvention

此属性是设置css导出方式。JS变量名称都是驼峰命名法，但是css类名一般都是连接符拼接。所以允许使用驼峰方式引入css类名

```js
exportLocalsConvention: "camelCase",
```

<img src=".//images//image-09-16.png" width="400">

<img src=".//images//image-09-17.png" width="400">



**exportLocalsConvention**属性设置了5个属性值以供可以灵活控制，

* **asIs**： 原始名称导出
* **camelCase**：将所有连接符都转换为驼峰形式。  此属性并不删除原始名称，所以也可以使用原始名称
* **camelCaseOnly**：将所有连接符都转换为驼峰形式。  此属性删除原始名称，所以并不可以使用原始名称
* **dashes**：只将`-`连接符转换为驼峰形式。 此属性并不删除原始名称
* **dashesOnly**：只将`-`连接符转换为驼峰形式。 此属性删除原始名称



> :whale2::whale2::whale2: <font style="color:cornflowerblue">CSS Module</font>只会作用**class**和**id**，并不会作用于属性名称





### style-loader

<font style="color:#f03d3d">style-loader</font>并不是一个*转换CSS模块*的*loader*，而是一个将CSS注入到DOM的*loader*，它的工作是使用JS生成一个**style标签**。刚才也说到了，这种方案在生产环境并不可取。生产环境中需要将CSS进行分离，所以在<font style="color:#f03d3d">production</font>环境使用其它loader进行拆分，

而在<font style="color:#f03d3d">development</font>环境就不需要**拆分CSS**了，所以这个*loader*也是必备



现在来看看<font style="color:#f03d3d">style-loader</font>的属性。



https://juejin.cn/post/6844903519275712519

https://blog.csdn.net/wu_xianqiang/article/details/104560613

