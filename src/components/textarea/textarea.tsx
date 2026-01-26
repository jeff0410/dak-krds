import React from 'react';
import './textarea.css';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

export function TextArea({
  label,
  error,
  helperText,
  resize = 'vertical',
  className = '',
  ...props
}: TextAreaProps) {
  const textareaClassNames = [
    'dak-textarea',
    `dak-textarea--resize-${resize}`,
    error && 'dak-textarea--error',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="dak-textarea-wrapper">
      {label && <label className="dak-textarea-label">{label}</label>}
      <textarea className={textareaClassNames} {...props} />
      {error && <span className="dak-textarea-error-text">{error}</span>}
      {!error && helperText && (
        <span className="dak-textarea-helper-text">{helperText}</span>
      )}
    </div>
  );
}
