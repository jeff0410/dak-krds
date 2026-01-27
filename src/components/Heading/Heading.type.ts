import type * as React from 'react';

export type HeadingProps = {
  size?: 1 | 2 | 3 | 4 | 5;
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLElement>;
