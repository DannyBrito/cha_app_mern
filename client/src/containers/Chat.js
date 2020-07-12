import React,{useState, useEffect} from 'react';
import {useHistory} from 'react-router';
import ChatBox from '../components/Chat/ChatBox';
import ChatSideBar from '../components/Chat/ChatSideBar';
import {BASE_URL} from '../helpers/Constants'

const Chat = ({id,username,socket}) => {
  const [messages,setMessages] =useState([])
  const [textMsg,setTextMsg] = useState('')
  const [currentChannels,setChannels] = useState({})
  const History = useHistory()

  useEffect(()=>{
    
    // if(!id) History.push('/')
    
    socket.on('message', message =>{
      setMessages(messages => [...messages,message])
    })

  },[])

  useEffect(()=>{
    if(id) fetchChannels()
    else History.push('/')
  },[id])

  const fetchChannels = () =>{
      fetch(BASE_URL + `/channels/user_channels/${id}`)
      .then(res =>{
        if(!res.ok) throw res
        return res.json()
      })
      .then(({channels}) => setChannels(channels))
      .catch(console.log)
  }

  const sendMessage = () =>{
      socket.emit('sendMessage',{user:username,message:textMsg},()=>{
        setTextMsg('')
      })
  }
  console.log(currentChannels)
  return (
    <>
      <ChatSideBar channels={currentChannels} id={id}/>
      <ChatBox 
        username={username} sendMessage={sendMessage} messages={messages}
        textMsg={textMsg} setTextMsg={setTextMsg}
      />
    </>
  );
}

export default Chat;