在上一篇中，介绍了<font style="color:cornflowerblue">webpack</font>的**entry**、**output**、**plugins**属性。

在这一篇，接着介绍其它配置属性。



### mode

这个属性在上一篇中使用过一次，设置<font style="color:cornflowerblue">webpack</font>编译模式的，那么这个属性到底是什么东西呢？



<font style="color:cornflowerblue">打包器</font>是将<font style="color:#007FFF">开发环境代码</font>***编译***为<font style="color:#007FFF">可部署环境代码</font>

搭建的<font style="color:cornflowerblue">工程化</font>代码基本都无法直接运行在浏览器，所以本地测试也都是使用打包编译后的代码预览。

但是本地开发预览又必须具有代码可读性、可调试性等条件。

<font style="color:cornflowerblue">webpack</font>为了解决这个问题，就提供了两种<font style="color:cornflowerblue">打包模式</font>：<font style="color:cornflowerblue">开发模式（development）</font>和<font style="color:cornflowerblue">发布模式（production）</font> 

由**mode**属性设置

```javascript
 {
   mode:'development'
 }
```

也可以使用**CLI参数**进行设置

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-03-01.png?raw=true" width="600">

> :whale2::whale2:
>
> * <font style="color:cornflowerblue">webpack</font>默认使用的是<font style="color:cornflowerblue">发布模式（production）</font>，缺少**mode**属性执行时，<font style="color:cornflowerblue">webpack</font>会进行提示
>* **CLI参数**设置 优先级要高于 **webpack.config.js** 文件设置。
> * 更好的方案是使用两个***webpack.config.js***文件，脚手架一般都是这样区分，在之后介绍<font style="color:cornflowerblue">webpack merge</font>时处理



测试两种模式的区别时，最直观区别就是查看编译生成的代码是否进行了压缩：在**production**模式下，<font style="color:cornflowerblue">webpack</font>会预设压缩**plugin**



<font style="color:cornflowerblue">webpack</font>中的**mode**属性值其实具有三个：***development***、***production***、***none***

**none**属性值与两者的区别只是没有预设任何<font style="color:#06f">插件</font>

> :whale2::whale2::whale2: ***development***和***production***两种模式只是针对不同场景下功能差异化的区分，其实现具体的功能还是使用的<font style="color:#06f">插件</font>
>
> 为了配置简单化，***development***和***production***两种模式都预设了一些基本<font style="color:#06f">插件</font>。



下面来介绍下 **development**和**production**两种模式中的预设的部分功能

#### development

##### process.env.NODE_ENV

***development***模式时，<font style="color:cornflowerblue">webpack</font>使用内置<font style="color:cornflowerblue">**DefinePlugin**</font>

预设了一个环境变量属性**process.env.NODE_ENV**，属性值为***development***

开发人员可以编写业务代码时根据**process.env.NODE_ENV**属性判断当前编译模式，以此执行不同环境中的代码。

**process.env.NODE_ENV**属性和<font style="color:cornflowerblue">**DefinePlugin**</font>稍后详细介绍



##### 设置模块和模块名称设置有效性

***development***模式时，<font style="color:cornflowerblue">webpack</font>会将**JS模块**、**模块名称**设置为有效名称，用来方便调试



<font style="color:cornflowerblue">webpack@4.X</font>版本设置代码可读性使用的是<font style="color:cornflowerblue">webpack</font>内置的<font style="color:cornflowerblue">plugin</font>：<font style="color:cornflowerblue">**NamedModulesPlugin**</font>和<font style="color:cornflowerblue">**NamedChunksPlugin**</font>

<font style="color:cornflowerblue">webpack@5.X</font>版本设置代码可读性使用的是  **optimization.moduleIds** 和**optimization.chunkIds** 两个属性。

但根源也是使用内置<font style="color:cornflowerblue">plugin</font>：<font style="color:cornflowerblue">**NamedModuleIdsPlugin**</font>和<font style="color:cornflowerblue">**NamedChunkIdsPlugin**</font>

```javascript
optimization: {
    moduleIds: 'named',
    chunkIds: 'named',
}
```

> **optimization**属性是<font style="color:cornflowerblue">webpack</font>提供的优化属性，与**mode**一样，只是为了方便管理，其根源还是使用<font style="color:#06f">插件</font>设置的。



##### 设置devtool属性

***development***模式时，<font style="color:cornflowerblue">webpack</font>会将**devtool**属性设置为***eval***

**devtool**属性是控制<font style="color:cornflowerblue">SourceMap</font>文件如何生成的。<font style="color:cornflowerblue">SourceMap</font>是用于将原始模块文件与打包后的代码映射文件。用于调试使用。具体稍候介绍



#### production

##### process.env.NODE_ENV

