import React from 'react'
import './Modal.css'
import BackSet from './BackSet'

const Modal = (props) =>(
    <>
    <BackSet />  
    <div className="Modal">
        <div className="modal_title">
            {props.title}
        </div>
        <div className="modal_content">

        </div>
        <div className="modal_controllers">
            {props.confirm && <button onClick={props.onConfirm} className="modal_btn"> Confirm</button>}
            {props.cancel && <button onClick={props.onCancel} className="modal_btn"> Cancel</button>}
        </div>
    </div>
    </>
)

export default Modal