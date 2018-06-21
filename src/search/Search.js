import React, { Component } from 'react';
import 'bootstrap';
import '../posts/Post.css';
import PostList from '../posts/PostList';
import profileImg from '../images/person-female.png';
import './Search.css';

class Search extends Component {
  unique = 1;
  render() {
    return (
      <div>
        {this.props.foundItems.posts.map(post => {
          return <PostList posts={post} key={this.unique++} />;
        })}
        {this.props.foundItems.users.map(user => {
          return (
            <div className="container-fluid" key={this.unique++}>
              <div className="row">
                <div className="col-12">
                  <div className="card card-inverse card-profile">
                    <div className="card-block">
                      <div className="row">
                        <div className="col-md-2 col-sm-2 text-center img-profile-div">
                          <img className="img-profile" src={profileImg} alt="placeholder profile" />
                        </div>
                        <div className="col-md-4 col-sm-4">
                          <h3 className="card-title">
                            {user.firstName} {user.lastName}
                          </h3>
                        </div>
                        <div className="col-md-2 col-sm-2 text-center" />
                        <button type="button" className="btn btn-primary btn-block btn-md">
                          <i className="fas fa-user-circle" /> View Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
export default Search;
