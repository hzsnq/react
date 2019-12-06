import React from 'react';
import ReactDOM from 'react-dom';
import Main from './pages/main';
import store from './store';
import { Provider } from 'react-redux'

const App = (
  <Provider store={store}>
    <Main></Main>
  </Provider>
)

ReactDOM.render(App, document.getElementById('root'));
