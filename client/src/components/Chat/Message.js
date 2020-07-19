import React,{useState,useEffect} from 'react'
import ReactEmoji from 'react-emoji'
const Message = ({sender, message, user}) => {

    const [ownership,setOwnership] = useState(false)
    
    useEffect(()=>{
        if(sender._id === user.id) setOwnership(true)
    },[sender,user])

    const setClassNameBasedOwnership = (base,owner) =>{
        return ownership ? `${base} ${owner}` : base
    }

    return (
        <div className={setClassNameBasedOwnership('message_box','own_message')}>
            <div className="message_sender">{sender.username}:</div>
            <div className={setClassNameBasedOwnership('message_content','blue_bbl')}>{ReactEmoji.emojify(message)}</div>
        </div>
    )
}

export default Message