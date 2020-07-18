import React, {useState} from 'react';
import { logIn } from '../helpers/Constants';
import FormBase from '../components/FormBase';

const LogIn = ({loggedIn}) => {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
      logIn({username,password})
        .then(({token,user}) =>{
          localStorage.setItem('token',token)
          loggedIn(user.username,user._id)
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
      setPassword={setPassword} />
    </>
  );
}

export default LogIn;