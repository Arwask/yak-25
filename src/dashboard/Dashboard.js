import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import RegisterForm from '../register/RegisterForm';

import 'bootstrap';
import './Dashboard.css';

class Dashboard extends Component {

  render() {
    return (
      <div >
        <h1>Welcome to Yak!</h1>
        <div className="container">
          <div className="row">
            <div className=".col-6 .col-sm-4">
              <button type="button" className="btn btn-primary">Log In</button>
            </div>
            <div className=".col-6 .col-sm-4">
              <button type="button" className="btn btn-primary" data-toggle="collapse" data-target="#register__button">Register New Account</button>
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
