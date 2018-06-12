import React, { Component } from 'react';
import 'bootstrap';
import PostList from '../posts/PostList';

class Search extends Component {
  render() {
    debugger;
    return (
      <div>
        {this.props.foundItems.posts.map(post => {
          return <PostList posts={post} />;
        })}
      </div>
    );
  }
}
export default Search;
