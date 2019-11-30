import React, { Component, Fragment } from 'react'
import axios from 'axios'
import SisterItem from './sisterItem';
class Sister extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputValue: 'jspang',
            list: ['基础按摩', '精油推背']
        }
    }

    inputChange() {
        this.setState({
            inputValue: this.input.value,
        });
    }

    addList() {
        this.setState({
            list: [...this.state.list, this.state.inputValue],
            inputValue: ''
        }, () => {
            console.log(this.ul.querySelectorAll('li').length)
        });
    }

    //切记不可直接操作state，React是禁止直接操作state的
    deleteItem(index) {
        let list = this.state.list;
        list.splice(index, 1);
        this.setState({
            list: list,
        });
    }

    componentDidMount() {
        axios.post('https://web-api.juejin.im/v3/web/wbbr/bgeda')
            .then((res) => {
                console.log('axios获取数据成功' + JSON.stringify(res))
            })
            .catch((error) => {
                console.log('axios获取数据成功' + error)
            })
    }

    render() {
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
                    {
                        this.state.list.map((item, index) => {
                            return (
                                <SisterItem
                                    key={index + item}
                                    content={item}
                                    index={index}
                                    deleteItem={this.deleteItem.bind(this)}
                                />
                            );
                        })
                    }
                </ul>
            </Fragment >
        );
    }
}

export default Sister