import type React from 'react';
import type { ComponentPropsWithoutRef, ElementType } from 'react';

export type LabelSize = 'l' | 'm' | 's' | 'xs';
export type LabelWeight = 'regular' | 'bold';

export type LabelProps<E extends ElementType> = {
  id?: string;
  size?: LabelSize;
  weight?: LabelWeight;
  children?: React.ReactNode;
  className?: string;
  required?: boolean;
  as?: E;
  label?: string | React.ReactNode;
} & ComponentPropsWithoutRef<E>;
