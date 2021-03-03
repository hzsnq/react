import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Row, Col, List, Icon, Breadcrumb, Pagination, Spin } from 'antd'
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
    const [isLoading, setIsLoading] = useState(false)//加载状态
    const [myList, setMyList] = useState(props.data)
    const [total, setTotal] = useState(props.total[0].total)
    useEffect(() => {
        setMyList(props.data)
        setTotal(props.total[0].total)
    }, [props.data])

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
    const onChange = (pageNumber) => {
        setIsLoading(true)
        let params = {
            pageNum: (pageNumber - 1) * 10,
            id: myList[0].type_id
        }
        axios({ method: "post", url: servicePath.getArticleListByTypeId, data: params })
            .then((res) => {
                setMyList(res.data.data)
                setTotal(res.data.total[0].total)
                window.scrollTo(0, 0);
                setIsLoading(false)
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <>
            <Head>
                <title>{myList.length === 0 ? '' : myList[0].type_name}</title>
            </Head>
            <Header></Header>
            <Row className='comm-main' type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
                    <div>
                        <div className="bread-div">
                            <Breadcrumb>
                                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                                <Breadcrumb.Item>{myList.length === 0 ? '' : myList[0].type_name}</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <Spin tip="loading..." spinning={isLoading}>
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
                            <div className='pagination'>
                                <Pagination showQuickJumper defaultCurrent={1} total={total} onChange={onChange} />
                            </div>
                        </Spin>
                    </div>
                </Col>
                <Col className="comm-box" xs={0} sm={0} md={7} lg={5} xl={4}>
                    <Author></Author>
                </Col>
            </Row>
            <Footer></Footer>
        </>
    )
}

MyList.getInitialProps = async (context) => {
    let params = {
        pageNum: 0,
        id: context.query.id
    }
    const promise = new Promise((resolve) => {
        axios({ method: "post", url: servicePath.getArticleListByTypeId, data: params })
            .then((res) => {
                resolve(res.data)
            })
    })
    return promise
}

export default MyList
