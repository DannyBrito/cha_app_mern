import React, {useState} from 'react';
import {BASE_URL} from '../helpers/Constants'
import FormBase from '../components/FormBase';

const SignUp = (props) => {
    
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')

    const handleSubmit = (e) => {
      e.preventDefault()
      fetch(BASE_URL + '/auth/signup',{
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
        title="Sign Up"
        link="/"
        msg_link="Log In?"
        username={username}
        password={password}
        handleSubmit={handleSubmit}
        setUsername={setUsername}
        setPassword={setPassword}
  
        />
      </>
    );
}

export default SignUp;