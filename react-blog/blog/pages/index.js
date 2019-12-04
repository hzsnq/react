import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Row, Col, List, Icon } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author';
import Advert from '../components/Advert';
import Footer from '../components/Footer';
import '../static/style/pages/index.css';
import axios from 'axios'
import servicePath from '../config/apiUrl'

import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';

const Home = (list) => {
  const [myList, setMyList] = useState(list.data)

  useEffect(() => {
    setMyList(list.data)
  })

  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    sanitize: false,
    xhtml: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  });

  return (
    <>
      <Head>
        <title>博客首页</title>
      </Head>
      <Header></Header>
      <Row className='comm-main' type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div>
            <List
              header={<div>最新日志</div>}
              itemLayout="vertical"
              dataSource={myList}
              renderItem={item => (
                <List.Item>
                  <div className="list-title"><Link href={{ pathname: '/detailed', query: { id: item.id } }}><a>{item.title}</a></Link></div>
                  <div className="list-icon">
                    <span><Icon type="calendar" ></Icon>{item.add_time}</span>
                    <span><Icon type="folder" ></Icon>{item.type_name}</span>
                    <span><Icon type="fire" ></Icon>{item.view_count}人</span>
                  </div>
                  <div className="list-context"
                    dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}
                  ></div>
                </List.Item>
              )}
            >
            </List>
          </div>
        </Col>
        <Col className="comm-box" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author></Author>
          <Advert></Advert>
        </Col>
      </Row>
      <Footer></Footer>
    </>
  )
}

Home.getInitialProps = async () => {
  const promise = new Promise((resolve) => {
    axios(servicePath.getArticleList)
      .then((res) => {
        resolve(res.data)
      })
  })
  return promise
}

export default Home
