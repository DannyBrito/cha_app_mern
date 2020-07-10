import React from 'react'

const Message = ({sender, message, user}) => {
    
    const messageOwner = () =>{
        return (user !== sender)? "message_box" : " message_box own_message"
    }

    return (
        <div className={`${messageOwner()}`}>
            <div className="message_sender">{sender ? sender : 'Unknow'}:</div>
            <div className="message_content">{message}</div>
        </div>
    )
}

export default Message