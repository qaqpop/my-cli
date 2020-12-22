在之前简单的学习了webpack打包，本章学习下webpack的一些问题

### mode

在之前说过一个问题：webpack具有开发模式（<font style="color:#f03d3d">development</font>）和发布模式（<font style="color:#f03d3d">production</font>），这个问题跟<font style="color:#007FFF">“开发代码”</font>和<font style="color:#007FFF">“部署代码”</font>有些类似。 在开发时本地执行代码与真实部署代码肯定还是有些差距。例如：本地执行不需要压缩代码、不需要缓存。

对于这个问题 最好的做法就是我们能够配置不同的打包模块，然后使用不同命令去执行，一般脚手架就是<font style="color:#f03d3d">start</font>和<font style="color:#f03d3d">build</font>两个命令去打包成不同模式下的代码。

webpack提供了三种模式<font style="color:#f03d3d">development</font>、<font style="color:#f03d3d">production</font>、<font style="color:#f03d3d">none</font>，webpack配置对象中使用<font style="color:#f03d3d">mode</font>属性去设置

```javascript
 {
   mode:'development'
 }
```

也可以使用<font style="color:#f03d3d">CLI参数</font>传递设置相应模式

<img src="D:/Code/前端/webpack/my-cli/blogs/images/image-02-11.png" width="400">

> 注意：
>
> * webpack默认mode为<font style="color:#f03d3d">production</font>
>* <font style="color:#f03d3d">CLI参数</font>的优先级要大于<font style="color:#f03d3d">webpack.config</font>文件。
> * 有种更好的方案就是使用两个<font style="color:#f03d3d">webpack.config</font>文件，一般脚手架都是这样区分的，这个在后期做<font style="color:#f03d3d">webpack merge</font>时处理，暂时使用<font style="color:#f03d3d">CLI参数</font>设置



设置完毕可以使用两个命令测试下，最直接的感觉就是看生成的JS是否被压缩。这是因为在<font style="color:#f03d3d">production</font>预设了压缩插件。

> <font style="color:#f03d3d">none</font>属性的差异诸君可以自己测试下



<font style="color:#f03d3d">mode</font>属性具有三种<font style="color:#f03d3d">development</font>、<font style="color:#f03d3d">production</font>、<font style="color:#f03d3d">none</font>，其中<font style="color:#f03d3d">development</font>、<font style="color:#f03d3d">production</font>都预设各自环境的插件，以便我们使用更少的配置完成更多的功能。但 <font style="color:#f03d3d">none</font>属性则没有预设插件。不过，<font style="color:#f03d3d">none</font>几乎也很少使用，通常只使用<font style="color:#f03d3d">development</font>和<font style="color:#f03d3d">production</font>

#### development

* **设置process.env.NODE_ENV属性**：预设了webpack内置的<font style="color:#f03d3d">DefinePlugin</font>插件，这个插件就是将<font style="color:#f03d3d">process.env.NODE_ENV</font>属性设置为<font style="color:#f03d3d">development</font>属性

* **模块和模块名称设置有效性**：预设了开发模式下将模块和模块名称设置为有效名称，增加代码的可读性

  webpack5设置代码可读性使用的  <font style="color:#f03d3d">optimization</font> 属性中的 <font style="color:#f03d3d">moduleIds</font> 、<font style="color:#f03d3d">chunkIds</font>  。在webpack4则使用的是webpack内置插件<font style="color:#f03d3d">NamedChunksPlugin</font>和<font style="color:#f03d3d">NamedModulesPlugin</font>

  ```javascript
optimization: {
      moduleIds: 'named',
      chunkIds: 'named',
  }
  ```
  
  > <font style="color:#f03d3d">optimization</font>属性是webpack配置优化策略的，这个属性稍后介绍

* **开启devtool属性**：设置<font style="color:#f03d3d">devtool</font>属性为<font style="color:#f03d3d">eval</font>，<font style="color:#f03d3d">devtool</font>是控制<font style="color:#f03d3d">SourceMap</font>是否生成和如何生成，会影响打包结果，具体在下面介绍

