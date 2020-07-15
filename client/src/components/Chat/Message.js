import React,{useState,useEffect} from 'react'
import ReactEmoji from 'react-emoji'
const Message = ({sender, message, user}) => {

    const [ownership,setOwnership] = useState(false)
    
    useEffect(()=>{
        if(sender.id === user) setOwnership(true)
    },[sender,user])

    const messageOwner = (base,owner) =>{
        return ownership ? base + ' ' + owner : base
    }

    return (
        <div className={`${messageOwner('message_box','own_message')}`}>
            <div className="message_sender">{sender ? sender.username : 'Unknow'}:</div>
            <div className={`${messageOwner('message_content','blue_bbl')}`}>{ReactEmoji.emojify(message)}</div>
        </div>
    )
}

export default Message