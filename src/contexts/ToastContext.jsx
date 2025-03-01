"use client";
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import ToastContainer from '@/components/elements/ToastContainer';

const ToastContext = createContext(undefined);

export const ToastProvider = ({ children, defaultPosition = 'tl' }) => {
  const [toasts, setToasts] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState(defaultPosition);

  // Handle SSR
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const addToast = useCallback((message, options = {}) => {
    const { type = 'default', duration = 5000, position: toastPosition } = options;
    const id = Date.now().toString();
    
    if (toastPosition && toastPosition !== position) {
      setPosition(toastPosition);
    }
    
    setToasts((prevToasts) => [
      ...prevToasts,
      { id, message, type, duration },
    ]);
    
    return id;
  }, [position]);

  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  const contextValue = {
    addToast,
    removeToast,
    toasts,
    setPosition,
    position,
    success: (message, options = {}) => addToast(message, { ...options, type: 'success' }),
    error: (message, options = {}) => addToast(message, { ...options, type: 'error' }),
    warning: (message, options = {}) => addToast(message, { ...options, type: 'warning' }),
    info: (message, options = {}) => addToast(message, { ...options, type: 'info' }),
    kick: (message, options = {}) => addToast(message, { ...options, type: 'kick' }),
    twitch: (message, options = {}) => addToast(message, { ...options, type: 'twitch' }),
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {mounted && <ToastContainer toasts={toasts} removeToast={removeToast} position={position} />}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};