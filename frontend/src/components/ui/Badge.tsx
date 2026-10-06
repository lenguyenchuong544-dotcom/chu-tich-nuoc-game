import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'peony' | 'sky' | 'correct' | 'wrong' | 'highlight' | 'neutral';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className = '',
  variant = 'neutral',
  size = 'md',
  icon,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center font-bold tracking-wider uppercase select-none rounded-full transition-colors';

  const variants = {
    peony:
      'bg-peony-50 border border-peony-200 text-peony-700 shadow-sm',
    sky:
      'bg-sky-50 border border-sky-border text-cornflower-700 shadow-sm',
    correct:
      'bg-correct-surface border border-correct-border text-correct-text shadow-sm',
    wrong:
      'bg-wrong-surface border border-wrong-border text-wrong-text shadow-sm',
    highlight:
      'bg-highlight-surface border border-highlight-border text-highlight-text shadow-sm',
    neutral:
      'bg-white/90 border border-ink-border text-ink-muted shadow-sm',
  };

  const sizes = {
    sm: 'text-xs px-2.5 py-0.5 gap-1.5',
    md: 'text-xs sm:text-sm px-3.5 py-1 gap-2 font-bold',
  };

  return (
    <span
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
