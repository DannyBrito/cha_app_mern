import React from 'react'
import Modal from './Modal/Modal'
import {useHistory} from 'react-router';

const NewChatModal = ({setLogOutModal}) =>{
    const History = useHistory()
    const onConfirm = () =>{
        localStorage.removeItem('token')
        History.push('/')
    }
    const onCancel = () => setLogOutModal(false)
    return <Modal confirm cancel onConfirm={onConfirm} onCancel={onCancel} title='Do you want to Log Out?' />
}

export default NewChatModal