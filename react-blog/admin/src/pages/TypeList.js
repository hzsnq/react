import React, { useState, useEffect } from 'react';
import { Table, Divider, Modal, message, Spin, Button, Icon, Input } from 'antd';
import axios from 'axios'
import servicePath from '../config/apiUrl'
import '../static/css/TypeList.css'
const { Column } = Table;
const { confirm } = Modal;

function TypeList(props) {

  const [isLoading, setIsLoading] = useState(false)
  const [typeInfo, setTypeInfo] = useState([])

  useEffect(() => {
    let isUnmounted = false;
    const fetchData = async () => {
      const result = await axios({ method: "get", url: servicePath.getTypeInfo, withCredentials: true })
        .then((res) => {
          if (res.data.data === '没有登录') {
            localStorage.clear('openId')
            localStorage.clear('userInfo')
            props.history.push('/login')
            return
          } else {
            return res.data.data
          }
        })
      for (let i = 0; i < result.length; i++) {
        result[i].key = i + 1
        result[i].isSave = 1
      }
      if (!isUnmounted) {
        setTypeInfo(result)
      }
    }
    fetchData()
    return () => {
      isUnmounted = true;
    }
  }, [])

  const fetchData = async () => {
    const result = await axios({ method: "get", url: servicePath.getTypeInfo, withCredentials: true })
      .then((res) => {
        if (res.data.data === '没有登录') {
          localStorage.clear('openId')
          localStorage.clear('userInfo')
          props.history.push('/login')
          return
        } else {
          return res.data.data
        }
      })
    for (let i = 0; i < result.length; i++) {
      result[i].key = i + 1
      result[i].isSave = 1
    }
    setTypeInfo(result)
  }
  const updateType = (a, b) => {
    setIsLoading(true)
    if (typeInfo[a - 1].type_name === "" || typeInfo[a - 1].icon === "") {
      message.warning('还有内容没有填哦！！')
      setIsLoading(false)
    } else {
      if (b === 0) {
        console.log('save')
        let params = {
          typeName: typeInfo[a - 1].type_name,
          orderNum: typeInfo[a - 1].order_num,
          Icon: typeInfo[a - 1].icon
        }
        axios({ method: "post", url: servicePath.addTypeInfo, data: params, withCredentials: true })
          .then(res => {
            setIsLoading(false)
            if (res.data.data === '添加成功') {
              message.success(res.data.data)
              fetchData()
            } else {
              message.error(res.data.data)
            }
          })
      } else {
        console.log('update')
        let params = {
          typeName: typeInfo[a - 1].type_name,
          id: typeInfo[a - 1].id,
          Icon: typeInfo[a - 1].icon
        }
        axios({ method: "post", url: servicePath.editTypeInfo, data: params, withCredentials: true })
          .then(res => {
            setIsLoading(false)
            if (res.data.data === '修改成功') {
              message.success(res.data.data)
              fetchData()
            } else {
              message.error(res.data.data)
            }
          })
      }
    }
  }

  const deleteType = (a, b) => {
    let list = [...typeInfo]
    confirm({
      title: '确定要删除吗?',
      content: '删除后不可恢复！！！',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        setIsLoading(true)
        if (b === 0) {
          list.splice(a - 1, 1)
          for (let i = 0; i < list.length; i++) {
            list[i].key = i + 1
          }
          setTypeInfo(list)
          setIsLoading(false)
          return
        } else {
          let params = {
            id: typeInfo[a - 1].id,
          }
          axios({ method: "post", url: servicePath.deleteTypeInfoById, data: params, withCredentials: true })
            .then(res => {
              setIsLoading(false)
              if (res.data.data === '删除成功') {
                message.success(res.data.data)
                fetchData()
              } else {
                message.error(res.data.data)
              }
            })
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const addTypeInfo = () => {
    let typeLength = typeInfo.length;
    let item = {
      id: typeLength + 1,
      key: typeLength + 1,
      order_num: typeLength + 1,
      type_name: '请输入类别名称',
      icon: 'reddit',
      isSave: 0
    }
    let list = [...typeInfo, item]
    setTypeInfo(list)
  }
  const updateTypeName = (id, e) => {
    let list = [...typeInfo]
    list[id - 1].type_name = e.target.value;
    setTypeInfo(list)
  }
  const updateTypeIcon = (id, e) => {
    let list = [...typeInfo]
    list[id - 1].icon = e.target.value;
    setTypeInfo(list)
  }
  return (
    <Spin tip="loading..." spinning={isLoading}>
      <Button type="primary" style={{ marginBottom: 16 }} onClick={addTypeInfo}>添加类别</Button>
      <Table dataSource={typeInfo}>
        <Column title='ID' dataIndex='id' key='id' />
        <Column title="类别ID" dataIndex="order_num" key="order_num" />
        <Column title="类别名称" dataIndex="type_name" key="type_name"
          render={(text, record) => (
            <Input value={record.type_name} onChange={(e) => updateTypeName(record.key, e)} className="type-input"></Input>
          )}
        />
        <Column title="类别图标" dataIndex="icon" key="icon"
          render={(text, record) => (
            <span >
              <Icon type={record.icon ? record.icon : 'reddit'} style={{ fontSize: '24px' }}>
              </Icon>
              <Input value={record.icon} onChange={(e) => updateTypeIcon(record.key, e)} className="type-input"></Input>
            </span>
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(text, record, index) => (
            <span>
              <a onClick={() => updateType(record.key, record.isSave)}>{record.isSave === 0 ? '保存' : '修改'}</a>
              <Divider type="vertical" />
              <a onClick={() => deleteType(record.key, record.isSave)}>删除</a>
            </span>
          )}
        />
      </Table>
    </Spin>
  )
}

export default TypeList;