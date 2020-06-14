import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom'

import Login from './Login';
import Dashboard from './Dashboard';
import CreatePatient from './CreatePatient';

function App() {
  return (
    <Router>
      <Route path="/" render={props => <Redirect to="/login"/>}/>
      <Route path="/login" component={Login}/>
      <Route path="/Dashboard" component={Dashboard}/>
      <Route path="/CreatePatient" component={CreatePatient}/>
    </Router>
  );
}

export default App;
