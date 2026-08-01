import React, { useState, useEffect } from 'react';

// Utility helper to trigger toasts from anywhere in the app
export const toast = {
  success: (message, title = 'Success') => {
    window.dispatchEvent(new CustomEvent('app_toast', { detail: { message, title, type: 'success' } }));
  },
  error: (message, title = 'Action Failed') => {
    window.dispatchEvent(new CustomEvent('app_toast', { detail: { message, title, type: 'error' } }));
  },
  info: (message, title = 'Notice') => {
    window.dispatchEvent(new CustomEvent('app_toast', { detail: { message, title, type: 'info' } }));
  },
  warning: (message, title = 'Warning') => {
    window.dispatchEvent(new CustomEvent('app_toast', { detail: { message, title, type: 'warning' } }));
  }
};

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handleToastEvent = (e) => {
      if (e.detail) {
        const newToast = {
          id: Date.now() + Math.random(),
          title: e.detail.title || 'Notification',
          message: e.detail.message || '',
          type: e.detail.type || 'info',
        };

        setToasts((prev) => [...prev, newToast]);

        // Auto remove toast after 4 seconds
        setTimeout(() => {
          removeToast(newToast.id);
        }, 4000);
      }
    };

    window.addEventListener('app_toast', handleToastEvent);
    return () => window.removeEventListener('app_toast', handleToastEvent);
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 max-w-sm w-full px-4 pointer-events-auto">
      {toasts.map((item) => {
        let borderColor = 'border-blue-500/40 bg-white';
        let iconName = 'info';
        let iconBg = 'bg-blue-100 text-blue-700';
        let titleColor = 'text-blue-900';

        if (item.type === 'success') {
          borderColor = 'border-emerald-500/40 bg-white';
          iconName = 'check_circle';
          iconBg = 'bg-emerald-100 text-emerald-700';
          titleColor = 'text-emerald-950';
        } else if (item.type === 'error') {
          borderColor = 'border-red-500/40 bg-white';
          iconName = 'error';
          iconBg = 'bg-red-100 text-red-700';
          titleColor = 'text-red-950';
        } else if (item.type === 'warning') {
          borderColor = 'border-amber-500/40 bg-white';
          iconName = 'warning';
          iconBg = 'bg-amber-100 text-amber-800';
          titleColor = 'text-amber-950';
        }

        return (
          <div
            key={item.id}
            className={`p-4 rounded-2xl shadow-2xl border ${borderColor} flex items-start gap-3.5 animate-in slide-in-from-bottom-5 duration-300 backdrop-blur-md relative overflow-hidden`}
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
              <span className="material-symbols-outlined text-[20px]">{iconName}</span>
            </div>
            <div className="flex-1 min-w-0 pr-4">
              <h4 className={`text-xs font-black uppercase tracking-wider ${titleColor}`}>
                {item.title}
              </h4>
              <p className="text-xs text-on-surface-variant font-medium mt-0.5 leading-relaxed">
                {item.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(item.id)}
              className="text-on-surface-variant/60 hover:text-on-surface p-1 rounded-lg transition-colors absolute top-2 right-2"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
