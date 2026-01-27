import type { ReactNode } from 'react';

export type TooltipPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'right-top'
  | 'right-center'
  | 'right-bottom'
  | 'left-top'
  | 'left-center'
  | 'left-bottom';

export interface HoverTooltipProps {
  children: ReactNode;
  text: ReactNode;
  position?: TooltipPosition;
  maxWidth?: number;
  zIndex?: number;
  triggerTitle?: string;
}
