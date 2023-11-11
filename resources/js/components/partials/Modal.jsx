import React from 'react';
import { FaWindowClose } from "react-icons/fa";
import '../../../css/modal.css';

const Modal = ({ isOpen, onClose, children }) => {
  return (
    isOpen && <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          <FaWindowClose/>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;