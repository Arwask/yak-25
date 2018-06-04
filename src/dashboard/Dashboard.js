import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import RegisterForm from '../register/RegisterForm';

import 'bootstrap';
import './Dashboard.css';
import Login from './login/Login';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }
  componentDidMount() {
    let userInLocalStorage = localStorage.getItem('userId');
    if (userInLocalStorage) {
      this.setState({ loggedIn: true });
    }
  }
  loginHandler = function() {
    this.setState({ loggedIn: true });
  }.bind(this);
  render() {
    return (
      <div>
        <h1>Welcome to Yak!</h1>
        {this.state.loggedIn ? (
          <div>Dashboard after logging in</div>
        ) : (
          <div className="container">
            <div className="row">
              <div className="col-6">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-toggle="collapse"
                  aria-controls="login__button"
                  data-target="#login__button"
                >
                  Log In
                </button>
                <Login loginHandler={this.loginHandler} />
              </div>
              <div className="col-6">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-toggle="collapse"
                  aria-controls="register__button"
                  data-target="#register__button"
                >
                  <RegisterForm />
                  Register New Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Dashboard;
