import React, { Component } from 'react';
import TodoListUI from './todoListUI'
import store from './store';
import { changeInputAction, addItemAction, deleteItemAction, getMyListAction } from './store/actionCreators';

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
        const action = getMyListAction()
        store.dispatch(action)
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