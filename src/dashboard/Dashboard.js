import React, { Component } from 'react';

import RegisterForm from '../register/RegisterForm';

import 'bootstrap';
import './Dashboard.css';
import Login from './login/Login';
import Posts from '../posts/Posts';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      rememberMe: false,
      error: ''
    };
  }
  componentDidMount() {
    console.log(this.props);
    let userInLocalStorage = localStorage.getItem('ActiveUser');
    let userInSessionStorage = sessionStorage.getItem('ActiveUser');
    if (userInLocalStorage || userInSessionStorage) {
      this.props.setProps(true);
    }
  }
  loginHandler = function() {
    this.props.setProps(true);
  }.bind(this);

  handleEmailChange = function(e) {
    this.setState({ email: e.target.value });
  }.bind(this);

  handlePasswordChange = function(e) {
    this.setState({ password: e.target.value });
  }.bind(this);

  handleRememberChange = function(e) {
    this.setState({ rememberMe: e.target.checked });
  }.bind(this);

  handleSubmit = function(e) {
    e.preventDefault();
    console.log('Submit called');
    fetch(`http://localhost:8088/users?email=${this.state.email}&password=${this.state.password}`)
      .then(r => r.json())
      .then(data => {
        console.log(data);
        if (data.length > 0) {
          if (this.state.rememberMe === true) {
            localStorage.setItem('ActiveUser', `${data[0].id}`);
          } else sessionStorage.setItem('ActiveUser', `${data[0].id}`);
          this.loginHandler();
        } else {
          this.setState({ error: 'User Not Found' });
        }
      });
  }.bind(this);

  render() {
    return (
      <div>
        <h1>Welcome to Yak!</h1>
        {this.props.loggedIn ? (
          <div>
            <Posts />
          </div>
        ) : (
          <div className="container">
            <div className="row">
              <div className="col-6">
                <button
                  type="button"
                  className="btn btn-primary col-6"
                  data-toggle="collapse"
                  aria-controls="login__button"
                  data-target="#login__button"
                >
                  Log In
                </button>
                <Login
                  handleSubmit={this.handleSubmit}
                  handleEmailChange={this.handleEmailChange}
                  handlePasswordChange={this.handlePasswordChange}
                  handleRememberChange={this.handleRememberChange}
                  email={this.state.email}
                  password={this.state.password}
                  rememberMe={this.state.rememberMe}
                />
              </div>
              <div className="col-6">
                <button
                  type="button"
                  className="btn btn-primary col-6"
                  data-toggle="collapse"
                  data-target="#register__button"
                >
                  Register New Account
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
