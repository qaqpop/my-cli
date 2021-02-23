### webpack是什么

#### 打包器的概念

在使用<font style="color:cornflowerblue">webpack</font>之前，首先需要明白<font style="color:cornflowerblue">webpack</font>到底是个什么东西。

几乎所有文章（包括官网）中说<font style="color:cornflowerblue">webpack</font>是一个<font style="color:cornflowerblue">**打包器**</font>，用于打包所有资源。

<font style="color:cornflowerblue">webpack</font>的确是一个<font style="color:cornflowerblue">打包器</font>，但是对于不知道<font style="color:cornflowerblue">打包器</font>的新人来说这又是一个新概念。

抛开<font style="color:cornflowerblue">webpack</font>去看问题本质。



当前时代，前端起到的作用越来越大，对于写过<font style="color:cornflowerblue">MVC</font>或者更早的<font style="color:cornflowerblue">JSP</font>或<font style="color:cornflowerblue">ASP.NET</font>的朋友可能更有体会，那时的前端只是作为y展示作用。

随着**移动端**和<font style="color:cornflowerblue">Node.JS</font>的崛起，前端与后端进行了分离，前端开始独立部署，逐渐走入了工程化的步伐。

> :whale2:所谓工程化只不过是开发者的<font style="color:#f03d3d">约定规范</font>，<font style="color:#f03d3d">约定规范</font>可以大大提高开发和学习成本。但其实对于程序运行环境（浏览器/Node）来说代码只要没有**Error**，就可以运行，



对于独立部署这个问题，前端就得做大量的工作。最容易考虑到的就是压缩。

<font style="color:cornflowerblue">MVC</font>时代，压缩的工作都是由后端进行完成。但是对于独立部署的前端，这项工作就得由前端完成。

还有逐渐更新的**JS**和**CSS**和需要兼容老版本的浏览器之间的矛盾，项目可读性管理等一系列问题。



这些问题其实可以总结为<font style="color:#007FFF">可部署环境代码</font>和<font style="color:#007FFF">开发环境代码</font>之间的冲突。



那么能不能提供一个桥梁来连接两种环境代码呢？最好能够提供一个***黑匣子***，能够让我们使用一个命令将<font style="color:#007FFF">开发环境代码</font>进行编译为<font style="color:#007FFF">可部署环境代码</font>



<font style="color:cornflowerblue">打包器</font>就是这么一个***黑匣子***

<font style="color:cornflowerblue">打包器</font>允许使用一个命令将<font style="color:#007FFF">开发环境代码</font>***编译***为<font style="color:#007FFF">可部署环境代码</font>



<img src=".//images//image-02-01.png" width="400">



<font style="color:cornflowerblue">打包器</font>是个***黑匣子***这是对于大部分写业务的程序员来说的。

但是对于项目搭建者，<font style="color:cornflowerblue">打包器</font>就得需要掌握，毕竟前端运行机制不像后端那样简单。前端不同的项目对<font style="color:#007FFF">可部署环境代码</font>的要求不一致，而这样就需要项目搭建者去完成，所以对于<font style="color:cornflowerblue">打包器</font>的了解也基本属于前端必修课。

<font style="color:cornflowerblue">打包器</font>这玩意又是一个极度恶心的东西。诸位共勉吧。共同进步





#### webpack

