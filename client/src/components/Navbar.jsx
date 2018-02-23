import React from 'react';

const Navbar = (props) => {
  return (
    <div>
      <strong onClick={props.showMyPosts}>My Posts</strong> | <strong>Make Post</strong> | <strong>Logout</strong>
      <button onClick={props.signOut}>sign-out</button>
    </div>
  );
};

export default Navbar;
