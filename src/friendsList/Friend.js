import React, { Component } from 'react';
import 'bootstrap';

class Friend extends Component {
  handleClick = function(event) {
    console.log(event.target.id);
    this.props.selectedFriend(event.target.id);
  }.bind(this);

  render() {
    return (
      <a className="dropdown-item" id={this.props.id} onClick={this.handleClick}>
        {this.props.firstName} {this.props.lastName}
      </a>
    );
  }
}

export default Friend;
