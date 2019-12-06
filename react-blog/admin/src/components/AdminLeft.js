import React, { useState } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom'
import '../static/css/AdminLeft.css'
const { Sider } = Layout;
const { SubMenu } = Menu;

function AdminLeft() {

  const [collapsed, setCollapsed] = useState(false)

  const onCollapsed = collapsed => {
    setCollapsed(collapsed)
  }

  return (
    <div></div>
  )
}

export default AdminLeft