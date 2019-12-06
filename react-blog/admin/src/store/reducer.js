import { GET_ARTICLE_BY_ID, GET_ARTICLE_LIST, ADD_ARTICLE } from './actionTypes';
const defaultState = {
  list: [{ name: '1111', age: '2222222222' }]
}

export default (state = defaultState, action) => {
  return state
}