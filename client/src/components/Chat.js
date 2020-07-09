import React from 'react';

const Chat = (props) => {
  return (
    <h1 className="formcontainer">
        Hello {props.username}
    </h1>
  );
}

export default Chat;