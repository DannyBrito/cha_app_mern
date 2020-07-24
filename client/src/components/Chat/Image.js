import React,{useState,useEffect} from 'react'

const Image = ({src,user,sender}) =>{

    const [ownership,setOwnership] = useState(false)
    
    useEffect(()=>{
        if(sender === user.id) setOwnership(true)
    },[sender,user])

    const setClassNameBasedOwnership = (base,owner) =>{
        return ownership ? `${base} ${owner}` : base
    }

    return (
        <div className={setClassNameBasedOwnership('message_box','own_message')}>
            <div className={setClassNameBasedOwnership('message_content','blue_bbl')}>
                <img src={src} style={{height:'300px',width:'300px'}} />
            </div>
        </div>
    )
}

export default Image