***production***模式时，<font style="color:cornflowerblue">webpack</font>使用内置<font style="color:cornflowerblue">**DefinePlugin**</font>

预设一个环境变量属性**process.env.NODE_ENV**，属性值为***production***

开发人员可以编写业务代码时根据**process.env.NODE_ENV**属性判断当前编译模式，以此执行不同环境中的代码。

**process.env.NODE_ENV**属性和<font style="color:cornflowerblue">**DefinePlugin**</font>稍后详细介绍



##### 设置模块和模块名称混淆

***production***模式时，<font style="color:cornflowerblue">webpack</font>将 **JS模块**、**模块名称**进行混淆，以保证代码安全性



<font style="color:cornflowerblue">webpack@4.X</font>版本设置代码可读性使用的是<font style="color:cornflowerblue">webpack</font>内置的<font style="color:cornflowerblue">plugin</font>：<font style="color:cornflowerblue">**NamedModulesPlugin**</font>和<font style="color:cornflowerblue">**NamedChunksPlugin**</font>

<font style="color:cornflowerblue">webpack@5.X</font>版本设置代码可读性使用的是  **optimization.moduleIds** 和**optimization.chunkIds** 两个属性。

但根源也是使用内置<font style="color:cornflowerblue">plugin</font>：<font style="color:cornflowerblue">**DeterministicModuleIdsPlugin**</font>和<font style="color:cornflowerblue">**DeterministicChunkIdsPlugin**</font>

```javascript
optimization: {
    moduleIds: 'deterministic',
    chunkIds: 'deterministic',
}
```



##### 代码压缩

