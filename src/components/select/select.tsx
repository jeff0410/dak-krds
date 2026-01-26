import React from 'react';
import './select.css';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
}

export function Select({
  label,
  error,
  helperText,
  options,
  className = '',
  ...props
}: SelectProps) {
  const selectClassNames = [
    'dak-select',
    error && 'dak-select--error',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="dak-select-wrapper">
      {label && <label className="dak-select-label">{label}</label>}
      <select className={selectClassNames} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="dak-select-error-text">{error}</span>}
      {!error && helperText && (
        <span className="dak-select-helper-text">{helperText}</span>
      )}
    </div>
  );
}
