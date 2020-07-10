import React from 'react'

const Message = ({user, message}) => {


    return (
        <div className="message_box">
            <div className="message_sender">{user ? user : 'Unknow'}:</div>
            <div className="message_content">{message}</div>
        </div>
    )
}

export default Message