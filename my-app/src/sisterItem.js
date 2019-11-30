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

    render() {
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