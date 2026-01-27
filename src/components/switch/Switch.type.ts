import type React from 'react';

export type SwitchProps = {
  id?: string;
  status: boolean;
  onChange: (checked: boolean) => void;
  size?: 'm' | 'l';
  label?: React.ReactNode;
  labelPosition?: 'left' | 'right';
  disabled?: boolean;
  useIcon?: boolean;
  checkedIcon?: React.ReactNode;
  uncheckedIcon?: React.ReactNode;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  barWidth?: number;
  barHeight?: number;
  thumbSize?: number;
  labelSize?: 's' | 'm' | 'l';
  labelWeight?: 'regular' | 'bold';
  isLabelClickable?: boolean;
};

export type SwitchLabelProps = {
  label: React.ReactNode;
  position: 'left' | 'right';
  size?: 's' | 'm' | 'l';
  weight?: 'regular' | 'bold';
  className?: string;
  isClickable?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  htmlFor?: string;
};

export type SwitchTrackProps = {
  id: string;
  label?: string;
  status: boolean;
  disabled: boolean;
  onChange: (checked: boolean) => void;
  size: 'm' | 'l';
  useIcon: boolean;
  checkedIcon?: React.ReactNode;
  uncheckedIcon?: React.ReactNode;
  barWidth?: number;
  barHeight?: number;
  thumbSize?: number;
  inputClassName?: string;
};
