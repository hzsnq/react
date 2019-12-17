import Link from 'next/link';
import { withRouter } from 'next/router';

const Game = ({ router }) => {
    return (
        <>
            <div> game page{router.query.id}{router.query.name}</div>
            <Link href='/'><a>返回首页</a></Link>
        </>
    )
}

export default withRouter(Game);