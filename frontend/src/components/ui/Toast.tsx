'use client';

import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastProps {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  message?: string;
  duration?: number;
  onClose: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({
  id,
  type = 'info',
  title,
  message,
  duration = 4000,
  onClose,
}) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => onClose(id), duration);
      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  const typeConfig = {
    success: {
      icon: <CheckCircle2 className="w-5 h-5 text-correct" />,
      border: 'border-correct-border',
      bg: 'bg-correct-surface/95',
      titleColor: 'text-correct-text',
    },
    error: {
      icon: <AlertCircle className="w-5 h-5 text-wrong" />,
      border: 'border-wrong-border',
      bg: 'bg-wrong-surface/95',
      titleColor: 'text-wrong-text',
    },
    info: {
      icon: <Info className="w-5 h-5 text-cornflower-700" />,
      border: 'border-sky-border',
      bg: 'bg-sky-subtle/95',
      titleColor: 'text-cornflower-700',
    },
  };

  const current = typeConfig[type];

  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex items-start gap-3 p-3.5 rounded-xl border ${current.border} ${current.bg} shadow-pastel-card backdrop-blur-md max-w-sm w-full transition-all duration-300 animate-fade-in`}
    >
      <span className="shrink-0 mt-0.5">{current.icon}</span>
      <div className="flex-1 text-left">
        <h4 className={`text-xs font-bold ${current.titleColor}`}>{title}</h4>
        {message && <p className="text-[11px] text-ink-muted mt-0.5 leading-snug">{message}</p>}
      </div>
      <button
        onClick={() => onClose(id)}
        className="p-1 rounded-md text-ink-faint hover:text-ink hover:bg-black/5 transition-colors"
        aria-label="Đóng thông báo"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export const ToastContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:top-6 sm:bottom-auto sm:translate-x-0 z-50 flex flex-col gap-2 pointer-events-none items-center sm:items-end">
      <div className="pointer-events-auto flex flex-col gap-2 w-full max-w-sm">
        {children}
      </div>
    </div>
  );
};
