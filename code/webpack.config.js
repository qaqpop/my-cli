const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const modules = (config)=>{
  console.log(config)
  return  {

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
      }),
      new CleanWebpackPlugin({

        //  假装文件删除
        //  如果为false则代表真实删除，如果为true，则代表不删除
        dry:false,
        //  是否打印日志到控制台 默认为false
        verbose: true,
        cleanStaleWebpackAssets: false,
        //  允许保留本次打包的文件
        //  true为允许，false为不允许，保留本次打包结果，也就是会删除本次打包的文件
        //  默认为true
        protectWebpackAssets:true,
        //  每次打包之前删除匹配的文件
        cleanOnceBeforeBuildPatterns:['**/*'],

        //  每次打包之后删除匹配的文件
      })
    ]
  }
}

//  使用node。js的导出，将配置进行导出
module.exports = modules