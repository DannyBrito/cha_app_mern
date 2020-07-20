import React from 'react'
import './Modal.css'
import BackSet from './BackSet'

const Modal = ({children,title,onConfirm,onCancel}) =>(
    <>
        <BackSet />  
        <div className="Base_Modal">
            <div className="Modal">
                <div className="modal_title">
                    {title}
                </div>
                {children &&
                    <div className="modal_content">
                        {children}
                    </div>
                }
                <div className="modal_controllers">
                    {onConfirm && <button onClick={onConfirm} className="modal_btn"> Confirm</button>}
                    {onCancel && <button onClick={onCancel} className="modal_btn"> Cancel</button>}
                </div>
            </div>
        </div>
    </>
)

export default Modal