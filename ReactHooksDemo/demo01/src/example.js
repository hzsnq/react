import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function Index() {

    useEffect(() => {
        console.log(`useEffect=>老弟，你来了！Index页面`)
        return () => {
            console.log(`useEffect=>老弟，你走了！Index页面`)
        }
    }, [])

    return <h2>JSPang.com</h2>;
}

function List() {

    useEffect(() => {
        console.log(`useEffect=>老弟，你来了！List页面`)
        return () => {
            console.log(`useEffect=>老弟，你走了！List页面`)
        }
    }, [])

    return <h2>List-Page</h2>;
}

function Example() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log(`useEffect=>You clicked ${count} times`)

        return () => {
            console.log(`==============================`)
        }
    }, [count])

    return (
        <div>
            <p>You Click {count} times</p>
            <button onClick={() => { setCount(count + 1) }}>Click me</button>

            <Router>
                <ul>
                    <li> <Link to="/">首页</Link> </li>
                    <li><Link to="/list/">列表</Link> </li>
                </ul>
                <Route path="/" exact component={Index} />
                <Route path="/list/" component={List} />
            </Router>
        </div>
    );
}

//不使用Hooks
// class Example extends Component {
//     constructor(props) {
//         super(props);
//         this.state = { count: 0 }
//     }
//     render() {
//         return (
//             <div>
//                 <p>You Click {this.state.count} times</p>
//                 <button onClick={this.addCount.bind(this)}>Click me</button>
//             </div>
//         );
//     }

//     addCount() {
//         this.setState({
//             count: this.state.count + 1
//         })
//     }
// }

export default Example;