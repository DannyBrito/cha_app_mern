import React,{useState, useEffect} from 'react';
import {useHistory} from 'react-router';
import ChatBox from '../components/Chat/ChatBox';
import ChatSideBar from '../components/Chat/ChatSideBar';
import {BASE_URL} from '../helpers/Constants'

const Chat = ({id,username,socket}) => {
  const [messages,setMessages] =useState([])
  const [textMsg,setTextMsg] = useState('')
  const [allSubChannels,setAllSubChannels] = useState({})
  const [currentCh, setCurrentCh] = useState('LobbyGeneral')
  const History = useHistory()

  useEffect(()=>{
    
    // if(!id) History.push('/')
    
    // set Socket Events
    socket.on('message', message =>{
      setMessages(messages => [...messages,message])
    })

    return () =>{
      socket.emit('disconnect')
    }
  },[])

  useEffect(()=>{
    const tempChannels = Object.keys(allSubChannels)
    if(tempChannels.length){
      socket.emit('join_channels',{channels:tempChannels},(err)=>{
        if(err) alert(err)
      })
    }
    else{
      socket.emit('join_lobby',undefined,(err)=>{
        if(err) alert(err)
      })
    }
  },[allSubChannels])

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
      .then(({channels}) => {
        const result = Object.keys(channels)
        if(result.length){
        setAllSubChannels(channels)
        setCurrentCh(result[0])
        }
      })
      .catch(console.log)
  }



  const sendMessage = () =>{
      socket.emit('sendMessage',{user:username,message:textMsg,room:currentCh},()=>{
        setTextMsg('')
      })
  }
  console.log(allSubChannels)
  return (
    <>
      <ChatSideBar channels={allSubChannels} id={id}/>
      <ChatBox 
        username={username} sendMessage={sendMessage} messages={messages}
        textMsg={textMsg} setTextMsg={setTextMsg}
      />
    </>
  );
}

export default Chat;