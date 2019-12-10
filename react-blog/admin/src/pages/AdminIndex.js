import React, { useState, useEffect } from 'react';
import { Layout, Menu, Breadcrumb, Avatar, Dropdown, Icon } from 'antd';
import '../static/css/AdminIndex.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import AddArticle from './AddArticle'
import EditArticle from './EditArticle'
import ArticleList from './ArticleList'
import Workbench from './Workbench'
// import { useSelector } from 'react-redux'
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex(props) {
  useEffect(() => {
    let item = localStorage.getItem('openId')
    if (item) {
      props.history.push('/index')
    } else {
      props.history.push('/login')
    }
  }, [props.history])
  // let state = useSelector((state) => ({ list: state.list }));
  const [collapsed, setCollapsed] = useState(false)
  const [showTitle, setShowTitle] = useState('工作台')
  const [userName, setUserName] = useState('admin')
  const [userAvatar, setUserAvatar] = useState('A')

  const onCollapsed = collapsed => {
    setCollapsed(collapsed)
  }
  const loginOut = () => {
    localStorage.clear('openId')
    localStorage.clear('userInfo')
    props.history.push('/login')
  }
  const menu = (
    <Menu >
      <Menu.Item onClick={loginOut}>
        退出
      </Menu.Item>
    </Menu>
  );
  useEffect(() => {
    let user_name = JSON.parse(localStorage.getItem('userInfo'))
    if (user_name === null || user_name === undefined || user_name === '') {
      props.history.push('/login')
    } else {
      setUserName(user_name.user_name)
      setUserAvatar(user_name.user_name.substring(0, 1))
    }
  }, [props.history])

  const handleClick = (e) => {
    if (e.key === "AddArticle") {
      props.history.push('/index/AddArticle')
      setShowTitle('添加文章')
    } else if (e.key === "ArticleList") {
      setShowTitle('文章列表')
      props.history.push('/index/ArticleList')
    } else if (e.key === "Workbench") {
      props.history.push('/index')
      setShowTitle('工作台')
    }
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapsed}>
        <div className="logo">Hzsnq Blog System</div>
        <Menu theme="dark" defaultSelectedKeys={['Workbench']} mode="inline" onClick={handleClick}>
          <Menu.Item key="Workbench">
            <Icon type="pie-chart" />
            <span>工作台</span>
          </Menu.Item>
          <Menu.Item key="AddArticle">
            <Icon type="desktop" />
            <span>添加文章</span>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="user" />
                <span>文章管理</span>
              </span>
            }
          >
            <Menu.Item key="ArticleList">文章列表</Menu.Item>
          </SubMenu>

          <Menu.Item key="9">
            <Icon type="file" />
            <span>留言管理</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0, }} >
          <div className="index-avatar">
            <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{userAvatar}</Avatar>
            <div className="user-name">
              <Dropdown overlay={menu} >
                <a className="ant-dropdown-link" href='#'>
                  {userName} <Icon type="down" />
                </a>
              </Dropdown>
            </div>
          </div>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>后台管理</Breadcrumb.Item>
            <Breadcrumb.Item>{showTitle}</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <div>
              <Route path="/index" exact component={Workbench} />
              <Route path="/index/AddArticle/" component={AddArticle} />
              <Route path="/index/ArticleList" component={ArticleList} />
              <Route path="/index/EditArticle/:id" component={EditArticle} />
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Hzsnq.com</Footer>
      </Layout>
    </Layout>
  )

}

export default AdminIndex;