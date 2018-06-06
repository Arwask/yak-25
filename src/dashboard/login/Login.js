import React, { Component } from 'react';
import 'bootstrap';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="collapse loginDiv" id="login__button">
        <form onSubmit={this.props.handleSubmit}>
          <div className="form-group">
            <label>Email address</label>
            <input
              value={this.state.email}
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={this.props.handleEmailChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              value={this.props.password}
              type="password"
              className="form-control"
              id="loginPassword"
              placeholder="Password"
              onChange={this.props.handlePasswordChange}
              required
            />
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="rememberMe"
              defaultChecked={this.props.rememberMe}
              onChange={this.props.handleRememberChange}
            />
            <label className="form-check-label">Remember Me</label>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <p className="errorP">{this.props.error}</p>
        </form>
      </div>
    );
  }
}

export default Login;
