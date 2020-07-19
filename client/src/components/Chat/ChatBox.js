import React, {useRef,useEffect,useState} from 'react';
import Message from './Message';

const ChatBox = ({hasMore,fetchMoreMessagesForChat, needToScroll, user, messages, sendMessage}) => {

  const mesRef = useRef()
  const [textMsg,setTextMsg] = useState('')

  useEffect(()=>{
    mesRef.current.reachTop = false
    if(needToScroll && messages.length) scrollToBottom()
  },[messages,needToScroll])
  
  const scrollToBottom = () =>{
      mesRef.current.scrollTop = mesRef.current.scrollHeight;
  }
  const onEnter = e =>{
    if(e.charCode === 13 && textMsg !== '') sendMessage(textMsg) 
  }

  const onSubmit = () =>{
      if(textMsg) sendMessage(textMsg)
  }

  const handleScroll = e =>{
    if(hasMore && mesRef.current && mesRef.current.scrollTop < 100 && !mesRef.current.reachTop){
      fetchMoreMessagesForChat()
      console.log('reaching top')
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
            <button className="chatbtn" onClick={onSubmit}> Send </button>
        </div>
    </div>
  );
}

export default ChatBox;