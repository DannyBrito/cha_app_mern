import React from 'react';
import Message from './Message';
import ScrollToBottom from 'react-scroll-to-bottom';

const ChatBox = ({id, messages, textMsg, setTextMsg ,sendMessage}) => {

  const onEnter = e =>{
    if(e.charCode === 13 && textMsg !== '') sendMessage() 
  }

  const onSubmit = e =>{
      if(textMsg) sendMessage()
  }

  return (
    <div className="chatbox">
        <ScrollToBottom className="msgBox">
          {messages.map(({_id,author,message}) => (<Message key={_id} user={id} sender={author} message={message} />))}
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