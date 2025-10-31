'use client';
import { createContext, useContext, useState, useCallback } from 'react';
import Toast from './Toast';

const ToastContext = createContext(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'error') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type, isLeaving: false }]);
  }, []);

  const removeToast = useCallback((id) => {
    // Mark as leaving (slide right)
    setToasts((prev) =>
      prev.map((toast) =>
        toast.id === id ? { ...toast, isLeaving: true } : toast
      )
    );

    // Remove after animation completes
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 500);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div 
        className="toast-stack" 
        style={{ 
          position: 'fixed', 
          top: '100px', 
          right: '24px', 
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          pointerEvents: 'none'
        }}
      >
        {toasts.map((toast, index) => (
          <div 
            key={toast.id}
            style={{
              pointerEvents: 'auto',
              animation: toast.isLeaving 
                ? 'slideOutRight 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards' 
                : 'slideInRight 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
              transition: 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            }}
          >
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => removeToast(toast.id)}
            />
          </div>
        ))}
      </div>

      <style  global="true">{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @keyframes slideOutRight {
          0% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateX(150px) scale(0.8);
          }
        }
      `}</style>
    </ToastContext.Provider>
  );
}
