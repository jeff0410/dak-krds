import type * as React from 'react';

export type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'teriary'
  | 'text'
  | 'gray'
  | 'danger'
  | 'danger-secondary'
  | 'black'
  | 'success'
  | 'success-secondary'
  | 'warning'
  | 'outline'
  | 'transparent'
  | 'custom';

export type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  label?: string;
  variant?: ButtonColor;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: string | number;
  padding?: string | number;
  borderColor?: string;
  useIcon?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  iconClassName?: string;
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  color?: string;

  // 로딩 관련 새로운 props
  loading?: boolean;
  loadingText?: string;
  spinnerSize?: number;

  // 기타 HTML button 속성들
  [key: string]: any;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
