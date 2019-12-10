import React, { useState, useEffect } from 'react';
import marked from 'marked'
import '../static/css/AddArticle.css'
import { Row, Col, Input, Select, Button, DatePicker, message, Spin } from 'antd'
import { useSelector } from 'react-redux'
import axios from 'axios'
import servicePath from '../config/apiUrl'

const { Option } = Select;
const { TextArea } = Input

function AddArticle(props) {

  // const type = useSelector((state) => ({ list: state.list }))
  const [isLoading, setIsLoading] = useState(false)
  const [isUpdate, setIsUpdate] = useState(0)  // 文章的更新状态，如果是0说明是新增加，如果不是0，说明是修改
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
  }, [])

  const changeContent = (e) => {
    setArticleContent(e.target.value)
    let html = marked(e.target.value)
    setMarkdownContent(html)
  }

  const changeIntroduce = (e) => {
    setIntroducemd(e.target.value)
    let html = marked(e.target.value)
    setIntroducehtml(html)
  }

  const changeTypeInfo = (e) => {
    setSelectType(e)
  }

  const changeArticleTitle = (e) => {
    setArticleTitle(e.target.value)
  }

  const changeShowDate = (value, dateString) => {
    let date = Math.round(new Date(dateString) / 1000)
    setShowDate(date)
  }

  const articleStaging = () => {
    setIsIssue(0)
    articleAdd(0)
  }

  const articlePublish = () => {
    setIsIssue(1)
    articleAdd(1)
  }

  const articleAdd = (i) => {
    setIsLoading(true)
    // console.log(isUpdate, isIssue, articleTitle, articleContent, introducemd, showDate, updateDate, selectedType)
    let date = Math.round(new Date() / 1000)
    setUpdateDate(date)
    let params = {
      isUpdate: 0,
      isIssue: i,
      articleTitle: articleTitle,
      articleContent: articleContent,
      introducemd: introducemd,
      showDate: showDate,
      updateDate: showDate,
      selectedType: selectedType
    }
    // console.log(params)
    let paramsTs = Object.values(params);
    if (paramsTs.includes("") || paramsTs.includes(undefined) || paramsTs.includes(null)) {
      message.warning('还有内容没有填哦！！')
      setIsLoading(false)
    } else {
      axios({ method: "post", url: servicePath.addArticle, data: params, withCredentials: true })
        .then(res => {
          // console.log(res)
          setIsLoading(false)
          if (res.data.data === '添加成功') {
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
                <Select defaultValue={selectedType} size="large" onChange={changeTypeInfo}>
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
                  placeholder="文章内容"
                  onChange={changeContent}
                  onPressEnter={changeContent}
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
                <Button size="large" onClick={articleStaging}>暂存文章</Button>&nbsp;
              <Button type="primary" size="large" onClick={articlePublish}>发布文章</Button>
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
              <Col span={12}>
                <div className="date-select">
                  <DatePicker
                    placeholder="发布日期"
                    format="YYYY-MM-DD HH:mm:ss"
                    size="large"
                    onChange={changeShowDate}
                  />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Spin>
    </div>
  )
}

export default AddArticle;