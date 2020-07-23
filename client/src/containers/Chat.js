import React,{useState, useEffect,useRef} from 'react';
import {useHistory} from 'react-router';
import ChatBox from '../components/Chat/ChatBox';
import ChatSideBar from '../components/Chat/ChatSideBar';
import {fetchUserChatsInfo, fetchMoreMessagesInChat, socketErrorHandler} from '../helpers/Constants'

import {NotificationManager,NotificationContainer} from 'react-notifications'
import 'react-notifications/lib/notifications.css'
import NewChatModal from '../components/NewChatModal';

const Chat = ({id,username,socket}) => {

  const isChatMounted = useRef(true)
  const needToScroll = useRef(false)

  const [image, setImage] = useState('')

  const [currentCh, setCurrentCh] = useState('LobbyGeneral')

  const [messages,setMessages] = useState({})
  const [totalMessagesPerChat, setTotalMessagesPerChat] = useState({})
  const [allSubChannels,setAllSubChannels] = useState({})
  const [latestMessagePerChat,setLatestMessagePerChat] = useState({})
  const [pageMessage,setPageMessage] = useState({})
  
  const [chatModal,setChatModal] = useState(false)

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
    socket.on('binaryData',(data)=>{
      const blob = String.fromCharCode.apply(null,new Uint8Array(data))
      setImage('data:image/png;base64,' + btoa(blob))
    })

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
  const fetchMoreMessagesForChat = () => {
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
  const sendMessage = (message) =>{
    socket.emit('sendMessage',{message, author:id, channel:currentCh})
  }

  const sendBinaryData = (data) =>{
    socket.emit('sendBinaryData',data)
  }

  /* -------- MODAL CONTROL -------- */
  
  const handleCreatedChannel = (userIDS) =>{
      setChatModal(false)
      socket.emit('created_new_channel',{users:userIDS})
      // not the best option as refetch entire set of data but work-around
      requestUserChatsInfo()
  }

  const openModal = () =>{
    setChatModal(true)
  }
  
  const createUserNoFoundAlert = (user) =>{
    NotificationManager.error('Couldn\'t add user to chat',user,3000)
  }
  
  /* -------- () -------- */

  const channelMessagesCompleted = () =>{
    if(!messages[currentCh]) return false
    return messages[currentCh].length < totalMessagesPerChat[currentCh]
  }

  const sendMessages = () => messages[currentCh]? messages[currentCh]:[]
  
  const updateChannel = (channel) =>{
    needToScroll.current = true
    setCurrentCh(channel)
  }

  return (
    <div className="Chat_Container">
      <ChatSideBar currentCh={currentCh} changeCurrentChat={updateChannel} 
      openModal={openModal} latestMessagePerChat={latestMessagePerChat} 
      channels={allSubChannels} id={id} />
      <img src={image} />
      <ChatBox
        sendBinaryData={sendBinaryData}
        hasMore={channelMessagesCompleted()}
        fetchMoreMessagesForChat={fetchMoreMessagesForChat}
        user={{username,id}} sendMessage={sendMessage} 
        needToScroll={needToScroll.current} messages={sendMessages()}
      />
      {chatModal &&
        <NewChatModal setChatModal={setChatModal} id={id}
        handleCreatedChannel={handleCreatedChannel}
        createUserNoFoundAlert={createUserNoFoundAlert} />
      }
      <NotificationContainer />
    </div>
  );
}

export default Chat;