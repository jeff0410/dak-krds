import type { HTMLAttributes, ReactNode } from 'react';

export type TooltipPlacement =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'left-top'
  | 'left-center'
  | 'left-bottom'
  | 'right-top'
  | 'right-center'
  | 'right-bottom';

export interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  content: ReactNode;
  placement?: TooltipPlacement;
  children: ReactNode;
  className?: string;
  showShadow?: boolean;
}
