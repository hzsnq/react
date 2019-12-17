import { CHANGE_INPUT, ADD_ITEM, DELETE_ITEM, GET_LIST, GET_MY_LIST } from './actionTypes';
import axios from 'axios';

export const changeInputAction = (value) => ({
    type: CHANGE_INPUT,
    value
})

export const addItemAction = () => ({
    type: ADD_ITEM
})

export const deleteItemAction = (index) => ({
    type: DELETE_ITEM,
    index
})

export const getListAction = (data) => ({
    type: GET_LIST,
    data
})

//thunk
// export const getTodoList = () => {
//     return (dispatch) => {
//         axios.get('https://www.easy-mock.com/mock/5c230af6d56bda78877cc99e/example/getList')
//             .then((res) => {
//                 console.log(res.data)
//                 const data = res.data;
//                 const action = getListAction(data)
//                 dispatch(action)
//             })
//     }
// }

export const getMyListAction = () => ({
    type: GET_MY_LIST
})