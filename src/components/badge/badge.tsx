import * as style from './Badge.module.css';
import { Label } from '../Label';
import type { BadgeProps } from './Badge.type';

export const Badge = ({
  label,
  variant = 'default',
  size = 's',
  appearance = 'fill-strong',
  className = '',
  width = '',
  height = '',
  radius = '4px',
}: BadgeProps) => {
  const variantKey = `${variant}${toPascalCase(appearance)}`;
  const variantClass = style[variantKey] ?? '';

  return (
    <output
      className={`${style.badge} ${variantClass} ${className}`}
      style={{
        width,
        height,
        borderRadius: radius,
      }}
      aria-label={label}>
      <Label id={`badge-${label}`} size={size} className={`${style.normalWeight}`}>
        {label}
      </Label>
    </output>
  );
};

function toPascalCase(value: string) {
  return value
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}
