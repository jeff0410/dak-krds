import React from 'react';
import { useSwitch } from './use-switch';
import './switch.css';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export function Switch({
  label,
  className = '',
  ...props
}: SwitchProps) {
  const { checked, handleChange } = useSwitch(props);

  const switchClassNames = [
    'dak-switch',
    checked && 'dak-switch--checked',
    props.disabled && 'dak-switch--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label className="dak-switch-wrapper">
      <input
        type="checkbox"
        className="dak-switch-input"
        checked={checked}
        onChange={handleChange}
        {...props}
      />
      <span className={switchClassNames}>
        <span className="dak-switch-thumb" />
      </span>
      {label && <span className="dak-switch-label">{label}</span>}
    </label>
  );
}
