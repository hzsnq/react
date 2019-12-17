import { Avatar, Divider, Tooltip } from 'antd'
import '../static/style/components/author.css'

const Author = () => {
    return (
        <div className='author-div'>
            <div><Avatar size={100} src="http://img2.woyaogexing.com/2019/12/03/bce5fb78a0664bc6a5703ec01e9ab69c!400x400.jpeg"></Avatar></div>
            <div className="author-introduction">
                专注于WEB和移动前端开发
                <Divider>社交账号</Divider>
                <Tooltip placement="top" title='https://github.com/hzsnq'>
                    <Avatar size={28} icon="github" className="account" />
                </Tooltip>
                <Tooltip placement="top" title='993499240'>
                    <Avatar size={28} icon="qq" className="account" />
                </Tooltip>
                <Tooltip placement="top" title='Hzsnq_Tao'>
                    <Avatar size={28} icon="wechat" className="account" />
                </Tooltip>
            </div>
        </div>
    )
}

export default Author