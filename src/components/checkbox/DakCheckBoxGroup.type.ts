export interface CheckBoxOption {
  label: string;
  value: string;
  [key: string]: string;
}

export interface DakCheckBoxGroupProps {
  options: CheckBoxOption[];
  value: string[];
  onChange: (value: string[]) => void;
  width?: string; //
  valueKey?: string; // 기본 'value'
  labelKey?: string; // 기본 'label'
  size?: 'default' | 'large';
  direction?: 'horizontal' | 'vertical';
  disabled?: boolean;
  name?: string;
  required?: boolean;
}
