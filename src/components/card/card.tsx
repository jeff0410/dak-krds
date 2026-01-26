import React from 'react';
import './card.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated';
  padding?: 'none' | 'small' | 'medium' | 'large';
  children: React.ReactNode;
}

export function Card({
  variant = 'default',
  padding = 'medium',
  className = '',
  children,
  ...props
}: CardProps) {
  const classNames = [
    'dak-card',
    `dak-card--${variant}`,
    `dak-card--padding-${padding}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
}
