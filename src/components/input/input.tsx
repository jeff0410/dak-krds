import React from 'react';
import './input.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Input({
  label,
  error,
  helperText,
  className = '',
  ...props
}: InputProps) {
  const inputClassNames = [
    'dak-input',
    error && 'dak-input--error',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="dak-input-wrapper">
      {label && <label className="dak-input-label">{label}</label>}
      <input className={inputClassNames} {...props} />
      {error && <span className="dak-input-error-text">{error}</span>}
      {!error && helperText && (
        <span className="dak-input-helper-text">{helperText}</span>
      )}
    </div>
  );
}
