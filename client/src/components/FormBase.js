import React from 'react';
import { Link } from 'react-router-dom';

const FormBase = ({msg_account,title,username,password,handleSubmit,setUsername,setPassword,link,msg_link}) => {

    return (
    <div className="formcontainer">
        <form className="form" onSubmit={handleSubmit}>
          <div className="titleForm">
              {title}
          </div>
          <label htmlFor="Username"> Username: </label>
          <input className="input" placeholder="Enter your username." value={username} onChange={e=>setUsername(e.target.value)} type="text" />
          <label htmlFor="Password"> Password: </label>
          <input className="input"  placeholder="Enter your password."value={password} onChange={e=>setPassword(e.target.value)} type="password" />
          <div className="i">
              {msg_account} <Link className="link" to={link}>
                {msg_link}
              </Link>
          </div>
          <input className="input subtn" type="submit" />
        </form>
    </div>
  );
}

export default FormBase;