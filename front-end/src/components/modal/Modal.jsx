import React from 'react';
import '../styles/Modal.css';
import CreateUser from '../../dashboard/UserManagement/CreateUser/CreateUser';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="modal-content">{children}</div>
      </div>
    </>
  );
};

export default Modal;
