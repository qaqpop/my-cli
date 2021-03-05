# my-cli
my-cli是Orcas的一次尝试，

在前端开发中一直是大家面向脚手架，很多的脏活动累活都是由脚手架负责。对于快速开发而言，脚手架帮助开发者专注于代码，而不用关心这些功能复杂且文档残缺的Webpack或其他的打包工具。

## 目的
  本文旨在通过从新建文件夹开始，一步步去实现“脚手架一行命令敲下去”的最终效果，并把各种配置与插件的运用进行较为详细的说明。因为不想把脚手架当作一个黑盒，只当一个业务逻辑搬砖工，这对职业发展前景是不利的，只有自己理解脚手架做了什么，在遇到脚手架不满足需求的时候能够自己修改，才算是真正的开发。如果时间或条件允许，本文后期会增加 “自己实现webpack插件” 与 “自己实现类webpack打包器” 相关内容。

## 目录

* [从零学脚手架(一)---环境介绍](https://github.com/OrcasTeam/my-cli/blob/master/blogs/%E4%BB%8E%E9%9B%B6%E5%AD%A6%E8%84%9A%E6%89%8B%E6%9E%B6(%E4%B8%80)---%E7%8E%AF%E5%A2%83%E4%BB%8B%E7%BB%8D.md)
* [从零学脚手架(二)---初识webpack](https://github.com/OrcasTeam/my-cli/blob/master/blogs/%E4%BB%8E%E9%9B%B6%E5%AD%A6%E8%84%9A%E6%89%8B%E6%9E%B6(%E4%BA%8C)---%E5%88%9D%E8%AF%86webpack.md)
* [从零学脚手架(三)---webpack属性详解](https://github.com/OrcasTeam/my-cli/blob/master/blogs/%E4%BB%8E%E9%9B%B6%E5%AD%A6%E8%84%9A%E6%89%8B%E6%9E%B6(%E4%B8%89)---webpack%E5%B1%9E%E6%80%A7%E8%AF%A6%E8%A7%A3.md)
* [从零学脚手架(四)---babel](https://github.com/OrcasTeam/my-cli/blob/master/blogs/%E4%BB%8E%E9%9B%B6%E5%AD%A6%E8%84%9A%E6%89%8B%E6%9E%B6(%E5%9B%9B)---babel.md)
* [从零学脚手架(五)---react和browserslist](https://github.com/OrcasTeam/my-cli/blob/master/blogs/%E4%BB%8E%E9%9B%B6%E5%AD%A6%E8%84%9A%E6%89%8B%E6%9E%B6(%E4%BA%94)---react%E3%80%81browserslist.md)
* [从零学脚手架(六)---production、development拆分](https://github.com/OrcasTeam/my-cli/blob/master/blogs/%E4%BB%8E%E9%9B%B6%E5%AD%A6%E8%84%9A%E6%89%8B%E6%9E%B6(%E5%85%AD)---production%E5%92%8Cdevelopment%E6%8B%86%E5%88%86.md)
* [从零学脚手架(七)---webpack-dev-server使用](https://github.com/OrcasTeam/my-cli/blob/master/blogs/%E4%BB%8E%E9%9B%B6%E5%AD%A6%E8%84%9A%E6%89%8B%E6%9E%B6(%E4%B8%83)---webpack-dev-server%E4%BD%BF%E7%94%A8.md)
* [从零学脚手架(八)---webpack-dev-server源码分析](https://github.com/OrcasTeam/my-cli/blob/master/blogs/%E4%BB%8E%E9%9B%B6%E5%AD%A6%E8%84%9A%E6%89%8B%E6%9E%B6(%E5%85%AB)---webpack-dev-server%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90.md)

未完待续。。。。。。。。。。。。。。。。。。。。。。。。。。

####  

#### 

#### 

## 说明
在文字版中，主要的文字为莫问今朝同学撰写，在文章中可能会出现 🐋:XXXXX (鲸鱼标志,主要是emoji不提供虎鲸)，为另一位作者的建议与碎碎念。



本系列章节中使用的包基本都是使用截止编写时的最新版本号。

## 最后
希望Orcas各位越来越好
