import React, {useState, useEffect} from 'react';
import { Route } from "react-router-dom";
import {useHistory} from 'react-router';
import './App.css';
import io from "socket.io-client"
import Chat from './containers/Chat'
import SignUp from './containers/SignUp';
import LogIn from './containers/LogIn';
import Navbar from './containers/Navbar'
import {BASE_URL_SOCKET, confirmTokenValidationForLogin } from './helpers/Constants';


const socket = io(BASE_URL_SOCKET);

const App = () => {

  const [username,setUsername] = useState('')
  const [id,setId] = useState('')
  const History = useHistory()

  useEffect(()=>{
    autoLogin()
  }
  ,[])

  const autoLogin = () =>{
    const token = localStorage.getItem('token')
    if(!token) return
    confirmTokenValidationForLogin(token)
      .then(({_id,username}) => loggedIn(username,_id))
  }

  const loggedIn = (username, id) =>{
      setId(id)
      setUsername(username)
      History.push('/chat')
  }
  
  return (
    <div className="App">
      {/* < Navbar username={username} /> */}
      <div id="maincontainer">
        <Route path="/" exact render={() => <LogIn loggedIn={loggedIn} />} />
        <Route path="/signup" exact render={() =><SignUp loggedIn={loggedIn} />}/>
        <Route path="/chat" render={()=> <Chat socket={socket} id={id} username={username} />} />
      </div>
    </div>
  );
}

export default App;