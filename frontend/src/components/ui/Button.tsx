import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'coral';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-bold transition-all duration-150 rounded-lg select-none outline-none focus-visible:ring-2 focus-visible:ring-peony focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:translate-y-[2px] active:shadow-tactile-pressed';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 min-h-[36px] gap-1.5',
    md: 'text-sm px-4 py-2.5 min-h-[44px] gap-2', // ≥ 44px mobile touch target
    lg: 'text-base px-6 py-3 min-h-[48px] gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-peony hover:bg-peony-hover text-white shadow-tactile border border-peony-700/20 active:bg-peony-700',
    secondary:
      'bg-sky hover:bg-sky-deep text-cornflower-700 shadow-tactile border border-sky-deep active:bg-sky-deep',
    outline:
      'bg-cotton hover:bg-blush-surface text-ink border-2 border-blush-deep shadow-tactile active:bg-blush',
    ghost:
      'bg-transparent hover:bg-blush-surface text-ink-muted hover:text-ink active:bg-blush',
    coral:
      'bg-wrong-surface hover:bg-wrong/20 text-wrong-text border border-wrong/40 shadow-tactile',
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : null}
      {children}
    </button>
  );
};
