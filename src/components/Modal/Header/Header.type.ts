import type { ReactNode } from 'react';
import type { IconType } from '../../Icon';

export interface ModalHeaderProps {
  title: ReactNode;
  onClose?: VoidFunction;
  icon?: IconType;
  extra?: ReactNode;
}

export interface ModalLargeHeaderProps extends ModalHeaderProps {
  subTitle?: ReactNode;
}
