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
这部分重要，留着明天看视频学习

