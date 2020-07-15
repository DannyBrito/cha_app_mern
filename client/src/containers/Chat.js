import React,{useState, useEffect} from 'react';
import {useHistory} from 'react-router';
import ChatBox from '../components/Chat/ChatBox';
import ChatSideBar from '../components/Chat/ChatSideBar';
import {BASE_URL} from '../helpers/Constants'
import Modal from '../components/Modal/Modal';
import FormContent from '../components/Modal/FormContent';

const Chat = ({id,username,socket}) => {
  const [messages,setMessages] =useState([])
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

    socket.on('message', message =>{
      setMessages(messages => [...messages,message])
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
      .then(({channels}) => {
        const result = Object.keys(channels)
        if(result.length){
        setAllSubChannels(channels)
        setCurrentCh(result[0])
        }
      })
      .catch(console.log)
  }
  // function helper to emit event by socket
  const sendMessage = () =>{
      socket.emit('sendMessage',{user:username,message:textMsg,room:currentCh},()=>{
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
  }

  // open Modal
  const openModal = () =>{
    setChatModal(true)
  }

  // user find submit for handler
  const handleSubmitUser = (e) =>{
      e.preventDefault()
      setMemberSelected(prev => [...prev,inputUserField])
      setInputUserField('')
  }

  // remove user from group list previous creation
  const deleteMember = (person) =>{
    setMemberSelected(prev => prev.filter(mb => mb !== person))
  }
  /* -------- () -------- */
  return (
    <>
      <ChatSideBar openModal={openModal} channels={allSubChannels} id={id}/>
      <ChatBox 
        username={username} sendMessage={sendMessage} messages={messages}
        textMsg={textMsg} setTextMsg={setTextMsg}
      />
      {chatModal &&
        <Modal confirm cancel onConfirm={onConfirm} onCancel={onCancel} title='Create New Chat'>
          <FormContent  handleSubmitUser={handleSubmitUser}
          inputUserField={inputUserField} setInputUserField={setInputUserField} 
          memberSelected={memberSelected} setMemberSelected={setMemberSelected} deleteMember={deleteMember}/>
        </Modal>
      }
    </>
  );
}

export default Chat;