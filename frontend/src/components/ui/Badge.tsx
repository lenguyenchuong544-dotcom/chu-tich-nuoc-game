import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'blush' | 'sky' | 'mint' | 'coral' | 'honey' | 'neutral';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'blush',
  size = 'md',
  className = '',
  ...props
}) => {
  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
  };

  const variantStyles = {
    blush: 'bg-blush text-peony-700 border border-blush-deep font-bold',
    sky: 'bg-sky text-cornflower-700 border border-sky-deep font-bold',
    mint: 'bg-correct-surface text-correct-text border border-correct/40 font-bold',
    coral: 'bg-wrong-surface text-wrong-text border border-wrong/40 font-bold',
    honey: 'bg-highlight-surface text-highlight-text border border-highlight/50 font-bold',
    neutral: 'bg-cotton text-ink-muted border border-ink/10 font-medium',
  };

  return (
    <span
      className={`inline-flex items-center rounded-pill tracking-wide uppercase ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
