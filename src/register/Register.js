import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Register extends Component {
  render() {
    return (
      <article className="card">
        <div className="card-body">
          <h5 className="card-title">
            {this.props.firstName} {this.props.lastName}
          </h5>
          <h6 className="card-subtitle mb-2 text-muted">{this.props.emailAddress}</h6>
          <p className="card-subtitle mb-2 text-muted">{this.props.password}</p>
          <p className="card-text">{this.props.location}</p>
        </div>
      </article>
    );
  }
}
