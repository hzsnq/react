import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

class Index extends Component {
    constructor(props) {
        super(props);
        //编程式重定向
        this.props.history.push("/home/")
        this.state = {
            list: [
                { uid: 123, title: '博客-1' },
                { uid: 456, title: '博客-2' },
                { uid: 789, title: '博客-3' }
            ]
        }
    }
    render() {
        return (
            <ul>
                {/* 标签式重定向 */}
                {/* <Redirect to="/home/" /> */}
                {
                    this.state.list.map((item, index) => {
                        return (
                            <li key={index}>
                                <Link to={'/list/' + item.uid}>{item.title}</Link>
                            </li>
                        );
                    })
                }
            </ul>
        );
    }
}

export default Index;