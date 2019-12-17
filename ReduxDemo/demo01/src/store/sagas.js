import { takeEvery, put } from 'redux-saga/effects'
import { GET_MY_LIST } from './actionTypes'
import { getListAction } from './actionCreators'
import axios from 'axios';
//generator函数
function* mySaga() {
    //等待捕获action
    yield takeEvery(GET_MY_LIST, getList)
}

function* getList() {
    const res = yield axios.get('https://www.easy-mock.com/mock/5c230af6d56bda78877cc99e/example/getList')

    const action = getListAction(res.data)

    yield put(action)
}

export default mySaga;