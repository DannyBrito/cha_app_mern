import React,{useState, useEffect} from 'react';
import {useHistory} from 'react-router';
import ChatBox from '../components/Chat/ChatBox';
import ChatSideBar from '../components/Chat/ChatSideBar';
import {BASE_URL} from '../helpers/Constants'
import Modal from '../components/Modal/Modal';

const Chat = ({id,username,socket}) => {
  const [messages,setMessages] =useState([])
  const [textMsg,setTextMsg] = useState('')
  const [allSubChannels,setAllSubChannels] = useState({})
  const [currentCh, setCurrentCh] = useState('LobbyGeneral')
  const [chatModal,setChatModal] = useState(false)

  const History = useHistory()
  useEffect(()=>{
    
    socket.open()

    socket.on('message', message =>{
      setMessages(messages => [...messages,message])
    })

    return () =>{
      socket.close()
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

  const onCancel = () =>{
   setChatModal(false)
  }

  const onConfirm = () =>{
   setChatModal(false)
  }

  const openModal = () =>{
    setChatModal(true)
  }
 
  return (
    <>
      <ChatSideBar openModal={openModal} channels={allSubChannels} id={id}/>
      <ChatBox 
        username={username} sendMessage={sendMessage} messages={messages}
        textMsg={textMsg} setTextMsg={setTextMsg}
      />
      {chatModal &&<Modal confirm cancel onConfirm={onConfirm} onCancel={onCancel} title='Create New Chat'/>}
    </>
  );
}

export default Chat;