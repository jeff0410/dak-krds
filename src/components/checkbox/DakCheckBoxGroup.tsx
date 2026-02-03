import { DakCheckBox } from './DakCheckBox';
import * as styles from './DakCheckBoxGroup.module.css';
import { DakCheckBoxGroupProps } from './DakCheckBoxGroup.type';

export const DakCheckBoxGroup = ({
  options,
  value,
  onChange,
  valueKey = 'value',
  labelKey = 'label',
  size = 'default',
  direction = 'horizontal',
  width = 'auto',
  disabled = false,
  name,
}: DakCheckBoxGroupProps) => {
  const handleChange = (optionValue: string) => {
    if (disabled) return;
    let newValue: string[];
    if (value.includes(optionValue)) {
      newValue = value.filter((v) => v !== optionValue);
    } else {
      newValue = [...value, optionValue];
    }
    onChange(newValue);
  };

  return (
    <fieldset
      className={`${styles.checkboxGroup} ${direction === 'vertical' ? styles.vertical : styles.horizontal}`}
      disabled={disabled}>
      <legend className={styles.visuallyHidden}>{name || 'Checkbox Group'}</legend>
      {options.map((option) => (
        <DakCheckBox
          key={option[valueKey]}
          id={`${name || 'checkbox'}-${option[valueKey]}`}
          label={option[labelKey]}
          checked={value.includes(option[valueKey])}
          disabled={disabled}
          size={size}
          width={width}
          onChange={() => handleChange(option[valueKey])}
        />
      ))}
    </fieldset>
  );
};
