import type { ReactNode } from 'react';
import type { IconType } from '../Icon/Icon';

export type AlertVariant = 'danger' | 'warning' | 'success' | 'information' | 'secondary';

export type IconName = IconType;

export type AlertProps = {
  variant: AlertVariant;
  icon?: AlertVariant;
  title?: ReactNode;
  description?: ReactNode;
  className?: string;
  isFullWidth?: boolean;
};
