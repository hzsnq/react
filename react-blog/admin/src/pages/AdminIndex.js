import React, { useState, useEffect } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import '../static/css/AdminIndex.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import AddArticle from './AddArticle'
import AdminHeader from '../components/AdminHeader'
import ArticleList from './ArticleList'
// import { useSelector } from 'react-redux'


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex(props) {
  // let state = useSelector((state) => ({ list: state.list }));
  const [collapsed, setCollapsed] = useState(false)
  const [showPage, setShowPage] = useState({ component: AddArticle })

  const onCollapsed = collapsed => {
    setCollapsed(collapsed)
  }

  useEffect(() => {
    let item = localStorage.getItem('openId')
    if (item) {
      props.history.push('/index')
    } else {
      props.history.push('/login')
    }
    // console.log(openIdContext)
  }, [props.history])

  const handleClick = (e) => {
    if (e.key === "AddArticle") {
      setShowPage({ component: AddArticle })
    } else if (e.key === "ArticleList") {
      setShowPage({ component: ArticleList })
    }
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapsed}>
        <div className="logo">Hzsnq Blog System</div>
        <Menu theme="dark" defaultSelectedKeys={['AddArticle']} mode="inline" onClick={handleClick}>
          <Menu.Item key="Index">
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
            <Menu.Item key="AddArticle">添加文章</Menu.Item>
            <Menu.Item key="ArticleList">文章列表</Menu.Item>

          </SubMenu>

          <Menu.Item key="9">
            <Icon type="file" />
            <span>留言管理</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <AdminHeader >
        </AdminHeader>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>后台管理</Breadcrumb.Item>
            <Breadcrumb.Item>工作台</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <div>
              <Route path="/index/" exact component={showPage.component} />
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Hzsnq.com</Footer>
      </Layout>
    </Layout >
  )

}

export default AdminIndex;