import React, {useState} from 'react';
import {signUp} from '../helpers/Constants'
import FormBase from '../components/FormBase';

const SignUp = ({loggedIn}) => {
    
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')

    const handleSubmit = (e) => {
      e.preventDefault()
        signUp({username,password})
          .then(({token,user}) =>{
            localStorage.setItem('token',token)
            loggedIn(user.username,user._id)
          })
          .catch(window.alert)
    }

    return (
      <> 
        <FormBase 
        title="Sign Up"
        link="/"
        msg_link=" Log In."
        username={username}
        password={password}
        handleSubmit={handleSubmit}
        setUsername={setUsername}
        setPassword={setPassword} 
        msg_account={"Have an account?"}/>
      </>
    );
}

export default SignUp;