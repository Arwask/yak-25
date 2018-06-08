import React, { Component } from 'react';
import 'bootstrap';
import './Post.css';

class PostList extends Component {
  render() {
    this.delete = function() {
      this.props.deletePost(this.props.posts.id);
    }.bind(this);
    return (
      <div className="card cardDiv">
        <div className="card-header">
          <h5 className="card-title">
            {this.props.posts.user.firstName} {this.props.posts.user.lastName}
          </h5>
        </div>
        <div className="card-body">
          <p className="card-text">{this.props.posts.text}</p>
          {this.props.currentUser === this.props.posts.userId ? (
            <div>
              <a className="btn btn-primary">Edit</a>
              <a className="btn btn-primary" onClick={this.delete}>
                Delete
              </a>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}

export default PostList;
