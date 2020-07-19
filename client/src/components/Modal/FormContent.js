import React from 'react'

const FormContent = ({handleSubmitedUser,inputUserField,setInputUserField,memberSelected,deleteMember}) =>{


    return(
        <>
            <form className='userSearch_form' onSubmit={handleSubmitedUser}> 
                <label htmlFor="user" className="userSearch_text"> Add a user: </label>
                <input placeholder="Search for User" value={inputUserField} onChange={(e)=>setInputUserField(e.target.value)}
                className="userSearch_ipt"/>
                <input type="submit" className="userSearch_button" value="Add User"/>
            </form>
            <div className="group_users_selected">
                {memberSelected.map(({_id,username}) =>
                <div key={_id} className="user_box"> {username} 
                    <div onClick={()=> deleteMember(_id)} className="closeIcon" >
                        <img src="/close-icon.png" alt="" />
                    </div>
                </div>
                )}
            </div>
      </>
    )

}

export default FormContent