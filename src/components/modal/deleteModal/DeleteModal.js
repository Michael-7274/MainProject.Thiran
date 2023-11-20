import React from 'react'
import '../../../css/deleteModal.css'
export default function DeleteModal({ message, onConfirm, onCancel }) {
  return (
    <>
      <div className='overlay' onClick={onCancel}>
        <div className="delete-confirmation-modal">
          <p>{message}</p>
          <button id="confirm" onClick={onConfirm}>Confirm</button>
          <button id="cancel" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </>
  )
}

