import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Row, Col, List, Icon, Breadcrumb } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author';
import Advert from '../components/Advert';
import Footer from '../components/Footer';

import '../static/style/pages/list.css';

import axios from 'axios'
import servicePath from '../config/apiUrl'

import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';

const MyList = (props) => {
    const [myList, setMyList] = useState(props.data)

    useEffect(() => {
        setMyList(props.data)
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
                <title>{myList[0].type_name}</title>
            </Head>
            <Header></Header>
            <Row className='comm-main' type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
                    <div>
                        <div className="bread-div">
                            <Breadcrumb>
                                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                                <Breadcrumb.Item>{myList[0].type_name}</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>

                        <List
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

MyList.getInitialProps = async (context) => {
    let id = context.query.id
    const promise = new Promise((resolve) => {
        axios(servicePath.getArticleListByTypeId + id)
            .then((res) => {
                resolve(res.data)
            })
    })
    return promise
}

export default MyList
