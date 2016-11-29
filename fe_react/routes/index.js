import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from '../App';
import Signin from '../components/Signin';
import { NotFound } from '../components/NotFound';
import Home from '../components/Home';
import { ForgotPassword } from '../components/ForgotPassword';

export default function() {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="/sign-in" component={Signin}/>
        <Route path="/forgot-password" component={ForgotPassword}/>
        <Route path="/**" component={NotFound}/>
      </Route>
    </Router>
  )
}