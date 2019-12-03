# React学习
#2019-11-28  

井字棋小游戏与时钟  

地址：https://hzsnq.github.io/build/  

#2019-11-29  

Simple React Snippets  react快速生成插件  

单项数据流 只能用传过来的值，不能修改，可以通过传递父组件来修改  

函数式编程

1.函数式编程让我们的代码更清晰，每个功能都是一个函数。  

2.函数式编程为我们的代码测试代理了极大的方便，更容易实现前端自动化测试。  

PropTypes校验传递值  
PropTypes.string.isRequired 必须传

ref的使用方法

React声明周期的四个大阶段  

1.Initialization:初始化阶段。
2.Mounting: 挂载阶段。
3.Updation: 更新阶段。
4.Unmounting: 销毁阶段

Mounting阶段  
Mounting阶段叫挂载阶段，伴随着整个虚拟DOM的生成，它里边有三个小的生命周期函数，分别是：  

1.componentWillMount : 在组件即将被挂载到页面的时刻执行。
2.render : 页面state或props发生变化时执行。
3.componentDidMount : 组件挂载完成时被执行。  

注意的问题  
componentWillMount和componentDidMount这两个生命周期函数，只在页面刷新时执行一次，而render函数是只要有state和props变化就会执行，这个初学者一定要注意。  

具体： http://jspang.com/posts/2019/05/04/new-react-base.html#%E7%AC%AC19%E8%8A%82%EF%BC%9Areact%E9%AB%98%E7%BA%A7-%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E8%AE%B2%E8%A7%A3-1  
注：部分生命周期即将过期，请结合https://zh-hans.reactjs.org/docs/react-component.html#mounting  
中的组件生命周期理解

#2019-11-30  
今日遗留问题  
shouldComponentUpdate  返回false仍然会渲染子组件，暂无好的解决方法  
已解决，没必要这么弄  
12月2日发现好文  
https://zhuanlan.zhihu.com/p/29266705

#2019-12-1  
Reduce 详见ReduceDemo/demo01/src/store  
store必须是唯一的，多个store是坚决不允许，只能有一个store空间  
只有store能改变自己的内容，Reducer不能改变  
Reducer必须是纯函数  

#2019-12-2  

学习Redux的中间件Redux-thunk与Redux-saga  二者取一即可

配置Redux Dev Tools插件与Redux插件一起用  增强函数实现

具体参考  
https://jspang.com/posts/2019/06/20/redux.html#p16-%E8%BF%9B%E9%98%B6-redux-thunk%E4%B8%AD%E9%97%B4%E4%BB%B6%E7%9A%84%E5%AE%89%E8%A3%85%E5%92%8C%E9%85%8D%E7%BD%AE  

目录ReduxDemo/demo01/src/store/index.js  

学习react-redux(需要注意的是概念：React、Redux、React-redux是三个不同的东西)  

ReduxDemo/demo02是react-redux的例子

react-router  

精准匹配  exact  

重定向  标签式重定向  <Redirect to="/home/" />  

编程式重定向   this.props.history.push("/home/");  

React Hooks  

useState是react自带的一个hook函数，它的作用是用来声明状态变量     声明、读取、使用（修改）  

React Hooks不能出现在条件判断语句中，因为它必须有完全一样的渲染顺序。  

用useEffect函数来代替生命周期函数  

useEffect两个注意点  
React首次渲染和之后的每次渲染都会调用一遍useEffect函数，而之前我们要用两个生命周期函数分别表示首次渲染(componentDidMonut)和更新导致的重新渲染(componentDidUpdate)。  

useEffect中定义的函数的执行不会阻碍浏览器更新视图，也就是说这些函数时异步执行的，而componentDidMonut和componentDidUpdate中的代码都是同步执行的。个人认为这个有好处也有坏处吧，比如我们要根据页面的大小，然后绘制当前弹出窗口的大小，如果时异步的就不好操作了。  

Context的作用就是对它所包含的组件树提供全局共享数据的一种技术。  

reducer其实就是一个函数，这个函数接收两个参数，一个是状态，一个用来控制业务逻辑的判断参数。  

useReducer了，它也是React hooks提供的函数，可以增强我们的Reducer  

示例代码  ReactHooksDemo/demo01/src/example3.js  

useContext和useReducer的小栗子  
示例代码  ReactHooksDemo/demo01/src/example4  

#2019-12-3  

使用function的形式来声明组件，失去了shouldCompnentUpdate（在组件更新之前）这个生命周期，也就是说我们没有办法通过组件更新前条件来决定组件是否更新。而且在函数组件中，也不再区分mount和update两个状态，这意味着函数组件的每一次调用都会执行内部的所有逻辑，就带来了非常大的性能损耗。useMemo和useCallback都是解决上述性能问题的.

useCallback 缓存方法   

useMemo 缓存变量  

Next.js学习  

完善的React项目架构，搭建轻松。比如：Webpack配置，服务器启动，路由配置，缓存能力，这些在它内部已经完善的为我们搭建完成了。  

自带数据同步策略，解决服务端渲染最大难点。把服务端渲染好的数据，拿到客户端重用，这个在没有框架的时候，是非常复杂和困难的。有了Next.js，它为我们提供了非常好的解决方法，让我们轻松的就可以实现这些步骤。  
丰富的插件帮开发人员增加各种功能。每个项目的需求都是不一样的，包罗万象。无所不有，它为我们提供了插件机制，让我们可以在使用的时候按需使用。你也可以自己写一个插件，让别人来使用。  

灵活的配置，让开发变的更简单。它提供很多灵活的配置项，可以根据项目要求的不同快速灵活的进行配置。  

目前Next.js是React服务端渲染的最佳解决方案，所以如果你想使用React来开发需要SEO的应用，基本上就要使用Next.js。  

NextDemo文件夹是手动搭建的项目








