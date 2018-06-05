import React, { Component } from 'react';
import './index.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './nav/Nav';
import 'bootstrap';
import Dashboard from './dashboard/Dashboard';
import Settings from './settings/Settings';
import Profile from './profile/Profile';

class App extends Component {
  state = {
    loggedIn: false
  };

  logOut = function() {
    if (sessionStorage.getItem('userId')) sessionStorage.removeItem('userId');
    if (localStorage.getItem('userId')) localStorage.removeItem('userId');
  }.bind(this);

  setProps = function(x) {
    this.setState({ loggedIn: x });
  }.bind(this);

  render() {
    return (
      <Router>
        <div className="dashboard__body">
          <NavBar logOut={this.logOut} loggedIn={this.state.loggedIn} setProps={this.setProps} />
          <Route
            exact
            path="/"
            render={props => <Dashboard loggedIn={this.state.loggedIn} setProps={this.setProps} />}
          />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/my-profile" component={Profile} />
          {/* <Route exact path="/settings" component={Settings} /> */}
        </div>
      </Router>
    );
  }
}

export default App;
