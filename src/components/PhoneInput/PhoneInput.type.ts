import type { TextInputProps } from '../index';

export type PhoneInputProps = Omit<TextInputProps, 'useIcon' | 'icon' | 'iconPosition' | 'type'> & {
  inputWidth?: string | number;
  inputProps?: Partial<TextInputProps>[];
  separator?: string;
};
