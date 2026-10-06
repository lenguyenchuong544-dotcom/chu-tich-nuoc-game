'use client';

import React from 'react';

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  leftIcon,
  rightIcon,
  className = '',
}) => {
  return (
    <label
      className={`inline-flex items-center gap-2.5 cursor-pointer select-none text-xs font-semibold text-ink ${
        disabled ? 'opacity-50 pointer-events-none' : ''
      } ${className}`}
    >
      {leftIcon && <span className="text-ink-muted">{leftIcon}</span>}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-peony-500 focus-visible:ring-offset-2 ${
          checked ? 'bg-peony-500 shadow-pastel-pink' : 'bg-blush border-blush-border'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition duration-200 ease-in-out ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
      {rightIcon && <span className="text-ink-muted">{rightIcon}</span>}
      {label && <span>{label}</span>}
    </label>
  );
};
