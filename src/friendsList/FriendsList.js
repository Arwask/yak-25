import React, { Component } from 'react';
import 'bootstrap';
import Friend from './Friend';

class FriendsList extends Component {
  constructor(props) {
    super(props);
    this.unique = 1;
  }

  handlePublic = function() {
    this.props.selectedFriend('0');
  }.bind(this);

  render() {
    return (
      <div className="dropdown-menu">
        <a className="dropdown-item" value="null" id="0" onClick={this.handlePublic}>
          Public
        </a>
        {this.props.friendsName.map(friendObj => {
          return (
            <Friend
              selectedFriend={this.props.selectedFriend}
              firstName={friendObj.firstName}
              lastName={friendObj.lastName}
              id={friendObj.id}
              key={this.unique++}
            />
          );
        })}
      </div>
    );
  }
}

export default FriendsList;
