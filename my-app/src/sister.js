import React, { Component, Fragment } from 'react'
import axios from 'axios'
import SisterItem from './sisterItem';
import Boss from './boss';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

class Sister extends Component {
    constructor(props) {
        super(props);
        // 不要在这里调用 this.setState()
        this.state = {
            inputValue: '敲背采耳',
            list: ['基础按摩', '精油推背']
        }
    }

    inputChange() {
        this.setState({
            inputValue: this.input.value,
        });
    }

    addList() {
        if (this.state.inputValue !== '') {
            this.setState({
                list: [...this.state.list, this.state.inputValue],
                inputValue: ''
            }, () => {
                console.log(this.ul.querySelectorAll('li').length)
            });
        }
    }

    //切记不可直接操作state，React是禁止直接操作state的
    deleteItem(index) {
        let list = this.state.list.slice();
        list.splice(index, 1);
        this.setState({
            list: list,
        });
    }
    //即将过时
    // componentWillMount() {
    //     console.log('componentWillMount将要挂载到页面的时刻')
    // }

    componentDidMount() {
        console.log('componentDidMount组件挂载完成')
        axios.post('https://web-api.juejin.im/v3/web/wbbr/bgeda')
            .then((res) => {
                console.log('axios获取数据成功' + JSON.stringify(res))
            })
            .catch((error) => {
                console.log('axios获取数据成功' + error)
            })
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('shouldComponentUpdate');
    //     return true
    // }

    //即将过时
    // componentWillUpdate() {
    //     console.log('componentWillUpdate')
    // }

    // componentDidUpdate() {
    //     console.log('componentDidUpdate')
    // }

    render() {
        // console.log('render组件挂载中')
        return (
            <Fragment>
                {/* 这里不能//写注释 */}
                <div>
                    <label htmlFor="toInput">加入服务：</label>
                    <input
                        id='toInput'
                        className='input'
                        value={this.state.inputValue}
                        onChange={() => this.inputChange()}
                        ref={(input) => { this.input = input }}
                    />
                    <button onClick={() => this.addList()}> 增加服务 </button>
                </div>
                <ul ref={(ul) => { this.ul = ul }}>
                    <TransitionGroup>
                        {
                            this.state.list.map((item, index) => {
                                return (
                                    <CSSTransition
                                        timeout={2000}
                                        classNames='show'
                                        unmountOnExit
                                        appear={true}
                                        key={index + item}
                                    >
                                        <SisterItem
                                            key={index + item}
                                            content={item}
                                            index={index}
                                            deleteItem={this.deleteItem.bind(this)}
                                        />
                                    </CSSTransition>
                                );
                            })
                        }
                    </TransitionGroup>
                </ul>
                <Boss />
            </Fragment >
        );
    }
}

export default Sister