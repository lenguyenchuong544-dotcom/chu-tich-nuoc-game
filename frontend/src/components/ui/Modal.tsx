'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  maxWidth = 'md',
  showCloseButton = true,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidths = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/30 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`relative w-full ${maxWidths[maxWidth]} rounded-2xl bg-white/95 border-2 border-blush-border/80 shadow-dossier p-5 sm:p-6 text-left transform transition-all duration-300`}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-blush-border/50">
          <div>
            {title && (
              <h3 className="text-base sm:text-lg font-bold text-ink tracking-wide">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-ink-muted mt-0.5">{subtitle}</p>
            )}
          </div>
          {showCloseButton && onClose && (
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-ink-muted hover:text-ink hover:bg-blush-subtle transition-colors"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="py-4 text-ink text-xs sm:text-sm leading-relaxed">
          {children}
        </div>

        {/* Footer Actions */}
        {footer && (
          <div className="pt-3 border-t border-blush-border/50 flex items-center justify-end gap-2.5">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
