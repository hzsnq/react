import MyHeader from '../components/myHeader';
// import '../static/test.css' 测试配置next引用css是否成功
// import { Button } from 'antd'

function Header() {
    return (
        <>
            <MyHeader></MyHeader>
            <div>hzsnq</div>
            <div><button>我是按钮</button></div>
        </>
    )
}

export default Header;