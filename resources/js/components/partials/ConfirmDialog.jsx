import React, { useState } from 'react';
import '../../../css/confirm-dialog.css'; // Import your CSS file for styling if needed

const ConfirmDialog = ({ isOpen, message, onCancel, onConfirm }) => {
  return (
    isOpen && <div className="confirm-dialog-container">
      <div className="confirm-dialog">
        <p>{message}</p>
        <div className="button-container">
          <button className="button-primary cancel-button" onClick={onCancel}>
            Cancel
          </button>
          <button className="button-primary confirm-button" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;