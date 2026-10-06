import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'dossier' | 'surface' | 'flat' | 'tinted';
  radius?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      className = '',
      variant = 'surface',
      radius = 'xl',
      ...props
    },
    ref
  ) => {
    const radiuses = {
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      '2xl': 'rounded-2xl',
      '3xl': 'rounded-3xl',
    };

    const variants = {
      surface:
        'bg-white/95 border border-blush-border/70 shadow-pastel-card backdrop-blur-sm',
      dossier:
        'bg-white/95 border-2 border-blush-border shadow-dossier backdrop-blur-md',
      flat:
        'bg-blush-subtle/80 border border-blush-border/60 shadow-sm',
      tinted:
        'bg-sky-subtle/80 border border-sky-border/60 shadow-sm',
    };

    return (
      <div
        ref={ref}
        className={`${radiuses[radius]} ${variants[variant]} transition-all duration-200 ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
