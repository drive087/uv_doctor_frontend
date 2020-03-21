import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom'

import Login from './Login';
import DashBoard from './Dashboard';

function App() {
  return (
    <Router>
      <Route path="/" render={props => <Redirect to="/login"/>}/>
      <Route path="/login" component={Login}/>
      <Route path="/dash" component={DashBoard}/>
    </Router>
  );
}

export default App;
