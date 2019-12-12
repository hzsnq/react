import React, { useState, useEffect } from 'react';
import { Table, Divider, Tag, Modal, message, Spin } from 'antd';
import axios from 'axios'
import servicePath from '../config/apiUrl'
const { Column } = Table;
const { confirm } = Modal;

function ArticleList(props) {
  //页面参数 加载，文章列表数据
  const [isLoading, setIsLoading] = useState(false)
  const [articleList, setArticleList] = useState([])

  //页面加载异步获取文章列表，页面销毁，阻止异步进行
  useEffect(() => {
    let isUnmounted = false;
    const fetchData = async () => {
      const result = await axios({ method: "get", url: servicePath.getArticleList, withCredentials: true })
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
        setArticleList(result)
      }
    }
    fetchData()
    return () => {
      isUnmounted = true;
    }
  }, [])

  //异步获取文章列表
  const fetchData = async () => {
    const result = await axios({ method: "get", url: servicePath.getArticleList, withCredentials: true })
      .then((res) => {
        return res.data.data
      })
    for (let i = 0; i < result.length; i++) {
      result[i].key = i + 1
    }
    setArticleList(result)
  }

  //删除文章
  const showDeleteConfirm = (event) => {
    confirm({
      title: '确定要删除这篇文章吗?',
      content: '删除后不可恢复！！！',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        setIsLoading(true)
        let params = {
          id: event
        }
        axios({ method: "post", url: servicePath.deleteArticleById, data: params, withCredentials: true })
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
    });
  }

  //查看文章
  const showArticle = (id) => {
    props.history.push('/index/EditArticle/' + id)
  }

  //更改文章是否发布
  const updateIsIssue = (e) => {
    setIsLoading(true)
    let date = Math.round(new Date() / 1000)
    let params = {
      id: e.id,
      isIssue: e.is_issue === 0 ? 1 : 0,
      articleTitle: e.title,
      articleContent: e.article_content,
      introducemd: e.introduce,
      updateDate: date,
      selectedType: e.type_id
    }
    axios({ method: "post", url: servicePath.editArticle, data: params, withCredentials: true })
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

  return (
    <Spin tip="loading..." spinning={isLoading}>
      <Table dataSource={articleList}>
        <Column title='ID' dataIndex='id' key='id' />
        <Column title="文章类别" dataIndex="type_name" key="type_name" />
        <Column title="文章标题" dataIndex="title" key="title" />
        <Column title="发布日期" dataIndex="add_time" key="add_time" />
        <Column title="修改日期" dataIndex="update_time" key="update_time" />
        <Column title="点击量" dataIndex="view_count" key="view_count" />
        <Column title="文章状态" dataIndex="is_issue" key="is_issue"
          render={(text, record) => (
            <span>
              <Tag color={record.is_issue === 0 ? 'volcano' : 'green'}>
                {record.is_issue === 0 ? '未发布' : '已发布'}
              </Tag>
              <Tag color={record.is_update === 0 ? 'volcano' : 'green'}>
                {record.is_update === 0 ? '未修改' : '已修改'}
              </Tag>
            </span>
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(text, record, index) => (
            <span>
              <a onClick={() => showArticle(record.id)}>查看</a>
              <Divider type="vertical" />
              <a onClick={() => showDeleteConfirm(record.id)}>删除</a>
              <Divider type="vertical" />
              <a onClick={() => updateIsIssue(record)}>{record.is_issue === 0 ? '发布' : '暂存'}</a>
            </span>
          )}
        />
      </Table>
    </Spin>
  )
}

export default ArticleList
