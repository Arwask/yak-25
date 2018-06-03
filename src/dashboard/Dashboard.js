import React, { Component } from 'react';
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
  userInLocalStorage = localStorage.getItem('userId');
  // if(userInLocalStorage) {
  //   console.log(userInLocalStorage);
  //   this.setState({ loggedIn: true });
  // }
  render() {
    return (
      <div>
        {this.state.loggedIn ? <div>This is Dashboard Component after logged in</div> : <Login />}
        <div />
        <div>
          <button type="button" className="btn btn-primary">
            Register
          </button>
        </div>
      </div>
    );
  }
}

export default Dashboard;
