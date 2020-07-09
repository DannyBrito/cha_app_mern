import React, {useState, useEffect} from 'react';
import { Route } from "react-router-dom";
import {useHistory} from 'react-router';
import './App.css';
import Chat from './components/Chat'
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import { BASE_URL } from './helpers/fetch-helpers';

const App = () => {

  const [username,setUsername] = useState('')
  const [id,setId] = useState('')
  const History = useHistory()

  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(token){
      fetch(BASE_URL + '/auth/auto_login',{
        method:'GET',
        headers:{
          'Content-Type': 'application/json',
          Accept:'application/json',
          Authorization:'Bearer ' + token
        }
      })
      .then(res => res.json())
      .then(({_id,username}) => {
        setId(_id)
        setUsername(username)
      })
    }
  },[])

  const loggedIn = (username, id) =>{
      setId(id)
      setUsername(username)
      History.push('/chat')
  }
  return (
    <div className="App">
      <div className="Navbar">
          Hello
      </div>
      <div id="maincontainer">
      <Route path="/" exact render={() => <LogIn loggedIn={loggedIn} />} />
      <Route path="/signup" exact render={() =><SignUp loggedIn={loggedIn} />}/>
      <Route path="/chat" render={()=> <Chat id={id} username={username} />} />
      </div>
    </div>
  );
}

export default App;