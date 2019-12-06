import React, { useEffect, useState } from 'react';
import { Layout, Avatar, Dropdown, Menu, Icon } from 'antd';
import '../static/css/AdminHeader.css'
const { Header } = Layout;
function AdminHeader() {

  const [userName, setUserName] = useState('admin')
  const [userAvatar, setUserAvatar] = useState('A')

  const menu = (
    <Menu >
      <Menu.Item >
        退出
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    let user_name = JSON.parse(localStorage.getItem('userInfo'))
    setUserName(user_name.user_name)
    setUserAvatar(user_name.user_name.substring(0, 1))
  }, [])

  return (
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
  )
}

export default AdminHeader