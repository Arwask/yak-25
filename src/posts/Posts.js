import React, { Component } from 'react';
import 'bootstrap';
import './Posts.css';
import FriendsList from '../friendsList/FriendsList';

class Posts extends Component {
  state = {
    postText: '',
    friendsName: [],
    selectedFriend: null
  };

  componentDidMount() {
    let nameList = [];
    let id = sessionStorage.getItem('ActiveUser') || localStorage.getItem('ActiveUser');

    // Get all people who I added as friends
    // Get each person's PK

    // Get all people who added me as friends
    // Get each person's PK

    // Query `users` table with each PK. i.e. (id=1&id=8&id=11)

    fetch(`http://localhost:8088/friends?user1Id=${id}&accepted=true`)
      .then(r => r.json())
      .then(friendsList => {
        friendsList.map(friend => {
          return nameList.push(friend.user2Id);
        });
        fetch(`http://localhost:8088/friends?user2Id=${id}&accepted=true`)
          .then(r => r.json())
          .then(friendsList2 => {
            friendsList2.map(friend => {
              nameList.push(friend.user1Id);
            });
            let str = 'id=' + nameList.join('&id=');
            fetch(`http://localhost:8088/users?${str}`)
              .then(r => r.json())
              .then(friends => {
                console.log(friends);
                this.setState({ friendsName: friends });
              });
          });
      });
  }

  selectedFriend = function(id) {
    this.setState({ selectedFriend: id });
  }.bind(this);

  submitPost = function() {
    let dataToPost = {
      text: this.state.postText,
      timestamp: Date.now(),
      userId: +sessionStorage.getItem('ActiveUser'),
      recipientId: this.state.selectedFriend !== '0' ? +this.state.selectedFriend : null
    };
    fetch('http://localhost:8088/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToPost)
    })
      .then(r => r.json())
      .then(newPost => {
        // console.log(newPost);
      });
  }.bind(this);

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
          <div className="btn-group dropright">
            <button
              type="button"
              className="btn btn-secondary dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Dropright
            </button>
            <FriendsList selectedFriend={this.selectedFriend} friendsName={this.state.friendsName} />
          </div>
          <div>
            <button className="btn btn-primary" type="submit">
              Post
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Posts;
