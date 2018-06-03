import React, { Component } from 'react';
import 'bootstrap';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      rememberMe: false,
      error: ''
    };
  }
  handleSubmit = function(e) {
    e.preventDefault();
    console.log('Submit called');
    fetch(`http://localhost:8088/users?email=${this.state.email}&password=${this.state.password}`)
      .then(r => r.json())
      .then(data => {
        console.log(data);
        if (data.length > 0) {
          if (this.state.rememberMe === true) {
            localStorage.setItem('userId', `${data[0].id}`);
          } else sessionStorage.setItem('userId', `${data[0].id}`);
        } else {
          this.setState({ error: 'User Not Found' });
        }
      });
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
  render() {
    return (
      <div className="loginDiv">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Email address</label>
            <input
              value={this.state.email}
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={this.handleEmailChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              value={this.state.password}
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              onChange={this.handlePasswordChange}
              required
            />
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="rememberMe"
              defaultChecked={this.state.rememberMe}
              onChange={this.handleRememberChange}
            />
            <label className="form-check-label">Remember Me</label>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <p className="errorP">{this.state.error}</p>
        </form>
      </div>
    );
  }
}

export default Login;
