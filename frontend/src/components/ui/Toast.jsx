import React from 'react';
import { Toaster, toast as sonnerToast } from 'sonner';

// Toast utility functions mapped to sonner
export const showToast = {
  success: (message, options = {}) => {
    sonnerToast.success(message, options);
  },
  
  error: (message, options = {}) => {
    sonnerToast.error(message, options);
  },
  
  warning: (message, options = {}) => {
    sonnerToast.warning(message, options);
  },
  
  info: (message, options = {}) => {
    sonnerToast.info(message, options);
  },
  
  custom: (message, options = {}) => {
    sonnerToast(message, options);
  }
};

// Toast Container Component
const Toast = () => {
  return (
    <Toaster
      position="top-right"
      richColors
      closeButton
      theme="system"
      toastOptions={{
        className: 'font-sans',
      }}
    />
  );
};

export default Toast;