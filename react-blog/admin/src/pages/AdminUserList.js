import React, { useState, useEffect } from 'react';
import { Table, Divider, Modal, message, Spin, Button, Input, Tag, Icon } from 'antd';
import axios from 'axios'
import servicePath from '../config/apiUrl'
import { cryptoEncrypt } from '../utils/crypto'
const { Column } = Table;
const { confirm } = Modal;

function AdminUserList(props) {
  //页面参数
  const [isLoading, setIsLoading] = useState(false)
  const [isShow, setIsShow] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [userInfo, setUserInfo] = useState([])
  const [adminName, setAdminName] = useState('')
  const [adminPwd, setAdminPwd] = useState('')

  //异步获取admin例表
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
  }, [props.history])

  //异步获取admin列表
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
    setUserInfo(result)
  }

  //删除admin
  const deleteAdmin = (e) => {
    let item = JSON.parse(localStorage.getItem('userInfo'))
    if (item.id === 1 && item.user_name === 'hzsnq') {
      confirm({
        title: '确定要删除这个管理员吗?',
        content: '删除后不可恢复！！！',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
          setIsLoading(true)
          let params = {
            id: e
          }
          axios({ method: "post", url: servicePath.deleteAdminById, data: params, withCredentials: true })
            .then(res => {
              setIsLoading(false)
              if (res.data.data === '删除成功') {
                message.success(res.data.data)
                fetchData()
              } else {
                message.error(res.data.data)
              }
            })
        },
        onCancel() {
          console.log('Cancel');
        },
      })
    } else {
      setIsLoading(false)
      message.error('权限不足')
    }
  }

  //更改启用状态
  const updateIsEnable = (e) => {
    setIsLoading(true)
    let item = JSON.parse(localStorage.getItem('userInfo'))
    if (item.id === 1 && item.user_name === 'hzsnq') {
      let params = {
        id: e.id,
        isEnabled: e.is_enabled === 0 ? 1 : 0,
      }
      axios({ method: "post", url: servicePath.editAdminById, data: params, withCredentials: true })
        .then(res => {
          setIsLoading(false)
          if (res.data.data === '修改成功') {
            message.success(res.data.data)
            fetchData()
          } else {
            message.error(res.data.data)
          }
        })
    } else {
      setIsLoading(false)
      message.error('权限不足')
    }
  }

  //添加用户显示隐藏
  const showModal = () => {
    let item = JSON.parse(localStorage.getItem('userInfo'))
    if (item.id === 1 && item.user_name === 'hzsnq') {
      setIsShow(true)
    } else {
      setIsLoading(false)
      message.error('权限不足')
    }
  }

  //关闭modal
  const handleCancel = () => {
    setIsShow(false)
  }

  //添加admin
  const handleOk = () => {
    if (adminName === "" || adminPwd === "") {
      message.warning('还有内容没有填哦！！')
      setIsLoading(false)
    } else {
      setConfirmLoading(true)
      let date = Math.round(new Date() / 1000)
      let pwd = cryptoEncrypt(adminPwd)
      let params = {
        userName: adminName,
        userPwd: pwd,
        addTime: date
      }
      axios({ method: "post", url: servicePath.addAdmin, data: params, withCredentials: true })
        .then(res => {
          setIsLoading(false)
          setIsShow(false)
          setConfirmLoading(false)
          if (res.data.data === '添加成功') {
            message.success(res.data.data)
            fetchData()
          } else {
            message.error(res.data.data)
          }
        })
    }
  }

  //改变用户名
  const changeName = (e) => {
    setAdminName(e.target.value)
  }

  //改变密码
  const changePwd = (e) => {
    setAdminPwd(e.target.value)
  }

  return (
    <Spin tip="loading..." spinning={isLoading}>
      <Button type="primary" style={{ marginBottom: 16 }} onClick={showModal}>添加管理员</Button>
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
              <a onClick={() => updateIsEnable(record)}>{record.is_enabled === 1 ? '停用' : '启用'}</a>
              <Divider type="vertical" />
              <a onClick={() => deleteAdmin(record.id)}>删除</a>
            </span>
          )}
        />
      </Table>
      <Modal
        title="添加管理员"
        visible={isShow}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div>
          <Input
            size="large"
            placeholder="请输入管理员名称"
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}></Icon>}
            value={adminName}
            onChange={(e) => changeName(e)}
          ></Input>
          <br></br><br></br>
          <Input.Password
            size="large"
            placeholder="请输入管理员密码"
            prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }}></Icon>}
            value={adminPwd}
            onChange={(e) => changePwd(e)}
          ></Input.Password>
        </div>
      </Modal>
    </Spin >
  )
}

export default AdminUserList