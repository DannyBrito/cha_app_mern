import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom';

const ChatSideBar = ({channels,id,openModal}) =>{
    const renderSideBar = () =>{
        return Object.keys(channels).map(key =>
            <div className="group_box_sidebar" key={key}>
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
            {renderSideBar()}
            {renderSideBar()}
            {renderSideBar()}
            {renderSideBar()}
            {renderSideBar()}
            </div>
        </div>
    )
}

export default ChatSideBar