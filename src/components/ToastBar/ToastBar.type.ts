import type { CSSProperties, ReactNode } from 'react';

export interface ToastBarProps {
  text: ReactNode;
  title?: string;
  id: string;
  icon?: ReactNode;
  closeDelay?: number;
  autoCloseTimestamp?: number;
  style?: CSSProperties;
  type: 'danger' | 'succeed' | 'warning' | 'info';
  removeInvisibleToastBar?: () => void;
}

export declare type ToastBarEventListenerType =
  | '[toastbar] show dangerMsg'
  | '[toastbar] show succeedMsg'
  | '[toastbar] show warningMsg'
  | '[toastbar] show infoMsg'
  | '[toastbar] close Toast'
  | '[loadingToastbar] show loading toast'
  | '[loadingToastbar] close all loading toast'
  | '[toastbar] close all toast';
