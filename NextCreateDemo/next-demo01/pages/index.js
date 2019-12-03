import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
const Home = () => {
  //函数式跳转
  function gotoGame() {
    Router.push({
      pathname: '/game',
      query: {
        id: 11111,
        name: 'BigXin'
      }
    })
  }

  Router.events.on('routeChangeStart', (...args) => {
    console.log('1.routerChangeStart->路由开始变化，参数为：', ...args)
  })

  Router.events.on('routeChangeComplete', (...args) => {
    console.log('2.routeChangeComplete->路由结束变化，参数为：', ...args)
  })

  Router.events.on('beforeHistoryChange', (...args) => {
    console.log('3.beforeHistoryChange->路由结束变化，参数为：', ...args)
  })

  Router.events.on('routeChangeError', (...args) => {
    console.log('4,routeChangeError->跳转发生错误,参数为:', ...args)
  })

  Router.events.on('hashChangeStart', (...args) => {
    console.log('5,hashChangeStart->hash跳转开始时执行,参数为:', ...args)
  })

  Router.events.on('hashChangeComplete', (...args) => {
    console.log('6,hashChangeComplete->hash跳转完成时,参数为:', ...args)
  })

  return (
    <>
      <div>我是首页</div>
      <div>
        <Link href="/video?id=11111">
          <a>
            <span>去看电影</span>
            <span>去看教学视频</span>
          </a>
        </Link></div>
      <div><Link href={{ pathname: '/game', query: { id: 11111 } }}><a>去看打游戏</a></Link></div>
      <div>
        <button onClick={gotoGame}>去打游戏</button>
      </div>

      <div>
        <Link href='#hzsnq'><a>去看hzsnq</a></Link>
      </div>
    </>
  )
}


export default Home;

