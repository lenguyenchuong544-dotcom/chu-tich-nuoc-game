import React from 'react';

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  icon?: React.ReactNode;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  icon,
}) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-pill text-xs font-bold transition-all border ${
        checked
          ? 'bg-blush text-peony-700 border-peony/50 shadow-tactile'
          : 'bg-cotton text-ink-muted border-ink/10 hover:border-ink/20'
      }`}
    >
      {icon}
      {label ? <span>{label}</span> : null}
      <span
        className={`w-3.5 h-3.5 rounded-full transition-transform ${
          checked ? 'bg-peony translate-x-0.5' : 'bg-ink-subtle'
        }`}
      />
    </button>
  );
};
