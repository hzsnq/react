# React学习
## 2019-11-28  

井字棋小游戏与时钟  

地址：[预览点我](https://hzsnq.github.io/build/)  

## 2019-11-29  

**Simple React Snippets  react快速生成插件**  

>单项数据流 只能用传过来的值，不能修改，可以通过传递父组件来修改  

**函数式编程**

>1.函数式编程让我们的代码更清晰，每个功能都是一个函数。  

>2.函数式编程为我们的代码测试代理了极大的方便，更容易实现前端自动化测试。  

**PropTypes校验传递值**  

>PropTypes.string.isRequired 必须传

ref的使用方法

**React声明周期的四个大阶段**  

>1.Initialization:初始化阶段。
>2.Mounting: 挂载阶段。
>3.Updation: 更新阶段。
>4.Unmounting: 销毁阶段

>Mounting阶段  
>Mounting阶段叫挂载阶段，伴随着整个虚拟DOM的生成，它里边有三个小的生命周期函数，分别是：  

>1.componentWillMount : 在组件即将被挂载到页面的时刻执行。
>2.render : 页面state或props发生变化时执行。
>3.componentDidMount : 组件挂载完成时被执行。  

>注意的问题  
>componentWillMount和componentDidMount这两个生命周期函数，只在页面刷新时执行一次，而render函数是只要有state和props变化就会执行，这个初学者一定要注意。  

具体详解：[查看点我](http://jspang.com/posts/2019/05/04/new-react-base.html#%E7%AC%AC19%E8%8A%82%EF%BC%9Areact%E9%AB%98%E7%BA%A7-%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E8%AE%B2%E8%A7%A3-1)  

注：部分生命周期即将过期，请结合[官网](https://zh-hans.reactjs.org/docs/react-component.html#mounting)中的组件生命周期理解

## 2019-11-30  
今日遗留问题  
shouldComponentUpdate  返回false仍然会渲染子组件，暂无好的解决方法  
已解决，没必要这么弄  
12月2日发现[好文](https://zhuanlan.zhihu.com/p/29266705)

## 2019-12-1  
**Reduce**   

>详见ReduceDemo/demo01/src/store  
>store必须是唯一的，多个store是坚决不允许，只能有一个store空间  
>只有store能改变自己的内容，Reducer不能改变  
>Reducer必须是纯函数  

## 2019-12-2  

>学习Redux的中间件Redux-thunk与Redux-saga  二者取一即可

>配置Redux Dev Tools插件与Redux插件一起用  增强函数实现

具体参考  
[点我](https://jspang.com/posts/2019/06/20/redux.html#p16-%E8%BF%9B%E9%98%B6-redux-thunk%E4%B8%AD%E9%97%B4%E4%BB%B6%E7%9A%84%E5%AE%89%E8%A3%85%E5%92%8C%E9%85%8D%E7%BD%AE)  

>目录ReduxDemo/demo01/src/store/index.js  

>学习react-redux(需要注意的是概念：React、Redux、React-redux是三个不同的东西)  

>ReduxDemo/demo02是react-redux的例子

**react-router**  

>精准匹配  exact  

重定向  标签式重定向  
```<Redirect to="/home/" />```   

编程式重定向   
```this.props.history.push("/home/");```  

**React Hooks**  

>useState是react自带的一个hook函数，它的作用是用来声明状态变量     声明、读取、使用（修改）  

>React Hooks不能出现在条件判断语句中，因为它必须有完全一样的渲染顺序。  

>用useEffect函数来代替生命周期函数  

>useEffect两个注意点  
>React首次渲染和之后的每次渲染都会调用一遍useEffect函数，而之前我们要用两个生命周期函数分别表示首次渲染(componentDidMonut)和更新导致的重新渲染(componentDidUpdate)。  

>useEffect中定义的函数的执行不会阻碍浏览器更新视图，也就是说这些函数时异步执行的，而componentDidMonut和componentDidUpdate中的代码都是同步执行的。个人认为这个有好处也有坏处吧，比如我们要根据页面的大小，然后绘制当前弹出窗口的大小，如果时异步的就不好操作了。  

>Context的作用就是对它所包含的组件树提供全局共享数据的一种技术。  

>reducer其实就是一个函数，这个函数接收两个参数，一个是状态，一个用来控制业务逻辑的判断参数。  

>useReducer了，它也是React hooks提供的函数，可以增强我们的Reducer  

>示例代码  ReactHooksDemo/demo01/src/example3.js  

>useContext和useReducer的小栗子  
>示例代码  ReactHooksDemo/demo01/src/example4  

## 2019-12-3  

>使用function的形式来声明组件，失去了shouldCompnentUpdate（在组件更新之前）这个生命周期，也就是说我们没有办法通过组件更新前条件来决定组件是否更新。而且在函数组件中，也不再区分mount和update两个状态，这意味着函数组件的每一次调用都会执行内部的所有逻辑，就带来了非常大的性能损耗。useMemo和useCallback都是解决上述性能问题的.

**useCallback 缓存方法**   

**useMemo 缓存变量**  

**Next.js学习**  

>完善的React项目架构，搭建轻松。比如：Webpack配置，服务器启动，路由配置，缓存能力，这些在它内部已经完善的为我们搭建完成了。  

>自带数据同步策略，解决服务端渲染最大难点。把服务端渲染好的数据，拿到客户端重用，这个在没有框架的时候，是非常复杂和困难的。有了Next.js，它为我们提供了非常好的解决方法，让我们轻松的就可以实现这些步骤。  
>丰富的插件帮开发人员增加各种功能。每个项目的需求都是不一样的，包罗万象。无所不有，它为我们提供了插件机制，让我们可以在使用的时候按需使用。你也可以自己写一个插件，让别人来使用。  

>灵活的配置，让开发变的更简单。它提供很多灵活的配置项，可以根据项目要求的不同快速灵活的进行配置。  

>目前Next.js是React服务端渲染的最佳解决方案，所以如果你想使用React来开发需要SEO的应用，基本上就要使用Next.js。  

>NextDemo文件夹是手动搭建的项目  
>NextCreateDemo文件夹是create-next-app的项目 (由于NPM命名限制,名称不能再包含大写字母)

项目结构介绍  

* components文件夹:这里是专门放置自己写的组件的，这里的组件不包括页面，指公用的或者有专门用途的组件。  

* node_modules文件夹：Next项目的所有依赖包都在这里，一般我们不会修改和编辑这里的内容。  

* pages文件夹：这里是放置页面的，这里边的内容会自动生成路由，并在服务器端渲染，渲染好后进行数据同步。  

* static文件夹： 这个是静态文件夹，比如项目需要的图片、图标和静态资源都可以放到这里。  

* .gitignore文件： 这个主要是控制git提交和上传文件的，简称就是忽略提交。  

* package.json文件：定义了项目所需要的文件和项目的配置信息（名称、版本和许可证），最主要的是使用npm install 就可以下载项目所需要的所有包。  

>withRouter是Next.js框架的高级组件，用来处理路由用的  

>next路由的六个钩子事件  

>routerChangeStart路由发生变化时  

>routerChangeComplete路由结束变化时  

>beforeHistoryChange浏览器history触发前  

>routeChangeError路由跳转发生错误时  

>转变成hash路由模式  hashChangeStart    hashChangeComplete  

>在Next.js框架中提供了getInitialProps静态方法用来获取远端数据  

**Style JSX语法**  

>开始进行配置，让Next.js支持CSS文件  

>先用yarn命令来安装@zeit/next-css包，它的主要功能就是让Next.js可以加载CSS文件，有了这个包才可以进行配置。  

>按需加载Ant Design  用到babel-plugin-import  

具体查阅：[解决方案](http://jspang.com/posts/2019/09/01/react-nextjs.html#p11%EF%BC%9Anext-js%E6%A1%86%E6%9E%B6%E4%B8%8B%E4%BD%BF%E7%94%A8ant-design-ui)  

也可以参考[官方文档](https://github.com/zeit/next.js/blob/canary/examples/with-ant-design/README.md) 创建带ant的next项目  

>创建后的架构为 NextCreateDemo/with-ant-design-app  

## 2019-12-4 
react-blog是一个博客项目，功能有待完善，架构已经搭好  
react-blog
* admin 博客后台 使用React Hooks + Ant Design
* blog 博客前台 使用Next.js+ Ant Design
* service 博客中台(服务端) 使用mysql+egg.js  

## 2019-12-5  

整理前几日学习笔记，写blog项目

## 2019-12-6  
把时间转换成数字时间戳  

```Math.round(new Date(dateString) / 1000)```  

## 2019-12-7 ---- 2019-12-10
完成博客文章，类别等的操作，继续完善博客  

购买服务器  

购买域名  

## 2019-12-11  

配置nginx  
>安装vim

``` bash
yum -y install gcc gcc-c++ autoconf pcre-devel make automake

yum -y install wget httpd-tools vim
```
>安装nginx，安装时可以```yum list | grep nginx```查看yum源里的```nginx```的版本

``` bash
yum install nginx

nginx -v
```
>查看nginx安装到哪里
``` bash
rpm -ql nginx
```
>nginx配置 [点我](https://jspang.com/detailed?id=39#toc22)  

>如果是阿里云的ecs，记得进行安全组配置  

>nginx启动，停止，重启  
``` bash
nginx  //在CentOS7.4版本里（低版本是不行的），是可以直接直接使用nginx启动服务的。  

systemctl start nginx.service //使用systemctl命令启动  

ps aux | grep nginx //查询是否启动  

nginx  -s stop //强制停止  

nginx -s quit //从容停止  

killall nginx //这种方法也是比较野蛮的，我们直接杀死进程，但是在上面使用没有效果时，我们用这种方法还是比较好的。  

systemctl stop nginx.service //systemctl 停止  

systemctl restart nginx.service //重启nginx  

nginx -s reload //重新载入配置文件  

netstat -tlnp //查看端口号的占用情况  

```  
>自定义错误页，访问设置，访问权限 [点我](https://jspang.com/detailed?id=39#toc27)  

>设置虚拟主机，使用域名设置虚拟主机，nginx反向代理 [点我](https://jspang.com/detailed?id=39#toc28)  

>nginx适配pc和移动设备，nginx的Gzip压缩配置 [点我](https://jspang.com/detailed?id=39#toc211)  

>nginx配置https [点我](https://help.aliyun.com/document_detail/98728.html?spm=5176.2020520163.0.0.3234Knm4Knm4qR)  

>阿里云免费申请ssl证书 [点我](https://yundun.console.aliyun.com/?spm=5176.12818093.aliyun_sidebar.193.488716d0aNveUT&p=cas#/overview/cn-hangzhou)

明天开始配置mysql，今天折腾了好久这个服务器，还好是成功配置，大学学的linux知识还好都没还给老师  

## 2019-12-12  
配置mysql8.0版本  
>检查服务器是否装mysql [检查卸载点我](https://www.cnblogs.com/Can-daydayup/p/10873948.html)

>一定要选择正确的yum源，否则会出现各种各样的问题(来自折腾两小时的 - -!)  

>例：虚拟装的是Centos7,必须下载 RH Linux 7 的安装包  

>安装流程 [点我](https://www.cnblogs.com/yaowen/p/9486138.html)  

>选对了源，安装就没报错，按照上面的流程顺利的进行到 ```Navicat``` 连接mysql8  

>如果是阿里云的服务器，记的配置安全组策略  

>mysql数据库创建、删除用户和授权、消权操作 [点我](https://www.cnblogs.com/gychomie/p/11013442.html)

>需要注意的是 mysql8.0 引入了新特性 caching_sha2_password；这种密码加密方式客户端不支持；客户端支持的是mysql_native_password 这种加密方式；

```bash
select host,user,plugin from mysql.user;
update mysql.user set plugin='mysql_native_password' where user='你创建的用户名';
```  

>还有一个问题，创建用户时，用户的密码策略还是```caching_sha2_password```，这时连接会报1251错误，需要把密码按照```mysql_native_password```更新一下  

```bash
ALTER USER '你的用户名'@'%' IDENTIFIED WITH mysql_native_password BY '你的密码'; #更新一下用户的密码
```   

>最后设置下mysql开机启动  

配置node和git的安装  

>1、下载node二进制安装包 
  wget https://nodejs.org/dist/v10.13.0/node-v10.13.0-linux-x64.tar.xz  
2、解压
  tar xvf node-v10.13.0-linux-x64.tar.xz  
3、创建软链接，使node和npm全局有效  
  ln -s /root/node-v10.13.0-linux-x64/bin/node /usr/local/bin/node  
  ln -s /root/node-v10.13.0-linux-x64/bin/npm /usr/local/bin/npm  
4、查看node和npm版本，如果显示版本号，说明安装成功  
  node -v  
  npm -v  
5、软件默认安装在/root/node-v10.13.0-linux-x64/目录下

>git安装配置 [点我](https://blog.csdn.net/jsboy123/article/details/80617231)  

>还需要配置git用户组与用户 [点我](https://blog.csdn.net/UtopiaOfArtoria/article/details/86002916)  

>最后配置  不然会报错 详情[点我](https://www.cnblogs.com/love-snow/articles/7542267.html)

```bash
ln -s /usr/local/git/bin/git-upload-pack /usr/bin/git-upload-pack 
```












