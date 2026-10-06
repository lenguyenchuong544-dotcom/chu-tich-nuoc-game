import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'cotton' | 'blush' | 'sky' | 'crisis';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'cotton',
  className = '',
  ...props
}) => {
  const variantStyles = {
    cotton: 'bg-cotton border-2 border-blush-deep/60 shadow-dossier',
    blush: 'bg-blush-surface border-2 border-blush-deep shadow-dossier',
    sky: 'bg-sky-surface border-2 border-sky-deep shadow-dossier',
    crisis: 'bg-wrong-surface border-2 border-wrong/60 shadow-dossier-crisis',
  };

  return (
    <div
      className={`rounded-xl p-4 sm:p-6 transition-all duration-200 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
