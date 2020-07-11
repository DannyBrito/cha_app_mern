import React from 'react';
import Message from './Message';
import ScrollToBottom from 'react-scroll-to-bottom';

const ChatBox = ({username, messages, textMsg, setTextMsg ,sendMessage}) => {

  const onEnter = e =>{
    if(e.charCode === 13 && textMsg && textMsg !== '') sendMessage() 
  }

  const onSubmit = e =>{
      if(textMsg) sendMessage()
  }

  return (
    <div className="chatbox">
        <ScrollToBottom className="msgBox">
          {messages.map(({user,message}) => (<Message user={username} sender={user} message={message} />))}
        </ScrollToBottom>
        <div className="InputContainer">
            <input placeholder="Type a message..." 
                value={textMsg} onKeyPress={onEnter} 
                onChange={e=>setTextMsg(e.target.value)} 
                type="text" className="typingBox" 
            />
            <button className="chatbtn"onClick={onSubmit}> Send </button>
        </div>
    </div>
  );
}

export default ChatBox;