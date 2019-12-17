import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SisterItem extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.deleteItem(this.props.index)
    }
    //请注意，返回 false 并不会阻止子组件在 state 更改时重新渲染。
    //当返回 false 时，仍可能导致组件重新渲染。
    //考虑使用内置的 PureComponent 组件，二者不可共存,还没研究明白
    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log(nextProps.content, this.props.content)
    //     if (nextProps.content !== this.props.content) {
    //         return true
    //     } else {
    //         console.log('false')
    //         return false
    //     }
    // }

    //组件第一次存在与dom中，函数是不会被执行
    //如果存在与dom中，函数才会执行
    //即将过时
    // componentWillReceiveProps() {
    //     console.log('child-componentWillReceiveProps')
    // }

    // componentWillUnmount() {
    //     console.log('child-componentWillUnmount')
    // }

    render() {
        console.log('child-render')
        return (
            <li onClick={this.handleClick}>
                {this.props.avname}
                为你服务-
                {this.props.content}
            </li>
        );
    }
}

SisterItem.propTypes = {
    avname: PropTypes.string.isRequired,
    content: PropTypes.string,
    deleteItem: PropTypes.func,
    index: PropTypes.number,
}

SisterItem.defaultProps = {
    avname: '鑫哥'
}

export default SisterItem;