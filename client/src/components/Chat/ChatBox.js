import React, {useRef,useEffect} from 'react';
import Message from './Message';

const ChatBox = ({fetchMore, needToScroll, user, messages, textMsg, setTextMsg ,sendMessage}) => {

  const mesRef = useRef()

  const scrollToBottom = () =>{
      mesRef.current.scrollTop = mesRef.current.scrollHeight;
  }

  useEffect(()=>{
    console.log(messages, needToScroll)
    if(needToScroll && messages.length) scrollToBottom()

  },[messages,needToScroll])
  
  const onEnter = e =>{
    if(e.charCode === 13 && textMsg !== '') sendMessage() 
  }

  const onSubmit = e =>{
      if(textMsg) sendMessage()
  }

  const handleScroll = e =>{
    if(mesRef.current && mesRef.current.scrollTop < 100 && !mesRef.current.reachTop){
       fetchMore()
       mesRef.current.reachTop = true
    }
  }

  
  return (
    <div className="chatbox">
        <div className="msgBox" onScroll={handleScroll} ref={mesRef}>
          {messages.map(({_id,author,message}) => (<Message key={_id} user={user} sender={author} message={message} />))}
        </div>
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