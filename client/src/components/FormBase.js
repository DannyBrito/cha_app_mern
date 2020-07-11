import React from 'react';
import { Link } from 'react-router-dom';

const FormBase = ({title,username,password,handleSubmit,setUsername,setPassword,link,msg_link}) => {

    return (
    <div className="formcontainer">
        <form className="form" onSubmit={handleSubmit}>
          <div className="titleForm">
              {title}
          </div>
          <label htmlFor="Username"> Username: </label>
          <input className="input" value={username} onChange={e=>setUsername(e.target.value)} type="text" />
          <label htmlFor="Password"> Password: </label>
          <input className="input" value={password} onChange={e=>setPassword(e.target.value)} type="password" />
          <div className="i">
              <Link to={link}>
                {msg_link}
              </Link>
          </div>
          <input className="input subtn" type="submit" />
        </form>
    </div>
  );
}

export default FormBase;