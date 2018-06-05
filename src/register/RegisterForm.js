import React, { Component } from 'react';

import BootstrapInput from './BootstrapInput';

import './Register.css';

export default class RegisterForm extends Component {
  constructor(props) {
    super(props);

    // Define initial state
    this.state = {
      firstName: '',
      lastName: '',
      emailAddress: '',
      password: '',
      location: ''
    };
  }

  // Handler for changing state when user types into input field
  handleSubmit = function(evt) {
    evt.preventDefault();

    const newUserInfo = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      password: this.state.password,
      emailAddress: this.state.emailAddress,
      location: this.state.location
    };

    this.setState({
      firstName: '',
      lastName: '',
      emailAddress: '',
      password: '',
      location: ''
    });

    fetch('http://localhost:8088/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUserInfo)
    })
      .then(r => r.json())
      .then(newContact =>
        sessionStorage.setItem(
          'ActiveUser',
          JSON.stringify({
            id: newContact.id,
            firstName: newContact.firstName,
            lastName: newContact.lastName,
            email: newContact.emailAddress,
            password: newContact.password,
            location: newContact.location
          })
        ),
        this.props.loginHandler()
      );
  }.bind(this);

  // Handler for changing state when user types into input field
  handleFormFieldChange = function(evt) {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  }.bind(this);

  render() {
    return (
      <div id="register__button" className="collapse">
        <form onSubmit={this.handleSubmit}>
          <BootstrapInput
            val={this.state.firstName}
            id="firstName"
            handler={this.handleFormFieldChange}
            placeholder="First Name"
          />
          <BootstrapInput
            val={this.state.lastName}
            id="lastName"
            handler={this.handleFormFieldChange}
            placeholder="Last Name"
          />
          <BootstrapInput
            val={this.state.emailAddress}
            id="emailAddress"
            handler={this.handleFormFieldChange}
            placeholder="Email"
          />
          <BootstrapInput
            val={this.state.password}
            id="password"
            handler={this.handleFormFieldChange}
            placeholder="Password"
          />
          <BootstrapInput
            val={this.state.location}
            id="location"
            handler={this.handleFormFieldChange}
            placeholder="Current Location (City, Country)"
          />

          <button className="btn btn-warning">Submit</button>
        </form>
      </div>
    );
  }
}
