import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap';
import './Dashboard.css';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <div>This is Dashboard Component</div>
        <div>
          <button type="button" className="btn btn-primary">Register Account</button>
        </div>
        <div>
          <button type="button" className="btn btn-primary">Log In</button>
        </div>
      </div>
    );
  }
}

export default Dashboard;
