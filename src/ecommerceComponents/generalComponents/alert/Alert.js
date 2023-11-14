import React from 'react'
import './alert.css'
export default function Alert({ alertMessage, onOk }) {
    return (
        <>
            <div className='overlay' onClick={onOk}>
                <div className="alert-confirmation-modal">
                    <p>{alertMessage}</p>
                    <button onClick={onOk}>Ok</button>
                </div>
            </div>
        </>
    )
}
