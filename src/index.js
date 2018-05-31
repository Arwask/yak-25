import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './nav/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import registerServiceWorker from './registerServiceWorker';
import Dashboard from './dashboard/Dashboard';
import Settings from './settings/Settings';
import Profile from './profile/Profile';

ReactDOM.render(
  <Router>
    <div>
      <NavBar />
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/settings" component={Settings} />
      <Route exact path="/my-profile" component={Profile} />
      {/* <Route exact path="/settings" component={Settings} /> */}
    </div>
  </Router>,
  document.querySelector('#root')
);
registerServiceWorker();
