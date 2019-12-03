import Link from 'next/link';
import { withRouter } from 'next/router';
import axios from 'axios';

const Video = ({ router, list }) => {
    return (
        <>
            <div>video page{router.query.id}<br></br>{list}</div>
            <Link href='/'><a>返回首页</a></Link>
        </>
    )
}
//easy-mock数据接口失效，暂时注释
// Video.getInitialProps = async () => {
//     const promise = new Promise((resolve) => {
//         axios.get('https://www.easy-mock.com/mock/5cfcce489dc7c36bd6da2c99/xiaojiejie/getList')
//             .then((res) => {
//                 console.log('远程数据结果：', res)
//                 resolve(res.data)
//             })
//     })
//     return await promise
// }

export default withRouter(Video);