import React from 'react';
import { createPortal } from 'react-dom';
import Toast from './Toast';

const ToastContainer = ({ toasts, removeToast, position = 'b' }) => {
  if (typeof document === 'undefined') return null;
  
  // Define position styles
  const getPositionClasses = () => {
    switch (position) {
      case 'tl': // top-left
        return 'top-4 left-4';
      case 't': // top-center
        return 'top-4 left-1/2 -translate-x-1/2';
      case 'tr': // top-right
        return 'top-4 right-4';
      case 'bl': // bottom-left
        return 'bottom-4 left-4';
      case 'b': // bottom-center
        return 'bottom-4 left-1/2 -translate-x-1/2';
      case 'br': // bottom-right
        return 'bottom-4 right-4';
      default:
        return 'top-4 right-4';
    }
  };
  
  return createPortal(
    <div className={`fixed z-50 flex flex-col ${getPositionClasses()}`}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
          duration={toast.duration}
        />
      ))}
    </div>,
    document.body
  );
};

export default ToastContainer;