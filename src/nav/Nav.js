import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './Nav.css';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      searchRoute: '/'
    };
  }

  componentDidMount() {
    let userInLocalStorage = localStorage.getItem('ActiveUser');
    let userInSessionStorage = sessionStorage.getItem('ActiveUser');
    if (userInLocalStorage || userInSessionStorage) {
      this.props.setProps(true);
    }
  }

  search = function(e) {
    if (e.charCode === 13) {
      this.props.searchHandler(this.state.searchTerm);
      this.setState({
        searchTerm: ''
      });
    }
  }.bind(this);

  handleFieldChange = function(e) {
    this.setState({ searchTerm: e.target.value });
  }.bind(this);

  logMeOut = function() {
    this.props.logOut();
    this.props.setProps(false);
  }.bind(this);

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-secondary navbar-fixed-top">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse
           navbar-collapse"
            id="navbarNavDropdown"
          >
            {this.props.loggedIn ? (
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    <button>Logo</button>
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link className="nav-link" to="/my-profile">
                    My Profile
                  </Link>
                </li>
                <li className="nav-item ">
                  <form className="form-inline my-2 my-lg-0">
                    <input
                      className="form-control mr-sm-4"
                      type="search"
                      placeholder="Search friends, posts, etc.."
                      aria-label="Search"
                      onKeyPress={this.search}
                      onChange={this.handleFieldChange}
                      value={this.state.searchTerm}
                    />
                  </form>
                </li>
                <li>
                  <Link className="nav-link" to="/settings">
                    Settings
                  </Link>
                </li>
                <li>
                  <button type="button" className="btn btn-primary" onClick={this.logMeOut}>
                    Logout
                  </button>
                </li>
                <li />
              </ul>
            ) : (
              <ul className="nav-bar nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Logo
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </nav>
      </div>
    );
  }
}

export default Nav;
