import React, { useState, useEffect, createContext } from 'react';
import 'antd/dist/antd.css';
import { Card, Input, Icon, Button, Spin, message } from 'antd';
import '../static/css/login.css'

import axios from 'axios'
import servicePath from '../config/apiUrl'

const openIdContext = createContext()

function Login(props) {

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    let item = localStorage.getItem('openId')
    if (item) {
      props.history.push('/index')
    } else {
      props.history.push('/login')
    }
    // console.log(openIdContext)
  }, [props.history])

  const checkLogin = () => {
    console.log(111)
    setIsLoading(true)

    if (!userName) {
      message.error('用户名不能为空')
      setIsLoading(false)
      return false
    } else if (!password) {
      message.error('密码不能为空')
      setIsLoading(false)
      return false
    }

    let dataProps = {
      'userName': userName,
      'password': password
    }

    axios({ method: "post", url: servicePath.checkLogin, data: dataProps, withCredentials: true })
      .then(res => {
        setIsLoading(false)
        if (res.data.data === '登录成功') {
          localStorage.setItem('openId', res.data.openId)
          let userInfo = JSON.parse(res.data.userInfo[0])
          localStorage.setItem('userInfo', userInfo)
          props.history.push('/index')
        } else {
          message.error('用户名密码错误')
        }
      })

    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="login-div">
      <Spin tip="loading..." spinning={isLoading}>
        <Card title="hzsnq Blog System" bordered={true} style={{ width: 400 }} headStyle={{ textAlign: "center" }}>
          <Input
            id="userName"
            size="large"
            placeholder="Enter your userName"
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}></Icon>}
            onChange={(e) => { setUserName(e.target.value) }}
          ></Input>
          <br></br><br></br>
          <Input.Password
            id="password"
            size="large"
            placeholder="Enter your password"
            prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }}></Icon>}
            onChange={(e) => { setPassword(e.target.value) }}
          ></Input.Password>
          <br></br><br></br>
          <Button type="primary" size="large" block onClick={checkLogin} >Login in</Button>
        </Card>
      </Spin>
    </div>
  )
}
export default Login