#### production

* **设置process.env.NODE_ENV属性**：预设了webpack内置的<font style="color:#f03d3d">DefinePlugin</font>插件，这个插件就是将<font style="color:#f03d3d">process.env.NODE_ENV</font>属性设置为<font style="color:#f03d3d">production</font>属性。

* **模块和模块名称进行混淆**：预设了发布模式将模块和模块名称进行混淆，避免代码轻易泄露

  webpack5设置代码可读性使用的  <font style="color:#f03d3d">optimization</font> 属性中的 <font style="color:#f03d3d">moduleIds</font> 、<font style="color:#f03d3d">chunkIds</font>  。

  ```javascript
optimization: {
      moduleIds: 'deterministic',
      chunkIds: 'deterministic',
  }
  ```
  
* **代码压缩**：预设了<font style="color:#f03d3d">terser-webpack-plugin</font>插件，对打包生成的代码进行压缩

  webpack5默认使用的此插件进行压缩的代码，在之前版本的webpack，默认使用的是<font style="color:#f03d3d">uglifyjs-webpack-plugin</font>插件，但是<font style="color:#f03d3d">uglifyjs-webpack-plugin</font>插件后来不再维护，于是便换成了

  > 打包压缩其实是由webpack对象配置中 <font style="color:#f03d3d">optimization</font>属性进行设置的

* **作用域提升**：预设了webpack内置的<font style="color:#f03d3d">ModuleConcatenationPlugin</font>，这个插件允许在打包时添加作用域提升的处理，用于减少打包生成的代码量和执行速度。

* **打包出错处理**：预设了webpack内置的<font style="color:#f03d3d">NoEmitOnErrorsPlugin</font>插件，这个插件用于编译时发现出错代码则不再生成，避免打包出来的代码异常



可以看到在<font style="color:#f03d3d">development</font>、<font style="color:#f03d3d">production</font>两个模式其实预设了很少的插件，大部分还是需要手动去配置。毕竟预设太多反而会不太灵活。

