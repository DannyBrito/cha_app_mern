import React, {useRef,useEffect,useState} from 'react';
import Message from './Message';

const ChatBox = ({sendBinaryData,hasMore,fetchMoreMessagesForChat, needToScroll, user, messages, sendMessage}) => {

  const mesRef = useRef()
  const [textMsg,setTextMsg] = useState('')
  const [fileInput, setFileInput] = useState('')
  useEffect(()=>{
    mesRef.current.reachTop = false
    if(needToScroll && messages.length) scrollToBottom()
  },[messages,needToScroll])
  
  const scrollToBottom = () =>{
      mesRef.current.scrollTop = mesRef.current.scrollHeight;
  }
  const onEnter = e =>{
    if(e.charCode === 13 && textMsg !== '' && fileInput === ''){
      sendMessage(textMsg)
      setTextMsg('')
    }
    else if(fileInput){
      sendBinaryData(fileInput)
    }
  }

  const onSubmit = () =>{
      if(textMsg) sendMessage(textMsg)
      setTextMsg('')
  }

  const handleScroll = e =>{
    if(hasMore && mesRef.current && mesRef.current.scrollTop < 100 && !mesRef.current.reachTop){
      fetchMoreMessagesForChat()
      console.log('reaching top')
      mesRef.current.reachTop = true
    }
  }

  const handleFileInput = e =>{
    setFileInput(e.target.files[0])
  }

  
  return (
    <div className="chatbox">
        <div className="preventColumnBlowOut messagesContainer" onScroll={handleScroll} ref={mesRef}>
          {messages.map(({_id,author,message}) => (<Message key={_id} user={user} sender={author} message={message} />))}
        </div>
        <div className="InputContainer">
            <input onChange={handleFileInput} name="fileSelect" id="fileSelect" type="file" />
            <label htmlFor="fileSelect" id="labelFile">
              <img src={fileInput? "attach-icon-active.png":"/attach-icon.png"}/>
            </label>
            <input placeholder="Type a message..." 
                value={textMsg} onKeyPress={onEnter} 
                onChange={e=>setTextMsg(e.target.value)} 
                type="text" className="typingBox" 
            />
            <img className="chatbtn"  src={textMsg ? "/active_send.png" : "/send.png"} onClick={onSubmit} />
        </div>
    </div>
  );
}

export default ChatBox;