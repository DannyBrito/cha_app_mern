import React,{useState, useEffect} from 'react';
import Message from './Message';
import {useHistory} from 'react-router';
import ScrollToBottom from 'react-scroll-to-bottom';
const Chat = ({username,socket}) => {
  const [messages,setMessages] =useState([])
  const [textMsg,setTextMsg] = useState('')
  const History = useHistory()

  useEffect(()=>{
    // if(!username) History.push('/')
    socket.on('message', message =>{
      setMessages(messages => [...messages,message])
    })
  },[])

  const onEnter = e =>{
    if(e.charCode === 13 && textMsg && textMsg !== '') sendMessage() 
  }

  const onSubmit = e =>{
      if(textMsg) sendMessage()
  }

  const sendMessage = () =>{
      socket.emit('sendMessage',{user:username,message:textMsg},()=>{
        setTextMsg('')
      })
  }
  return (
    <>
    <div className="feedContainer">
    </div>
    <div className="chatbox">
        <ScrollToBottom className="msgBox">
          {messages.map(({user,message}) => (<Message user={username} sender={user} message={message} />))}
        </ScrollToBottom>
        <div className="InputContainer">
        <input placeholder="Type a message..." value={textMsg} onKeyPress={onEnter} onChange={e=>setTextMsg(e.target.value)} type="text" className="typingBox" />
        <button className="chatbtn"onClick={onSubmit}> Send </button>
        
        </div>
    </div>
    </>
  );
}

export default Chat;