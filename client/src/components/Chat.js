import React,{useState, useEffect} from 'react';

const Chat = ({username,socket}) => {
  const [messages,setMessages] =useState([])
  const [textMsg,setTextMsg] = useState('')

  useEffect(()=>{
    console.log(socket)
    socket.on('message', message =>{
      setMessages(messages => [...messages,message])
    })
  },[])
  const onEnter = e =>{
    if(e.charCode === 13 && textMsg && textMsg !== ''){
      socket.emit('sendMessage',{user:username,message:textMsg},()=>{
        setTextMsg('')
      })
    }
  }

  const onSubmit = e =>{
      socket.emit('sendMessage',{user:username,message:textMsg},()=>{
      setTextMsg('')
    })
  }
  return (
    <>
    <div className="feedContainer">
        {username}
    </div>
    <div className="chatbox">
        <div className="msgBox">
          {messages.map(msg => (<div className="message">{msg.user}: {msg.message}</div>))}
        </div>
        <input placeholder="Type a message..." value={textMsg} onKeyPress={onEnter} onChange={e=>setTextMsg(e.target.value)} type="text" className="typingBox" />
        <button onClick={onSubmit}>send</button>
    </div>
    </>
  );
}

export default Chat;