import type { ReactNode } from 'react';

export type AlertVariant = 'danger' | 'warning' | 'success' | 'information' | 'secondary';

export type IconName = 'SystemDanger' | 'SystemWarning' | 'SystemSuccess' | 'SystemInfo';

export type AlertProps = {
  variant: AlertVariant;
  icon?: AlertVariant;
  title?: ReactNode;
  description?: ReactNode;
  className?: string;
  isFullWidth?: boolean;
};
