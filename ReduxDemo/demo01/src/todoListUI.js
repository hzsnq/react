import React from 'react';
import 'antd/dist/antd.css';
import { Input, Button, List } from 'antd';
//无状态组件
const TodoListUI = (props) => {
    return (
        <div>
            <div style={{ margin: '10px' }}>
                <Input
                    placeholder='Write Something'
                    style={{ width: '250px', marginRight: '10px' }}
                    onChange={props.changeInputValue}
                    value={props.inputValue}
                />
                <Button
                    type='primary'
                    onClick={props.addItem}
                >增加</Button>
            </div>
            <div style={{ margin: '10px', width: '300px' }}>
                <List
                    bordered
                    dataSource={props.list}
                    renderItem={(item, index) => (<List.Item onClick={() => { props.deleteItem(index) }}>{item}</List.Item>)}
                ></List>
            </div>
        </div>
    );
}

export default TodoListUI;