import { Avatar, Divider, Tooltip } from 'antd'
import '../static/style/components/author.css'

const Author = () => {
    return (
        <div className='author-div'>
            <div><Avatar size={100} src="http://file.qqtouxiang.com/gexing/2019-10-21/smalla6ad558b6ad8ca299b872bd72f103cf01571643427.jpg"></Avatar></div>
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