export type ChipProps = {
  id?: string;
  label: string;
  checked?: boolean;
  disabled?: boolean;
  size?: 's' | 'm' | 'l';
  onChange?: (checked: boolean) => void;
  type?: 'single' | 'multi';
  height?: string;
};

export type ChipGroupProps = {
  options: ChipOption[];
  selected: string[];
  onChange: (value: string, checked: boolean, label?: string) => void;
  type?: 'single' | 'multi';
  size?: 's' | 'm' | 'l';
  disabled?: boolean;
  labelKey?: string;
  valueKey?: string;
  className?: string;
  height?: string;
};

export type ChipOption = Record<string, string>;
