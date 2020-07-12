import React from 'react'
import {useHistory} from 'react-router-dom'

const Navbar = (props) => {

    const History = useHistory()
    const logout = () =>{
        localStorage.removeItem('token')
        History.push('/')
    }

    return(
        <div className="Navbar">
        Welcome {props.username}

        <button onClick={logout} > Logout </button>
        </div>
    )
}

export default Navbar