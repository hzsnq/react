import React, { useState, useEffect } from 'react';
import marked from 'marked'
import '../static/css/AddArticle.css'
import { Row, Col, Input, Select, Button, message, Spin } from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'

const { Option } = Select;
const { TextArea } = Input

function EditArticle(props) {

  //页面参数
  const [articleId, setArticleId] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  // const [isUpdate, setIsUpdate] = useState(0)  // 文章的更新状态，如果是0说明是新增加，如果不是0，说明是修改
  const [isIssue, setIsIssue] = useState(0)  // 文章的发布状态，如果是0说明是暂存
  const [articleTitle, setArticleTitle] = useState('')   //文章标题
  const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
  const [introducemd, setIntroducemd] = useState('')            //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState('等待编辑') //简介的html内容
  const [showDate, setShowDate] = useState()   //发布日期
  const [updateDate, setUpdateDate] = useState() //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
  const [selectedType, setSelectType] = useState(1) //选择的文章类别

  //配置marked
  marked.setOptions({
    renderer: marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
  });

  //异步获取文章类别下拉
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
      if (!isUnmounted) {
        setTypeInfo(result)
      }
    }
    fetchData()
    return () => {
      isUnmounted = true;
    }
  }, [props.history])

  //异步获取展示文章内容
  useEffect(() => {
    let isUnmounted = false;
    let params = {
      id: props.match.params.id
    }
    const fetchData = async () => {
      const result = await axios({ method: "post", url: servicePath.getArticleById, data: params, withCredentials: true })
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
      if (!isUnmounted) {
        setSelectType(result[0].type_id)
        setArticleTitle(result[0].title)
        setArticleContent(result[0].article_content)
        setMarkdownContent(marked(result[0].article_content))
        setIntroducemd(result[0].introduce)
        setIntroducehtml(marked(result[0].introduce))
        setShowDate(result[0].add_time)
        setIsIssue(result[0].is_issue)
        setArticleId(result[0].id)
      }
    }
    fetchData()
    return () => {
      isUnmounted = true;
    }
  }, [props.match.params, props.history])

  //同步文章内容
  const changeContent = (e) => {
    setArticleContent(e.target.value)
    let html = marked(e.target.value)
    setMarkdownContent(html)
  }

  //同步文章简介
  const changeIntroduce = (e) => {
    setIntroducemd(e.target.value)
    let html = marked(e.target.value)
    setIntroducehtml(html)
  }

  //改变文章类别
  const changeTypeInfo = (e) => {
    setSelectType(e)
  }

  //改变文章标题
  const changeArticleTitle = (e) => {
    setArticleTitle(e.target.value)
  }

  //改变文章状态并保存  暂存or发布
  const changePublish = () => {
    if (isIssue === 0) {
      setIsIssue(1)
      articleAdd(1)
    } else {
      setIsIssue(0)
      articleAdd(0)
    }
  }

  //更改文章
  const updateArticle = () => {
    let i = isIssue
    articleAdd(i)
  }

  //保存文章
  const articleAdd = (i) => {
    setIsLoading(true)
    // console.log(isUpdate, isIssue, articleTitle, articleContent, introducemd, showDate, updateDate, selectedType)
    let date = Math.round(new Date() / 1000)
    setUpdateDate(date)
    let params = {
      id: articleId,
      isIssue: i,
      articleTitle: articleTitle,
      articleContent: articleContent,
      introducemd: introducemd,
      updateDate: date,
      selectedType: selectedType
    }
    let paramsTs = Object.values(params);
    if (paramsTs.includes("") || paramsTs.includes(undefined) || paramsTs.includes(null)) {
      message.warning('还有内容没有填哦！！')
      setIsLoading(false)
    } else {
      axios({ method: "post", url: servicePath.editArticle, data: params, withCredentials: true })
        .then(res => {
          setIsLoading(false)
          if (res.data.data === '修改成功') {
            message.success(res.data.data)
            setArticleContent('')
            setIntroducemd('')
            setArticleTitle('')
            setMarkdownContent('预览内容')
            setIntroducehtml('文章简介')
            props.history.push('/index/ArticleList')
          } else {
            message.error(res.data.data)
          }
        })
    }
  }
  return (
    <div>
      <Spin tip="loading..." spinning={isLoading}>
        <Row gutter={5}>
          <Col span={18}>
            <Row gutter={10} >
              <Col span={20}>
                <Input
                  placeholder="博客标题"
                  size="large"
                  value={articleTitle}
                  onChange={changeArticleTitle}
                />
              </Col>
              <Col span={4}>
                &nbsp;
                <Select defaultValue={selectedType} value={selectedType} size="large" onChange={changeTypeInfo}>
                  {
                    typeInfo.map((item, index) => {
                      return (
                        <Option value={item.order_num} key={index}>{item.type_name}</Option>
                      )
                    })
                  }
                </Select>
              </Col>
            </Row>
            <br />
            <Row gutter={10} >
              <Col span={12}>
                <TextArea
                  value={articleContent}
                  className="markdown-content"
                  rows={35}
                  onChange={changeContent}
                  onPressEnter={changeContent}
                  placeholder="文章内容"
                />
              </Col>
              <Col span={12}>
                <div
                  className="show-html"
                  dangerouslySetInnerHTML={{ __html: markdownContent }}
                >
                </div>
              </Col>
            </Row>
          </Col>
          <Col span={6}>
            <Row>
              <Col span={24}>
                <Button type="primary" size="large" onClick={changePublish}>{isIssue === 0 ? '发布文章' : '暂存文章'}</Button>&nbsp;
                <Button type="danger" size="large" onClick={updateArticle}>修改文章</Button>
                <br />
              </Col>
              <Col span={24}>
                <br />
                <TextArea
                  rows={4}
                  value={introducemd}
                  onChange={changeIntroduce}
                  onPressEnter={changeIntroduce}
                  placeholder="文章简介"
                />
                <br /><br />
                <div
                  className="introduce-html"
                  dangerouslySetInnerHTML={{ __html: '文章简介：' + introducehtml }}
                ></div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Spin>
    </div>
  )
}

export default EditArticle;