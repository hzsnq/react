import React, { Component } from 'react';

import { CSSTransition } from 'react-transition-group';

class Boss extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: true
        }
    }
    render() {
        return (
            <div>
                <CSSTransition
                    in={this.state.isShow}
                    timeout={2000}
                    classNames='show'
                    unmountOnExit
                >
                    <div>Boss-孙悟空</div>
                </CSSTransition>
                <div><button onClick={() => this.toToggle()}>{this.state.isShow ? '隐藏' : '召唤'}</button></div>
            </div>
        );
    }

    toToggle() {
        let isShow = this.state.isShow;
        this.setState({
            isShow: !isShow
        })
    }
}

export default Boss;