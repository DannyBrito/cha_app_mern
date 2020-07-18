import React,{useState} from 'react'
import {createChannel,fetchUserIDbyUsername} from '../helpers/Constants'
import Modal from './Modal/Modal'
import FormContent from './Modal/FormContent'
const NewChatModal = ({id,setChatModal,handleCreatedChannel,createUserNoFoundAlert}) =>{

    const [inputUserField, setInputUserField] = useState('')
    const [memberSelected, setMemberSelected] = useState([])

    const resetModal = () =>{
        setInputUserField('')
        setMemberSelected([])
    }

    // when confirmed
    const onConfirm = () =>{
        const userIds = [...memberSelected.map(mb => mb._id)]
        createChannel({creator:id,users:userIds})
        .then(() => {
            resetModal()
            handleCreatedChannel(userIds)
        })
        .catch(console.log)
    }

    const onCancel = () =>{
        resetModal()
        setChatModal(false)
    }

    // remove user from group list previous creation
    const deleteMember = (id) =>{
        setMemberSelected(prev => [...prev.filter(mb => mb._id !== id)])
    }

    // user find submit for handler
    const handleSubmitedUser = (event) =>{
        event.preventDefault()
        fetchUserIDbyUsername(inputUserField)
        .then(user => {
        setMemberSelected(prev => [...prev,user])
        setInputUserField('')
        })
        .catch(() =>{
            createUserNoFoundAlert(inputUserField)

        setInputUserField('')
    })
  }

    return(
    <Modal confirm cancel onConfirm={onConfirm} onCancel={onCancel} title='Create New Chat'>
        <FormContent  handleSubmitedUser={handleSubmitedUser}
        inputUserField={inputUserField} setInputUserField={setInputUserField} 
        memberSelected={memberSelected} deleteMember={deleteMember}/>
    </Modal>
  )
}

export default NewChatModal