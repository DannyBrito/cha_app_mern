import React,{useState, useEffect} from 'react';
import {useHistory} from 'react-router';
import ChatBox from '../components/Chat/ChatBox';
import ChatSideBar from '../components/Chat/ChatSideBar';
import {BASE_URL} from '../helpers/Constants'
import Modal from '../components/Modal/Modal';
import FormContent from '../components/Modal/FormContent';

import {NotificationManager,NotificationContainer} from 'react-notifications'
import 'react-notifications/lib/notifications.css'

const Chat = ({id,username,socket}) => {

  const [messages,setMessages] =useState({})
  const [textMsg,setTextMsg] = useState('')
  const [allSubChannels,setAllSubChannels] = useState({})

  const [currentCh, setCurrentCh] = useState('LobbyGeneral')
  const [chatModal,setChatModal] = useState(false)

  const [inputUserField, setInputUserField] = useState('')
  const [memberSelected, setMemberSelected] = useState([])
  const History = useHistory()

  // Setting Socket
  useEffect(()=>{
    
    socket.open()
    socket.emit('self_channel',{id})
    socket.on('message', message =>{
      setMessages(prev => {
        if(prev[message.channel]){
          return {...prev,[message.channel]:[...prev[message.channel],message]}
        }
        else {
          return {...prev,[message.channel]:[message]}
        }
      })
    })

    socket.on('new_channel',()=>{
        fetchChannels()
    })

    return () =>{
      socket.close()
    }
  },[])

  // Checks for User Id otherwise redirected to Login/SignUp if Id presents fetchs Users channels
  useEffect(()=>{
    if(id) fetchChannels()
    else History.push('/')
  },[id])

  // Socket setting channels for User on any change of channels
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

  const fetchChannels = () =>{
      fetch(BASE_URL + `/channels/user_channels/${id}`)
      .then(res =>{
        if(!res.ok) throw res
        return res.json()
      })
      .then(({channels,msgs}) => {
        console.log(msgs)
        const result = Object.keys(channels)
        if(result.length){
        setAllSubChannels(channels)
        // adding
        setMessages({...msgs})
        // 
        setCurrentCh(result[0])
        }
        else{
          NotificationManager.info('You can create new chats','Welcome ' + username)
        }
      })
      .catch(console.log)
  }
  // function helper to emit event by socket
  const sendMessage = () =>{
      socket.emit('sendMessage',{author:id,message:textMsg,channel:currentCh},()=>{
        setTextMsg('')
      })
  }

  /* -------- MODAL CONTROL -------- */
  
  // If cancel within modal
  const onCancel = () =>{
   setChatModal(false)
   setInputUserField('')
   setMemberSelected([])
  }
  // when confirmed
  const onConfirm = () =>{
   setChatModal(false)
   const userIds = [...memberSelected.map(mb => mb._id)]
   fetch(BASE_URL +'/channels',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({creator:id,users:userIds})
   })
    .then(res =>{
    if(!res.ok) throw res
    return res.json()
    })
    .then((res) => {
      // not the best option as refetch entire set of data but work-around
      socket.emit('created_new_channel',{users:userIds},()=>{

      })
      fetchChannels()
      setMemberSelected([])
      setInputUserField('')
    })
    .catch(console.log)
  
  }

  // open Modal
  const openModal = () =>{
    setChatModal(true)
  }

  // user find submit for handler
  const handleSubmitUser = (e) =>{
      e.preventDefault()

      fetchUserId(inputUserField)
      .then(res => res.json()
          .then(rs => ({body:rs,ok:res.ok}))
      )
      .then(res =>{
        if(!res.ok) throw(res.body)
        return res
      })
      .then(res => {
        setMemberSelected(prev => [...prev,res.body])
        setInputUserField('')
      })
      .catch(err =>{
        setInputUserField('')
        NotificationManager.error('Couldn\'t add user to chat',err,3000)
      })
  }

  const fetchUserId = name => {
      return fetch(BASE_URL + '/users/find/' + name)
  }

  // remove user from group list previous creation
  const deleteMember = (id) =>{
    setMemberSelected(prev => [...prev.filter(mb => mb._id !== id)])
  }

  /* -------- () -------- */
  return (
    <>
      <ChatSideBar currentCh={currentCh} changeCurrentChat={setCurrentCh} openModal={openModal} channels={allSubChannels} id={id}/>
      <ChatBox 
        user={{username,id}} sendMessage={sendMessage} messages={messages[currentCh]?messages[currentCh]:[]}
        textMsg={textMsg} setTextMsg={setTextMsg}
      />
      {chatModal &&
        <Modal confirm cancel onConfirm={onConfirm} onCancel={onCancel} title='Create New Chat'>
          <FormContent  handleSubmitUser={handleSubmitUser}
          inputUserField={inputUserField} setInputUserField={setInputUserField} 
          memberSelected={memberSelected} setMemberSelected={setMemberSelected} deleteMember={deleteMember}/>
        </Modal>
      }
      <NotificationContainer />
    </>
  );
}

export default Chat;