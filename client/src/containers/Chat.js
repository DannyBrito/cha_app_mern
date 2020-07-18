import React,{useState, useEffect,useRef} from 'react';
import {useHistory} from 'react-router';
import ChatBox from '../components/Chat/ChatBox';
import ChatSideBar from '../components/Chat/ChatSideBar';
import {fetchUserChatsInfo, fetchMoreMessagesInChat, socketErrorHandler, fetchUserIDbyUsername, createChannel} from '../helpers/Constants'
import Modal from '../components/Modal/Modal';
import FormContent from '../components/Modal/FormContent';

import {NotificationManager,NotificationContainer} from 'react-notifications'
import 'react-notifications/lib/notifications.css'

const Chat = ({id,username,socket}) => {

  const isChatMounted = useRef(true)
  const needToScroll = useRef(false)

  const [currentCh, setCurrentCh] = useState('LobbyGeneral')

  const [messages,setMessages] = useState({})
  const [totalMessagesPerChat, setTotalMessagesPerChat] = useState({})
  const [allSubChannels,setAllSubChannels] = useState({})
  const [latestMessagePerChat,setLatestMessagePerChat] = useState({})
  const [pageMessage,setPageMessage] = useState({})
  
  const [textMsg,setTextMsg] = useState('')
  
  const [chatModal,setChatModal] = useState(false)
  const [inputUserField, setInputUserField] = useState('')
  const [memberSelected, setMemberSelected] = useState([])

  const History = useHistory()

  const requestUserChatsInfo = () =>{
    fetchUserChatsInfo(id)
    .then(updateReceivedInfoToStates)
    .catch(console.log)
  }

  const updateReceivedInfoToStates = ({channels,msgs,totalmsgs,latestMessagePerChat}) =>{
    const channelIDs = Object.keys(channels)
    if(channelIDs.length){
      // update scroll Ref for auto-scroll when messages load.
      needToScroll.current = true
      // update States
      setLatestMessagePerChat(latestMessagePerChat)
      setAllSubChannels(channels)
      setTotalMessagesPerChat(totalmsgs)
      setMessages({...msgs})
      initializeAndSetChatPages(channelIDs)
      setCurrentCh(channelIDs[0])
    }
    else NotificationManager.info('You can create new chats','Welcome ' + username)
  }

  const initializeAndSetChatPages = (channels) => {
      let pages = {}
      channels.forEach(ch => pages[ch] = 1)
      setPageMessage(pages)
  }

  // Redirect if ID is not present
  useEffect(()=>{
    if(id) requestUserChatsInfo()
    else History.push('/')
  },[id])

  // Setting Socket
  useEffect(()=>{
    
    socket.open()
    socket.emit('self_channel',{id})
    socket.on('message',handleMessageReceivedOnSocket)
    socket.on('new_channel',requestUserChatsInfo)

    return () =>{
      isChatMounted.current = false
      socket.close()
    }

  },[])

  // Socket helper
  const handleMessageReceivedOnSocket = message =>{ 
    // break if chat is unmounted
    if(!isChatMounted.current) return
    setMessages(prev => {
        if(prev[message.channel]) return {...prev,[message.channel]:[...prev[message.channel],message]}
        return {...prev,[message.channel]:[message]}
    })
    setLatestMessagePerChat(prev => ({...prev,[message.channel]:message}))
    needToScroll.current = true
  }

  // Infinte Scroll
  const fetchMore = () => {
    if(messages[currentCh].length >= totalMessagesPerChat[currentCh]) return console.log('leaving')
    fetchMoreMessagesInChat(currentCh,pageMessage[currentCh])
      .then(({messages})=>{
        needToScroll.current = false
        setPageMessage(prev=>({...prev,[currentCh]: prev[currentCh] + 1 }))
        setMessages(prev => ({...prev,[currentCh]:[...messages,...prev[currentCh]]}))
      })
      .catch(console.log)
  }

  // If channels State is change/updated to set new socket channels
  useEffect(()=>{
      const temporalChannelIds = Object.keys(allSubChannels)
      if(temporalChannelIds.length) socket.emit('join_channels',{channels:temporalChannelIds},socketErrorHandler)
      else socket.emit('join_lobby',undefined,socketErrorHandler)
  },[allSubChannels])


  // Handles message to be sent through socket
  const sendMessage = () =>{
      socket.emit('sendMessage',{author:id,message:textMsg,channel:currentCh},()=>setTextMsg(''))
  }

  /* -------- MODAL CONTROL -------- */
  
  const resetModal = () =>{
    setChatModal(false)
    setInputUserField('')
    setMemberSelected([])
  }
  // If cancel within modal
  const onCancel = () =>{
    resetModal()
  }
  // open Modal
  const openModal = () =>{
    setChatModal(true)
  }
  // when confirmed
  const onConfirm = () =>{
   const userIds = [...memberSelected.map(mb => mb._id)]
   createChannel({creator:id,users:userIds})
    .then(() => {
      socket.emit('created_new_channel',{users:userIds})
      // not the best option as refetch entire set of data but work-around
      requestUserChatsInfo()
      resetModal()
    })
    .catch(console.log)
  }

  // user find submit for handler
  const handleSubmitUser = (event) =>{
    event.preventDefault()
    fetchUserIDbyUsername(inputUserField)
    .then(user => {
      setMemberSelected(prev => [...prev,user])
      setInputUserField('')
    })
    .catch(() =>{
      NotificationManager.error('Couldn\'t add user to chat',inputUserField,3000)
      setInputUserField('')
    })
  }

  // remove user from group list previous creation
  const deleteMember = (id) =>{
    setMemberSelected(prev => [...prev.filter(mb => mb._id !== id)])
  }
  
  /* -------- () -------- */
  
  const channelMessagesCompleted = () =>{
    if(!messages[currentCh]) return false
    return messages[currentCh].length < totalMessagesPerChat[currentCh]
  }

  return (
    <>
      <ChatSideBar currentCh={currentCh} changeCurrentChat={setCurrentCh} 
      openModal={openModal} latestMessagePerChat={latestMessagePerChat} 
      channels={allSubChannels} id={id} />
      <ChatBox  
        hasMore={channelMessagesCompleted()}
        fetchMore={fetchMore}
        user={{username,id}} sendMessage={sendMessage} 
        needToScroll={needToScroll.current} messages={messages[currentCh]?messages[currentCh]:[]}
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