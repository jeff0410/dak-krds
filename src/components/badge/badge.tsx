import React from 'react';
import './badge.css';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
}

export function Badge({
  variant = 'primary',
  size = 'medium',
  className = '',
  children,
  ...props
}: BadgeProps) {
  const classNames = [
    'dak-badge',
    `dak-badge--${variant}`,
    `dak-badge--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classNames} {...props}>
      {children}
    </span>
  );
}
