import React from 'react'

const ChatSideBar = ({currentCh,changeCurrentChat, channels,id,openModal}) =>{
    
    const selectedChat = id =>{
        const base = "group_box_sidebar "
        return (id === currentCh) ? base + "selected_chat" : base
    }
    
    const renderSideBar = () =>{
        return Object.keys(channels).map(key =>
            <div onClick={()=>changeCurrentChat(key)} className={`${selectedChat(key)}`} key={key}>
                <div className="group_box_members">
                {channels[key].filter(({user})=>user._id !== id).reduce((acc,{user}) => acc + ' ' + user.username,'')}:
                </div>
                <div className="group_box_new_msg">
                    This is just a boilerPlate for now 
                </div>
            </div>
        )
    }
    return(
        <div className="sidebarChat">
            <div className='sidebarChat_header'>
                <button className="sidebarChat_btn" onClick={openModal}> <img className="sidebarChat_btn"src="/plus_icon.png"/> </button>
            </div>
            <div className='msgBox'>
                {renderSideBar()}
            </div>
        </div>
    )
}

export default ChatSideBar