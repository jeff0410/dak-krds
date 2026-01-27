import React, { KeyboardEvent } from 'react';

export type RadioButtonProps = {
  id?: string;
  name: string;
  value: string | boolean;
  checked?: boolean;
  onChange?: (value: string | boolean) => void;
  label?: string | React.ReactNode;
  disabled?: boolean;
  size?: 'm' | 'l';
  tabIndex?: number;
  onKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void;
};

export type RadioButtonOption = Record<string, string | boolean | React.ReactNode>;

export type RadioButtonGroupProps = {
  name: string;
  options: RadioButtonOption[];
  selectedValue?: string | boolean;
  onChange: (value: string | boolean) => void;
  disabled?: boolean;
  size?: 'm' | 'l';
  direction?: 'horizontal' | 'vertical';
  labelKey?: string;
  valueKey?: string;
};
