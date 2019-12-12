import React, { useState, useEffect } from 'react';
import { Table, Divider, Modal, message, Spin, Button, Icon, Input, Tag } from 'antd';
import axios from 'axios'
import servicePath from '../config/apiUrl'
import '../static/css/TypeList.css'
const { Column } = Table;
const { confirm } = Modal;

function AdminUserList(props) {

  const [isLoading, setIsLoading] = useState(false)
  const [userInfo, setUserInfo] = useState([])

  useEffect(() => {
    let isUnmounted = false;
    const fetchData = async () => {
      const result = await axios({ method: "get", url: servicePath.getAdminList, withCredentials: true })
        .then((res) => {
          if (res.data.data === '没有登录') {
            localStorage.clear('openId')
            localStorage.clear('userInfo')
            props.history.push('/login')
            return
          } else {
            for (let i = 0; i < res.data.data.length; i++) {
              res.data.data[i].key = i + 1
            }
            return res.data.data
          }
        })
      if (!isUnmounted) {
        setUserInfo(result)
      }
    }
    fetchData()
    return () => {
      isUnmounted = true;
    }
  }, [])

  return (
    <Spin tip="loading..." spinning={isLoading}>
      <Button type="primary" style={{ marginBottom: 16 }}>添加管理员</Button>
      <Table dataSource={userInfo}>
        <Column title='ID' dataIndex='id' key='id' />
        <Column title="用户名" dataIndex="user_name" key="user_name" />
        <Column title="用户密码" dataIndex="user_pwd" key="user_pwd" />
        <Column title="添加时间" dataIndex="add_time" key="add_time" />
        <Column title="最后登录时间" dataIndex="last_login_time" key="last_login_time" />
        <Column title="最后登录IP" dataIndex="last_login_ip" key="last_login_ip" />
        <Column title="状态" dataIndex="is_enabled" key="is_enabled"
          render={(text, record) => (
            <span>
              <Tag color={record.is_enabled === 0 ? 'volcano' : 'green'}>
                {record.is_enabled === 0 ? '未启用' : '已启用'}
              </Tag>
              <Tag color={record.user_state === 0 ? 'volcano' : record.user_state === 1 ? 'blue' : 'green'}>
                {record.user_state === 0 ? '超级管理员' : record.user_state === 1 ? '普通管理员' : '游客'}
              </Tag>
            </span>
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(text, record, index) => (
            <span>
              <a>{record.is_enabled === 1 ? '停用' : '启用'}</a>
              <Divider type="vertical" />
              <a>删除</a>
            </span>
          )}
        />
      </Table>
    </Spin>
  )
}

export default AdminUserList