> webpack5和webpack4下的<font style="color:#f03d3d">development</font>、<font style="color:#f03d3d">production</font>预设插件具有一些差异，具体请参考 [webpack5-mode](https://webpack.js.org/configuration/mode/)、[webpack4-mode](https://v4.webpack.js.org/configuration/mode/)、[显微镜下的webpack4的新特性：mode详解](https://juejin.cn/post/6844903695033843726#heading-11)



#### process.env.NODE_ENV

在预设插件时看到在无论在<font style="color:#f03d3d">development</font>还是在<font style="color:#f03d3d">production</font>都设置了这个属性。那么这个属性是做什么用的。

先来看一个需要：在调用第三方SDK时，在开发环境与正式环境使用不同的SDK，会有人想这个做个配置就行了，在上线之前改下配置路径。

但是这样其实在开发和生产打包时需要分别更改代码，来回更改也是一件很繁琐的事情，所以需要一个能在业务代码中判断环境变量的需求。

在webpack中<font style="color:#f03d3d">DefinePlugin</font>插件就做了这件事，<font style="color:#f03d3d">development</font>和<font style="color:#f03d3d">production</font> mode都预设使用<font style="color:#f03d3d">DefinePlugin</font>插件设置了各自环境变量。



现在便来做一个小测试

先在index.js中添加一个console

<img src="D:/Code/前端/webpack/my-cli/blogs/images/image-02-12.png" width="400">

然后使用<font style="color:#f03d3d">development</font>模式打包

> yarn start

在打包生成的代码会找到这句代码

<img src="D:/Code/前端/webpack/my-cli/blogs/images/image-02-13.png" width="400">

可以看到打包出来的代码变成了<font style="color:#f03d3d">development</font>。同理<font style="color:#f03d3d">production</font>模式会替换成<font style="color:#f03d3d">production</font>值，我们使用此环境变量便可以进行使用不同SDK



> 其实环境变量的重点是：<font style="color:#f03d3d">DefinePlugin</font>插件，这个插件官方的解释是创建一个在编译时可以配置的全局变量，所以可以自定义配置任意属性值，在打包操作时，<font style="color:#f03d3d">DefinePlugin</font>插件会将配置的属性值进行替换。而<font style="color:#f03d3d">process.env.NODE_ENV</font>属性只是一个*约定属性*，有兴趣的诸君可以自行测试

```javascript
const webpack = require("webpack");

{
    plugins:[
         new webpack.DefinePlugin({ "global_a": JSON.stringify("我是一个打包配置的全局变量") }),
    ]
}
```





### optimization

在说打包器时，说过压缩（优化）代码也是打包器需要实现的需求之一。webpack作为主流的打包器必定要实现这个需求，webpack负责压缩优化配置的就是<font style="color:#f03d3d">optimization</font>属性。

在前面讲到，在<font style="color:#f03d3d">production</font>模式打包时，会对代码进行压缩，那么又为什么说是<font style="color:#f03d3d">optimization</font>属性控制的压缩呢？

先进行一个有趣的小测试，在webpack对象中设置一下<font style="color:#f03d3d">optimization.minimize</font>属性

```javascript
  optimization:{
    minimize:false
  }
```

然后再使用<font style="color:#f03d3d">production</font>模式打包，会发现一个有趣的现象：代码并没有被压缩。可以得知其实<font style="color:#f03d3d">production</font>模式中只不过将<font style="color:#f03d3d">optimization.minimize</font>属性设置为了<font style="color:#f03d3d">true</font>，控制压缩的还是<font style="color:#f03d3d">optimization</font>属性

<img src="D:/Code/前端/webpack/my-cli/blogs/images/image-02-14.png" width="400">

```javascript
  optimization:{
    // 开启默认优化
    minimize:true
  }
```

将<font style="color:#f03d3d">optimization.minimize</font>设置为true之后就使用默认的压缩插件进行压缩，前面说过，默认的压缩插件是<font style="color:#f03d3d">terser-webpack-plugin</font>。

也可以使用别的插件覆盖默认插件，覆盖操作使用的是<font style="color:#f03d3d">optimization</font>对象中<font style="color:#f03d3d">minimizer</font>属性，这个属性跟<font style="color:#f03d3d">plugins</font>类似，是一个数组，并且数组中设置的是压缩插件实体对象，执行优化代码时会依次使用所有优化插件进行优化代码。

> 后面学习的css压缩也会添加至这个属性之中

前面说过，目前流行的插件基本都是经过考证的最优解，所以无须去更改插件使用，不过可以自定义配置<font style="color:#f03d3d">terser-webpack-plugin</font>压缩，达到项目需求



> yarn add -D terser-webpack-plugin

在<font style="color:#f03d3d">optimization.minimizer</font>进行配置

```javascript
const TerserPlugin = require('terser-webpack-plugin');

 optimization: {
    // 配置可优化
    minimize: true,
    minimizer: [
      new TerserPlugin()
    ]
  }
```

现在使用<font style="color:#f03d3d">development</font>和<font style="color:#f03d3d">production</font>两种模式打包都会进行压缩，并且由于是默认选项，所以打包的结果跟之前没有不同，

不过如果多次测试的诸君会发下一个问题，哪怕配置了压缩，但是在<font style="color:#f03d3d">development</font>和<font style="color:#f03d3d">production</font>不同模式下打包还是略有不同，这是因为在<font style="color:#f03d3d">development</font>模式下开启了<font style="color:#f03d3d">devtool</font>属性，这个属性是为了增强开发调试，所以在<font style="color:#f03d3d">development</font>模式下

```javascript
{
    devtool: 'eval',
}
```





至于    <font style="color:#f03d3d">common.js 模块 </font>、<font style="color:#f03d3d">ES6 模块 </font>、<font style="color:#f03d3d">AMD 模块 </font>有兴趣的诸君也可以去[深入了解](https://www.cnblogs.com/chinabin1993/p/10565816.html)下。 

