import type * as React from 'react';

export type LinkButtonProps<E extends React.ElementType> = {
  variant?: 'accent' | 'default';
  size?: 's' | 'm' | 'l';
  children: React.ReactNode;
  className?: string;
  href: string;
  title: string;
  useIcon?: boolean;
  icon?: React.ReactNode;
  iconColor?: string;
  iconClassName?: string;
} & React.ComponentPropsWithoutRef<E>;
