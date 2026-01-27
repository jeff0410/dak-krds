import type { TextInputProps } from '../index';

export type NumberInputProps = Omit<
  TextInputProps,
  'useIcon' | 'icon' | 'iconPosition' | 'type'
> & {
  useComma?: boolean;
  allowDecimal?: boolean;
  defaultZero?: boolean;
  decimalScale?: number;
};
