import React, { Component } from 'react';

import RegisterForm from '../register/RegisterForm';

import 'bootstrap';
import './Dashboard.css';
import Login from '../login/Login';
import Posts from '../posts/Posts';
import Search from '../search/Search';

import DisplayEvents from '../events/DisplayEvents';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      rememberMe: false,
      error: '',
      posts: []
    };
  }
  componentDidMount() {
    let userInLocalStorage = localStorage.getItem('ActiveUser');
    let userInSessionStorage = sessionStorage.getItem('ActiveUser');
    if (userInLocalStorage || userInSessionStorage) {
      this.props.setProps(true);
      this.getAllPosts();
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

  deletePostFromDb = function(id) {
    fetch(`http://localhost:8088/posts/${id}`, {
      method: 'DELETE'
    }).then(data => {
      this.getAllPosts();
    });
  };

  getAllPosts = function() {
    let allposts = [];
    let userId = +sessionStorage.getItem('ActiveUser') || +localStorage.getItem('ActiveUser');
    fetch(
      `http://localhost:8088/posts?recipientId_like=null&recipientId_like=${userId}&_expand=user&_sort=timestamp&_order=desc`
    )
      //public posts and private posts for user
      .then(r => r.json())
      .then(data => {
        data.map(d => {
          return allposts.push(d);
        });
        fetch(
          `http://localhost:8088/posts?userId=${userId}&recipientId_ne=null&_expand=user&_sort=timestamp&_order=desc`
        ) //posts by user
          .then(r => r.json())
          .then(data => {
            data.map(d => {
              return allposts.push(d);
            });
            function compare(a, b) {
              if (a.timestamp > b.timestamp) return -1;
              if (a.timestamp < b.timestamp) return 1;
              return 0;
            }
            allposts.sort(compare);
            this.setState({ posts: allposts });
          });
      });
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
        {this.props.loggedIn ? (
          <div>
            {this.props.search ? (
              <Search foundItems={this.props.foundItems} currentUser={this.props.currentUser} />
            ) : (
              <Posts
                deletePostFromDb={this.deletePostFromDb}
                currentUser={this.props.currentUser}
                posts={this.state.posts}
                getAllPosts={this.getAllPosts}
              />
            )}
            <DisplayEvents />
            <Posts deletePostFromDb={this.deletePostFromDb} posts={this.state.posts} getAllPosts={this.getAllPosts} />
          </div>
        ) : (
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-12">
                <button
                  type="button"
                  className="btn btn-primary col-lg-4 col-md-6 col-sm-12 dash__btn"
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
              <div className="col-lg-4 col-md-6 col-sm-12">
                <button
                  type="button"
                  className="btn btn-primary col-lg-4 col-md-6 col-sm-12 dash__btn"
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
