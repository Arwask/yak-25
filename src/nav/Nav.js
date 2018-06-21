import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './Nav.css';
import yak from '../images/logo.jpg';

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
      e.preventDefault();

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
        <nav className="navbar navbar-expand-lg navbar-dark bg-secondary navbar-fixed-top nav-pills nav-justified">
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
                    <p className="logoText">YAK</p>
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link className="nav-link" to="/my-profile">
                    <span className="iconSpan">
                      <i class="fas fa-user-circle" />
                    </span>
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
                <li className="nav-item">
                  <Link className="nav-link" to="/settings">
                    <span className="iconSpan">
                      <i className="fas fa-cogs" />
                    </span>
                  </Link>
                </li>
                <li className="nav-item">
                  <span className="icon-span nav-link" onClick={this.logMeOut}>
                    <i className="fas fa-sign-out-alt" />
                  </span>
                </li>
                <li />
              </ul>
            ) : (
              <ul className="nav-bar nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    YAK
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
