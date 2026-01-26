import React from 'react';
import './checkbox.css';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
}

export function Checkbox({
  label,
  error,
  className = '',
  ...props
}: CheckboxProps) {
  const checkboxClassNames = [
    'dak-checkbox',
    error && 'dak-checkbox--error',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="dak-checkbox-wrapper">
      <label className="dak-checkbox-label-wrapper">
        <input
          type="checkbox"
          className={checkboxClassNames}
          {...props}
        />
        {label && <span className="dak-checkbox-label">{label}</span>}
      </label>
      {error && <span className="dak-checkbox-error-text">{error}</span>}
    </div>
  );
}
