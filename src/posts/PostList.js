import React, { Component } from 'react';
import 'bootstrap';
import './Post.css';

class PostList extends Component {
  state = {
    postText: this.props.posts.text
  };
  delete = function() {
    this.props.deletePost(this.props.posts.id);
  }.bind(this);

  editPost = function() {
    this.props.editable();
  }.bind(this);

  saveEditedPost = function(e) {
    this.props.editPost(e, this.state.postText, this.props.posts.id);
  }.bind(this);

  handleChange = function(event) {
    this.setState({ postText: event.target.value });
  }.bind(this);

  render() {
    return (
      <div className="card cardDiv">
        <div className="card-header">
          <h5 className="card-title">
            {this.props.posts.user.firstName} {this.props.posts.user.lastName}
          </h5>
        </div>
        <div className="card-body">
          {this.props.editMode ? (
            <form onSubmit={this.saveEditedPost}>
              <textarea value={this.state.postText} onChange={this.handleChange} />
              <button type="submit">Save</button>
            </form>
          ) : (
            <p className="card-text">{this.props.posts.text}</p>
          )}
          {this.props.currentUser === this.props.posts.userId ? (
            <div>
              <a className="btn btn-primary" onClick={this.editPost}>
                Edit
              </a>
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