<font style="color:cornflowerblue">webpack</font>就属于一个<font style="color:cornflowerblue">打包器</font>工具。目前市面上也有好多其它主流的<font style="color:cornflowerblue">打包器</font>工具：[grunt](https://gruntjs.com/)，[gulp](https://gulpjs.com/)，[rollup](https://rollupjs.org/guide/en/)、还有尤大新开发[vite](https://vite-design.surge.sh/guide/chinese-doc.html)。每一个<font style="color:cornflowerblue">打包器</font>都有各自的优缺点。

不过截止到目前最流行的还是<font style="color:cornflowerblue">webpack</font> 。所以我也是以<font style="color:cornflowerblue">webpack</font>作为学习和使用



<font style="color:cornflowerblue">webpack</font>是一个优秀的<font style="color:#f03d3d">***JavaScript应用程序***</font>的静态模块打包器，具有高度可配置的优势，但也被业界称为最麻烦之一。



前面说过：<font style="color:cornflowerblue">打包器</font>就是将<font style="color:#007FFF">开发环境代码</font>进行编译为<font style="color:#007FFF">可部署环境代码</font>。而不同的项目对<font style="color:#007FFF">可部署环境代码</font>的要求不一致。所以<font style="color:cornflowerblue">webpack</font>并没有提供一个全而大功能，而只是提供了一个<font style="color:#007FFF">**核心引擎**</font>， 只负责JS的打包，而其它功能进行<font style="color:#f03d3d">**插件化**</font>管理 。 

> :whale2:::whale2::whale2: 这里说的<font style="color:#f03d3d">**插件化**</font>并不是指的<font style="color:cornflowerblue">webpack</font>中的***plugins***，而是***扩展***的意思，为了 避免和<font style="color:cornflowerblue">webpack</font>中***plugins***翻译歧义。<font style="color:cornflowerblue">webpack</font>中***plugins***在此不做翻译。



开发人员在使用<font style="color:cornflowerblue">webpack</font>时，只需要寻找符合自己需求的***插件***就可以。***插件***则由社区开发。

社区中具有海量的***插件***，相同功能的***插件***都有好多。所以，在学习<font style="color:cornflowerblue">webpack</font>时，我个人建议转换一下思想： <font style="color:#f03d3d">**不要想这个东西是什么，而要想我们需要什么**	</font>。根据自己需求去寻找合适的***插件***。

只不过经过了这么多年的发展，大部分功能的***插件***已经具有了最优解，所以使用的都是固定的的***插件***。就像现在大部分语言运行环境的**GC算法**都是**引用跟踪算法**一样。



在上一篇文章中讲到**package.json**文件中的**devDependencies**留了一个问题：*什么是开发环境依赖*。

其实就可以总结出：<font style="color:#f03d3d">构建工程化依赖环境</font>时使用的依赖库。

> :whale2:	<font style="color:#f03d3d">构建工程化依赖环境</font>包括<font style="color:cornflowerblue">打包器</font>、还有<font style="color:cornflowerblue">eslint</font>和<font style="color:cornflowerblue">单元测试库</font>



### webpack 基本使用

#### webpack安装

在之前已经安装了[webpack@5.14.0](https://www.npmjs.com/package/webpack/v/5.24.0)依赖库，

在这里只需要安装<font style="color:#f03d3d">webpack-cli</font>即可，<font style="color:#f03d3d">webpack-cli</font>作用是命令行运行

如果不安装<font style="color:#f03d3d">webpack-cli</font>执行`webpack`命令时会提示安装<font style="color:#f03d3d">webpack-cli</font>

> yarn add -D  webpack-cli@4.5.0     // 安装到**devDependencies**依赖。



在**package.json**文件***scripts***属性中加入`build：webpack`命令

<img src=".//images//image-02-02.png" width="400">





此时执行`yarn build`就会执行`webpack`命令，虽然会因为没有配置项而失败，但是<font style="color:cornflowerblue">webpack</font>还是能运行的。

> :whale2:有兴趣的朋友可以将<font style="color:#f03d3d">webpack-cli</font>包移除再build，会发现webpack无法运行，并且提示安装<font style="color:#f03d3d">webpack-cli</font>



接下来就开始创建简单的项目文件

<img src=".//images//image-02-03.png" width="400">

> :whale2: <font style="color:cornflowerblue">webpack</font>可以直接使用命令行参数打包文件，不过在此就不赘述，有兴趣的朋友可以参考官网



***webpack.config.js***文件就是编写<font style="color:cornflowerblue">webpack</font>配置的代码文件，<font style="color:cornflowerblue">webpack</font>会去执行此文件，根据此文件配置信息进行打包

> :whale2:	根目录**webpack.config.js** 文件名称为一个**约定文件名称**，在不指定配置文件情况下，<font style="color:cornflowerblue">webpack</font>会执行根目录**webpack.config.js**文件。当然也可以使用参数指定配置文件，也推荐这样做，参数指令可以改变其目录和名称。

<img src=".//images//image-02-04.png" width="400">



***/src***目录为工作目录，此目录名称可以随意，但目前业界约定使用**src**。

> :whale2::whale2: 约定大于配置



***/src***下拥有一个**index.js**文件，这是一个<font style="color:cornflowerblue">entry（入口）</font>文件。

<font style="color:cornflowerblue">打包器</font>作为一个将<font style="color:#007FFF">开发环境代码</font>***编译***为<font style="color:#007FFF">可部署环境代码</font>的桥梁，那么就必须存在至少拥有一个<font style="color:cornflowerblue">entry（开发环境代码）</font>和一个<font style="color:#007FFF">output（可部署环境代码）</font>

**index.js**就做为这个<font style="color:cornflowerblue">entry（入口）</font>文件

> :whale2: **index.js**文件名称也是约定



接下来就可以编写配置项了

> :whale2::whale2:
>
> * <font style="color:cornflowerblue">webpack</font>是基于<font style="color:cornflowerblue">Node.JS</font>运行，  所以写的**webpack配置项** 其实是<font style="color:#007FFF">**Node.JS**</font> 。
>
> * <font style="color:cornflowerblue">webpack</font>中会经常使用到<font style="color:cornflowerblue">Node.JS</font>的基础库，例如使用**require('path')**来获取当前目录
> * 打包器其实不一定非要使用<font style="color:cornflowerblue">Node.JS</font>，也可以使用<font style="color:cornflowerblue">JAVA</font>、<font style="color:cornflowerblue">.NET</font>等任何一门语言
> * 打包器其实就是***IO***操作，将<font style="color:cornflowerblue">entry（入口）</font>文件数据读取并经过一系列操作最终写入到<font style="color:cornflowerblue">output（出口）</font>文件



#### webpack.config.js文件详解

##### webpack.config.js文件总览

在*webpack.config.js*中我们需要抛出一个**模块**，这个模块可以是一个对象，也可以是一个函数（函数返回值必须为对象），而webpack的所有配置项都写在这个对象中。

webpack约定配置项的属性名称，开发者根据其配置名称去设置自己想要的属性值。然后webpack在执行时，会导入这个文件中的模块，加载webpack配置去执行对应的操作。诸君可以脑补一下这个流程，

```javascript
const modules = {}
module.exports = modules
```

```javascript
const modules = ()=>{}

module.exports = modules
```



##### entry、output

打包器最重要的是<font style="color:#f03d3d">entry</font>（入口），<font style="color:#f03d3d">output</font>（输出）文件，所以先来去看看这两个属性

```javascript
const path = require('path')

const modules = {
  //  入口文件
  //  字符串形式
   entry:path.join(__dirname, 'src/index.js'),
  //  对象形式
  // entry:{
  //   'index':path.join(__dirname, 'src/index.js')
  // },

  //  输出文件
  //  字符串形式
  // output:path.join(__dirname, 'dist/[name].js')
  //对象形式
  output:{
    //  输出文件的目录地址
    path:path.join(__dirname, 'dist'),
    //  输出文件名称，contenthash代表一种缓存，只有文件更改才会更新hash值，重新打包
    filename: '[name]_[contenthash].js'
  }
}

//  使用node。js的导出，将配置进行导出
module.exports = modules
```
> :whale2: ：__dirname 这个参数是node自有的一个字段，是当前文件所在文件夹的绝对路径等同于path.dirname()。

代码代表了一个最基本的一个打包器，将*src/index.js*文件打包到*dist*目录下，用到的webpack属性是<font style="color:#f03d3d">entry</font>、<font style="color:#f03d3d">output</font>

* entry：入口文件地址，这个属性可以是一个字符串（js入口文件的地址），也可以是一个对象，对象中可以设置多个入口文件，一般拥有多页面开发，至于多页面开发的配置，就不在此赘述，诸君可以去看其它[参考资料](https://www.sohu.com/a/323226642_495695)，单页面程序一般字符串即可
* output：输出文件地址，这个属性也是可以是一个字符串或者对象，字符串直接设置地址+文件名，对象形式则可以比较清晰和详细的设置，一般使用对象形式。 文件名称使用了一个<font style="color:#f03d3d">[contenthash]</font>名称，这是一个webpack打包缓存的一种机制，当打包文件修改了hash值才会改变，然后重新打包。文件不更改则会拦截打包操作。缓存一般会在<font style="color:#f03d3d">production</font>模式下设置, 还有两个<font style="color:#f03d3d">[hash]</font>、<font style="color:#f03d3d">[chunkhash]</font>也可以设置缓存，具体请参考[webpack中hash、chunkhash、contenthash区别](https://www.cnblogs.com/giggle/p/9583940.html)

> :whale2:	 在webpack.json文件中使用了***require('path')***库来获取当前绝对地址，然后再加上相对路径确保路径的完整性



配置完之后使用*yarn build*执行打包操作，执行完毕后，会在当前目录创建一个dist目录并且具有一个.js文件，里面就是src/index.js内容

<img src="./images/image-02-05.png" width="400">



整套操作下来感觉就像一个cv过程，将一个js文件从src复制到了dist目录，虽然的确是复制，但是也不仅仅只是复制，当前只是一个单文件的demo，

下面在src目录下创建一个index2.js,并且，在index.js中进行import导入

<img src="./images/image-02-06.png" width="400">



然后再次build，会在dist目录下多出一个文件，查看会发现，两个文件的内容都打包在了那个文件中，

<img src="./images/image-02-07.png" width="400">

> :whale2::whale2: 打包后的文件会是压缩后的代码，并且代码中多出许多webpack构建的代码，压缩的代码是因为打包使用的<font style="color:#f03d3d">mode=production</font>，也就是发布模式，而如果想要不压缩代码可以在webpack.json配置文件中添加一个<font style="color:#f03d3d">mode:'development'</font>属性，意思是使用开发模式打包，至于两种模式，稍微再讲解



这就是webpack强大的地方，webpack在打包时，会递归的构建一个依赖图（*dependency graph*），然后根据这个依赖图将所有模块进行打包。如果在index.js将引入index2.js的代码注释或者删除，那么index2.js文件便不会被打包。有兴趣的诸君可以测试一下。



##### plugins

webpack只提供了一个<font style="color:#f03d3d">**核心引擎**</font>。而大部分功能则需要使用***插件化***形式扩展。

在webpack配置对象中具有一个<font style="color:#f03d3d">plugins</font>的属性名称，这个属性就是设置***plugin***的，该属性需要提供一个数组，数组内存放***plugin***对象。webpack在执行时会顺序执行<font style="color:#f03d3d">plugins</font>数组中的***plugin*** 。  下面先来看看常用的两个***plugin***（后续使用***plugin***时会直接加入）

> :whale2: ***plugin*** 编写具有一定的规则，有兴趣的诸君可以去看下[官网](https://www.webpackjs.com/concepts/plugins/)



> :whale2::whale2: webpack默认只是一个***JavaScript应用程序***的打包器，不会处理像CSS、image、typescript等非js模块，webpack中使用了一个叫做<font style="color:#f03d3d">loader</font>的属性***加载***非JS模块并将其**转换**为JS模块处理，，诸君可以思考一下这样的流程。 在webpack中<font style="color:#f03d3d">plugins</font>和<font style="color:#f03d3d">loader</font>是两个核心概念，一个扩展了打包的额外功能（<font style="color:#f03d3d">plugins</font>），一个将**非JS模块**转换为webpack识别的**JS模块**（<font style="color:#f03d3d">loader</font>）。两者分工不同，两者结合了促成了webpack***插件化***的系统。完成了高度扩展。两者的分工和不同在之后会慢慢了解。

###### html-webpack-plugin

诸君请思考一个问题，刚才打包的是JS文件，那么实际上浏览器运行的是***HTML***文件。就算我们将所有业务逻辑都以JS（Document类型）去完成，但是依然需要一个容器承载JS。所以需要打包一个HTML或者在打包的过程中，创建一个HTML文件。并且将此HTML必须引用打包后的JS文件。

webpack中构建这个HTML页面则交给了一个***plugin***来完成，这个***plugin***叫做<font style="color:#f03d3d">html-webpack-plugin</font>

刚才说过，webpack默认只负责JS，而非JS则交给***loader***进行转换，那html为什么不需要***loader***呢？我的理解是html不需要做转换为JS处理，它是一个承载JS的容器。



>  yarn add -D  html-webpack-plugin@4.5.0      



安装完包之后，需要在webpack文件中进行引用

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')

const modules = {
  plugins: [
    new HtmlWebpackPlugin()
  ]
}

//  使用node。js的导出，将配置进行导出
module.exports = modules
```

再次build就可以看到dist目录中多了一个html文件，html中还引用了一个js文件，代表打包成功了，可以使用浏览器打开这个html，会在控制台中输出js文件中的console语句。

<img src="./images/image-02-08.png" width="400">

简单的使用了<font style="color:#f03d3d">html-webpack-plugin</font>创建了执行容器HTML，但是HTML的创建一般都是需要定制一些东西，例如：title、mata等信息，并且我们看到的脚手架都是使用自己创建的*index.html*文件，打包后的html文件是以此文件进行模板。那些操作都是使用了

<font style="color:#f03d3d">html-webpack-plugin</font>的参数配置，传入是以构造函数方式传入的。

```javascript
plugins: [
    new HtmlWebpackPlugin({
      //  template的title优先级大于当前数据
      title:'my-cli',
      //  文件名称
      filename:'index.html',
      //  模板路径
      template:path.join(__dirname, 'src/index.html'),
      // 用于打包后引用脚本时的路径
      publicPath:'./',

      //  是否将打包的资源引用到当前HTML， false代表不引用
      //  true或者body将打包后的js脚本放入body元素下，head则将脚本放到中
      //  默认为true
      inject:'body',
      //  加载js方式，值为defer/blocking
      //  默认为blocking, 如果设置了defer，则在js引用标签上加上此属性，进行异步加载
      scriptLoading:'blocking',

      //  是否进行缓存，默认为true，在开发环境可以设置成false
      cache:false,
      //  添加mate属性
      meta:{}
    })
  ]
```

> * **title**	这个属性是设置html的title属性，这个属性只有在没有***template***时有效，具有***template***数据时，会使用***template***的title属性
> * **filename**  打包输出的文件名称
> * **template** 本地html模板地址，此模板中的其它引用都会原封不动的进行引用。例如下面html引用了jquery，在打包完成后还是具有jquery的引用，并且在js中可以使用jquery，诸君可以使用[CDN](https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js)连接测试一下  
> * **publicPath**  打包后引用脚本时的路径，配置中的路径为<font style="color:#f03d3d">./</font>，在html中引用js的路径就以<font style="color:#f03d3d">./</font>目录为准，其它包好多都有这个属性。
> * **inject**  这个属性代表将打包后的js脚本放的位置，值可以为true、false、head、body 如果为false，则不加入打包的js，true和body代表添加到body元素之后。head则将js脚本放入head元素之中
> * **scriptLoading**  加载js的方法，值为blocking、defer。默认为blocking 。  具体介绍请看[本文章](https://segmentfault.com/q/1010000000640869)
> * **cache**  代表是否要缓存html，默认为true，在开发环境可以设置成false
> * **meta** 就是设置meta属性值的配置

上面列举了部分<font style="color:#f03d3d">html-webpack-plugin</font>属性，其中***template***属性需要是一个本地的html路径，所以需要创建一个html文件。 更多属性可以去[npm](https://www.npmjs.com/package/html-webpack-plugin)中查看

<img src="./images/image-02-09.png" width="400">





###### clean-webpack-plugin

在打包之后其实会发现一个恶心的问题：每次打包都是往dist目录去**添加**文件，而不是清空dist目录再添加，在刚才完成的几次build之后，dist目录已经具有好多文件了

<img src="./images/image-02-10.png" width="400">

这个问题在demo中还能忍受，但是在真正项目中那么多文件，多打几次包绝对是一场可怕的噩梦，所以肯定要在每次打包时都清空输出目录，在webpack中由一个**plugin**就是提供这个需求，这就是<font style="color:#f03d3d">clean-webpack-plugin</font>

> yarn add -D clean-webpack-plugin@3.0.0



在webpack中直接配置使用即可

```JavaScript
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
 plugins: [
    new CleanWebpackPlugin()
  ]
```

> :whale2::whale2:	 <font style="color:#f03d3d">clean-webpack-plugin</font>导入包使用的***{ CleanWebpackPlugin }***接收，而不是<font style="color:#f03d3d">html-webpack-plugin</font>那种别名机制，原因是<font style="color:#f03d3d">html-webpack-plugin</font>导出的是默认：export default 。导入时只是以一个变量接收，而<font style="color:#f03d3d">clean-webpack-plugin</font>导出的是一个对象，对象中具有***CleanWebpackPlugin ***类型，所以使用时名称不能更改



**CleanWebpackPlugin **类型构造函数中也可以传入配置参数进行控制

```javascript
 new CleanWebpackPlugin({
      //  是否允许假装文件删除
      //  如果为false则代表真实删除，如果为true，则代表不删除
      dry:false,
      //  是否打印日志到控制台 默认为false
      verbose: true,
      //  允许保留本次打包的文件
      //  true为允许，false为不允许，保留本次打包结果，也就是会删除本次打包的文件
      //  默认为true
      protectWebpackAssets:true,
      //  每次打包之前删除匹配的文件
      cleanOnceBeforeBuildPatterns:["*.html"],

      //  每次打包之后删除匹配的文件
      cleanAfterEveryBuildPatterns:["*.js"],
    })
```

> **dry**  这个参数是控制是否允许假装文件删除，官方文档的描述是：*Simulate the removal of files*，我的理解是当设置为true时，文件就不允许被删除，如果设置为false，则允许删除规则去删除
>
> **verbose** 是否将日志打印到控制台。默认为false
>
> **protectWebpackAssets** 是否保留本次打包的文件，true为保留，false为清除，默认为true，将这个配置设置为false后会将当前打包的数据清除掉。
>
> **cleanOnceBeforeBuildPatterns** 打包之前删除匹配到文件  默认值为['**/\*']
>
> **cleanAfterEveryBuildPatterns** 打包之后删除匹配到的文件 默认值为[]



其实在真实开发中这个**plugin**完全没必要配置，毕竟每次打包都是想要新结果。而这个**plugin**只是清理目录

> :whale2::whale2:	 在测试**plugin**配置时，每次修改一下index.js文件数据，因为output设置了*[contenthash]*,所以如果不修改，不会重新打包



随着本章的学习已经已经构建出一个简单的webpack配置，虽然距离真正的脚手架还有天大的差距，但是一步一个脚印，慢慢来。



### 总结

> :whale2::whale2::whale2:
>
> * 打包器是将**开发代码**编译为**可部署**代码的*"编译器"*，webpack则是目前流行的打包器一种
> * webpack是使用Node.js作为打包语言运行的
> * webpack需要抛出一个模块，虽然可以是对象或者是函数，但是其结果必须是配置对象
> * webpack只提供一个**核心引擎**，其余交给扩展进行完成
> * webpack是一个**JavaScript应用程序**，默认只支持JS模块，对于非JS模块需要使用**loader**转换为JS模块

### 本文参考

* [webpack官网](https://webpack.js.org/)
* [webpack中hash、chunkhash、contenthash区别](https://www.cnblogs.com/giggle/p/9583940.html)

### 本文依赖

* [webpack@5.14.0](https://www.npmjs.com/package/webpack/v/5.14.0)
* [webpack-cli@4.2.0](https://www.npmjs.com/package/webpack-cli/v/4.2.0)
* [html-webpack-plugin@4.5.0](https://www.npmjs.com/package/html-webpack-plugin/v/4.5.0)
* [clean-webpack-plugin@3.0.0](https://www.npmjs.com/package/clean-webpack-plugin/v/3.0.0)



### package.json 

```json
{
  "name": "my-cli",
  "version": "1.0.0",
  "main": "index.js",
  "author": "mowenjinzhao<yanzhangshuai@126.com>",
  "license": "MIT",
  "devDependencies": {
    "clean-webpack-plugin": "3.0.0",
    "html-webpack-plugin": "4.5.0",
    "webpack": "5.14.0",
    "webpack-cli": "4.2.0"
  },
  "dependencies": {
    "jquery": "3.5.1"
  },
  "scripts": {
    "start": "node",
    "build": "webpack --config webpack.config.js"
  }
}

```

### webpack.config.js

```javascript
const path = require('path')

const modules = {
  //  入口文件
  //  字符串形式
  entry:path.join(__dirname, 'src/index.js'),
  //  对象形式
  // entry:{
  //   'index':path.join(__dirname, 'src/index.js')
  // },

  //  出口文件
  //  字符串形式
  // output:path.join(__dirname, 'dist/[name].js')
  //对象形式
  output:{
    //  出口文件的目录地址
    path:path.join(__dirname, 'dist'),
    //  出口文件名称，contenthash代表一种缓存，只有文件更改才会更新hash值，重新打包
    filename: '[name]_[contenthash].js'
  },
    
  plugins: [
    new HtmlWebpackPlugin({
      //  template的title优先级大于当前数据
      title: 'my-cli',
      //  文件名称
      filename: 'index.html',

      //  模板路径
      template: path.join(__dirname, 'src/index.html'),
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
    })
  ]
}

//  使用node。js的导出，将配置进行导出
module.exports = modules
```