***production***模式时，<font style="color:cornflowerblue">webpack</font> 开启了代码压缩优化 ，使用[terser-webpack-plugin](https://www.npmjs.com/package/terser-webpack-plugin)库对打包生成代码进行压缩

> :whale2::whale2:  <font style="color:cornflowerblue">webpack@5.X</font>默认使用[terser-webpack-plugin](https://www.npmjs.com/package/terser-webpack-plugin)压缩代码，<font style="color:cornflowerblue">webpack@4.X</font>版本及之前版本，默认使用的压缩库为[uglifyjs-webpack-plugin](https://www.npmjs.com/package/uglifyjs-webpack-plugin)。但[uglifyjs-webpack-plugin](https://www.npmjs.com/package/uglifyjs-webpack-plugin)已停止维护



##### 作用域提升

***production***模式时，<font style="color:cornflowerblue">webpack</font> 会使用内置的<font style="color:cornflowerblue">**ModuleConcatenationPlugin**</font> 对代码的作用域进行提示。用于减少打包生成的代码量和执行速度。



##### 错误处理

***production***模式时，<font style="color:cornflowerblue">webpack</font> 会预设内置<font style="color:cornflowerblue">**NoEmitOnErrorsPlugin**</font> 。

打包编译时，如果出现代码错误，则不在生成代码。用于避免代码错误代码依然打包成功



> :whale2::whale2:<font style="color:cornflowerblue">webpack@5.X</font>和<font style="color:cornflowerblue">webpack@4.X</font>对于***development***和***production*** 预设功能具有一定的差异，具体请参考 [webpack5-mode](https://webpack.js.org/configuration/mode/)、[webpack4-mode](https://v4.webpack.js.org/configuration/mode/)、[显微镜下的webpack4的新特性：mode详解](https://juejin.cn/post/6844903695033843726)



#### DefinePlugin

在***development***和***production***两种模式中， 都设置了一个环境变量属性：**process.env.NODE_ENV**，只是属性值不相同。



环境变量用于编写业务代码时 针对不同环境下的差异化代码。例如调用第三方SDK时：区分<font style="color:cornflowerblue">开发环境</font> 和<font style="color:cornflowerblue">正式环境</font>。

当然可以选择每次发版时手动修改配置，只要自己不会觉得麻烦。



做一个测试

在**/src/index.js**中输出**process.env.NODE_ENV**属性

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-03-02.png?raw=true" width="600">

在执行`yarn start`后查看打包生成代码会看到**process.env.NODE_ENV** 替换为了***development***字符串

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-03-03.png?raw=true" width="600">

同样如果执行`yarn build`  **process.env.NODE_ENV** 属性 会替换成***production***字符串



这就是 **process.env.NODE_ENV**环境变量的作用，<font style="color:cornflowerblue">webpack</font> 在打包编译时会将设置的环境变量属性值进行替换，可以在编写业务代码时进行环境判断。





<font style="color:cornflowerblue">webpack</font> 使用了内置的<font style="color:cornflowerblue">**DefinePlugin**</font>设置 **process.env.NODE_ENV**。

当然也可以使用<font style="color:cornflowerblue">**DefinePlugin**</font>设置自定义环境变量。具体详情请参考：[官网](https://www.webpackjs.com/plugins/define-plugin/)

```javascript
const webpack = require("webpack");
{
    plugins:[
         new webpack.DefinePlugin({ "global_a": JSON.stringify("我是一个打包配置的全局变量") }),
    ]
}
```



### devtool

在***development***模式中会设置**devtool**属性。

**devtool**属性也是<font style="color:cornflowerblue">webpack</font>提供的一个属性项。用于设置<font style="color:cornflowerblue">javascript-source-map</font>



我们都看过打包编译生成的代码，哪怕是**development**模式下生成的，也是超级混乱。

而想要对这些代码调试排查错误，那简直是个噩梦。

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-03-new-05.png?raw=true" width="600">



对于这个问题，<font style="color:cornflowerblue">Google</font>提供了一种工具叫做：<font style="color:cornflowerblue">javascript-source-map</font>

<font style="color:cornflowerblue">javascript-source-map</font>提供一个映射信息，将 *打包编译生成的代码* 与 *开发编写的代码文件* 进行映射，调试时直接针对 开发编写的代码文件进行调试。

> :whale2: <font style="color:cornflowerblue">source-map</font>详细介绍请参考阮一峰老师的：[JavaScript Source Map 详解](http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html)



<font style="color:cornflowerblue">webpack</font>提供了**devtool**属性来设置<font style="color:cornflowerblue">javascript-source-map</font>

**development**模式  **devtool**属性默认值为 ***eval***；

**production**模式 **devtool**属性默认值为 ***false(none)***



***eval***属性值生成的代码都是由**eval**语法编译，并提供了一个**sourceURL**属性用于指向文件源路径

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-03-04.png?raw=true" width="600">



**devtool**属性具有非常多的属性值，不同的属性值 操作具有差异 和 打包消耗时间不同。

有的属性值会生成一个**.map**文件，个文件中存放映射信息，有的直接在生成文件中显示映射信息。

在此就不不详细介绍**devtool**，有兴趣的朋友可以参考[官网](https://webpack.js.org/configuration/devtool/#root)自行测试

```javascript
{
	//	属性可以设置为false和字符串
	devtool:false; // 'eval'
}
```



### optimization

<font style="color:cornflowerblue">webpack</font>针对代码优化管理，提供了**optimization**属性进行管理。

就像刚才介绍的**optimization.moduleIds**和**optimization.chunkIds**提供了对**模块**和**模块名称**管理。

但其根源还是使用了<font style="color:#06f">插件</font>进行管理，属性只是为了方便管理。



**optimization**对象具有好多属性，在此也不详细介绍，

只介绍**optimization.minimize**和**optimization.minimizer**。这两个也是经常被使用到属性。



#### minimize和minimizer

###### minimize

先来做一个测试，将**optimization.minimize**手动改为***false***

```javascript
  optimization:{
    minimize:false
  }
```



此时使用`yarn build`执行打包可以看到代码并没有进行压缩

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-03-new-01.png?raw=true" width="600">

也就是**optimization.minimize**属性是控制代码压缩的。

而**production**模式只是将**optimization.minimize**设置为了***true***

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-03-new-08.png?raw=true" width="600">

```javascript
  optimization:{
    // 开启默认优化
    minimize:true
  }
```



###### minimizer



在**optimization**对象中还具有一个**minimizer**属性，这个属性和**plugins**属性功能相同，都是用来设置<font style="color:cornflowerblue">plugin</font>的。

而两者的区别在于：**optimization.minimizer**会受到**optimization.minimize**属性的管理



**optimization.minimizer**属性会受到**optimization.minimize**属性的控制：

如果**optimization.minimize**属性值为***false***，那么就不加载设置在**optimization.minimizer**属性中的<font style="color:cornflowerblue">plugin</font>

也就是**optimization.minimize**是控制**optimization.minimizer**属性的开关。

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-03-new-02.png?raw=true" width="600">



<font style="color:#f03d3d">terser-webpack-plugin</font> 默认情况下是设置在**optimization.minimizer**属性中，所以**optimization.minimize**属性设置为***false*** 代码会不压缩。

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-03-new-03.png?raw=true" width="600">



如果<font style="color:#f03d3d">terser-webpack-plugin</font> 手动设置在**plugins**属性中，

那么就算**optimization.minimize**为***false***，代码依然会压缩。

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-03-new-04.png?raw=true" width="600">

> :whale2: <font style="color:#f03d3d">webpack</font>已经依赖了<font style="color:#f03d3d">terser-webpack-plugin</font>，所以就不需要再安装 

> :whale2: <font style="color:cornflowerblue">webpack@4.X</font>以下默认使用的压缩裤为[uglifyjs-webpack-plugin](https://www.npmjs.com/package/uglifyjs-webpack-plugin)，好多文章都是以[uglifyjs-webpack-plugin](https://www.npmjs.com/package/uglifyjs-webpack-plugin)为基础讲解的，不过[uglifyjs-webpack-plugin](https://www.npmjs.com/package/uglifyjs-webpack-plugin)目前不再维护，<font style="color:cornflowerblue">webpack@5.X</font>开始改为了[terser-webpack-plugin](https://www.npmjs.com/package/terser-webpack-plugin)



**optimization.minimize**和**optimization.minimizer**是<font style="color:cornflowerblue">webpack</font>为方便管理提供的属性。

在配置时可以将关于优化的<font style="color:cornflowerblue">plugin</font>设置在**optimization.minimizer**属性，由**optimization.minimize**统一管理。

而<font style="color:cornflowerblue">webpack</font>提供的一系列默认值提供了最小配置。

代价却提高了<font style="color:cornflowerblue">webpack</font>学习成本。让很多人对这些属性感到迷惑。



#### terser-webpack-plugin

<font style="color:#f03d3d">terser-webpack-plugin</font> 作为<font style="color:cornflowerblue">webpack@5.X</font>默认的压缩工具。在此就直接介绍此库的属性

> :whale2::whale2: <font style="color:#f03d3d">terser-webpack-plugin</font>压缩对**devtool**属性具有一定的要求，只支持***none***、***source-map***、***inline-source-map***、***hidden-source-map***、***nosources-source-map***。  像***eval***生成的是字符串。<font style="color:#f03d3d">terser-webpack-plugin</font>就没办法进行处理



在刚才手动设置<font style="color:#f03d3d">terser-webpack-plugin</font>时没有添加任何参数。

而<font style="color:#f03d3d">terser-webpack-plugin</font>是有很多配置项的，配置项通过构造函数传递。



<font style="color:#f03d3d">terser-webpack-plugin</font>第一层参数主要对于文件多线程的设置。

```javascript
const TerserPlugin = require('terser-webpack-plugin');

{
    optimization: {
    // 配置可优化
    minimize: true,
    minimizer: [
      new TerserPlugin({
        //  指定压缩的文件
        include: /\.js(\?.*)?$/i,
          
        // 排除压缩的文件
        // exclude:/\.js(\?.*)?$/i,
          
        //  是否启用多线程运行，默认为true，开启，默认并发数量为os.cpus()-1
        //  可以设置为false(不使用多线程)或者数值（并发数量）
        parallel: true,

        //  可以设置一个function，使用其它压缩插件覆盖默认的压缩插件，默认为undefined，d，
        minify: undefined,

        //  是否将代码注释提取到一个单独的文件。
        //  属性值：Boolean | String | RegExp | Function<(node, comment) -> Boolean|Object> | Object
        //  默认为true， 只提取/^\**!|@preserve|@license|@cc_on/i注释
        //  感觉没什么特殊情况直接设置为false即可
        extractComments: false,

        //  压缩时的选项设置
        terserOptions: {}
      })
    ]
  }
}
```

* **include**：指定压缩的文件

  属性可设置为：*String*、*String[]*、*Regex*

  默认值为：***undefined***



* **exclude**：排除压缩的文件

  属性可设置为：*String*、*String[]*、*Regex*

  默认值为：***undefined***



* **parallel**：是否启用多线程运行

  属性可设置为：*Boolean*、*Number*

  属性值为***false***：不启动多线程

  属性值为***true***：启动多线程，多线程数量为：**os.cpus()-1**

  属性值为***Number***：表示使用的多线程数量

  默认值为：***true***



* **minify**：设置其它压缩工具覆盖<font style="color:#f03d3d">terser-webpack-plugin</font>

  此属性可以设置一个函数，函数内允许使用其它压缩工具替代<font style="color:#f03d3d">terser-webpack-plugin</font>， 其实相当于做了一个拦截，基本上不会使用此属性。 详细介绍可以参考 [官方](https://github.com/webpack-contrib/terser-webpack-plugin#minify)

  属性可设置为：*Function*

  默认值为***undefined***



* **extractComments**：是否将代码注释提取到一个单独的文件。

  经过压缩的代码都会去除注释，此属性就是设置是否提取注释，个人感觉这个属性也没什么用。详细介绍可以参考 [官方](https://github.com/webpack-contrib/terser-webpack-plugin#extractcomments)

  属性可设置为：*Boolean*、*String*、*RegExp*、*Function<(node, comment) -> Boolean | Object>*、 *Object*

  属性值为***false***或者函数返回***false***：表示不提取

  属性值为***String***时： ***all***表示全部提取。***some***表示使用默认正则匹配：/^\**!|@preserve|@license|@cc_on/i

  属性值为***true***或者函数返回***true***时：表示提取，使用默认正则匹配：/^\*\*!|@preserve|@license|@cc_on/i

  属性值为***Regex***时：自定义提取规则。

  属性值为***Object***时：允许自定义提取条件。

  默认值为***true***



* **terserOptions**：设置压缩选项

  此属性才是详细设置压缩选项的参数。

  属性可设置为：*Object*



###### terserOptions属性



先来做一个测试，在**index.js**中创建这么一个函数

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-03-05.png?raw=true" width="600">

使用默认压缩配置进行打包编译，结果可以看到生成的代码只有真实执行的代码。

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-03-06.png?raw=true" width="600">

默认<font style="color:#f03d3d">terser-webpack-plugin</font>配置基本上做到了最优解。

> :whale2: 如果将*var a = 1*改为*let a = 1*，则结果有些不一致，这是由于ES6问题，有兴趣的诸君可以测试一下





<font style="color:#f03d3d">terser-webpack-plugin</font>配置属性中：**terserOptions.compress**属性才是控制压缩。

**terserOptions.compress** 设置类型为 **Boolean**、**Object**。

接下来将此属性设置为***false***。查看打包编译代码，可以发现，代码并没有被压缩，只是改变了属性名称和函数函数

```javascript
{
   optimization: {
    // 配置可优化
    minimize: true,
    minimizer: [
      new TerserPlugin({
        //  压缩时的选项设置
        terserOptions: {
             compress:false
        }
      })
    ]
  }
}
```

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-03-07.png?raw=true" width="600">





**terserOptions**这一层中的设置主要是对代码中**属性名称**、**函数名称**。等一系列的设置

```javascript
{
   optimization: {
    // 配置可优化
    minimize: true,
    minimizer: [
      new TerserPlugin({
          //  压缩时的选项设置
          terserOptions: {
              //  是否保留原始函数名称，true代表保留，false即保留
              //  此属性对使用Function.prototype.name
              //  默认为false
              keep_fnames:false,
              
              // 是否保留原始类名称
              keep_classnames:false,
            
              //  format和output是同一个属性值，，名称不一致，output不建议使用了，被放弃
              // 指定压缩格式。例如是否保留*注释*，是否始终为*if*、*for*等设置大括号。
              format: {comments:true},
              output: undefined,
              
              //  是否支持IE8，默认不支持
              ie8:true,
              
                //  ·压缩配置
              compress: {  },
        }
      })
    ]
  }
}
```

* **keep_fnames**：是否保留原始函数名称

  刚才测试看到了，默认情况下会更改函数名称，此属性就是设置是否保留函数名称。

  属性可设置为：*Boolean*

  属性值为***false***：表示不保留原始名称

  属性值为***true***：表示保留原始名称

  默认值为***false***



* **keep_classnames**： 是否保留原始类名称  

  与**keep_fnames**属性类似，只不过设置的是类名称

  属性可设置为：*Boolean*

  属性值为***false***：表示不保留原始名称

  属性值为***true***：表示保留原始名称

  默认值为***false***

* **format/output**：指定压缩格式。例如是否保留*注释*，是否始终为*if*、*for*等设置大括号。

  **format**和**output**的配置相同。**output**官方不再推荐使用。这个属性就不介绍，具体请参考[官方](https://github.com/terser/terser#format-options)  

  属性可设置为：*Object*

  默认值为***null***



* **ie8**：是否支持IE8

  属性可设置为：*Boolean*

  默认值为***false***



* **compress**：设置压缩选项

  属性可设置为：*Boolean*、*Object*

  属性值为***false***：表示不压缩。

  属性值为***object***：自定义压缩设置。



下面介绍下**terserOptions.compress**的配置。**terserOptions.compress**只介绍部分属性  。其它设置，有兴趣的朋友可以查看[官方](https://github.com/terser/terser#compress-options)

```javascript
{
   optimization: {
    // 配置可优化
    minimize: true,
    minimizer: [
      new TerserPlugin({
          //  压缩时的选项设置
          terserOptions: {
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
          	}
        }
      })
    ]
  }
}
```

* **defaluts**：是否使用默认配置项

  此属性表示是否使用官方设置默认配置项

  属性可设置为：*Boolean*

  默认值为***true***



* **dead_code**：是否移除无法访问的代码

  属性可设置为：*Boolean*

  默认值为***true***



* **collapse_vars**：是否优化只使用一次的变量

  此属性表示是否将只使用一次的变量直接进行替换优化

  属性可设置为：*Boolean*

  默认值为***true***



* **drop_console**：是否删除所有**console**语句

  此属性可以在发布时设置为***true***

  属性可设置为：*Boolean*

  默认值为***false***



* **drop_debugger**：是否删除所有**debugger**语句

  属性可设置为：*Boolean*

  默认值为***true***



* **pure_funcs**：移除指定的函数。

  此属性可以设置移除指定的函数，但是需要缺点要移除的函数没有任何<font style="color:cornflowerblue">副作用（没有使用）</font>，有兴趣的朋友可以测试删除自定义函数



<font style="color:#f03d3d">terser-webpack-plugin</font>配置项还有好多，但是一般使用默认属性即可，

会被使用到可能也就是 ：

**terserOptions.compress.drop_console**去除所有**console**和**parallel**来设置多线程

其它一般都是默认值即可。

> :whale2::whale2: 暂时先将**optimization.minimize**属性设置**false**，可以更方便的查看生成代码



### loader

在上一篇文章说过：<font style="color:cornflowerblue">webpack</font>是一个<font style="color:#06f">***JavaScript应用程序***</font>的静态模块打包器，其本身并不支持非**JS模块**。

但<font style="color:cornflowerblue">webpack</font>提供了将 **非JS模块** 转换为**JS模块**的功能---<font style="color:cornflowerblue">loader </font>

<font style="color:cornflowerblue">loader</font>相当于一个<font style="color:cornflowerblue">拦截器</font>，将<font style="color:#06f">***指定文件***</font>进行编译为**JS模块**，再传递给<font style="color:cornflowerblue">webpack</font>。

在这里先不学习具体的<font style="color:cornflowerblue">loader </font>，只介绍下<font style="color:cornflowerblue">loader </font>的配置语法。

<font style="color:cornflowerblue">loader</font>的配置是在**module.rules**属性，**module.rules**是一个**Array**类型属性。   

数组每一项都可以设置 拦截文件使用指定<font style="color:cornflowerblue">loader </font>。

```javascript
{
  module:{
    rules:[
      {
        // test:/\.css$/,
        // include:path.join(__dirname,'src'),
        // exclude:path.join(__dirname,'node_modules'),
        // //  字符串形式
        // use:'css-loader',
        //  数组形式，可以设置多个loader
        // use:[
        //   {
        //     loader:'css-loader',
        //     options:{
        //
        //     }
        //   }
        // ]
      }
    ]
  }
}
```

* **test**：设置拦截文件

  使用此属性设置拦截的文件。例如：***/\.css$*** 表示拦截所有的[.css]()文件。使用*Regex*可以拦截多种文件类型使用同一<font style="color:cornflowerblue">loader</font>

  属性可设置为：*Regex*



* **include**：包含拦截的文件目录。

  此属性可以设置拦截指定目录的文件，一般使用此属性设置只拦截**/src**目录中文件

  属性可设置为：*String*



* **exclude**：排除拦截的文件目录。

  此属性与**include**类似，只不过功能相反，指定要排除的目录。一般使用此属性排除**node_modules**目录。

  此属性与**include**只使用一种。

  属性可设置为：*String*



* **use**：拦截到的文件所使用的<font style="color:cornflowerblue">loader</font>。

  属性可设置为：*String*、*Array*

  属性值为***String***：设置<font style="color:cornflowerblue">loader </font>名称

  属性值为***Array***：可以指定多个<font style="color:cornflowerblue">loader </font>处理，并且可以对每一个<font style="color:cornflowerblue">loader </font> 设置属性配置。

> :whale2::whale2::whale2:  当指定多个<font style="color:cornflowerblue">loader </font>时，<font style="color:cornflowerblue">loader </font>加载顺序为从右往左。具体请参考[Webpack的Loader为什么是从右往左写？](https://segmentfault.com/q/1010000008622548#)



### resolve

**resolve**是<font style="color:cornflowerblue">webpack</font>提供的一个属性，用来配置打包编译时的模块解析规则。

**resolve**是一个*Object*类型，具有不少的属性配置。

在此只介绍三个常用的属性。其它属性，有兴趣的朋友可以去参考[中文官网](https://www.webpackjs.com/configuration/resolve/#resolve-modules)



#### alias

使用<font style="color:cornflowerblue">vue-cli</font>这类脚手架，开发时引入本地文件模块，通常可以使用一个<font style="color:cornflowerblue">符号（@）</font>来代替**/src**工作目录。

这个功能就是**resolve.alias**提供的。

**resolve.alias**属性可以对一个指定路径设置别名。打包编译时会将设置别名替换为配置的真实路径

```javascript
{
   resolve: {
    alias:{
      //  设置路径别名
      '@':path.join(__dirname,'src'),
      '~': path.resolve(__dirname, '../src/assets')
    },
  }
}
```

此时在引用文件模块时，就可以使用***@***来代替**/src**工作目录（工作根目录）

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-03-08.png?raw=true" width="600">

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-03-09.png?raw=true" width="600">



> :whale2: <font style="color:cornflowerblue">webpack</font>允许设置除关键字外的任意符号作为别名。<font style="color:cornflowerblue">vue-cli</font>这类脚手架一般都预设<font style="color:cornflowerblue">符号（@）</font>代替**/src**工作目录。 



#### extensions

使用<font style="color:cornflowerblue">vue-cli</font>这类脚手架，开发时引入本地文件模块。很常见的一种行为就是不需要添加后缀名称。

这个功能就是**resolve.extensions**提供的。

**resolve.extensions**功能允许设置多个后缀名称。导入文件模块时可以忽略文件后缀名称，

打包编译时按照配置缀顺序依次匹配，直到寻到第一个匹配文件或报错（找不到匹配文件）。

**resolve.extensions**属性类型为**Array**，默认值为：***['.js', '.json']***，也就是可以忽略**JS**文件和**JSON**文件后缀



下面将**resolve.extensions**设置为***['.json']***做一个测试

```javascript
{
   resolve: {
    extensions:['.json']
  }
}
```



此时由于引用**index2.js**时还是没有添加后缀，打包编译时就直接报错了。

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-03-10.png?raw=true" width="600">

而引用**index2.js**添加**.js**后缀名称才可以打包成功。。



<font style="color:cornflowerblue">vue-cli</font>、<font style="color:cornflowerblue">react-cli</font>这类脚手架都会在**resolve.extensions**属性配置自己文件类型的后缀名称。

在此以<font style="color:cornflowerblue">react-cli</font>为例

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-03-new-06.png?raw=true" width="600">

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-03-new-07.png?raw=true" width="600">

> :whale2::whale2::whale2: 打包编译时匹配**resolve.extensions**，使用的是队列形式。**Array**从先到后



#### mainFiles

使用<font style="color:cornflowerblue">vue-cli</font>这类脚手架，开发时引入本地文件模块，有一种常见方式只指定其文件所在目录，并没有指定文件名称。

这种方式常见于以 目录为组件单元的代码风格。例如<font style="color:cornflowerblue">antd</font>，就是以目录为组件单元。

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-03-11.png?raw=true" width="600">



这个功能是由**resolve.mainFiles**属性提供的。

**resolve.mainFiles**允许设置多个文件名称，导入文件模块时可以忽略此文件名称。

打包编译时按照配置缀顺序依次匹配，直到寻到第一个匹配文件或报错（找不到匹配文件）。

**resolve.extensions**属性类型为**Array**，默认值为：***['index']***，也就是可以忽略**index**名称的文件。

> :whale2::whale2:  使用**resolve.mainFiles**时需要设置**resolve.extensions**，目录是没有后缀的，需要设置忽略后缀，否则会报错:	 



下面将**resolve.mainFiles**设置为***['index','main']***做测试

```javascript
{
   resolve: {
   	extensions:['.js','.json'],
    mainFiles:['index','main'],
  }
}
```

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-03-12.png?raw=true" width="600">

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-03-13.png?raw=true" width="600">



可以看到， 可以看到导入**/demo/main.js**时，忽略了文件名称，但是依然打包编译、导入成功

> :whale2::whale2::whale2:  打包编译时匹配**resolve.mainFiles**，使用的也是队列形式。**Array**从先到后

> :whale2::whale2::whale2:  个人建议使用目录结构方式组织组件



### context

配置<font style="color:cornflowerblue">webpack</font>时，使用文件目录时都使用了绝对地址：**path.join(__dirname, ...)**

<font style="color:cornflowerblue">webpack</font>其实提供了一个**context**属性：在配置项中允许 以此目录为基准  设置 相对目录。



不过**context**属性个人感觉并不太好用。



**context**属性**String**类型，设置一个绝对路径的目录地址

**context**默认值为当前项目根目录，也就是**package.json**文件所在目录



**context**属性默认值为当前项目根目录，所以可以直接使用相对路径

```js
{
    entry: './src/index.js' ,
}
```

此时执行`yarn build`打包也可以进行打包成功。

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-03-14.png?raw=true" width="600">



也可以使用**context**指定其它目录为基准目录

```js
{
  context: path.join(__dirname, './src'),
  //  入口文件
  //  字符串形式
  entry: './index.js' ,
}
```



但**context**属性具有一定的缺陷



#### output不允许相对路径

并不是所有的属性都可以设置为相对路径 

例如**output**属性就只允许使用绝对路径。

<img src="https://github.com/OrcasTeam/my-cli/blob/master/blogs/images/image-03-15.png?raw=true" width="600">



配置属性中既有相对路径又有绝对路径，对于我这个强迫症来说感觉怪怪的。

> :whale2: **output**属性只允许使用绝对路径应该是为了保证输出地址的准确安全性。



#### 基准绝对路径

个人比较喜欢的方案就是自定义一个**root**目录。

在配置文件中 **root**目录 去设置路径

```js
const config = {
  root: path.join(__dirname, './'),
};

const {
  entry: path.join(config.root, 'src/index.js'),
  output: {
    path: path.join(config.root, 'dist'),
    filename: '[name]_[contenthash].js'
  },
}
```

 

至于自定义**root**属性而不直接使用**__dirname**原因是：

个人感觉自定义属性方便控制。 例如更换配置文件目录，直接使用**__dirname**，所有目录地址都需要更改，而自定义绝对路径基准就只需要更改**root**目录即可

当然真实开发不会出现此类情况。



使用**context**属性还是绝对路径都无伤大雅，个人习惯罢了，只要文件路径正确即可 



###  总结

> :whale2::whale2::whale2:
>
> * <font style="color:cornflowerblue">webpack</font>提供了两种<font style="color:cornflowerblue">打包模式</font>：**开发测试打包编译*(development)***和**线上发布打包编译*(production)*** 。两种打包模式能够更加方便管理<font style="color:cornflowerblue">插件</font>
> * <font style="color:cornflowerblue">webpack</font>对**development**和 **production** 都预设了一些基础功能，大大减少了开发时的配置
> * <font style="color:cornflowerblue">source-map</font>是<font style="color:cornflowerblue">Google</font>提供的打包编译后代码与开发代码的一种映射文件，主要用途是方便开发人员调试
> * **optimization**属性是<font style="color:cornflowerblue">webpack</font>提供的控制优化的属性， **optimization**只是一系列优化功能的集合，主要是为了方便管理，本质还是由<font style="color:cornflowerblue">插件</font>完成功能
> * **resolve**属性提供了打包编译时的解析规则，

如果此篇对您有所帮助，在此求一个star。项目地址： [OrcasTeam/my-cli](https://github.com/OrcasTeam/my-cli)

### 本文参考

* [webpack官网](https://webpack.js.org/)
* [webpack5-mode](https://webpack.js.org/configuration/mode/)
* [webpack4-mode](https://v4.webpack.js.org/configuration/mode/)
* [webpack4的新特性：mode详解](https://juejin.cn/post/6844903695033843726#heading-11)
* [uglifyjs-webpack-plugin](https://www.npmjs.com/package/uglifyjs-webpack-plugin)
* [terser-webpack-plugin](https://www.npmjs.com/package/terser-webpack-plugin)
* [terser Github](https://github.com/terser/terser)
* [terser-webpack-plugin Github](https://github.com/webpack-contrib/terser-webpack-plugin)
* [Webpack的Loader为什么是从右往左写？](https://segmentfault.com/q/1010000008622548#)



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

  // module:{
  //   rules:[
  //     {
  //       test:/\.css$/,
  //       include: ath.join(config.root,'src'),
  //       exclude: path.join(config.root,'node_modules'),
  //       ////  字符串形式
  //       // use:'css-loader',
  //       //  数组形式，可以设置多个loader
  //       // use:[
  //       //   {
  //       //     loader:'css-loader',
  //       //     options:{
  //       //
  //       //     }
  //       //   }
  //       // ]
  //     }
  //   ]
  // }


  optimization: {
    //	暂时关闭压缩优化，方便观察打包生成代码
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
          keep_fnames:false,
            
          // 是否保留原始类名称
          keep_classnames:false,
            
          //  format和output是同一个属性值，，名称不一致，output不建议使用了，被放弃
          // 指定压缩格式。例如是否保留*注释*，是否始终为*if*、*for*等设置大括号。
          format: {
            comments:false,
          },
          output: undefined,
            
          //  是否支持IE8，默认不支持
          ie8:false,
         
          compress: {
            // 是否使用默认配置项，这个属性当只启用指定某些选项时可以设置为false
            defaults:false,
              
             // 是否移除无法访问的代码
            dead_code:false,

            // 是否优化只使用一次的变量
            collapse_vars:true,
              
            warnings:true,
            
            //  是否删除所有 console.*语句，默认为false，这个可以在线上设置为true
            drop_console: false,
           
            //  是否删除所有debugger语句，默认为true
            drop_debugger:true,
              
            //  移除指定func，这个属性假定函数没有任何副作用，可以使用此属性移除所有指定func
            // pure_funcs: ['console.log'], //移除console
          },
        }
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

      '~':  path.join(config.root, 'src/assets') ,
    },
    //  可忽略的后缀
    extensions:['.js', '.json'],
    //  默认读取的文件名
    mainFiles:['index', 'main'],
  }
}

//  使用node.js的导出，将配置进行导出
module.exports = modules

```

