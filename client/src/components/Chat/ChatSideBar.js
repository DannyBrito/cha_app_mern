import React from 'react'
import ReactEmoji from 'react-emoji'

const ChatSideBar = ({latestMessagePerChat,currentCh,changeCurrentChat, channels,id,openModal}) =>{
    

    const setClassNamesforChat = id =>{
        const base = "group_box_sidebar"
        return (id === currentCh) ? base + " selected_chat" : base
    }

    const authorFromLastestMessage = channel =>{
        const message = latestMessagePerChat[channel]
        if(!message) return "Start by sending a new message!"
        return `${message.author._id === id? 'You':message.author.username}:`
    }

    const renderChatsOnSideBar = () =>{
        return Object.keys(channels).map(key =>
            <div onClick={()=>changeCurrentChat(key)} className={`${setClassNamesforChat(key)}`} key={key}>
                <div className="group_box_members">
                {channels[key].filter(({user})=>user._id !== id).reduce((acc,{user}) => acc + ' ' + user.username,'')}:
                </div>
                <div className="group_box_new_msg">
                    {authorFromLastestMessage(key)} {latestMessagePerChat[key] && ReactEmoji.emojify(latestMessagePerChat[key].message)}
                </div>
            </div>
        )
    }

    return(
        <div className="sidebarChat">
            <div className='sidebarChat_header'>
                <button className="sidebarChat_btn" onClick={openModal}> 
                    <img className="sidebarChat_btn"src="/plus_icon.png" alt=''/> 
                </button>
            </div>
            <div className='msgBox'>
                {renderChatsOnSideBar()}
            </div>
        </div>
    )
}

export default ChatSideBar