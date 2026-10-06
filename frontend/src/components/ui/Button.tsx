import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = '',
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      leftIcon,
      rightIcon,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-semibold transition-all duration-200 select-none outline-none focus-visible:ring-2 focus-visible:ring-peony-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:translate-y-[2px]';

    const variants = {
      primary:
        'bg-peony-500 hover:bg-peony-600 text-white shadow-pastel-pink border border-peony-600/30 active:shadow-tactile-pressed',
      secondary:
        'bg-sky text-cornflower-700 hover:bg-sky-surface border border-sky-border shadow-pastel-blue active:shadow-tactile-pressed',
      outline:
        'bg-white/90 hover:bg-blush-subtle text-ink border border-ink-border hover:border-peony-300 shadow-sm',
      ghost:
        'text-ink-muted hover:text-ink hover:bg-blush-subtle active:bg-blush',
      danger:
        'bg-wrong-surface hover:bg-wrong/20 text-wrong-text border border-wrong-border shadow-sm',
    };

    const sizes = {
      sm: 'text-xs sm:text-sm px-3.5 py-1.5 min-h-[38px] rounded-lg gap-2',
      md: 'text-sm sm:text-base px-5 py-2.5 min-h-[46px] rounded-xl gap-2 font-bold',
      lg: 'text-base sm:text-lg px-6 py-3 min-h-[52px] rounded-2xl gap-2.5 font-bold',
      icon: 'p-2 min-h-[44px] min-w-[44px] rounded-xl',
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" />
        ) : (
          <>
            {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
