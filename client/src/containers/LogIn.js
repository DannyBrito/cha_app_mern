import React, {useState} from 'react';
import { BASE_URL } from '../helpers/Constants';
import FormBase from '../components/FormBase';

const LogIn = (props) => {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(BASE_URL + '/auth/login',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
        Accept:'application/json'
      },
      body: JSON.stringify({
        username,password
      })
    })
      .then(res=>res.json())
      .then(res =>{
        if(!res.token) throw res
        localStorage.setItem('token',res.token)
        props.loggedIn(res.user.username,res.user._id)
      })
      .catch(window.alert)
  }

  return (
    <> 
      <FormBase 
      title="Log In"
      link="/signup"
      msg_link="Sign Up!"
      username={username}
      password={password}
      handleSubmit={handleSubmit}
      setUsername={setUsername}
      setPassword={setPassword}

      />
    </>
  );
}

export default LogIn;