import { Label } from '../../Label';
import * as style from '../Switch.module.css';
import type { SwitchLabelProps } from '../Switch.type';

export function SwitchLabel({
  label,
  position,
  size,
  weight,
  className,
  isClickable,
  onClick,
  disabled,
  htmlFor,
}: SwitchLabelProps) {
  if (!label) return null;

  const commonProps = {
    className: `${className} ${position === 'left' ? style.labelMarginRight : style.labelMarginLeft}`,
    onClick: isClickable && !disabled ? onClick : undefined,
    style: {
      cursor: isClickable && !disabled ? 'pointer' : 'default',
    },
  };

  const labelContent =
    typeof label === 'string' ? (
      <Label {...commonProps} size={size} weight={weight} htmlFor={htmlFor}>
        {label}
      </Label>
    ) : (
      <label {...commonProps} htmlFor={htmlFor}>{label}</label>
    );

  return labelContent;
}
