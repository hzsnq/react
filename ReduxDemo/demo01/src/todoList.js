import React, { Component } from 'react';
import TodoListUI from './todoListUI'
import store from './store';
import { changeInputAction, addItemAction, deleteItemAction, getListAction } from './store/actionCreators';

import axios from 'axios';

class TodoList extends Component {

    constructor(props) {
        super(props)
        console.log(store.getState())
        this.state = store.getState()
        this.deleteItem = this.deleteItem.bind(this)
        this.storeChange = this.storeChange.bind(this)
        store.subscribe(this.storeChange)
    }

    componentDidMount() {
        axios.get('https://www.easy-mock.com/mock/5c230af6d56bda78877cc99e/example/getList').then((res) => {
            console.log(res.data)
            const data = res.data;
            const action = getListAction(data)
            store.dispatch(action)
        })
    }

    render() {
        return (
            <TodoListUI
                inputValue={this.state.inputValue}
                list={this.state.list}
                changeInputValue={(e) => { this.changeInputValue(e) }}
                addItem={() => { this.addItem() }}
                deleteItem={this.deleteItem}
            />
        );
    }

    changeInputValue(e) {
        const action = changeInputAction(e.target.value)
        store.dispatch(action)
    }

    storeChange() {
        this.setState(store.getState())
    }

    addItem() {
        const action = addItemAction()
        store.dispatch(action)
    }

    deleteItem(index) {
        console.log(index)
        const action = deleteItemAction(index)
        store.dispatch(action)
    }
}

export default TodoList;