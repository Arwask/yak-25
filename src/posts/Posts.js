import React, { Component } from 'react';
import 'bootstrap';
import './Posts.css';

class Posts extends Component {
  state = {
    postText: ''
  };

  submitPost = function() {
    fetch('http://localhost:8088/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: this.state.postText,
        timestamp: Date.now(),
        userId: sessionStorage.getItem('userId'),
        recipientId: null
      })
    })
      .then(r => r.json())
      .then(newContact => {});
  };

  handleChange = function(e) {
    this.setState({ postText: e.target.value });
  }.bind(this);

  render() {
    return (
      <div className="form-group textareaDiv">
        {/* <label></label> */}
        <form onSubmit={this.submitPost}>
          <textarea
            className="form-control"
            value={this.state.postText}
            id="post"
            rows="3"
            placeholder="What's on your mind..."
            onChange={this.handleChange}
          />
          <div class="btn-group dropright">
            <button type="button" class="btn btn-secondary">
              Split dropright
            </button>
            <button
              type="button"
              class="btn btn-secondary dropdown-toggle dropdown-toggle-split"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span class="sr-only">Toggle Dropright</span>
            </button>
            <div class="dropdown-menu" />
          </div>
          <button className="btn btn-primary" type="submit">
            Post
          </button>
        </form>
      </div>
    );
  }
}

export default Posts;
