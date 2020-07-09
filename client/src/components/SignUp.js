import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {BASE_URL} from '../helpers/fetch-helpers'

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
        .catch(console.log)
    }

  return (
    <div className="formcontainer">
        <form className="form" onSubmit={handleSubmit}>
          <div className="titleForm">
              Sign Up
          </div>
          <label htmlFor="Username"> Username: </label>
          <input required className="input" value={username} onChange={e=>setUsername(e.target.value)} type="text" />
          <label htmlFor="Password"> Password: </label>
          <input className="input" required value={password} onChange={e=>setPassword(e.target.value)} type="password" />
          <div className="i">
              <Link to="/">
                Login! 
              </Link>
          </div>
          <input className="input subtn" type="submit" />
        </form>
    </div>
  );
}

export default SignUp;