import React, { Component } from 'react';
import 'bootstrap';
import './Post.css';

class PostList extends Component {
  state = {
    postText: this.props.posts.text,
    editMode: false
  };

  unique = 1;

  delete = function() {
    this.props.deletePost(this.props.posts.id);
  }.bind(this);

  editPost = function(e) {
    this.setState({ editMode: true });
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
          {this.state.editMode ? (
            <form onSubmit={this.saveEditedPost}>
              <textarea value={this.state.postText} onChange={this.handleChange} className="editBox" />
              <button className="btn btn-primary" type="submit">
                Save
              </button>
            </form>
          ) : (
            <p className="card-text">{this.props.posts.text}</p>
          )}
          {this.props.currentUser === this.props.posts.userId && !this.state.editMode ? (
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
