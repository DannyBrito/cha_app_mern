import React,{useState, useEffect} from 'react';
import {useHistory} from 'react-router';
import ChatBox from '../components/Chat/ChatBox';
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

  const sendMessage = () =>{
      socket.emit('sendMessage',{user:username,message:textMsg},()=>{
        setTextMsg('')
      })
  }
  return (
    <>
    <div className="feedContainer">
    </div>
      <ChatBox 
        username={username} sendMessage={sendMessage} messages={messages}
        textMsg={textMsg} setTextMsg={setTextMsg}
      />
    </>
  );
}

export default Chat;