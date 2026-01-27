import type * as React from 'react';

export type DisplayProps<E extends React.ElementType> = {
  size?: 'l' | 'm' | 's';
  color?: string;
  children: React.ReactNode;
  className?: string;
} & React.ComponentPropsWithoutRef<E>;
