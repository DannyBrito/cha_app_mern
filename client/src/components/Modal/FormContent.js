import React from 'react'

const FormContent = ({handleSubmitUser,inputUserField,setInputUserField,memberSelected,deleteMember,setMemberSelected}) =>{


    return(
        <>
            <form className='userSearch_form' onSubmit={handleSubmitUser}> 
                <label htmlFor="user" className="userSearch_text"> Add a user: </label>
                <input placeholder="Search for User" value={inputUserField} onChange={(e)=>setInputUserField(e.target.value)}
                className="userSearch_ipt"/>
                <input type="submit" className="userSearch_button" value="Add User"/>
            </form>
            <div className="group_users_selected">
                {memberSelected.map(mb => <div className="user_box"> {mb} <div onClick={e => deleteMember(mb)} className="closeIcon" > <img src="/close-icon.png"/></div></div>)}
            </div>
      </>
    )

}

export default FormContent