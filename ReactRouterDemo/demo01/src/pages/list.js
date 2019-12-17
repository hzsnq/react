import React, { Component } from 'react';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <h1>List</h1>
        );
    }

    componentDidMount() {
        console.log(this.props.match)
    }
}

export default List;