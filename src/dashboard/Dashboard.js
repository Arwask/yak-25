import React, { Component } from 'react';

import RegisterForm from '../register/RegisterForm';

import 'bootstrap';
import './Dashboard.css';
import Login from './login/Login';

import DisplayEvents from '../events/DisplayEvents'

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }
  componentDidMount() {
    let userInLocalStorage = localStorage.getItem('userId');
    let userInSessionStorage = sessionStorage.getItem('userId');
    if (userInLocalStorage || userInSessionStorage) {
      this.setState({ loggedIn: true });
    }
  }
  loginHandler = function () {
    this.setState({ loggedIn: true });
  }.bind(this);
  render() {
    return (
      <div>
        {this.state.loggedIn ? (
          <div>
            <DisplayEvents />
          </div>
        ) : (
            <div className="container">
              <div className="row">
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <button
                    type="button"
                    className="btn btn-primary col-lg-4 col-md-6 col-sm-12 dash__btn"
                    data-toggle="collapse"
                    aria-controls="login__button"
                    data-target="#login__button"
                  >
                    Log In
                </button>
                  <Login loginHandler={this.loginHandler} />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <button
                    type="button"
                    className="btn btn-primary col-lg-6 col-md-6 col-sm-12 dash__btn"
                    data-toggle="collapse"
                    data-target="#register__button"
                  >
                    Register
                </button>
                  <RegisterForm loginHandler={this.loginHandler} />
                </div>
              </div>
            </div>
          )}
      </div>
    );
  }
}

export default Dashboard;
