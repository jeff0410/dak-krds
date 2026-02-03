/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <explanation> */
/** biome-ignore-all lint/a11y/useSemanticElements: <explanation> */
import type React from 'react';
import { Label } from '../Label';
import styles from './RadioButton.module.css';
import type { RadioButtonProps } from './RadioButton.type';
import { uniqueId } from 'lodash-es';

export const RadioButton = ({
  id = `radio_${uniqueId()}`,
  name,
  value,
  checked, // checked가 없으면 value로 판단
  onChange,
  label,
  disabled = false,
  size = 'm',
  tabIndex = 0,
  onKeyDown,
}: RadioButtonProps) => {
  // checked가 명시적으로 전달되지 않았으면 value를 boolean으로 변환해서 사용
  const isChecked = checked !== undefined ? checked : Boolean(value);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled && event.target.checked) {
      if (onChange) {
        onChange(value);
      }
    }
  };

  const handleClick = () => {
    if (!disabled) {
      if (onChange) {
        onChange(value);
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (onChange) {
        onChange(value);
      }
    }
  };

  return (
    <div
      className={styles.radioContainer}
      // biome-ignore lint/a11y/useSemanticElements: <explanation>
      role='radio'
      aria-checked={isChecked}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : tabIndex}
      onClick={handleClick}
      onKeyDown={handleKeyDown}>
      <div
        className={`
            ${styles.radioOuterCircle} 
            ${styles[`radioOuter_${size}`]}
            ${disabled ? styles.disabled : isChecked ? styles.checked : styles.unchecked}
        `
          .trim()
          .replace(/\s+/g, ' ')}>
        <div
          className={`
            ${styles.radioInnerCircle}
            ${styles[`radioInner_${size}`]}
            ${
              disabled && isChecked
                ? styles.innerDisabled
                : isChecked
                  ? styles.innerChecked
                  : styles.innerUnchecked
            }
        `
            .trim()
            .replace(/\s+/g, ' ')}
        />

        <input
          type='radio'
          id={id}
          name={name}
          value={String(value)}
          checked={isChecked}
          onChange={handleInputChange}
          disabled={disabled}
          className={styles.srOnly}
          tabIndex={-1}
        />
      </div>
      {label && (
        <Label
          htmlFor={id}
          size={size}
          color={disabled ? 'gray-40' : 'gray-90'}
          className={`${disabled ? styles.labelDisabled : styles.label} ${styles[`label_${size}`]}`}
          onClick={() => {
            if (onChange) {
              !disabled && onChange(value);
            }
          }}>
          {label}
        </Label>
      )}
    </div>
  );
};
