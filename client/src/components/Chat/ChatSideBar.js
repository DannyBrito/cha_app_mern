import React from 'react'

const ChatSideBar = ({channels,id}) =>{
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
            {renderSideBar()}
            {renderSideBar()}
            {renderSideBar()}
            {renderSideBar()}
        </div>
    )
}

export default ChatSideBar