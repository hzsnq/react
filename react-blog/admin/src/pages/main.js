import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './login';
import AdminIndex from './AdminIndex'

function Main() {
  return (
    <Router>
      <Route path='/' exact component={Login} ></Route>
      <Route path='/login' exact component={Login} ></Route>
      <Route path='/index/' component={AdminIndex} ></Route>
    </Router>
  )
}

export default Main;