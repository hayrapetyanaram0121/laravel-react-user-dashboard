import React, { useEffect, useState } from 'react';
import '../../../css/message-alert.css';

const MessageAlert = ({ title, text, isOpen, onClose, timeout = 5 }) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    setIsVisible(isOpen);

    if (isOpen) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, timeout * 1000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return isVisible ? (
    <div className="message-alert">
      <div className="message-title">{title}</div>
      <span className="message-text">{text}</span>
    </div>
  ) : null;
};

export default MessageAlert;
