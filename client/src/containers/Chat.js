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

  const [inputUserField, setInputUserField] = useState('')
  const [memberSelected, setMemberSelected] = useState([])
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

  const handleSubmitUser = (e) =>{
      e.preventDefault()
      setMemberSelected(prev => [...prev,inputUserField])
      setInputUserField('')
  }
 
  return (
    <>
      <ChatSideBar openModal={openModal} channels={allSubChannels} id={id}/>
      <ChatBox 
        username={username} sendMessage={sendMessage} messages={messages}
        textMsg={textMsg} setTextMsg={setTextMsg}
      />
      {chatModal &&
        <Modal confirm cancel onConfirm={onConfirm} onCancel={onCancel} title='Create New Chat'>
          <form className='userSearch_form' onSubmit={handleSubmitUser}> 
            <label htmlFor="user" className="userSearch_text"> Add a user:</label>
            <input placeholder="Search for User" value={inputUserField} onChange={(e)=>setInputUserField(e.target.value)}
            className="userSearch_ipt"/>
            <input type="submit" className="userSearch_button" value="Add User"/>
          </form>
          <div className="group_users_selected">
              {memberSelected.map(mb => <div className="user_box"> {mb} </div>)}
          </div>
        </Modal>
      }
    </>
  );
}

export default Chat;