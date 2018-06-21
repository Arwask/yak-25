import React, { Component } from 'react';
import './index.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './nav/Nav';
import 'bootstrap';
import Dashboard from './dashboard/Dashboard';
import Settings from './settings/Settings';
import Profile from './profile/Profile';
import Search from './search/Search';

class App extends Component {
  state = {
    loggedIn: false,
    searchTerms: '',
    foundItems: [],
    search: false,
    currentUser: null
  };

  componentDidMount() {
    let id = +sessionStorage.getItem('ActiveUser') || +localStorage.getItem('ActiveUser');
    this.setState({ currentUser: id });
  }

  logOut = function() {
    if (sessionStorage.getItem('ActiveUser')) sessionStorage.removeItem('ActiveUser');
    if (localStorage.getItem('ActiveUser')) localStorage.removeItem('ActiveUser');
  };

  setProps = function(x) {
    this.setState({ loggedIn: x });
  }.bind(this);

  searchHandler = function(terms) {
    this.setState({
      searchTerms: terms
    });
    const futureFoundItems = {};
    console.log(terms);
    fetch(`http://localhost:8088/posts?text_like=${encodeURI(terms)}&_expand=user`)
      .then(r => r.json())
      .then(posts => {
        futureFoundItems.posts = posts;
        fetch(`http://localhost:8088/users?q=${encodeURI(terms)}`)
          .then(r => r.json())
          .then(users => {
            futureFoundItems.users = users;
            this.setState({
              foundItems: futureFoundItems,
              search: true
            });
            console.log(futureFoundItems);
          });
      });
  }.bind(this);

  render() {
    return (
      <Router>
        <div className="dashboard__body">
          <NavBar
            logOut={this.logOut}
            loggedIn={this.state.loggedIn}
            setProps={this.setProps}
            searchHandler={this.searchHandler}
            currentUser={this.state.currentUser}
          />
          <Route
            exact
            path="/"
            render={props => (
              <Dashboard
                loggedIn={this.state.loggedIn}
                setProps={this.setProps}
                foundItems={this.state.foundItems}
                search={this.state.search}
                currentUser={this.state.currentUser}
              />
            )}
          />
          <Route
            exact
            path="/search"
            render={props => <Search loggedIn={this.state.loggedIn} foundItems={this.state.foundItems} />}
          />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/my-profile" component={Profile} />
          {/* <Route exact path="/settings" component={Settings} /> */}
        </div>
      </Router>
    );
  }
}

export default App;
