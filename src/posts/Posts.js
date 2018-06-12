import React, { Component } from 'react';
import 'bootstrap';
import './Posts.css';
import FriendsList from '../friendsList/FriendsList';
import PostList from './PostList';

class Posts extends Component {
  state = {
    postText: '',
    friendsName: [],
    selectedFriend: 'null',
    posts: [],
    currentUser: null,
    editMode: false
  };
  unique = 1;
  componentDidMount() {
    this.getMyFriends();
  }

  getMyFriends = function() {
    let nameList = [];
    let id = +sessionStorage.getItem('ActiveUser') || +localStorage.getItem('ActiveUser');
    this.setState({ currentUser: id });
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
              return nameList.push(friend.user1Id);
            });
            let str = 'id=' + nameList.join('&id=');
            fetch(`http://localhost:8088/users?${str}`)
              .then(r => r.json())
              .then(friends => {
                this.setState({ friendsName: friends });
              });
          });
      });
  };

  selectedFriend = function(id) {
    this.setState({ selectedFriend: id });
  }.bind(this);

  deletePost = function(id) {
    this.props.deletePostFromDb(id);
  }.bind(this);

  submitPost = function(e) {
    e.preventDefault(); //to prevent the default submission
    let dataToPost = {
      text: this.state.postText,
      timestamp: Date.now(),
      userId: +sessionStorage.getItem('ActiveUser') || +localStorage.getItem('ActiveUser'),
      recipientId:
        (this.state.selectedFriend !== '0') & (this.state.selectedFriend !== 'null')
          ? +this.state.selectedFriend
          : 'null'
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
        this.props.getAllPosts();
        this.setState({ postText: '' });
      });
  }.bind(this);

  editPost = function(event, text, id) {
    event.preventDefault();
    fetch(`http://localhost:8088/posts/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: text })
    })
      .then(r => r.json())
      .then(newPost => {
        this.setState({ editMode: false });
        this.props.getAllPosts();
        this.setState({ postText: '' });
      });
  }.bind(this);

  setEditMode = function(e) {
    this.setState({ editMode: true });
  }.bind(this);

  handleChange = function(e) {
    this.setState({ postText: e.target.value });
  }.bind(this);

  render() {
    return (
      <div className="form-group textareaDiv">
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
              Select privacy
            </button>
            <FriendsList selectedFriend={this.selectedFriend} friendsName={this.state.friendsName} />
          </div>
          <div>
            <button className="btn btn-primary" type="submit">
              Publish
            </button>
          </div>
        </form>
        {this.props.posts.map(p => {
          return (
            <PostList
              key={this.unique++}
              editable={this.setEditMode}
              posts={p}
              dispalyText={this.dispalyText}
              editPost={this.editPost}
              currentUser={this.state.currentUser}
              deletePost={this.deletePost}
            />
          );
        })}
      </div>
    );
  }
}

export default Posts;
